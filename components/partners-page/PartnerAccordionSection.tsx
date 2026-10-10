"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { HeaderReveal } from "@/shared/components/HeaderReveal";

export interface PartnerPathwayItem {
  id: string;
  number: string;
  title: string;
  description: string;
  imageSrc: string;
}

const PARTNER_PATHWAY_DATA: PartnerPathwayItem[] = [
  {
    id: "stronger-opportunity",
    number: "01",
    title: "More than impact. A stronger investment opportunity.",
    description:
      "NYEIB helps institutions participate in businesses with growth potential, measurable impact and long-term economic value, while strengthening the conditions that can make those businesses more investment-ready.",
    imageSrc: "/images/Institutional-investors-and-development-partners.jpg",
  },
  {
    id: "institutionally-anchored",
    number: "02",
    title: "Institutionally anchored. Professionally structured.",
    description:
      "NYEIB is being established through an institutional framework involving the Nigeria Sovereign Investment Authority, Development Bank of Nigeria and African Development Bank, with dedicated governance, investment and risk-management arrangements.",
    imageSrc: "/images/partners-and-investors.png",
  },
];

export function PartnerAccordionSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? PARTNER_PATHWAY_DATA.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === PARTNER_PATHWAY_DATA.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section
      id="partner-pathways"
      aria-label="Choose the pathway that fits your mandate"
      className="relative w-full min-h-[760px] lg:min-h-[820px] bg-[#F6F7FB] text-[#003124] overflow-hidden flex flex-col justify-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <style>{`
        @keyframes partnerProgressBar {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>

      {/* =========================================================================
          DESKTOP RIGHT FULL-HEIGHT SVG CURVED FRAME WITH SWITCHING PHOTOGRAPHY
          ========================================================================= */}
      <div className="hidden lg:block absolute top-0 right-0 bottom-0 h-full w-[58%] pointer-events-none z-10">
        <svg
          viewBox="0 0 914 819"
          preserveAspectRatio="xMaxYMid slice"
          className="w-full h-full"
        >
          <defs>
            <clipPath id="partnerVectorCurveClip">
              <path d="M914 -230.328V1062.33H369.649L385.272 912.375C414.81 629.179 350.505 344.094 202.36 101.312L0 -230.328H914Z" />
            </clipPath>
            <linearGradient
              id="partnerPhotoBottomFade"
              x1="457"
              y1="0"
              x2="457"
              y2="819"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.42" stopColor="#021913" stopOpacity="0" />
              <stop offset="0.75" stopColor="#021913" stopOpacity="0.82" />
              <stop offset="1.0" stopColor="#003124" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          <g clipPath="url(#partnerVectorCurveClip)">
            {/* Smooth Layered Cross-Fade Photography Switcher */}
            {PARTNER_PATHWAY_DATA.map((item, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <image
                  key={item.id}
                  href={item.imageSrc}
                  x="0"
                  y="0"
                  width="914"
                  height="819"
                  preserveAspectRatio="xMidYMid slice"
                  style={{
                    opacity: isSelected ? 1 : 0,
                    transition: "opacity 1000ms cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
              );
            })}
            {/* Dark Brand Gradient Overlay on Lower Frame */}
            <rect
              x="0"
              y="0"
              width="914"
              height="819"
              fill="url(#partnerPhotoBottomFade)"
              className="pointer-events-none"
            />
          </g>
        </svg>
      </div>

      {/* =========================================================================
          CONTENT CONTAINER:
          Desktop: Left Column Alignment (w-[540px])
          Mobile: Stacked layout with headline & tabs, followed by dedicated photo card
          ========================================================================= */}
      <div className="relative z-20 max-w-[1400px] w-full mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-28">
        <div className="w-full max-w-[540px] flex flex-col items-start gap-8 sm:gap-10">
          {/* Header text block */}
          <div className="flex flex-col gap-4 sm:gap-6 items-start">
            <HeaderReveal delay={80} duration={900}>
              <h2
                className="text-[clamp(32px,4.4vw,56px)] font-bold leading-[1.08] tracking-tight text-[#003124] m-0"
                style={{ fontFamily: "var(--font-headline, serif)" }}
              >
                Choose the pathway that{" "}
                <span className="text-[#F88404] block sm:inline">fits your mandate.</span>
              </h2>
            </HeaderReveal>

            <HeaderReveal delay={180} duration={900} mask={false}>
              <p
                className="text-[16px] sm:text-[19px] lg:text-[20px] leading-[1.55] text-[#003124]/75 font-normal m-0"
                style={{ fontFamily: "var(--font-body, sans-serif)" }}
              >
                Partners may explore opportunities across the Equity Investment Fund, Credit Guarantee Facility and Ecosystem Development Fund, as well as co-investment, technical-assistance funding and other forms of support aligned with their mandate.
              </p>
            </HeaderReveal>
          </div>

          {/* Interactive Pathways List */}
          <div
            className="flex flex-col gap-4 sm:gap-5 w-full"
            role="tablist"
            aria-label="Partner Pathways"
          >
            {PARTNER_PATHWAY_DATA.map((item, idx) => {
              const isActive = activeIndex === idx;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveIndex(idx);
                    }
                  }}
                  className="flex flex-col pt-1 pb-2 transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-start gap-3 w-full">
                    <span className="text-sm font-bold text-[#F88404] font-mono pt-1 shrink-0">
                      {item.number}
                    </span>
                    <div className="flex-1 space-y-1.5">
                      <h3
                        className={`text-[19px] sm:text-[21px] lg:text-[22px] font-bold leading-[1.3] transition-colors ${
                          isActive
                            ? "text-[#003124]"
                            : "text-[#003124]/60 group-hover:text-[#003124]"
                        }`}
                        style={{ fontFamily: "var(--font-body, sans-serif)" }}
                      >
                        {item.title}
                      </h3>
                      {isActive && (
                        <p
                          className="text-[14px] sm:text-[15px] text-[#003124]/75 leading-relaxed font-normal pt-1 animate-in fade-in duration-300"
                          style={{ fontFamily: "var(--font-body, sans-serif)" }}
                        >
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Active Underline Indicator with Animated Progress Bar */}
                  {isActive ? (
                    <div className="mt-3 relative w-full h-[4px] sm:h-[5px] rounded-full overflow-hidden bg-[#003124]/10">
                      <div
                        key={`progress-${activeIndex}`}
                        onAnimationEnd={handleNext}
                        className="h-full bg-gradient-to-r from-[#F88404] via-[#F88404]/90 to-transparent rounded-full shadow-[0_0_10px_rgba(248,132,4,0.4)] origin-left"
                        style={{
                          animation: "partnerProgressBar 6s linear forwards",
                          animationPlayState: isPaused ? "paused" : "running",
                        }}
                      />
                    </div>
                  ) : (
                    <div className="mt-3 relative w-full h-[1px] bg-transparent" />
                  )}
                </div>
              );
            })}
          </div>

          {/* =========================================================================
              MOBILE DEDICATED FULL-COLOR PHOTO CARD (Visible under 1024px)
              ========================================================================= */}
          <div className="block lg:hidden w-full mt-4 sm:mt-6">
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-2xl bg-[#003124] border border-[#003124]/15">
              {/* Switching full-color photos */}
              {PARTNER_PATHWAY_DATA.map((item, idx) => {
                const isSelected = activeIndex === idx;
                return (
                  <img
                    key={`mobile-${item.id}`}
                    src={item.imageSrc}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out"
                    style={{
                      opacity: isSelected ? 1 : 0,
                    }}
                  />
                );
              })}

              {/* Bottom Vignette for Contrast */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,49,36,0.85) 0%, rgba(0,49,36,0.2) 40%, transparent 70%)",
                }}
              />

              {/* Current Active Category Pill on Mobile Card */}
              <div className="absolute bottom-4 left-4 z-20 max-w-[65%]">
                <span className="inline-block text-[12px] sm:text-[13px] font-semibold text-white tracking-wide bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 truncate">
                  {PARTNER_PATHWAY_DATA[activeIndex].title}
                </span>
              </div>

              {/* Mobile Carousel Controls in Bottom-Right of Card */}
              <div className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 z-20 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous pathway"
                  className="w-[42px] h-[42px] sm:w-[46px] sm:h-[46px] rounded-full bg-white text-[#003124] flex items-center justify-center hover:bg-[#003124] hover:text-white transition-all shadow-md active:scale-95 focus:outline-none"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next pathway"
                  className="w-[42px] h-[42px] sm:w-[46px] sm:h-[46px] rounded-full bg-[#F88404] text-white flex items-center justify-center hover:bg-[#ff9626] transition-all shadow-md active:scale-95 focus:outline-none"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          DESKTOP CAROUSEL CONTROLS OVER SVG PHOTO FRAME (Visible on lg and wider)
          ========================================================================= */}
      <div className="hidden lg:flex absolute bottom-10 right-6 sm:bottom-14 sm:right-12 lg:bottom-16 lg:right-28 z-30 items-center gap-4">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous pathway"
          className="w-[50px] h-[50px] sm:w-[54px] sm:h-[54px] rounded-full bg-white border border-[#003124]/30 text-[#003124] flex items-center justify-center hover:bg-[#003124] hover:text-white hover:border-[#003124] transition-all shadow-lg active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003124]"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next pathway"
          className="w-[50px] h-[50px] sm:w-[54px] sm:h-[54px] rounded-full bg-[#F88404] text-white flex items-center justify-center hover:bg-[#ff9626] transition-all shadow-[0_4px_16px_rgba(248,132,4,0.4)] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F88404]"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}

