import { useState } from 'react';
import { Heart, ShoppingBag, MessageCircle, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product, PosterSize, calculatePrice, generateProductWhatsAppUrl, STORE_WHATSAPP_NUMBER } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface DeskPosterCardProps {
  product: Product;
  index?: number;
}

export type DeskSize = 'A5' | 'A4' | 'A3' | '13×19';

// Quick price table for the desk poster card
const DESK_SIZE_PRICES: Record<DeskSize, { price: number; original: number; standardSize: PosterSize }> = {
  'A5': { price: 20, original: 40, standardSize: 'A4' },
  'A4': { price: 30, original: 99, standardSize: 'A4' },
  'A3': { price: 99, original: 249, standardSize: 'A3' },
  '13×19': { price: 149, original: 349, standardSize: '12 × 18' },
};

export const DeskPosterCard = ({ product, index = 0 }: DeskPosterCardProps) => {
  const { addItem } = useCart();
  const [selectedDeskSize, setSelectedDeskSize] = useState<DeskSize>('A4');
  const [liked, setLiked] = useState<boolean>(false);
  const [addedToast, setAddedToast] = useState<boolean>(false);

  const priceInfo = DESK_SIZE_PRICES[selectedDeskSize];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, priceInfo.standardSize, false, undefined, 1);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = generateProductWhatsAppUrl(
      product,
      priceInfo.standardSize,
      false,
      undefined,
      1
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-300">
      {/* 1. Realistic Desk Room Mockup Image */}
      <Link to={`/product/${product.id}`} className="relative aspect-[4/5] overflow-hidden bg-neutral-900 block">
        {/* Poster Image */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Ambient Room Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-neutral-950/10 pointer-events-none" />

        {/* Indoor Plant & Desk Silhouette at Bottom (matching Image 4) */}
        <div className="absolute -bottom-2 -left-2 w-14 h-14 pointer-events-none opacity-85 select-none drop-shadow-lg">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-emerald-950">
            <path
              d="M20 90C10 60 40 40 50 20C60 40 90 60 80 90C70 100 30 100 20 90Z"
              fill="#064E3B"
            />
            <path
              d="M5 95C-2 70 20 50 30 35C40 50 60 70 50 95Z"
              fill="#047857"
              fillOpacity="0.8"
            />
          </svg>
        </div>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
          <span className="px-2 py-0.5 rounded bg-neutral-950/90 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
            Sale
          </span>
          {product.isBestSeller && (
            <span className="px-2 py-0.5 rounded bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
              Best Seller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-md text-neutral-800 shadow-sm hover:scale-110 active:scale-95 transition-all z-10"
          aria-label="Wishlist"
        >
          <Heart size={15} className={liked ? 'fill-rose-500 text-rose-500' : 'text-neutral-700'} />
        </button>

        {/* Quick WhatsApp button over image on hover */}
        <button
          onClick={handleWhatsApp}
          className="absolute bottom-2.5 right-2.5 py-1.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold rounded-lg shadow-md flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
        >
          <MessageCircle size={13} />
          <span>WhatsApp</span>
        </button>
      </Link>

      {/* 2. Card Content & In-Card Size Selector (Directly matching Image 4) */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Title */}
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-display font-bold text-neutral-900 text-sm line-clamp-1 hover:text-amber-800 transition-colors">
              {product.title}
            </h3>
          </Link>

          {/* Pricing Row: Strikethrough + Starting Price */}
          <div className="flex items-baseline gap-2 mt-1 mb-2.5">
            <span className="text-xs text-neutral-400 line-through">
              Rs. {priceInfo.original}.00
            </span>
            <span className="text-xs font-semibold text-neutral-600">From</span>
            <span className="text-sm font-extrabold text-neutral-900">
              Rs. {priceInfo.price}.00
            </span>
          </div>

          {/* In-Card Size Selector Pills: [A5] [A4] [A3] [13×19] */}
          <div className="grid grid-cols-4 gap-1 mb-2">
            {(['A5', 'A4', 'A3', '13×19'] as DeskSize[]).map(sz => (
              <button
                key={sz}
                onClick={() => setSelectedDeskSize(sz)}
                className={`py-1 text-[11px] font-bold rounded border transition-all ${
                  selectedDeskSize === sz
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                    : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-300'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>

          {/* Promo Callout (matching Image 4) */}
          <div className="text-[10px] text-amber-900 font-semibold text-center py-0.5 bg-amber-50 rounded border border-amber-200/60 mb-3">
            Min order ₹259 • <strong className="text-amber-950 font-bold">Buy 4 Get 3 FREE</strong>
          </div>
        </div>

        {/* 3. Primary Full-Width Action Button: Add to cart - ₹Price */}
        <button
          onClick={handleAddToCart}
          className="w-full py-2.5 px-4 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
        >
          {addedToast ? (
            <>
              <Check size={14} className="text-emerald-400" />
              <span>Added to Cart ✓</span>
            </>
          ) : (
            <>
              <ShoppingBag size={14} />
              <span>Add to cart • ₹{priceInfo.price}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default DeskPosterCard;

