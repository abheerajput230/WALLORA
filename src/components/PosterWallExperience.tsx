import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shuffle,
  Sun,
  Sparkles,
  ShoppingBag,
  MessageCircle,
  X,
  PackageCheck,
  ArrowRight,
  Maximize2,
  Sliders,
  Check,
  Layers,
  Heart,
  Star,
  CheckCircle2,
} from 'lucide-react';
import {
  RawPoster,
  getRandomRawPosters,
  getRawPosters,
} from '@/data/rawPosters';
import {
  PosterSize,
  SIZE_PRICING,
  SIZES_LIST,
  calculatePrice,
  generateProductWhatsAppUrl,
  Product,
  STORE_WHATSAPP_NUMBER,
} from '@/data/products';
import { useCart } from '@/context/CartContext';

// Subtle natural hand-pasted tilts for unframed bedroom wall posters
const POSTER_TILTS = [-1.5, 0.8, -0.6, 1.2, -1.0, 0.5, -1.8, 1.4, -0.8, 1.0, -1.2, 0.6, -1.4, 0.9, -0.7];

export type RoomVibe =
  | 'afternoon-sun' // Photo 1: Sunlight window beam slanting across warm bedroom wall
  | 'fairy-lights'  // Photo 3: Ivy vines + warm glowing fairy bulbs along top
  | 'bed-headboard' // Photo 4: Bedroom corner with wooden bed headboard at the base
  | 'study-desk'    // Photo 5: Study desk with plants and gaming setup
  | 'retro-collage';// Photo 2: Retro Bollywood & aesthetic stickers, vinyl record cutout

export type WallLayout =
  | 'bedroom-collage' // Mixed sizes: Hero centerpiece + wide banners + standard portrait
  | 'seamless-tight'  // Seamless edge-to-edge like album music wall
  | 'dense-grid';     // Multi-column dense wall

interface PosterWallExperienceProps {
  isEmbedded?: boolean; // When placed on Index.tsx homepage
  initialCount?: number;
  initialVibe?: RoomVibe;
  showControlsHeader?: boolean;
}

