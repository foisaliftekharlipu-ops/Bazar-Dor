"use client";

import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import { FiChevronDown, FiSliders } from "react-icons/fi";
import { toBengaliNumber } from "@/lib/utils";

export default function CategoryProductList({ initialProducts = [] }) {
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
    <div className="space-y-6">
      {/* Controls Bar: Product Count & C1 Sort Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="text-xs sm:text-sm font-medium text-slate-600">
          মোট <span className="font-bold text-[#047f39]">{toBengaliNumber(sortedProducts.length)}</span> টি পণ্য পাওয়া গেছে
        </div>

        {/* C1 Challenge: Sort Dropdown with chevron */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <label htmlFor="sort-select" className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-1.5">
            <FiSliders className="text-[#047f39] text-sm" />
            <span>সাজান:</span>
          </label>
          <div className="relative">
            <select
              id="sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none bg-slate-50 hover:bg-slate-100 text-slate-800 font-medium text-xs sm:text-sm pl-3.5 pr-8 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#047f39] focus:border-[#047f39] transition-colors cursor-pointer shadow-2xs"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-asc">দাম: কম থেকে বেশি</option>
              <option value="price-desc">দাম: বেশি থেকে কম</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500">
              <FiChevronDown className="text-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id || product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
