"use client";

import React, { useState } from "react";
import { HeaderReveal } from "@/shared/components/HeaderReveal";

interface CapitalStat {
  number: string;
  label: string;
  desc: string;
  tag: string;
  bgColor: string;
  textColor: string;
  descColor: string;
  shadow: string;
  border: string;
  accentBorder: string;
  backTag: string;
  backTitle: string;
  backSubtitle: string;
  backPoints: { title: string; text: string }[];
  backFooter: string;
}

const CAPITAL_STATS: CapitalStat[] = [
  {
    number: "US$300 million",
    label: "Total capitalisation target",
    desc: "Target capital mobilization across equity, guarantees and ecosystem support.",
    tag: "CAPITAL TARGET",
    bgColor: "bg-[#00BE93]",
    textColor: "text-white",
    descColor: "text-white/90",
    shadow: "shadow-[0_12px_36px_rgba(0,190,147,0.22)]",
    border: "border border-white/20",
    accentBorder: "border-white/25",
    backTag: "OVERVIEW",
    backTitle: "US$300M Deployment",
    backSubtitle: "Catalytic Blended Model",
    backPoints: [
      {
        title: "Concessional Base",
        text: "Anchored by US$100M sovereign funding from the African Development Bank.",
      },
      {
        title: "Private Multiplier",
        text: "Structured to crowd in institutional co-investors, DFIs, and commercial banks.",
      },
      {
        title: "Nationwide Deployment",
        text: "Targeted capital allocation across youth and women enterprises in all 36 states and the FCT.",
      },
    ],
    backFooter: "Equity, Guarantees & Technical Support",
  },
  {
    number: "US$100 million",
    label: "Initial sovereign financing from the African Development Bank",
    desc: "Anchor sovereign financing committed through the African Development Bank.",
    tag: "SOVEREIGN ANCHOR",
    bgColor: "bg-[#F88404]",
    textColor: "text-white",
    descColor: "text-white/90",
    shadow: "shadow-[0_12px_36px_rgba(248,132,4,0.22)]",
    border: "border border-white/20",
    accentBorder: "border-white/25",
    backTag: "PARTNERSHIP",
    backTitle: "AfDB Commitment",
    backSubtitle: "Sovereign Financing Anchor",
    backPoints: [
      {
        title: "Federal Approval",
        text: "Approved by the Federal Government of Nigeria and funded through the African Development Bank.",
      },
      {
        title: "De-Risking Cushion",
        text: "Creates the catalytic layer to de-risk private capital and lower borrowing barriers.",
      },
      {
        title: "Institutional Custody",
        text: "Coordinated with Nigeria Sovereign Investment Authority (NSIA) governance standards.",
      },
    ],
    backFooter: "Anchor Facility for Scale",
  },
  {
    number: "3 financing instruments",
    label: "Equity Investment Fund, Credit Guarantee Fund and Ecosystem Development Fund",
    desc: "Equity Investment Fund, Credit Guarantee Fund and Ecosystem Development Fund.",
    tag: "FINANCING SUITE",
    bgColor: "bg-[#E1C9B3]",
    textColor: "text-[#003124]",
    descColor: "text-[#003124]/85",
    shadow: "shadow-[0_12px_36px_rgba(225,201,179,0.28)]",
    border: "border border-[#003124]/10",
    accentBorder: "border-[#003124]/15",
    backTag: "PILLARS",
    backTitle: "Fund Architecture",
    backSubtitle: "Three Targeted Instruments",
    backPoints: [
      {
        title: "Equity Investment Fund",
        text: "Direct and fund-of-funds equity financing into high-potential, growth-oriented enterprises.",
      },
      {
        title: "Credit Guarantee Fund",
        text: "Risk-sharing guarantees de-risking commercial lending to youth- and women-led businesses.",
      },
      {
        title: "Ecosystem Development Fund",
        text: "Technical assistance, incubators, accelerators, and enterprise readiness capacity building.",
      },
    ],
    backFooter: "Comprehensive Financing Ecosystem",
  },
];

