"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeaderReveal } from "@/shared/components/HeaderReveal";

export interface FundItem {
  id: string;
  title: string;
  shortDescription: string;
  focus: string;
  href: string;
}

const FUNDS_DATA: FundItem[] = [
  {
    id: "equity",
    title: "Equity Investment Fund",
    shortDescription:
      "Direct equity and quasi-equity capital deployed to high-potential youth- and women-led MSMEs with proven commercial traction and scalability.",
    focus: "Growth capital, strategic governance, balance-sheet strengthening",
    href: "/apply",
  },
  {
    id: "credit",
    title: "Credit Guarantee Fund",
    shortDescription:
      "Risk-sharing mechanisms and partial credit guarantees that unlock debt financing from commercial banks and microfinance institutions.",
    focus: "De-risking commercial lending, collateral alleviation, lower interest barriers",
    href: "/apply",
  },
  {
    id: "ecosystem",
    title: "Ecosystem Development Fund",
    shortDescription:
      "Targeted technical assistance, investor readiness programs, governance training, and digital enablement across partner hubs.",
    focus: "Capacity building, regulatory compliance, operational resilience",
    href: "/apply",
  },
];

export function SectorAgnosticFundsSection() {
  const [activeFundId, setActiveFundId] = useState<string>("equity");

  return (
    <section
      id="sector-agnostic-funds"
      aria-label="Sector Agnostic Growth Focused Funds"
      className="relative w-full bg-[#F6F7FB] text-[#003124] py-20 sm:py-24 lg:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden"
    >
      {/* Background Graphic / Photography Overlay */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0">
        <Image
          src="/images/sector-agnostic-funds.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[left_bottom] sm:object-center opacity-95"
        />
        {/* Soft top and bottom white/mist blend gradients */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#F6F7FB] via-[#F6F7FB]/60 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F6F7FB] via-[#F6F7FB]/60 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-[1400px] w-full mx-auto flex flex-col gap-12 lg:gap-16">
        {/* Top Editorial Introduction Split */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-start">
          {/* Left Column: Headline */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <HeaderReveal delay={80} duration={900}>
              <h2
                className="text-[clamp(34px,4.5vw,56px)] font-bold leading-[1.08] tracking-tight text-[#003124] m-0"
                style={{ fontFamily: "var(--font-headline, serif)" }}
              >
                Sector agnostic;{" "}
                <span className="text-[#F88404] block sm:inline">growth focused.</span>
              </h2>
            </HeaderReveal>
          </div>

          {/* Right Column: Description */}
          <div className="lg:col-span-5 flex flex-col items-start justify-center pt-2">
            <HeaderReveal delay={180} duration={900} mask={false}>
              <p
                className="text-[17px] sm:text-[19px] leading-[1.6] text-[#003124]/75 font-normal max-w-[480px] m-0"
                style={{ fontFamily: "var(--font-body, sans-serif)" }}
              >
                NYEIB considers businesses across the economy and supports the capabilities that can strengthen resilience, inclusion, digital readiness and access to wider markets.
              </p>
            </HeaderReveal>
          </div>
        </div>

        {/* Lower Main Area: Floating Fund Panel on the Right */}
        <div className="w-full flex justify-end pt-4 sm:pt-8">
          <div className="w-full max-w-[630px] bg-[#F2FBF6] rounded-tl-[48px] sm:rounded-tl-[64px] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[16px] p-6 sm:p-9 lg:p-10 shadow-[0_24px_60px_rgba(0,49,36,0.08)] border border-[rgba(0,49,36,0.06)] flex flex-col gap-8 transition-all duration-300">
            {/* Fund Categories List */}
            <div className="flex flex-col gap-2 w-full" role="tablist" aria-label="NYEIB Fund Types">
              {FUNDS_DATA.map((fund) => {
                const isActive = activeFundId === fund.id;

                return (
                  <div
                    key={fund.id}
                    className="flex flex-col pt-3 pb-4 transition-all duration-200 cursor-pointer group"
                    onClick={() => setActiveFundId(fund.id)}
                    role="tab"
                    aria-selected={isActive}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveFundId(fund.id);
                      }
                    }}
                  >
                    <div className="flex items-center justify-between w-full">
                      <h3
                        className={`text-[20px] sm:text-[23px] md:text-[24px] font-bold leading-[1.25] transition-colors ${
                          isActive
                            ? "text-[#003124]"
                            : "text-[#003124]/70 group-hover:text-[#003124]"
                        }`}
                        style={{ fontFamily: "var(--font-body, sans-serif)" }}
                      >
                        {fund.title}
                      </h3>
                    </div>

                    {/* Active Expanded Description */}
                    {isActive && (
                      <p
                        className="text-[14.5px] sm:text-[15.5px] text-[#003124]/75 mt-2.5 leading-[1.55] animate-in fade-in slide-in-from-top-1 duration-200"
                        style={{ fontFamily: "var(--font-body, sans-serif)" }}
                      >
                        {fund.shortDescription}
                      </p>
                    )}

                    {/* Separator / Active Indicator */}
                    <div className="mt-4 relative w-full">
                      {isActive ? (
                        <div className="h-[3px] w-full bg-[#00BE93] rounded-full shadow-[0_0_12px_rgba(0,190,147,0.4)] transition-all duration-300" />
                      ) : (
                        <div className="h-[1px] w-full bg-[#E2E5F0] transition-colors" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4 pt-2 border-t border-[rgba(0,49,36,0.06)]">
              <Link
                href="/what-we-do"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white border border-[#003124] text-[#003124] font-semibold text-[14.5px] sm:text-[15px] hover:bg-[#003124] hover:text-white transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003124]"
              >
                Read our approach
              </Link>

              <Link
                href="/apply"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#F88404] text-white font-semibold text-[14.5px] sm:text-[15px] hover:bg-[#ff9626] transition-all shadow-[0_4px_14px_rgba(248,132,4,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F88404]"
              >
                Apply for funding
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
