import { useState } from 'react';
import { ShoppingBag, MessageCircle, Check, X, Sparkles } from 'lucide-react';
import { WallSetupPack } from '@/data/wallSetups';
import { STORE_WHATSAPP_NUMBER } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import MultiPosterWallMockup from '@/components/MultiPosterWallMockup';

interface WallSetupCardProps {
  pack: WallSetupPack;
}

export const WallSetupCard = ({ pack }: WallSetupCardProps) => {
  const { addItem } = useCart();
  const [addedToast, setAddedToast] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

    addItem(
      {
        id: `pack-${pack.id}`,
        title: pack.title,
        slug: pack.id,
        category: 'Wall Setup Packs',
        subcategory: pack.category,
        tags: ['Wall Setup', pack.category, 'Complete Kit', 'Unframed'],
        image: pack.image,
        description: `${pack.piecesText}. ${pack.description} Includes free wall-safe double-sided mounting tape.`,
        paperQuality: '300 GSM Archival Velvet Paper',
        rating: 4.9,
        reviews: 94,
        isBestSeller: true,
      },
      'A4',
      false,
      undefined,
      1
    );
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2200);
  };

  const handleWhatsAppOrder = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

    const titlesList = pack.sampleTitles.map((t, i) => `${i + 1}. ${t}`).join('\n');
    const message = [
      `*WALLORA - Wall Setup Pack Order* 🖼️⚡`,
      `_Turn Your Walls Into Art._`,
      `----------------------------------------`,
      `• *Wall Pack:* ${pack.title}`,
      `• *Contents:* ${pack.piecesText}`,
      `• *Dimensions:* ${pack.dimensions}`,
      `• *Paper:* 300 GSM Heavyweight Archival Velvet Paper`,
      `• *Includes:* Free Double-Sided Nano Mounting Tape (No Wall Damage)`,
      `• *Sample Titles Included:*`,
      titlesList,
      `----------------------------------------`,
      `• *Special Pack Price:* ₹${pack.price} (MRP: ₹${pack.originalPrice})`,
      `• *Shipping:* FREE Express Doorstep Delivery 🚚`,
      `----------------------------------------`,
      `Hi WALLORA! I want to order this ${pack.title}. Please confirm availability!`,
    ].join('\n');

    window.open(`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <div
        onClick={() => setModalOpen(true)}
        className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer text-center"
      >
        {/* 1. REALISTIC MULTI-IMAGE WALL SETUP MOCKUP (Using 100% Real Raw Posters!) */}
        <div className="relative aspect-square  overflow-hidden bg-neutral-900">
          <MultiPosterWallMockup
            layoutType={pack.mockupLayout || 'hero-pack'}
            centerImage={pack.heroImage || pack.image}
            surroundingImages={pack.surroundingImages || []}
            wallColor={pack.wallColor || '#EFE8DE'}
            deskType={pack.deskType || 'desk'}
            aspectRatio="aspect-full h-full"
            compact={true}
          />

          {/* Sale Pill Badge at Bottom-Left (Matching User Screenshot 1) */}
          <div className="absolute bottom-3 left-3 z-20">
            <span className="px-2.5 py-0.5 rounded-full bg-neutral-950/90 text-white text-[10px] font-bold tracking-wider shadow-md">
              Sale
            </span>
          </div>

          {/* Quick WhatsApp Icon at Top-Right (Matching User Screenshot 1) */}
          <button
            onClick={handleWhatsAppOrder}
            title="Quick Order on WhatsApp"
            className="absolute top-3 right-3 p-2 rounded-full bg-white/95 backdrop-blur-md text-emerald-700 shadow-sm hover:scale-110 active:scale-95 transition-all z-20"
          >
            <MessageCircle size={15} />
          </button>
        </div>

        {/* 2. Text Details & Pricing (Centered like Screenshot 1 & 2) */}
        <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
          <div>
            {/* Title (Matching User Screenshots) */}
            <h3 className="font-sans font-medium text-neutral-900 text-xs sm:text-sm line-clamp-2 leading-snug group-hover:text-amber-800 transition-colors mb-2">
              {pack.title}
            </h3>

            {/* Pricing Row: Rs. 799.00  Rs. 549.00 */}
            <div className="flex items-center justify-center gap-2.5 text-xs sm:text-sm mb-3">
              <span className="text-neutral-400 line-through">
                Rs. {pack.originalPrice}.00
              </span>
              <span className="font-bold text-neutral-900">
                Rs. {pack.price}.00
              </span>
            </div>
          </div>

          {/* 3. Solid Black Full-Width Button: Add to cart • ₹549 (Matching User Screenshots) */}
          <button
            onClick={handleAddToCart}
            className="w-full py-2.5 sm:py-3 px-4 bg-neutral-950 hover:bg-neutral-800 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
          >
            {addedToast ? (
              <>
                <Check size={16} className="text-emerald-400" />
                <span>Added to Cart ✓</span>
              </>
            ) : (
              <span>Add to cart • ₹{pack.price}</span>
            )}
          </button>
        </div>
      </div>

      {/* =========================================================================
          SETUP DETAIL MODAL (Opens on Card Click for Complete Overview)
          ========================================================================= */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-neutral-950/75 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full z-10 shadow-2xl border border-neutral-200 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-neutral-900 transition-colors"
                aria-label="Close"
              >
                <X size={22} />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                {/* Multi-Poster Wall Mockup in Modal */}
                <div className="relative rounded-2xl overflow-hidden aspect-square bg-neutral-900 shadow-lg">
                  <MultiPosterWallMockup
                    layoutType={pack.mockupLayout || 'hero-pack'}
                    centerImage={pack.heroImage || pack.image}
                    surroundingImages={pack.surroundingImages || []}
                    wallColor={pack.wallColor || '#EFE8DE'}
                    deskType={pack.deskType || 'desk'}
                    aspectRatio="aspect-square"
                  />
                  <div className="absolute bottom-3 left-3 bg-neutral-950/90 text-white text-[11px] font-bold px-2.5 py-1 rounded z-20">
                    {pack.pieces} Piece Setup Pack
                  </div>
                </div>

                {/* Details & Actions */}
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                      {pack.category}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 mt-2 leading-snug">
                      {pack.title}
                    </h3>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-extrabold text-neutral-900">
                      ₹{pack.price}
                    </span>
                    <span className="text-sm text-neutral-400 line-through">
                      ₹{pack.originalPrice}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-bold">
                      Save ₹{pack.originalPrice - pack.price}
                    </span>
                  </div>

                  {/* What's In The Box */}
                  <div className="space-y-2 text-xs bg-neutral-50 p-3.5 rounded-xl border border-neutral-200">
                    <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                      <Sparkles size={14} className="text-amber-600" />
                      <span>Pack Inclusions:</span>
                    </div>
                    <p className="text-neutral-600">
                      • <strong>Prints:</strong> {pack.mixDetails}
                    </p>
                    <p className="text-neutral-600">
                      • <strong>Paper:</strong> 300 GSM Archival Velvet Paper (Zero Glare)
                    </p>
                    <p className="text-neutral-600">
                      • <strong>Free Tape:</strong> Wall-safe removable nano mounting tape
                    </p>
                    <p className="text-neutral-600">
                      • <strong>Coverage:</strong> {pack.dimensions}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 space-y-2">
                    <button
                      onClick={e => {
                        handleAddToCart(e);
                        setModalOpen(false);
                      }}
                      className="w-full py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
                    >
                      <ShoppingBag size={16} />
                      <span>Add to cart • ₹{pack.price}</span>
                    </button>

                    <button
                      onClick={handleWhatsAppOrder}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
                    >
                      <MessageCircle size={16} />
                      <span>Order on WhatsApp (Instant Help)</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WallSetupCard;
