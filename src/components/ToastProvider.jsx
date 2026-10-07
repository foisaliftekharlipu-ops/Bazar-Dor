"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 3500,
        style: {
          background: "#1e293b",
          color: "#ffffff",
          fontFamily: "var(--font-hind-siliguri), system-ui, sans-serif",
          borderRadius: "12px",
          padding: "12px 18px",
          fontSize: "14px",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
        },
        success: {
          style: {
            background: "#065f46",
            color: "#ffffff",
          },
          iconTheme: {
            primary: "#10b981",
            secondary: "#ffffff",
          },
        },
        error: {
          style: {
            background: "#881337",
            color: "#ffffff",
          },
          iconTheme: {
            primary: "#f43f5e",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
}
