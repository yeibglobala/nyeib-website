"use client";

import React, { useEffect, useRef, useState } from "react";
import { VIDEO_STORY_CONFIG } from "./config";
import { ArrowButton } from "@/shared/components/ArrowButton";

import { HeaderReveal } from "@/shared/components/HeaderReveal";

export function VideoStory() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    let isVisible = false;
    let isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Play / pause video based on viewport visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.25;

          if (isVisible && !isReducedMotion) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1.0] }
    );
    observer.observe(section);

    // Tab visibility handling
    const onVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else if (isVisible && !isReducedMotion) {
        video.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const onResize = () => {
      isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    };
    window.addEventListener("resize", onResize);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      data-theme="dark"
      aria-label="NYEIB Story and Pathways"
      className="relative w-full min-h-[100svh] lg:h-[100svh] lg:min-h-[640px] flex flex-col justify-between overflow-hidden bg-[var(--bg-deep)]"
    >
      {/* =========================================================================
          FULL-BLEED BACKGROUND VIDEO (Underneath everything)
          ========================================================================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          aria-hidden="true"
          playsInline
          muted
          loop
          preload="metadata"
          poster={VIDEO_STORY_CONFIG.media.poster}
          onCanPlay={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-out ${
            isVideoLoaded ? "opacity-100" : "opacity-85"
          }`}
        >
          <source src={VIDEO_STORY_CONFIG.media.videoWebm} type="video/webm" />
          <source src={VIDEO_STORY_CONFIG.media.videoMp4} type="video/mp4" />
        </video>

        {/* Cinematic Vignette Overlays:
            - Desktop: subtle radial/vertical fade
            - Mobile: clear at top where subject is, smooth gradient at bottom behind text
        */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[var(--bg-deep)] via-[rgba(11,19,16,0.55)] to-transparent lg:from-[rgba(11,19,16,0.65)] lg:via-transparent lg:to-[rgba(11,19,16,0.25)]"
          aria-hidden="true"
        />
        {/* Top Navbar Dimmer for mobile clarity */}
        <div
          className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[rgba(11,19,16,0.7)] to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* =========================================================================
          MOBILE TOP SPACER (Keeps top ~50% clear for sharp video display)
          ========================================================================= */}
      <div className="lg:hidden w-full h-[46svh] sm:h-[50svh] pointer-events-none" aria-hidden="true" />

      {/* =========================================================================
          CONTENT PANEL:
          - Mobile: Bottom anchored card with gradient fade
          - Desktop (lg): Left frosted glass blur panel (48% width, right-aligned)
          ========================================================================= */}
      <div
        className="relative z-10 w-full lg:w-[48%] min-w-[320px] lg:max-w-[680px] flex flex-col justify-end lg:justify-between px-[6vw] pb-[calc(env(safe-area-inset-bottom,0px)+2rem)] pt-6 lg:p-[4vw] lg:pt-[11.5rem] lg:backdrop-blur-[36px] lg:bg-[rgba(10,24,20,0.52)] lg:border-r lg:border-[rgba(238,246,242,0.12)] lg:shadow-2xl items-start lg:items-end text-left lg:text-right"
      >
        {/* Headline Group with masked reveal and subtle parallax */}
        <div className="w-full flex flex-col items-start lg:items-end text-left lg:text-right space-y-4 lg:space-y-6 pt-2 lg:pt-8">
          <HeaderReveal delay={100} duration={1000} parallaxSpeed={12}>
            <h1
              className="text-left lg:text-right text-[clamp(32px,8vw,68px)] font-bold leading-[1.08] tracking-tight text-[var(--fg-main)] max-w-[580px]"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Unlocking <br className="hidden sm:inline" />
              <span className="text-[var(--c-accent)] drop-shadow-[0_0_35px_rgba(46,183,140,0.55)]">
                pathways
              </span>{" "}
              for <br />
              investable businesses
            </h1>
          </HeaderReveal>
        </div>

        {/* Bottom CTA Group with Interactive Flip Arrow Button */}
        <div className="pt-6 pb-1 w-full flex justify-start lg:justify-end">
          <HeaderReveal delay={240} duration={900} mask={false}>
            <ArrowButton
              href={VIDEO_STORY_CONFIG.content.ctaHref}
              text={VIDEO_STORY_CONFIG.content.ctaText}
              variant="orange"
              arrowType="diagonal"
            />
          </HeaderReveal>
        </div>
      </div>

      {/* =========================================================================
          BOTTOM RIGHT: CAPTION OVER SHARP VIDEO (Desktop Only)
          ========================================================================= */}
      <div className="hidden lg:block absolute bottom-12 sm:bottom-14 lg:bottom-16 right-6 sm:right-10 lg:right-12 max-w-[480px] lg:max-w-[520px] z-10 pointer-events-none text-right">
        <HeaderReveal delay={300} duration={950} mask={false} parallaxSpeed={8}>
          <p
            className="text-[15.5px] sm:text-[16px] font-normal text-[#eef6f2] leading-[1.65] drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)] opacity-95"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {VIDEO_STORY_CONFIG.content.caption}
          </p>
        </HeaderReveal>
      </div>
    </section>
  );
}

