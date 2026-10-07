"use client";

import { useEffect, useRef } from "react";

export interface ParallaxOptions {
  speed?: number; // Max pixel offset (positive = moves down, negative = moves up against scroll)
  clamp?: boolean;
}

export function useParallax<T extends HTMLElement = HTMLDivElement>(
  options: ParallaxOptions = {}
) {
  const { speed = 30, clamp = true } = options;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const el = ref.current;
    if (!el) return;

    let isIntersecting = false;
    let rafId: number | null = null;

    // Observe element visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          updateParallax();
        }
      },
      { rootMargin: "100px 0px 100px 0px" }
    );

    observer.observe(el);

    const updateParallax = () => {
      if (!isIntersecting || !el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress from -1 (below viewport) to +1 (above viewport)
      // 0 = centered in viewport
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distanceFromCenter = elementCenter - viewportCenter;
      let progress = distanceFromCenter / (windowHeight / 2 + rect.height / 2);

      if (clamp) {
        progress = Math.max(-1.5, Math.min(1.5, progress));
      }

      // Subtle GPU transform
      const offsetY = -progress * speed;
      el.style.transform = `translate3d(0, ${offsetY.toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateParallax();
        rafId = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Initial update
    updateParallax();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (el) el.style.transform = "";
    };
  }, [speed, clamp]);

  return ref;
}
