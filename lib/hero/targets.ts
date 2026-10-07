/**
 * Geometry Target Builders for Bridge, 3D Ribbon, and NYEIB Logo
 * Includes SVG Lookup Table (LUT) caching and Singleton Cloud Caching
 */

import { HERO_CONFIG } from "./config";

// --- SVG Path Data from logo.svg (ViewBox: 0 0 19.63 17.18) ---
export const LOGO_SVG_PATHS = [
  "M4.68,.16c-.05-.09-.17-.16-.29-.16H.34C.07,0-.08,.29,.05,.51L3.92,6.82c.84,1.36,1.19,2.97,1.03,4.57l-.58,5.42c-.01,.2,.14,.37,.34,.37h2.42c.16,0,.29-.1,.33-.25,.37-1.62,.56-3.3,.56-5.04C8.04,7.58,6.82,3.56,4.68,.16Z",
  "M19.3,0h-4.06c-.12,0-.22,.07-.29,.16-2.12,3.41-3.35,7.43-3.35,11.73,0,1.74,.2,3.42,.58,5.04,.03,.14,.17,.25,.33,.25h2.42c.2,0,.35-.17,.33-.37l-.56-5.42c-.17-1.6,.2-3.21,1.03-4.57L19.59,.51c.13-.22-.03-.51-.29-.51Z",
  "M13.28,0H6.36c-.26,0-.42,.29-.29,.51,.42,.76,.81,1.55,1.15,2.36,1.22,2.87,1.83,5.89,1.83,9.02,0,1.66-.18,3.3-.52,4.89-.04,.21,.12,.41,.33,.41h1.91c.21,0,.38-.2,.33-.41-.34-1.58-.51-3.22-.51-4.89,0-3.13,.62-6.16,1.82-9.02,.34-.81,.73-1.6,1.17-2.36,.12-.22-.04-.51-.3-.51Z"
];
export const LOGO_VB_WIDTH = 19.63;
export const LOGO_VB_HEIGHT = 17.18;

// --- bridge.svg path data (viewBox 0 0 1262 329) ---
export const BRIDGE_ARCH_OUTER = "M273.907 328.356C290.944 292.492 417.026 44.3248 644.09 44.3248C875.595 44.3248 972.65 292.492 985.469 328.356H986.956V144.501C986.956 144.501 865.846 0.275452 644.09 0.275452C441.49 0.275452 271.912 144.501 271.912 144.501V328.356H273.907Z";
export const BRIDGE_ARCH_INNER = "M282.758 328.357C318.274 261.109 440.647 61.8995 644.087 61.8995C851.505 61.8995 950.993 261.113 978.671 328.357H986.953V162.069C986.953 162.069 865.843 17.8438 644.087 17.8438C441.488 17.8438 271.909 162.069 271.909 162.069V328.357H282.758Z";

export const BRIDGE_HANGERS = [
  [311.431, 132.487, 311.431, 185.575],
  [364.430,  99.630, 364.430, 185.575],
  [417.432,  72.321, 417.432, 185.575],
  [470.432,  50.400, 470.432, 185.575],
  [523.431,  34.211, 523.431, 185.575],
  [576.433,  22.824, 576.433, 185.575],
  [629.433,  18.390, 629.433, 185.575],
  [682.432,  19.467, 682.432, 185.575],
  [735.434,  26.577, 735.434, 185.575],
  [788.434,  39.484, 788.434, 185.575],
  [841.436,  59.579, 841.436, 185.575],
  [894.436,  87.334, 894.436, 185.575],
  [947.435, 124.927, 947.435, 185.575]
];

export const BRIDGE_LATTICE = [
  [271.912, 162.068, 311.431, 185.575],
  [311.431, 132.487, 364.430, 185.575],
  [364.431,  99.630, 417.433, 135.673],
  [417.433,  72.321, 470.432,  96.840],
  [470.432,  50.400, 522.395,  68.834],
  [523.431,  34.211, 576.433,  52.070],
  [576.435,  22.824, 629.434,  44.829],
  [629.433,  18.390, 682.432,  46.669],
  [682.433,  19.467, 735.435,  58.250],
  [735.435,  26.577, 788.434,  80.955],
  [788.435,  39.484, 841.437, 117.002],
  [841.437,  59.579, 894.436, 170.064],
  [894.436,  87.334, 947.435, 185.575],
  [947.435, 124.927, 985.466, 328.357]
];

