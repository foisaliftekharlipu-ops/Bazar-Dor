"use client";

import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import { FiChevronDown } from "react-icons/fi";
import { toBengaliNumber } from "@/lib/utils";

export default function AllProductsSection({ initialProducts = [] }) {
  const [sortOption, setSortOption] = useState("default");

  const sortedProducts = useMemo(() => {
    if (!initialProducts || initialProducts.length === 0) return [];
    const list = [...initialProducts];

    switch (sortOption) {
      case "price-asc":
        return list.sort((a, b) => Number(a.today) - Number(b.today));
      case "price-desc":
        return list.sort((a, b) => Number(b.today) - Number(a.today));
      case "default":
      default:
        return list;
    }
  }, [initialProducts, sortOption]);

  return (
    <section id="সব-পণ্য" className="scroll-mt-36 sm:scroll-mt-40 space-y-4 pt-4">
      {/* Header and Sort Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-1">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
            সব পণ্য
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            মোট {toBengaliNumber(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <label
            htmlFor="all-sort-select"
            className="text-xs sm:text-sm font-medium text-gray-600"
          >
            সাজান
          </label>
          <div className="relative">
            <select
              id="all-sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none bg-white hover:bg-slate-50 text-slate-800 font-medium text-xs sm:text-sm pl-3 pr-8 py-1.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#047f39] focus:border-[#047f39] transition-colors cursor-pointer shadow-2xs"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-asc">দাম: কম থেকে বেশি</option>
              <option value="price-desc">দাম: বেশি থেকে কম</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
              <FiChevronDown className="text-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid of All Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id || product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
