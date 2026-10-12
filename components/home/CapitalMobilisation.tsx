"use client";

import React from "react";
import { HeaderReveal } from "@/shared/components/HeaderReveal";
import { StatFlipCard } from "@/components/cards/StatFlipCard";

interface CapitalMobilisationCardData {
  frontStat: string;
  frontTitle: string;
  frontDescription: string;
  backStat: string;
  backTitle: string;
  backItems: string[];
}

const CAPITAL_CARDS: CapitalMobilisationCardData[] = [
  {
    frontStat: "US$300 million",
    frontTitle: "Total capitalisation target",
    frontDescription: "Target capital mobilization across equity, guarantees and ecosystem support.",
    backStat: "US$300 million",
    backTitle: "Catalytic Blended Model",
    backItems: [
      "Concessional Base (AfDB)",
      "Private Multiplier",
      "Nationwide Deployment",
    ],
  },
  {
    frontStat: "US$100 million",
    frontTitle: "Initial sovereign financing from the African Development Bank",
    frontDescription: "Anchor sovereign financing committed through the African Development Bank.",
    backStat: "US$100 million",
    backTitle: "Initial sovereign financing from the African Development Bank",
    backItems: [
      "Equity",
      "Guarantees",
      "Ecosystem support",
    ],
  },
  {
    frontStat: "3 financing instruments",
    frontTitle: "Equity Investment Fund, Credit Guarantee Fund and Ecosystem Development Fund",
    frontDescription: "Comprehensive financing suite combining equity, guarantees and ecosystem support.",
    backStat: "3 Instruments",
    backTitle: "Fund Architecture",
    backItems: [
      "Equity Investment Fund",
      "Credit Guarantee Fund",
      "Ecosystem Development Fund",
    ],
  },
];

export function CapitalMobilisation() {
  return (
    <section
      id="capital-mobilisation"
      data-theme="light"
      aria-label="Built to Mobilise Capital at Scale"
      className="w-full bg-[#e3ece7] text-[#12201b] py-24 lg:py-32 px-6 sm:px-10 lg:px-16 relative overflow-hidden border-t border-[rgba(18,32,27,0.08)]"
    >
      <div className="max-w-[1400px] w-full mx-auto flex flex-col gap-16 relative z-10">
        {/* Header */}
        <div className="max-w-3xl flex flex-col gap-4">
          <span className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-[#0b523b]">
            CAPITAL DEPLOYMENT AT SCALE
          </span>
          <HeaderReveal
            as="h2"
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.12] tracking-tight text-[#12201b]"
          >
            Built to Mobilise Capital at Scale
          </HeaderReveal>
          <p className="font-sans text-base md:text-lg text-[rgba(18,32,27,0.72)] leading-relaxed">
            NYEIB is structured to combine capital, risk-sharing and ecosystem support through three complementary financing instruments.
          </p>
        </div>

        {/* 3 Figma Stat Flip Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 items-center justify-items-center">
          {CAPITAL_CARDS.map((card, idx) => (
            <StatFlipCard
              key={idx}
              variant="style1"
              frontStat={card.frontStat}
              frontTitle={card.frontTitle}
              frontDescription={card.frontDescription}
              backStat={card.backStat}
              backTitle={card.backTitle}
              backItems={card.backItems}
              className="w-full max-w-[340px] sm:max-w-[320px] md:max-w-[308px] lg:max-w-[340px] h-[352px] sm:h-[349px] lg:h-[360px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CapitalMobilisation;
