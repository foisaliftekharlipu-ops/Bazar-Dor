"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Universal icons matching the reference app
const categoryIcons = {
  chal: "🍚",
  dal: "🥜",
  tel: "🥫",
  sobji: "🥒",
  mach: "🐟",
  mangsho: "🍗",
  "dim-dui": "🥛",
  mosla: "🌶️",
};

export default function CategoryNavLinks({ categories = [] }) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-start gap-1 sm:gap-2 overflow-x-auto py-1.5 sm:py-2 w-full no-scrollbar select-none">
      {categories.map((cat) => {
        const href = `/category/${cat.slug}`;
        const isActive = pathname === href;
        const icon = categoryIcons[cat.slug] || cat.icon || "🧺";

        return (
          <Link
            key={cat.id || cat.slug}
            href={href}
            className={`inline-flex items-center gap-1.5 text-xs sm:text-sm whitespace-nowrap py-1.5 px-3 rounded-lg transition-all duration-150 cursor-pointer ${
              isActive
                ? "bg-[#047f39] text-white font-semibold border border-[#047f39] shadow-2xs"
                : "text-slate-800 border border-transparent hover:bg-[#dadeda] hover:border-slate-300/80 font-medium"
            }`}
          >
            <span className="text-sm sm:text-base leading-none">{icon}</span>
            <span>{cat.nameBn}</span>
          </Link>
        );
      })}
    </nav>
  );
}
