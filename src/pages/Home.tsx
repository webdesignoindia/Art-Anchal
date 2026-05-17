/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { COLLECTIONS, PRODUCTS } from '@/src/lib/constants';
import { Button } from '@/components/ui/button';

export function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/src/assets/images/hero_maroon_saree_1778977647210.png"
            alt="Luxury Banarasi Bridal Saree"
            className="w-full h-full object-cover object-center scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-primary-charcoal/30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary-charcoal/60" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-[10px] md:text-sm uppercase tracking-[0.8em] text-primary-ivory/80 mb-6"
          >
            A Journey Through Eternal Threads
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-5xl md:text-8xl font-serif text-primary-ivory italic leading-tight mb-8"
          >
            Crafted for Celebrations <br />
            <span className="font-normal not-italic tracking-tight">That Become Memories</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <Button 
              render={<Link to="/collections" />}
              nativeButton={false}
              size="lg" 
              className="bg-primary-ivory text-primary-charcoal hover:bg-primary-gold hover:text-primary-charcoal rounded-none px-12 py-8 text-xs uppercase tracking-[0.3em]"
            >
              Discover Collections
            </Button>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-primary-ivory/60"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-primary-ivory/0 via-primary-ivory/40 to-primary-ivory/0 mx-auto" />
        </motion.div>
      </section>

      {/* Social Proof / Featured In */}
      <section className="py-20 px-6 bg-white border-b border-primary-gold/10">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
           <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary-gold md:w-32">Featured In</span>
           <div className="flex flex-wrap justify-center gap-12 md:gap-24 font-serif text-xl italic text-primary-charcoal">
             <span>Vogue India</span>
             <span>Harper's Bazaar</span>
             <span>The Hindu</span>
             <span>Elle Luxury</span>
             <span>Architectural Digest</span>
           </div>
        </div>
      </section>

      {/* Fabric Story - Interactive Experience */}
      <section className="py-32 px-6 md:px-12 bg-primary-ivory overflow-hidden">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="relative"
          >
             <div className="aspect-square overflow-hidden shadow-2xl">
               <img
                src="/src/assets/images/weaving_fabric_detail.png"
                alt="Fabric Detail"
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.src = 'https://images.unsplash.com/photo-1590736934241-ec5729ee2d93?auto=format&fit=crop&q=80&w=800')}
               />
             </div>
             <div className="absolute -bottom-8 -right-8 bg-primary-charcoal p-10 text-primary-ivory max-w-xs shadow-2xl hidden md:block">
               <h4 className="text-[10px] uppercase tracking-widest text-primary-gold mb-4">The Pure Katan</h4>
               <p className="text-xs italic leading-relaxed">Two mulberry silk threads twisted together to create a yarn of unmatched strength and shine. This is the skeleton of our heritage.</p>
             </div>
          </motion.div>
          <div className="space-y-12">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-primary-gold">The Materiality</h2>
            <h3 className="text-4xl md:text-6xl font-serif italic leading-tight">Beyond Six Yards <br /> <span className="not-italic">A Masterclass in Texture</span></h3>
            <p className="text-sm text-primary-charcoal/60 leading-relaxed italic max-w-lg">
              Every Art & Anchal creation begins at the source. We select only the highest grade of mulberry silk and hand-drawn zari, ensuring that each fold feels like a second skin.
            </p>
            <div className="space-y-8">
              {[
                { title: 'The Weave', desc: 'Authentic hand-pit looms from the ancient clusters of Banaras.' },
                { title: 'The Gold', desc: 'Tested zari featuring traditional silver and gold electroplating.' },
                { title: 'The Soul', desc: 'Motifs inherited through generations of master weaving families.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-8 group">
                   <span className="text-primary-gold font-serif text-2xl italic opacity-40 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                   <div className="space-y-2">
                     <h4 className="text-[10px] uppercase tracking-widest font-bold">{item.title}</h4>
                     <p className="text-xs text-primary-charcoal/50 italic">{item.desc}</p>
                   </div>
                </div>
              ))}
            </div>
            <Button 
              render={<Link to="/craftsmanship" />}
              nativeButton={false}
              variant="ghost" 
              className="px-0 text-[10px] uppercase tracking-[0.4em] font-bold border-b border-primary-gold/40 hover:text-primary-gold"
            >
              Explore the Loom Cycle
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-32 px-6 md:px-12 bg-primary-ivory">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-[10px] uppercase tracking-[0.5em] text-primary-gold mb-6">Signature Series</h2>
              <p className="text-4xl md:text-6xl font-serif text-primary-charcoal italic leading-tight">
                Where Handloom Artistry <br /> <span className="not-italic">Meets Modern Luxury</span>
              </p>
            </div>
            <Link to="/collections" className="group flex items-center gap-4 text-xs uppercase tracking-widest text-primary-charcoal/60 hover:text-primary-gold transition-colors">
              View All Collections <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {COLLECTIONS.slice(0, 3).map((collection, index) => (
              <motion.div
                key={collection.id}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-8 shadow-2xl">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-primary-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-sm uppercase tracking-[0.3em] font-medium mb-3">{collection.name}</h3>
                <p className="text-xs text-primary-charcoal/60 italic leading-relaxed">{collection.description}</p>
                <Link to={`/collections/${collection.slug}`} className="inline-block mt-6 border-b border-primary-gold pt-1 text-[10px] uppercase tracking-widest font-bold">Explore</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Philosophy - Cinematic Split */}
      <section className="relative min-h-screen flex items-center bg-primary-charcoal overflow-hidden py-24">
        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block opacity-40">
           <img
            src="/src/assets/images/textile_texture_gold_1778977666176.png"
            alt="Handloom Detail"
            className="w-full h-full object-cover grayscale brightness-50"
            referrerPolicy="no-referrer"
           />
        </div>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-[10px] uppercase tracking-[0.5em] text-primary-gold mb-8">Our Philosophy</h2>
              <p className="text-3xl md:text-5xl font-serif text-primary-ivory leading-snug italic">
                “A saree is not merely six yards of silk; it is a canvas of heritage, a testament to time, and an anchor to the soul.”
              </p>
            </motion.div>
            <div className="grid grid-cols-2 gap-12 text-primary-ivory/60">
              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-widest text-primary-gold">Timeless</h4>
                <p className="text-xs leading-relaxed italic">Designs that transcend seasons, becoming heirlooms for generations.</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-widest text-primary-gold">Artisanal</h4>
                <p className="text-xs leading-relaxed italic">Every weave tells a story of a master craftsman in Banaras.</p>
              </div>
            </div>
            <Button 
              render={<Link to="/about" />}
              nativeButton={false}
              variant="outline" 
              className="text-primary-ivory border-primary-ivory/30 hover:border-primary-gold hover:text-primary-gold rounded-none px-10 mt-8 text-[10px] uppercase tracking-widest"
            >
              Our Heritage Story
            </Button>
          </div>
        </div>
      </section>

      {/* Product Highlight - Editorial Grid */}
      <section className="py-32 px-6 md:px-12 bg-white">
        <div className="max-w-screen-2xl mx-auto">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <h2 className="text-[10px] uppercase tracking-[0.6em] text-primary-gold mb-6">Curated Selection</h2>
            <h3 className="text-4xl md:text-6xl font-serif italic mb-8">The Icons of Art & Anchal</h3>
            <div className="w-20 h-1 bg-primary-gold/30 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            {PRODUCTS.slice(0, 2).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className={index % 2 !== 0 ? 'md:mt-32' : ''}
              >
                <Link to={`/product/${product.slug}`} className="group space-y-8 block">
                  <div className="aspect-[4/5] overflow-hidden shadow-px">
                     <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex justify-between items-start pt-4 border-t border-primary-charcoal/10">
                    <div className="space-y-2">
                       <p className="text-[10px] uppercase tracking-widest text-primary-gold font-bold">{product.category}</p>
                       <h4 className="text-2xl font-serif italic">{product.name}</h4>
                    </div>
                    <p className="font-serif text-xl">₹{product.price.toLocaleString()}</p>
                  </div>
                  <Button variant="ghost" className="px-0 text-[10px] uppercase tracking-widest font-bold group-hover:text-primary-gold transition-colors">
                    View Details
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bridal Concierge Banner */}
      <section className="relative py-48 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/bridal_consultation_boutique_1778977681634.png"
            alt="Bridal Concierge"
            className="w-full h-full object-cover grayscale-[30%] opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-primary-charcoal/60" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-[10px] uppercase tracking-[0.8em] text-primary-gold">The Experience</h2>
          <h3 className="text-4xl md:text-6xl font-serif text-primary-ivory italic leading-tight">
            Design Your Dream Wedding Saree with Our Master Curators
          </h3>
          <p className="text-primary-ivory/60 max-w-xl mx-auto text-sm leading-relaxed italic">
            Exclusive one-on-one styling consultations for our global brides. From fabric selection to custom weaving details, we bring your vision to life.
          </p>
          <Button 
            render={<Link to="/bridal-concierge" />}
            nativeButton={false}
            size="lg" 
            className="bg-primary-gold text-primary-charcoal hover:bg-primary-ivory rounded-none px-16 py-8 text-[10px] uppercase tracking-[0.3em] font-bold"
          >
            Book Bridal Concierge
          </Button>
        </div>
      </section>

      {/* Testimonials or Trust Signals */}
      <section className="py-32 px-6 md:px-12 bg-primary-ivory border-y border-primary-gold/10">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          {[
            { label: 'Craft', text: 'Authentic Banarasi Handloom with Silk Mark Certification' },
            { label: 'Heritage', text: 'Generations of Master Weaving Legacy in every thread' },
            { label: 'Global', text: 'World-wide Luxury White-Glove delivery & Consultation' }
          ].map((item, i) => (
            <div key={i} className="space-y-6 px-8">
              <Star className="w-6 h-6 text-primary-gold mx-auto fill-primary-gold/20" />
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold">{item.label}</h4>
              <p className="text-xs italic text-primary-charcoal/60 leading-relaxed font-light uppercase tracking-widest">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