export const BRIDGE_ZIGZAG_UPPER = "M271.912 162.068L287.168 132.487L318.452 127.931L331.885 101.618L364.43 99.6295L382.151 72.3194H417.432L439.834 44.8301L469.469 50.4002L496.415 24.0621L523.431 34.2111L547.051 10.7699L577.722 22.8246L603.644 2.14615L629.432 18.3896L655.93 0.413086L682.432 19.4672L714.007 5.187L735.434 26.5786L766.591 15.7101L788.433 39.4838L821.195 33.4565L841.436 59.5804L878.38 60.4469L894.435 87.335L930.794 94.2225L947.434 124.925L973.072 129.971L986.952 161.23";
export const BRIDGE_ZIGZAG_LOWER_L = "M273.908 328.354L297.522 301.987L311.431 262.261L342.579 235.111L364.431 190.895L401.049 169.334L417.433 136.991L447.848 129.841L470.432 96.8363H501.237L523.432 68.8323L552.753 75.8189L575.625 52.0676L602.932 64.6595L629.433 44.8284L654.889 62.0791L682.432 46.6669L702.996 67.5181L735.435 58.2484L754.236 82.4986L788.434 80.9542L806.203 108.99L841.436 117L856.97 148.182L894.049 169.261L908.518 205.303L947.134 245.308L957.213 282.444L985.467 328.354";
export const BRIDGE_ZIGZAG_LOWER_R = "M978.672 328.354L967.093 284.689L936.576 246.216L917.717 200.248L885.175 176.919L864.516 137.758L832.876 128.7L813.045 95.8739H785.281L760.283 67.3902L730.213 74.2106L705.026 50.3537L680.501 64.004L654.348 44.8284L628.678 62.2805L600.661 47.4056L576.434 69.4526L548.468 59.617L526.597 85.2261L496.415 81.7599L475.404 111.302L442.649 116.146L424.81 147.962L390.983 161.689L371.372 200.194L336.519 225.592L316.355 271.921L290.142 297.229L282.759 328.354";

export const BRIDGE_PYLON_OUTLINES = [
  "M276.893 328.356L268.174 118.981H197.377L188.657 328.356H276.893Z",
  "M264.781 105.013H200.77V118.98H264.781V105.013Z",
  "M261.222 101.618H204.325V105.014H261.222V101.618Z",
  "M219.988 328.354L210.472 99.746H139.672L130.153 328.354H219.988Z",
  "M207.077 85.7787H143.068V99.7455H207.077V85.7787Z",
  "M203.52 82.3842H146.62V85.7768H203.52V82.3842Z",
  "M1065.41 328.356L1056.69 118.981H985.892L977.172 328.356H1065.41Z",
  "M1053.29 105.013H989.284V118.98H1053.29V105.013Z",
  "M1049.74 101.618H992.84V105.014H1049.74V101.618Z",
  "M1118.83 328.354L1109.31 99.746H1038.51L1028.99 328.354H1118.83Z",
  "M1105.92 85.7787H1041.91V99.7455H1105.92V85.7787Z",
  "M1102.36 82.3842H1045.46V85.7768H1102.36V82.3842Z"
];

export const BRIDGE_WINDOW_PATHS = [
  "M241.098 191.279V179.074C241.098 174.476 237.369 170.751 232.774 170.751C228.176 170.751 224.451 174.476 224.451 179.074V191.279H241.098Z",
  "M245.386 127.271H220.17V135.675H245.386V127.271Z",
  "M183.396 172.044V159.842C183.396 155.244 179.667 151.516 175.069 151.516C170.471 151.516 166.746 155.241 166.746 159.842V172.044H183.396Z",
  "M187.68 108.036H162.464V116.44H187.68V108.036Z",
  "M1029.62 191.279V179.074C1029.62 174.476 1025.89 170.751 1021.29 170.751C1016.69 170.751 1012.97 174.476 1012.97 179.074V191.279H1029.62Z",
  "M1033.9 127.271H1008.68V135.675H1033.9V127.271Z",
  "M1082.24 172.044V159.842C1082.24 155.244 1078.51 151.516 1073.91 151.516C1069.31 151.516 1065.59 155.241 1065.59 159.842V172.044H1082.24Z",
  "M1086.52 108.036H1061.31V116.44H1086.52V108.036Z"
];

export interface WindowHole {
  type: "arch" | "rect";
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  cx?: number;
  cy?: number;
  rx?: number;
  ry?: number;
}

export const BRIDGE_WINDOW_HOLES: WindowHole[] = [
  { type: "arch", cx: 232.774, cy: 179.074, rx: 8.323, ry: 8.323, y0: 179.074, y1: 191.279, x0: 224.451, x1: 241.098 },
  { type: "rect", x0: 220.170, y0: 127.271, x1: 245.386, y1: 135.675 },
  { type: "arch", cx: 175.069, cy: 159.842, rx: 8.323, ry: 8.323, y0: 159.842, y1: 172.044, x0: 166.746, x1: 183.396 },
  { type: "rect", x0: 162.464, y0: 108.036, x1: 187.680, y1: 116.440 },
  { type: "arch", cx: 1021.29, cy: 179.074, rx: 8.323, ry: 8.323, y0: 179.074, y1: 191.279, x0: 1012.97, x1: 1029.62 },
  { type: "rect", x0: 1008.68, y0: 127.271, x1: 1033.90, y1: 135.675 },
  { type: "arch", cx: 1073.91, cy: 159.842, rx: 8.323, ry: 8.323, y0: 159.842, y1: 172.044, x0: 1065.59, x1: 1082.24 },
  { type: "rect", x0: 1061.31, y0: 108.036, x1: 1086.52, y1: 116.440 }
];

