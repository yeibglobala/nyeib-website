/**
 * Deterministic Particle Engine for Pillars & Funds Sections
 * 
 * Virtual canvas space: 500 x 400 (aspect 5/4)
 * Shapes fill 90% to 94% of canvas, perfectly centered with safe margins.
 * 
 * PALETTE TOGGLE:
 * Switch ACTIVE_PALETTE between "orange" and "green".
 */

export const CANVAS_WIDTH = 500;
export const CANVAS_HEIGHT = 400;
export const DESKTOP_PARTICLE_COUNT = 7200;
export const MOBILE_PARTICLE_COUNT = 3600;

// Configurable Color Palettes
export type PaletteType = "orange" | "green";
export const ACTIVE_PALETTE: PaletteType = "orange"; // Toggle to "green" anytime

export const COLOR_PALETTES: Record<PaletteType, string[]> = {
  orange: [
    "#d46000", // 60% rich deep tiger orange
    "#f88404", // 25% signature vibrant brand tiger orange
    "#ff9626", // 15% radiant bright tiger orange
  ],
  green: [
    "#003124", // 60% Solid Nigerian Deep Evergreen
    "#0b523b", // 25% Deep Forest Emerald
    "#15835e", // 15% Rich Vibrant Emerald
  ],
};

export const PARTICLE_COLORS = COLOR_PALETTES[ACTIVE_PALETTE];

// Deterministic PRNG
export function createPRNG(seed: number) {
  let s = seed | 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Gaussian random helper using Box-Muller transform
function gaussianRandom(rng: () => number): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = rng();
  while (v === 0) v = rng();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// Tree Branch Definition
interface BranchSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  level: number;
  radius: number;
}

// Pre-computed recursive tree structure (seeded for consistent layout)
function buildTreeStructure(W: number, H: number): {
  branches: BranchSegment[];
  tips: { x: number; y: number; radius: number }[];
} {
  const treeRng = createPRNG(101);
  const branches: BranchSegment[] = [];
  const tips: { x: number; y: number; radius: number }[] = [];

  const splitAngleRad = (28 * Math.PI) / 180;
  const lengthDecay = 0.68;

  function growBranch(
    x: number,
    y: number,
    angle: number,
    length: number,
    level: number
  ) {
    const angleVar = (treeRng() - 0.5) * 0.12;
    const currentAngle = angle + angleVar;
    const x2 = x + Math.cos(currentAngle) * length;
    const y2 = y - Math.sin(currentAngle) * length; // -y is upward

    branches.push({
      x1: x,
      y1: y,
      x2,
      y2,
      level,
      radius: Math.max(12, 26 - level * 4),
    });

    if (level < 3) {
      const nextLength = length * lengthDecay * (0.94 + treeRng() * 0.12);
      // Left child
      growBranch(
        x2,
        y2,
        currentAngle + splitAngleRad + (treeRng() - 0.5) * 0.08,
        nextLength,
        level + 1
      );
      // Right child
      growBranch(
        x2,
        y2,
        currentAngle - splitAngleRad + (treeRng() - 0.5) * 0.08,
        nextLength,
        level + 1
      );
    } else {
      // Branch tip (businesses that scale)
      // Top and outer clusters are larger (18 to 24px), inner clusters 12 to 16px
      const distFromCenter = Math.abs(x2 - W * 0.5) / (W * 0.35);
      const isHigh = (H * 0.5 - y2) / (H * 0.35);
      const clusterRad = 13 + Math.min(11, (distFromCenter + Math.max(0, isHigh)) * 6.5);
      tips.push({ x: x2, y: y2, radius: clusterRad });
    }
  }

  // Trunk top is at (W * 0.5, H * 0.50)
  // Two primary main branches
  growBranch(W * 0.5, H * 0.50, Math.PI / 2 + splitAngleRad * 0.9, 68, 1);
  growBranch(W * 0.5, H * 0.50, Math.PI / 2 - splitAngleRad * 0.9, 68, 1);

  return { branches, tips };
}

