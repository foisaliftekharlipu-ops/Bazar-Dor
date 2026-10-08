import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiHome, FiAlertCircle } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf9] text-slate-900">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-gray-200/90 shadow-xl shadow-emerald-900/5">
          <div className="w-20 h-20 bg-emerald-50 text-[#047f39] border border-emerald-100 rounded-3xl flex items-center justify-center text-4xl mx-auto shadow-inner">
            🛒
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200">
              <FiAlertCircle />
              <span>৪০৪ ত্রুটি</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              পৃষ্ঠাটি পাওয়া যায়নি
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              আপনি যে পৃষ্ঠাটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা ভুল লিঙ্ক দিয়ে প্রবেশ করেছেন। অনুগ্রহ করে হোম পেজে ফিরে যান।
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-2xl bg-[#047f39] hover:bg-[#036a2f] text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-800/20 transition-all duration-150 cursor-pointer"
            >
              <FiHome className="text-lg" />
              <span>হোম পেজে ফিরে যান</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