export function isInsideWindowHole(sx: number, sy: number): boolean {
  for (let i = 0; i < BRIDGE_WINDOW_HOLES.length; i++) {
    const h = BRIDGE_WINDOW_HOLES[i];
    if (h.type === "rect") {
      if (sx >= h.x0 && sx <= h.x1 && sy >= h.y0 && sy <= h.y1) return true;
    } else if (h.cx !== undefined && h.cy !== undefined && h.rx !== undefined && h.ry !== undefined) {
      if (sy >= h.y0 && sy <= h.y1 && sx >= h.x0 && sx <= h.x1) return true;
      if (sy < h.y0) {
        const dx = (sx - h.cx) / h.rx;
        const dy = (sy - h.cy) / h.ry;
        if (dx * dx + dy * dy <= 1.0) return true;
      }
    }
  }
  return false;
}

// Global SVG LUT Cache across mounts
const SVG_LUT_CACHE = new Map<string, Float32Array>();

function makePathLut(d: string, samples: number = 600): Float32Array {
  if (SVG_LUT_CACHE.has(d)) return SVG_LUT_CACHE.get(d)!;
  if (typeof document === "undefined") return new Float32Array(samples * 2);
  const svgNS = "http://www.w3.org/2000/svg";
  const el = document.createElementNS(svgNS, "path");
  el.setAttribute("d", d);
  const len = el.getTotalLength ? el.getTotalLength() : 0;
  const lut = new Float32Array(samples * 2);
  if (len < 0.001) {
    SVG_LUT_CACHE.set(d, lut);
    return lut;
  }
  const step = len / (samples - 1);
  for (let i = 0; i < samples; i++) {
    const pt = el.getPointAtLength(Math.min(i * step, len));
    lut[i * 2] = pt.x;
    lut[i * 2 + 1] = pt.y;
  }
  SVG_LUT_CACHE.set(d, lut);
  return lut;
}

