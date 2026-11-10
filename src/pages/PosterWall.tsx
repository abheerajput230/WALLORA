import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Layers,
  ArrowRight,
  Package,
  Truck,
  MessageCircle,
  Shuffle,
  ShoppingBag,
  Check,
} from 'lucide-react';
// import SplitFormatBar from '@/components/SplitFormatBar';
// import WallLayoutArchitect from '@/components/WallLayoutArchitect';
import WallSetupCard from '@/components/WallSetupCard';
import DeskPosterCard from '@/components/DeskPosterCard';
import InteractiveCustomPosterWall, { WallShape } from '@/components/InteractiveCustomPosterWall';
import { getCuratedWallSetups } from '@/data/wallSetups';
import { Product, STORE_WHATSAPP_NUMBER } from '@/data/products';
import { getRawPosters, getRawCategories } from '@/data/rawPosters';

const PosterWallPage = () => {
  // All raw posters from src/assets/raw_posters & subfolders
  const allRaw = useMemo(() => getRawPosters(), []);

  // Dynamically detected categories from folder names (e.g. sports, gods, anime, cars, etc.)
  const categories = useMemo(() => getRawCategories(), [allRaw]);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<string>('split-4');
  const [selectedLayoutPreset, setSelectedLayoutPreset] = useState<string>('showcase-wall');
  const [activePreviewSource, setActivePreviewSource] = useState<'format' | 'layout'>('format');
  const [filterSize, setFilterSize] = useState<string>('all');

  // Load Wall Setup Packs powered 100% by local raw posters
  const allCuratedSetups = useMemo(() => getCuratedWallSetups(), []);

  // Filter Wall Setup Packs by Category
  const filteredSetups = useMemo(() => {
    if (selectedCategory === 'All') return allCuratedSetups;
    const sel = selectedCategory.toLowerCase().trim();
    return allCuratedSetups.filter(s => {
      const packCat = s.category.toLowerCase().trim();
      return (
        packCat === sel ||
        packCat.includes(sel) ||
        sel.includes(packCat) ||
        (sel.includes('god') && packCat.includes('devo')) ||
        (sel.includes('marvel') && packCat.includes('super')) ||
        (sel.includes('sport') && packCat.includes('sport'))
      );
    });
  }, [allCuratedSetups, selectedCategory]);

  // Derive suggested count & shape for InteractiveCustomPosterWall based on user clicking Format or Blueprint presets
  const wallConfig = useMemo(() => {
    if (activePreviewSource === 'layout') {
      if (selectedLayoutPreset === 'mosaic-wall') return { count: 19, shape: 'organic-mosaic' as WallShape };
      if (selectedLayoutPreset === 'hero-wall') return { count: 20, shape: 'hero-focus' as WallShape };
      if (selectedLayoutPreset === 'showcase-wall') return { count: 20, shape: 'hero-focus' as WallShape };
      if (selectedLayoutPreset === 'trio-xl-wall') return { count: 40, shape: 'diamond' as WallShape };
    }
    if (selectedFormat === 'split-3') return { count: 15, shape: 'stairs' as WallShape };
    if (selectedFormat === 'split-4') return { count: 20, shape: 'hero-focus' as WallShape };
    if (selectedFormat === 'split-5') return { count: 25, shape: 'diamond' as WallShape };
    if (selectedFormat === 'split-8') return { count: 32, shape: 'v-shape' as WallShape };
    if (selectedFormat === 'single') return { count: 24, shape: 'random-organic' as WallShape };
    return { count: 20, shape: 'hero-focus' as WallShape };
  }, [activePreviewSource, selectedFormat, selectedLayoutPreset]);

  // Raw posters converted to Products for the desk cards section
  const allDeskPosters = useMemo<Product[]>(() => {
    return allRaw.slice(0, 36).map((rp, i) => ({
      id: rp.id,
      title: rp.title,
      slug: rp.id,
      category: 'Aesthetic Poster Wall',
      subcategory: 'Desk Wall Art',
      tags: ['Poster Wall', 'Desk Decor', '300 GSM', 'Raw Poster'],
      image: rp.imageSrc,
      description: `${rp.title} printed on 300 GSM Archival Velvet Paper with non-fade pigment inks.`,
      paperQuality: '300 GSM Archival Velvet Paper',
      rating: 4.9,
      reviews: 80 + (i % 40),
      isBestSeller: i % 3 === 0,
      isNew: i % 4 === 0,
    }));
  }, [allRaw]);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* =========================================================================
          1. TOP HERO HEADER & DYNAMIC CATEGORY TABS (From Folder Names!)
          ========================================================================= */}
      <div className="border-b border-[#E8E2D8] bg-white sticky top-16 lg:top-20 z-30 shadow-sm">
        <div className="container mx-auto px-4 lg:px-8 py-3.5 sm:py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 mb-2.5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles size={11} /> 100% Real Raw Posters Only
                </span>
                <span className="text-xs text-neutral-500 font-medium hidden sm:inline">
                  300 GSM Archival Velvet Paper • Free Double-Sided Nano Tape
                </span>
              </div>
              <h1 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                Poster Wall Setups
              </h1>
            </div>

            {/* Quick Action: WhatsApp Helpline */}
            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=Hi%20POSTER_ARENA!%20I%20want%20to%20order%20a%20Wall%20Setup%20Pack`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <MessageCircle size={14} />
                <span>WhatsApp Helpline</span>
              </a>
            </div>
          </div>

          {/* Horizontal Scrolling Category Filter Bar (Dynamically populated from folder names!) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`py-2 px-3.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-neutral-950 text-white shadow-sm'
                    : 'bg-[#FAF8F5] text-neutral-700 hover:bg-neutral-200/60 border border-neutral-300/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-6 sm:py-10 space-y-12">
        {/* =========================================================================
            2. FORMAT SELECTOR BAR (Matching Image 3: Single, 3-Piece, 4-Piece, 8-Piece)
            ========================================================================= */}
        {/* <section className="bg-white p-5 sm:p-7 rounded-3xl border border-[#E8E2D8] shadow-sm">
          <SplitFormatBar
            selectedFormat={selectedFormat}
            onSelectFormat={fmtId => {
              setSelectedFormat(fmtId);
              setActivePreviewSource('format');
            }}
          />
        </section> */}

        {/* =========================================================================
            3. WALL LAYOUT ARCHITECT BLUEPRINTS (Matching Image 5)
            ========================================================================= */}
        {/* <section className="bg-white p-5 sm:p-7 rounded-3xl border border-[#E8E2D8] shadow-sm">
          <WallLayoutArchitect
            selectedLayoutId={selectedLayoutPreset}
            onSelectLayout={layout => {
              setSelectedLayoutPreset(layout.id);
              setActivePreviewSource('layout');
            }}
          />
        </section> */}

        {/* =========================================================================
            4. DYNAMIC INTERACTIVE CUSTOM POSTER WALL ("Zero Fixed Layout • 1 to 40 Slider • Shuffle & Swap")
            ========================================================================= */}
        <section id="custom-poster-wall" className="scroll-mt-24">
          <InteractiveCustomPosterWall
            initialCount={wallConfig.count}
            initialShape={wallConfig.shape}
            selectedCategory={selectedCategory}
          />
        </section>

        {/* =========================================================================
            5. MAIN HERO: WALL SETUP PACKS GRID (Directly matching User Screenshots!)
            ========================================================================= */}
        <section id="wall-setups" className="space-y-6">
          <div className="flex items-baseline justify-between">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                {selectedCategory === 'All' ? 'All Wall Setup Packs' : `${selectedCategory} Wall Setups`}
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Every card shows a multi-image room wall setup rendered with real raw posters • Free Nano Tape included
              </p>
            </div>
            <span className="text-xs font-semibold text-neutral-500">
              {filteredSetups.length} Setups
            </span>
          </div>

          {/* Grid of Wall Setup Cards: 1 col on mobile, 2 on tablet, 3-4 on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredSetups.map(pack => (
              <WallSetupCard key={pack.id} pack={pack} />
            ))}
          </div>
        </section>

        {/* =========================================================================
            6. INDIVIDUAL DESK POSTERS WITH IN-CARD SIZE SELECTOR (Matching Image 4)
            ========================================================================= */}
        <section id="individual-posters" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E8E2D8]">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800 block mb-1">
                Single Posters & Desk Mockups
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                Shop Single Raw Art Prints
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Select size on card: A5 (₹79), A4 (₹119), A3 (₹249), 13×19 (₹349) • Buy 4 Get 3 FREE!
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[10px] font-bold text-neutral-500 uppercase">Size:</span>
              {(['all', 'A5', 'A4', 'A3', '13×19'] as const).map(sz => (
                <button
                  key={sz}
                  onClick={() => setFilterSize(sz)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${filterSize === sz
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-300'
                    }`}
                >
                  {sz.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Desk Posters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {allDeskPosters.map((product, idx) => (
              <DeskPosterCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        </section>

        {/* =========================================================================
            7. PROPOSITION VALUE CARDS
            ========================================================================= */}
        <section className="bg-white border border-[#E8E2D8] rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-amber-50 text-amber-800 rounded-xl">
                <Package size={20} />
              </div>
              <div>
                <h4 className="font-display font-bold text-neutral-900 text-sm mb-0.5">
                  300 GSM Velvet Paper
                </h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Heavyweight archival matte with non-fade pigment inks and zero glare.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-amber-50 text-amber-800 rounded-xl">
                <Sparkles size={20} />
              </div>
              <div>
                <h4 className="font-display font-bold text-neutral-900 text-sm mb-0.5">
                  Free Wall-Safe Tape
                </h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Removable nano mounting tape that leaves zero paint residue on bedroom walls.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-amber-50 text-amber-800 rounded-xl">
                <Truck size={20} />
              </div>
              <div>
                <h4 className="font-display font-bold text-neutral-900 text-sm mb-0.5">
                  Rigid Tube Packaging
                </h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Posters are tissue-wrapped and delivered in heavy crush-proof postal tubes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-amber-50 text-amber-800 rounded-xl">
                <MessageCircle size={20} />
              </div>
              <div>
                <h4 className="font-display font-bold text-neutral-900 text-sm mb-0.5">
                  WhatsApp Instant Help
                </h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Direct support and order confirmation via WhatsApp store chat.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PosterWallPage;
