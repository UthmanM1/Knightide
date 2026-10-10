-- Knightide database schema
-- Run against a fresh Supabase Postgres database (SQL editor or `supabase db push`).
-- Every table has Row Level Security enabled. Policies below are a starting point —
-- review them before launch, especially the admin/moderator role checks.

-- ── Extensions ────────────────────────────────────────────────────────────
create extension if not exists "pgcrypto";

-- ── Helper: role check against auth.users.raw_app_meta_data ───────────────
-- Roles ('admin', 'moderator') are set via Supabase Auth admin API on a user's
-- app_metadata, which the client cannot modify. See docs/architecture.md.
create or replace function public.has_role(role text)
returns boolean
language sql
stable
as $$
  select coalesce(
    (auth.jwt() -> 'app_metadata' -> 'roles') ? role,
    false
  );
$$;

-- ── profiles ────────────────────────────────────────────────────────────
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  disciplines text[] default '{}',
  experience_level text,
  weekly_schedule jsonb,
  device_types text[] default '{}',
  onboarding_step int default 0,
  onboarding_completed_at timestamptz,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  referred_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "profiles: read own" on public.profiles for select using (auth.uid() = id);
create policy "profiles: update own" on public.profiles for update using (auth.uid() = id);
create policy "profiles: admin read all" on public.profiles for select using (public.has_role('admin'));

-- ── accessibility_prefs ─────────────────────────────────────────────────
create table public.accessibility_prefs (
  user_id uuid primary key references auth.users(id) on delete cascade,
  seated boolean default false,
  low_impact boolean default false,
  captions_default boolean default false,
  reduced_motion boolean default false,
  audio_led boolean default false,
  high_contrast boolean default false,
  updated_at timestamptz not null default now()
);
alter table public.accessibility_prefs enable row level security;
create policy "accessibility_prefs: own" on public.accessibility_prefs for all using (auth.uid() = user_id);

-- ── plans (public read) ─────────────────────────────────────────────────
create table public.plans (
  id text primary key, -- 'explorer' | 'complete' | 'flex'
  name text not null,
  price_gbp numeric, -- null for free plans
  stripe_price_id text,
  billing_period text, -- 'month' | null
  features jsonb not null default '[]',
  is_active boolean not null default true,
  sort_order int not null default 0
);
alter table public.plans enable row level security;
create policy "plans: public read active" on public.plans for select using (is_active);
create policy "plans: admin write" on public.plans for all using (public.has_role('admin'));

-- ── subscriptions & entitlements (Stripe webhook is the only writer) ──────
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  stripe_customer_id text not null,
  stripe_subscription_id text unique,
  plan_id text references public.plans(id),
  status text not null, -- 'active' | 'past_due' | 'canceled' | 'incomplete'
  current_period_end timestamptz,
  cancel_at_period_end boolean default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.subscriptions enable row level security;
create policy "subscriptions: read own" on public.subscriptions for select using (auth.uid() = user_id);
create policy "subscriptions: admin read all" on public.subscriptions for select using (public.has_role('admin'));
-- No insert/update/delete policy for regular users: only the service-role
-- webhook handler (which bypasses RLS) may write here.

create table public.entitlements (
  user_id uuid primary key references auth.users(id) on delete cascade,
  plan_id text references public.plans(id),
  active boolean not null default false,
  verified boolean not null default false,
  updated_at timestamptz not null default now()
);
alter table public.entitlements enable row level security;
create policy "entitlements: read own" on public.entitlements for select using (auth.uid() = user_id);

-- ── member_keys (single-use, hashed) ───────────────────────────────────
create table public.member_keys (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  key_hash text not null,
  key_encrypted text, -- AES-GCM copy so the owner can see it once; cleared when the key is used
  used boolean not null default false,
  failed_attempts int not null default 0,
  locked_until timestamptz,
  created_at timestamptz not null default now()
);
alter table public.member_keys enable row level security;
create policy "member_keys: read own" on public.member_keys for select using (auth.uid() = user_id);

-- ── stripe_events (idempotency log) ────────────────────────────────────
create table public.stripe_events (
  id text primary key, -- Stripe event id
  type text not null,
  processed_at timestamptz not null default now()
);
alter table public.stripe_events enable row level security;
create policy "stripe_events: admin read" on public.stripe_events for select using (public.has_role('admin'));

