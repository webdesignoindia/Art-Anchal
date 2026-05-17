import { motion } from 'motion/react';
import { ShoppingBag, Search, Menu, X, MessageSquare, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '@/src/lib/constants';
import { cn } from '@/lib/utils';
import { CartSheet } from './CartSheet';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHeroPage = location.pathname === '/';
  const isTransparent = isHeroPage && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkClass = cn(
    'text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300',
    isTransparent
      ? 'text-primary-ivory/90 hover:text-primary-gold'
      : 'text-primary-charcoal hover:text-primary-gold'
  );

  const logoMainClass = cn(
    'font-accent text-2xl md:text-3xl tracking-[0.3em] font-bold transition-colors duration-500',
    isTransparent
      ? 'text-primary-ivory group-hover:text-primary-gold'
      : 'text-primary-charcoal group-hover:text-primary-maroon'
  );

  const iconClass = cn(
    'transition-colors duration-300',
    isTransparent
      ? 'text-primary-ivory/90 hover:text-primary-gold'
      : 'text-primary-charcoal hover:text-primary-maroon'
  );

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out px-6 md:px-12',
        isScrolled
          ? 'bg-primary-ivory/95 backdrop-blur-md border-b border-primary-gold/20 py-4 shadow-sm'
          : 'bg-transparent py-6'
      )}
    >
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
        {/* Desktop Links Left */}
        <div className="hidden lg:flex items-center space-x-10">
          {NAV_LINKS.slice(0, 2).map((link) => (
            <Link key={link.href} to={link.href} className={linkClass}>
              {link.name}
            </Link>
          ))}
        </div>

        {/* Brand Logo */}
        <Link to="/" className="flex flex-col items-center group">
          <span className={logoMainClass}>
            ART & ANCHAL
          </span>
          <span className={cn(
            'text-[10px] uppercase tracking-[0.5em] mt-1 transition-colors duration-300',
            isTransparent ? 'text-primary-gold/80' : 'text-primary-gold/70'
          )}>
            Heritage Banaras
          </span>
        </Link>

        {/* Desktop Links Right */}
        <div className="hidden lg:flex items-center space-x-10">
          {NAV_LINKS.slice(2).map((link) => (
            <Link key={link.href} to={link.href} className={linkClass}>
              {link.name}
            </Link>
          ))}
          <div className={cn(
            'flex items-center space-x-5 pl-6 border-l transition-colors duration-300',
            isTransparent ? 'border-primary-ivory/30' : 'border-primary-gold/30'
          )}>
            <button className={iconClass}>
              <Search className="w-[18px] h-[18px]" />
            </button>
            <Link to="/login" className={iconClass}>
              <User className="w-[18px] h-[18px]" />
            </Link>
            <div className={iconClass}>
              <CartSheet />
            </div>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className={cn('lg:hidden', iconClass)}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen
            ? <X className="w-6 h-6" />
            : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isMobileMenuOpen ? 1 : 0, y: isMobileMenuOpen ? 0 : -20 }}
        className={cn(
          'absolute top-full left-0 w-full bg-primary-ivory border-b border-primary-gold/20 flex flex-col items-center py-12 space-y-8 lg:hidden',
          isMobileMenuOpen ? 'block' : 'hidden'
        )}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-sm uppercase tracking-[0.3em] font-medium text-primary-charcoal hover:text-primary-gold transition-colors"
          >
            {link.name}
          </Link>
        ))}
        <div className="flex space-x-8 pt-4 border-t border-primary-gold/20 w-full justify-center">
          <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-xs uppercase tracking-widest text-primary-charcoal hover:text-primary-gold transition-colors">Sign In</Link>
          <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="text-xs uppercase tracking-widest text-primary-charcoal hover:text-primary-gold transition-colors">Join</Link>
        </div>
        <div className="flex space-x-8">
          <Search className="w-5 h-5 text-primary-charcoal" />
          <CartSheet />
        </div>
      </motion.div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary-charcoal text-primary-ivory pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-6">
            <h3 className="font-accent text-xl tracking-widest">ART & ANCHAL</h3>
            <p className="text-sm text-primary-ivory/60 leading-relaxed max-w-xs">
              Curating the soul of Banaras for the global woman. We believe a saree is more than just cloth; it is a legacy woven in silk and gold.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-primary-gold mb-8">Navigation</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><Link to="/collections" className="hover:text-primary-gold transition-colors">Collections</Link></li>
              <li><Link to="/about" className="hover:text-primary-gold transition-colors">Our Story</Link></li>
              <li><Link to="/craftsmanship" className="hover:text-primary-gold transition-colors">The Craft</Link></li>
              <li><Link to="/journal" className="hover:text-primary-gold transition-colors">Journal</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-primary-gold mb-8">Concierge</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><Link to="/bridal-concierge" className="hover:text-primary-gold transition-colors">Bridal Consultation</Link></li>
              <li><Link to="/contact" className="hover:text-primary-gold transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-primary-gold transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/shipping-returns" className="hover:text-primary-gold transition-colors">Shipping & Returns</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-primary-gold mb-8">Stay Connected</h4>
            <p className="text-xs text-primary-ivory/50 mb-6 italic">Join our world for exclusive previews and heritage stories.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="bg-transparent border-b border-primary-ivory/20 py-2 text-xs w-full focus:outline-none focus:border-primary-gold transition-colors"
              />
              <button className="text-xs uppercase tracking-widest text-primary-gold px-0 hover:text-primary-ivory transition-colors">Join</button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-primary-ivory/10 gap-8">
          <p className="text-[10px] uppercase tracking-[0.2em] text-primary-ivory/40">
            © 2026 ART & ANCHAL. ALL RIGHTS RESERVED.
          </p>
          <div className="flex space-x-12">
            <Link to="/privacy" className="text-[10px] uppercase tracking-[0.2em] text-primary-ivory/40 hover:text-primary-gold transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-[10px] uppercase tracking-[0.2em] text-primary-ivory/40 hover:text-primary-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppCTA() {
  return (
    <motion.a
      href="https://wa.me/#"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-40 bg-primary-gold text-primary-charcoal p-4 rounded-full shadow-2xl flex items-center justify-center group"
    >
      <MessageSquare className="w-6 h-6" />
      <span className="absolute right-full mr-4 bg-primary-charcoal text-primary-ivory py-2 px-4 rounded-md text-[10px] uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        Consult with Stylist
      </span>
    </motion.a>
  );
}
