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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const shapeIdx = SHAPE_MAP[shape] ?? 0;
    const cloud = getParticleCloud(MOBILE_PARTICLE_COUNT, shapeMode);
    const { count, targets, alphas, colors } = cloud;

    const renderStatic = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const s = Math.min(w / CANVAS_WIDTH, h / CANVAS_HEIGHT);
      const ox = (w - CANVAS_WIDTH * s) / 2;
      const oy = (h - CANVAS_HEIGHT * s) / 2;

      // Draw static points once with high-contrast palette
      for (let i = 0; i < count; i++) {
        ctx.fillStyle = PARTICLE_COLORS[colors[i]];
        ctx.globalAlpha = alphas[i];
        const pt = targets[i][shapeIdx];
        ctx.fillRect(ox + pt[0] * s, oy + pt[1] * s, 1.85, 1.85);
      }
      ctx.globalAlpha = 1.0;
    };

    renderStatic();

    let resizeTimer: NodeJS.Timeout | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(renderStatic, 120);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, [shape, shapeMode]);

  return (
    <div
      className={`relative w-full h-[190px] overflow-hidden select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="w-full h-full block"
        style={{ height: "190px" }}
      />
    </div>
  );
}
