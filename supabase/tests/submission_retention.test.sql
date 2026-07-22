begin;

create extension if not exists pgtap with schema extensions;
set local search_path = public, extensions;
select plan(9);

select has_function('public', 'get_expired_submission_batch', array['integer'], 'retention batch function exists');
select has_function('public', 'delete_expired_submissions', array['uuid[]'], 'retention delete function exists');
select function_privs_are('public', 'get_expired_submission_batch', array['integer'], 'service_role', array['EXECUTE'], 'only service role can list expired records');
select function_privs_are('public', 'delete_expired_submissions', array['uuid[]'], 'service_role', array['EXECUTE'], 'only service role can delete expired records');

insert into public.submissions (id, kind, name, email, request_id, consented_at, created_at)
values
  ('10000000-0000-4000-8000-000000000001', 'contact', 'Old Contact', 'old-contact@example.com', '20000000-0000-4000-8000-000000000001', now() - interval '13 months', now() - interval '13 months'),
  ('10000000-0000-4000-8000-000000000002', 'candidate', 'Old Candidate', 'old-candidate@example.com', '20000000-0000-4000-8000-000000000002', now() - interval '13 months', now() - interval '13 months'),
  ('10000000-0000-4000-8000-000000000003', 'hiring', 'Recent Hiring', 'recent@example.com', '20000000-0000-4000-8000-000000000003', now() - interval '2 months', now() - interval '2 months');

insert into public.contact_submission_details (submission_id, message)
values ('10000000-0000-4000-8000-000000000001', 'Expired test message');

insert into public.candidate_submission_details (
  submission_id, phone, current_location, preferred_role, preferred_location,
  cv_bucket, cv_object_path, cv_original_name, cv_mime_type, cv_size
)
values (
  '10000000-0000-4000-8000-000000000002', '+1 555 0100', 'Test', 'Tester', 'Remote',
  'candidate-cvs', 'retention/test.pdf', 'test.pdf', 'application/pdf', 100
);

select is(
  (select count(*) from public.get_expired_submission_batch(100)),
  2::bigint,
  'only submissions older than 12 months are eligible'
);
select is(
  (select cv_object_path from public.get_expired_submission_batch(100) where submission_id = '10000000-0000-4000-8000-000000000002'),
  'retention/test.pdf',
  'candidate private object path is returned before deletion'
);
select is(
  public.delete_expired_submissions(array['10000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000002']::uuid[]),
  2,
  'expired submissions are deleted transactionally'
);
select is((select count(*) from public.candidate_submission_details where submission_id = '10000000-0000-4000-8000-000000000002'), 0::bigint, 'candidate details cascade');
select is((select count(*) from public.submissions where id = '10000000-0000-4000-8000-000000000003'), 1::bigint, 'recent submission is retained');

select * from finish();
rollback;
