"use client";

import React, { useId, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface CtaCardProps {
  headline: string;
  text: string;
  buttonLabel: string;
  href: string;
  className?: string;
  wrapperClassName?: string;
  sectionId?: string;
}

function LogoMark({
  gradientId,
  className = "",
}: {
  gradientId: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 19.63 17.18"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8fe3c8" />
          <stop offset="100%" stopColor="#2eb78c" />
        </linearGradient>
      </defs>
      <g fill={`url(#${gradientId})`}>
        <path d="M4.68,.16c-.05-.09-.17-.16-.29-.16H.34C.07,0-.08,.29,.05,.51L3.92,6.82c.84,1.36,1.19,2.97,1.03,4.57l-.58,5.42c-.01,.2,.14,.37,.34,.37h2.42c.16,0,.29-.1,.33-.25,.37-1.62,.56-3.3,.56-5.04C8.04,7.58,6.82,3.56,4.68,.16Z" />
        <path d="M19.3,0h-4.06c-.12,0-.22,.07-.29,.16-2.12,3.41-3.35,7.43-3.35,11.73,0,1.74,.2,3.42,.58,5.04,.03,.14,.17,.25,.33,.25h2.42c.2,0,.35-.17,.33-.37l-.56-5.42c-.17-1.6,.2-3.21,1.03-4.57L19.59,.51c.13-.22-.03-.51-.29-.51Z" />
        <path d="M13.28,0H6.36c-.26,0-.42,.29-.29,.51,.42,.76,.81,1.55,1.15,2.36,1.22,2.87,1.83,5.89,1.83,9.02,0,1.66-.18,3.3-.52,4.89-.04,.21,.12,.41,.33,.41h1.91c.21,0,.38-.2,.33-.41-.34-1.58-.51-3.22-.51-4.89,0-3.13,.62-6.16,1.82-9.02,.34-.81,.73-1.6,1.17-2.36,.12-.22-.04-.51-.3-.51Z" />
      </g>
    </svg>
  );
}

export function CtaCard({
  headline,
  text,
  buttonLabel,
  href,
  className = "",
  wrapperClassName = "",
  sectionId = "partner",
}: CtaCardProps) {
  const rawId = useId();
  const gradientId = `cta-mint-gradient-${rawId.replace(/:/g, "")}`;
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
      className={`relative w-full bg-[#003124] pt-12 sm:pt-16 pb-12 sm:pb-16 px-6 sm:px-10 lg:px-16 ${wrapperClassName}`}
    >
      <div className="max-w-[1400px] w-full mx-auto">
        <div
          ref={cardRef}
          className={`group relative overflow-hidden rounded-[28px] bg-[#F1F7F3] border border-[#D7E6DD] p-[clamp(28px,5vw,64px)] min-h-[clamp(340px,40vw,440px)] flex flex-col justify-between shadow-[0_24px_60px_rgba(15,42,32,0.12)] transition-all duration-300 ${className}`}
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
          {/* Peach glow at bottom left behind button */}
          <div
            aria-hidden="true"
            className="absolute pointer-events-none rounded-full"
            style={{
              width: "60%",
              height: "90%",
              left: "-10%",
              bottom: "-40%",
              background:
                "radial-gradient(closest-side, rgba(248,207,163,0.55), transparent 70%)",
              zIndex: 0,
            }}
          />

          {/* Large LogoMark Art cropped at right and bottom */}
          <div
            aria-hidden="true"
            className="absolute pointer-events-none z-[1] select-none transition-transform duration-400 ease-out max-[700px]:w-[90%] max-[700px]:-right-[26%] max-[700px]:-bottom-[10%] max-[700px]:opacity-55 min-[701px]:w-[min(52%,540px)] min-[701px]:-right-[3%] min-[701px]:-bottom-[14%] min-[701px]:opacity-90 min-[701px]:group-hover:-translate-x-[10px]"
            style={{
              transitionProperty: isReducedMotion ? "none" : "transform",
            }}
          >
            <LogoMark gradientId={gradientId} className="w-full h-auto block" />
          </div>

          {/* Group 1: Headline + Text at Top */}
          <div className="relative z-[2] flex flex-col gap-4 sm:gap-4.5 max-w-full">
            <h2
              className="font-serif text-[#0F2A20] text-[clamp(2.2rem,4.6vw,3.9rem)] leading-[1.05] tracking-[-0.015em] max-w-[16ch] m-0 [text-wrap:balance]"
              style={{ fontFamily: "var(--font-headline, Georgia, serif)" }}
            >
              {headline}
            </h2>
            <p
              className="font-sans text-[#4A5B53] text-[clamp(1rem,1.3vw,1.18rem)] leading-[1.6] max-w-[34rem] m-0"
              style={{ fontFamily: "var(--font-body, sans-serif)" }}
            >
              {text}
            </p>
          </div>

          {/* Group 2: Action Button at Bottom */}
          <div className="relative z-[2] pt-8 sm:pt-10">
            <Link
              href={href}
              aria-label={buttonLabel}
              className="group/btn inline-flex items-center gap-2.5 max-w-full select-none outline-none focus-visible:ring-2 focus-visible:ring-[#00BE93] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F1F7F3] rounded-full transition-transform duration-300 hover:-translate-y-[2px]"
              style={{
                transitionProperty: isReducedMotion ? "none" : "transform",
              }}
            >
              {/* Main Pill */}
              <span
                className="inline-flex items-center justify-center px-5 sm:px-[30px] py-3.5 sm:py-4 rounded-full bg-[#F88404] hover:bg-[#ff941f] text-white text-[12px] min-[400px]:text-[13px] sm:text-[14px] tracking-[0.05em] sm:tracking-[0.08em] uppercase font-bold shadow-[0_10px_30px_rgba(248,132,4,0.35)] transition-colors duration-200 text-center leading-tight whitespace-normal"
                style={{ fontFamily: "var(--font-body, sans-serif)" }}
              >
                {buttonLabel}
              </span>

              {/* Round Arrow Button */}
              <span
                className="inline-grid place-items-center w-11 h-11 sm:w-[50px] sm:h-[50px] rounded-full bg-[#F88404] text-white shadow-[0_10px_30px_rgba(248,132,4,0.35)] shrink-0 transition-transform duration-300 group-hover/btn:rotate-45"
                style={{
                  transitionProperty: isReducedMotion ? "none" : "transform",
                }}
              >
                <ArrowUpRight className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
