import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { Navigation, Footer, WhatsAppCTA } from "./components/Navigation";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "sonner";
import { Home } from "./pages/Home";
import { Collections } from "./pages/Collections";
import { ProductDetail } from "./pages/ProductDetail";
import { BridalConcierge } from "./pages/BridalConcierge";
import { Craftsmanship } from "./pages/Craftsmanship";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Journal } from "./pages/Journal";
import { FAQ } from "./pages/FAQ";
import { Policy } from "./pages/Policy";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AdminPortal } from "./pages/AdminPortal";

const FULLSCREEN_ROUTES = ["/login", "/signup", "/admin"];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppLayout() {
  const { pathname } = useLocation();
  const isFullscreen = FULLSCREEN_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(r + "/"),
  );

  return (
    <div className="flex flex-col min-h-screen">
      {!isFullscreen && <Navigation />}
      <Toaster position="top-right" expand={false} richColors />
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:slug" element={<Collections />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/bridal-concierge" element={<BridalConcierge />} />
          <Route path="/craftsmanship" element={<Craftsmanship />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Policy title="Privacy Policy" />} />
          <Route path="/terms" element={<Policy title="Terms of Service" />} />
          <Route
            path="/shipping-returns"
            element={<Policy title="Shipping & Returns" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminPortal />} />
        </Routes>
      </main>
      {!isFullscreen && <Footer />}
      {!isFullscreen && <WhatsAppCTA />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <AppLayout />
      </AuthProvider>
    </Router>
  );
}
