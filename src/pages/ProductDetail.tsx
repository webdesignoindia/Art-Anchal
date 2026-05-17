/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { PRODUCTS } from '@/src/lib/constants';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ChevronRight, Ruler, Ship, RotateCcw, Heart, Share2, MessageCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from 'sonner';

export function ProductDetail() {
  const { slug } = useParams();
  const product = PRODUCTS.find(p => p.slug === slug);

  if (!product) {
    return <div className="h-screen flex items-center justify-center pt-24">Item not found.</div>;
  }

  const handleAddToRegistry = () => {
    toast.success("Added to Registry", {
      description: `${product.name} has been added to your collection.`,
      className: "bg-primary-ivory border-primary-gold/20 text-primary-charcoal font-serif italic",
    });
  };

  return (
    <div className="pt-24 bg-white min-h-screen">
      {/* Breadcrumbs */}
      <div className="px-6 md:px-12 py-6 flex items-center gap-2 text-[8px] uppercase tracking-[0.2em] text-primary-charcoal/40">
        <Link to="/" className="hover:text-primary-charcoal">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/collections" className="hover:text-primary-charcoal">Collections</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-primary-charcoal font-bold">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Dynamic Image Gallery */}
        <div className="space-y-4 px-6 md:pl-12 lg:pr-12">
          {product.images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="aspect-[3/4] overflow-hidden shadow-px"
            >
              <img
                src={img}
                alt={`${product.name} View ${i + 1}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>

        {/* Product Info - Sticky */}
        <div className="px-6 md:px-12 lg:pr-24 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] overflow-auto py-12 lg:py-0">
          <div className="space-y-10 max-w-lg">
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-[0.5em] text-primary-gold font-bold">{product.category}</p>
              <h1 className="text-4xl md:text-5xl font-serif italic text-primary-charcoal">{product.name}</h1>
              <p className="text-2xl font-light">₹{product.price.toLocaleString()}</p>
            </div>

            <div className="space-y-6">
              <p className="text-sm text-primary-charcoal/60 leading-relaxed italic">
                {product.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {product.features.map((f, i) => (
                  <span key={i} className="text-[9px] uppercase tracking-widest px-3 py-1.5 bg-primary-ivory border border-primary-gold/20 text-primary-gold font-bold">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 items-center bg-primary-ivory/50 p-6 border border-primary-gold/10">
               <div className="flex flex-col items-center gap-2 pr-6 border-r border-primary-gold/20">
                  <div className="w-10 h-10 rounded-full border border-primary-gold flex items-center justify-center text-[8px] font-bold text-primary-gold text-center leading-tight">SILK<br/>MARK</div>
                  <span className="text-[7px] uppercase tracking-widest text-primary-gold/60">Certified Pure</span>
               </div>
               <div className="flex flex-col items-center gap-2 pl-2">
                  <div className="w-10 h-10 rounded-full border border-primary-gold flex items-center justify-center text-[7px] font-bold text-primary-gold text-center leading-tight">HAND<br/>WOVEN</div>
                  <span className="text-[7px] uppercase tracking-widest text-primary-gold/60">Banaras Heritage</span>
               </div>
               <p className="text-[9px] text-primary-charcoal/40 italic pl-4 leading-relaxed border-l border-primary-gold/20">
                 Every Art & Anchal piece is accompanied by a physical certificate of authenticity and silk purity.
               </p>
            </div>

            <div className="space-y-4 pt-8">
              <div className="flex gap-4">
                <Button 
                  onClick={handleAddToRegistry}
                  className="flex-1 bg-primary-charcoal text-primary-ivory rounded-none py-8 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-primary-maroon"
                >
                  Add to Registry Bag
                </Button>
                <Button variant="outline" className="rounded-none border-primary-charcoal py-8 px-8 group">
                  <Heart className="w-5 h-5 group-hover:fill-primary-maroon group-hover:text-primary-maroon transition-all" />
                </Button>
              </div>
              <Button 
                render={<Link to="https://wa.me/#" target="_blank" />}
                nativeButton={false}
                variant="outline" 
                className="w-full border-primary-gold/40 text-primary-gold rounded-none py-8 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-primary-gold hover:text-white transition-all flex gap-3"
              >
                <MessageCircle className="w-5 h-5" />
                Styling Consultation via WhatsApp
              </Button>
            </div>

            <Accordion type="single" collapsible className="w-full border-t border-primary-charcoal/10 pt-8">
              <AccordionItem value="details" className="border-b border-primary-charcoal/10">
                <AccordionTrigger className="text-[10px] uppercase tracking-[0.3em] font-bold py-6">The Craft & Details</AccordionTrigger>
                <AccordionContent className="text-xs text-primary-charcoal/60 leading-relaxed space-y-4 pb-8 italic">
                  <div className="flex justify-between py-2 border-b border-primary-charcoal/5">
                    <span className="uppercase tracking-widest text-[9px] font-bold text-primary-charcoal">Material</span>
                    <span>{product.material}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-primary-charcoal/5">
                    <span className="uppercase tracking-widest text-[9px] font-bold text-primary-charcoal">Craftmanship</span>
                    <span>{product.craft}</span>
                  </div>
                  <p className="pt-4">
                    Hand-woven by our master artisans in the ancient city of Banaras using pure silk yarn and authentic zari. Each motif is a result of weeks of meticulous precision on our traditional looms.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="styling" className="border-b border-primary-charcoal/10">
                <AccordionTrigger className="text-[10px] uppercase tracking-[0.3em] font-bold py-6">Styling Suggestions</AccordionTrigger>
                <AccordionContent className="text-xs text-primary-charcoal/60 leading-relaxed pb-8 italic">
                   {product.styling || "Pairs beautifully with antique gold jewellery and a contrasting silk blouse for a regal heritage look."}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping" className="border-b border-primary-charcoal/10">
                <AccordionTrigger className="text-[10px] uppercase tracking-[0.3em] font-bold py-6">Shipping & Returns</AccordionTrigger>
                <AccordionContent className="text-xs text-primary-charcoal/60 leading-relaxed pb-8 italic">
                  Free international white-glove shipping on orders above ₹1,00,000. Each Art & Anchal piece is carefully packed in heritage preservation boxes. As these are handcrafted items, we offer local exchanges within 7 days.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex justify-between pt-12 items-center text-[9px] uppercase tracking-widest text-primary-charcoal/40 font-bold border-t border-primary-charcoal/10 pb-20">
               <div className="flex items-center gap-2">
                 <Ship className="w-4 h-4" /> Worldwide Shipping
               </div>
               <div className="flex items-center gap-2">
                 <Ruler className="w-4 h-4" /> Custom Tailoring
               </div>
               <div className="flex items-center gap-2">
                 <Share2 className="w-4 h-4" /> Share Legacy
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Products Section */}
      <section className="py-32 px-6 md:px-12 bg-primary-ivory border-t border-primary-gold/10">
        <div className="max-w-screen-2xl mx-auto">
          <h2 className="text-[10px] uppercase tracking-[0.6em] text-primary-gold mb-16 text-center">Inspired By This Piece</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {PRODUCTS.filter(p => p.slug !== slug).map((related) => (
              <Link key={related.id} to={`/product/${related.slug}`} className="group space-y-6">
                <div className="aspect-[3/4] overflow-hidden shadow-lg bg-white">
                  <img src={related.images[0]} alt={related.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="text-center space-y-2">
                  <h4 className="text-sm font-serif italic">{related.name}</h4>
                  <p className="text-[10px] tracking-widest font-bold">₹{related.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
