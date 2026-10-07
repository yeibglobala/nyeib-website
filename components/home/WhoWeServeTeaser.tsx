"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowButton } from "@/shared/components/ArrowButton";
import { HeaderReveal } from "@/shared/components/HeaderReveal";

interface AudienceCardData {
  number: string;
  title: string;
  text: string;
  imageSrc: string;
  isFeatured?: boolean;
}

const AUDIENCE_CARDS: AudienceCardData[] = [
  {
    number: "01",
    title: "Youth- and women-led businesses",
    text: "Seeking capital and business support.",
    imageSrc: "/images/who-we-serve-entrepreneurs.png",
  },
  {
    number: "02",
    title: "Banks and financial institutions",
    text: "Looking to expand access to finance.",
    imageSrc: "/images/who-we-serve-lenders.png",
    isFeatured: true,
  },
  {
    number: "03",
    title: "Institutional investors and development partners",
    text: "Seeking credible opportunities with measurable economic value.",
    imageSrc: "/images/who-we-serve-investors.png",
  },
];

function CardImage({ src }: { src: string }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-[#0e2a22] via-[#091b15] to-[#0b1310] border border-[rgba(238,246,242,0.06)]">
      {/* Soft dark green background with faint mint glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(46,183,140,0.18),transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      {!hasError && (
        <Image
          src={src}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
          loading="lazy"
          className="object-cover transition-all duration-500 ease-out group-hover:scale-[1.04] group-hover:brightness-110"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}

export function WhoWeServeTeaser() {
  return (
    <section
      id="who-we-serve-teaser"
      data-theme="dark"
      aria-label="Who We Serve"
      className="w-full bg-[#0b1310] text-[#eef6f2] py-24 lg:py-32 px-6 sm:px-10 lg:px-16 relative overflow-hidden border-t border-[rgba(238,246,242,0.08)]"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(46,183,140,0.07)_0%,transparent_70%)] pointer-events-none blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] w-full mx-auto flex flex-col gap-16 relative z-10">
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[rgba(238,246,242,0.12)]">
          <div className="max-w-2xl flex flex-col gap-4">
            <HeaderReveal
              as="h2"
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.12] tracking-tight text-[#eef6f2]"
            >
              Who We Serve
            </HeaderReveal>
            <p className="font-sans text-base md:text-lg text-[rgba(238,246,242,0.78)] leading-relaxed">
              NYEIB works across the investment ecosystem, creating clear pathways for:
            </p>
          </div>

          <div>
            <ArrowButton
              text="See Who We Serve"
              href="/who-we-serve"
              variant="orange"
            />
          </div>
        </div>

        {/* 3 Audience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {AUDIENCE_CARDS.map((card) => (
            <Link
              key={card.number}
              href="/who-we-serve"
              className={`group relative flex flex-col p-6 lg:p-8 rounded-2xl transition-all duration-500 ease-out overflow-hidden ${
                card.isFeatured
                  ? "bg-[rgba(238,246,242,0.05)] hover:bg-[rgba(238,246,242,0.08)] border border-[rgba(46,183,140,0.28)] hover:border-[rgba(248,132,4,0.55)] shadow-[0_4px_24px_rgba(46,183,140,0.08)]"
                  : "bg-[rgba(238,246,242,0.03)] hover:bg-[rgba(238,246,242,0.06)] border border-[rgba(238,246,242,0.08)] hover:border-[rgba(248,132,4,0.4)]"
              }`}
            >
              {/* Subtle top indicator bar on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#f88404] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Card Image at Top (~40% height) */}
              <CardImage src={card.imageSrc} />

              <div className="flex flex-col gap-3">
                <span className="font-sans font-semibold text-xs tracking-widest text-[#2eb78c]">
                  {card.number}
                </span>

                <h3 className="font-sans text-xl lg:text-2xl font-semibold text-[#eef6f2] group-hover:text-[#f88404] transition-colors duration-300 leading-snug">
                  {card.title}
                </h3>

                <p className="font-sans text-sm lg:text-base text-[rgba(238,246,242,0.72)] leading-relaxed">
                  {card.text}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
