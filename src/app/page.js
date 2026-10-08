import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import AllProductsSection from "@/components/AllProductsSection";
import Footer from "@/components/Footer";
import { getProducts, getTopRisers, getTopFallers } from "@/lib/api";

export default async function Home() {
  const [allProducts, topRisers, topFallers] = await Promise.all([
    getProducts(),
    getTopRisers(6),
    getTopFallers(6),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      {/* Navbar with Live Price Ticker */}
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16 space-y-10 sm:space-y-12">
        {/* Hero / Banner */}
        <HeroBanner />

        {/* Section A: Top 6 Risers */}
        {topRisers.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-red-600 font-bold text-lg">▲</span>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                আজ দাম বেড়েছে
              </h2>
            </div>

            {/* Grid of Top 6 Risers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {topRisers.map((product) => (
                <ProductCard key={product.id || product.slug} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Section B: Top 6 Fallers */}
        {topFallers.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[#047f39] font-bold text-lg">▼</span>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                আজ দাম কমেছে
              </h2>
            </div>

            {/* Grid of Top 6 Fallers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {topFallers.map((product) => (
                <ProductCard key={product.id || product.slug} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Section C: All Products Grid */}
        <AllProductsSection initialProducts={allProducts} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
