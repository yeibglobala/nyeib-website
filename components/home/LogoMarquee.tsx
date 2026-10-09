"use client";

import React from "react";
import Image from "next/image";

interface PartnerLogo {
  name: string;
  src: string;
  height: number;
}

const PARTNER_LOGOS: PartnerLogo[] = [
  {
    name: "Federal Republic of Nigeria",
    src: "/partner-logo/coat-of-arm-logo.png",
    height: 48,
  },
  {
    name: "Nigeria Sovereign Investment Authority (NSIA)",
    src: "/partner-logo/nsia-logo.png",
    height: 42,
  },
  {
    name: "Development Bank of Nigeria (DBN)",
    src: "/partner-logo/dbn-logo.png",
    height: 44,
  },
  {
    name: "African Development Bank (AfDB)",
    src: "/partner-logo/afdb-logo.png",
    height: 42,
  },
  {
    name: "Securities and Exchange Commission (SEC)",
    src: "/partner-logo/sec-logo.png",
    height: 46,
  },
  {
    name: "Ministry of Finance Incorporated (MOFI)",
    src: "/partner-logo/mofi-logo.png",
    height: 44,
  },
];

export function LogoMarquee() {
  return (
    <section
      aria-label="Institutional Partners and Regulatory Anchors"
      className="relative w-full bg-[#f4faf7] text-[#003124] py-8 sm:py-10 border-y border-[#003124]/10 overflow-hidden select-none z-20 shadow-[inset_0_1px_3px_rgba(0,0,0,0.03)]"
    >
      <style>{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee-infinite {
          display: flex;
          width: max-content;
          animation: marqueeScroll 28s linear infinite;
        }
        .animate-marquee-infinite:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-infinite {
            animation: none;
            overflow-x: auto;
          }
        }
      `}</style>

      {/* Subtle Label */}
      <div className="max-w-[1400px] w-full mx-auto px-6 mb-5 sm:mb-6 text-center">
        <p
          className="text-[0.72rem] sm:text-[0.78rem] font-mono tracking-[0.2em] text-[#003124]/75 uppercase font-bold"
          style={{ fontFamily: "var(--font-mono, monospace)" }}
        >
          Anchor Institutions & Partners
        </p>
      </div>

      {/* Marquee Track Container with Gradient Edge Masks */}
      <div className="relative w-full overflow-hidden">
        {/* Left and Right Fade Gradients matching Mint Cream background */}
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#f4faf7] to-transparent z-10 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#f4faf7] to-transparent z-10 pointer-events-none"
        />

        {/* Continuous Looping Logo Ribbon */}
        <div className="animate-marquee-infinite items-center gap-12 sm:gap-20">
          {/* First Set */}
          {PARTNER_LOGOS.map((logo, idx) => (
            <div
              key={`logo-set-1-${idx}`}
              className="flex items-center justify-center px-4 sm:px-6 shrink-0 transition-transform duration-200 hover:scale-105"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-10 sm:h-12 md:h-13 w-auto max-w-[160px] sm:max-w-[200px] object-contain"
              />
            </div>
          ))}

          {/* Duplicate Set for Seamless Continuous Loop */}
          {PARTNER_LOGOS.map((logo, idx) => (
            <div
              key={`logo-set-2-${idx}`}
              className="flex items-center justify-center px-4 sm:px-6 shrink-0 transition-transform duration-200 hover:scale-105"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-10 sm:h-12 md:h-13 w-auto max-w-[160px] sm:max-w-[200px] object-contain"
              />
            </div>
          ))}

          {/* Triplicate Set for ultra-wide screens */}
          {PARTNER_LOGOS.map((logo, idx) => (
            <div
              key={`logo-set-3-${idx}`}
              className="flex items-center justify-center px-4 sm:px-6 shrink-0 transition-transform duration-200 hover:scale-105"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-10 sm:h-12 md:h-13 w-auto max-w-[160px] sm:max-w-[200px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
