"use client";

import React, { useState } from "react";

export type StatFlipCardStyle = "style1" | "style2";

export interface StatFlipCardProps {
  /**
   * Card visual style for the front face:
   * - "style1": Mint cream background with dual layered waves (Mint Leaf + Evergreen)
   * - "style2": Pure white background with single sweeping Mint Leaf wave
   */
  variant?: StatFlipCardStyle;

  /** Front face stat value (e.g. "US$300 million") */
  frontStat?: string;

  /** Front face title / subtitle (e.g. "Total capitalisation target") */
  frontTitle?: string;

  /** Front face description copy */
  frontDescription?: string;

  /** Back face stat value (e.g. "US$100 million") */
  backStat?: string;

  /** Back face title / subtitle (e.g. "Initial sovereign financing from the African Development Bank") */
  backTitle?: string;

  /** Back face list items with '+' badges */
  backItems?: string[];

  /** Hint label displayed in bottom corner (default: "Hover or Tap to Flip") */
  flipHint?: string;

  /** Controlled flipped state (if provided, component is controlled) */
  isFlipped?: boolean;

  /** Callback fired when flip state changes */
  onFlipChange?: (flipped: boolean) => void;

  /** Additional CSS class for outer card container */
  className?: string;

  /**
   * If true, card will also flip when mouse enters on desktop devices.
   * Default: true
   */
  flipOnHover?: boolean;
}

/**
 * Custom Plus Icon matching Figma node 644:247
 */
