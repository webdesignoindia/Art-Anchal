import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/src/lib/supabase';
import { toast } from 'sonner';

export function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email || !password) {
      toast.error('Please fill in all required fields.');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          phone: phone,
          full_name: `${firstName} ${lastName}`.trim(),
        },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Account created! Please check your email to confirm your account.');
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-primary-ivory flex">
      {/* Left — Image Panel */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img
          src="/src/assets/images/hero_maroon_saree_1778977647210.png"
          alt="Art & Anchal"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary-charcoal/50" />
        <div className="absolute inset-0 flex flex-col justify-end p-16">
          <p className="text-[10px] uppercase tracking-[0.5em] text-primary-gold mb-4">Begin Your Story</p>
          <h2 className="text-4xl font-serif text-primary-ivory italic leading-snug">
            Where heirlooms<br />
            <span className="not-italic">begin their journey.</span>
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
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden mb-12 text-center">
            <Link to="/" className="inline-flex flex-col items-center">
              <span className="font-accent text-2xl tracking-[0.3em] font-bold text-primary-charcoal">
                ART & ANCHAL
              </span>
              <span className="text-[9px] uppercase tracking-[0.5em] mt-1 text-primary-gold/80">
                Heritage Banaras
              </span>
            </Link>
          </div>

          <div className="mb-10">
            <p className="text-[10px] uppercase tracking-[0.5em] text-primary-gold mb-3">Join the House</p>
            <h1 className="text-4xl font-serif italic text-primary-charcoal">Create Account</h1>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-primary-charcoal/60">
                  First Name <span className="text-primary-gold">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ananya"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-transparent border-b border-primary-charcoal/20 py-3 text-sm text-primary-charcoal placeholder:text-primary-charcoal/30 focus:outline-none focus:border-primary-gold transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-primary-charcoal/60">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Sharma"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-transparent border-b border-primary-charcoal/20 py-3 text-sm text-primary-charcoal placeholder:text-primary-charcoal/30 focus:outline-none focus:border-primary-gold transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] text-primary-charcoal/60">
                Email Address <span className="text-primary-gold">*</span>
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
                Phone (optional)
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-transparent border-b border-primary-charcoal/20 py-3 text-sm text-primary-charcoal placeholder:text-primary-charcoal/30 focus:outline-none focus:border-primary-gold transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] text-primary-charcoal/60">
                Password <span className="text-primary-gold">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 6 characters"
                  autoComplete="new-password"
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

            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer group" onClick={() => setAgreed(!agreed)}>
                <div className={`w-4 h-4 mt-0.5 border transition-colors flex-shrink-0 flex items-center justify-center ${agreed ? 'border-primary-gold bg-primary-gold' : 'border-primary-charcoal/20 group-hover:border-primary-gold'}`}>
                  {agreed && <span className="text-primary-ivory text-[10px] font-bold">✓</span>}
                </div>
                <span className="text-[10px] uppercase tracking-wider text-primary-charcoal/50 leading-relaxed">
                  I agree to receive exclusive previews, heritage stories, and curated offers from Art & Anchal
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-charcoal text-primary-ivory py-4 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-primary-maroon transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Creating Account...' : 'Create My Account'}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-primary-charcoal/10 text-center">
            <p className="text-[10px] uppercase tracking-widest text-primary-charcoal/40">
              Already a member?{' '}
              <Link to="/login" className="text-primary-gold hover:text-primary-maroon transition-colors">
                Sign In
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-[10px] uppercase tracking-widest text-primary-charcoal/30 hover:text-primary-charcoal transition-colors">
              ← Back to Boutique
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
