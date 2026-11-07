import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Truck, Package, MessageCircle, Sliders, CheckCircle2 } from 'lucide-react';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import WallSetupCard from '@/components/WallSetupCard';
// import GalleryWallStudio from '@/components/GalleryWallStudio';
import PosterWallExperience from '@/components/PosterWallExperience';
import A4BundlePacksSection from '@/components/A4BundlePacksSection';
import SizesPricingBreakdownMatrix from '@/components/SizesPricingBreakdownMatrix';
import { products, CATEGORIES_LIST, CATEGORY_DETAILS, SIZES_LIST, SIZE_PRICING, STORE_WHATSAPP_NUMBER } from '@/data/products';
import { getRawProducts, getRawCategories } from '@/data/rawPosters';
import { getCuratedWallSetups } from '@/data/wallSetups';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [itemTypeFilter, setItemTypeFilter] = useState<'all' | 'packs' | 'single'>('all');

  // Load real raw posters combined with catalog products
  const allCatalogProducts = useMemo(() => {
    const raw = getRawProducts();
    return [...raw, ...products];
  }, []);

  // Dynamically load categories from raw poster folders
  const dynamicCategories = useMemo(() => {
    return getRawCategories();
  }, []);

  // Curated multi-poster wall setup packs (Matching User Screenshots 1, 2, 3, 4)
  const allCuratedSetups = useMemo(() => {
    return getCuratedWallSetups();
  }, []);

  // Filter Wall Setup Packs dynamically by category
  const displayWallPacks = useMemo(() => {
    if (activeCategory === 'All') {
      return allCuratedSetups.slice(0, 4); // Top 4 featured packs on home screen
    }
    const sel = activeCategory.toLowerCase().trim();
    return allCuratedSetups.filter(s => {
      const packCat = s.category.toLowerCase().trim();
      return (
        packCat === sel ||
        packCat.includes(sel) ||
        sel.includes(packCat) ||
        (sel.includes('god') && (packCat.includes('devo') || packCat.includes('spirit'))) ||
        (sel.includes('marvel') && (packCat.includes('super') || packCat.includes('marvel') || packCat.includes('dc'))) ||
        (sel.includes('sport') && (packCat.includes('sport') || packCat.includes('football') || packCat.includes('cricket'))) ||
        (sel.includes('car') && (packCat.includes('car') || packCat.includes('garage') || packCat.includes('auto'))) ||
        (sel.includes('bike') && packCat.includes('bike')) ||
        (sel.includes('anime') && packCat.includes('anime')) ||
        (sel.includes('movie') && (packCat.includes('cinema') || packCat.includes('movie') || packCat.includes('pop')))
      );
    });
  }, [allCuratedSetups, activeCategory]);

  // Dynamic filtered best sellers by active category
  const displayBestSellers = useMemo(() => {
    let list = allCatalogProducts;
    if (activeCategory !== 'All') {
      const sel = activeCategory.toLowerCase().trim();
      list = list.filter(p => {
        const pCat = p.category.toLowerCase().trim();
        const pSub = (p.subcategory || '').toLowerCase().trim();
        return (
          pCat === sel ||
          pCat.includes(sel) ||
          sel.includes(pCat) ||
          pSub === sel ||
          pSub.includes(sel) ||
          (sel.includes('god') && (pCat.includes('devo') || pCat.includes('spirit'))) ||
          (sel.includes('marvel') && (pCat.includes('super') || pCat.includes('marvel') || pCat.includes('dc'))) ||
          (sel.includes('sport') && (pCat.includes('sport') || pCat.includes('cricket') || pCat.includes('football'))) ||
          (sel.includes('car') && (pCat.includes('car') || pCat.includes('garage') || pCat.includes('auto'))) ||
          (sel.includes('bike') && pCat.includes('bike')) ||
          (sel.includes('anime') && pCat.includes('anime')) ||
          (sel.includes('movie') && (pCat.includes('cinema') || pCat.includes('movie'))) ||
          (sel.includes('gym') && (pCat.includes('gym') || pCat.includes('fit'))) ||
          (sel.includes('india') && (pCat.includes('india') || pCat.includes('desi')))
        );
      });
    }
    return list.slice(0, 8);
  }, [allCatalogProducts, activeCategory]);

  // Dynamic categories with real poster preview & real counts for Section 3
  const categoriesWithPreview = useMemo(() => {
    return dynamicCategories
      .filter(c => c !== 'All')
      .map(cat => {
        const sel = cat.toLowerCase().trim();
        const matchingPosters = allCatalogProducts.filter(p => {
          const pCat = p.category.toLowerCase().trim();
          const pSub = (p.subcategory || '').toLowerCase().trim();
          return (
            pCat === sel ||
            pCat.includes(sel) ||
            sel.includes(pCat) ||
            pSub === sel ||
            pSub.includes(sel) ||
            (sel.includes('god') && (pCat.includes('devo') || pCat.includes('spirit'))) ||
            (sel.includes('marvel') && (pCat.includes('super') || pCat.includes('marvel') || pCat.includes('dc'))) ||
            (sel.includes('sport') && (pCat.includes('sport') || pCat.includes('cricket') || pCat.includes('football'))) ||
            (sel.includes('car') && (pCat.includes('car') || pCat.includes('garage') || pCat.includes('auto'))) ||
            (sel.includes('bike') && pCat.includes('bike')) ||
            (sel.includes('anime') && pCat.includes('anime')) ||
            (sel.includes('movie') && (pCat.includes('cinema') || pCat.includes('movie'))) ||
            (sel.includes('gym') && (pCat.includes('gym') || pCat.includes('fit'))) ||
            (sel.includes('india') && (pCat.includes('india') || pCat.includes('desi')))
          );
        });

        const previewImage =
          matchingPosters[0]?.image ||
          CATEGORY_DETAILS[cat]?.image ||
          'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&auto=format&fit=crop&q=80';

        return {
          name: cat,
          count: matchingPosters.length,
          image: previewImage,
          tag: CATEGORY_DETAILS[cat]?.tag || 'Collection',
        };
      })
      .filter(c => c.count > 0);
  }, [dynamicCategories, allCatalogProducts]);

  const newArrivals = allCatalogProducts.filter(p => p.isNew).slice(0, 4);

  return (
    <div className="bg-[#FAF8F5]">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. THE BEDROOM POSTER WALL (Directly on Home Screen) */}
      <section id="poster-wall" className="py-16 sm:py-20 border-b border-[#E8E2D8] bg-[#F7F2E9]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-900 mb-1.5">
                <Sparkles size={14} className="text-amber-700" />
                <span>Featured Experience • Zero Frames</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
                The Living Poster Wall
              </h2>
              <p className="text-sm text-neutral-600 mt-1.5 max-w-2xl leading-relaxed">
                Experience 20 to 30 unframed prints pasted directly on your bedroom wall. Explore different layouts, angles, and room lighting atmospheres (Afternoon Sunlight, Fairy Lights, Bed Headboard, Study Desk).
              </p>
            </div>
            <Link
              to="/poster-wall"
              className="mt-4 md:mt-0 text-sm font-bold text-amber-900 hover:text-amber-700 transition-colors flex items-center gap-1.5 group"
            >
              <span>Immersive Fullscreen Studio</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Interactive Live Poster Wall Component */}
          <div className="shadow-xl rounded-3xl overflow-hidden border border-[#E0D8CB]">
            <PosterWallExperience initialCount={20} initialVibe="afternoon-sun" showControlsHeader={true} isEmbedded={true} />
          </div>
        </div>
      </section>

      {/* 3. Dynamic Poster Categories Grid (Directly from Raw Poster Folders!) */}
      <section className="py-20 border-b border-[#E8E2D8]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-800 mb-2">
                <Sparkles size={14} />
                <span>Curated Collections • Dynamic Categories</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
                Explore {categoriesWithPreview.length} Art Categories
              </h2>
              <p className="text-sm text-neutral-600 mt-1">
                Every folder you create in raw_posters automatically becomes an official category here.
              </p>
            </div>
            <Link
              to="/products"
              className="mt-4 md:mt-0 text-sm font-semibold text-neutral-900 hover:text-amber-800 transition-colors flex items-center gap-1.5 group"
            >
              <span>View All Artworks ({allCatalogProducts.length})</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Grid of Dynamic Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {categoriesWithPreview.map((cat, idx) => {
              return (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(idx * 0.04, 0.3) }}
                >
                  <Link
                    to={`/products?category=${encodeURIComponent(cat.name)}`}
                    className="group block relative rounded-2xl overflow-hidden aspect-[4/5] bg-neutral-900 shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-90"
                      loading="lazy"
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

                    {/* Category Label Overlay */}
                    <div className="absolute bottom-4 inset-x-4">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
                        {cat.tag}
                      </span>
                      <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-amber-200 transition-colors">
                        {cat.name}
                      </h3>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20 text-xs text-neutral-300">
                        <span>{cat.count} Posters</span>
                        <span className="group-hover:translate-x-1 transition-transform text-amber-400">
                          Explore →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Best Sellers Gallery with Dynamic Categories (Directly matching User Screenshots!) */}
      <section className="py-20 border-b border-[#E8E2D8]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-800 mb-1.5">
                <Sparkles size={14} className="text-amber-700" />
                <span>Customer Favorites • 100% Real Raw Posters</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
                Best Selling Posters & Wall Setups
              </h2>
              <p className="text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed">
                Discover viral living room and bedroom setups, complete collage packs, and bestselling individual 300 GSM Archival prints.
              </p>
            </div>
            <Link
              to="/products?filter=bestseller"
              className="mt-4 md:mt-0 text-xs sm:text-sm font-semibold text-neutral-900 hover:text-amber-800 transition-colors flex items-center gap-1"
            >
              <span>Explore All in Catalog</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* DYNAMIC CATEGORY FILTER PILLS BAR (Populated directly from folder names!) */}
          <div className="mb-8">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
              {dynamicCategories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`py-2 px-4 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${activeCategory === cat
                      ? 'bg-neutral-950 text-white shadow-md scale-[1.02]'
                      : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-300/80 shadow-sm'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Quick Filter: All | Wall Setup Packs | Single Prints */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-[#E8E2D8]/80 text-xs">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-neutral-500 font-medium mr-1 hidden sm:inline">Showing:</span>
                <button
                  type="button"
                  onClick={() => setItemTypeFilter('all')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${itemTypeFilter === 'all'
                      ? 'bg-neutral-900 text-white shadow-sm'
                      : 'bg-[#F2ECE1] text-neutral-700 hover:bg-neutral-300/60'
                    }`}
                >
                  All Items ({displayWallPacks.length + displayBestSellers.length})
                </button>
                {displayWallPacks.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setItemTypeFilter('packs')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${itemTypeFilter === 'packs'
                        ? 'bg-neutral-900 text-white shadow-sm'
                        : 'bg-[#F2ECE1] text-neutral-700 hover:bg-neutral-300/60'
                      }`}
                  >
                    Wall Setup Packs ({displayWallPacks.length})
                  </button>
                )}
                {displayBestSellers.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setItemTypeFilter('single')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${itemTypeFilter === 'single'
                        ? 'bg-neutral-900 text-white shadow-sm'
                        : 'bg-[#F2ECE1] text-neutral-700 hover:bg-neutral-300/60'
                      }`}
                  >
                    Single Prints ({displayBestSellers.length})
                  </button>
                )}
              </div>

              <div className="text-xs text-neutral-500 font-medium">
                Active Category: <span className="font-bold text-neutral-900">{activeCategory}</span>
              </div>
            </div>
          </div>

          {/* 1. CURATED WALL SETUP PACKS (Directly matching User Screenshots 1, 2, 3, 4!) */}
          {(itemTypeFilter === 'all' || itemTypeFilter === 'packs') && displayWallPacks.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse" />
                  <h3 className="font-display text-lg sm:text-xl font-bold text-neutral-900">
                    {activeCategory === 'All' ? 'Featured Wall Setup Packs' : `${activeCategory} Wall Setups`}
                  </h3>
                  <span className="text-xs text-neutral-500 hidden sm:inline">
                    • Multi-Poster Bedroom Setups (Free Nano Tape Included)
                  </span>
                </div>
                <Link
                  to="/poster-wall"
                  className="text-xs font-bold text-amber-900 hover:text-amber-700 flex items-center gap-1 group"
                >
                  <span>Build Custom Wall</span>
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {/* Grid of Wall Setup Cards (Matching User Screenshots 1, 2, 3, 4) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
                {displayWallPacks.map(pack => (
                  <WallSetupCard key={pack.id} pack={pack} />
                ))}
              </div>
            </div>
          )}

          {/* 2. BEST SELLING INDIVIDUAL PRINTS (Matching User Screenshot 4) */}
          {(itemTypeFilter === 'all' || itemTypeFilter === 'single') && displayBestSellers.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-900" />
                  <h3 className="font-display text-lg sm:text-xl font-bold text-neutral-900">
                    {activeCategory === 'All' ? 'Bestselling Single Art Prints' : `${activeCategory} Art Prints`}
                  </h3>
                  <span className="text-xs text-neutral-500 hidden sm:inline">
                    • 300 GSM Archival Velvet Paper
                  </span>
                </div>
                <Link
                  to={`/products?category=${encodeURIComponent(activeCategory)}`}
                  className="text-xs font-bold text-neutral-800 hover:text-amber-800 flex items-center gap-1 group"
                >
                  <span>View All {activeCategory}</span>
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {displayBestSellers.map((product, idx) => (
                  <ProductCard key={product.id} product={product} index={idx} />
                ))}
              </div>
            </div>
          )}

          {/* Empty State Fallback */}
          {displayWallPacks.length === 0 && displayBestSellers.length === 0 && (
            <div className="py-16 text-center bg-white rounded-3xl border border-[#E8E2D8] p-8">
              <Sparkles className="w-10 h-10 text-amber-700 mx-auto mb-3 opacity-60" />
              <h3 className="font-display text-lg font-bold text-neutral-900">
                No posters found in &ldquo;{activeCategory}&rdquo;
              </h3>
              <p className="text-xs text-neutral-500 mt-1 max-w-md mx-auto">
                Explore our other categories or browse the full poster collection.
              </p>
              <button
                type="button"
                onClick={() => setActiveCategory('All')}
                className="mt-4 px-5 py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-bold hover:bg-neutral-800 transition-colors"
              >
                Show All Categories
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 5. Living Room Gallery Studio (Framed Wall Art with Mouldings & Mats) */}
      {/* <GalleryWallStudio /> */}

      {/* 6. A4 Poster Pack Combinations (Mix & Match 1 to 40 Prints) */}
      <A4BundlePacksSection />

      {/* 7. Sizes & Framing Breakdown Matrix with Market Price Comparison */}
      <SizesPricingBreakdownMatrix />

      {/* 8. WhatsApp Order Process in 3 Simple Steps */}
      <section className="py-20 border-b border-[#E8E2D8]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 block mb-2">
              Fast & Hassle-Free
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
              Order via WhatsApp in 3 Easy Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-white border border-[#E8E2D8] text-center">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 font-bold text-lg flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-2">
                Choose Art & Size
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Browse our 11 poster categories. Pick between A4, A3, 12×18, or 18×24 sizes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E8E2D8] text-center">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 font-bold text-lg flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-2">
                Pick Framing Finish
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Choose rolled print or premium ready-to-hang frame in Black, Wood, White, or Gold.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E8E2D8] text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 font-bold text-lg flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-2">
                1-Click WhatsApp Enquiry
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Tap the WhatsApp button. Your order manifest auto-fills for instant confirmation & tracking.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href={`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=Hi%20POSTER_ARENA!%20I%20want%20to%20order%20a%20poster`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-md transition-colors"
            >
              <MessageCircle size={18} />
              <span>Chat with our WhatsApp Store Representative</span>
            </a>
          </div>
        </div>
      </section>

      {/* 8. New Arrivals Showcase */}
      {newArrivals.length > 0 && (
        <section className="py-20 border-b border-[#E8E2D8]">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-800 block mb-1.5">
                  Just Dropped
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
                  New Poster Releases
                </h2>
              </div>
              <Link
                to="/products?filter=new"
                className="text-xs sm:text-sm font-semibold text-neutral-900 hover:text-amber-800 transition-colors flex items-center gap-1"
              >
                View All New <ArrowRight size={15} />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {newArrivals.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
