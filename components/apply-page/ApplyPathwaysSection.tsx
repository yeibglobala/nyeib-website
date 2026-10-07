"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Parallax } from "@/shared/components/Parallax";
import { HeaderReveal } from "@/shared/components/HeaderReveal";

interface ApplyPathwaysSectionProps {
  onOpenModal: (track: "business" | "vc_pe" | "banks" | "ecosystem" | "research" | "investors") => void;
}

export function ApplyPathwaysSection({ onOpenModal }: ApplyPathwaysSectionProps) {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const FLIP_CARDS = [
    {
      id: "business",
      name: "Entrepreneurs & Businesses",
      tagline: "Direct Enterprise Capital & Advisory",
      body1:
        "For youth- and women-led businesses with a working product or service, paying customers and a clear plan to grow.",
      body2:
        "Depending on your stage and needs, you may be considered for investment, capacity-building support, or both.",
      ctaText: "Start Application",
      track: "business" as const,
      frontBg: "bg-[#00BE93]",
      frontTextColor: "text-white",
      backBg: "bg-[#008f6e]",
      backTextColor: "text-white",
      shadow: "shadow-[0_16px_36px_rgba(0,190,147,0.25)]",
      borderColor: "border-white/20",
    },
    {
      id: "fund_managers",
      name: "VC & PE Fund Managers",
      tagline: "Co-Investment & Fund-of-Funds",
      body1:
        "For fund managers interested in investment, co-investment or other partnership opportunities with NYEIB.",
      body2:
        "Collaborate with a sovereign-backed anchor platform to deploy catalytic capital into high-growth enterprises.",
      ctaText: "Explore Partnership",
      track: "vc_pe" as const,
      frontBg: "bg-[#F88404]",
      frontTextColor: "text-white",
      backBg: "bg-[#cf6900]",
      backTextColor: "text-white",
      shadow: "shadow-[0_16px_36px_rgba(248,132,4,0.25)]",
      borderColor: "border-white/20",
    },
    {
      id: "lenders_ecosystem",
      name: "Banks & Ecosystem Partners",
      tagline: "Risk-Sharing & Technical Assistance",
      body1:
        "For banks, microfinance banks, licensed lenders and ecosystem support organisations including incubators and accelerators.",
      body2:
        "Expand lending through risk-sharing guarantees and strengthen capacity-building across Nigeria's MSME landscape.",
      ctaText: "Explore Partnership",
      track: "banks" as const,
      frontBg: "bg-[#E1C9B3]",
      frontTextColor: "text-[#003124]",
      backBg: "bg-[#d0b49b]",
      backTextColor: "text-[#003124]",
      shadow: "shadow-[0_16px_36px_rgba(225,201,179,0.35)]",
      borderColor: "border-[#003124]/15",
    },
  ];

  return (
    <section
      id="pathways"
      data-theme="light"
      className="relative w-full bg-[#FAF7F2] py-20 sm:py-28 px-6 sm:px-8 lg:px-12 text-[#003124] border-b border-[#003124]/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">
        {/* =========================================================================
            HEADER AREA: Clean Light Discipline with HeaderReveal
            ========================================================================= */}
        <div className="flex flex-col space-y-3 max-w-3xl">
          <HeaderReveal delay={0} duration={800} mask={false} parallaxSpeed={10}>
            <span
              className="text-[13px] font-semibold tracking-[0.16em] uppercase text-[#008f6e] block"
              style={{ fontFamily: "var(--font-body)" }}
            >
              APPLICATION & PARTNERSHIP PATHWAYS
            </span>
          </HeaderReveal>

          <HeaderReveal delay={120} duration={950} parallaxSpeed={14}>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#003124] leading-[1.15]"
              style={{ fontFamily: "var(--font-headline, serif)" }}
            >
              Choose the pathway that matches your role.
            </h2>
          </HeaderReveal>

          <HeaderReveal delay={240} duration={950} mask={false} parallaxSpeed={10}>
            <p className="text-[#2b3d36] text-base sm:text-lg leading-relaxed font-normal pt-1 m-0">
              Whether you are growing a business or looking to partner with NYEIB, explore our dedicated routes for enterprise capital and institutional collaboration.
            </p>
          </HeaderReveal>
        </div>

        {/* =========================================================================
            3D FLIP CARDS: Styled like the Impact Page (No badges on front)
            ========================================================================= */}
        <Parallax speed={20} className="w-full">
          <div className="grid grid-cols-1 min-[700px]:grid-cols-3 gap-6 sm:gap-8 w-full">
            {FLIP_CARDS.map((card) => {
              const isFlipped = activeCardId === card.id;

              return (
                <div
                  key={card.id}
                  tabIndex={0}
                  role="button"
                  aria-label={`${card.name} card. Click or hover to flip.`}
                  onMouseEnter={() => setActiveCardId(card.id)}
                  onMouseLeave={() => setActiveCardId(null)}
                  onFocus={() => setActiveCardId(card.id)}
                  onBlur={() => setActiveCardId(null)}
                  onClick={() =>
                    setActiveCardId((curr) => (curr === card.id ? null : card.id))
                  }
                  className="group relative w-full aspect-[4/5] min-h-[420px] max-[700px]:aspect-auto max-[700px]:min-h-[380px] rounded-[24px] cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[#00BE93] [perspective:1200px]"
                >
                  {/* 3D Flipper Container */}
                  <div
                    className="relative w-full h-full rounded-[24px] transition-transform duration-[700ms] ease-[cubic-bezier(0.23,1,0.32,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
                    style={{
                      transform: isFlipped ? "rotateY(180deg)" : undefined,
                    }}
                  >
                    {/* ==========================================
                        FRONT FACE (Rest State)
                        ========================================== */}
                    <div
                      className={`absolute inset-0 w-full h-full rounded-[24px] p-8 sm:p-10 flex flex-col justify-between text-left border ${card.borderColor} ${card.frontBg} ${card.shadow} [backface-visibility:hidden] [-webkit-backface-visibility:hidden] transition-shadow duration-300 hover:shadow-2xl`}
                    >
                      <div className="space-y-4 pt-2">
                        <h3
                          className={`text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight leading-tight ${card.frontTextColor}`}
                          style={{ fontFamily: "var(--font-headline, serif)" }}
                        >
                          {card.name}
                        </h3>

                        <p className={`text-base sm:text-[17px] font-medium opacity-90 leading-snug ${card.frontTextColor}`}>
                          {card.tagline}
                        </p>
                      </div>

                      <div className={`flex items-center justify-between pt-6 border-t ${card.borderColor} opacity-80 text-xs tracking-wider uppercase font-sans font-semibold ${card.frontTextColor}`}>
                        <span>Hover or tap to view details</span>
                        <ArrowRight className="w-4 h-4 animate-pulse" />
                      </div>
                    </div>

                    {/* ==========================================
                        BACK FACE (Flipped State)
                        ========================================== */}
                    <div
                      className={`absolute inset-0 w-full h-full rounded-[24px] p-8 sm:p-9 flex flex-col justify-between text-left border ${card.borderColor} ${card.backBg} ${card.shadow} [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]`}
                    >
                      {/* Top Bar on Back */}
                      <div className={`w-full flex items-center justify-between pb-3 border-b ${card.borderColor}`}>
                        <span
                          className={`text-lg sm:text-xl font-bold tracking-tight block ${card.backTextColor}`}
                          style={{ fontFamily: "var(--font-headline, serif)" }}
                        >
                          {card.name}
                        </span>
                        <span className={`text-[11px] font-sans font-semibold tracking-widest uppercase opacity-75 ${card.backTextColor}`}>
                          DETAILS
                        </span>
                      </div>

                      {/* Content: Verbatim Body Text */}
                      <div className="flex flex-col space-y-3 pt-2">
                        <p
                          className={`text-[15px] sm:text-[16px] font-medium leading-[1.48] ${card.backTextColor} m-0`}
                        >
                          {card.body1}
                        </p>
                        <p
                          className={`text-[13.5px] sm:text-[14.5px] font-normal leading-[1.55] opacity-90 ${card.backTextColor} m-0`}
                        >
                          {card.body2}
                        </p>
                      </div>

                      {/* CTA on Back */}
                      <div className="pt-4">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenModal(card.track);
                          }}
                          className={`w-full py-3.5 px-5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                            card.id === "lenders_ecosystem"
                              ? "bg-[#003124] text-white hover:bg-[#0b523b]"
                              : "bg-white text-[#003124] hover:bg-[#FAF7F2]"
                          }`}
                        >
                          <span>{card.ctaText}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Parallax>
      </div>
    </section>
  );
}
