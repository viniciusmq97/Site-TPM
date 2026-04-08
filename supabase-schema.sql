-- Supabase SQL schema for Audiovisual Threads platform

create table if not exists profiles (
  id uuid primary key default uuid_generate_v4(),
  username text not null unique,
  bio text,
  avatar_url text,
  role text not null
);

create table if not exists communities (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  slug text not null unique,
  description text,
  cover_image text
);

create table if not exists posts (
  id uuid primary key default uuid_generate_v4(),
  author_id uuid references profiles(id) on delete cascade,
  community_id uuid references communities(id) on delete cascade,
  title text not null,
  content text not null,
  media_urls jsonb default '[]'::jsonb,
  inserted_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists comments (
  id uuid primary key default uuid_generate_v4(),
  post_id uuid references posts(id) on delete cascade,
  author_id uuid references profiles(id) on delete cascade,
  parent_id uuid references comments(id) on delete cascade,
  content text not null,
  votes_count integer default 0,
  inserted_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists votes (
  user_id uuid references profiles(id) on delete cascade,
  post_id uuid references posts(id) on delete cascade,
  comment_id uuid references comments(id) on delete cascade,
  vote_type text check (vote_type in ('up', 'down')) not null,
  inserted_at timestamptz default now(),
  primary key (user_id, post_id, comment_id)
);

alter table votes add constraint one_target check (
  (post_id is not null)::int + (comment_id is not null)::int = 1
);

-- Enable Row Level Security and public read patterns

alter table profiles enable row level security;
create policy "profiles_select" on profiles for select using (true);
create policy "profiles_manage_self" on profiles for all using (auth.uid() = id) with check (auth.uid() = id);

alter table communities enable row level security;
create policy "communities_select" on communities for select using (true);
create policy "communities_insert" on communities for insert with check (auth.role() = 'authenticated');
create policy "communities_modify" on communities for update using (auth.role() = 'authenticated');

alter table posts enable row level security;
create policy "posts_select" on posts for select using (true);
create policy "posts_insert" on posts for insert with check (auth.uid() = author_id);
create policy "posts_update" on posts for update using (auth.uid() = author_id);
create policy "posts_delete" on posts for delete using (auth.uid() = author_id);

alter table comments enable row level security;
create policy "comments_select" on comments for select using (true);
create policy "comments_insert" on comments for insert with check (auth.uid() = author_id);
create policy "comments_update" on comments for update using (auth.uid() = author_id);
create policy "comments_delete" on comments for delete using (auth.uid() = author_id);

alter table votes enable row level security;
create policy "votes_select" on votes for select using (true);
create policy "votes_insert" on votes for insert with check (auth.uid() = user_id);
create policy "votes_update" on votes for update using (auth.uid() = user_id);
create policy "votes_delete" on votes for delete using (auth.uid() = user_id);
