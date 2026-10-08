"use client";

import { getBanglaDate } from "@/lib/utils";

export default function HeroBanner() {
  const banglaDate = getBanglaDate();

  const handleScrollToProducts = (e) => {
    e.preventDefault();
    const target = document.getElementById("সব-পণ্য");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", "#সব-পণ্য");
    }
  };

  return (
    <section className="w-full my-6 sm:my-8">
      <div className="bg-[#f0f4f2] rounded-3xl p-6 sm:p-10 lg:p-12 border border-gray-200/90 shadow-2xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
          {/* Left Column: Eyebrow, Heading, Subtitle and CTA button */}
          <div className="md:col-span-7 lg:col-span-8 flex flex-col items-start space-y-3 sm:space-y-4">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#d7eadf] text-[#047f39] text-xs sm:text-sm font-semibold tracking-wide">
              <span>{banglaDate}</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed max-w-xl">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* Primary CTA button with smooth scroll */}
            <div className="pt-2 sm:pt-3">
              <button
                type="button"
                onClick={handleScrollToProducts}
                className="inline-flex items-center justify-center px-6 py-2.5 sm:py-3 rounded-xl bg-[#047f39] hover:bg-[#036a2f] text-white font-semibold text-sm sm:text-base shadow-xs hover:shadow-md transition-all duration-150 cursor-pointer"
              >
                সব পণ্য দেখুন
              </button>
            </div>
          </div>

          {/* Right Column: Hero Image Illustration */}
          <div className="md:col-span-5 lg:col-span-4 flex justify-center md:justify-end">
            <div className="w-56 sm:w-64 md:w-72 lg:w-80 max-w-full">
              <img
                src="/bazar-hero.svg"
                alt="আজকের বাজার দর"
                className="w-full h-auto object-contain drop-shadow-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
