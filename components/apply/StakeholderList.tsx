"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface StakeholderRow {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  extraDescription?: string;
  slug: string;
  hoverColor: string; // e.g. '#BFEBDC', '#F8CFA3', '#F3E3A6', '#A9DDD3'
}

const STAKEHOLDERS: StakeholderRow[] = [
  {
    number: "01",
    title: "Venture Capital & Private Equity Fund Managers",
    subtitle: "Investing in the next generation of Nigerian businesses.",
    description:
      "For venture capital and private equity fund managers interested in investment partnerships, fund commitments, co-investment and opportunities involving growth-oriented Nigerian enterprises.",
    slug: "vc-pe",
    hoverColor: "#BFEBDC",
  },
  {
    number: "02",
    title: "Banks & Licensed Lenders",
    subtitle: "Expanding access to finance through risk-sharing.",
    description:
      "For commercial banks, microfinance banks and other licensed lenders interested in partnerships that can help manage lending risks and expand financing opportunities for eligible youth-led businesses.",
    slug: "banks-lenders",
    hoverColor: "#F8CFA3",
  },
  {
    number: "03",
    title: "Ecosystem Support Organisations",
    subtitle: "Helping entrepreneurs build stronger businesses.",
    description:
      "For business development service providers, incubators, accelerators, innovation hubs and other organisations delivering practical support to entrepreneurs and MSMEs.",
    extraDescription:
      "Explore opportunities to collaborate on business capacity-building, investment readiness and enterprise development.",
    slug: "ecosystem-support",
    hoverColor: "#F3E3A6",
  },
  {
    number: "04",
    title: "Research, Policy & Public Institutions",
    subtitle: "Strengthening the environment for enterprise growth.",
    description:
      "For universities, research institutes, policy organisations, public institutions and other bodies working to advance entrepreneurship research, improve MSME data and support informed policy development.",
    slug: "research-policy",
    hoverColor: "#A9DDD3",
  },
  {
    number: "05",
    title: "Investors & Development Partners",
    subtitle: "Connecting institutional capital with long-term opportunity.",
    description:
      "For development finance institutions, bilateral agencies, foundations and other institutional investors interested in investment, co-investment, technical assistance or strategic partnerships with NYEIB.",
    slug: "investors-dev-partners",
    hoverColor: "#BFEBDC",
  },
];

function StakeholderRowItem({ item }: { item: StakeholderRow }) {
  const [isHovered, setIsHovered] = useState(false);
  const [ripplePos, setRipplePos] = useState({ x: 50, y: 50 });
  const rowRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setRipplePos({ x, y });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link
      ref={rowRef}
      href={`/apply/partner/${item.slug}`}
      prefetch={true}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      aria-label={`${item.title} — Explore Partnership`}
      className="group relative block w-full border-t border-[#E6DCCB] py-6 sm:py-7 transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2eb78c] rounded-2xl px-3 sm:px-6 overflow-hidden"
    >
      {/* Ripple Background expanding from pointer */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
        style={{
          backgroundColor: item.hoverColor,
          opacity: isHovered ? 0.35 : 0,
          clipPath: isHovered
            ? `circle(150% at ${ripplePos.x}% ${ripplePos.y}%)`
            : `circle(0% at ${ripplePos.x}% ${ripplePos.y}%)`,
          transition: "clip-path 450ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease",
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 lg:gap-12 items-start lg:items-center">
        {/* Left Column: Number, Title, and Collapsible Subtitle + Description */}
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-8 flex-1">
          {/* Mono Number */}
          <span className="font-mono text-base sm:text-lg font-bold text-[#0F2A20]/45 tracking-widest pt-1 shrink-0">
            {item.number}
          </span>

          {/* Text Content */}
          <div className="flex-1 max-w-[65ch]">
            <h3
              className="text-2xl sm:text-[28px] lg:text-[30px] font-normal text-[#0F2A20] leading-snug group-hover:text-[#003124] transition-colors"
              style={{ fontFamily: "var(--font-headline, serif)" }}
            >
              {item.title}
            </h3>

            {/* Smooth Collapsible Body (Hidden until hovered or focused) */}
            <div
              className={`grid transition-all duration-400 ease-out ${
                isHovered
                  ? "grid-rows-[1fr] opacity-100 mt-3"
                  : "grid-rows-[0fr] opacity-0 mt-0"
              }`}
            >
              <div className="overflow-hidden space-y-2.5">
                <p
                  className="text-[0.98rem] sm:text-[1.05rem] font-medium text-[#0F2A20] leading-normal"
                  style={{ fontFamily: "var(--font-body, sans-serif)" }}
                >
                  {item.subtitle}
                </p>

                <p
                  className="text-[0.92rem] sm:text-[0.98rem] text-[#0F2A20]/75 leading-relaxed font-normal"
                  style={{ fontFamily: "var(--font-body, sans-serif)" }}
                >
                  {item.description}
                </p>

                {item.extraDescription && (
                  <p
                    className="text-[0.92rem] sm:text-[0.98rem] text-[#0F2A20]/75 leading-relaxed font-normal pt-1"
                    style={{ fontFamily: "var(--font-body, sans-serif)" }}
                  >
                    {item.extraDescription}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Explore Partnership text link with animated arrow */}
        <div className="flex items-center justify-start lg:justify-end pt-2 lg:pt-0 shrink-0">
          <div className="inline-flex items-center gap-2 text-lg sm:text-[21px] font-semibold text-[#0F2A20] group-hover:text-[#1f9d74] transition-colors">
            <span className="relative pb-0.5">
              Explore Partnership
              {/* Animated underline */}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1f9d74] transition-all duration-300 group-hover:w-full" />
            </span>
            <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function StakeholderList() {
  return (
    <section
      aria-label="Stakeholder Groups"
      className="w-full py-8 sm:py-12"
    >
      <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full border-b border-[#E6DCCB]">
          {STAKEHOLDERS.map((item) => (
            <StakeholderRowItem key={item.number} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
