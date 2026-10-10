"use client";

import React from "react";
import Link from "next/link";
import { ESG_CONTENT } from "@/src/content/esg";
import { EsgButton } from "./EsgButton";

interface PathCardMeta {
  topTag: string;
  bg: string;
  textColor: string;
  linkText: string;
  href: string;
}

const ITEM_METAS: PathCardMeta[] = [
  {
    topTag: "01 / Development Finance",
    bg: "bg-[#003B2E]",
    textColor: "text-white",
    linkText: "Explore partnerships",
    href: "/apply/partner/investors-dev-partners",
  },
  {
    topTag: "02 / Public Sector",
    bg: "bg-[#0D6950]",
    textColor: "text-white",
    linkText: "Explore collaboration",
    href: "/apply/partner/research-policy",
  },
  {
    topTag: "03 / Financial Institutions",
    bg: "bg-[#E8C9B2]",
    textColor: "text-[#003B2E]",
    linkText: "Partner with NYEIB",
    href: "/apply/partner/banks-lenders",
  },
  {
    topTag: "04 / Technical Assistance",
    bg: "bg-[#07513E]",
    textColor: "text-white",
    linkText: "Explore collaboration",
    href: "/apply/partner/ecosystem-support",
  },
  {
    topTag: "05 / Ecosystem Support",
    bg: "bg-[#A9DDD3]",
    textColor: "text-[#003B2E]",
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
            SECTION HEADER (Eyebrow, Headline, Lead-in)
            ========================================================================= */}
        <div className="max-w-3xl mb-12 lg:mb-14">
          <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#00684A] mb-3">
            <span className="w-7 h-[2px] bg-[#00684A]" aria-hidden="true" />
            <span>One connected ecosystem</span>
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
            className="text-base sm:text-[17px] text-[#4A5B53] font-normal leading-relaxed m-0"
            style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
          >
            {leadIn}
          </p>
        </div>

        {/* =========================================================================
            3-COLUMN GRID WITH PATH-CARD ANATOMY (Top Banner + Rings + White Body)
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => {
            const meta = ITEM_METAS[idx] || {
              topTag: `0${idx + 1} / Partner`,
              bg: "bg-[#003B2E]",
              textColor: "text-white",
              linkText: "Learn more",
              href: "/apply/partner",
            };

            return (
              <article
                key={idx}
                className="bg-white rounded-[24px] border border-[#E6DCCB] shadow-[0_4px_20px_rgba(15,42,32,0.03)] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(15,42,32,0.08)] cursor-default select-text"
              >
                {/* Path Card Top (.path-card-top) */}
                <div
                  className={`h-[145px] sm:h-[155px] ${meta.bg} ${meta.textColor} relative flex items-end p-6 sm:p-7 overflow-hidden`}
                >
                  {/* Concentric rings decoration */}
                  <svg
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-10 -right-8 w-52 h-52 opacity-25"
                    viewBox="0 0 200 200"
                    fill="none"
                  >
                    <circle cx="100" cy="100" r="38" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="100" cy="100" r="64" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <span className="relative z-10 text-xs sm:text-[13px] font-mono uppercase tracking-[0.12em] font-semibold">
                    {meta.topTag}
                  </span>
                </div>

                {/* Path Card Body (.path-card-body) */}
                <div className="p-7 sm:p-8 flex flex-col justify-between flex-1 bg-white">
                  <div>
                    <h3
                      className="text-xl sm:text-[22px] font-bold text-[#0F2A20] mb-3 leading-snug"
                      style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
                    >
                      {item.title}
                    </h3>

                    <p
                      className="text-sm sm:text-[15px] text-[#4A5B53] leading-relaxed mb-6 font-normal"
                      style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                    >
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 mt-auto">
                    <Link
                      href={meta.href}
                      className="group/link inline-flex items-center gap-2 text-sm font-bold text-[#003B2E] hover:text-[#008D6A] transition-colors"
                      style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                    >
                      <span>{meta.linkText}</span>
                      <span className="text-[#008D6A] text-base transition-transform duration-200 group-hover/link:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}

          {/* Card 6: Institutional Engagement & Partnership CTA Card */}
          <article className="bg-white rounded-[24px] border border-[#E6DCCB] shadow-[0_4px_20px_rgba(15,42,32,0.03)] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(15,42,32,0.08)]">
            {/* Path Card Top (.path-card-top) */}
            <div className="h-[145px] sm:h-[155px] bg-[#BFEBDC] text-[#003B2E] relative flex items-end p-6 sm:p-7 overflow-hidden">
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute -top-10 -right-8 w-52 h-52 opacity-25"
                viewBox="0 0 200 200"
                fill="none"
              >
                <circle cx="100" cy="100" r="38" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="100" cy="100" r="64" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span className="relative z-10 text-xs sm:text-[13px] font-mono uppercase tracking-[0.12em] font-semibold">
                06 / Institutional Engagement
              </span>
            </div>

            {/* Path Card Body (.path-card-body) */}
            <div className="p-7 sm:p-8 flex flex-col justify-between flex-1 bg-white">
              <div>
                <h3
                  className="text-xl sm:text-[22px] font-bold text-[#0F2A20] mb-3 leading-snug"
                  style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
                >
                  Explore Partnership Opportunities
                </h3>

                <p
                  className="text-sm sm:text-[15px] text-[#4A5B53] leading-relaxed mb-6 font-normal"
                  style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                >
                  Connect with the NYEIB team to discuss structured collaboration, co-investment or strategic alignment.
                </p>
              </div>

              <div className="pt-2 mt-auto">
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