// Pre-computed Network Nodes (Hub, Ring 1, Outer Ring)
function buildNetworkStructure(W: number, H: number) {
  const netRng = createPRNG(404);
  const cx = W * 0.5;
  const cy = H * 0.5;

  // Hub at center
  const hub = { x: cx, y: cy, radius: 18 };

  // First Ring: 6 nodes at radius ~0.30H (120px)
  const ring1Nodes: { x: number; y: number; radius: number }[] = [];
  const r1Base = H * 0.30;
  for (let i = 0; i < 6; i++) {
    const baseAngle = (i * 60 * Math.PI) / 180;
    const angle = baseAngle + (netRng() - 0.5) * 0.12;
    const r = r1Base + (netRng() - 0.5) * 8;
    ring1Nodes.push({
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
      radius: 12 + netRng() * 4,
    });
  }

  // Outer Ring: 11 smaller nodes at radius ~0.44H (176px)
  const outerNodes: { x: number; y: number; radius: number; nearestR1Idx: number }[] = [];
  const r2Base = H * 0.44;
  const outerCount = 11;
  for (let i = 0; i < outerCount; i++) {
    const baseAngle = (i * (360 / outerCount) * Math.PI) / 180 + 0.15;
    const angle = baseAngle + (netRng() - 0.5) * 0.14;
    const r = r2Base + (netRng() - 0.5) * 10;
    const ox = cx + Math.cos(angle) * r;
    const oy = cy + Math.sin(angle) * r;

    // Find nearest Ring 1 node
    let nearestIdx = 0;
    let minDistSq = Infinity;
    ring1Nodes.forEach((r1, r1Idx) => {
      const dSq = Math.pow(ox - r1.x, 2) + Math.pow(oy - r1.y, 2);
      if (dSq < minDistSq) {
        minDistSq = dSq;
        nearestIdx = r1Idx;
      }
    });

    outerNodes.push({
      x: ox,
      y: oy,
      radius: 6 + netRng() * 3,
      nearestR1Idx: nearestIdx,
    });
  }

  return { hub, ring1Nodes, outerNodes };
}

const TREE_DATA = buildTreeStructure(CANVAS_WIDTH, CANVAS_HEIGHT);
const NETWORK_DATA = buildNetworkStructure(CANVAS_WIDTH, CANVAS_HEIGHT);

/**
 * Generate 3-Funds Shape Point
 * k = 0: Equity Investment Fund ("Growing Tree")
 * k = 1: Credit Guarantee Fund ("Protective Arch")
 * k = 2: Ecosystem Development Fund ("Connected Network")
 * k = 3: Governance / Institutional Fallback
 */
