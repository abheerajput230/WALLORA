import { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, ChevronDown, MessageCircle, Sparkles, Sliders, Layers, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { CATEGORIES_LIST, STORE_WHATSAPP_NUMBER } from '@/data/products';
import { getRawCategories } from '@/data/rawPosters';
import WalloraLogo, { INSTAGRAM_URL } from '@/components/WalloraLogo';

const Navbar = () => {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [studiosOpen, setStudiosOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems, setIsOpen } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const studiosRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Dynamic categories from subfolders + standard list
  const dynamicCategories = useMemo(() => {
    const rawCats = getRawCategories().filter(c => c !== 'All');
    const set = new Set([...rawCats, ...CATEGORIES_LIST]);
    return Array.from(set);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setCategoriesOpen(false);
      }
      if (studiosRef.current && !studiosRef.current.contains(target)) {
        setStudiosOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Top Banner Bar */}
      <div className="bg-neutral-900 text-neutral-200 text-xs py-2 px-4 font-body tracking-wider text-center border-b border-neutral-800">
        <div className="container mx-auto flex items-center justify-between">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-amber-400 font-medium">
            <Sparkles size={13} /> Museum Grade 300 GSM Prints & Custom Frames
          </span>
          <p className="mx-auto text-[11px] sm:text-xs">
            Free Shipping on Orders Over <span className="font-bold text-white">₹699</span> • Safe Tube & Box Packaging
          </p>
          <div className="hidden md:flex items-center gap-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-pink-400 hover:text-pink-300 font-medium transition-colors"
            >
              <Instagram size={13} /> @bywallora
            </a>
            <a
              href={`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=Hi%20WALLORA!%20I%20have%20an%20enquiry`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <MessageCircle size={13} /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D8] transition-all">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-neutral-800 hover:text-neutral-900 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Wallora Logo */}
            <Link to="/" className="flex items-center gap-2 group mr-2 xl:mr-6 shrink-0">
              <WalloraLogo variant="navbar" />
            </Link>

            {/* Desktop Navigation - Clean, Single-Line, Zero-Wrap Luxury Design */}
            <nav className="hidden lg:flex items-center flex-nowrap gap-3.5 xl:gap-6 2xl:gap-8 shrink-0">
              <Link
                to="/"
                className="text-xs xl:text-sm font-semibold tracking-wide text-neutral-700 hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 py-2"
              >
                Home
              </Link>

              <Link
                to="/products?filter=framed"
                className="text-xs xl:text-sm font-semibold tracking-wide text-neutral-700 hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 py-2"
              >
                Framed Art
              </Link>

              <Link
                to="/products"
                className="text-xs xl:text-sm font-semibold tracking-wide text-neutral-700 hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 py-2"
              >
                Posters
              </Link>

              {/* Categories Mega Dropdown */}
              <div className="relative shrink-0" ref={dropdownRef}>
                <button
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                  onMouseEnter={() => setCategoriesOpen(true)}
                  className="text-xs xl:text-sm font-semibold tracking-wide text-neutral-700 hover:text-neutral-950 transition-colors whitespace-nowrap flex items-center gap-1 py-2"
                >
                  <span>Categories</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${categoriesOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {categoriesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      onMouseLeave={() => setCategoriesOpen(false)}
                      className="absolute left-0 top-full mt-1 w-[560px] bg-white rounded-2xl p-5 shadow-2xl border border-neutral-200/80 z-50 max-h-[480px] overflow-y-auto"
                    >
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100">
                        <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                          Explore Art Categories ({dynamicCategories.length})
                        </span>
                        <Link
                          to="/products"
                          onClick={() => setCategoriesOpen(false)}
                          className="text-xs font-semibold text-amber-800 hover:underline"
                        >
                          View All Art →
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {dynamicCategories.map(category => (
                          <Link
                            key={category}
                            to={`/products?category=${encodeURIComponent(category)}`}
                            onClick={() => setCategoriesOpen(false)}
                            className="p-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors flex items-center justify-between group"
                          >
                            <span className="text-sm font-medium text-neutral-800 group-hover:text-amber-900 group-hover:font-semibold">
                              {category}
                            </span>
                            <span className="text-[11px] text-neutral-400 group-hover:text-amber-700">
                              Explore →
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Combo Packs / Pricing */}
              <a
                href="/#sizes-matrix"
                className="text-xs xl:text-sm font-semibold tracking-wide text-neutral-700 hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 py-2 flex items-center gap-1.5"
              >
                <span>Combos</span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200/70 whitespace-nowrap">
                  ₹30+
                </span>
              </a>

              {/* 3D Wall Studios Unified Dropdown */}
              <div className="relative shrink-0" ref={studiosRef}>
                <button
                  onClick={() => setStudiosOpen(!studiosOpen)}
                  onMouseEnter={() => setStudiosOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-neutral-900 bg-white hover:bg-neutral-50 border border-neutral-300 shadow-2xs transition-all whitespace-nowrap shrink-0"
                >
                  <Sparkles size={12} className="text-amber-600 shrink-0" />
                  <span className="whitespace-nowrap">3D Studios</span>
                  <ChevronDown
                    size={13}
                    className={`shrink-0 transition-transform duration-200 ${studiosOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {studiosOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      onMouseLeave={() => setStudiosOpen(false)}
                      className="absolute right-0 xl:left-0 top-full mt-1.5 w-[360px] bg-white rounded-2xl p-3 shadow-2xl border border-neutral-200 z-50"
                    >
                      <div className="px-3 pt-2 pb-2 border-b border-neutral-100 flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                          Interactive Studio Tools
                        </span>
                        <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                          Live 3D
                        </span>
                      </div>

                      <div className="p-1 space-y-1 mt-1">
                        {/* 1. Gallery Wall Studio */}
                        <Link
                          to="/gallery-studio"
                          onClick={() => setStudiosOpen(false)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-neutral-900 text-amber-300 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                            <Layers size={18} />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-neutral-900 group-hover:text-amber-900">
                                Gallery Wall Studio
                              </span>
                              <span className="text-[9px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded-full uppercase">
                                Real Frames
                              </span>
                            </div>
                            <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                              3D living room wall preview with Oak Wood, Matte Black & Gold finishes.
                            </p>
                          </div>
                        </Link>

                        {/* 2. Poster Wall Creator */}
                        <Link
                          to="/poster-wall"
                          onClick={() => setStudiosOpen(false)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                            <Sparkles size={18} />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-neutral-900 group-hover:text-amber-900">
                                The Living Poster Wall
                              </span>
                              <span className="text-[9px] font-bold bg-emerald-100 text-emerald-900 px-1.5 py-0.2 rounded-full uppercase">
                                Multi-Packs
                              </span>
                            </div>
                            <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                              Curate 20–30 print packs with instant discounts and multi-angle room grids.
                            </p>
                          </div>
                        </Link>

                        {/* 3. Custom Frame Visualizer */}
                        <Link
                          to="/custom-frame"
                          onClick={() => setStudiosOpen(false)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-neutral-100 text-neutral-800 border border-neutral-200 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                            <Sliders size={18} />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-neutral-900 group-hover:text-amber-900">
                                Custom Frame Visualizer
                              </span>
                            </div>
                            <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                              Upload your photo, select moulding widths & mat borders in real-time.
                            </p>
                          </div>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Right Action Icons - Zero Wrap & Balanced */}
            <div className="flex items-center flex-nowrap gap-1.5 sm:gap-2.5 shrink-0">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
                className="p-2 rounded-full text-neutral-700 hover:text-neutral-950 hover:bg-neutral-200/60 transition-colors shrink-0"
              >
                <Search size={18} />
              </button>

              {/* Instagram Quick Link */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                title="Follow @bywallora on Instagram"
                aria-label="Instagram @bywallora"
                className="p-2 rounded-full text-neutral-700 hover:text-pink-600 hover:bg-neutral-200/60 transition-colors shrink-0"
              >
                <Instagram size={18} />
              </a>

              {/* WhatsApp Quick Helpline Pill */}
              <a
                href={`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=Hello%20WALLORA!%20I%20have%20an%20order%20enquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                title="Chat with Us on WhatsApp"
                className="hidden sm:inline-flex items-center gap-1.5 py-1.5 px-3 bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white border border-emerald-200 rounded-full text-xs font-semibold transition-all shadow-2xs whitespace-nowrap shrink-0"
              >
                <MessageCircle size={14} className="text-emerald-600 group-hover:text-white shrink-0" />
                <span className="whitespace-nowrap">WhatsApp</span>
              </a>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsOpen(true)}
                aria-label="View Cart"
                className="relative p-2.5 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition-colors shadow-sm flex items-center justify-center shrink-0 ml-0.5"
              >
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[19px] h-[19px] px-1 bg-amber-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-xs">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Search Input Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-[#E8E2D8] bg-white overflow-hidden shadow-inner"
            >
              <div className="container mx-auto px-4 py-4">
                <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto flex items-center">
                  <Search size={18} className="absolute left-4 text-neutral-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search by poster name, anime, movies, cars, or vibes (e.g. Dark Knight, Naruto)..."
                    autoFocus
                    className="w-full pl-11 pr-24 py-3 bg-[#FAF8F5] border border-neutral-300 rounded-full text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 px-4 py-1.5 bg-neutral-900 text-white rounded-full text-xs font-semibold hover:bg-neutral-800 transition-colors"
                  >
                    Search
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Flyout Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-[#E8E2D8] bg-[#FAF8F5] max-h-[80vh] overflow-y-auto px-6 py-6"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <Link
                    to="/"
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm font-semibold text-neutral-900 py-1.5"
                  >
                    Home
                  </Link>
                  <Link
                    to="/products?filter=framed"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between text-sm font-semibold text-neutral-900 py-1.5"
                  >
                    <span>Framed Wall Art</span>
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full uppercase">
                      Ready to Hang
                    </span>
                  </Link>
                  <Link
                    to="/products"
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm font-semibold text-neutral-900 py-1.5"
                  >
                    Posters (300 GSM Prints)
                  </Link>
                  <a
                    href="/#sizes-matrix"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between text-sm font-semibold text-neutral-900 py-1.5"
                  >
                    <span>Combos & Packs</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      From ₹30
                    </span>
                  </a>
                </div>

                {/* 3D Studios Section */}
                <div className="pt-3 border-t border-[#E8E2D8]">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
                    Interactive 3D Studios
                  </p>
                  <div className="space-y-1.5">
                    <Link
                      to="/gallery-studio"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#E8E2D8] text-xs font-bold text-neutral-900"
                    >
                      <div className="flex items-center gap-2">
                        <Layers size={15} className="text-amber-700" />
                        <span>Gallery Wall Studio</span>
                      </div>
                      <span className="text-[9px] text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded-full">3D Room</span>
                    </Link>
                    <Link
                      to="/poster-wall"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#E8E2D8] text-xs font-bold text-neutral-900"
                    >
                      <div className="flex items-center gap-2">
                        <Sparkles size={15} className="text-amber-700" />
                        <span>The Living Poster Wall</span>
                      </div>
                      <span className="text-[9px] text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded-full">Pack Saver</span>
                    </Link>
                    <Link
                      to="/custom-frame"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#E8E2D8] text-xs font-bold text-neutral-900"
                    >
                      <div className="flex items-center gap-2">
                        <Sliders size={15} className="text-neutral-700" />
                        <span>Custom Frame Visualizer</span>
                      </div>
                      <span className="text-[9px] text-neutral-600 bg-neutral-100 px-1.5 py-0.2 rounded-full">Custom</span>
                    </Link>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8E2D8]">
                  <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3">
                    Categories ({dynamicCategories.length})
                  </p>
                  <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                    {dynamicCategories.map(category => (
                      <Link
                        key={category}
                        to={`/products?category=${encodeURIComponent(category)}`}
                        onClick={() => setMobileOpen(false)}
                        className="text-xs font-medium text-neutral-800 py-1.5 hover:text-amber-800"
                      >
                        • {category}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 text-white rounded-xl text-center text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Instagram size={17} /> Follow @bywallora on Instagram
                  </a>

                  <a
                    href={`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=Hi%20WALLORA!%20I%20have%20an%20enquiry.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-emerald-600 text-white rounded-xl text-center text-sm font-semibold flex items-center justify-center gap-2 shadow-sm"
                  >
                    <MessageCircle size={18} /> Chat on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
