import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const metadata = {
  title: "বাজার দর - প্রয়োজনীয় পণ্যের সঠিক দাম এক নজরে",
  description:
    "প্রতিদিনের নিত্যপ্রয়োজনীয় পণ্যের বাজার দর, দামের ওঠানামা এবং বাজারভিত্তিক দামের নির্ভরযোগ্য তথ্য।",
  keywords: ["বাজার দর", "Bazar Dor", "নিত্যপ্রয়োজনীয় পণ্য", "সবজি", "চাল", "ডাল", "মাছ", "মাংস"],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛒</text></svg>",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans bg-white text-slate-900 antialiased selection:bg-emerald-100 selection:text-emerald-900" suppressHydrationWarning>
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}