export function generateFundsShapePoint(
  k: number,
  rng: () => number,
  W = CANVAS_WIDTH,
  H = CANVAS_HEIGHT
): [number, number] {
  let x = W * 0.5;
  let y = H * 0.5;
  const u = rng();

  if (k === 0) {
    // =========================================================================
    // SHAPE 1: EQUITY INVESTMENT FUND = "GROWING TREE"
    // =========================================================================
    if (u < 0.06) {
      // 1. Ground (6%): faint line along y = 0.90H from x = 0.22W to 0.78W
      const gx = W * 0.22 + rng() * (W * 0.56);
      const gy = H * 0.90 + (rng() - 0.5) * 3.5;
      x = gx;
      y = gy;
    } else if (u < 0.22) {
      // 2. Seed and Trunk (16%):
      // Dense seed cluster at (0.5W, 0.9H), trunk rising to y = 0.5H tapering 10px to 4px
      const isSeed = rng() < 0.25;
      if (isSeed) {
        const sr = Math.pow(rng(), 1.5) * 6;
        const sa = rng() * Math.PI * 2;
        x = W * 0.5 + Math.cos(sa) * sr;
        y = H * 0.90 + Math.sin(sa) * sr * 0.6;
      } else {
        const t = rng(); // 0 = base (0.9H), 1 = top (0.5H)
        const curY = H * 0.90 - t * (H * 0.40);
        const curveX = Math.sin(t * Math.PI) * 4.0 * (rng() < 0.5 ? 1 : 0.8);
        const trunkWidth = 10.0 - t * 6.0; // 10px tapering to 4px
        // Heavier on trunk edges
        const edgeSide = rng() < 0.5 ? -1 : 1;
        const offset = (rng() < 0.70 ? 0.42 + rng() * 0.58 : rng()) * (trunkWidth / 2) * edgeSide;
        x = W * 0.5 + curveX + offset;
        y = curY;
      }
    } else if (u < 0.56) {
      // 3. Branches (34%): recursive 3 levels
      const branchIdx = Math.floor(rng() * TREE_DATA.branches.length);
      const branch = TREE_DATA.branches[branchIdx];
      const prog = rng();
      // Slight natural curvature
      const midCurve = Math.sin(prog * Math.PI) * (rng() - 0.5) * 3;
      const bx = branch.x1 + (branch.x2 - branch.x1) * prog + midCurve;
      const by = branch.y1 + (branch.y2 - branch.y1) * prog;
      x = bx + (rng() - 0.5) * 2.0;
      y = by + (rng() - 0.5) * 2.0;
    } else if (u < 0.94) {
      // 4. Leaf Clusters (38%): dense soft round gaussian clusters at branch tips
      const tipIdx = Math.floor(rng() * TREE_DATA.tips.length);
      const tip = TREE_DATA.tips[tipIdx];
      const gr = Math.abs(gaussianRandom(rng)) * (tip.radius / 2.2);
      const ga = rng() * Math.PI * 2;
      x = tip.x + Math.cos(ga) * Math.min(tip.radius, gr);
      y = tip.y + Math.sin(ga) * Math.min(tip.radius, gr);
    } else {
      // 5. Stray points (6%): rising above canopy like seeds in the air
      x = W * 0.24 + rng() * (W * 0.52);
      y = H * 0.08 + rng() * (H * 0.28);
    }
  } else if (k === 1) {
    // =========================================================================
    // SHAPE 2: CREDIT GUARANTEE FUND = "PROTECTIVE ARCH"
    // =========================================================================
    const cx = W * 0.50;
    const baseY = H * 0.82;
    const rxOuter = W * 0.40; // 200px
    const ryOuter = H * 0.60; // 240px

    if (u < 0.40) {
      // 1. Outer Arch (40%): half-ellipse, thick soft rim ~5px wide
      const angle = Math.PI * rng(); // 0 to PI
      const thickness = (rng() - 0.5) * 5.5;
      x = cx + Math.cos(angle) * (rxOuter + thickness);
      y = baseY - Math.sin(angle) * (ryOuter + thickness * 0.8);
    } else if (u < 0.54) {
      // 2. Inner Arch (14%): 80% size, thinner & lighter
      const angle = Math.PI * rng();
      const rxInner = rxOuter * 0.80;
      const ryInner = ryOuter * 0.80;
      const thickness = (rng() - 0.5) * 2.5;
      x = cx + Math.cos(angle) * (rxInner + thickness);
      y = baseY - Math.sin(angle) * (ryInner + thickness * 0.8);
    } else if (u < 0.62) {
      // 3. Hangers (8%): 9 to 11 thin vertical lines from inner arch down to baseline
      const hangerCount = 10;
      const hangerIdx = Math.floor(rng() * hangerCount);
      // Evenly spaced angles along inner arch
      const hAngle = ((hangerIdx + 0.5) / hangerCount) * Math.PI;
      const rxInner = rxOuter * 0.80;
      const ryInner = ryOuter * 0.80;
      const hX = cx + Math.cos(hAngle) * rxInner;
      const hTopY = baseY - Math.sin(hAngle) * ryInner;
      const t = rng();
      x = hX + (rng() - 0.5) * 1.5;
      y = hTopY + (baseY - hTopY) * t;
    } else if (u < 0.70) {
      // 4. Base Line (8%): dots along y = 0.82H across arch width
      const span = rxOuter * 2.04;
      x = cx - rxOuter * 1.02 + rng() * span;
      y = baseY + (rng() - 0.5) * 2.5;
    } else {
      // 5. Under the Arch Businesses (24% + remainder):
      // 8 small clusters (radius 7 to 12px) standing on base line
      const clusterPositions = [
        { xOffset: -120, r: 8 },
        { xOffset: -85, r: 11 },
        { xOffset: -50, r: 7 },
        { xOffset: -15, r: 12 },
        { xOffset: 20, r: 9 },
        { xOffset: 55, r: 10 },
        { xOffset: 90, r: 8 },
        { xOffset: 125, r: 11 },
      ];
      const cl = clusterPositions[Math.floor(rng() * clusterPositions.length)];
      const cr = Math.pow(rng(), 1.4) * cl.r;
      const ca = rng() * Math.PI * 2;
      x = cx + cl.xOffset + Math.cos(ca) * cr;
      y = baseY - cl.r * 0.5 + Math.sin(ca) * (cr * 0.85);
    }
  } else if (k === 2) {
    // =========================================================================
    // SHAPE 3: ECOSYSTEM DEVELOPMENT FUND = "CONNECTED NETWORK"
    // =========================================================================
    const cx = W * 0.5;
    const cy = H * 0.5;

    if (u < 0.12) {
      // 1. Central Hub (12%): dense cluster at (0.5W, 0.5H), radius ~18px
      const hr = Math.abs(gaussianRandom(rng)) * 7.5;
      const ha = rng() * Math.PI * 2;
      x = cx + Math.cos(ha) * Math.min(18, hr);
      y = cy + Math.sin(ha) * Math.min(18, hr);
    } else if (u < 0.36) {
      // 2. First Ring Nodes (24%): 6 nodes at radius ~0.30H, radius 12 to 16px
      const node = NETWORK_DATA.ring1Nodes[Math.floor(rng() * NETWORK_DATA.ring1Nodes.length)];
      const nr = Math.abs(gaussianRandom(rng)) * (node.radius / 2.2);
      const na = rng() * Math.PI * 2;
      x = node.x + Math.cos(na) * Math.min(node.radius, nr);
      y = node.y + Math.sin(na) * Math.min(node.radius, nr);
    } else if (u < 0.46) {
      // 3. Outer Ring Nodes (10%): 11 smaller nodes at radius ~0.44H, radius 6 to 9px
      const node = NETWORK_DATA.outerNodes[Math.floor(rng() * NETWORK_DATA.outerNodes.length)];
      const nr = Math.pow(rng(), 1.3) * node.radius;
      const na = rng() * Math.PI * 2;
      x = node.x + Math.cos(na) * nr;
      y = node.y + Math.sin(na) * nr;
    } else if (u < 0.62) {
      // 4. Spokes from hub to each 1st ring node (16%): lines with jitter, denser near nodes
      const node = NETWORK_DATA.ring1Nodes[Math.floor(rng() * NETWORK_DATA.ring1Nodes.length)];
      // Biased toward ends for natural nodal density
      let prog = rng();
      prog = rng() < 0.5 ? Math.pow(prog, 1.4) : 1.0 - Math.pow(1.0 - prog, 1.4);
      x = cx + (node.x - cx) * prog + (rng() - 0.5) * 2.5;
      y = cy + (node.y - cy) * prog + (rng() - 0.5) * 2.5;
    } else if (u < 0.72) {
      // 5. Links between neighboring 1st ring nodes (10%)
      const r1Len = NETWORK_DATA.ring1Nodes.length;
      const idx1 = Math.floor(rng() * r1Len);
      const idx2 = (idx1 + 1) % r1Len;
      const n1 = NETWORK_DATA.ring1Nodes[idx1];
      const n2 = NETWORK_DATA.ring1Nodes[idx2];
      const prog = rng();
      x = n1.x + (n2.x - n1.x) * prog + (rng() - 0.5) * 2.2;
      y = n1.y + (n2.y - n1.y) * prog + (rng() - 0.5) * 2.2;
    } else if (u < 0.84) {
      // 6. Links from outer nodes to nearest 1st ring node (12%)
      const oNode = NETWORK_DATA.outerNodes[Math.floor(rng() * NETWORK_DATA.outerNodes.length)];
      const r1Node = NETWORK_DATA.ring1Nodes[oNode.nearestR1Idx];
      const prog = rng();
      x = oNode.x + (r1Node.x - oNode.x) * prog + (rng() - 0.5) * 2.2;
      y = oNode.y + (r1Node.y - oNode.y) * prog + (rng() - 0.5) * 2.2;
    } else if (u < 0.90) {
      // 7. Pulse Rings (6%): 2 faint concentric rings (radii 0.18H and 0.36H)
      const isInner = rng() < 0.5;
      const rBase = isInner ? H * 0.18 : H * 0.36;
      const pa = rng() * Math.PI * 2;
      const pr = rBase + (rng() - 0.5) * 3.0;
      x = cx + Math.cos(pa) * pr;
      y = cy + Math.sin(pa) * pr;
    } else {
      // 8. Subtle network ambient dust (10%)
      const angle = rng() * Math.PI * 2;
      const rad = rng() * (H * 0.44);
      x = cx + Math.cos(angle) * rad;
      y = cy + Math.sin(angle) * rad;
    }
  } else {
    // =========================================================================
    // SHAPE 3 (Classic Governance Rings Fallback)
    // =========================================================================
    const an = rng() * Math.PI * 2;
    const ringRadii = [H * 0.21, H * 0.34, H * 0.46];
    const baseR = ringRadii[Math.floor(rng() * 3)];
    const rad = baseR + (rng() - 0.5) * 4;
    x = W * 0.5 + Math.cos(an) * rad;
    y = H * 0.5 + Math.sin(an) * rad;
  }

  // Safe clamping with natural jitter & 3.5% padding from borders
  const jitterX = (rng() - 0.5) * 2.2;
  const jitterY = (rng() - 0.5) * 2.2;
  const clampedX = Math.max(W * 0.035, Math.min(W * 0.965, x + jitterX));
  const clampedY = Math.max(H * 0.035, Math.min(H * 0.965, y + jitterY));

  return [clampedX, clampedY];
}

