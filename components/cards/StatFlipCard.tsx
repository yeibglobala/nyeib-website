"use client";

import React, { useState } from "react";
import { cn } from "@/shared/utils/cn";

export type StatFlipCardStyle = "style1" | "style2" | "custom";

export interface StatFlipCardItem {
  text: React.ReactNode;
  icon?: React.ReactNode;
}

export interface StatFlipCardProps {
  /**
   * Card visual style:
   * - "style1" (default): Mint cream background (#F2FBF6) with user's card-1-svg wave
   * - "style2": Crisp white background (#FFFFFF) with single wave
   * - "custom": Customize backgrounds and wave freely
   */
  variant?: StatFlipCardStyle;

  /* ================= FRONT FACE PROPS ================= */
  /** Front primary stat / big text (e.g. "US$300 million") */
  frontStat?: React.ReactNode;

  /** Front subtitle / label (e.g. "Total capitalisation target") */
  frontTitle?: React.ReactNode;

  /** Front body description (e.g. "Target capital mobilization across equity...") */
  frontDescription?: React.ReactNode;

  /** Optional eyebrow / badge above front stat */
  frontBadge?: React.ReactNode;

  /** Custom content slot rendered inside the front text container */
  frontChildren?: React.ReactNode;

  /** Custom background color for front face (defaults to #F2FBF6 for style1, #FFFFFF for style2) */
  frontBg?: string;

  /** Custom text color for front face (default #003124) */
  frontTextColor?: string;

  /* ================= BACK FACE PROPS ================= */
  /** Back face primary stat / big text (e.g. "US$100 million") */
  backStat?: React.ReactNode;

  /** Back face subtitle / label (e.g. "Initial sovereign financing from...") */
  backTitle?: React.ReactNode;

  /** Optional back face paragraph / description */
  backDescription?: React.ReactNode;

  /** Back face bullet items displayed with '+' icon */
  backItems?: (string | React.ReactNode | StatFlipCardItem)[];

  /** Custom content slot rendered inside the back text container */
  backChildren?: React.ReactNode;

  /** Custom background color for back face (default #003124 Evergreen) */
  backBg?: string;

  /** Custom text color for back face (default #F2FBF6 Mint Cream) */
  backTextColor?: string;

  /* ================= GRAPHICS & CONTROLS ================= */
  /** Path to custom SVG wave (defaults to /images/card-1-svg.svg) */
  waveSvgSrc?: string;

  /** Custom wave element to render instead of the default SVG */
  customWave?: React.ReactNode;

  /** Hint label in bottom right corner (default: "Hover or Tap to Flip", pass null to hide) */
  flipHint?: React.ReactNode;

  /** Controlled flipped state */
  isFlipped?: boolean;

  /** Callback fired when card flips */
  onFlipChange?: (flipped: boolean) => void;

  /** Additional classes for card container */
  className?: string;

  /** Whether hovering triggers the 3D flip on desktop (default: true) */
  flipOnHover?: boolean;
}

/**
 * Custom Plus Icon matching Figma node 644:247
 */
