/**
 * Hero Custom Particle Shape Generators
 * 
 * Five specialized shapes for Nigeria YEIB Inner Page Heroes:
 * 1. Who We Serve: "ONE STREAM, THREE PATHWAYS" (generateWhoWeServeCloud)
 * 2. Impact & Measurement: "TERRACES OF GROWTH" (generateImpactCloud)
 * 3. Partners & Investors: "THREE COLUMNS, ONE STRUCTURE" (generatePartnersHeroCloud)
 * 4. ESG & Sustainability: "TREE WITH ROOTS THAT ARE PATHWAYS" (generateEsgTreeCloud)
 * 5. Apply for Funding: "THE PATH TO THE OPEN DOOR" (generateApplyPathCloud)
 * 
 * Virtual Space: 1000 x 700
 * Color Map: 0 = Emerald (#00BE93), 1 = Mint (#2EB78C), 2 = Tiger Orange (#F88404), 3 = Starlight (#E1C9B3)
 */

export interface ShapeCloudData {
  count: number;
  targets: [number, number][];
  delays: Float32Array;
  phases: Float32Array;
  alphas: Float32Array;
  sizes: Float32Array;
  colors: Uint8Array;
}

// PRNG: Mulberry32 for deterministic generation
export function createMulberry32(seed: number): () => number {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Gaussian random generator
export function gaussian(rng: () => number): number {
  let u = 0, v = 0;
  while (u === 0) u = rng();
  while (v === 0) v = rng();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// Cubic Bezier evaluation
export function cubicBezier(
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  p3: [number, number],
  t: number
): [number, number] {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  const t2 = t * t;
  const t3 = t2 * t;
  return [
    mt3 * p0[0] + 3 * mt2 * t * p1[0] + 3 * mt * t2 * p2[0] + t3 * p3[0],
    mt3 * p0[1] + 3 * mt2 * t * p1[1] + 3 * mt * t2 * p2[1] + t3 * p3[1],
  ];
}

// Quadratic Bezier evaluation
export function quadBezier(
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  t: number
): [number, number] {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const t2 = t * t;
  return [
    mt2 * p0[0] + 2 * mt * t * p1[0] + t2 * p2[0],
    mt2 * p0[1] + 2 * mt * t * p1[1] + t2 * p2[1],
  ];
}

// ---------------------------------------------------------------------------
// SHAPE 1: WHO WE SERVE — "ONE STREAM, THREE PATHWAYS"
// ---------------------------------------------------------------------------
export function generateWhoWeServeCloud(
  count: number,
  rng: () => number = createMulberry32(101)
): ShapeCloudData {
  const targets: [number, number][] = new Array(count);
  const delays = new Float32Array(count);
  const phases = new Float32Array(count);
  const alphas = new Float32Array(count);
  const sizes = new Float32Array(count);
  const colors = new Uint8Array(count);

  let idx = 0;

  // 1. Trunk: 20% of points (from (60, 560) to (430, 380))
  const trunkCount = Math.floor(count * 0.20);
  const p0: [number, number] = [60, 560];
  const p1: [number, number] = [180, 520];
  const p2: [number, number] = [300, 420];
  const p3: [number, number] = [430, 380];

  for (let i = 0; i < trunkCount && idx < count; i++, idx++) {
    const t = rng();
    const pos = cubicBezier(p0, p1, p2, p3, t);
    const width = (90 - 30 * t);
    const striation = Math.sin(t * 40 + rng() * 0.5);
    const offset = gaussian(rng) * (width * 0.28) + striation * (width * 0.15);
    
    // Normal vector perpendicular to curve
    const nx = -0.4, ny = 0.9;
    targets[idx] = [pos[0] + nx * offset + gaussian(rng) * 1.5, pos[1] + ny * offset + gaussian(rng) * 1.5];
    delays[idx] = t * 0.35;
    phases[idx] = rng() * Math.PI * 2;
    alphas[idx] = 0.45 + rng() * 0.5;
    sizes[idx] = 0.9 + rng() * 1.3;
    colors[idx] = rng() < 0.65 ? 0 : 1; // Emerald / Mint
  }

  // 2. Three Branches: 51% total (17% each)
  const branchCount = Math.floor(count * 0.17);
  const branches = [
    { p0: [430, 380], p1: [600, 320], p2: [780, 200], p3: [960, 110], color: 1 }, // A: Rises
    { p0: [430, 380], p1: [620, 375], p2: [810, 372], p3: [985, 370], color: 0 }, // B: Straight
    { p0: [430, 380], p1: [580, 440], p2: [760, 540], p3: [940, 640], color: 2 }, // C: Descends (orange accent)
  ];

  branches.forEach((b, bIdx) => {
    for (let i = 0; i < branchCount && idx < count; i++, idx++) {
      const t = rng();
      const pos = cubicBezier(b.p0 as any, b.p1 as any, b.p2 as any, b.p3 as any, t);
      const width = 60 * (1 - t * 0.85);
      const offset = gaussian(rng) * (width * 0.32);
      
      const angle = bIdx === 0 ? -0.5 : bIdx === 1 ? 0.0 : 0.5;
      const nx = -Math.sin(angle);
      const ny = Math.cos(angle);

      targets[idx] = [pos[0] + nx * offset + gaussian(rng) * 1.5, pos[1] + ny * offset + gaussian(rng) * 1.5];
      delays[idx] = 0.35 + t * 0.45;
      phases[idx] = rng() * Math.PI * 2;
      alphas[idx] = 0.5 + rng() * 0.45;
      sizes[idx] = 0.8 + (1 - t * 0.3) * 1.2;

      if (bIdx === 2) {
        colors[idx] = rng() < 0.28 ? 2 : rng() < 0.6 ? 0 : 1; // Orange accent on branch C
      } else if (bIdx === 0) {
        colors[idx] = rng() < 0.2 ? 3 : 1; // Pale mint / starlight on branch A
      } else {
        colors[idx] = rng() < 0.7 ? 0 : 1;
      }
    }
  });

  // 3. Connecting Threads: 6% of points
  const threadsCount = Math.floor(count * 0.06);
  for (let i = 0; i < threadsCount && idx < count; i++, idx++) {
    const pair = rng() < 0.5 ? 0 : 1;
    const t = rng();
    const b1 = branches[pair];
    const b2 = branches[pair + 1];
    const pos1 = cubicBezier(b1.p0 as any, b1.p1 as any, b1.p2 as any, b1.p3 as any, t);
    const pos2 = cubicBezier(b2.p0 as any, b2.p1 as any, b2.p2 as any, b2.p3 as any, t);
    
    const u = rng();
    const cx = pos1[0] * (1 - u) + pos2[0] * u + gaussian(rng) * 4;
    const cy = pos1[1] * (1 - u) + pos2[1] * u + Math.sin(u * Math.PI) * 12;

    targets[idx] = [cx, cy];
    delays[idx] = 0.5 + t * 0.3;
    phases[idx] = rng() * Math.PI * 2;
    alphas[idx] = 0.25;
    sizes[idx] = 0.8 + rng() * 0.5;
    colors[idx] = 1; // Mint
  }

  // 4. End Clusters: 9% total (3% per branch end)
  const clusterCount = Math.floor(count * 0.03);
  const endPoints: [number, number, number][] = [
    [960, 110, 3], // A: Starlight / Mint
    [985, 370, 0], // B: Emerald
    [940, 640, 2], // C: Orange
  ];

  endPoints.forEach(([ex, ey, c]) => {
    for (let i = 0; i < clusterCount && idx < count; i++, idx++) {
      const r = Math.abs(gaussian(rng)) * 22;
      const angle = rng() * Math.PI * 2;
      targets[idx] = [ex + Math.cos(angle) * r, ey + Math.sin(angle) * r];
      delays[idx] = 0.8 + rng() * 0.2;
      phases[idx] = rng() * Math.PI * 2;
      alphas[idx] = 0.75 + rng() * 0.25;
      sizes[idx] = 1.1 + rng() * 1.3;
      colors[idx] = c;
    }
  });

  // 5. Dust: Remaining points (~14%)
  while (idx < count) {
    const t = rng();
    const bx = 60 + t * 900 + gaussian(rng) * 45;
    const by = 200 + t * 350 + gaussian(rng) * 90;
    targets[idx] = [Math.max(10, Math.min(990, bx)), Math.max(10, Math.min(690, by))];
    delays[idx] = rng();
    phases[idx] = rng() * Math.PI * 2;
    alphas[idx] = 0.2;
    sizes[idx] = 0.8 + rng() * 0.7;
    colors[idx] = rng() < 0.7 ? 1 : 0;
    idx++;
  }

  return { count, targets, delays, phases, alphas, sizes, colors };
}

// ---------------------------------------------------------------------------
// SHAPE 2: IMPACT & MEASUREMENT — "TERRACES OF GROWTH"
// ---------------------------------------------------------------------------
export function generateImpactCloud(
  count: number,
  rng: () => number = createMulberry32(202)
): ShapeCloudData {
  const targets: [number, number][] = new Array(count);
  const delays = new Float32Array(count);
  const phases = new Float32Array(count);
  const alphas = new Float32Array(count);
  const sizes = new Float32Array(count);
  const colors = new Uint8Array(count);

  let idx = 0;

  // 5 Tiers: Tier i (0 bottom to 4 top)
  const tierCenters = [600, 505, 410, 315, 220]; // 600 - i*95
  const wallHeight = 90;

  // 1. Rims: 30% of points (6% per tier)
  const rimCountPerTier = Math.floor((count * 0.30) / 5);
  for (let i = 0; i < 5; i++) {
    const cy = tierCenters[i];
    const rx = 300 * (1 - 0.17 * i);
    const ry = rx * 0.27;
    const delayBase = (4 - i) * 0.18;

    for (let j = 0; j < rimCountPerTier && idx < count; j++, idx++) {
      const angle = rng() * Math.PI * 2;
      const rOffset = gaussian(rng) * 1.8;
      const px = 700 + Math.cos(angle) * (rx + rOffset);
      const py = cy + Math.sin(angle) * (ry + rOffset * 0.27);

      targets[idx] = [px, py];
      delays[idx] = delayBase + rng() * 0.08;
      phases[idx] = rng() * Math.PI * 2;
      alphas[idx] = 0.65 + (i / 4) * 0.35; // Brighter for higher tiers
      sizes[idx] = 1.0 + (i / 4) * 0.8;
      colors[idx] = i === 4 && rng() < 0.4 ? 2 : rng() < 0.65 ? 0 : 1;
    }
  }

  // 2. Walls: 34% of points (front half of each tier wall)
  const wallCountPerTier = Math.floor((count * 0.34) / 5);
  for (let i = 0; i < 5; i++) {
    const cy = tierCenters[i];
    const rx = 300 * (1 - 0.17 * i);
    const ry = rx * 0.27;
    const delayBase = (4 - i) * 0.18;

    for (let j = 0; j < wallCountPerTier && idx < count; j++, idx++) {
      // Front arc: angle 0 to π
      const angle = rng() * Math.PI;
      const hFrac = Math.abs(gaussian(rng)) * 0.5; // Gaussian dispersion down wall
      const hDisp = Math.min(wallHeight, hFrac * wallHeight);
      const px = 700 + Math.cos(angle) * rx + gaussian(rng) * 1.6;
      const py = cy + Math.sin(angle) * ry + hDisp;

      targets[idx] = [px, py];
      delays[idx] = delayBase + (hDisp / wallHeight) * 0.12;
      phases[idx] = rng() * Math.PI * 2;
      alphas[idx] = 0.45 + (1 - hDisp / wallHeight) * 0.4;
      sizes[idx] = 0.9 + rng() * 1.1;
      colors[idx] = rng() < 0.7 ? 0 : 1;
    }
  }

  // 3. Tier Tops: 10% (sparse stipple)
  const topCountPerTier = Math.floor((count * 0.10) / 5);
  for (let i = 0; i < 5; i++) {
    const cy = tierCenters[i];
    const rx = 300 * (1 - 0.17 * i);
    const ry = rx * 0.27;

    for (let j = 0; j < topCountPerTier && idx < count; j++, idx++) {
      const r = Math.sqrt(rng());
      const angle = rng() * Math.PI * 2;
      const px = 700 + Math.cos(angle) * rx * r + gaussian(rng) * 2;
      const py = cy + Math.sin(angle) * ry * r + gaussian(rng) * 1.5;

      targets[idx] = [px, py];
      delays[idx] = (4 - i) * 0.18 + rng() * 0.1;
      phases[idx] = rng() * Math.PI * 2;
      alphas[idx] = 0.35 + rng() * 0.3;
      sizes[idx] = 0.8 + rng() * 0.8;
      colors[idx] = rng() < 0.8 ? 1 : 3;
    }
  }

  // 4. Contour Lines on walls: 6%
  const contourCount = Math.floor(count * 0.06);
  for (let i = 0; i < contourCount && idx < count; i++, idx++) {
    const tier = Math.floor(rng() * 4);
    const cy = tierCenters[tier] + wallHeight * 0.5;
    const rx = 300 * (1 - 0.17 * tier) * 1.02;
    const ry = rx * 0.27;
    const angle = rng() * Math.PI;

    targets[idx] = [700 + Math.cos(angle) * rx, cy + Math.sin(angle) * ry];
    delays[idx] = (4 - tier) * 0.18;
    phases[idx] = rng() * Math.PI * 2;
    alphas[idx] = 0.3;
    sizes[idx] = 0.85;
    colors[idx] = 3; // Starlight measurement ticks
  }

  // 5. Top Glow and Ripples: 8% (dense core cluster + 4 concentric ellipses, 60% orange)
  const topGlowCount = Math.floor(count * 0.08);
  const topCy = tierCenters[4];
  for (let i = 0; i < topGlowCount && idx < count; i++, idx++) {
    const ring = Math.floor(rng() * 4);
    const rScale = (ring + 1) * 10;
    const angle = rng() * Math.PI * 2;
    const px = 700 + Math.cos(angle) * rScale + gaussian(rng) * 3;
    const py = topCy + Math.sin(angle) * (rScale * 0.27) + gaussian(rng) * 2;

    targets[idx] = [px, py];
    delays[idx] = 0.85 + rng() * 0.15;
    phases[idx] = rng() * Math.PI * 2;
    alphas[idx] = 0.75 + rng() * 0.25;
    sizes[idx] = 1.2 + rng() * 1.2;
    colors[idx] = rng() < 0.60 ? 2 : 3; // Orange + Starlight (<5% orange overall)
  }

  // 6. Sparks: 6% (rising above top)
  const sparkCount = Math.floor(count * 0.06);
  for (let i = 0; i < sparkCount && idx < count; i++, idx++) {
    const sx = 700 + gaussian(rng) * 45;
    const sy = topCy - Math.abs(gaussian(rng)) * 90 - 10;
    targets[idx] = [sx, Math.max(10, sy)];
    delays[idx] = 0.9 + rng() * 0.1;
    phases[idx] = rng() * Math.PI * 2;
    alphas[idx] = 0.5 + rng() * 0.45;
    sizes[idx] = 1.0 + rng() * 1.0;
    colors[idx] = rng() < 0.5 ? 2 : 3;
  }

  // 7. Side Mist / Dust: Remaining points (~6%)
  while (idx < count) {
    const mx = 350 + rng() * 300 + gaussian(rng) * 25;
    const my = 520 + rng() * 150 + gaussian(rng) * 20;
    targets[idx] = [mx, Math.min(690, my)];
    delays[idx] = rng() * 0.5;
    phases[idx] = rng() * Math.PI * 2;
    alphas[idx] = 0.2;
    sizes[idx] = 0.8 + rng() * 0.6;
    colors[idx] = 1;
    idx++;
  }

  return { count, targets, delays, phases, alphas, sizes, colors };
}

// ---------------------------------------------------------------------------
// SHAPE 3: PARTNERS & INVESTORS — "THREE COLUMNS, ONE STRUCTURE"
// ---------------------------------------------------------------------------
export function generatePartnersHeroCloud(
  count: number,
  rng: () => number = createMulberry32(303)
): ShapeCloudData {
  const targets: [number, number][] = new Array(count);
  const delays = new Float32Array(count);
  const phases = new Float32Array(count);
  const alphas = new Float32Array(count);
  const sizes = new Float32Array(count);
  const colors = new Uint8Array(count);

  let idx = 0;
  const colCenters = [470, 680, 880];
  const waterY = 560;

  // 1. Three Columns: 45% of points (15% per column)
  const colCount = Math.floor((count * 0.45) / 3);
  colCenters.forEach((cx, colIdx) => {
    for (let i = 0; i < colCount && idx < count; i++, idx++) {
      const part = rng();

      if (part < 0.15) {
        // Base (2 wider layers at y = 530..560)
        const layer = rng() < 0.5 ? 0 : 1;
        const ly = 535 + layer * 18;
        const lw = 90 - layer * 10;
        const px = cx + (rng() - 0.5) * lw;
        targets[idx] = [px + gaussian(rng) * 1.5, ly + gaussian(rng) * 1.5];
        delays[idx] = 0.05 + layer * 0.05;
        alphas[idx] = 0.75;
        sizes[idx] = 1.1 + rng() * 0.8;
        colors[idx] = 0;
      } else if (part < 0.30) {
        // Capital (3 stacked flared layers at y = 330..360)
        const layer = Math.floor(rng() * 3);
        const ly = 330 + layer * 10;
        const lw = 95 - layer * 8;
        const px = cx + (rng() - 0.5) * lw;
        targets[idx] = [px + gaussian(rng) * 1.5, ly + gaussian(rng) * 1.5];
        delays[idx] = 0.45 + layer * 0.05;
        alphas[idx] = 0.85;
        sizes[idx] = 1.2 + rng() * 0.8;
        colors[idx] = colIdx === 1 && layer === 0 ? 3 : 0; // Starlight highlight on center
      } else {
        // Shaft (y = 360..530, fluted with 2 edges & 5 flutes)
        const yFrac = rng();
        const y = 360 + yFrac * 170;
        const width = 70 * (1 - yFrac * 0.1); // Slightly wider at base
        
        let xOffset = 0;
        if (rng() < 0.35) {
          // Edges
          xOffset = (rng() < 0.5 ? -1 : 1) * (width * 0.5);
        } else {
          // 5 Flute lines
          const flute = Math.floor(rng() * 5); // 0..4
          xOffset = ((flute / 4) - 0.5) * width;
        }

        targets[idx] = [cx + xOffset + gaussian(rng) * 1.2, y];
        delays[idx] = 0.1 + yFrac * 0.35;
        phases[idx] = rng() * Math.PI * 2;
        alphas[idx] = 0.55 + rng() * 0.4;
        sizes[idx] = 0.9 + rng() * 1.1;
        colors[idx] = rng() < 0.65 ? 0 : 1;
      }
    }
  });

  // 2. Beam: 25% of points (quad bezier from (300, 330) to (1000, 110))
  const beamCount = Math.floor(count * 0.25);
  const bp0: [number, number] = [300, 330];
  const bp1: [number, number] = [650, 240];
  const bp2: [number, number] = [1000, 110];

  for (let i = 0; i < beamCount && idx < count; i++, idx++) {
    const t = rng();
    const pos = quadBezier(bp0, bp1, bp2, t);
    const isEdge = rng() < 0.45;
    const thickOffset = isEdge
      ? (rng() < 0.5 ? -27 : 27)
      : (rng() - 0.5) * 55;

    // Perpendicular angle
    const nx = -0.3, ny = 0.95;
    targets[idx] = [pos[0] + nx * thickOffset + gaussian(rng) * 1.5, pos[1] + ny * thickOffset + gaussian(rng) * 1.5];
    delays[idx] = 0.55 + t * 0.35; // Left to right
    phases[idx] = rng() * Math.PI * 2;
    alphas[idx] = isEdge ? 0.85 : 0.45 + rng() * 0.35;
    sizes[idx] = 0.9 + rng() * 1.2;
    colors[idx] = rng() < 0.7 ? 0 : 1;
  }

  // 3. Water line: 4% (y = 560 across x = 250..1000)
  const waterCount = Math.floor(count * 0.04);
  for (let i = 0; i < waterCount && idx < count; i++, idx++) {
    const wx = 250 + rng() * 750;
    targets[idx] = [wx, waterY + gaussian(rng) * 1.2];
    delays[idx] = 0.05 + (wx / 1000) * 0.15;
    phases[idx] = rng() * Math.PI * 2;
    alphas[idx] = 0.65;
    sizes[idx] = 1.0 + rng() * 0.8;
    colors[idx] = 3; // Starlight water surface
  }

  // 4. Reflection: 14% (mirror below y = 560 down to 680 with sine ripple)
  const reflCount = Math.floor(count * 0.14);
  colCenters.forEach((cx) => {
    const perCol = Math.floor(reflCount / 3);
    for (let i = 0; i < perCol && idx < count; i++, idx++) {
      const yDist = rng() * 120;
      const ry = waterY + yDist;
      const ripple = Math.sin(yDist * 0.25 + rng() * 0.5) * 12;
      const rx = cx + (rng() - 0.5) * 75 + ripple;

      targets[idx] = [rx, ry];
      delays[idx] = 0.15 + (yDist / 120) * 0.2;
      phases[idx] = rng() * Math.PI * 2;
      alphas[idx] = 0.15 + (1 - yDist / 120) * 0.18; // Fades with distance
      sizes[idx] = 0.85 + rng() * 0.9;
      colors[idx] = 1; // Mint reflection
    }
  });

  // 5. Warm Glow: 3% (soft cluster on top of center capital (680, 330), mostly orange)
  const glowCount = Math.floor(count * 0.03);
  for (let i = 0; i < glowCount && idx < count; i++, idx++) {
    const r = Math.abs(gaussian(rng)) * 14;
    const angle = rng() * Math.PI * 2;
    targets[idx] = [680 + Math.cos(angle) * r, 330 + Math.sin(angle) * r];
    delays[idx] = 0.85 + rng() * 0.15;
    phases[idx] = rng() * Math.PI * 2;
    alphas[idx] = 0.85 + rng() * 0.15;
    sizes[idx] = 1.2 + rng() * 1.2;
    colors[idx] = 2; // Orange accent (<=5% overall)
  }

  // 6. Dust: Remaining (~9%)
  while (idx < count) {
    targets[idx] = [100 + rng() * 880, 50 + rng() * 620];
    delays[idx] = rng();
    phases[idx] = rng() * Math.PI * 2;
    alphas[idx] = 0.2;
    sizes[idx] = 0.8 + rng() * 0.6;
    colors[idx] = 1;
    idx++;
  }

  return { count, targets, delays, phases, alphas, sizes, colors };
}

// ---------------------------------------------------------------------------
// SHAPE 4: ESG & SUSTAINABILITY — "TREE WITH ROOTS THAT ARE PATHWAYS"
// ---------------------------------------------------------------------------
export function generateEsgTreeCloud(
  count: number,
  rng: () => number = createMulberry32(404)
): ShapeCloudData {
  const targets: [number, number][] = new Array(count);
  const delays = new Float32Array(count);
  const phases = new Float32Array(count);
  const alphas = new Float32Array(count);
  const sizes = new Float32Array(count);
  const colors = new Uint8Array(count);

  let idx = 0;
  const groundY = 400;

  // 1. Warm Core at (700, 400): 5% of points (Orange)
  const coreCount = Math.floor(count * 0.05);
  for (let i = 0; i < coreCount && idx < count; i++, idx++) {
    const r = Math.abs(gaussian(rng)) * 20;
    const angle = rng() * Math.PI * 2;
    targets[idx] = [700 + Math.cos(angle) * r, groundY + Math.sin(angle) * (r * 0.8)];
    delays[idx] = 0.35 + rng() * 0.1;
    phases[idx] = rng() * Math.PI * 2;
    alphas[idx] = 0.85 + rng() * 0.15;
    sizes[idx] = 1.2 + rng() * 1.3;
    colors[idx] = 2; // Orange core (5%)
  }

  // 2. Trunk: 8% (from (700, 400) up to y = 260)
  const trunkCount = Math.floor(count * 0.08);
  for (let i = 0; i < trunkCount && idx < count; i++, idx++) {
    const t = rng();
    const y = groundY - t * 140; // 400 down to 260
    const width = 36 - t * 18; // Tapers 36 to 18
    const isEdge = rng() < 0.6;
    const xOff = isEdge
      ? (rng() < 0.5 ? -1 : 1) * (width * 0.5)
      : (rng() - 0.5) * width;

    targets[idx] = [700 + xOff + Math.sin(t * 3) * 6 + gaussian(rng) * 1.2, y];
    delays[idx] = 0.35 + t * 0.15;
    phases[idx] = rng() * Math.PI * 2;
    alphas[idx] = isEdge ? 0.85 : 0.55;
    sizes[idx] = 0.9 + (1 - t * 0.3) * 1.2;
    colors[idx] = rng() < 0.7 ? 0 : 1;
  }

  // Recursive Branch and Root Generator
  interface BranchNode {
    x0: number;
    y0: number;
    angle: number;
    length: number;
    level: number;
    maxLevel: number;
    isRoot: boolean;
  }

  const branchNodes: BranchNode[] = [];
  const leafTips: [number, number][] = [];

  const growRecursive = (node: BranchNode) => {
    branchNodes.push(node);
    if (node.level >= node.maxLevel) {
      const ex = node.x0 + Math.cos(node.angle) * node.length;
      const ey = node.y0 + Math.sin(node.angle) * node.length;
      if (!node.isRoot) leafTips.push([ex, ey]);
      return;
    }

    const ex = node.x0 + Math.cos(node.angle) * node.length;
    const ey = node.y0 + Math.sin(node.angle) * node.length;
    const childLen = node.length * 0.72;
    const splitAngle = (22 + rng() * 10) * (Math.PI / 180);

    growRecursive({
      x0: ex,
      y0: ey,
      angle: node.angle - splitAngle + (rng() - 0.5) * 0.1,
      length: childLen,
      level: node.level + 1,
      maxLevel: node.maxLevel,
      isRoot: node.isRoot,
    });

    growRecursive({
      x0: ex,
      y0: ey,
      angle: node.angle + splitAngle + (rng() - 0.5) * 0.1,
      length: childLen,
      level: node.level + 1,
      maxLevel: node.maxLevel,
      isRoot: node.isRoot,
    });
  };

  // Build Canopy tree (6 levels)
  growRecursive({
    x0: 700,
    y0: 260,
    angle: -Math.PI / 2,
    length: 58,
    level: 1,
    maxLevel: 6,
    isRoot: false,
  });

  // Build Roots (5 levels, spreading wider x: 330..990, y down to 680)
  growRecursive({
    x0: 700,
    y0: 400,
    angle: Math.PI / 2,
    length: 64,
    level: 1,
    maxLevel: 5,
    isRoot: true,
  });

  // 3. Canopy Branches: 18% of points
  const canopyBranches = branchNodes.filter((b) => !b.isRoot);
  const canopyBranchCount = Math.floor(count * 0.18);
  for (let i = 0; i < canopyBranchCount && idx < count; i++, idx++) {
    const node = canopyBranches[Math.floor(rng() * canopyBranches.length)];
    const t = rng();
    const ex = node.x0 + Math.cos(node.angle) * node.length;
    const ey = node.y0 + Math.sin(node.angle) * node.length;
    const px = node.x0 * (1 - t) + ex * t + gaussian(rng) * 1.5;
    const py = node.y0 * (1 - t) + ey * t + gaussian(rng) * 1.5;

    targets[idx] = [px, py];
    delays[idx] = 0.5 + (node.level / 6) * 0.25;
    phases[idx] = rng() * Math.PI * 2;
    alphas[idx] = 0.6 + rng() * 0.35;
    sizes[idx] = Math.max(0.8, 1.6 - node.level * 0.15);
    colors[idx] = rng() < 0.6 ? 0 : 1;
  }

  // 4. Foliage: 35% of points (Gaussian clusters at tips, x: 400..1000, y: 30..330)
  const foliageCount = Math.floor(count * 0.35);
  for (let i = 0; i < foliageCount && idx < count; i++, idx++) {
    const tip = leafTips[Math.floor(rng() * leafTips.length)] || [700, 150];
    const r = Math.abs(gaussian(rng)) * 26;
    const angle = rng() * Math.PI * 2;
    const px = Math.max(400, Math.min(1000, tip[0] + Math.cos(angle) * r));
    const py = Math.max(30, Math.min(330, tip[1] + Math.sin(angle) * (r * 0.75)));

    targets[idx] = [px, py];
    delays[idx] = 0.7 + rng() * 0.25;
    phases[idx] = rng() * Math.PI * 2;
    alphas[idx] = 0.55 + rng() * 0.4;
    sizes[idx] = 1.0 + rng() * 1.2;
    colors[idx] = rng() < 0.05 ? 3 : rng() < 0.55 ? 0 : 1; // 5% starlight, rest emerald/mint
  }

  // 5. Roots: 20% of points (x: 330..990, y: 400..680)
  const rootBranches = branchNodes.filter((b) => b.isRoot);
  const rootCount = Math.floor(count * 0.20);
  for (let i = 0; i < rootCount && idx < count; i++, idx++) {
    const node = rootBranches[Math.floor(rng() * rootBranches.length)];
    const t = rng();
    const ex = node.x0 + Math.cos(node.angle) * node.length;
    const ey = node.y0 + Math.sin(node.angle) * node.length;
    const px = node.x0 * (1 - t) + ex * t + gaussian(rng) * 1.8;
    const py = Math.min(680, node.y0 * (1 - t) + ey * t + gaussian(rng) * 1.5);

    targets[idx] = [px, py];
    delays[idx] = (node.level / 5) * 0.35; // Roots first
    phases[idx] = rng() * Math.PI * 2;
    alphas[idx] = 0.5 + rng() * 0.35;
    sizes[idx] = Math.max(0.8, 1.4 - node.level * 0.12);
    colors[idx] = rng() < 0.75 ? 1 : 0;
  }

  // 6. Seeds / Floating: 8%
  const seedsCount = Math.floor(count * 0.08);
  for (let i = 0; i < seedsCount && idx < count; i++, idx++) {
    targets[idx] = [380 + rng() * 640, 20 + rng() * 320];
    delays[idx] = 0.75 + rng() * 0.25;
    phases[idx] = rng() * Math.PI * 2;
    alphas[idx] = 0.45 + rng() * 0.4;
    sizes[idx] = 0.9 + rng() * 0.8;
    colors[idx] = rng() < 0.2 ? 3 : 1;
  }

  // 7. Dust: Remaining (~4%)
  while (idx < count) {
    targets[idx] = [100 + rng() * 880, 50 + rng() * 620];
    delays[idx] = rng();
    phases[idx] = rng() * Math.PI * 2;
    alphas[idx] = 0.2;
    sizes[idx] = 0.8;
    colors[idx] = 1;
    idx++;
  }

  return { count, targets, delays, phases, alphas, sizes, colors };
}

// ---------------------------------------------------------------------------
// SHAPE 5: APPLY FOR FUNDING — "THE PATH TO THE OPEN DOOR"
// ---------------------------------------------------------------------------
export function generateApplyPathCloud(
  count: number,
  rng: () => number = createMulberry32(505)
): ShapeCloudData {
  const targets: [number, number][] = new Array(count);
  const delays = new Float32Array(count);
  const phases = new Float32Array(count);
  const alphas = new Float32Array(count);
  const sizes = new Float32Array(count);
  const colors = new Uint8Array(count);

  let idx = 0;
  const doorBase: [number, number] = [780, 320];
  const fgStart: [number, number] = [950, 700];

  // 1. Doorway: 12% light (x: 740..820, y: 10..320, 75% orange, 25% starlight)
  const doorLightCount = Math.floor(count * 0.12);
  for (let i = 0; i < doorLightCount && idx < count; i++, idx++) {
    const dx = 740 + rng() * 80;
    const dy = 10 + rng() * 310;
    targets[idx] = [dx + gaussian(rng) * 1.5, dy];
    delays[idx] = 0.85 + rng() * 0.15; // Door light last
    phases[idx] = rng() * Math.PI * 2;
    alphas[idx] = 0.85 + rng() * 0.15;
    sizes[idx] = 1.1 + rng() * 1.3;
    colors[idx] = rng() < 0.75 ? 2 : 3; // 75% orange, 25% starlight (doorway allowed up to 12% orange)
  }

  // 2. Door Frame: 6% of points (mint)
  const frameCount = Math.floor(count * 0.06);
  for (let i = 0; i < frameCount && idx < count; i++, idx++) {
    const side = rng() < 0.45 ? 740 : rng() < 0.9 ? 820 : -1;
    let fx = 0, fy = 0;
    if (side > 0) {
      fx = side;
      fy = 10 + rng() * 310;
    } else {
      fx = 740 + rng() * 80;
      fy = 10;
    }
    targets[idx] = [fx + gaussian(rng) * 1.2, fy + gaussian(rng) * 1.2];
    delays[idx] = 0.75 + rng() * 0.1;
    phases[idx] = rng() * Math.PI * 2;
    alphas[idx] = 0.8;
    sizes[idx] = 1.0 + rng() * 0.8;
    colors[idx] = 1; // Mint
  }

  // 3. Rays Bursting Out: 12% of points
  const raysCount = Math.floor(count * 0.12);
  for (let i = 0; i < raysCount && idx < count; i++, idx++) {
    const angle = -Math.PI * 0.85 + rng() * (Math.PI * 0.7); // Upward & side radiating
    const len = 30 + rng() * 220;
    targets[idx] = [
      doorBase[0] + Math.cos(angle) * len + gaussian(rng) * 2,
      doorBase[1] + Math.sin(angle) * len + gaussian(rng) * 2,
    ];
    delays[idx] = 0.8 + rng() * 0.15;
    phases[idx] = rng() * Math.PI * 2;
    alphas[idx] = Math.max(0.2, 0.75 - (len / 220) * 0.5);
    sizes[idx] = 0.9 + rng() * 0.9;
    colors[idx] = rng() < 0.4 ? 2 : 3;
  }

  // 4. Path Surface (38%) and Path Edges (14%) = 52% total
  const pathTotalCount = Math.floor(count * 0.52);
  const pathP0: [number, number] = fgStart;
  const pathP1: [number, number] = [880, 560];
  const pathP2: [number, number] = [700, 440];
  const pathP3: [number, number] = doorBase;

  for (let i = 0; i < pathTotalCount && idx < count; i++, idx++) {
    const t = rng(); // 0 = fgStart, 1 = doorBase
    const center = cubicBezier(pathP0, pathP1, pathP2, pathP3, t);
    const sineWobble = Math.sin(t * Math.PI * 3) * 18;
    center[0] += sineWobble;

    const width = 300 * (1 - t * 0.9); // Width shrinks 300 to 30
    const isEdge = rng() < 0.27; // 14% on edges vs 38% surface
    const offset = isEdge
      ? (rng() < 0.5 ? -1 : 1) * (width * 0.5)
      : (rng() - 0.5) * width;

    // Perspective size & alpha (closer = larger up to 2.4, sparser)
    const perspective = 1 - t; // 1 at foreground, 0 at door
    const pSize = 0.9 + perspective * 1.5;
    const pAlpha = isEdge ? 0.85 : 0.4 + perspective * 0.4;

    targets[idx] = [center[0] + offset + gaussian(rng) * 2, center[1] + gaussian(rng) * 2];
    delays[idx] = (1 - t) * 0.75; // Foreground along path to door
    phases[idx] = rng() * Math.PI * 2;
    alphas[idx] = pAlpha;
    sizes[idx] = pSize;
    colors[idx] = isEdge ? (rng() < 0.6 ? 0 : 1) : rng() < 0.8 ? 1 : 0;
  }

  // 5. Foreground Bokeh: 8% (larger dimmer dots in lower left/bottom)
  const bokehCount = Math.floor(count * 0.08);
  for (let i = 0; i < bokehCount && idx < count; i++, idx++) {
    targets[idx] = [50 + rng() * 500, 520 + rng() * 180];
    delays[idx] = rng() * 0.3;
    phases[idx] = rng() * Math.PI * 2;
    alphas[idx] = 0.2 + rng() * 0.15;
    sizes[idx] = 2.0 + rng() * 0.4;
    colors[idx] = rng() < 0.5 ? 0 : 1;
  }

  // 6. Dust: Remaining (~10%)
  while (idx < count) {
    targets[idx] = [50 + rng() * 920, 50 + rng() * 620];
    delays[idx] = rng();
    phases[idx] = rng() * Math.PI * 2;
    alphas[idx] = 0.2;
    sizes[idx] = 0.8 + rng() * 0.6;
    colors[idx] = 1;
    idx++;
  }

  return { count, targets, delays, phases, alphas, sizes, colors };
}

// ---------------------------------------------------------------------------
// Shape Registry & Mapping Helper
// ---------------------------------------------------------------------------
export type HeroShapeSlug =
  | "who-we-serve"
  | "impact-and-measurement"
  | "impact"
  | "partners-and-investors"
  | "partners"
  | "esg-and-sustainability"
  | "esg"
  | "apply-for-funding"
  | "apply";

export const HERO_SHAPE_REGISTRY: Record<
  string,
  (count: number, rng?: () => number) => ShapeCloudData
> = {
  "who-we-serve": generateWhoWeServeCloud,
  "impact-and-measurement": generateImpactCloud,
  "impact": generateImpactCloud,
  "partners-and-investors": generatePartnersHeroCloud,
  "partners": generatePartnersHeroCloud,
  "esg-and-sustainability": generateEsgTreeCloud,
  "esg": generateEsgTreeCloud,
  "apply-for-funding": generateApplyPathCloud,
  "apply": generateApplyPathCloud,
};
