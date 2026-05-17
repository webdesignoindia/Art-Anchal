import { useState } from 'react';
import type { AdminProduct, AdminCustomer, Order, OrderItem } from './types';
import { createOrder } from '@/src/lib/db';

interface Props {
  products: AdminProduct[];
  customers: AdminCustomer[];
  orders: Order[];
  onRefresh: () => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
  onTabChange: (tab: string) => void;
}

const GST_RATE = 5;
const fmt = (n: number) => '₹' + Number(n).toLocaleString('en-IN');
const todayDate = () => new Date().toISOString().slice(0, 10);

type BillingView = 'list' | 'newbill' | 'receipt';
type CustMode = 'walkin' | 'registered' | 'new';

interface BillItem {
  product_id: string;
  product_name: string;
  unit_price: number;
  quantity: number;
  discount_pct: number;
  line_total: number;
}

export function Billing({ products, customers, orders, onRefresh, showToast, onTabChange }: Props) {
  const [view, setView] = useState<BillingView>('list');
  const [receiptOrder, setReceiptOrder] = useState<(Order & { items: BillItem[] }) | null>(null);
  const [saving, setSaving] = useState(false);

  const [custMode, setCustMode] = useState<CustMode>('walkin');
  const [customerName, setCustomerName] = useState('Walk-in Customer');
  const [customerPhone, setCustomerPhone] = useState('');
  const [billDate, setBillDate] = useState(todayDate());
  const [payMode, setPayMode] = useState('Cash');
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [selProduct, setSelProduct] = useState('');
  const [selQty, setSelQty] = useState(1);
  const [selDisc, setSelDisc] = useState(0);
  const [paidAmt, setPaidAmt] = useState('');

  const subtotal = billItems.reduce((s, i) => s + i.line_total, 0);
  const discountAmount = billItems.reduce((s, i) => s + (i.unit_price * i.quantity * i.discount_pct / 100), 0);
  const gstAmt = Math.round(subtotal * GST_RATE / 100);
  const grandTotal = subtotal + gstAmt;

  const resetForm = () => {
    setBillItems([]); setCustomerName('Walk-in Customer'); setCustomerPhone('');
    setPayMode('Cash'); setPaidAmt(''); setBillDate(todayDate()); setCustMode('walkin');
    setSelProduct(''); setSelQty(1); setSelDisc(0);
  };

  const addItem = () => {
    if (!selProduct) { showToast('Select a product', 'error'); return; }
    const prod = products.find(p => p.id === selProduct);
    if (!prod) return;
    const existing = billItems.find(i => i.product_id === selProduct);
    const totalQty = (existing?.quantity || 0) + selQty;
    if (prod.stock_qty < totalQty) { showToast('Insufficient stock', 'error'); return; }
    if (existing) {
      setBillItems(prev => prev.map(i => i.product_id === selProduct
        ? { ...i, quantity: totalQty, line_total: i.unit_price * totalQty * (1 - i.discount_pct / 100) }
        : i));
    } else {
      setBillItems(prev => [...prev, {
        product_id: prod.id, product_name: prod.name,
        unit_price: prod.price, quantity: selQty, discount_pct: selDisc,
        line_total: prod.price * selQty * (1 - selDisc / 100),
      }]);
    }
    setSelProduct(''); setSelQty(1); setSelDisc(0);
  };

  const saveBill = async () => {
    if (!billItems.length) { showToast('Add at least one item', 'error'); return; }
    setSaving(true);
    try {
      const paid = payMode === 'Credit' ? (parseFloat(paidAmt) || 0) : grandTotal;
      const status: 'Paid' | 'Partial' | 'Unpaid' =
        paid >= grandTotal ? 'Paid' : paid > 0 ? 'Partial' : 'Unpaid';
      const orderPayload = {
        customer_name: customerName.trim() || 'Walk-in Customer',
        customer_phone: customerPhone,
        source: 'retail' as const,
        payment_mode: payMode,
        subtotal, discount_amount: discountAmount, gst_amount: gstAmt,
        total_amount: grandTotal, paid_amount: paid, status,
        order_date: billDate, notes: '',
      };
      const productUpdates = billItems.map(item => {
        const prod = products.find(p => p.id === item.product_id)!;
        return { id: item.product_id, stock_qty: prod.stock_qty - item.quantity };
      });
      const orderItems: OrderItem[] = billItems.map(i => ({
        product_id: i.product_id, product_name: i.product_name,
        quantity: i.quantity, unit_price: i.unit_price,
        discount_pct: i.discount_pct, line_total: i.line_total,
      }));
      const newOrder = await createOrder(orderPayload, orderItems, productUpdates);
      setReceiptOrder({ ...newOrder, items: billItems });
      setView('receipt');
      showToast('Bill saved! 🎉');
      resetForm();
      onRefresh();
    } catch (e: any) {
      showToast(e.message || 'Error saving bill', 'error');
    } finally {
      setSaving(false);
    }
  };

  const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 focus:border-gray-900 focus:bg-white outline-none transition-colors";
  const labelCls = "text-[10px] text-gray-500 font-semibold uppercase tracking-wider block mb-1.5";

  // ── RECEIPT VIEW ──────────────────────────────────────────
  if (view === 'receipt' && receiptOrder) {
    const o = receiptOrder;
    return (
      <div className="p-4 pb-24 max-w-lg mx-auto">
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
          <div className="text-center border-b border-gray-100 pb-4 mb-4">
            <div className="text-base font-bold text-gray-900 tracking-tight">Art & Anchal</div>
            <div className="text-[11px] text-gray-400 mt-0.5">Heritage Banaras · Varanasi</div>
            <div className="flex justify-between text-[11px] text-gray-500 mt-3">
              <span>Bill <b className="text-gray-900">#{o.id}</b></span>
              <span><b className="text-gray-900">{o.order_date}</b></span>
            </div>
          </div>
          <div className="mb-3 text-sm">
            <span className="text-gray-500">Customer: </span>
            <b className="text-gray-900">{o.customer_name}</b>
            {o.customer_phone && <span className="text-gray-500"> · {o.customer_phone}</span>}
          </div>
          <div className="border-b border-gray-100 pb-3 mb-3">
            {o.items.map((it, i) => (
              <div key={i} className="flex justify-between py-1.5 text-sm">
                <span className="max-w-[65%] text-gray-900">
                  {it.product_name}
                  <span className="block text-[11px] text-gray-400 mt-0.5">
                    {fmt(it.unit_price)} × {it.quantity}
                    {it.discount_pct > 0 ? ` — ${it.discount_pct}% off` : ''}
                  </span>
                </span>
                <b className="text-gray-900">{fmt(it.line_total)}</b>
              </div>
            ))}
          </div>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>{fmt(o.subtotal)}</span></div>
            {(o.discount_amount || 0) > 0 && (
              <div className="flex justify-between text-green-600"><span>Discount</span><span>−{fmt(o.discount_amount)}</span></div>
            )}
            <div className="flex justify-between text-gray-500"><span>GST @ {GST_RATE}%</span><span>+{fmt(o.gst_amount)}</span></div>
            <div className="flex justify-between font-bold text-base text-gray-900 border-t border-gray-900 pt-2 mt-2">
              <span>Total</span><span>{fmt(o.total_amount)}</span>
            </div>
            <div className="flex justify-between text-green-600 font-medium">
              <span>Paid ({o.payment_mode})</span><span>{fmt(o.paid_amount)}</span>
            </div>
            {(o.total_amount - o.paid_amount) > 0 && (
              <div className="flex justify-between text-red-600 font-medium">
                <span>Balance Due</span><span>{fmt(o.total_amount - o.paid_amount)}</span>
              </div>
            )}
          </div>
          <div className="text-center text-[11px] text-gray-400 mt-4">Thank you for your purchase</div>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <button onClick={() => setView('list')} className="py-3 border border-gray-200 rounded-xl font-semibold text-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            ← Bills
          </button>
          <button onClick={() => setView('newbill')} className="py-3 bg-gray-900 text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity">
            + New Bill
          </button>
        </div>
      </div>
    );
  }

  // ── NEW BILL FORM ─────────────────────────────────────────
  if (view === 'newbill') {
    const availableProducts = products.filter(p => p.stock_qty > 0 && p.is_active);
    return (
      <div className="p-4 pb-28 max-w-lg mx-auto">
        <button onClick={() => setView('list')} className="text-gray-500 text-sm font-medium mb-4 hover:text-gray-900">← Back</button>
        <div className="text-lg font-bold text-gray-900 mb-4 tracking-tight">New Bill</div>

        {/* Customer */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-3">
          <label className={labelCls}>Customer</label>
          <div className="flex bg-gray-50 rounded-lg p-0.5 gap-0.5 mb-3">
            {[{ k: 'walkin', l: 'Walk-in' }, { k: 'registered', l: 'Saved' }, { k: 'new', l: '+ New' }].map(o => (
              <button key={o.k}
                className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-all ${custMode === o.k ? 'bg-white text-gray-900 shadow-sm font-semibold' : 'text-gray-500'}`}
                onClick={() => {
                  setCustMode(o.k as CustMode);
                  if (o.k === 'walkin') { setCustomerName('Walk-in Customer'); setCustomerPhone(''); }
                  else { setCustomerName(''); setCustomerPhone(''); }
                }}>
                {o.l}
              </button>
            ))}
          </div>
          {custMode === 'walkin' && (
            <div className="space-y-2">
              <input className={inputCls} placeholder="Name (optional)"
                value={customerName === 'Walk-in Customer' ? '' : customerName}
                onChange={e => setCustomerName(e.target.value || 'Walk-in Customer')} />
              <input type="tel" className={inputCls} placeholder="Phone (optional)"
                value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} />
            </div>
          )}
          {custMode === 'registered' && (
            customers.length === 0
              ? <div className="text-gray-400 text-sm text-center py-2">No saved customers. Use <b>+ New</b> to add one.</div>
              : <select className={inputCls} value={customerName}
                  onChange={e => {
                    const c = customers.find(x => x.name === e.target.value);
                    setCustomerName(e.target.value);
                    setCustomerPhone(c?.phone || '');
                  }}>
                  <option value="">Select customer…</option>
                  {customers.map(c => <option key={c.id}>{c.name}{c.phone ? ` · ${c.phone}` : ''}</option>)}
                </select>
          )}
          {custMode === 'new' && (
            <div className="space-y-2">
              <input className={inputCls} placeholder="Customer name *"
                value={customerName} onChange={e => setCustomerName(e.target.value)} />
              <input type="tel" className={inputCls} placeholder="Phone number *"
                value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} />
            </div>
          )}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div>
              <label className={labelCls}>Date</label>
              <input type="date" className={inputCls} value={billDate} onChange={e => setBillDate(e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Payment Mode</label>
              <select className={inputCls} value={payMode} onChange={e => setPayMode(e.target.value)}>
                <option>Cash</option><option>UPI</option><option>Card</option><option>Credit</option>
              </select>
            </div>
          </div>
        </div>

        {/* Add Items */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-3">
          <label className={labelCls}>Add Items</label>
          {availableProducts.length === 0 ? (
            <div className="text-gray-400 text-sm text-center py-2">
              No stock available.{' '}
              <span className="text-gray-900 font-semibold cursor-pointer" onClick={() => onTabChange('products')}>
                Add stock →
              </span>
            </div>
          ) : (
            <>
              <select className={inputCls + ' mb-2'} value={selProduct} onChange={e => setSelProduct(e.target.value)}>
                <option value="">Select saree…</option>
                {availableProducts.map(p => (
                  <option key={p.id} value={p.id}>{p.name} — {fmt(p.price)} (Stock: {p.stock_qty})</option>
                ))}
              </select>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label className={labelCls}>Qty</label>
                  <input type="number" min={1} className={inputCls}
                    value={selQty} onChange={e => setSelQty(Math.max(1, parseInt(e.target.value) || 1))} />
                </div>
                <div>
                  <label className={labelCls}>Discount %</label>
                  <input type="number" min={0} max={100} className={inputCls}
                    value={selDisc} onChange={e => setSelDisc(Math.max(0, parseInt(e.target.value) || 0))} placeholder="0" />
                </div>
              </div>
              <button onClick={addItem}
                className="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                Add to Bill
              </button>
            </>
          )}
        </div>

        {/* Bill Summary */}
        {billItems.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 p-4 mb-3">
            <label className={labelCls}>Bill ({billItems.length} item{billItems.length !== 1 ? 's' : ''})</label>
            {billItems.map(it => (
              <div key={it.product_id} className="flex items-center gap-2 py-2 border-b border-gray-50 last:border-0">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">{it.product_name}</div>
                  <div className="text-[11px] text-gray-400">
                    {fmt(it.unit_price)} × {it.quantity}{it.discount_pct > 0 ? ` · ${it.discount_pct}% off` : ''}
                  </div>
                </div>
                <div className="font-bold text-sm text-green-600 mr-2 flex-shrink-0">{fmt(it.line_total)}</div>
                <button onClick={() => setBillItems(prev => prev.filter(i => i.product_id !== it.product_id))}
                  className="w-6 h-6 bg-red-50 text-red-600 rounded flex items-center justify-center text-sm flex-shrink-0 hover:bg-red-100 transition-colors">
                  ×
                </button>
              </div>
            ))}
            <div className="bg-gray-50 rounded-lg p-3 mt-3 space-y-1.5 text-sm">
              <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
              {discountAmount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>−{fmt(discountAmount)}</span></div>}
              <div className="flex justify-between text-gray-500"><span>GST ({GST_RATE}%)</span><span>+{fmt(gstAmt)}</span></div>
              <div className="flex justify-between font-bold text-base text-gray-900 border-t border-gray-200 pt-2 mt-1">
                <span>Total</span><span>{fmt(grandTotal)}</span>
              </div>
            </div>
            {payMode === 'Credit' && (
              <div className="mt-3">
                <label className={labelCls}>Amount Paid Now (₹)</label>
                <input type="number" className={inputCls}
                  value={paidAmt} onChange={e => setPaidAmt(e.target.value)} placeholder="0 for full credit" />
              </div>
            )}
          </div>
        )}

        <button onClick={saveBill} disabled={!billItems.length || saving}
          className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-semibold text-sm disabled:opacity-40 transition-opacity">
          {saving ? 'Saving…' : 'Save Bill ✓'}
        </button>
      </div>
    );
  }

  // ── BILLS LIST ────────────────────────────────────────────
  return (
    <div className="p-4 pb-24 max-w-lg mx-auto">
      <button onClick={() => setView('newbill')}
        className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-semibold text-sm mb-4 hover:opacity-90 transition-opacity">
        + New Bill
      </button>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-3 opacity-30">🧾</div>
          <div className="text-base font-semibold text-gray-900 mb-1">No bills yet</div>
          <div className="text-sm text-gray-400">Tap New Bill above to record your first sale</div>
        </div>
      ) : orders.map(o => (
        <div key={o.id} className="bg-white border border-gray-100 rounded-xl p-3.5 mb-2 flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${
            o.status === 'Paid' ? 'bg-green-500' : o.status === 'Partial' ? 'bg-amber-500' : 'bg-red-500'}`} />
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm truncate">{o.customer_name}</div>
            <div className="text-[11px] text-gray-500">#{o.id} · {o.order_date} · {o.payment_mode}</div>
          </div>
          <div className="text-right">
            <div className="font-bold text-sm">{fmt(o.total_amount)}</div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
              o.status === 'Paid' ? 'bg-green-50 text-green-700' :
              o.status === 'Partial' ? 'bg-amber-50 text-amber-700' :
              'bg-red-50 text-red-700'}`}>{o.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
