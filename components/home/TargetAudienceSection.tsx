"use client";

import React from "react";
import Image from "next/image";
import { HeaderReveal } from "@/shared/components/HeaderReveal";

export interface TargetAudienceProfile {
  id: string;
  name: string;
  sector: string;
  location: string;
  imageSrc: string;
}

const AUDIENCE_PROFILES: TargetAudienceProfile[] = [
  {
    id: "yusuf-ibrahim",
    name: "Yusuf Ibrahim",
    sector: "Agro-Processing & Retail",
    location: "Kano",
    imageSrc: "/images/target-audience/yusuf-ibrahim-Image.png",
  },
  {
    id: "ngozi-adeyemi",
    name: "Ngozi Adeyemi",
    sector: "Trade & Commerce",
    location: "Lagos",
    imageSrc: "/images/target-audience/ngozi-deyemi-Image.png",
  },
  {
    id: "tunde-fashola",
    name: "Tunde Fashola",
    sector: "ICT & Software",
    location: "Lagos",
    imageSrc: "/images/target-audience/tunde-fashola-Image.png",
  },
  {
    id: "hadiza-musa",
    name: "Hadiza Musa",
    sector: "Agriculture",
    location: "Kaduna",
    imageSrc: "/images/target-audience/hadiza-musa-Image.png",
  },
  {
    id: "babajide-adeoye",
    name: "Babajide Adeoye",
    sector: "Market Trade",
    location: "Lagos",
    imageSrc: "/images/target-audience/babajide-adeoye-Image.png",
  },
  {
    id: "amaka-osei",
    name: "Amaka Osei",
    sector: "Creative Economy",
    location: "Enugu",
    imageSrc: "/images/target-audience/amaka-osei-Image.png",
  },
  {
    id: "chioma-nwosu",
    name: "Chioma Nwosu",
    sector: "Fintech & Services",
    location: "Port Harcourt",
    imageSrc: "/images/target-audience/chioma-nwosu-image.png",
  },
  {
    id: "emeka-okafor",
    name: "Emeka Okafor",
    sector: "Retail & Distribution",
    location: "Onitsha",
    imageSrc: "/images/target-audience/emeka-okafor-Image.png",
  },
  {
    id: "fatima-al-hassan",
    name: "Fatima Al-Hassan",
    sector: "CleanTech & Energy",
    location: "Abuja",
    imageSrc: "/images/target-audience/fatima-al-hassan-Image.png",
  },
  {
    id: "aisha-bello",
    name: "Aisha Bello",
    sector: "Light Manufacturing",
    location: "Sokoto",
    imageSrc: "/images/target-audience/aisha-bello-Image.png",
  },
];

export function TargetAudienceSection() {
  // Duplicate list to achieve a seamless infinite loop
  const MARQUEE_ITEMS = [...AUDIENCE_PROFILES, ...AUDIENCE_PROFILES];

  return (
    <section
      id="target-audience"
      aria-label="Our Target Audience - Built for Growth-Oriented Businesses"
      className="relative w-full bg-[#FAF7F2] text-[#003124] py-16 sm:py-20 lg:py-24 overflow-hidden border-t border-[#003124]/10 select-none"
    >
      <style>{`
        @keyframes targetAudienceMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .animate-target-audience-marquee {
          display: flex;
          width: max-content;
          animation: targetAudienceMarquee 38s linear infinite;
          will-change: transform;
        }
        .animate-target-audience-marquee:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-target-audience-marquee {
            animation: none;
          }
        }
      `}</style>

      {/* Header Container */}
      <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-10 lg:px-16 mb-10 sm:mb-14">
        {/* Eyebrow Tag */}
        <HeaderReveal delay={0} duration={800} mask={false}>
          <span
            className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-[#F88404] block mb-3 sm:mb-4"
            style={{ fontFamily: "var(--font-body, sans-serif)" }}
          >
            Our Target Audience
          </span>
        </HeaderReveal>

        {/* Section Headline */}
        <HeaderReveal delay={80} duration={900}>
          <h2
            className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#003124] tracking-tight leading-[1.15] mb-4 sm:mb-5 max-w-3xl"
            style={{ fontFamily: "var(--font-headline, serif)" }}
          >
            Built for Growth-Oriented Businesses
          </h2>
        </HeaderReveal>

        {/* Subtext */}
        <HeaderReveal delay={160} duration={900} mask={false}>
          <p
            className="text-base sm:text-lg lg:text-[19px] text-[#003124]/75 font-normal leading-relaxed max-w-2xl"
            style={{ fontFamily: "var(--font-body, sans-serif)" }}
          >
            NYEIB supports youth- and women-led businesses across sectors, with a focus on enterprises that can grow, create jobs and build sustainable economic value.
          </p>
        </HeaderReveal>
      </div>

      {/* Infinite Card Marquee Track with Edge Fades */}
      <div className="relative w-full overflow-hidden py-3">
        {/* Left Edge Fade Gradient */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 lg:w-36 bg-gradient-to-r from-[#FAF7F2] to-transparent z-20"
          aria-hidden="true"
        />

        {/* Right Edge Fade Gradient */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 lg:w-36 bg-gradient-to-l from-[#FAF7F2] to-transparent z-20"
          aria-hidden="true"
        />

        {/* Animated Marquee Flex Container */}
        <div className="animate-target-audience-marquee gap-5 sm:gap-6 px-4">
          {MARQUEE_ITEMS.map((profile, idx) => (
            <div
              key={`${profile.id}-${idx}`}
              className="group relative flex-shrink-0 w-[260px] sm:w-[290px] h-[370px] sm:h-[410px] rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-[0_12px_32px_rgba(0,49,36,0.10)] border border-white/40 bg-[#FAF7F2] cursor-pointer transition-transform duration-500 ease-out hover:-translate-y-1.5"
            >
              {/* Profile Background Image */}
              <Image
                src={profile.imageSrc}
                alt={`${profile.name} - ${profile.sector}, ${profile.location}`}
                fill
                sizes="(max-width: 640px) 260px, 290px"
                className="object-cover object-center pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Deep Emerald Bottom Gradient Overlay for optimal contrast */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#003124]/95 via-[#003124]/40 to-transparent transition-opacity duration-300"
                aria-hidden="true"
              />

              {/* Content Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col items-start gap-1.5 z-10 pointer-events-none">
                {/* Sector Badge */}
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full bg-white/18 backdrop-blur-md border border-white/25 text-white text-[11.5px] sm:text-xs font-semibold tracking-wide mb-1 shadow-sm"
                  style={{ fontFamily: "var(--font-body, sans-serif)" }}
                >
                  {profile.sector}
                </span>

                {/* Entrepreneur Name */}
                <h3
                  className="text-xl sm:text-[22px] font-bold text-white tracking-tight leading-snug"
                  style={{ fontFamily: "var(--font-headline, serif)" }}
                >
                  {profile.name}
                </h3>

                {/* Location */}
                <span
                  className="text-xs sm:text-[13px] text-white/80 font-normal"
                  style={{ fontFamily: "var(--font-body, sans-serif)" }}
                >
                  {profile.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
