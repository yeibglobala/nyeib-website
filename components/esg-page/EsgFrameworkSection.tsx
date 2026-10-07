"use client";

import React, { useState } from "react";
import { useScrollReveal } from "@/shared/hooks/useScrollReveal";
import { Parallax } from "@/shared/components/Parallax";
import { HeaderReveal } from "@/shared/components/HeaderReveal";

interface EsgCard {
  id: string;
  name: string;
  question: string;
  description: string;
  restBg: string;
  hoverBg: string;
  textColor: string;
  descColor: string;
  border: string;
  shadow: string;
}

const ESG_CARDS: EsgCard[] = [
  {
    id: "environmental",
    name: "Environmental",
    question: "Building resilience into growth.",
    description:
      "We encourage businesses to strengthen environmentally sound practices and improve their ability to respond to climate-related risks as they scale.",
    restBg: "bg-[#00BE93]",
    hoverBg: "bg-[#008f6e]",
    textColor: "text-white",
    descColor: "text-white/95",
    border: "border-white/20",
    shadow: "shadow-[0_16px_40px_rgba(0,190,147,0.28)]",
  },
  {
    id: "social",
    name: "Social",
    question: "Expanding opportunity through stronger businesses.",
    description:
      "NYEIB supports inclusive business growth, with particular attention to youth- and women-led enterprises and the economic opportunities they can create.",
    restBg: "bg-[#F88404]",
    hoverBg: "bg-[#c96200]",
    textColor: "text-white",
    descColor: "text-white/95",
    border: "border-white/20",
    shadow: "shadow-[0_16px_40px_rgba(248,132,4,0.28)]",
  },
  {
    id: "governance",
    name: "Governance",
    question: "Strengthening confidence through responsible oversight.",
    description:
      "NYEIB’s operating structure includes dedicated governance, risk, ESG and monitoring functions designed to support responsible investment across the Funds.",
    restBg: "bg-[#E1C9B3]",
    hoverBg: "bg-[#bda28b]",
    textColor: "text-[#003124]",
    descColor: "text-[#003124]/90",
    border: "border-[#003124]/15",
    shadow: "shadow-[0_16px_40px_rgba(225,201,179,0.35)]",
  },
];

