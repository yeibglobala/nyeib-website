"use client";

import React, { useEffect, useState } from "react";

export function Preloader() {
  const [mounted, setMounted] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // 1. Session Storage Guard: check if already seen in this session
    try {
      if (sessionStorage.getItem("nyeib_preloader_seen")) {
        setMounted(false);
        return;
      }
    } catch {
      // sessionStorage unavailable (e.g. strict privacy mode)
    }

    // 2. Prevent background scroll while intro animation plays
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 3. Mark sequence: gather -> dot pulse -> wordmark -> elegant hold -> exit
    // Total duration: 2.4s before exit initiates (hold for user to absorb brand)
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2400);

    // 4. Complete cleanup and unmount from DOM after exit fade (2.85s)
    const cleanupTimer = setTimeout(() => {
      setMounted(false);
      document.body.style.overflow = originalOverflow;
      try {
        sessionStorage.setItem("nyeib_preloader_seen", "true");
      } catch {
        // no-op
      }
    }, 2850);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(cleanupTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      id="nyeib-preloader-overlay"
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#00241A] select-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] px-4 sm:px-6 ${
        isExiting ? "opacity-0 pointer-events-none scale-[1.02]" : "opacity-100"
      }`}
      style={{
        background: "radial-gradient(ellipse at 50% 48%, #053b2e 0%, #002219 70%, #001912 100%)",
      }}
    >
      <span className="sr-only" role="status">
        Loading Nigeria YEIB Investment Funds
      </span>

      {/* Horizontal Brand Lockup: Icon gathers in center, then shifts left as wordmark reveals */}
      <div className="relative flex items-center justify-center max-w-full">
        {/* SVG Mark: Three Bars Gather */}
        <div className="relative w-20 h-20 min-[400px]:w-24 min-[400px]:h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center shrink-0">
          <svg
            viewBox="-2.5 -2.5 24.63 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full overflow-visible drop-shadow-[0_14px_36px_rgba(46,183,140,0.28)]"
          >
            {/* Left Bar: Slides in from top-left with slight tilt */}
            <path
              className="nyeib-gather-left"
              fill="#2EB78C"
              d="M4.68,.16c-.05-.09-.17-.16-.29-.16H.34C.07,0-.08,.29,.05,.51L3.92,6.82c.84,1.36,1.19,2.97,1.03,4.57l-.58,5.42c-.01,.2,.14,.37,.34,.37h2.42c.16,0,.29-.1,.33-.25,.37-1.62,.56-3.3,.56-5.04C8.04,7.58,6.82,3.56,4.68,.16Z"
            />

            {/* Center Bar: Rises up into center stem */}
            <path
              className="nyeib-gather-center"
              fill="#2EB78C"
              d="M13.28,0H6.36c-.26,0-.42,.29-.29,.51,.42,.76,.81,1.55,1.15,2.36,1.22,2.87,1.83,5.89,1.83,9.02,0,1.66-.18,3.3-.52,4.89-.04,.21,.12,.41,.33,.41h1.91c.21,0,.38-.2,.33-.41-.34-1.58-.51-3.22-.51-4.89,0-3.13,.62-6.16,1.82-9.02,.34-.81,.73-1.6,1.17-2.36,.12-.22-.04-.51-.3-.51Z"
            />

            {/* Right Bar: Slides in from top-right with slight tilt */}
            <path
              className="nyeib-gather-right"
              fill="#2EB78C"
              d="M19.3,0h-4.06c-.12,0-.22,.07-.29,.16-2.12,3.41-3.35,7.43-3.35,11.73,0,1.74,.2,3.42,.58,5.04,.03,.14,.17,.25,.33,.25h2.42c.2,0,.35-.17,.33-.37l-.56-5.42c-.17-1.6,.2-3.21,1.03-4.57L19.59,.51c.13-.22-.03-.51-.29-.51Z"
            />

            {/* Tiger Orange Dot: Convergence spark at the base */}
            <circle
              className="nyeib-orange-spark"
              cx="9.815"
              cy="18.8"
              r="1.25"
              fill="#F88404"
            />
          </svg>
        </div>

        {/* Wordmark Lockup: Horizontal reveal to the right of the icon */}
        <div className="nyeib-wordmark-container">
          <div className="flex flex-col justify-center whitespace-nowrap">
            <span
              className="text-[20px] min-[400px]:text-[24px] sm:text-[30px] md:text-[36px] font-bold text-white tracking-[0.06em] uppercase leading-[1.05]"
              style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
            >
              NIGERIA YEIB
            </span>
            <span
              className="text-[10px] min-[400px]:text-[12px] sm:text-[15px] md:text-[18px] font-semibold text-[#6FE3C1] tracking-[0.22em] uppercase mt-1 sm:mt-1.5 leading-[1.1] opacity-90"
              style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
            >
              INVESTMENT FUNDS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
