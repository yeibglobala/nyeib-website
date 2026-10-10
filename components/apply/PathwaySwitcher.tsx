"use client";

import React from "react";
import Link from "next/link";

export interface PathwaySwitcherProps {
  currentPathway: "business" | "partner";
}

export function PathwaySwitcher({ currentPathway }: PathwaySwitcherProps) {
  return (
    <div className="sticky top-[var(--nav-offset,88px)] z-30 w-full bg-[var(--apply-cream,#F2FBF6)]">
      <nav className="apply-sw apply-w" aria-label="Pathways">
        <Link
          href="/apply"
          className="apply-back"
          aria-label="Back to Apply overview"
        >
          ←
        </Link>
        <div className="apply-seg">
          <Link
            href="/apply/business"
            className={currentPathway === "business" ? "on" : ""}
            aria-current={currentPathway === "business" ? "page" : undefined}
          >
            <small>Pathway 1:</small>
            Apply for Business Support
          </Link>
          <Link
            href="/apply/partner"
            className={currentPathway === "partner" ? "on" : ""}
            aria-current={currentPathway === "partner" ? "page" : undefined}
          >
            <small>Pathway 2:</small>
            Partner With NYEIB
          </Link>
        </div>
      </nav>
    </div>
  );
}
