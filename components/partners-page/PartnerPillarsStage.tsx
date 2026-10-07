"use client";

import React, { useEffect, useRef } from "react";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PARTICLE_COLORS,
} from "../pillars/particleEngine";
import { buildShapeA, buildShapeB } from "./partnerShapes";

export interface PartnerPillarsStageProps {
  activeIndex: number; // 0: Shape A (Two Strands), 1: Shape B (Three Pillars)
  className?: string;
}

function easeInOutCubic(p: number): number {
  return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
}

export const PartnerPillarsStage: React.FC<PartnerPillarsStageProps> = ({
  activeIndex,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeIndexRef = useRef<number>(activeIndex);
  activeIndexRef.current = activeIndex;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 700;
    const particleCount = isMobile ? 3600 : 7200;

    // Pre-build Shape A and Shape B with matching particle counts
    const cloudA = buildShapeA(particleCount);
    const cloudB = buildShapeB(particleCount);

    const N = particleCount;
    const targetsA = cloudA.targets;
    const targetsB = cloudB.targets;
    const delays = cloudA.delays;
    const phases = cloudA.phases;
    const alphas = cloudA.alphas;
    const sizes = cloudA.sizes;
    const colors = cloudA.colors;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isReducedMotion = mediaQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches;
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    const currentPositions = new Float32Array(N * 2);
    const fromPositions = new Float32Array(N * 2);

    // Interactive offset buffers for elastic physics
    const offsetX = new Float32Array(N);
    const offsetY = new Float32Array(N);
    const velocityX = new Float32Array(N);
    const velocityY = new Float32Array(N);

    // Initial targets based on activeIndex
    const initialTargets = activeIndexRef.current === 0 ? targetsA : targetsB;
    for (let i = 0; i < N; i++) {
      const pt = initialTargets[i];
      currentPositions[i * 2] = pt[0];
      currentPositions[i * 2 + 1] = pt[1];
      fromPositions[i * 2] = pt[0];
      fromPositions[i * 2 + 1] = pt[1];
    }

    let targetShapeIdx = activeIndexRef.current;
    let morphStartTime = performance.now();
    let isRunning = false;
    let isVisible = false;
    let animFrameId: number | null = null;

    let dpr = 1;
    let clientWidth = 0;
    let clientHeight = 0;
    let scale = 1;

    let pointerX = -9999;
    let pointerY = -9999;
    let isPointerActive = false;

    const resize = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      clientWidth = canvas.clientWidth;
      clientHeight = canvas.clientHeight;
      if (clientWidth === 0 || clientHeight === 0) return;

      canvas.width = Math.floor(clientWidth * dpr);
      canvas.height = Math.floor(clientHeight * dpr);
      scale = clientWidth / CANVAS_WIDTH;
    };

    const MORPH_DURATION = isReducedMotion ? 1 : 900;
    const POINTER_RADIUS = 52;
    const POINTER_RADIUS_SQ = POINTER_RADIUS * POINTER_RADIUS;

    const triggerMorph = (newShape: number) => {
      for (let i = 0; i < N * 2; i++) {
        fromPositions[i] = currentPositions[i];
      }
      targetShapeIdx = newShape;
      morphStartTime = performance.now();
      startLoop();
    };

    const renderFrame = (now: number) => {
      isRunning = false;
      if (!isVisible || document.hidden || !ctx || clientWidth === 0) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, clientWidth, clientHeight);

      let isMorphing = false;
      let hasDisplacement = false;
      const timeSec = now * 0.0006;
      const targetTargets = targetShapeIdx === 0 ? targetsA : targetsB;

      for (let c = 0; c < 3; c++) {
        ctx.fillStyle = PARTICLE_COLORS[c];

        for (let i = 0; i < N; i++) {
          if (colors[i] !== c) continue;

          let p = (now - morphStartTime - (isReducedMotion ? 0 : delays[i])) / MORPH_DURATION;
          if (p < 0) p = 0;
          if (p > 1) p = 1;
          if (p < 1) isMorphing = true;

          const e = easeInOutCubic(p);
          const tg = targetTargets[i];
          const fx = fromPositions[i * 2];
          const fy = fromPositions[i * 2 + 1];

          const currentX = fx + (tg[0] - fx) * e;
          const currentY = fy + (tg[1] - fy) * e;
          currentPositions[i * 2] = currentX;
          currentPositions[i * 2 + 1] = currentY;

          // 1. Natural Ambient Micro-Drift
          const phase = phases[i];
          const driftX = isReducedMotion
            ? 0
            : Math.cos(timeSec * 0.8 + phase) * 0.75 +
              Math.sin(timeSec * 1.6 + phase * 2) * 0.35;
          const driftY = isReducedMotion
            ? 0
            : Math.sin(timeSec * 0.9 + phase) * 0.75 +
              Math.cos(timeSec * 1.5 + phase * 2) * 0.35;

          const baseX = currentX + driftX;
          const baseY = currentY + driftY;

          // 2. Interactive Soft Push Away from Pointer
          if (!isReducedMotion && isPointerActive) {
            const dx = baseX + offsetX[i] - pointerX;
            const dy = baseY + offsetY[i] - pointerY;
            const distSq = dx * dx + dy * dy;

            if (distSq < POINTER_RADIUS_SQ && distSq > 0.0001) {
              const dist = Math.sqrt(distSq);
              const force = Math.pow(1 - dist / POINTER_RADIUS, 1.8) * 16.0;
              const nx = dx / dist;
              const ny = dy / dist;

              velocityX[i] += nx * force * 0.22;
              velocityY[i] += ny * force * 0.22;
            }
          }

          // 3. Elastic Spring Physics Home
          if (!isReducedMotion) {
            const SPRING = 0.085;
            const DAMPING = 0.84;

            velocityX[i] += -offsetX[i] * SPRING;
            velocityY[i] += -offsetY[i] * SPRING;
            velocityX[i] *= DAMPING;
            velocityY[i] *= DAMPING;

            offsetX[i] += velocityX[i];
            offsetY[i] += velocityY[i];

            if (
              Math.abs(offsetX[i]) > 0.05 ||
              Math.abs(offsetY[i]) > 0.05 ||
              Math.abs(velocityX[i]) > 0.05 ||
              Math.abs(velocityY[i]) > 0.05
            ) {
              hasDisplacement = true;
            }
          }

          const renderX = (baseX + offsetX[i]) * scale;
          const renderY = (baseY + offsetY[i]) * scale;

          ctx.globalAlpha = alphas[i];
          const dotSize = sizes[i] * scale;
          ctx.fillRect(renderX, renderY, dotSize, dotSize);
        }
      }

      ctx.globalAlpha = 1.0;

      if (isVisible && !document.hidden && (isMorphing || !isReducedMotion || hasDisplacement)) {
        startLoop();
      }
    };

    const startLoop = () => {
      if (!isRunning && isVisible) {
        isRunning = true;
        animFrameId = requestAnimationFrame(renderFrame);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isReducedMotion) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      pointerX = clientX / scale;
      pointerY = clientY / scale;
      isPointerActive = true;
      startLoop();
    };

    const onPointerLeave = () => {
      isPointerActive = false;
      pointerX = -9999;
      pointerY = -9999;
    };

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          resize();
          startLoop();
        } else {
          if (animFrameId) {
            cancelAnimationFrame(animFrameId);
            animFrameId = null;
          }
          isRunning = false;
        }
      },
      { rootMargin: "80px 0px 80px 0px" }
    );
    observer.observe(container);

    let resizeTimer: NodeJS.Timeout | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        startLoop();
      }, 100);
    };
    window.addEventListener("resize", onResize, { passive: true });

    resize();
    startLoop();

    // Trigger morph whenever activeIndex prop changes
    if (activeIndex !== targetShapeIdx) {
      triggerMorph(activeIndex);
    }

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleMotionChange);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
      if (animFrameId) cancelAnimationFrame(animFrameId);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, [activeIndex]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-[5/4] max-w-[580px] mx-auto select-none touch-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="w-full h-full block"
      />
    </div>
  );
};
