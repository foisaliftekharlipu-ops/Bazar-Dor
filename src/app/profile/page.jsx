import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileContent from "@/components/ProfileContent";

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf9] text-slate-900">
      <Navbar />
      <ProfileContent />
      <Footer />
    </div>
  );
}
