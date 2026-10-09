"use client";

import React, { useRef } from "react";
import { ArrowButton } from "@/shared/components/ArrowButton";
import { HeaderReveal } from "@/shared/components/HeaderReveal";
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
      className="relative w-full min-h-[100svh] flex flex-col justify-between overflow-hidden bg-[#003124] pt-20 sm:pt-24"
    >
      {/* =========================================================================
          FULL-BLEED CINEMATIC HERO VIDEO BACKGROUND
          ========================================================================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none select-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/video/poster.jpg"
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src="/video/hero-video.mp4" type="video/mp4" />
          <source src="/video/hero-video.webm" type="video/webm" />
        </video>

        {/* Ambient Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#003124]/90" />
        <div className="absolute inset-0 bg-[rgba(0,49,36,0.3)] mix-blend-multiply" />
      </div>

      {/* Spacer to give the video prominent visual prominence */}
      <div className="relative z-[2] flex-1 w-full min-h-[300px] sm:min-h-[400px] lg:min-h-[460px] pointer-events-none" />

      {/* =========================================================================
          HORIZONTAL FROSTED GLASS BOTTOM BAR:
          Houses Headline on the Left, and Paragraph + CTA on the Right.
          ========================================================================= */}
      <div className="relative z-10 w-full backdrop-blur-[36px] bg-[rgba(0,49,36,0.78)] border-t border-[rgba(238,246,242,0.14)] shadow-[0_-12px_48px_rgba(0,0,0,0.45)] py-[clamp(24px,3vw,44px)] px-6 sm:px-10 lg:px-16 pb-[calc(env(safe-area-inset-bottom,0px)+clamp(20px,3vw,36px))] pointer-events-auto">
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
