-- ============================================================
-- Art & Anchal — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- PRODUCTS
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  price numeric(12,2) not null default 0,
  cost_price numeric(12,2) default 0,
  category text not null default 'Banarasi Silk',
  saree_type text default 'Banarasi Silk',
  description text default '',
  images jsonb default '[]'::jsonb,
  features jsonb default '[]'::jsonb,
  material text default '',
  craft text default '',
  styling text default '',
  stock_qty integer default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- CUSTOMERS
create table if not exists public.customers (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text default '',
  email text default '',
  address text default '',
  city text default '',
  notes text default '',
  created_at timestamptz default now()
);

-- SUPPLIERS
create table if not exists public.suppliers (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text default '',
  city text default '',
  created_at timestamptz default now()
);

-- ORDERS
create table if not exists public.orders (
  id bigserial primary key,
  customer_name text not null default 'Walk-in Customer',
  customer_phone text default '',
  customer_id uuid references public.customers(id),
  source text default 'retail',
  payment_mode text default 'Cash',
  subtotal numeric(12,2) default 0,
  discount_amount numeric(12,2) default 0,
  gst_amount numeric(12,2) default 0,
  total_amount numeric(12,2) default 0,
  paid_amount numeric(12,2) default 0,
  status text default 'Paid',
  order_date date default current_date,
  notes text default '',
  created_at timestamptz default now()
);

-- ORDER ITEMS
create table if not exists public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id bigint references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  product_name text not null,
  quantity integer default 1,
  unit_price numeric(12,2) not null,
  discount_pct numeric(5,2) default 0,
  line_total numeric(12,2) not null,
  created_at timestamptz default now()
);

-- PURCHASES
create table if not exists public.purchases (
  id uuid default gen_random_uuid() primary key,
  supplier_id uuid references public.suppliers(id),
  supplier_name text not null,
  product_id uuid references public.products(id),
  item_name text not null,
  quantity integer default 1,
  cost_per_unit numeric(12,2) not null default 0,
  total_amount numeric(12,2) not null default 0,
  paid_amount numeric(12,2) default 0,
  status text default 'Paid',
  purchase_date date default current_date,
  created_at timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.products enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.purchases enable row level security;
alter table public.suppliers enable row level security;

-- Products: public can read active ones; authenticated can do everything
create policy "Public can view active products"
  on public.products for select
  using (is_active = true);

create policy "Authenticated users can manage products"
  on public.products for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- All other tables: authenticated only
create policy "Authenticated users can manage customers"
  on public.customers for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can manage orders"
  on public.orders for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can manage order_items"
  on public.order_items for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can manage purchases"
  on public.purchases for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can manage suppliers"
  on public.suppliers for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================
-- SEED: Existing products from the site
-- ============================================================
insert into public.products
  (name, slug, price, cost_price, category, saree_type, description, images, features, material, craft, styling, stock_qty, is_active)
values
(
  'The Maroon Maharani Saree', 'maroon-maharani-saree',
  125000, 75000, 'Bridal', 'Banarasi Silk',
  'A masterpiece of Banarasi handloom, this saree features intricate Shikargah motifs woven in pure gold zari on a rich mulberry silk base.',
  '["/src/assets/images/hero_maroon_saree_1778977647210.png","/src/assets/images/textile_texture_gold_1778977666176.png"]'::jsonb,
  '["Handwoven over 4 months","Pure 24k Gold Zari","Authentic Mulberry Katan Silk"]'::jsonb,
  'Pure Katan Silk', 'Kadhua Handloom',
  'Pair with heritage polki jewellery and a clean bun for a timeless bridal look.',
  3, true
),
(
  'Emerald Heritage Zari', 'emerald-heritage-zari',
  85000, 50000, 'Katan Silk', 'Banarasi Silk',
  'Deep emerald base with micro-zari bootis. Uses the antique Tanchoi technique to create a multi-dimensional texture.',
  '["/src/assets/images/emerald_palace_saree_1778978259528.png"]'::jsonb,
  '["Lightweight handloom","Antique Zari Finish","Elegant Drape"]'::jsonb,
  'Pure Silk', 'Tanchoi Weave',
  'Minimal emerald studs and a loose braid will elevate the subtle sophistication of this piece.',
  5, true
),
(
  'Peach Mist Organza', 'peach-mist-organza',
  55000, 30000, 'Organza', 'Organza',
  'A lightweight marvel. Hand-painted floral motifs outlined with fine silver zari on a sheer peach organza base.',
  '["/src/assets/images/peach_organza_saree_1778978292600.png"]'::jsonb,
  '["Sheer Sheen","Hand-painted Details","Silver Zari Border"]'::jsonb,
  'Silk Organza', 'Meenakari Hand-paint',
  'Perfect for day weddings. Style with pearls and fresh flowers in your hair.',
  8, true
),
(
  'Champagne Gold Minimalist', 'champagne-gold-minimalist',
  45000, 25000, 'Contemporary', 'Georgette',
  'Subtle shimmer for the modern cocktail evening. A champagne silk base with a contemporary geometric zari border.',
  '["https://images.unsplash.com/photo-1610030469915-9a88ed4835af?auto=format&fit=crop&q=80&w=800"]'::jsonb,
  '["Modern Minimal Design","High Lustre Finish","Signature Border"]'::jsonb,
  'Silk Blend', 'Jacquard Handloom',
  'Wear with a modern halter-neck blouse and statement gold cuffs for a fusion look.',
  4, true
),
(
  'The Royal Blue Shikargah', 'royal-blue-shikargah',
  155000, 90000, 'Bridal', 'Banarasi Silk',
  'A collector''s item. The traditional Shikargah motif represents the peak of Banarasi complexity. Woven in silver and gold zari.',
  '["https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&q=80&w=800"]'::jsonb,
  '["Limited Edition","Bicolor Zari","Heavy Heritage Weight"]'::jsonb,
  'Heavy Katan Silk', 'Master Kadhua',
  'Reserve this for the most grand celebrations. Style with heirloom diamonds.',
  2, true
)
on conflict (slug) do nothing;
