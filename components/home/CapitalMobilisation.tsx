"use client";

import React from "react";
import { HeaderReveal } from "@/shared/components/HeaderReveal";

const CAPITAL_STATS = [
  {
    number: "US$300 million",
    label: "Total capitalisation target",
    desc: "Target capital mobilization across equity, guarantees and ecosystem support.",
    bgColor: "bg-[#00BE93]",
    textColor: "text-white",
    descColor: "text-white/90",
    shadow: "shadow-[0_10px_32px_rgba(0,190,147,0.22)]",
    border: "border border-white/20",
  },
  {
    number: "US$100 million",
    label: "Initial sovereign financing from the African Development Bank",
    desc: "Anchor sovereign financing committed through the African Development Bank.",
    bgColor: "bg-[#F88404]",
    textColor: "text-white",
    descColor: "text-white/90",
    shadow: "shadow-[0_10px_32px_rgba(248,132,4,0.22)]",
    border: "border border-white/20",
  },
  {
    number: "3 financing instruments",
    label: "Equity Investment Fund, Credit Guarantee Fund and Ecosystem Development Fund",
    desc: "Equity Investment Fund, Credit Guarantee Fund and Ecosystem Development Fund.",
    bgColor: "bg-[#E1C9B3]",
    textColor: "text-[#003124]",
    descColor: "text-[#003124]/85",
    shadow: "shadow-[0_10px_32px_rgba(225,201,179,0.28)]",
    border: "border border-[#003124]/10",
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

        {/* 3 Color Combination Cards from Brand Identity */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          {CAPITAL_STATS.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-between gap-6 p-8 lg:p-10 rounded-2xl ${stat.bgColor} ${stat.shadow} ${stat.border} hover:-translate-y-1.5 transition-all duration-300 ease-out`}
            >
              <div className="flex flex-col gap-4">
                <div
                  className={`font-serif text-4xl lg:text-5xl font-normal tracking-tight ${stat.textColor}`}
                >
                  {stat.number}
                </div>
                <h3 className={`font-sans font-semibold text-lg sm:text-xl ${stat.textColor}`}>
                  {stat.label}
                </h3>
              </div>
              <p className={`font-sans text-sm sm:text-base leading-relaxed ${stat.descColor}`}>
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
