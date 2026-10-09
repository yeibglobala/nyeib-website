import React from "react";

export function DecorativeBlobs() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10"
    >
      {/* Mint top-right blob */}
      <div
        className="absolute -top-[10%] -right-[5%] w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full opacity-[0.35] blur-[90px] sm:blur-[130px]"
        style={{
          background: "radial-gradient(circle, #2eb78c 0%, rgba(46,183,140,0) 70%)",
        }}
      />
      {/* Soft Peach bottom-left blob */}
      <div
        className="absolute -bottom-[10%] -left-[5%] w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full opacity-[0.35] blur-[90px] sm:blur-[130px]"
        style={{
          background: "radial-gradient(circle, #F8CFA3 0%, rgba(248,207,163,0) 70%)",
        }}
      />
    </div>
  );
}
