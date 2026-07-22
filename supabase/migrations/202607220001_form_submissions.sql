begin;

create type public.submission_kind as enum ('contact', 'candidate', 'hiring');
create type public.submission_status as enum ('received', 'reviewing', 'closed');
create type public.clickup_delivery_status as enum ('pending', 'processing', 'sent', 'failed');

create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  kind public.submission_kind not null,
  name text not null check (char_length(btrim(name)) between 1 and 100),
  email text not null check (
    char_length(email) between 3 and 254
    and email = lower(btrim(email))
  ),
  status public.submission_status not null default 'received',
  request_id uuid not null unique,
  consented_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (updated_at >= created_at)
);

create table public.contact_submission_details (
  submission_id uuid primary key references public.submissions(id) on delete cascade,
  message text not null check (char_length(btrim(message)) between 1 and 5000)
);

create table public.candidate_submission_details (
  submission_id uuid primary key references public.submissions(id) on delete cascade,
  phone text not null check (char_length(btrim(phone)) between 1 and 50),
  current_location text not null check (char_length(btrim(current_location)) between 1 and 200),
  preferred_role text not null check (char_length(btrim(preferred_role)) between 1 and 200),
  preferred_location text not null check (char_length(btrim(preferred_location)) between 1 and 200),
  linkedin_url text check (
    linkedin_url is null
    or (char_length(linkedin_url) <= 2048 and linkedin_url ~* '^https?://')
  ),
  note text check (note is null or char_length(note) <= 5000),
  cv_bucket text not null check (char_length(btrim(cv_bucket)) between 1 and 100),
  cv_object_path text not null unique check (char_length(btrim(cv_object_path)) between 1 and 1024),
  cv_original_name text not null check (char_length(btrim(cv_original_name)) between 1 and 255),
  cv_mime_type text not null check (cv_mime_type in (
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  )),
  cv_size integer not null check (cv_size between 1 and 3145728)
);

create table public.hiring_submission_details (
  submission_id uuid primary key references public.submissions(id) on delete cascade,
  company text not null check (char_length(btrim(company)) between 1 and 200),
  phone text check (phone is null or char_length(btrim(phone)) between 1 and 50),
  role text not null check (char_length(btrim(role)) between 1 and 200),
  location text not null check (char_length(btrim(location)) between 1 and 200),
  timeline text not null check (char_length(btrim(timeline)) between 1 and 200),
  details text not null check (char_length(btrim(details)) between 1 and 5000)
);

