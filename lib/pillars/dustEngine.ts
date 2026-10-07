/**
 * High-Performance Native WebGL Particle Engine for Block 1 Dust Canvases
 * Features:
 * - Singleton Geometry Cloud Cache
 * - Native GPU Shaders (100% GPU computation)
 * - Dual-palette Emerald Green & Tiger Orange particle composition
 * - Complete WebGL context lifecycle & disposal
 * - Viewport culling & low power draw
 */

import { VS_DUST_SOURCE, FS_DUST_SOURCE } from "./shaders";

export type DustShape = "capital" | "growth" | "ecosystem";

export interface DustCloudData {
  count: number;
  targetPos: Float32Array; // [x0, y0, x1, y1, ...] in [0, 1] normalized
  startPos: Float32Array;  // [x0, y0, x1, y1, ...] in [0, 1] normalized
  size: Float32Array;      // Particle sizes
  alpha: Float32Array;     // Particle alphas
  speed: Float32Array;     // Wave speeds
  phase: Float32Array;     // Phase offsets
  drift: Float32Array;     // Drift amplitudes
  colorType: Float32Array; // 0.0 = Emerald Green, 1.0 = Tiger Orange
}

// Deterministic PRNG
function createPRNG(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Singleton Geometry Cloud Cache
 * Generates and stores normalized point clouds once in memory
 */
class DustGeometryCache {
  private static instance: DustGeometryCache;
  private cache = new Map<string, DustCloudData>();

  private constructor() {}

  public static getInstance(): DustGeometryCache {
    if (!DustGeometryCache.instance) {
      DustGeometryCache.instance = new DustGeometryCache();
    }
    return DustGeometryCache.instance;
  }

  public getGeometry(shape: DustShape, count: number = 2400, seed: number = 42): DustCloudData {
    const key = `${shape}_${count}_${seed}`;
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }

    const rng = createPRNG(seed);
    const targetPos = new Float32Array(count * 2);
    const startPos = new Float32Array(count * 2);
    const size = new Float32Array(count);
    const alpha = new Float32Array(count);
    const speed = new Float32Array(count);
    const phase = new Float32Array(count);
    const drift = new Float32Array(count);
    const colorType = new Float32Array(count);

    if (shape === "capital") {
      const layers = 5;
      const centerX = 0.5;

      for (let i = 0; i < count; i++) {
        const layerIdx = Math.floor(rng() * layers);
        const layerCenterY = 0.18 + (layerIdx / (layers + 0.8)) * 0.68;
        const radiusX = 0.38 * (0.65 + 0.35 * (layerIdx / layers));
        const radiusY = 0.09;

        const angle = rng() * Math.PI * 2;
        const r = Math.sqrt(rng());
        const tx = centerX + Math.cos(angle) * radiusX * r + (rng() - 0.5) * 0.02;
        const ty = layerCenterY + Math.sin(angle) * radiusY * r + (rng() - 0.5) * 0.03;

        const sAngle = rng() * Math.PI * 2;
        const sDist = 0.15 + rng() * 0.25;

        targetPos[i * 2] = tx;
        targetPos[i * 2 + 1] = ty;
        startPos[i * 2] = tx + Math.cos(sAngle) * sDist;
        startPos[i * 2 + 1] = ty + Math.sin(sAngle) * sDist;

        size[i] = 1.4 + rng() * 0.8;
        alpha[i] = 0.45 + rng() * 0.45;
        speed[i] = 0.8 + rng() * 0.8;
        phase[i] = rng() * Math.PI * 2;
        drift[i] = 0.8 + rng() * 1.5;

        // ~28% Tiger Orange, 72% Emerald Green
        colorType[i] = rng() < 0.28 ? 1.0 : 0.0;
      }
    } else if (shape === "growth") {
      for (let i = 0; i < count; i++) {
        const t = rng();
        const tx = t;
        const baselineY = 0.85 - Math.pow(t, 1.8) * 0.70;
        const spread = (0.05 + t * 0.16) * (rng() - 0.5) * (rng() - 0.5) * 4;
        const ty = Math.max(0.06, Math.min(0.94, baselineY + spread));

        targetPos[i * 2] = tx;
        targetPos[i * 2 + 1] = ty;
        startPos[i * 2] = tx + (rng() - 0.5) * 0.08;
        startPos[i * 2 + 1] = ty + 0.2 + rng() * 0.2;

        size[i] = 1.4 + rng() * 0.8;
        alpha[i] = 0.45 + rng() * 0.45;
        speed[i] = 0.8 + rng() * 0.8;
        phase[i] = rng() * Math.PI * 2;
        drift[i] = 0.8 + rng() * 1.5;

        // Orange density higher along the rising crest
        colorType[i] = rng() < (0.2 + t * 0.22) ? 1.0 : 0.0;
      }
    } else if (shape === "ecosystem") {
      const nodeCount = 8;
      const nodes: { x: number; y: number }[] = [];

      for (let n = 0; n < nodeCount; n++) {
        nodes.push({
          x: 0.12 + (n / (nodeCount - 1)) * 0.76 + (rng() - 0.5) * 0.08,
          y: 0.25 + rng() * 0.5,
        });
      }

      const edges: [number, number][] = [];
      for (let a = 0; a < nodeCount; a++) {
        for (let b = a + 1; b < nodeCount; b++) {
          if (Math.abs(a - b) <= 2 || rng() < 0.25) {
            edges.push([a, b]);
          }
        }
      }

      const nodePoints = Math.floor(count * 0.6);
      const edgePoints = count - nodePoints;

      for (let i = 0; i < nodePoints; i++) {
        const nodeIdx = Math.floor(rng() * nodeCount);
        const node = nodes[nodeIdx];
        const angle = rng() * Math.PI * 2;
        const r = Math.pow(rng(), 1.5) * 0.08;
        const tx = node.x + Math.cos(angle) * r;
        const ty = node.y + Math.sin(angle) * r;

        targetPos[i * 2] = tx;
        targetPos[i * 2 + 1] = ty;
        startPos[i * 2] = node.x + Math.cos(angle) * (r + 0.12 + rng() * 0.1);
        startPos[i * 2 + 1] = node.y + Math.sin(angle) * (r + 0.12 + rng() * 0.1);

        size[i] = 1.4 + rng() * 0.8;
        alpha[i] = 0.48 + rng() * 0.45;
        speed[i] = 0.8 + rng() * 0.8;
        phase[i] = rng() * Math.PI * 2;
        drift[i] = 0.8 + rng() * 1.5;

        // Orange accents on focal nodes
        colorType[i] = (nodeIdx % 3 === 0 || rng() < 0.25) ? 1.0 : 0.0;
      }

      for (let i = nodePoints; i < count; i++) {
        if (edges.length === 0) break;
        const edge = edges[Math.floor(rng() * edges.length)];
        const n1 = nodes[edge[0]];
        const n2 = nodes[edge[1]];

        const progress = rng();
        const lineX = n1.x + (n2.x - n1.x) * progress;
        const lineY = n1.y + (n2.y - n1.y) * progress;

        const tx = lineX + (rng() - 0.5) * 0.02;
        const ty = lineY + (rng() - 0.5) * 0.04;

        targetPos[i * 2] = tx;
        targetPos[i * 2 + 1] = ty;
        startPos[i * 2] = tx + (rng() - 0.5) * 0.08;
        startPos[i * 2 + 1] = ty + (rng() - 0.5) * 0.15;

        size[i] = 1.4 + rng() * 0.8;
        alpha[i] = 0.45 + rng() * 0.45;
        speed[i] = 0.8 + rng() * 0.8;
        phase[i] = rng() * Math.PI * 2;
        drift[i] = 0.8 + rng() * 1.5;

        colorType[i] = rng() < 0.2 ? 1.0 : 0.0;
      }
    }

    const data: DustCloudData = {
      count,
      targetPos,
      startPos,
      size,
      alpha,
      speed,
      phase,
      drift,
      colorType,
    };

    this.cache.set(key, data);
    return data;
  }
}

