"use client";

import React, { useEffect, useRef } from "react";
import { PillarShape } from "./config";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PARTICLE_COLORS,
  MOBILE_PARTICLE_COUNT,
  getParticleCloud,
} from "./particleEngine";

interface DustCanvasProps {
  shape: PillarShape;
  shapeMode?: "funds" | "classic";
  className?: string;
}

const SHAPE_MAP: Record<PillarShape, number> = {
  capital: 0,
  growth: 1,
  ecosystem: 2,
  governance: 3,
};

export function DustCanvas({
  shape,
  shapeMode = "funds",
  className = "",
}: DustCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const shapeIdx = SHAPE_MAP[shape] ?? 0;
    const cloud = getParticleCloud(MOBILE_PARTICLE_COUNT, shapeMode);
    const { count, targets, phases, alphas, sizes, colors } = cloud;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isReducedMotion = mediaQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches;
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    let animFrameId: number | null = null;
    let isRunning = false;
    let isVisible = false;

    let dpr = 1;
    let clientWidth = 0;
    let clientHeight = 0;
    let scale = 1;

    // Interactive physics buffers for elastic touch / cursor reaction
    const offsetX = new Float32Array(count);
    const offsetY = new Float32Array(count);
    const velocityX = new Float32Array(count);
    const velocityY = new Float32Array(count);

    let pointerX = -9999;
    let pointerY = -9999;
    let isPointerActive = false;

    const POINTER_RADIUS = 52; // virtual px
    const POINTER_RADIUS_SQ = POINTER_RADIUS * POINTER_RADIUS;

    const resize = () => {
      if (!canvas || !container) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      clientWidth = Math.round(rect.width || canvas.clientWidth || 320);
      clientHeight = Math.round(rect.height || canvas.clientHeight || 260);

      if (clientWidth === 0 || clientHeight === 0) return;

      canvas.width = Math.floor(clientWidth * dpr);
      canvas.height = Math.floor(clientHeight * dpr);
      scale = Math.min(clientWidth / CANVAS_WIDTH, clientHeight / CANVAS_HEIGHT);
    };

    const render = (now: number) => {
      isRunning = false;
      if (!isVisible || document.hidden || !ctx || clientWidth === 0 || clientHeight === 0) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, clientWidth, clientHeight);

      const timeSec = now * 0.0008;
      const ox = (clientWidth - CANVAS_WIDTH * scale) * 0.5;
      const oy = (clientHeight - CANVAS_HEIGHT * scale) * 0.5;

      let hasDisplacement = false;

      for (let c = 0; c < 3; c++) {
        ctx.fillStyle = PARTICLE_COLORS[c];

        for (let i = 0; i < count; i++) {
          if (colors[i] !== c) continue;

          const pt = targets[i][shapeIdx];
          const baseX = pt[0];
          const baseY = pt[1];

          // Touch / pointer repulsion physics
          let targetOffX = 0;
          let targetOffY = 0;

          if (isPointerActive && !isReducedMotion) {
            const dx = baseX - pointerX;
            const dy = baseY - pointerY;
            const distSq = dx * dx + dy * dy;

            if (distSq < POINTER_RADIUS_SQ && distSq > 0.001) {
              const dist = Math.sqrt(distSq);
              const force = Math.pow(1 - dist / POINTER_RADIUS, 1.5) * 24;
              targetOffX = (dx / dist) * force;
              targetOffY = (dy / dist) * force;
            }
          }

          if (!isReducedMotion) {
            const spring = 0.18;
            const damping = 0.74;

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

          // Subtle organic breathing drift
          const dx = isReducedMotion ? 0 : Math.sin(timeSec + phases[i]) * 0.9;
          const dy = isReducedMotion ? 0 : Math.cos(timeSec * 0.9 + phases[i] * 1.2) * 0.9;

          const finalX = ox + (baseX + dx + offsetX[i]) * scale;
          const finalY = oy + (baseY + dy + offsetY[i]) * scale;

          ctx.globalAlpha = alphas[i];
          // Prominent, solid, bold particle dots (approx 2.8px to 3.7px)
          const dotSize = sizes[i] * 1.55;
          ctx.fillRect(finalX, finalY, dotSize, dotSize);
        }
      }

      ctx.globalAlpha = 1.0;

      if (!isReducedMotion || isPointerActive || hasDisplacement) {
        startLoop();
      }
    };

    const startLoop = () => {
      if (!isRunning && isVisible && !document.hidden) {
        isRunning = true;
        animFrameId = requestAnimationFrame(render);
      }
    };

    // Touch & Pointer interaction listeners for mobile
    const handlePointerMove = (clientX: number, clientY: number) => {
      if (!canvas || isReducedMotion || scale <= 0) return;
      const rect = canvas.getBoundingClientRect();
      const ox = (clientWidth - CANVAS_WIDTH * scale) * 0.5;
      const oy = (clientHeight - CANVAS_HEIGHT * scale) * 0.5;

      const px = (clientX - rect.left - ox) / scale;
      const py = (clientY - rect.top - oy) / scale;

      pointerX = px;
      pointerY = py;
      isPointerActive = true;
      startLoop();
    };

    const onPointerMove = (e: PointerEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onPointerLeave = () => {
      isPointerActive = false;
      pointerX = -9999;
      pointerY = -9999;
    };

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerenter", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave);
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchstart", onTouchMove, { passive: true });
    container.addEventListener("touchend", onPointerLeave);

    // ResizeObserver ensures canvas re-measures when mobile accordion opens
    const resizeObserver = new ResizeObserver(() => {
      resize();
      startLoop();
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          resize();
          startLoop();
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    const handleVisibilityChange = () => {
      if (!document.hidden && isVisible) {
        startLoop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    resize();
    startLoop();

    return () => {
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerenter", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchstart", onTouchMove);
      container.removeEventListener("touchend", onPointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      mediaQuery.removeEventListener("change", handleMotionChange);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (animFrameId !== null) cancelAnimationFrame(animFrameId);
    };
  }, [shape, shapeMode]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[250px] sm:h-[280px] overflow-hidden select-none touch-none rounded-xl bg-white/20 border border-[rgba(18,32,27,0.08)] my-2 ${className}`}
      style={{ touchAction: "none" }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="w-full h-full block"
      />
    </div>
  );
}
