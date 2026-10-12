"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCw } from "lucide-react";
import { StatFlipCard } from "@/components/cards/StatFlipCard";

export function CardsPreviewClient() {
  const [bgTheme, setBgTheme] = useState<"charcoal" | "white" | "evergreen">("charcoal");
  const [flipAll, setFlipAll] = useState(false);

  const bgClasses = {
    charcoal: "bg-[#2A2B2D] text-white",
    white: "bg-[#F7F5F0] text-[#003124]",
    evergreen: "bg-[#003124] text-white",
  }[bgTheme];

  return (
    <main className={`min-h-screen w-full transition-colors duration-300 pt-28 sm:pt-32 pb-16 px-4 sm:px-8 lg:px-12 ${bgClasses}`}>
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-current/15 pb-6">
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider opacity-70 hover:opacity-100 transition-opacity"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <h1
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight m-0"
              style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
            >
              Figma Stat Flip Cards Preview
            </h1>
            <p className="text-sm opacity-80 m-0">
              Interactive 3D flip cards matching Figma nodes 644:227, 644:116, 644:215, & 644:259.
            </p>
          </div>

          {/* Quick Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Theme picker */}
            <div className="inline-flex items-center p-1 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setBgTheme("charcoal")}
                className={`px-3 py-1.5 rounded-full font-medium transition-all ${
                  bgTheme === "charcoal" ? "bg-white text-black shadow-sm" : "opacity-70 hover:opacity-100"
                }`}
              >
                Figma Gray (#2A2B2D)
              </button>
              <button
                type="button"
                onClick={() => setBgTheme("white")}
                className={`px-3 py-1.5 rounded-full font-medium transition-all ${
                  bgTheme === "white" ? "bg-white text-black shadow-sm" : "opacity-70 hover:opacity-100"
                }`}
              >
                Light Cream (#F7F5F0)
              </button>
              <button
                type="button"
                onClick={() => setBgTheme("evergreen")}
                className={`px-3 py-1.5 rounded-full font-medium transition-all ${
                  bgTheme === "evergreen" ? "bg-white text-black shadow-sm" : "opacity-70 hover:opacity-100"
                }`}
              >
                Evergreen (#003124)
              </button>
            </div>

            {/* Flip All Toggle */}
            <button
              type="button"
              onClick={() => setFlipAll(!flipAll)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00BE93] hover:bg-[#00a882] text-[#003124] font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>{flipAll ? "Flip to Front" : "Flip All to Back"}</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            SECTION 1: INTERACTIVE 3D CARDS (HOVER OR TAP TO FLIP)
            ========================================================================= */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2
              className="text-xl sm:text-2xl font-bold"
              style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
            >
              1. Interactive 3D Flip Cards (Hover on Desktop, Tap on Mobile)
            </h2>
            <span className="text-xs opacity-70 font-mono">308px × 349px</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-items-center">
            {/* Style 1 */}
            <div className="flex flex-col items-center gap-3 w-full max-w-[320px]">
              <span className="text-xs uppercase font-mono tracking-wider opacity-75 font-semibold">
                Card Style 1 (Mint Cream + Dual Wave)
              </span>
              <StatFlipCard variant="style1" isFlipped={flipAll ? true : undefined} />
            </div>

            {/* Style 2 */}
            <div className="flex flex-col items-center gap-3 w-full max-w-[320px]">
              <span className="text-xs uppercase font-mono tracking-wider opacity-75 font-semibold">
                Card Style 2 (White + Single Wave)
              </span>
              <StatFlipCard variant="style2" isFlipped={flipAll ? true : undefined} />
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION 2: ALL 4 FIGMA DESIGNS SIDE-BY-SIDE (STATIC COMPARISON)
            ========================================================================= */}
        <div className="flex flex-col gap-6 pt-6 border-t border-current/15">
          <div className="flex items-center justify-between">
            <h2
              className="text-xl sm:text-2xl font-bold"
              style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
            >
              2. Exact 4 Figma States Layout
            </h2>
            <span className="text-xs opacity-70 font-mono">Front & Reveal Backs</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start justify-items-center">
            {/* Front 1 */}
            <div className="flex flex-col items-center gap-2.5 w-full max-w-[308px]">
              <span className="text-[11px] uppercase font-mono tracking-wider opacity-75 font-semibold text-center">
                Card Style 1 (Front)
              </span>
              <StatFlipCard variant="style1" isFlipped={false} flipOnHover={false} />
            </div>

            {/* Front 2 */}
            <div className="flex flex-col items-center gap-2.5 w-full max-w-[308px]">
              <span className="text-[11px] uppercase font-mono tracking-wider opacity-75 font-semibold text-center">
                Card Style 2 (Front)
              </span>
              <StatFlipCard variant="style2" isFlipped={false} flipOnHover={false} />
            </div>

            {/* Back 1 */}
            <div className="flex flex-col items-center gap-2.5 w-full max-w-[308px]">
              <span className="text-[11px] uppercase font-mono tracking-wider opacity-75 font-semibold text-center">
                Card Style 1 (Flip Reveal Back)
              </span>
              <StatFlipCard variant="style1" isFlipped={true} flipOnHover={false} />
            </div>

            {/* Back 2 */}
            <div className="flex flex-col items-center gap-2.5 w-full max-w-[308px]">
              <span className="text-[11px] uppercase font-mono tracking-wider opacity-75 font-semibold text-center">
                Card Style 2 (Flip Reveal Back)
              </span>
              <StatFlipCard variant="style2" isFlipped={true} flipOnHover={false} />
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION 3: VARIED CONTENT EXAMPLES (SAME LAYOUT)
            ========================================================================= */}
        <div className="flex flex-col gap-6 pt-6 border-t border-current/15">
          <div className="flex flex-col gap-1">
            <h2
              className="text-xl sm:text-2xl font-bold"
              style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
            >
              3. Varied Content Examples (Same Layout)
            </h2>
            <p className="text-xs sm:text-sm opacity-75 m-0">
              Demonstrating different copy lengths, stats, and capital channels while preserving the exact layout and wave graphics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start justify-items-center">
            {/* Example A: Businesses supported */}
            <div className="flex flex-col items-center gap-2.5 w-full max-w-[308px]">
              <span className="text-[11px] uppercase font-mono tracking-wider opacity-75 font-semibold text-center">
                Example A: Businesses
              </span>
              <StatFlipCard
                variant="style1"
                frontStat="38,400"
                frontTitle="Businesses to be supported"
                frontDescription="Growth-oriented enterprises across Nigeria over the 20-year fund horizon."
                backStat="1.6 Million"
                backTitle="Direct and indirect jobs created"
                backItems={[
                  "Youth-led enterprises",
                  "Women-led businesses",
                  "High-growth SMEs",
                ]}
              />
            </div>

            {/* Example B: Blended Finance */}
            <div className="flex flex-col items-center gap-2.5 w-full max-w-[308px]">
              <span className="text-[11px] uppercase font-mono tracking-wider opacity-75 font-semibold text-center">
                Example B: Blended Finance
              </span>
              <StatFlipCard
                variant="style1"
                frontStat="Blended Capital"
                frontTitle="Multi-instrument financing"
                frontDescription="Combining equity, guarantees, and technical assistance to de-risk investment."
                backStat="4 Instruments"
                backTitle="Tailored deployment mechanisms"
                backItems={[
                  "Equity & quasi-equity",
                  "Risk-sharing guarantees",
                  "Reimbursable grants",
                  "Technical assistance",
                ]}
              />
            </div>

            {/* Example C: Institutional Anchors */}
            <div className="flex flex-col items-center gap-2.5 w-full max-w-[308px]">
              <span className="text-[11px] uppercase font-mono tracking-wider opacity-75 font-semibold text-center">
                Example C: Governance
              </span>
              <StatFlipCard
                variant="style1"
                frontStat="20 Years"
                frontTitle="Long-term horizon"
                frontDescription="Institutionally anchored governance designed to build lasting investor confidence."
                backStat="3 Partners"
                backTitle="Institutional framework"
                backItems={[
                  "Nigeria Sovereign Investment Authority (NSIA)",
                  "Development Bank of Nigeria (DBN)",
                  "African Development Bank (AfDB)",
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