// --- Generator 1: Exact Arch Bridge with Pathway Motion IDs ---
export function generateBridgeCloud(count: number, width: number, height: number, rnd: () => number = Math.random) {
  const pts = new Float32Array(count * 3);
  const partIds = new Float32Array(count);
  let idx = 0;

  function addPt(hx: number, hy: number, hz: number, partId: number) {
    if (idx + 3 > pts.length) return;
    const pIdx = idx / 3;
    pts[idx++] = hx;
    pts[idx++] = hy;
    pts[idx++] = hz;
    partIds[pIdx] = partId;
  }

  const isPhone = width < 500;
  const isTablet = width >= 500 && width < 900;

  const legConfig = isPhone
    ? HERO_CONFIG.bridge.archLegs.phone
    : isTablet
    ? HERO_CONFIG.bridge.archLegs.tablet
    : HERO_CONFIG.bridge.archLegs.desktop;

  const archLeftX = legConfig.left * width;
  const archRightX = legConfig.right * width;

  const DECK_FRAC      = HERO_CONFIG.bridge.deckFrac;
  const GROUND_FRAC    = HERO_CONFIG.bridge.groundFrac;
  const PYLON_TOP_FRAC = HERO_CONFIG.bridge.pylonTopFrac;
  const ARCH_APEX_FRAC = HERO_CONFIG.bridge.archApexFrac;

  const SVG_ARCH_X0 = 271.912;
  const SVG_ARCH_X1 = 986.956;
  const SVG_ARCH_W  = SVG_ARCH_X1 - SVG_ARCH_X0; // 715.044

  const scaleX = (archRightX - archLeftX) / SVG_ARCH_W;

  function mapArchPoint(sx: number, sy: number): [number, number] {
    const screenX = archLeftX + (sx - SVG_ARCH_X0) * scaleX;
    let screenY: number;
    if (sy <= 185.575) {
      const t = Math.max(0, Math.min(1, (sy - 0.275) / (185.575 - 0.275)));
      screenY = (ARCH_APEX_FRAC + t * (DECK_FRAC - ARCH_APEX_FRAC)) * height;
    } else {
      const t = Math.max(0, Math.min(1, (sy - 185.575) / (328.356 - 185.575)));
      screenY = (DECK_FRAC + t * (GROUND_FRAC - DECK_FRAC)) * height;
    }
    return [screenX - width * 0.5, screenY - height * 0.5];
  }

  function mapPylonPoint(sx: number, sy: number): [number, number] {
    const screenX = archLeftX + (sx - SVG_ARCH_X0) * scaleX;
    let screenY: number;
    if (sy <= 185.575) {
      const t = Math.max(0, Math.min(1, (sy - 82.384) / (185.575 - 82.384)));
      screenY = (PYLON_TOP_FRAC + t * (DECK_FRAC - PYLON_TOP_FRAC)) * height;
    } else {
      const t = Math.max(0, Math.min(1, (sy - 185.575) / (328.355 - 185.575)));
      screenY = (DECK_FRAC + t * (GROUND_FRAC - DECK_FRAC)) * height;
    }
    return [screenX - width * 0.5, screenY - height * 0.5];
  }

  function sampleLut(lut: Float32Array, budget: number, mapFn: (x: number, y: number) => [number, number], jitter: number, zRange: number, zPush: number, partId: number) {
    const count = lut.length / 2;
    if (count < 2) return;
    for (let i = 0; i < budget; i++) {
      if (idx + 3 > pts.length) return;
      const t = rnd() * (count - 1);
      const i0 = Math.floor(t);
      const i1 = Math.min(i0 + 1, count - 1);
      const f = t - i0;
      const sx = lut[i0 * 2] + (lut[i1 * 2] - lut[i0 * 2]) * f;
      const sy = lut[i0 * 2 + 1] + (lut[i1 * 2 + 1] - lut[i0 * 2 + 1]) * f;
      const [hx, hy] = mapFn(sx, sy);
      addPt(
        hx + (rnd() - 0.5) * jitter,
        hy + (rnd() - 0.5) * jitter,
        (rnd() - 0.5) * zRange + (zPush || 0),
        partId
      );
    }
  }

  const b_archRibs   = Math.round(count * HERO_CONFIG.bridge.budgets.archRibs);
  const b_zigzag     = Math.round(count * HERO_CONFIG.bridge.budgets.zigzag);
  const b_hangers    = Math.round(count * HERO_CONFIG.bridge.budgets.hangers);
  const b_lattice    = Math.round(count * HERO_CONFIG.bridge.budgets.lattice);
  const b_deck       = Math.round(count * HERO_CONFIG.bridge.budgets.deck);
  const b_ground     = Math.round(count * HERO_CONFIG.bridge.budgets.ground);
  const b_pylons     = isPhone ? Math.round(count * HERO_CONFIG.bridge.budgets.pylonsPhone) : Math.round(count * HERO_CONFIG.bridge.budgets.pylonsDesktop);
  const b_viaduct    = isPhone ? 0 : Math.round(count * HERO_CONFIG.bridge.budgets.viaductDesktop);

  // 1. ARCH RIBS (Outer & Inner Curves + Footings: partId = 2.0)
  {
    const outerLut = makePathLut(BRIDGE_ARCH_OUTER, 800);
    const innerLut = makePathLut(BRIDGE_ARCH_INNER, 800);
    const budgetOuter = Math.round(b_archRibs * 0.55);
    const budgetInner = b_archRibs - budgetOuter;

    const lutCountOuter = outerLut.length / 2;
    for (let i = 0; i < budgetOuter; i++) {
      if (idx + 3 > pts.length) break;
      const t = rnd() < 0.32 ? (0.32 + rnd() * 0.36) * (lutCountOuter - 1) : rnd() * (lutCountOuter - 1);
      const i0 = Math.floor(t);
      const i1 = Math.min(i0 + 1, lutCountOuter - 1);
      const f = t - i0;
      const sx = outerLut[i0 * 2] + (outerLut[i1 * 2] - outerLut[i0 * 2]) * f;
      const sy = outerLut[i0 * 2 + 1] + (outerLut[i1 * 2 + 1] - outerLut[i0 * 2 + 1]) * f;
      const [hx, hy] = mapArchPoint(sx, sy);
      addPt(
        hx + (rnd() - 0.5) * 1.5,
        hy + (rnd() - 0.5) * 1.5,
        (rnd() - 0.5) * 20.0 + 4.0,
        2.0
      );
    }

    sampleLut(innerLut, budgetInner, mapArchPoint, 1.5, 16.0, 2.0, 2.0);

    // Footings
    const bFeet = Math.round(count * 0.015);
    for (let i = 0; i < bFeet; i++) {
      if (idx + 3 > pts.length) break;
      const isLeftFoot = rnd() < 0.5;
      const sx = isLeftFoot ? (271.912 + rnd() * 10.846) : (978.671 + rnd() * 8.285);
      const sy = 315.0 + rnd() * 13.356;
      const [hx, hy] = mapArchPoint(sx, sy);
      addPt(
        hx + (rnd() - 0.5) * 1.2,
        hy + (rnd() - 0.5) * 1.2,
        (rnd() - 0.5) * 16.0 + 3.0,
        2.0
      );
    }
  }

  // 2. ZIGZAG OUTLINE CURVES (partId = 2.0)
  {
    const luts = [
      makePathLut(BRIDGE_ZIGZAG_UPPER, 500),
      makePathLut(BRIDGE_ZIGZAG_LOWER_L, 500),
      makePathLut(BRIDGE_ZIGZAG_LOWER_R, 500)
    ];
    const budgetEach = Math.round(b_zigzag / 3);
    for (const lut of luts) {
      sampleLut(lut, budgetEach, mapArchPoint, 1.4, 14, 2.0, 2.0);
    }
  }

  // 3. VERTICAL HANGERS (partId = 2.0) - Fast direct linear math
  {
    const budgetPerHanger = Math.max(1, Math.round(b_hangers / BRIDGE_HANGERS.length));
    for (const [x0, y0, x1, y1] of BRIDGE_HANGERS) {
      for (let i = 0; i < budgetPerHanger; i++) {
        if (idx + 3 > pts.length) break;
        const t = rnd() < 0.40 ? (0.65 + rnd() * 0.35) : rnd();
        const sx = x0 + (x1 - x0) * t;
        const sy = y0 + (y1 - y0) * t;
        const [hx, hy] = mapArchPoint(sx, sy);
        addPt(
          hx + (rnd() - 0.5) * 1.0,
          hy + (rnd() - 0.5) * 1.0,
          (rnd() - 0.5) * 12.0,
          2.0
        );
      }
    }
  }

  // 4. DIAGONAL LATTICE LINES (partId = 2.0) - Fast direct linear math
  {
    const budgetPerLine = Math.max(1, Math.round(b_lattice / BRIDGE_LATTICE.length));
    for (const [x0, y0, x1, y1] of BRIDGE_LATTICE) {
      for (let i = 0; i < budgetPerLine; i++) {
        if (idx + 3 > pts.length) break;
        const t = rnd();
        const sx = x0 + (x1 - x0) * t;
        const sy = y0 + (y1 - y0) * t;
        const [hx, hy] = mapArchPoint(sx, sy);
        addPt(
          hx + (rnd() - 0.5) * 1.2,
          hy + (rnd() - 0.5) * 1.2,
          (rnd() - 0.5) * 10.0,
          2.0
        );
      }
    }
  }

  // 5. DECK BARS (partId = 1.0)
  {
    const deckCanvasY1 = (DECK_FRAC - 0.5) * height;
    const deckCanvasY2 = deckCanvasY1 + 3.5;
    const dxL = -0.52 * width;
    const dxR =  0.52 * width;

    const bMain = Math.round(b_deck * 0.45);
    const bLow  = Math.round(b_deck * 0.35);
    const bJunc = b_deck - bMain - bLow;

    for (let i = 0; i < bMain; i++) {
      if (idx + 3 > pts.length) break;
      addPt(
        dxL + rnd() * (dxR - dxL),
        deckCanvasY1 + (rnd() - 0.5) * 1.2,
        (rnd() - 0.5) * 14.0 + 3.0,
        1.0
      );
    }

    for (let i = 0; i < bLow; i++) {
      if (idx + 3 > pts.length) break;
      addPt(
        dxL + rnd() * (dxR - dxL),
        deckCanvasY2 + (rnd() - 0.5) * 1.2,
        (rnd() - 0.5) * 12.0,
        1.0
      );
    }

    const juncPerHanger = Math.max(1, Math.round(bJunc / BRIDGE_HANGERS.length));
    for (const [hxSvg] of BRIDGE_HANGERS) {
      const [juncX, juncY] = mapArchPoint(hxSvg, 185.575);
      for (let j = 0; j < juncPerHanger; j++) {
        if (idx + 3 > pts.length) break;
        addPt(
          juncX + (rnd() - 0.5) * 4.0,
          juncY + (rnd() - 0.5) * 2.5,
          (rnd() - 0.5) * 10.0 + 6.0,
          1.0
        );
      }
    }
  }

  // 6. GROUND LINE (partId = 0.0)
  {
    const groundCanvasY = (GROUND_FRAC - 0.5) * height;
    const gxL = -0.52 * width;
    const gxR =  0.52 * width;
    for (let i = 0; i < b_ground; i++) {
      if (idx + 3 > pts.length) break;
      addPt(
        gxL + rnd() * (gxR - gxL),
        groundCanvasY + (rnd() - 0.5) * 1.4,
        (rnd() - 0.5) * 14.0,
        0.0
      );
    }
  }

  // 7. PYLONS (partId = 0.0)
  if (b_pylons > 0) {
    const PYLON_Z_BASE = -16.0;

    const windowBudgetTotal = Math.round(b_pylons * 0.20);
    const budgetPerWin = Math.max(1, Math.round(windowBudgetTotal / BRIDGE_WINDOW_PATHS.length));
    for (const winD of BRIDGE_WINDOW_PATHS) {
      const lut = makePathLut(winD, 80);
      sampleLut(lut, budgetPerWin, mapPylonPoint, 0.8, 6.0, PYLON_Z_BASE + 6.0, 0.0);
    }

    const outlineBudgetTotal = Math.round(b_pylons * 0.65);
    const budgetPerOutline = Math.max(1, Math.round(outlineBudgetTotal / BRIDGE_PYLON_OUTLINES.length));
    for (const pylonD of BRIDGE_PYLON_OUTLINES) {
      const lut = makePathLut(pylonD, 120);
      sampleLut(lut, budgetPerOutline, mapPylonPoint, 1.0, 8.0, PYLON_Z_BASE, 0.0);
    }

    const fillBudgetTotal = b_pylons - windowBudgetTotal - outlineBudgetTotal;
    const PYLON_BBOXES = [
      { x0: 188.657, x1: 276.893, y0: 101.618, y1: 328.356 },
      { x0: 130.153, x1: 219.988, y0: 82.384,  y1: 328.354 },
      { x0: 977.172, x1: 1065.41, y0: 101.618, y1: 328.356 },
      { x0: 1028.99, x1: 1118.83, y0: 82.384,  y1: 328.354 }
    ];

    const fillPerPylon = Math.max(1, Math.round(fillBudgetTotal / PYLON_BBOXES.length));
    for (const bbox of PYLON_BBOXES) {
      let placed = 0;
      let attempts = 0;
      while (placed < fillPerPylon && attempts < fillPerPylon * 12) {
        attempts++;
        const sx = bbox.x0 + rnd() * (bbox.x1 - bbox.x0);
        const sy = bbox.y0 + rnd() * (bbox.y1 - bbox.y0);

        if (isInsideWindowHole(sx, sy)) continue;

        const [hx, hy] = mapPylonPoint(sx, sy);
        if (idx + 3 > pts.length) break;

        addPt(
          hx + (rnd() - 0.5) * 1.0,
          hy + (rnd() - 0.5) * 1.0,
          PYLON_Z_BASE + (rnd() - 0.5) * 6.0,
          0.0
        );
        placed++;
      }
    }
  }

  // 8. VIADUCT PIERS (Exact Mirror Symmetry: partId = 0.0)
  if (b_viaduct > 0) {
    const leftPylonOuterX = archLeftX + (130.153 - SVG_ARCH_X0) * scaleX;
    const rightPylonOuterX = archLeftX + (1118.83 - SVG_ARCH_X0) * scaleX;
    const pylonDistFromCenter = Math.max(
      Math.abs(leftPylonOuterX - width * 0.5),
      Math.abs(rightPylonOuterX - width * 0.5)
    );

    const step = width * HERO_CONFIG.bridge.viaductStepFrac;
    const pierOffsets: number[] = [];
    for (let offset = pylonDistFromCenter + step * 0.7; offset <= 0.51 * width; offset += step) {
      pierOffsets.push(offset);
    }

    if (pierOffsets.length > 0) {
      const totalPiersCount = pierOffsets.length * 2;
      const ptsPerPier = Math.max(1, Math.round(b_viaduct / totalPiersCount));
      const deckCanvasY = (DECK_FRAC - 0.5) * height;
      const groundCanvasY = (GROUND_FRAC - 0.5) * height;

      for (const offset of pierOffsets) {
        const distFromEdge = 0.5 * width - offset;
        const edgeFadeFactor = Math.max(0.20, Math.min(1.0, Math.max(0, distFromEdge) / (width * 0.16)));
        const pierZ = -18.0 - (1.0 - edgeFadeFactor) * 26.0;

        const xPositions = [-offset, offset];
        for (const canvasX of xPositions) {
          for (let i = 0; i < ptsPerPier; i++) {
            if (idx + 3 > pts.length) break;
            const t = rnd();
            const py = deckCanvasY + t * (groundCanvasY - deckCanvasY);
            addPt(
              canvasX + (rnd() - 0.5) * 1.8,
              py + (rnd() - 0.5) * 1.0,
              pierZ + (rnd() - 0.5) * 6.0,
              0.0
            );
          }
        }
      }
    }
  }

  // 9. FILL REMAINING WITH DECK PARTICLES
  {
    const deckCanvasY1 = (DECK_FRAC - 0.5) * height;
    const dxL = -0.52 * width;
    const dxR =  0.52 * width;
    while (idx < count * 3) {
      addPt(
        dxL + rnd() * (dxR - dxL),
        deckCanvasY1 + (rnd() - 0.5) * 1.8,
        (rnd() - 0.5) * 14.0,
        1.0
      );
    }
  }

  return { pts, partIds };
}

