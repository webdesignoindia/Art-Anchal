/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  description: string;
  images: string[];
  features: string[];
  material: string;
  craft: string;
  styling?: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export const COLLECTIONS: Collection[] = [
  {
    id: 'bridal',
    name: 'The Bridal Edit',
    slug: 'bridal',
    description: 'The ultimate Banarasi treasures for the modern bride. Timeless, regal, and unforgettable heirlooms.',
    image: '/src/assets/images/hero_maroon_saree_1778977647210.png'
  },
  {
    id: 'katan',
    name: 'Katan Heritage',
    slug: 'katan-silk',
    description: 'Pure Silk handwoven to perfection. The gold standard of Banarasi craftsmanship, featuring traditional Kadhua motifs.',
    image: '/src/assets/images/textile_texture_gold_1778977666176.png'
  },
  {
    id: 'organza',
    name: 'Organza Dreams',
    slug: 'organza',
    description: 'Ethereal, lightweight, and sheer. A contemporary take on the classic Banarasi weave for the modern minimalist.',
    image: '/src/assets/images/peach_organza_saree_1778978292600.png'
  },
  {
    id: 'contemporary',
    name: 'Modern Silhouettes',
    slug: 'contemporary',
    description: 'Minimalist drapes meeting age-old artistry. Designed for the global woman who values subtle elegance.',
    image: '/src/assets/images/emerald_palace_saree_1778978259528.png'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'The Maroon Maharani Saree',
    slug: 'maroon-maharani-saree',
    price: 125000,
    category: 'Bridal',
    description: 'A masterpiece of Banarasi handloom, this saree features intricate Shikargah motifs woven in pure gold zari on a rich mulberry silk base. This piece represents over 400 hours of master craftsmanship.',
    images: ['/src/assets/images/hero_maroon_saree_1778977647210.png', '/src/assets/images/textile_texture_gold_1778977666176.png'],
    features: ['Handwoven over 4 months', 'Pure 24k Gold Zari', 'Authentic Mulberry Katan Silk'],
    material: 'Pure Katan Silk',
    craft: 'Kadhua Handloom',
    styling: 'Pair with heritage polki jewellery and a clean bun for a timeless bridal look. Best suited for midnight weddings.'
  },
  {
    id: '2',
    name: 'Emerald Heritage Zari',
    slug: 'emerald-heritage-zari',
    price: 85000,
    category: 'Katan Silk',
    description: 'Deep emerald base with micro-zari bootis. This saree uses the antique "Tanchoi" technique to create a multi-dimensional texture that shimmers with every movement.',
    images: ['/src/assets/images/emerald_palace_saree_1778978259528.png'],
    features: ['Lightweight handloom', 'Antique Zari Finish', 'Elegant Drape'],
    material: 'Pure Silk',
    craft: 'Tanchoi Weave',
    styling: 'Minimal emerald studs and a loose braid will elevate the subtle sophistication of this piece.'
  },
  {
    id: '3',
    name: 'Peach Mist Organza',
    slug: 'peach-mist-organza',
    price: 55000,
    category: 'Organza',
    description: 'A lightweight marvel. Hand-painted floral motifs are outlined with fine silver zari on a sheer peach organza base. The epitome of modern grace.',
    images: ['/src/assets/images/peach_organza_saree_1778978292600.png'],
    features: ['Sheer Sheen', 'Hand-painted Details', 'Silver Zari Border'],
    material: 'Silk Organza',
    craft: 'Meenakari Hand-paint',
    styling: 'Perfect for day weddings. Style with pearls and fresh flowers in your hair.'
  },
  {
    id: '4',
    name: 'Champagne Gold Minimalist',
    slug: 'champagne-gold-minimalist',
    price: 45000,
    category: 'Contemporary',
    description: 'Subtle shimmer for the modern cocktail evening. A champagne silk base with a contemporary geometric zari border.',
    images: ['https://images.unsplash.com/photo-1610030469915-9a88ed4835af?auto=format&fit=crop&q=80&w=800'],
    features: ['Modern Minimal Design', 'High Lustre Finish', 'Signature Border'],
    material: 'Silk Blend',
    craft: 'Jacquard Handloom',
    styling: 'Wear with a modern halter-neck blouse and statement gold cuffs for a fusion look.'
  },
  {
    id: '5',
    name: 'The Royal Blue Shikargah',
    slug: 'royal-blue-shikargah',
    price: 155000,
    category: 'Bridal',
    description: 'A collector’s item. The traditional Shikargah (hunting scene) motif represents the peak of Banarasi complexity. Woven in silver and gold zari.',
    images: ['https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&q=80&w=800'],
    features: ['Limited Edition', 'Bicolor Zari', 'Heavy Heritage Weight'],
    material: 'Heavy Katan Silk',
    craft: 'Master Kadhua',
    styling: 'Reserve this for the most grand celebrations. Style with heirloom diamonds.'
  }
];

export const NAV_LINKS = [
  { name: 'Collections', href: '/collections' },
  { name: 'Craftsmanship', href: '/craftsmanship' },
  { name: 'About', href: '/about' },
  { name: 'Journal', href: '/journal' },
  { name: 'Concierge', href: '/bridal-concierge' },
  { name: 'Contact', href: '/contact' }
];
