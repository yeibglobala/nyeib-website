"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

// Track of 11 stable items (3 repeating cycles: 0..10)
// Center starts at index 3 (item 0). When index >= 6, resets seamlessly to index - 3 at rest.
const TRACK_INDICES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const AUTO_PLAY_DELAY = 6000;

export function WhoWeServeTeaser() {
  const [centerIndex, setCenterIndex] = useState<number>(3);
  const [disableTransition, setDisableTransition] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Dragging state
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const didDragMoveRef = useRef<boolean>(false);
  const isTransitioningRef = useRef<boolean>(false);

  // Mathematical active audience index (0, 1, or 2)
  const activeIndex =
    ((centerIndex % AUDIENCE_ITEMS.length) + AUDIENCE_ITEMS.length) %
    AUDIENCE_ITEMS.length;

  // Smooth continuous transition in direction (1 = Next, -1 = Prev)
  const triggerTransition = useCallback((direction: 1 | -1) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    setCenterIndex((prev) => prev + direction);

    // After animation completes (680ms), re-normalize centerIndex silently if needed
    setTimeout(() => {
      setCenterIndex((current) => {
        let normalized = current;
        if (current >= 6) {
          normalized = current - 3;
        } else if (current <= 2) {
          normalized = current + 3;
        }

        if (normalized !== current) {
          setDisableTransition(true);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setDisableTransition(false);
              isTransitioningRef.current = false;
            });
          });
          return normalized;
        } else {
          isTransitioningRef.current = false;
          return current;
        }
      });
    }, 690);
  }, []);

  const handleNext = useCallback(() => {
    triggerTransition(1);
  }, [triggerTransition]);

  const handlePrev = useCallback(() => {
    triggerTransition(-1);
  }, [triggerTransition]);

  // Robust Auto-Play Loop with interval
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, AUTO_PLAY_DELAY);

    return () => clearInterval(timer);
  }, [isPaused, handleNext, centerIndex]);

  // Direct card interaction
  const handleCardClick = (offset: number) => {
    if (didDragMoveRef.current || isTransitioningRef.current) return;
    if (offset === 1 || offset === 2) {
      handleNext();
    } else if (offset === -1 || offset === -2) {
      handlePrev();
    }
  };

  // Pagination dot click (picks shortest continuous directional flow)
  const handleDotClick = (targetIdx: number) => {
    if (isTransitioningRef.current || targetIdx === activeIndex) return;
    const forwardSteps =
      (targetIdx - activeIndex + AUDIENCE_ITEMS.length) %
      AUDIENCE_ITEMS.length;
    if (forwardSteps === 1) {
      handleNext();
    } else {
      handlePrev();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (
        activeEl?.tagName === "INPUT" ||
        activeEl?.tagName === "TEXTAREA"
      )
        return;
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isTransitioningRef.current) return;
    if ((e.target as HTMLElement).closest("a, button")) return;
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    didDragMoveRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartXRef.current;
    if (Math.abs(deltaX) > 6) {
      didDragMoveRef.current = true;
    }
    setDragOffset(deltaX * 0.35);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const currentDrag = dragOffset;
    setDragOffset(0);

    if (currentDrag < -28) {
      handleNext();
    } else if (currentDrag > 28) {
      handlePrev();
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragOffset(0);
    }
    setIsPaused(false);
  };

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isTransitioningRef.current) return;
    if ((e.target as HTMLElement).closest("a, button")) return;
    setIsDragging(true);
    dragStartXRef.current = e.touches[0].clientX;
    didDragMoveRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - dragStartXRef.current;
    if (Math.abs(deltaX) > 6) {
      didDragMoveRef.current = true;
    }
    setDragOffset(deltaX * 0.35);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const currentDrag = dragOffset;
    setDragOffset(0);

    if (currentDrag < -28) {
      handleNext();
    } else if (currentDrag > 28) {
      handlePrev();
    }
  };

  // Style helper based on distance from centerIndex
  const getCardStyles = (offset: number) => {
    if (offset === 0) {
      // EXPANDED CENTER ACTIVE CARD
      return {
        wrapper:
          "w-[calc(100vw-56px)] sm:w-[540px] md:w-[680px] lg:w-[890px] xl:w-[940px] " +
          "min-h-[460px] sm:min-h-[500px] lg:min-h-[510px] " +
          "rounded-[24px] sm:rounded-[36px] lg:rounded-[44px] " +
          "p-5 sm:p-7 md:p-8 lg:p-10 xl:p-11 " +
          "mx-1 sm:mx-2.5 lg:mx-4 " +
          "shadow-[0_22px_55px_rgba(0,49,36,0.12)] " +
          "border border-white/85 bg-white " +
          "opacity-100 z-20 cursor-grab active:cursor-grabbing",
        cardLayout:
          "flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6 lg:gap-8 xl:gap-10",
        content:
          "w-full lg:w-1/2 flex flex-col items-start justify-between min-h-[160px] sm:min-h-[180px] lg:min-h-[420px] opacity-100 pointer-events-auto",
        image:
          "w-full lg:w-1/2 h-[200px] sm:h-[240px] md:h-[260px] lg:h-[430px] " +
          "rounded-[18px] sm:rounded-[24px] lg:rounded-[32px] overflow-hidden bg-[#FAF7F2] shadow-inner flex-shrink-0",
        cue: "hidden",
        pillOverlay: "opacity-0",
        isInteractivePill: false,
      };
    } else if (offset === -1 || offset === 1) {
      // INNER FLANKING PILLS
      return {
        wrapper:
          "w-[34px] sm:w-[48px] md:w-[68px] lg:w-[84px] " +
          "h-[220px] sm:h-[280px] md:h-[320px] lg:h-[370px] " +
          "rounded-[16px] sm:rounded-[22px] lg:rounded-[28px] " +
          "p-1 sm:p-2 lg:p-2.5 " +
          "mx-1 sm:mx-2 lg:mx-3 " +
          "shadow-[0_10px_30px_rgba(0,49,36,0.10)] " +
          "border border-transparent bg-white " +
          "opacity-100 z-10 cursor-pointer hover:scale-105 hover:shadow-[0_14px_36px_rgba(0,49,36,0.15)] active:scale-95",
        cardLayout: "flex items-center justify-center",
        content: "hidden w-0 max-w-0 opacity-0 pointer-events-none p-0 m-0",
        image:
          "w-full h-full rounded-[12px] sm:rounded-[16px] lg:rounded-[20px] overflow-hidden flex-shrink-0",
        cue: "flex",
        pillOverlay: "opacity-100",
        isInteractivePill: true,
      };
    } else if (offset === -2 || offset === 2) {
      // FAR OUTER PILLS (xl screens only)
      return {
        wrapper:
          "w-0 xl:w-[52px] h-[210px] " +
          "rounded-[26px] p-0 xl:p-2 " +
          "mx-0 xl:mx-2 " +
          "shadow-[0_8px_24px_rgba(0,49,36,0.08)] " +
          "border border-transparent bg-white " +
          "opacity-0 xl:opacity-60 hover:opacity-100 hover:scale-105 active:scale-95 " +
          "z-0 cursor-pointer",
        cardLayout: "flex items-center justify-center",
        content: "hidden w-0 max-w-0 opacity-0 pointer-events-none p-0 m-0",
        image:
          "w-full h-full rounded-[18px] overflow-hidden flex-shrink-0",
        cue: "hidden",
        pillOverlay: "opacity-100",
        isInteractivePill: true,
      };
    } else {
      // BUFFER OFFSCREEN CARDS (Zero width, hidden)
      return {
        wrapper:
          "w-0 h-[210px] p-0 mx-0 opacity-0 pointer-events-none overflow-hidden border-0",
        cardLayout: "hidden",
        content: "hidden w-0 max-w-0 opacity-0 pointer-events-none p-0 m-0",
        image: "w-0 h-0 overflow-hidden flex-shrink-0",
        cue: "hidden",
        pillOverlay: "opacity-0",
        isInteractivePill: false,
      };
    }
  };

  return (
    <section
      id="who-we-serve-teaser"
      aria-label="Who We Serve"
      className="relative w-full py-20 sm:py-24 lg:py-28 px-2 sm:px-6 lg:px-12 overflow-hidden flex flex-col items-center justify-center select-none"
      style={{
        background:
          "linear-gradient(180deg, #C2DFD4 0%, #E8EDE3 56%, #F8F7F3 100%)",
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
        <div className="flex flex-col items-center text-center gap-3 sm:gap-4 max-w-2xl mb-10 sm:mb-14">
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

        {/* =========================================================================
            CONTINUOUS LINEAR EXPAND-AND-CONTRACT CAROUSEL TRACK
            ========================================================================= */}
        <div
          className="relative w-full overflow-hidden py-4 flex items-center justify-center cursor-default"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex items-center justify-center flex-nowrap"
            style={{
              transform: `translateX(${dragOffset}px)`,
              transition: isDragging ? "none" : "transform 320ms ease-out",
            }}
          >
            {TRACK_INDICES.map((trackIdx) => {
              const offset = trackIdx - centerIndex;
              const item = AUDIENCE_ITEMS[trackIdx % AUDIENCE_ITEMS.length];
              const styles = getCardStyles(offset);

              const transitionStyle = disableTransition
                ? "transition-none"
                : "transition-all duration-[680ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

              return (
                <div
                  key={`track-card-${trackIdx}`}
                  onClick={() => styles.isInteractivePill && handleCardClick(offset)}
                  role={styles.isInteractivePill ? "button" : "group"}
                  tabIndex={styles.isInteractivePill ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (
                      styles.isInteractivePill &&
                      (e.key === "Enter" || e.key === " ")
                    ) {
                      e.preventDefault();
                      handleCardClick(offset);
                    }
                  }}
                  aria-label={
                    offset === 0
                      ? `Active slide: ${item.title}`
                      : `Switch to ${item.title}`
                  }
                  className={`group relative flex-shrink-0 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003124] ${styles.wrapper} ${styles.cardLayout} ${transitionStyle}`}
                >
                  {/* Content Column: Title, Description, and CTA Button
                      - On mobile: positioned below the image cleanly
                      - On desktop: positioned on the left side of the image */}
                  <div
                    className={`transition-opacity duration-300 ${styles.content}`}
                  >
                    {/* Typography block */}
                    <div className="flex flex-col gap-2.5 sm:gap-3.5 lg:gap-4.5 max-w-[420px] w-full">
                      <h3
                        className="text-xl sm:text-2xl lg:text-[32px] xl:text-[34px] font-bold text-[#003124] leading-[1.2] tracking-tight"
                        style={{ fontFamily: "var(--font-headline, serif)" }}
                      >
                        {item.title}
                      </h3>

                      <p
                        className="text-[13.5px] sm:text-[15px] lg:text-[16.5px] text-[#003124]/75 font-normal leading-[1.58]"
                        style={{ fontFamily: "var(--font-body, sans-serif)" }}
                      >
                        {item.description}
                      </p>
                    </div>

                    {/* Pill Button CTA */}
                    <div className="pt-2 sm:pt-3 lg:pt-4">
                      <Link
                        href={item.ctaHref}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center justify-center px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-[#F88404] text-white font-bold text-xs sm:text-[14.5px] hover:bg-[#e07500] transition-all shadow-md active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F88404]"
                      >
                        {item.ctaText}
                      </Link>
                    </div>
                  </div>

                  {/* Featured Image Showcase:
                      - On mobile: positioned below the text and button
                      - On desktop: positioned on the right */}
                  <div
                    className={`relative ${styles.image} ${transitionStyle}`}
                  >
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 480px"
                      priority={offset === 0}
                      className="object-cover object-center pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Pill Dark Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-b from-[#003124]/12 via-transparent to-[#003124]/22 group-hover:opacity-10 transition-opacity ${styles.pillOverlay}`}
                    />

                    {/* Floating Interactive Direction Cue on Pill Hover */}
                    <div
                      className={`absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${styles.cue}`}
                    >
                      <div className="w-8 h-8 rounded-full bg-white/95 shadow-md flex items-center justify-center text-[#003124]">
                        {offset > 0 ? (
                          <ChevronRight className="w-4 h-4 ml-0.5" />
                        ) : (
                          <ChevronLeft className="w-4 h-4 mr-0.5" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            CAROUSEL PAGINATION INDICATOR WITH SYNCED AUTO-PLAY PROGRESS LOOP
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
                onClick={() => handleDotClick(idx)}
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
                    key={`progress-indicator-${activeIndex}-${isPaused}`}
                    className="absolute inset-y-0 left-0 bg-[#003124] rounded-full"
                    style={{
                      animation: `whoWeServeProgress ${AUTO_PLAY_DELAY}ms linear forwards`,
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