export interface DustEngineOptions {
  canvas: HTMLCanvasElement;
  container: HTMLElement;
  shape: DustShape;
  seed?: number;
}

export class DustEngine {
  private canvas: HTMLCanvasElement;
  private container: HTMLElement;
  private shape: DustShape;
  private seed: number;

  private gl: WebGLRenderingContext | null = null;
  private program: WebGLProgram | null = null;
  private vboTargetPos: WebGLBuffer | null = null;
  private vboStartPos: WebGLBuffer | null = null;
  private vboSize: WebGLBuffer | null = null;
  private vboAlpha: WebGLBuffer | null = null;
  private vboSpeed: WebGLBuffer | null = null;
  private vboPhase: WebGLBuffer | null = null;
  private vboDrift: WebGLBuffer | null = null;
  private vboColorType: WebGLBuffer | null = null;

  private uniforms: Record<string, WebGLUniformLocation | null> = {};
  private cloudData: DustCloudData | null = null;

  private animId: number | null = null;
  private isDestroyed = false;
  private isVisible = true;
  private startTime = performance.now();
  private entranceProgress = 0.0;
  private isEntranceActive = true;

  private pointer = {
    x: -9999,
    y: -9999,
    targetX: -9999,
    targetY: -9999,
    active: false,
  };

