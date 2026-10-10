-- Run this ONLY if you already ran the original schema.sql before this update.
alter table public.member_keys add column if not exists key_encrypted text;

create table if not exists public.rate_limit_hits (
  id bigserial primary key,
  key text not null,
  created_at timestamptz not null default now()
);
create index if not exists rate_limit_hits_key_idx on public.rate_limit_hits (key, created_at);
alter table public.rate_limit_hits enable row level security;

alter table public.profiles add column if not exists device_types text[] default '{}';