function PlusIcon({ className = "w-3 h-3 text-[#F2FBF6]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2.5 6H9.5M6 2.5V9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Vector Wave for Card Style 1:
 * Dual-layer wave (Upper: #00BE93 Mint Leaf, Lower: #003124 Evergreen)
 */
function CardStyle1Wave() {
  return (
    <svg
      viewBox="0 0 308 160"
      preserveAspectRatio="none"
      className="absolute bottom-0 left-0 right-0 w-full h-[160px] pointer-events-none select-none overflow-visible"
      aria-hidden="true"
    >
      {/* Lower Evergreen layer */}
      <path
        d="M0 160L0 125C65 110 135 125 190 142C240 157 280 158 308 140L308 160Z"
        fill="#003124"
      />
      {/* Primary Mint Leaf wave sweep */}
      <path
        d="M0 132C45 124 105 118 160 98C220 76 270 52 308 34V140C280 158 240 157 190 142C135 125 65 110 0 125Z"
        fill="#00BE93"
      />
      {/* Dark evergreen sweep accent at bottom right */}
      <path
        d="M0 160V140C70 128 140 138 200 150C250 160 285 155 308 142V160Z"
        fill="#003124"
      />
    </svg>
  );
}

/**
 * Vector Wave for Card Style 2:
 * Single smooth sweeping wave in #00BE93 Mint Leaf
 */
function CardStyle2Wave() {
  return (
    <svg
      viewBox="0 0 308 160"
      preserveAspectRatio="none"
      className="absolute bottom-0 left-0 right-0 w-full h-[155px] pointer-events-none select-none overflow-visible"
      aria-hidden="true"
    >
      <path
        d="M0 160L0 120C55 118 120 122 175 106C232 90 275 62 308 38V160Z"
        fill="#00BE93"
      />
    </svg>
  );
}

/**
 * StatFlipCard
 * Interactive 3D flip card component implementing Figma nodes:
 * - 644:227 (Card Style 1)
 * - 644:116 (Card Style 2)
 * - 644:215 (Card Style 1 — Flip reveal back)
 * - 644:259 (Card Style 2 — Flip reveal back)
 */
export function StatFlipCard({
  variant = "style1",
  frontStat = "US$300 million",
  frontTitle = "Total capitalisation target",
  frontDescription = "Target capital mobilization across equity, guarantees and ecosystem support.",
  backStat = "US$100 million",
  backTitle = "Initial sovereign financing from the African Development Bank",
  backItems = ["Equity", "Guarantees", "Ecosystem support"],
  flipHint = "Hover or Tap to Flip",
  isFlipped: controlledFlipped,
  onFlipChange,
  className = "",
  flipOnHover = true,
}: StatFlipCardProps) {
  const [internalFlipped, setInternalFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isControlled = controlledFlipped !== undefined;
  const isFlippedState = isControlled ? controlledFlipped : internalFlipped;

  // The card is flipped if explicitly toggled OR (when flipOnHover is true and user is hovering)
  const isFlipped = isFlippedState || (flipOnHover && isHovered);

  const handleToggleFlip = () => {
    const next = !isFlippedState;
    if (!isControlled) {
      setInternalFlipped(next);
    }
    onFlipChange?.(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggleFlip();
    }
  };

  const isStyle1 = variant === "style1";

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${frontStat} - ${frontTitle}. Click or press space to flip card`}
      aria-expanded={isFlipped}
      onClick={handleToggleFlip}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => flipOnHover && setIsHovered(true)}
      onMouseLeave={() => flipOnHover && setIsHovered(false)}
      className={`group relative w-full max-w-[340px] sm:max-w-[320px] md:max-w-[308px] h-[352px] sm:h-[349px] cursor-pointer outline-none select-none [perspective:1200px] ${className}`}
    >
      {/* 3D Flip Rotating Inner Container */}
      <div
        className="relative w-full h-full rounded-[24.32px] transition-transform duration-[650ms] [transform-style:preserve-3d] shadow-[0_12px_36px_rgba(0,35,26,0.08)] group-hover:shadow-[0_20px_48px_rgba(0,35,26,0.14)] focus-visible:ring-2 focus-visible:ring-[#00BE93] focus-visible:ring-offset-2"
        style={{
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        {/* =========================================================================
            FRONT FACE (Figma Node 644:227 or 644:116)
            ========================================================================= */}
        <div
          className={`absolute inset-0 w-full h-full rounded-[24.32px] overflow-hidden flex flex-col justify-between p-[32px_24px_20px_24px] [backface-visibility:hidden] [transform:rotateY(0deg)] ${
            isStyle1 ? "bg-[#F2FBF6]" : "bg-white border border-[#E6DCCB]/40"
          }`}
        >
          {/* Top text block */}
          <div className="relative z-10 flex flex-col items-start gap-4 text-[#003124]">
            <div className="flex flex-col gap-2.5 items-start">
              <h3
                className="font-bold text-[30px] leading-[1.15] tracking-tight text-[#003124] m-0"
                style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
              >
                {frontStat}
              </h3>
              <p
                className="font-medium text-[16px] leading-[1.3] text-[#003124] m-0"
                style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
              >
                {frontTitle}
              </p>
            </div>

            <p
              className="font-normal text-[14px] leading-[1.35] text-[#003124]/85 max-w-[210px] m-0"
              style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
            >
              {frontDescription}
            </p>
          </div>

          {/* Bottom Wave Graphics */}
          {isStyle1 ? <CardStyle1Wave /> : <CardStyle2Wave />}

          {/* Bottom right hint */}
          <div className="relative z-10 flex items-center justify-end w-full pt-2">
            <span
              className="text-[12px] font-normal leading-[1.2] text-white/95 text-right drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
              style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
            >
              {flipHint}
            </span>
          </div>
        </div>

        {/* =========================================================================
            BACK FACE (Figma Node 644:215 or 644:259)
            ========================================================================= */}
        <div
          className="absolute inset-0 w-full h-full rounded-[24.32px] overflow-hidden bg-[#003124] text-[#F2FBF6] flex flex-col justify-between p-[32px_24px_20px_24px] [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-inner"
        >
          {/* Top text block */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-col gap-2.5 items-start text-[#F2FBF6]">
              <h3
                className="font-bold text-[30px] leading-[1.15] tracking-tight text-[#F2FBF6] m-0"
                style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
              >
                {backStat}
              </h3>
              <p
                className="font-medium text-[16px] leading-[1.25] text-[#F2FBF6] m-0"
                style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
              >
                {backTitle}
              </p>
            </div>

            {/* Capital channels list */}
            {backItems && backItems.length > 0 && (
              <div className="flex flex-col gap-2 pt-1">
                {backItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div className="shrink-0 w-3.5 h-3.5 flex items-center justify-center">
                      <PlusIcon className="w-3 h-3 text-[#F2FBF6]" />
                    </div>
                    <span
                      className="font-medium text-[14px] leading-[1.4] text-[#F2FBF6]"
                      style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom right hint */}
          <div className="flex items-center justify-end w-full pt-2">
            <span
              className="text-[12px] font-normal leading-[1.2] text-white/90 text-right"
              style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
            >
              {flipHint}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatFlipCard;
