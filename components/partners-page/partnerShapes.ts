/**
 * Partner & Investor Page Specialized Particle Shapes
 * 
 * Shape A: "TWO STRANDS BECOME ONE" (Double Helix merging into single line with end cluster)
 * Shape B: "THREE PILLARS, ONE STRUCTURE" (3 classical architectural pillars supporting an arched structure)
 * 
 * Virtual space: 500 x 400 (aspect 5/4)
 * Deterministic PRNG with seeded random
 */

import { CANVAS_WIDTH, CANVAS_HEIGHT, createPRNG } from "../pillars/particleEngine";

export interface SingleShapeCloudData {
  count: number;
  targets: [number, number][];
  delays: Float32Array;
  phases: Float32Array;
  alphas: Float32Array;
  sizes: Float32Array;
  colors: Uint8Array; // 0, 1, 2 color index
}

// Configurable tweak parameters exposed for fine-tuning
export const SHAPE_TWEAK_CONFIG = {
  shapeA: {
    twistCount: 18, // frequency of sin wave
    strandsShare: 0.70,
    mergedLineShare: 0.08,
    closingClusterShare: 0.10,
    groundShare: 0.06,
    strayShare: 0.06,
    closingClusterRadius: 17,
  },
  shapeB: {
    pillarWidthRatio: 0.10, // 0.10W
    pillarCenters: [0.24, 0.50, 0.76],
    pillarTop: 0.42,
    pillarBottom: 0.80,
    beamBowHeight: 0.07, // 0.07H
    beamThickness: 0.022, // 0.022H
    capitalRadius: 9,
    pillarsShare: 0.42,
    beamShare: 0.32,
    capitalsShare: 0.10,
    groundShare: 0.08,
    risingDustShare: 0.08,
  },
};

// Gaussian helper
function gaussian(rng: () => number): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = rng();
  while (v === 0) v = rng();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

/**
 * Build Shape A: "TWO STRANDS BECOME ONE"
 */
export function buildShapeA(count: number, seed: number = 2026): SingleShapeCloudData {
  const rng = createPRNG(seed);
  const W = CANVAS_WIDTH;
  const H = CANVAS_HEIGHT;

  const targets: [number, number][] = new Array(count);
  const delays = new Float32Array(count);
  const phases = new Float32Array(count);
  const alphas = new Float32Array(count);
  const sizes = new Float32Array(count);
  const colors = new Uint8Array(count);

  const cfg = SHAPE_TWEAK_CONFIG.shapeA;
  const strandsCount = Math.floor(count * cfg.strandsShare);
  const halfStrands = Math.floor(strandsCount / 2);
  const mergedCount = Math.floor(count * cfg.mergedLineShare);
  const clusterCount = Math.floor(count * cfg.closingClusterShare);
  const groundCount = Math.floor(count * cfg.groundShare);
  const strayCount = count - (strandsCount + mergedCount + clusterCount + groundCount);

  let idx = 0;

  // Helper for base curve & amplitude
  const getBase = (u: number) => 0.78 * H - Math.pow(u, 1.25) * 0.56 * H;
  const getAmp = (u: number) => (1.0 - u) * 0.15 * H + 0.012 * H;

  // 1. STRANDS (70% total: 35% Strand 1, 35% Strand 2)
  for (let i = 0; i < strandsCount; i++) {
    const isStrand1 = i < halfStrands;
    const u = rng();
    const x = 0.05 * W + u * 0.90 * W;
    const base = getBase(u);
    const amp = getAmp(u);

    // Denser near crossings (where sin(u * 18) is near 0)
    const sinVal = Math.sin(u * cfg.twistCount);
    const yStrand = isStrand1 ? base + sinVal * amp : base - sinVal * amp;

    // Tight 1.2 to 2.2px jitter
    const jx = (rng() - 0.5) * 2.2;
    const jy = gaussian(rng) * 1.5;

    targets[idx] = [
      Math.max(10, Math.min(W - 10, x + jx)),
      Math.max(10, Math.min(H - 10, yStrand + jy)),
    ];
    alphas[idx] = 0.50 + rng() * 0.48;
    idx++;
  }

  // 2. MERGED LINE (8% for u >= 0.85)
  for (let i = 0; i < mergedCount; i++) {
    const u = 0.85 + rng() * 0.15;
    const x = 0.05 * W + u * 0.90 * W;
    const base = getBase(u);

    const jx = (rng() - 0.5) * 1.8;
    const jy = gaussian(rng) * 1.2;

    targets[idx] = [
      Math.max(10, Math.min(W - 10, x + jx)),
      Math.max(10, Math.min(H - 10, base + jy)),
    ];
    alphas[idx] = 0.65 + rng() * 0.35;
    idx++;
  }

  // 3. CLOSING CLUSTER (10% at 0.95W, 0.22H)
  const clusterCenterX = 0.95 * W;
  const clusterCenterY = 0.22 * H;
  for (let i = 0; i < clusterCount; i++) {
    const angle = rng() * Math.PI * 2;
    const radius = Math.abs(gaussian(rng)) * (cfg.closingClusterRadius * 0.6);
    const cx = clusterCenterX + Math.cos(angle) * radius + (rng() - 0.5) * 2.0;
    const cy = clusterCenterY + Math.sin(angle) * radius + (rng() - 0.5) * 2.0;

    targets[idx] = [
      Math.max(10, Math.min(W - 10, cx)),
      Math.max(10, Math.min(H - 10, cy)),
    ];
    alphas[idx] = 0.55 + rng() * 0.45;
    idx++;
  }

  // 4. GROUND LINE (6% faint dots along y = 0.86H from x = 0.05W to 0.50W)
  for (let i = 0; i < groundCount; i++) {
    const gx = 0.05 * W + rng() * 0.45 * W;
    const gy = 0.86 * H + (rng() - 0.5) * 2.4;

    targets[idx] = [
      Math.max(10, Math.min(W - 10, gx)),
      Math.max(10, Math.min(H - 10, gy)),
    ];
    alphas[idx] = 0.28 + rng() * 0.32; // faint dots
    idx++;
  }

  // 5. STRAY POINTS (6% rising above strands like seeds)
  for (let i = 0; i < strayCount; i++) {
    const u = 0.15 + rng() * 0.75;
    const sx = 0.05 * W + u * 0.90 * W + (rng() - 0.5) * 24;
    const base = getBase(u);
    // Above strands
    const sy = base - (0.04 * H + rng() * 0.22 * H);

    targets[idx] = [
      Math.max(10, Math.min(W - 10, sx)),
      Math.max(10, Math.min(H - 10, sy)),
    ];
    alphas[idx] = 0.30 + rng() * 0.40;
    idx++;
  }

  // Fill particle properties (color distribution, sizes, delays)
  for (let i = 0; i < count; i++) {
    delays[i] = rng() * 250;
    phases[i] = rng() * Math.PI * 2;
    sizes[i] = 1.35 + rng() * 0.65;
    const colorRoll = rng();
    colors[i] = colorRoll < 0.60 ? 0 : colorRoll < 0.85 ? 1 : 2;
  }

  return { count, targets, delays, phases, alphas, sizes, colors };
}

