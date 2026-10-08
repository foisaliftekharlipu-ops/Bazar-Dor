import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryProductList from "@/components/CategoryProductList";
import { getProducts, getCategories } from "@/lib/api";
import { FiArrowLeft } from "react-icons/fi";

// Universal icon lookup
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

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(slug),
  ]);

  const category = categories.find(
    (c) => c.slug === slug || c.id === slug
  );

  const icon = categoryIcons[slug] || category?.icon || "🧺";
  const nameBn = category?.nameBn || slug;

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf9] text-slate-900">
      {/* 🔝 Navbar */}
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 space-y-6">
        {/* Category Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#f4f6f5] text-2xl sm:text-3xl flex items-center justify-center border border-slate-200 shadow-2xs">
              {icon}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {nameBn}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {nameBn} ক্যাটাগরির আজকের খুচরা ও পাইকারি বাজার দর
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#047f39] transition-colors self-start sm:self-auto"
          >
            <FiArrowLeft />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>

        {/* Product List or Empty State */}
        {products && products.length > 0 ? (
          <CategoryProductList initialProducts={products} />
        ) : (
          <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-4 shadow-2xs">
            <div className="text-5xl">🧺</div>
            <h2 className="text-xl font-bold text-slate-800">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
            </h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              ক্যাটাগরিটি বর্তমানে খালি রয়েছে অথবা ভুল লিংক প্রবেশ করানো হয়েছে।
            </p>
            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#047f39] hover:bg-[#036a2f] text-white font-semibold text-sm shadow-xs transition-all"
              >
                <span>হোম পেজে ফিরে যান</span>
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
