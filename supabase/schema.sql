-- =========================================================================
-- Nova Motion — Supabase schema
-- Run this once in your Supabase project's SQL Editor (Project → SQL Editor
-- → New query → paste this whole file → Run).
-- =========================================================================

-- ---------------------------------------------------------------------
-- 1. PROJECTS TABLE
-- ---------------------------------------------------------------------
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null check (
    category in (
      'business',
      'product',
      'social-media',
      'promotional',
      'real-estate',
      'food-restaurants'
    )
  ),
  description text,
  thumbnail_url text not null,
  video_url text not null,
  duration text,
  featured boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 2. PACKAGES TABLE
-- ---------------------------------------------------------------------
create table if not exists packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  videos_count integer not null,
  price numeric(10, 2) not null,
  currency text not null default 'USD',
  description text,
  features text[] not null default '{}',
  popular boolean not null default false,
  display_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 3. PROJECT REQUESTS TABLE (submissions from the "Send Project Request" form)
-- ---------------------------------------------------------------------
create table if not exists project_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  package_name text,
  videos_needed text,
  message text,
  reference_link text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 4. Keep updated_at current automatically
-- ---------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists projects_set_updated_at on projects;
create trigger projects_set_updated_at
  before update on projects
  for each row execute function set_updated_at();

drop trigger if exists packages_set_updated_at on packages;
create trigger packages_set_updated_at
  before update on packages
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------
-- 5. ROW LEVEL SECURITY
--    Public (anonymous) visitors can only READ projects/packages and
--    INSERT project requests. Only signed-in users (the admin) can
--    write to projects/packages, or read project requests.
-- ---------------------------------------------------------------------
alter table projects enable row level security;
alter table packages enable row level security;
alter table project_requests enable row level security;

-- Anyone can view projects
drop policy if exists "Public can view projects" on projects;
create policy "Public can view projects"
  on projects for select
  using (true);

-- Only logged-in users (the admin) can add/edit/delete projects
drop policy if exists "Authenticated users manage projects" on projects;
create policy "Authenticated users manage projects"
  on projects for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Anyone can view active packages
drop policy if exists "Public can view active packages" on packages;
create policy "Public can view active packages"
  on packages for select
  using (true);

drop policy if exists "Authenticated users manage packages" on packages;
create policy "Authenticated users manage packages"
  on packages for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Anyone can submit a project request, but only the admin can read them
drop policy if exists "Public can submit project requests" on project_requests;
create policy "Public can submit project requests"
  on project_requests for insert
  with check (true);

drop policy if exists "Authenticated users read project requests" on project_requests;
create policy "Authenticated users read project requests"
  on project_requests for select
  using (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------
-- 6. STORAGE BUCKETS
--    Run this section too — it creates the buckets used for uploads and
--    makes their files publicly readable (so <video>/<img> tags can load
--    them), while only signed-in users can upload/delete.
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values
  ('videos', 'videos', true),
  ('thumbnails', 'thumbnails', true),
  ('assets', 'assets', true)
on conflict (id) do nothing;

drop policy if exists "Public can view files" on storage.objects;
create policy "Public can view files"
  on storage.objects for select
  using (bucket_id in ('videos', 'thumbnails', 'assets'));

drop policy if exists "Authenticated users upload files" on storage.objects;
create policy "Authenticated users upload files"
  on storage.objects for insert
  with check (
    bucket_id in ('videos', 'thumbnails', 'assets')
    and auth.role() = 'authenticated'
  );

drop policy if exists "Authenticated users update files" on storage.objects;
create policy "Authenticated users update files"
  on storage.objects for update
  using (
    bucket_id in ('videos', 'thumbnails', 'assets')
    and auth.role() = 'authenticated'
  );

drop policy if exists "Authenticated users delete files" on storage.objects;
create policy "Authenticated users delete files"
  on storage.objects for delete
  using (
    bucket_id in ('videos', 'thumbnails', 'assets')
    and auth.role() = 'authenticated'
  );
