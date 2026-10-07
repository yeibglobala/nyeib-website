"use client";

import React, { useEffect, useRef, useState } from "react";
import { IMPACT_CONFIG, ImpactStat } from "./config";
import { TickRing, TickRingHandle } from "./TickRing";
import { HeaderReveal } from "@/shared/components/HeaderReveal";

// Quad ease-out for natural, premium deceleration
function easeOutQuad(t: number): number {
  return 1 - (1 - t) * (1 - t);
}

// Format number according to stat configuration
function formatStatValue(stat: ImpactStat, progress: number): string {
  if (progress >= 1) return stat.numberDisplay;
  
  const eased = easeOutQuad(Math.min(1, Math.max(0, progress)));
  const val = stat.targetValue * eased;

  if (stat.decimals && stat.decimals > 0) {
    const formattedNum = val.toFixed(stat.decimals);
    return `${stat.prefix || ""}${formattedNum}${stat.suffix || ""}`;
  } else {
    const formattedNum = Math.round(val).toLocaleString("en-US");
    return `${stat.prefix || ""}${formattedNum}${stat.suffix || ""}`;
  }
}

export const ImpactSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<TickRingHandle>(null);
  
  // Direct DOM refs for 60/120fps non-react-render updates
  const numberTextRef = useRef<HTMLDivElement>(null);
  const labelTextRef = useRef<HTMLParagraphElement>(null);
  const descTextRef = useRef<HTMLParagraphElement>(null);
  const leftTagTextRef = useRef<HTMLSpanElement>(null);
  const mobileLeftTagRef = useRef<HTMLSpanElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const activeStatIndexRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const isIntersectingRef = useRef<boolean>(false);

  // Cached layout metrics
  const layoutMetrics = useRef({
    top: 0,
    height: 0,
    windowHeight: 0,
  });

  const stats = IMPACT_CONFIG.stats;
  const numStats = stats.length;

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);
    return () => mediaQuery.removeEventListener("change", handleMotionChange);
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;

    const measureLayout = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      layoutMetrics.current = {
        top: rect.top + scrollY,
        height: rect.height,
        windowHeight: window.innerHeight,
      };
    };

    measureLayout();
    window.addEventListener("resize", measureLayout, { passive: true });

    // Intersection Observer to sleep when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          updateAnimation();
        }
      },
      { rootMargin: "100px 0px 100px 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const updateAnimation = () => {
      if (!isIntersectingRef.current || !containerRef.current) return;

      const scrollY = window.scrollY || window.pageYOffset;
      const { top, height, windowHeight } = layoutMetrics.current;
      const maxScroll = height - windowHeight;

      if (maxScroll <= 0) return;

      // Overall progress through the pinned container [0, 1]
      const rawProgress = (scrollY - top) / maxScroll;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      // Calculate which stat is currently active
      const progressScaled = clampedProgress * numStats;
      const statIndex = Math.min(numStats - 1, Math.floor(progressScaled));
      const localProgress = progressScaled - statIndex; // [0, 1] for this stat

      const isLastStat = statIndex === numStats - 1;
      const currentStat = stats[statIndex];

      activeStatIndexRef.current = statIndex;

      // Sub-phases:
      // 0.00 to 0.70: fill ring clockwise + count up with smooth entry fade
      // 0.70 to 0.85: hold fully filled
      // 0.85 to 1.00: seamless cross-fade exit (keeps ring full, fades content softly)
      const fillThreshold = IMPACT_CONFIG.timing.fillFraction; // 0.70
      const holdThreshold = IMPACT_CONFIG.timing.holdFraction; // 0.85

      let ringFillRatio = 0;
      let countProgress = 0;
      let opacity = 1;
      let translateY = 0;

      if (isLastStat) {
        // Last stat holds until unpinned
        if (localProgress <= fillThreshold) {
          const norm = localProgress / fillThreshold;
          ringFillRatio = norm;
          countProgress = norm;
          // Soft entry fade-in during initial 12%
          if (localProgress < 0.12) {
            const entryRatio = localProgress / 0.12;
            opacity = entryRatio;
            translateY = 12 * (1 - entryRatio);
          } else {
            opacity = 1;
            translateY = 0;
          }
        } else {
          ringFillRatio = 1.0;
          countProgress = 1.0;
          opacity = 1;
          translateY = 0;
        }
      } else {
        if (localProgress <= fillThreshold) {
          // Fill & Count phase
          const norm = localProgress / fillThreshold;
          ringFillRatio = norm;
          countProgress = norm;

          // Soft entry fade-in during initial 12%
          if (localProgress < 0.12) {
            const entryRatio = localProgress / 0.12;
            opacity = entryRatio;
            translateY = 12 * (1 - entryRatio);
          } else {
            opacity = 1;
            translateY = 0;
          }
        } else if (localProgress <= holdThreshold) {
          // Hold phase: 100% full, static & stable
          ringFillRatio = 1.0;
          countProgress = 1.0;
          opacity = 1;
          translateY = 0;
        } else {
          // Seamless Exit phase: Keep ring full, fade out content gently upward
          const exitRatio = (localProgress - holdThreshold) / (1.0 - holdThreshold);
          ringFillRatio = 1.0; // Hold ring full, never unfill anti-clockwise
          countProgress = 1.0;
          opacity = Math.max(0, 1.0 - exitRatio * exitRatio);
          translateY = -16 * exitRatio;
        }
      }

      // 1. Update SVG Ring Ticks (Direct DOM)
      if (ringRef.current) {
        ringRef.current.updateFill(ringFillRatio);
      }

      // 2. Update Number, Label & Description (Direct DOM)
      if (numberTextRef.current) {
        numberTextRef.current.textContent = formatStatValue(currentStat, countProgress);
      }
      if (labelTextRef.current && labelTextRef.current.textContent !== currentStat.label) {
        labelTextRef.current.textContent = currentStat.label;
      }
      if (descTextRef.current && descTextRef.current.textContent !== currentStat.description) {
        descTextRef.current.textContent = currentStat.description;
      }

      // 3. Update Side Tags (Direct DOM)
      if (leftTagTextRef.current && leftTagTextRef.current.textContent !== currentStat.sideTag) {
        leftTagTextRef.current.textContent = currentStat.sideTag;
      }
      if (mobileLeftTagRef.current && mobileLeftTagRef.current.textContent !== currentStat.sideTag) {
        mobileLeftTagRef.current.textContent = currentStat.sideTag;
      }

      // 4. Update Exit / Slide Transform (Direct DOM)
      if (contentWrapperRef.current) {
        contentWrapperRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;
        contentWrapperRef.current.style.opacity = `${opacity}`;
      }
    };

    const onScroll = () => {
      if (animationFrameRef.current !== null) return;
      animationFrameRef.current = requestAnimationFrame(() => {
        updateAnimation();
        animationFrameRef.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial paint
    updateAnimation();

    return () => {
      window.removeEventListener("resize", measureLayout);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isReducedMotion, numStats, stats]);

  // If user prefers reduced motion, render stacked static view
  if (isReducedMotion) {
    return (
      <section
        id="impact"
        className="w-full bg-[#e3ece7] text-[#12201b] py-24 px-6 sm:px-12 relative"
        aria-label="Measurable Economic Impact Targets"
      >
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="text-center mb-16 max-w-3xl">
            <span className="text-[11px] font-semibold tracking-[0.22em] text-[#12201b]/60 uppercase mb-3 block">
              TARGET IMPACT
            </span>
            <h2
              className="text-[clamp(28px,3.2vw,48px)] font-normal leading-[1.15] text-[#12201b] tracking-tight"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              {IMPACT_CONFIG.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-[#f2fbf6] border border-[#12201b]/10 shadow-sm"
              >
                <div className="w-48 h-48 relative mb-6">
                  <TickRing initialFillRatio={1.0} maxFillFraction={stat.maxFillFraction || 1.0} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                    <span
                      className="text-[clamp(28px,3.5vw,40px)] font-normal text-[#12201b] tracking-tight leading-none mb-1"
                      style={{ fontFamily: "var(--font-headline)" }}
                    >
                      {stat.numberDisplay}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full text-[10px] font-bold tracking-[0.16em] uppercase mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#f88404] text-white shadow-sm">{stat.sideTag}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#f88404] text-white shadow-sm">{IMPACT_CONFIG.rightTag}</span>
                </div>
                <h3
                  className="text-[15px] font-semibold text-[#12201b] leading-snug mb-2"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {stat.label}
                </h3>
                <p
                  className="text-[13px] text-[#12201b]/70 leading-relaxed"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Pinned Interactive Scroll Experience
  return (
    <section
      ref={containerRef}
      id="impact"
      data-theme="light"
      className="relative w-full bg-[#e3ece7] text-[#12201b] selection:bg-[#2eb78c]/30"
      style={{
        height: `calc(${numStats} * 90svh + ${IMPACT_CONFIG.timing.endHoldSvh}svh)`,
      }}
      aria-label="Measurable Economic Impact Targets"
    >
      {/* Accessible semantic list for screen readers and SEO crawlers */}
      <ul className="sr-only">
        {stats.map((s) => (
          <li key={s.id}>
            {s.screenReaderText || `${s.numberDisplay} ${s.label}`} ({IMPACT_CONFIG.rightTag}) - {s.description}
          </li>
        ))}
      </ul>

      {/* Pinned Sticky Stage */}
      <div className="sticky top-0 h-screen h-[100svh] w-full flex flex-col items-center justify-between py-8 sm:py-12 md:py-14 px-6 sm:px-10 max-w-7xl mx-auto overflow-hidden pointer-events-none">
        {/* Top Header Area: Scrolls in naturally and remains cleanly centered */}
        <div className="w-full text-center flex flex-col items-center pt-2 sm:pt-4 z-10">
          <HeaderReveal delay={0} duration={800} mask={false}>
            <span
              className="text-[11px] sm:text-[12px] font-semibold tracking-[0.22em] text-[#12201b]/60 uppercase mb-2 sm:mb-3 block"
              style={{ fontFamily: "var(--font-body)" }}
            >
              TARGET IMPACT
            </span>
          </HeaderReveal>
          <HeaderReveal delay={120} duration={950}>
            <h2
              className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.18] text-[#12201b] tracking-tight max-w-3xl"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              {IMPACT_CONFIG.heading}
            </h2>
          </HeaderReveal>
        </div>

        {/* Center Stage: Radial Tick Ring + Flanking Side Tags + Count Center */}
        <div className="relative w-full flex-1 flex items-center justify-center my-auto">
          {/* Desktop Left Side Tag: Solid orange capsule badge with white text */}
          <div className="hidden min-[900px]:flex absolute left-2 xl:left-6 top-1/2 -translate-y-1/2 items-center z-10">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#f88404] shadow-[0_4px_14px_rgba(248,132,4,0.30)]">
              <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
              <span
                ref={leftTagTextRef}
                className="text-[12px] xl:text-[13px] font-bold tracking-[0.2em] text-white uppercase"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {stats[0].sideTag}
              </span>
            </div>
          </div>

          {/* Center Ring Container: Scaled for optimal proportion */}
          <div className="relative flex items-center justify-center w-[86vw] max-w-[440px] aspect-square min-[900px]:w-[min(76vh,49vw)] min-[900px]:max-w-[624px]">
            {/* SVG Radial Tick Ring */}
            <TickRing ref={ringRef} initialFillRatio={0} />

            {/* Inner Content: Dynamic Number + Label + Subtitle */}
            <div
              ref={contentWrapperRef}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 sm:p-10 pointer-events-none will-change-transform"
            >
              {/* Giant Number */}
              <div
                ref={numberTextRef}
                className="text-[clamp(44px,12vw,84px)] min-[900px]:text-[clamp(56px,7.5vw,112px)] font-normal leading-none tracking-tight text-[#12201b] mb-2.5 sm:mb-4 select-none"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                {stats[0].prefix}0
              </div>

              {/* Primary Stat Label */}
              <p
                ref={labelTextRef}
                className="text-[clamp(15px,1.6vw,22px)] font-semibold leading-[1.25] text-[#12201b] max-w-[300px] sm:max-w-[380px] select-none mb-1.5 sm:mb-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {stats[0].label}
              </p>

              {/* Subtitle / Explanatory Description */}
              <p
                ref={descTextRef}
                className="text-[clamp(11px,1.0vw,14px)] font-normal leading-relaxed text-[rgba(18,32,27,0.72)] max-w-[260px] sm:max-w-[340px] select-none"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {stats[0].description}
              </p>
            </div>
          </div>

          {/* Desktop Right Side Tag: Solid orange capsule badge with white text */}
          <div className="hidden min-[900px]:flex absolute right-2 xl:right-6 top-1/2 -translate-y-1/2 items-center z-10">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#f88404] shadow-[0_4px_14px_rgba(248,132,4,0.30)]">
              <span className="w-2 h-2 rounded-full border border-white/80 bg-transparent" />
              <span
                className="text-[12px] xl:text-[13px] font-bold tracking-[0.2em] text-white uppercase"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {IMPACT_CONFIG.rightTag}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet (<900px) Sub-Row: Solid orange capsule badges with white text */}
        <div className="flex min-[900px]:hidden w-full items-center justify-between px-2 pt-2 pb-4 z-10 gap-2">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f88404] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.7)]" />
            <span
              ref={mobileLeftTagRef}
              className="text-[11px] font-bold tracking-[0.16em] text-white uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {stats[0].sideTag}
            </span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f88404] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full border border-white/80 bg-transparent" />
            <span
              className="text-[11px] font-bold tracking-[0.16em] text-white uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {IMPACT_CONFIG.rightTag}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
