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

    // 3. Mark sequence: gather -> dot pulse -> wordmark -> exit
    // Total duration: ~1.35s before exit initiates
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 1300);

    // 4. Complete cleanup and unmount from DOM after exit fade (1.65s)
    const cleanupTimer = setTimeout(() => {
      setMounted(false);
      document.body.style.overflow = originalOverflow;
      try {
        sessionStorage.setItem("nyeib_preloader_seen", "true");
      } catch {
        // no-op
      }
    }, 1650);

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
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#00241A] select-none transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isExiting ? "opacity-0 pointer-events-none scale-[1.02]" : "opacity-100"
      }`}
      style={{
        background: "radial-gradient(ellipse at 50% 45%, #053b2e 0%, #002219 70%, #001912 100%)",
      }}
    >
      <span className="sr-only" role="status">
        Loading Nigeria YEIB Investment Funds
      </span>

      {/* Centerpiece Emblem & Wordmark */}
      <div className="relative flex flex-col items-center justify-center -translate-y-3">
        {/* SVG Mark: Three Bars Gather */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
          <svg
            viewBox="-2 -2 23.63 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full overflow-visible drop-shadow-[0_8px_24px_rgba(46,183,140,0.22)]"
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
              cy="18.6"
              r="1.15"
              fill="#F88404"
            />
          </svg>
        </div>

        {/* Wordmark Lockup */}
        <div className="nyeib-wordmark mt-5 text-center flex flex-col items-center">
          <span
            className="text-[15px] sm:text-[17px] font-bold text-white tracking-[0.22em] uppercase leading-none"
            style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
          >
            NIGERIA YEIB
          </span>
          <span
            className="text-[8.5px] sm:text-[9.5px] font-semibold text-[#6FE3C1] tracking-[0.32em] uppercase mt-1.5 leading-none opacity-80"
            style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
          >
            INVESTMENT FUNDS
          </span>
        </div>
      </div>
    </div>
  );
}
