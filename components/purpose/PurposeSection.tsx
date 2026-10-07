"use client";

import React, { useEffect, useRef, useState } from "react";
import { PURPOSE_CONFIG } from "./config";
import { Parallax } from "@/shared/components/Parallax";
import { HeaderReveal } from "@/shared/components/HeaderReveal";

export function PurposeSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check initial reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches && videoRef.current) {
        videoRef.current.pause();
      }
    };

    mediaQuery.addEventListener("change", handleMotionChange);

    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) {
      return () => {
        mediaQuery.removeEventListener("change", handleMotionChange);
      };
    }

    let isIntersecting30 = false;

    // IntersectionObserver: Play only when at least 30% of the section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isIntersecting30 = entry.isIntersecting && entry.intersectionRatio >= 0.3;

          if (isIntersecting30 && !mediaQuery.matches && !document.hidden) {
            video.play().catch(() => {
              // Graceful catch for autoplay policies
            });
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: [0, 0.15, 0.3, 0.5, 0.75, 1.0],
      }
    );

    observer.observe(section);

    // Tab visibility handling: Pause when tab is hidden, resume when tab is active & in view
    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else if (isIntersecting30 && !mediaQuery.matches) {
        video.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleMotionChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="purpose"
      data-theme="light"
      aria-label="Purpose"
      className="relative w-full h-auto min-h-0 bg-[#e3ece7] text-[#12201b] py-[clamp(80px,10vw,140px)] overflow-x-clip border-t border-[rgba(18,32,27,0.08)]"
      style={{
        backgroundColor: "#e3ece7",
      }}
    >
      {/* =========================================================================
          DESKTOP LAYOUT (900px and wider)
          ========================================================================= */}
      <div className="hidden min-[900px]:block relative w-full">
        {/* Banner and In-Card Headline Container */}
        <div className="relative w-full">
          {/* Centered Video Banner with Subtle Parallax Floating Depth */}
          <Parallax speed={35} className="relative w-[78%] lg:w-[74%] mx-auto">
            <div className="relative w-full aspect-[2.6/1] min-h-[350px] rounded-[32px] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.22)] bg-[#0b1310]">
              {/* Poster Fallback Image */}
              <img
                src={PURPOSE_CONFIG.media.poster}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: PURPOSE_CONFIG.media.objectPosition }}
              />

              {/* Video Player */}
              {!prefersReducedMotion && (
                <video
                  ref={videoRef}
                  aria-hidden="true"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={PURPOSE_CONFIG.media.poster}
                  onLoadedData={() => setIsVideoLoaded(true)}
                  onCanPlay={() => setIsVideoLoaded(true)}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
                    isVideoLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ objectPosition: PURPOSE_CONFIG.media.objectPosition }}
                >
                  <source src={PURPOSE_CONFIG.media.videoWebm} type="video/webm" />
                  <source src={PURPOSE_CONFIG.media.videoMp4} type="video/mp4" />
                </video>
              )}

              {/* Rich Dark Vignette Overlay for High Typography Legibility */}
              <div
                className="absolute inset-0 pointer-events-none z-[1]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(11,19,16,0.65) 0%, rgba(11,19,16,0.20) 45%, rgba(11,19,16,0.65) 100%), radial-gradient(ellipse at center, rgba(11,19,16,0.15) 0%, rgba(11,19,16,0.45) 100%)",
                }}
                aria-hidden="true"
              />

              {/* Headline H2: Positioned over the video for high contrast and readability */}
              <h2 className="m-0 p-0 absolute inset-0 z-10 pointer-events-none p-8 lg:p-12 flex flex-col justify-between select-text">
                {/* Top-Left: "Ambition was never the problem;" */}
                <div className="self-start text-left">
                  <HeaderReveal delay={80} duration={1000} mask={false} parallaxSpeed={14}>
                    <span
                      className="block font-normal text-[clamp(18px,2.2vw,30px)] tracking-[0.03em] text-[#eef6f2]/90 mb-1"
                      style={{ fontFamily: "var(--font-headline)" }}
                    >
                      {PURPOSE_CONFIG.heading.part1Small}
                    </span>
                    <span
                      className="block font-bold text-[clamp(40px,5.8vw,92px)] leading-none tracking-[-0.01em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
                      style={{
                        fontFamily: "var(--font-headline)",
                      }}
                    >
                      {PURPOSE_CONFIG.heading.part1Big}
                    </span>
                  </HeaderReveal>
                </div>

                {/* Bottom-Right: "access was." */}
                <div className="self-end text-right">
                  <HeaderReveal delay={180} duration={1000} mask={false} parallaxSpeed={14}>
                    <span
                      className="block font-bold text-[clamp(40px,5.8vw,92px)] leading-none tracking-[-0.01em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
                      style={{
                        fontFamily: "var(--font-headline)",
                      }}
                    >
                      <span className="text-[#2eb78c] drop-shadow-[0_0_28px_rgba(46,183,140,0.6)]">
                        access
                      </span>{" "}
                      was.
                    </span>
                  </HeaderReveal>
                </div>
              </h2>
            </div>
          </Parallax>
        </div>

        {/* 1px Horizontal Line */}
        <div
          className="w-[78%] lg:w-[74%] mx-auto h-[1px] mt-[clamp(48px,6vw,84px)]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(18, 32, 27, 0.16) 50%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Two Columns Grid directly below the line (Matches banner grid width) */}
        <div className="w-[78%] lg:w-[74%] mx-auto mt-[clamp(28px,3.5vw,44px)] flex items-start justify-between">
          {/* Left Column: Purpose Label with 4 Corner Brackets */}
          <div className="flex-shrink-0">
            <HeaderReveal delay={100} duration={800} mask={false}>
              <div className="relative inline-flex items-center justify-center px-[28px] py-[18px]">
                {/* Corner Brackets */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 w-[14px] h-[14px] border-t border-l border-[#003124]/30 pointer-events-none"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-0 right-0 w-[14px] h-[14px] border-t border-r border-[#003124]/30 pointer-events-none"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 w-[14px] h-[14px] border-b border-l border-[#003124]/30 pointer-events-none"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 right-0 w-[14px] h-[14px] border-b border-r border-[#003124]/30 pointer-events-none"
                />
                <span
                  className="text-[16px] font-normal tracking-wider text-[#12201b]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {PURPOSE_CONFIG.label}
                </span>
              </div>
            </HeaderReveal>
          </div>

          {/* Right Column: Starts at ~52% of banner width (w-[48%], max-width 44ch) */}
          <div className="w-[48%] max-w-[44ch] pt-1">
            <HeaderReveal delay={200} duration={900} mask={false} parallaxSpeed={8}>
              <p
                className="text-[clamp(15px,1.25vw,19px)] leading-[1.6] text-[#12201b]/80 font-normal m-0"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {PURPOSE_CONFIG.paragraph}
              </p>
            </HeaderReveal>
          </div>
        </div>
      </div>

      {/* =========================================================================
          PHONE & TABLET LAYOUT (under 900px)
          Stacked Order: Headline -> Video Banner -> Line -> Label -> Paragraph
          ========================================================================= */}
      <div className="block min-[900px]:hidden px-[6vw] flex flex-col space-y-[6vw]">
        {/* 1. Headline (No overlap, left aligned, small line then big line, then 'access was.') */}
        <h2 className="text-left m-0 p-0">
          <HeaderReveal delay={80} duration={900} mask={false}>
            <span
              className="block font-normal text-[clamp(16px,4.5vw,22px)] tracking-[0.03em] text-[#12201b]/80 mb-2"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              {PURPOSE_CONFIG.heading.part1Small}
            </span>
            <span
              className="block font-bold text-[clamp(36px,11vw,64px)] leading-[1.05] tracking-[-0.01em] text-[#12201b]"
              style={{
                fontFamily: "var(--font-headline)",
              }}
            >
              {PURPOSE_CONFIG.heading.part1Big}
            </span>
            <span
              className="block font-bold text-[clamp(36px,11vw,64px)] leading-[1.05] tracking-[-0.01em] text-[#12201b] mt-1"
              style={{
                fontFamily: "var(--font-headline)",
              }}
            >
              <span className="text-[#008f6e] drop-shadow-[0_0_20px_rgba(0,190,147,0.25)]">
                access
              </span>{" "}
              was.
            </span>
          </HeaderReveal>
        </h2>

        {/* 2. Video Banner (Full width with 32px radius, aspect ratio 4/3) */}
        <div className="relative w-full aspect-[4/3] rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-xl bg-[#0b1310]">
          <img
            src={PURPOSE_CONFIG.media.poster}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: PURPOSE_CONFIG.media.objectPosition }}
          />

          {!prefersReducedMotion && (
            <video
              ref={videoRef}
              aria-hidden="true"
              muted
              loop
              playsInline
              preload="metadata"
              poster={PURPOSE_CONFIG.media.poster}
              onLoadedData={() => setIsVideoLoaded(true)}
              onCanPlay={() => setIsVideoLoaded(true)}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
                isVideoLoaded ? "opacity-100" : "opacity-0"
              }`}
              style={{ objectPosition: PURPOSE_CONFIG.media.objectPosition }}
            >
              <source src={PURPOSE_CONFIG.media.videoWebm} type="video/webm" />
              <source src={PURPOSE_CONFIG.media.videoMp4} type="video/mp4" />
            </video>
          )}

          <div
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,19,16,0.25) 0%, rgba(11,19,16,0.08) 50%, rgba(11,19,16,0.30) 100%)",
            }}
            aria-hidden="true"
          />
        </div>

        {/* 3. 1px Gradient Line */}
        <div
          className="w-full h-[1px] my-2"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(18, 32, 27, 0.16) 50%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* 4. Purpose Label in Corner-Bracket Frame */}
        <div className="self-start">
          <HeaderReveal delay={100} duration={800} mask={false}>
            <div className="relative inline-flex items-center justify-center px-[24px] py-[14px]">
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 w-[14px] h-[14px] border-t border-l border-[#003124]/30 pointer-events-none"
              />
              <span
                aria-hidden="true"
                className="absolute top-0 right-0 w-[14px] h-[14px] border-t border-r border-[#003124]/30 pointer-events-none"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 w-[14px] h-[14px] border-b border-l border-[#003124]/30 pointer-events-none"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-0 right-0 w-[14px] h-[14px] border-b border-r border-[#003124]/30 pointer-events-none"
              />
              <span
                className="text-[15px] font-normal tracking-wider text-[#12201b]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {PURPOSE_CONFIG.label}
              </span>
            </div>
          </HeaderReveal>
        </div>

        {/* 5. Paragraph */}
        <div className="w-full">
          <HeaderReveal delay={200} duration={900} mask={false}>
            <p
              className="text-[clamp(15px,3.8vw,18px)] leading-[1.6] text-[#12201b]/80 font-normal m-0 max-w-[48ch]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {PURPOSE_CONFIG.paragraph}
            </p>
          </HeaderReveal>
        </div>
      </div>
    </section>
  );
}
