"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HeaderReveal } from "@/shared/components/HeaderReveal";

interface AudienceItem {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  ctaText: string;
  ctaHref: string;
}

const AUDIENCE_ITEMS: AudienceItem[] = [
  {
    id: "entrepreneurs",
    title: "Youth- and women-led businesses:",
    description:
      "We support growth-oriented businesses with access to capital, capacity-building support and wider ecosystem opportunities that can help them strengthen and scale.",
    imageSrc: "/images/youth-and-women-led.jpg",
    ctaText: "Apply for Funding",
    ctaHref: "/apply",
  },
  {
    id: "financial-institutions",
    title: "Banks and financial institutions:",
    description:
      "We work with commercial banks, microfinance institutions and development financiers through risk-sharing mechanisms designed to expand lending to eligible youth- and women-led enterprises.",
    imageSrc: "/images/banks-and-financial-institutions.jpg",
    ctaText: "Apply for Funding",
    ctaHref: "/apply",
  },
  {
    id: "investors-partners",
    title: "Institutional investors & partners:",
    description:
      "We provide institutional investors, development finance institutions, foundations and global partners with structured opportunities to co-invest alongside a professionally governed platform.",
    imageSrc: "/images/Institutional-investors-and-development-partners.jpg",
    ctaText: "Apply for Funding",
    ctaHref: "/apply",
  },
];

