/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Calendar, Cloud, User, MapPin, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function BridalConcierge() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-24 bg-primary-ivory">
      {/* Cinematic Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img
          src="/src/assets/images/bridal_consultation_boutique_1778977681634.png"
          alt="Bridal Concierge"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-primary-charcoal/50" />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[0.8em] text-primary-gold mb-8 italic"
          >
            Reserved for the Discerning Bride
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-8xl font-serif text-primary-ivory italic mb-12 leading-tight"
          >
            The Art & Anchal <br /> Bridal Concierge
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
             <Button 
               render={<a href="#inquiry-form" />}
               nativeButton={false}
               className="bg-primary-gold text-primary-charcoal hover:bg-primary-ivory rounded-none px-16 py-8 text-[10px] uppercase tracking-[0.3em] font-bold"
             >
               Request Private Consult
             </Button>
          </motion.div>
        </div>
      </section>

      {/* The Experience */}
      {/* ... existing content ... */}

      {/* Inquiry Form Section */}
      <section id="inquiry-form" className="bg-primary-charcoal py-32 px-6">
        <div className="max-w-4xl mx-auto bg-primary-ivory p-12 md:p-20 shadow-2xl space-y-12 min-h-[600px] flex flex-col justify-center">
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-10 py-16"
            >
              <div className="w-24 h-24 bg-primary-gold/10 rounded-full flex items-center justify-center mx-auto">
                 <CheckCircle className="w-10 h-10 text-primary-gold" />
              </div>
              <div className="space-y-4">
                <h3 className="text-4xl font-serif italic">Your Journey Begins</h3>
                <p className="text-sm text-primary-charcoal/50 leading-relaxed italic max-w-md mx-auto">
                  Your request for a private bridal consultation has been received. Our lead curator will contact you personally within 24 hours to schedule your session.
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setSubmitted(false)}
                className="text-[10px] uppercase tracking-widest border-primary-gold/20 px-12 py-6"
              >
                Back to Bridal Experience
              </Button>
            </motion.div>
          ) : (
            <>
              <div className="text-center space-y-4">
                <h2 className="text-[10px] uppercase tracking-[0.5em] text-primary-gold">Inquiry</h2>
                <h3 className="text-3xl md:text-5xl font-serif italic">Start Your Bridal Story</h3>
              </div>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                 <div className="space-y-2">
                   <label className="text-[9px] uppercase tracking-widest font-bold text-primary-charcoal/60">Full Name</label>
                   <input required type="text" className="w-full bg-transparent border-b border-primary-charcoal/20 py-3 text-sm focus:outline-none focus:border-primary-gold transition-colors italic" placeholder="Enter your name" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[9px] uppercase tracking-widest font-bold text-primary-charcoal/60">Email Address</label>
                   <input required type="email" className="w-full bg-transparent border-b border-primary-charcoal/20 py-3 text-sm focus:outline-none focus:border-primary-gold transition-colors italic" placeholder="Enter your email" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[9px] uppercase tracking-widest font-bold text-primary-charcoal/60">Wedding Date (Optional)</label>
                   <input type="date" className="w-full bg-transparent border-b border-primary-charcoal/20 py-3 text-sm focus:outline-none focus:border-primary-gold transition-colors italic uppercase tracking-widest" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[9px] uppercase tracking-widest font-bold text-primary-charcoal/60">Location</label>
                   <input required type="text" className="w-full bg-transparent border-b border-primary-charcoal/20 py-3 text-sm focus:outline-none focus:border-primary-gold transition-colors italic" placeholder="City, Country" />
                 </div>
                 <div className="md:col-span-2 space-y-2 pt-4">
                   <label className="text-[9px] uppercase tracking-widest font-bold text-primary-charcoal/60">Your Vision</label>
                   <textarea required className="w-full bg-transparent border-b border-primary-charcoal/20 py-3 text-sm focus:outline-none focus:border-primary-gold transition-colors italic h-32" placeholder="Tell us about the dream saree you envision..." />
                 </div>
                 <div className="md:col-span-2 pt-8">
                   <Button type="submit" className="w-full bg-primary-charcoal text-white rounded-none py-10 text-xs uppercase tracking-[0.4em] font-bold hover:bg-primary-maroon">
                     Submit Inquiry to Concierge
                   </Button>
                 </div>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
