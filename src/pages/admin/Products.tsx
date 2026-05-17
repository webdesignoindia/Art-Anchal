import { useState } from 'react';
import type { AdminProduct } from './types';
import { createProduct, updateProduct, deleteProduct } from '@/src/lib/db';

interface Props {
  products: AdminProduct[];
  onRefresh: () => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

const CATEGORIES = ['Bridal', 'Katan Silk', 'Organza', 'Contemporary', 'Chanderi', 'Georgette', 'Cotton Silk', 'Tussar Silk', 'Linen'];
const SAREE_TYPES = ['Banarasi Silk', 'Kanjivaram', 'Chanderi', 'Georgette', 'Chiffon', 'Cotton Silk', 'Tussar Silk', 'Organza', 'Net', 'Linen'];
const fmt = (n: number) => '₹' + Number(n).toLocaleString('en-IN');

const EMPTY_FORM = {
  name: '', slug: '', price: '', cost_price: '', category: 'Bridal', saree_type: 'Banarasi Silk',
  description: '', images: '', features: '', material: '', craft: '', styling: '', stock_qty: '1',
};

type FormData = typeof EMPTY_FORM;

export function Products({ products, onRefresh, showToast }: Props) {
  const [view, setView] = useState<'list' | 'form' | 'edit'>('list');
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const f = (key: keyof FormData, val: string) => setForm(prev => ({ ...prev, [key]: val }));

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );
  const totalMRP = products.reduce((s, p) => s + p.stock_qty * p.price, 0);