-- ── training_plans / training_sessions ─────────────────────────────────
create table public.training_plans (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  level text,
  duration_minutes int,
  equipment text,
  space_needed text,
  impact text,
  accessible_alternatives jsonb default '[]',
  safety_notes text,
  is_active boolean not null default true
);
alter table public.training_plans enable row level security;
create policy "training_plans: public read active" on public.training_plans for select using (is_active);
create policy "training_plans: admin write" on public.training_plans for all using (public.has_role('admin'));

create table public.training_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  training_plan_id uuid references public.training_plans(id),
  source text not null default 'manual', -- 'manual' | 'ai_trainer'
  duration_seconds int,
  effort_note text,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);
alter table public.training_sessions enable row level security;
create policy "training_sessions: own" on public.training_sessions for all using (auth.uid() = user_id);

-- ── trainers / bookings ─────────────────────────────────────────────────
create table public.trainers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  disciplines text[] default '{}',
  languages text[] default '{}',
  qualifications jsonb default '[]', -- [{ title, awarding_body, verified }]
  bio text,
  is_verified boolean not null default false,
  is_active boolean not null default true
);
alter table public.trainers enable row level security;
create policy "trainers: public read active" on public.trainers for select using (is_active);
create policy "trainers: admin write" on public.trainers for all using (public.has_role('admin'));

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  trainer_id uuid not null references public.trainers(id),
  starts_at timestamptz not null,
  status text not null default 'pending', -- 'pending' | 'confirmed' | 'canceled' | 'completed'
  stripe_payment_intent_id text,
  created_at timestamptz not null default now()
);
alter table public.bookings enable row level security;
create policy "bookings: own" on public.bookings for select using (auth.uid() = user_id);
create policy "bookings: create own" on public.bookings for insert with check (auth.uid() = user_id);

-- ── events / ticket_types / tickets ─────────────────────────────────────
create table public.events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  body text,
  venue text,
  starts_at timestamptz,
  formats text[] default '{}',
  replay_window_days int,
  featured boolean not null default false,
  is_published boolean not null default false
);
alter table public.events enable row level security;
create policy "events: public read published" on public.events for select using (is_published);
create policy "events: admin write" on public.events for all using (public.has_role('admin'));

create table public.ticket_types (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  name text not null,
  price_gbp numeric not null,
  stripe_price_id text,
  quantity_available int
);
alter table public.ticket_types enable row level security;
create policy "ticket_types: public read" on public.ticket_types for select using (
  exists (select 1 from public.events e where e.id = event_id and e.is_published)
);
create policy "ticket_types: admin write" on public.ticket_types for all using (public.has_role('admin'));

create table public.tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  ticket_type_id uuid not null references public.ticket_types(id),
  stripe_payment_intent_id text,
  qr_code text not null unique,
  created_at timestamptz not null default now()
);
alter table public.tickets enable row level security;
create policy "tickets: own" on public.tickets for select using (auth.uid() = user_id);

-- ── messaging ────────────────────────────────────────────────────────────
create table public.threads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null, -- 'trainer' | 'event' | 'support'
  created_at timestamptz not null default now()
);
alter table public.threads enable row level security;
create policy "threads: own" on public.threads for all using (auth.uid() = user_id);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.threads(id) on delete cascade,
  sender_id uuid not null references auth.users(id),
  body text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);
alter table public.messages enable row level security;
create policy "messages: read own thread" on public.messages for select using (
  exists (select 1 from public.threads t where t.id = thread_id and t.user_id = auth.uid())
);
create policy "messages: send own thread" on public.messages for insert with check (
  sender_id = auth.uid() and exists (select 1 from public.threads t where t.id = thread_id and t.user_id = auth.uid())
);

create table public.event_messages (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  display_name text not null,
  body text not null,
  is_deleted boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.event_messages enable row level security;
create policy "event_messages: read published event" on public.event_messages for select using (
  not is_deleted and exists (select 1 from public.events e where e.id = event_id and e.is_published)
);
create policy "event_messages: send own" on public.event_messages for insert with check (auth.uid() = user_id);
create policy "event_messages: moderator delete" on public.event_messages for update using (public.has_role('moderator') or public.has_role('admin'));

-- ── devices / consents / notifications ─────────────────────────────────
create table public.devices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text,
  last_seen_at timestamptz,
  sync_progress boolean default true,
  sync_plan_position boolean default true,
  sync_trainer_notes boolean default true,
  sync_access_prefs boolean default true,
  created_at timestamptz not null default now()
);
alter table public.devices enable row level security;
create policy "devices: own" on public.devices for all using (auth.uid() = user_id);

