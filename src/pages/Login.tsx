import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/src/lib/supabase';
import { toast } from 'sonner';

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Welcome back.');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-primary-ivory flex">
      {/* Left — Image Panel */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img
          src="/src/assets/images/bridal_consultation_boutique_1778977681634.png"
          alt="Art & Anchal"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary-charcoal/50" />
        <div className="absolute inset-0 flex flex-col justify-end p-16">
          <p className="text-[10px] uppercase tracking-[0.5em] text-primary-gold mb-4">Welcome Back</p>
          <h2 className="text-4xl font-serif text-primary-ivory italic leading-snug">
            Continue your journey<br />
            <span className="not-italic">through eternal threads.</span>
          </h2>
        </div>
        <div className="absolute top-12 left-12">
          <Link to="/" className="flex flex-col">
            <span className="font-accent text-xl tracking-[0.3em] font-bold text-primary-ivory">
              ART & ANCHAL
            </span>
            <span className="text-[9px] uppercase tracking-[0.5em] mt-1 text-primary-gold/80">
              Heritage Banaras
            </span>
          </Link>
        </div>
      </div>

      {/* Right — Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden mb-16 text-center">
            <Link to="/" className="inline-flex flex-col items-center">
              <span className="font-accent text-2xl tracking-[0.3em] font-bold text-primary-charcoal">
                ART & ANCHAL
              </span>
              <span className="text-[9px] uppercase tracking-[0.5em] mt-1 text-primary-gold/80">
                Heritage Banaras
              </span>
            </Link>
          </div>

          <div className="mb-12">
            <p className="text-[10px] uppercase tracking-[0.5em] text-primary-gold mb-3">Your Account</p>
            <h1 className="text-4xl font-serif italic text-primary-charcoal">Sign In</h1>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] text-primary-charcoal/60">
                Email Address
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-primary-charcoal/20 py-3 text-sm text-primary-charcoal placeholder:text-primary-charcoal/30 focus:outline-none focus:border-primary-gold transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] text-primary-charcoal/60">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-primary-charcoal/20 py-3 text-sm text-primary-charcoal placeholder:text-primary-charcoal/30 focus:outline-none focus:border-primary-gold transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-primary-charcoal/40 hover:text-primary-charcoal transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button type="button" className="text-[10px] uppercase tracking-widest text-primary-gold hover:text-primary-charcoal transition-colors">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-charcoal text-primary-ivory py-4 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-primary-maroon transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-primary-charcoal/10 text-center">
            <p className="text-[10px] uppercase tracking-widest text-primary-charcoal/40">
              New to Art & Anchal?{' '}
              <Link to="/signup" className="text-primary-gold hover:text-primary-maroon transition-colors">
                Create an Account
              </Link>
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link to="/" className="text-[10px] uppercase tracking-widest text-primary-charcoal/30 hover:text-primary-charcoal transition-colors">
              ← Back to Boutique
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
