"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { StatFlipCard } from "@/components/cards/StatFlipCard";

/**
 * Signature dual-color curved wave in vibrant orange (#F88404) & deep evergreen (#003124)
 * Matching the exact geometry of Card1SvgWave for visual symmetry.
 */
function OrangeCardWave() {
  return (
    <svg
      viewBox="0 0 399 452"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full pointer-events-none select-none object-cover"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M452.139 216.003L433.665 393.346C433.118 398.588 429.593 402.636 425.327 405.283C266.109 482.304 84.1838 517.663 -104.426 498.016C-180.747 490.065 -253.526 473.653 -322.855 449.652C-328.859 447.702 -333.047 441.084 -332.319 434.095L-321.307 328.388C-320.397 319.652 -312.258 313.877 -303.576 315.664L-68.3886 364.89C1.01813 379.627 73.3206 370.821 136.751 340.781L431.088 201.005C441.329 196.332 453.322 204.646 452.139 216.003Z"
        fill="#F88404"
      />
      <path
        d="M523.51 497.348L426.488 347.753C423.62 343.331 418.641 341.326 413.638 340.907C236.807 344.621 58.6755 395.767 -100.423 498.953C-164.802 540.707 -222.182 588.39 -273.041 641.266C-277.504 645.731 -278.228 653.529 -274.405 659.425L-216.574 748.592C-211.795 755.962 -201.92 757.409 -194.998 751.873L-7.84241 601.177C47.2946 556.519 115.706 531.517 185.86 529.464L511.57 520.271C522.817 519.782 529.723 506.928 523.51 497.348Z"
        fill="#003124"
      />
    </svg>
  );
}

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* ================= CARD 1: Business Support (Green Style) ================= */}
          <Link
            href="/apply/business"
            prefetch={true}
            aria-label="Apply for Business Support"
            className="group relative block w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BE93] rounded-[26px] transition-transform duration-300 hover:-translate-y-1.5"
          >
            <StatFlipCard
              variant="style1"
              disableFlip={true}
              flipHint={null}
              frontBg="bg-[#F2FBF6] border border-[#003124]/10"
              className="!max-w-none w-full !h-full min-h-[480px] sm:min-h-[500px] lg:min-h-[520px] cursor-pointer transition-shadow duration-300 group-hover:shadow-[0_24px_50px_rgba(0,190,147,0.18)]"
              frontStat="Apply for Business Support"
              frontStatClassName="text-[28px] sm:text-[34px] md:text-[38px] lg:text-[42px] font-bold text-[#003124] leading-[1.15] tracking-tight group-hover:text-[#008f6e] transition-colors"
              frontTitle="Building a business with room to grow?"
              frontTitleClassName="!max-w-xl text-[1.05rem] sm:text-[1.15rem] font-semibold text-[#003124] leading-snug pt-1"
              frontDescription="NYEIB supports growth-oriented businesses connected to Nigerian youth and women, with a focus on creating jobs and building stronger, more investable enterprises."
              frontDescriptionClassName="!max-w-[460px] text-[0.95rem] sm:text-[1.02rem] text-[#003124]/80 leading-relaxed font-normal pt-1.5"
            />

            {/* Bottom-right floating action arrow */}
            <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-30 pointer-events-none">
              <div className="w-12 h-12 rounded-full border border-white/50 bg-white/90 text-[#003124] flex items-center justify-center transition-all duration-300 group-hover:bg-[#00BE93] group-hover:border-[#00BE93] group-hover:text-white shadow-md">
                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          </Link>

          {/* ================= CARD 2: Partner With NYEIB (Orange Style) ================= */}
          <Link
            href="/apply/partner"
            prefetch={true}
            aria-label="Partner With NYEIB"
            className="group relative block w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F88404] rounded-[26px] transition-transform duration-300 hover:-translate-y-1.5"
          >
            <StatFlipCard
              variant="style1"
              disableFlip={true}
              flipHint={null}
              customWave={<OrangeCardWave />}
              frontBg="bg-[#F2FBF6] border border-[#003124]/10"
              className="!max-w-none w-full !h-full min-h-[480px] sm:min-h-[500px] lg:min-h-[520px] cursor-pointer transition-shadow duration-300 group-hover:shadow-[0_24px_50px_rgba(248,132,4,0.18)]"
              frontStat="Partner With NYEIB"
              frontStatClassName="text-[28px] sm:text-[34px] md:text-[38px] lg:text-[42px] font-bold text-[#F88404] leading-[1.15] tracking-tight group-hover:text-[#cf6900] transition-colors"
              frontTitle="Explore opportunities to invest, collaborate and support business growth."
              frontTitleClassName="!max-w-xl text-[1.05rem] sm:text-[1.15rem] font-semibold text-[#003124] leading-snug pt-1"
              frontDescription="NYEIB works with financial institutions, fund managers, investors, development partners and ecosystem organisations to help expand access to capital, reduce financing barriers and strengthen Nigeria's entrepreneurial ecosystem."
              frontDescriptionClassName="!max-w-[460px] text-[0.95rem] sm:text-[1.02rem] text-[#003124]/80 leading-relaxed font-normal pt-1.5"
            />

            {/* Bottom-right floating action arrow */}
            <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-30 pointer-events-none">
              <div className="w-12 h-12 rounded-full border border-white/50 bg-white/90 text-[#003124] flex items-center justify-center transition-all duration-300 group-hover:bg-[#F88404] group-hover:border-[#F88404] group-hover:text-white shadow-md">
                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
