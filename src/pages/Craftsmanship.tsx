/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

export function Craftsmanship() {
  return (
    <div className="pt-24 bg-primary-ivory">
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img
          src="/src/assets/images/textile_texture_gold_1778977666176.png"
          alt="Handloom Weaving"
          className="absolute inset-0 w-full h-full object-cover grayscale brightness-50"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-8xl font-serif text-primary-ivory italic leading-tight">The Art of the Weave</h1>
          <p className="text-[10px] uppercase tracking-[0.6em] text-primary-gold mt-8">Preserving Heritage at Every Turn</p>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          <div className="lg:sticky lg:top-32 h-fit space-y-8">
             <h2 className="text-[10px] uppercase tracking-[0.4em] text-primary-gold font-bold">Our Legacy</h2>
             <h3 className="text-4xl md:text-5xl font-serif italic leading-tight">A Thousand-Year Old Dialogue</h3>
             <p className="text-sm text-primary-charcoal/60 italic leading-relaxed">
               Banarasi weaving is not just a technique; it is a conversation between history and the hand. At Art & Anchal, we work exclusively with generational weavers in the heart of Banaras who carry the codes of ancient motifs in their muscle memory.
             </p>
          </div>
          <div className="lg:col-span-2 space-y-32">
            {[
              {
                title: 'The Pure Silk (Katan)',
                desc: 'We start with the source—pure, unadulterated mulberry silk. Our Katan silkworms produce filaments of unmatched strength and lustre, providing the perfect canvas for gold.',
                img: 'https://images.unsplash.com/photo-1590736934241-ec5729ee2d93?auto=format&fit=crop&q=80&w=1200'
              },
              {
                title: 'The Real Gold (Zari)',
                desc: 'Authentic Banarasi art requires authentic materials. Our zari is tested for purity, using traditional silver and gold electroplating over fine silk threads.',
                img: '/src/assets/images/textile_texture_gold_1778977666176.png'
              },
              {
                title: 'Dyeing the Soul',
                desc: 'Using organic and heritage-approved dyes, we achieve a depth of color that only natural silk can hold. From royal maroon to the deep charcoal of a moonless night.',
                img: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&q=80&w=1200'
              },
              {
                title: 'The Kadhua Technique',
                desc: 'The pinnacle of handloom mastery. Each motif is woven separately, requiring no floats on the back. It is painstaking, slow, and breathtakingly beautiful.',
                img: '/src/assets/images/weaver_hands_loom_1778978240306.png'
              },
              {
                title: 'Finishing Touches',
                desc: 'Every saree undergoes a meticulous hand-finishing process, where tassels are tied and the fabric is carefully pressed to ensure it drapes perfectly from the very first wear.',
                img: 'https://images.unsplash.com/photo-1582220107107-590d59e8acc2?auto=format&fit=crop&q=80&w=1200'
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="aspect-video overflow-hidden shadow-2xl">
                  <img src={step.img} alt={step.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="max-w-xl space-y-4">
                  <span className="text-[10px] uppercase tracking-widest text-primary-gold font-bold">Step 0{i+1}</span>
                  <h4 className="text-3xl font-serif italic">{step.title}</h4>
                  <p className="text-sm text-primary-charcoal/60 leading-relaxed italic">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-charcoal py-48 text-center px-6">
         <div className="max-w-4xl mx-auto space-y-12">
            <h3 className="text-3xl md:text-6xl font-serif text-primary-ivory italic leading-tight">
              A Single Saree Can Take Up to 6 Months of Handwoven Dedication.
            </h3>
            <p className="text-primary-ivory/50 text-sm italic max-w-2xl mx-auto leading-relaxed">
              In a world of fast fashion, we choose the path of slow heritage. Every Art & Anchal piece is a testament to the patience of the artisan and the appreciation of the wearer.
            </p>
         </div>
      </section>
    </div>
  );
}
