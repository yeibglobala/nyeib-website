"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { INNER_HERO_DATA, InnerHeroData } from "./config";
import { HeaderReveal } from "@/shared/components/HeaderReveal";

export interface InnerHeroProps {
  slug?: string;
  headline?: string;
  subtext?: string;
  imageSrc?: string;
  overlayStrength?: number;
}

export function InnerHero({
  slug,
  headline: customHeadline,
  subtext: customSubtext,
  imageSrc: customImageSrc,
  overlayStrength: customOverlayStrength,
}: InnerHeroProps) {
  // Resolve data from slug if provided, or use custom props
  const defaultData: InnerHeroData = (slug && INNER_HERO_DATA[slug]) || {
    slug: slug || "custom",
    imageSrc: customImageSrc || (slug ? `/images/${slug}.png` : "/images/what-we-do.png"),
    headline: customHeadline || "Unlocking Pathways for Investable Businesses",
    subtext:
      customSubtext ||
      "Connecting growth-oriented businesses with strategic capital, partnerships and support.",
    overlayStrength: 1.0,
  };

  const headline = customHeadline || defaultData.headline;
  const subtext = customSubtext || defaultData.subtext;
  const imageSrc = customImageSrc || defaultData.imageSrc;
  const overlayStrength = customOverlayStrength ?? defaultData.overlayStrength ?? 1.0;

  const sectionRef = useRef<HTMLElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    // Trigger text entrance animation on mount
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50);

    // Observe when the hero is in view to pause/resume background drift
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      clearTimeout(timer);
      mediaQuery.removeEventListener("change", handleMotionChange);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-theme="dark"
      aria-label={headline}
      className="relative w-full overflow-hidden bg-[#0b1310] flex flex-col justify-end min-[700px]:justify-center h-screen min-h-[100vh] min-h-[100svh] min-h-[100dvh]"
    >
      {/* =========================================================================
          BACKGROUND IMAGE CONTAINER WITH SLOW DRIFT & PLACEHOLDER FALLBACK
          ========================================================================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
        {!imageError ? (
          <div
            className="relative w-full h-full will-change-transform"
            style={{
              animation:
                prefersReducedMotion
                  ? "none"
                  : "innerHeroDrift 28s ease-in-out infinite alternate",
              animationPlayState: isIntersecting ? "running" : "paused",
            }}
          >
            <Image
              src={imageSrc}
              alt=""
              fill
              priority
              quality={80}
              sizes="100vw"
              onError={() => setImageError(true)}
              className="object-cover object-center"
            />
          </div>
        ) : (
          /* Placeholder Fallback if image is missing or failed to load */
          <div
            className="w-full h-full"
            style={{
              background:
                "radial-gradient(ellipse at 70% 40%, rgba(46, 183, 140, 0.24) 0%, rgba(12, 31, 25, 0.65) 45%, #0b1310 85%)",
            }}
          />
        )}

        {/* =======================================================================
            OVERLAYS & GRADIENTS (DESKTOP LEFT READABILITY & MOBILE BOTTOM FADE)
            ======================================================================= */}
        
        {/* Desktop & Tablet: Soft dark gradient from the left (0% to ~62% width) */}
        <div
          className="hidden min-[700px]:block absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, rgba(11,19,16,${0.85 * overlayStrength}) 0%, rgba(11,19,16,${0.72 * overlayStrength}) 28%, rgba(11,19,16,${0.28 * overlayStrength}) 50%, rgba(11,19,16,0) 64%)`,
          }}
          aria-hidden="true"
        />

        {/* Phone: Strong dark gradient from the bottom (0% to ~65% height) */}
        <div
          className="block min-[700px]:hidden absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(0deg, rgba(11,19,16,${0.95 * overlayStrength}) 0%, rgba(11,19,16,${0.82 * overlayStrength}) 36%, rgba(11,19,16,${0.35 * overlayStrength}) 56%, rgba(11,19,16,0) 68%)`,
          }}
          aria-hidden="true"
        />

        {/* Top Navbar Dimmer: Keeps fixed logo and menu pill perfectly legible */}
        <div
          className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[rgba(11,19,16,0.7)] via-[rgba(11,19,16,0.3)] to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Bottom edge fade: 140px blend into page background (#0b1310) */}
        <div
          className="absolute bottom-0 inset-x-0 h-[140px] bg-gradient-to-b from-transparent via-[rgba(11,19,16,0.65)] to-[#0b1310] pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* =========================================================================
          HERO TEXT CONTENT (HEADLINE + SUBTEXT WITH SMOOTH HEADER REVEAL)
          ========================================================================= */}
      <div className="relative z-10 w-full px-6 min-[700px]:px-[5vw] pt-28 min-[700px]:pt-32 min-[1100px]:pt-36 pb-12 min-[700px]:pb-16 flex flex-col justify-end min-[700px]:justify-center">
        {/* Main H1 Headline */}
        <HeaderReveal delay={80} duration={1000} parallaxSpeed={12}>
          <h1
            className="text-white font-normal text-left tracking-[-0.015em] leading-[1.1] max-w-full min-[700px]:max-w-[60vw] min-[1100px]:max-w-[42vw] text-[clamp(30px,7.5vw,36px)] min-[700px]:text-[clamp(32px,3.6vw,58px)] m-0"
            style={{ fontFamily: "var(--font-headline, serif)" }}
          >
            {headline}
          </h1>
        </HeaderReveal>

        {/* Subtext */}
        <div className="mt-5 sm:mt-6">
          <HeaderReveal delay={200} duration={950} mask={false} parallaxSpeed={8}>
            <p
              className="text-[#e1c9b3] text-left leading-[1.55] max-w-full min-[700px]:max-w-[58vw] min-[1100px]:max-w-[36vw] text-[clamp(15px,3.8vw,17px)] min-[700px]:text-[clamp(15px,1.25vw,19px)] font-normal m-0"
              style={{ fontFamily: "var(--font-body, sans-serif)" }}
            >
              {subtext}
            </p>
          </HeaderReveal>
        </div>
      </div>

      {/* Embedded CSS Keyframes for slow subtle drift */}
      <style jsx>{`
        @keyframes innerHeroDrift {
          0% {
            transform: scale(1.03);
          }
          100% {
            transform: scale(1.08);
          }
        }
      `}</style>
    </section>
  );
}
