"use client";

import React, { useEffect, useRef } from "react";
import {
  HERO_SHAPE_REGISTRY,
  ShapeCloudData,
} from "@/lib/hero/heroShapes";
import { generateLogoCloud, generateRibbonCloud } from "@/lib/hero/targets";
import { createPRNG } from "@/lib/hero/config";

// Pre-render luminous particle sprite textures for WebGL-identical glowing cores & light falloff
interface ParticleSprites {
  emerald: HTMLCanvasElement;
  mint: HTMLCanvasElement;
  orange: HTMLCanvasElement;
  starlight: HTMLCanvasElement;
}

function createGlowingSprite(coreColor: string, midColor: string, outerColor: string): HTMLCanvasElement {
  const size = 32;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  const center = size / 2;
  const radius = size / 2;

  const grad = ctx.createRadialGradient(center, center, 0, center, center, radius);
  grad.addColorStop(0, coreColor);
  grad.addColorStop(0.35, midColor);
  grad.addColorStop(0.75, outerColor);
  grad.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return canvas;
}

let CACHED_SPRITES: ParticleSprites | null = null;

function getParticleSprites(): ParticleSprites | null {
  if (typeof document === "undefined") return null;
  if (CACHED_SPRITES) return CACHED_SPRITES;

  CACHED_SPRITES = {
    // 0: Emerald with bright mint core
    emerald: createGlowingSprite(
      "rgba(224, 255, 245, 1.0)",
      "rgba(46, 183, 140, 0.95)",
      "rgba(0, 190, 147, 0.35)"
    ),
    // 1: Mint with diamond white core
    mint: createGlowingSprite(
      "rgba(255, 255, 255, 1.0)",
      "rgba(63, 240, 200, 0.95)",
      "rgba(46, 183, 140, 0.40)"
    ),
    // 2: Tiger Orange with warm amber core
    orange: createGlowingSprite(
      "rgba(255, 240, 210, 1.0)",
      "rgba(248, 132, 4, 0.95)",
      "rgba(230, 95, 0, 0.40)"
    ),
    // 3: Starlight Diamond White
    starlight: createGlowingSprite(
      "rgba(255, 255, 255, 1.0)",
      "rgba(225, 245, 240, 0.95)",
      "rgba(180, 225, 215, 0.45)"
    ),
  };

  return CACHED_SPRITES;
}

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

    const sprites = getParticleSprites();
    const generator = HERO_SHAPE_REGISTRY[slug] || HERO_SHAPE_REGISTRY["who-we-serve"];
    const rnd = createPRNG(42);

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
    let shapeX: Float32Array;
    let shapeY: Float32Array;
    let ribbonPts: Float32Array;
    let logoPts: Float32Array;

    let currentX: Float32Array;
    let currentY: Float32Array;
    let velocityX: Float32Array;
    let velocityY: Float32Array;
    let particleSizes: Float32Array;

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

      shapeX = new Float32Array(count);
      shapeY = new Float32Array(count);
      currentX = new Float32Array(count);
      currentY = new Float32Array(count);
      velocityX = new Float32Array(count);
      velocityY = new Float32Array(count);
      particleSizes = new Float32Array(count);

      // 1. Calculate actual geometric bounding box of the shape points to find true center
      let minX = Infinity, maxX = -Infinity;
      let minY = Infinity, maxY = -Infinity;

      for (let i = 0; i < count; i++) {
        const [vx, vy] = cloud.targets[i];
        if (vx < minX) minX = vx;
        if (vx > maxX) maxX = vx;
        if (vy < minY) minY = vy;
        if (vy > maxY) maxY = vy;
      }

      const shapeWidth = Math.max(100, maxX - minX);
      const shapeHeight = Math.max(100, maxY - minY);
      const shapeCenterX = (minX + maxX) * 0.5;
      const shapeCenterY = (minY + maxY) * 0.5;

      // 2. Compute proportional scaling factor to centralize and fill stage prominently
      const targetWidth = isMobile ? width * 0.86 : width * 0.82;
      const targetHeight = isMobile ? height * 0.78 : height * 0.82;
      const scale = Math.min(targetWidth / shapeWidth, targetHeight / shapeHeight);

      for (let i = 0; i < count; i++) {
        const [vx, vy] = cloud.targets[i];
        // Perfectly center custom shape at (0, 0)
        shapeX[i] = (vx - shapeCenterX) * scale;
        shapeY[i] = (vy - shapeCenterY) * scale;

        // Size matching WebGL point sizing (1.8px to 3.2px radius, with glowing core falloff)
        const baseSize = cloud.sizes[i] || 1.0;
        particleSizes[i] = (1.8 + baseSize * 0.75) * (isMobile ? 0.9 : 1.05);
      }

      // 3. Generate 3D Ribbon and YEIB Logo target arrays
      ribbonPts = generateRibbonCloud(count, width, height, rnd);
      logoPts = generateLogoCloud(count, width, height, rnd);

      // 4. Initialize positions with intro scatter around the stage center (cx, cy)
      const cx = width * 0.5;
      const cy = height * 0.5;

      for (let i = 0; i < count; i++) {
        const tx = cx + shapeX[i];
        const ty = cy + shapeY[i];

        const delay = cloud.delays[i];
        currentX[i] = tx + (Math.sin(i * 1.7) * 80 + (1 - delay) * 40);
        currentY[i] = ty + (Math.cos(i * 2.3) * 60 + (1 - delay) * 50);
      }

      startTime = performance.now();
    };

    initCloud();

    // Event listeners for pointer push
    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0, clientY = 0;
      if ("touches" in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ("clientX" in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      const rect = canvas.getBoundingClientRect();
      pointer.x = clientX - rect.left;
      pointer.y = clientY - rect.top;
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

    // Smooth cubic easing
    const ease = (t: number) => {
      const c = Math.max(0, Math.min(1, t));
      return c * c * (3 - 2 * c);
    };

    const spriteList = sprites
      ? [sprites.emerald, sprites.mint, sprites.orange, sprites.starlight]
      : [];

    const render = (time: number) => {
      if (!isRunning || !cloud || !ribbonPts || !logoPts) return;

      lastFrame = time;
      const elapsed = (time - startTime) / 1000;
      const introProgress = Math.min(1.0, elapsed / 1.4); // 1.4s smooth intro assembly

      // --- Morphing Cycle: Shape (4.0s) -> Ribbon (1.8s) -> Logo (1.8s) -> Hold Logo (3.0s) -> Ribbon (1.6s) -> Return (1.8s) ---
      const totalCycle = 14.0;
      const cycleTime = prefersReducedMotion ? 0 : elapsed % totalCycle;
      let morphPhase = 0.0; // 0.0: Custom Shape, 0.5: Ribbon, 1.0: YEIB Logo

      const t1 = 4.0;  // hold custom shape
      const t2 = 5.8;  // morph to ribbon
      const t3 = 7.6;  // morph to logo
      const t4 = 10.6; // hold logo
      const t5 = 12.2; // morph back to ribbon

      if (cycleTime < t1) {
        morphPhase = 0.0;
      } else if (cycleTime < t2) {
        const t = (cycleTime - t1) / (t2 - t1);
        morphPhase = t * 0.5;
      } else if (cycleTime < t3) {
        const t = (cycleTime - t2) / (t3 - t2);
        morphPhase = 0.5 + t * 0.5;
      } else if (cycleTime < t4) {
        morphPhase = 1.0;
      } else if (cycleTime < t5) {
        const t = (cycleTime - t4) / (t5 - t4);
        morphPhase = 1.0 - t * 0.5;
      } else {
        const t = (cycleTime - t5) / (totalCycle - t5);
        morphPhase = 0.5 - t * 0.5;
      }

      ctx.clearRect(0, 0, width, height);
      // Direct additive light emission identical to WebGL gl.blendFunc(gl.ONE, gl.ONE)
      ctx.globalCompositeOperation = "lighter";

      const ptrX = pointer.x;
      const ptrY = pointer.y;
      const ptrRadius = isMobile ? 85 : 140;
      const ptrForce = 38;

      const cx = width * 0.5;
      const cy = height * 0.5;

      for (let i = 0; i < count; i++) {
        const delay = cloud.delays[i];
        const pAssembly = Math.max(0, Math.min(1, (introProgress - delay * 0.35) / 0.65));
        const easeAssembly = pAssembly * pAssembly * (3 - 2 * pAssembly);

        // Particle morph calculation with local delay
        const localDelay = delay * 0.22;
        const phase = Math.max(0, Math.min(1, (morphPhase - localDelay) / (1.0 - 0.22)));

        let targetRelX = 0;
        let targetRelY = 0;

        if (phase < 0.5) {
          const t = ease(phase * 2.0);
          targetRelX = shapeX[i] * (1 - t) + ribbonPts[i * 3] * t;
          targetRelY = shapeY[i] * (1 - t) + ribbonPts[i * 3 + 1] * t;
        } else {
          const t = ease((phase - 0.5) * 2.0);
          targetRelX = ribbonPts[i * 3] * (1 - t) + logoPts[i * 3] * t;
          targetRelY = ribbonPts[i * 3 + 1] * (1 - t) + logoPts[i * 3 + 1] * t;
        }

        // Continuous subtle ambient drift
        const pPhase = cloud.phases[i];
        const driftX = prefersReducedMotion ? 0 : Math.sin(time * 0.0015 + pPhase) * 1.8;
        const driftY = prefersReducedMotion ? 0 : Math.cos(time * 0.0012 + pPhase) * 2.2;

        const baseTx = cx + targetRelX + driftX;
        const baseTy = cy + targetRelY + driftY;

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
        let alpha = (0.55 + cloud.alphas[i] * 0.45) * easeAssembly;

        // Twinkle calculation
        if (!prefersReducedMotion) {
          const twinkle = 0.85 + 0.15 * Math.sin(time * 0.003 + pPhase * 2);
          alpha *= twinkle;
        }

        if (alpha <= 0.01) continue;

        ctx.globalAlpha = Math.min(1.0, alpha);

        const colorIdx = cloud.colors[i];
        const sprite = spriteList[colorIdx] || spriteList[0];
        const pRadius = particleSizes[i];
        const diameter = pRadius * 2.8;

        const px = currentX[i];
        const py = currentY[i];

        if (sprite) {
          ctx.drawImage(sprite, px - diameter * 0.5, py - diameter * 0.5, diameter, diameter);
        } else {
          ctx.fillStyle = "rgb(0, 190, 147)";
          ctx.beginPath();
          ctx.arc(px, py, pRadius, 0, Math.PI * 2);
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
