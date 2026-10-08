import Link from "next/link";
import { toBengaliNumber, getBengaliUnit } from "@/lib/utils";
import { getProductEmoji } from "@/lib/productEmojis";

export default function ProductCard({ product }) {
  if (!product) return null;

  const { slug, nameBn, unit, today, change } = product;

  const isUp = change?.dir === "up";
  const isDown = change?.dir === "down";
  const pct = Math.abs(change?.pct || 0);
  const pctBn = toBengaliNumber(pct, { decimals: 1 });
  const priceBn = toBengaliNumber(today);
  const unitBn = getBengaliUnit(unit);
  const emoji = getProductEmoji(product);

  return (
    <Link
      href={`/product/${slug}`}
      className="group flex flex-col justify-between bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/90 hover:border-emerald-500/60 shadow-2xs hover:shadow-md transition-all duration-150 overflow-hidden"
    >
      {/* Top Section: Emoji & Name with Unit */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
          {emoji}
        </div>
        <div className="flex flex-col min-w-0">
          <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-[#047f39] transition-colors truncate">
            {nameBn}
          </h3>
          <span className="text-xs text-gray-500 font-medium mt-0.5">
            {unitBn}
          </span>
        </div>
      </div>

      {/* Bottom Section: Price & Change Indicator */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-end justify-between">
        <div className="flex flex-col">
          <span className="text-[11px] text-gray-500 font-medium">আজকের দাম</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-base sm:text-lg font-extrabold text-gray-900 group-hover:text-[#047f39] transition-colors">
              {priceBn}
            </span>
            <span className="text-xs font-semibold text-gray-600">টাকা</span>
          </div>
        </div>

        {/* Change Badge */}
        <div
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
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
    </Link>
  );
}
