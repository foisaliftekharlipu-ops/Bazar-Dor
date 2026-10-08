import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileUpdateContent from "@/components/ProfileUpdateContent";

export default function ProfileUpdatePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf9] text-slate-900">
      <Navbar />
      <ProfileUpdateContent />
      <Footer />
    </div>
  );
}
