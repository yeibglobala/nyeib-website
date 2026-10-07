"use client";

import React, { useEffect, useRef, useState } from "react";

export interface HeaderRevealProps {
  children: React.ReactNode;
  delay?: number; // Delay in ms (for staggered reveals)
  duration?: number; // Transition duration in ms (default 900ms)
  parallaxSpeed?: number; // Optional parallax drift (positive = moves down, negative = moves up)
  className?: string;
  innerClassName?: string;
  as?: React.ElementType;
  threshold?: number;
  mask?: boolean; // Whether to wrap children in overflow-hidden mask for slide-up reveal
}

export function HeaderReveal({
  children,
  delay = 0,
  duration = 900,
  parallaxSpeed = 0,
  className = "",
  innerClassName = "",
  as: Component = "div",
  threshold = 0.15,
  mask = true,
}: HeaderRevealProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const onMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", onMotionChange);

    const el = containerRef.current;
    if (!el) {
      return () => mediaQuery.removeEventListener("change", onMotionChange);
    }

    let isIntersecting = false;
    let rafId: number | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isIntersecting = true;
          setIsRevealed(true);
          if (parallaxSpeed !== 0) {
            updateParallax();
          }
        } else {
          isIntersecting = false;
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);

    // Parallax update routine if parallaxSpeed is configured
    const updateParallax = () => {
      if (!isIntersecting || !el || prefersReducedMotion || parallaxSpeed === 0) {
        return;
      }

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distanceFromCenter = elementCenter - viewportCenter;
      const progress = distanceFromCenter / (windowHeight / 2 + rect.height / 2);
      const clampedProgress = Math.max(-1.2, Math.min(1.2, progress));

      const offsetY = -clampedProgress * parallaxSpeed;
      el.style.transform = `translate3d(0, ${offsetY.toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (parallaxSpeed === 0) return;
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateParallax();
        rafId = null;
      });
    };

    if (parallaxSpeed !== 0) {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      updateParallax();
    }

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", onMotionChange);
      if (parallaxSpeed !== 0) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        if (rafId !== null) cancelAnimationFrame(rafId);
      }
    };
  }, [threshold, parallaxSpeed, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <Component ref={containerRef} className={className}>
        {children}
      </Component>
    );
  }

  const maskClass = mask ? "overflow-hidden" : "";

  return (
    <Component
      ref={containerRef}
      className={`will-change-transform ${maskClass} ${className}`}
    >
      <div
        className={`transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${innerClassName}`}
        style={{
          transitionDuration: `${duration}ms`,
          transitionDelay: `${delay}ms`,
          transform: isRevealed
            ? "translate3d(0, 0, 0)"
            : mask
            ? "translate3d(0, 108%, 0)"
            : "translate3d(0, 24px, 0)",
          opacity: isRevealed ? 1 : mask ? 0.4 : 0,
        }}
      >
        {children}
      </div>
    </Component>
  );
}
