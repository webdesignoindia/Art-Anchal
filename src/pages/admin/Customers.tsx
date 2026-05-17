import { useState } from 'react';
import type { AdminCustomer, Order } from './types';
import { createCustomer } from '@/src/lib/db';

interface Props {
  customers: AdminCustomer[];
  orders: Order[];
  onRefresh: () => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

const fmt = (n: number) => '₹' + Number(n).toLocaleString('en-IN');

export function Customers({ customers, orders, onRefresh, showToast }: Props) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '' });
  const [saving, setSaving] = useState(false);

  const custOrders = (name: string) => orders.filter(o => o.customer_name === name);
  const custDue = (name: string) => custOrders(name).reduce((s, o) => s + (o.total_amount - o.paid_amount), 0);
  const custTotal = (name: string) => custOrders(name).reduce((s, o) => s + o.total_amount, 0);

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.phone || '').includes(search)
  );

  const handleSave = async () => {
    if (!form.name.trim()) { showToast('Enter customer name', 'error'); return; }
    setSaving(true);
    try {
      await createCustomer({ name: form.name.trim(), phone: form.phone, email: form.email, city: form.city, address: '', notes: '' });
      showToast('Customer added! ✓');
      setShowModal(false);
      setForm({ name: '', phone: '', email: '', city: '' });
      onRefresh();
    } catch (e: any) {
      showToast(e.message || 'Error', 'error');
    } finally {
      setSaving(false);
    }
  };

  const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 focus:border-gray-900 focus:bg-white outline-none transition-colors";
  const labelCls = "text-[10px] text-gray-500 font-semibold uppercase tracking-wider block mb-1.5";

  if (selected) {
    const c = customers.find(x => x.id === selected)!;
    if (!c) { setSelected(null); return null; }
    const cb = custOrders(c.name);
    const due = custDue(c.name);
    return (
      <div className="p-4 pb-24 max-w-lg mx-auto">
        <button onClick={() => setSelected(null)} className="text-gray-500 text-sm font-medium mb-4 hover:text-gray-900">← Back</button>
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-700 flex-shrink-0">
              {c.name[0].toUpperCase()}
            </div>
            <div>
              <div className="text-lg font-bold">{c.name}</div>
              <div className="text-sm text-gray-500">{c.phone || 'No phone'}{c.city ? ` · ${c.city}` : ''}</div>
              {c.email && <div className="text-xs text-gray-400">{c.email}</div>}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Total Spent', value: fmt(custTotal(c.name)), color: 'text-gray-900' },
              { label: 'Visits', value: String(cb.length), color: 'text-blue-600' },
              { label: 'Credit Due', value: fmt(due), color: due > 0 ? 'text-red-600' : 'text-green-600' },
            ].map(s => (
              <div key={s.label} className="bg-gray-50 rounded-lg p-2.5 text-center">
                <div className="text-[10px] text-gray-400 mb-1">{s.label}</div>
                <div className={`text-sm font-bold ${s.color}`}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-sm font-semibold text-gray-900 mb-3">Purchase History</div>
        {cb.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">No purchases yet for this customer</div>
        ) : cb.map(o => (
          <div key={o.id} className="bg-white rounded-xl border border-gray-100 p-3.5 mb-2">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold text-sm">Bill #{o.id} · {o.order_date}</div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium mt-1.5 inline-block ${
                  o.payment_mode === 'Cash' ? 'bg-green-50 text-green-700' :
                  o.payment_mode === 'UPI' ? 'bg-blue-50 text-blue-700' :
                  'bg-amber-50 text-amber-700'}`}>{o.payment_mode}</span>
              </div>
              <div className="text-right">
                <div className="font-bold text-sm text-green-600">{fmt(o.total_amount)}</div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium mt-0.5 inline-block ${
                  o.status === 'Paid' ? 'bg-green-50 text-green-700' :
                  o.status === 'Partial' ? 'bg-amber-50 text-amber-700' :
                  'bg-red-50 text-red-700'}`}>{o.status}</span>
                {(o.total_amount - o.paid_amount) > 0 && (
                  <div className="text-[11px] text-red-500 mt-0.5">Due: {fmt(o.total_amount - o.paid_amount)}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto">
      {customers.length > 0 && (
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2.5 mb-3">
          <span className="text-gray-400 text-sm">🔍</span>
          <input className="flex-1 text-sm outline-none bg-transparent"
            placeholder="Search by name or phone…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      )}

      {customers.some(c => custDue(c.name) > 0) && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-3">
          <div className="text-xs font-semibold text-red-700 mb-2">Credit Outstanding</div>
          {customers.filter(c => custDue(c.name) > 0).map(c => (
            <div key={c.id} className="flex items-center gap-2.5 py-2 cursor-pointer border-b border-red-100 last:border-0"
              onClick={() => setSelected(c.id)}>
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-xs font-bold text-red-700 flex-shrink-0">
                {c.name[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{c.name}</div>
                <div className="text-[11px] text-gray-500">{c.phone || 'No phone'}</div>
              </div>
              <div className="font-bold text-sm text-red-600">{fmt(custDue(c.name))}</div>
            </div>
          ))}
        </div>
      )}

      {filtered.length === 0 && customers.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-3 opacity-30">👥</div>
          <div className="text-base font-semibold text-gray-900 mb-1">No customers yet</div>
          <div className="text-sm text-gray-400 mb-4">Add regular customers to track purchases and credit</div>
          <button onClick={() => setShowModal(true)} className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold">
            + Add First Customer
          </button>
        </div>
      ) : (
        <>
          <div className="text-sm font-semibold text-gray-900 mb-3">All Customers ({customers.length})</div>
          {filtered.map(c => (
            <div key={c.id} className="bg-white border border-gray-100 rounded-xl p-3.5 mb-2 flex items-center gap-3 cursor-pointer hover:border-gray-200 transition-colors"
              onClick={() => setSelected(c.id)}>
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-700 flex-shrink-0">
                {c.name[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">{c.name}</div>
                <div className="text-[11px] text-gray-400">{c.phone || 'No phone'}{c.city ? ` · ${c.city}` : ''}</div>
                <div className="text-[11px] text-gray-400 mt-0.5">
                  {custOrders(c.name).length} visit{custOrders(c.name).length !== 1 ? 's' : ''} · {fmt(custTotal(c.name))}
                </div>
              </div>
              <div className="text-right">
                {custDue(c.name) > 0 ? (
                  <>
                    <div className="font-bold text-sm text-red-600">{fmt(custDue(c.name))}</div>
                    <div className="text-[10px] text-gray-400">Due</div>
                  </>
                ) : (
                  <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">✓ Clear</span>
                )}
              </div>
            </div>
          ))}
        </>
      )}

      <button onClick={() => setShowModal(true)}
        className="fixed bottom-20 right-4 w-12 h-12 bg-gray-900 text-white rounded-full text-2xl flex items-center justify-center shadow-lg z-50 hover:scale-105 transition-transform">
        +
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center"
          onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div className="bg-white rounded-t-2xl p-5 w-full max-w-lg pb-10 animate-[slideUp_0.2s_ease]">
            <div className="w-9 h-1 bg-gray-200 rounded mx-auto mb-4" />
            <div className="text-lg font-bold mb-4">Add Customer</div>
            <div className="space-y-3">
              <div>
                <label className={labelCls}>Name *</label>
                <input className={inputCls} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Customer's full name" autoFocus />
              </div>
              <div>
                <label className={labelCls}>Phone</label>
                <input type="tel" className={inputCls} value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="+91 XXXXX XXXXX" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelCls}>Email</label>
                  <input type="email" className={inputCls} value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="Optional" />
                </div>
                <div>
                  <label className={labelCls}>City</label>
                  <input className={inputCls} value={form.city}
                    onChange={e => setForm(f => ({ ...f, city: e.target.value }))} placeholder="e.g. Varanasi" />
                </div>
              </div>
              <button onClick={handleSave} disabled={saving}
                className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-semibold text-sm mt-1 disabled:opacity-40 transition-opacity">
                {saving ? 'Saving…' : 'Add Customer ✓'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