export function WhoWeServeTeaser() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);

  const prevIndex = (activeIndex - 1 + AUDIENCE_ITEMS.length) % AUDIENCE_ITEMS.length;
  const nextIndex = (activeIndex + 1) % AUDIENCE_ITEMS.length;
  const farPrevIndex = (activeIndex - 2 + AUDIENCE_ITEMS.length) % AUDIENCE_ITEMS.length;
  const farNextIndex = (activeIndex + 2) % AUDIENCE_ITEMS.length;

  const handleSelect = (index: number) => {
    setActiveIndex(index);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? AUDIENCE_ITEMS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === AUDIENCE_ITEMS.length - 1 ? 0 : prev + 1));
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Mouse drag handlers for desktop swipe
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const distance = dragStartX - e.clientX;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <section
      id="who-we-serve-teaser"
      aria-label="Who We Serve"
      className="relative w-full py-20 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 overflow-hidden flex flex-col items-center justify-center select-none"
      style={{
        background: "linear-gradient(180deg, #C2DFD4 0%, #E8EDE3 56%, #F8F7F3 100%)",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setIsDragging(false);
      }}
    >
      <style>{`
        @keyframes whoWeServeProgress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>

      {/* Background Soft Glow Accents */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.45)_0%,transparent_70%)] pointer-events-none blur-2xl"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1400px] w-full mx-auto flex flex-col items-center">
        {/* Header Block (Centered matching Figma) */}
        <div className="flex flex-col items-center text-center gap-3 sm:gap-4 max-w-2xl mb-12 sm:mb-16">
          <HeaderReveal delay={80} duration={900}>
            <h2
              className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-[#003124] tracking-tight leading-[1.1]"
              style={{ fontFamily: "var(--font-headline, serif)" }}
            >
              Who We Serve
            </h2>
          </HeaderReveal>

          <HeaderReveal delay={180} duration={900} mask={false}>
            <p
              className="text-base sm:text-lg lg:text-[19px] text-[#003124]/75 font-normal leading-relaxed max-w-xl"
              style={{ fontFamily: "var(--font-body, sans-serif)" }}
            >
              NYEIB works across the investment ecosystem, creating clear pathways for:
            </p>
          </HeaderReveal>
        </div>

        {/* Carousel Showcase Area with Flanking Vertical Pills and Guaranteed Breathing Space */}
        <div className="w-full flex items-center justify-center gap-2 sm:gap-4 md:gap-5 lg:gap-7 xl:gap-8 overflow-hidden px-1 sm:px-4 py-2">
          {/* =========================================================================
              LEFT FLANKING PREVIEW PILLS (Mobile Peek + Desktop Expanded)
              ========================================================================= */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 lg:gap-4 flex-shrink-0">
            {/* Far Left Outer Pill (Smallest - desktop only xl+) */}
            <button
              type="button"
              onClick={() => handleSelect(farPrevIndex)}
              aria-label={`Preview ${AUDIENCE_ITEMS[farPrevIndex].title}`}
              className="hidden xl:flex group relative w-[52px] h-[210px] bg-white rounded-[26px] p-2 shadow-[0_8px_24px_rgba(0,49,36,0.08)] overflow-hidden opacity-60 hover:opacity-100 hover:scale-105 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003124]"
            >
              <div className="relative w-full h-full rounded-[18px] overflow-hidden">
                <Image
                  src={AUDIENCE_ITEMS[farPrevIndex].imageSrc}
                  alt=""
                  fill
                  sizes="60px"
                  className="object-cover object-center grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-[#003124]/10 group-hover:bg-transparent transition-colors" />
              </div>
            </button>

            {/* Inner Left Pill (Visible on mobile peek as well) */}
            <button
              type="button"
              onClick={() => handleSelect(prevIndex)}
              aria-label={`Preview ${AUDIENCE_ITEMS[prevIndex].title}`}
              className="group relative w-[32px] sm:w-[48px] md:w-[68px] lg:w-[84px] h-[220px] sm:h-[280px] md:h-[320px] lg:h-[370px] bg-white rounded-[16px] sm:rounded-[22px] lg:rounded-[28px] p-1 sm:p-2 lg:p-2.5 shadow-[0_10px_30px_rgba(0,49,36,0.10)] overflow-hidden hover:scale-105 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003124]"
            >
              <div className="relative w-full h-full rounded-[12px] sm:rounded-[16px] lg:rounded-[20px] overflow-hidden">
                <Image
                  src={AUDIENCE_ITEMS[prevIndex].imageSrc}
                  alt=""
                  fill
                  sizes="100px"
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#003124]/10 via-transparent to-[#003124]/20 group-hover:opacity-0 transition-opacity" />
              </div>
            </button>
          </div>

          {/* =========================================================================
              MAIN FULL-CARD HORIZONTAL SWIPER TRACK WITH AMPLE BREATHING SPACE
              ========================================================================= */}
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className="relative z-20 w-full max-w-[calc(100vw-88px)] sm:max-w-[520px] md:max-w-[680px] lg:max-w-[890px] xl:max-w-[940px] flex-shrink overflow-hidden rounded-[24px] sm:rounded-[36px] lg:rounded-[44px] cursor-grab active:cursor-grabbing shadow-[0_20px_50px_rgba(0,49,36,0.10)]"
          >
            <div
              className="flex w-full"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
                transition: "transform 880ms cubic-bezier(0.22, 1.15, 0.36, 1)",
              }}
            >
              {AUDIENCE_ITEMS.map((item, idx) => {
                const isCurrent = activeIndex === idx;

                return (
                  <div
                    key={item.id}
                    className={`w-full flex-shrink-0 bg-white rounded-[24px] sm:rounded-[36px] lg:rounded-[44px] p-5 sm:p-8 lg:p-11 border border-white/80 flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-7 lg:gap-10 min-h-[420px] sm:min-h-[460px] lg:min-h-[510px] transition-all duration-700 ease-out ${
                      isCurrent ? "scale-100 opacity-100" : "scale-[0.96] opacity-75"
                    }`}
                  >
                    {/* Top on mobile / Left on Desktop: Content Side */}
                    <div className="w-full lg:w-1/2 flex flex-col items-start justify-between min-h-[180px] sm:min-h-[220px] lg:min-h-[420px] gap-4 sm:gap-6 py-1">
                      <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5">
                        <h3
                          className="text-xl sm:text-2xl lg:text-[34px] font-bold text-[#003124] leading-[1.2] tracking-tight"
                          style={{ fontFamily: "var(--font-headline, serif)" }}
                        >
                          {item.title}
                        </h3>

                        <p
                          className="text-[13.5px] sm:text-[15px] lg:text-[16.5px] text-[#003124]/75 font-normal leading-[1.6]"
                          style={{ fontFamily: "var(--font-body, sans-serif)" }}
                        >
                          {item.description}
                        </p>
                      </div>

                      {/* Pill Button CTA */}
                      <div className="pt-1 sm:pt-2">
                        <Link
                          href={item.ctaHref}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center justify-center px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#F88404] text-white font-bold text-xs sm:text-[14.5px] hover:bg-[#e07500] transition-all shadow-md active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F88404]"
                        >
                          {item.ctaText}
                        </Link>
                      </div>
                    </div>

                    {/* Bottom on mobile / Right on Desktop: Image Side */}
                    <div className="relative w-full lg:w-1/2 h-[200px] sm:h-[260px] lg:h-[430px] rounded-[18px] sm:rounded-[24px] lg:rounded-[32px] overflow-hidden bg-[#FAF7F2] shadow-inner flex-shrink-0">
                      <Image
                        src={item.imageSrc}
                        alt={item.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 460px"
                        className={`object-cover object-center pointer-events-none transition-transform duration-1000 ease-out ${
                          isCurrent ? "scale-100" : "scale-[1.06]"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =========================================================================
              RIGHT FLANKING PREVIEW PILLS (Mobile Peek + Desktop Expanded)
              ========================================================================= */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 lg:gap-4 flex-shrink-0">
            {/* Inner Right Pill (Visible on mobile peek as well) */}
            <button
              type="button"
              onClick={() => handleSelect(nextIndex)}
              aria-label={`Preview ${AUDIENCE_ITEMS[nextIndex].title}`}
              className="group relative w-[32px] sm:w-[48px] md:w-[68px] lg:w-[84px] h-[220px] sm:h-[280px] md:h-[320px] lg:h-[370px] bg-white rounded-[16px] sm:rounded-[22px] lg:rounded-[28px] p-1 sm:p-2 lg:p-2.5 shadow-[0_10px_30px_rgba(0,49,36,0.10)] overflow-hidden hover:scale-105 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003124]"
            >
              <div className="relative w-full h-full rounded-[12px] sm:rounded-[16px] lg:rounded-[20px] overflow-hidden">
                <Image
                  src={AUDIENCE_ITEMS[nextIndex].imageSrc}
                  alt=""
                  fill
                  sizes="100px"
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#003124]/10 via-transparent to-[#003124]/20 group-hover:opacity-0 transition-opacity" />
              </div>
            </button>

            {/* Far Right Outer Pill (Smallest - desktop only xl+) */}
            <button
              type="button"
              onClick={() => handleSelect(farNextIndex)}
              aria-label={`Preview ${AUDIENCE_ITEMS[farNextIndex].title}`}
              className="hidden xl:flex group relative w-[52px] h-[210px] bg-white rounded-[26px] p-2 shadow-[0_8px_24px_rgba(0,49,36,0.08)] overflow-hidden opacity-60 hover:opacity-100 hover:scale-105 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003124]"
            >
              <div className="relative w-full h-full rounded-[18px] overflow-hidden">
                <Image
                  src={AUDIENCE_ITEMS[farNextIndex].imageSrc}
                  alt=""
                  fill
                  sizes="60px"
                  className="object-cover object-center grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-[#003124]/10 group-hover:bg-transparent transition-colors" />
              </div>
            </button>
          </div>
        </div>

        {/* =========================================================================
            CAROUSEL PAGINATION INDICATOR WITH BRAND PROGRESS LOOP
            ========================================================================= */}
        <div
          className="flex items-center justify-center gap-2.5 mt-8 sm:mt-10 z-20"
          role="tablist"
          aria-label="Carousel pagination"
        >
          {AUDIENCE_ITEMS.map((item, idx) => {
            const isActive = activeIndex === idx;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(idx)}
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to slide ${idx + 1}: ${item.title}`}
                className={`relative transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003124] ${
                  isActive
                    ? "w-9 sm:w-12 h-2.5 rounded-full bg-[#003124]/15 overflow-hidden"
                    : "w-2.5 h-2.5 rounded-full bg-[#003124]/20 hover:bg-[#003124]/40"
                }`}
              >
                {isActive && (
                  <span
                    key={`progress-indicator-${activeIndex}`}
                    onAnimationEnd={handleNext}
                    className="absolute inset-y-0 left-0 bg-[#003124] rounded-full"
                    style={{
                      animation: "whoWeServeProgress 5.5s linear forwards",
                      animationPlayState: isPaused ? "paused" : "running",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
