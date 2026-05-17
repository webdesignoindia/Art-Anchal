/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function About() {
  return (
    <div className="pt-24 bg-primary-ivory">
      {/* Hero Section */}
      <section className="py-24 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div className="inline-block bg-primary-gold/10 text-primary-gold text-[10px] uppercase tracking-[0.3em] px-4 py-2 font-bold">About Art & Anchal</div>
            <h1 className="text-5xl md:text-8xl font-serif italic leading-tight">We celebrate the soul of Banarasi craft.</h1>
            <p className="text-sm text-primary-charcoal/70 italic leading-relaxed max-w-lg">
              At Art & Anchal, every saree is more than fabric — it is a living heirloom, woven with centuries of tradition and the hands of master weavers from Varanasi. We exist to bring this timeless artistry to every woman who seeks beauty with meaning.
            </p>
          </div>
          <div className="relative">
             <div className="aspect-[3/4] overflow-hidden shadow-2xl">
               <img
                src="/src/assets/images/hero_maroon_saree_1778977647210.png"
                alt="Heritage Portrait"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
               />
             </div>
             <div className="absolute top-24 -right-12 hidden xl:block">
               <div className="bg-primary-maroon text-primary-ivory p-12 shadow-2xl max-w-xs">
                 <p className="text-xs uppercase tracking-[0.4em] font-medium leading-loose">
                   Art for the artistry, Anchal for the pallu — our promise of generational beauty.
                 </p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-32 px-6 md:px-12 border-y border-primary-gold/10">
        <div className="max-w-screen-2xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-[10px] uppercase tracking-[0.6em] text-primary-gold">Our Philosophy</h2>
            <h3 className="text-3xl md:text-5xl font-serif italic">Woven with Purpose</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { title: 'Pure Craftsmanship', desc: 'Each piece is handloom-woven using real zari and finest silk, never mass-produced.' },
              { title: 'Weaver Welfare', desc: 'Working directly with artisan families, ensuring fair wages and generational continuity.' },
              { title: 'Sustainable Luxury', desc: 'Natural dyes, ethical sourcing and zero-waste packaging across our collections.' },
              { title: 'Authenticity', desc: 'Every saree comes with a certificate of origin and weaver identity card.' }
            ].map((value, i) => (
              <div key={i} className="bg-primary-ivory p-10 border border-primary-gold/10 space-y-6 hover:shadow-xl transition-shadow">
                 <div className="w-12 h-[1px] bg-primary-gold" />
                 <h4 className="text-[11px] uppercase tracking-widest font-bold">{value.title}</h4>
                 <p className="text-xs text-primary-charcoal/60 italic leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story / Timeline Section */}
      <section className="py-32 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="space-y-12">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-primary-gold">Our Story</h2>
            <h3 className="text-4xl md:text-6xl font-serif italic leading-tight">Born in the lanes of Varanasi.</h3>
            <p className="text-sm text-primary-charcoal/70 italic leading-relaxed max-w-lg">
              Art & Anchal began not in a boardroom, but in a weaver's courtyard in the old city of Banaras — where the rhythm of the loom has kept time for over 500 years. 
            </p>
            <div className="bg-white p-12 border-l-4 border-primary-gold shadow-sm italic text-sm text-primary-charcoal/80 leading-relaxed">
              "A Banarasi saree is not woven — it is dreamed, thread by thread. Our mission is to make sure those dreams reach the women who will carry them forward."
            </div>
          </div>
          
          <div className="relative pl-12 border-l border-primary-gold/20 space-y-16">
            {[
              { year: 'The Beginning', title: 'A Love for the Loom', desc: 'Our founders, deeply moved by the fading livelihoods of Banarasi weavers, set out to build a bridge between the ancient craft and the contemporary market.' },
              { year: 'The Craft', title: 'Master Weavers. Real Zari.', desc: 'Years spent identifying the finest weaving families. Today, our network spans over 60 master weaver households in Varanasi.' },
              { year: 'The Growth', title: 'From a Single Saree to a Movement', desc: 'Growing into a beloved destination for saree connoisseurs and heritage enthusiasts across India and the global diaspora.' },
              { year: 'Today', title: 'A Living Archive', desc: 'Each collection is a chapter in a continuing story of silk, skill, and a culture that refuses to fade.' }
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="absolute -left-[51px] top-1 w-3 h-3 rounded-full bg-primary-gold border-4 border-primary-ivory group-hover:scale-125 transition-transform" />
                <span className="text-[9px] uppercase tracking-[0.2em] text-primary-gold font-bold mb-2 block">{item.year}</span>
                <h4 className="text-xl font-serif italic mb-3">{item.title}</h4>
                <p className="text-xs text-primary-charcoal/60 leading-relaxed italic">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 px-6 md:px-12 max-w-screen-2xl mx-auto flex flex-col items-center space-y-12 border-t border-primary-gold/10">
        <div className="w-px h-24 bg-primary-gold/30" />
        <h3 className="text-3xl font-serif italic text-center">Become a guardian of tradition.</h3>
        <Button 
          render={<Link to="/collections" />}
          nativeButton={false}
          className="bg-primary-charcoal text-white rounded-none px-12 py-8 text-[10px] uppercase tracking-widest font-bold hover:bg-primary-maroon transition-colors"
        >
          Explore the Collection
        </Button>
      </section>
    </div>
  );
}
