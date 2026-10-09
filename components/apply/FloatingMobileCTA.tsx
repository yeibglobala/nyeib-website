"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function FloatingMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past intro (~300px) and before footer (~500px from bottom)
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const innerHeight = window.innerHeight;
      const nearBottom = scrollY + innerHeight > scrollHeight - 600;

      setIsVisible(scrollY > 320 && !nearBottom);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-[#F7F5F0] via-[#F7F5F0]/95 to-transparent backdrop-blur-sm transition-all duration-300 animate-in slide-in-from-bottom-3">
      <Link
        href="/apply/business/start"
        className="w-full py-3.5 bg-[#F88404] hover:bg-[#e07500] text-white font-['Chivo',sans-serif] font-bold text-center rounded-2xl shadow-lg transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <span>Start Business Application</span>
        <ArrowUpRight className="w-5 h-5" />
      </Link>
    </div>
  );
}
