begin;

create extension if not exists pgtap with schema extensions;
select no_plan();

select has_table('public', 'submissions', 'submissions table exists');
select has_table('public', 'contact_submission_details', 'contact details table exists');
select has_table('public', 'candidate_submission_details', 'candidate details table exists');
select has_table('public', 'hiring_submission_details', 'hiring details table exists');
select has_table('public', 'clickup_deliveries', 'ClickUp deliveries table exists');

select ok(
  (select relrowsecurity from pg_class where oid = 'public.submissions'::regclass),
  'RLS is enabled on submissions'
);
select ok(
  (select bool_and(relrowsecurity)
   from pg_class
   where oid in (
     'public.contact_submission_details'::regclass,
     'public.candidate_submission_details'::regclass,
     'public.hiring_submission_details'::regclass,
     'public.clickup_deliveries'::regclass
   )),
  'RLS is enabled on all detail and delivery tables'
);

select ok(
  exists (
    select 1
    from pg_constraint
    where conrelid = 'public.submissions'::regclass
      and contype = 'u'
      and pg_get_constraintdef(oid) like '%(request_id)%'
  ),
  'request IDs are unique'
);

select ok(
  (select count(*) = 3
   from pg_constraint
   where conrelid in (
     'public.contact_submission_details'::regclass,
     'public.candidate_submission_details'::regclass,
     'public.hiring_submission_details'::regclass
   )
     and contype = 'f'
     and confrelid = 'public.submissions'::regclass),
  'each detail table references submissions'
);

select ok(
  exists (
    select 1 from pg_constraint
    where conrelid = 'public.clickup_deliveries'::regclass
      and contype = 'f'
      and confrelid = 'public.submissions'::regclass
  ),
  'each delivery references one submission'
);

select ok(
  (select count(*) = 0
   from information_schema.role_table_grants
   where table_schema = 'public'
     and table_name in (
       'submissions',
       'contact_submission_details',
       'candidate_submission_details',
       'hiring_submission_details',
       'clickup_deliveries'
     )
     and grantee in ('anon', 'authenticated')
     and privilege_type in ('SELECT', 'INSERT', 'UPDATE', 'DELETE')),
  'browser roles have no direct table privileges'
);

select ok(
  (select count(*) = 3
   from pg_proc
   where pronamespace = 'public'::regnamespace
     and proname in (
       'create_contact_submission',
       'create_candidate_submission',
       'create_hiring_submission'
     )),
  'transactional submission functions exist'
);

select ok(
  (select bool_and(has_function_privilege('service_role', oid, 'EXECUTE'))
   from pg_proc
   where pronamespace = 'public'::regnamespace
     and proname like 'create_%_submission'),
  'service_role can execute submission functions'
);

select ok(
  (select bool_and(
     not has_function_privilege('anon', oid, 'EXECUTE')
     and not has_function_privilege('authenticated', oid, 'EXECUTE')
   )
   from pg_proc
   where pronamespace = 'public'::regnamespace
     and proname like 'create_%_submission'),
  'browser roles cannot execute submission functions'
);

select ok(
  exists (
    select 1 from storage.buckets
    where id = 'candidate-cvs'
      and public = false
      and file_size_limit = 3145728
      and allowed_mime_types @> array[
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ]::text[]
  ),
  'the private CV bucket has the required restrictions'
);

select * from finish();
rollback;
