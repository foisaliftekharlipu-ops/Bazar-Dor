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
      {/* Top Row: Logo & Date (Left) | Auth Buttons (Right) */}
      <div className="w-full border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3 sm:py-3.5">
          {/* Logo & Dynamic Bangla Date */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Logo Container with #05893e Background */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#05893e] flex items-center justify-center text-lg sm:text-xl shadow-2xs group-hover:scale-105 transition-all duration-150 shrink-0">
              🛒
            </div>

            {/* Title & Bangla Date */}
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight leading-tight">
                বাজার দর
              </span>
              <span className="text-xs sm:text-sm text-gray-500 font-medium">
                {banglaDate}
              </span>
            </div>
          </Link>

          {/* Right Side Auth Buttons */}
          <AuthNavButtons />
        </div>
      </div>

      {/* Second Row: Category Links */}
      <div className="w-full border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryNavLinks categories={categories} />
        </div>
      </div>

      {/* Third Row: Continuous Price Ticker */}
      <PriceTicker products={products} />
    </header>
  );
}
