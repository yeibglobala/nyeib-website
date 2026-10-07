"use client";

import React from "react";
import { useParallax, ParallaxOptions } from "../hooks/useParallax";

export interface ParallaxProps extends ParallaxOptions {
  children: React.ReactNode;
  className?: string;
}

export function Parallax({
  children,
  speed = 30,
  clamp = true,
  className = "",
}: ParallaxProps) {
  const ref = useParallax<HTMLDivElement>({ speed, clamp });

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