// --- Generator 2: 3D Flowing Ribbon ---
export function generateRibbonCloud(count: number, width: number, height: number, rnd: () => number = Math.random) {
  const pts = new Float32Array(count * 3);
  const radiusX = width * (width < 900 ? 0.38 : 0.26);
  const radiusY = height * 0.36;
  let idx = 0;

  for (let i = 0; i < count; i++) {
    const u = rnd() * Math.PI * 2.0;
    const v = (rnd() - 0.5) * 2.0;

    const x = Math.cos(u) * (radiusX + v * 35.0 * Math.cos(u * 0.5));
    const y = Math.sin(u) * (radiusY + v * 28.0 * Math.sin(u * 0.5)) + Math.sin(u * 2.0) * 30.0;
    const z = v * 55.0 * Math.sin(u * 0.5) + Math.cos(u * 3.0) * 25.0;

    const foldNoise = (rnd() - 0.5) * (1.0 + Math.sin(u * 3.0)) * 5.0;

    pts[idx++] = x + foldNoise;
    pts[idx++] = y + foldNoise;
    pts[idx++] = z + foldNoise;
  }
  return pts;
}

// Global Logo Pixel Sampling Cache
interface LogoSampleData {
  edgePts: [number, number][];
  interiorPts: [number, number][];
  haloPts: [number, number][];
  offWidth: number;
  offHeight: number;
}

