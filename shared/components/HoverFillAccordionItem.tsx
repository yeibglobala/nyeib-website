"use client";

import React, { useState, useRef, useCallback } from "react";
import { Plus } from "lucide-react";

export interface BrandColorConfig {
  id: "orange" | "light-green" | "dark-green" | "oak";
  name: string;
  bg: string;
  textColor: string;
  descColor: string;
  badgeClass: string;
  buttonBg: string;
  buttonIconColor: string;
  restButtonBg: string;
  restButtonIconColor: string;
}

export const BRAND_MAIN_PALETTE: BrandColorConfig[] = [
  {
    id: "orange",
    name: "Tiger Orange",
    bg: "#F88404",
    textColor: "text-white",
    descColor: "text-white/95",
    badgeClass: "bg-white/25 text-white border border-white/30",
    buttonBg: "#FFFFFF",
    buttonIconColor: "#F88404",
    restButtonBg: "#F88404",
    restButtonIconColor: "#FFFFFF",
  },
  {
    id: "light-green",
    name: "Light Green",
    bg: "#00BE93",
    textColor: "text-white",
    descColor: "text-white/95",
    badgeClass: "bg-white/25 text-white border border-white/30",
    buttonBg: "#FFFFFF",
    buttonIconColor: "#00BE93",
    restButtonBg: "#00BE93",
    restButtonIconColor: "#FFFFFF",
  },
  {
    id: "dark-green",
    name: "Dark Green",
    bg: "#003124",
    textColor: "text-white",
    descColor: "text-white/90",
    badgeClass: "bg-white/20 text-white border border-white/25",
    buttonBg: "#FFFFFF",
    buttonIconColor: "#003124",
    restButtonBg: "#003124",
    restButtonIconColor: "#FFFFFF",
  },
  {
    id: "oak",
    name: "Oak",
    bg: "#E1C9B3",
    textColor: "text-[#003124]",
    descColor: "text-[#003124]/90",
    badgeClass: "bg-white/60 text-[#003124] border border-[#003124]/15",
    buttonBg: "#FFFFFF",
    buttonIconColor: "#003124",
    restButtonBg: "#E1C9B3",
    restButtonIconColor: "#003124",
  },
];

export interface HoverFillAccordionItemProps {
  id: string;
  index: number;
  number: string;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode | ((colorConfig: BrandColorConfig, isFilled: boolean) => React.ReactNode);
  adjacentColors?: { prev?: string; next?: string };
}

export function HoverFillAccordionItem({
  id,
  index,
  number,
  title,
  isOpen,
  onToggle,
  children,
  adjacentColors,
}: HoverFillAccordionItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Default color assignment based on row index (cycling through Orange, Light Green, Dark Green, Oak)
  const defaultOption = BRAND_MAIN_PALETTE[index % BRAND_MAIN_PALETTE.length];

  const [currentColorConfig, setCurrentColorConfig] = useState<BrandColorConfig>(defaultOption);
  const [lastUsedId, setLastUsedId] = useState<string>("");
  const [clipCoords, setClipCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Pick a random brand color avoiding consecutive same color and adjacent rows
  const pickNewBrandColor = useCallback(() => {
    const candidates = BRAND_MAIN_PALETTE.filter(
      (c) => c.id !== lastUsedId && c.id !== adjacentColors?.prev && c.id !== adjacentColors?.next
    );
    const pool = candidates.length > 0 ? candidates : BRAND_MAIN_PALETTE.filter((c) => c.id !== lastUsedId);
    const chosen = pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : BRAND_MAIN_PALETTE[0];
    setLastUsedId(chosen.id);
    return chosen;
  }, [lastUsedId, adjacentColors]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setClipCoords({ x, y });
    const chosen = pickNewBrandColor();
    setCurrentColorConfig(chosen);
    setIsHovered(true);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setClipCoords({ x, y });
    setIsHovered(false);
  };

  const handleFocus = () => {
    if (!containerRef.current || !buttonRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const btnRect = buttonRef.current.getBoundingClientRect();
    const x = btnRect.left + btnRect.width / 2 - containerRect.left;
    const y = btnRect.top + btnRect.height / 2 - containerRect.top;
    setClipCoords({ x, y });
    const chosen = pickNewBrandColor();
    setCurrentColorConfig(chosen);
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const isFilled = isHovered || isOpen || isFocused;

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl border transition-all duration-300 overflow-hidden isolate ${
        isOpen
          ? "border-transparent shadow-lg"
          : isHovered
          ? "border-transparent shadow-md"
          : "bg-white border-[#003124]/10 hover:border-[#003124]/20"
      }`}
    >
      {/* =========================================================================
          RADIAL CLIP-PATH SPREAD FILL LAYER (Orange, Light Green, Dark Green, Oak)
          ========================================================================= */}
      <span
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none -z-10 will-change-[clip-path]"
        style={{
          backgroundColor: currentColorConfig.bg,
          clipPath: isFilled
            ? `circle(150% at ${clipCoords.x}px ${clipCoords.y}px)`
            : `circle(0px at ${clipCoords.x}px ${clipCoords.y}px)`,
          transition: isFilled
            ? "clip-path 450ms cubic-bezier(0.22, 1, 0.36, 1)"
            : "clip-path 350ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />

      {/* Accordion Trigger Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={onToggle}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${id}`}
        className="relative z-10 w-full flex items-center justify-between p-6 sm:p-7 text-left gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003124] focus-visible:ring-offset-2 rounded-2xl"
      >
        <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
          {/* Number Badge */}
          <span
            className={`text-xs sm:text-sm font-sans font-bold tracking-wider px-2.5 py-1 rounded-md transition-all duration-300 ${
              isFilled
                ? currentColorConfig.badgeClass
                : "bg-[#FAF7F2] text-[#003124]/70 border border-[#003124]/10"
            }`}
          >
            {number}
          </span>

          {/* Title */}
          <h3
            className={`text-lg sm:text-xl md:text-2xl font-bold tracking-tight leading-snug truncate transition-colors duration-200 ${
              isFilled ? currentColorConfig.textColor : "text-[#003124]"
            }`}
            style={{ fontFamily: "var(--font-headline, serif)" }}
          >
            {title}
          </h3>
        </div>

        {/* Plus / Minus Icon Container */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-xs"
          style={{
            backgroundColor: isFilled ? currentColorConfig.buttonBg : defaultOption.restButtonBg,
            color: isFilled ? currentColorConfig.buttonIconColor : defaultOption.restButtonIconColor,
          }}
        >
          <Plus
            className={`w-5 h-5 transition-transform duration-250 ease-out ${
              isOpen ? "rotate-45" : "rotate-0"
            }`}
          />
        </div>
      </button>

      {/* Accordion Expandable Content */}
      <div
        id={`accordion-content-${id}`}
        className={`relative z-10 grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`px-6 sm:px-7 pb-6 sm:pb-7 pt-2 space-y-5 border-t ${
              isFilled
                ? currentColorConfig.id === "oak"
                  ? "border-[#003124]/15"
                  : "border-white/20"
                : "border-[#003124]/10"
            }`}
          >
            {typeof children === "function" ? children(currentColorConfig, isFilled) : children}
          </div>
        </div>
      </div>
    </div>
  );
}
