-- Enable UUID extension
create extension if not exists "uuid-ossp" schema extensions;

-- 1. Table: blog_authors
create table if not exists blog_authors (
  id          uuid primary key default extensions.uuid_generate_v4(),
  name        text not null,
  avatar_url  text,
  designation text,
  bio         text,
  created_at  timestamptz not null default now()
);

-- 2. Table: blog_categories
create table if not exists blog_categories (
  id          uuid primary key default extensions.uuid_generate_v4(),
  name        text not null unique,
  slug        text not null unique,
  description text,
  is_enabled  boolean not null default true,
  created_at  timestamptz not null default now()
);

insert into blog_categories (name, slug, description) values
  ('Technology',  'technology',  'POS, QR ordering, and digital restaurant tools'),
  ('Operations',  'operations',  'Kitchen, inventory, and waste management'),
  ('Management',  'management',  'Staffing, menus, and financial controls'),
  ('Marketing',   'marketing',   'CRM, campaigns, and customer loyalty')
on conflict (slug) do nothing;

-- 3. Table: blog_tags
create table if not exists blog_tags (
  id         uuid primary key default extensions.uuid_generate_v4(),
  name       text not null unique,
  slug       text not null unique,
  created_at timestamptz not null default now()
);

insert into blog_tags (name, slug) values
  ('POS Systems',            'pos-systems'),
  ('Inventory',              'inventory'),
  ('Billing',                'billing'),
  ('Restaurant Operations',  'restaurant-operations'),
  ('QR Ordering',            'qr-ordering')
on conflict (slug) do nothing;

-- 4. Table: blog_posts
create table if not exists blog_posts (
  id                   uuid primary key default extensions.uuid_generate_v4(),
  title                text not null,
  slug                 text not null unique,
  description          text,
  content              text,
  cover_image          text,
  gallery_images       text[]   not null default '{}',
  videos               text[]   not null default '{}',
  category_id          uuid     references blog_categories(id) on delete set null,
  author_id            uuid     references blog_authors(id) on delete set null,
  is_featured          boolean  not null default false,
  status               text     not null default 'Draft'
                       check (status in (
                         'Draft','Pending Review','Approved',
                         'Scheduled','Published','Archived','Deleted'
                       )),
  seo_title            text,
  seo_description      text,
  canonical_url        text,
  og_image             text,
  keywords             text[]   not null default '{}',
  robots               text     not null default 'index, follow',
  faq_schema           jsonb    not null default '[]',
  reading_time         text,
  created_by           text,
  last_edited_by       text,
  approved_by          text,
  timezone             text     not null default 'Asia/Kolkata',
  published_at         timestamptz,
  scheduled_publish_at timestamptz,
  archived_at          timestamptz,
  deleted_at           timestamptz,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

-- 5. Table: blog_post_tags
create table if not exists blog_post_tags (
  blog_post_id uuid not null references blog_posts(id) on delete cascade,
  tag_id       uuid not null references blog_tags(id)  on delete cascade,
  primary key  (blog_post_id, tag_id)
);

-- 6. Table: blog_revisions
create table if not exists blog_revisions (
  id                 uuid primary key default extensions.uuid_generate_v4(),
  blog_post_id       uuid not null references blog_posts(id) on delete cascade,
  version_number     integer not null,
  edited_by          text not null,
  summary_of_changes text,
  snapshot           jsonb not null,
  created_at         timestamptz not null default now()
);

-- 7. Table: blog_comments
create table if not exists blog_comments (
  id           uuid primary key default extensions.uuid_generate_v4(),
  blog_post_id uuid not null references blog_posts(id) on delete cascade,
  author_name  text not null,
  comment_text text not null,
  is_approved  boolean not null default false,
  created_at   timestamptz not null default now()
);

-- Enable RLS
alter table blog_authors    enable row level security;
alter table blog_categories enable row level security;
alter table blog_tags       enable row level security;
alter table blog_posts      enable row level security;
alter table blog_post_tags  enable row level security;
alter table blog_revisions  enable row level security;
alter table blog_comments   enable row level security;

-- Enable Read Policies
drop policy if exists "Public: read authors" on blog_authors;
create policy "Public: read authors" on blog_authors for select using (true);

drop policy if exists "Public: read enabled categories" on blog_categories;
create policy "Public: read enabled categories" on blog_categories for select using (is_enabled = true);

drop policy if exists "Public: read tags" on blog_tags;
create policy "Public: read tags" on blog_tags for select using (true);

drop policy if exists "Public: read published blog posts" on blog_posts;
create policy "Public: read published blog posts" on blog_posts for select
  using (status = 'Published' and deleted_at is null);

drop policy if exists "Public: read tags of published posts" on blog_post_tags;
create policy "Public: read tags of published posts" on blog_post_tags for select using (
  exists (
    select 1 from blog_posts bp
    where bp.id = blog_post_tags.blog_post_id
      and bp.status = 'Published'
      and bp.deleted_at is null
  )
);

drop policy if exists "Public: read approved blog comments" on blog_comments;
create policy "Public: read approved blog comments" on blog_comments for select
  using (is_approved = true);
