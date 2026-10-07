"use client";

import React, { useRef } from "react";
import { ArrowButton } from "@/shared/components/ArrowButton";
import { HeaderReveal } from "@/shared/components/HeaderReveal";
import { HeroCanvas } from "@/components/hero/HeroCanvas";
import { StarfieldBackground } from "@/components/inner-hero/StarfieldBackground";
import { VIDEO_STORY_CONFIG } from "@/components/video-story/config";

export interface ParticleStoryHeroProps {
  seed?: number;
  showReplay?: boolean;
}

export function ParticleStoryHero({ seed, showReplay = false }: ParticleStoryHeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={sectionRef}
      id="story"
      data-theme="dark"
      aria-label="NYEIB Story and Pathways"
      className="relative w-full min-h-[100svh] lg:h-[100svh] flex flex-col justify-end lg:justify-center overflow-hidden bg-[#07100d]"
    >
      {/* =========================================================================
          COSMIC STARFIELD & NEBULA BACKGROUND
          ========================================================================= */}
      <StarfieldBackground />

      {/* Ambient Depth Gradients & Auras */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        {/* Soft emerald aura behind upper particle bridge */}
        <div
          className="absolute -top-[10%] right-[10%] w-[700px] h-[700px] rounded-full opacity-35 blur-[150px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(0, 190, 147, 0.45) 0%, rgba(7, 16, 13, 0) 70%)",
          }}
        />
        {/* Soft amber / gold aura in center-left */}
        <div
          className="absolute top-[30%] left-[5%] w-[550px] h-[550px] rounded-full opacity-20 blur-[140px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(248, 132, 4, 0.35) 0%, rgba(7, 16, 13, 0) 70%)",
          }}
        />

        {/* Top Navbar Dimmer */}
        <div
          className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[rgba(7,16,13,0.85)] via-[rgba(7,16,13,0.4)] to-transparent pointer-events-none"
        />
      </div>

      {/* =========================================================================
          FULL-SCREEN INTERACTIVE PARTICLES (Bridge -> Ribbon -> YEIB Logo)
          ========================================================================= */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto z-[2]">
        <HeroCanvas seed={seed} showReplay={showReplay} />
      </div>

      {/* Flexible Spacer pushing frosted glass content to bottom */}
      <div className="flex-1 w-full min-h-[22vh] lg:min-h-[26vh] pointer-events-none" aria-hidden="true" />

      {/* =========================================================================
          HORIZONTAL FROSTED GLASS BOTTOM BAR:
          Houses Headline on the Left, and Paragraph + CTA on the Right.
          ========================================================================= */}
      <div className="relative z-10 w-full backdrop-blur-[36px] bg-[rgba(10,24,20,0.72)] border-t border-[rgba(238,246,242,0.14)] shadow-[0_-12px_48px_rgba(0,0,0,0.45)] py-[clamp(28px,3.5vw,48px)] px-6 sm:px-10 lg:px-16 pb-[calc(env(safe-area-inset-bottom,0px)+clamp(24px,3.5vw,40px))] pointer-events-auto">
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 min-[900px]:grid-cols-12 gap-6 min-[900px]:gap-12 items-start">
          {/* Left Column: Headline */}
          <div className="min-[900px]:col-span-7 flex flex-col justify-start">
            <HeaderReveal delay={100} duration={1000} parallaxSpeed={12}>
              <h1
                className="text-[clamp(28px,3.6vw,52px)] font-bold leading-[1.12] tracking-tight text-[var(--fg-main)] m-0"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Unlocking{" "}
                <span className="text-[var(--c-accent)] drop-shadow-[0_0_35px_rgba(46,183,140,0.55)]">
                  pathways
                </span>{" "}
                for investable businesses.
              </h1>
            </HeaderReveal>
          </div>

          {/* Right Column: Paragraph + CTA */}
          <div className="min-[900px]:col-span-5 flex flex-col justify-start gap-5 sm:gap-6 pt-1 sm:pt-1.5">
            <HeaderReveal delay={220} duration={950} mask={false} parallaxSpeed={8}>
              <p
                className="text-[15px] sm:text-[16.5px] font-normal text-[#e1c9b3]/95 leading-[1.65] m-0 max-w-[48ch]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {VIDEO_STORY_CONFIG.content.body}
              </p>
            </HeaderReveal>

            {/* CTA Button Group */}
            <div>
              <HeaderReveal delay={340} duration={900} mask={false}>
                <ArrowButton
                  href="/apply"
                  text={VIDEO_STORY_CONFIG.content.ctaText}
                  variant="orange"
                  arrowType="diagonal"
                />
              </HeaderReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
