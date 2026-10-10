"use client";

import React from "react";
import Link from "next/link";

export interface PathwaySwitcherProps {
  currentPathway: "business" | "partner";
}

export function PathwaySwitcher({ currentPathway }: PathwaySwitcherProps) {
  return (
    <div className="apply-sw-wrapper">
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
            <small className="hidden sm:inline">Pathway 1:</small>
            <span className="truncate">Business Support</span>
          </Link>
          <Link
            href="/apply/partner"
            className={currentPathway === "partner" ? "on" : ""}
            aria-current={currentPathway === "partner" ? "page" : undefined}
          >
            <small className="hidden sm:inline">Pathway 2:</small>
            <span className="truncate">Partner with NYEIB</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
