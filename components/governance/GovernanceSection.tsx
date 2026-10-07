"use client";

import React, { useState } from "react";
import { GOVERNANCE_CONFIG } from "./config";
import { PartnerCard } from "./PartnerCard";
import { useScrollReveal } from "@/shared/hooks/useScrollReveal";
import { Parallax } from "@/shared/components/Parallax";
import { HeaderReveal } from "@/shared/components/HeaderReveal";

export interface GovernanceSectionProps {
  config?: typeof GOVERNANCE_CONFIG;
}

export function GovernanceSection({ config = GOVERNANCE_CONFIG }: GovernanceSectionProps = {}) {
  const [activePartnerId, setActivePartnerId] = useState<string | null>(null);

  const { ref: cardsRef, isRevealed: isCardsRevealed } = useScrollReveal<HTMLDivElement>({
    threshold: 0.12,
  });

  return (
    <section
      id="governance"
      data-theme="dark"
      aria-label={config.topArea.tag}
      className="relative w-full bg-[#0c1f19] text-[#eef6f2] py-[clamp(72px,10vw,140px)] px-[clamp(20px,4.5vw,64px)] overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto flex flex-col space-y-16 sm:space-y-20">
        {/* =========================================================================
            TOP AREA: Institutional Relationships Header (Heading Left, Paragraph Right on Desktop)
            ========================================================================= */}
        <div className="flex flex-col space-y-4 sm:space-y-5">
          {/* Tag */}
          <HeaderReveal delay={0} duration={800} mask={false} parallaxSpeed={10}>
            <span
              className="text-[13px] font-semibold tracking-[0.16em] uppercase text-[#4fd1b0]"
              style={{ fontFamily: "var(--font-mono, monospace)" }}
            >
              {config.topArea.tag}
            </span>
          </HeaderReveal>

          {/* Heading left, paragraph right on desktop; stacked on mobile */}
          <div className="grid grid-cols-1 min-[900px]:grid-cols-12 gap-6 min-[900px]:gap-12 items-end">
            <div className="min-[900px]:col-span-7">
              <HeaderReveal delay={120} duration={950} parallaxSpeed={14}>
                <h2
                  className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold leading-[1.15] tracking-tight text-[#eef6f2] m-0"
                  style={{ fontFamily: "var(--font-headline, serif)" }}
                >
                  {config.topArea.headline}
                </h2>
              </HeaderReveal>
            </div>

            <div className="min-[900px]:col-span-5">
              <HeaderReveal delay={240} duration={950} mask={false} parallaxSpeed={12}>
                <p
                  className="text-[15.5px] sm:text-[16px] leading-[1.65] text-[#a9c2b8] max-w-[48ch] m-0"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {config.topArea.paragraph}
                </p>
              </HeaderReveal>
            </div>
          </div>
        </div>

        {/* =========================================================================
            BOTTOM AREA: PARTNER CARDS GRID (3 Columns on Desktop, 1 on Mobile)
            ========================================================================= */}
        <Parallax speed={24} className="w-full">
          <div
            ref={cardsRef}
            className={`grid grid-cols-1 min-[700px]:grid-cols-3 gap-4 sm:gap-5 w-full transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isCardsRevealed
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[22px] motion-reduce:opacity-100 motion-reduce:translate-y-0"
            }`}
          >
            {config.partners.map((partner) => (
              <PartnerCard
                key={partner.id}
                partner={partner}
                isActive={activePartnerId === partner.id}
                onActivate={() => setActivePartnerId(partner.id)}
                onDeactivate={() => setActivePartnerId((curr) => (curr === partner.id ? null : curr))}
                isAnyCardActive={activePartnerId !== null}
              />
            ))}
          </div>
        </Parallax>
      </div>
    </section>
  );
}
