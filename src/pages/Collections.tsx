/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { COLLECTIONS, PRODUCTS } from '@/src/lib/constants';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function Collections() {
  const { slug } = useParams();
  const [activeCategory, setActiveCategory] = useState(slug || 'all');

  const categories = ['all', ...Array.from(new Set(PRODUCTS.map(p => p.category.toLowerCase().replace(' ', '-'))))];

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category.toLowerCase().replace(' ', '-') === activeCategory);

  const currentCollection = COLLECTIONS.find(c => c.slug === activeCategory);

  useEffect(() => {
    if (slug) setActiveCategory(slug);
  }, [slug]);

  return (
    <div className="pt-24 min-h-screen bg-primary-ivory">
      {/* Editorial Header */}
      <section className="px-6 md:px-12 py-20 pb-32 max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-8 mb-16">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-serif italic mb-6">
              {currentCollection?.name || 'The Collections'}
            </h1>
            <p className="text-sm text-primary-charcoal/60 leading-relaxed italic max-w-lg">
              {currentCollection?.description || 'Explore our curated series of Banarasi handloom masterpieces, ranging from royal bridal silks to contemporary minimal drapes.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-8 border-b border-primary-gold/20 pb-4 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "text-[10px] uppercase tracking-[0.3em] font-bold transition-all relative pb-2",
                  activeCategory === cat ? "text-primary-maroon" : "text-primary-charcoal/40 hover:text-primary-charcoal"
                )}
              >
                {cat.replace('-', ' ')}
                {activeCategory === cat && (
                  <motion.div
                    layoutId="active-cat"
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-primary-maroon"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="group"
              >
                <Link to={`/product/${product.slug}`} className="block space-y-6">
                  <div className="relative aspect-[3/4] overflow-hidden shadow-2xl">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-6 right-6">
                       <span className="bg-primary-ivory/90 backdrop-blur-sm text-[8px] uppercase tracking-[0.2em] px-3 py-1 font-bold border border-primary-gold/20">
                         {product.craft}
                       </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-baseline">
                       <h3 className="text-lg font-serif italic">{product.name}</h3>
                       <p className="text-sm font-medium tracking-tighter">₹{product.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-primary-charcoal/40 group-hover:text-primary-gold transition-colors">
                      <span>Explore Detail</span>
                      <div className="w-8 h-[1px] bg-current" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-48 text-center">
            <p className="text-sm italic text-primary-charcoal/40 uppercase tracking-widest">More pieces arriving soon at the looms of Banaras.</p>
          </div>
        )}
      </section>

      {/* Featured Banner */}
      <section className="relative h-[60vh] bg-primary-charcoal overflow-hidden flex items-center justify-center">
        <img
          src="/src/assets/images/textile_texture_gold_1778977666176.png"
          alt="Texture detail"
          className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h2 className="text-[10px] uppercase tracking-[0.5em] text-primary-gold mb-8">The Registry</h2>
          <h3 className="text-3xl md:text-5xl font-serif text-primary-ivory italic mb-12">
            Each Piece is Handcrafted Specifically for You.
          </h3>
          <Button 
            render={<Link to="/bridal-concierge" />}
            nativeButton={false}
            variant="outline" 
            className="text-primary-ivory border-primary-ivory/30 hover:border-primary-gold hover:text-primary-gold rounded-none px-12 py-7 text-[10px] uppercase tracking-widest"
          >
            Consult With Our Stylists
          </Button>
        </div>
      </section>
    </div>
  );
}