let LOGO_SAMPLE_DATA: LogoSampleData | null = null;

function getLogoSampleData(): LogoSampleData {
  if (LOGO_SAMPLE_DATA) return LOGO_SAMPLE_DATA;

  const offWidth = 600;
  const offHeight = Math.round(offWidth * (LOGO_VB_HEIGHT / LOGO_VB_WIDTH));

  const edgePts: [number, number][] = [];
  const interiorPts: [number, number][] = [];
  const haloPts: [number, number][] = [];

  if (typeof document === "undefined") {
    LOGO_SAMPLE_DATA = { edgePts, interiorPts, haloPts, offWidth, offHeight };
    return LOGO_SAMPLE_DATA;
  }

  const offCanvas = document.createElement("canvas");
  offCanvas.width = offWidth;
  offCanvas.height = offHeight;
  const ctx = offCanvas.getContext("2d", { willReadFrequently: true });

  if (!ctx) {
    LOGO_SAMPLE_DATA = { edgePts, interiorPts, haloPts, offWidth, offHeight };
    return LOGO_SAMPLE_DATA;
  }

  ctx.clearRect(0, 0, offWidth, offHeight);
  ctx.fillStyle = "#ffffff";

  const scale = offWidth / LOGO_VB_WIDTH;
  ctx.save();
  ctx.scale(scale, scale);
  LOGO_SVG_PATHS.forEach(p => ctx.fill(new Path2D(p)));
  ctx.restore();

  const imgData = ctx.getImageData(0, 0, offWidth, offHeight).data;

  function isInside(px: number, py: number): boolean {
    if (px < 0 || px >= offWidth || py < 0 || py >= offHeight) return false;
    return imgData[(py * offWidth + px) * 4 + 3] > 120;
  }

  for (let y = 0; y < offHeight; y += 2) {
    for (let x = 0; x < offWidth; x += 2) {
      if (isInside(x, y)) {
        if (!isInside(x + 2, y) || !isInside(x - 2, y) || !isInside(x, y + 2) || !isInside(x, y - 2)) {
          edgePts.push([x, y]);
        } else {
          interiorPts.push([x, y]);
        }
      } else if (
        isInside(x + 3, y) || isInside(x - 3, y) ||
        isInside(x, y + 3) || isInside(x, y - 3)
      ) {
        haloPts.push([x, y]);
      }
    }
  }

  LOGO_SAMPLE_DATA = { edgePts, interiorPts, haloPts, offWidth, offHeight };
  return LOGO_SAMPLE_DATA;
}

