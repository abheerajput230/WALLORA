import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import Layout from "@/components/Layout";

import Index from "@/pages/Index";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Checkout from "@/pages/Checkout";
import CustomFrame from "@/components/CustomFrame";
import AllPosters from "@/components/AllPosters";
import GalleryStudioPage from "@/pages/GalleryStudioPage";
import PosterWall from "@/pages/PosterWall";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Layout>
            <Routes>
              {/* Responsive Homepage */}
              <Route path="/" element={<Index />} />

              {/* Poster Catalog with 11 Categories, Search, Filters & Sorting */}
              <Route path="/products" element={<Products />} />

              {/* Individual Poster Detail with Size, Frame, Dynamic Price & WhatsApp */}
              <Route path="/product/:id" element={<ProductDetail />} />

              {/* Checkout & WhatsApp Order Submission */}
              <Route path="/checkout" element={<Checkout />} />

              {/* Dedicated Poster Wall Page (20-30 Posters at a time with different angles & CSS frames) */}
              <Route path="/poster-wall" element={<PosterWall />} />

              {/* Multi-Frame Wall Studio (CSS Frames Component) */}
              <Route path="/gallery-studio" element={<GalleryStudioPage />} />

              {/* Interactive Framing Visualizer */}
              <Route path="/custom-frame" element={<CustomFrame />} />

              {/* Poster Wall Generator */}
              <Route path="/all-posters" element={<AllPosters />} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