create table public.clickup_deliveries (
  submission_id uuid primary key references public.submissions(id) on delete cascade,
  status public.clickup_delivery_status not null default 'pending',
  attempt_count integer not null default 0 check (attempt_count >= 0),
  clickup_task_id text,
  next_retry_at timestamptz,
  last_error text check (last_error is null or char_length(last_error) <= 1000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (updated_at >= created_at),
  check (status <> 'sent' or clickup_task_id is not null)
);

create index submissions_kind_created_at_idx
  on public.submissions(kind, created_at desc);
create index submissions_status_created_at_idx
  on public.submissions(status, created_at desc);
create index clickup_deliveries_due_idx
  on public.clickup_deliveries(status, next_retry_at)
  where status in ('pending', 'failed');

create function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger submissions_set_updated_at
before update on public.submissions
for each row execute function public.set_updated_at();

create trigger clickup_deliveries_set_updated_at
before update on public.clickup_deliveries
for each row execute function public.set_updated_at();

create function public.enqueue_clickup_delivery()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.clickup_deliveries (submission_id) values (new.id);
  return new;
end;
$$;

create trigger submissions_enqueue_clickup_delivery
after insert on public.submissions
for each row execute function public.enqueue_clickup_delivery();

create function public.create_contact_submission(
  p_request_id uuid,
  p_name text,
  p_email text,
  p_consented_at timestamptz,
  p_message text
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_submission_id uuid;
begin
  insert into public.submissions (
    kind, name, email, request_id, consented_at
  ) values (
    'contact', btrim(p_name), lower(btrim(p_email)), p_request_id, p_consented_at
  )
  returning id into v_submission_id;

  insert into public.contact_submission_details (submission_id, message)
  values (v_submission_id, btrim(p_message));

  return v_submission_id;
end;
$$;

create function public.create_hiring_submission(
  p_request_id uuid,
  p_name text,
  p_email text,
  p_consented_at timestamptz,
  p_company text,
  p_phone text,
  p_role text,
  p_location text,
  p_timeline text,
  p_details text
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_submission_id uuid;
begin
  insert into public.submissions (
    kind, name, email, request_id, consented_at
  ) values (
    'hiring', btrim(p_name), lower(btrim(p_email)), p_request_id, p_consented_at
  )
  returning id into v_submission_id;

  insert into public.hiring_submission_details (
    submission_id, company, phone, role, location, timeline, details
  ) values (
    v_submission_id,
    btrim(p_company),
    nullif(btrim(p_phone), ''),
    btrim(p_role),
    btrim(p_location),
    btrim(p_timeline),
    btrim(p_details)
  );

  return v_submission_id;
end;
$$;

create function public.create_candidate_submission(
  p_request_id uuid,
  p_name text,
  p_email text,
  p_consented_at timestamptz,
  p_phone text,
  p_location text,
  p_preferred_role text,
  p_preferred_location text,
  p_linkedin_url text,
  p_note text,
  p_cv_bucket text,
  p_cv_object_path text,
  p_cv_original_name text,
  p_cv_mime_type text,
  p_cv_size integer
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_submission_id uuid;
begin
  insert into public.submissions (
    kind, name, email, request_id, consented_at
  ) values (
    'candidate', btrim(p_name), lower(btrim(p_email)), p_request_id, p_consented_at
  )
  returning id into v_submission_id;

  insert into public.candidate_submission_details (
    submission_id,
    phone,
    current_location,
    preferred_role,
    preferred_location,
    linkedin_url,
    note,
    cv_bucket,
    cv_object_path,
    cv_original_name,
    cv_mime_type,
    cv_size
  ) values (
    v_submission_id,
    btrim(p_phone),
    btrim(p_location),
    btrim(p_preferred_role),
    btrim(p_preferred_location),
    nullif(btrim(p_linkedin_url), ''),
    nullif(btrim(p_note), ''),
    btrim(p_cv_bucket),
    btrim(p_cv_object_path),
    btrim(p_cv_original_name),
    p_cv_mime_type,
    p_cv_size
  );

  return v_submission_id;
end;
$$;

alter table public.submissions enable row level security;
alter table public.contact_submission_details enable row level security;
alter table public.candidate_submission_details enable row level security;
alter table public.hiring_submission_details enable row level security;
alter table public.clickup_deliveries enable row level security;

revoke all on table public.submissions from public, anon, authenticated;
revoke all on table public.contact_submission_details from public, anon, authenticated;
revoke all on table public.candidate_submission_details from public, anon, authenticated;
revoke all on table public.hiring_submission_details from public, anon, authenticated;
revoke all on table public.clickup_deliveries from public, anon, authenticated;

revoke all on function public.set_updated_at() from public, anon, authenticated;
revoke all on function public.enqueue_clickup_delivery() from public, anon, authenticated;
revoke all on function public.create_contact_submission(uuid, text, text, timestamptz, text)
  from public, anon, authenticated;
revoke all on function public.create_hiring_submission(uuid, text, text, timestamptz, text, text, text, text, text, text)
  from public, anon, authenticated;
revoke all on function public.create_candidate_submission(uuid, text, text, timestamptz, text, text, text, text, text, text, text, text, text, text, integer)
  from public, anon, authenticated;

grant execute on function public.create_contact_submission(uuid, text, text, timestamptz, text)
  to service_role;
grant execute on function public.create_hiring_submission(uuid, text, text, timestamptz, text, text, text, text, text, text)
  to service_role;
grant execute on function public.create_candidate_submission(uuid, text, text, timestamptz, text, text, text, text, text, text, text, text, text, text, integer)
  to service_role;

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
) values (
  'candidate-cvs',
  'candidate-cvs',
  false,
  3145728,
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]::text[]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

commit;
