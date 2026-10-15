"use client";

import React from "react";
import { useScrollReveal } from "@/shared/hooks/useScrollReveal";
import { Parallax } from "@/shared/components/Parallax";
import { HeaderReveal } from "@/shared/components/HeaderReveal";
import { StatFlipCard } from "@/components/cards/StatFlipCard";

interface FrameworkCard {
  id: string;
  name: string;
  question: string;
  description: string;
}

const FRAMEWORK_CARDS: FrameworkCard[] = [
  {
    id: "impact",
    name: "Impact",
    question: "Are businesses and communities better off because of our intervention?",
    description:
      "We track outcomes such as jobs, business growth, productivity and wider economic benefits.",
  },
  {
    id: "additionality",
    name: "Additionality",
    question: "Are we unlocking capital that would not otherwise be available?",
    description:
      "We assess whether NYEIB brings new capital into the market, expands access to finance and encourages more institutions to back youth- and women-led businesses.",
  },
  {
    id: "risk",
    name: "Risk",
    question: "Are we creating impact while protecting capital responsibly?",
    description:
      "We monitor financial, portfolio, liquidity, macroeconomic, reputational and ESG risks across the Funds.",
  },
  {
    id: "accountability",
    name: "Accountability",
    question: "Tracking progress as we grow.",
    description:
      "As capital is deployed, we will monitor performance against our impact framework and use what we learn to strengthen implementation over time.",
  },
  {
    id: "catalytic-effect",
    name: "Catalytic Effect",
    question: "Crowding in private capital at scale.",
    description:
      "By de-risking high-potential youth- and women-led enterprises, NYEIB mobilises commercial lending, private co-investment, and institutional capital at scale.",
  },
];

export function ImpactFrameworkSection() {
  const { ref: cardsRef, isRevealed: isCardsRevealed } = useScrollReveal<HTMLDivElement>({
    threshold: 0.12,
  });

  return (
    <section
      id="impact-framework"
      data-theme="light"
      aria-label="How We Measure Impact"
      className="relative w-full bg-[#FAF7F2] text-[#003124] py-[clamp(72px,10vw,140px)] px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-[#003124]/10"
    >
      <div className="max-w-[1400px] w-full mx-auto flex flex-col space-y-16 sm:space-y-20">
        {/* =========================================================================
            TOP AREA: Header (Heading Left, Paragraph Right on Desktop)
            ========================================================================= */}
        <div className="flex flex-col space-y-4 sm:space-y-5">
          {/* Tag */}
          <HeaderReveal delay={0} duration={800} mask={false} parallaxSpeed={10}>
            <span
              className="text-[13px] font-semibold tracking-[0.16em] uppercase text-[#008f6e] block"
              style={{ fontFamily: "var(--font-body)" }}
            >
              HOW WE MEASURE IMPACT
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
                  We assess performance across three areas: Impact, Additionality and Risk.
                </h2>
              </HeaderReveal>
            </div>

            <div className="min-[900px]:col-span-5">
              <HeaderReveal delay={240} duration={950} mask={false} parallaxSpeed={12}>
                <p
                  className="text-[15.5px] sm:text-[16px] leading-[1.65] text-[#2b3d36] max-w-[48ch] m-0"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  As capital is deployed, we will monitor performance against our impact
                  framework and use what we learn to strengthen implementation over time.
                </p>
              </HeaderReveal>
            </div>
          </div>
        </div>

        {/* =========================================================================
            BOTTOM AREA: Figma Stat Flip Framework Cards
            All 5 cards are flippable with front stat title and back question/details.
            Row 1: Impact, Additionality, Risk
            Row 2: Accountability, Catalytic Effect
            ========================================================================= */}
        <Parallax speed={24} className="w-full">
          <div
            ref={cardsRef}
            className={`flex flex-col md:flex-row flex-wrap gap-4 sm:gap-5 lg:gap-6 pt-4 items-start justify-start w-full transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isCardsRevealed
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[22px] motion-reduce:opacity-100 motion-reduce:translate-y-0"
            }`}
          >
            {FRAMEWORK_CARDS.map((card) => {
              const isLongTitle = card.name.length > 12;
              return (
                <StatFlipCard
                  key={card.id}
                  variant="style1"
                  frontStat={card.name}
                  frontStatClassName={
                    isLongTitle
                      ? "text-[32px] sm:text-[38px] lg:text-[42px] xl:text-[46px] leading-[1.08] tracking-tight font-bold"
                      : "text-[38px] sm:text-[44px] lg:text-[48px] xl:text-[52px] leading-[1.08] tracking-tight font-bold"
                  }
                  backStat={card.name}
                  backStatClassName={
                    isLongTitle
                      ? "text-[26px] sm:text-[30px] lg:text-[32px] font-bold leading-[1.12]"
                      : "text-[28px] sm:text-[32px] lg:text-[36px] font-bold leading-[1.12]"
                  }
                  backTitle={card.question}
                  backTitleClassName="font-semibold text-[16px] sm:text-[17.5px] leading-[1.35] text-[#00BE93]"
                  backDescription={card.description}
                  backDescriptionClassName="text-[14.5px] sm:text-[15.5px] leading-[1.6] text-white/90"
                  backItems={[]}
                  className="w-full md:w-[calc(33.333%-14px)] lg:w-[calc(33.333%-16px)] max-w-[420px] h-[430px] sm:h-[445px] lg:h-[460px]"
                />
              );
            })}
          </div>
        </Parallax>
      </div>
    </section>
  );
}
