"use client";

import React from "react";
import Link from "next/link";
import {
  Landmark,
  Building2,
  BadgeDollarSign,
  Users2,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { ESG_CONTENT } from "@/src/content/esg";
import { EsgButton } from "./EsgButton";

const ICONS = [
  { icon: Landmark, tintBg: "bg-[#BFEBDC]" },
  { icon: Building2, tintBg: "bg-[#F8CFA3]" },
  { icon: BadgeDollarSign, tintBg: "bg-[#F3E3A6]" },
  { icon: Users2, tintBg: "bg-[#A9DDD3]" },
  { icon: TrendingUp, tintBg: "bg-[#BFEBDC]" },
];

const ITEM_METAS = [
  {
    topTag: "01 / Development Finance",
    linkText: "Explore partnerships",
    href: "/apply/partner/investors-dev-partners",
  },
  {
    topTag: "02 / Public Sector",
    linkText: "Explore collaboration",
    href: "/apply/partner/research-policy",
  },
  {
    topTag: "03 / Financial Institutions",
    linkText: "Partner with NYEIB",
    href: "/apply/partner/banks-lenders",
  },
  {
    topTag: "04 / Technical Assistance",
    linkText: "Explore collaboration",
    href: "/apply/partner/ecosystem-support",
  },
  {
    topTag: "05 / Ecosystem Support",
    linkText: "Grow with NYEIB",
    href: "/apply/partner/ecosystem-support",
  },
];

export function EsgPartnershipsSection() {
  const { headline, text, leadIn, items, ctaCard } = ESG_CONTENT.partnerships;

  return (
    <section
      id="partnerships"
      data-theme="light"
      aria-label="Partnerships"
      className="relative w-full bg-[#EFE7DC] text-[#0F2A20] py-[72px] lg:py-[112px] px-4 sm:px-8 lg:px-12 border-t border-[#E6DCCB]/60 scroll-mt-32"
    >
      <div className="max-w-[1240px] w-full mx-auto">
        {/* =========================================================================
            CENTERED STATEMENT & LEAD-IN (Section Head with Eyebrow)
            ========================================================================= */}
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
          <div className="inline-block text-xs font-mono uppercase tracking-[0.14em] text-[#00684A] font-semibold mb-3">
            One connected ecosystem
          </div>
          <h2
            className="text-[32px] sm:text-[44px] lg:text-[48px] font-bold text-[#0F2A20] leading-[1.12] tracking-tight mb-5"
            style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
          >
            {headline}
          </h2>
          <p
            className="text-base sm:text-lg text-[#0F2A20]/75 leading-relaxed font-normal mb-6"
            style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
          >
            {text}
          </p>
          <p
            className="text-sm sm:text-base text-[#4A5B53] font-medium leading-relaxed m-0"
            style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
          >
            {leadIn}
          </p>
        </div>

        {/* =========================================================================
            3-COLUMN GRID WITH PATH-CARD ANATOMY
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => {
            const IconConfig = ICONS[idx % ICONS.length];
            const Icon = IconConfig.icon;
            const meta = ITEM_METAS[idx] || {
              topTag: `0${idx + 1} / Partner`,
              linkText: "Learn more",
              href: "/apply/partner",
            };

            return (
              <article
                key={idx}
                className="bg-white rounded-[24px] p-7 sm:p-8 border border-[#E6DCCB] shadow-[0_4px_20px_rgba(15,42,32,0.03)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(15,42,32,0.08)] cursor-default select-text"
              >
                {/* Card Top (.path-card-top) */}
                <div className="flex items-center justify-between border-b border-[#E6DCCB]/70 pb-4 mb-5">
                  <span className="text-xs sm:text-[13px] font-mono uppercase tracking-wider text-[#00684A] font-semibold">
                    {meta.topTag}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-xl ${IconConfig.tintBg} text-[#0F2A20] flex items-center justify-center shrink-0 shadow-xs`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Body (.path-card-body) */}
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <h3
                      className="text-xl sm:text-[22px] font-bold text-[#0F2A20] mb-3 leading-snug"
                      style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
                    >
                      {item.title}
                    </h3>

                    <p
                      className="text-sm sm:text-[15px] text-[#4A5B53] leading-relaxed mb-6"
                      style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                    >
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={meta.href}
                      className="group/link inline-flex items-center gap-2 text-sm font-semibold text-[#00684A] hover:text-[#0F2A20] transition-colors"
                      style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                    >
                      <span>{meta.linkText}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}

          {/* Card 6: Mint-tinted Partnership CTA card */}
          <article className="bg-[#BFEBDC]/75 rounded-[24px] p-7 sm:p-8 border border-[#96DCBE] shadow-[0_4px_20px_rgba(15,42,32,0.03)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(15,42,32,0.08)]">
            <div className="flex items-center justify-between border-b border-[#0F2A20]/15 pb-4 mb-5">
              <span className="text-xs sm:text-[13px] font-mono uppercase tracking-wider text-[#00684A] font-semibold">
                06 / Institutional Engagement
              </span>
            </div>

            <div className="flex flex-col flex-1 justify-between">
              <div>
                <h3
                  className="text-xl sm:text-[22px] font-bold text-[#0F2A20] mb-3 leading-snug"
                  style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
                >
                  Explore Partnership Opportunities
                </h3>

                <p
                  className="text-sm sm:text-[15px] text-[#0F2A20]/80 leading-relaxed mb-6"
                  style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                >
                  Connect with the NYEIB team to discuss structured collaboration, co-investment or strategic alignment.
                </p>
              </div>

              <div className="pt-2">
                <EsgButton
                  label={ctaCard.buttonLabel}
                  href={ctaCard.buttonHref}
                  variant="orange"
                />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
