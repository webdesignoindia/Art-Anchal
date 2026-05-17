import { supabase } from '@/src/lib/supabase';
import type { AdminProduct, AdminCustomer, AdminSupplier, Order, OrderItem, Purchase } from '@/src/pages/admin/types';
import type { Product } from '@/src/lib/constants';

// ── PRODUCTS ────────────────────────────────────────────────

export async function fetchProducts(includeInactive = false): Promise<AdminProduct[]> {
  let query = supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
  if (!includeInactive) query = query.eq('is_active', true);
  const { data, error } = await query;
  if (error) throw error;
  return (data || []) as AdminProduct[];
}

export function mapToDisplayProduct(p: AdminProduct): Product {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: p.price,
    category: p.category,
    description: p.description,
    images: p.images,
    features: p.features,
    material: p.material,
    craft: p.craft,
    styling: p.styling,
  };
}

export async function createProduct(
  data: Omit<AdminProduct, 'id' | 'created_at' | 'updated_at'>
): Promise<AdminProduct> {
  const { data: result, error } = await supabase
    .from('products')
    .insert([data])
    .select()
    .single();
  if (error) throw error;
  return result as AdminProduct;
}

export async function updateProduct(
  id: string,
  data: Partial<AdminProduct>
): Promise<AdminProduct> {
  const { data: result, error } = await supabase
    .from('products')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return result as AdminProduct;
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase
    .from('products')
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}

// ── CUSTOMERS ───────────────────────────────────────────────

export async function fetchCustomers(): Promise<AdminCustomer[]> {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []) as AdminCustomer[];
}

export async function createCustomer(
  data: Omit<AdminCustomer, 'id' | 'created_at'>
): Promise<AdminCustomer> {
  const { data: result, error } = await supabase
    .from('customers')
    .insert([data])
    .select()
    .single();
  if (error) throw error;
  return result as AdminCustomer;
}

// ── SUPPLIERS ───────────────────────────────────────────────

export async function fetchSuppliers(): Promise<AdminSupplier[]> {
  const { data, error } = await supabase
    .from('suppliers')
    .select('*')
    .order('name');
  if (error) throw error;
  return (data || []) as AdminSupplier[];
}

export async function createSupplier(
  data: Omit<AdminSupplier, 'id' | 'created_at'>
): Promise<AdminSupplier> {
  const { data: result, error } = await supabase
    .from('suppliers')
    .insert([data])
    .select()
    .single();
  if (error) throw error;
  return result as AdminSupplier;
}

// ── ORDERS ──────────────────────────────────────────────────

export async function fetchOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []).map((o: any) => ({
    ...o,
    items: o.order_items || [],
  })) as Order[];
}

export async function createOrder(
  order: Omit<Order, 'id' | 'items' | 'created_at'>,
  items: OrderItem[],
  productUpdates: { id: string; stock_qty: number }[]
): Promise<Order> {
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert([order])
    .select()
    .single();
  if (orderError) throw orderError;

  const orderItems = items.map((item) => ({ ...item, order_id: orderData.id }));
  const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
  if (itemsError) throw itemsError;

  for (const update of productUpdates) {
    await supabase
      .from('products')
      .update({ stock_qty: update.stock_qty, updated_at: new Date().toISOString() })
      .eq('id', update.id);
  }

  return { ...orderData, items } as Order;
}

// ── PURCHASES ───────────────────────────────────────────────

export async function fetchPurchases(): Promise<Purchase[]> {
  const { data, error } = await supabase
    .from('purchases')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []) as Purchase[];
}

export async function createPurchase(
  data: Omit<Purchase, 'id' | 'created_at'>,
  productId?: string,
  stockDelta?: number
): Promise<Purchase> {
  const { data: result, error } = await supabase
    .from('purchases')
    .insert([data])
    .select()
    .single();
  if (error) throw error;

  if (productId && stockDelta) {
    const { data: prod } = await supabase
      .from('products')
      .select('stock_qty')
      .eq('id', productId)
      .single();
    if (prod) {
      await supabase
        .from('products')
        .update({
          stock_qty: (prod.stock_qty || 0) + stockDelta,
          updated_at: new Date().toISOString(),
        })
        .eq('id', productId);
    }
  }

  return result as Purchase;
}
