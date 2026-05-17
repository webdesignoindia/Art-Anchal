/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Instagram, Facebook, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-24 bg-primary-ivory">
      <section className="py-24 px-6 md:px-12 max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div className="space-y-16">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-serif italic">Contact Us</h1>
            <p className="text-sm text-primary-charcoal/60 italic max-w-md">Our concierge team is available to assist you with styling, product details, and shipping inquiries.</p>
          </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-primary-gold">Studio & Store</h4>
              <p className="text-xs text-primary-charcoal italic leading-relaxed">
                Art & Anchal, Golghar Lane, <br />
                Varanasi, Uttar Pradesh – 221001
              </p>
              <div className="pt-4 space-y-2">
                <h5 className="text-[9px] uppercase tracking-[0.2em] font-bold text-primary-charcoal/40">Store Hours</h5>
                <p className="text-[10px] text-primary-charcoal/60 italic">
                  Mon–Sat: 10:00 AM – 7:30 PM <br />
                  Sunday: 11:00 AM – 5:00 PM
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-primary-gold">Get In Touch</h4>
              <p className="text-xs text-primary-charcoal italic leading-relaxed">
                hello@artandanchal.com <br />
                +91 98765 43210
              </p>
              <div className="pt-4 space-y-2">
                <h5 className="text-[9px] uppercase tracking-[0.2em] font-bold text-primary-charcoal/40">WhatsApp Support</h5>
                <p className="text-[10px] text-primary-charcoal/60 italic">
                  +91 98765 43210 <br />
                  10 AM – 7 PM, Mon–Sat
                </p>
              </div>
            </div>
            <div className="space-y-4 md:col-span-2">
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-primary-gold">Departmental Enquiries</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-2">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest">Bridal</p>
                  <p className="text-[10px] text-primary-charcoal/60 italic">bridal@artandanchal.com</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest">Gifting</p>
                  <p className="text-[10px] text-primary-charcoal/60 italic">gifts@artandanchal.com</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest">Press</p>
                  <p className="text-[10px] text-primary-charcoal/60 italic">press@artandanchal.com</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest">Orders</p>
                  <p className="text-[10px] text-primary-charcoal/60 italic">orders@artandanchal.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-12 md:p-16 shadow-2xl space-y-12 min-h-[500px] flex flex-col justify-center">
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-8 py-12"
            >
              <div className="w-20 h-20 bg-primary-gold/10 rounded-full flex items-center justify-center mx-auto">
                 <Mail className="w-8 h-8 text-primary-gold" />
              </div>
              <h3 className="text-3xl font-serif italic">Inquiry Received</h3>
              <p className="text-sm text-primary-charcoal/50 leading-relaxed italic max-w-xs mx-auto">
                Thank you for reaching out. A heritage consultant will contact you within 24 hours to discuss your requirements.
              </p>
              <Button 
                variant="outline" 
                onClick={() => setSubmitted(false)}
                className="text-[9px] uppercase tracking-widest border-primary-gold/20"
              >
                Send Another Message
              </Button>
            </motion.div>
          ) : (
            <>
              <h3 className="text-2xl font-serif italic">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                   <label className="text-[9px] uppercase tracking-widest font-bold text-primary-charcoal/40">Name</label>
                   <input required type="text" className="w-full bg-transparent border-b border-primary-charcoal/20 py-3 text-sm focus:outline-none focus:border-primary-gold transition-colors italic" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] uppercase tracking-widest font-bold text-primary-charcoal/40">Email</label>
                   <input required type="email" className="w-full bg-transparent border-b border-primary-charcoal/20 py-3 text-sm focus:outline-none focus:border-primary-gold transition-colors italic" placeholder="Your Email" />
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] uppercase tracking-widest font-bold text-primary-charcoal/40">Message</label>
                   <textarea required className="w-full bg-transparent border-b border-primary-charcoal/20 py-3 text-sm focus:outline-none focus:border-primary-gold transition-colors italic h-32" placeholder="How can we assist you today?" />
                </div>
                <Button type="submit" className="w-full bg-primary-charcoal text-white rounded-none py-10 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-primary-maroon">
                  Send Inquiry
                </Button>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
