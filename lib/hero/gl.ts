/**
 * WebGL Particle Engine & Render Controller
 * High-performance, zero-allocation runtime with geometry caching
 */

import { HERO_CONFIG, createPRNG } from "./config";
import { VS_MAIN_SOURCE, FS_MAIN_SOURCE, VS_DUST_SOURCE, FS_DUST_SOURCE } from "./shaders";
import { getCachedHeroClouds } from "./targets";

export interface HeroEngineOptions {
  canvas: HTMLCanvasElement;
  container: HTMLElement;
  onStageChange?: (stage: string) => void;
  onReady?: () => void;
  seed?: number;
}

export class HeroEngine {
  private canvas: HTMLCanvasElement;
  private container: HTMLElement;
  private onStageChange?: (stage: string) => void;
  private onReady?: (isFallback?: boolean) => void;
  private seed?: number;
  private rnd: () => number;

  private gl: WebGLRenderingContext | null = null;
  private ctx2D: CanvasRenderingContext2D | null = null;
  private isFallback = false;

  private W = 1440;
  private H = 900;
  private dpr = 1;
  private currentTier = "";

  private numParticles: number = HERO_CONFIG.particles.desktop;
  private numBgDust: number = HERO_CONFIG.particles.starDust;

  private startTime = performance.now();
  private animId: number | null = null;
  private isPaused = false;
  private isDestroyed = false;

  private frameCount = 0;
  private lastFpsCheck = performance.now();

  private pointer = {
    x: -9999,
    y: -9999,
    targetX: -9999,
    targetY: -9999,
    down: 0.0,
    force: 0.0,
    active: false,
    lastTime: 0,
  };

  // WebGL Resources
  private program: WebGLProgram | null = null;
  private dustProgram: WebGLProgram | null = null;
  private posBridgeBuffer: WebGLBuffer | null = null;
  private partIdBuffer: WebGLBuffer | null = null;
  private posRibbonBuffer: WebGLBuffer | null = null;
  private posLogoBuffer: WebGLBuffer | null = null;
  private delayBuffer: WebGLBuffer | null = null;
  private pSizeBuffer: WebGLBuffer | null = null;
  private dustBuffer: WebGLBuffer | null = null;

  // Text Bounding Boxes for WebGL Readability Safety Fade
  private boxLeft = new Float32Array([-99999, -99999, -99999, -99999]);
  private boxRight = new Float32Array([-99999, -99999, -99999, -99999]);
  private textPad = 0.0;

  // Event Listeners references
  private boundPointerMove: (e: MouseEvent | TouchEvent) => void;
  private boundPointerDown: () => void;
  private boundPointerUp: () => void;
  private boundPointerClear: () => void;
  private resizeObserver: ResizeObserver | null = null;
  private intersectionObserver: IntersectionObserver | null = null;
  private boundVisibilityChange: () => void;
  private resizeTimeout: NodeJS.Timeout | null = null;

  constructor(options: HeroEngineOptions) {
    this.canvas = options.canvas;
    this.container = options.container;
    this.onStageChange = options.onStageChange;
    this.onReady = options.onReady;
    this.seed = options.seed;
    this.rnd = this.seed !== undefined ? createPRNG(this.seed) : Math.random;

    this.boundPointerMove = this.onPointerMove.bind(this);
    this.boundPointerDown = () => { this.pointer.down = 1.0; };
    this.boundPointerUp = () => { this.pointer.down = 0.0; };
    this.boundPointerClear = this.clearPointer.bind(this);
    this.boundVisibilityChange = this.onVisibilityChange.bind(this);

    this.init();
  }

