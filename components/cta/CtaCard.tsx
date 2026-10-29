"use client";

import React, { useEffect, useRef, useState } from "react";
import { AppButton } from "@/shared/components/AppButton";

export interface CtaCardProps {
  headline: string;
  text: string;
  buttonLabel: string;
  href: string;
  imageDesktop?: string;
  imageMobile?: string;
  className?: string;
  wrapperClassName?: string;
  sectionId?: string;
}

export function CtaCard({
  headline,
  text,
  buttonLabel,
  href,
  imageDesktop,
  imageMobile,
  className = "",
  wrapperClassName = "",
  sectionId = "partner",
}: CtaCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mq.matches);

    const handleMotion = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    mq.addEventListener("change", handleMotion);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      mq.removeEventListener("change", handleMotion);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id={sectionId}
      data-theme="light"
      aria-label={headline}
      className={`relative w-full bg-[#003124] pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-8 lg:px-16 ${wrapperClassName}`}
    >
      <div className="max-w-[1400px] w-full mx-auto">
        <div
          ref={cardRef}
          className={`group relative overflow-hidden bg-white rounded-[32px] sm:rounded-[44px] lg:rounded-[60px] shadow-[0_24px_60px_rgba(0,0,0,0.18)] transition-all duration-500 ${className}`}
          style={{
            transform: isReducedMotion
              ? "none"
              : isVisible
              ? "translate3d(0, 0, 0)"
              : "translate3d(0, 24px, 0)",
            opacity: isReducedMotion ? 1 : isVisible ? 1 : 0,
            transitionProperty: "transform, opacity, box-shadow",
            transitionDuration: "500ms",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* =========================================================================
              DESKTOP LAYOUT (min-[900px]:)
              Figma Node 640:74 (CTA footer)
              ========================================================================= */}
          <div className="hidden min-[900px]:flex relative min-h-[500px] lg:min-h-[560px] xl:min-h-[600px] items-center">
            {/* Full card background desktop image (cutout with transparent left space) */}
            <div
              aria-hidden="true"
              className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden"
            >
              <img
                src={imageDesktop || "/images/footer-image-desktop.png"}
                alt=""
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{ objectPosition: "right bottom" }}
              />
            </div>

            {/* Left Column Text Content */}
            <div className="relative z-10 flex flex-col items-start gap-7 lg:gap-8 max-w-[640px] pl-10 lg:pl-16 xl:pl-24 pr-6 py-14 lg:py-20">
              <h2
                className="font-['Chivo',sans-serif] text-[clamp(2.4rem,3.8vw,3.75rem)] font-normal text-[#003124] leading-[1.08] tracking-tight m-0 max-w-[16ch]"
                style={{ fontFamily: "var(--font-headline, 'Chivo', sans-serif)" }}
              >
                {headline}
              </h2>
              <p
                className="font-['Chivo',sans-serif] text-[clamp(1.05rem,1.4vw,1.45rem)] text-[#003124] leading-[1.4] font-normal m-0 max-w-[34ch]"
                style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
              >
                {text}
              </p>
              <div className="pt-2">
                <AppButton
                  href={href}
                  label={buttonLabel}
                  variant="orange"
                  size="lg"
                  className="shadow-[0_8px_24px_rgba(248,132,4,0.35)]"
                />
              </div>
            </div>
          </div>

          {/* =========================================================================
              MOBILE / TABLET LAYOUT (<900px)
              Figma Node 642:81 (CTA — Mobile)
              ========================================================================= */}
          <div className="flex min-[900px]:hidden flex-col items-start w-full">
            {/* Top Text Content */}
            <div className="flex flex-col items-start gap-6 pt-10 px-7 sm:px-9 pb-8 w-full">
              <h2
                className="font-['Chivo',sans-serif] text-[28px] sm:text-[34px] font-normal text-[#003124] leading-[1.18] tracking-tight m-0"
                style={{ fontFamily: "var(--font-headline, 'Chivo', sans-serif)" }}
              >
                {headline}
              </h2>
              <p
                className="font-['Chivo',sans-serif] text-[16px] sm:text-[18px] text-[#003124] leading-[1.5] font-normal m-0"
                style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
              >
                {text}
              </p>
              <div className="pt-1">
                <AppButton
                  href={href}
                  label={buttonLabel}
                  variant="orange"
                  size="md"
                  className="w-auto shadow-[0_8px_24px_rgba(248,132,4,0.35)]"
                />
              </div>
            </div>

            {/* Bottom Mobile Cutout Image */}
            <div className="relative w-full h-[290px] sm:h-[340px] overflow-hidden">
              <img
                src={imageMobile || "/images/footer-image-mobile.png"}
                alt="Entrepreneurs collaborating with NYEIB"
                className="w-full h-full object-contain object-right-bottom pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
