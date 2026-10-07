"use client";

import React, { useEffect, useRef } from "react";
import {
  HERO_SHAPE_REGISTRY,
  ShapeCloudData,
} from "@/lib/hero/heroShapes";
import { generateLogoCloud, generateRibbonCloud } from "@/lib/hero/targets";
import { createPRNG } from "@/lib/hero/config";

const VS_CUSTOM_SOURCE = `
  precision highp float;

  attribute vec3 aPosShape;
  attribute vec3 aPosRibbon;
  attribute vec3 aPosLogo;
  attribute float aDelay;
  attribute float aSize;
  attribute float aColorIdx;

  uniform mat4 uProjection;
  uniform float uTime;
  uniform float uMorphPhase; // 0.0 = shape, 0.5 = ribbon, 1.0 = logo
  uniform float uMotionEnabled;
  uniform vec2 uPointer;
  uniform float uPointerRadius;
  uniform float uPointerForce;
  uniform vec2 uResolution;
  uniform float uDpr;

  varying float vAlpha;
  varying float vDepth;
  varying float vColorIdx;

  float ease(float t) {
    t = clamp(t, 0.0, 1.0);
    return t * t * (3.0 - 2.0 * t);
  }

  void main() {
    float localDelay = aDelay * 0.22;
    float phase = clamp((uMorphPhase - localDelay) / (1.0 - 0.22), 0.0, 1.0);

    vec3 pos;
    if (phase < 0.5) {
      float t = ease(phase * 2.0);
      pos = mix(aPosShape, aPosRibbon, t);
    } else {
      float t = ease((phase - 0.5) * 2.0);
      pos = mix(aPosRibbon, aPosLogo, t);
    }

    // Continuous subtle drift
    if (uMotionEnabled > 0.5) {
      float wave = sin(uTime * 1.3 + pos.x * 0.015 + aDelay * 6.28) * 1.4;
      float waveZ = cos(uTime * 1.1 + pos.y * 0.015) * 2.2;
      pos.y += wave;
      pos.z += waveZ;
    }

    // Interactive pointer repulsion
    vec2 screenPos = pos.xy;
    vec2 diff = screenPos - uPointer;
    float dist = length(diff);
    if (dist < uPointerRadius && dist > 0.001 && uPointerForce > 0.005) {
      float normDist = dist / uPointerRadius;
      float f = smoothstep(1.0, 0.0, normDist) * uPointerForce;
      vec2 push = (diff / dist) * f * 42.0;
      pos.xy += push;
      pos.z += f * 28.0;
    }

    vec4 clip = uProjection * vec4(pos, 1.0);
    gl_Position = clip;

    // Crisp micro-point sizing (identical to Bridge / YEIB logo, no blur)
    float pSize = aSize * uDpr * (480.0 / (480.0 - pos.z));
    gl_PointSize = clamp(pSize, 1.2 * uDpr, 4.0 * uDpr);

    vDepth = (pos.z + 60.0) / 120.0;
    vAlpha = clamp(0.40 + vDepth * 0.55, 0.25, 1.25);
    vColorIdx = aColorIdx;
  }
`;