create table public.consents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null, -- 'camera' | 'microphone' | 'motion' | 'spatial'
  granted boolean not null,
  session_id text,
  created_at timestamptz not null default now()
);
alter table public.consents enable row level security;
create policy "consents: own" on public.consents for all using (auth.uid() = user_id);

create table public.notifications (
  user_id uuid primary key references auth.users(id) on delete cascade,
  training_email boolean default true,
  training_push boolean default true,
  events_email boolean default true,
  events_push boolean default true,
  service_email boolean default true,
  service_push boolean default false
);
alter table public.notifications enable row level security;
create policy "notifications: own" on public.notifications for all using (auth.uid() = user_id);

-- ── forms (public insert, no read for anon) ────────────────────────────
create table public.partnership_enquiries (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique default 'PE-' || substr(md5(random()::text), 1, 8),
  organisation text not null,
  sector text not null,
  what_to_build text not null,
  who_benefits text not null,
  location text,
  timing text,
  contact_name text not null,
  work_email text not null,
  consent boolean not null,
  created_at timestamptz not null default now()
);
alter table public.partnership_enquiries enable row level security;
create policy "partnership_enquiries: public insert" on public.partnership_enquiries for insert with check (true);
create policy "partnership_enquiries: admin read" on public.partnership_enquiries for select using (public.has_role('admin'));

create table public.partnership_applications (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid references public.partnership_enquiries(id),
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'draft', -- 'draft' | 'submitted' | 'in_review' | 'approved' | 'declined'
  document_paths text[] default '{}',
  created_at timestamptz not null default now()
);
alter table public.partnership_applications enable row level security;
create policy "partnership_applications: own" on public.partnership_applications for all using (auth.uid() = user_id);

create table public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique default 'ST-' || substr(md5(random()::text), 1, 8),
  name text not null,
  email text not null,
  topic text not null,
  message text not null,
  order_reference text,
  status text not null default 'open',
  created_at timestamptz not null default now()
);
alter table public.support_tickets enable row level security;
create policy "support_tickets: public insert" on public.support_tickets for insert with check (true);
create policy "support_tickets: admin read" on public.support_tickets for select using (public.has_role('admin'));

create table public.assistance_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  event_id uuid references public.events(id),
  need text not null,
  contact_preference text,
  created_at timestamptz not null default now()
);
alter table public.assistance_requests enable row level security;
create policy "assistance_requests: public insert" on public.assistance_requests for insert with check (true);
create policy "assistance_requests: admin read" on public.assistance_requests for select using (public.has_role('admin'));

create table public.incidents (
  id uuid primary key default gen_random_uuid(),
  reporter_name text,
  reporter_email text,
  description text not null,
  status text not null default 'open',
  created_at timestamptz not null default now()
);
alter table public.incidents enable row level security;
create policy "incidents: public insert" on public.incidents for insert with check (true);
create policy "incidents: admin read" on public.incidents for select using (public.has_role('admin'));

create table public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text, -- 'desktop_download' | 'xr_download' | 'ai_trainer'
  os text,
  created_at timestamptz not null default now()
);
alter table public.waitlist enable row level security;
create policy "waitlist: public insert" on public.waitlist for insert with check (true);
create policy "waitlist: admin read" on public.waitlist for select using (public.has_role('admin'));

create table public.referrals (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  owner_id uuid not null references auth.users(id) on delete cascade,
  referred_user_id uuid references auth.users(id),
  created_at timestamptz not null default now()
);
alter table public.referrals enable row level security;
create policy "referrals: own" on public.referrals for select using (auth.uid() = owner_id);

create table public.system_status (
  id uuid primary key default gen_random_uuid(),
  component text not null, -- 'checkout' | 'events' | 'ai_trainer' | 'platform'
  status text not null default 'operational', -- 'operational' | 'degraded' | 'down'
  message text,
  updated_at timestamptz not null default now()
);
alter table public.system_status enable row level security;
create policy "system_status: public read" on public.system_status for select using (true);
create policy "system_status: admin write" on public.system_status for all using (public.has_role('admin'));

create table public.audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id),
  action text not null,
  target_table text,
  target_id text,
  metadata jsonb,
  created_at timestamptz not null default now()
);
alter table public.audit_log enable row level security;
create policy "audit_log: admin read" on public.audit_log for select using (public.has_role('admin'));

-- ── rate limiting (service role only: RLS on, no policies) ───────────────
create table public.rate_limit_hits (
  id bigserial primary key,
  key text not null,
  created_at timestamptz not null default now()
);
create index rate_limit_hits_key_idx on public.rate_limit_hits (key, created_at);
alter table public.rate_limit_hits enable row level security;
