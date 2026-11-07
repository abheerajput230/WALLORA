import { useState } from 'react';
import { ArrowRight, Sparkles, Check, MessageCircle, ShoppingBag } from 'lucide-react';
import { WALL_LAYOUT_PRESETS, WallLayoutPreset } from '@/data/wallSetups';
import { STORE_WHATSAPP_NUMBER } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface WallLayoutArchitectProps {
  onSelectLayout?: (layout: WallLayoutPreset) => void;
  selectedLayoutId?: string;
}

export const WallLayoutArchitect = ({
  onSelectLayout,
  selectedLayoutId = 'hero-wall',
}: WallLayoutArchitectProps) => {
  const { addItem } = useCart();
  const [activeLayout, setActiveLayout] = useState<string>(selectedLayoutId);
  const [mixMatchCount, setMixMatchCount] = useState<number>(18);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const handleSelect = (layout: WallLayoutPreset) => {
    setActiveLayout(layout.id);
    if (onSelectLayout) onSelectLayout(layout);
  };

  const handleOrderWhatsApp = (layout: WallLayoutPreset) => {
    const message = [
      `*POSTER_ARENA - Wall Layout Kit Order* 🖼️📐`,
      `----------------------------------------`,
      `• *Wall Template:* ${layout.name}`,
      `• *Posters Included:* ${layout.postersCount} Unframed Art Posters`,
      `• *Wall Dimensions:* ${layout.dimensions}`,
      `• *Paper Quality:* 300 GSM Archival Velvet Matte Paper`,
      `• *Includes:* Free Wall-Safe Nano Double-Sided Mounting Tape`,
      `----------------------------------------`,
      `• *Special Bundle Price:* ₹${layout.price} (Regular: ₹${layout.originalPrice})`,
      `• *Total Savings:* ₹${layout.savings} OFF!`,
      `• *Shipping:* FREE Express Doorstep Delivery 🚚`,
      `----------------------------------------`,
      `Hi POSTER_ARENA! I want to order this ${layout.name} (${layout.postersCount} Posters). Please confirm my order!`,
    ].join('\n');

    window.open(`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const handleAddToCart = (layout: WallLayoutPreset) => {
    addItem(
      {
        id: `layout-${layout.id}`,
        title: `${layout.name} (${layout.postersCount} Posters Wall Kit)`,
        slug: layout.id,
        category: 'Aesthetic Poster Wall',
        subcategory: 'Wall Layout Preset',
        tags: ['Wall Kit', layout.name, 'Collage'],
        image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&auto=format&fit=crop&q=80',
        description: layout.description,
        paperQuality: '300 GSM Archival Velvet Matte Paper',
        rating: 5.0,
        reviews: 45,
        isBestSeller: true,
      },
      'A4',
      false,
      undefined,
      1
    );
    setAddedToast(layout.id);
    setTimeout(() => setAddedToast(null), 2200);
  };

  const handleMixMatchWhatsApp = () => {
    const prices: Record<number, number> = { 7: 649, 10: 799, 18: 1199, 36: 1999 };
    const price = prices[mixMatchCount] || 1199;
    const message = `Hi POSTER_ARENA! I want to Mix & Match ${mixMatchCount} A4 Posters at the special bundle price of ₹${price} with Free Nano Tape. Please help me choose designs!`;
    window.open(`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 block mb-1">
            Wall Layout Architect
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Curated Wall Collage Blueprints
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl">
            Pre-planned visual arrangements optimized for bedroom walls, headboards, and study desks.
          </p>
        </div>
      </div>

      {/* 2. Four Preset Cards Grid (Matching Image 5) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {WALL_LAYOUT_PRESETS.map(preset => {
          const isSelected = activeLayout === preset.id;

          return (
            <div
              key={preset.id}
              onClick={() => handleSelect(preset)}
              className={`group relative rounded-3xl bg-white border-2 p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                isSelected
                  ? 'border-neutral-900 shadow-xl ring-2 ring-neutral-900/10'
                  : 'border-neutral-200/90 shadow-sm hover:border-neutral-400 hover:shadow-md'
              }`}
            >
              <div>
                {/* Top Badge: SAVE ₹... or BEST VALUE (Matching Image 5) */}
                <div className="flex items-center justify-between mb-4">
                  {preset.badge && (
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        preset.id === 'trio-xl-wall'
                          ? 'bg-neutral-900 text-amber-300'
                          : 'bg-emerald-500 text-white'
                      }`}
                    >
                      {preset.badge}
                    </span>
                  )}
                  {isSelected && (
                    <span className="px-2 py-0.5 rounded-full bg-neutral-900 text-white text-[9px] font-bold uppercase">
                      Selected
                    </span>
                  )}
                </div>

                {/* Blueprint Schematic Drawing (Stylized like Image 5) */}
                <div className="aspect-[4/3] rounded-2xl bg-[#F5EFEB] border border-neutral-300/80 p-3 mb-4 flex items-center justify-center relative overflow-hidden group-hover:bg-[#EFE8DE] transition-colors">
                  {/* Schematic Rendering */}
                  {preset.schematicType === 'mosaic' && (
                    <div className="flex flex-col items-center gap-1.5 w-full">
                      {/* Top mini row */}
                      <div className="flex gap-1">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} className="w-3.5 h-4.5 bg-white border border-neutral-400/80 rounded-[1px]" />
                        ))}
                      </div>
                      {/* Middle row: 3-piece center + flanks */}
                      <div className="flex items-center gap-1">
                        <div className="flex flex-col gap-1">
                          <div className="w-3.5 h-4.5 bg-white border border-neutral-400/80 rounded-[1px]" />
                          <div className="w-3.5 h-4.5 bg-white border border-neutral-400/80 rounded-[1px]" />
                        </div>
                        {/* 3-piece center */}
                        <div className="flex gap-0.5 p-0.5 bg-neutral-800/10 rounded">
                          <div className="w-7 h-10 bg-amber-100 border border-amber-600 rounded-[1px] flex items-center justify-center text-[7px] font-bold text-amber-900">
                            1
                          </div>
                          <div className="w-7 h-10 bg-amber-100 border border-amber-600 rounded-[1px] flex items-center justify-center text-[7px] font-bold text-amber-900">
                            2
                          </div>
                          <div className="w-7 h-10 bg-amber-100 border border-amber-600 rounded-[1px] flex items-center justify-center text-[7px] font-bold text-amber-900">
                            3
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="w-3.5 h-4.5 bg-white border border-neutral-400/80 rounded-[1px]" />
                          <div className="w-3.5 h-4.5 bg-white border border-neutral-400/80 rounded-[1px]" />
                        </div>
                      </div>
                      {/* Bottom mini row */}
                      <div className="flex gap-1">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} className="w-3.5 h-4.5 bg-white border border-neutral-400/80 rounded-[1px]" />
                        ))}
                      </div>
                    </div>
                  )}

                  {preset.schematicType === 'hero' && (
                    <div className="flex items-center justify-center gap-2 w-full">
                      {/* Left vertical flank */}
                      <div className="grid grid-cols-2 gap-1">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} className="w-3.5 h-4.5 bg-white border border-neutral-400/80 rounded-[1px]" />
                        ))}
                      </div>
                      {/* Center Giant Hero Poster (Wanted Luffy / Fight Club) */}
                      <div className="w-14 h-20 bg-amber-600 text-white rounded-[2px] shadow-md border-2 border-amber-700 flex flex-col items-center justify-center p-1 text-center">
                        <span className="text-[7px] font-black uppercase tracking-wider">HERO</span>
                        <span className="text-[5px] opacity-80">Centerpiece</span>
                      </div>
                      {/* Right vertical flank */}
                      <div className="grid grid-cols-2 gap-1">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} className="w-3.5 h-4.5 bg-white border border-neutral-400/80 rounded-[1px]" />
                        ))}
                      </div>
                    </div>
                  )}

                  {preset.schematicType === 'showcase' && (
                    <div className="flex items-center justify-center gap-2 w-full">
                      {/* Left flank */}
                      <div className="flex flex-col gap-1">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div key={i} className="w-4 h-5 bg-white border border-neutral-400/80 rounded-[1px]" />
                        ))}
                      </div>
                      {/* Central 6-piece split grid */}
                      <div className="grid grid-cols-3 gap-0.5 p-1 bg-neutral-900 rounded-[2px] shadow">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} className="w-8 h-8 bg-amber-400/90 border border-neutral-900 text-[6px] font-bold flex items-center justify-center text-neutral-950">
                            P{i + 1}
                          </div>
                        ))}
                      </div>
                      {/* Right flank */}
                      <div className="flex flex-col gap-1">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div key={i} className="w-4 h-5 bg-white border border-neutral-400/80 rounded-[1px]" />
                        ))}
                      </div>
                    </div>
                  )}

                  {preset.schematicType === 'trio-xl' && (
                    <div className="flex flex-col items-center gap-1.5 w-full">
                      {/* 3 Giant Vertical Centerpieces */}
                      <div className="flex items-center gap-1.5">
                        <div className="w-9 h-16 bg-neutral-900 text-amber-300 rounded-[2px] flex items-center justify-center text-[7px] font-bold shadow">
                          XL 1
                        </div>
                        <div className="w-9 h-16 bg-neutral-900 text-amber-300 rounded-[2px] flex items-center justify-center text-[7px] font-bold shadow">
                          XL 2
                        </div>
                        <div className="w-9 h-16 bg-neutral-900 text-amber-300 rounded-[2px] flex items-center justify-center text-[7px] font-bold shadow">
                          XL 3
                        </div>
                      </div>
                      {/* Dense surrounding border prints */}
                      <div className="flex gap-1">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div key={i} className="w-3 h-3.5 bg-white border border-neutral-400/80 rounded-[1px]" />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Title & Dimension Subtitle */}
                <h3 className="font-display font-bold text-neutral-900 text-lg">
                  {preset.name}
                </h3>
                <p className="text-xs text-neutral-500 font-medium mb-3">
                  {preset.postersCount} posters • {preset.dimensions}
                </p>
              </div>

              {/* Price & Action Row */}
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-black text-neutral-900">
                      ₹{preset.price}
                    </span>
                    <span className="text-xs text-neutral-400 line-through">
                      ₹{preset.originalPrice}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold">
                    Save ₹{preset.savings}
                  </span>
                </div>

                {/* Select / Arrow Button */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleOrderWhatsApp(preset);
                    }}
                    title="Order via WhatsApp"
                    className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                  >
                    <MessageCircle size={15} />
                  </button>

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleAddToCart(preset);
                    }}
                    title="Add to Cart"
                    className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white flex items-center justify-center active:scale-90 transition-all shadow-sm"
                  >
                    {addedToast === preset.id ? (
                      <Check size={14} className="text-emerald-400" />
                    ) : (
                      <ArrowRight size={14} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Bottom Banner: "Only A4 posters? Mix & Match: pick any 7, 10, 18 or 36 ->" (Directly matching Image 5) */}
      <div className="rounded-2xl border-2 border-dashed border-neutral-300 bg-white p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-sm">
            A4
          </div>
          <div>
            <h4 className="font-display font-bold text-neutral-900 text-sm sm:text-base">
              Only A4 posters? Mix & Match
            </h4>
            <p className="text-xs text-neutral-500">
              Pick any pack of 300 GSM Archival Prints with free mounting tape included.
            </p>
          </div>
        </div>

        {/* Count Pill Selector */}
        <div className="flex items-center gap-2">
          {[7, 10, 18, 36].map(cnt => (
            <button
              key={cnt}
              onClick={() => setMixMatchCount(cnt)}
              className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                mixMatchCount === cnt
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {cnt} Pack
            </button>
          ))}

          <button
            onClick={handleMixMatchWhatsApp}
            className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white flex items-center justify-center active:scale-95 transition-transform"
            title="Enquire on WhatsApp"
          >
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WallLayoutArchitect;

