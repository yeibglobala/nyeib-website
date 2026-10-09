"use client";

import React from "react";
import Image from "next/image";
import { INNER_HERO_DATA, InnerHeroData } from "./config";
import { HeaderReveal } from "@/shared/components/HeaderReveal";

export interface InnerHeroProps {
  slug?: string;
  headline?: string;
  subtext?: string;
}

export function InnerHero({
  slug = "what-we-do",
  headline: customHeadline,
  subtext: customSubtext,
}: InnerHeroProps) {
  // Resolve data from slug if provided, or use custom props
  const defaultData: InnerHeroData = (slug && INNER_HERO_DATA[slug]) || {
    slug: slug || "custom",
    imageSrc: "/images/what-we-do.png",
    headline: customHeadline || "Unlocking Pathways for Investable Businesses",
    subtext:
      customSubtext ||
      "Connecting growth-oriented businesses with strategic capital, partnerships and support.",
  };

  const headline = customHeadline || defaultData.headline;
  const subtext = customSubtext || defaultData.subtext;
  const imageSrc = defaultData.imageSrc || "/images/what-we-do.png";

  return (
    <section
      id="inner-hero"
      data-theme="light"
      aria-label={headline}
      className="relative w-full bg-white text-[#003124] pt-36 sm:pt-44 md:pt-48 lg:pt-52 pb-12 sm:pb-16 lg:pb-24 overflow-hidden flex flex-col items-center"
    >
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-12 flex flex-col items-center">
        {/* =========================================================================
            CENTERED EDITORIAL HEADLINE & SUBTEXT
            ========================================================================= */}
        <div className="w-full max-w-4xl lg:max-w-5xl mx-auto flex flex-col items-center text-center mb-10 sm:mb-14 lg:mb-16">
          <HeaderReveal delay={60} duration={950}>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold text-[#003124] tracking-tight leading-[1.12] text-center"
              style={{ fontFamily: "var(--font-headline, serif)" }}
            >
              {headline}
            </h1>
          </HeaderReveal>

          {subtext && (
            <HeaderReveal delay={180} duration={900} mask={false}>
              <p
                className="text-base sm:text-lg md:text-[19px] text-[#003124]/75 font-normal leading-relaxed max-w-2xl mx-auto mt-5 sm:mt-6"
                style={{ fontFamily: "var(--font-body, sans-serif)" }}
              >
                {subtext}
              </p>
            </HeaderReveal>
          )}
        </div>

        {/* =========================================================================
            LARGE CINEMATIC ROUNDED PHOTOGRAPHY CONTAINER (Matching Reference Design)
            ========================================================================= */}
        <div className="w-full relative h-[360px] sm:h-[480px] md:h-[580px] lg:h-[680px] rounded-[24px] sm:rounded-[36px] lg:rounded-[44px] overflow-hidden shadow-[0_20px_50px_rgba(0,49,36,0.08)] border border-[rgba(0,49,36,0.06)] bg-[#F2FBF6]">
          <Image
            src={imageSrc}
            alt={headline}
            fill
            priority
            sizes="(max-width: 1400px) 100vw, 1400px"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
