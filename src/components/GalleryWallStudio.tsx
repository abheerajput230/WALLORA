import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  Layers,
  Palette,
  Check,
  Info,
  Search,
  RefreshCw,
  Sun,
  Maximize2,
  Sliders,
  ShieldCheck,
  CheckCircle2,
  X,
} from 'lucide-react';
import RealisticFrame, { FRAME_STYLES } from '@/components/RealisticFrame';
import { products, STORE_WHATSAPP_NUMBER, SIZE_PRICING, PosterSize } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { getRawPosters, getRawCategories, getThemedRawPosters, RawPoster } from '@/data/rawPosters';

export type WallLayout = 'solo' | 'triptych-3' | 'quad-4' | 'maha-5';
export type FrameFinishColor = 'black' | 'wood' | 'white' | 'gold';
export type FurnitureBase = 'sofa' | 'console' | 'none';
export type StudioLighting = 'spotlights' | 'afternoon-sun' | 'ambient';

export interface FrameSlot {
  id: string;
  label: string;
  imageSrc: string;
  title: string;
  size: PosterSize;
  customColor?: FrameFinishColor; // Allows individual per-frame finish overrides
}

export const GalleryWallStudio = () => {
  const { addItem } = useCart();

  // 1. Studio Configuration
  const [activeLayout, setActiveLayout] = useState<WallLayout>('quad-4');
  const [selectedFrameColor, setSelectedFrameColor] = useState<FrameFinishColor>('black');
  const [withMat, setWithMat] = useState<boolean>(true);
  const [wallColor, setWallColor] = useState<string>('#FAF8F5');
  const [furnitureBase, setFurnitureBase] = useState<FurnitureBase>('sofa');
  const [lighting, setLighting] = useState<StudioLighting>('spotlights');
  const [showGlassSheen, setShowGlassSheen] = useState<boolean>(true);

  // 2. Slots State
  const [activeSlotId, setActiveSlotId] = useState<string>('slot-1');
  const [isPhotoPickerOpen, setIsPhotoPickerOpen] = useState<boolean>(false);
  const [pickerSearch, setPickerSearch] = useState<string>('');
  const [pickerCategory, setPickerCategory] = useState<string>('All');
  const [customUploads, setCustomUploads] = useState<{ src: string; name: string }[]>([]);
  const [addedToast, setAddedToast] = useState<boolean>(false);

  // All 140+ raw posters from the user's local raw_posters directory & subfolders
  const allRawPosters = useMemo(() => getRawPosters(), []);
  const availableCategories = useMemo(() => getRawCategories(), [allRawPosters]);

  // Default iconic images for slots from user's raw posters
  const defaultImages = useMemo(() => {
    const raw = allRawPosters;
    return {
      slot1:
        raw.find(r => r.folder.toLowerCase().includes('car') || r.title.toLowerCase().includes('porsche') || r.title.toLowerCase().includes('bmw')) ||
        raw[0] || { imageSrc: products[0]?.image || '', title: 'The Porsche Legend' },
      slot2:
        raw.find(r => r.folder.toLowerCase().includes('anime') || r.title.toLowerCase().includes('itachi') || r.title.toLowerCase().includes('sukuna')) ||
        raw[1] || { imageSrc: products[1]?.image || '', title: 'Anime Masterpiece' },
      slot3:
        raw.find(r => r.folder.toLowerCase().includes('sport') || r.title.toLowerCase().includes('ronaldo') || r.title.toLowerCase().includes('dhoni')) ||
        raw[2] || { imageSrc: products[2]?.image || '', title: 'Sports Icon Tribute' },
      slot4:
        raw.find(r => r.folder.toLowerCase().includes('bike') || r.title.toLowerCase().includes('ducati') || r.title.toLowerCase().includes('s1000rr')) ||
        raw[3] || { imageSrc: products[3]?.image || '', title: 'Ducati Superbike' },
      slot5:
        raw.find(r => r.folder.toLowerCase().includes('god') || r.title.toLowerCase().includes('krishna') || r.title.toLowerCase().includes('mahadev')) ||
        raw[4] || { imageSrc: products[4]?.image || '', title: 'Sacred Devotion' },
    };
  }, [allRawPosters]);

  const [slots, setSlots] = useState<Record<string, FrameSlot>>(() => ({
    'slot-1': {
      id: 'slot-1',
      label: 'Main Showcase Frame',
      imageSrc: defaultImages.slot1.imageSrc,
      title: defaultImages.slot1.title,
      size: '18 × 24',
    },
    'slot-2': {
      id: 'slot-2',
      label: 'Gallery Frame 2',
      imageSrc: defaultImages.slot2.imageSrc,
      title: defaultImages.slot2.title,
      size: '12 × 18',
    },
    'slot-3': {
      id: 'slot-3',
      label: 'Gallery Frame 3',
      imageSrc: defaultImages.slot3.imageSrc,
      title: defaultImages.slot3.title,
      size: '12 × 18',
    },
    'slot-4': {
      id: 'slot-4',
      label: 'Accent Frame 4',
      imageSrc: defaultImages.slot4.imageSrc,
      title: defaultImages.slot4.title,
      size: 'A4',
    },
    'slot-5': {
      id: 'slot-5',
      label: 'Accent Frame 5',
      imageSrc: defaultImages.slot5.imageSrc,
      title: defaultImages.slot5.title,
      size: 'A4',
    },
  }));

  const handleSlotClick = (slotId: string) => {
    setActiveSlotId(slotId);
    setIsPhotoPickerOpen(true);
  };

  const handleSelectPhoto = (src: string, title: string) => {
    setSlots(prev => ({
      ...prev,
      [activeSlotId]: {
        ...prev[activeSlotId],
        imageSrc: src,
        title,
      },
    }));
    setIsPhotoPickerOpen(false);
  };

  // Change individual frame finish for a slot
  const handleSlotFrameColor = (slotId: string, color: FrameFinishColor, e: React.MouseEvent) => {
    e.stopPropagation();
    setSlots(prev => ({
      ...prev,
      [slotId]: {
        ...prev[slotId],
        customColor: color,
      },
    }));
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const newPhoto = { src: reader.result, name: file.name.replace(/\.[^/.]+$/, '') };
        setCustomUploads(prev => [newPhoto, ...prev]);
        handleSelectPhoto(reader.result, newPhoto.name);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Filter raw posters in the picker modal
  const filteredPickerPosters = useMemo(() => {
    let list = allRawPosters;
    if (pickerCategory !== 'All') {
      list = getThemedRawPosters(pickerCategory);
    }
    const q = pickerSearch.trim().toLowerCase();
    if (q) {
      list = list.filter(
        p => p.title.toLowerCase().includes(q) || p.filename.toLowerCase().includes(q) || p.folder.toLowerCase().includes(q)
      );
    }
    return list;
  }, [allRawPosters, pickerCategory, pickerSearch]);

  // Pricing based on layout using direct manufacturer competitive rates
  const getBundlePrice = () => {
    switch (activeLayout) {
      case 'solo':
        return { count: 1, original: 699, price: 349, label: 'Solo Statement Gallery Frame' };
      case 'triptych-3':
        return { count: 3, original: 2097, price: 999, label: '3-Piece Living Room Gallery Set' };
      case 'quad-4':
        return { count: 4, original: 2796, price: 1299, label: '4-Piece Symmetrical Gallery Grid' };
      case 'maha-5':
        return { count: 5, original: 3495, price: 1599, label: '5-Piece Royal Master Collection' };
    }
  };

  const bundle = getBundlePrice();

  const getActiveSlots = () => {
    if (activeLayout === 'solo') return [slots['slot-1']];
    if (activeLayout === 'triptych-3') return [slots['slot-1'], slots['slot-2'], slots['slot-3']];
    if (activeLayout === 'quad-4') return [slots['slot-1'], slots['slot-2'], slots['slot-3'], slots['slot-4']];
    return [slots['slot-1'], slots['slot-2'], slots['slot-3'], slots['slot-4'], slots['slot-5']];
  };

  // WhatsApp Order with custom selected posters manifest
  const handleWhatsAppOrder = () => {
    const frameName = FRAME_STYLES[selectedFrameColor]?.name || 'Classic Black';
    const activeSlotList = getActiveSlots();

    const itemsSummary = activeSlotList
      .map((s, idx) => `  ${idx + 1}. *${s.title}* (${s.size}) - Frame: ${s.customColor || selectedFrameColor}`)
      .join('\n');

    const message = [
      `*WALLORA - Custom Multi-Frame Gallery Wall Order* 🖼️✨`,
      `_Turn Your Walls Into Art._`,
      `----------------------------------------`,
      `• *Layout:* ${bundle.label} (${bundle.count} Frames)`,
      `• *Frame Moulding:* ${frameName}`,
      `• *Passe-Partout Mat:* ${withMat ? 'With White Archival Mat' : 'Edge-to-Edge Print'}`,
      `• *Wall Color Tested:* ${wallColor}`,
      `• *Selected Artworks:*`,
      itemsSummary,
      `----------------------------------------`,
      `• *Factory Direct Price:* ₹${bundle.price} (MRP ₹${bundle.original})`,
      `• *Savings:* ₹${bundle.original - bundle.price} OFF!`,
      `• *Shipping:* FREE Express Doorstep Delivery 🚚`,
      `• *Includes:* Pre-installed Sawtooth Wall Hooks + Acrylic Glass`,
      `----------------------------------------`,
      `Hi WALLORA! I have configured this live multi-frame gallery wall in the studio. Please confirm my order!`,
    ].join('\n');

    window.open(`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const handleAddAllToCart = () => {
    const activeSlotList = getActiveSlots();

    activeSlotList.forEach(slot => {
      const matched = products.find(p => p.image === slot.imageSrc) || {
        id: `custom-frame-${Date.now()}-${slot.id}`,
        title: slot.title,
        slug: 'custom-framed-art',
        category: 'Custom Gallery Wall',
        subcategory: 'Framed Art',
        tags: ['Custom Frame', '300 GSM', 'Acrylic Glass'],
        image: slot.imageSrc,
        description: 'Custom framed wall art with solid wood profile and acrylic glass.',
        paperQuality: '300 GSM Archival Velvet Paper',
        rating: 5.0,
        reviews: 24,
      };

      const finish = slot.customColor ? FRAME_STYLES[slot.customColor]?.name : FRAME_STYLES[selectedFrameColor]?.name;
      addItem(matched, slot.size, true, finish || 'Matte Black', 1);
    });

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2400);
  };

  // Render an interactive live frame on the wall with hover controls
  const renderLiveFrameCard = (
    slotId: string,
    defaultSize: PosterSize = 'A4',
    aspectRatio: string = 'aspect-[3/4]',
    extraClass: string = ''
  ) => {
    const slot = slots[slotId];
    if (!slot) return null;

    const frameFinish = slot.customColor || selectedFrameColor;
    const isDarkWall = wallColor === '#1C1917';

    return (
      <div
        className={`relative group cursor-pointer transition-all duration-300 ${extraClass}`}
        onClick={() => handleSlotClick(slotId)}
      >
        {/* Subtle Brass Picture Hanger Wire / Hook Shadow Above Frame */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-3 pointer-events-none z-10 opacity-70">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-800/80 mx-auto shadow-xs" />
          <div className="w-0.5 h-1.5 bg-neutral-600/70 mx-auto" />
        </div>

        {/* 3D Realistic Frame */}
        <div className="relative group-hover:scale-[1.025] transition-transform duration-300">
          <RealisticFrame
            imageSrc={slot.imageSrc}
            alt={slot.title}
            frameColor={frameFinish}
            withMat={withMat}
            sizeLabel={slot.size || defaultSize}
            aspectRatio={aspectRatio}
            showGlassReflection={showGlassSheen}
            className="w-full"
          />

          {/* Live Hover Floating Controls Overlay */}
          <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2px] p-3 flex flex-col justify-between items-center text-white text-center z-30">
            {/* Top Bar: Size Badge & Action */}
            <div className="flex items-center justify-between w-full">
              <span className="px-2 py-0.5 rounded bg-amber-500 text-neutral-950 font-black text-[10px] uppercase shadow-xs">
                {slot.size || defaultSize}
              </span>
              <span className="text-[10px] font-bold text-amber-300 flex items-center gap-1">
                <RefreshCw size={11} />
                <span>Tap to Swap</span>
              </span>
            </div>

            {/* Center: Title */}
            <div className="my-auto px-2 pointer-events-none">
              <span className="text-xs sm:text-sm font-bold block line-clamp-2 leading-tight">
                {slot.title}
              </span>
              <span className="text-[10px] text-neutral-300 block mt-0.5">
                {FRAME_STYLES[frameFinish]?.name}
              </span>
            </div>

            {/* Bottom: Mini Per-Frame Finish Color Dots */}
            <div
              className="flex items-center gap-1.5 p-1 rounded-full bg-neutral-900/90 backdrop-blur-md border border-neutral-700"
              onClick={e => e.stopPropagation()}
            >
              {(['black', 'wood', 'white', 'gold'] as const).map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={e => handleSlotFrameColor(slotId, color, e)}
                  title={`Switch to ${color}`}
                  className={`w-4 h-4 rounded-full transition-transform ${
                    frameFinish === color ? 'ring-2 ring-amber-400 scale-125' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor:
                      color === 'black'
                        ? '#171717'
                        : color === 'wood'
                        ? '#875c34'
                        : color === 'white'
                        ? '#ffffff'
                        : '#c4994d',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Title Label Below Frame */}
        <p
          className={`text-[11px] sm:text-xs font-semibold mt-2 truncate text-center transition-colors ${
            isDarkWall ? 'text-neutral-300' : 'text-neutral-800'
          }`}
        >
          {slot.title}
        </p>
      </div>
    );
  };

  return (
    <div className="bg-[#FAF8F5] py-12 lg:py-16 border-b border-[#E8E2D8]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* =========================================================================
            1. SECTION HEADER
            ========================================================================= */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest mb-2">
            <Sparkles size={14} className="text-amber-700" />
            <span>Live 3D Frame Simulator • Solid Wood Profiles</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight mb-3">
            Custom Gallery Wall Studio
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Design your living room gallery wall with realistic 3D wooden frames. Click on any frame to swap with your favorite posters, test authentic frame finishes, and order with bundle savings!
          </p>
        </div>

        {/* =========================================================================
            2. INTERACTIVE STUDIO CONTROL TOOLBAR
            ========================================================================= */}
        <div className="max-w-5xl mx-auto mb-8 p-4 sm:p-5 rounded-3xl bg-white border border-[#E8E2D8] shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
          {/* 1. Layout selector */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-700 uppercase tracking-wider flex items-center gap-1">
              <Layers size={14} className="text-neutral-500" /> Layout:
            </span>
            <div className="flex gap-1.5 bg-[#FAF8F5] p-1 rounded-xl border border-neutral-200">
              <button
                type="button"
                onClick={() => setActiveLayout('solo')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activeLayout === 'solo'
                    ? 'bg-neutral-950 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                1 Solo
              </button>
              <button
                type="button"
                onClick={() => setActiveLayout('triptych-3')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activeLayout === 'triptych-3'
                    ? 'bg-neutral-950 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                3 Triptych
              </button>
              <button
                type="button"
                onClick={() => setActiveLayout('quad-4')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activeLayout === 'quad-4'
                    ? 'bg-neutral-950 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                4 Quad Grid
              </button>
              <button
                type="button"
                onClick={() => setActiveLayout('maha-5')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activeLayout === 'maha-5'
                    ? 'bg-neutral-950 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                5 Maha Royal
              </button>
            </div>
          </div>

          {/* 2. Global Frame Finish Selector */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-700 uppercase tracking-wider">Moulding:</span>
            <div className="flex gap-1.5">
              {[
                { id: 'black', label: 'Matte Black', dot: '#111111' },
                { id: 'wood', label: 'Oak Wood', dot: '#8B5E3C' },
                { id: 'white', label: 'Studio White', dot: '#FFFFFF' },
                { id: 'gold', label: 'Gold', dot: '#C8A355' },
              ].map(f => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSelectedFrameColor(f.id as FrameFinishColor)}
                  className={`px-2.5 py-1.5 rounded-xl font-bold text-[11px] flex items-center gap-1.5 transition-all border ${
                    selectedFrameColor === f.id
                      ? 'border-neutral-950 bg-neutral-950 text-white shadow-sm'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-neutral-300"
                    style={{ backgroundColor: f.dot }}
                  />
                  <span>{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Wall Background Switcher */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-700 uppercase tracking-wider flex items-center gap-1">
              <Palette size={14} className="text-neutral-500" /> Wall:
            </span>
            <div className="flex gap-1.5 items-center">
              {[
                { label: 'Warm Linen', code: '#FAF8F5' },
                { label: 'Afternoon Sandstone', code: '#EFE8DE' },
                { label: 'Studio White', code: '#FFFFFF' },
                { label: 'Sage Grey', code: '#E8ECE6' },
                { label: 'Charcoal Gallery', code: '#1C1917' },
              ].map(w => (
                <button
                  key={w.code}
                  type="button"
                  onClick={() => setWallColor(w.code)}
                  title={w.label}
                  className={`w-6 h-6 rounded-full border transition-all ${
                    wallColor === w.code ? 'ring-2 ring-neutral-950 scale-110 shadow-sm' : 'border-neutral-300'
                  }`}
                  style={{ backgroundColor: w.code }}
                />
              ))}
            </div>
          </div>

          {/* 4. White Matting (Passe-partout) & Glass Sheen Toggles */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setWithMat(!withMat)}
              className={`px-3 py-1.5 rounded-xl font-bold text-[11px] border transition-colors ${
                withMat
                  ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-xs'
                  : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-400'
              }`}
            >
              {withMat ? 'White Matting: ON ✓' : 'White Matting: OFF'}
            </button>

            <button
              type="button"
              onClick={() => setShowGlassSheen(!showGlassSheen)}
              className={`px-3 py-1.5 rounded-xl font-bold text-[11px] border transition-colors ${
                showGlassSheen
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-900 shadow-xs'
                  : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-400'
              }`}
            >
              {showGlassSheen ? 'Acrylic Glass: GLOSS ✓' : 'Acrylic Glass: MATTE'}
            </button>
          </div>
        </div>

        {/* =========================================================================
            3. INTERACTIVE WALL SIMULATION CANVAS
            ========================================================================= */}
        <div
          className="relative max-w-5xl mx-auto rounded-3xl p-6 sm:p-12 transition-colors duration-500 border border-[#E8E2D8] shadow-2xl min-h-[520px] flex flex-col justify-between overflow-hidden"
          style={{ backgroundColor: wallColor }}
        >
          {/* Lighting Mode 1: Gallery Spotlights Cones pointing down to paintings */}
          {lighting === 'spotlights' && (
            <div className="absolute inset-0 pointer-events-none z-10">
              <div
                className="absolute top-0 left-1/4 -translate-x-1/2 w-72 h-80 opacity-40 blur-2xl"
                style={{
                  background: 'radial-gradient(ellipse at top, rgba(255, 240, 200, 0.7) 0%, transparent 70%)',
                }}
              />
              <div
                className="absolute top-0 right-1/4 translate-x-1/2 w-72 h-80 opacity-40 blur-2xl"
                style={{
                  background: 'radial-gradient(ellipse at top, rgba(255, 240, 200, 0.7) 0%, transparent 70%)',
                }}
              />
            </div>
          )}

          {/* Lighting Mode 2: Afternoon Natural Sunlight beam */}
          {lighting === 'afternoon-sun' && (
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                clipPath: 'polygon(10% 0%, 90% 0%, 98% 85%, 20% 100%)',
                background:
                  'linear-gradient(135deg, rgba(255, 245, 215, 0.5) 0%, rgba(253, 230, 160, 0.22) 50%, transparent 80%)',
              }}
            />
          )}

          {/* Top Instruction Pill & Quick Lighting Toggles */}
          <div className="relative z-20 flex items-center justify-between gap-2 mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-neutral-300 text-[11px] font-bold text-neutral-800 shadow-sm">
              <Info size={13} className="text-amber-700" />
              <span>Tap any frame to choose from 140+ posters</span>
            </div>

            {/* Room Ambience Switcher */}
            <div className="flex items-center gap-1 bg-white/85 backdrop-blur-md p-1 rounded-xl border border-neutral-300 text-[10px] font-bold">
              <button
                type="button"
                onClick={() => setLighting('spotlights')}
                className={`px-2 py-0.5 rounded-lg transition-colors ${
                  lighting === 'spotlights' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Spotlights
              </button>
              <button
                type="button"
                onClick={() => setLighting('afternoon-sun')}
                className={`px-2 py-0.5 rounded-lg transition-colors ${
                  lighting === 'afternoon-sun' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Daylight
              </button>
              <button
                type="button"
                onClick={() => setLighting('ambient')}
                className={`px-2 py-0.5 rounded-lg transition-colors ${
                  lighting === 'ambient' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Studio Pure
              </button>
            </div>
          </div>

          {/* THE FRAMES WALL DISPLAY */}
          <div className="relative z-20 my-auto py-4 flex items-center justify-center">
            {/* 1. Solo Statement Layout */}
            {activeLayout === 'solo' && (
              <div className="max-w-sm w-full mx-auto">
                {renderLiveFrameCard('slot-1', '18 × 24', 'aspect-[3/4]')}
              </div>
            )}

            {/* 2. Triptych 3-Piece Layout (1 Big Left + 2 Stacked Right) */}
            {activeLayout === 'triptych-3' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 items-center max-w-3xl mx-auto w-full">
                <div className="md:col-span-7">
                  {renderLiveFrameCard('slot-1', '18 × 24', 'aspect-[3/4]')}
                </div>
                <div className="md:col-span-5 flex flex-col gap-5 sm:gap-6">
                  {renderLiveFrameCard('slot-2', '12 × 18', 'aspect-[3/4]', 'max-w-[210px] mx-auto')}
                  {renderLiveFrameCard('slot-3', '12 × 18', 'aspect-[3/4]', 'max-w-[210px] mx-auto')}
                </div>
              </div>
            )}

            {/* 3. Quad 4-Piece Grid Layout (2x2 Balanced Gallery) */}
            {activeLayout === 'quad-4' && (
              <div className="grid grid-cols-2 gap-6 sm:gap-10 max-w-2xl mx-auto w-full">
                {renderLiveFrameCard('slot-1', '12 × 18', 'aspect-[3/4]', 'max-w-[240px] mx-auto')}
                {renderLiveFrameCard('slot-2', '12 × 18', 'aspect-[3/4]', 'max-w-[240px] mx-auto')}
                {renderLiveFrameCard('slot-3', '12 × 18', 'aspect-[3/4]', 'max-w-[240px] mx-auto')}
                {renderLiveFrameCard('slot-4', '12 × 18', 'aspect-[3/4]', 'max-w-[240px] mx-auto')}
              </div>
            )}

            {/* 4. Maha 5-Piece Royal Set (3 Top + 2 Bottom) */}
            {activeLayout === 'maha-5' && (
              <div className="space-y-6 max-w-3xl mx-auto w-full">
                <div className="grid grid-cols-3 gap-4 sm:gap-6">
                  {renderLiveFrameCard('slot-1', 'A4', 'aspect-[3/4]', 'max-w-[190px] mx-auto')}
                  {renderLiveFrameCard('slot-2', 'A4', 'aspect-[3/4]', 'max-w-[190px] mx-auto')}
                  {renderLiveFrameCard('slot-3', 'A4', 'aspect-[3/4]', 'max-w-[190px] mx-auto')}
                </div>
                <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
                  {renderLiveFrameCard('slot-4', '12 × 18', 'aspect-[3/4]', 'max-w-[200px] mx-auto')}
                  {renderLiveFrameCard('slot-5', '12 × 18', 'aspect-[3/4]', 'max-w-[200px] mx-auto')}
                </div>
              </div>
            )}
          </div>

          {/* Living Room Furniture Base (Sofa or Console Table Silhouette for Authentic Depth) */}
          {furnitureBase === 'sofa' && (
            <div className="relative z-10 mt-8 pt-4 border-t border-black/10 flex flex-col items-center">
              {/* Backrest of modern sofa */}
              <div className="w-full max-w-3xl h-10 sm:h-14 bg-gradient-to-t from-neutral-800 to-neutral-700 rounded-t-3xl shadow-2xl relative border-t border-neutral-600/40">
                <div className="absolute inset-x-8 top-1 h-1 bg-white/10 rounded-full" />
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest pointer-events-none">
                  Living Room Sofa Focal Wall
                </span>
              </div>
            </div>
          )}

          {furnitureBase === 'console' && (
            <div className="relative z-10 mt-8 pt-4 border-t border-black/10 flex flex-col items-center">
              {/* Wooden Console Credenza */}
              <div className="w-full max-w-2xl h-8 bg-[#5c3a21] rounded-t-lg shadow-xl relative border-t-2 border-[#7a4e2c]">
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-neutral-500 uppercase tracking-widest pointer-events-none">
                  Credenza Console Wall
                </span>
              </div>
            </div>
          )}
        </div>

        {/* =========================================================================
            4. BOTTOM ORDER BAR: PRICE, WHATSAPP & ADD TO CART
            ========================================================================= */}
        <div className="max-w-5xl mx-auto mt-8 p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E2D8] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                {bundle.label}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center gap-1">
                <Check size={12} />
                <span>FREE Express Shipping 🚚</span>
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-neutral-900">
                ₹{bundle.price}
              </span>
              <span className="text-sm text-neutral-400 line-through">
                ₹{bundle.original}
              </span>
              <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                Save ₹{bundle.original - bundle.price} (Direct Factory Rate)
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Includes {bundle.count} solid wooden frames with 2mm shatterproof acrylic glass, archival mats, and pre-installed sawtooth hangers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleWhatsAppOrder}
              className="flex-1 sm:flex-none py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <MessageCircle size={17} />
              <span>Order Full Wall Set via WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={handleAddAllToCart}
              className="flex-1 sm:flex-none py-3.5 px-5 bg-neutral-950 hover:bg-neutral-800 text-white font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <ShoppingBag size={17} />
              <span>Add All to Cart</span>
            </button>
          </div>
        </div>

        {/* Added to Cart Feedback Toast */}
        <AnimatePresence>
          {addedToast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed bottom-6 right-6 z-50 bg-neutral-950 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-neutral-700"
            >
              <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-bold">{bundle.count} Framed Artworks added to Cart!</p>
                <p className="text-[10px] text-neutral-400">Complete checkout or confirm via WhatsApp</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* =========================================================================
          5. LIVE PHOTO PICKER DRAWER WITH MINI FRAMED ARTWORKS PREVIEW
          ========================================================================= */}
      {isPhotoPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-neutral-950/70 backdrop-blur-sm"
            onClick={() => setIsPhotoPickerOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-white rounded-3xl p-6 sm:p-7 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden z-10 flex flex-col space-y-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 shrink-0">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-900">
                  Select Artwork for {slots[activeSlotId]?.label}
                </h3>
                <p className="text-xs text-neutral-500">
                  Choose from {allRawPosters.length}+ posters rendered inside live frames, or upload your custom photo.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsPhotoPickerOpen(false)}
                className="p-2 text-neutral-400 hover:text-neutral-950 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search & Category Filter Bar */}
            <div className="space-y-2 shrink-0">
              <div className="relative">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search posters by title (e.g. Porsche, Virat, Itachi, Ducati, Marvel)..."
                  value={pickerSearch}
                  onChange={e => setPickerSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 bg-[#FAF8F5]"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {['All', ...availableCategories].map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setPickerCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                      pickerCategory === cat
                        ? 'bg-neutral-950 text-white'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Upload Button */}
            <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-amber-300 bg-amber-50/60 rounded-2xl cursor-pointer hover:bg-amber-100/60 transition-colors shrink-0">
              <Upload size={16} className="text-amber-800" />
              <span className="text-xs font-bold text-amber-900">
                Upload Custom Image from Computer
              </span>
              <input type="file" accept="image/*" onChange={handleCustomUpload} className="hidden" />
            </label>

            {/* Posters Grid (Rendered in Live Mini 3D Frames!) */}
            <div className="flex-1 overflow-y-auto pr-1">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredPickerPosters.map(p => {
                  const frameFinish = slots[activeSlotId]?.customColor || selectedFrameColor;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelectPhoto(p.imageSrc, p.title)}
                      className="group p-2 rounded-2xl bg-[#FAF8F5] border border-neutral-200 hover:border-amber-600 hover:shadow-md transition-all text-left flex flex-col justify-between"
                    >
                      {/* Live Mini Frame Preview */}
                      <div className="w-full aspect-[3/4] relative overflow-hidden rounded-[2px] mb-2 shadow-xs">
                        <RealisticFrame
                          imageSrc={p.imageSrc}
                          alt={p.title}
                          frameColor={frameFinish}
                          withMat={withMat}
                          showGlassReflection={showGlassSheen}
                          className="w-full h-full"
                        />
                      </div>

                      {/* Poster Title & Category */}
                      <div>
                        <span className="text-[11px] font-bold text-neutral-900 block truncate leading-snug">
                          {p.title}
                        </span>
                        <span className="text-[9px] text-amber-800 font-semibold block mt-0.5">
                          {p.category}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default GalleryWallStudio;
