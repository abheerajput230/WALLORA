import { X, Plus, Minus, ShoppingBag, MessageCircle, ArrowRight, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';
import { generateCartWhatsAppUrl, FREE_SHIPPING_THRESHOLD } from '@/data/products';

const CartSidebar = () => {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    subtotal,
    shippingFee,
    finalPrice,
    freeShippingRemaining,
  } = useCart();

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;
    const url = generateCartWhatsAppUrl(items);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const freeShippingProgress = Math.min(
    100,
    Math.round(((FREE_SHIPPING_THRESHOLD - freeShippingRemaining) / FREE_SHIPPING_THRESHOLD) * 100)
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Slide-out Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#FAF8F5] border-l border-[#E8E2D8] z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 bg-white border-b border-[#E8E2D8]">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-neutral-900" />
                <h2 className="font-display text-xl font-bold text-neutral-900">Your Cart</h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700">
                  {items.reduce((acc, curr) => acc + curr.quantity, 0)} items
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                aria-label="Close Cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Free Shipping Progress Alert */}
            {items.length > 0 && (
              <div className="bg-amber-50 border-b border-amber-200/60 p-3.5 px-5">
                <div className="flex items-center gap-2 text-xs font-medium text-amber-900 mb-1.5">
                  <Truck size={15} className="text-amber-700" />
                  {freeShippingRemaining > 0 ? (
                    <span>
                      Add <strong className="font-bold text-neutral-900">₹{freeShippingRemaining}</strong> more for <strong>FREE Express Shipping</strong>!
                    </span>
                  ) : (
                    <span className="text-emerald-800 font-bold">
                      🎉 You unlocked FREE Express Delivery!
                    </span>
                  )}
                </div>
                <div className="w-full bg-amber-200/60 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-amber-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-neutral-200/60 flex items-center justify-center text-neutral-400 mb-4">
                    <ShoppingBag size={32} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-neutral-800 mb-1">
                    Your cart is empty
                  </h3>
                  <p className="text-xs text-neutral-500 max-w-xs mb-6">
                    Explore our 11 poster categories and start decorating your space.
                  </p>
                  <Link
                    to="/products"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-2.5 bg-neutral-900 text-white text-xs font-semibold rounded-full hover:bg-neutral-800 transition-colors"
                  >
                    Browse Posters
                  </Link>
                </div>
              ) : (
                items.map(item => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${item.isFramed}-${item.selectedFrameColor}`}
                    className="flex gap-3.5 bg-white p-3.5 rounded-xl border border-[#E8E2D8] shadow-sm relative group"
                  >
                    {/* Poster Thumbnail */}
                    <Link
                      to={`/product/${item.product.id}`}
                      onClick={() => setIsOpen(false)}
                      className="w-20 h-26 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0 relative"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <Link
                            to={`/product/${item.product.id}`}
                            onClick={() => setIsOpen(false)}
                            className="font-medium text-sm text-neutral-900 line-clamp-1 hover:text-amber-800 transition-colors"
                          >
                            {item.product.title}
                          </Link>
                          <button
                            onClick={() => removeItem(item.product.id, item.selectedSize, item.isFramed)}
                            className="text-neutral-400 hover:text-rose-600 p-0.5 transition-colors"
                            aria-label="Remove item"
                          >
                            <X size={15} />
                          </button>
                        </div>

                        {/* Specs Pills */}
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                            Size: {item.selectedSize}
                          </span>
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                            {item.isFramed
                              ? `Framed • ${item.selectedFrameColor || 'Black'}`
                              : 'Unframed Print'}
                          </span>
                        </div>
                      </div>

                      {/* Quantity & Item Total */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-neutral-100">
                        <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-neutral-50">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.isFramed,
                                item.quantity - 1
                              )
                            }
                            className="p-1.5 text-neutral-600 hover:bg-neutral-200 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-neutral-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.isFramed,
                                item.quantity + 1
                              )
                            }
                            className="p-1.5 text-neutral-600 hover:bg-neutral-200 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <span className="text-sm font-bold text-neutral-900">
                          ₹{item.totalPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {items.length > 0 && (
              <div className="p-5 bg-white border-t border-[#E8E2D8] space-y-3">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-neutral-900">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Estimated Shipping</span>
                    <span>
                      {shippingFee === 0 ? (
                        <span className="font-semibold text-emerald-700">FREE</span>
                      ) : (
                        `₹${shippingFee}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-neutral-900 pt-2 border-t border-neutral-100">
                    <span>Total Amount</span>
                    <span className="text-amber-800">₹{finalPrice}</span>
                  </div>
                </div>

                {/* Primary Action 1: Instant WhatsApp Order */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors text-sm"
                >
                  <MessageCircle size={18} />
                  <span>Order Entire Cart via WhatsApp</span>
                </button>

                {/* Secondary Action 2: Online Checkout */}
                <Link
                  to="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 px-4 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
                >
                  <span>Proceed to Online Checkout</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
