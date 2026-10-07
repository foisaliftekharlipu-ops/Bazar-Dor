"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { FiLogOut } from "react-icons/fi";

export default function AuthNavButtons() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const checkSession = async () => {
      try {
        if (authClient?.getSession) {
          const res = await authClient.getSession();
          if (isMounted) setSession(res?.data || null);
        }
      } catch (e) {
        if (isMounted) setSession(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    checkSession();

    const handleAuthChange = () => checkSession();
    window.addEventListener("auth-state-change", handleAuthChange);
    return () => {
      isMounted = false;
      window.removeEventListener("auth-state-change", handleAuthChange);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      if (authClient?.signOut) {
        await authClient.signOut();
      }
      setSession(null);
      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      window.dispatchEvent(new Event("auth-state-change"));
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("সাইন আউট ব্যর্থ হয়েছে");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-3">
        <div className="h-8 w-16 bg-slate-100 rounded-lg animate-pulse" />
        <div className="h-8 w-20 bg-emerald-100 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (session?.user) {
    const userName = session.user.name || session.user.email?.split("@")[0] || "প্রোফাইল";

    return (
      <div className="flex items-center gap-2">
        <Link
          href="/profile"
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-[#dadeda] hover:border-slate-300 transition-all font-semibold text-xs sm:text-sm"
        >
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={userName}
              className="w-5 h-5 rounded-full object-cover"
            />
          ) : (
            <div className="w-5 h-5 rounded-full bg-[#047f39] text-white flex items-center justify-center text-[10px] font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="max-w-[100px] truncate">{userName}</span>
        </Link>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-[#dadeda] hover:border-slate-300 border border-transparent transition-all text-xs sm:text-sm font-medium cursor-pointer"
          title="সাইন আউট"
        >
          <FiLogOut className="text-sm" />
          <span className="hidden sm:inline">সাইন আউট</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Link
        href="/signin"
        className="text-slate-900 border border-transparent hover:bg-[#dadeda] hover:border-slate-300/80 font-semibold text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all duration-150 cursor-pointer"
      >
        সাইন ইন
      </Link>
      <Link
        href="/signup"
        className="inline-flex items-center justify-center px-4 sm:px-5 py-1.5 sm:py-2 rounded-xl bg-[#047f39] hover:bg-[#036a2f] text-white font-semibold text-xs sm:text-sm shadow-2xs hover:shadow-xs transition-all duration-150 cursor-pointer"
      >
        সাইন আপ
      </Link>
    </div>
  );
}
