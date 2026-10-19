"use client";

import React, { useState } from "react";
import Image from "next/image";

export interface FederalGovernmentCardData {
  id: string;
  name: string;
  shortName: string;
  tag: string;
  coatOfArmPath: string;
  mofiLogoPath: string;
  title: string;
  subtitle: string;
  description: string;
}

interface FederalGovernmentCardProps {
  data: FederalGovernmentCardData;
}

export function FederalGovernmentCard({ data }: FederalGovernmentCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      tabIndex={0}
      role="region"
      aria-label={`${data.title} overview`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className="group relative col-span-1 min-[700px]:col-span-3 w-full cursor-default select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#003124] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F2FBF6]"
    >
      <div className="relative w-full rounded-[22px] overflow-hidden bg-[#F2FBF6] border border-[rgba(0,49,36,0.16)] p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6 sm:gap-8">
        {/* Top bar: Logos & Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-[rgba(0,49,36,0.12)] pb-6">
          {/* Official Sovereign Logos */}
          <div className="flex items-center gap-5 sm:gap-7 flex-wrap">
            {/* Coat of Arms */}
            <div className="relative h-14 sm:h-16 w-16 sm:w-20 flex items-center justify-start shrink-0">
              <Image
                src={data.coatOfArmPath}
                alt="Federal Republic of Nigeria Coat of Arms"
                width={80}
                height={64}
                className="h-full w-auto object-contain filter-none"
              />
            </div>

            <div className="h-9 w-[1px] bg-[rgba(0,49,36,0.18)] hidden sm:block" />

            {/* MOFI Logo */}
            <div className="relative h-12 sm:h-14 w-32 sm:w-36 flex items-center justify-start shrink-0">
              <Image
                src={data.mofiLogoPath}
                alt="Ministry of Finance Incorporated (MOFI)"
                width={140}
                height={56}
                className="h-full w-auto object-contain filter-none"
              />
            </div>
          </div>

          {/* Sovereign Mandate Pill */}
          <div className="self-start sm:self-center">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#003124]/10 text-[#003124] text-[11.5px] sm:text-[12px] font-bold tracking-[0.08em] uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00BE93]" />
              {data.tag}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
          <div className="lg:col-span-5 flex flex-col gap-1.5">
            <h3
              className="text-[22px] sm:text-[26px] lg:text-[28px] font-bold text-[#003124] tracking-tight leading-[1.2]"
              style={{ fontFamily: "var(--font-headline, serif)" }}
            >
              {data.title}
            </h3>
            <p
              className="text-[14px] sm:text-[15px] font-semibold text-[#003124]/80 tracking-tight"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {data.subtitle}
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <p
              className="text-[14.5px] sm:text-[16px] leading-[1.65] text-[#003124]/85 font-normal m-0"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {data.description}
            </p>
          </div>
        </div>

        {/* Subtle Bottom Accent Strip that illuminates on hover */}
        <div
          className={`h-1.5 w-full rounded-full bg-gradient-to-r from-[#00BE93] via-[#4fd1b0] to-[#003124] transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-40"
          }`}
        />
      </div>
    </article>
  );
}
