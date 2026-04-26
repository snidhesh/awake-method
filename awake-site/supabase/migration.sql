-- AWAKE Method — Supabase database schema
-- Run this in your Supabase SQL editor

-- 1. Subscribers table
create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  company text,
  services text[] not null default '{}',
  notes text default '',
  joined_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for email lookups
create unique index if not exists idx_subscribers_email
  on public.subscribers (email) where email is not null and email != '';

-- 2. Enquiries table (speaking, training, collab forms)
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  service_type text not null, -- keynote, masterclass, training, collab
  event_date text,
  audience_size text,
  message text,
  status text not null default 'new', -- new, contacted, closed
  created_at timestamptz not null default now()
);

-- 3. Newsletter signups (playbook + newsletter)
create table if not exists public.newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  source text not null default 'website', -- website, playbook, podcast
  created_at timestamptz not null default now()
);

-- 4. WhatsApp message history
create table if not exists public.wa_messages (
  id uuid primary key default gen_random_uuid(),
  body text not null,
  segment text not null,
  sent_at timestamptz not null default now(),
  scheduled boolean not null default false,
  created_at timestamptz not null default now()
);

-- 5. EDM campaigns
create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  subject text not null,
  segment text not null,
  recipients integer not null default 0,
  sent_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- 6. Integration settings (encrypted API keys)
create table if not exists public.integration_settings (
  id uuid primary key default gen_random_uuid(),
  provider text not null unique, -- manychat, mailchimp, whatsapp_api, activecampaign, stripe, zapier
  api_key text, -- store encrypted in production
  webhook_url text,
  is_connected boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Row-level security
alter table public.subscribers enable row level security;
alter table public.enquiries enable row level security;
alter table public.newsletter_signups enable row level security;
alter table public.wa_messages enable row level security;
alter table public.campaigns enable row level security;
alter table public.integration_settings enable row level security;

-- Public insert policies (for website forms — no auth needed)
create policy "Allow public newsletter signup" on public.newsletter_signups
  for insert with check (true);

create policy "Allow public enquiry submission" on public.enquiries
  for insert with check (true);

-- Authenticated admin policies (for dashboard)
create policy "Admin full access to subscribers" on public.subscribers
  for all using (auth.role() = 'authenticated');

create policy "Admin full access to enquiries" on public.enquiries
  for select using (auth.role() = 'authenticated');

create policy "Admin update enquiries" on public.enquiries
  for update using (auth.role() = 'authenticated');

create policy "Admin full access to newsletter" on public.newsletter_signups
  for all using (auth.role() = 'authenticated');

create policy "Admin full access to wa_messages" on public.wa_messages
  for all using (auth.role() = 'authenticated');

create policy "Admin full access to campaigns" on public.campaigns
  for all using (auth.role() = 'authenticated');

create policy "Admin full access to integration_settings" on public.integration_settings
  for all using (auth.role() = 'authenticated');
