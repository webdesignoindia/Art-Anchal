import type { AdminProduct, Order, Purchase } from './types';

interface Props {
  products: AdminProduct[];
  orders: Order[];
  purchases: Purchase[];
}

const fmt = (n: number) => '₹' + Number(n).toLocaleString('en-IN');
const PAY_MODES = ['Cash', 'UPI', 'Card', 'Credit'];

export function Reports({ products, orders, purchases }: Props) {
  const totalSales = orders.reduce((s, o) => s + o.total_amount, 0);
  const totalCollected = orders.reduce((s, o) => s + o.paid_amount, 0);
  const outstanding = totalSales - totalCollected;
  const totalGST = orders.reduce((s, o) => s + o.gst_amount, 0);
  const totalDisc = orders.reduce((s, o) => s + o.discount_amount, 0);
  const totalPurchases = purchases.reduce((s, p) => s + p.total_amount, 0);
  const grossProfit = totalSales - totalPurchases;

  const modeBreak = PAY_MODES.map(m => ({
    mode: m,
    total: orders.filter(o => o.payment_mode === m).reduce((s, o) => s + o.paid_amount, 0),
    count: orders.filter(o => o.payment_mode === m).length,
  })).filter(m => m.count > 0);
  const maxMode = modeBreak.length > 0 ? Math.max(...modeBreak.map(m => m.total), 1) : 1;

  const catSales: Record<string, number> = {};
  orders.forEach(o => (o.items || []).forEach(it => {
    const prod = products.find(p => p.id === it.product_id);
    const cat = prod?.category || 'Other';
    catSales[cat] = (catSales[cat] || 0) + it.line_total;
  }));
  const catEntries = Object.entries(catSales).sort((a, b) => b[1] - a[1]);
  const maxCat = catEntries.length > 0 ? Math.max(...catEntries.map(e => e[1]), 1) : 1;

  const walkInOrders = orders.filter(o => o.customer_name === 'Walk-in Customer');
  const regOrders = orders.filter(o => o.customer_name !== 'Walk-in Customer');

  const stockByCategory = products.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = { val: 0, pcs: 0 };
    acc[p.category].val += p.stock_qty * p.price;
    acc[p.category].pcs += p.stock_qty;
    return acc;
  }, {} as Record<string, { val: number; pcs: number }>);

  if (orders.length === 0 && products.length === 0) {
    return (
      <div className="p-4 pb-24 max-w-lg mx-auto">
        <div className="text-center py-16">
          <div className="text-4xl mb-3 opacity-30">📊</div>
          <div className="text-base font-semibold text-gray-900 mb-1">No data yet</div>
          <div className="text-sm text-gray-400">Reports appear once you add stock and start billing</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto">
      <div className="bg-gray-900 text-white rounded-2xl p-5 mb-4">
        <div className="text-[10px] font-medium opacity-50 uppercase tracking-wider mb-2">Gross Profit (Est.)</div>
        <div className="text-4xl font-bold tracking-tight">{fmt(grossProfit)}</div>
        <div className="text-xs opacity-50 mt-1.5">
          Sales {fmt(totalSales)}  ·  Purchases {fmt(totalPurchases)}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-3">
        <div className="text-sm font-semibold text-gray-900 mb-3">Profit & Loss</div>
        {[
          { label: 'Total Sales (incl. GST)', value: totalSales, color: 'text-green-600' },
          { label: 'GST Collected', value: totalGST, color: 'text-gray-500' },
          { label: 'Discounts Given', value: totalDisc, color: 'text-amber-600' },
          { label: 'Stock Purchases', value: totalPurchases, color: 'text-red-600' },
          { label: 'Gross Profit', value: grossProfit, color: grossProfit >= 0 ? 'text-gray-900 font-bold' : 'text-red-600 font-bold' },
          { label: 'Cash Collected', value: totalCollected, color: 'text-green-600' },
          { label: 'Credit Outstanding', value: outstanding, color: outstanding > 0 ? 'text-red-600' : 'text-gray-500' },
        ].map(r => (
          <div key={r.label} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
            <span className="text-sm text-gray-500">{r.label}</span>
            <span className={`text-sm ${r.color}`}>{fmt(r.value)}</span>
          </div>
        ))}
      </div>

      {orders.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-3">
          <div className="text-sm font-semibold text-gray-900 mb-3">Customer Split</div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-[10px] text-gray-400 mb-1 uppercase tracking-wider">Walk-In</div>
              <div className="text-lg font-bold tracking-tight">{fmt(walkInOrders.reduce((s, o) => s + o.total_amount, 0))}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">{walkInOrders.length} bill{walkInOrders.length !== 1 ? 's' : ''}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-[10px] text-gray-400 mb-1 uppercase tracking-wider">Registered</div>
              <div className="text-lg font-bold text-blue-600 tracking-tight">{fmt(regOrders.reduce((s, o) => s + o.total_amount, 0))}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">{regOrders.length} bill{regOrders.length !== 1 ? 's' : ''}</div>
            </div>
          </div>
        </div>
      )}

      {modeBreak.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-3">
          <div className="text-sm font-semibold text-gray-900 mb-3">Collections by Mode</div>
          {modeBreak.map(m => (
            <div key={m.mode} className="mb-3 last:mb-0">
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-gray-900">{m.mode} <span className="text-gray-400 text-[11px]">({m.count})</span></span>
                <span className="font-semibold">{fmt(m.total)}</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gray-900 rounded-full transition-all duration-500"
                  style={{ width: `${Math.round((m.total / maxMode) * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {catEntries.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-3">
          <div className="text-sm font-semibold text-gray-900 mb-3">Sales by Category</div>
          {catEntries.map(([cat, val]) => (
            <div key={cat} className="mb-3 last:mb-0">
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-gray-900">{cat}</span>
                <span className="font-semibold">{fmt(val)}</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gray-900 rounded-full transition-all duration-500"
                  style={{ width: `${Math.round((val / maxCat) * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {Object.keys(stockByCategory).length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-3">
          <div className="text-sm font-semibold text-gray-900 mb-3">Current Stock Value</div>
          {Object.entries(stockByCategory).map(([cat, { val, pcs }]) => (
            <div key={cat} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
              <span className="text-sm text-gray-900">{cat} <span className="text-gray-400 text-[11px]">({pcs} pcs)</span></span>
              <span className="font-semibold text-sm">{fmt(val)}</span>
            </div>
          ))}
        </div>
      )}

      <div className="text-center text-[11px] text-gray-300 py-2">Art & Anchal · Heritage Banaras</div>
    </div>
  );
}
