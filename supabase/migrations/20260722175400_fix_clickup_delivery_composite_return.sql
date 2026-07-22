begin;

create or replace function public.claim_clickup_delivery(p_submission_id uuid)
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

create or replace function public.claim_due_clickup_deliveries(p_limit integer default 10)
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

revoke all on function public.claim_clickup_delivery(uuid) from public, anon, authenticated;
revoke all on function public.claim_due_clickup_deliveries(integer) from public, anon, authenticated;
grant execute on function public.claim_clickup_delivery(uuid) to service_role;
grant execute on function public.claim_due_clickup_deliveries(integer) to service_role;

commit;
