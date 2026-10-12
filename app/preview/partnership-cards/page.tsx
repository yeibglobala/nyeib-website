"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Sliders } from "lucide-react";
import { PartnershipWaveCard } from "@/components/cards/PartnershipWaveCard";

// Real production copy for the ESG Partnerships Section
const PRODUCTION_PARTNERSHIPS = [
  {
    id: "648-506",
    title: "Development Finance Institutions",
    description:
      "Supporting responsible investment approaches, institutional capacity and long-term development objectives.",
    nodeId: "648:506",
  },
  {
    id: "648-535",
    title: "Government & Public Institutions",
    description:
      "Supporting alignment with national development priorities, governance requirements and sustainable economic growth.",
    nodeId: "648:535",
  },
  {
    id: "648-523",
    title: "Participating Financial Institutions",
    description:
      "Encouraging responsible financing and the management of environmental and social risks associated with eligible investments.",
    nodeId: "648:523",
  },
  {
    id: "648-543",
    title: "Development Partners & Technical Assistance Providers",
    description:
      "Supporting knowledge-sharing, capacity development and practical approaches to sustainability and impact measurement.",
    nodeId: "648:543",
  },
  {
    id: "648-551",
    title: "Ecosystem Support Organisations",
    description:
      "Helping businesses improve their operations, adopt responsible practices and strengthen investment readiness.",
    nodeId: "648:551",
  },
];

// Exact Figma mockup text (where 3 nodes used the Government & Public Institutions copy)
const FIGMA_MOCK_PARTNERSHIPS = [
  {
    id: "figma-1",
    title: "Development Finance Institutions",
    description:
      "Supporting responsible investment approaches, institutional capacity and long-term development objectives.",
    nodeId: "648:506",
  },
  {
    id: "figma-2",
    title: "Government & Public Institutions",
    description:
      "Supporting alignment with national development priorities, governance requirements and sustainable economic growth.",
    nodeId: "648:535",
  },
  {
    id: "figma-3",
    title: "Government & Public Institutions",
    description:
      "Supporting alignment with national development priorities, governance requirements and sustainable economic growth.",
    nodeId: "648:543",
  },
  {
    id: "figma-4",
    title: "Government & Public Institutions",
    description:
      "Supporting alignment with national development priorities, governance requirements and sustainable economic growth.",
    nodeId: "648:551",
  },
  {
    id: "figma-5",
    title: "Participating Financial Institutions",
    description:
      "Encouraging responsible financing and the management of environmental and social risks associated with eligible investments.",
    nodeId: "648:523",
  },
];

