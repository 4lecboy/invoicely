-- ===========================================================
-- EXTENSIONS
-- ===========================================================
create extension if not exists citext;          -- For case-insensitive email
create extension if not exists moddatetime;     -- For automatic updated_at timestamps

-- ===========================================================
-- PROFILES TABLE
-- ===========================================================
create table public.profiles (
  id uuid not null references auth.users on delete cascade primary key,
  full_name text default 'Anonymous',
  email citext unique,
  avatar_url text default 'https://example.com/default-avatar.png',
  company_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies
create policy "Users can insert own profile"
  on profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Users can delete own profile"
  on profiles for delete
  using (auth.uid() = id);

create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

-- Trigger function for new users
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if exists(select 1 from public.profiles where id = new.id) then
    return new;
  end if;

  insert into public.profiles (id, full_name, avatar_url, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'Anonymous'),
    coalesce(new.raw_user_meta_data->>'avatar_url', 'https://example.com/default-avatar.png'),
    new.raw_user_meta_data->>'email'
  );
  return new;
end;
$$;

-- Trigger for Supabase Auth
create trigger trg_on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();

-- Trigger for updated_at
create trigger trg_update_profiles_updated_at
before update on public.profiles
for each row
execute procedure moddatetime(updated_at);

-- ===========================================================
-- CLIENTS TABLE
-- ===========================================================
create table public.clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  name text not null,
  email citext,
  company text,
  phone text,
  address text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.clients enable row level security;

-- Policies
create policy "Users can insert own clients"
  on clients for insert
  with check (auth.uid() = user_id);

create policy "Users can view own clients"
  on clients for select
  using (auth.uid() = user_id);

create policy "Users can update own clients"
  on clients for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own clients"
  on clients for delete
  using (auth.uid() = user_id);

-- Trigger for updated_at
create trigger trg_update_clients_updated_at
before update on public.clients
for each row
execute procedure moddatetime(updated_at);

-- ===========================================================
-- INVOICES TABLE
-- ===========================================================
create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  invoice_number text unique not null,
  issue_date date default current_date,
  due_date date,
  items jsonb not null,                -- [{description, quantity, price}]
  subtotal numeric(10,2) default 0,
  tax numeric(10,2) default 0,
  total numeric(10,2) default 0,
  currency text default 'USD',
  status text default 'draft',         -- draft, sent, paid, cancelled
  payment_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.invoices enable row level security;

-- Policies
create policy "Users can insert own invoices"
  on invoices for insert
  with check (auth.uid() = user_id);

create policy "Users can view own invoices"
  on invoices for select
  using (auth.uid() = user_id);

create policy "Users can update own invoices"
  on invoices for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own invoices"
  on invoices for delete
  using (auth.uid() = user_id);

-- Trigger for updated_at
create trigger trg_update_invoices_updated_at
before update on public.invoices
for each row
execute procedure moddatetime(updated_at);

-- ===========================================================
-- INDEXES FOR PERFORMANCE
-- ===========================================================
create index idx_clients_user_id on public.clients(user_id);
create index idx_invoices_user_id on public.invoices(user_id);
create index idx_invoices_client_id on public.invoices(client_id);