  private intersectionObserver: IntersectionObserver | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private boundVisibilityChange: () => void;

  constructor(options: DustEngineOptions) {
    this.canvas = options.canvas;
    this.container = options.container;
    this.shape = options.shape;
    this.seed = options.seed || 42;

    this.boundVisibilityChange = this.onVisibilityChange.bind(this);

    this.init();
  }

  private init() {
    const gl =
      this.canvas.getContext("webgl", {
        alpha: true,
        antialias: true,
        premultipliedAlpha: false,
        powerPreference: "low-power",
      }) ||
      (this.canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) {
      return false;
    }

    this.gl = gl;

    // Compile Shaders & Program
    const vs = this.compileShader(gl.VERTEX_SHADER, VS_DUST_SOURCE);
    const fs = this.compileShader(gl.FRAGMENT_SHADER, FS_DUST_SOURCE);
    if (!vs || !fs) return false;

    const prog = gl.createProgram();
    if (!prog) return false;

    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      return false;
    }

    this.program = prog;

    // Cache Uniform Locations
    const uniformNames = [
      "uResolution",
      "uDpr",
      "uTime",
      "uEntrance",
      "uPointer",
      "uPointerActive",
      "uPointerRadius",
      "uPointerForce",
    ];
    for (const name of uniformNames) {
      this.uniforms[name] = gl.getUniformLocation(prog, name);
    }

    // Get Data from Singleton Geometry Cache
    const isMobile = window.innerWidth < 768;
    const pointCount = isMobile ? 1400 : 2400;
    this.cloudData = DustGeometryCache.getInstance().getGeometry(
      this.shape,
      pointCount,
      this.seed
    );

    // Create & Upload GPU Buffers
    this.vboTargetPos = this.createBuffer(this.cloudData.targetPos);
    this.vboStartPos = this.createBuffer(this.cloudData.startPos);
    this.vboSize = this.createBuffer(this.cloudData.size);
    this.vboAlpha = this.createBuffer(this.cloudData.alpha);
    this.vboSpeed = this.createBuffer(this.cloudData.speed);
    this.vboPhase = this.createBuffer(this.cloudData.phase);
    this.vboDrift = this.createBuffer(this.cloudData.drift);
    this.vboColorType = this.createBuffer(this.cloudData.colorType);

    // WebGL Blend States
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    this.resize();

    // IntersectionObserver
    this.intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        this.isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    this.intersectionObserver.observe(this.canvas);

    this.resizeObserver = new ResizeObserver(() => {
      this.resize();
    });
    this.resizeObserver.observe(this.container);

    document.addEventListener("visibilitychange", this.boundVisibilityChange);

