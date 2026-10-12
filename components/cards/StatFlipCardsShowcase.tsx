"use client";

import React from "react";
import { StatFlipCard } from "./StatFlipCard";

export interface StatFlipCardsShowcaseProps {
  headline?: string;
  subhead?: string;
  className?: string;
}

export function StatFlipCardsShowcase({
  headline = "Capital Deployment & Governance",
  subhead = "Hover or tap on each card to flip and reveal capital channels and institutional structures.",
  className = "",
}: StatFlipCardsShowcaseProps) {
  return (
    <div className={`w-full py-12 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-10">
        {(headline || subhead) && (
          <div className="text-center max-w-xl mx-auto flex flex-col gap-2.5">
            {headline && (
              <h2
                className="text-2xl sm:text-3xl font-bold text-[#003124]"
                style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
              >
                {headline}
              </h2>
            )}
            {subhead && (
              <p
                className="text-sm sm:text-base text-[#003124]/75 font-normal"
                style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
              >
                {subhead}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center justify-center">
          {/* Card Style 1 (Mint Cream + Double Wave) */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs uppercase font-mono tracking-wider text-[#003124]/60 font-semibold">
              Card Style 1
            </span>
            <StatFlipCard variant="style1" />
          </div>

          {/* Card Style 2 (White + Single Wave) */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs uppercase font-mono tracking-wider text-[#003124]/60 font-semibold">
              Card Style 2
            </span>
            <StatFlipCard variant="style2" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatFlipCardsShowcase;
