"use client";

import React from "react";
import { cn } from "@/shared/utils/cn";

/**
 * Wide Card SVG from public/images/card-svg.svg
 * ViewBox: 0 0 1292 513
 * Dual curved wave background filling the entire card
 */
export function WideCardSvg({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1292 513"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none select-none",
        className
      )}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M1621.29 110.268L1564.32 504.84C1562.64 516.502 1553.67 525.708 1542.97 531.851C1144.88 712.896 693.39 802.976 228.913 771.467C40.9622 758.717 -137.701 726.969 -307.358 678.168C-322.059 674.226 -331.977 659.814 -329.732 644.265L-295.774 409.077C-292.967 389.64 -272.499 376.308 -251.176 379.717L326.422 473.857C496.865 502.103 675.966 477.942 834.517 407.244L1570.27 78.3473C1595.86 67.3253 1624.94 85.0001 1621.29 110.268Z"
        fill="#00BE93"
      />
      <path
        d="M1779.52 729.782L1549.52 404.155C1542.72 394.531 1530.55 390.403 1518.23 389.792C1081.34 409.352 638.206 534.209 238.738 773.283C77.0926 870.025 -67.6486 979.472 -196.619 1100.02C-207.925 1110.21 -210.213 1127.55 -201.149 1140.39L-64.0553 1334.48C-52.7252 1350.52 -28.4346 1353.1 -10.9878 1340.37L460.804 994.115C599.812 891.522 770.341 831.684 943.704 822.638L1748.57 781.396C1776.37 779.591 1794.25 750.634 1779.52 729.782Z"
        fill="#003124"
      />
    </svg>
  );
}

export function PartnerValuePropSection() {
  return (
    <section
      id="investor-value-prop"
      aria-label="Investor Value Proposition"
      className="relative w-full bg-white py-12 sm:py-16 lg:py-24 px-5 sm:px-8 lg:px-12 overflow-hidden flex flex-col items-center justify-center"
    >
      <div className="max-w-[1240px] w-full mx-auto flex flex-col items-center justify-center">
        {/* =========================================================================
            STATIC WIDE CARD
            Rounded container matching screenshot with full-bleed /images/card-svg.svg
            ========================================================================= */}
        <div className="relative w-full min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] rounded-[32px] sm:rounded-[44px] lg:rounded-[56px] overflow-hidden bg-[#F2FBF6] pt-9 px-7 pb-32 sm:pt-12 sm:px-12 sm:pb-36 md:p-16 lg:p-20 flex flex-col justify-start md:justify-center">
          {/* Background SVG Wave:
              - Mobile (<768px): Anchored to the bottom (h-[140px] sm:h-[170px]) so it sits cleanly below the paragraph
              - Desktop (md+): Full-bleed across the wide card */}
          <WideCardSvg className="absolute bottom-0 left-0 right-0 w-full h-[140px] sm:h-[170px] md:inset-0 md:h-full" />

          {/* Text Content Block */}
          <div className="relative z-10 flex flex-col items-start max-w-[720px]">
            {/* Tag / Eyebrow */}
            <p
              className="text-[15px] sm:text-[16px] md:text-[17px] font-bold text-[#003124] tracking-normal mb-4 sm:mb-6"
              style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
            >
              Investor Value Proposition
            </p>

            {/* Title / Headline */}
            <h2
              className="font-bold text-[32px] sm:text-[40px] md:text-[46px] lg:text-[52px] leading-[1.12] tracking-tight text-[#003124] m-0 mb-4 sm:mb-6 max-w-[680px]"
              style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
            >
              More than impact. A stronger investment opportunity.
            </h2>

            {/* Body Description */}
            <p
              className="font-normal text-[15px] sm:text-[16px] md:text-[17px] leading-[1.65] text-[#003124]/85 m-0 max-w-[580px] sm:max-w-[620px]"
              style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
            >
              NYEIB helps institutions participate in businesses with growth potential,
              measurable impact and long-term economic value, while strengthening the
              conditions that can make those businesses more investment-ready.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PartnerValuePropSection;