export const PosterWallExperience = ({
  isEmbedded = false,
  initialCount = 24,
  initialVibe = 'afternoon-sun',
  showControlsHeader = true,
}: PosterWallExperienceProps) => {
  const { addItem } = useCart();

  const [posterCount, setPosterCount] = useState<number>(initialCount);
  const [roomVibe, setRoomVibe] = useState<RoomVibe>(initialVibe);
  const [layoutMode, setLayoutMode] = useState<WallLayout>('bedroom-collage');
  const [showTape, setShowTape] = useState<boolean>(true);
  const [showAngles, setShowAngles] = useState<boolean>(true);
  const [showStickers, setShowStickers] = useState<boolean>(true);

  // Active pool of raw posters
  const [displayedPosters, setDisplayedPosters] = useState<RawPoster[]>([]);
  const [activePoster, setActivePoster] = useState<RawPoster | null>(null);

  // Quick single order modal state
  const [modalSize, setModalSize] = useState<PosterSize>('A4');
  const [modalQty, setModalQty] = useState<number>(1);
  const [addedToast, setAddedToast] = useState<boolean>(false);
  const [kitAddedToast, setKitAddedToast] = useState<boolean>(false);

  const totalRawCount = useMemo(() => getRawPosters().length, []);

  // Shuffle posters on mount and when count changes
  useEffect(() => {
    shufflePosters(posterCount);
  }, []);

  const shufflePosters = (count: number = posterCount) => {
    const randomSet = getRandomRawPosters(count);
    setDisplayedPosters(randomSet);
  };

  const handleCountChange = (count: number) => {
    setPosterCount(count);
    shufflePosters(count);
  };

  // Convert raw poster to Product type for Cart & WhatsApp
  const createProduct = (raw: RawPoster): Product => ({
    id: raw.id,
    title: raw.title,
    slug: raw.id,
    category: 'Aesthetic Poster Wall',
    subcategory: 'Wall Collage Kit',
    tags: ['Poster Wall', 'Bedroom Decor', 'Aesthetic', 'Unframed'],
    image: raw.imageSrc,
    description: `High-definition 300 GSM Archival Velvet Paper Poster: ${raw.title}. Unframed print with razor-sharp pigment inks, ideal for aesthetic bedroom walls, study desks, and dorm rooms.`,
    paperQuality: '300 GSM Heavyweight Archival Velvet Paper',
    rating: 4.9,
    reviews: 124,
    isBestSeller: true,
  });

  // Calculate Wall Kit Bundle Pricing
  const getKitBundlePricing = () => {
    const unitPrice = 199;
    const mrpTotal = posterCount * unitPrice;
    let bundlePrice = 1499;
    if (posterCount === 16) bundlePrice = 1299;
    if (posterCount === 20) bundlePrice = 1499;
    if (posterCount === 24) bundlePrice = 1799;
    if (posterCount === 30) bundlePrice = 2199;

    return {
      mrp: mrpTotal,
      price: bundlePrice,
      savings: mrpTotal - bundlePrice,
    };
  };

  const bundleInfo = getKitBundlePricing();

  // WhatsApp order for entire wall kit
  const handleOrderEntireWallWhatsApp = () => {
    const posterNames = displayedPosters
      .slice(0, 12)
      .map((p, i) => `${i + 1}. ${p.title}`)
      .join('\n');

    const message = [
      `*POSTER_ARENA - Bedroom Poster Wall Kit Order* 🖼️✨`,
      `----------------------------------------`,
      `• *Wall Kit Size:* ${posterCount} Unframed Art Posters`,
      `• *Paper Quality:* 300 GSM Archival Velvet Matte Paper`,
      `• *Included Free:* Double-Sided Nano Mounting Tape (Wall-Safe, Removable)`,
      `• *Room Theme:* ${roomVibe.replace('-', ' ').toUpperCase()}`,
      `• *Sample Titles in this Wall:*`,
      posterNames,
      `  ...and ${posterCount - Math.min(12, posterCount)} more high-definition prints!`,
      `----------------------------------------`,
      `• *Bundle Kit Price:* ₹${bundleInfo.price} (MRP: ₹${bundleInfo.mrp})`,
      `• *Savings:* ₹${bundleInfo.savings} OFF!`,
      `• *Shipping:* FREE Express Doorstep Delivery 🚚`,
      `----------------------------------------`,
      `Hi POSTER_ARENA! I want to order this complete ${posterCount}-Poster Bedroom Wall Collage Kit. Please confirm my order!`,
    ].join('\n');

    window.open(`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  // Add entire kit to cart
  const handleAddKitToCart = () => {
    if (displayedPosters.length === 0) return;
    const heroPoster = displayedPosters[0];
    const kitProduct: Product = {
      id: `wall-kit-${posterCount}-${Date.now()}`,
      title: `${posterCount}-Piece Aesthetic Bedroom Poster Wall Kit`,
      slug: `bedroom-wall-kit-${posterCount}`,
      category: 'Aesthetic Poster Wall',
      subcategory: 'Complete Room Kit',
      tags: ['Wall Kit', 'Bundle', 'Bedroom Wall', 'Aesthetic'],
      image: heroPoster.imageSrc,
      description: `Complete collection of ${posterCount} premium unframed posters printed on 300 GSM Archival Matte Paper. Includes free wall-safe double-sided mounting tape.`,
      paperQuality: '300 GSM Archival Heavyweight Paper',
      rating: 5.0,
      reviews: 88,
      isBestSeller: true,
    };

    // Add as A4 unframed item with bundle pricing adjustment
    addItem(kitProduct, 'A4', false, undefined, 1);
    setKitAddedToast(true);
    setTimeout(() => setKitAddedToast(false), 2500);
  };

  // WhatsApp order for single poster
  const handleModalOrderWhatsApp = () => {
    if (!activePoster) return;
    const prod = createProduct(activePoster);
    // Unframed by default on poster wall
    const url = generateProductWhatsAppUrl(prod, modalSize, false, undefined, modalQty);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Add single poster to cart
  const handleModalAddToCart = () => {
    if (!activePoster) return;
    const prod = createProduct(activePoster);
    addItem(prod, modalSize, false, undefined, modalQty);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const unitPrice = calculatePrice(modalSize, false);
  const originalPrice = SIZE_PRICING[modalSize].originalUnframedPrice;

  // Background room plaster colors based on vibe
  const getWallBackground = () => {
    switch (roomVibe) {
      case 'afternoon-sun':
        return '#EFE8DE'; // Warm afternoon plaster (Photo 1)
      case 'fairy-lights':
        return '#EFE5D7'; // Cozy evening ambient plaster (Photo 3)
      case 'bed-headboard':
        return '#F5EFEB'; // Soft neutral bedroom corner (Photo 4)
      case 'study-desk':
        return '#E9ECE6'; // Contemporary study sage plaster (Photo 5)
      case 'retro-collage':
        return '#F8F4EC'; // Warm retro off-white plaster (Photo 2)
    }
  };

  return (
    <div
      className="relative overflow-hidden transition-colors duration-500 rounded-3xl"
      style={{ backgroundColor: getWallBackground() }}
    >
      {/* =========================================================================
          ROOM AMBIENCE ELEMENTS (Faithful reproductions of user reference photos)
          ========================================================================= */}

      {/* 1. PHOTO 1: Afternoon Sunlight Window Beam */}
      {roomVibe === 'afternoon-sun' && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {/* Angled bright golden sunlight window beam cast across the wall */}
          <div
            className="absolute -top-10 -left-10 w-[120%] h-[120%]"
            style={{
              clipPath: 'polygon(15% 0%, 82% 0%, 98% 80%, 25% 100%)',
              background:
                'linear-gradient(135deg, rgba(255, 243, 204, 0.48) 0%, rgba(253, 224, 130, 0.35) 35%, rgba(254, 240, 138, 0.14) 75%, transparent 100%)',
              filter: 'blur(3px)',
            }}
          />
          {/* Subtle soft window frame shadow bars intersecting the beam */}
          <div
            className="absolute top-0 left-1/3 w-16 h-full pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.06) 50%, transparent 100%)',
              transform: 'skewX(-18deg)',
            }}
          />
          <div
            className="absolute top-1/2 left-0 w-full h-12 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.05) 50%, transparent 100%)',
              transform: 'skewY(-6deg)',
            }}
          />
        </div>
      )}

      {/* 2. PHOTO 3: Ivy Vines & Glowing Fairy Lights String */}
      {roomVibe === 'fairy-lights' && (
        <div className="absolute top-0 inset-x-0 z-20 pointer-events-none">
          {/* Hanging Green Ivy Leaves Garland */}
          <div className="w-full flex items-center justify-between px-2 sm:px-6 -mt-1 select-none opacity-90">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <svg width="28" height="24" viewBox="0 0 28 24" fill="none" className="text-emerald-800 drop-shadow-sm">
                  <path
                    d="M14 0C10 6 2 8 0 16C3 20 11 22 14 24C17 22 25 20 28 16C26 8 18 6 14 0Z"
                    fill="currentColor"
                    fillOpacity={0.75 + (i % 3) * 0.08}
                  />
                  <path d="M14 0V24" stroke="#14532D" strokeWidth="1" strokeOpacity="0.5" />
                </svg>
              </div>
            ))}
          </div>

          {/* Fairy Light Wire with Glowing Bulbs */}
          <div className="w-full relative mt-0.5">
            <div className="w-full h-0.5 bg-neutral-800/40" />
            <div className="flex justify-between px-4 sm:px-8 -mt-1">
              {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-1 h-2.5 bg-neutral-800/60" />
                  {/* Glowing filament bulb with warm ambient halo */}
                  <div
                    className="w-3.5 h-3.5 rounded-full bg-amber-300 animate-pulse"
                    style={{
                      boxShadow:
                        '0 0 10px #f59e0b, 0 0 22px #fbbf24, 0 0 45px #fde68a, 0 0 70px rgba(251, 191, 36, 0.4)',
                      animationDelay: `${(i % 6) * 0.35}s`,
                      animationDuration: '2.8s',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Warm room downward light wash */}
          <div
            className="absolute top-0 inset-x-0 h-44 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(254, 240, 138, 0.3) 0%, rgba(253, 230, 138, 0.12) 60%, transparent 100%)',
            }}
          />
        </div>
      )}

      {/* 3. PHOTO 2: Retro Wall Cutout Stickers (Stars, Vinyl, Stamps) */}
      {roomVibe === 'retro-collage' && showStickers && (
        <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
          {/* Vinyl Record Cutout (just like Photo 2) */}
          <div
            className="absolute top-28 right-8 sm:right-16 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-neutral-900 border-2 border-neutral-800 shadow-lg flex items-center justify-center animate-spin"
            style={{ animationDuration: '30s' }}
          >
            {/* Record grooves */}
            <div className="w-12 h-12 rounded-full border border-neutral-700/60 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
            </div>
          </div>

          {/* Red and Black Retro Stars */}
          <div className="absolute top-44 left-6 sm:left-12 text-red-600 drop-shadow-sm select-none">
            ★
          </div>
          <div className="absolute top-52 left-10 sm:left-16 text-neutral-800 drop-shadow-sm select-none text-xs">
            ★
          </div>
          <div className="absolute bottom-32 right-12 text-neutral-800 drop-shadow-sm select-none text-lg">
            ★
          </div>
          <div className="absolute top-1/2 right-1/4 text-rose-500 drop-shadow-sm select-none text-sm">
            ♥
          </div>

          {/* Mini Retro "With Love" Stamp */}
          <div
            className="absolute bottom-28 left-8 sm:left-20 px-2.5 py-1 bg-amber-100/90 border border-amber-300 rounded text-[9px] font-serif text-amber-900 shadow-sm"
            style={{ transform: 'rotate(-8deg)' }}
          >
            with love ♡
          </div>
        </div>
      )}

      {/* =========================================================================
          CONTROLS HEADER BAR
          ========================================================================= */}
      {showControlsHeader && (
        <div className="relative z-30 bg-white/95 backdrop-blur-md border-b border-[#E8E2D8] px-4 sm:px-8 py-4 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Title & Count Badge */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles size={11} /> Unframed Bedroom Wall
                </span>
                <span className="text-xs text-neutral-500 font-medium">
                  {displayedPosters.length} Posters on Wall (120+ Curated Pool)
                </span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                Authentic Bedroom Poster Wall
              </h2>
              <p className="text-xs text-neutral-600 mt-0.5">
                Stuck directly on bedroom walls with zero frames, just like real dorm & bedroom collages.
              </p>
            </div>

            {/* Interactive Control Toggles */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {/* 1. Shuffle Button */}
              <button
                type="button"
                onClick={() => shufflePosters()}
                className="py-2 px-4 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                title="Shuffle a new random batch of 20-30 posters"
              >
                <Shuffle size={14} />
                <span>Shuffle Wall</span>
              </button>

              {/* 2. Poster Count: 16, 20, 24, 30 */}
              <div className="flex items-center bg-[#FAF8F5] border border-neutral-300 rounded-xl p-0.5">
                <span className="text-[10px] font-bold text-neutral-500 uppercase px-2">Count:</span>
                {[16, 20, 24, 30].map(cnt => (
                  <button
                    key={cnt}
                    onClick={() => handleCountChange(cnt)}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all ${posterCount === cnt
                        ? 'bg-neutral-900 text-white shadow-sm'
                        : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                  >
                    {cnt}
                  </button>
                ))}
              </div>

              {/* 3. Room Vibe Switcher (The 5 reference photos) */}
              <div className="flex items-center bg-[#FAF8F5] border border-neutral-300 rounded-xl p-0.5">
                <button
                  onClick={() => setRoomVibe('afternoon-sun')}
                  className={`px-2.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 ${roomVibe === 'afternoon-sun'
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  title="Warm Afternoon Sunlight Window Beam (Photo 1)"
                >
                  <Sun size={13} />
                  <span>Sunlight</span>
                </button>
                <button
                  onClick={() => setRoomVibe('fairy-lights')}
                  className={`px-2.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 ${roomVibe === 'fairy-lights'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  title="Ivy Vines & Fairy Lights (Photo 3)"
                >
                  <Sparkles size={13} />
                  <span>Fairy Lights</span>
                </button>
                <button
                  onClick={() => setRoomVibe('bed-headboard')}
                  className={`px-2.5 py-1.5 rounded-lg font-bold transition-all ${roomVibe === 'bed-headboard'
                      ? 'bg-neutral-900 text-white shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  title="Bedroom Corner above Bed Headboard (Photo 4)"
                >
                  <span>Bed Corner</span>
                </button>
                <button
                  onClick={() => setRoomVibe('study-desk')}
                  className={`px-2.5 py-1.5 rounded-lg font-bold transition-all ${roomVibe === 'study-desk'
                      ? 'bg-neutral-900 text-white shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  title="Study & Gaming Desk Setup (Photo 5)"
                >
                  <span>Study Desk</span>
                </button>
                <button
                  onClick={() => setRoomVibe('retro-collage')}
                  className={`px-2.5 py-1.5 rounded-lg font-bold transition-all ${roomVibe === 'retro-collage'
                      ? 'bg-rose-700 text-white shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  title="Retro Collage with Stickers & Vinyl (Photo 2)"
                >
                  <span>Retro Collage</span>
                </button>
              </div>

              {/* 4. Layout Mode */}
              <div className="flex items-center bg-[#FAF8F5] border border-neutral-300 rounded-xl p-0.5">
                <button
                  onClick={() => setLayoutMode('bedroom-collage')}
                  className={`px-2.5 py-1.5 rounded-lg font-bold transition-all ${layoutMode === 'bedroom-collage'
                      ? 'bg-neutral-900 text-white shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  title="Aesthetic Collage with Centerpiece Hero Posters"
                >
                  Collage
                </button>
                <button
                  onClick={() => setLayoutMode('seamless-tight')}
                  className={`px-2.5 py-1.5 rounded-lg font-bold transition-all ${layoutMode === 'seamless-tight'
                      ? 'bg-neutral-900 text-white shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  title="Seamless Edge-to-Edge like Album Wall (Photo 3)"
                >
                  Seamless
                </button>
                <button
                  onClick={() => setLayoutMode('dense-grid')}
                  className={`px-2.5 py-1.5 rounded-lg font-bold transition-all ${layoutMode === 'dense-grid'
                      ? 'bg-neutral-900 text-white shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  title="Dense Room Wall (Photo 5)"
                >
                  Dense
                </button>
              </div>

              {/* 5. Angles Toggle */}
              <button
                onClick={() => setShowAngles(!showAngles)}
                className={`py-1.5 px-3 rounded-xl border text-[11px] font-bold transition-colors ${showAngles
                    ? 'bg-amber-100 border-amber-300 text-amber-900'
                    : 'bg-white border-neutral-300 text-neutral-600'
                  }`}
                title="Toggle natural slight hand-placed angles"
              >
                Angles: {showAngles ? 'ON' : 'OFF'}
              </button>

              {/* 6. Tape Toggle */}
              <button
                onClick={() => setShowTape(!showTape)}
                className={`py-1.5 px-3 rounded-xl border text-[11px] font-bold transition-colors ${showTape
                    ? 'bg-amber-100 border-amber-300 text-amber-900'
                    : 'bg-white border-neutral-300 text-neutral-600'
                  }`}
                title="Toggle simulated wall mounting tape"
              >
                Tape: {showTape ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MAIN POSTER CANVAS AREA
          ========================================================================= */}
      <div className="relative z-20 px-4 sm:px-8 py-10 sm:py-14 max-w-7xl mx-auto">
        {/* Wall Canvas Grid */}
        <div
          className={`mx-auto transition-all duration-500 ${layoutMode === 'seamless-tight'
              ? 'grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-1 sm:gap-1.5 max-w-6xl'
              : layoutMode === 'dense-grid'
                ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2.5 sm:gap-3 max-w-6xl'
                : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 max-w-6xl'
            }`}
        >
          {displayedPosters.map((poster, index) => {
            const angle = showAngles ? POSTER_TILTS[index % POSTER_TILTS.length] : 0;

            // In "bedroom-collage" mode, create hero posters and wide banner posters (like in Photo 1 & Photo 4)
            const isHeroPoster = layoutMode === 'bedroom-collage' && (index === 2 || index === 9);
            const isWideBanner = layoutMode === 'bedroom-collage' && (index === 5 || index === 13);

            return (
              <motion.div
                key={`${poster.id}-${index}`}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: Math.min(index * 0.02, 0.4), duration: 0.25 }}
                className={`relative group cursor-pointer ${isHeroPoster
                    ? 'sm:col-span-2 sm:row-span-2'
                    : isWideBanner
                      ? 'sm:col-span-2'
                      : ''
                  }`}
                style={{
                  transform: `rotate(${angle}deg)`,
                  transition: 'transform 0.25s ease, z-index 0.25s ease, box-shadow 0.25s ease',
                }}
                whileHover={{
                  scale: 1.04,
                  rotate: 0,
                  zIndex: 35,
                  transition: { duration: 0.18 },
                }}
                onClick={() => setActivePoster(poster)}
              >
                {/* Simulated Wall Tape at top-center (Photo 1 & Photo 2) */}
                {showTape && (
                  <div
                    className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-9 h-3.5 z-20 pointer-events-none"
                    style={{
                      background: 'rgba(255, 255, 255, 0.72)',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.14)',
                      backdropFilter: 'blur(1px)',
                      transform: `rotate(${((index * 7) % 8) - 4}deg)`,
                    }}
                  />
                )}

                {/* The Pure Unframed Paper Poster (Directly on Wall) */}
                <div
                  className={`w-full h-full overflow-hidden bg-neutral-900 rounded-[2px] relative transition-all duration-300 ${isWideBanner ? 'aspect-[16/9]' : 'aspect-[3/4]'
                    }`}
                  style={{
                    // Realistic 300 GSM paper shadow on wall plaster
                    boxShadow:
                      '0 6px 14px -2px rgba(0, 0, 0, 0.24), 0 2px 5px -1px rgba(0, 0, 0, 0.12)',
                  }}
                >
                  <img
                    src={poster.imageSrc}
                    alt={poster.title}
                    className="w-full h-full object-cover select-none"
                    loading="lazy"
                  />

                  {/* Gentle hover vignette & price tag */}
                  <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/25 transition-colors duration-200" />

                  {/* Hover Tag */}
                  <div className="absolute bottom-2 inset-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-between text-white text-[11px] font-bold p-1.5 bg-neutral-950/90 backdrop-blur-md rounded shadow-md">
                    <span className="truncate pr-1">{poster.title}</span>
                    <span className="text-amber-300 text-[10px] whitespace-nowrap">₹199 →</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* =========================================================================
            BOTTOM ROOM ELEMENTS (Bed Headboard or Study Desk)
            ========================================================================= */}

        {/* Bed Headboard at the bottom (Photo 4) */}
        {roomVibe === 'bed-headboard' && (
          <div className="mt-10 max-w-4xl mx-auto select-none pointer-events-none">
            {/* Wooden Headboard Silhouette */}
            <div
              className="w-full h-16 sm:h-20 rounded-t-2xl shadow-2xl border-t-4 border-amber-950/60"
              style={{
                background: 'linear-gradient(180deg, #8B5A2B 0%, #6E441E 60%, #4A2E14 100%)',
                boxShadow: '0 -8px 24px rgba(0,0,0,0.25)',
              }}
            >
              <div className="h-full flex items-center justify-center text-white/40 text-xs font-medium tracking-widest uppercase">
                Aesthetic Bedroom Wall Setup
              </div>
            </div>
          </div>
        )}

        {/* Study Desk Surface at the bottom (Photo 5) */}
        {roomVibe === 'study-desk' && (
          <div className="mt-10 max-w-4xl mx-auto select-none pointer-events-none">
            {/* Wooden Study Desk Top with soft drop shadow */}
            <div
              className="w-full h-14 sm:h-16 rounded-t-xl shadow-2xl border-t-2 border-neutral-400/40 relative flex items-center justify-between px-6"
              style={{
                background: 'linear-gradient(180deg, #FAF8F5 0%, #E8E2D8 100%)',
                boxShadow: '0 -6px 20px rgba(0,0,0,0.18)',
              }}
            >
              <span className="text-[11px] font-bold text-neutral-600 uppercase tracking-widest">
                Desk Wall Collage Setup
              </span>
              <span className="text-xs text-neutral-500">300 GSM Heavyweight Archival Matte</span>
            </div>
          </div>
        )}

        {/* =========================================================================
            COMPLETE ROOM WALL KIT ORDER BANNER (WhatsApp + Add to Cart)
            ========================================================================= */}
        <div className="mt-14 max-w-7xl mx-auto rounded-3xl p-6 sm:p-9 bg-neutral-900 text-white shadow-2xl border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-8 relative z-20">
          <div className="space-y-2.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <PackageCheck size={14} />
              <span>Complete Room Wall Kit Deal</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
              Order This Complete {posterCount}-Poster Bedroom Wall
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl leading-relaxed">
              Receive all <strong className="text-white">{posterCount} high-definition art prints</strong> on 300 GSM Archival Velvet Paper + <strong className="text-amber-300">Free Wall-Safe Nano Mounting Tape</strong>. Dispatched in heavy-duty protective packaging!
            </p>

            <div className="flex items-baseline justify-center md:justify-start gap-3 pt-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-amber-400">
                ₹{bundleInfo.price}
              </span>
              <span className="text-base text-neutral-400 line-through">
                ₹{bundleInfo.mrp}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-900/80 text-emerald-300 text-xs font-bold">
                Save ₹{bundleInfo.savings} (Bundle Deal)
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-center gap-3 w-full md:w-auto">
            {/* WhatsApp Order Button */}
            <button
              onClick={handleOrderEntireWallWhatsApp}
              className="w-full sm:w-auto py-3.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-colors whitespace-nowrap active:scale-95"
            >
              <MessageCircle size={18} />
              <span>Order Wall Kit via WhatsApp</span>
            </button>

            {/* Add Complete Kit to Cart */}
            <button
              onClick={handleAddKitToCart}
              className="w-full sm:w-auto py-3.5 px-5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors whitespace-nowrap active:scale-95"
            >
              <ShoppingBag size={16} />
              <span>{kitAddedToast ? 'Wall Kit in Cart ✓' : 'Add Kit to Cart'}</span>
            </button>

            {/* Re-roll */}
            <button
              onClick={() => shufflePosters()}
              className="w-full sm:w-auto py-3.5 px-4 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
              title="Shuffle new posters"
            >
              <Shuffle size={15} />
              <span>Re-roll</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          INDIVIDUAL POSTER QUICK-VIEW MODAL (Click any poster)
          ========================================================================= */}
      <AnimatePresence>
        {activePoster && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-neutral-950/75 backdrop-blur-sm"
              onClick={() => setActivePoster(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full z-10 shadow-2xl border border-neutral-200 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePoster(null)}
                className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-neutral-900 transition-colors"
                aria-label="Close"
              >
                <X size={22} />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-center">
                {/* Poster Display */}
                <div className="flex justify-center p-3 bg-[#FAF8F5] rounded-2xl border border-neutral-200/70">
                  <div
                    className="relative aspect-[3/4] max-w-[240px] w-full rounded-[2px] overflow-hidden shadow-2xl"
                    style={{
                      boxShadow: '0 15px 30px -5px rgba(0, 0, 0, 0.3), 0 5px 12px rgba(0,0,0,0.15)',
                    }}
                  >
                    <img
                      src={activePoster.imageSrc}
                      alt={activePoster.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-neutral-900/85 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      300 GSM Archival Velvet Paper
                    </div>
                  </div>
                </div>

                {/* Configurations & WhatsApp Action */}
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      Unframed Poster Wall Piece
                    </span>
                    <h3 className="font-display text-2xl font-bold text-neutral-900 mt-1 line-clamp-2">
                      {activePoster.title}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      300 GSM Archival Velvet Print • Razor sharp pigment ink
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2.5 py-1">
                    <span className="text-3xl font-extrabold text-neutral-900">
                      ₹{unitPrice}
                    </span>
                    <span className="text-sm text-neutral-400 line-through">
                      ₹{originalPrice}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      Unframed Paper Rate
                    </span>
                  </div>

                  {/* Size Selector */}
                  <div>
                    <label className="text-xs font-bold uppercase text-neutral-700 block mb-1.5">
                      Select Size:
                    </label>
                    <div className="grid grid-cols-4 gap-1.5 text-xs">
                      {SIZES_LIST.map(sz => (
                        <button
                          key={sz}
                          onClick={() => setModalSize(sz)}
                          className={`p-2 rounded-lg font-bold border transition-all ${modalSize === sz
                              ? 'border-neutral-900 bg-neutral-900 text-white'
                              : 'border-neutral-300 bg-white text-neutral-800 hover:border-neutral-400'
                            }`}
                        >
                          <div>{sz}</div>
                          <div className={`text-[10px] ${modalSize === sz ? 'text-amber-300' : 'text-neutral-500'}`}>
                            ₹{calculatePrice(sz, false)}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 space-y-2">
                    <button
                      onClick={handleModalOrderWhatsApp}
                      className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
                    >
                      <MessageCircle size={18} />
                      <span>Order via WhatsApp (₹{unitPrice})</span>
                    </button>

                    <button
                      onClick={handleModalAddToCart}
                      className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
                    >
                      <ShoppingBag size={16} />
                      <span>{addedToast ? 'Added to Cart ✓' : 'Add to Cart'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PosterWallExperience;

