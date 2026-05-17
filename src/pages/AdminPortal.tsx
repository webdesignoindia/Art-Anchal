import { useState, useEffect, useCallback } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/src/contexts/AuthContext';
import { fetchProducts, fetchCustomers, fetchOrders, fetchPurchases } from '@/src/lib/db';
import { Dashboard } from './admin/Dashboard';
import { Billing } from './admin/Billing';
import { Products } from './admin/Products';
import { Customers } from './admin/Customers';
import { Reports } from './admin/Reports';
import type { AdminProduct, AdminCustomer, Order, Purchase } from './admin/types';

const TABS = [
  { id: 'dashboard', icon: '🏠', label: 'Home' },
  { id: 'billing', icon: '🧾', label: 'Bill' },
  { id: 'products', icon: '🛍️', label: 'Stock' },
  { id: 'customers', icon: '👥', label: 'Buyers' },
  { id: 'reports', icon: '📊', label: 'Reports' },
];

export function AdminPortal() {
  const { user, loading } = useAuth();
  const [tab, setTab] = useState('dashboard');
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = useCallback((msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  }, []);

  const loadData = useCallback(async () => {
    try {
      const [prods, custs, ords, purs] = await Promise.all([
        fetchProducts(true),
        fetchCustomers(),
        fetchOrders(),
        fetchPurchases(),
      ]);
      setProducts(prods);
      setCustomers(custs);
      setOrders(ords);
      setPurchases(purs);
    } catch (e: any) {
      console.error('Admin data load error:', e);
      showToast('Error loading data', 'error');
    } finally {
      setDataLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    if (user) loadData();
  }, [user, loadData]);

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  const activeProducts = products.filter(p => p.is_active);

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Top Nav */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center gap-3 px-4 h-14 max-w-lg mx-auto">
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-gray-900 tracking-tight leading-tight">Art & Anchal</div>
            <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Admin Portal</div>
          </div>
          <Link
            to="/"
            className="text-[11px] text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors flex-shrink-0"
          >
            ← Store
          </Link>
        </div>
      </nav>

      {/* Content */}
      {dataLoading ? (
        <div className="flex items-center justify-center py-24">
          <div className="text-gray-400 text-sm">Loading…</div>
        </div>
      ) : (
        <>
          {tab === 'dashboard' && (
            <Dashboard products={activeProducts} orders={orders} onTabChange={setTab} />
          )}
          {tab === 'billing' && (
            <Billing
              products={activeProducts}
              customers={customers}
              orders={orders}
              onRefresh={loadData}
              showToast={showToast}
              onTabChange={setTab}
            />
          )}
          {tab === 'products' && (
            <Products products={products} onRefresh={loadData} showToast={showToast} />
          )}
          {tab === 'customers' && (
            <Customers customers={customers} orders={orders} onRefresh={loadData} showToast={showToast} />
          )}
          {tab === 'reports' && (
            <Reports products={activeProducts} orders={orders} purchases={purchases} />
          )}
        </>
      )}

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex z-50">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-2.5 pb-5 flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors border-none bg-transparent cursor-pointer ${
              tab === t.id ? 'text-gray-900' : 'text-gray-400'
            }`}
          >
            <span className="text-[18px] leading-none">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </nav>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-16 left-1/2 -translate-x-1/2 text-white px-5 py-2.5 rounded-full z-[200] text-sm font-medium shadow-xl whitespace-nowrap pointer-events-none ${
            toast.type === 'success' ? 'bg-gray-900' : 'bg-red-600'
          }`}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
}