// --- Generator 3: Exact NYEIB Logo (High-Speed Pre-Indexed Grid Sampling) ---
export function generateLogoCloud(count: number, width: number, height: number, rnd: () => number = Math.random) {
  const { edgePts, interiorPts, haloPts, offWidth, offHeight } = getLogoSampleData();

  let logoHeight = height * (width < 900 ? 0.65 : 0.84);
  let logoWidth = logoHeight * (LOGO_VB_WIDTH / LOGO_VB_HEIGHT);

  const maxLogoWidth = width * (width < 900 ? 0.80 : 0.44);
  if (logoWidth > maxLogoWidth) {
    logoWidth = maxLogoWidth;
    logoHeight = logoWidth * (LOGO_VB_HEIGHT / LOGO_VB_WIDTH);
  }

  const pts = new Float32Array(count * 3);
  let idx = 0;

  // 65% edge, 25% interior, 10% halo
  const numEdge = Math.round(count * 0.65);
  const numInterior = Math.round(count * 0.25);
  const numHalo = count - numEdge - numInterior;

  const lenE = edgePts.length || 1;
  const lenI = interiorPts.length || 1;
  const lenH = haloPts.length || 1;

  for (let i = 0; i < numEdge; i++) {
    const p = edgePts[Math.floor(rnd() * lenE)] || [offWidth / 2, offHeight / 2];
    const normX = (p[0] / offWidth - 0.5) * logoWidth;
    const normY = (p[1] / offHeight - 0.5) * logoHeight;
    const depth = Math.sin((p[0] / offWidth) * Math.PI) * 25.0 + (rnd() - 0.5) * 8.0;

    pts[idx++] = normX + (rnd() - 0.5) * 0.8;
    pts[idx++] = normY + (rnd() - 0.5) * 0.8;
    pts[idx++] = depth;
  }

  for (let i = 0; i < numInterior; i++) {
    const p = interiorPts[Math.floor(rnd() * lenI)] || [offWidth / 2, offHeight / 2];
    const normX = (p[0] / offWidth - 0.5) * logoWidth;
    const normY = (p[1] / offHeight - 0.5) * logoHeight;
    const depth = Math.sin((p[0] / offWidth) * Math.PI) * 25.0 + (rnd() - 0.5) * 8.0;

    pts[idx++] = normX + (rnd() - 0.5) * 1.4;
    pts[idx++] = normY + (rnd() - 0.5) * 1.4;
    pts[idx++] = depth;
  }

  for (let i = 0; i < numHalo; i++) {
    const p = haloPts[Math.floor(rnd() * lenH)] || [offWidth / 2, offHeight / 2];
    const normX = (p[0] / offWidth - 0.5) * logoWidth;
    const normY = (p[1] / offHeight - 0.5) * logoHeight;
    const depth = Math.sin((p[0] / offWidth) * Math.PI) * 25.0 + (rnd() - 0.5) * 8.0;

    pts[idx++] = normX + (rnd() - 0.5) * 2.4;
    pts[idx++] = normY + (rnd() - 0.5) * 2.4;
    pts[idx++] = depth;
  }

  return pts;
}

