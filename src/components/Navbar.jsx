import Link from "next/link";
import { getBanglaDate } from "@/lib/utils";
import { getCategories, getProducts } from "@/lib/api";
import AuthNavButtons from "./AuthNavButtons";
import CategoryNavLinks from "./CategoryNavLinks";
import PriceTicker from "./PriceTicker";

export default async function Navbar() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);
  const banglaDate = getBanglaDate();

  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-2xs">
      {/* Top Row: Logo & Bangla Date (Left) | Auth Buttons (Right) with Full-Width Bottom Border */}
      <div className="w-full border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-2 sm:py-2.5">
          {/* Logo & Bangla Date */}
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* Compact Green rounded logo box */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#047f39] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0 p-1.5">
              <img
                src="/shopping-cart.png"
                alt="বাজার দর"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Title & Bangla Date */}
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-extrabold text-gray-900 tracking-tight leading-tight">
                বাজার দর
              </span>
              <span className="text-[11px] sm:text-xs text-gray-500 font-medium">
                {banglaDate}
              </span>
            </div>
          </Link>

          {/* Right Side Auth Buttons */}
          <AuthNavButtons />
        </div>
      </div>

      {/* Second Row: Category Links with Full-Width Container & Bottom Border */}
      <div className="w-full border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryNavLinks categories={categories} />
        </div>
      </div>

      {/* Third Row: Price Ticker Marquee */}
      <PriceTicker products={products} />
    </header>
  );
}
