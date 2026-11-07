import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Check,
  X,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  TrendingDown,
  Layers,
  Sliders,
  CheckCircle2,
  ExternalLink,
  Flame,
  Award,
} from 'lucide-react';
import { SIZES_LIST, SIZE_PRICING, STORE_WHATSAPP_NUMBER, PosterSize } from '@/data/products';

export interface SizeComparisonItem {
  size: PosterSize;
  dimensions: string;
  metricDimensions: string;
  badge: string;
  badgeColor: string;
  bestFor: string;
  paperQuality: string;
  unframed: {
    ourPrice: number;
    marketPrice: number;
    originalPrice: number;
    savingsPercent: string;
    tapeIncluded: string;
  };
  framed: {
    ourPrice: number;
    marketPrice: number;
    originalPrice: number;
    savingsPercent: string;
    frameSpec: string;
  };
  popularUses: string[];
}

export const SIZES_COMPARISON_DATA: SizeComparisonItem[] = [
  {
    size: 'A4',
    dimensions: '9 × 12 in',
    metricDimensions: '21 × 29.7 cm',
    badge: 'Super Value • Direct Factory',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    bestFor: 'Study desks, bedroom collage walls, photo grids & multi-poster packs',
    paperQuality: '300 GSM Archival Velvet Matte Paper',
    unframed: {
      ourPrice: 30, // User set: ₹30 single (₹50 for 2, ₹100 for 5, ₹199 for 10)
      marketPrice: 149,
      originalPrice: 99,
      savingsPercent: '80%',
      tapeIncluded: 'Free Nano Tape with Multi-Packs',
    },
    framed: {
      ourPrice: 349,
      marketPrice: 499,
      originalPrice: 699,
      savingsPercent: '50%',
      frameSpec: 'Solid Wood Profile + Shatterproof Acrylic Glass',
    },
    popularUses: ['Desk & study corner', '10–40 Poster bedroom collage', 'Photo shelf display'],
  },
  {
    size: 'A3',
    dimensions: '11.7 × 16.5 in',
    metricDimensions: '29.7 × 42 cm',
    badge: 'Anime & Pop Culture Favorite',
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
    bestFor: 'Bedroom wall art, anime characters, gaming spaces & compact studios',
    paperQuality: '300 GSM Archival Velvet Matte Paper',
    unframed: {
      ourPrice: 99,
      marketPrice: 249,
      originalPrice: 249,
      savingsPercent: '60%',
      tapeIncluded: 'Free Double-Sided Nano Tape Included',
    },
    framed: {
      ourPrice: 549,
      marketPrice: 799,
      originalPrice: 999,
      savingsPercent: '45%',
      frameSpec: 'Solid Wood Profile + 2mm Crystal Acrylic Glass',
    },
    popularUses: ['Anime & manga art wall', 'Bed headboard backdrop', 'Personal creative zone'],
  },
  {
    size: '12 × 18',
    dimensions: '12 × 18 in',
    metricDimensions: '30.5 × 45.7 cm',
    badge: '★ #1 Best Seller in India',
    badgeColor: 'bg-amber-100 text-amber-950 border-amber-300 font-black',
    bestFor: 'Gamer dens, living room accent walls, sports legends & iconic movies',
    paperQuality: '300 GSM Archival Velvet Matte Paper',
    unframed: {
      ourPrice: 149,
      marketPrice: 299,
      originalPrice: 349,
      savingsPercent: '50%',
      tapeIncluded: 'Free Heavy-Duty Nano Tape Included',
    },
    framed: {
      ourPrice: 699,
      marketPrice: 999,
      originalPrice: 1299,
      savingsPercent: '46%',
      frameSpec: '1" Gallery Moulding + Crystal Acrylic + Wall Hooks',
    },
    popularUses: ['Movie buff feature wall', 'RGB gaming room wall', 'Living room statement'],
  },
  {
    size: '18 × 24',
    dimensions: '18 × 24 in',
    metricDimensions: '45.7 × 61 cm',
    badge: 'Grand Statement Centerpiece',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
    bestFor: 'Living room sofa wall, large entrance hallway, executive cabin',
    paperQuality: '300 GSM Ultra-Wide Archival Velvet Paper',
    unframed: {
      ourPrice: 299,
      marketPrice: 499,
      originalPrice: 699,
      savingsPercent: '57%',
      tapeIncluded: 'Shipped in Heavy Rigid Cardboard Tube',
    },
    framed: {
      ourPrice: 1199,
      marketPrice: 1799,
      originalPrice: 2199,
      savingsPercent: '45%',
      frameSpec: 'Heavy-Duty Gallery Frame + Pre-installed Sawtooth Hooks',
    },
    popularUses: ['Living room main sofa focal wall', 'Office conference / cabin', 'Dining room art'],
  },
];