export function EsgFrameworkSection() {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const { ref: cardsRef, isRevealed: isCardsRevealed } = useScrollReveal<HTMLDivElement>({
    threshold: 0.12,
  });

  return (
    <section
      id="esg-approach"
      data-theme="light"
      aria-label="Our ESG Approach"
      className="relative w-full bg-[#FAF7F2] text-[#003124] py-[clamp(72px,10vw,140px)] px-[clamp(20px,4.5vw,64px)] overflow-hidden border-t border-[#003124]/10"
    >
      <div className="max-w-[1240px] mx-auto flex flex-col space-y-16 sm:space-y-20">
        {/* =========================================================================
            TOP AREA: Header (Heading Left, Paragraph Right on Desktop)
            ========================================================================= */}
        <div className="flex flex-col space-y-4 sm:space-y-5">
          {/* Tag */}
          <HeaderReveal delay={0} duration={800} mask={false} parallaxSpeed={10}>
            <span
              className="text-[13px] font-semibold tracking-[0.16em] uppercase text-[#008f6e] block"
              style={{ fontFamily: "var(--font-mono, monospace)" }}
            >
              OUR ESG APPROACH
            </span>
          </HeaderReveal>

          {/* Heading left, paragraph right on desktop; stacked on mobile */}
          <div className="grid grid-cols-1 min-[900px]:grid-cols-12 gap-6 min-[900px]:gap-12 items-end">
            <div className="min-[900px]:col-span-7">
              <HeaderReveal delay={120} duration={950} parallaxSpeed={14}>
                <h2
                  className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold leading-[1.15] tracking-tight text-[#003124] m-0"
                  style={{ fontFamily: "var(--font-headline, serif)" }}
                >
                  Sustainability is part of how we build for growth.
                </h2>
              </HeaderReveal>
            </div>

            <div className="min-[900px]:col-span-5">
              <HeaderReveal delay={240} duration={950} mask={false} parallaxSpeed={12}>
                <p
                  className="text-[15.5px] sm:text-[16px] leading-[1.65] text-[#2b3d36] max-w-[48ch] m-0"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  For NYEIB, ESG informs how we think about business resilience,
                  inclusion, governance and responsible investment.
                </p>
              </HeaderReveal>
            </div>
          </div>
        </div>

        {/* =========================================================================
            BOTTOM AREA: 3 Color-Coded 3D Flip ESG Cards Grid
            ========================================================================= */}
        <Parallax speed={24} className="w-full">
          <div
            ref={cardsRef}
            className={`grid grid-cols-1 min-[700px]:grid-cols-3 gap-5 sm:gap-6 w-full transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isCardsRevealed
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[22px] motion-reduce:opacity-100 motion-reduce:translate-y-0"
            }`}
          >
            {ESG_CARDS.map((card) => {
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
                  onClick={() => setActiveCardId((curr) => (curr === card.id ? null : card.id))}
                  className="group relative w-full aspect-[4/5] min-h-[390px] max-[700px]:aspect-auto max-[700px]:min-h-[350px] rounded-[24px] cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[#00BE93] [perspective:1200px]"
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
                      className={`absolute inset-0 w-full h-full rounded-[24px] p-8 flex flex-col items-center justify-center text-center border ${card.border} ${card.restBg} ${card.shadow} [backface-visibility:hidden] [-webkit-backface-visibility:hidden] transition-shadow duration-300 hover:shadow-2xl`}
                    >
                      <h3
                        className={`text-[clamp(32px,3.6vw,48px)] font-bold tracking-tight leading-tight ${card.textColor}`}
                        style={{ fontFamily: "var(--font-headline, serif)" }}
                      >
                        {card.name}
                      </h3>
                      <div className="absolute bottom-6 flex items-center gap-1.5 opacity-75 text-xs tracking-wider uppercase font-mono text-inherit">
                        <span>Hover to explore</span>
                        <svg className="w-3.5 h-3.5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>

                    {/* ==========================================
                        BACK FACE (Flipped State)
                        ========================================== */}
                    <div
                      className={`absolute inset-0 w-full h-full rounded-[24px] p-7 sm:p-9 flex flex-col justify-between border ${card.border} ${card.hoverBg} ${card.shadow} [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]`}
                    >
                      {/* Top Bar on Back */}
                      <div className="w-full flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/20">
                        <span
                          className={`text-[20px] sm:text-[22px] font-bold tracking-tight block ${card.textColor}`}
                          style={{ fontFamily: "var(--font-headline, serif)" }}
                        >
                          {card.name}
                        </span>
                        <span
                          className={`text-[12px] font-mono tracking-widest uppercase opacity-75 ${card.textColor}`}
                        >
                          DIMENSION
                        </span>
                      </div>

                      {/* Content: Question + Description */}
                      <div className="flex flex-col space-y-3.5 pt-2">
                        <p
                          className={`text-[17px] sm:text-[18.5px] font-bold leading-[1.32] ${card.textColor} m-0`}
                          style={{ fontFamily: "var(--font-headline, serif)" }}
                        >
                          {card.question}
                        </p>
                        <p
                          className={`text-[15px] sm:text-[16px] font-normal leading-[1.58] ${card.descColor} m-0`}
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Parallax>

        {/* =========================================================================
            ADDITIONAL SECTIONS: ESG and Investability & Reporting and Accountability
            ========================================================================= */}
        <Parallax speed={16} className="w-full">
          <div className="pt-10 border-t border-[#003124]/10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* ESG and Investability */}
            <div className="group p-8 sm:p-10 rounded-[24px] bg-white border border-[#E1C9B3] hover:border-[#00BE93]/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <HeaderReveal delay={0} duration={800} mask={false}>
                  <span
                    className="text-[12px] font-semibold tracking-[0.16em] uppercase text-[#008f6e] block"
                    style={{ fontFamily: "var(--font-mono, monospace)" }}
                  >
                    ESG AND INVESTABILITY
                  </span>
                </HeaderReveal>
                <HeaderReveal delay={120} duration={900}>
                  <h3
                    className="text-2xl sm:text-3xl font-bold text-[#003124] tracking-tight leading-snug m-0"
                    style={{ fontFamily: "var(--font-headline, serif)" }}
                  >
                    Stronger businesses inspire greater confidence.
                  </h3>
                </HeaderReveal>
              </div>
              <HeaderReveal delay={200} duration={900} mask={false}>
                <p
                  className="text-base sm:text-[16.5px] leading-relaxed text-[#2b3d36] font-normal pt-2 m-0"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  By strengthening resilience, inclusion and governance, NYEIB aims to help businesses become more credible and better positioned for investment.
                </p>
              </HeaderReveal>
            </div>

            {/* Reporting & Accountability */}
            <div className="group p-8 sm:p-10 rounded-[24px] bg-white border border-[#E1C9B3] hover:border-[#F88404]/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <HeaderReveal delay={0} duration={800} mask={false}>
                  <span
                    className="text-[12px] font-semibold tracking-[0.16em] uppercase text-[#F88404] block"
                    style={{ fontFamily: "var(--font-mono, monospace)" }}
                  >
                    REPORTING & ACCOUNTABILITY
                  </span>
                </HeaderReveal>
                <HeaderReveal delay={120} duration={900}>
                  <h3
                    className="text-2xl sm:text-3xl font-bold text-[#003124] tracking-tight leading-snug m-0"
                    style={{ fontFamily: "var(--font-headline, serif)" }}
                  >
                    Tracking progress as the Funds grow.
                  </h3>
                </HeaderReveal>
              </div>
              <HeaderReveal delay={200} duration={900} mask={false}>
                <p
                  className="text-base sm:text-[16.5px] leading-relaxed text-[#2b3d36] font-normal pt-2 m-0"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  As capital is deployed, NYEIB will monitor relevant environmental, social, governance and development indicators as part of its wider impact framework.
                </p>
              </HeaderReveal>
            </div>
          </div>
        </Parallax>
      </div>
    </section>
  );
}
