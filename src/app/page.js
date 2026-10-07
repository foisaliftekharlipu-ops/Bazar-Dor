import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      {/* 🔝 Navbar */}
      <Navbar />

      {/* 🅱️ Hero / Banner */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        <HeroBanner />

        {/* ⚖️ সব পণ্য Anchor Target Section */}
        <section id="সব-পণ্য" className="scroll-mt-28 my-8 pt-4">
          <div className="border-t border-gray-100 pt-6"></div>
        </section>
      </main>
    </div>
  );
}
