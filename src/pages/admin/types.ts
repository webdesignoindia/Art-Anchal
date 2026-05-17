export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  cost_price: number;
  category: string;
  saree_type: string;
  description: string;
  images: string[];
  features: string[];
  material: string;
  craft: string;
  styling: string;
  stock_qty: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminCustomer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  notes: string;
  created_at: string;
}

export interface AdminSupplier {
  id: string;
  name: string;
  phone: string;
  city: string;
  created_at: string;
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  discount_pct: number;
  line_total: number;
}

export interface Order {
  id: number;
  customer_name: string;
  customer_phone: string;
  customer_id?: string;
  source: 'retail' | 'online';
  payment_mode: string;
  subtotal: number;
  discount_amount: number;
  gst_amount: number;
  total_amount: number;
  paid_amount: number;
  status: 'Paid' | 'Partial' | 'Unpaid';
  order_date: string;
  notes: string;
  items?: OrderItem[];
  created_at: string;
}

export interface Purchase {
  id: string;
  supplier_id?: string;
  supplier_name: string;
  product_id?: string;
  item_name: string;
  quantity: number;
  cost_per_unit: number;
  total_amount: number;
  paid_amount: number;
  status: 'Paid' | 'Partial' | 'Unpaid';
  purchase_date: string;
  created_at: string;
}