const FS_CUSTOM_SOURCE = `
  precision highp float;

  varying float vAlpha;
  varying float vDepth;
  varying float vColorIdx;

  void main() {
    // Round point with sharp, crisp falloff - NO BLUR
    vec2 coord = gl_PointCoord - vec2(0.5);
    float distSq = dot(coord, coord);
    if (distSq > 0.25) discard;

    float edge = 1.0 - (distSq * 4.0);
    edge = pow(edge, 0.65);

    // Exact Brand Palette (Direct Additive Light Emission)
    vec3 colDeep = vec3(0.18, 0.78, 0.58);       // Emerald #2eb78c
    vec3 colTeal = vec3(0.28, 0.96, 0.82);       // Luminous Aqua #3ff0c8
    vec3 colMint = vec3(0.92, 1.0, 0.96);        // Mint Photon Core #e0fff5
    vec3 colOrangeDeep = vec3(0.98, 0.52, 0.02); // Tiger Orange #f88404
    vec3 colOrangeCore = vec3(1.0, 0.85, 0.50);  // Warm Amber Core
    vec3 colStarlight = vec3(0.96, 0.98, 1.0);   // Starlight White

    vec3 baseColor = mix(colDeep, colTeal, clamp(vDepth, 0.0, 1.0));
    baseColor = mix(baseColor, colMint, edge * 0.70);

    if (vColorIdx > 1.5 && vColorIdx < 2.5) {
      // Tiger Orange Accent
      baseColor = mix(colOrangeDeep, colOrangeCore, edge * 0.85);
    } else if (vColorIdx > 2.5) {
      // Starlight Accent
      baseColor = mix(colTeal, colStarlight, edge * 0.90);
    }

    // Direct additive emission
    gl_FragColor = vec4(baseColor * (vAlpha * edge), 1.0);
  }
`;

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

    const gl = (canvas.getContext("webgl", { alpha: true, antialias: false, depth: false }) ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;

    if (!gl) return;

    const generator = HERO_SHAPE_REGISTRY[slug] || HERO_SHAPE_REGISTRY["who-we-serve"];
    const rnd = createPRNG(42);

    let animId: number;
    let isRunning = true;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = mediaQuery.matches;
    const onMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener("change", onMotionChange);

    // High density particle counts matching Bridge/YEIB logo feel
    const isMobileViewport = window.innerWidth < 768;
    const count = isMobileViewport ? 22000 : 42000;

    const pointer = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      force: 0,
      active: false,
      lastTime: 0,
    };

    // Compile Shaders
    const createShader = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const createProgram = (vsSrc: string, fsSrc: string) => {
      const vs = createShader(gl.VERTEX_SHADER, vsSrc);
      const fs = createShader(gl.FRAGMENT_SHADER, fsSrc);
      if (!vs || !fs) return null;
      const p = gl.createProgram();
      if (!p) return null;
      gl.attachShader(p, vs);
      gl.attachShader(p, fs);
      gl.linkProgram(p);
      return p;
    };

    const program = createProgram(VS_CUSTOM_SOURCE, FS_CUSTOM_SOURCE);
    if (!program) return;

    // WebGL Buffers
    const posShapeBuffer = gl.createBuffer();
    const posRibbonBuffer = gl.createBuffer();
    const posLogoBuffer = gl.createBuffer();
    const delayBuffer = gl.createBuffer();
    const sizeBuffer = gl.createBuffer();
    const colorIdxBuffer = gl.createBuffer();

    let cloudData: ShapeCloudData | null = null;
    let shapePts = new Float32Array(count * 3);
    let ribbonPts = new Float32Array(count * 3);
    let logoPts = new Float32Array(count * 3);
    let delayArray = new Float32Array(count);
    let sizeArray = new Float32Array(count);
    let colorArray = new Float32Array(count);

    const initBuffers = () => {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      width = Math.round(rect.width || window.innerWidth);
      height = Math.round(rect.height || window.innerHeight);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);

      cloudData = generator(count);

      // Find shape bounding box for exact (0,0) centering
      let minX = Infinity, maxX = -Infinity;
      let minY = Infinity, maxY = -Infinity;
      for (let i = 0; i < count; i++) {
        const [vx, vy] = cloudData.targets[i];
        if (vx < minX) minX = vx;
        if (vx > maxX) maxX = vx;
        if (vy < minY) minY = vy;
        if (vy > maxY) maxY = vy;
      }

      const shapeW = Math.max(100, maxX - minX);
      const shapeH = Math.max(100, maxY - minY);
      const shapeCenterX = (minX + maxX) * 0.5;
      const shapeCenterY = (minY + maxY) * 0.5;

      const isMobile = width < 700;
      const targetW = isMobile ? width * 0.88 : width * 0.82;
      const targetH = isMobile ? height * 0.80 : height * 0.82;
      const scale = Math.min(targetW / shapeW, targetH / shapeH);

      // Shape points (centered at 0, 0 in WebGL orthographic coordinates)
      for (let i = 0; i < count; i++) {
        const [vx, vy] = cloudData.targets[i];
        shapePts[i * 3] = (vx - shapeCenterX) * scale;
        shapePts[i * 3 + 1] = (vy - shapeCenterY) * scale;
        shapePts[i * 3 + 2] = (rnd() - 0.5) * 16.0; // subtle 3D depth

        delayArray[i] = cloudData.delays[i];
        sizeArray[i] = 1.1 + rnd() * 0.8; // Crisp micro sizing (1.1 - 1.9)
        colorArray[i] = cloudData.colors[i];
      }

      // Generate 3D Ribbon and YEIB Logo targets (both centered at 0,0)
      const rawRibbon = generateRibbonCloud(count, width, height, rnd);
      const rawLogo = generateLogoCloud(count, width, height, rnd);
      ribbonPts.set(rawRibbon);
      logoPts.set(rawLogo);

      // Upload to WebGL buffers
      gl.bindBuffer(gl.ARRAY_BUFFER, posShapeBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, shapePts, gl.STATIC_DRAW);

      gl.bindBuffer(gl.ARRAY_BUFFER, posRibbonBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, ribbonPts, gl.STATIC_DRAW);

      gl.bindBuffer(gl.ARRAY_BUFFER, posLogoBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, logoPts, gl.STATIC_DRAW);

      gl.bindBuffer(gl.ARRAY_BUFFER, delayBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, delayArray, gl.STATIC_DRAW);

      gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, sizeArray, gl.STATIC_DRAW);

      gl.bindBuffer(gl.ARRAY_BUFFER, colorIdxBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, colorArray, gl.STATIC_DRAW);
    };

    initBuffers();

    // Orthographic projection matrix centered at (0, 0)
    const getOrthoProjection = (w: number, h: number): Float32Array => {
      const left = -w / 2;
      const right = w / 2;
      const bottom = h / 2;
      const top = -h / 2;
      const near = -500;
      const far = 500;

      const lr = 1 / (right - left);
      const bt = 1 / (top - bottom);
      const nf = 1 / (near - far);

      return new Float32Array([
        2 * lr, 0, 0, 0,
        0, 2 * bt, 0, 0,
        0, 0, 2 * nf, 0,
        -(right + left) * lr, -(top + bottom) * bt, (far + near) * nf, 1
      ]);
    };

    // Event listeners
    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0, clientY = 0;
      if ("touches" in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ("clientX" in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        return;
      }
      const rect = canvas.getBoundingClientRect();
      pointer.targetX = (clientX - rect.left) - width * 0.5;
      pointer.targetY = (clientY - rect.top) - height * 0.5;
      pointer.active = true;
      pointer.lastTime = performance.now();
    };

    const onPointerClear = () => {
      pointer.targetX = -9999;
      pointer.targetY = -9999;
      pointer.active = false;
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("mouseleave", onPointerClear);
    window.addEventListener("touchend", onPointerClear);

    let resizeTimer: NodeJS.Timeout | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initBuffers, 80);
    };
    window.addEventListener("resize", onResize, { passive: true });

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

    let startTime = performance.now();
    let lastFrame = performance.now();

    const render = (time: number) => {
      if (!isRunning) return;

      const elapsed = (time - startTime) * 0.001;

      // Pointer spring lerp
      pointer.x += (pointer.targetX - pointer.x) * 0.12;
      pointer.y += (pointer.targetY - pointer.y) * 0.12;
      const pointerActive = (time - pointer.lastTime < 3000 && pointer.targetX > -5000);
      const targetForce = pointerActive ? 1.4 : 0.0;
      pointer.force += (targetForce - pointer.force) * 0.15;

      // Morphing cycle (14.0s total)
      const totalCycle = 14.0;
      const cycleTime = prefersReducedMotion ? 0 : elapsed % totalCycle;
      let morphPhase = 0.0;

      const t1 = 4.0;  // hold shape
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

      // WebGL Rendering with Direct Additive Blending (gl.ONE, gl.ONE)
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE);
      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      const proj = getOrthoProjection(width, height);
      gl.uniformMatrix4fv(gl.getUniformLocation(program, "uProjection"), false, proj);
      gl.uniform1f(gl.getUniformLocation(program, "uTime"), elapsed);
      gl.uniform1f(gl.getUniformLocation(program, "uMorphPhase"), morphPhase);
      gl.uniform1f(gl.getUniformLocation(program, "uMotionEnabled"), prefersReducedMotion ? 0.0 : 1.0);
      gl.uniform2f(gl.getUniformLocation(program, "uPointer"), pointer.x, pointer.y);
      gl.uniform1f(gl.getUniformLocation(program, "uPointerRadius"), 120.0);
      gl.uniform1f(gl.getUniformLocation(program, "uPointerForce"), pointer.force);
      gl.uniform2f(gl.getUniformLocation(program, "uResolution"), width, height);
      gl.uniform1f(gl.getUniformLocation(program, "uDpr"), dpr);

      // Attribute pointers
      const locShape = gl.getAttribLocation(program, "aPosShape");
      const locRibbon = gl.getAttribLocation(program, "aPosRibbon");
      const locLogo = gl.getAttribLocation(program, "aPosLogo");
      const locDelay = gl.getAttribLocation(program, "aDelay");
      const locSize = gl.getAttribLocation(program, "aSize");
      const locColor = gl.getAttribLocation(program, "aColorIdx");

      gl.enableVertexAttribArray(locShape);
      gl.bindBuffer(gl.ARRAY_BUFFER, posShapeBuffer);
      gl.vertexAttribPointer(locShape, 3, gl.FLOAT, false, 0, 0);

      gl.enableVertexAttribArray(locRibbon);
      gl.bindBuffer(gl.ARRAY_BUFFER, posRibbonBuffer);
      gl.vertexAttribPointer(locRibbon, 3, gl.FLOAT, false, 0, 0);

      gl.enableVertexAttribArray(locLogo);
      gl.bindBuffer(gl.ARRAY_BUFFER, posLogoBuffer);
      gl.vertexAttribPointer(locLogo, 3, gl.FLOAT, false, 0, 0);

      gl.enableVertexAttribArray(locDelay);
      gl.bindBuffer(gl.ARRAY_BUFFER, delayBuffer);
      gl.vertexAttribPointer(locDelay, 1, gl.FLOAT, false, 0, 0);

      gl.enableVertexAttribArray(locSize);
      gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
      gl.vertexAttribPointer(locSize, 1, gl.FLOAT, false, 0, 0);

      gl.enableVertexAttribArray(locColor);
      gl.bindBuffer(gl.ARRAY_BUFFER, colorIdxBuffer);
      gl.vertexAttribPointer(locColor, 1, gl.FLOAT, false, 0, 0);

      // Draw all crisp micro-particles directly
      gl.drawArrays(gl.POINTS, 0, count);

      gl.disableVertexAttribArray(locShape);
      gl.disableVertexAttribArray(locRibbon);
      gl.disableVertexAttribArray(locLogo);
      gl.disableVertexAttribArray(locDelay);
      gl.disableVertexAttribArray(locSize);
      gl.disableVertexAttribArray(locColor);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("mouseleave", onPointerClear);
      window.removeEventListener("touchend", onPointerClear);
      window.removeEventListener("resize", onResize);
      mediaQuery.removeEventListener("change", onMotionChange);
      if (resizeTimer) clearTimeout(resizeTimer);
      observer.disconnect();

      if (posShapeBuffer) gl.deleteBuffer(posShapeBuffer);
      if (posRibbonBuffer) gl.deleteBuffer(posRibbonBuffer);
      if (posLogoBuffer) gl.deleteBuffer(posLogoBuffer);
      if (delayBuffer) gl.deleteBuffer(delayBuffer);
      if (sizeBuffer) gl.deleteBuffer(sizeBuffer);
      if (colorIdxBuffer) gl.deleteBuffer(colorIdxBuffer);
      if (program) gl.deleteProgram(program);
    };
  }, [slug]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-10 ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block touch-none" style={{ pointerEvents: "auto" }} />
    </div>
  );
}
