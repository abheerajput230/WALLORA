import { STORE_WHATSAPP_NUMBER } from './products';

export interface PosterBundlePack {
  id: string;
  count: number;
  name: string;
  tagline: string;
  badge?: string;
  popular?: boolean;
  bestValue?: boolean;
  price: number;
  mrp: number;
  perPosterPrice: number;
  dimensions: string;
  tapeRolls: number;
  courierText: string;
  description: string;
  suggestedLayout: string;
}

export const A4_BUNDLE_PACKS: PosterBundlePack[] = [
  {
    id: 'pack-1',
    count: 1,
    name: '1 Single Poster',
    tagline: 'Single Trial Piece',
    badge: 'Single Art',
    price: 30,
    mrp: 60,
    perPosterPrice: 30,
    dimensions: 'A4 Size (9 × 12 Inch)',
    tapeRolls: 0,
    courierText: '+ Courier charge',
    description: '1 Heavyweight 300 GSM Archival Velvet Paper poster (9×12 in). High-res pigment print.',
    suggestedLayout: 'Desk Stand / Single Frame',
  },
  {
    id: 'pack-2',
    count: 2,
    name: 'Pack of 2 Posters',
    tagline: 'Matching Wall Pair',
    badge: 'Save ₹50',
    price: 50,
    mrp: 100,
    perPosterPrice: 25,
    dimensions: 'Two A4 Prints (9 × 12 Inch each)',
    tapeRolls: 1,
    courierText: '+ Courier charge',
    description: '2 matching companion prints (e.g. Cap & Iron Man, Porsche & Defender, or Anime Duo). Just ₹25/poster.',
    suggestedLayout: 'Side-by-side or Stacked Pair',
  },
  {
    id: 'pack-5',
    count: 5,
    name: 'Pack of 5 Posters',
    tagline: 'Mini Study Wall Setup',
    badge: '🔥 HOT DEAL',
    popular: true,
    price: 100,
    mrp: 200,
    perPosterPrice: 20,
    dimensions: 'Five A4 Prints (9 × 12 Inch each)',
    tapeRolls: 1,
    courierText: '+ Courier charge',
    description: '5 posters for just ₹100! (Only ₹20 per poster). Arranged above your study table or monitor.',
    suggestedLayout: 'Horizontal Row or Plus Cross',
  },
  {
    id: 'pack-10',
    count: 10,
    name: 'Pack of 10 Posters',
    tagline: 'Battlestation & PC Wall',
    badge: '★ BESTSELLER',
    popular: true,
    price: 199,
    mrp: 400,
    perPosterPrice: 20,
    dimensions: 'Covers 3.8 × 2.4 ft Wall Space',
    tapeRolls: 1,
    courierText: 'Nominal courier / Free over ₹349',
    description: '10 high-impact 9×12 in prints. Symmetrical grid for gaming desks. Free double-sided nano tape.',
    suggestedLayout: '5×2 Grid or Symmetrical Mosaic',
  },
  {
    id: 'pack-15',
    count: 15,
    name: 'Pack of 15 Posters',
    tagline: 'Creator Wall Collage',
    badge: 'Super Saver',
    price: 279,
    mrp: 600,
    perPosterPrice: 18,
    dimensions: 'Covers 4.6 × 3.0 ft Wall Space',
    tapeRolls: 2,
    courierText: 'Nominal courier / Free over ₹349',
    description: '15 premium prints. Clean mosaic layout with free mounting tape.',
    suggestedLayout: '3×5 Grid or Staircase Wave',
  },
  {
    id: 'pack-20',
    count: 20,
    name: 'Pack of 20 Posters',
    tagline: 'Bedroom Wall Collage',
    badge: '🔥 MOST POPULAR',
    popular: true,
    price: 349,
    mrp: 700,
    perPosterPrice: 17,
    dimensions: 'Covers 5.2 × 3.5 ft Wall Space',
    tapeRolls: 2,
    courierText: 'FREE Courier Delivery Included 🚚',
    description: 'Our viral 20-piece bedroom collage! Transforms entire room. Free courier delivery & 2 rolls nano tape.',
    suggestedLayout: 'Hero Centerpiece + Satellite Prints',
  },
  {
    id: 'pack-25',
    count: 25,
    name: 'Pack of 25 Posters',
    tagline: 'Diamond & Wave Collage',
    badge: 'Aesthetic Hit',
    price: 429,
    mrp: 900,
    perPosterPrice: 17,
    dimensions: 'Covers 5.8 × 4.0 ft Wall Space',
    tapeRolls: 2,
    courierText: 'FREE Courier Delivery Included 🚚',
    description: '25 prints ideal for Diamond Peak or Wave collages with fairy lights. Free courier delivery included.',
    suggestedLayout: 'Diamond Peak / Staircase Wave',
  },
  {
    id: 'pack-30',
    count: 30,
    name: 'Pack of 30 Posters',
    tagline: 'Studio Gallery Wall',
    badge: 'Creator Choice',
    price: 499,
    mrp: 1100,
    perPosterPrice: 16,
    dimensions: 'Covers 6.5 × 4.5 ft Wall Space',
    tapeRolls: 2,
    courierText: 'FREE Courier Delivery Included 🚚',
    description: '30 prints covering entire bedroom or studio wall. High definition, deep pigment inks, free courier delivery.',
    suggestedLayout: 'Wide Panoramic Mosaic',
  },
  {
    id: 'pack-40',
    count: 40,
    name: 'Pack of 40 Posters',
    tagline: 'Ultimate Room Takeover',
    badge: '★ BEST VALUE',
    bestValue: true,
    price: 649,
    mrp: 1500,
    perPosterPrice: 16,
    dimensions: 'Covers 8.0 × 5.2 ft Wall Space',
    tapeRolls: 3,
    courierText: 'FREE Courier Delivery Included 🚚',
    description: 'Massive 40-print wall takeover! Colossal wall makeover at just ₹16 per print. Includes 3 rolls nano tape & free courier.',
    suggestedLayout: 'Total Room Wall Takeover',
  },
];

