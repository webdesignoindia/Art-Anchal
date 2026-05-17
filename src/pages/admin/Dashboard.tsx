import type { AdminProduct, Order } from './types';

interface Props {
  products: AdminProduct[];
  orders: Order[];
  onTabChange: (tab: string) => void;
}

const fmt = (n: number) => '₹' + Number(n).toLocaleString('en-IN');
const todayStr = () => new Date().toISOString().slice(0, 10);

export function Dashboard({ products, orders, onTabChange }: Props) {
  const today = todayStr();
  const todayOrders = orders.filter(o => o.order_date === today);
  const todaySales = todayOrders.reduce((s, o) => s + o.total_amount, 0);
  const totalSales = orders.reduce((s, o) => s + o.total_amount, 0);
  const totalCollected = orders.reduce((s, o) => s + o.paid_amount, 0);
  const outstanding = totalSales - totalCollected;
  const lowStock = products.filter(p => p.stock_qty <= 5 && p.is_active);
  const recentOrders = orders.slice(0, 5);
  const cashToday = todayOrders.filter(o => o.payment_mode === 'Cash').reduce((s, o) => s + o.paid_amount, 0);
  const upiToday = todayOrders.filter(o => o.payment_mode === 'UPI').reduce((s, o) => s + o.paid_amount, 0);

  const statusBg = (s: string) =>
    s === 'Paid' ? 'bg-green-50 text-green-700' :
    s === 'Partial' ? 'bg-amber-50 text-amber-700' :
    'bg-red-50 text-red-700';

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto">
      <div className="bg-gray-900 rounded-2xl p-5 text-white mb-4">
        <div className="text-[10px] font-medium opacity-50 uppercase tracking-wider mb-2">Today's Sales</div>
        <div className="text-4xl font-bold tracking-tight">{fmt(todaySales)}</div>
        <div className="text-xs opacity-50 mt-1.5">
          {todayOrders.length > 0
            ? `Cash ${fmt(cashToday)}  ·  UPI ${fmt(upiToday)}  ·  ${todayOrders.length} bill${todayOrders.length !== 1 ? 's' : ''}`
            : 'No bills recorded today'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 mb-4">
        {[
          { label: 'Total Sales', value: fmt(totalSales), sub: `${orders.length} bills`, color: 'text-green-600' },
          { label: 'Collected', value: fmt(totalCollected), sub: 'Received', color: 'text-blue-600' },
          { label: 'Credit Due', value: fmt(outstanding), sub: `${orders.filter(o => o.status !== 'Paid').length} pending`, color: 'text-red-600' },
          { label: 'Stock', value: String(products.reduce((s, p) => s + p.stock_qty, 0)), sub: `${products.length} SKUs`, color: 'text-gray-900' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-3.5 border border-gray-100">
            <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider mb-1.5">{s.label}</div>
            <div className={`text-xl font-bold tracking-tight ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-gray-400 mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-semibold text-gray-900">Recent Bills</div>
          {orders.length > 0 && (
            <button onClick={() => onTabChange('billing')}
              className="text-[11px] text-gray-500 border border-gray-200 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors">
              See all
            </button>
          )}
        </div>
        {recentOrders.length === 0 ? (
          <div className="text-center py-6 text-gray-400 text-sm">No bills yet · Tap Bill below to record a sale</div>
        ) : recentOrders.map(o => (
          <div key={o.id} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${o.status === 'Paid' ? 'bg-green-500' : o.status === 'Partial' ? 'bg-amber-500' : 'bg-red-500'}`} />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate">{o.customer_name}</div>
              <div className="text-[11px] text-gray-500">#{o.id} · {o.order_date} · {o.payment_mode}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold">{fmt(o.total_amount)}</div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusBg(o.status)}`}>{o.status}</span>
            </div>
          </div>
        ))}
      </div>

      {lowStock.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-3">
          <div className="text-xs font-semibold text-amber-700 mb-2">⚠ Low Stock Alert</div>
          {lowStock.map(p => (
            <div key={p.id} className="flex items-center gap-3 py-2 border-b border-amber-100 last:border-0">
              <div className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{p.name}</div>
                <div className="text-[11px] text-gray-500">{p.category}</div>
              </div>
              <div className="text-sm font-bold text-amber-700">{p.stock_qty} pcs</div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        {[
          { label: 'New Bill', sub: 'Record a sale', tab: 'billing' },
          { label: 'Add Product', sub: 'Update inventory', tab: 'products' },
          { label: 'Customers', sub: 'Manage buyers', tab: 'customers' },
          { label: 'Reports', sub: 'View analytics', tab: 'reports' },
        ].map(a => (
          <button key={a.label} onClick={() => onTabChange(a.tab)}
            className="bg-white border border-gray-100 rounded-xl p-3.5 text-left hover:border-gray-300 transition-colors cursor-pointer">
            <div className="text-sm font-semibold text-gray-900 mb-0.5">{a.label}</div>
            <div className="text-[11px] text-gray-400">{a.sub}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