export function CardPlusIcon({ className = "w-3 h-3 text-[#F2FBF6]" }: { className?: string }) {
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
 * Vector Wave from public/images/card-1-svg.svg
 * ViewBox: 0 0 399 452
 * Dual paths: #00BE93 (Mint Leaf) and #003124 (Evergreen)
 */
export function Card1SvgWave({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 399 452"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute inset-0 w-full h-full pointer-events-none select-none object-cover ${className}`}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M452.139 216.003L433.665 393.346C433.118 398.588 429.593 402.636 425.327 405.283C266.109 482.304 84.1838 517.663 -104.426 498.016C-180.747 490.065 -253.526 473.653 -322.855 449.652C-328.859 447.702 -333.047 441.084 -332.319 434.095L-321.307 328.388C-320.397 319.652 -312.258 313.877 -303.576 315.664L-68.3886 364.89C1.01813 379.627 73.3206 370.821 136.751 340.781L431.088 201.005C441.329 196.332 453.322 204.646 452.139 216.003Z"
        fill="#00BE93"
      />
      <path
        d="M523.51 497.348L426.488 347.753C423.62 343.331 418.641 341.326 413.638 340.907C236.807 344.621 58.6755 395.767 -100.423 498.953C-164.802 540.707 -222.182 588.39 -273.041 641.266C-277.504 645.731 -278.228 653.529 -274.405 659.425L-216.574 748.592C-211.795 755.962 -201.92 757.409 -194.998 751.873L-7.84241 601.177C47.2946 556.519 115.706 531.517 185.86 529.464L511.57 520.271C522.817 519.782 529.723 506.928 523.51 497.348Z"
        fill="#003124"
      />
    </svg>
  );
}

/**
 * Single fluid wave for Card Style 2 (#00BE93)
 */
export function Card2SvgWave({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 308 160"
      preserveAspectRatio="none"
      className={`absolute bottom-0 left-0 right-0 w-full h-[155px] pointer-events-none select-none overflow-visible ${className}`}
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
 * Universal flexible 3D Flip Card component that retains exact layout while supporting varied content.
 */
export function StatFlipCard({
  variant = "style1",
  frontStat = "US$300 million",
  frontTitle = "Total capitalisation target",
  frontDescription = "Target capital mobilization across equity, guarantees and ecosystem support.",
  frontBadge,
  frontChildren,
  frontBg,
  frontTextColor = "#003124",
  backStat = "US$100 million",
  backTitle = "Initial sovereign financing from the African Development Bank",
  backDescription,
  backItems = ["Equity", "Guarantees", "Ecosystem support"],
  backChildren,
  backBg = "#003124",
  backTextColor = "#F2FBF6",
  waveSvgSrc,
  customWave,
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

  // Determine front background
  const resolvedFrontBg = frontBg || (variant === "style1" ? "bg-[#F2FBF6]" : "bg-white border border-[#E6DCCB]/40");

  // Render wave graphic
  const renderWave = () => {
    if (customWave) return customWave;
    if (waveSvgSrc) {
      return (
        <img
          src={waveSvgSrc}
          alt=""
          className="absolute inset-0 w-full h-full pointer-events-none select-none object-cover"
          aria-hidden="true"
        />
      );
    }
    if (variant === "style2") {
      return <Card2SvgWave />;
    }
    // Default is the user's card-1-svg.svg
    return <Card1SvgWave />;
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Click or press space to flip card"
      aria-expanded={isFlipped}
      onClick={handleToggleFlip}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => flipOnHover && setIsHovered(true)}
      onMouseLeave={() => flipOnHover && setIsHovered(false)}
      className={cn(
        "group relative w-full max-w-[390px] lg:max-w-[420px] h-[430px] sm:h-[445px] lg:h-[460px] cursor-pointer outline-none select-none [perspective:1200px]",
        className
      )}
    >
      {/* 3D Rotating Inner Card Container */}
      <div
        className="relative w-full h-full rounded-[26px] transition-transform duration-[650ms] [transform-style:preserve-3d] shadow-[0_14px_40px_rgba(0,35,26,0.08)] group-hover:shadow-[0_22px_54px_rgba(0,35,26,0.15)] focus-visible:ring-2 focus-visible:ring-[#00BE93] focus-visible:ring-offset-2"
        style={{
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        {/* =========================================================================
            FRONT FACE (Matches exact Figma layout + uses card-1-svg)
            ========================================================================= */}
        <div
          className={`absolute inset-0 w-full h-full rounded-[26px] overflow-hidden flex flex-col justify-between p-[34px_26px_22px_26px] sm:p-[38px_32px_24px_32px] [backface-visibility:hidden] [transform:rotateY(0deg)] ${resolvedFrontBg}`}
          style={{ color: frontTextColor }}
        >
          {/* Top text block */}
          <div className="relative z-10 flex flex-col items-start gap-4">
            {frontBadge && (
              <div className="text-xs uppercase font-mono tracking-wider opacity-75 font-semibold">
                {frontBadge}
              </div>
            )}

            {(frontStat || frontTitle) && (
              <div className="flex flex-col gap-2.5 items-start">
                {frontStat && (
                  <h3
                    className="font-bold text-[32px] sm:text-[36px] lg:text-[40px] leading-[1.12] tracking-tight m-0"
                    style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
                  >
                    {frontStat}
                  </h3>
                )}
                {frontTitle && (
                  <p
                    className="font-medium text-[16px] sm:text-[18px] leading-[1.32] m-0 max-w-[330px]"
                    style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
                  >
                    {frontTitle}
                  </p>
                )}
              </div>
            )}

            {frontDescription && (
              <p
                className="font-normal text-[14px] sm:text-[15px] leading-[1.45] opacity-85 max-w-[310px] m-0"
                style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
              >
                {frontDescription}
              </p>
            )}

            {frontChildren}
          </div>

          {/* SVG Wave Graphic (user's card-1-svg.svg) */}
          {renderWave()}

          {/* Bottom right hint */}
          {flipHint && (
            <div className="relative z-10 flex items-center justify-end w-full pt-2">
              <span
                className="text-[12px] sm:text-[13px] font-normal leading-[1.2] text-white/95 text-right drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
                style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
              >
                {flipHint}
              </span>
            </div>
          )}
        </div>

        {/* =========================================================================
            BACK FACE (Dark Evergreen Reveal Back)
            ========================================================================= */}
        <div
          className="absolute inset-0 w-full h-full rounded-[26px] overflow-hidden flex flex-col justify-between p-[34px_26px_22px_26px] sm:p-[38px_32px_24px_32px] [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-inner"
          style={{ backgroundColor: backBg, color: backTextColor }}
        >
          {/* Top text block */}
          <div className="flex flex-col items-start gap-4">
            {(backStat || backTitle) && (
              <div className="flex flex-col gap-2.5 items-start">
                {backStat && (
                  <h3
                    className="font-bold text-[32px] sm:text-[36px] lg:text-[40px] leading-[1.12] tracking-tight m-0"
                    style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
                  >
                    {backStat}
                  </h3>
                )}
                {backTitle && (
                  <p
                    className="font-medium text-[16px] sm:text-[18px] leading-[1.32] m-0 max-w-[330px]"
                    style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
                  >
                    {backTitle}
                  </p>
                )}
              </div>
            )}

            {backDescription && (
              <p
                className="font-normal text-[14px] sm:text-[15px] leading-[1.45] opacity-85 max-w-[310px] m-0"
                style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
              >
                {backDescription}
              </p>
            )}

            {/* List items with '+' icon */}
            {backItems && backItems.length > 0 && (
              <div className="flex flex-col gap-2.5 pt-2">
                {backItems.map((item, idx) => {
                  const isObj = typeof item === "object" && item !== null && "text" in item;
                  const itemText = isObj ? (item as StatFlipCardItem).text : item;
                  const customIcon = isObj ? (item as StatFlipCardItem).icon : null;

                  return (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="shrink-0 w-4 h-4 flex items-center justify-center">
                        {customIcon || <CardPlusIcon className="w-3.5 h-3.5 text-current" />}
                      </div>
                      <span
                        className="font-medium text-[14px] sm:text-[15px] leading-[1.4]"
                        style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
                      >
                        {itemText}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {backChildren}
          </div>

          {/* Bottom right hint */}
          {flipHint && (
            <div className="flex items-center justify-end w-full pt-2">
              <span
                className="text-[12px] sm:text-[13px] font-normal leading-[1.2] text-white/90 text-right"
                style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
              >
                {flipHint}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StatFlipCard;
