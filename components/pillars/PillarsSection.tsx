"use client";

import React, { useState, useEffect, useRef } from "react";
import { PILLARS_CONFIG, PillarItem } from "./config";
import { PillarsDesktopStage } from "./PillarsDesktopStage";
import { DustCanvas } from "./DustCanvas";
import { HeaderReveal } from "@/shared/components/HeaderReveal";

export interface PillarsSectionConfig {
  shapeMode?: "funds" | "classic";
  intro: {
    tag: string;
    headline: {
      before: string;
      highlight: string;
      after: string;
    };
    paragraph: string;
  };
  timing: {
    hoverIntentDelayMs?: number;
    morphDurationMs?: number;
    openDurationMs?: number;
    closeDurationMs?: number;
    autoPlayIntervalMs?: number;
  };
  particles?: {
    desktopCount?: number;
    mobileCount?: number;
    colors?: string[];
    alphaRange?: number[];
    driftSpeed?: number;
    shapeScale?: number;
  };
  pillars: PillarItem[];
}

export interface PillarsSectionProps {
  config?: PillarsSectionConfig;
}

export function PillarsSection({ config = PILLARS_CONFIG }: PillarsSectionProps = {}) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number | null>(0);
  const [reservedListHeight, setReservedListHeight] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveredRef = useRef<boolean>(false);
  const isIntersectingRef = useRef<boolean>(false);

  const pillars: PillarItem[] = (config.pillars as PillarItem[]) || [];

  // Measure and reserve maximum list height on desktop so transitions never jump
  const measureHeight = () => {
    if (typeof window === "undefined" || window.innerWidth < 900) {
      setReservedListHeight(null);
      return;
    }

    const listEl = listRef.current;
    if (!listEl) return;

    // Temporarily disable transitions during measurement
    listEl.classList.add("no-transitions");
    const itemEls = Array.from(listEl.children) as HTMLElement[];
    let maxHeight = 0;

    itemEls.forEach((_, targetIdx) => {
      // Set targetIdx as active
      itemEls.forEach((item, j) => {
        if (j === targetIdx) {
          item.classList.add("is-active-measure");
        } else {
          item.classList.remove("is-active-measure");
        }
      });
      maxHeight = Math.max(maxHeight, listEl.offsetHeight);
    });

    // Cleanup measurement classes
    itemEls.forEach((item) => item.classList.remove("is-active-measure"));
    listEl.classList.remove("no-transitions");

    if (maxHeight > 0) {
      setReservedListHeight(maxHeight);
    }
  };

  // Auto-play loop to smoothly cycle through pillars
  const resetAutoPlay = () => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }

    const intervalMs = config.timing.autoPlayIntervalMs || 5000;

    autoPlayTimerRef.current = setInterval(() => {
      if (isHoveredRef.current || !isIntersectingRef.current || document.hidden) {
        return;
      }

      setActiveIndex((prev) => (prev + 1) % pillars.length);
      setMobileActiveIndex((prev) =>
        prev === null ? 0 : (prev + 1) % pillars.length
      );
    }, intervalMs);
  };

  useEffect(() => {
    measureHeight();

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReducedMotion) {
      resetAutoPlay();
    }

    // Observe when the section is in view to conserve power and pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !prefersReducedMotion) {
          resetAutoPlay();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    let resizeTimer: NodeJS.Timeout | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measureHeight, 150);
    };

    const handleVisibilityChange = () => {
      if (!document.hidden && isIntersectingRef.current && !prefersReducedMotion) {
        resetAutoPlay();
      }
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
      if (resizeTimer) clearTimeout(resizeTimer);
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [pillars.length]);

  const handleSelect = (idx: number) => {
    if (idx === activeIndex) return;
    setActiveIndex(idx);
    setMobileActiveIndex(idx);
    resetAutoPlay();
  };

  const handleMouseEnter = (idx: number) => {
    isHoveredRef.current = true;
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      handleSelect(idx);
    }, config.timing.hoverIntentDelayMs);
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, currentIdx: number) => {
    let nextIdx = -1;
    if (e.key === "ArrowDown") {
      nextIdx = (currentIdx + 1) % pillars.length;
    } else if (e.key === "ArrowUp") {
      nextIdx = (currentIdx - 1 + pillars.length) % pillars.length;
    } else if (e.key === "Home") {
      nextIdx = 0;
    } else if (e.key === "End") {
      nextIdx = pillars.length - 1;
    }

    if (nextIdx !== -1) {
      e.preventDefault();
      handleSelect(nextIdx);
      const listEl = listRef.current;
      if (listEl) {
        const nextButton = listEl.children[nextIdx]?.querySelector("button");
        nextButton?.focus();
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="pillars"
      data-theme="light"
      aria-label={config.intro.tag}
      className="relative w-full bg-[#e3ece7] text-[#12201b] py-[clamp(88px,10vw,160px)] px-6 sm:px-10 lg:px-16 min-[900px]:min-h-[100svh] min-[900px]:flex min-[900px]:flex-col min-[900px]:justify-center select-none"
    >
      <div className="max-w-[1400px] w-full mx-auto">
        {/* =========================================================================
            HEADER AT THE TOP (Full-width intro header with 20px tag gap)
            ========================================================================= */}
        <header className="mb-[clamp(56px,6vw,104px)]">
          {/* Tag */}
          <HeaderReveal delay={0} duration={800} mask={false} parallaxSpeed={10}>
            <div
              className="text-[12px] sm:text-[13px] font-semibold tracking-[0.16em] uppercase text-[#1f9d74] mb-5"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {config.intro.tag}
            </div>
          </HeaderReveal>

          {/* Heading (left 7fr) and Paragraph (right 5fr) on desktop; stacked on mobile */}
          <div className="grid grid-cols-1 min-[900px]:grid-cols-[7fr_5fr] gap-4 min-[900px]:gap-[4vw] items-end">
            <HeaderReveal delay={120} duration={950} parallaxSpeed={14}>
              <h2
                className="text-[clamp(2rem,3.6vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.01em] text-[#12201b] m-0"
                style={{ fontFamily: "var(--font-headline, serif)" }}
              >
                {config.intro.headline.before}
                <em className="not-italic text-[#f88404]">
                  {config.intro.headline.highlight}
                </em>
                {config.intro.headline.after}
              </h2>
            </HeaderReveal>

            <HeaderReveal delay={240} duration={950} mask={false} parallaxSpeed={12}>
              <p
                className="m-0 text-[#4a5d55] max-w-[46ch] text-[clamp(0.98rem,1.15vw,1.12rem)] leading-[1.6]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {config.intro.paragraph}
              </p>
            </HeaderReveal>
          </div>
        </header>

        {/* =========================================================================
            DESKTOP BODY (5fr List on Left, 7fr Canvas Stage on Right, 5vw Gap)
            ========================================================================= */}
        <div className="hidden min-[900px]:grid min-[900px]:grid-cols-[5fr_7fr] gap-[5vw] items-center">
          {/* Left Column: Interactive Pillars List (5fr) */}
          <div
            ref={listRef}
            onMouseLeave={handleMouseLeave}
            className="border-t border-[rgba(18,32,27,0.16)] flex flex-col"
            style={{
              minHeight: reservedListHeight ? `${reservedListHeight}px` : undefined,
            }}
          >
            {pillars.map((pillar, idx) => {
              const isActive = activeIndex === idx;

              return (
                <div
                  key={pillar.id}
                  onMouseEnter={() => handleMouseEnter(idx)}
                  className="group relative border-b border-[rgba(18,32,27,0.16)]"
                >
                  {/* Row Trigger Button with 28px (py-7) padding */}
                  <button
                    type="button"
                    onClick={() => handleSelect(idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    aria-expanded={isActive}
                    aria-controls={`pillar-panel-${pillar.id}`}
                    id={`pillar-btn-${pillar.id}`}
                    className={`w-full text-left grid grid-cols-[44px_1fr] gap-1.5 py-7 px-0 cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-[#1f9d74] focus-visible:outline-offset-2 rounded-sm transition-opacity duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive ? "opacity-100" : "opacity-45 hover:opacity-80"
                    }`}
                  >
                    <b
                      className="font-semibold text-[#f88404] text-[0.9rem] pt-[0.45em]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {pillar.number}
                    </b>
                    <h3
                      className="text-[clamp(1.15rem,1.7vw,1.7rem)] leading-[1.2] font-semibold text-[#12201b] m-0"
                      style={{ fontFamily: "var(--font-headline, serif)" }}
                    >
                      {pillar.title}
                    </h3>
                  </button>

                  {/* Accordion Reveal Panel */}
                  <div
                    id={`pillar-panel-${pillar.id}`}
                    role="region"
                    aria-labelledby={`pillar-btn-${pillar.id}`}
                    className={`grid transition-[grid-template-rows] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive
                        ? "grid-rows-[1fr] duration-[550ms]"
                        : "grid-rows-[0fr] duration-[350ms]"
                    }`}
                  >
                    <div className="overflow-hidden min-h-0 pl-[44px]">
                      <div
                        className={`pb-7 transition-all ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isActive
                            ? "opacity-100 translate-y-0 duration-[600ms] delay-[120ms]"
                            : "opacity-0 translate-y-3 duration-300 delay-0"
                        }`}
                      >
                        <p
                          className="m-0 text-[#4a5d55] text-[clamp(0.95rem,1.05vw,1.05rem)] leading-[1.65]"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {pillar.description}
                        </p>

                        {/* Chips */}
                        {pillar.chips.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {pillar.chips.map((chip, chipIdx) => (
                              <span
                                key={chip}
                                className={`inline-flex items-center px-3 py-1.5 rounded-full text-[0.8rem] bg-white/40 border border-[rgba(18,32,27,0.16)] text-[#12201b] font-medium transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                  isActive
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-2"
                                }`}
                                style={{
                                  fontFamily: "var(--font-body)",
                                  transitionDelay: isActive
                                    ? `${250 + chipIdx * 50}ms`
                                    : "0ms",
                                }}
                              >
                                {chip}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Desktop Morphing Particle Canvas Stage (7fr, Centered) */}
          <div className="w-full flex items-center justify-center">
            <PillarsDesktopStage
              activeShapeIndex={activeIndex}
              shapeMode={(config as any).shapeMode || (pillars.length === 4 ? "classic" : "funds")}
            />
          </div>
        </div>

        {/* =========================================================================
            MOBILE & TABLET BODY (under 900px: Interactive Accordion Dropdown)
            ========================================================================= */}
        <div className="block min-[900px]:hidden border-t border-[rgba(18,32,27,0.16)] divide-y divide-[rgba(18,32,27,0.16)] mt-2">
          {pillars.map((pillar, idx) => {
            const isMobileOpen = mobileActiveIndex === idx;

            return (
              <div key={pillar.id} className="flex flex-col">
                {/* Accordion Row Trigger Button with generous py-7 sm:py-8 padding */}
                <button
                  type="button"
                  onClick={() =>
                    setMobileActiveIndex(isMobileOpen ? null : idx)
                  }
                  aria-expanded={isMobileOpen}
                  aria-controls={`mobile-pillar-panel-${pillar.id}`}
                  className="w-full text-left flex items-center justify-between py-7 sm:py-8 cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-[#1f9d74] focus-visible:outline-offset-2 rounded-sm gap-3"
                >
                  {/* Left: Number + Title */}
                  <div className="flex items-baseline gap-3.5 text-left">
                    <b
                      className="font-semibold text-[#f88404] text-[0.95rem] shrink-0"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {pillar.number}
                    </b>
                    <h3
                      className="text-[1.3rem] sm:text-[1.45rem] leading-[1.3] font-semibold text-[#12201b] m-0 text-left"
                      style={{ fontFamily: "var(--font-headline, serif)" }}
                    >
                      {pillar.title}
                    </h3>
                  </div>

                  {/* Right: Smooth Rotating Dropdown Chevron */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-[rgba(18,32,27,0.16)] bg-white/40 text-[#12201b] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isMobileOpen ? "rotate-180 bg-[#1f9d74]/15 border-[#1f9d74]/40 text-[#1f9d74]" : "rotate-0"
                    }`}
                    aria-hidden="true"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {/* Dropdown Content Panel */}
                <div
                  id={`mobile-pillar-panel-${pillar.id}`}
                  role="region"
                  aria-labelledby={`mobile-pillar-btn-${pillar.id}`}
                  className={`grid transition-[grid-template-rows] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isMobileOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden min-h-0 pl-[38px] pr-1">
                    <div
                      className={`pt-1 pb-8 text-left flex flex-col items-start transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isMobileOpen
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2"
                      }`}
                    >
                      {/* Left-Aligned Description */}
                      <p
                        className="m-0 text-[#4a5d55] text-[1rem] leading-[1.68] text-left"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {pillar.description}
                      </p>

                      {/* Left-Aligned Chips */}
                      {pillar.chips.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3.5 justify-start">
                          {pillar.chips.map((chip) => (
                            <span
                              key={chip}
                              className="inline-flex items-center px-3 py-1.5 rounded-full text-[0.8rem] bg-white/40 border border-[rgba(18,32,27,0.16)] text-[#12201b] font-medium"
                              style={{ fontFamily: "var(--font-body)" }}
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Left-Aligned Mobile Dust Drawing */}
                      <div className="mt-3 w-full">
                        <DustCanvas
                          shape={pillar.shape}
                          shapeMode={(config as any).shapeMode || (pillars.length === 4 ? "classic" : "funds")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Embedded CSS for height measurement helper */}
      <style jsx>{`
        .no-transitions * {
          transition: none !important;
        }
        :global(.is-active-measure .pn) {
          grid-template-rows: 1fr !important;
        }
        :global(.is-active-measure .pc) {
          opacity: 1 !important;
          transform: none !important;
        }
      `}</style>
    </section>
  );
}