/**
 * Classic 4-Pillar Shape Point (Untouched Block 1 Shapes)
 */
export function generateClassicShapePoint(
  k: number,
  rng: () => number,
  nodes: [number, number][],
  W = CANVAS_WIDTH,
  H = CANVAS_HEIGHT
): [number, number] {
  let x = 0;
  let y = 0;

  if (k === 0) {
    // 0: Capital - 5 stacked elliptical layers
    const layer = Math.floor(rng() * 5);
    const cy = H * 0.89 - layer * (H * 0.178);
    const rx = W * 0.45 - layer * (W * 0.022);
    const ry = H * 0.084;
    const an = rng() * Math.PI * 2;
    const isEdge = rng() < 0.70;
    const q = isEdge ? 0.95 + rng() * 0.07 : Math.pow(rng(), 0.55);

    x = W / 2 + Math.cos(an) * rx * q;
    y = cy + Math.sin(an) * ry * q;
    if (rng() < 0.10) y += (rng() - 0.5) * H * 0.06;
  } else if (k === 1) {
    // 1: Growth - rising curve
    const t = Math.pow(rng(), 0.82);
    x = W * 0.04 + t * (W * 0.905);
    const b = H * 0.89 - Math.pow(t, 1.65) * (H * 0.78);
    const isSpine = rng() < 0.70;

    if (isSpine) {
      const thickness = (H * 0.032 + t * (H * 0.060)) * (rng() - 0.5);
      y = b + thickness;
    } else {
      const spread = (H * 0.07 + t * (H * 0.16)) * (rng() - 0.5);
      y = b + spread;
      if (rng() < 0.22) y -= rng() * (H * 0.15) * Math.pow(t, 1.2);
    }
  } else if (k === 2) {
    // 2: Ecosystem - network nodes and connecting paths
    const nodeA = nodes[Math.floor(rng() * 8)];
    const isEdgePath = rng() < 0.70;

    if (isEdgePath) {
      if (rng() < 0.42) {
        const a = rng() * Math.PI * 2;
        const rad = Math.pow(rng(), 1.4) * (H * 0.088);
        x = nodeA[0] + Math.cos(a) * rad;
        y = nodeA[1] + Math.sin(a) * rad;
      } else {
        const nodeB = nodes[Math.floor(rng() * 8)];
        const u = rng();
        x = nodeA[0] + (nodeB[0] - nodeA[0]) * u + (rng() - 0.5) * 4.5;
        y = nodeA[1] + (nodeB[1] - nodeA[1]) * u + (rng() - 0.5) * 4.5;
      }
    } else {
      const a = rng() * Math.PI * 2;
      const rad = Math.pow(rng(), 0.8) * (H * 0.14);
      x = nodeA[0] + Math.cos(a) * rad;
      y = nodeA[1] + Math.sin(a) * rad;
    }
  } else {
    // 3: Governance - concentric rings
    const an = rng() * Math.PI * 2;
    const ringRadii = [H * 0.21, H * 0.34, H * 0.46];
    const baseR = ringRadii[Math.floor(rng() * 3)];
    const rad = baseR + (rng() + rng() - 1) * 4;
    x = W / 2 + Math.cos(an) * rad;
    y = H / 2 + Math.sin(an) * rad;
  }

  const clampedX = Math.max(W * 0.035, Math.min(W * 0.965, x + (rng() - 0.5) * 2.0));
  const clampedY = Math.max(H * 0.035, Math.min(H * 0.965, y + (rng() - 0.5) * 2.0));

  return [clampedX, clampedY];
}