  const handleEdit = (p: AdminProduct) => {
    setForm({
      name: p.name, slug: p.slug, price: String(p.price), cost_price: String(p.cost_price || 0),
      category: p.category, saree_type: p.saree_type || 'Banarasi Silk',
      description: p.description || '', images: (p.images || []).join('\n'),
      features: (p.features || []).join('\n'), material: p.material || '',
      craft: p.craft || '', styling: p.styling || '', stock_qty: String(p.stock_qty),
    });
    setEditingId(p.id);
    setView('edit');
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.price || !form.stock_qty) {
      showToast('Fill all required fields', 'error'); return;
    }
    setSaving(true);
    try {
      const slug = form.slug.trim() ||
        form.name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const payload = {
        name: form.name.trim(), slug,
        price: parseFloat(form.price),
        cost_price: parseFloat(form.cost_price || '0'),
        category: form.category,
        saree_type: form.saree_type,
        description: form.description,
        material: form.material,
        craft: form.craft,
        styling: form.styling,
        images: form.images.split('\n').map(s => s.trim()).filter(Boolean),
        features: form.features.split('\n').map(s => s.trim()).filter(Boolean),
        stock_qty: parseInt(form.stock_qty),
        is_active: true,
      };
      if (view === 'edit' && editingId) {
        await updateProduct(editingId, payload);
        showToast('Product updated! ✓');
      } else {
        await createProduct(payload as any);
        showToast('Product added! ✓');
      }
      onRefresh();
      setView('list');
      setForm(EMPTY_FORM);
      setEditingId(null);
    } catch (e: any) {
      showToast(e.message || 'Error saving product', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Archive "${name}"? It will be hidden from the store.`)) return;
    try {
      await deleteProduct(id);
      showToast('Product archived');
      onRefresh();
    } catch (e: any) {
      showToast(e.message || 'Error', 'error');
    }
  };

  const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 focus:border-gray-900 focus:bg-white outline-none transition-colors";
  const labelCls = "text-[10px] text-gray-500 font-semibold uppercase tracking-wider block mb-1.5";

  if (view === 'form' || view === 'edit') {
    return (
      <div className="p-4 pb-24 max-w-lg mx-auto">
        <button onClick={() => { setView('list'); setForm(EMPTY_FORM); setEditingId(null); }}
          className="text-gray-500 text-sm font-medium mb-4 flex items-center gap-1 hover:text-gray-900">
          ← Back
        </button>
        <div className="text-lg font-bold text-gray-900 mb-4 tracking-tight">
          {view === 'edit' ? 'Edit Product' : 'New Product'}
        </div>

        <div className="space-y-3">
          <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
            <div>
              <label className={labelCls}>Product Name *</label>
              <input className={inputCls} value={form.name} onChange={e => f('name', e.target.value)}
                placeholder="e.g. The Maroon Maharani Saree" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={labelCls}>Category *</label>
                <select className={inputCls} value={form.category} onChange={e => f('category', e.target.value)}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Saree Type</label>
                <select className={inputCls} value={form.saree_type} onChange={e => f('saree_type', e.target.value)}>
                  {SAREE_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className={labelCls}>Price (₹) *</label>
                <input type="number" className={inputCls} value={form.price} onChange={e => f('price', e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Cost (₹)</label>
                <input type="number" className={inputCls} value={form.cost_price} onChange={e => f('cost_price', e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Stock Qty *</label>
                <input type="number" min={0} className={inputCls} value={form.stock_qty} onChange={e => f('stock_qty', e.target.value)} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={labelCls}>Material</label>
                <input className={inputCls} value={form.material} onChange={e => f('material', e.target.value)}
                  placeholder="e.g. Pure Katan Silk" />
              </div>
              <div>
                <label className={labelCls}>Craft</label>
                <input className={inputCls} value={form.craft} onChange={e => f('craft', e.target.value)}
                  placeholder="e.g. Kadhua Handloom" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Description</label>
              <textarea rows={3} className={inputCls + ' resize-none'} value={form.description}
                onChange={e => f('description', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Styling Notes</label>
              <textarea rows={2} className={inputCls + ' resize-none'} value={form.styling}
                onChange={e => f('styling', e.target.value)} />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
            <div>
              <label className={labelCls}>Image URLs (one per line)</label>
              <textarea rows={3} className={inputCls + ' resize-none font-mono text-[11px]'}
                value={form.images} onChange={e => f('images', e.target.value)}
                placeholder={'/src/assets/images/saree.png\nhttps://...'} />
            </div>
            <div>
              <label className={labelCls}>Features (one per line)</label>
              <textarea rows={3} className={inputCls + ' resize-none'} value={form.features}
                onChange={e => f('features', e.target.value)}
                placeholder={'Pure 24k Gold Zari\nHandwoven over 4 months'} />
            </div>
            <div>
              <label className={labelCls}>URL Slug</label>
              <input className={inputCls} value={form.slug} onChange={e => f('slug', e.target.value)}
                placeholder="auto-generated from name if blank" />
            </div>
          </div>

          <button onClick={handleSave} disabled={saving}
            className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-semibold text-sm disabled:opacity-40 transition-opacity">
            {saving ? 'Saving…' : view === 'edit' ? 'Update Product ✓' : 'Add Product ✓'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto">
      {products.length > 0 && (
        <div className="bg-gray-900 text-white rounded-2xl p-5 mb-4">
          <div className="text-[10px] font-medium opacity-50 uppercase tracking-wider mb-2">Inventory Value (MRP)</div>
          <div className="text-4xl font-bold tracking-tight">{fmt(totalMRP)}</div>
          <div className="text-xs opacity-50 mt-1.5">
            {products.reduce((s, p) => s + p.stock_qty, 0)} pcs · {products.length} SKUs
          </div>
        </div>
      )}

      {products.length > 0 && (
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2.5 mb-3">
          <span className="text-gray-400 text-sm">🔍</span>
          <input className="flex-1 text-sm outline-none bg-transparent"
            placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      )}

      {filtered.length === 0 && products.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-3 opacity-30">🛍️</div>
          <div className="text-base font-semibold text-gray-900 mb-1">No products yet</div>
          <div className="text-sm text-gray-400 mb-4">Add your first saree to the catalogue</div>
          <button onClick={() => setView('form')} className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold">
            + Add First Product
          </button>
        </div>
      ) : filtered.map(p => (
        <div key={p.id} className="bg-white border border-gray-100 rounded-xl p-3.5 mb-2 flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0">
            {p.images?.[0] ? (
              <img src={p.images[0]} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-400">
                {p.name.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm truncate">{p.name}</div>
            <div className="text-[11px] text-gray-400">{p.category} · {p.saree_type}</div>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-sm font-bold">{fmt(p.price)}</span>
              {p.cost_price > 0 && <span className="text-[11px] text-gray-400">Cost: {fmt(p.cost_price)}</span>}
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                p.stock_qty <= 2 ? 'bg-red-50 text-red-700' :
                p.stock_qty <= 5 ? 'bg-amber-50 text-amber-700' :
                'bg-green-50 text-green-700'}`}>
                {p.stock_qty <= 2 ? 'Critical' : p.stock_qty <= 5 ? 'Low Stock' : 'In Stock'}
              </span>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className={`text-xl font-bold tracking-tight ${
              p.stock_qty <= 2 ? 'text-red-600' : p.stock_qty <= 5 ? 'text-amber-600' : 'text-green-600'}`}>
              {p.stock_qty}
            </div>
            <div className="text-[10px] text-gray-400 mb-1.5">pcs</div>
            <div className="flex gap-1.5">
              <button onClick={() => handleEdit(p)}
                className="text-[10px] bg-gray-100 text-gray-700 px-2 py-1 rounded font-medium hover:bg-gray-200 transition-colors">
                Edit
              </button>
              <button onClick={() => handleDelete(p.id, p.name)}
                className="text-[10px] bg-red-50 text-red-600 px-2 py-1 rounded font-medium hover:bg-red-100 transition-colors">
                Del
              </button>
            </div>
          </div>
        </div>
      ))}

      <button onClick={() => { setForm(EMPTY_FORM); setView('form'); }}
        className="fixed bottom-20 right-4 w-12 h-12 bg-gray-900 text-white rounded-full text-2xl flex items-center justify-center shadow-lg z-50 hover:scale-105 transition-transform">
        +
      </button>
    </div>
  );
}
