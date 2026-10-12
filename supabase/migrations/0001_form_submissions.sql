-- Form submissions for www.vimtc.org
-- Replaces the Proweaver "formdatabase_emails" MySQL table: every website form submission is
-- emailed to the college AND stored here so there is a searchable history.

create table if not exists public.form_submissions (
  id            bigint generated always as identity primary key,
  submitted_at  timestamptz not null default now(),
  form          text not null,                 -- 'Send Us a Message Form' | 'Contact Us Form' | 'Set an Appointment Form' | 'Apply Now Form'
  sender_name   text,
  sender_email  text,
  fields        jsonb not null default '{}'::jsonb,   -- all submitted fields, label → value
  attachments   text[] not null default '{}',         -- file names attached to the email
  status        text not null default 'new' check (status in ('new', 'read', 'archived')),
  source        text not null default 'website',      -- 'website' | 'legacy-wordpress'
  legacy_id     integer,                              -- formdatabase_emails.form_id for imported rows
  ip_hash       text,                                 -- sha256 of the client IP, for abuse tracing only
  user_agent    text
);

create index if not exists form_submissions_submitted_at_idx on public.form_submissions (submitted_at desc);
create index if not exists form_submissions_form_idx on public.form_submissions (form);
create unique index if not exists form_submissions_legacy_id_idx on public.form_submissions (legacy_id) where legacy_id is not null;

-- Row Level Security: nothing is readable or writable with the anon/public key.
-- The website writes with the service-role key (server side only); the client reads in the Supabase dashboard.
alter table public.form_submissions enable row level security;
revoke all on public.form_submissions from anon, authenticated;

comment on table public.form_submissions is 'Website form submissions (contact, message, appointment, enrollment). Personal data: handle per the Privacy Notice.';
