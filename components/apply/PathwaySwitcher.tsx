"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export interface PathwaySwitcherProps {
  currentPathway: "business" | "partner";
}

export function PathwaySwitcher({ currentPathway }: PathwaySwitcherProps) {
  return (
    <div className="sticky top-[72px] sm:top-[80px] z-30 w-full py-3 bg-[#F7F5F0]/90 backdrop-blur-md border-b border-[#E6DCCB]/80 transition-all duration-200">
      <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar">
        {/* Back Arrow to /apply */}
        <Link
          href="/apply"
          aria-label="Back to Apply for Funding"
          className="w-10 h-10 rounded-full bg-white border border-[#E6DCCB] text-[#0F2A20] hover:text-[#1f9d74] hover:border-[#2eb78c] hover:bg-[#F2FBF6] flex items-center justify-center shrink-0 transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2eb78c]"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>

        {/* Segmented Control */}
        <nav
          aria-label="Pathway switcher"
          className="flex items-center bg-white/90 p-1 rounded-full border border-[#E6DCCB] shadow-sm shrink-0"
        >
          {/* Pathway 1 Link */}
          <Link
            href="/apply/business"
            prefetch={true}
            aria-current={currentPathway === "business" ? "page" : undefined}
            className={`px-3.5 sm:px-5 py-2 rounded-full text-[0.82rem] sm:text-[0.88rem] font-medium transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center sm:gap-2 leading-tight ${
              currentPathway === "business"
                ? "bg-[#0F2A20] text-white shadow-sm font-semibold"
                : "text-[#0F2A20]/70 hover:text-[#0F2A20] hover:bg-black/[0.03]"
            }`}
          >
            <span className="font-mono text-[0.72rem] sm:text-[0.78rem] opacity-75 uppercase">
              Pathway 1
            </span>
            <span>Apply for Business Support</span>
          </Link>

          {/* Pathway 2 Link */}
          <Link
            href="/apply/partner"
            prefetch={true}
            aria-current={currentPathway === "partner" ? "page" : undefined}
            className={`px-3.5 sm:px-5 py-2 rounded-full text-[0.82rem] sm:text-[0.88rem] font-medium transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center sm:gap-2 leading-tight ${
              currentPathway === "partner"
                ? "bg-[#0F2A20] text-white shadow-sm font-semibold"
                : "text-[#0F2A20]/70 hover:text-[#0F2A20] hover:bg-black/[0.03]"
            }`}
          >
            <span className="font-mono text-[0.72rem] sm:text-[0.78rem] opacity-75 uppercase">
              Pathway 2
            </span>
            <span>Partner With NYEIB</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