  private init() {
    this.gl = (this.canvas.getContext("webgl", { alpha: true, antialias: false, depth: false }) ||
      this.canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;

    if (!this.gl) {
      this.isFallback = true;
      this.ctx2D = this.canvas.getContext("2d");
    }

    this.numParticles = window.innerWidth < 768
      ? HERO_CONFIG.particles.phone
      : HERO_CONFIG.particles.desktop;

    if (this.isFallback) {
      this.numParticles = HERO_CONFIG.particles.fallback2D;
    }

    this.setupListeners();
    this.resize(true); // Initial setup

    // Start loop
    this.render();
    if (this.onReady) this.onReady(this.isFallback);
  }

  public restart() {
    this.startTime = performance.now();
  }

  private setupListeners() {
    window.addEventListener("mousemove", this.boundPointerMove, { passive: true });
    window.addEventListener("touchmove", this.boundPointerMove, { passive: true });
    window.addEventListener("mousedown", this.boundPointerDown);
    window.addEventListener("mouseup", this.boundPointerUp);
    window.addEventListener("touchstart", this.boundPointerDown, { passive: true });
    window.addEventListener("touchend", this.boundPointerClear);
    window.addEventListener("mouseleave", this.boundPointerClear);
    window.addEventListener("blur", this.boundPointerClear);
    document.addEventListener("visibilitychange", this.boundVisibilityChange);

    this.resizeObserver = new ResizeObserver(() => {
      if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.resize();
      }, 50);
    });
    this.resizeObserver.observe(this.container);

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.isPaused = !entry.isIntersecting;
          if (!this.isPaused) this.render();
        });
      },
      { threshold: 0.05 }
    );
    this.intersectionObserver.observe(this.container);
  }

  private onVisibilityChange() {
    this.isPaused = document.hidden;
    if (!this.isPaused) {
      this.lastFpsCheck = performance.now();
      this.render();
    }
  }

  private onPointerMove(e: MouseEvent | TouchEvent) {
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

    const rect = this.canvas.getBoundingClientRect();
    this.pointer.targetX = (clientX - rect.left) - this.W * 0.5;
    this.pointer.targetY = (clientY - rect.top) - this.H * 0.5;
    this.pointer.active = true;
    this.pointer.lastTime = performance.now();
  }

  private clearPointer() {
    this.pointer.targetX = -9999;
    this.pointer.targetY = -9999;
    this.pointer.active = false;
    this.pointer.down = 0.0;
  }

  private updateTextBoxes() {
    if (this.W <= 900) {
      this.boxLeft.set([-99999, -99999, -99999, -99999]);
      this.boxRight.set([-99999, -99999, -99999, -99999]);
      this.textPad = 0.0;
      return;
    }
    this.textPad = this.W * 0.02; // 2vw
    const elLeft = document.querySelector(".hero-col-left");
    const elRight = document.querySelector(".hero-col-right");
    const cRect = this.canvas.getBoundingClientRect();

    if (elLeft) {
      const r = elLeft.getBoundingClientRect();
      const minX = (r.left - cRect.left) - this.W * 0.5;
      const minY = (r.top - cRect.top) - this.H * 0.5;
      const maxX = (r.right - cRect.left) - this.W * 0.5;
      const maxY = (r.bottom - cRect.top) - this.H * 0.5;
      this.boxLeft.set([minX, minY, maxX, maxY]);
    }
    if (elRight) {
      const r = elRight.getBoundingClientRect();
      const minX = (r.left - cRect.left) - this.W * 0.5;
      const minY = (r.top - cRect.top) - this.H * 0.5;
      const maxX = (r.right - cRect.left) - this.W * 0.5;
      const maxY = (r.bottom - cRect.top) - this.H * 0.5;
      this.boxRight.set([minX, minY, maxX, maxY]);
    }
  }

  private currentStage = "";

  private resize(force = false) {
    if (!this.canvas || !this.container) return;
    const rect = this.container.getBoundingClientRect();
    const newW = Math.round(rect.width || window.innerWidth);
    const newH = Math.round(rect.height || window.innerHeight);
    const newDpr = Math.min(window.devicePixelRatio || 1, 2);

    const isPhone = newW < 500;
    const isTablet = newW >= 500 && newW < 900;
    const newTier = isPhone ? "phone" : isTablet ? "tablet" : "desktop";

    if (!force && Math.abs(newW - this.W) < 4 && Math.abs(newH - this.H) < 4 && Math.abs(newDpr - this.dpr) < 0.01) {
      this.updateTextBoxes();
      return;
    }

    const tierChanged = newTier !== this.currentTier;
    this.W = newW;
    this.H = newH;
    this.dpr = newDpr;
    this.currentTier = newTier;

    this.canvas.width = Math.round(this.W * this.dpr);
    this.canvas.height = Math.round(this.H * this.dpr);

    this.updateTextBoxes();

    if (this.gl) {
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      if (force || tierChanged || !this.posBridgeBuffer) {
        this.setupWebGL();
      }
    }
  }

  private createShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
    const s = gl.createShader(type);
    if (!s) return null;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      gl.deleteShader(s);
      return null;
    }
    return s;
  }

  private createProgram(gl: WebGLRenderingContext, vs: string, fs: string): WebGLProgram | null {
    const p = gl.createProgram();
    const vShader = this.createShader(gl, gl.VERTEX_SHADER, vs);
    const fShader = this.createShader(gl, gl.FRAGMENT_SHADER, fs);
    if (!p || !vShader || !fShader) return null;
    gl.attachShader(p, vShader);
    gl.attachShader(p, fShader);
    gl.linkProgram(p);
    return p;
  }

  private setupWebGL() {
    const gl = this.gl;
    if (!gl) return;

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE); // Direct additive blending

    if (!this.program) this.program = this.createProgram(gl, VS_MAIN_SOURCE, FS_MAIN_SOURCE);
    if (!this.dustProgram) this.dustProgram = this.createProgram(gl, VS_DUST_SOURCE, FS_DUST_SOURCE);

    // Fetch or Generate Cached Target Geometries (0ms on cache hit)
    const clouds = getCachedHeroClouds(this.numParticles, this.numBgDust, this.W, this.H, this.rnd);

    // Buffers setup
    if (!this.posBridgeBuffer) this.posBridgeBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.posBridgeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, clouds.bridge.pts, gl.STATIC_DRAW);

    if (!this.partIdBuffer) this.partIdBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.partIdBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, clouds.bridge.partIds, gl.STATIC_DRAW);

    if (!this.posRibbonBuffer) this.posRibbonBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.posRibbonBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, clouds.ribbon, gl.STATIC_DRAW);

    if (!this.posLogoBuffer) this.posLogoBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.posLogoBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, clouds.logo, gl.STATIC_DRAW);

    if (!this.delayBuffer) this.delayBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.delayBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, clouds.delays, gl.STATIC_DRAW);

    if (!this.pSizeBuffer) this.pSizeBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.pSizeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, clouds.sizes, gl.STATIC_DRAW);

    if (!this.dustBuffer) this.dustBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.dustBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, clouds.dust, gl.STATIC_DRAW);
  }

  private getOrthoProjection(width: number, height: number): Float32Array {
    const left = -width / 2;
    const right = width / 2;
    const bottom = height / 2;
    const top = -height / 2;
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
  }

  private render = () => {
    if (this.isDestroyed) return;
    if (this.isPaused) return;

    const now = performance.now();
    const time = (now - this.startTime) * 0.001;

    // Measure FPS & Auto-Throttle
    this.frameCount++;
    if (now - this.lastFpsCheck >= 1000) {
      const fps = (this.frameCount * 1000) / (now - this.lastFpsCheck);
      if (fps < HERO_CONFIG.particles.fpsThrottleThreshold && this.numParticles > HERO_CONFIG.particles.minThrottleParticles) {
        this.numParticles = Math.round(this.numParticles * HERO_CONFIG.particles.fpsThrottleRatio);
        this.setupWebGL();
      }
      this.frameCount = 0;
      this.lastFpsCheck = now;
    }

    // Pointer lerp
    this.pointer.x += (this.pointer.targetX - this.pointer.x) * HERO_CONFIG.pointer.lerpSpeed;
    this.pointer.y += (this.pointer.targetY - this.pointer.y) * HERO_CONFIG.pointer.lerpSpeed;
    const pointerActive = (now - this.pointer.lastTime < 3000 && this.pointer.targetX > -5000);
    const targetForce = pointerActive ? (this.pointer.down > 0 ? HERO_CONFIG.pointer.forceClick : HERO_CONFIG.pointer.forceNormal) : 0.0;
    this.pointer.force += (targetForce - this.pointer.force) * HERO_CONFIG.pointer.forceDecay;
    if (this.pointer.force < 0.001) this.pointer.force = 0.0;

    // Morph Stage Timing
    const { holdBridge, morphToRibbon, morphToLogo, holdLogo, morphBackRibbon, morphBackBridge } = HERO_CONFIG.timing;
    const totalCycle = holdBridge + morphToRibbon + morphToLogo + holdLogo + morphBackRibbon + morphBackBridge;
    const cycleTime = time % totalCycle;
    let morphPhase = 0.0;

    const t1 = holdBridge;
    const t2 = t1 + morphToRibbon;
    const t3 = t2 + morphToLogo;
    const t4 = t3 + holdLogo;
    const t5 = t4 + morphBackRibbon;

    let stageName = "Bridge";
    if (cycleTime < t1) {
      morphPhase = 0.0;
      stageName = "Bridge";
    } else if (cycleTime < t2) {
      const t = (cycleTime - t1) / morphToRibbon;
      morphPhase = t * 0.5;
      stageName = "Swirling Ribbon";
    } else if (cycleTime < t3) {
      const t = (cycleTime - t2) / morphToLogo;
      morphPhase = 0.5 + t * 0.5;
      stageName = "Assembling Logo";
    } else if (cycleTime < t4) {
      morphPhase = 1.0;
      stageName = "Official Logo";
    } else if (cycleTime < t5) {
      const t = (cycleTime - t4) / morphBackRibbon;
      morphPhase = 1.0 - t * 0.5;
      stageName = "Swirling Ribbon";
    } else {
      const t = (cycleTime - t5) / morphBackBridge;
      morphPhase = 0.5 - t * 0.5;
      stageName = "Returning to Bridge";
    }

    if (this.currentStage !== stageName) {
      this.currentStage = stageName;
      const stageLabel = document.getElementById("stageLabel");
      if (stageLabel) stageLabel.textContent = stageName;
      if (this.onStageChange) {
        this.onStageChange(stageName);
      }
    }

    const gl = this.gl;
    if (gl && this.program && this.dustProgram) {
      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      const proj = this.getOrthoProjection(this.W, this.H);

      // 1. Dust
      gl.useProgram(this.dustProgram);
      gl.uniformMatrix4fv(gl.getUniformLocation(this.dustProgram, "uProjection"), false, proj);
      gl.uniform1f(gl.getUniformLocation(this.dustProgram, "uTime"), time);
      gl.uniform1f(gl.getUniformLocation(this.dustProgram, "uDpr"), this.dpr);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.dustBuffer);
      const aDustPos = gl.getAttribLocation(this.dustProgram, "aPos");
      const aDustPhase = gl.getAttribLocation(this.dustProgram, "aPhase");
      gl.enableVertexAttribArray(aDustPos);
      gl.enableVertexAttribArray(aDustPhase);
      gl.vertexAttribPointer(aDustPos, 3, gl.FLOAT, false, 16, 0);
      gl.vertexAttribPointer(aDustPhase, 1, gl.FLOAT, false, 16, 12);

      gl.drawArrays(gl.POINTS, 0, this.numBgDust);
      gl.disableVertexAttribArray(aDustPos);
      gl.disableVertexAttribArray(aDustPhase);

      // 2. Main Particle Cloud
      gl.useProgram(this.program);
      gl.uniformMatrix4fv(gl.getUniformLocation(this.program, "uProjection"), false, proj);
      gl.uniform1f(gl.getUniformLocation(this.program, "uTime"), time);
      gl.uniform1f(gl.getUniformLocation(this.program, "uMorphPhase"), morphPhase);

      const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gl.uniform1f(gl.getUniformLocation(this.program, "uMotionEnabled"), prefersReduced ? 0.0 : 1.0);

      gl.uniform2f(gl.getUniformLocation(this.program, "uPointer"), this.pointer.x, this.pointer.y);
      gl.uniform1f(gl.getUniformLocation(this.program, "uPointerRadius"), this.pointer.down > 0 ? HERO_CONFIG.pointer.radiusClick : HERO_CONFIG.pointer.radiusNormal);
      gl.uniform1f(gl.getUniformLocation(this.program, "uPointerForce"), this.pointer.force);
      gl.uniform2f(gl.getUniformLocation(this.program, "uResolution"), this.W, this.H);
      gl.uniform1f(gl.getUniformLocation(this.program, "uDpr"), this.dpr);

      gl.uniform4fv(gl.getUniformLocation(this.program, "uBoxLeft"), this.boxLeft);
      gl.uniform4fv(gl.getUniformLocation(this.program, "uBoxRight"), this.boxRight);
      gl.uniform1f(gl.getUniformLocation(this.program, "uPad"), this.textPad);

      const locBridge = gl.getAttribLocation(this.program, "aPosBridge");
      const locPartId = gl.getAttribLocation(this.program, "aPartId");
      const locRibbon = gl.getAttribLocation(this.program, "aPosRibbon");
      const locLogo = gl.getAttribLocation(this.program, "aPosLogo");
      const locDelay = gl.getAttribLocation(this.program, "aDelay");
      const locSize = gl.getAttribLocation(this.program, "aSize");

      gl.enableVertexAttribArray(locBridge);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.posBridgeBuffer);
      gl.vertexAttribPointer(locBridge, 3, gl.FLOAT, false, 0, 0);

      gl.enableVertexAttribArray(locPartId);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.partIdBuffer);
      gl.vertexAttribPointer(locPartId, 1, gl.FLOAT, false, 0, 0);

      gl.enableVertexAttribArray(locRibbon);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.posRibbonBuffer);
      gl.vertexAttribPointer(locRibbon, 3, gl.FLOAT, false, 0, 0);

      gl.enableVertexAttribArray(locLogo);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.posLogoBuffer);
      gl.vertexAttribPointer(locLogo, 3, gl.FLOAT, false, 0, 0);

      gl.enableVertexAttribArray(locDelay);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.delayBuffer);
      gl.vertexAttribPointer(locDelay, 1, gl.FLOAT, false, 0, 0);

      gl.enableVertexAttribArray(locSize);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.pSizeBuffer);
      gl.vertexAttribPointer(locSize, 1, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.POINTS, 0, this.numParticles);

      gl.disableVertexAttribArray(locBridge);
      gl.disableVertexAttribArray(locPartId);
      gl.disableVertexAttribArray(locRibbon);
      gl.disableVertexAttribArray(locLogo);
      gl.disableVertexAttribArray(locDelay);
      gl.disableVertexAttribArray(locSize);
    }

    this.animId = requestAnimationFrame(this.render);
  };

  public destroy() {
    this.isDestroyed = true;
    if (this.animId) cancelAnimationFrame(this.animId);
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);

    window.removeEventListener("mousemove", this.boundPointerMove);
    window.removeEventListener("touchmove", this.boundPointerMove);
    window.removeEventListener("mousedown", this.boundPointerDown);
    window.removeEventListener("mouseup", this.boundPointerUp);
    window.removeEventListener("touchstart", this.boundPointerDown);
    window.removeEventListener("touchend", this.boundPointerClear);
    window.removeEventListener("mouseleave", this.boundPointerClear);
    window.removeEventListener("blur", this.boundPointerClear);
    document.removeEventListener("visibilitychange", this.boundVisibilityChange);

    if (this.resizeObserver) this.resizeObserver.disconnect();
    if (this.intersectionObserver) this.intersectionObserver.disconnect();

    const gl = this.gl;
    if (gl) {
      if (this.posBridgeBuffer) gl.deleteBuffer(this.posBridgeBuffer);
      if (this.partIdBuffer) gl.deleteBuffer(this.partIdBuffer);
      if (this.posRibbonBuffer) gl.deleteBuffer(this.posRibbonBuffer);
      if (this.posLogoBuffer) gl.deleteBuffer(this.posLogoBuffer);
      if (this.delayBuffer) gl.deleteBuffer(this.delayBuffer);
      if (this.pSizeBuffer) gl.deleteBuffer(this.pSizeBuffer);
      if (this.dustBuffer) gl.deleteBuffer(this.dustBuffer);
      if (this.program) gl.deleteProgram(this.program);
      if (this.dustProgram) gl.deleteProgram(this.dustProgram);

      const ext = gl.getExtension("WEBGL_lose_context");
      if (ext) ext.loseContext();
    }
  }
}
