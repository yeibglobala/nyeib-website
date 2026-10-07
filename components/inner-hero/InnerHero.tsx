"use client";

import React from "react";
import { INNER_HERO_DATA, InnerHeroData } from "./config";
import { HeaderReveal } from "@/shared/components/HeaderReveal";
import { HeroCanvas } from "@/components/hero/HeroCanvas";
import { StarfieldBackground } from "./StarfieldBackground";
import { Parallax } from "@/shared/components/Parallax";

export interface InnerHeroProps {
  slug?: string;
  headline?: string;
  subtext?: string;
  seed?: number;
  showReplay?: boolean;
}

export function InnerHero({
  slug,
  headline: customHeadline,
  subtext: customSubtext,
  seed,
  showReplay = false,
}: InnerHeroProps) {
  // Resolve data from slug if provided, or use custom props
  const defaultData: InnerHeroData = (slug && INNER_HERO_DATA[slug]) || {
    slug: slug || "custom",
    imageSrc: "",
    headline: customHeadline || "Unlocking Pathways for Investable Businesses",
    subtext:
      customSubtext ||
      "Connecting growth-oriented businesses with strategic capital, partnerships and support.",
  };

  const headline = customHeadline || defaultData.headline;
  const subtext = customSubtext || defaultData.subtext;

  return (
    <section
      id="hero"
      data-theme="dark"
      aria-label={headline}
      className="relative w-full overflow-hidden bg-[#07100d] flex flex-col justify-center min-h-[100vh] min-h-[100svh] min-h-[100dvh] pt-24 min-[900px]:pt-28 pb-12 sm:pb-16"
    >
      {/* Full-Bleed Outer Space Starfield Background */}
      <StarfieldBackground />

      {/* Ambient Lighting & Depth Gradients */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        {/* Soft radial emerald aura in top-right behind particles */}
        <div
          className="absolute -top-[10%] right-[0%] w-[650px] h-[650px] rounded-full opacity-30 blur-[140px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(0, 190, 147, 0.45) 0%, rgba(7, 16, 13, 0) 70%)",
          }}
        />
        {/* Soft amber / gold aura in center-right */}
        <div
          className="absolute top-[40%] right-[15%] w-[450px] h-[450px] rounded-full opacity-20 blur-[120px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(248, 132, 4, 0.35) 0%, rgba(7, 16, 13, 0) 70%)",
          }}
        />

        {/* Top Navbar Dimmer */}
        <div
          className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[rgba(7,16,13,0.9)] via-[rgba(7,16,13,0.4)] to-transparent pointer-events-none"
        />

        {/* Bottom Edge Fade into Page */}
        <div
          className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent via-[rgba(7,16,13,0.75)] to-[#0b1310] pointer-events-none"
        />
      </div>

      {/* Main Split Grid Layout */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 my-auto">
        <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 min-[900px]:grid-cols-12 gap-8 min-[900px]:gap-12 items-center">
          {/* Left Column: Text (Headline + Subtext) */}
          <div className="min-[900px]:col-span-6 min-[1200px]:col-span-5 flex flex-col space-y-6 pt-4 min-[900px]:pt-0">
            <HeaderReveal delay={80} duration={1000} parallaxSpeed={12}>
              <h1
                className="text-white font-normal text-left tracking-[-0.015em] leading-[1.12] text-[clamp(32px,3.8vw,56px)] m-0"
                style={{ fontFamily: "var(--font-headline, serif)" }}
              >
                {headline}
              </h1>
            </HeaderReveal>

            <HeaderReveal delay={200} duration={950} mask={false} parallaxSpeed={8}>
              <p
                className="text-[#e1c9b3] text-left leading-[1.65] text-[clamp(15px,1.2vw,18.5px)] font-normal m-0 max-w-[48ch]"
                style={{ fontFamily: "var(--font-body, sans-serif)" }}
              >
                {subtext}
              </p>
            </HeaderReveal>
          </div>

          {/* Right Column: Particle WebGL Canvas Stage */}
          <div className="min-[900px]:col-span-6 min-[1200px]:col-span-7 relative w-full aspect-[4/3] sm:aspect-[16/11] min-[900px]:aspect-auto min-[900px]:h-[560px] min-[1200px]:h-[600px] max-h-[72vh] flex items-center justify-center pointer-events-auto">
            <Parallax speed={16} className="w-full h-full relative">
              <div className="relative w-full h-full">
                <HeroCanvas seed={seed} showReplay={showReplay} />
              </div>
            </Parallax>
          </div>
        </div>
      </div>
    </section>
  );
}
