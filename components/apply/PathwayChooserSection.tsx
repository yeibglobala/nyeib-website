"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function PathwayChooserSection() {
  return (
    <section
      aria-label="Choose your pathway"
      className="w-full pt-6 pb-12 sm:pb-16"
    >
      <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Short centered line above cards */}
        <p
          className="text-center text-[1.05rem] sm:text-[1.15rem] text-[#0F2A20]/80 font-medium mb-8 sm:mb-12"
          style={{ fontFamily: "var(--font-body, sans-serif)" }}
        >
          Choose the pathway that best describes you to get started.
        </p>

        {/* Two large cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {/* ================= CARD 1: Business Support ================= */}
          <Link
            href="/apply/business"
            prefetch={true}
            aria-label="Apply for Business Support"
            className="group relative bg-white border border-[#E6DCCB] rounded-[28px] p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-[0_4px_25px_rgba(15,42,32,0.04)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(46,183,140,0.12)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2eb78c] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F7F5F0] min-h-[460px] sm:min-h-[500px]"
          >
            {/* Top Content Area */}
            <div className="relative z-10 flex flex-col items-start">
              {/* a. Outlined small pill */}
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full border border-[#2eb78c]/35 text-[#1f9d74] bg-[#2eb78c]/5 text-[0.78rem] sm:text-[0.82rem] font-semibold tracking-wide mb-5">
                For Entrepreneurs & Businesses
              </span>

              {/* b. Small muted mono text */}
              <span className="font-mono text-[0.8rem] tracking-wider text-[#0F2A20]/50 uppercase mb-2">
                Pathway 1
              </span>

              {/* c. Big title */}
              <h2
                className="text-[28px] sm:text-[34px] md:text-[38px] lg:text-[42px] font-normal text-[#0F2A20] leading-[1.15] tracking-tight mb-4 group-hover:text-[#1f9d74] transition-colors"
                style={{ fontFamily: "var(--font-headline, serif)" }}
              >
                Apply for Business Support
              </h2>

              {/* d. Question line */}
              <p
                className="text-[1.05rem] sm:text-[1.12rem] font-medium text-[#0F2A20] leading-snug mb-3"
                style={{ fontFamily: "var(--font-body, sans-serif)" }}
              >
                Building a business with room to grow?
              </p>

              {/* e. Paragraph */}
              <p
                className="text-[0.95rem] sm:text-[1rem] text-[#0F2A20]/75 leading-relaxed font-normal max-w-xl"
                style={{ fontFamily: "var(--font-body, sans-serif)" }}
              >
                NYEIB supports growth-oriented businesses connected to Nigerian youth and women, with a focus on creating jobs and building stronger, more investable enterprises.
              </p>
            </div>

            {/* Bottom Graphic Pastel Fill (Mint to Pale Teal) & Action Arrow */}
            <div className="relative z-10 mt-8 pt-8 flex items-center justify-end">
              <div className="w-12 h-12 rounded-full border border-[#2eb78c]/30 bg-white/80 text-[#0F2A20] flex items-center justify-center transition-all duration-300 group-hover:bg-[#2eb78c] group-hover:border-[#2eb78c] group-hover:text-white shadow-sm">
                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>

            {/* Bottom 35% Soft Pastel Gradient Background with Geometric CSS shapes */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 right-0 h-[38%] bg-gradient-to-b from-transparent via-[#E3F7F0]/40 to-[#CEEFE4]/70 pointer-events-none overflow-hidden"
            >
              {/* Quarter circle shape */}
              <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-[#2eb78c]/15 transition-transform duration-500 group-hover:translate-x-3 group-hover:-translate-y-3" />
              {/* Rounded rectangle outline */}
              <div className="absolute bottom-4 left-6 w-32 h-20 rounded-2xl border-2 border-[#2eb78c]/20 transition-transform duration-500 group-hover:-translate-x-2 group-hover:translate-y-1" />
            </div>
          </Link>

          {/* ================= CARD 2: Partner With NYEIB ================= */}
          <Link
            href="/apply/partner"
            prefetch={true}
            aria-label="Partner With NYEIB"
            className="group relative bg-white border border-[#E6DCCB] rounded-[28px] p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-[0_4px_25px_rgba(15,42,32,0.04)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(248,132,4,0.12)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F88404] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F7F5F0] min-h-[460px] sm:min-h-[500px]"
          >
            {/* Top Content Area */}
            <div className="relative z-10 flex flex-col items-start">
              {/* a. Outlined small pill */}
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full border border-[#F88404]/35 text-[#c26200] bg-[#F88404]/5 text-[0.78rem] sm:text-[0.82rem] font-semibold tracking-wide mb-5">
                For Institutions & Ecosystem Partners
              </span>

              {/* b. Small muted mono text */}
              <span className="font-mono text-[0.8rem] tracking-wider text-[#0F2A20]/50 uppercase mb-2">
                Pathway 2
              </span>

              {/* c. Big title */}
              <h2
                className="text-[28px] sm:text-[34px] md:text-[38px] lg:text-[42px] font-normal text-[#0F2A20] leading-[1.15] tracking-tight mb-4 group-hover:text-[#F88404] transition-colors"
                style={{ fontFamily: "var(--font-headline, serif)" }}
              >
                Partner With NYEIB
              </h2>

              {/* d. Question line */}
              <p
                className="text-[1.05rem] sm:text-[1.12rem] font-medium text-[#0F2A20] leading-snug mb-3"
                style={{ fontFamily: "var(--font-body, sans-serif)" }}
              >
                Explore opportunities to invest, collaborate and support business growth.
              </p>

              {/* e. Paragraph */}
              <p
                className="text-[0.95rem] sm:text-[1rem] text-[#0F2A20]/75 leading-relaxed font-normal max-w-xl"
                style={{ fontFamily: "var(--font-body, sans-serif)" }}
              >
                NYEIB works with financial institutions, fund managers, investors, development partners and ecosystem organisations to help expand access to capital, reduce financing barriers and strengthen Nigeria&apos;s entrepreneurial ecosystem.
              </p>
            </div>

            {/* Bottom Graphic Pastel Fill (Peach to Pale Sand) & Action Arrow */}
            <div className="relative z-10 mt-8 pt-8 flex items-center justify-end">
              <div className="w-12 h-12 rounded-full border border-[#F88404]/30 bg-white/80 text-[#0F2A20] flex items-center justify-center transition-all duration-300 group-hover:bg-[#F88404] group-hover:border-[#F88404] group-hover:text-white shadow-sm">
                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>

            {/* Bottom 35% Soft Pastel Gradient Background with Geometric CSS shapes */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 right-0 h-[38%] bg-gradient-to-b from-transparent via-[#FCECDA]/40 to-[#F7E8D7]/70 pointer-events-none overflow-hidden"
            >
              {/* Quarter circle shape */}
              <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-[#F8CFA3]/30 transition-transform duration-500 group-hover:translate-x-3 group-hover:-translate-y-3" />
              {/* Rounded rectangle outline */}
              <div className="absolute bottom-4 left-6 w-32 h-20 rounded-2xl border-2 border-[#F8CFA3]/50 transition-transform duration-500 group-hover:-translate-x-2 group-hover:translate-y-1" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
