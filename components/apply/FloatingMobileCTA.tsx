"use client";

import React, { useState, useEffect } from "react";
import { AppButton } from "@/shared/components/AppButton";

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
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-[var(--apply-cream,#F2FBF6)] via-[var(--apply-cream,#F2FBF6)]/95 to-transparent backdrop-blur-sm transition-all duration-300 animate-in slide-in-from-bottom-3">
      <AppButton
        href="/apply/business/start"
        label="Start Business Application"
        variant="orange"
        size="md"
        className="w-full !py-3.5"
      />
    </div>
  );
}
