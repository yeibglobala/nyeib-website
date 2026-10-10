"use client";

import React, { useEffect, useState, useRef } from "react";
import { ESG_CONTENT } from "@/src/content/esg";

export function EsgInPageNav() {
  const [activeId, setActiveId] = useState<string>("approach");
  const navContainerRef = useRef<HTMLDivElement>(null);
  const links = ESG_CONTENT.inPageNav;

  const getNavOffset = () => {
    if (typeof window === "undefined") return 0;
    const val = getComputedStyle(document.documentElement).getPropertyValue("--nav-offset").trim();
    return parseFloat(val) || 0;
  };

  useEffect(() => {
    const handleScroll = () => {
      // If user scrolled past the bottom of section 5, the in-page bar scrolled away
      const lastSection = document.getElementById(links[links.length - 1].id);
      if (lastSection) {
        const lastSectionBottom = lastSection.offsetTop + lastSection.offsetHeight;
        if (window.scrollY > lastSectionBottom - 100) {
          setActiveId("");
          return;
        }
      }

      const navOffset = getNavOffset();
      const barHeight = navContainerRef.current?.offsetHeight || 56;
      const scrollPos = window.scrollY + navOffset + barHeight + 40;
      let current = links[0].id;

      for (const link of links) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            current = link.id;
          }
        }
      }
      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [links]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Smooth scroll with dynamic offset for navbar + in-page nav
    const navOffset = getNavOffset();
    const barHeight = navContainerRef.current?.offsetHeight || 56;
    const headerOffset = navOffset + barHeight + 16;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });

    setActiveId(id);
  };

  return (
    <div
      className="sticky z-20 w-full bg-[#F7F5F0] border-b border-[#E6DCCB] transition-[top] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{ top: "var(--nav-offset, 0px)" }}
    >
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative">
        {/* Mobile Edge Fade Out on Right */}
        <div
          aria-hidden="true"
          className="lg:hidden pointer-events-none absolute right-4 top-0 bottom-0 w-8 bg-gradient-to-l from-[#F7F5F0] to-transparent z-10"
        />

        <nav
          ref={navContainerRef}
          aria-label="ESG In-Page Navigation"
          className="flex items-center justify-start lg:justify-center gap-1.5 sm:gap-2 py-3 sm:py-3.5 overflow-x-auto no-scrollbar scroll-smooth"
        >
          {links.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className={`whitespace-nowrap px-3.5 sm:px-4 py-2 rounded-full text-[12px] sm:text-[13px] font-medium transition-all duration-200 select-none outline-none focus-visible:ring-2 focus-visible:ring-[#0F2A20] ${
                  isActive
                    ? "bg-[#0F2A20] text-white shadow-sm font-semibold"
                    : "text-[#0F2A20]/75 hover:text-[#0F2A20] hover:bg-black/[0.04]"
                }`}
                style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                aria-current={isActive ? "true" : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
