import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, MessageCircle, Sliders, ShieldCheck } from 'lucide-react';
import { STORE_WHATSAPP_NUMBER } from '@/data/products';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#E8E2D8]">
      {/* Subtle Warm Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-200/25 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Editorial Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200/80 text-amber-900 text-xs font-bold tracking-wider uppercase"
            >
              <Sparkles size={13} className="text-amber-700" />
              <span>Premium Modern Wall Art Studio</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.12]"
            >
              Art that speaks.{' '}
              <span className="font-serif italic font-normal text-amber-800">
                Walls that inspire.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-base sm:text-lg text-neutral-600 max-w-xl leading-relaxed"
            >
              Discover high-definition 300 GSM archival prints across <strong>11 curated categories</strong>. Choose your size, select unframed or custom-framed finishes, and get dynamic instant pricing with 1-click WhatsApp order confirmation.
            </motion.p>

            {/* Pricing Highlights Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="p-4 rounded-2xl bg-white border border-[#E8E2D8] shadow-sm max-w-xl grid grid-cols-2 sm:grid-cols-4 gap-3 text-center"
            >
              <div className="p-2 border-r border-[#E8E2D8]/60">
                <span className="block text-[11px] font-semibold text-neutral-500 uppercase">A4 Print</span>
                <span className="text-base font-bold text-neutral-900">₹30</span>
                <span className="block text-[10px] text-amber-700 font-medium">Framed ₹249</span>
              </div>
              <div className="p-2 sm:border-r border-[#E8E2D8]/60">
                <span className="block text-[11px] font-semibold text-neutral-500 uppercase">A3 Print</span>
                <span className="text-base font-bold text-neutral-900">₹99</span>
                <span className="block text-[10px] text-amber-700 font-medium">Framed ₹549</span>
              </div>
              <div className="p-2 border-r border-[#E8E2D8]/60">
                <span className="block text-[11px] font-semibold text-neutral-500 uppercase">12 × 18 in</span>
                <span className="text-base font-bold text-neutral-900">₹149</span>
                <span className="block text-[10px] text-amber-700 font-medium">Framed ₹699</span>
              </div>
              <div className="p-2">
                <span className="block text-[11px] font-semibold text-neutral-500 uppercase">18 × 24 in</span>
                <span className="text-base font-bold text-neutral-900">₹299</span>
                <span className="block text-[10px] text-amber-700 font-medium">Framed ₹1,199</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link
                to="/products"
                className="px-8 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-xl text-sm transition-all duration-200 shadow-md flex items-center gap-2 group"
              >
                <span>Explore All Posters</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/poster-wall"
                className="px-6 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl text-sm transition-all duration-200 shadow-md flex items-center gap-2"
              >
                <Sparkles size={16} />
                <span>The Poster Wall (20–30 Artworks)</span>
              </Link>

              <Link
                to="/custom-frame"
                className="px-6 py-3.5 bg-white hover:bg-neutral-50 text-neutral-800 font-semibold rounded-xl text-sm transition-all duration-200 border border-[#E8E2D8] shadow-sm flex items-center gap-2"
              >
                <Sliders size={16} className="text-amber-700" />
                <span>Frame Visualizer</span>
              </Link>

              <a
                href={`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=Hi%20POSTER_ARENA!%20I%20want%20to%20order%20a%20poster`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm flex items-center gap-2"
              >
                <MessageCircle size={16} />
                <span>Quick WhatsApp Order</span>
              </a>
            </motion.div>

            {/* Trust Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="pt-4 flex flex-wrap items-center gap-6 text-xs text-neutral-600 font-medium"
            >
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-amber-700" /> 300 GSM Archival Velvet Paper
              </span>
              <span>•</span>
              <span>Shatterproof Acrylic Glass</span>
              <span>•</span>
              <span>Free Delivery &gt; ₹699</span>
            </motion.div>
          </div>

          {/* Right Visual Art Mockup */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative mx-auto max-w-sm sm:max-w-md"
            >
              {/* Framed Poster Display */}
              <div className="p-4 sm:p-5 bg-neutral-900 rounded-3xl shadow-2xl relative transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                {/* Simulated Glass Reflection */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-800 border-4 border-neutral-950">
                  <img
                    src="https://images.unsplash.com/photo-1509281373149-e957c6296406?w=800&auto=format&fit=crop&q=80"
                    alt="Hero Framed Wall Art"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 pointer-events-none" />

                  {/* Floating Price Pill */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-neutral-200/60 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                        Featured Piece
                      </p>
                      <h4 className="text-sm font-bold text-neutral-900 truncate">
                        The Dark Knight: Gotham Shadows
                      </h4>
                    </div>
                    <div className="text-right pl-2">
                      <span className="text-xs text-neutral-400 line-through">₹799</span>
                      <span className="block text-sm font-black text-neutral-900">₹499</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Offset Accent Card */}
              <div className="absolute -bottom-6 -left-6 sm:-left-8 bg-white p-4 rounded-2xl border border-[#E8E2D8] shadow-xl max-w-[200px] hidden sm:block">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-1">
                  Ready to Hang
                </span>
                <p className="text-xs font-semibold text-neutral-900 leading-snug">
                  Dual hanging clips + Moisture proof backing included
                </p>
              </div>

              {/* Offset Category Badge */}
              <div className="absolute -top-4 -right-4 bg-amber-600 text-white p-3 rounded-2xl shadow-lg text-center">
                <span className="text-xl font-black block leading-none">11</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">Categories</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
