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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems, setIsOpen } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Dynamic categories from subfolders + standard list
  const dynamicCategories = useMemo(() => {
    const rawCats = getRawCategories().filter(c => c !== 'All');
    const set = new Set([...rawCats, ...CATEGORIES_LIST]);
    return Array.from(set);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCategoriesOpen(false);
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
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E2D8] transition-all">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-18 lg:h-20">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-neutral-800 hover:text-neutral-900 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Wallora Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <WalloraLogo variant="navbar" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                to="/"
                className="text-sm font-semibold tracking-wide text-neutral-800 hover:text-amber-800 transition-colors"
              >
                Home
              </Link>

              {/* Categories Mega Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                  onMouseEnter={() => setCategoriesOpen(true)}
                  className="text-sm font-semibold tracking-wide text-neutral-800 hover:text-amber-800 transition-colors flex items-center gap-1.5 py-2"
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
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-[560px] bg-white rounded-2xl p-5 shadow-2xl border border-neutral-200/80 z-50 max-h-[480px] overflow-y-auto"
                    >
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100">
                        <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                          Explore All Art Categories ({dynamicCategories.length})
                        </span>
                        <Link
                          to="/products"
                          onClick={() => setCategoriesOpen(false)}
                          className="text-xs font-semibold text-amber-800 hover:underline"
                        >
                          View All Framed Art →
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

              <Link
                to="/products"
                className="text-sm font-semibold tracking-wide text-neutral-800 hover:text-amber-800 transition-colors"
              >
                All Posters
              </Link>



              <Link
                to="/products?filter=framed"
                className="text-sm font-semibold tracking-wide text-neutral-800 hover:text-amber-800 transition-colors"
              >
                Framed Art
              </Link>

              <Link
                to="/poster-wall"
                className="text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Sparkles size={12} className="text-amber-200" />
                <span>Poster Wall</span>
              </Link>

              <Link
                to="/gallery-studio"
                className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Layers size={12} className="text-amber-300" />
                <span>Gallery Studio</span>
              </Link>

              <Link
                to="/custom-frame"
                className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-amber-100/70 text-amber-900 hover:bg-amber-200/80 transition-colors flex items-center gap-1.5"
              >
                <Sliders size={12} />
                <span>Visualizer</span>
              </Link>
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
                className="p-2.5 rounded-full text-neutral-800 hover:bg-neutral-200/50 transition-colors"
              >
                <Search size={20} />
              </button>

              {/* Instagram Quick Link */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                title="Follow @bywallora on Instagram"
                aria-label="Instagram @bywallora"
                className="p-2.5 rounded-full text-neutral-800 hover:text-pink-600 hover:bg-neutral-200/50 transition-colors"
              >
                <Instagram size={20} />
              </a>

              {/* WhatsApp Quick Link */}
              <a
                href={`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=Hello%20WALLORA!%20I%20have%20an%20order%20enquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                title="Chat with Us on WhatsApp"
                className="hidden sm:flex items-center gap-1.5 py-2 px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-semibold shadow-sm transition-colors"
              >
                <MessageCircle size={15} />
                <span>WhatsApp</span>
              </a>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsOpen(true)}
                aria-label="View Cart"
                className="relative p-2.5 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition-colors shadow-sm flex items-center justify-center"
              >
                <ShoppingBag size={19} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 bg-amber-600 text-white rounded-full text-[11px] font-bold flex items-center justify-center shadow-sm">
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
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="block text-base font-semibold text-neutral-900"
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  onClick={() => setMobileOpen(false)}
                  className="block text-base font-semibold text-neutral-900"
                >
                  All Posters (Full Catalog)
                </Link>

                <Link
                  to="/poster-wall"
                  onClick={() => setMobileOpen(false)}
                  className="block text-base font-bold text-amber-700"
                >
                  ✨ The Living Poster Wall (20–30 Multi-Angle)
                </Link>
                <Link
                  to="/gallery-studio"
                  onClick={() => setMobileOpen(false)}
                  className="block text-base font-semibold text-neutral-900"
                >
                  Gallery Wall Studio (1, 3, 4, 5 Frames)
                </Link>
                <Link
                  to="/custom-frame"
                  onClick={() => setMobileOpen(false)}
                  className="block text-base font-semibold text-neutral-800"
                >
                  Interactive Custom Frame Visualizer
                </Link>

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
