"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Landmark, TrendingUp, ArrowRight } from "lucide-react";
import { Parallax } from "@/shared/components/Parallax";
import { HeaderReveal } from "@/shared/components/HeaderReveal";

interface AudienceCardItem {
  number: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  imageSrc: string;
  accentColor: string;
  buttonBg: string;
  buttonHoverBg: string;
  icon: React.ComponentType<{ className?: string }>;
}

const AUDIENCE_CARDS: AudienceCardItem[] = [
  {
    number: "01",
    title: "For Youth- and Women-Led Businesses",
    description:
      "We support growth-oriented businesses with access to capital, capacity-building support and wider ecosystem opportunities that can help them strengthen and scale.",
    ctaText: "Grow with NYEIB",
    ctaHref: "/apply",
    imageSrc: "/images/who-we-serve-entrepreneurs.png",
    accentColor: "#00BE93",
    buttonBg: "bg-[#00BE93]",
    buttonHoverBg: "hover:bg-[#008f6e]",
    icon: Sparkles,
  },
  {
    number: "02",
    title: "For Banks & Financial Institutions",
    description:
      "We work with commercial banks, microfinance institutions and other financial partners through risk-sharing mechanisms designed to expand lending to eligible youth- and women-led businesses.",
    ctaText: "Partner with NYEIB",
    ctaHref: "/apply",
    imageSrc: "/images/who-we-serve-lenders.png",
    accentColor: "#F88404",
    buttonBg: "bg-[#F88404]",
    buttonHoverBg: "hover:bg-[#cf6900]",
    icon: Landmark,
  },
  {
    number: "03",
    title: "For Institutional Investors & Partners",
    description:
      "We provide institutional investors, development finance institutions, foundations and other partners with opportunities to invest in, co-invest alongside or otherwise support Nigeria NYEIB Investment Funds.",
    ctaText: "Explore Partnership Opportunities",
    ctaHref: "/apply",
    imageSrc: "/images/who-we-serve-investors.png",
    accentColor: "#003124",
    buttonBg: "bg-[#003124]",
    buttonHoverBg: "hover:bg-[#0b523b]",
    icon: TrendingUp,
  },
];

function CardBottomImage({
  src,
  icon: Icon,
  accentColor,
}: {
  src: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative mt-8 pt-4 w-full">
      {/* Floating Circular Icon Badge Overlapping Top-Left of the Image */}
      <div
        className="absolute -top-2 left-5 w-12 h-12 rounded-full border-[3.5px] border-white flex items-center justify-center text-white shadow-md z-10 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: accentColor }}
      >
        <Icon className="w-5 h-5" />
      </div>

      {/* Rounded Bottom Image */}
      <div className="relative w-full h-56 sm:h-64 rounded-[22px] overflow-hidden bg-[#FAF7F2] border border-[#003124]/10 shadow-inner">
        {!hasError ? (
          <Image
            src={src}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 450px"
            loading="lazy"
            className="object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-105"
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="w-full h-full bg-[#E1C9B3]/30 flex items-center justify-center text-xs text-[#003124]/50">
            NYEIB Pathways
          </div>
        )}
      </div>
    </div>
  );
}

export function WhoWeServeCardsSection() {
  return (
    <section
      id="who-we-serve-pathways"
      data-theme="light"
      aria-label="Who We Serve Pathways"
      className="relative w-full bg-[#FAF7F2] text-[#003124] py-20 sm:py-28 px-6 sm:px-8 lg:px-12 border-t border-[#003124]/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col space-y-16 sm:space-y-20">
        {/* =========================================================================
            TOP AREA: Header (Heading Left, Paragraph Right)
            ========================================================================= */}
        <div className="flex flex-col space-y-4">
          <HeaderReveal delay={0} duration={800} mask={false} parallaxSpeed={10}>
            <span
              className="text-[13px] font-semibold tracking-[0.16em] uppercase text-[#008f6e] block"
              style={{ fontFamily: "var(--font-body)" }}
            >
              WHO WE SERVE
            </span>
          </HeaderReveal>

          <div className="grid grid-cols-1 min-[900px]:grid-cols-12 gap-6 min-[900px]:gap-12 items-end">
            <div className="min-[900px]:col-span-7">
              <HeaderReveal delay={120} duration={950} parallaxSpeed={14}>
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight text-[#003124] m-0"
                  style={{ fontFamily: "var(--font-headline, serif)" }}
                >
                  One ecosystem with different pathways to participate.
                </h2>
              </HeaderReveal>
            </div>

            <div className="min-[900px]:col-span-5">
              <HeaderReveal delay={240} duration={950} mask={false} parallaxSpeed={12}>
                <p
                  className="text-base sm:text-lg leading-relaxed text-[#2b3d36] m-0"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  NYEIB works across the investment ecosystem, helping businesses, financial institutions and investment partners engage through pathways suited to their role.
                </p>
              </HeaderReveal>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3 AUDIENCE CARDS: Matching Reference Image Design
            (Top Title + Body + Pill CTA Button, Bottom Image + Overlapping Circle Icon)
            ========================================================================= */}
        <Parallax speed={20} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {AUDIENCE_CARDS.map((card) => (
              <div
                key={card.number}
                className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-[32px] bg-white border border-[#E1C9B3] hover:border-[#003124]/40 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_24px_48px_rgba(0,0,0,0.09)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                {/* Top Section: Title, Description, and CTA Button */}
                <div className="flex flex-col space-y-4">
                  <h3
                    className="text-2xl sm:text-[26px] font-bold text-[#003124] leading-snug tracking-tight"
                    style={{ fontFamily: "var(--font-headline, serif)" }}
                  >
                    {card.title}
                  </h3>

                  <p className="text-[#3c4e47] text-sm sm:text-[15px] leading-relaxed font-normal">
                    {card.description}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={card.ctaHref}
                      className={`group/btn inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-xs sm:text-sm transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 ${card.buttonBg} ${card.buttonHoverBg}`}
                    >
                      <span>{card.ctaText}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* Bottom Section: Image with Overlapping Floating Icon */}
                <CardBottomImage
                  src={card.imageSrc}
                  icon={card.icon}
                  accentColor={card.accentColor}
                />
              </div>
            ))}
          </div>
        </Parallax>

        {/* =========================================================================
            CLOSING BRAND STATEMENT: Verbatim from Copy File with HeaderReveal
            ========================================================================= */}
        <div className="pt-8 border-t border-[#003124]/10 text-center sm:text-left">
          <HeaderReveal delay={0} duration={850} mask={false}>
            <p
              className="text-lg sm:text-xl font-medium text-[#003124]/80 tracking-tight m-0"
              style={{ fontFamily: "var(--font-headline, serif)" }}
            >
              Different roles with one connected ecosystem.
            </p>
          </HeaderReveal>
        </div>
      </div>
    </section>
  );
}
