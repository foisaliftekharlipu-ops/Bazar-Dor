import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#f8faf9] text-gray-600 border-t border-gray-200 text-xs sm:text-sm mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          {/* Left Side */}
          <div className="text-gray-700 font-medium">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </div>

          {/* Right Side */}
          <div className="text-gray-500">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </div>
        </div>
      </div>
    </footer>
  );
}
