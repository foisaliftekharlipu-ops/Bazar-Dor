import Link from "next/link";
import { toBengaliNumber, getBengaliUnit, getShortBengaliUnit } from "@/lib/utils";

// Universal icon fallbacks to prevent broken box characters on Windows
const safeEmojiMap = {
  chal: "🍚",
  dal: "🥜",
  tel: "🥫",
  sobji: "🥒",
  mach: "🐟",
  mangsho: "🍗",
  "dim-dui": "🥛",
  mosla: "🌶️",
};

export default function ProductCard({ product }) {
  if (!product) return null;

  const { slug, nameBn, image, category, categoryIcon, unit, today, change } = product;

  const isUp = change?.dir === "up";
  const isDown = change?.dir === "down";
  const pct = Math.abs(change?.pct || 0);
  const pctBn = toBengaliNumber(pct, { decimals: 1 });
  const priceBn = toBengaliNumber(today);
  const unitBn = getBengaliUnit(unit);

  let emoji = image || categoryIcon;
  if (slug === "ada" || nameBn?.includes("আদা")) {
    emoji = "🌿";
  } else if (category === "dal") {
    emoji = "🥜";
  } else if (category === "tel") {
    emoji = "🥫";
  } else if (category === "sobji") {
    emoji = "🥒";
  } else if (!emoji || emoji === "🫚" || emoji === "🫘") {
    emoji = safeEmojiMap[category] || "🛒";
  }

  return (
    <Link
      href={`/product/${slug}`}
      className="group relative flex flex-col justify-between bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 hover:border-emerald-500/50 shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
    >
      {/* Top Header: Emoji + Change Badge */}
      <div className="flex items-start justify-between gap-2">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-105 transition-all duration-200 shadow-inner">
          {emoji}
        </div>

        <div
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-colors ${
            isUp
              ? "bg-rose-50 text-rose-700 border border-rose-200"
              : isDown
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-slate-100 text-slate-600 border border-slate-200"
          }`}
        >
          <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
          <span>{pctBn}%</span>
        </div>
      </div>

      {/* Middle: Name & Unit */}
      <div className="mt-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#047f39] transition-colors line-clamp-1">
          {nameBn}
        </h3>
        <p className="text-xs font-medium text-slate-500 mt-0.5">{unitBn}</p>
      </div>

      {/* Bottom: Price Row */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
        <span className="text-xs text-slate-500 font-medium">আজকের দাম</span>
        <div className="flex items-baseline gap-1">
          <span className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-[#047f39] transition-colors">
            {priceBn}
          </span>
          <span className="text-xs font-semibold text-slate-600">টাকা</span>
        </div>
      </div>
    </Link>
  );
}
