-- Visit log for the portfolio's private /admin dashboard.
-- Only the server (service role) reads or writes it. Raw IP addresses are
-- never stored: visitor_id is a salted hash, so repeat visits can be
-- recognised without keeping the address.

create table public.visits (
  id bigint generated always as identity primary key,
  visited_at timestamptz not null default now(),
  visitor_id text not null,
  path text not null,
  source text not null default 'Direct',
  referrer text,
  country text,
  region text,
  city text,
  org text,
  device text,
  browser text,
  os text,
  is_bot boolean not null default false
);

create index visits_visited_at_idx on public.visits (visited_at desc);
create index visits_visitor_id_idx on public.visits (visitor_id);

alter table public.visits enable row level security;

-- All-time totals for the dashboard header.
create view public.visit_totals with (security_invoker = true) as
  select count(*) as visits, count(distinct visitor_id) as visitors
  from public.visits
  where not is_bot;

-- No policies on purpose: the anon and authenticated roles get nothing.
revoke all on public.visits from anon, authenticated;
revoke all on public.visit_totals from anon, authenticated;
