begin;

create extension if not exists pgtap with schema extensions;
set local search_path = public, extensions;
select plan(12);

select has_column('public', 'clickup_deliveries', 'clickup_chat_message_id', 'chat message checkpoint exists');
select has_function('public', 'claim_clickup_delivery', array['uuid'], 'single delivery claim exists');
select has_function('public', 'claim_due_clickup_deliveries', array['integer'], 'bounded due claim exists');
select has_function('public', 'record_clickup_task', array['uuid', 'text'], 'task checkpoint exists');
select has_function('public', 'record_clickup_chat_message', array['uuid', 'text'], 'chat checkpoint exists');
select has_function('public', 'complete_clickup_delivery', array['uuid'], 'completion transition exists');
select has_function('public', 'fail_clickup_delivery', array['uuid', 'text', 'boolean'], 'failure transition exists');

select function_privs_are('public', 'claim_clickup_delivery', array['uuid'], 'service_role', array['EXECUTE'], 'only service role can claim one delivery');
select function_privs_are('public', 'claim_due_clickup_deliveries', array['integer'], 'service_role', array['EXECUTE'], 'only service role can claim due deliveries');

insert into public.submissions (id, kind, name, email, request_id, consented_at)
values (
  '10000000-0000-4000-8000-000000000001', 'contact', 'Test Person', 'test@example.com',
  '20000000-0000-4000-8000-000000000002', now()
);
insert into public.contact_submission_details (submission_id, message)
values ('10000000-0000-4000-8000-000000000001', 'Test message');

select is(
  (select status::text from public.clickup_deliveries where submission_id = '10000000-0000-4000-8000-000000000001'),
  'pending',
  'submission trigger queues a pending delivery'
);

select is(
  ((public.claim_clickup_delivery('10000000-0000-4000-8000-000000000001')).kind),
  'contact',
  'claim returns the safe typed payload'
);

select is(
  (select attempt_count from public.clickup_deliveries where submission_id = '10000000-0000-4000-8000-000000000001'),
  1,
  'claim increments the attempt count'
);

select * from finish();
rollback;
