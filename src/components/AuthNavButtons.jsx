"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { FiUser, FiLogOut, FiChevronDown } from "react-icons/fi";

export default function AuthNavButtons() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleSignOut = async () => {
    try {
      if (authClient?.signOut) {
        await authClient.signOut();
      }
      setSession(null);
      setDropdownOpen(false);
      toast.success("সফলভাবে সাইন আউট হয়েছে!", { id: "auth-toast" });
      window.dispatchEvent(new Event("auth-state-change"));
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("সাইন আউট ব্যর্থ হয়েছে", { id: "auth-toast" });
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
    const userName = session.user.name || session.user.email?.split("@")[0] || "ব্যবহারকারী";
    const userEmail = session.user.email || "";
    const userImage = session.user.image || "/user.jpg";

    return (
      <div className="relative" ref={dropdownRef}>
        {/* Profile Pill Trigger Button */}
        <button
          type="button"
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full sm:rounded-2xl bg-white border border-gray-300/90 hover:bg-gray-50 hover:border-gray-400 shadow-2xs transition-all font-bold text-xs sm:text-sm text-gray-900 cursor-pointer select-none"
        >
          <img
            src={userImage}
            alt={userName}
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border border-gray-200"
          />
          <span className="max-w-[100px] sm:max-w-[130px] truncate">{userName}</span>
          <FiChevronDown
            className={`text-gray-400 text-xs transition-transform duration-200 ${
              dropdownOpen ? "rotate-180 text-gray-700" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-60 sm:w-64 bg-white rounded-2xl shadow-xl border border-gray-200/90 p-3.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            {/* Header: User Name & Email */}
            <div className="px-2 py-1.5 border-b border-gray-100 pb-3">
              <p className="text-sm font-bold text-gray-900 truncate">{userName}</p>
              <p className="text-xs text-gray-400 font-medium truncate mt-0.5">{userEmail}</p>
            </div>

            {/* Menu Links */}
            <div className="pt-2 space-y-1">
              <Link
                href="/profile"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-gray-700 hover:bg-[#f0f4f2] hover:text-[#047f39] transition-colors"
              >
                <FiUser className="text-base text-gray-500" />
                <span>আমার প্রোফাইল</span>
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
              >
                <FiLogOut className="text-base text-rose-500" />
                <span>সাইন আউট</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Link
        href="/signin"
        className="text-slate-900 border border-transparent hover:bg-[#dadeda] hover:border-slate-300/80 font-bold text-xs sm:text-sm px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all duration-150 cursor-pointer"
      >
        সাইন ইন
      </Link>
      <Link
        href="/signup"
        className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#047f39] hover:bg-[#036a2f] text-white font-bold text-xs sm:text-sm shadow-2xs hover:shadow-xs transition-all duration-150 cursor-pointer"
      >
        সাইন আপ
      </Link>
    </div>
  );
}
