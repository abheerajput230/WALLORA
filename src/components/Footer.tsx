import { Link } from 'react-router-dom';
import { MessageCircle, ShieldCheck, Truck, Package, RotateCcw, Instagram } from 'lucide-react';
import { CATEGORIES_LIST, STORE_WHATSAPP_NUMBER } from '@/data/products';
import WalloraLogo, { INSTAGRAM_URL, BRAND_TAGLINE } from '@/components/WalloraLogo';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-300 border-t border-neutral-800">
      {/* Trust Badges Bar */}
      <div className="border-b border-neutral-800 bg-neutral-950/60 py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="p-3 bg-neutral-800 rounded-xl text-amber-400">
                <Truck size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Free Express Shipping</h4>
                <p className="text-xs text-neutral-400">On all orders above ₹699</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="p-3 bg-neutral-800 rounded-xl text-amber-400">
                <Package size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Shatterproof Packaging</h4>
                <p className="text-xs text-neutral-400">Rigid tubes & 5-ply box packing</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="p-3 bg-neutral-800 rounded-xl text-amber-400">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">300 GSM Archival Prints</h4>
                <p className="text-xs text-neutral-400">Non-fade vivid pigment inks</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="p-3 bg-neutral-800 rounded-xl text-emerald-400">
                <MessageCircle size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">WhatsApp Order Support</h4>
                <p className="text-xs text-neutral-400">Instant enquiry & confirmation</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <WalloraLogo variant="footer" theme="dark" />
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed mb-6 max-w-sm">
              Your destination for museum-quality curated wall art prints and custom-crafted frames. Transform your home, studio, gaming setup, or office walls into an aesthetic masterpiece.
            </p>

            <div className="p-4 rounded-2xl bg-neutral-800/80 border border-neutral-700/60 max-w-sm space-y-3">
              <div>
                <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-1">
                  Connect & Order
                </p>
                <p className="text-xs text-neutral-300">
                  Follow us on Instagram or chat on WhatsApp for custom size enquiries & tracking.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 hover:opacity-90 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                >
                  <Instagram size={14} />
                  <span>@bywallora</span>
                </a>
                <a
                  href={`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=Hi%20WALLORA!%20I%20have%20an%20order%20enquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
                >
                  <MessageCircle size={14} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* 11 Categories */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Explore 11 Categories
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-neutral-400">
              {CATEGORIES_LIST.map(cat => (
                <Link
                  key={cat}
                  to={`/products?category=${encodeURIComponent(cat)}`}
                  className="hover:text-amber-400 transition-colors py-1"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          {/* Pricing & Transparency */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Standard Sizes & Pricing
            </h4>
            <div className="space-y-2 text-xs text-neutral-300">
              <div className="flex justify-between py-1 border-b border-neutral-800">
                <span>A4 (9 × 12 in)</span>
                <span className="font-semibold text-amber-400">₹30 / ₹349*</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-800">
                <span>A3 (11.7 × 16.5 in)</span>
                <span className="font-semibold text-amber-400">₹99 / ₹549*</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-800">
                <span>12 × 18 in</span>
                <span className="font-semibold text-amber-400">₹149 / ₹699*</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-800">
                <span>18 × 24 in</span>
                <span className="font-semibold text-amber-400">₹299 / ₹1,199*</span>
              </div>
              <p className="text-[10px] text-neutral-500 mt-2">
                *Prices shown as: Unframed Print / Ready-to-hang Framed.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© 2026 WALLORA. Turn Your Walls Into Art. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/products" className="hover:text-neutral-300">Browse Catalog</Link>
            <Link to="/custom-frame" className="hover:text-neutral-300">Frame Visualizer</Link>
            <Link to="/all-posters" className="hover:text-neutral-300">Poster Wall Preview</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
