begin;

alter table public.clickup_deliveries
  add column clickup_chat_message_id text;

alter table public.clickup_deliveries
  add constraint clickup_deliveries_sent_check check (
    status <> 'sent'
    or (clickup_task_id is not null and clickup_chat_message_id is not null)
  );

create type public.clickup_delivery_claim as (
  submission_id uuid,
  kind text,
  name text,
  email text,
  created_at timestamptz,
  clickup_task_id text,
  clickup_chat_message_id text,
  message text,
  phone text,
  current_location text,
  preferred_role text,
  preferred_location text,
  linkedin_url text,
  note text,
  company text,
  role text,
  location text,
  timeline text,
  details text
);

create function public.clickup_delivery_payload(p_submission_id uuid)
returns public.clickup_delivery_claim
language sql
stable
security definer
set search_path = ''
as $$
  select row(
    s.id, s.kind::text, s.name, s.email, s.created_at,
    d.clickup_task_id, d.clickup_chat_message_id,
    c.message,
    coalesce(cd.phone, h.phone), cd.current_location, cd.preferred_role,
    cd.preferred_location, cd.linkedin_url, cd.note,
    h.company, h.role, h.location, h.timeline, h.details
  )::public.clickup_delivery_claim
  from public.submissions s
  join public.clickup_deliveries d on d.submission_id = s.id
  left join public.contact_submission_details c on c.submission_id = s.id
  left join public.candidate_submission_details cd on cd.submission_id = s.id
  left join public.hiring_submission_details h on h.submission_id = s.id
  where s.id = p_submission_id;
$$;

create function public.claim_clickup_delivery(p_submission_id uuid)
returns public.clickup_delivery_claim
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_claim public.clickup_delivery_claim;
begin
  update public.clickup_deliveries
  set status = 'processing', attempt_count = attempt_count + 1, next_retry_at = null
  where submission_id = p_submission_id
    and (
      status = 'pending'
      or (status = 'failed' and next_retry_at is not null and next_retry_at <= now())
      or (status = 'processing' and updated_at < now() - interval '10 minutes')
    );

  if not found then return null; end if;
  select (public.clickup_delivery_payload(p_submission_id)).* into v_claim;
  return v_claim;
end;
$$;

create function public.claim_due_clickup_deliveries(p_limit integer default 10)
returns setof public.clickup_delivery_claim
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id uuid;
  v_claim public.clickup_delivery_claim;
begin
  if p_limit < 1 or p_limit > 25 then
    raise exception 'Batch size must be between 1 and 25';
  end if;

  for v_id in
    select d.submission_id
    from public.clickup_deliveries d
    where d.status = 'pending'
       or (d.status = 'failed' and d.next_retry_at is not null and d.next_retry_at <= now())
       or (d.status = 'processing' and d.updated_at < now() - interval '10 minutes')
    order by d.created_at
    for update skip locked
    limit p_limit
  loop
    update public.clickup_deliveries
    set status = 'processing', attempt_count = attempt_count + 1, next_retry_at = null
    where submission_id = v_id;
    select (public.clickup_delivery_payload(v_id)).* into v_claim;
    return next v_claim;
  end loop;
end;
$$;

create function public.record_clickup_task(p_submission_id uuid, p_task_id text)
returns void
language sql
security definer
set search_path = ''
as $$
  update public.clickup_deliveries
  set clickup_task_id = nullif(btrim(p_task_id), '')
  where submission_id = p_submission_id and status = 'processing';
$$;

create function public.record_clickup_chat_message(p_submission_id uuid, p_message_id text)
returns void
language sql
security definer
set search_path = ''
as $$
  update public.clickup_deliveries
  set clickup_chat_message_id = nullif(btrim(p_message_id), '')
  where submission_id = p_submission_id and status = 'processing';
$$;

create function public.complete_clickup_delivery(p_submission_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.clickup_deliveries
  set status = 'sent', next_retry_at = null, last_error = null
  where submission_id = p_submission_id
    and status = 'processing'
    and clickup_task_id is not null
    and clickup_chat_message_id is not null;
  if not found then raise exception 'Incomplete ClickUp delivery'; end if;
end;
$$;

create function public.fail_clickup_delivery(
  p_submission_id uuid,
  p_error text,
  p_retryable boolean
)
returns void
language sql
security definer
set search_path = ''
as $$
  update public.clickup_deliveries
  set status = 'failed',
      last_error = left(coalesce(nullif(btrim(p_error), ''), 'ClickUp delivery failed.'), 1000),
      next_retry_at = case when p_retryable then
        now() + least(interval '24 hours', interval '5 minutes' * power(2, least(attempt_count - 1, 8)))
      else null end
  where submission_id = p_submission_id and status = 'processing';
$$;

revoke all on function public.clickup_delivery_payload(uuid) from public, anon, authenticated;
revoke all on function public.claim_clickup_delivery(uuid) from public, anon, authenticated;
revoke all on function public.claim_due_clickup_deliveries(integer) from public, anon, authenticated;
revoke all on function public.record_clickup_task(uuid, text) from public, anon, authenticated;
revoke all on function public.record_clickup_chat_message(uuid, text) from public, anon, authenticated;
revoke all on function public.complete_clickup_delivery(uuid) from public, anon, authenticated;
revoke all on function public.fail_clickup_delivery(uuid, text, boolean) from public, anon, authenticated;

grant execute on function public.claim_clickup_delivery(uuid) to service_role;
grant execute on function public.claim_due_clickup_deliveries(integer) to service_role;
grant execute on function public.record_clickup_task(uuid, text) to service_role;
grant execute on function public.record_clickup_chat_message(uuid, text) to service_role;
grant execute on function public.complete_clickup_delivery(uuid) to service_role;
grant execute on function public.fail_clickup_delivery(uuid, text, boolean) to service_role;

commit;
