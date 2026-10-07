"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLightBg, setIsLightBg] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  // Background luminance / section theme detector & scroll check
  useEffect(() => {
    const checkBackgroundTheme = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 24);

      // Scroll progress computation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / totalHeight) * 100)));
      }

      const navbarY = 48; // Vertical sample coordinate for the navbar

      // 1. Primary method: Check which section currently spans the navbar Y position
      const themedSections = document.querySelectorAll<HTMLElement>("[data-theme]");
      for (let i = 0; i < themedSections.length; i++) {
        const sec = themedSections[i];
        const rect = sec.getBoundingClientRect();
        if (rect.top <= navbarY && rect.bottom >= navbarY) {
          const theme = sec.getAttribute("data-theme");
          setIsLightBg(theme === "light");
          return;
        }
      }

      // 2. Secondary fallback: Sample elements under the navbar, skipping fixed header elements
      const logoX = window.innerWidth < 640 ? 32 : 56;
      if (typeof document.elementsFromPoint === "function") {
        const elements = document.elementsFromPoint(logoX, navbarY);
        for (let i = 0; i < elements.length; i++) {
          const el = elements[i];
          if (el.closest("header") || el.tagName === "HEADER") continue;

          const themedParent = el.closest<HTMLElement>("[data-theme]");
          if (themedParent) {
            const theme = themedParent.getAttribute("data-theme");
            setIsLightBg(theme === "light");
            return;
          }

          // Compute background color luminance
          const bg = window.getComputedStyle(el).backgroundColor;
          if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
            const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            if (match) {
              const r = parseInt(match[1], 10);
              const g = parseInt(match[2], 10);
              const b = parseInt(match[3], 10);
              const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
              setIsLightBg(luminance > 0.55);
              return;
            }
          }
        }
      }

      setIsLightBg(false);
    };

    // Run initial check
    checkBackgroundTheme();

    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(checkBackgroundTheme);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const isLinkActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    if (href === "/what-we-do") return pathname.startsWith("/what-we-do");
    if (href === "/who-we-serve") return pathname.startsWith("/who-we-serve");
    if (href === "/impact") {
      return pathname.startsWith("/impact") || pathname.startsWith("/impact-and-measurement");
    }
    if (href === "/partners") {
      return pathname.startsWith("/partners") || pathname.startsWith("/partners-and-investors");
    }
    if (href === "/esg") {
      return pathname.startsWith("/esg") || pathname.startsWith("/esg-and-sustainability");
    }
    if (href === "/apply") {
      return pathname.startsWith("/apply") || pathname.startsWith("/apply-for-funding");
    }
    return pathname === href;
  };

  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "WHAT WE DO", href: "/what-we-do" },
    { label: "WHO WE SERVE", href: "/who-we-serve" },
    { label: "IMPACT & MEASUREMENT", href: "/impact" },
    { label: "PARTNERS & INVESTORS", href: "/partners" },
    { label: "ESG & SUSTAINABILITY", href: "/esg" },
    { label: "APPLY FOR FUNDING", href: "/apply" },
  ];

  return (
    <>
      {/* Top Split Header Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full px-6 sm:px-8 lg:px-12 transition-all duration-200 pointer-events-none ${
          isScrolled
            ? isLightBg
              ? "bg-[#FAF7F2]/85 backdrop-blur-[12px] border-b border-[#E1C9B3] py-4 shadow-sm"
              : "bg-[#0b1310]/85 backdrop-blur-[12px] border-b border-white/10 py-4 shadow-sm"
            : "bg-transparent border-b border-transparent pt-6 lg:pt-8 pb-4"
        }`}
      >
        {/* Subtle 2px Scroll Progress Bar at the Top */}
        <div
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[var(--c-accent)] via-[#2EB78C] to-[#F88404] transition-all duration-75 pointer-events-none opacity-80"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Top Left: Responsive Brand Logo */}
        <Link
          href="/"
          className="pointer-events-auto relative flex items-center hover:opacity-85 transition-opacity focus:outline-none h-[28px] sm:h-[33px]"
          aria-label="Nigeria YEIB Investment Funds Home"
        >
          {/* White Logo (for Dark Backgrounds) */}
          <img
            src="/brand/logo-white.png"
            alt="Nigeria YEIB Investment Funds"
            className={`h-[28px] sm:h-[33px] w-auto object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] transition-opacity duration-300 ${
              isLightBg ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          />
          {/* Green Logo (for Light / White / Bright Backgrounds) */}
          <img
            src="/brand/logo-green.png"
            alt="Nigeria YEIB Investment Funds"
            className={`absolute left-0 top-0 h-[28px] sm:h-[33px] w-auto object-contain drop-shadow-[0_2px_12px_rgba(0,49,36,0.15)] transition-opacity duration-300 ${
              isLightBg ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />
        </Link>

        {/* Top Right: Minimalist Menu Capsule */}
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-2.5 rounded-full px-4 py-2 backdrop-blur-md transition-all duration-300 shadow-lg focus:outline-none group ${
              isLightBg
                ? "bg-white/85 hover:bg-white border border-[rgba(18,32,27,0.18)] text-[#12201b]"
                : "bg-[rgba(10,24,20,0.72)] hover:bg-[rgba(15,35,30,0.9)] border border-[rgba(238,246,242,0.22)] hover:border-[var(--c-accent)] text-[#eef6f2]"
            }`}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
          >
            <span
              className={`font-['Chivo',sans-serif] text-[0.78rem] font-bold tracking-[0.14em] uppercase transition-colors ${
                isLightBg
                  ? "text-[#12201b]"
                  : "text-[#cde3dc] group-hover:text-white"
              }`}
            >
              Menu
            </span>

            {/* Two-line Hamburger Icon */}
            <span
              className={`w-5 h-5 rounded-full flex flex-col justify-center items-center gap-1 p-1 ${
                isLightBg ? "bg-[rgba(18,32,27,0.08)]" : "bg-[rgba(0,0,0,0.35)]"
              }`}
            >
              <span
                className={`w-3 h-[1.5px] transition-transform duration-200 ${
                  isLightBg ? "bg-[#12201b]" : "bg-[#eef6f2]"
                } ${isOpen ? "rotate-45 translate-y-[2.5px]" : ""}`}
              />
              <span
                className={`w-3 h-[1.5px] transition-transform duration-200 ${
                  isLightBg ? "bg-[#12201b]" : "bg-[#eef6f2]"
                } ${isOpen ? "-rotate-45 -translate-y-[2.5px]" : ""}`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* =========================================================================
          IMMERSIVE MODAL MENU (Matching Exact Reference Layout & Design)
          ========================================================================= */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation"
          className="fixed inset-0 z-50 bg-[rgba(5,14,11,0.72)] backdrop-blur-2xl flex flex-col justify-between items-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-300 overflow-y-auto"
        >
          {/* Top Capsule Header (Perfect 3-Column Center Alignment) */}
          <div className="w-full max-w-[640px] min-h-[56px] sm:min-h-[64px] bg-[rgba(10,22,18,0.85)] border border-[rgba(238,246,242,0.15)] rounded-full px-6 sm:px-7 py-3 sm:py-3.5 grid grid-cols-[1fr_auto_1fr] items-center shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-4 duration-300">
            {/* Left Action (Left-aligned) */}
            <div className="flex items-center justify-start">
              <Link
                href="/apply"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-2 text-[#eef6f2] hover:text-[var(--c-accent)] font-sans text-[0.78rem] sm:text-[0.82rem] font-bold tracking-[0.12em] uppercase transition-colors whitespace-nowrap"
              >
                <span>Apply for funding</span>
                <ArrowUpRight className="w-4 h-4 text-[var(--c-accent)] shrink-0" />
              </Link>
            </div>

            {/* Center Logo (Mathematically Centered) */}
            <div className="flex items-center justify-center px-4">
              <img
                src="/brand/logo-white.png"
                alt="Nigeria YEIB"
                className="h-6 sm:h-7 w-auto object-contain"
              />
            </div>

            {/* Right Close Circle (Right-aligned) */}
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.2)] text-[#eef6f2] flex items-center justify-center transition-all focus:outline-none shrink-0"
                aria-label="Close menu"
              >
                <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>
            </div>
          </div>

          {/* Center Navigation Modal Card */}
          <div className="w-full max-w-[640px] flex-1 min-h-[520px] sm:min-h-[620px] max-h-[82vh] my-4 sm:my-6 bg-[rgba(10,22,18,0.92)] border border-[rgba(238,246,242,0.12)] rounded-[36px] sm:rounded-[48px] p-6 sm:p-12 shadow-2xl backdrop-blur-2xl flex flex-col items-center justify-center space-y-4 sm:space-y-5 animate-in zoom-in-95 duration-300">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`group relative flex items-center justify-center gap-3 font-sans text-[0.98rem] sm:text-[1.2rem] font-extrabold tracking-[0.18em] uppercase transition-all duration-200 transform hover:scale-[1.03] py-1 px-4 rounded-full ${
                    active
                      ? "text-[var(--c-accent)] bg-[rgba(0,190,147,0.08)] border border-[rgba(0,190,147,0.25)] shadow-[0_0_20px_rgba(0,190,147,0.12)]"
                      : "text-[#eef6f2] hover:text-[var(--c-accent)] hover:bg-white/[0.03]"
                  }`}
                >
                  {/* Glowing Active Indicator Dot */}
                  {active && (
                    <span
                      className="w-2 h-2 rounded-full bg-[var(--c-accent)] shadow-[0_0_10px_var(--c-accent)] animate-pulse shrink-0"
                      aria-hidden="true"
                    />
                  )}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Bottom Capsule Footer with Copyright & Socials */}
          <div className="w-full max-w-[640px] min-h-[56px] sm:min-h-[64px] bg-[rgba(10,22,18,0.85)] border border-[rgba(238,246,242,0.15)] rounded-full px-6 sm:px-8 py-3.5 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-4 duration-300">
            {/* Copyright */}
            <p className="font-sans text-[0.66rem] sm:text-[0.72rem] text-[#7f978d] tracking-wider uppercase text-center sm:text-left">
              Copyright © 2026 NYEIB. All Rights Reserved
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 text-[#c4d1cb]">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.06)] hover:bg-[var(--c-accent)] hover:text-black flex items-center justify-center transition-all text-xs font-bold"
              >
                f
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.06)] hover:bg-[var(--c-accent)] hover:text-black flex items-center justify-center transition-all text-xs font-bold"
              >
                ig
              </a>
              <a
                href="#x"
                aria-label="X (Twitter)"
                className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.06)] hover:bg-[var(--c-accent)] hover:text-black flex items-center justify-center transition-all text-xs font-bold"
              >
                𝕏
              </a>
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.06)] hover:bg-[var(--c-accent)] hover:text-black flex items-center justify-center transition-all text-xs font-bold"
              >
                in
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