    this.render(performance.now());
    return true;
  }

  private compileShader(type: number, src: string): WebGLShader | null {
    const gl = this.gl!;
    const s = gl.createShader(type);
    if (!s) return null;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(s));
      gl.deleteShader(s);
      return null;
    }
    return s;
  }

  private createBuffer(data: Float32Array): WebGLBuffer | null {
    const gl = this.gl!;
    const buf = gl.createBuffer();
    if (!buf) return null;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    return buf;
  }

  private bindAttribute(buf: WebGLBuffer | null, attrName: string, size: number) {
    const gl = this.gl!;
    const loc = gl.getAttribLocation(this.program!, attrName);
    if (loc < 0 || !buf) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
  }

  public setPointer(x: number, y: number, active: boolean) {
    this.pointer.targetX = x;
    this.pointer.targetY = y;
    this.pointer.active = active;
    if (!active) {
      this.pointer.x = -9999;
      this.pointer.y = -9999;
    } else if (this.pointer.x < -5000) {
      this.pointer.x = x;
      this.pointer.y = y;
    }
  }

  public triggerEntrance() {
    this.isEntranceActive = true;
  }

  private onVisibilityChange() {
    if (document.hidden) {
      this.isVisible = false;
    }
  }

  public resize() {
    if (!this.gl || !this.container) return;
    const rect = this.container.getBoundingClientRect();
    const w = rect.width || 600;
    const h = 190;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.canvas.width = Math.floor(w * dpr);
    this.canvas.height = Math.floor(h * dpr);
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;

    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  private render = (currentTime: number) => {
    if (this.isDestroyed) return;

    if (this.isVisible && this.gl && this.program && this.cloudData) {
      const gl = this.gl;
      gl.useProgram(this.program);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = this.canvas.width / dpr;
      const h = this.canvas.height / dpr;

      // Progress entrance
      if (this.isEntranceActive && this.entranceProgress < 1.0) {
        this.entranceProgress = Math.min(1.0, this.entranceProgress + 0.025);
      }

      // Smooth pointer interpolation
      if (this.pointer.active && this.pointer.x > -5000) {
        this.pointer.x += (this.pointer.targetX - this.pointer.x) * 0.18;
        this.pointer.y += (this.pointer.targetY - this.pointer.y) * 0.18;
      }

      const elapsed = (currentTime - this.startTime) * 0.001;

      // Set Uniforms (Gentle radius ~36px and soft force ~0.5)
      gl.uniform2f(this.uniforms.uResolution, w, h);
      gl.uniform1f(this.uniforms.uDpr, dpr);
      gl.uniform1f(this.uniforms.uTime, elapsed);
      gl.uniform1f(this.uniforms.uEntrance, this.entranceProgress);
      gl.uniform2f(this.uniforms.uPointer, this.pointer.x, this.pointer.y);
      gl.uniform1f(this.uniforms.uPointerActive, this.pointer.active ? 1.0 : 0.0);
      gl.uniform1f(this.uniforms.uPointerRadius, 36.0);
      gl.uniform1f(this.uniforms.uPointerForce, 0.5);

      // Bind Buffers
      this.bindAttribute(this.vboTargetPos, "aTargetPos", 2);
      this.bindAttribute(this.vboStartPos, "aStartPos", 2);
      this.bindAttribute(this.vboSize, "aSize", 1);
      this.bindAttribute(this.vboAlpha, "aAlpha", 1);
      this.bindAttribute(this.vboSpeed, "aSpeed", 1);
      this.bindAttribute(this.vboPhase, "aPhase", 1);
      this.bindAttribute(this.vboDrift, "aDrift", 1);
      this.bindAttribute(this.vboColorType, "aColorType", 1);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Single Hardware Draw Call
      gl.drawArrays(gl.POINTS, 0, this.cloudData.count);
    }

    this.animId = requestAnimationFrame(this.render);
  };

  /**
   * Complete WebGL Context Disposal
   */
  public destroy() {
    this.isDestroyed = true;
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }

    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

    document.removeEventListener("visibilitychange", this.boundVisibilityChange);

    const gl = this.gl;
    if (gl) {
      if (this.vboTargetPos) gl.deleteBuffer(this.vboTargetPos);
      if (this.vboStartPos) gl.deleteBuffer(this.vboStartPos);
      if (this.vboSize) gl.deleteBuffer(this.vboSize);
      if (this.vboAlpha) gl.deleteBuffer(this.vboAlpha);
      if (this.vboSpeed) gl.deleteBuffer(this.vboSpeed);
      if (this.vboPhase) gl.deleteBuffer(this.vboPhase);
      if (this.vboDrift) gl.deleteBuffer(this.vboDrift);
      if (this.vboColorType) gl.deleteBuffer(this.vboColorType);

      if (this.program) {
        gl.deleteProgram(this.program);
      }

      // Explicitly lose context to release GPU memory
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      this.gl = null;
    }
  }
}
