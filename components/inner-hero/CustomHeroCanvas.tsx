"use client";

import React, { useEffect, useRef } from "react";
import {
  HERO_SHAPE_REGISTRY,
  ShapeCloudData,
  HeroShapeSlug,
} from "@/lib/hero/heroShapes";

const PARTICLE_COLOR_VALUES = [
  "rgb(0, 190, 147)",   // 0: Emerald #00BE93
  "rgb(46, 183, 140)",  // 1: Mint #2EB78C
  "rgb(248, 132, 4)",   // 2: Tiger Orange #F88404
  "rgb(225, 201, 179)", // 3: Starlight #E1C9B3
];

interface CustomHeroCanvasProps {
  slug: string;
  className?: string;
}

export function CustomHeroCanvas({ slug, className = "" }: CustomHeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const generator = HERO_SHAPE_REGISTRY[slug] || HERO_SHAPE_REGISTRY["who-we-serve"];

    let animId: number;
    let isRunning = true;
    let width = 0;
    let height = 0;
    let isMobile = false;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = mediaQuery.matches;
    const onMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener("change", onMotionChange);

    // Particle state buffers
    let count = 7200;
    let cloud: ShapeCloudData | null = null;
    let currentX: Float32Array;
    let currentY: Float32Array;
    let velocityX: Float32Array;
    let velocityY: Float32Array;
    let targetX: Float32Array;
    let targetY: Float32Array;

    const pointer = {
      x: -9999,
      y: -9999,
      active: false,
    };

    let startTime = performance.now();

    const initCloud = () => {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width || window.innerWidth;
      height = rect.height || window.innerHeight;
      isMobile = width < 700;
      count = isMobile ? 3600 : 7200;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cloud = generator(count);

      currentX = new Float32Array(count);
      currentY = new Float32Array(count);
      velocityX = new Float32Array(count);
      velocityY = new Float32Array(count);
      targetX = new Float32Array(count);
      targetY = new Float32Array(count);

      // Compute Stage Transformation
      let scale = 1;
      let ox = 0;
      let oy = 0;

      if (!isMobile) {
        // Desktop / Tablet Landscape: x from 36% to 99%, y from 5% to 96%
        const stageX0 = width * 0.36;
        const stageX1 = width * 0.99;
        const stageW = stageX1 - stageX0;
        const stageY0 = height * 0.05;
        const stageY1 = height * 0.96;
        const stageH = stageY1 - stageY0;

        scale = Math.min(stageW / 1000, stageH / 700);
        // Anchor to the right
        ox = stageX1 - 1000 * scale;
        oy = stageY0 + (stageH - 700 * scale) / 2;
      } else {
        // Phone / Portrait: stage is full width, y from 4% to 56%
        const stageW = width;
        const stageY0 = height * 0.04;
        const stageY1 = height * 0.56;
        const stageH = stageY1 - stageY0;

        scale = Math.min(stageW / 1000, stageH / 700);
        ox = (width - 1000 * scale) / 2;
        oy = stageY0 + (stageH - 700 * scale) / 2;
      }

      // Initialize positions with intro scatter
      for (let i = 0; i < count; i++) {
        const [vx, vy] = cloud.targets[i];
        const tx = ox + vx * scale;
        const ty = oy + vy * scale;
        targetX[i] = tx;
        targetY[i] = ty;

        // Intro start position (scattered along growth delay direction)
        const delay = cloud.delays[i];
        currentX[i] = tx + (Math.sin(i * 1.7) * 80 + (1 - delay) * 40);
        currentY[i] = ty + (Math.cos(i * 2.3) * 60 + (1 - delay) * 50);
      }

      startTime = performance.now();
    };

    initCloud();

    // Event listeners for pointer push
    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      let cx = 0, cy = 0;
      if ("touches" in e && e.touches.length > 0) {
        cx = e.touches[0].clientX;
        cy = e.touches[0].clientY;
      } else if ("clientX" in e) {
        cx = e.clientX;
        cy = e.clientY;
      }
      const rect = canvas.getBoundingClientRect();
      pointer.x = cx - rect.left;
      pointer.y = cy - rect.top;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("mouseleave", onPointerLeave);
    window.addEventListener("touchend", onPointerLeave);

    let resizeTimer: NodeJS.Timeout | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initCloud, 100);
    };
    window.addEventListener("resize", onResize, { passive: true });

    // IntersectionObserver to pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isRunning = entry.isIntersecting;
        if (isRunning) {
          lastFrame = performance.now();
          render(lastFrame);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let lastFrame = performance.now();

    const render = (time: number) => {
      if (!isRunning || !cloud) return;

      const dt = Math.min(0.05, (time - lastFrame) / 1000);
      lastFrame = time;

      const elapsed = (time - startTime) / 1000;
      const introProgress = Math.min(1.0, elapsed / 1.4); // 1.4s smooth intro assembly

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      const ptrX = pointer.x;
      const ptrY = pointer.y;
      const ptrRadius = isMobile ? 80 : 130;
      const ptrForce = 35;

      const textBoundaryX = width * 0.36;

      for (let i = 0; i < count; i++) {
        const delay = cloud.delays[i];
        const pAssembly = Math.max(0, Math.min(1, (introProgress - delay * 0.35) / 0.65));
        const easeAssembly = pAssembly * pAssembly * (3 - 2 * pAssembly);

        // Continuous subtle ambient drift
        const phase = cloud.phases[i];
        const driftX = prefersReducedMotion ? 0 : Math.sin(time * 0.0015 + phase) * 1.8;
        const driftY = prefersReducedMotion ? 0 : Math.cos(time * 0.0012 + phase) * 2.2;

        const baseTx = targetX[i] + driftX;
        const baseTy = targetY[i] + driftY;

        // Interactive pointer repulsion
        let pushX = 0;
        let pushY = 0;
        if (pointer.active && !prefersReducedMotion) {
          const dx = currentX[i] - ptrX;
          const dy = currentY[i] - ptrY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < ptrRadius && dist > 0.01) {
            const factor = (1 - dist / ptrRadius) * ptrForce;
            pushX = (dx / dist) * factor;
            pushY = (dy / dist) * factor;
          }
        }

        // Spring dynamics towards target
        const goalX = baseTx + pushX;
        const goalY = baseTy + pushY;

        const k = 0.12; // Spring stiffness
        const damp = 0.82; // Damping

        velocityX[i] = (velocityX[i] + (goalX - currentX[i]) * k) * damp;
        velocityY[i] = (velocityY[i] + (goalY - currentY[i]) * k) * damp;

        currentX[i] += velocityX[i];
        currentY[i] += velocityY[i];

        // Fade calculation
        let alpha = cloud.alphas[i] * easeAssembly;

        // Twinkle calculation
        if (!prefersReducedMotion) {
          const twinkle = 0.85 + 0.15 * Math.sin(time * 0.003 + phase * 2);
          alpha *= twinkle;
        }

        // Smoothly lower alpha if point falls into left text area on desktop
        if (!isMobile && currentX[i] < textBoundaryX) {
          const distIntoText = textBoundaryX - currentX[i];
          const fadeFactor = Math.max(0.08, 1 - distIntoText / 140);
          alpha *= fadeFactor;
        }

        if (alpha <= 0.01) continue;

        ctx.fillStyle = PARTICLE_COLOR_VALUES[cloud.colors[i]];
        ctx.globalAlpha = alpha;

        const size = cloud.sizes[i];
        const px = currentX[i];
        const py = currentY[i];

        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();

        // Soft halo on bright accent particles
        if (size > 1.3 && alpha > 0.6) {
          ctx.beginPath();
          ctx.arc(px, py, size * 2.0, 0, Math.PI * 2);
          ctx.globalAlpha = alpha * 0.22;
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1.0;
      ctx.globalCompositeOperation = "source-over";

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("mouseleave", onPointerLeave);
      window.removeEventListener("touchend", onPointerLeave);
      window.removeEventListener("resize", onResize);
      mediaQuery.removeEventListener("change", onMotionChange);
      if (resizeTimer) clearTimeout(resizeTimer);
      observer.disconnect();
    };
  }, [slug]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-10 ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
}
