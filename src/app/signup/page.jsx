"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiUserPlus, FiArrowLeft } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      const msg = "আপনার সম্পূর্ণ নাম লিখুন";
      setErrorMessage(msg);
      toast.error(msg, { id: "auth-toast" });
      return;
    }

    if (!email.trim()) {
      const msg = "একটি বৈধ ইমেইল ঠিকানা লিখুন";
      setErrorMessage(msg);
      toast.error(msg, { id: "auth-toast" });
      return;
    }

    if (!password || password.length < 6) {
      const msg = "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে";
      setErrorMessage(msg);
      toast.error(msg, { id: "auth-toast" });
      return;
    }

    setLoading(true);
    try {
      const res = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (res?.error) {
        let errorText = "নিবন্ধন ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।";
        const rawMsg = (res.error.message || "").toLowerCase();
        const rawStatus = res.error.status;

        if (
          rawMsg.includes("user already exists") ||
          rawMsg.includes("already exist") ||
          rawMsg.includes("duplicate")
        ) {
          errorText = "এই ইমেইলটি ইতিমধ্যে ব্যবহার করা হয়েছে। অন্য ইমেইল ব্যবহার করুন অথবা সাইন ইন করুন।";
        } else if (
          rawMsg.includes("connect") ||
          rawMsg.includes("timeout") ||
          rawMsg.includes("server error") ||
          rawMsg.includes("failed to fetch") ||
          rawStatus === 500
        ) {
          errorText = "ডাটাবেজে সংযোগ করা সম্ভব হয়নি। অনুগ্রহ করে .env.local ফাইলে সচল MongoDB URI (যেমন: MongoDB Atlas) দিন।";
        } else if (res.error.message) {
          errorText = res.error.message;
        }

        setErrorMessage(errorText);
        toast.error(errorText, { id: "auth-toast" });
      } else {
        toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! অনুগ্রহ করে সাইন ইন করুন।", {
          id: "auth-toast",
          duration: 4000,
        });
        router.push(
          `/signin?registered=true${callbackUrl !== "/" ? `&callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`
        );
      }
    } catch (err) {
      let errorText = "নিবন্ধন করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।";
      const rawMsg = (err?.message || "").toLowerCase();

      if (
        rawMsg.includes("connect") ||
        rawMsg.includes("timeout") ||
        rawMsg.includes("mongo") ||
        rawMsg.includes("fetch")
      ) {
        errorText = "ডাটাবেজে সংযোগ করা সম্ভব হয়নি। অনুগ্রহ করে .env.local ফাইলে সচল MongoDB URI (যেমন: MongoDB Atlas) দিন।";
      } else if (err?.message) {
        errorText = err.message;
      }

      setErrorMessage(errorText);
      toast.error(errorText, { id: "auth-toast" });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setSocialLoading(provider);
    setErrorMessage("");
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: callbackUrl,
      });
      toast.success(`${provider === "google" ? "গুগল" : "গিটহাব"} দিয়ে সাইন ইন করা হচ্ছে...`, {
        id: "auth-toast",
      });
    } catch (err) {
      const msg = `${provider} দিয়ে সাইন ইন ব্যর্থ হয়েছে: ${err.message || ""}`;
      setErrorMessage(msg);
      toast.error(msg, { id: "auth-toast" });
      setSocialLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Back to Home Link */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#047f39] transition-colors"
        >
          <FiArrowLeft />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        {/* Header Title */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center justify-center gap-2 mb-2">

          </Link>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            নতুন অ্যাকাউন্ট তৈরি করুন
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            বাজার দর প্ল্যাটফর্মে নিবন্ধন করে পণ্যের বিস্তারিত বাজার বিশ্লেষণ পান
          </p>
        </div>

        {/* Form Card */}
        <div className="mt-6 bg-white py-8 px-6 shadow-xl shadow-slate-200/60 rounded-3xl border border-slate-200/80 sm:px-8">
          {/* Error Alert */}
          {errorMessage && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-2">
              <span className="text-base font-bold shrink-0">⚠️</span>
              <p className="font-medium">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                আপনার নাম <span className="text-rose-500">*</span>
              </label>
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FiUser className="text-base" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="আপনার সম্পূর্ণ নাম লিখুন"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 sm:py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#047f39] focus:border-[#047f39] text-xs sm:text-sm transition-colors"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                ইমেইল ঠিকানা <span className="text-rose-500">*</span>
              </label>
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FiMail className="text-base" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="আপনার ইমেইল লিখুন (যেমন: user@example.com)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 sm:py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#047f39] focus:border-[#047f39] text-xs sm:text-sm transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর) <span className="text-rose-500">*</span>
              </label>
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FiLock className="text-base" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড দিন"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2.5 sm:py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#047f39] focus:border-[#047f39] text-xs sm:text-sm transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <FiEyeOff className="text-base" /> : <FiEye className="text-base" />}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || !!socialLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#047f39] hover:bg-[#036a2f] text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-800/20 transition-all duration-150 disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    <span>নিবন্ধন হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <FiUserPlus className="text-lg" />
                    <span>অ্যাকাউন্ট তৈরি করুন (রেজিস্টার)</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Social Sign Up Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-slate-500 font-medium">অথবা সোশ্যাল সাইন আপ</span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSocialLogin("google")}
                disabled={loading || !!socialLoading}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-300 rounded-xl bg-white text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 shadow-2xs transition-all disabled:opacity-60 cursor-pointer"
              >
                {socialLoading === "google" ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <FcGoogle className="text-lg" />
                )}
                <span>গুগল</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin("github")}
                disabled={loading || !!socialLoading}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-300 rounded-xl bg-slate-900 text-xs sm:text-sm font-semibold text-white hover:bg-slate-800 shadow-2xs transition-all disabled:opacity-60 cursor-pointer"
              >
                {socialLoading === "github" ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <FaGithub className="text-lg" />
                )}
                <span>গিটহাব</span>
              </button>
            </div>
          </div>

          {/* Link to Login */}
          <div className="mt-6 text-center border-t border-slate-100 pt-4">
            <p className="text-xs sm:text-sm text-slate-600">
              ইতিমধ্যে একটি অ্যাকাউন্ট আছে?{" "}
              <Link
                href={`/signin${callbackUrl !== "/" ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`}
                className="font-bold text-[#047f39] hover:underline"
              >
                সাইন ইন করুন
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="loading loading-spinner loading-lg text-[#047f39]"></div></div>}>
      <SignUpContent />
    </Suspense>
  );
}
