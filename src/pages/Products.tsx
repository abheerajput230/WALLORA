import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, X, Search, Sparkles, RotateCcw, ShieldCheck, Truck, Package, Layers } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products, CATEGORIES_LIST } from '@/data/products';
import { getRawProducts, getRawCategories } from '@/data/rawPosters';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const filterParam = searchParams.get('filter');
  const searchQuery = searchParams.get('search');

  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('default');
  const [localSearch, setLocalSearch] = useState<string>(searchQuery || '');
  const [globalFrameColor, setGlobalFrameColor] = useState<'black' | 'wood' | 'white' | 'gold'>('black');
  const [withMat, setWithMat] = useState<boolean>(false);

  // Keep state synced with URL param changes
  useMemo(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  // Combine real raw posters + catalog products
  const allCatalogProducts = useMemo(() => {
    const raw = getRawProducts();
    return [...raw, ...products];
  }, []);

  // Dynamically merged categories from raw poster folders + standard categories
  const allAvailableCategories = useMemo(() => {
    const rawCats = getRawCategories().filter(c => c !== 'All');
    const set = new Set([...rawCats, ...CATEGORIES_LIST]);
    return Array.from(set);
  }, []);

  // Category counts across all catalog products
  const getCategoryCount = (catName: string) => {
    const sel = catName.toLowerCase().trim();
    return allCatalogProducts.filter(p => {
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
        (sel.includes('sport') && (pCat.includes('sport') || pCat.includes('football') || pCat.includes('cricket'))) ||
        (sel.includes('car') && (pCat.includes('car') || pCat.includes('garage') || pCat.includes('auto'))) ||
        (sel.includes('bike') && pCat.includes('bike')) ||
        (sel.includes('anime') && pCat.includes('anime')) ||
        (sel.includes('movie') && (pCat.includes('cinema') || pCat.includes('movie'))) ||
        (sel.includes('gym') && (pCat.includes('gym') || pCat.includes('fit'))) ||
        (sel.includes('india') && (pCat.includes('india') || pCat.includes('desi')))
      );
    }).length;
  };

  const filteredProducts = useMemo(() => {
    let result = [...allCatalogProducts];

    // Filter by quick filter params
    if (filterParam === 'bestseller') {
      result = result.filter(p => p.isBestSeller);
    } else if (filterParam === 'new') {
      result = result.filter(p => p.isNew);
    }

    // Filter by selected category (fuzzy matching across category and subcategory)
    if (selectedCategory) {
      const sel = selectedCategory.toLowerCase().trim();
      result = result.filter(p => {
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
          (sel.includes('sport') && (pCat.includes('sport') || pCat.includes('football') || pCat.includes('cricket'))) ||
          (sel.includes('car') && (pCat.includes('car') || pCat.includes('garage') || pCat.includes('auto'))) ||
          (sel.includes('bike') && pCat.includes('bike')) ||
          (sel.includes('anime') && pCat.includes('anime')) ||
          (sel.includes('movie') && (pCat.includes('cinema') || pCat.includes('movie'))) ||
          (sel.includes('gym') && (pCat.includes('gym') || pCat.includes('fit'))) ||
          (sel.includes('india') && (pCat.includes('india') || pCat.includes('desi')))
        );
      });
    }

    // Filter by search query
    const query = (localSearch || searchQuery || '').trim().toLowerCase();
    if (query) {
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.subcategory.toLowerCase().includes(query) ||
          p.tags.some(t => t.toLowerCase().includes(query))
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.id.localeCompare(b.id));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'reviews') {
      result.sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [allCatalogProducts, filterParam, selectedCategory, localSearch, searchQuery, sortBy]);

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    if (category) {
      searchParams.set('category', category);
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
    setShowFilters(false);
  };

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setLocalSearch('');
    setSortBy('default');
    setSearchParams({});
  };

  const getPageTitle = () => {
    if (filterParam === 'bestseller') return 'Bestselling Framed Art';
    if (filterParam === 'new') return 'New Framed Art Releases';
    if (selectedCategory) return `${selectedCategory} Framed Wall Art`;
    if (searchQuery) return `Framed Art matching "${searchQuery}"`;
    return 'Premium Framed Wall Art Catalog';
  };

  return (
    <div className="pt-6 pb-20 bg-[#FAF8F5] min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        {/* =========================================================================
            HEADER & BREADCRUMB
            ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-6 border-b border-[#E8E2D8]">
          <div>
            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1.5">
              <Link to="/" className="hover:text-neutral-900">Home</Link>
              <span>/</span>
              <span className="text-neutral-900 font-semibold">Framed Wall Art Catalog</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Sparkles size={11} /> Ready to Hang Framed Art
              </span>
              <span className="text-xs text-neutral-500 hidden sm:inline">
                Solid Synthetic Wood Mouldings • Shatterproof Acrylic Glass
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight">
              {getPageTitle()}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Showing {filteredProducts.length} framed artworks • Handcrafted frames with pre-installed mounting hooks & hardware included
            </p>
          </div>

          {/* Sort & Mobile Filter Toggle */}
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="py-2.5 px-3.5 bg-white border border-[#E8E2D8] rounded-xl text-xs font-semibold text-neutral-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
            >
              <option value="default">Featured / Recommended</option>
              <option value="rating">Highest Rated ★</option>
              <option value="reviews">Most Reviewed</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden py-2.5 px-4 bg-neutral-900 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm"
            >
              <SlidersHorizontal size={15} />
              <span>Filter Categories</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE FRAME CUSTOMIZER BAR (Live Global Frame Finish Switcher!)
            ========================================================================= */}
        <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-white border border-[#E8E2D8] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-800 flex items-center justify-center shrink-0">
              <Layers size={18} />
            </span>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                <span>Live Frame Finish Preview</span>
                <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full">
                  All Artworks
                </span>
              </h3>
              <p className="text-[11px] text-neutral-500 mt-0.5">
                Switch real wooden finishes and mat borders in real-time across the entire catalog
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* 4 Real Frame Finishes */}
            <div className="inline-flex p-1 bg-[#FAF8F5] border border-neutral-200 rounded-xl gap-1">
              {[
                { id: 'black', label: 'Matte Black', color: '#171717' },
                { id: 'wood', label: 'Natural Oak', color: '#C19A6B' },
                { id: 'white', label: 'Studio White', color: '#FFFFFF', border: true },
                { id: 'gold', label: 'Champagne Gold', color: '#D4AF37' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setGlobalFrameColor(f.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                    globalFrameColor === f.id
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'text-neutral-700 hover:text-neutral-950 hover:bg-white/80'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full shrink-0 shadow-2xs"
                    style={{
                      backgroundColor: f.color,
                      border: f.border ? '1px solid #D4D4D4' : 'none',
                    }}
                  />
                  <span>{f.label}</span>
                </button>
              ))}
            </div>

            {/* Passe-Partout Mat Toggle */}
            <button
              onClick={() => setWithMat(!withMat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
                withMat
                  ? 'bg-amber-100/70 border-amber-300 text-amber-950 font-bold shadow-2xs'
                  : 'bg-white border-neutral-200 text-neutral-700 hover:bg-[#FAF8F5]'
              }`}
            >
              <span className={`w-3.5 h-3.5 rounded-sm border ${withMat ? 'bg-white border-amber-600' : 'bg-neutral-100 border-neutral-300'}`} />
              <span>Passe-Partout Mat: {withMat ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>


        {/* =========================================================================
            DYNAMIC CATEGORIES HORIZONTAL PILLS BAR (All Folders from raw_posters!)
            ========================================================================= */}
        <div className="mb-8 overflow-x-auto pb-2 no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            <button
              type="button"
              onClick={() => handleCategorySelect(null)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${!selectedCategory
                ? 'bg-neutral-900 text-white shadow-md'
                : 'bg-white border border-[#E8E2D8] text-neutral-700 hover:border-neutral-400'
                }`}
            >
              All Framed Categories ({allCatalogProducts.length})
            </button>
            {allAvailableCategories.map(cat => {
              const count = getCategoryCount(cat);
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${isSelected
                    ? 'bg-neutral-900 text-white shadow-md'
                    : 'bg-white border border-[#E8E2D8] text-neutral-700 hover:border-neutral-400'
                    }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-100 text-neutral-500'
                      }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            LAYOUT: DESKTOP SIDEBAR + FRAMED PRODUCTS GRID
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="p-5 rounded-2xl bg-white border border-[#E8E2D8] shadow-sm space-y-6">
              {/* Search Inside Catalog */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-800 block mb-2">
                  Search Framed Art
                </label>
                <div className="relative">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    value={localSearch}
                    onChange={e => setLocalSearch(e.target.value)}
                    placeholder="Search by movie, car, anime..."
                    className="w-full pl-9 pr-3 py-2 bg-[#FAF8F5] border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                  {localSearch && (
                    <button
                      onClick={() => setLocalSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Categories List in Sidebar */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                    Art Themes & Folders
                  </label>
                  {selectedCategory && (
                    <button
                      onClick={() => handleCategorySelect(null)}
                      className="text-[11px] text-amber-800 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <RotateCcw size={11} /> Reset
                    </button>
                  )}
                </div>

                <div className="space-y-1 max-h-96 overflow-y-auto pr-1">
                  <button
                    onClick={() => handleCategorySelect(null)}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-semibold text-left transition-colors flex items-center justify-between ${!selectedCategory
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-700 hover:bg-[#FAF8F5]'
                      }`}
                  >
                    <span>All Themes</span>
                    <span className="text-[11px] opacity-75">{allCatalogProducts.length}</span>
                  </button>

                  {allAvailableCategories.map(cat => {
                    const count = getCategoryCount(cat);
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => handleCategorySelect(cat)}
                        className={`w-full py-2 px-3 rounded-lg text-xs transition-colors flex items-center justify-between ${isSelected
                          ? 'bg-neutral-900 text-white font-bold'
                          : 'text-neutral-700 hover:bg-[#FAF8F5]'
                          }`}
                      >
                        <span className="truncate pr-2">{cat}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-500'
                          }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reset All */}
              {(selectedCategory || localSearch) && (
                <button
                  onClick={clearAllFilters}
                  className="w-full py-2.5 bg-[#FAF8F5] border border-neutral-300 hover:bg-neutral-200/60 rounded-xl text-xs font-bold text-neutral-800 transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </aside>

          {/* Mobile Filter Drawer */}
          {showFilters && (
            <div className="fixed inset-0 z-50 lg:hidden flex">
              <div
                className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm"
                onClick={() => setShowFilters(false)}
              />
              <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 overflow-y-auto z-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-4">
                    <h3 className="font-display text-lg font-bold">Categories</h3>
                    <button onClick={() => setShowFilters(false)}>
                      <X size={20} />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={() => handleCategorySelect(null)}
                      className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold text-left ${!selectedCategory ? 'bg-neutral-900 text-white' : 'text-neutral-700 hover:bg-neutral-100'
                        }`}
                    >
                      All Categories ({allCatalogProducts.length})
                    </button>
                    {allAvailableCategories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => handleCategorySelect(cat)}
                        className={`w-full py-2.5 px-3 rounded-lg text-xs font-medium text-left flex justify-between ${selectedCategory === cat
                          ? 'bg-neutral-900 text-white font-bold'
                          : 'text-neutral-700 hover:bg-neutral-100'
                          }`}
                      >
                        <span>{cat}</span>
                        <span>{getCategoryCount(cat)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full py-3 bg-neutral-900 text-white rounded-xl text-xs font-bold mt-6"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* =========================================================================
              MAIN FRAMED PRODUCTS GRID ("yha pe frames aaynge, khali poster nahi")
              ========================================================================= */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-[#E8E2D8]">
                <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
                  No framed art found
                </h3>
                <p className="text-xs text-neutral-500 mb-6 max-w-md mx-auto">
                  We couldn&apos;t find any framed artworks matching your search or filters. Try choosing another category or reset filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-neutral-800 transition-colors"
                >
                  Show All Framed Artworks
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
                {filteredProducts.map((product, idx) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={idx}
                    framed={true}
                    frameColor={globalFrameColor}
                    withMat={withMat}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;
