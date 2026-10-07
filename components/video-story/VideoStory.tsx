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
      className="relative w-full min-h-[100svh] lg:h-[100svh] lg:min-h-[640px] flex flex-col justify-end lg:justify-center overflow-hidden bg-[var(--bg-deep)]"
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
        {/* Top Navbar Dimmer for clarity */}
        <div
          className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[rgba(11,19,16,0.7)] to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Flexible Spacer pushing content to bottom */}
      <div className="flex-1 w-full min-h-[20vh] pointer-events-none" aria-hidden="true" />

      {/* =========================================================================
          HORIZONTAL FROSTED GLASS BOTTOM BAR:
          Houses Headline on the Left, and Paragraph + CTA on the Right.
          ========================================================================= */}
      <div className="relative z-10 w-full backdrop-blur-[36px] bg-[rgba(10,24,20,0.68)] border-t border-[rgba(238,246,242,0.14)] shadow-[0_-12px_48px_rgba(0,0,0,0.35)] py-[clamp(28px,3.5vw,48px)] px-6 sm:px-10 lg:px-16 pb-[calc(env(safe-area-inset-bottom,0px)+clamp(24px,3.5vw,40px))]">
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