export const SizesPricingBreakdownMatrix = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'unframed' | 'framed'>('all');
  const [showMarketComparison, setShowMarketComparison] = useState<boolean>(true);

  // Helper to generate WhatsApp URL for a specific size enquiry
  const handleWhatsAppEnquiry = (size: string, isFramed: boolean, price: number) => {
    const text = encodeURIComponent(
      `Hi POSTER_ARENA! 🖼️ I am looking for *${size}* posters (${isFramed ? 'Ready-to-hang Framed' : 'Unframed 300 GSM Print'}).\n• Price shown: ₹${price}\nCan you show me the best selling posters available in this size?`
    );
    window.open(`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white via-[#FAF8F5] to-white border-b border-[#E8E2D8]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={13} className="text-amber-700" />
            <span>Direct-from-Manufacturer Pricing • 100% Transparent</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight mb-4">
            Available Sizes & Price Breakdown
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Compare our direct factory pricing with other online websites. Every poster is printed on heavyweight{' '}
            <strong className="text-neutral-900">300 GSM Archival Velvet Paper</strong> with non-fade Japanese pigment inks.
          </p>

          {/* Interactive Filter Tabs (All / Unframed Prints / Framed Wall Art) */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-neutral-950 text-white shadow-md'
                  : 'bg-white text-neutral-600 hover:text-neutral-950 border border-neutral-200'
              }`}
            >
              All Options Side-by-Side
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('unframed')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'unframed'
                  ? 'bg-neutral-950 text-white shadow-md'
                  : 'bg-white text-neutral-600 hover:text-neutral-950 border border-neutral-200'
              }`}
            >
              <span>Unframed 300 GSM Prints</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-800 px-1.5 py-0.5 rounded">From ₹30</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('framed')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'framed'
                  ? 'bg-neutral-950 text-white shadow-md'
                  : 'bg-white text-neutral-600 hover:text-neutral-950 border border-neutral-200'
              }`}
            >
              <span>Ready-to-Hang Framed Art</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-800 px-1.5 py-0.5 rounded">From ₹349</span>
            </button>
          </div>
        </div>

        {/* 4 Cards Grid - 1 for each Standard Size */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-14">
          {SIZES_COMPARISON_DATA.map((item) => {
            return (
              <div
                key={item.size}
                className="group relative rounded-3xl bg-white border-2 border-[#E8E2D8] hover:border-amber-600/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Badge */}
                <div className="p-5 pb-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                    <span className="text-[10px] font-semibold text-neutral-400">
                      {item.metricDimensions}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                    {item.size}
                  </h3>
                  <p className="text-xs font-semibold text-amber-800 mt-0.5">
                    {item.dimensions}
                  </p>
                  <p className="text-[11px] text-neutral-500 mt-2 line-clamp-2 leading-relaxed">
                    {item.bestFor}
                  </p>
                </div>

                {/* Pricing Breakdown Matrix Box */}
                <div className="px-5 py-3 space-y-3 border-t border-b border-neutral-100 bg-[#FAF8F5]/60 flex-1 flex flex-col justify-center">
                  {/* Option 1: Without Frame */}
                  {(activeTab === 'all' || activeTab === 'unframed') && (
                    <div className="p-3 rounded-2xl bg-white border border-[#E8E2D8] shadow-2xs">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-neutral-800 flex items-center gap-1">
                          <span>Unframed Print</span>
                          <span className="text-[9px] font-normal text-neutral-400">(300 GSM)</span>
                        </span>
                        <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                          Save {item.unframed.savingsPercent}
                        </span>
                      </div>

                      {/* Price & Competitor Comparison */}
                      <div className="flex items-baseline justify-between mt-1">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-extrabold text-neutral-900">
                            ₹{item.unframed.ourPrice}
                          </span>
                          <span className="text-xs text-neutral-400 line-through">
                            ₹{item.unframed.originalPrice}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-neutral-400 block line-through">
                            Other Sites: ₹{item.unframed.marketPrice}
                          </span>
                        </div>
                      </div>

                      <p className="text-[10px] text-neutral-500 mt-1 flex items-center gap-1">
                        <Check size={11} className="text-emerald-600 shrink-0" />
                        <span>{item.unframed.tapeIncluded}</span>
                      </p>
                    </div>
                  )}

                  {/* Option 2: With Premium Frame */}
                  {(activeTab === 'all' || activeTab === 'framed') && (
                    <div className="p-3 rounded-2xl bg-white border border-amber-200/80 shadow-2xs">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-neutral-800 flex items-center gap-1">
                          <span>Ready-to-Hang Frame</span>
                        </span>
                        <span className="text-[10px] font-black text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded">
                          Save {item.framed.savingsPercent}
                        </span>
                      </div>

                      {/* Price & Competitor Comparison */}
                      <div className="flex items-baseline justify-between mt-1">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-extrabold text-amber-900">
                            ₹{item.framed.ourPrice}
                          </span>
                          <span className="text-xs text-neutral-400 line-through">
                            ₹{item.framed.originalPrice}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-neutral-400 block line-through">
                            Other Sites: ₹{item.framed.marketPrice}
                          </span>
                        </div>
                      </div>

                      <p className="text-[10px] text-neutral-500 mt-1 flex items-center gap-1">
                        <Check size={11} className="text-amber-700 shrink-0" />
                        <span className="line-clamp-1">{item.framed.frameSpec}</span>
                      </p>
                    </div>
                  )}

                  {/* Popular Use Tags */}
                  <div className="pt-1 flex flex-wrap gap-1">
                    {item.popularUses.map((use, i) => (
                      <span key={i} className="text-[9px] bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded font-medium">
                        • {use}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions (WhatsApp Enquiry & Browse) */}
                <div className="p-4 pt-3 bg-white space-y-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleWhatsAppEnquiry(
                        item.size,
                        activeTab === 'framed',
                        activeTab === 'framed' ? item.framed.ourPrice : item.unframed.ourPrice
                      )
                    }
                    className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <MessageCircle size={14} />
                    <span>Enquire {item.size} on WhatsApp</span>
                  </button>

                  <Link
                    to="/products"
                    className="w-full py-2 bg-[#FAF8F5] hover:bg-neutral-900 hover:text-white border border-[#E8E2D8] rounded-xl text-[11px] font-bold text-neutral-800 text-center block transition-all"
                  >
                    Browse {item.size} Posters
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================================================================
            TRANSPARENCY BENCHMARK: POSTER_ARENA vs. OTHER ONLINE WEBSITES
            ========================================================================= */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-white border border-[#E8E2D8] overflow-hidden shadow-lg">
          <div className="bg-neutral-950 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400 text-neutral-950 text-[10px] font-black uppercase tracking-wider mb-2">
                <ShieldCheck size={12} />
                <span>Market Comparison Study</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight">
                Why Are Our Prices So Much Lower Than Other Websites?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-2xl">
                Most poster websites are middlemen or dropshippers who buy from 3rd-party digital labs and add heavy markups. POSTER_ARENA owns its direct commercial printing machines and framing workshop.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <span className="text-xs text-neutral-400">Direct Factory Advantage:</span>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 font-extrabold text-sm rounded-lg border border-emerald-500/30">
                Up to 80% Less Cost
              </span>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 bg-[#FAF8F5] text-xs font-bold text-neutral-700 uppercase tracking-wider">
                  <th className="py-4 px-6">Feature / Specification</th>
                  <th className="py-4 px-6 text-neutral-500">Other Online Websites (Amazon / Redwolf / Pyari Walls)</th>
                  <th className="py-4 px-6 text-amber-800 bg-amber-50/60 font-black">POSTER_ARENA Direct</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-xs sm:text-sm">
                <tr className="hover:bg-neutral-50/50">
                  <td className="py-3.5 px-6 font-semibold text-neutral-900">
                    A4 Single Print Price
                  </td>
                  <td className="py-3.5 px-6 text-neutral-500">
                    <span className="line-through mr-1">₹149 – ₹199</span>
                    <span className="text-[11px] text-neutral-400 block">+ ₹50-₹80 shipping</span>
                  </td>
                  <td className="py-3.5 px-6 font-bold text-emerald-800 bg-amber-50/30">
                    <span>₹30 Only!</span>
                    <span className="text-[11px] text-neutral-600 font-normal block">(2 for ₹50, 5 for ₹100)</span>
                  </td>
                </tr>

                <tr className="hover:bg-neutral-50/50">
                  <td className="py-3.5 px-6 font-semibold text-neutral-900">
                    A3 / 12×18 Poster Price
                  </td>
                  <td className="py-3.5 px-6 text-neutral-500">
                    <span className="line-through mr-1">₹249 – ₹349</span>
                  </td>
                  <td className="py-3.5 px-6 font-bold text-emerald-800 bg-amber-50/30">
                    <span>A3: ₹99 | 12×18: ₹149</span>
                  </td>
                </tr>

                <tr className="hover:bg-neutral-50/50">
                  <td className="py-3.5 px-6 font-semibold text-neutral-900">
                    Ready-to-Hang Framed Finish
                  </td>
                  <td className="py-3.5 px-6 text-neutral-500">
                    <span className="line-through mr-1">₹699 – ₹1,299+</span>
                  </td>
                  <td className="py-3.5 px-6 font-bold text-neutral-900 bg-amber-50/30">
                    <span>From ₹349 (Solid wood + crystal acrylic)</span>
                  </td>
                </tr>

                <tr className="hover:bg-neutral-50/50">
                  <td className="py-3.5 px-6 font-semibold text-neutral-900">
                    Paper Material & GSM
                  </td>
                  <td className="py-3.5 px-6 text-neutral-500">
                    Thin 170–220 GSM paper (can curl/crease in humidity)
                  </td>
                  <td className="py-3.5 px-6 font-semibold text-neutral-900 bg-amber-50/30">
                    Heavyweight 300 GSM Archival Velvet Paper
                  </td>
                </tr>

                <tr className="hover:bg-neutral-50/50">
                  <td className="py-3.5 px-6 font-semibold text-neutral-900">
                    Frame Glass Safety
                  </td>
                  <td className="py-3.5 px-6 text-neutral-500">
                    Fragile 1mm glass (frequently breaks during courier transit)
                  </td>
                  <td className="py-3.5 px-6 font-semibold text-emerald-800 bg-amber-50/30">
                    2mm Unbreakable Shatterproof Crystal Acrylic
                  </td>
                </tr>

                <tr className="hover:bg-neutral-50/50">
                  <td className="py-3.5 px-6 font-semibold text-neutral-900">
                    Wall Mounting Hardware
                  </td>
                  <td className="py-3.5 px-6 text-neutral-500">
                    Customer has to buy own tape or nails
                  </td>
                  <td className="py-3.5 px-6 font-semibold text-emerald-800 bg-amber-50/30">
                    Free Double-Sided Nano Tape included (Zero wall damage)
                  </td>
                </tr>

                <tr className="hover:bg-neutral-50/50">
                  <td className="py-3.5 px-6 font-semibold text-neutral-900">
                    Ordering & Customization
                  </td>
                  <td className="py-3.5 px-6 text-neutral-500">
                    Rigid pre-packs, no direct WhatsApp support
                  </td>
                  <td className="py-3.5 px-6 font-semibold text-neutral-900 bg-amber-50/30">
                    1-Click WhatsApp Live Proofing & Instant Confirmation
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Interactive Feature Visualizer Callout Banner */}
          <div className="p-6 sm:p-8 bg-neutral-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-1">
                Live Frame Simulation
              </span>
              <h4 className="font-display text-xl sm:text-2xl font-bold tracking-tight">
                Want to preview your poster inside a custom frame on your wall?
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-xl">
                Use our interactive framing studio to test 10+ frame finishes (Matte Black, Oak Wood, Studio White, Gold) and wall plaster shades.
              </p>
            </div>
            <Link
              to="/custom-frame"
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-xs sm:text-sm transition-colors whitespace-nowrap flex items-center gap-2 shadow-md shrink-0"
            >
              <Sliders size={16} />
              <span>Open Frame Visualizer</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SizesPricingBreakdownMatrix;

