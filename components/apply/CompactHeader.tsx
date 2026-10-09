import React from "react";

export interface CompactHeaderProps {
  title: string;
  pill: string;
  pillColor?: "mint" | "orange";
}

export function CompactHeader({
  title,
  pill,
  pillColor = "mint",
}: CompactHeaderProps) {
  return (
    <header
      data-theme="dark"
      className="relative w-full bg-[#0b1310] text-[#eef6f2] pt-28 sm:pt-44 md:pt-48 pb-10 sm:pb-18 min-h-[34svh] sm:min-h-[42svh] flex flex-col justify-end overflow-hidden border-b border-white/[0.08]"
    >
      {/* Soft CSS Mint Ambient Glow (Right side) */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[420px] sm:w-[600px] h-full pointer-events-none opacity-40 blur-[100px] select-none"
        style={{
          background:
            pillColor === "orange"
              ? "radial-gradient(circle at top right, #F88404 0%, rgba(248,132,4,0) 70%)"
              : "radial-gradient(circle at top right, #2eb78c 0%, rgba(46,183,140,0) 70%)",
        }}
      />

      <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal text-white tracking-tight leading-[1.14] mb-4"
          style={{ fontFamily: "var(--font-headline, serif)" }}
        >
          {title}
        </h1>

        <div className="inline-flex">
          <span
            className={`inline-flex items-center px-4 py-1.5 rounded-full border text-[0.8rem] sm:text-[0.85rem] font-medium tracking-wide ${
              pillColor === "orange"
                ? "border-[#F88404]/40 bg-[#F88404]/10 text-[#F8CFA3]"
                : "border-[#2eb78c]/40 bg-[#2eb78c]/10 text-[#7de5c5]"
            }`}
          >
            {pill}
          </span>
        </div>
      </div>
    </header>
  );
}
