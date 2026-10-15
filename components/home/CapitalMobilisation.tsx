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
      "Concessional Base (AfDB via Federal Ministry of Finance / MOFI)",
      "Private Multiplier",
      "Nationwide Deployment",
    ],
  },
  {
    frontStat: "US$100 million",
    frontTitle: "Initial sovereign financing from the African Development Bank",
    frontDescription: "Anchor sovereign financing committed by the African Development Bank through the Federal Ministry of Finance / MOFI.",
    backStat: "US$100 million",
    backTitle: "Initial sovereign financing from the African Development Bank (via Federal Ministry of Finance / MOFI)",
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

        {/* 3 Figma Stat Flip Cards - Left Aligned to Main Margin */}
        <div className="flex flex-col md:flex-row gap-4 sm:gap-5 lg:gap-6 pt-4 items-start justify-start w-full">
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
              className="w-full md:w-auto md:flex-1 max-w-[390px] sm:max-w-[370px] md:max-w-[380px] lg:max-w-[410px] xl:max-w-[420px] h-[430px] sm:h-[445px] lg:h-[460px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CapitalMobilisation;
