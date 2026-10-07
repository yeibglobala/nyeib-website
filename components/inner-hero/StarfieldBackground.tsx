"use client";

import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  depth: number; // 0 (distant) to 1 (near) for 3D parallax
  hasSpike?: boolean;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
  life: number;
  maxLife: number;
}

export function StarfieldBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let isRunning = true;

    // Mouse coordinates for gentle 3D parallax
    const mouse = {
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
    };

    // Color palette for cosmic stars
    const STAR_COLORS = [
      "#ffffff", // Crisp diamond white
      "#eef6f2", // Starlight mint white
      "#cde3dc", // Soft nebula green
      "#ffecc8", // Warm stellar gold
      "#a3e5d0", // Vibrant emerald tint
      "#fcd8a5", // Soft amber tint
    ];

    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];

    const createStars = (w: number, h: number) => {
      // Density based on screen area (approx 160-350 stars depending on viewport)
      const count = Math.min(380, Math.max(120, Math.floor((w * h) / 3800)));
      const newStars: Star[] = [];

      for (let i = 0; i < count; i++) {
        const depth = Math.random(); // 0 is far, 1 is close
        const isBright = Math.random() < 0.08; // 8% are bright prominent stars
        const hasSpike = isBright && Math.random() < 0.35; // a few have subtle diffraction spikes

        const size = isBright
          ? 1.4 + Math.random() * 1.2
          : 0.5 + depth * 0.9;

        const baseAlpha = isBright
          ? 0.75 + Math.random() * 0.25
          : 0.2 + depth * 0.55;

        newStars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size,
          baseAlpha,
          twinkleSpeed: 0.8 + Math.random() * 2.2,
          twinklePhase: Math.random() * Math.PI * 2,
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
          depth,
          hasSpike,
        });
      }
      return newStars;
    };

    const spawnShootingStar = () => {
      if (Math.random() > 0.008) return; // Rare periodic spawn
      if (shootingStars.some((s) => s.active)) return; // Max 1 active at a time

      const startX = Math.random() * (width * 0.8) + width * 0.1;
      const startY = Math.random() * (height * 0.4);
      const angle = (Math.PI / 4) + (Math.random() * 0.3 - 0.15); // ~45 deg downward slope

      shootingStars.push({
        x: startX,
        y: startY,
        length: 80 + Math.random() * 70,
        speed: 9 + Math.random() * 6,
        angle,
        alpha: 1.0,
        active: true,
        life: 0,
        maxLife: 40 + Math.random() * 25,
      });
    };

    const resize = () => {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width || window.innerWidth;
      height = rect.height || window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = createStars(width, height);
    };

    resize();

    // Mouse movement listener
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / height - 0.5;
      mouse.targetX = x * 24; // max 24px parallax shift
      mouse.targetY = y * 24;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let resizeTimer: NodeJS.Timeout | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 100);
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Intersection observer to pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isRunning = entry.isIntersecting;
        if (isRunning) {
          lastTime = performance.now();
          render(lastTime);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let lastTime = performance.now();

    const render = (time: number) => {
      if (!isRunning) return;

      const dt = Math.min(0.05, (time - lastTime) / 1000);
      lastTime = time;

      // Smooth mouse interpolation
      mouse.currentX += (mouse.targetX - mouse.currentX) * 0.05;
      mouse.currentY += (mouse.targetY - mouse.currentY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Nebulae / Cosmic Dust Glows
      const grad1 = ctx.createRadialGradient(
        width * 0.75 + mouse.currentX * 0.4,
        height * 0.35 + mouse.currentY * 0.4,
        10,
        width * 0.75 + mouse.currentX * 0.4,
        height * 0.35 + mouse.currentY * 0.4,
        Math.max(width, height) * 0.5
      );
      grad1.addColorStop(0, "rgba(0, 190, 147, 0.12)"); // Emerald glow
      grad1.addColorStop(0.5, "rgba(10, 40, 30, 0.05)");
      grad1.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.25 - mouse.currentX * 0.3,
        height * 0.7 - mouse.currentY * 0.3,
        20,
        width * 0.25 - mouse.currentX * 0.3,
        height * 0.7 - mouse.currentY * 0.3,
        Math.max(width, height) * 0.45
      );
      grad2.addColorStop(0, "rgba(248, 132, 4, 0.07)"); // Warm gold stardust glow
      grad2.addColorStop(0.6, "rgba(11, 25, 20, 0.03)");
      grad2.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Stars with Parallax & Twinkle
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Slow cosmic drift
        star.y -= 0.8 * star.depth * dt;
        if (star.y < -5) star.y = height + 5;

        // Twinkle calculation
        star.twinklePhase += star.twinkleSpeed * dt;
        const twinkle = 0.5 + 0.5 * Math.sin(star.twinklePhase);
        const alpha = Math.max(0.08, Math.min(1.0, star.baseAlpha * (0.4 + 0.6 * twinkle)));

        // Position with 3D depth parallax
        const px = star.x + mouse.currentX * (star.depth * 1.5);
        const py = star.y + mouse.currentY * (star.depth * 1.5);

        ctx.fillStyle = star.color;
        ctx.globalAlpha = alpha;

        // Core star circle
        ctx.beginPath();
        ctx.arc(px, py, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Soft glow halo for brighter stars
        if (star.size > 1.2) {
          ctx.beginPath();
          ctx.arc(px, py, star.size * 2.2, 0, Math.PI * 2);
          ctx.globalAlpha = alpha * 0.25;
          ctx.fill();
        }

        // Diffraction spikes for select prominent stars
        if (star.hasSpike && alpha > 0.5) {
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 0.6;
          ctx.globalAlpha = alpha * 0.45;

          const spikeLen = star.size * 3.5;
          ctx.beginPath();
          ctx.moveTo(px - spikeLen, py);
          ctx.lineTo(px + spikeLen, py);
          ctx.moveTo(px, py - spikeLen);
          ctx.lineTo(px, py + spikeLen);
          ctx.stroke();
        }
      }

      // 3. Periodic Shooting Star
      spawnShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        if (!s.active) continue;

        s.life++;
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;

        const progress = s.life / s.maxLife;
        const currentAlpha = Math.sin(progress * Math.PI) * 0.85;

        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const sGrad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        sGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
        sGrad.addColorStop(0.7, "rgba(0, 190, 147, 0.4)");
        sGrad.addColorStop(1, `rgba(255, 255, 255, ${currentAlpha})`);

        ctx.strokeStyle = sGrad;
        ctx.lineWidth = 1.6;
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        // Head bright spot
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.2, 0, Math.PI * 2);
        ctx.fill();

        if (s.life >= s.maxLife || s.x > width + 100 || s.y > height + 100) {
          shootingStars.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (resizeTimer) clearTimeout(resizeTimer);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
}