export function CapitalMobilisation() {
  const [flippedCardId, setFlippedCardId] = useState<number | null>(null);

  const toggleFlip = (idx: number) => {
    setFlippedCardId((curr) => (curr === idx ? null : idx));
  };

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

        {/* 3 Flip Cards with Increased Height */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {CAPITAL_STATS.map((stat, idx) => {
            const isFlipped = flippedCardId === idx;

            return (
              <div
                key={idx}
                tabIndex={0}
                role="button"
                aria-label={`${stat.label}. Click or hover to flip for details.`}
                onMouseEnter={() => setFlippedCardId(idx)}
                onMouseLeave={() => setFlippedCardId(null)}
                onFocus={() => setFlippedCardId(idx)}
                onBlur={() => setFlippedCardId(null)}
                onClick={() => toggleFlip(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleFlip(idx);
                  }
                }}
                className="group relative w-full h-[490px] sm:h-[510px] lg:h-[530px] rounded-2xl cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[#00BE93] [perspective:1200px]"
              >
                {/* 3D Flipper Container */}
                <div
                  className="relative w-full h-full rounded-2xl transition-transform duration-[700ms] ease-[cubic-bezier(0.23,1,0.32,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
                  style={{
                    transform: isFlipped ? "rotateY(180deg)" : undefined,
                  }}
                >
                  {/* ==========================================
                      FRONT FACE
                      ========================================== */}
                  <div
                    className={`absolute inset-0 w-full h-full rounded-2xl p-7 sm:p-8 lg:p-9 flex flex-col justify-between ${stat.bgColor} ${stat.shadow} ${stat.border} [backface-visibility:hidden] [-webkit-backface-visibility:hidden] transition-shadow duration-300 group-hover:shadow-2xl`}
                  >
                    {/* Top Row: Eyebrow + Flip Cue */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-sans font-semibold tracking-wider uppercase bg-black/10 backdrop-blur-sm ${stat.textColor}`}
                      >
                        {stat.tag}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center bg-black/10 backdrop-blur-sm border border-white/20 transition-transform duration-500 group-hover:rotate-180 ${stat.textColor}`}
                        title="Flip to explore"
                      >
                        <svg
                          className="w-4 h-4 opacity-85"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Middle: Key Metric & Label */}
                    <div className="flex flex-col gap-3 my-auto">
                      <div
                        className={`font-serif text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-normal tracking-tight leading-[1.1] ${stat.textColor}`}
                      >
                        {stat.number}
                      </div>
                      <h3
                        className={`font-sans font-semibold text-lg sm:text-xl leading-snug ${stat.textColor}`}
                      >
                        {stat.label}
                      </h3>
                    </div>

                    {/* Bottom: Description & Micro-cue */}
                    <div className="flex flex-col gap-4">
                      <p
                        className={`font-sans text-sm sm:text-base leading-relaxed ${stat.descColor}`}
                      >
                        {stat.desc}
                      </p>

                      <div
                        className={`pt-3 border-t border-current/15 flex items-center justify-between text-xs font-semibold tracking-wider uppercase opacity-75 ${stat.textColor}`}
                      >
                        <span>Hover or tap to flip</span>
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* ==========================================
                      BACK FACE
                      ========================================== */}
                  <div
                    className={`absolute inset-0 w-full h-full rounded-2xl p-7 sm:p-8 lg:p-9 flex flex-col justify-between ${stat.bgColor} ${stat.shadow} ${stat.border} [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]`}
                  >
                    {/* Top Row: Back Title + Badge + Flip Return */}
                    <div className="flex items-center justify-between pb-3 border-b border-current/15">
                      <div>
                        <span
                          className={`text-xs font-sans font-semibold tracking-widest uppercase opacity-75 block ${stat.textColor}`}
                        >
                          {stat.backTag}
                        </span>
                        <h4
                          className={`font-serif text-xl sm:text-2xl font-bold tracking-tight mt-0.5 ${stat.textColor}`}
                        >
                          {stat.backTitle}
                        </h4>
                      </div>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center bg-black/10 backdrop-blur-sm border border-white/20 ${stat.textColor}`}
                        title="Flip back"
                      >
                        <svg
                          className="w-4 h-4 opacity-85"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Middle: Structured Points */}
                    <div className="flex flex-col gap-3.5 my-auto">
                      <p
                        className={`text-xs sm:text-sm font-sans font-semibold uppercase tracking-wider opacity-85 ${stat.textColor}`}
                      >
                        {stat.backSubtitle}
                      </p>

                      <div className="flex flex-col gap-3">
                        {stat.backPoints.map((point, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-2.5">
                            <span
                              className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-current opacity-80`}
                            />
                            <div className="flex flex-col">
                              <span
                                className={`text-xs sm:text-sm font-sans font-bold leading-tight ${stat.textColor}`}
                              >
                                {point.title}
                              </span>
                              <span
                                className={`text-xs sm:text-[13px] font-sans leading-snug mt-0.5 ${stat.descColor}`}
                              >
                                {point.text}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom: Footer Tag + Flip hint */}
                    <div
                      className={`pt-3 border-t border-current/15 flex items-center justify-between text-xs font-semibold tracking-wider uppercase opacity-75 ${stat.textColor}`}
                    >
                      <span className="truncate pr-2">{stat.backFooter}</span>
                      <span className="shrink-0 text-[11px]">Tap to flip back</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

