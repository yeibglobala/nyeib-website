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
   * Default: "/images/african-american-man-woman-home-office-analyzes-online-business-trends.jpg"
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
   * Default: "/images/inner-pages-hero-layout-mobile-svg.svg"
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
  mobileSvgSrc = "/images/inner-pages-hero-layout-mobile-svg.svg",
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
  const imageSrc = customImageSrc ?? data?.imageSrc ?? "/images/african-american-man-woman-home-office-analyzes-online-business-trends.jpg";
  const mobileImageSrc = customMobileImageSrc ?? data?.mobileImageSrc ?? imageSrc;
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
      className={`relative w-full overflow-hidden bg-[#003124] h-[100svh] min-h-[620px] lg:h-screen lg:min-h-[680px] xl:min-h-[720px] flex flex-col justify-end select-none ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {/* =========================================================================
          1. BACKGROUND PHOTOGRAPHY (Responsive character-aware container)
          - Mobile (< md): Loads mobileImageSrc with optimal character framing
          - Desktop (>= md): Loads full-resolution wide landscape image
          ========================================================================= */}
      <div className="absolute inset-0 size-full overflow-hidden pointer-events-none z-0">
        {/* Mobile crop (< md) */}
        <div className="relative w-full h-full block md:hidden">
          <Image
            src={mobileImageSrc}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-top pointer-events-none"
          />
        </div>

        {/* Desktop photograph (>= md) */}
        <div className="relative w-full h-full hidden md:block">
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

      {/* =========================================================================
          2. SWEEPING CURVED OVERLAYS
          - Mobile / Tablet (< md): inner-pages-hero-layout-mobile-svg.svg (516 x 1057)
          - Desktop (>= md): inner-pages-hero-layou-svg.svg (1440 x 819)
          Fills the bottom area and right slope with solid #003124
          ========================================================================= */}
      {/* Mobile Curve (< md) */}
      <div
        className="absolute inset-0 size-full pointer-events-none z-10 overflow-hidden block md:hidden"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 516 1057"
          preserveAspectRatio="none"
          className="w-full h-full block"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1941.72 607.261C1959.31 597.52 1973 574.142 1973 550.764L1973 -238.249C1973 -290.85 1916.3 -320.072 1873.29 -294.746L639.567 459.199C373.663 622.846 58.8783 691.033 -253.951 659.862L-1313.66 546.867C-1352.76 544.919 -1386 574.142 -1386 613.105L-1386 1084.56C-1386 1115.74 -1366.45 1141.06 -1337.12 1148.85C-1020.38 1220.94 -691.911 1257.95 -351.709 1257.95C490.973 1261.85 1276.96 1024.17 1941.72 607.261Z"
            fill={bgColor}
          />
        </svg>
      </div>

      {/* Desktop Curve (>= md)
          Anchored to the bottom with elevated height scaling on small desktop viewports (lg)
          to ensure the dark green wave provides generous headroom above wrapped text. */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none z-10 overflow-hidden hidden md:block h-[115%] lg:h-[132%] xl:h-[120%] 2xl:h-full"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 819"
          preserveAspectRatio="none"
          className="w-full h-full block"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2053.91 555.314C2065.77 548.747 2075 532.987 2075 517.227L2075 -14.6749C2075 -50.135 2036.77 -69.835 2007.76 -52.7617L1175.86 455.5C996.554 565.82 784.293 611.787 573.35 590.774L-141.219 514.6C-167.587 513.287 -190 532.987 -190 559.253L-190 877.081C-190 898.094 -176.816 915.168 -157.04 920.421C56.5395 969.015 278.03 993.968 507.43 993.968C1075.66 996.595 1605.65 836.368 2053.91 555.314Z"
            fill={bgColor}
          />
        </svg>
      </div>

      {/* =========================================================================
          3. CONTENT AREA (Directly positioned on top of the deep green #003124 ground)
          Responsive typography matching Figma nodes with optimized scaling on laptops
          ========================================================================= */}
      <div className="relative z-20 w-full px-5 sm:px-8 md:px-12 lg:px-16 pt-8 pb-8 sm:pb-10 md:pb-12 lg:pb-10 xl:pb-14 2xl:pb-16">
        <div className="max-w-[1320px] w-full mx-auto flex flex-col lg:flex-row items-start justify-between gap-6 sm:gap-8 lg:gap-10 xl:gap-14 2xl:gap-16">
          {/* Left Column / Mobile Top: Bold Asul Editorial Headline */}
          <div className="w-full lg:w-[58%] max-w-[680px]">
            <h1
              className="text-[26px] sm:text-[32px] md:text-[38px] lg:text-[36px] xl:text-[44px] 2xl:text-[48px] font-bold text-[#F2FBF6] tracking-tight leading-[1.2] sm:leading-[1.18] lg:leading-[1.16]"
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
