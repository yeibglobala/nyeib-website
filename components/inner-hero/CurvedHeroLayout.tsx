"use client";

import React from "react";
import Image from "next/image";

import { INNER_HERO_DATA, InnerHeroData } from "./config";

export interface CurvedHeroLayoutProps {
  /**
   * Optional inner page slug (e.g. "what-we-do", "who-we-serve", "impact-and-measurement", "partners-and-investors", "esg-and-sustainability").
   * Automatically resolves headline, highlight keyword, description, and photography.
   */
  slug?: string;

  /**
   * Title prefix before the highlighted keyword.
   * Default: "We exist to unlock "
   */
  titlePrefix?: string;

  /**
   * Highlighted keyword in emerald (#00BE93).
   * Default: "pathways"
   */
  highlight?: string;

  /**
   * Title suffix after the highlighted keyword.
   * Default: " for investable businesses."
   */
  titleSuffix?: string;

  /**
   * Optional full headline override. If provided, replaces prefix/highlight/suffix.
   */
  headline?: React.ReactNode;

  /**
   * Paragraph description text.
   * Default: "NYEIB connects growth-oriented businesses with the capital, strategic partnerships and practical support they need to become more credible, resilient and investment-ready."
   */
  description?: string;

  /**
   * Backward-compatibility alias for description.
   */
  subtext?: string;

  /**
   * Background photograph source for desktop.
   * Default: "/images/heroes/what-we-do-desktop.webp"
   */
  imageSrc?: string;

  /**
   * Optional dedicated mobile-optimized hero crop.
   */
  mobileImageSrc?: string;

  /**
   * Image alt text.
   */
  imageAlt?: string;

  /**
   * Path to the desktop curve SVG overlay.
   * Default: "/images/inner-pages-hero-layou-svg.svg"
   */
  svgSrc?: string;

  /**
   * Path to the mobile curve SVG overlay.
   * Default: "/images/mobile-inner-page-svg.svg"
   */
  mobileSvgSrc?: string;

  /**
   * Base background color for the bottom curved fill.
   * Default: "#003124"
   */
  bgColor?: string;

  /**
   * Additional container className.
   */
  className?: string;

  /**
   * Optional CTA button text.
   */
  ctaText?: string;

  /**
   * Optional CTA button link.
   */
  ctaHref?: string;
}