export default function PartnershipCardsPreviewPage() {
  const [bgTheme, setBgTheme] = useState<"mint" | "cream" | "evergreen">("mint");
  const [copyMode, setCopyMode] = useState<"production" | "figma">("production");

  const bgClasses = {
    mint: "bg-[#E8F3EE] text-[#003124]",
    cream: "bg-[#F7F5F0] text-[#003124]",
    evergreen: "bg-[#003124] text-white",
  }[bgTheme];

  const items = copyMode === "production" ? PRODUCTION_PARTNERSHIPS : FIGMA_MOCK_PARTNERSHIPS;

  return (
    <main
      className={`min-h-screen w-full transition-colors duration-300 pt-24 sm:pt-28 pb-20 px-4 sm:px-8 lg:px-12 ${bgClasses}`}
    >
      <div className="max-w-[1360px] mx-auto flex flex-col gap-12 sm:gap-16">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-current/15 pb-6">
          <div className="flex flex-col gap-2">
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
              Partnership Wave Card Component Preview
            </h1>
            <p className="text-sm opacity-80 m-0 max-w-2xl">
              Figma nodes 648:506, 648:535, 648:543, 648:551 & 648:523 for the &quot;Working together for sustainable growth&quot; section.
            </p>
          </div>

          {/* Quick Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Copy mode toggle */}
            <div className="inline-flex items-center p-1 rounded-full bg-black/10 dark:bg-white/10 backdrop-blur-sm border border-current/15 text-xs">
              <button
                type="button"
                onClick={() => setCopyMode("production")}
                className={`px-3 py-1.5 rounded-full font-medium transition-all ${
                  copyMode === "production"
                    ? "bg-[#003124] text-white shadow-sm"
                    : "opacity-75 hover:opacity-100"
                }`}
              >
                Full Copy (5 Areas)
              </button>
              <button
                type="button"
                onClick={() => setCopyMode("figma")}
                className={`px-3 py-1.5 rounded-full font-medium transition-all ${
                  copyMode === "figma"
                    ? "bg-[#003124] text-white shadow-sm"
                    : "opacity-75 hover:opacity-100"
                }`}
              >
                Figma Literal Nodes
              </button>
            </div>

            {/* Background Theme picker */}
            <div className="inline-flex items-center p-1 rounded-full bg-black/10 dark:bg-white/10 backdrop-blur-sm border border-current/15 text-xs">
              <button
                type="button"
                onClick={() => setBgTheme("mint")}
                className={`px-3 py-1.5 rounded-full font-medium transition-all ${
                  bgTheme === "mint"
                    ? "bg-white text-black shadow-sm"
                    : "opacity-75 hover:opacity-100"
                }`}
              >
                Figma Mint (#E8F3EE)
              </button>
              <button
                type="button"
                onClick={() => setBgTheme("cream")}
                className={`px-3 py-1.5 rounded-full font-medium transition-all ${
                  bgTheme === "cream"
                    ? "bg-white text-black shadow-sm"
                    : "opacity-75 hover:opacity-100"
                }`}
              >
                Light Cream (#F7F5F0)
              </button>
              <button
                type="button"
                onClick={() => setBgTheme("evergreen")}
                className={`px-3 py-1.5 rounded-full font-medium transition-all ${
                  bgTheme === "evergreen"
                    ? "bg-white text-black shadow-sm"
                    : "opacity-75 hover:opacity-100"
                }`}
              >
                Evergreen (#003124)
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION PRESENTATION (Matching Image 1 Figma Layout)
            ========================================================================= */}
        <section className="flex flex-col items-center text-center gap-8">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-4">
            <h2
              className="text-[32px] sm:text-[44px] lg:text-[48px] font-bold leading-[1.12] tracking-tight m-0"
              style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
            >
              Working together for sustainable growth.
            </h2>
            <p
              className="text-[15px] sm:text-[17px] leading-relaxed opacity-80 m-0 max-w-2xl"
              style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
            >
              NYEIB collaborates with financial institutions, government bodies, development partners and technical experts to strengthen responsible investment practices, support business resilience and advance sustainable economic growth.
            </p>
            <p
              className="text-xs sm:text-sm font-semibold tracking-wide uppercase opacity-65 mt-2"
              style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
            >
              Our areas of collaboration include:
            </p>
          </div>

          {/* Cards Grid: 3 in top row, 2 centered in bottom row (matching Figma Image 1) */}
          <div className="w-full flex flex-col items-center gap-6 sm:gap-8 pt-4">
            {/* Top row: 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-[1280px] justify-items-center">
              {items.slice(0, 3).map((card) => (
                <div key={card.id} className="w-full flex flex-col items-center">
                  <PartnershipWaveCard
                    title={card.title}
                    description={card.description}
                  />
                  <span className="text-[11px] font-mono opacity-50 mt-2 block">
                    Figma node {card.nodeId}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom row: 2 cards centered */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full max-w-[840px] justify-items-center">
              {items.slice(3, 5).map((card) => (
                <div key={card.id} className="w-full flex flex-col items-center">
                  <PartnershipWaveCard
                    title={card.title}
                    description={card.description}
                  />
                  <span className="text-[11px] font-mono opacity-50 mt-2 block">
                    Figma node {card.nodeId}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Spec / Design Details Card */}
        <div className="mt-8 p-6 sm:p-8 rounded-[24px] bg-black/5 dark:bg-white/5 border border-current/10 max-w-3xl mx-auto w-full flex flex-col gap-4 text-xs sm:text-sm">
          <h3 className="font-bold text-base flex items-center gap-2 m-0">
            <CheckCircle2 className="w-5 h-5 text-[#F88404]" />
            <span>Figma Implementation Specs</span>
          </h3>
          <ul className="list-disc list-inside space-y-1.5 opacity-85 leading-relaxed">
            <li><strong>Card Dimensions:</strong> 398px × 452px (aspect-[398/452]) with rounded-[32px] corners</li>
            <li><strong>Title:</strong> Asul Bold ~28px in deep brand Evergreen (#003124)</li>
            <li><strong>Description:</strong> Chivo ~17px leading-[1.35] in brand Evergreen (#003124)</li>
            <li><strong>Wave Graphic:</strong> Dual-tone SVG vector with Tiger Orange (#F88404) rising from bottom-left to mid-right and Evergreen (#003124) anchor</li>
            <li><strong>Interactivity:</strong> Subtle hover lift (-translate-y-2), shadow expansion, and keyboard focus accessibility</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
