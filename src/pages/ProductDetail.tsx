import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Heart,
  ShoppingBag,
  Minus,
  Plus,
  ChevronRight,
  MessageCircle,
  ShieldCheck,
  Truck,
  Package,
  Sparkles,
  ArrowRight,
  Check,
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  products,
  SIZES_LIST,
  SIZE_PRICING,
  FRAME_OPTIONS,
  PosterSize,
  calculatePrice,
  calculateOriginalPrice,
  generateProductWhatsAppUrl,
  FREE_SHIPPING_THRESHOLD,
  Product,
} from '@/data/products';
import { getRawProducts } from '@/data/rawPosters';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';
import RealisticFrame from '@/components/RealisticFrame';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Load all catalog products including real raw posters
  const allCatalogProducts = useMemo(() => {
    const raw = getRawProducts();
    return [...raw, ...products];
  }, []);

  // Find product by id
  const product = useMemo(() => {
    return allCatalogProducts.find(p => p.id === id);
  }, [allCatalogProducts, id]);

  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState<PosterSize>('A4');
  const [isFramed, setIsFramed] = useState<boolean>(false);
  const [selectedFrameColor, setSelectedFrameColor] = useState<string>('Matte Black');
  const [quantity, setQuantity] = useState<number>(1);
  const [liked, setLiked] = useState<boolean>(false);
  const [addedToast, setAddedToast] = useState<boolean>(false);

  if (!product) {
    return (
      <div className="pt-32 pb-24 min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="font-display text-3xl font-bold text-neutral-900 mb-3">
          Poster Not Found
        </h2>
        <p className="text-sm text-neutral-500 mb-6">
          The poster you are looking for does not exist or has been retired.
        </p>
        <Link
          to="/products"
          className="px-6 py-3 bg-neutral-900 text-white rounded-xl text-sm font-semibold hover:bg-neutral-800 transition-colors"
        >
          Explore All Posters
        </Link>
      </div>
    );
  }

  // Dynamic price calculation
  const unitPrice = calculatePrice(selectedSize, isFramed);
  const originalUnitPrice = calculateOriginalPrice(selectedSize, isFramed);
  const totalPrice = unitPrice * quantity;
  const discountPercent = Math.round(((originalUnitPrice - unitPrice) / originalUnitPrice) * 100);

  // Related posters matching current poster category
  const related = allCatalogProducts
    .filter(p => p.id !== product.id && (p.category === product.category || p.subcategory === product.subcategory))
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, selectedSize, isFramed, selectedFrameColor, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    addItem(product, selectedSize, isFramed, selectedFrameColor, quantity);
    navigate('/checkout');
  };

  const handleWhatsAppOrder = () => {
    const url = generateProductWhatsAppUrl(
      product,
      selectedSize,
      isFramed,
      selectedFrameColor,
      quantity
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Find frame color styling
  const frameColorObj = FRAME_OPTIONS.find(f => f.label === selectedFrameColor);

  return (
    <div className="pt-6 pb-20 bg-[#FAF8F5]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-medium text-neutral-500 mb-8 py-2 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-neutral-900 transition-colors">Home</Link>
          <ChevronRight size={13} className="text-neutral-400" />
          <Link to="/products" className="hover:text-neutral-900 transition-colors">Posters</Link>
          <ChevronRight size={13} className="text-neutral-400" />
          <Link
            to={`/products?category=${encodeURIComponent(product.category)}`}
            className="hover:text-neutral-900 transition-colors text-amber-800 font-semibold"
          >
            {product.category}
          </Link>
          <ChevronRight size={13} className="text-neutral-400" />
          <span className="text-neutral-900 font-semibold truncate max-w-[200px]">
            {product.title}
          </span>
        </nav>

        {/* Main Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Interactive Poster Visualizer */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D8] shadow-sm relative"
            >
              {/* Frame Simulation Mockup */}
              <div className="relative aspect-[3/4] max-w-md mx-auto flex items-center justify-center">
                {isFramed ? (
                  <RealisticFrame
                    imageSrc={product.image}
                    alt={product.title}
                    frameColor={
                      selectedFrameColor === 'Natural Oak Wood'
                        ? 'wood'
                        : selectedFrameColor === 'Studio White'
                        ? 'white'
                        : selectedFrameColor === 'Champagne Gold'
                        ? 'gold'
                        : 'black'
                    }
                    sizeLabel={selectedSize}
                    withMat={false}
                    className="w-full h-full max-h-[460px] flex items-center justify-center"
                  />
                ) : (
                  // Unframed Rolled Paper View
                  <div className="w-full h-full rounded-xl overflow-hidden shadow-xl border border-neutral-200/80 bg-neutral-100 relative group">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 left-3 bg-neutral-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                      Unframed 300 GSM Print ({selectedSize})
                    </div>
                  </div>
                )}
              </div>

              {/* Framing Mode Toggle Buttons */}
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsFramed(false)}
                  className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all ${
                    !isFramed
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                      : 'bg-neutral-100 text-neutral-600 border-neutral-200 hover:bg-neutral-200'
                  }`}
                >
                  Unframed View
                </button>
                <button
                  type="button"
                  onClick={() => setIsFramed(true)}
                  className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all ${
                    isFramed
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                      : 'bg-neutral-100 text-neutral-600 border-neutral-200 hover:bg-neutral-200'
                  }`}
                >
                  Framed Live Simulation
                </button>
              </div>

              {/* Wishlist Heart */}
              <button
                onClick={() => setLiked(!liked)}
                className="absolute top-8 right-8 p-3 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200 shadow-md text-neutral-700 hover:scale-110 active:scale-95 transition-all"
                aria-label="Wishlist"
              >
                <Heart size={18} className={liked ? 'fill-rose-500 text-rose-500' : ''} />
              </button>
            </motion.div>
          </div>

          {/* Right Column: Title, Options & Dynamic Pricing */}
          <div className="lg:col-span-6 space-y-7">
            {/* Title & Rating */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100/70 px-2.5 py-1 rounded-md">
                  {product.category}
                </span>
                <span className="text-xs text-neutral-500">• {product.subcategory}</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight leading-tight mb-3">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-neutral-300'}
                    />
                  ))}
                </div>
                <span className="font-bold text-neutral-900">{product.rating}</span>
                <span className="text-xs text-neutral-500">({product.reviews} customer reviews)</span>
              </div>
            </div>

            {/* Dynamic Calculated Price Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E8E2D8] shadow-sm">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                  ₹{unitPrice}
                </span>
                <span className="text-base text-neutral-400 line-through">
                  ₹{originalUnitPrice}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  {discountPercent}% OFF
                </span>
              </div>

              <div className="mt-2 text-xs text-neutral-500 flex items-center justify-between">
                <span>
                  Configured: <strong className="text-neutral-800">{selectedSize}</strong> •{' '}
                  <strong className="text-neutral-800">
                    {isFramed ? `With Frame (${selectedFrameColor})` : 'Without Frame (Rolled)'}
                  </strong>
                </span>
                {quantity > 1 && (
                  <span className="font-bold text-neutral-900">
                    Total: ₹{totalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* 1. Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                  1. Select Poster Size
                </label>
                <span className="text-xs text-neutral-500">
                  {SIZE_PRICING[selectedSize].dimensions}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {SIZES_LIST.map(size => {
                  const sizePrice = calculatePrice(size, isFramed);
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-neutral-900 bg-neutral-900 text-white shadow-md'
                          : 'border-[#E8E2D8] bg-white text-neutral-800 hover:border-neutral-400'
                      }`}
                    >
                      <div className="font-bold text-sm">{size}</div>
                      <div
                        className={`text-xs mt-1 font-semibold ${
                          isSelected ? 'text-amber-300' : 'text-neutral-900'
                        }`}
                      >
                        ₹{sizePrice}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Framing Option Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-800 block mb-2.5">
                2. Framing Option
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Without Frame Card */}
                <button
                  type="button"
                  onClick={() => setIsFramed(false)}
                  className={`p-4 rounded-xl border text-left transition-all relative ${
                    !isFramed
                      ? 'border-neutral-900 bg-white ring-2 ring-neutral-900/10 shadow-sm'
                      : 'border-[#E8E2D8] bg-white/70 hover:border-neutral-300 text-neutral-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-neutral-900">
                      Without Frame
                    </span>
                    <span className="text-sm font-bold text-neutral-900">
                      ₹{SIZE_PRICING[selectedSize].unframedPrice}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 leading-snug">
                    Rolled print on 300 GSM Archival Matte Paper in protective tube.
                  </p>
                  {!isFramed && (
                    <div className="absolute top-2 right-2 text-neutral-900">
                      <Check size={16} />
                    </div>
                  )}
                </button>

                {/* With Frame Card */}
                <button
                  type="button"
                  onClick={() => setIsFramed(true)}
                  className={`p-4 rounded-xl border text-left transition-all relative ${
                    isFramed
                      ? 'border-neutral-900 bg-white ring-2 ring-neutral-900/10 shadow-sm'
                      : 'border-[#E8E2D8] bg-white/70 hover:border-neutral-300 text-neutral-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-neutral-900">
                      With Premium Frame
                    </span>
                    <span className="text-sm font-bold text-neutral-900">
                      ₹{SIZE_PRICING[selectedSize].framedPrice}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 leading-snug">
                    1" engineered pine moulding, clear acrylic glass & wall hooks.
                  </p>
                  {isFramed && (
                    <div className="absolute top-2 right-2 text-neutral-900">
                      <Check size={16} />
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* 3. Frame Color (Only when framed) */}
            {isFramed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-2.5 pt-1"
              >
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                    3. Select Frame Finish
                  </label>
                  <span className="text-xs font-semibold text-neutral-700">
                    {selectedFrameColor}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {FRAME_OPTIONS.map(frame => {
                    const isSelected = selectedFrameColor === frame.label;
                    return (
                      <button
                        key={frame.label}
                        type="button"
                        onClick={() => setSelectedFrameColor(frame.label)}
                        className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-all ${
                          isSelected
                            ? 'border-neutral-900 bg-white shadow-sm ring-1 ring-neutral-900'
                            : 'border-[#E8E2D8] bg-white hover:border-neutral-300'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-neutral-300 flex-shrink-0"
                          style={{ backgroundColor: frame.colorCode }}
                        />
                        <span className="text-xs font-semibold text-neutral-800 truncate">
                          {frame.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                Quantity
              </label>
              <div className="flex items-center border border-neutral-300 bg-white rounded-xl shadow-sm">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-neutral-600 hover:text-neutral-900 transition-colors"
                  aria-label="Decrease"
                >
                  <Minus size={14} />
                </button>
                <span className="px-4 text-sm font-bold text-neutral-900">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-neutral-600 hover:text-neutral-900 transition-colors"
                  aria-label="Increase"
                >
                  <Plus size={14} />
                </button>
              </div>
              <span className="text-xs text-neutral-500 font-medium">
                Subtotal: <strong className="text-neutral-900 font-bold">₹{totalPrice}</strong>
              </span>
            </div>

            {/* Action Buttons: WhatsApp & Cart */}
            <div className="space-y-3 pt-2">
              {/* Primary Action 1: Direct WhatsApp Enquiry / Order */}
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-700/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <MessageCircle size={20} />
                <span>Order via WhatsApp (Instant Confirmation)</span>
              </button>

              {/* Action 2: Add to Cart & Buy Now */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="py-3.5 px-6 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
                >
                  <ShoppingBag size={17} />
                  <span>{addedToast ? 'Added to Cart ✓' : 'Add to Cart'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="py-3.5 px-6 bg-white hover:bg-neutral-50 text-neutral-900 font-semibold rounded-xl text-sm border border-neutral-300 shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Buy Now Online</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Delivery & Shipping Info Card */}
            <div className="p-4 rounded-2xl bg-white border border-[#E8E2D8] space-y-3 text-xs text-neutral-700">
              <div className="flex items-center gap-2.5 font-semibold text-neutral-900">
                <Truck size={17} className="text-amber-700" />
                <span>
                  {totalPrice >= FREE_SHIPPING_THRESHOLD
                    ? '🎉 Free Express Shipping unlocked on this order!'
                    : `Free shipping on orders above ₹${FREE_SHIPPING_THRESHOLD} (Flat ₹50 below)`}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Package size={17} className="text-amber-700" />
                <span>
                  Dispatched within 24–48 hours in rigid shock-proof packing.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={17} className="text-amber-700" />
                <span>
                  Zero-Damage Guarantee: Instant free replacement if damaged in transit.
                </span>
              </div>
            </div>

            {/* Description & Specifications Tabs */}
            <div className="pt-4 border-t border-[#E8E2D8] space-y-4">
              <div>
                <h3 className="font-display text-base font-bold text-neutral-900 mb-2">
                  About this Artwork
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-white border border-[#E8E2D8]">
                  <span className="font-bold text-neutral-800 block mb-1">Paper Quality</span>
                  <span className="text-neutral-600">{product.paperQuality}</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#E8E2D8]">
                  <span className="font-bold text-neutral-800 block mb-1">Framing Spec</span>
                  <span className="text-neutral-600">
                    1" engineered pine moulding with 1.5mm acrylic glass.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posters */}
        {related.length > 0 && (
          <div className="mt-24 pt-12 border-t border-[#E8E2D8]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  More in this Category
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 mt-1">
                  You May Also Like
                </h2>
              </div>
              <Link
                to={`/products?category=${encodeURIComponent(product.category)}`}
                className="text-xs font-semibold text-neutral-800 hover:text-amber-800 flex items-center gap-1"
              >
                View Category <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
