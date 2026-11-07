import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  Layers,
  Palette,
  Check,
  ChevronRight,
  Info,
} from 'lucide-react';
import RealisticFrame, { FRAME_STYLES } from '@/components/RealisticFrame';
import { products, STORE_WHATSAPP_NUMBER } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { getRawPosters } from '@/data/rawPosters';

type WallLayout = 'solo' | 'triptych-3' | 'quad-4' | 'maha-5';

interface FrameSlot {
  id: string;
  label: string;
  imageSrc: string;
  title: string;
  size: 'A4' | 'A3' | '12 × 18' | '18 × 24';
}

export const GalleryWallStudio = () => {
  const { addItem } = useCart();

  const [activeLayout, setActiveLayout] = useState<WallLayout>('quad-4');
  const [selectedFrameColor, setSelectedFrameColor] = useState<'black' | 'wood' | 'white' | 'gold'>('black');
  const [withMat, setWithMat] = useState<boolean>(false);
  const [wallColor, setWallColor] = useState<string>('#FAF8F5');
  const [activeSlotId, setActiveSlotId] = useState<string>('slot-1');
  const [isPhotoPickerOpen, setIsPhotoPickerOpen] = useState<boolean>(false);
  const [customUploads, setCustomUploads] = useState<{ src: string; name: string }[]>([]);

  // Default images for slots
  const [slots, setSlots] = useState<Record<string, FrameSlot>>({
    'slot-1': {
      id: 'slot-1',
      label: 'Frame 1',
      imageSrc: products[0]?.image || '',
      title: products[0]?.title || 'Artwork 1',
      size: 'A4',
    },
    'slot-2': {
      id: 'slot-2',
      label: 'Frame 2',
      imageSrc: products[1]?.image || '',
      title: products[1]?.title || 'Artwork 2',
      size: 'A4',
    },
    'slot-3': {
      id: 'slot-3',
      label: 'Frame 3',
      imageSrc: products[2]?.image || '',
      title: products[2]?.title || 'Artwork 3',
      size: 'A4',
    },
    'slot-4': {
      id: 'slot-4',
      label: 'Frame 4',
      imageSrc: products[3]?.image || '',
      title: products[3]?.title || 'Artwork 4',
      size: 'A4',
    },
    'slot-5': {
      id: 'slot-5',
      label: 'Frame 5',
      imageSrc: products[4]?.image || '',
      title: products[4]?.title || 'Artwork 5',
      size: 'A4',
    },
  });

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

  // Pricing based on layout
  const getBundlePrice = () => {
    switch (activeLayout) {
      case 'solo':
        return { count: 1, original: 799, price: 499, label: 'Solo Statement Piece' };
      case 'triptych-3':
        return { count: 3, original: 2397, price: 1399, label: '3-Piece Gallery Set' };
      case 'quad-4':
        return { count: 4, original: 3196, price: 1799, label: '4-Piece Living Room Set' };
      case 'maha-5':
        return { count: 5, original: 3995, price: 2199, label: '5-Piece Royal Collection' };
    }
  };

  const bundle = getBundlePrice();

  const handleWhatsAppOrder = () => {
    const frameName = FRAME_STYLES[selectedFrameColor]?.name || 'Classic Black';
    const activeSlotList =
      activeLayout === 'solo'
        ? [slots['slot-1']]
        : activeLayout === 'triptych-3'
        ? [slots['slot-1'], slots['slot-2'], slots['slot-3']]
        : activeLayout === 'quad-4'
        ? [slots['slot-1'], slots['slot-2'], slots['slot-3'], slots['slot-4']]
        : [slots['slot-1'], slots['slot-2'], slots['slot-3'], slots['slot-4'], slots['slot-5']];

    const itemsSummary = activeSlotList
      .map((s, idx) => `  ${idx + 1}. *${s.title}* (${s.size})`)
      .join('\n');

    const message = [
      `*POSTER_ARENA - Custom Multi-Frame Gallery Wall Order* 🖼️✨`,
      `----------------------------------------`,
      `• *Layout:* ${bundle.label} (${bundle.count} Frames)`,
      `• *Frame Style:* ${frameName}`,
      `• *Mount/Mat:* ${withMat ? 'With White Archival Mat' : 'Edge-to-Edge Print'}`,
      `• *Wall Color Tested:* ${wallColor}`,
      `• *Artworks Selected:*`,
      itemsSummary,
      `----------------------------------------`,
      `• *Bundle Special Price:* ₹${bundle.price} (Original ₹${bundle.original})`,
      `• *Free Express Shipping:* Included 🚚`,
      `----------------------------------------`,
      `Hi POSTER_ARENA! I have configured this multi-frame wall gallery set and would like to confirm my order. Please share details!`,
    ].join('\n');

    window.open(`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const handleAddAllToCart = () => {
    const activeSlotList =
      activeLayout === 'solo'
        ? [slots['slot-1']]
        : activeLayout === 'triptych-3'
        ? [slots['slot-1'], slots['slot-2'], slots['slot-3']]
        : activeLayout === 'quad-4'
        ? [slots['slot-1'], slots['slot-2'], slots['slot-3'], slots['slot-4']]
        : [slots['slot-1'], slots['slot-2'], slots['slot-3'], slots['slot-4'], slots['slot-5']];

    activeSlotList.forEach(slot => {
      // Find or create product entry
      const matched = products.find(p => p.image === slot.imageSrc) || {
        id: `custom-${Date.now()}-${slot.id}`,
        title: slot.title,
        slug: 'custom-framed-art',
        category: 'Custom Gallery Wall',
        subcategory: 'Framed Art',
        tags: ['Custom'],
        image: slot.imageSrc,
        description: 'Custom framed wall art print.',
        paperQuality: '300 GSM Archival Velvet Paper',
        rating: 5.0,
        reviews: 1,
      };
      addItem(matched, slot.size, true, FRAME_STYLES[selectedFrameColor]?.name || 'Matte Black', 1);
    });
  };

  return (
    <div className="bg-[#FAF8F5] py-12 lg:py-16 border-b border-[#E8E2D8]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest mb-2">
            <Sparkles size={14} className="text-amber-700" />
            <span>Interactive Multi-Frame Studio</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight mb-3">
            Build Your Custom Framed Wall Gallery
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Click on any frame on the wall below to swap photos. Choose your frame moulding, test living room wall colors, and order the entire set via WhatsApp with bundle discounts!
          </p>
        </div>

        {/* Studio Control Toolbar */}
        <div className="max-w-5xl mx-auto mb-8 p-4 sm:p-5 rounded-2xl bg-white border border-[#E8E2D8] shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
          {/* 1. Layout selector */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-700 uppercase tracking-wider flex items-center gap-1">
              <Layers size={14} className="text-neutral-500" /> Layout:
            </span>
            <div className="flex gap-1.5 bg-[#FAF8F5] p-1 rounded-xl border border-neutral-200">
              <button
                onClick={() => setActiveLayout('solo')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activeLayout === 'solo'
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                1 Frame
              </button>
              <button
                onClick={() => setActiveLayout('triptych-3')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activeLayout === 'triptych-3'
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                3 Frames Set
              </button>
              <button
                onClick={() => setActiveLayout('quad-4')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activeLayout === 'quad-4'
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                4 Frames Grid
              </button>
              <button
                onClick={() => setActiveLayout('maha-5')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activeLayout === 'maha-5'
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                5 Frames Royal
              </button>
            </div>
          </div>

          {/* 2. Frame Colour Selection */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-700 uppercase tracking-wider">Frame:</span>
            <div className="flex gap-1.5">
              {(['black', 'wood', 'white', 'gold'] as const).map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedFrameColor(color)}
                  className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-all border ${
                    selectedFrameColor === color
                      ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400'
                  }`}
                >
                  {color}
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
                { label: 'Cream', code: '#FAF8F5' },
                { label: 'White', code: '#FFFFFF' },
                { label: 'Linen', code: '#EFEAE1' },
                { label: 'Charcoal', code: '#202022' },
              ].map(w => (
                <button
                  key={w.code}
                  onClick={() => setWallColor(w.code)}
                  title={w.label}
                  className={`w-6 h-6 rounded-full border transition-all ${
                    wallColor === w.code ? 'ring-2 ring-neutral-900 scale-110' : 'border-neutral-300'
                  }`}
                  style={{ backgroundColor: w.code }}
                />
              ))}
            </div>
          </div>

          {/* 4. White Matting Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setWithMat(!withMat)}
              className={`px-3 py-1.5 rounded-lg font-bold border transition-colors ${
                withMat
                  ? 'bg-amber-100 border-amber-300 text-amber-900'
                  : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-400'
              }`}
            >
              {withMat ? 'White Mat: ON ✓' : 'White Mat: OFF'}
            </button>
          </div>
        </div>

        {/* Interactive Wall Simulation Canvas */}
        <div
          className="relative max-w-5xl mx-auto rounded-3xl p-8 sm:p-14 transition-colors duration-500 border border-[#E8E2D8] shadow-2xl min-h-[500px] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: wallColor }}
        >
          {/* Subtle Ambient Sunlight Angle Overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.0) 40%, rgba(0,0,0,0.06) 100%)',
            }}
          />

          {/* Instruction Pill */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-neutral-300 text-[11px] font-semibold text-neutral-800 shadow-sm">
            <Info size={13} className="text-amber-700" />
            <span>Tap any frame to change photo</span>
          </div>

          {/* 1. Solo Layout */}
          {activeLayout === 'solo' && (
            <div className="relative z-10 max-w-sm w-full mx-auto text-center cursor-pointer" onClick={() => handleSlotClick('slot-1')}>
              <RealisticFrame
                imageSrc={slots['slot-1'].imageSrc}
                alt={slots['slot-1'].title}
                frameColor={selectedFrameColor}
                withMat={withMat}
                sizeLabel={slots['slot-1'].size}
                className="w-full hover:scale-[1.02] transition-transform duration-300"
              />
              <p className={`text-xs font-semibold mt-3 ${wallColor === '#202022' ? 'text-white' : 'text-neutral-800'}`}>
                {slots['slot-1'].title} (Click to swap)
              </p>
            </div>
          )}

          {/* 2. Triptych 3-Piece Layout (1 Big Left + 2 Stacked Right, like user's photo) */}
          {activeLayout === 'triptych-3' && (
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-3xl mx-auto w-full">
              {/* Left Large Frame */}
              <div
                className="md:col-span-7 cursor-pointer text-center"
                onClick={() => handleSlotClick('slot-1')}
              >
                <RealisticFrame
                  imageSrc={slots['slot-1'].imageSrc}
                  alt={slots['slot-1'].title}
                  frameColor={selectedFrameColor}
                  withMat={withMat}
                  sizeLabel="18 × 24"
                  className="w-full hover:scale-[1.02] transition-transform duration-300"
                />
                <p className={`text-xs font-semibold mt-2 ${wallColor === '#202022' ? 'text-white' : 'text-neutral-800'}`}>
                  {slots['slot-1'].title}
                </p>
              </div>

              {/* Right Stacked 2 Frames */}
              <div className="md:col-span-5 flex flex-col gap-6">
                <div className="cursor-pointer text-center" onClick={() => handleSlotClick('slot-2')}>
                  <RealisticFrame
                    imageSrc={slots['slot-2'].imageSrc}
                    alt={slots['slot-2'].title}
                    frameColor={selectedFrameColor}
                    withMat={withMat}
                    sizeLabel="A4"
                    className="w-full max-w-[200px] mx-auto hover:scale-[1.02] transition-transform duration-300"
                  />
                  <p className={`text-[11px] font-semibold mt-1.5 ${wallColor === '#202022' ? 'text-white' : 'text-neutral-800'}`}>
                    {slots['slot-2'].title}
                  </p>
                </div>

                <div className="cursor-pointer text-center" onClick={() => handleSlotClick('slot-3')}>
                  <RealisticFrame
                    imageSrc={slots['slot-3'].imageSrc}
                    alt={slots['slot-3'].title}
                    frameColor={selectedFrameColor}
                    withMat={withMat}
                    sizeLabel="A4"
                    className="w-full max-w-[200px] mx-auto hover:scale-[1.02] transition-transform duration-300"
                  />
                  <p className={`text-[11px] font-semibold mt-1.5 ${wallColor === '#202022' ? 'text-white' : 'text-neutral-800'}`}>
                    {slots['slot-3'].title}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 3. Quad 4-Piece Grid Layout (2x2 grid, like user's photo) */}
          {activeLayout === 'quad-4' && (
            <div className="relative z-10 grid grid-cols-2 gap-6 sm:gap-10 max-w-2xl mx-auto w-full">
              {['slot-1', 'slot-2', 'slot-3', 'slot-4'].map(slotId => (
                <div
                  key={slotId}
                  onClick={() => handleSlotClick(slotId)}
                  className="cursor-pointer text-center group"
                >
                  <RealisticFrame
                    imageSrc={slots[slotId].imageSrc}
                    alt={slots[slotId].title}
                    frameColor={selectedFrameColor}
                    withMat={withMat}
                    sizeLabel={slots[slotId].size}
                    className="w-full max-w-[240px] mx-auto group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  <p className={`text-xs font-semibold mt-2 truncate ${wallColor === '#202022' ? 'text-white' : 'text-neutral-800'}`}>
                    {slots[slotId].title}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* 4. Maha 5-Piece Royal Set (3 top + 2 bottom, like user's photo) */}
          {activeLayout === 'maha-5' && (
            <div className="relative z-10 space-y-6 max-w-3xl mx-auto w-full">
              {/* Top 3 Frames */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6">
                {['slot-1', 'slot-2', 'slot-3'].map(slotId => (
                  <div
                    key={slotId}
                    onClick={() => handleSlotClick(slotId)}
                    className="cursor-pointer text-center group"
                  >
                    <RealisticFrame
                      imageSrc={slots[slotId].imageSrc}
                      alt={slots[slotId].title}
                      frameColor={selectedFrameColor}
                      withMat={withMat}
                      sizeLabel="A4"
                      className="w-full max-w-[180px] mx-auto group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    <p className={`text-[10px] font-semibold mt-1 truncate ${wallColor === '#202022' ? 'text-white' : 'text-neutral-800'}`}>
                      {slots[slotId].title}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom 2 Frames */}
              <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto">
                {['slot-4', 'slot-5'].map(slotId => (
                  <div
                    key={slotId}
                    onClick={() => handleSlotClick(slotId)}
                    className="cursor-pointer text-center group"
                  >
                    <RealisticFrame
                      imageSrc={slots[slotId].imageSrc}
                      alt={slots[slotId].title}
                      frameColor={selectedFrameColor}
                      withMat={withMat}
                      sizeLabel="A4"
                      className="w-full max-w-[190px] mx-auto group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    <p className={`text-[10px] font-semibold mt-1 truncate ${wallColor === '#202022' ? 'text-white' : 'text-neutral-800'}`}>
                      {slots[slotId].title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Order Bar: Price, WhatsApp & Add To Cart */}
        <div className="max-w-5xl mx-auto mt-8 p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                {bundle.label}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                Free Express Delivery
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-neutral-900">
                ₹{bundle.price}
              </span>
              <span className="text-sm text-neutral-400 line-through">
                ₹{bundle.original}
              </span>
              <span className="text-xs text-amber-800 font-semibold">
                (Save ₹{bundle.original - bundle.price})
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Includes {bundle.count} ready-to-hang framed prints with acrylic glass & wall hanging clips.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleWhatsAppOrder}
              className="flex-1 sm:flex-none py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <MessageCircle size={17} />
              <span>Order Full Wall Set via WhatsApp</span>
            </button>

            <button
              onClick={handleAddAllToCart}
              className="flex-1 sm:flex-none py-3.5 px-5 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <ShoppingBag size={17} />
              <span>Add All to Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Photo Picker Modal Drawer */}
      {isPhotoPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm"
            onClick={() => setIsPhotoPickerOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white rounded-3xl p-6 shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto z-10 space-y-5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <div>
                <h3 className="font-display text-xl font-bold text-neutral-900">
                  Select Artwork for {slots[activeSlotId]?.label}
                </h3>
                <p className="text-xs text-neutral-500">
                  Choose from our poster catalog or upload your custom raw image.
                </p>
              </div>
              <button
                onClick={() => setIsPhotoPickerOpen(false)}
                className="p-2 text-neutral-400 hover:text-neutral-900 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Upload Button */}
            <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-amber-300 bg-amber-50/60 rounded-2xl cursor-pointer hover:bg-amber-100/60 transition-colors">
              <Upload size={18} className="text-amber-800" />
              <span className="text-xs font-bold text-amber-900">
                Upload New Image from Your Computer
              </span>
              <input type="file" accept="image/*" onChange={handleCustomUpload} className="hidden" />
            </label>

            {/* Custom Uploads Section */}
            {customUploads.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                  Your Uploaded Images
                </h4>
                <div className="grid grid-cols-4 gap-3">
                  {customUploads.map((up, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectPhoto(up.src, up.name)}
                      className="aspect-[3/4] rounded-xl overflow-hidden border-2 border-transparent hover:border-neutral-900 focus:border-neutral-900 shadow-sm relative group"
                    >
                      <img src={up.src} alt={up.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-neutral-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-bold">
                        Select
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Curated Catalog Posters */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                Curated Store Posters ({products.length})
              </h4>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-[350px] overflow-y-auto pr-1">
                {products.map(p => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPhoto(p.image, p.title)}
                    className="aspect-[3/4] rounded-xl overflow-hidden border-2 border-transparent hover:border-neutral-900 focus:border-neutral-900 shadow-sm relative group text-left"
                  >
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end text-white text-[10px]">
                      <span className="font-bold line-clamp-1">{p.title}</span>
                      <span className="text-amber-300 font-semibold mt-0.5">Click to Apply</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default GalleryWallStudio;

