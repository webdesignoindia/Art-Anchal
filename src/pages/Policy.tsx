/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function Policy({ title }: { title: string }) {
  const isPrivacy = title === "Privacy Policy";

  return (
    <div className="pt-24 bg-primary-ivory min-h-screen">
      <section className="py-24 px-6 md:px-12 max-w-3xl mx-auto space-y-12">
        <div className="space-y-4">
          <div className="inline-block bg-primary-gold/10 text-primary-gold text-[8px] uppercase tracking-[0.3em] px-3 py-1 font-bold">Legal & Privacy</div>
          <h1 className="text-4xl md:text-6xl font-serif italic">{title}</h1>
          <p className="text-[10px] uppercase tracking-widest text-primary-charcoal/40 font-bold">Last Updated: May 2026</p>
        </div>

        <div className="text-xs text-primary-charcoal/60 space-y-8 leading-loose italic">
          {isPrivacy ? (
            <>
              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-primary-charcoal">1. Information We Collect</h4>
                <p>We collect personal information when you visit our website, place an order, or contact us. This includes name, email, phone number, delivery address, and payment details (processed securely via partners).</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Order history and browsing preferences.</li>
                  <li>Communications via email, WhatsApp, or contact forms.</li>
                  <li>Technical data like IP address and browser type.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-primary-charcoal">2. How We Use Your Information</h4>
                <p>To process and fulfill orders, send shipping updates, and respond to inquiries. We also use it to curate collection updates and improve our heritage services.</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-primary-charcoal">3. Sharing Your Information</h4>
                <p>Art & Anchal does not sell or trade your data. We share only with logistics partners for delivery, payment processors for secure transactions, and only when required by Indian law.</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-primary-charcoal">4. Your Rights</h4>
                <p>You have the right to access, correct, or request deletion of your personal data. To exercise these rights, please contact our Privacy Office.</p>
                <div className="bg-white p-8 border border-primary-gold/10 inline-block mt-4 not-italic">
                  <p className="font-bold text-primary-charcoal uppercase tracking-widest text-[9px] mb-2">Privacy Office, Art & Anchal</p>
                  <p>privacy@artandanchal.com</p>
                  <p>Golghar Lane, Varanasi – 221001</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <p>
                At Art & Anchal, we value the trust you place in us. This document outlines our commitment to excellence and the terms governing our relationship with our global patrons.
              </p>
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-primary-charcoal">Legacy Protection</h4>
              <p>
                Each piece is a heritage asset. We ensure your data and your purchases are handled with the utmost security and discretion, reflective of our boutique heritage.
              </p>
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-primary-charcoal">Artisanal Standards</h4>
              <p>
                Due to the handcrafted nature of our products, slight variations in weave and color are expected and celebrated as marks of authentic artistry.
              </p>
            </>
          )}
          
          <p className="pt-12 border-t border-primary-gold/20">
            For further detailed inquiries regarding our legal framework or terms, please contact our concierge team.
          </p>
        </div>
      </section>
    </div>
  );
}
