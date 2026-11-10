import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shuffle,
  Sliders,
  Sparkles,
  ShoppingBag,
  MessageCircle,
  X,
  Search,
  Check,
  RefreshCw,
  Sun,
  Layers,
  ArrowRight,
  PackageCheck,
  Maximize2,
  Wand2,
  Move,
  ChevronLeft,
  ChevronRight,
  ArrowLeftRight,
} from 'lucide-react';
import {
  RawPoster,
  getRawPosters,
  getRandomRawPosters,
  getThemedRawPosters,
  getRawCategories,
} from '@/data/rawPosters';
import { getBundlePriceForCount } from '@/data/bundlePacks';
import { STORE_WHATSAPP_NUMBER } from '@/data/products';
import { useCart } from '@/context/CartContext';

export type WallShape = 'hero-focus' | 'random-organic' | 'diamond' | 'stairs' | 'v-shape' | 'organic-mosaic';
export type WallAmbience = 'afternoon-sun' | 'fairy-lights' | 'warm-cream' | 'dark-ambient';

export interface InteractiveCustomPosterWallProps {
  initialCount?: number;
  initialShape?: WallShape;
  selectedCategory?: string;
}

export const InteractiveCustomPosterWall = ({
  initialCount = 20,
  initialShape = 'hero-focus',
  selectedCategory = 'All',
}: InteractiveCustomPosterWallProps) => {
  const { addItem } = useCart();

  // 1. Controls State
  const [posterCount, setPosterCount] = useState<number>(initialCount);
  const [wallShape, setWallShape] = useState<WallShape>(initialShape);
  const [wallAmbience, setWallAmbience] = useState<WallAmbience>('afternoon-sun');
  const [showTape, setShowTape] = useState<boolean>(true);
  const [showAngles, setShowAngles] = useState<boolean>(true);

  // 2. Active posters placed on the wall
  const [wallPosters, setWallPosters] = useState<RawPoster[]>([]);

  // 3. Poster Swap / Replace Modal State
  const [replacingIndex, setReplacingIndex] = useState<number | null>(null);
  const [pickerSearch, setPickerSearch] = useState<string>('');
  const [pickerCategory, setPickerCategory] = useState<string>('All');

  // 4. Drag & Drop / Position Shift State (User can drag and drop ANY image to swap/shift positions!)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [swapSourceIndex, setSwapSourceIndex] = useState<number | null>(null);

  // 5. Cart / Success toast
  const [kitAddedToast, setKitAddedToast] = useState<boolean>(false);

  // All 126+ raw posters from src/assets/raw_posters
  const allRawPosters = useMemo(() => getRawPosters(), []);

  // Dynamically detected categories from folder names and raw posters
  const availableCategories = useMemo(() => getRawCategories(), [allRawPosters]);

  // Sync initialCount prop changes
  useEffect(() => {
    if (initialCount && initialCount !== posterCount) {
      handleSliderChange(initialCount);
    }
  }, [initialCount]);

  // Sync initialShape prop changes
  useEffect(() => {
    if (initialShape && initialShape !== wallShape) {
      setWallShape(initialShape);
    }
  }, [initialShape]);

  // Sync selectedCategory prop changes
  useEffect(() => {
    shufflePosters(posterCount);
  }, [selectedCategory]);

  // Populate posters
  const shufflePosters = (count: number = posterCount) => {
    if (selectedCategory && selectedCategory !== 'All') {
      const themed = getThemedRawPosters(selectedCategory);
      if (themed.length > 0) {
        const pool = [...themed].sort(() => 0.5 - Math.random());
        if (count <= pool.length) {
          setWallPosters(pool.slice(0, count));
          return;
        } else {
          const rest = getRandomRawPosters(count - pool.length);
          setWallPosters([...pool, ...rest]);
          return;
        }
      }
    }

    const randomSet = getRandomRawPosters(count);
    setWallPosters(randomSet);
  };

  const handleSliderChange = (newCount: number) => {
    const clamped = Math.min(40, Math.max(1, newCount));
    setPosterCount(clamped);

    if (clamped > wallPosters.length) {
      // Add more random posters to fill up to newCount
      const needed = clamped - wallPosters.length;
      const additional = getRandomRawPosters(needed);
      setWallPosters(prev => [...prev, ...additional]);
    } else {
      // Trim to newCount
      setWallPosters(prev => prev.slice(0, clamped));
    }
  };

  // Replace poster at replacingIndex with selected raw poster from library
  const handleSelectReplacement = (selected: RawPoster) => {
    if (replacingIndex === null) return;
    const updated = [...wallPosters];
    updated[replacingIndex] = selected;
    setWallPosters(updated);
    setReplacingIndex(null);
    setPickerSearch('');
  };

  // Swap two posters by indices (Smooth animated swap!)
  const swapPosters = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) return;
    setWallPosters(prev => {
      const updated = [...prev];
      if (fromIndex >= updated.length || toIndex >= updated.length) return prev;
      const temp = updated[fromIndex];
      updated[fromIndex] = updated[toIndex];
      updated[toIndex] = temp;
      return updated;
    });
    setSwapSourceIndex(null);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Step shift left or right
  const movePosterStep = (index: number, direction: 'left' | 'right') => {
    const target = direction === 'left' ? index - 1 : index + 1;
    if (target < 0 || target >= wallPosters.length) return;
    swapPosters(index, target);
  };

  // Drag & Drop event handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragOverIndex === index) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }
    swapPosters(draggedIndex, targetIndex);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Filter raw posters in the replacement picker
  const filteredPickerPosters = useMemo(() => {
    let list = allRawPosters;

    if (pickerCategory !== 'All') {
      list = getThemedRawPosters(pickerCategory);
    }

    const query = pickerSearch.trim().toLowerCase();
    if (query) {
      list = list.filter(
        p =>
          p.title.toLowerCase().includes(query) ||
          p.filename.toLowerCase().includes(query)
      );
    }

    return list;
  }, [allRawPosters, pickerCategory, pickerSearch]);

  // Pricing formula for custom wall kit (1 to 40 prints based on customer cost)
  const getBundlePricing = () => {
    const bundle = getBundlePriceForCount(posterCount);
    const mrp = posterCount * 199;

    return {
      mrp,
      price: bundle.price,
      savings: mrp - bundle.price,
      perPrint: bundle.perPrint,
    };
  };

  const pricing = getBundlePricing();

  // WhatsApp Order with custom selected posters manifest
  const handleOrderWhatsApp = () => {
    const titlesList = wallPosters
      .slice(0, 12)
      .map((p, i) => `${i + 1}. ${p.title}`)
      .join('\n');

    const heroPoster = wallPosters[0];

    const message = [
      `*WALLORA - Custom Bedroom Wall Kit Order* 🖼️✨`,
      `_Turn Your Walls Into Art._`,
      `----------------------------------------`,
      `• *Wall Kit Size:* ${posterCount} Posters (Custom Curated Wall)`,
      `• *Wall Layout:* ${wallShape.toUpperCase()} Organic Layout`,
      heroPoster ? `• *Hero / Main Poster:* ${heroPoster.title}` : '',
      `• *Material:* 300 GSM Archival Velvet Matte Paper`,
      `• *Includes:* Free Double-Sided Nano Mounting Tape (No Wall Damage)`,
      `• *Selected Posters Sample:*`,
      titlesList,
      posterCount > 12 ? `  ...plus ${posterCount - 12} more selected prints!` : '',
      `----------------------------------------`,
      `• *Custom Bundle Price:* ₹${pricing.price} (MRP: ₹${pricing.mrp})`,
      `• *Savings:* ₹${pricing.savings} OFF!`,
      `• *Shipping:* FREE Express Doorstep Delivery 🚚`,
      `----------------------------------------`,
      `Hi WALLORA! I customized my own ${posterCount}-Poster Wall on the website. Please confirm my order!`,
    ].filter(Boolean).join('\n');

    window.open(
      `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  // Add customized kit to cart
  const handleAddToCart = () => {
    if (wallPosters.length === 0) return;
    const heroPoster = wallPosters[0];

    addItem(
      {
        id: `custom-wall-kit-${posterCount}-${Date.now()}`,
        title: `Custom ${posterCount}-Piece Bedroom Wall Kit (Archival 300 GSM)`,
        slug: `custom-wall-kit-${posterCount}`,
        category: 'Aesthetic Poster Wall',
        subcategory: 'Custom Room Wall Kit',
        tags: ['Custom Wall Kit', 'Bedroom Decor', '300 GSM', 'Free Nano Tape'],
        image: heroPoster.imageSrc,
        description: `Custom ${posterCount}-piece collection selected by customer. Includes free double-sided nano mounting tape.`,
        paperQuality: '300 GSM Archival Velvet Paper',
        rating: 5.0,
        reviews: 112,
        isBestSeller: true,
      },
      'A4',
      false,
      undefined,
      1
    );

    setKitAddedToast(true);
    setTimeout(() => setKitAddedToast(false), 2400);
  };

  // Natural subtle tilt degrees for organic posters
  const TILTS = [-1.5, 0.8, -0.6, 1.2, -1.0, 0.5, -1.8, 1.4, -0.8, 1.0, -1.2, 0.6];

  // Get background style
  const getWallBg = () => {
    switch (wallAmbience) {
      case 'afternoon-sun':
        return '#EFE8DE';
      case 'fairy-lights':
        return '#EDE4D6';
      case 'warm-cream':
        return '#FAF6EF';
      case 'dark-ambient':
        return '#1C1917';
    }
  };

  // Single reusable poster card renderer with DRAG & DROP + HOVER SHIFT CONTROLS
  const renderPoster = (
    poster: RawPoster,
    idx: number,
    isBigHero: boolean = false,
    extraClass: string = ''
  ) => {
    if (!poster) return null;
    const angle = showAngles ? TILTS[idx % TILTS.length] : 0;
    const isDragging = draggedIndex === idx;
    const isDragOver = dragOverIndex === idx && draggedIndex !== idx;
    const isSwapSource = swapSourceIndex === idx;

    return (
      <motion.div
        key={`${poster.id}-${idx}`}
        layout
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{
          opacity: isDragging ? 0.35 : 1,
          scale: isDragOver ? 1.08 : isSwapSource ? 1.05 : 1,
        }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        onClick={() => {
          if (swapSourceIndex !== null) {
            if (swapSourceIndex === idx) {
              setSwapSourceIndex(null); // Cancel
            } else {
              swapPosters(swapSourceIndex, idx); // Complete tap swap
            }
          }
        }}
        style={{
          transform: `rotate(${angle}deg)`,
        }}
        whileHover={{ scale: 1.06, rotate: 0, zIndex: 40 }}
        className={`relative group select-none transition-all duration-200 ${
          isBigHero
            ? 'w-36 sm:w-52 md:w-64 aspect-[3/4] z-20 shadow-2xl'
            : 'w-16 sm:w-20 md:w-24 aspect-[3/4] shadow-md'
        } ${isDragOver ? 'ring-4 ring-emerald-400 z-50 scale-105 shadow-2xl' : ''} ${
          isSwapSource ? 'ring-4 ring-amber-500 z-50 animate-pulse' : ''
        } ${extraClass}`}
      >
        {/* Wall Tape at Top */}
        {showTape && (
          <div
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-7 sm:w-9 h-3 z-30 pointer-events-none rounded-[1px]"
            style={{
              background: 'rgba(255, 255, 255, 0.75)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              backdropFilter: 'blur(1px)',
            }}
          />
        )}

        {/* Poster Canvas Frame (Standard HTML div handles native HTML5 drag & drop without Framer Motion type collision) */}
        <div
          draggable={true}
          onDragStart={e => handleDragStart(e, idx)}
          onDragOver={e => handleDragOver(e, idx)}
          onDragLeave={e => handleDragLeave(e, idx)}
          onDrop={e => handleDrop(e, idx)}
          onDragEnd={handleDragEnd}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          className={`w-full h-full overflow-hidden bg-neutral-900 rounded-[2px] relative border ${
            isDragOver
              ? 'border-emerald-400'
              : isBigHero
              ? 'border-amber-400 ring-2 ring-amber-400/40'
              : 'border-neutral-300'
          }`}
        >
          <img
            src={poster.imageSrc}
            alt={poster.title}
            className="w-full h-full object-cover pointer-events-none select-none"
            draggable={false}
            loading="lazy"
          />

          {/* Big Hero Badge */}
          {isBigHero && (
            <div className="absolute top-2 left-2 bg-neutral-950/90 text-amber-300 text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded shadow flex items-center gap-1 z-10 pointer-events-none">
              <Sparkles size={11} className="text-amber-400" />
              <span>Hero Centerpiece</span>
            </div>
          )}

          {/* Live Drag-Over Target Highlight */}
          {isDragOver && (
            <div className="absolute inset-0 bg-emerald-950/85 flex flex-col items-center justify-center p-2 text-white text-center z-30 pointer-events-none">
              <ArrowLeftRight size={26} className="text-emerald-300 mb-1 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider text-emerald-200">
                Drop to Swap ⇄
              </span>
              <span className="text-[10px] text-neutral-300 truncate max-w-full">
                Shift with #{draggedIndex !== null ? draggedIndex + 1 : ''}
              </span>
            </div>
          )}

          {/* Swap mode source indicator */}
          {isSwapSource && (
            <div className="absolute inset-0 bg-amber-950/75 flex flex-col items-center justify-center p-2 text-white text-center z-30 pointer-events-none">
              <ArrowLeftRight size={22} className="text-amber-300 mb-1 animate-spin-slow" />
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-300">
                Selected for Swap
              </span>
              <span className="text-[9px] text-neutral-200 mt-0.5">
                Tap another poster to place it!
              </span>
            </div>
          )}

          {/* Hover Overlay with Action Buttons */}
          {!isDragOver && !isSwapSource && (
            <div className="absolute inset-0 bg-neutral-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-between p-2 text-white text-center z-20">
              {/* Drag indicator at top */}
              <div className="flex items-center gap-1 text-[9px] text-amber-300 font-bold uppercase tracking-wider pointer-events-none">
                <Move size={11} />
                <span>Drag to Move</span>
              </div>

              {/* Center poster title & slot */}
              <div className="my-auto pointer-events-none">
                <span className="text-[10px] sm:text-xs font-bold leading-tight block text-white line-clamp-2">
                  {poster.title}
                </span>
                <span className="text-[9px] text-neutral-400 block mt-0.5">
                  Slot #{idx + 1} {isBigHero ? '(★ Big Hero)' : ''}
                </span>
              </div>

              {/* Action Buttons row (Nudge Left, Replace Image, Nudge Right, or Tap Swap) */}
              <div className="flex items-center gap-1 w-full justify-center pt-1">
                {/* Nudge Left */}
                {idx > 0 && (
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      movePosterStep(idx, 'left');
                    }}
                    className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
                    title="Shift Left"
                  >
                    <ChevronLeft size={13} />
                  </button>
                )}

                {/* Replace Image Button */}
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    setReplacingIndex(idx);
                  }}
                  className="px-2 py-1 rounded bg-amber-500 hover:bg-amber-400 text-neutral-950 text-[10px] font-black uppercase flex items-center gap-1 transition-colors"
                  title="Replace with another poster from library"
                >
                  <RefreshCw size={11} />
                  <span>Replace</span>
                </button>

                {/* Tap to Swap Button (Great for mobile & touch) */}
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    setSwapSourceIndex(idx);
                  }}
                  className="p-1 rounded bg-neutral-800 hover:bg-amber-600 text-neutral-300 hover:text-white transition-colors"
                  title="Swap with another poster"
                >
                  <ArrowLeftRight size={13} />
                </button>

                {/* Nudge Right */}
                {idx < wallPosters.length - 1 && (
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      movePosterStep(idx, 'right');
                    }}
                    className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
                    title="Shift Right"
                  >
                    <ChevronRight size={13} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="rounded-3xl border-2 border-amber-600/30 bg-white shadow-xl overflow-hidden">
      {/* =========================================================================
          1. TOP INTERACTIVE TOOLBAR (Count 1-40 Slider, Shuffle, Shapes, Ambience)
          ========================================================================= */}
      <div className="bg-white border-b border-neutral-200/90 p-4 sm:p-6 space-y-4">
        {/* Title & Quick Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider mb-1">
              <Sparkles size={12} className="text-amber-700" />
              <span>Full Creative Freedom • Drag & Drop to Shift</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              Design Your Custom Poster Wall
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Drag & Drop any image to swap positions • Choose 1 to 40 posters • Hit Shuffle • Click Replace for any poster!
            </p>
          </div>

          {/* Shuffle Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => shufflePosters()}
              className="py-2.5 px-4 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95"
              title="Shuffle posters randomly from raw posters library"
            >
              <Shuffle size={14} />
              <span>Shuffle Wall Posters</span>
            </button>
          </div>
        </div>

        {/* 2. NUMBER OF POSTERS SLIDER (1 to 40) - Directly requested by User! */}
        <div className="bg-[#FAF8F5] p-3.5 sm:p-4 rounded-2xl border border-neutral-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-neutral-900 whitespace-nowrap">
              Posters on Wall:
            </span>
            <span className="px-3 py-1 rounded-lg bg-neutral-900 text-white font-extrabold text-sm sm:text-base min-w-[42px] text-center shadow-xs">
              {posterCount}
            </span>
            <span className="text-[11px] text-neutral-500 hidden sm:inline">
              (Choose between 1 to 40 prints)
            </span>
          </div>

          {/* Interactive Range Slider (1 to 40) */}
          <div className="flex-1 max-w-md flex items-center gap-3">
            <span className="text-[11px] font-bold text-neutral-400">1</span>
            <input
              type="range"
              min={1}
              max={40}
              value={posterCount}
              onChange={e => handleSliderChange(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-neutral-300 rounded-lg appearance-none cursor-pointer accent-neutral-900 focus:outline-none"
            />
            <span className="text-[11px] font-bold text-neutral-400">40</span>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {[10, 15, 20, 25, 30, 35, 40].map(cnt => (
              <button
                key={cnt}
                type="button"
                onClick={() => handleSliderChange(cnt)}
                className={`py-1 px-2.5 rounded-lg text-xs font-bold transition-all ${
                  posterCount === cnt
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-neutral-600 hover:bg-neutral-200/60 border border-neutral-300/70'
                }`}
              >
                {cnt}
              </button>
            ))}
          </div>
        </div>

        {/* 3. WALL SHAPES & AMBIENCE TOGGLES */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Wall Shapes Switcher */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mr-1">
              Wall Layout:
            </span>
            <button
              type="button"
              onClick={() => setWallShape('hero-focus')}
              className={`py-1.5 px-3 rounded-xl font-bold border transition-all ${
                wallShape === 'hero-focus'
                  ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 border-neutral-300'
              }`}
              title="Big Hero Centerpiece with Surrounding Prints (Photo 1)"
            >
              🎯 Hero Centerpiece
            </button>
            <button
              type="button"
              onClick={() => setWallShape('random-organic')}
              className={`py-1.5 px-3 rounded-xl font-bold border transition-all ${
                wallShape === 'random-organic'
                  ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 border-neutral-300'
              }`}
              title="Spontaneous Bedroom Wall Collage (Photo 2)"
            >
              🎲 Random Organic
            </button>
            <button
              type="button"
              onClick={() => setWallShape('diamond')}
              className={`py-1.5 px-3 rounded-xl font-bold border transition-all ${
                wallShape === 'diamond'
                  ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 border-neutral-300'
              }`}
              title="Diamond Peak Staggered Columns (Photo 3)"
            >
              💎 Diamond Peak
            </button>
            <button
              type="button"
              onClick={() => setWallShape('stairs')}
              className={`py-1.5 px-3 rounded-xl font-bold border transition-all ${
                wallShape === 'stairs'
                  ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 border-neutral-300'
              }`}
              title="Staircase Wave Columns (Photo 2)"
            >
              🪜 Staircase Wave
            </button>
            <button
              type="button"
              onClick={() => setWallShape('v-shape')}
              className={`py-1.5 px-3 rounded-xl font-bold border transition-all ${
                wallShape === 'v-shape'
                  ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 border-neutral-300'
              }`}
              title="V-Shape Wings Columns (Photo 4)"
            >
              🦋 V-Shape Wings
            </button>
            <button
              type="button"
              onClick={() => setWallShape('organic-mosaic')}
              className={`py-1.5 px-3 rounded-xl font-bold border transition-all ${
                wallShape === 'organic-mosaic'
                  ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 border-neutral-300'
              }`}
              title="Organic Collage Grid"
            >
              🧱 Organic Mosaic
            </button>
          </div>

          {/* Ambience & Tape Toggles */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() =>
                setWallAmbience(
                  wallAmbience === 'afternoon-sun'
                    ? 'fairy-lights'
                    : wallAmbience === 'fairy-lights'
                    ? 'warm-cream'
                    : wallAmbience === 'warm-cream'
                    ? 'dark-ambient'
                    : 'afternoon-sun'
                )
              }
              className="py-1.5 px-3 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-800 font-bold flex items-center gap-1.5 transition-colors"
            >
              {wallAmbience === 'afternoon-sun' && <Sun size={13} className="text-amber-600" />}
              {wallAmbience === 'fairy-lights' && <Sparkles size={13} className="text-amber-500" />}
              <span>Vibe: {wallAmbience.replace('-', ' ')}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAngles(!showAngles)}
              className={`py-1.5 px-2.5 rounded-xl border text-[11px] font-bold transition-colors ${
                showAngles ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-white border-neutral-300 text-neutral-600'
              }`}
            >
              Angles: {showAngles ? 'ON' : 'OFF'}
            </button>

            <button
              type="button"
              onClick={() => setShowTape(!showTape)}
              className={`py-1.5 px-2.5 rounded-xl border text-[11px] font-bold transition-colors ${
                showTape ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-white border-neutral-300 text-neutral-600'
              }`}
            >
              Tape: {showTape ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. THE INTERACTIVE WALL CANVAS
          ========================================================================= */}
      <div
        className="relative min-h-[480px] sm:min-h-[580px] p-4 sm:p-8 flex flex-col justify-between overflow-hidden transition-colors duration-500"
        style={{ backgroundColor: getWallBg() }}
      >
        {/* Ambience: Afternoon Sunlight Beam (Matches Photo 1) */}
        {wallAmbience === 'afternoon-sun' && (
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              clipPath: 'polygon(15% 0%, 85% 0%, 98% 85%, 25% 100%)',
              background:
                'linear-gradient(135deg, rgba(255, 243, 204, 0.45) 0%, rgba(253, 224, 130, 0.28) 45%, transparent 80%)',
            }}
          />
        )}

        {/* Ambience: Fairy Lights Garland (Matches Photo 3) */}
        {wallAmbience === 'fairy-lights' && (
          <div className="absolute top-0 inset-x-0 z-20 pointer-events-none">
            {/* Hanging subtle garland leaves */}
            <div className="w-full flex justify-between px-2 -mt-1 opacity-70">
              {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} className="w-4 h-3 bg-emerald-800 rounded-b-full opacity-60" />
              ))}
            </div>
            {/* Glowing Fairy Lights Wire */}
            <div className="w-full h-0.5 bg-neutral-800/30 relative">
              <div className="flex justify-between px-6 -mt-1">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-2.5 h-2.5 rounded-full bg-amber-300 animate-pulse"
                    style={{
                      boxShadow: '0 0 10px #f59e0b, 0 0 20px #fbbf24',
                      animationDelay: `${(i % 5) * 0.35}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Active Tap Swap Banner (When user clicks Swap on a poster) */}
        {swapSourceIndex !== null && (
          <div className="relative z-30 mb-3 bg-amber-500 text-neutral-950 px-4 py-2.5 rounded-2xl flex items-center justify-between shadow-xl border border-amber-600 animate-pulse">
            <div className="flex items-center gap-2 text-xs font-bold">
              <ArrowLeftRight size={16} />
              <span>
                Swapping: <strong>#{swapSourceIndex + 1} "{wallPosters[swapSourceIndex]?.title}"</strong> — Now tap ANY other poster on the wall to place it there!
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSwapSourceIndex(null)}
              className="px-3 py-1 rounded-xl bg-neutral-950 text-white text-[11px] font-bold hover:bg-neutral-800 transition-colors shadow-sm"
            >
              Cancel Swap
            </button>
          </div>
        )}

        {/* Instructions banner on canvas */}
        <div className="relative z-20 text-center mb-3">
          <span className="px-3.5 py-1.5 rounded-full bg-neutral-900/85 backdrop-blur-md text-white text-[11px] font-bold shadow-md inline-flex items-center gap-2">
            <Move size={13} className="text-amber-400" />
            <span>
              <strong>Drag & Drop</strong> any poster to swap positions • Or click <strong>Replace</strong> to choose from library!
            </span>
          </span>
        </div>

        {/* POSTERS ARRANGEMENT CONTAINER */}
        <div className="relative z-20 flex-1 flex items-center justify-center py-4">
          {/* =========================================================================
              A. HERO FOCUS: Big Centerpiece in Large Size + Surrounding Prints
              (User can Drag & Drop ANY image into the Hero spot, or click to replace!)
              ========================================================================= */}
          {wallShape === 'hero-focus' && (
            <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 max-w-5xl mx-auto w-full">
              {/* Center row with Hero flanked by side columns */}
              <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap sm:flex-nowrap">
                {/* Left Column */}
                <div className="flex flex-col gap-2 sm:gap-3 items-end">
                  {wallPosters.slice(1, 1 + Math.ceil((posterCount - 1) / 2)).slice(0, 4).map((p, i) =>
                    renderPoster(p, i + 1, false)
                  )}
                </div>

                {/* Center Column: Big Hero Centerpiece (Slot #0) */}
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  {wallPosters[0] && renderPoster(wallPosters[0], 0, true)}
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-2 sm:gap-3 items-start">
                  {wallPosters.slice(1 + Math.ceil((posterCount - 1) / 2)).slice(0, 4).map((p, i) =>
                    renderPoster(p, 1 + Math.ceil((posterCount - 1) / 2) + i, false)
                  )}
                </div>
              </div>

              {/* Satellite overflow row if posterCount > 9 */}
              {posterCount > 9 && (
                <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap max-w-4xl pt-2">
                  {wallPosters.slice(9).map((p, i) =>
                    renderPoster(p, 9 + i, false)
                  )}
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              B. RANDOM ORGANIC: Bedroom collage with staggered offsets (Matches Photo 2)
              ========================================================================= */}
          {wallShape === 'random-organic' && (
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-5xl mx-auto p-2">
              {wallPosters.map((poster, idx) => {
                const isHero = idx === 0;
                const randomOffset = ((idx * 7) % 18) - 9;
                return (
                  <div
                    key={`${poster.id}-${idx}`}
                    style={{ marginTop: `${randomOffset}px` }}
                  >
                    {renderPoster(poster, idx, isHero)}
                  </div>
                );
              })}
            </div>
          )}

          {/* =========================================================================
              C. DIAMOND PEAK (Matches Photo 3: Center tall, tapering symmetrically)
              ========================================================================= */}
          {wallShape === 'diamond' && (
            <div className="flex items-center justify-center gap-1.5 sm:gap-3 max-w-5xl mx-auto overflow-x-auto p-2">
              {(() => {
                const colsCount = posterCount > 28 ? 7 : 5;
                const columns: { poster: RawPoster; globalIdx: number }[][] = Array.from(
                  { length: colsCount },
                  () => []
                );

                wallPosters.forEach((poster, i) => {
                  columns[i % colsCount].push({ poster, globalIdx: i });
                });

                return columns.map((col, colIdx) => (
                  <div
                    key={colIdx}
                    className="flex flex-col gap-1.5 sm:gap-2.5 justify-center"
                    style={{
                      marginTop: `${Math.abs(colIdx - Math.floor(colsCount / 2)) * 16}px`,
                      marginBottom: `${Math.abs(colIdx - Math.floor(colsCount / 2)) * 16}px`,
                    }}
                  >
                    {col.map(({ poster, globalIdx }) =>
                      renderPoster(poster, globalIdx, false)
                    )}
                  </div>
                ));
              })()}
            </div>
          )}

          {/* =========================================================================
              D. STAIRCASE WAVE (Matches Photo 4: Stepped descending columns)
              ========================================================================= */}
          {wallShape === 'stairs' && (
            <div className="flex items-start justify-center gap-1.5 sm:gap-3 max-w-5xl mx-auto overflow-x-auto p-2">
              {(() => {
                const colsCount = posterCount > 24 ? 6 : 5;
                const columns: { poster: RawPoster; globalIdx: number }[][] = Array.from(
                  { length: colsCount },
                  () => []
                );

                wallPosters.forEach((poster, i) => {
                  columns[i % colsCount].push({ poster, globalIdx: i });
                });

                return columns.map((col, colIdx) => (
                  <div
                    key={colIdx}
                    className="flex flex-col gap-1.5 sm:gap-2.5"
                    style={{
                      marginTop: `${colIdx * 18}px`,
                    }}
                  >
                    {col.map(({ poster, globalIdx }) =>
                      renderPoster(poster, globalIdx, false)
                    )}
                  </div>
                ));
              })()}
            </div>
          )}

          {/* =========================================================================
              E. V-SHAPE WINGS (Matches Photo 4: Tall flanks with central dip)
              ========================================================================= */}
          {wallShape === 'v-shape' && (
            <div className="flex items-start justify-center gap-1.5 sm:gap-3 max-w-5xl mx-auto overflow-x-auto p-2">
              {(() => {
                const colsCount = posterCount > 28 ? 7 : 5;
                const columns: { poster: RawPoster; globalIdx: number }[][] = Array.from(
                  { length: colsCount },
                  () => []
                );

                wallPosters.forEach((poster, i) => {
                  columns[i % colsCount].push({ poster, globalIdx: i });
                });

                const midCol = Math.floor(colsCount / 2);

                return columns.map((col, colIdx) => (
                  <div
                    key={colIdx}
                    className="flex flex-col gap-1.5 sm:gap-2.5"
                    style={{
                      marginTop: `${(midCol - Math.abs(colIdx - midCol)) * 20}px`,
                    }}
                  >
                    {col.map(({ poster, globalIdx }) =>
                      renderPoster(poster, globalIdx, false)
                    )}
                  </div>
                ));
              })()}
            </div>
          )}

          {/* =========================================================================
              F. ORGANIC MOSAIC: Collage Grid
              ========================================================================= */}
          {wallShape === 'organic-mosaic' && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-2.5 max-w-5xl mx-auto p-2">
              {wallPosters.map((poster, idx) => renderPoster(poster, idx, false))}
            </div>
          )}
        </div>

        {/* BOTTOM ROOM STUDY DESK SETUP SILHOUETTE */}
        <div className="relative z-20 w-full pt-4 select-none pointer-events-none">
          <div
            className="w-full h-8 sm:h-12 rounded-t-lg shadow-2xl flex items-center justify-between px-6 border-t-2 border-neutral-300"
            style={{
              background: 'linear-gradient(180deg, #F3EFE9 0%, #D8D2C4 100%)',
              boxShadow: '0 -6px 20px rgba(0,0,0,0.18)',
            }}
          >
            <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">
              Bedroom / Study Desk Wall
            </span>
            <span className="text-[10px] text-neutral-500 font-medium">
              Free Wall-Safe Nano Mounting Tape Included
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. BOTTOM ACTION BAR: Order This Customized Wall Kit
          ========================================================================= */}
      <div className="bg-neutral-950 text-white p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
              Custom {posterCount}-Poster Wall Kit
            </span>
            <span className="text-xs text-neutral-400">
              {posterCount} Archival 300 GSM Prints + Free Nano Tape
            </span>
          </div>
          <div className="flex items-baseline gap-2.5 mt-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">
              ₹{pricing.price}
            </span>
            <span className="text-sm text-neutral-400 line-through">
              ₹{pricing.mrp}
            </span>
            <span className="text-xs text-emerald-400 font-bold">
              Save ₹{pricing.savings} (Kit Deal)
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleOrderWhatsApp}
            className="flex-1 sm:flex-none py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-colors active:scale-95"
          >
            <MessageCircle size={16} />
            <span>Order Wall Kit via WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 sm:flex-none py-3 px-5 bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-colors active:scale-95"
          >
            <ShoppingBag size={16} />
            <span>{kitAddedToast ? 'Added to Cart ✓' : 'Add Kit to Cart'}</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          4. MODAL: RAW POSTER PICKER (Opens when user clicks ANY poster on wall!)
          ========================================================================= */}
      <AnimatePresence>
        {replacingIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm"
              onClick={() => setReplacingIndex(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white rounded-3xl p-5 sm:p-7 max-w-4xl w-full z-10 shadow-2xl border border-neutral-200 max-h-[85vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-neutral-900">
                    {replacingIndex === 0 && wallShape === 'hero-focus'
                      ? '★ Select Hero Centerpiece Poster (Big Size)'
                      : `Select Replacement Poster (#${replacingIndex + 1})`}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Click any raw poster below to place it at position #{replacingIndex + 1}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setReplacingIndex(null)}
                  className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Search & Categories Bar */}
              <div className="py-3 flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    value={pickerSearch}
                    onChange={e => setPickerSearch(e.target.value)}
                    placeholder="Search raw posters (e.g. Porsche, Itachi, Spiderman, Krishna, Virat, Rolls, Batman)..."
                    className="w-full pl-10 pr-4 py-2 bg-neutral-100 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    autoFocus
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
                  {availableCategories.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setPickerCategory(cat)}
                      className={`py-1.5 px-3 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                        pickerCategory === cat
                          ? 'bg-neutral-900 text-white shadow-xs'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid of Raw Posters */}
              <div className="flex-1 overflow-y-auto pr-1 py-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {filteredPickerPosters.map(poster => (
                  <div
                    key={poster.id}
                    onClick={() => handleSelectReplacement(poster)}
                    className="group relative aspect-[3/4] rounded-lg overflow-hidden bg-neutral-900 border border-neutral-200 shadow-sm hover:shadow-lg hover:border-neutral-900 cursor-pointer transition-all hover:scale-105"
                  >
                    <img src={poster.imageSrc} alt={poster.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-neutral-950/65 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 text-white">
                      <span className="text-[10px] font-bold line-clamp-1">{poster.title}</span>
                      <span className="text-[9px] text-amber-300 font-semibold mt-0.5">Select Poster ✓</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveCustomPosterWall;
