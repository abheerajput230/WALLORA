import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  MessageCircle,
  Sparkles,
  Check,
  ArrowRight,
  Flame,
  CheckCircle2,
  Package,
  Layers,
  Truck,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { A4_BUNDLE_PACKS, PosterBundlePack, generateBundleWhatsAppUrl } from '@/data/bundlePacks';
import { getRawPosters } from '@/data/rawPosters';

export const A4BundlePacksSection = () => {
  const { addItem } = useCart();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'small' | 'collages' | 'mega'>('all');
  const [addedPackId, setAddedPackId] = useState<string | null>(null);

  // Raw posters for preview thumbnails
  const rawPosters = useMemo(() => getRawPosters(), []);

  const filteredPacks = useMemo(() => {
    if (selectedFilter === 'small') {
      return A4_BUNDLE_PACKS.filter(p => p.count <= 5);
    }
    if (selectedFilter === 'collages') {
      return A4_BUNDLE_PACKS.filter(p => p.count >= 10 && p.count <= 25);
    }
    if (selectedFilter === 'mega') {
      return A4_BUNDLE_PACKS.filter(p => p.count >= 30);
    }
    return A4_BUNDLE_PACKS;
  }, [selectedFilter]);

  const handleAddToCart = (pack: PosterBundlePack, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const previewImg = rawPosters[0]?.imageSrc || '';

    addItem(
      {
        id: `bundle-${pack.id}`,
        title: `${pack.count} A4 Posters Pack (${pack.tagline})`,
        slug: pack.id,
        category: 'A4 Poster Bundle Packs',
        subcategory: `${pack.count} Prints Mix & Match`,
        tags: ['A4 Bundle', `${pack.count} Posters`, 'Archival Velvet Paper', 'Nano Tape'],
        image: previewImg,
        description: `${pack.description} Includes ${pack.tapeRolls > 0 ? `${pack.tapeRolls} roll(s) of wall-safe nano tape` : 'safe protective packaging'}.`,
        paperQuality: '300 GSM Heavyweight Archival Velvet Paper',
        rating: 4.9,
        reviews: 95 + pack.count * 4,
        isBestSeller: pack.popular || pack.bestValue,
      },
      'A4',
      false,
      undefined,
      1
    );

    setAddedPackId(pack.id);
    setTimeout(() => setAddedPackId(null), 2200);
  };

  const handleWhatsAppOrder = (pack: PosterBundlePack, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const url = generateBundleWhatsAppUrl(pack);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="a4-bundle-packs" className="py-20 bg-white border-b border-[#E8E2D8]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-800 mb-2">
              <Sparkles size={14} className="text-amber-700" />
              <span>Unbeatable Bulk Pricing • 100% Real Raw Posters</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
              A4 Poster Pack Combinations (9×12 Inch)
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-2 max-w-2xl leading-relaxed">
              Mix & match any artworks: <span className="font-bold text-neutral-900">1 Poster @ ₹30, 2 Posters @ ₹50, 5 Posters @ ₹100</span>! Just pay nominal courier charge on small packs • <span className="font-bold text-emerald-800">FREE Courier Delivery on 20+ Posters!</span>
            </p>
          </div>

          <Link
            to="/poster-wall"
            className="text-xs sm:text-sm font-bold text-amber-900 hover:text-amber-700 flex items-center gap-1.5 group whitespace-nowrap"
          >
            <span>Live 1–40 Wall Visualizer</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Filter Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-10 pb-1">
          <button
            type="button"
            onClick={() => setSelectedFilter('all')}
            className={`py-2 px-4 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedFilter === 'all'
                ? 'bg-neutral-950 text-white shadow-sm'
                : 'bg-[#FAF8F5] text-neutral-700 hover:bg-neutral-200/60 border border-neutral-300'
            }`}
          >
            All Combinations (8 Packs)
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('small')}
            className={`py-2 px-4 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedFilter === 'small'
                ? 'bg-neutral-950 text-white shadow-sm'
                : 'bg-[#FAF8F5] text-neutral-700 hover:bg-neutral-200/60 border border-neutral-300'
            }`}
          >
            Starter & Desk Sets (1, 2, 5 Posters)
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('collages')}
            className={`py-2 px-4 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedFilter === 'collages'
                ? 'bg-neutral-950 text-white shadow-sm'
                : 'bg-[#FAF8F5] text-neutral-700 hover:bg-neutral-200/60 border border-neutral-300'
            }`}
          >
            🔥 Bedroom Collages (10, 20, 25 Posters)
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('mega')}
            className={`py-2 px-4 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedFilter === 'mega'
                ? 'bg-neutral-950 text-white shadow-sm'
                : 'bg-[#FAF8F5] text-neutral-700 hover:bg-neutral-200/60 border border-neutral-300'
            }`}
          >
            ★ Mega Wall Takeover (30, 40 Posters)
          </button>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPacks.map((pack, idx) => {
            const isAdded = addedPackId === pack.id;
            const savingsPercent = Math.round(((pack.mrp - pack.price) / pack.mrp) * 100);

            return (
              <motion.div
                key={pack.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(idx * 0.05, 0.3) }}
                className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ${
                  pack.popular || pack.bestValue
                    ? 'bg-gradient-to-b from-[#FFFDF9] to-[#F8F3EA] border-2 border-amber-600 shadow-lg'
                    : 'bg-[#FAF8F5] border border-[#E8E2D8] hover:border-neutral-400 hover:shadow-md'
                }`}
              >
                {/* Top Badge */}
                {pack.badge && (
                  <div className="absolute -top-3 left-6">
                    <span
                      className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1 ${
                        pack.popular || pack.bestValue
                          ? 'bg-amber-600 text-white'
                          : 'bg-neutral-900 text-white'
                      }`}
                    >
                      {pack.popular && <Flame size={12} className="fill-amber-300 text-amber-300" />}
                      {pack.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Poster Count Pill */}
                  <div className="flex items-center justify-between mb-3 mt-1">
                    <span className="px-2.5 py-1 rounded-lg bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider">
                      {pack.count} {pack.count === 1 ? 'A4 Poster' : 'A4 Posters'}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                      {savingsPercent}% OFF
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 mb-1">
                    {pack.name}
                  </h3>
                  <p className="text-xs font-medium text-amber-900 mb-4">
                    {pack.tagline}
                  </p>

                  {/* Pricing Box */}
                  <div className="py-4 px-4 rounded-2xl bg-white border border-[#E8E2D8] mb-4 shadow-sm">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-extrabold text-neutral-950">
                          ₹{pack.price}
                        </span>
                        <span className="text-xs text-neutral-400 line-through">
                          ₹{pack.mrp}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] font-bold text-neutral-800 bg-neutral-100 px-2 py-0.5 rounded">
                          ₹{pack.perPosterPrice}/print
                        </span>
                      </div>
                    </div>
                    <p className="text-[10px] text-neutral-500 mt-1">
                      Covers: <strong className="text-neutral-800">{pack.dimensions}</strong>
                    </p>
                  </div>

                  {/* Bullet Inclusions */}
                  <div className="space-y-2 mb-6 text-xs text-neutral-600">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>300 GSM Heavyweight Archival Velvet Paper</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        {pack.tapeRolls > 0
                          ? `Free ${pack.tapeRolls} Roll(s) Double-Sided Nano Tape`
                          : 'Ready for framing or sticky mounting'}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>Mix any images from raw poster catalog</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Truck size={14} className="text-amber-800 shrink-0 mt-0.5" />
                      <span className="font-semibold text-neutral-800">{pack.courierText}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-2 border-t border-[#E8E2D8]">
                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(pack, e)}
                    className="w-full py-2.5 sm:py-3 px-4 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
                  >
                    {isAdded ? (
                      <>
                        <Check size={16} className="text-emerald-400" />
                        <span>Added to Cart ✓</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={15} />
                        <span>Add {pack.count} Pack • ₹{pack.price}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleWhatsAppOrder(pack, e)}
                    className="w-full py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle size={14} className="text-emerald-600" />
                    <span>WhatsApp Order</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-neutral-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
              Interactive 3D Collage Visualizer
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold">
              Want to see 20, 25 or 40 posters arranged on your bedroom wall?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
              Use our 1-to-40 range slider with organic shapes (Hero centerpiece, Diamond, Staircase) and ambient room lighting.
            </p>
          </div>

          <Link
            to="/poster-wall"
            className="py-3 px-6 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-xs sm:text-sm transition-all whitespace-nowrap flex items-center gap-2 shadow-md active:scale-95"
          >
            <span>Open Interactive Poster Wall</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default A4BundlePacksSection;

