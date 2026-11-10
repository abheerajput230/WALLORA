import { useState, useEffect } from 'react';
import { Heart, ShoppingCart, MessageCircle, ArrowRight, Check, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product, generateProductWhatsAppUrl } from '@/data/products';
import { useCart } from '@/context/CartContext';
import RealisticFrame from '@/components/RealisticFrame';

export interface ProductCardProps {
  product: Product;
  index?: number;
  framed?: boolean;
  frameColor?: 'black' | 'wood' | 'white' | 'gold';
  withMat?: boolean;
}

const ProductCard = ({
  product,
  index = 0,
  framed = false,
  frameColor = 'black',
  withMat = false,
}: ProductCardProps) => {
  const { addItem } = useCart();
  const [liked, setLiked] = useState(false);
  const [localFrameColor, setLocalFrameColor] = useState<'black' | 'wood' | 'white' | 'gold'>(frameColor);
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    if (frameColor) {
      setLocalFrameColor(frameColor);
    }
  }, [frameColor]);

  const getFrameName = (color: 'black' | 'wood' | 'white' | 'gold') => {
    switch (color) {
      case 'wood':
        return 'Natural Oak Wood';
      case 'white':
        return 'Studio White';
      case 'gold':
        return 'Champagne Gold';
      case 'black':
      default:
        return 'Matte Black';
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (framed) {
      addItem(product, 'A4', true, getFrameName(localFrameColor), 1);
    } else {
      addItem(product, 'A4', false, undefined, 1);
    }

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleQuickWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const frameName = getFrameName(localFrameColor);
    const url = generateProductWhatsAppUrl(product, 'A4', framed, frameName, 1);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.35 }}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#E8E2D8] shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300"
    >
      {/* =========================================================================
          TOP IMAGE CONTAINER: FRAMED PRESENTATION (When framed=true)
          ========================================================================= */}
      {framed ? (
        <Link
          to={`/product/${product.id}`}
          className="relative p-4 sm:p-5 bg-gradient-to-b from-[#F8F5F0] via-[#F2EDE4] to-[#ECE5D8] flex items-center justify-center overflow-hidden block group/frame border-b border-[#E8E2D8]/60"
        >
          {/* 3D Realistic Wood Gallery Frame */}
          <div className="w-full flex items-center justify-center py-2">
            <RealisticFrame
              imageSrc={product.image}
              alt={product.title}
              frameColor={localFrameColor}
              aspectRatio="aspect-[3/4]"
              withMat={withMat}
              showGlassReflection={true}
              showWallShadow={true}
              className="w-full max-w-[230px] transform group-hover/frame:scale-[1.025] transition-transform duration-300"
            />
          </div>

          {/* Badges on Top-Left */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-20">
            <span className="px-2.5 py-0.5 bg-neutral-950/90 text-white text-[10px] font-bold tracking-wider uppercase rounded-full shadow-md flex items-center gap-1">
              <Sparkles size={11} className="text-amber-400" />
              Framed Art
            </span>
            {product.isBestSeller && (
              <span className="px-2 py-0.5 bg-amber-500 text-neutral-950 text-[10px] font-bold tracking-wider uppercase rounded-full shadow-sm">
                Best Seller
              </span>
            )}
          </div>

          {/* Interactive Frame Color Switcher Dots (On-Card Preview!) */}
          <div
            className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-white/90 backdrop-blur-md p-1 rounded-full shadow-md border border-neutral-200/80"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <button
              type="button"
              title="Classic Matte Black Frame"
              onClick={() => setLocalFrameColor('black')}
              className={`w-3.5 h-3.5 rounded-full bg-neutral-950 transition-all ${localFrameColor === 'black' ? 'ring-2 ring-amber-500 scale-110' : 'opacity-70 hover:opacity-100'
                }`}
            />
            <button
              type="button"
              title="Natural Warm Oak Wood Frame"
              onClick={() => setLocalFrameColor('wood')}
              className={`w-3.5 h-3.5 rounded-full bg-[#875c34] transition-all ${localFrameColor === 'wood' ? 'ring-2 ring-amber-500 scale-110' : 'opacity-70 hover:opacity-100'
                }`}
            />
            <button
              type="button"
              title="Studio White Frame"
              onClick={() => setLocalFrameColor('white')}
              className={`w-3.5 h-3.5 rounded-full bg-white border border-neutral-300 transition-all ${localFrameColor === 'white' ? 'ring-2 ring-amber-500 scale-110' : 'opacity-70 hover:opacity-100'
                }`}
            />
            <button
              type="button"
              title="Champagne Gold Luxury Frame"
              onClick={() => setLocalFrameColor('gold')}
              className={`w-3.5 h-3.5 rounded-full bg-[#c4994d] transition-all ${localFrameColor === 'gold' ? 'ring-2 ring-amber-500 scale-110' : 'opacity-70 hover:opacity-100'
                }`}
            />
          </div>

          {/* Hover Quick Actions Overlay */}
          <div className="absolute bottom-3 inset-x-3 flex items-center gap-2 translate-y-3 opacity-0 group-hover/frame:translate-y-0 group-hover/frame:opacity-100 transition-all duration-300 z-20">
            <button
              type="button"
              onClick={handleQuickWhatsApp}
              title="Order Framed Art on WhatsApp"
              className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 shadow-md transition-colors"
            >
              <MessageCircle size={14} />
              <span>WhatsApp</span>
            </button>
            <button
              type="button"
              onClick={handleQuickAdd}
              title="Add Framed Art to Cart"
              className="p-2.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-lg shadow-md transition-colors flex items-center justify-center"
            >
              {addedToast ? <Check size={15} className="text-emerald-400" /> : <ShoppingCart size={15} />}
            </button>
          </div>
        </Link>
      ) : (
        /* Regular Unframed Image Container */
        <Link to={`/product/${product.id}`} className="relative aspect-[3/4] overflow-hidden bg-neutral-100 block">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/10 transition-colors duration-300" />

          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.isBestSeller && (
              <span className="px-2.5 py-1 bg-neutral-900 text-white text-[10px] font-bold tracking-wider uppercase rounded-md shadow-sm">
                Best Seller
              </span>
            )}
            {product.isNew && (
              <span className="px-2.5 py-1 bg-amber-600 text-white text-[10px] font-bold tracking-wider uppercase rounded-md shadow-sm">
                New Drop
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              setLiked(!liked);
            }}
            aria-label="Wishlist"
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md text-neutral-800 shadow-sm hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200 z-10"
          >
            <Heart size={16} className={liked ? 'fill-rose-500 text-rose-500' : 'text-neutral-700'} />
          </button>

          <div className="absolute bottom-3 inset-x-3 flex items-center gap-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
            <button
              type="button"
              onClick={handleQuickWhatsApp}
              title="Order on WhatsApp"
              className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 shadow-md transition-colors"
            >
              <MessageCircle size={14} />
              <span>WhatsApp</span>
            </button>
            <button
              type="button"
              onClick={handleQuickAdd}
              title="Add to Cart"
              className="p-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg shadow-md transition-colors flex items-center justify-center"
            >
              {addedToast ? <Check size={15} className="text-emerald-400" /> : <ShoppingCart size={15} />}
            </button>
          </div>
        </Link>
      )}

      {/* =========================================================================
          PRODUCT INFORMATION & PRICING
          ========================================================================= */}
      <div className="p-4 sm:p-4.5 flex flex-col flex-1 justify-between bg-white">
        <div>
          <Link to={`/product/${product.id}`} className="block">

            <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
              <span className="font-semibold text-amber-800 uppercase tracking-wider text-[11px]">
                {product.category}
              </span>
              <span className="flex items-center gap-1 font-semibold text-neutral-700 text-xs">
                ★ {product.rating}
              </span>
            </div>
          </Link>

          {/* <Link to={`/product/${product.id}`} className="block"> */}
          {/* <h3 className="font-display text-sm sm:text-base font-bold text-neutral-900 line-clamp-1 group-hover:text-amber-800 transition-colors">
              {product.title}
            </h3> */}

          <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
            {framed ? (
              <span>
                {getFrameName(localFrameColor)} Frame • Shatterproof Acrylic
              </span>
            ) : (
              <span>{product.subcategory} • 300 GSM Archival Velvet Paper</span>
            )}
          </p>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="pt-3 mt-3 border-t border-[#E8E2D8] flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-neutral-900">
                {framed ? '₹249' : '₹30'}
              </span>
              <span className="text-xs text-neutral-400 line-through">
                {framed ? '₹699' : '₹99'}
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                {framed ? '50% OFF' : '70% OFF'}
              </span>
            </div>
            <p className="text-[10px] text-neutral-500">
              {framed ? 'Solid Wood Frame + Acrylic' : 'Archival 300 GSM Print from ₹30'}
            </p>
          </div>

          <Link
            to={`/product/${product.id}`}
            className="p-2 text-neutral-800 hover:text-amber-800 transition-colors"
            title="View Details & Sizes"
          >
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
