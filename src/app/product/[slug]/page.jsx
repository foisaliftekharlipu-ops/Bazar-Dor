import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetailsAuthGuard from "@/components/ProductDetailsAuthGuard";
import { getProductBySlug } from "@/lib/api";
import { getProductEmoji } from "@/lib/productEmojis";
import {
  toBengaliNumber,
  getBengaliUnit,
  getShortBengaliUnit,
} from "@/lib/utils";
import { FiChevronRight, FiArrowLeft } from "react-icons/fi";

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const {
    nameBn,
    category,
    categoryNameBn,
    unit,
    today,
    yesterday,
    change,
    markets = [],
  } = product;

  const emoji = getProductEmoji(product);
  const unitBn = getBengaliUnit(unit);
  const shortUnit = getShortBengaliUnit(unit);

  const isUp = change?.dir === "up";
  const isDown = change?.dir === "down";
  const pct = Math.abs(change?.pct || 0);
  const pctBn = toBengaliNumber(pct, { decimals: 1 });
  const priceDiff = Math.abs(today - (yesterday || today));

  // Dynamic market summary line
  let marketSummary = "গতকালের তুলনায় আজ দাম অপরিবর্তিত রয়েছে";
  if (today > yesterday) {
    marketSummary = `গতকালের তুলনায় আজ দাম বেড়েছে ${toBengaliNumber(priceDiff)} টাকা`;
  } else if (today < yesterday) {
    marketSummary = `গতকালের তুলনায় আজ দাম কমেছে ${toBengaliNumber(priceDiff)} টাকা`;
  }

  // Calculate market price statistics
  let minPrice = Infinity;
  let maxPrice = -Infinity;
  let totalAvg = 0;
  let minMarketNames = [];
  let maxMarketNames = [];

  if (markets.length > 0) {
    markets.forEach((m) => {
      const mMin = Number(m.min) || today;
      const mMax = Number(m.max) || today;
      if (mMin < minPrice) minPrice = mMin;
      if (mMax > maxPrice) maxPrice = mMax;
      totalAvg += (mMin + mMax) / 2;
    });

    markets.forEach((m) => {
      if (m.min === minPrice && !minMarketNames.includes(m.market)) {
        minMarketNames.push(m.market);
      }
      if (m.max === maxPrice && !maxMarketNames.includes(m.market)) {
        maxMarketNames.push(m.market);
      }
    });
  } else {
    minPrice = today;
    maxPrice = today;
    totalAvg = today;
  }

  const avgPrice = Math.round(totalAvg / (markets.length || 1));

  const lowestMarketsText =
    minMarketNames.slice(0, 2).join(" ও ") +
    (minMarketNames.length > 0 ? " বাজার" : "বিভিন্ন বাজার");
  const highestMarketsText =
    maxMarketNames.slice(0, 2).join(" ও ") +
    (maxMarketNames.length > 0 ? " বাজার" : "বিভিন্ন বাজার");

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf9] text-slate-900">
      {/* 🔝 Navbar */}
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 space-y-6">
        {/* Protected Route Guard Wrapper */}
        <ProductDetailsAuthGuard>
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium">
            <Link href="/" className="hover:text-[#047f39] transition-colors">
              হোম
            </Link>
            <FiChevronRight className="text-gray-400 text-xs" />
            <Link
              href={`/category/${category}`}
              className="hover:text-[#047f39] transition-colors"
            >
              {categoryNameBn || category}
            </Link>
            <FiChevronRight className="text-gray-400 text-xs" />
            <span className="text-gray-900 font-semibold">{nameBn}</span>
          </nav>

          {/* Top - Summary Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Left Section: Emoji, Name, Unit, and Summary */}
            <div className="flex items-start sm:items-center gap-4 sm:gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#f4f6f5] rounded-2xl flex items-center justify-center text-4xl sm:text-5xl border border-gray-200/60 shadow-inner shrink-0">
                {emoji}
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  {nameBn}
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">
                  {unitBn} • {categoryNameBn || category}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 font-medium pt-1">
                  {marketSummary}
                </p>
              </div>
            </div>

            {/* Right Section: Today's Price Badge Card */}
            <div className="bg-[#f4f6f5] border border-gray-200/80 rounded-2xl p-4 sm:p-5 text-center min-w-[130px] sm:min-w-[150px] self-stretch md:self-auto flex flex-col justify-center items-center shadow-2xs">
              <span className="text-xs text-gray-500 font-medium">আজকের দর</span>
              <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-none mt-1">
                {toBengaliNumber(today)}
              </span>
              <span className="text-xs text-gray-500 font-semibold mt-1">
                টাকা / {shortUnit}
              </span>
              <div
                className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold mt-2 ${
                  isUp
                    ? "bg-red-50 text-red-600 border border-red-200"
                    : isDown
                    ? "bg-emerald-50 text-[#047f39] border border-emerald-200"
                    : "bg-gray-100 text-gray-500 border border-gray-200"
                }`}
              >
                <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
                <span>{pctBn}%</span>
              </div>
            </div>
          </div>

          {/* Price - Summary ("দামের সারসংক্ষেপ") */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-2xs space-y-4">
            <h2 className="text-lg font-bold text-gray-900">
              দামের সারসংক্ষেপ
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: Minimum Price */}
              <div className="bg-[#f8faf9] rounded-2xl p-5 border border-gray-200/80 space-y-2">
                <span className="text-xs font-semibold text-gray-500">
                  সর্বনিম্ন দাম
                </span>
                <div className="text-2xl font-extrabold text-[#047f39]">
                  {toBengaliNumber(minPrice)} টাকা
                </div>
                <p className="text-xs text-gray-500 truncate">
                  {lowestMarketsText}
                </p>
              </div>

              {/* Card 2: Maximum Price */}
              <div className="bg-[#f8faf9] rounded-2xl p-5 border border-gray-200/80 space-y-2">
                <span className="text-xs font-semibold text-gray-500">
                  সর্বাধিক দাম
                </span>
                <div className="text-2xl font-extrabold text-red-600">
                  {toBengaliNumber(maxPrice)} টাকা
                </div>
                <p className="text-xs text-gray-500 truncate">
                  {highestMarketsText}
                </p>
              </div>

              {/* Card 3: Average Price */}
              <div className="bg-[#f8faf9] rounded-2xl p-5 border border-gray-200/80 space-y-2">
                <span className="text-xs font-semibold text-gray-500">
                  গড় দাম
                </span>
                <div className="text-2xl font-extrabold text-[#047f39]">
                  {toBengaliNumber(avgPrice)} টাকা
                </div>
                <p className="text-xs text-gray-500">
                  {unitBn}-এর গড় হিসাব
                </p>
              </div>
            </div>
          </div>

          {/* বাজারভিত্তিক আজকের দাম (Market Breakdown Table) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-2xs space-y-4">
            <h2 className="text-lg font-bold text-gray-900">
              বাজারভিত্তিক আজকের দাম
            </h2>

            {markets.length > 0 ? (
              <div className="overflow-x-auto rounded-2xl border border-gray-200">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#f0f4f2] text-gray-700 font-bold border-b border-gray-200">
                      <th className="py-3.5 px-4 sm:px-6">বাজার</th>
                      <th className="py-3.5 px-4 sm:px-6">বিভাগ</th>
                      <th className="py-3.5 px-4 sm:px-6">সর্বনিম্ন</th>
                      <th className="py-3.5 px-4 sm:px-6">সর্বাধিক</th>
                      <th className="py-3.5 px-4 sm:px-6">গড়</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {markets.map((m, idx) => {
                      const mMin = Number(m.min) || today;
                      const mMax = Number(m.max) || today;
                      const mAvg = ((mMin + mMax) / 2).toFixed(
                        (mMin + mMax) % 2 === 0 ? 0 : 2
                      );

                      return (
                        <tr
                          key={`${m.market}-${idx}`}
                          className="even:bg-[#f8faf9] odd:bg-white hover:bg-[#eef5f1] transition-colors"
                        >
                          <td className="py-3.5 px-4 sm:px-6 font-semibold text-gray-900">
                            {m.market}
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-600 font-medium">
                            {m.division}
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-700 font-semibold">
                            {toBengaliNumber(mMin)} টাকা
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-700 font-semibold">
                            {toBengaliNumber(mMax)} টাকা
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-bold">
                            {toBengaliNumber(mAvg)} টাকা
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-gray-500 py-4 text-center">
                এই পণ্যের বাজারভিত্তিক কোনো তথ্য পাওয়া যায়নি।
              </p>
            )}
          </div>
        </ProductDetailsAuthGuard>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
