"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowButton } from "@/shared/components/ArrowButton";
import { Parallax } from "@/shared/components/Parallax";
import { HeaderReveal } from "@/shared/components/HeaderReveal";
import { PAGE_CTA_CONFIGS, DEFAULT_CTA_CONFIG, CtaConfig } from "./config";

export interface CtaSectionProps {
  headline?: string;
  subCopy?: string;
  buttonText?: string;
  buttonHref?: string;
}

export function CtaSection({
  headline: customHeadline,
  subCopy: customSubCopy,
  buttonText: customButtonText,
  buttonHref: customButtonHref,
}: CtaSectionProps = {}) {
  const pathname = usePathname();
  const pageConfig: CtaConfig =
    (pathname && PAGE_CTA_CONFIGS[pathname]) || DEFAULT_CTA_CONFIG;

  const headline = customHeadline || pageConfig.headline;
  const subCopy = customSubCopy || pageConfig.subCopy;
  const buttonText = customButtonText || pageConfig.buttonText;
  const buttonHref = customButtonHref || pageConfig.buttonHref;
  const sectionRef = useRef<HTMLElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    // Observe when the card scrolls into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="partner"
      data-theme="dark"
      aria-label="Partner with NYEIB"
      className="relative w-full bg-[#003124] pt-12 sm:pt-16 pb-12 sm:pb-16 px-6 sm:px-10 lg:px-16"
    >
      <div className="max-w-[1400px] w-full mx-auto">
        {/* Rounded Card with subtle floating parallax depth */}
        <Parallax speed={28} className="w-full">
          <div className="relative w-full h-[520px] min-[700px]:h-[64vh] min-[700px]:min-h-[440px] min-[700px]:max-h-[620px] rounded-[18px] sm:rounded-[22px] overflow-hidden border border-[rgba(238,246,242,0.12)] shadow-[0_16px_48px_rgba(0,0,0,0.6)]">
          {/* Background Image with Responsive Picture + Subtle Slow Drift */}
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
            <picture>
              <source
                type="image/webp"
                srcSet="/cta-image-1280.webp 1280w, /cta-image-2560.webp 2560w"
                sizes="(max-width: 768px) 100vw, 92vw"
              />
              <source
                type="image/jpeg"
                srcSet="/cta-image-1280.jpg 1280w, /cta-image-2560.jpg 2560w"
                sizes="(max-width: 768px) 100vw, 92vw"
              />
              <img
                src="/cta-image-2560.jpg"
                alt=""
                aria-hidden="true"
                width={2560}
                height={1098}
                loading="lazy"
                className="w-full h-full object-cover object-center max-sm:object-[70%_center]"
                style={{
                  animation:
                    isReducedMotion
                      ? "none"
                      : "ctaImageDrift 30s ease-in-out infinite alternate",
                  animationPlayState: isIntersecting ? "running" : "paused",
                  willChange: isReducedMotion ? "auto" : "transform",
                }}
              />
            </picture>

            {/* Soft Dark Overlay Gradient from the Left */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, rgba(0,49,36,0.85) 0%, rgba(0,49,36,0.70) 32%, rgba(0,49,36,0.25) 60%, rgba(0,49,36,0) 100%)",
              }}
            />

            {/* Subtle Mobile Top-Bottom Readability Gradient */}
            <div
              className="absolute inset-0 min-[700px]:hidden pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,49,36,0.75) 0%, rgba(0,49,36,0.2) 50%, rgba(0,49,36,0.80) 100%)",
              }}
            />
          </div>

          {/* Card Content: Headline & Sub Copy at Top Left, Button at Bottom Left */}
          <div className="relative z-10 flex flex-col justify-between h-full p-7 sm:p-10 md:p-14 lg:p-16">
            {/* Top Left Text Block */}
            <div className="max-w-[580px]">
              <HeaderReveal delay={80} duration={950}>
                <h2
                  className="text-[clamp(2.1rem,4.2vw,3.8rem)] text-white font-normal leading-[1.1] tracking-[-0.01em] m-0"
                  style={{ fontFamily: "var(--font-headline, serif)" }}
                >
                  {headline}
                </h2>
              </HeaderReveal>
              <HeaderReveal delay={200} duration={950} mask={false}>
                <p
                  className="mt-3 sm:mt-5 text-[#c4d1cb] text-[clamp(15px,1.2vw,19px)] leading-[1.62] max-w-[520px] m-0"
                  style={{ fontFamily: "var(--font-body, sans-serif)" }}
                >
                  {subCopy}
                </p>
              </HeaderReveal>
            </div>

            {/* Bottom Left Button with Spring-Glide Arrow Animation */}
            <div className="pt-6">
              <HeaderReveal delay={320} duration={900} mask={false}>
                <ArrowButton
                  href={buttonHref}
                  text={buttonText}
                  variant="orange"
                  arrowType="diagonal"
                />
              </HeaderReveal>
            </div>
          </div>
        </div>
      </Parallax>
    </div>

      {/* Embedded CSS Keyframes for slow subtle drift */}
      <style jsx>{`
        @keyframes ctaImageDrift {
          0% {
            transform: scale(1.04) translate3d(0, 0, 0);
          }
          100% {
            transform: scale(1.1) translate3d(-1.5%, -1%, 0);
          }
        }
      `}</style>
    </section>
  );
}
