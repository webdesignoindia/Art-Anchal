/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ShoppingBag, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

export function CartSheet() {
  return (
    <Sheet>
      <SheetTrigger className="hover:text-primary-maroon transition-colors relative group outline-none focus-visible:ring-2 focus-visible:ring-primary-gold p-2">
        <ShoppingBag className="w-5 h-5" />
        <span className="absolute top-1 right-1 bg-primary-maroon text-primary-ivory text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center group-hover:scale-110 transition-transform">0</span>
      </SheetTrigger>
      <SheetContent className="bg-primary-ivory w-full sm:max-w-md border-l border-primary-gold/20 p-0 flex flex-col">
        <SheetHeader className="p-8 border-b border-primary-gold/10">
          <SheetTitle className="font-serif italic text-2xl">The Registry Bag</SheetTitle>
        </SheetHeader>
        
        <div className="flex-grow flex flex-col items-center justify-center px-12 text-center space-y-6">
          <div className="w-20 h-20 bg-primary-gold/5 rounded-full flex items-center justify-center mb-4">
             <ShoppingBag className="w-8 h-8 text-primary-gold/40" />
          </div>
          <h3 className="text-lg font-serif italic">Your registry is currently empty</h3>
          <p className="text-xs text-primary-charcoal/50 italic leading-relaxed">
            Every heritage piece begins with a choice. Discover our latest collections to find your perfect drape.
          </p>
          <SheetTrigger 
            nativeButton={false}
            render={
              <Link 
                to="/collections" 
                className="inline-flex items-center justify-center bg-primary-charcoal text-white rounded-none px-10 py-6 text-[10px] uppercase tracking-widest mt-4 hover:bg-primary-maroon transition-colors"
              >
                Explore Collections
              </Link>
            }
          />
        </div>

        <div className="p-8 border-t border-primary-gold/10 bg-white/50 space-y-6">
           <div className="flex justify-between items-baseline mb-4">
              <span className="text-[10px] uppercase tracking-widest text-primary-charcoal/40 font-bold">Subtotal</span>
              <span className="font-serif text-xl">₹0</span>
           </div>
           <p className="text-[10px] text-primary-charcoal/40 italic leading-relaxed">
             Shipping and taxes are calculated at checkout. Our concierge will contact you for personalized measurements.
           </p>
           <Button disabled className="w-full bg-primary-maroon text-white rounded-none py-8 text-[10px] uppercase tracking-[0.3em] font-bold opacity-50 cursor-not-allowed">
             Checkout Legacy
           </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
