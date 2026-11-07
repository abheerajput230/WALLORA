import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { Check, MessageCircle, ArrowLeft, ShieldCheck, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateCartWhatsAppUrl, FREE_SHIPPING_THRESHOLD } from '@/data/products';

const Checkout = () => {
  const { items, subtotal, shippingFee, finalPrice, clearCart } = useCart();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [paymentMethod, setPaymentMethod] = useState('whatsapp');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    state: '',
  });

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    const url = generateCartWhatsAppUrl(items, form);
    window.open(url, '_blank', 'noopener,noreferrer');
    setStep('success');
    clearCart();
  };

  const handleStandardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    clearCart();
  };

  if (step === 'success') {
    return (
      <div className="pt-24 pb-24 min-h-[75vh] flex items-center justify-center bg-[#FAF8F5] px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto p-8 rounded-3xl bg-white border border-[#E8E2D8] shadow-lg"
        >
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5 text-emerald-700">
            <Check size={32} />
          </div>
          <h1 className="font-display text-3xl font-bold text-neutral-900 mb-2">
            Order Received!
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mb-6 leading-relaxed">
            Thank you for choosing <strong>POSTER_ARENA</strong>. We have received your order enquiry and our packaging team is preparing your prints. You will receive tracking details via SMS/WhatsApp within 24 hours.
          </p>
          <Link
            to="/"
            className="inline-flex px-8 py-3.5 bg-neutral-900 text-white font-semibold rounded-xl text-xs hover:bg-neutral-800 transition-colors"
          >
            Continue Browsing
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pt-24 pb-24 min-h-[70vh] flex flex-col items-center justify-center bg-[#FAF8F5] px-4 text-center">
        <h2 className="font-display text-2xl font-bold text-neutral-900 mb-2">
          Your cart is empty
        </h2>
        <p className="text-xs text-neutral-500 mb-6">
          Please add posters to your cart before proceeding to checkout.
        </p>
        <Link
          to="/products"
          className="px-6 py-3 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-neutral-800 transition-colors"
        >
          Explore Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-6 pb-20 bg-[#FAF8F5] min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <div className="flex items-center gap-2 mb-6">
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
          >
            <ArrowLeft size={14} /> Back to Catalog
          </Link>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mb-8">
          Checkout & Order Confirmation
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: Delivery Address */}
          <form
            onSubmit={paymentMethod === 'whatsapp' ? handleWhatsAppCheckout : handleStandardSubmit}
            className="lg:col-span-7 space-y-6"
          >
            <div className="bg-white border border-[#E8E2D8] rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="font-display text-lg font-bold text-neutral-900 pb-2 border-b border-[#E8E2D8]">
                1. Delivery Address
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-[#FAF8F5] text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">WhatsApp Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="e.g. 9876543210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-[#FAF8F5] text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-neutral-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="For invoice and dispatch tracking"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-[#FAF8F5] text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-neutral-700 mb-1">House / Flat / Street Address *</label>
                  <input
                    type="text"
                    required
                    value={form.address}
                    onChange={e => setForm({ ...form, address: e.target.value })}
                    placeholder="e.g. Flat 402, Sunshine Heights, MG Road"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-[#FAF8F5] text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={e => setForm({ ...form, city: e.target.value })}
                    placeholder="e.g. Mumbai"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-[#FAF8F5] text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">PIN Code *</label>
                  <input
                    type="text"
                    required
                    value={form.pincode}
                    onChange={e => setForm({ ...form, pincode: e.target.value })}
                    placeholder="e.g. 400001"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-[#FAF8F5] text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>
            </div>

            {/* Payment / Order Confirmation Mode */}
            <div className="bg-white border border-[#E8E2D8] rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="font-display text-lg font-bold text-neutral-900 pb-2 border-b border-[#E8E2D8]">
                2. Order & Confirmation Method
              </h2>

              <div className="space-y-3">
                <label
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'whatsapp'
                      ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600'
                      : 'border-[#E8E2D8] hover:bg-neutral-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="whatsapp"
                    checked={paymentMethod === 'whatsapp'}
                    onChange={() => setPaymentMethod('whatsapp')}
                    className="mt-1 accent-emerald-600"
                  />
                  <div>
                    <span className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                      <MessageCircle size={16} className="text-emerald-600" />
                      Instant Confirmation on WhatsApp (Recommended)
                    </span>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Sends your delivery address & order list to our WhatsApp business line. We provide instant payment links (UPI, GPay, Paytm) and dispatch dates.
                    </p>
                  </div>
                </label>

                <label
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                      : 'border-[#E8E2D8] hover:bg-neutral-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1 accent-neutral-900"
                  />
                  <div>
                    <span className="text-sm font-bold text-neutral-900">
                      Standard Online Order (COD / UPI verification)
                    </span>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Place order online now. Our team will verify phone number prior to shipping.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all ${
                paymentMethod === 'whatsapp'
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-white'
              }`}
            >
              {paymentMethod === 'whatsapp' ? (
                <>
                  <MessageCircle size={18} />
                  <span>Send Complete Order via WhatsApp (₹{finalPrice})</span>
                </>
              ) : (
                <span>Confirm Order Online (₹{finalPrice})</span>
              )}
            </button>
          </form>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 bg-white border border-[#E8E2D8] rounded-2xl p-6 shadow-sm space-y-6">
            <h2 className="font-display text-lg font-bold text-neutral-900 pb-2 border-b border-[#E8E2D8]">
              Order Summary ({items.length} items)
            </h2>

            <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
              {items.map(item => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.isFramed}`}
                  className="flex gap-3 text-xs"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-14 h-18 object-cover rounded-lg bg-neutral-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-neutral-900 line-clamp-1">{item.product.title}</h4>
                    <p className="text-neutral-500 mt-0.5">
                      Size: {item.selectedSize} • {item.isFramed ? `Framed (${item.selectedFrameColor})` : 'Unframed'}
                    </p>
                    <p className="font-semibold text-neutral-800 mt-1">
                      Qty: {item.quantity} × ₹{item.unitPrice} = ₹{item.totalPrice}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E8E2D8] space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span className="font-semibold text-neutral-900">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Shipping</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="font-semibold text-emerald-700">FREE Express</span>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-neutral-900 pt-3 border-t border-[#E8E2D8]">
                <span>Total Amount</span>
                <span className="text-amber-800">₹{finalPrice}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] text-xs text-neutral-600 space-y-2">
              <div className="flex items-center gap-2 text-neutral-800 font-semibold">
                <Truck size={15} className="text-amber-700" />
                <span>Express Pan-India Delivery</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Safe delivery in rigid PVC tubes (posters) or 5-layer bubble boxes (frames). Dispatched in 24-48 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
