import Link from "next/link";
import { toBengaliNumber, getShortBengaliUnit } from "@/lib/utils";
import { getProductEmoji } from "@/lib/productEmojis";

export default function PriceTicker({ products = [] }) {
  if (!products || products.length === 0) return null;

  // Duplicate items array for seamless continuous marquee loop
  const tickerItems = [...products, ...products];

  return (
    <div className="w-full bg-white border-y border-gray-200 overflow-hidden select-none py-2">
      <div className="overflow-hidden w-full flex">
        <div className="animate-marquee whitespace-nowrap flex items-center shrink-0">
          {tickerItems.map((item, idx) => {
            const isUp = item.change?.dir === "up";
            const isDown = item.change?.dir === "down";
            const pct = Math.abs(item.change?.pct || 0);
            const pctBn = toBengaliNumber(pct, { decimals: 1 });
            const priceBn = toBengaliNumber(item.today);
            const shortUnit = getShortBengaliUnit(item.unit);
            const emoji = getProductEmoji(item);

            return (
              <Link
                key={`${item.id}-${idx}`}
                href={`/product/${item.slug}`}
                className="inline-flex items-center gap-2 px-4 border-r border-gray-200 text-xs sm:text-sm text-gray-800 hover:text-[#047f39] hover:bg-slate-50 transition-colors shrink-0"
              >
                <span className="text-base leading-none">{emoji}</span>
                <span className="font-semibold text-gray-900">{item.nameBn}</span>
                <span className="text-gray-700">
                  {priceBn} টাকা/{shortUnit}
                </span>
                <span
                  className={`inline-flex items-center gap-0.5 font-bold ${
                    isUp
                      ? "text-red-600"
                      : isDown
                      ? "text-[#047f39]"
                      : "text-gray-500"
                  }`}
                >
                  <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
                  <span>{pctBn}%</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
