"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { FiUser, FiMail, FiArrowLeft, FiSave } from "react-icons/fi";

export default function ProfileUpdateContent() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const verifySession = async () => {
      try {
        if (authClient?.getSession) {
          const res = await authClient.getSession();
          if (res?.data?.user) {
            if (isMounted) {
              setSession(res.data);
              setName(res.data.user.name || "");
              setLoading(false);
            }
            return;
          }
        }
      } catch (err) {
        // Fallback for session error
      }

      if (isMounted) {
        toast.error("তথ্য পরিবর্তন করতে অনুগ্রহ করে আগে সাইন ইন করুন।", {
          id: "auth-toast",
        });
        router.replace("/signin?callbackUrl=/profile/update");
      }
    };

    verifySession();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      const msg = "আপনার সম্পূর্ণ নাম লিখুন";
      setErrorMessage(msg);
      toast.error(msg, { id: "auth-toast" });
      return;
    }

    setSaving(true);
    try {
      if (authClient?.updateUser) {
        const res = await authClient.updateUser({
          name: name.trim(),
        });

        if (res?.error) {
          const errText = res.error.message || "তথ্য আপডেট করা সম্ভব হয়নি।";
          setErrorMessage(errText);
          toast.error(errText, { id: "auth-toast" });
          return;
        }
      }

      toast.success("প্রোফাইলের তথ্য সফলভাবে হালনাগাদ করা হয়েছে!", {
        id: "auth-toast",
      });
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth-state-change"));
      }
      router.push("/profile");
      router.refresh();
    } catch (err) {
      const errText = err.message || "তথ্য সংরক্ষণ করতে সমস্যা হয়েছে।";
      setErrorMessage(errText);
      toast.error(errText, { id: "auth-toast" });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !session?.user) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-[#047f39]/20 border-t-[#047f39] rounded-full animate-spin" />
          <p className="text-sm font-medium text-gray-500 animate-pulse">
            তথ্য লোড হচ্ছে...
          </p>
        </div>
      </div>
    );
  }

  const user = session.user;

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-6">
      {/* Back Link */}
      <div>
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-600 hover:text-[#047f39] transition-colors"
        >
          <FiArrowLeft />
          <span>প্রোফাইলে ফিরে যান</span>
        </Link>
      </div>

      {/* Update Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/90 shadow-2xs space-y-6 max-w-2xl">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            তথ্য পরিবর্তন করুন
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            আপনার ব্যক্তিগত তথ্য পরিবর্তন করে সংরক্ষণ করুন
          </p>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-2">
            <span className="text-base font-bold shrink-0">⚠️</span>
            <p className="font-medium">{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Input */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              আপনার নাম <span className="text-rose-500">*</span>
            </label>
            <div className="relative rounded-xl shadow-2xs">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <FiUser className="text-base" />
              </div>
              <input
                type="text"
                required
                placeholder="আপনার সম্পূর্ণ নাম লিখুন"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 sm:py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#047f39] focus:border-[#047f39] text-xs sm:text-sm transition-colors"
              />
            </div>
          </div>

          {/* Email (Read Only) */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              ইমেইল ঠিকানা <span className="text-xs text-gray-400 font-normal">(পরিবর্তনযোগ্য নয়)</span>
            </label>
            <div className="relative rounded-xl shadow-2xs">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <FiMail className="text-base" />
              </div>
              <input
                type="email"
                disabled
                value={user.email || ""}
                className="block w-full pl-10 pr-3 py-2.5 sm:py-3 bg-gray-100/80 border border-gray-200 rounded-xl text-gray-500 text-xs sm:text-sm cursor-not-allowed"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#047f39] hover:bg-[#036a2f] text-white font-bold text-sm shadow-md shadow-emerald-800/20 transition-all disabled:opacity-60 cursor-pointer"
            >
              {saving ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  <span>সংরক্ষণ হচ্ছে...</span>
                </>
              ) : (
                <>
                  <FiSave className="text-base" />
                  <span>তথ্য সংরক্ষণ করুন</span>
                </>
              )}
            </button>

            <Link
              href="/profile"
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm transition-colors text-center"
            >
              বাতিল করুন
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
