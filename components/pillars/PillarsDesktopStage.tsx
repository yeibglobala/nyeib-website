"use client";

import React, { useEffect, useRef } from "react";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PARTICLE_COLORS,
  getParticleCloud,
} from "./particleEngine";

export interface PillarsDesktopStageProps {
  activeShapeIndex: number; // 0: Equity / Tree, 1: Guarantee / Arch, 2: Ecosystem / Network, 3: Governance
  shapeMode?: "funds" | "classic";
}

// Cubic ease in-out
function easeInOutCubic(p: number): number {
  return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
}

export const PillarsDesktopStage: React.FC<PillarsDesktopStageProps> = ({
  activeShapeIndex,
  shapeMode = "funds",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeIndexRef = useRef<number>(activeShapeIndex);
  activeIndexRef.current = activeShapeIndex;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cloud = getParticleCloud(undefined, shapeMode);
    const { count, targets, delays, phases, alphas, sizes, colors, isPulsePoint } = cloud;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isReducedMotion = mediaQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches;
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    const N = count;
    const currentPositions = new Float32Array(N * 2);
    const fromPositions = new Float32Array(N * 2);

    // Interactive offset buffers for elastic physics
    const offsetX = new Float32Array(N);
    const offsetY = new Float32Array(N);
    const velocityX = new Float32Array(N);
    const velocityY = new Float32Array(N);

    // Initialize current positions to active shape target
    const initialTarget = Math.max(0, Math.min(3, activeIndexRef.current));
    for (let i = 0; i < N; i++) {
      const pt = targets[i][initialTarget];
      currentPositions[i * 2] = pt[0];
      currentPositions[i * 2 + 1] = pt[1];
      fromPositions[i * 2] = pt[0];
      fromPositions[i * 2 + 1] = pt[1];
    }

    let targetShape = initialTarget;
    let morphStartTime = performance.now();
    let isRunning = false;
    let isVisible = false;
    let animFrameId: number | null = null;

    let dpr = 1;
    let clientWidth = 0;
    let clientHeight = 0;
    let scale = 1;

    // Pointer state in virtual canvas coordinates (500x400)
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
    const POINTER_RADIUS = 52; // Virtual px radius
    const POINTER_RADIUS_SQ = POINTER_RADIUS * POINTER_RADIUS;

    const triggerMorph = (newShape: number) => {
      for (let i = 0; i < N * 2; i++) {
        fromPositions[i] = currentPositions[i];
      }
      targetShape = Math.max(0, Math.min(3, newShape));
      morphStartTime = performance.now();
      startLoop();
    };

    const cx = CANVAS_WIDTH * 0.5;
    const cy = CANVAS_HEIGHT * 0.5;

    const renderFrame = (now: number) => {
      isRunning = false;
      if (!isVisible || document.hidden || !ctx || clientWidth === 0) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, clientWidth, clientHeight);

      let isMorphing = false;
      let hasDisplacement = false;
      const timeSec = now * 0.0006;

      // Subtle breathing for pulse rings on Network shape (period ~8s)
      const pulseBreath = 0.02 * Math.sin((now * 2 * Math.PI) / 8000);

      for (let c = 0; c < 3; c++) {
        ctx.fillStyle = PARTICLE_COLORS[c];

        for (let i = 0; i < N; i++) {
          if (colors[i] !== c) continue;

          let p = (now - morphStartTime - (isReducedMotion ? 0 : delays[i])) / MORPH_DURATION;
          if (p < 0) p = 0;
          if (p > 1) p = 1;
          if (p < 1) isMorphing = true;

          const e = easeInOutCubic(p);
          const tg = targets[i][targetShape];

          const fx = fromPositions[i * 2];
          const fy = fromPositions[i * 2 + 1];

          let baseX = fx + (tg[0] - fx) * e;
          let baseY = fy + (tg[1] - fy) * e;

          // Apply pulse breathing for network pulse points
          if (shapeMode === "funds" && targetShape === 2 && isPulsePoint[i] === 1 && !isReducedMotion) {
            baseX = cx + (baseX - cx) * (1.0 + pulseBreath);
            baseY = cy + (baseY - cy) * (1.0 + pulseBreath);
          }

          currentPositions[i * 2] = baseX;
          currentPositions[i * 2 + 1] = baseY;

          // Interactive Pointer Physics (Repulsion + Spring Return)
          if (!isReducedMotion) {
            let targetOffX = 0;
            let targetOffY = 0;

            if (isPointerActive) {
              const dx = baseX - pointerX;
              const dy = baseY - pointerY;
              const distSq = dx * dx + dy * dy;

              if (distSq < POINTER_RADIUS_SQ && distSq > 0.001) {
                const dist = Math.sqrt(distSq);
                const force = Math.pow(1 - dist / POINTER_RADIUS, 1.6) * 24; // Push force
                targetOffX = (dx / dist) * force;
                targetOffY = (dy / dist) * force;
              }
            }

            // Spring physics update: F = -k * x - damping * v
            const spring = 0.16;
            const damping = 0.76;

            const ax = (targetOffX - offsetX[i]) * spring;
            const ay = (targetOffY - offsetY[i]) * spring;

            velocityX[i] = (velocityX[i] + ax) * damping;
            velocityY[i] = (velocityY[i] + ay) * damping;

            offsetX[i] += velocityX[i];
            offsetY[i] += velocityY[i];

            if (Math.abs(offsetX[i]) > 0.05 || Math.abs(offsetY[i]) > 0.05) {
              hasDisplacement = true;
            }
          }

          // Subtle organic drift
          const dx = isReducedMotion ? 0 : Math.sin(timeSec + phases[i]) * 0.9;
          const dy = isReducedMotion ? 0 : Math.cos(timeSec * 0.8 + phases[i] * 1.3) * 0.9;

          const finalX = (baseX + dx + offsetX[i]) * scale;
          const finalY = (baseY + dy + offsetY[i]) * scale;

          ctx.globalAlpha = alphas[i];
          ctx.fillRect(finalX, finalY, sizes[i] * 1.15, sizes[i] * 1.15);
        }
      }

      ctx.globalAlpha = 1.0;

      // Keep running if morphing, pointer active, or animated with drift/springs
      if (!isReducedMotion || isMorphing || isPointerActive || hasDisplacement) {
        startLoop();
      }
    };

    const startLoop = () => {
      if (!isRunning && isVisible && !document.hidden) {
        isRunning = true;
        animFrameId = requestAnimationFrame(renderFrame);
      }
    };

    // Pointer event listeners for interactive cursor physics
    const onPointerMove = (e: PointerEvent) => {
      if (!canvas || isReducedMotion) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      if (scale > 0) {
        pointerX = clientX / scale;
        pointerY = clientY / scale;
        isPointerActive = true;
        startLoop();
      }
    };

    const onPointerLeave = () => {
      isPointerActive = false;
      pointerX = -9999;
      pointerY = -9999;
    };

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerenter", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          resize();
          startLoop();
        }
      },
      { rootMargin: "60px 0px" }
    );

    observer.observe(canvas);

    const onVisibilityChange = () => {
      if (!document.hidden && isVisible) {
        startLoop();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    let resizeTimer: NodeJS.Timeout | null = null;
    const onWindowResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        startLoop();
      }, 100);
    };
    window.addEventListener("resize", onWindowResize);

    // Initial sizing
    resize();
    startLoop();

    // Store trigger for prop changes
    (canvas as any).__triggerMorph = triggerMorph;

    return () => {
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerenter", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", onWindowResize);
      mediaQuery.removeEventListener("change", handleMotionChange);
      if (resizeTimer) clearTimeout(resizeTimer);
      if (animFrameId !== null) cancelAnimationFrame(animFrameId);
    };
  }, [shapeMode]);

  // Update morph when activeShapeIndex changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && (canvas as any).__triggerMorph) {
      (canvas as any).__triggerMorph(activeShapeIndex);
    }
  }, [activeShapeIndex]);

  return (
    <div
      ref={containerRef}
      className="w-full aspect-[5/4] flex items-center justify-center select-none cursor-crosshair"
      style={{ touchAction: "none" }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="w-full h-full block"
      />
    </div>
  );
};
