"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { FiLogOut, FiCamera, FiUser } from "react-icons/fi";

export default function ProfileContent() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
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
              setImage(res.data.user.image || "");
              setLoading(false);
            }
            return;
          }
        }
      } catch (err) {
        // Fallback for session error
      }

      if (isMounted) {
        toast.error("প্রোফাইল দেখতে অনুগ্রহ করে আগে সাইন ইন করুন।", {
          id: "auth-toast",
        });
        router.replace("/signin?callbackUrl=/profile");
      }
    };

    verifySession();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleSignOut = async () => {
    try {
      if (authClient?.signOut) {
        await authClient.signOut();
      }
      toast.success("সফলভাবে সাইন আউট হয়েছে!", { id: "auth-toast" });
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth-state-change"));
      }
      router.push("/");
      router.refresh();
    } catch (err) {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে।", { id: "auth-toast" });
    }
  };

  const handleUpdateProfile = async (e) => {
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
          image: image.trim() || undefined,
        });

        if (res?.error) {
          const errText = res.error.message || "তথ্য আপডেট করা সম্ভব হয়নি।";
          setErrorMessage(errText);
          toast.error(errText, { id: "auth-toast" });
          return;
        }
      }

      // Update local state session
      setSession((prev) => ({
        ...prev,
        user: {
          ...prev?.user,
          name: name.trim(),
          image: image.trim(),
        },
      }));

      toast.success("প্রোফাইলের তথ্য সফলভাবে আপডেট করা হয়েছে!", {
        id: "auth-toast",
      });

      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth-state-change"));
      }
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
      <main className="flex-1 flex items-center justify-center p-8 min-h-[50vh]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-[#047f39]/20 border-t-[#047f39] rounded-full animate-spin" />
          <p className="text-sm font-medium text-gray-500 animate-pulse">
            প্রোফাইল লোড হচ্ছে...
          </p>
        </div>
      </main>
    );
  }

  const user = session.user;
  const userName = user.name || user.email?.split("@")[0] || "ব্যবহারকারী";
  const userEmail = user.email || "ইমেইল অনুপস্থিত";
  const currentDisplayImage = image || user.image || "/user.jpg";

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-1">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header Title & Subtitle */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            আমার প্রোফাইল
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* Top Summary Card (User Info & Sign Out) */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-gray-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Avatar and User Name / Email */}
          <div className="flex items-center gap-4">
            <img
              src={currentDisplayImage}
              alt={userName}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border border-gray-200 shadow-2xs shrink-0"
            />

            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                {userName}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-medium truncate">
                {userEmail}
              </p>
            </div>
          </div>

          {/* Sign Out Button */}
          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-rose-200 text-rose-600 bg-rose-50/40 hover:bg-rose-100/70 font-semibold text-xs sm:text-sm transition-all cursor-pointer self-start sm:self-auto shrink-0"
          >
            <FiLogOut className="text-sm" />
            <span>সাইন আউট</span>
          </button>
        </div>

        {/* Bottom Card (Update Information Form) */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-2xs space-y-5">
          <h3 className="text-base sm:text-lg font-bold text-gray-900">তথ্য</h3>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-2">
              <span className="text-base font-bold shrink-0">⚠️</span>
              <p className="font-medium">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="space-y-5">
            {/* Name Input */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                নাম
              </label>
              <input
                type="text"
                required
                placeholder="আপনার নাম লিখুন"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#047f39] focus:border-[#047f39] transition-colors"
              />
            </div>

            {/* Profile Image URL Input */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                প্রোফাইল ছবির লিংক (Image URL)
              </label>
              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#047f39] focus:border-[#047f39] transition-colors"
              />
              <p className="text-[11px] text-gray-400 mt-1">
                আপনার পছন্দের যেকোনো ছবির সরাসরি ওয়েব লিংক দিলে তা প্রোফাইল ও নেভবারে প্রদর্শিত হবে।
              </p>
            </div>

            {/* Update Button */}
            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 rounded-xl bg-[#047f39] hover:bg-[#036a2f] text-white font-bold text-sm sm:text-base shadow-sm transition-all duration-150 disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  <span>আপডেট হচ্ছে...</span>
                </>
              ) : (
                <span>আপডেট</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
