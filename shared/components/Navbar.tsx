"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isNearTop, setIsNearTop] = useState(false);
  const lastScrollYRef = useRef(0);
  const pathname = usePathname();

  // Scroll detection: elevate when scrolled, hide on scroll down, reveal on scroll up
  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Keep navbar visible if mobile drawer is currently open
      if (isOpen) {
        setIsVisible(true);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      // Always show near top of page
      if (currentScrollY < 60) {
        setIsVisible(true);
      } else {
        const delta = currentScrollY - lastScrollYRef.current;
        // Threshold prevents micro-jitter
        if (delta > 8) {
          // Scrolling down -> hide navbar
          setIsVisible(false);
        } else if (delta < -8) {
          // Scrolling up -> reveal navbar smoothly
          setIsVisible(true);
        }
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // Mouse move detection: smoothly bring navbar into view when cursor approaches the top edge
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY <= 90) {
        setIsNearTop(true);
      } else {
        setIsNearTop(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Close mobile menu on route change or Escape key
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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
    return pathname === href;
  };

  const navLinks = [
    { label: "What We Do", href: "/what-we-do" },
    { label: "Who We Serve", href: "/who-we-serve" },
    { label: "Impact", href: "/impact" },
    { label: "Partners", href: "/partners" },
    { label: "ESG", href: "/esg" },
  ];

  const shouldShow = isOpen || isHovered || isNearTop || isVisible;

  // Drive document-level --nav-offset for in-page sticky navigation
  useEffect(() => {
    const updateNavOffset = () => {
      if (typeof window === "undefined") return;
      if (shouldShow) {
        const offset = window.innerWidth >= 640 ? "88px" : "72px";
        document.documentElement.style.setProperty("--nav-offset", offset);
      } else {
        document.documentElement.style.setProperty(
          "--nav-offset",
          "env(safe-area-inset-top, 0px)"
        );
      }
    };

    updateNavOffset();
    window.addEventListener("resize", updateNavOffset);
    return () => window.removeEventListener("resize", updateNavOffset);
  }, [shouldShow]);

  return (
    <>
      {/* Floating White Capsule Navbar Container */}
      <header
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed top-4 sm:top-6 left-0 right-0 z-50 w-full px-4 sm:px-6 lg:px-8 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          shouldShow
            ? "translate-y-0 opacity-100"
            : "-translate-y-[calc(100%+32px)] opacity-0"
        }`}
      >
        <div
          className={`max-w-[1240px] w-full mx-auto bg-white/95 backdrop-blur-md rounded-full px-4 sm:px-7 py-2.5 sm:py-3 border border-black/[0.06] flex items-center justify-between pointer-events-auto transition-all duration-300 ${
            isScrolled
              ? "shadow-[0_12px_36px_rgba(0,0,0,0.14)]"
              : "shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
          }`}
        >
          {/* Left: Brand Green Logo */}
          <Link
            href="/"
            className="flex items-center hover:opacity-90 transition-opacity focus:outline-none shrink-0"
            aria-label="Nigeria YEIB Investment Funds Home"
          >
            <img
              src="/brand/logo-green.png"
              alt="Nigeria YEIB Investment Funds"
              className="h-[26px] sm:h-[30px] md:h-[32px] w-auto object-contain"
            />
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-9" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`font-['Chivo',sans-serif] text-[0.88rem] lg:text-[0.93rem] font-medium transition-colors relative py-1 ${
                    active
                      ? "text-[#003124] font-semibold"
                      : "text-[#4A5568] hover:text-[#003124]"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00BE93] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Apply for funding CTA button + Mobile Menu Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center bg-[#F88404] hover:bg-[#e07500] text-white font-['Chivo',sans-serif] font-medium text-[0.82rem] sm:text-[0.88rem] px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap"
            >
              Apply for funding
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-9 h-9 rounded-full bg-black/[0.04] hover:bg-black/[0.08] text-[#12201b] flex items-center justify-center transition-colors focus:outline-none"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer / Overlay Menu */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation"
          className="fixed inset-0 z-40 bg-[rgba(0,35,26,0.8)] backdrop-blur-md flex flex-col justify-start items-center pt-24 pb-8 px-5 md:hidden animate-in fade-in duration-200 overflow-y-auto"
        >
          <div className="w-full max-w-sm bg-white rounded-[28px] p-6 shadow-2xl border border-black/[0.08] flex flex-col gap-4 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-2xl font-['Chivo',sans-serif] text-[0.98rem] font-semibold transition-colors ${
                  pathname === "/"
                    ? "bg-[#003124]/10 text-[#003124]"
                    : "text-[#2D3748] hover:bg-black/[0.03]"
                }`}
              >
                Home
              </Link>
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 rounded-2xl font-['Chivo',sans-serif] text-[0.98rem] font-semibold transition-colors ${
                      active
                        ? "bg-[#003124]/10 text-[#003124]"
                        : "text-[#2D3748] hover:bg-black/[0.03]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <hr className="border-black/[0.08] my-1" />

            <Link
              href="/apply"
              onClick={() => setIsOpen(false)}
              className="w-full py-3.5 bg-[#F88404] hover:bg-[#e07500] text-white font-['Chivo',sans-serif] font-semibold text-center rounded-2xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <span>Apply for funding</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
