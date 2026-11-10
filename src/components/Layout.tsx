import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CartSidebar from './CartSidebar';
import { MessageCircle } from 'lucide-react';
import { STORE_WHATSAPP_NUMBER } from '@/data/products';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-neutral-900 selection:bg-amber-200">
      <Navbar />
      <CartSidebar />
      <main className="flex-1">{children}</main>
      <Footer />

      {/* Floating WhatsApp Help Button */}
      <a
        href={`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=Hi%20WALLORA!%20I%20need%20help%20choosing%20a%20poster`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all group"
      >
        <MessageCircle size={26} />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 text-xs font-bold transition-all duration-300">
          Order on WhatsApp
        </span>
      </a>
    </div>
  );
};

export default Layout;