export interface ParticleCloud {
  count: number;
  targets: [number, number][][];
  delays: Float32Array;
  phases: Float32Array;
  alphas: Float32Array;
  sizes: Float32Array;
  colors: Uint8Array;
  isPulsePoint: Uint8Array; // Flag for pulse ring breathing
}

const cloudCache = new Map<string, ParticleCloud>();

export function getParticleCloud(
  count = DESKTOP_PARTICLE_COUNT,
  mode: "funds" | "classic" = "funds"
): ParticleCloud {
  const cacheKey = `${mode}_${count}`;
  if (cloudCache.has(cacheKey)) {
    return cloudCache.get(cacheKey)!;
  }

  const N = count;
  const W = CANVAS_WIDTH;
  const H = CANVAS_HEIGHT;

  const classicNodes: [number, number][] = [
    [W * 0.12, H * 0.30],
    [W * 0.24, H * 0.72],
    [W * 0.38, H * 0.24],
    [W * 0.50, H * 0.55],
    [W * 0.64, H * 0.22],
    [W * 0.76, H * 0.70],
    [W * 0.88, H * 0.35],
    [W * 0.48, H * 0.84],
  ];

  const targets: [number, number][][] = [];
  const delays = new Float32Array(N);
  const phases = new Float32Array(N);
  const alphas = new Float32Array(N);
  const sizes = new Float32Array(N);
  const colors = new Uint8Array(N);
  const isPulsePoint = new Uint8Array(N);

  for (let i = 0; i < N; i++) {
    const rn = createPRNG(i * 137 + 11);
    const pointTargets: [number, number][] = [];

    for (let k = 0; k < 4; k++) {
      if (mode === "funds") {
        pointTargets.push(generateFundsShapePoint(k, rn, W, H));
      } else {
        pointTargets.push(generateClassicShapePoint(k, rn, classicNodes, W, H));
      }
    }
    targets.push(pointTargets);

    // Staggered morph delay: 0 to 250ms
    delays[i] = rn() * 250;
    phases[i] = rn() * Math.PI * 2;

    // Crisp solid opacity: 0.85 to 1.0
    alphas[i] = 0.85 + rn() * 0.15;

    // Dot size: 1.85 to 2.4px
    sizes[i] = rn() < 0.35 ? 2.4 : 1.85;

    // Color distribution: 60% base, 25% mid, 15% bright
    const cq = rn();
    colors[i] = cq < 0.60 ? 0 : cq < 0.85 ? 1 : 2;

    // Flag ~6% of points in network as pulse points
    isPulsePoint[i] = (i % 16 === 0) ? 1 : 0;
  }

  const cloud: ParticleCloud = {
    count: N,
    targets,
    delays,
    phases,
    alphas,
    sizes,
    colors,
    isPulsePoint,
  };

  cloudCache.set(cacheKey, cloud);
  return cloud;
}
