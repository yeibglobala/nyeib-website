"use client";

import React, { useState } from "react";
import { HeaderReveal } from "@/shared/components/HeaderReveal";

export function ImpactTargetsBentoSection() {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const canHover = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const handleCardToggle = (id: string) => {
    setActiveCardId((current) => (current === id ? null : id));
  };

  const handleCardMouseEnter = (id: string) => {
    if (canHover()) {
      setActiveCardId(id);
    }
  };

  const handleCardMouseLeave = () => {
    if (canHover()) {
      setActiveCardId(null);
    }
  };

  const handleCardKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardToggle(id);
    }
  };

  return (
    <section
      id="twenty-year-targets"
      aria-label="Our 20-Year Targets - Measuring the outcomes that matter"
      className="relative w-full bg-[#003124] text-[#eef6f2] py-20 sm:py-28 lg:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-[rgba(238,246,242,0.08)] select-none"
    >
      {/* Background Ambient Glow Accents */}
      <div
        className="pointer-events-none absolute -top-40 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,190,147,0.12)_0%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(248,132,4,0.08)_0%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] w-full mx-auto relative z-10 flex flex-col">
        {/* =========================================================================
            HEADER BLOCK
            ========================================================================= */}
        <div className="flex flex-col space-y-4 sm:space-y-5 max-w-3xl mb-12 sm:mb-16">
          {/* Eyebrow Tag */}
          <HeaderReveal delay={0} duration={800} mask={false}>
            <span
              className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-[#F88404] block"
              style={{ fontFamily: "var(--font-body, sans-serif)" }}
            >
              Our 20-Year Targets
            </span>
          </HeaderReveal>

          {/* Headline */}
          <HeaderReveal delay={80} duration={900}>
            <h2
              className="text-3xl sm:text-4xl lg:text-[50px] font-bold text-white tracking-tight leading-[1.12]"
              style={{ fontFamily: "var(--font-headline, serif)" }}
            >
              Measuring the outcomes that matter.
            </h2>
          </HeaderReveal>

          {/* Subtext */}
          <HeaderReveal delay={160} duration={900} mask={false}>
            <p
              className="text-base sm:text-lg lg:text-[19px] text-[#a9c2b8] font-normal leading-relaxed"
              style={{ fontFamily: "var(--font-body, sans-serif)" }}
            >
              Over the 20-year life of the Funds, NYEIB is targeting measurable outcomes across business support, job creation, gender inclusion and ecosystem development.
            </p>
          </HeaderReveal>
        </div>

        {/* =========================================================================
            SOVEREIGN BENTO GRID - WHITE CARDS WITH CURVED SWEEP FILL REVEAL
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7 w-full">
          {/* -----------------------------------------------------------------------
              BENTO CARD 1: Jobs Created (Spans 7 Cols)
              ----------------------------------------------------------------------- */}
          <article
            tabIndex={0}
            role="button"
            aria-label="Jobs Created"
            aria-expanded={activeCardId === "jobs"}
            onClick={() => handleCardToggle("jobs")}
            onKeyDown={(e) => handleCardKeyDown(e, "jobs")}
            onMouseEnter={() => handleCardMouseEnter("jobs")}
            onMouseLeave={handleCardMouseLeave}
            className={`lg:col-span-7 group relative rounded-[28px] sm:rounded-[32px] overflow-hidden bg-white border border-[#003124]/12 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-between min-h-[380px] sm:min-h-[420px] lg:min-h-[440px] cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BE93] ${
              activeCardId === "jobs"
                ? "shadow-[0_24px_54px_rgba(0,49,36,0.18)] -translate-y-2 border-[#00BE93]"
                : "shadow-[0_10px_32px_rgba(0,49,36,0.08)] [@media(hover:hover)]:hover:shadow-[0_24px_54px_rgba(0,49,36,0.18)] [@media(hover:hover)]:hover:-translate-y-2 [@media(hover:hover)]:hover:border-[#00BE93]"
            }`}
          >
            {/* TOP ZONE: Bigger Title and Sub-title */}
            <div
              className={`relative z-10 p-8 sm:p-10 lg:p-12 pb-4 flex flex-col gap-3 transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                activeCardId === "jobs"
                  ? "-translate-y-1"
                  : "[@media(hover:hover)]:group-hover:-translate-y-1"
              }`}
            >
              <h3
                className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#003124] tracking-tight leading-[1.12]"
                style={{ fontFamily: "var(--font-headline, serif)" }}
              >
                Jobs Created
              </h3>
              <p
                className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#00875A] tracking-tight leading-snug"
                style={{ fontFamily: "var(--font-headline, serif)" }}
              >
                ~1.6 million direct and indirect jobs
              </p>
            </div>

            {/* REST STATE BOTTOM HINT: Hover or tap to reveal */}
            <div
              className={`relative z-10 px-8 sm:px-10 lg:px-12 pb-8 flex items-center justify-end w-full transition-opacity duration-300 pointer-events-none ${
                activeCardId === "jobs"
                  ? "opacity-0"
                  : "opacity-100 [@media(hover:hover)]:group-hover:opacity-0"
              }`}
            >
              <span
                className="text-[12px] sm:text-[13px] font-medium text-[#003124]/50 tracking-normal"
                style={{ fontFamily: "var(--font-body, sans-serif)" }}
              >
                Hover or tap to reveal
              </span>
            </div>

            {/* CURVED SWEEP FILL LAYER: Rises from bottom and holds revealed content */}
            <div
              aria-hidden={activeCardId !== "jobs"}
              className={`absolute bottom-0 left-0 right-0 h-[64%] z-20 transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform pointer-events-none ${
                activeCardId === "jobs"
                  ? "translate-y-0"
                  : "translate-y-[103%] [@media(hover:hover)]:group-hover:translate-y-0"
              }`}
            >
              {/* Curved Top SVG Path (Mint Leaf #00BE93 Fill) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 400 240"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 0,26 C 120,4 280,4 400,26 L 400,240 L 0,240 Z"
                  fill="#00BE93"
                />
              </svg>

              {/* Content Resting on the Curved Sweep Fill */}
              <div className="relative h-full w-full px-8 pb-8 pt-12 sm:px-10 sm:pb-10 sm:pt-14 lg:px-12 flex flex-col justify-between z-10 pointer-events-auto">
                {/* Description in Evergreen #003124 */}
                <div
                  className={`transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    activeCardId === "jobs"
                      ? "opacity-100 translate-y-0 delay-[200ms]"
                      : "opacity-0 translate-y-2 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:delay-[200ms]"
                  }`}
                >
                  <p
                    className="text-[14.5px] sm:text-[16px] font-medium leading-[1.6] text-[#003124] m-0"
                    style={{ fontFamily: "var(--font-body, sans-serif)" }}
                  >
                    Targeted over the 20-year life of the Funds, including approximately 166,000 direct jobs and 1.44 million indirect jobs.
                  </p>
                </div>

                {/* Breakdown Bar resting on the sweep */}
                <div
                  className={`pt-3 border-t border-[#003124]/20 flex flex-col gap-2.5 transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    activeCardId === "jobs"
                      ? "opacity-100 translate-y-0 delay-[280ms]"
                      : "opacity-0 translate-y-2 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:delay-[280ms]"
                  }`}
                >
                  <div className="w-full h-3 rounded-full bg-[#003124]/15 overflow-hidden flex shadow-inner">
                    <div
                      className="h-full bg-[#003124] rounded-l-full transition-all duration-1000"
                      style={{ width: "10.4%" }}
                      title="Direct Jobs: ~166,000 (10.4%)"
                    />
                    <div
                      className="h-full bg-white/90 rounded-r-full flex-1"
                      title="Indirect Jobs: ~1.44 million (89.6%)"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#003124] flex-wrap gap-2 font-medium">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#003124]" />
                      <span>Direct Jobs: <strong>~166,000</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-white" />
                      <span>Indirect Jobs: <strong>~1.44 million</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* -----------------------------------------------------------------------
              BENTO CARD 2: Businesses Supported (Spans 5 Cols)
              ----------------------------------------------------------------------- */}
          <article
            tabIndex={0}
            role="button"
            aria-label="Businesses Supported"
            aria-expanded={activeCardId === "biz"}
            onClick={() => handleCardToggle("biz")}
            onKeyDown={(e) => handleCardKeyDown(e, "biz")}
            onMouseEnter={() => handleCardMouseEnter("biz")}
            onMouseLeave={handleCardMouseLeave}
            className={`lg:col-span-5 group relative rounded-[28px] sm:rounded-[32px] overflow-hidden bg-white border border-[#003124]/12 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-between min-h-[380px] sm:min-h-[420px] lg:min-h-[440px] cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F88404] ${
              activeCardId === "biz"
                ? "shadow-[0_24px_54px_rgba(248,132,4,0.18)] -translate-y-2 border-[#F88404]"
                : "shadow-[0_10px_32px_rgba(0,49,36,0.08)] [@media(hover:hover)]:hover:shadow-[0_24px_54px_rgba(248,132,4,0.18)] [@media(hover:hover)]:hover:-translate-y-2 [@media(hover:hover)]:hover:border-[#F88404]"
            }`}
          >
            {/* TOP ZONE: Bigger Title and Sub-title */}
            <div
              className={`relative z-10 p-8 sm:p-10 lg:p-12 pb-4 flex flex-col gap-3 transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                activeCardId === "biz"
                  ? "-translate-y-1"
                  : "[@media(hover:hover)]:group-hover:-translate-y-1"
              }`}
            >
              <h3
                className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#003124] tracking-tight leading-[1.12]"
                style={{ fontFamily: "var(--font-headline, serif)" }}
              >
                Businesses Supported
              </h3>
              <p
                className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#D97706] tracking-tight leading-snug"
                style={{ fontFamily: "var(--font-headline, serif)" }}
              >
                ~38,400 businesses supported
              </p>
            </div>

            {/* REST STATE BOTTOM HINT: Hover or tap to reveal */}
            <div
              className={`relative z-10 px-8 sm:px-10 lg:px-12 pb-8 flex items-center justify-end w-full transition-opacity duration-300 pointer-events-none ${
                activeCardId === "biz"
                  ? "opacity-0"
                  : "opacity-100 [@media(hover:hover)]:group-hover:opacity-0"
              }`}
            >
              <span
                className="text-[12px] sm:text-[13px] font-medium text-[#003124]/50 tracking-normal"
                style={{ fontFamily: "var(--font-body, sans-serif)" }}
              >
                Hover or tap to reveal
              </span>
            </div>

            {/* CURVED SWEEP FILL LAYER: Tiger Orange #F88404 */}
            <div
              aria-hidden={activeCardId !== "biz"}
              className={`absolute bottom-0 left-0 right-0 h-[64%] z-20 transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform pointer-events-none ${
                activeCardId === "biz"
                  ? "translate-y-0"
                  : "translate-y-[103%] [@media(hover:hover)]:group-hover:translate-y-0"
              }`}
            >
              {/* Curved Top SVG Path (Tiger Orange #F88404 Fill) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 400 240"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 0,26 C 120,4 280,4 400,26 L 400,240 L 0,240 Z"
                  fill="#F88404"
                />
              </svg>

              {/* Content Resting on the Curved Sweep Fill */}
              <div className="relative h-full w-full px-8 pb-8 pt-12 sm:px-10 sm:pb-10 sm:pt-14 lg:px-12 flex flex-col justify-between z-10 pointer-events-auto">
                <div
                  className={`transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    activeCardId === "biz"
                      ? "opacity-100 translate-y-0 delay-[200ms]"
                      : "opacity-0 translate-y-2 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:delay-[200ms]"
                  }`}
                >
                  <p
                    className="text-[14.5px] sm:text-[16px] font-medium leading-[1.6] text-[#00241A] m-0"
                    style={{ fontFamily: "var(--font-body, sans-serif)" }}
                  >
                    Expand financial and non-financial support to growth-oriented youth- and women-led businesses across Nigeria.
                  </p>
                </div>

                {/* Accent Indicator resting on the sweep */}
                <div
                  className={`pt-3 border-t border-[#00241A]/20 transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    activeCardId === "biz"
                      ? "opacity-100 translate-y-0 delay-[280ms]"
                      : "opacity-0 translate-y-2 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:delay-[280ms]"
                  }`}
                >
                  <div className="w-full h-2 rounded-full bg-[#00241A]/15 overflow-hidden">
                    <div
                      className="h-full bg-[#00241A] rounded-full transition-all duration-1000"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* -----------------------------------------------------------------------
              BENTO CARD 3: Ecosystem Support Organisations (Spans 5 Cols)
              ----------------------------------------------------------------------- */}
          <article
            tabIndex={0}
            role="button"
            aria-label="Ecosystem Support Organisations"
            aria-expanded={activeCardId === "eco"}
            onClick={() => handleCardToggle("eco")}
            onKeyDown={(e) => handleCardKeyDown(e, "eco")}
            onMouseEnter={() => handleCardMouseEnter("eco")}
            onMouseLeave={handleCardMouseLeave}
            className={`lg:col-span-5 group relative rounded-[28px] sm:rounded-[32px] overflow-hidden bg-white border border-[#003124]/12 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-between min-h-[380px] sm:min-h-[420px] lg:min-h-[440px] cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BE93] ${
              activeCardId === "eco"
                ? "shadow-[0_24px_54px_rgba(0,49,36,0.18)] -translate-y-2 border-[#00BE93]"
                : "shadow-[0_10px_32px_rgba(0,49,36,0.08)] [@media(hover:hover)]:hover:shadow-[0_24px_54px_rgba(0,49,36,0.18)] [@media(hover:hover)]:hover:-translate-y-2 [@media(hover:hover)]:hover:border-[#00BE93]"
            }`}
          >
            {/* TOP ZONE: Bigger Title and Sub-title */}
            <div
              className={`relative z-10 p-8 sm:p-10 lg:p-12 pb-4 flex flex-col gap-3 transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                activeCardId === "eco"
                  ? "-translate-y-1"
                  : "[@media(hover:hover)]:group-hover:-translate-y-1"
              }`}
            >
              <h3
                className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#003124] tracking-tight leading-[1.12]"
                style={{ fontFamily: "var(--font-headline, serif)" }}
              >
                Ecosystem Support Organisations
              </h3>
              <p
                className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#00875A] tracking-tight leading-snug"
                style={{ fontFamily: "var(--font-headline, serif)" }}
              >
                118 ecosystem support organisations mobilised
              </p>
            </div>

            {/* REST STATE BOTTOM HINT: Hover or tap to reveal */}
            <div
              className={`relative z-10 px-8 sm:px-10 lg:px-12 pb-8 flex items-center justify-end w-full transition-opacity duration-300 pointer-events-none ${
                activeCardId === "eco"
                  ? "opacity-0"
                  : "opacity-100 [@media(hover:hover)]:group-hover:opacity-0"
              }`}
            >
              <span
                className="text-[12px] sm:text-[13px] font-medium text-[#003124]/50 tracking-normal"
                style={{ fontFamily: "var(--font-body, sans-serif)" }}
              >
                Hover or tap to reveal
              </span>
            </div>

            {/* CURVED SWEEP FILL LAYER: Mint Leaf #00BE93 */}
            <div
              aria-hidden={activeCardId !== "eco"}
              className={`absolute bottom-0 left-0 right-0 h-[64%] z-20 transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform pointer-events-none ${
                activeCardId === "eco"
                  ? "translate-y-0"
                  : "translate-y-[103%] [@media(hover:hover)]:group-hover:translate-y-0"
              }`}
            >
              {/* Curved Top SVG Path (Mint Leaf #00BE93 Fill) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 400 240"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 0,26 C 120,4 280,4 400,26 L 400,240 L 0,240 Z"
                  fill="#00BE93"
                />
              </svg>

              {/* Content Resting on the Curved Sweep Fill */}
              <div className="relative h-full w-full px-8 pb-8 pt-12 sm:px-10 sm:pb-10 sm:pt-14 lg:px-12 flex flex-col justify-between z-10 pointer-events-auto">
                <div
                  className={`transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    activeCardId === "eco"
                      ? "opacity-100 translate-y-0 delay-[200ms]"
                      : "opacity-0 translate-y-2 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:delay-[200ms]"
                  }`}
                >
                  <p
                    className="text-[14.5px] sm:text-[16px] font-medium leading-[1.6] text-[#003124] m-0"
                    style={{ fontFamily: "var(--font-body, sans-serif)" }}
                  >
                    Strengthen organisations that provide business development, capacity-building and other services to MSMEs.
                  </p>
                </div>

                {/* Accent Indicator resting on the sweep */}
                <div
                  className={`pt-3 border-t border-[#003124]/20 transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    activeCardId === "eco"
                      ? "opacity-100 translate-y-0 delay-[280ms]"
                      : "opacity-0 translate-y-2 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:delay-[280ms]"
                  }`}
                >
                  <div className="w-full h-2 rounded-full bg-[#003124]/15 overflow-hidden">
                    <div
                      className="h-full bg-[#003124] rounded-full transition-all duration-1000"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* -----------------------------------------------------------------------
              BENTO CARD 4: Gender Parity (Spans 7 Cols)
              ----------------------------------------------------------------------- */}
          <article
            tabIndex={0}
            role="button"
            aria-label="Gender Parity"
            aria-expanded={activeCardId === "gender"}
            onClick={() => handleCardToggle("gender")}
            onKeyDown={(e) => handleCardKeyDown(e, "gender")}
            onMouseEnter={() => handleCardMouseEnter("gender")}
            onMouseLeave={handleCardMouseLeave}
            className={`lg:col-span-7 group relative rounded-[28px] sm:rounded-[32px] overflow-hidden bg-white border border-[#003124]/12 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-between min-h-[380px] sm:min-h-[420px] lg:min-h-[440px] cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BE93] ${
              activeCardId === "gender"
                ? "shadow-[0_24px_54px_rgba(0,49,36,0.18)] -translate-y-2 border-[#00BE93]"
                : "shadow-[0_10px_32px_rgba(0,49,36,0.08)] [@media(hover:hover)]:hover:shadow-[0_24px_54px_rgba(0,49,36,0.18)] [@media(hover:hover)]:hover:-translate-y-2 [@media(hover:hover)]:hover:border-[#00BE93]"
            }`}
          >
            {/* TOP ZONE: Bigger Title and Sub-title */}
            <div
              className={`relative z-10 p-8 sm:p-10 lg:p-12 pb-4 flex flex-col gap-3 transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                activeCardId === "gender"
                  ? "-translate-y-1"
                  : "[@media(hover:hover)]:group-hover:-translate-y-1"
              }`}
            >
              <h3
                className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#003124] tracking-tight leading-[1.12]"
                style={{ fontFamily: "var(--font-headline, serif)" }}
              >
                Gender Parity
              </h3>
              <p
                className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#00875A] tracking-tight leading-snug"
                style={{ fontFamily: "var(--font-headline, serif)" }}
              >
                Gender parity by Year 5
              </p>
            </div>

            {/* REST STATE BOTTOM HINT: Hover or tap to reveal */}
            <div
              className={`relative z-10 px-8 sm:px-10 lg:px-12 pb-8 flex items-center justify-end w-full transition-opacity duration-300 pointer-events-none ${
                activeCardId === "gender"
                  ? "opacity-0"
                  : "opacity-100 [@media(hover:hover)]:group-hover:opacity-0"
              }`}
            >
              <span
                className="text-[12px] sm:text-[13px] font-medium text-[#003124]/50 tracking-normal"
                style={{ fontFamily: "var(--font-body, sans-serif)" }}
              >
                Hover or tap to reveal
              </span>
            </div>

            {/* CURVED SWEEP FILL LAYER: Mint Leaf #00BE93 */}
            <div
              aria-hidden={activeCardId !== "gender"}
              className={`absolute bottom-0 left-0 right-0 h-[64%] z-20 transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform pointer-events-none ${
                activeCardId === "gender"
                  ? "translate-y-0"
                  : "translate-y-[103%] [@media(hover:hover)]:group-hover:translate-y-0"
              }`}
            >
              {/* Curved Top SVG Path (Mint Leaf #00BE93 Fill) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 400 240"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 0,26 C 120,4 280,4 400,26 L 400,240 L 0,240 Z"
                  fill="#00BE93"
                />
              </svg>

              {/* Content Resting on the Curved Sweep Fill */}
              <div className="relative h-full w-full px-8 pb-8 pt-12 sm:px-10 sm:pb-10 sm:pt-14 lg:px-12 flex flex-col justify-between z-10 pointer-events-auto">
                <div
                  className={`transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    activeCardId === "gender"
                      ? "opacity-100 translate-y-0 delay-[200ms]"
                      : "opacity-0 translate-y-2 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:delay-[200ms]"
                  }`}
                >
                  <p
                    className="text-[14.5px] sm:text-[16px] font-medium leading-[1.6] text-[#003124] m-0"
                    style={{ fontFamily: "var(--font-body, sans-serif)" }}
                  >
                    We aim to achieve gender parity as part of our commitment to stronger gender integration across the Funds.
                  </p>
                </div>

                {/* 5-Year Timeline Progress Bar resting on the sweep */}
                <div
                  className={`pt-3 border-t border-[#003124]/20 flex flex-col gap-2.5 transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    activeCardId === "gender"
                      ? "opacity-100 translate-y-0 delay-[280ms]"
                      : "opacity-0 translate-y-2 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:delay-[280ms]"
                  }`}
                >
                  <div className="w-full h-3 rounded-full bg-[#003124]/15 overflow-hidden relative shadow-inner">
                    <div
                      className="h-full bg-[#003124] rounded-full transition-all duration-1000"
                      style={{ width: "100%" }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#003124] flex-wrap gap-2 font-medium">
                    <span>Year 1: Initiation</span>
                    <span>Year 3: Expansion</span>
                    <span className="font-bold">Year 5: 50% Gender Parity Target</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
