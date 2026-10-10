"use client";

import React from "react";
import { Megaphone, ShieldAlert, MessageSquare } from "lucide-react";
import { ESG_CONTENT } from "@/src/content/esg";
import { EsgButton } from "./EsgButton";

const CHANNEL_ICONS = {
  grievance: Megaphone,
  whistleblowing: ShieldAlert,
  enquiries: MessageSquare,
};

export function EsgAccountabilitySection() {
  const { headline, text, channels } = ESG_CONTENT.accountability;

  return (
    <section
      id="contact"
      data-theme="light"
      aria-label="Accountability & Stakeholder Contact"
      className="relative w-full bg-[#F7F5F0] text-[#0F2A20] py-[72px] lg:py-[112px] px-4 sm:px-8 lg:px-12 border-t border-[#E6DCCB]/60 scroll-mt-32"
    >
      <div className="max-w-[1240px] w-full mx-auto">
        {/* =========================================================================
            CENTERED STATEMENT
            ========================================================================= */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2
            className="text-[32px] sm:text-[44px] lg:text-[48px] font-bold text-[#0F2A20] leading-[1.12] tracking-tight mb-5"
            style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
          >
            {headline}
          </h2>
          <p
            className="text-base sm:text-lg text-[#0F2A20]/75 leading-relaxed font-normal"
            style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
          >
            {text}
          </p>
        </div>

        {/* =========================================================================
            THREE EQUAL CHANNEL CARDS SIDE BY SIDE (stack on phone)
            Each card: radius 28px, padding 36px, tint at top third,
            dark green button at bottom (mt-auto)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {channels.map((channel) => {
            const Icon =
              CHANNEL_ICONS[channel.id as keyof typeof CHANNEL_ICONS] ||
              MessageSquare;

            return (
              <div
                key={channel.id}
                className="relative bg-white rounded-[28px] border border-[#E6DCCB] shadow-[0_4px_24px_rgba(15,42,32,0.04)] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-[0_12px_36px_rgba(15,42,32,0.08)] select-text"
              >
                {/* Tint at Top Third */}
                <div
                  className="w-full pt-8 sm:pt-9 px-7 sm:px-9 pb-6 border-b border-[#E6DCCB]/40"
                  style={{
                    backgroundColor: `${channel.tint}45`,
                  }}
                >
                  {/* Icon badge */}
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 shadow-xs"
                    style={{
                      backgroundColor: channel.tint,
                      color: "#0F2A20",
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3
                    className="text-2xl sm:text-[26px] font-bold text-[#0F2A20] leading-tight m-0"
                    style={{
                      fontFamily: "var(--font-headline, 'Asul', Georgia, serif)",
                    }}
                  >
                    {channel.title}
                  </h3>
                </div>

                {/* Card Body */}
                <div className="flex-1 flex flex-col justify-between p-7 sm:p-9 pt-6">
                  <div className="mb-8">
                    <p
                      className="font-bold text-[#0F2A20] text-base sm:text-[16.5px] leading-snug m-0 mb-[14px]"
                      style={{
                        fontFamily: "var(--font-headline, 'Asul', Georgia, serif)",
                      }}
                    >
                      {channel.boldLine}
                    </p>

                    <div className="space-y-[12px]">
                      {channel.paragraphs.map((p, pIdx) => (
                        <p
                          key={pIdx}
                          className="text-sm sm:text-[15px] text-[#4A5B53] leading-relaxed m-0"
                          style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Button at bottom aligned across all cards */}
                  <div className="mt-auto pt-2 flex items-end">
                    <EsgButton
                      label={channel.buttonLabel}
                      href={channel.buttonHref}
                      variant="darkGreen"
                      minHeight64={true}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