// --- Generator 4: Faint Ambient Star Dust ---
export function generateStarDust(count: number, width: number, height: number, rnd: () => number = Math.random) {
  const pts = new Float32Array(count * 4); // x, y, z, phase
  let idx = 0;
  for (let i = 0; i < count; i++) {
    pts[idx++] = (rnd() - 0.5) * width * 1.2;
    pts[idx++] = (rnd() - 0.5) * height * 1.2;
    pts[idx++] = (rnd() - 0.5) * 80.0;
    pts[idx++] = rnd() * Math.PI * 2.0;
  }
  return pts;
}

// Singleton Cloud Cache for instantaneous mounting / HMR without recomputation
export interface HeroCloudData {
  bridge: { pts: Float32Array; partIds: Float32Array };
  ribbon: Float32Array;
  logo: Float32Array;
  delays: Float32Array;
  sizes: Float32Array;
  dust: Float32Array;
}

const HERO_CLOUD_CACHE = new Map<string, HeroCloudData>();

export function getCachedHeroClouds(
  count: number,
  dustCount: number,
  width: number,
  height: number,
  rnd: () => number = Math.random
): HeroCloudData {
  const isPhone = width < 500;
  const isTablet = width >= 500 && width < 900;
  const tier = isPhone ? "phone" : isTablet ? "tablet" : "desktop";
  const key = `${count}_${dustCount}_${tier}`;

  const cached = HERO_CLOUD_CACHE.get(key);
  if (cached) return cached;

  const bridge = generateBridgeCloud(count, width, height, rnd);
  const ribbon = generateRibbonCloud(count, width, height, rnd);
  const logo = generateLogoCloud(count, width, height, rnd);
  const dust = generateStarDust(dustCount, width, height, rnd);

  const delays = new Float32Array(count);
  const sizes = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    delays[i] = rnd();
    sizes[i] = 1.2 + rnd() * 0.9;
  }

  const cloudData: HeroCloudData = { bridge, ribbon, logo, delays, sizes, dust };
  HERO_CLOUD_CACHE.set(key, cloudData);
  return cloudData;
}
