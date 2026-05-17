import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export function Signup() {
  const [showPassword, setShowPassword] = useState(false);

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
          {/* Mobile Logo */}
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

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-primary-charcoal/60">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Ananya"
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
                  className="w-full bg-transparent border-b border-primary-charcoal/20 py-3 text-sm text-primary-charcoal placeholder:text-primary-charcoal/30 focus:outline-none focus:border-primary-gold transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] text-primary-charcoal/60">
                Email Address
              </label>
              <input
                type="email"
                placeholder="your@email.com"
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
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="w-4 h-4 mt-0.5 border border-primary-charcoal/20 group-hover:border-primary-gold transition-colors flex-shrink-0" />
                <span className="text-[10px] uppercase tracking-wider text-primary-charcoal/50 leading-relaxed">
                  I agree to receive exclusive previews, heritage stories, and curated offers from Art & Anchal
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-charcoal text-primary-ivory py-4 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-primary-maroon transition-colors duration-500 mt-2"
            >
              Create My Account
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-primary-charcoal/10 text-center">
            <p className="text-[10px] uppercase tracking-widest text-primary-charcoal/40">
              Already a member?{' '}
              <Link
                to="/login"
                className="text-primary-gold hover:text-primary-maroon transition-colors"
              >
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