export function CurvedHeroLayout({
  slug,
  titlePrefix: customTitlePrefix,
  highlight: customHighlight,
  titleSuffix: customTitleSuffix,
  headline: customHeadline,
  description: customDescription,
  subtext,
  imageSrc: customImageSrc,
  mobileImageSrc: customMobileImageSrc,
  imageAlt: customImageAlt,
  svgSrc = "/images/inner-pages-hero-layou-svg.svg",
  mobileSvgSrc = "/images/mobile-inner-page-svg.svg",
  bgColor = "#003124",
  className = "",
  ctaText,
  ctaHref,
}: CurvedHeroLayoutProps) {
  const data: InnerHeroData | undefined = slug ? INNER_HERO_DATA[slug] : undefined;

  const titlePrefix = customTitlePrefix ?? data?.titlePrefix ?? (data ? undefined : "We exist to unlock ");
  const highlight = customHighlight ?? data?.highlight ?? (data ? undefined : "pathways");
  const titleSuffix = customTitleSuffix ?? data?.titleSuffix ?? (data ? undefined : " for investable businesses.");
  const headline = customHeadline ?? (titlePrefix ? undefined : data?.headline);
  const description = customDescription ?? subtext ?? data?.subtext ?? "NYEIB connects growth-oriented businesses with the capital, strategic partnerships and practical support they need to become more credible, resilient and investment-ready.";
  const imageSrc = customImageSrc ?? data?.imageSrc ?? "/images/heroes/what-we-do-desktop.webp";
  const mobileImage = customMobileImageSrc ?? data?.mobileImageSrc ?? imageSrc;
  const imageAlt = customImageAlt ?? (data?.headline || "We exist to unlock pathways for investable businesses.");

  return (
    <section
      id="curved-hero-layout"
      data-theme="dark"
      aria-label={
        typeof headline === "string"
          ? headline
          : `${titlePrefix}${highlight}${titleSuffix}`
      }
      className={`relative w-full overflow-hidden bg-[#003124] flex flex-col justify-between min-h-[100svh] pt-[76px] sm:pt-[88px] md:pt-0 md:justify-end md:h-[100svh] md:min-h-[660px] lg:h-screen lg:min-h-[700px] xl:min-h-[720px] select-none ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {/* =========================================================================
          1. MOBILE LANDSCAPE PHOTOGRAPHY (< md)
          Positioned below the floating navbar (via pt-[76px]) so the navbar never
          obscures subjects' heads or faces, with full horizontal context visible.
          ========================================================================= */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[220px] max-h-[360px] shrink-0 overflow-hidden block md:hidden z-0">
        <Image
          src={mobileImage}
          alt={imageAlt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1px"
          className="object-cover object-center pointer-events-none"
        />

        {/* Bottom Curved Wave Cut (Orange #F88404 + Evergreen #003124 from mobile-inner-page-svg.svg) */}
        <div
          className="absolute inset-x-0 -bottom-[1px] w-full pointer-events-none z-10 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src={mobileSvgSrc}
            alt=""
            className="w-full h-auto block translate-y-[42.8%] pointer-events-none select-none"
          />
        </div>
      </div>

      {/* =========================================================================
          2. DESKTOP PHOTOGRAPHY & SWEEPING CURVE (>= md)
          Retains the full-bleed desktop photographic sweep with deep green wave.
          ========================================================================= */}
      <div className="absolute inset-0 size-full overflow-hidden pointer-events-none z-0 hidden md:block">
        <div className="relative w-full h-full">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_16%] pointer-events-none"
          />
        </div>

        {/* Subtle cinematic top gradient for clean navigation bar readability */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#001f17]/50 via-transparent to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Desktop Sweeping Curved Overlay (>= md)
          Anchored to the bottom with elevated height scaling on medium and laptop viewports (md/lg)
          to ensure the dark green wave provides generous headroom above wrapped text. */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none z-10 overflow-hidden hidden md:block w-full h-[120%] md:h-[130%] lg:h-[138%] xl:h-[124%] 2xl:h-[114%]"
        aria-hidden="true"
      >
        <img
          src={svgSrc}
          alt=""
          className="w-full h-full block object-fill pointer-events-none select-none"
        />
      </div>

      {/* =========================================================================
          3. CONTENT AREA (Positioned on top of the deep green #003124 ground)
          Responsive typography matching Figma nodes with optimized scaling
          ========================================================================= */}
      <div className="relative z-20 w-full flex-1 flex flex-col justify-center md:justify-end px-5 sm:px-8 md:px-12 lg:px-16 pt-4 sm:pt-6 md:pt-8 pb-8 sm:pb-10 md:pb-9 lg:pb-10 xl:pb-14 2xl:pb-16">
        <div className="max-w-[1320px] w-full mx-auto flex flex-col lg:flex-row items-start justify-between gap-6 sm:gap-8 lg:gap-10 xl:gap-14 2xl:gap-16">
          {/* Left Column / Mobile Top: Bold Asul Editorial Headline */}
          <div className="w-full lg:w-[60%] xl:w-[58%] max-w-[700px]">
            <h1
              className="text-[26px] sm:text-[30px] md:text-[34px] lg:text-[36px] xl:text-[44px] 2xl:text-[48px] font-bold text-[#F2FBF6] tracking-tight leading-[1.2] sm:leading-[1.18] lg:leading-[1.16]"
              style={{ fontFamily: "var(--font-headline, serif)" }}
            >
              {headline ? (
                headline
              ) : (
                <>
                  <span>{titlePrefix}</span>
                  <span className="text-[#00BE93]">{highlight}</span>
                  <span>{titleSuffix}</span>
                </>
              )}
            </h1>
          </div>

          {/* Right Column / Mobile Bottom: Refined Chivo Body Copy & Optional CTA */}
          <div className="w-full lg:w-[42%] max-w-[460px] flex flex-col items-start gap-4 sm:gap-5 lg:gap-4 xl:gap-6 lg:pt-1">
            {description && (
              <p
                className="text-[15px] sm:text-base lg:text-[15px] xl:text-[17px] 2xl:text-[19px] text-[#F2FBF6]/85 font-normal leading-relaxed lg:leading-[1.55] xl:leading-[1.6]"
                style={{ fontFamily: "var(--font-body, sans-serif)" }}
              >
                {description}
              </p>
            )}

            {ctaText && ctaHref && (
              <a
                href={ctaHref}
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#F88404] text-white font-bold text-xs sm:text-sm hover:bg-[#e07500] transition-all shadow-md active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F88404]"
              >
                {ctaText}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