// Helper to calculate exact bundle price for any custom count from 1 to 40
export const getBundlePriceForCount = (count: number) => {
  if (count <= 1) return { price: 30, mrp: 60, perPrint: 30, courierFree: false };
  if (count === 2) return { price: 50, mrp: 100, perPrint: 25, courierFree: false };
  if (count <= 5) {
    const p = 50 + (count - 2) * 17;
    return { price: Math.min(100, Math.round(p)), mrp: count * 40, perPrint: Math.round(p / count), courierFree: false };
  }
  if (count <= 10) {
    const p = 100 + (count - 5) * 20;
    return { price: Math.min(199, Math.round(p)), mrp: count * 40, perPrint: Math.round(p / count), courierFree: false };
  }
  if (count <= 15) {
    const p = 199 + (count - 10) * 16;
    return { price: Math.min(279, Math.round(p)), mrp: count * 40, perPrint: Math.round(p / count), courierFree: false };
  }
  if (count <= 20) {
    const p = 279 + (count - 15) * 14;
    return { price: Math.min(349, Math.round(p)), mrp: count * 35, perPrint: Math.round(p / count), courierFree: true };
  }
  if (count <= 25) {
    const p = 349 + (count - 20) * 16;
    return { price: Math.min(429, Math.round(p)), mrp: count * 36, perPrint: Math.round(p / count), courierFree: true };
  }
  if (count <= 30) {
    const p = 429 + (count - 25) * 14;
    return { price: Math.min(499, Math.round(p)), mrp: count * 36, perPrint: Math.round(p / count), courierFree: true };
  }
  const p = 499 + (count - 30) * 15;
  return { price: Math.min(649, Math.round(p)), mrp: count * 37, perPrint: Math.round(p / count), courierFree: true };
};

// Generate WhatsApp order message for a bundle pack
export const generateBundleWhatsAppUrl = (pack: PosterBundlePack) => {
  const message = [
    `*POSTER_ARENA - A4 Poster Pack Order* 🖼️⚡`,
    `----------------------------------------`,
    `• *Bundle Pack:* ${pack.name} (${pack.count} Posters - 9x12 Inch)`,
    `• *Tagline:* ${pack.tagline}`,
    `• *Paper Quality:* 300 GSM Heavyweight Archival Velvet Paper`,
    `• *Effective Rate:* Only ₹${pack.perPosterPrice} per poster!`,
    `• *Wall Coverage:* ${pack.dimensions}`,
    pack.tapeRolls > 0 ? `• *Included:* ${pack.tapeRolls} Roll(s) Double-Sided Wall-Safe Nano Tape` : ``,
    `• *Courier/Delivery:* ${pack.courierText}`,
    `----------------------------------------`,
    `• *Pack Price:* ₹${pack.price} (MRP: ₹${pack.mrp})`,
    `----------------------------------------`,
    `Hi POSTER_ARENA! I want to order this ${pack.count} A4 Poster Pack (₹${pack.price}). Please send me the catalog to choose my favorite designs!`,
  ].filter(Boolean).join('\n');

  return `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};
