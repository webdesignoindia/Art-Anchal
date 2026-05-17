/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function FAQ() {
  return (
    <div className="pt-24 bg-primary-ivory min-h-screen">
      <section className="py-24 px-6 md:px-12 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-serif italic mb-16 text-center">Inquiries</h1>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {[
            {
              q: "Are your sarees authentic handloom?",
              a: "Absolutely. Every Art & Anchal saree is handwoven on traditional pit looms in Banaras. We provide Silk Mark certification with every piece to ensure authenticity."
            },
            {
              q: "How long does custom weaving take?",
              a: "Bespoke pieces can take anywhere from 3 to 6 months depending on the intricacy of the motifs (especially Kadhua work) and the dyeing process."
            },
            {
              q: "Do you ship internationally?",
              a: "Yes, we ship worldwide via our premium logistics partners. International orders typically arrive within 10-14 days after dispatch."
            },
            {
              q: "How should I store my Banarasi saree?",
              a: "We recommend storing your saree in a clean, dry place wrapped in a muslin cloth. Refold it every few months to prevent permanent creases in the zari."
            }
          ].map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-primary-gold/20">
              <AccordionTrigger className="text-[10px] uppercase tracking-[0.3em] font-bold text-left py-8 hover:text-primary-gold transition-colors">{item.q}</AccordionTrigger>
              <AccordionContent className="text-xs text-primary-charcoal/60 leading-relaxed italic pb-8">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
