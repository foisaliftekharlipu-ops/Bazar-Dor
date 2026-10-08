"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProductDetailsAuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const verifyAuth = async () => {
      try {
        if (authClient?.getSession) {
          const res = await authClient.getSession();
          if (res?.data?.user) {
            if (isMounted) {
              setIsAuthenticated(true);
              setLoading(false);
            }
            return;
          }
        }
      } catch (err) {
        // Fallback to unauthenticated
      }

      if (isMounted) {
        toast.error("পণ্যটির বিস্তারিত দেখতে অনুগ্রহ করে আগে সাইন ইন করুন।", {
          id: "auth-toast",
        });
        router.replace(`/signin?callbackUrl=${encodeURIComponent(pathname)}`);
      }
    };

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, [pathname, router]);

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 space-y-4">
        <div className="w-10 h-10 border-4 border-[#047f39]/20 border-t-[#047f39] rounded-full animate-spin" />
        <p className="text-sm font-medium text-gray-500 animate-pulse">
          যাচাই করা হচ্ছে...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
