"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export interface PathwaySwitcherProps {
  currentPathway: "business" | "partner";
}

export function PathwaySwitcher({ currentPathway }: PathwaySwitcherProps) {
  return (
    <div className="sticky top-[72px] sm:top-[80px] z-30 w-full py-2.5 sm:py-3 bg-[#F7F5F0]/95 backdrop-blur-md border-b border-[#E6DCCB]/80 transition-all duration-200">
      <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2.5 sm:gap-4">
        {/* Back Arrow to /apply */}
        <Link
          href="/apply"
          aria-label="Back to all pathways"
          className="w-10 h-10 rounded-full bg-white border border-[#E6DCCB] text-[#0F2A20] hover:text-[#1f9d74] hover:border-[#2eb78c] hover:bg-[#F2FBF6] flex items-center justify-center shrink-0 transition-all shadow-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2eb78c]"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>

        {/* Segmented Control: fills remaining width on mobile, auto-width on desktop */}
        <nav
          aria-label="Pathway switcher"
          className="flex-1 sm:flex-initial flex items-center bg-white p-1 sm:p-1.5 rounded-full border border-[#E6DCCB] shadow-sm overflow-hidden"
        >
          {/* Pathway 1 Link */}
          <Link
            href="/apply/business"
            prefetch={true}
            aria-current={currentPathway === "business" ? "page" : undefined}
            className={`flex-1 sm:flex-initial px-2 min-[380px]:px-3 sm:px-5 py-2 rounded-full text-center transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2 select-none min-w-0 ${
              currentPathway === "business"
                ? "bg-[#0F2A20] text-white shadow-sm font-semibold"
                : "text-[#0F2A20]/75 hover:text-[#0F2A20] hover:bg-black/[0.03]"
            }`}
          >
            <span className="hidden md:inline font-mono text-[0.72rem] opacity-75 uppercase tracking-wider shrink-0">
              Pathway 1:
            </span>
            <span className="md:hidden font-mono text-[0.68rem] opacity-60 shrink-0">
              1.
            </span>
            <span className="text-[0.74rem] min-[380px]:text-[0.80rem] sm:text-[0.88rem] truncate font-medium">
              Business Support
            </span>
          </Link>

          {/* Pathway 2 Link */}
          <Link
            href="/apply/partner"
            prefetch={true}
            aria-current={currentPathway === "partner" ? "page" : undefined}
            className={`flex-1 sm:flex-initial px-2 min-[380px]:px-3 sm:px-5 py-2 rounded-full text-center transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2 select-none min-w-0 ${
              currentPathway === "partner"
                ? "bg-[#0F2A20] text-white shadow-sm font-semibold"
                : "text-[#0F2A20]/75 hover:text-[#0F2A20] hover:bg-black/[0.03]"
            }`}
          >
            <span className="hidden md:inline font-mono text-[0.72rem] opacity-75 uppercase tracking-wider shrink-0">
              Pathway 2:
            </span>
            <span className="md:hidden font-mono text-[0.68rem] opacity-60 shrink-0">
              2.
            </span>
            <span className="text-[0.74rem] min-[380px]:text-[0.80rem] sm:text-[0.88rem] truncate font-medium">
              Partner with NYEIB
            </span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
