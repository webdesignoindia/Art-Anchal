/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Button } from '@/components/ui/button';

export function Journal() {
  return (
    <div className="pt-24 bg-primary-ivory min-h-screen">
      <section className="py-24 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-serif italic mb-16 text-center">The Journal</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {[
            {
              title: "The Golden Thread: Zari's Place in History",
              date: "May 12, 2026",
              img: "/src/assets/images/textile_texture_gold_1778977666176.png"
            },
            {
              title: "Banaras in Minimalism: The Modern Way to Drape",
              date: "April 28, 2026",
              img: "https://picsum.photos/seed/journal2/800/1000"
            },
            {
              title: "Bridal Legacies: Passing Down the Red Katan",
              date: "April 15, 2026",
              img: "/src/assets/images/hero_maroon_saree_1778977647210.png"
            }
          ].map((post, i) => (
            <div key={i} className="group cursor-pointer space-y-6">
              <div className="aspect-[4/5] overflow-hidden shadow-xl">
                 <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
              </div>
              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-widest text-primary-gold font-bold">{post.date}</p>
                <h3 className="text-xl md:text-2xl font-serif italic leading-tight group-hover:text-primary-gold transition-colors">{post.title}</h3>
                <p className="text-xs text-primary-charcoal/50 line-clamp-3 italic leading-relaxed">
                  Exploring the depths of Banarasi heritage, we uncover the stories hidden within every thread of gold zari and every fold of pure mulberry silk...
                </p>
                <Button variant="ghost" className="px-0 text-[9px] uppercase tracking-widest font-bold">Read Article</Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
