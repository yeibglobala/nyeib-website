import React from "react";

interface FormHeaderProps {
  title: string;
  boldLine: string;
}

export function FormHeader({ title, boldLine }: FormHeaderProps) {
  return (
    <header className="relative w-full bg-[#0b1310] min-h-[36svh] flex flex-col justify-end pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-8 lg:px-12 overflow-hidden">
      {/* Soft mint glow on right (CSS only, no image) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 w-full md:w-3/4 h-full"
        style={{
          background:
            "radial-gradient(circle at 90% 45%, rgba(46,183,140,0.22) 0%, rgba(46,183,140,0.06) 50%, transparent 75%)",
        }}
      />

      <div className="max-w-[1240px] w-full mx-auto relative z-10">
        <h1
          className="text-3xl sm:text-5xl lg:text-[52px] font-bold text-white tracking-tight leading-[1.12] mb-3 text-left"
          style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
        >
          {title}
        </h1>
        <p
          className="text-base sm:text-lg lg:text-[19px] text-white/80 font-normal leading-relaxed max-w-3xl m-0 text-left"
          style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
        >
          {boldLine}
        </p>
      </div>
    </header>
  );
}
