begin;

create function public.get_expired_submission_batch(p_limit integer default 100)
returns table (
  submission_id uuid,
  cv_bucket text,
  cv_object_path text
)
language sql
security definer
set search_path = ''
as $$
  select s.id, c.cv_bucket, c.cv_object_path
  from public.submissions as s
  left join public.candidate_submission_details as c on c.submission_id = s.id
  where s.created_at < now() - interval '12 months'
  order by s.created_at, s.id
  limit least(greatest(p_limit, 1), 500);
$$;

create function public.delete_expired_submissions(p_submission_ids uuid[])
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  deleted_count integer;
begin
  with deleted as (
    delete from public.submissions
    where id = any(p_submission_ids)
      and created_at < now() - interval '12 months'
    returning id
  )
  select count(*)::integer into deleted_count from deleted;

  return deleted_count;
end;
$$;

revoke all on function public.get_expired_submission_batch(integer)
  from public, anon, authenticated;
revoke all on function public.delete_expired_submissions(uuid[])
  from public, anon, authenticated;
grant execute on function public.get_expired_submission_batch(integer) to service_role;
grant execute on function public.delete_expired_submissions(uuid[]) to service_role;

commit;