/**
 * Build Shape B: "THREE PILLARS, ONE STRUCTURE"
 */
export function buildShapeB(count: number, seed: number = 7777): SingleShapeCloudData {
  const rng = createPRNG(seed);
  const W = CANVAS_WIDTH;
  const H = CANVAS_HEIGHT;

  const targets: [number, number][] = new Array(count);
  const delays = new Float32Array(count);
  const phases = new Float32Array(count);
  const alphas = new Float32Array(count);
  const sizes = new Float32Array(count);
  const colors = new Uint8Array(count);

  const cfg = SHAPE_TWEAK_CONFIG.shapeB;
  const pillarsCount = Math.floor(count * cfg.pillarsShare);
  const perPillar = Math.floor(pillarsCount / 3);
  const beamCount = Math.floor(count * cfg.beamShare);
  const capitalsCount = Math.floor(count * cfg.capitalsShare);
  const perCapital = Math.floor(capitalsCount / 3);
  const groundCount = Math.floor(count * cfg.groundShare);
  const dustCount = count - (pillarsCount + beamCount + capitalsCount + groundCount);

  let idx = 0;

  // Beam arch height function at x in [0.06W, 0.94W]
  const getBeamY = (xNorm: number) => {
    // xNorm from 0 to 1 across beam
    const bow = Math.sin(xNorm * Math.PI) * (cfg.beamBowHeight * H);
    return cfg.pillarTop * H - bow;
  };

  // 1. THREE PILLARS (42% total: 14% each)
  const pillarHalfW = (cfg.pillarWidthRatio * W) / 2;
  const pillarYTop = cfg.pillarTop * H;
  const pillarYBot = cfg.pillarBottom * H;

  for (let p = 0; p < 3; p++) {
    const cx = cfg.pillarCenters[p] * W;

    for (let i = 0; i < perPillar; i++) {
      const isEdge = rng() < 0.68; // 68% on vertical edges
      let px: number;
      if (isEdge) {
        const isLeft = rng() < 0.5;
        px = isLeft ? cx - pillarHalfW : cx + pillarHalfW;
        px += (rng() - 0.5) * 1.8;
      } else {
        // Lighter fill inside
        px = cx + (rng() - 0.5) * (pillarHalfW * 1.8);
      }

      const py = pillarYTop + rng() * (pillarYBot - pillarYTop) + (rng() - 0.5) * 1.5;

      targets[idx] = [
        Math.max(10, Math.min(W - 10, px)),
        Math.max(10, Math.min(H - 10, py)),
      ];
      alphas[idx] = isEdge ? 0.65 + rng() * 0.35 : 0.35 + rng() * 0.35;
      idx++;
    }
  }

  // 2. BEAM ON TOP (32% from 0.06W to 0.94W with upward bow and dense edges)
  const beamLeft = 0.06 * W;
  const beamRight = 0.94 * W;
  const beamW = beamRight - beamLeft;
  const beamThick = cfg.beamThickness * H;

  for (let i = 0; i < beamCount; i++) {
    const u = rng(); // 0 to 1
    const bx = beamLeft + u * beamW + (rng() - 0.5) * 1.8;
    const centerBeamY = getBeamY(u);

    const isTopOrBottomEdge = rng() < 0.72;
    let by: number;
    if (isTopOrBottomEdge) {
      const isTop = rng() < 0.5;
      by = isTop ? centerBeamY - beamThick / 2 : centerBeamY + beamThick / 2;
      by += (rng() - 0.5) * 1.5;
    } else {
      by = centerBeamY + (rng() - 0.5) * beamThick;
    }

    targets[idx] = [
      Math.max(10, Math.min(W - 10, bx)),
      Math.max(10, Math.min(H - 10, by)),
    ];
    alphas[idx] = isTopOrBottomEdge ? 0.68 + rng() * 0.32 : 0.40 + rng() * 0.35;
    idx++;
  }

  // 3. CAPITALS (10% dense clusters at top of each pillar)
  for (let p = 0; p < 3; p++) {
    const cx = cfg.pillarCenters[p] * W;
    const u = (cx - beamLeft) / beamW;
    const cy = getBeamY(u);

    for (let i = 0; i < perCapital; i++) {
      const angle = rng() * Math.PI * 2;
      const radius = Math.abs(gaussian(rng)) * (cfg.capitalRadius * 0.65);
      const kx = cx + Math.cos(angle) * (radius * 1.4) + (rng() - 0.5) * 1.6;
      const ky = cy + Math.sin(angle) * radius + (rng() - 0.5) * 1.6;

      targets[idx] = [
        Math.max(10, Math.min(W - 10, kx)),
        Math.max(10, Math.min(H - 10, ky)),
      ];
      alphas[idx] = 0.70 + rng() * 0.30;
      idx++;
    }
  }

  // 4. GROUND LINE (8% dots along y = 0.80H from x = 0.06W to 0.94W)
  for (let i = 0; i < groundCount; i++) {
    const gx = beamLeft + rng() * beamW + (rng() - 0.5) * 1.5;
    const gy = pillarYBot + (rng() - 0.5) * 2.2;

    targets[idx] = [
      Math.max(10, Math.min(W - 10, gx)),
      Math.max(10, Math.min(H - 10, gy)),
    ];
    alphas[idx] = 0.55 + rng() * 0.40;
    idx++;
  }

  // 5. RISING DUST (8% drifting upward from ground between pillars)
  for (let i = 0; i < dustCount; i++) {
    // Pick space between pillars (between 0.24 & 0.50, or 0.50 & 0.76)
    const span = rng() < 0.5 ? [0.30, 0.44] : [0.56, 0.70];
    const dx = (span[0] + rng() * (span[1] - span[0])) * W + (rng() - 0.5) * 4;
    const dy = pillarYBot - (0.02 * H + Math.pow(rng(), 1.6) * 0.32 * H);

    targets[idx] = [
      Math.max(10, Math.min(W - 10, dx)),
      Math.max(10, Math.min(H - 10, dy)),
    ];
    alphas[idx] = 0.25 + rng() * 0.35;
    idx++;
  }

  // Fill particle properties
  for (let i = 0; i < count; i++) {
    delays[i] = rng() * 250;
    phases[i] = rng() * Math.PI * 2;
    sizes[i] = 1.35 + rng() * 0.65;
    const colorRoll = rng();
    colors[i] = colorRoll < 0.60 ? 0 : colorRoll < 0.85 ? 1 : 2;
  }

  return { count, targets, delays, phases, alphas, sizes, colors };
}

// Singleton cache for Single Shape clouds
const shapeCache = new Map<string, SingleShapeCloudData>();

export function getSingleShapeCloud(shape: "shapeA" | "shapeB", count: number = 7200): SingleShapeCloudData {
  const key = `${shape}_${count}`;
  if (shapeCache.has(key)) {
    return shapeCache.get(key)!;
  }
  const cloud = shape === "shapeA" ? buildShapeA(count) : buildShapeB(count);
  shapeCache.set(key, cloud);
  return cloud;
}
