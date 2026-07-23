# Ordrji — Supabase Database Setup

**One Supabase project. All data in one place. Each section of the website gets its own table.**

---

## Create Your Project

1. Go to [supabase.com](https://supabase.com) → **New Project**
2. Name it `ordrji-landing`
3. Choose a strong database password and save it
4. Select region closest to your users (e.g. `ap-south-1` for India)
5. Wait ~2 minutes for it to provision

---

## Environment Variables

Copy these from **Project Settings → API** and add to your `.env`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> `NEXT_PUBLIC_*` keys are safe to use in the browser.
> `SUPABASE_SERVICE_KEY` is **server-only** — never expose it to the client.

---

## All Tables — Quick Reference

| # | Table | What It Stores | Used By |
|---|---|---|---|
| 1 | `demo_leads` | Book Demo form submissions | `/api/book-demo` |
| 2 | `restaurant_registrations` | Register Restaurant form data | `/api/register-restaurant` |
| 3 | `restaurant_dishes` | Dishes linked to each restaurant | `/api/register-restaurant` |
| 4 | `blog_posts` | Blog articles (replaces `blogs.json`) | `/api/blogs` |
| 5 | `blog_authors` | Blog author profiles | `/api/authors` |
| 6 | `blog_categories` | Blog categories | `/api/categories` |
| 7 | `blog_tags` | Blog tags | `/api/tags` |
| 8 | `blog_post_tags` | Many-to-many: posts ↔ tags | `/api/blogs` |
| 9 | `blog_revisions` | Version history for each post | `/api/revisions` |
| 10 | `activity_logs` | Admin action audit trail | All admin APIs |
| 11 | `media_assets` | Uploaded images/files | `/api/media` |
| 12 | `blog_comments` | Blog post comments | `/blog/[slug]` |
| 13 | `admin_users` | Admin login accounts | `/api/auth/login` |
| 14 | `coverage_searches` | Hero location widget analytics | `/api/coverage-search` |
| 15 | `instagram_posts` | Cached Instagram feed data | `/api/instagram` |
| 16 | `contact_messages` | Contact page form submissions | `/api/contact` |

---

## SQL — Run All in Supabase SQL Editor

Open your project → **SQL Editor** → paste and run each block in order.

---

### Step 1 — Enable UUID extension

```sql
create extension if not exists "uuid-ossp";
```

---

### Step 2 — Table: `demo_leads`
*Book Demo form — every submission saved here + emailed*

```sql
create table demo_leads (
  id              uuid primary key default uuid_generate_v4(),
  full_name       text not null,
  email           text not null,
  phone           text not null,
  location        text not null,
  restaurant_name text,
  message         text,
  status          text not null default 'new'
                  check (status in ('new','contacted','demo_scheduled','converted','lost')),
  notes           text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
```

---

### Step 3 — Table: `restaurant_registrations`
*Register Restaurant form — all 20+ fields*

```sql
create table restaurant_registrations (
  id                uuid primary key default uuid_generate_v4(),
  restaurant_name   text not null,
  owner_name        text not null,
  email             text not null,
  phone             text not null,
  address           text not null,
  city              text not null,
  district          text not null,
  state             text not null,
  pincode           text not null,
  cuisine_type      text not null,
  restaurant_type   text not null check (restaurant_type in ('veg','nonveg','both')),
  logo_url          text,
  cover_image_url   text,
  restaurant_image_1_url text,
  restaurant_image_2_url text,
  swiggy_url        text,
  zomato_url        text,
  opening_time      text not null,
  closing_time      text not null,
  avg_cost_for_two  integer not null,
  gst_number        text,
  fssai_number      text,
  website           text,
  review_status     text not null default 'pending'
                    check (review_status in ('pending','under_review','approved','rejected','live')),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
```

#### SQL Migration (For existing tables)
If you already created the table, run the following SQL command in your **Supabase Dashboard SQL Editor** to add these two image columns:
```sql
alter table restaurant_registrations 
add column restaurant_image_1_url text,
add column restaurant_image_2_url text;
```

---

### Step 4 — Table: `restaurant_dishes`
*Popular dishes for each registered restaurant (searchable)*

```sql
create table restaurant_dishes (
  id                         uuid primary key default uuid_generate_v4(),
  restaurant_registration_id uuid not null
                             references restaurant_registrations(id) on delete cascade,
  dish_name                  text not null,
  created_at                 timestamptz not null default now()
);

create index idx_dishes_restaurant on restaurant_dishes(restaurant_registration_id);
create index idx_dishes_name       on restaurant_dishes(dish_name);
```

---

### Step 5 — Table: `blog_authors`

```sql
create table blog_authors (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  avatar_url  text,
  designation text,
  bio         text,
  created_at  timestamptz not null default now()
);
```

---

### Step 6 — Table: `blog_categories`

```sql
create table blog_categories (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null unique,
  slug        text not null unique,
  description text,
  is_enabled  boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Default categories
insert into blog_categories (name, slug, description) values
  ('Technology',  'technology',  'POS, QR ordering, and digital restaurant tools'),
  ('Operations',  'operations',  'Kitchen, inventory, and waste management'),
  ('Management',  'management',  'Staffing, menus, and financial controls'),
  ('Marketing',   'marketing',   'CRM, campaigns, and customer loyalty');
```

---

### Step 7 — Table: `blog_tags`

```sql
create table blog_tags (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null unique,
  slug       text not null unique,
  created_at timestamptz not null default now()
);

-- Default tags
insert into blog_tags (name, slug) values
  ('POS Systems',            'pos-systems'),
  ('Inventory',              'inventory'),
  ('Billing',                'billing'),
  ('Restaurant Operations',  'restaurant-operations'),
  ('QR Ordering',            'qr-ordering');
```

---

### Step 8 — Table: `blog_posts`
*The main blog CMS table — replaces `src/data/db/blogs.json`*

```sql
create table blog_posts (
  id                   uuid primary key default uuid_generate_v4(),
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

create index idx_blog_posts_slug       on blog_posts(slug);
create index idx_blog_posts_status     on blog_posts(status);
create index idx_blog_posts_featured   on blog_posts(is_featured);
create index idx_blog_posts_published  on blog_posts(published_at desc nulls last);
```

---

### Step 9 — Table: `blog_post_tags`
*Junction table — one post can have many tags*

```sql
create table blog_post_tags (
  blog_post_id uuid not null references blog_posts(id) on delete cascade,
  tag_id       uuid not null references blog_tags(id)  on delete cascade,
  primary key  (blog_post_id, tag_id)
);
```

---

### Step 10 — Table: `blog_revisions`
*Full snapshot of every blog post version*

```sql
create table blog_revisions (
  id                 uuid primary key default uuid_generate_v4(),
  blog_post_id       uuid not null references blog_posts(id) on delete cascade,
  version_number     integer not null,
  edited_by          text not null,
  summary_of_changes text,
  snapshot           jsonb not null,
  created_at         timestamptz not null default now()
);

create index idx_revisions_post on blog_revisions(blog_post_id);
```

---

### Step 11 — Table: `activity_logs`
*Admin action audit trail — replaces `src/data/db/logs.json`*

```sql
create table activity_logs (
  id         uuid primary key default uuid_generate_v4(),
  user_name  text not null,
  user_role  text not null,
  action     text not null,
  ip_address text,
  device     text,
  browser    text,
  created_at timestamptz not null default now()
);

create index idx_logs_user on activity_logs(user_name);
create index idx_logs_date on activity_logs(created_at desc);
```

---

### Step 12 — Table: `media_assets`
*Uploaded images/files — replaces `src/data/db/media.json`*

```sql
create table media_assets (
  id          uuid primary key default uuid_generate_v4(),
  url         text not null,
  name        text not null,
  mime_type   text not null default 'image/jpeg',
  size_bytes  integer not null default 0,
  uploaded_by text,
  created_at  timestamptz not null default now()
);
```

---

### Step 13 — Table: `blog_comments`
*Blog post comments — replaces client-side `localStorage`*

```sql
create table blog_comments (
  id           uuid primary key default uuid_generate_v4(),
  blog_post_id uuid not null references blog_posts(id) on delete cascade,
  author_name  text not null,
  comment_text text not null,
  is_approved  boolean not null default false,
  created_at   timestamptz not null default now()
);

create index idx_comments_post on blog_comments(blog_post_id);
```

---

### Step 14 — Table: `admin_users`
*Admin login accounts — replaces `src/data/db/users.json`*

```sql
create table admin_users (
  id           uuid primary key default uuid_generate_v4(),
  email        text not null unique,
  password_hash text not null,   -- use bcrypt, never plain text
  name         text not null,
  role         text not null
               check (role in (
                 'Super Admin','Admin','Restaurant Owner',
                 'Manager','Cashier','Waiter','Visitor'
               )),
  avatar_url   text,
  designation  text,
  bio          text,
  last_login   timestamptz,
  created_at   timestamptz not null default now()
);

create index idx_admin_email on admin_users(email);
```

---

### Step 15 — Table: `coverage_searches`
*Anonymous analytics for the Hero location widget*

```sql
create table coverage_searches (
  id            uuid primary key default uuid_generate_v4(),
  query         text not null,
  location_type text check (location_type in ('state','district','city')),
  state_code    text,
  result_shown  text check (result_shown in ('covered','partial','uncovered')),
  created_at    timestamptz not null default now()
);

create index idx_coverage_state on coverage_searches(state_code);
create index idx_coverage_date  on coverage_searches(created_at desc);
```

---

### Step 16 — Table: `instagram_posts`
*Cached Instagram feed — replaces hardcoded Unsplash images*

```sql
create table instagram_posts (
  id             uuid primary key default uuid_generate_v4(),
  instagram_id   text not null unique,
  media_url      text not null,
  thumbnail_url  text,
  caption        text,
  permalink      text not null,
  media_type     text not null default 'IMAGE'
                 check (media_type in ('IMAGE','VIDEO','CAROUSEL_ALBUM')),
  published_at   timestamptz,
  is_active      boolean not null default true,
  fetched_at     timestamptz not null default now()
);

create index idx_ig_published on instagram_posts(published_at desc);
create index idx_ig_active    on instagram_posts(is_active);
```

---

### Step 17 — Table: `contact_messages`
*Contact page form submissions*

```sql
create table contact_messages (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  email       text not null,
  phone       text,
  location    text,
  subject     text not null,
  message     text not null,
  status      text not null default 'unread'
              check (status in ('unread','read','replied','archived')),
  replied_at  timestamptz,
  created_at  timestamptz not null default now()
);

create index idx_contact_status on contact_messages(status);
create index idx_contact_date   on contact_messages(created_at desc);
```

---

### Step 18 — Auto-update `updated_at` trigger
*Automatically keeps `updated_at` accurate on every row update*

```sql
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_demo_leads_updated_at
  before update on demo_leads
  for each row execute function set_updated_at();

create trigger trg_registrations_updated_at
  before update on restaurant_registrations
  for each row execute function set_updated_at();

create trigger trg_blog_posts_updated_at
  before update on blog_posts
  for each row execute function set_updated_at();
```

---

### Step 19 — Row Level Security (RLS)

```sql
-- Enable RLS on all tables
alter table demo_leads                enable row level security;
alter table restaurant_registrations  enable row level security;
alter table restaurant_dishes         enable row level security;
alter table blog_posts                enable row level security;
alter table blog_comments             enable row level security;
alter table admin_users               enable row level security;
alter table activity_logs             enable row level security;
alter table coverage_searches         enable row level security;
alter table instagram_posts           enable row level security;
alter table contact_messages          enable row level security;

-- PUBLIC read policies (no auth needed)
create policy "Public: read published blog posts"
  on blog_posts for select
  using (status = 'Published' and deleted_at is null);

create policy "Public: read approved blog comments"
  on blog_comments for select
  using (is_approved = true);

create policy "Public: read active Instagram posts"
  on instagram_posts for select
  using (is_active = true);

create policy "Public: read live restaurants"
  on restaurant_registrations for select
  using (review_status in ('approved', 'live'));

create policy "Public: read dishes of live restaurants"
  on restaurant_dishes for select
  using (
    exists (
      select 1 from restaurant_registrations r
      where r.id = restaurant_dishes.restaurant_registration_id
        and r.review_status in ('approved', 'live')
    )
  );

create policy "Public: read enabled categories"
  on blog_categories for select
  using (is_enabled = true);

create policy "Public: read tags"
  on blog_tags for select using (true);

create policy "Public: read authors"
  on blog_authors for select using (true);

-- All writes go through server-side API routes using SUPABASE_SERVICE_KEY
-- The service key bypasses RLS automatically — no additional policies needed for writes
```

---

## Connect to Next.js

### Install

```bash
npm install @supabase/supabase-js
```

### Create client — `src/lib/supabase.ts`

```ts
import { createClient } from '@supabase/supabase-js';

// Browser-safe client (anon key, respects RLS)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Server-only client (service key, bypasses RLS — use only in API routes)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);
```

---

## Example API Route Snippets

### Save a demo lead
```ts
// src/app/api/book-demo/route.ts — add after sending email
import { supabaseAdmin } from '@/lib/supabase';

await supabaseAdmin.from('demo_leads').insert({
  full_name: fullName, email, phone, location,
  restaurant_name: restaurantName, message,
});
```

### Save a restaurant registration
```ts
// src/app/api/register-restaurant/route.ts
import { supabaseAdmin } from '@/lib/supabase';

const { data: reg } = await supabaseAdmin
  .from('restaurant_registrations')
  .insert({ restaurant_name, owner_name, email, phone, ... })
  .select('id').single();

// Save dishes separately
if (selectedDishes.length > 0) {
  await supabaseAdmin.from('restaurant_dishes').insert(
    selectedDishes.map((dish: string) => ({
      restaurant_registration_id: reg.id,
      dish_name: dish,
    }))
  );
}
```

### Log a coverage search
```ts
// src/app/api/coverage-search/route.ts
await supabaseAdmin.from('coverage_searches').insert({
  query, location_type: type, state_code: stateCode, result_shown: result,
});
```

### Search restaurants + dishes together
```sql
-- Run this in SQL Editor to create a helper view
create view restaurant_search_view as
select
  r.id, r.restaurant_name, r.cuisine_type, r.restaurant_type,
  r.city, r.district, r.avg_cost_for_two,
  r.opening_time, r.closing_time,
  r.swiggy_url, r.zomato_url, r.logo_url,
  array_agg(d.dish_name) filter (where d.dish_name is not null) as dishes
from restaurant_registrations r
left join restaurant_dishes d on d.restaurant_registration_id = r.id
where r.review_status in ('approved','live')
group by r.id;
```

Then query it simply:
```ts
const { data } = await supabase
  .from('restaurant_search_view')
  .select('*')
  .ilike('restaurant_name', `%${searchTerm}%`);
```

---

## Hosting — Environment Variables Checklist

Add these in **Vercel → Settings → Environment Variables** before deploying:

```
NEXT_PUBLIC_SUPABASE_URL        ← from Supabase Project Settings → API
NEXT_PUBLIC_SUPABASE_ANON_KEY   ← from Supabase Project Settings → API
SUPABASE_SERVICE_KEY            ← from Supabase Project Settings → API (service_role)
SMTP_HOST                       ← smtp.gmail.com
SMTP_PORT                       ← 465
SMTP_USER                       ← grow@synckraft.in
SMTP_PASS                       ← your Google App Password
INSTAGRAM_ACCESS_TOKEN          ← (when Instagram integration is ready)
```

---

## Migration: JSON Files → Supabase

When you're ready to move off the flat JSON files:

| Current file | → Supabase table |
|---|---|
| `src/data/db/users.json` | `admin_users` |
| `src/data/db/blogs.json` | `blog_posts` |
| `src/data/db/authors.json` | `blog_authors` |
| `src/data/db/categories.json` | `blog_categories` |
| `src/data/db/tags.json` | `blog_tags` |
| `src/data/db/revisions.json` | `blog_revisions` |
| `src/data/db/logs.json` | `activity_logs` |
| `src/data/db/media.json` | `media_assets` |
| `localStorage: ordrji_comments_*` | `blog_comments` |

---

*Last updated: July 2026*
