/**
 * Nigeria YEIB Investment Funds - Hero WebGL Engine Configuration
 * Single source of truth for all particle counts, proportions, timings, and colors.
 */

export const HERO_CONFIG = {
  // Particle Counts
  particles: {
    desktop: 115000,
    phone: 55000,
    fallback2D: 15000,
    starDust: 850,
    fpsThrottleThreshold: 38,
    fpsThrottleRatio: 0.7,
    minThrottleParticles: 45000,
  },

  // Timing (Continuous Morph Loop in seconds)
  timing: {
    holdBridge: 4.0,       // seconds admiring the bridge
    morphToRibbon: 2.0,    // bridge -> ribbon
    morphToLogo: 2.2,      // ribbon -> logo
    holdLogo: 4.0,        // seconds admiring the logo
    morphBackRibbon: 2.0, // logo -> ribbon
    morphBackBridge: 2.0, // ribbon -> bridge
    fadeInDuration: 400,  // ms canvas fade in on load
  },

  // Bridge Proportions & Placement
  bridge: {
    archApexFrac: 0.42,   // Arch apex at 0.42H (preserves real 2.2:1 SVG aspect ratio)
    pylonTopFrac: 0.62,   // Pylon tops at about 0.62H (rising above deck, below text)
    deckFrac: 0.74,       // Deck at 0.74H
    groundFrac: 0.88,     // Ground line at 0.88H

    // Horizontal Arch Placement (Arch Legs fraction of width)
    archLegs: {
      desktop: { left: 0.30, right: 0.70 },
      tablet:  { left: 0.16, right: 0.84 },
      phone:   { left: 0.08, right: 0.92 },
    },

    // Particle Budget Fractions
    budgets: {
      archRibs: 0.28,
      zigzag: 0.16,
      hangers: 0.14,
      lattice: 0.10,
      deck: 0.12,
      ground: 0.05,
      pylonsDesktop: 0.10,
      pylonsPhone: 0.04,
      viaductDesktop: 0.05,
      viaductPhone: 0.0,
    },

    // Viaduct Spacing
    viaductStepFrac: 0.035, // 0.035W spacing between mirror viaduct piers
  },

  // Travelling Pathway Pulses (Bridge State)
  pathwayPulses: {
    deck: {
      period: 7.0,        // 5s travel + 2s pause
      travelTime: 5.0,    // 5s travel
      secondPulseOffset: 2.5, // 2.5s offset
      halfWidth: 0.06,    // pulse soft width in normalized x
      glowBoost: 0.65,    // +65% glow
      sizeBoost: 0.35,    // +35% size
    },
    arch: {
      period: 12.0,       // 8s wave + 4s pause
      travelTime: 8.0,    // 8s wave
      halfWidth: 0.15,    // pulse soft width
      glowBoost: 0.30,    // +30% glow
      sizeBoost: 0.15,    // +15% size
    },
  },

  // Color Palette Constants
  colors: {
    bgDeep: "#0a1310",
    textMain: "#eef6f2",
    accentGreen: "#2eb78c",
    paleOak: "#e1c9b3",
    capsuleBg: "#dcebe5",
    capsuleText: "#003124",
    tigerOrange: "#f88404",
    tigerOrangeHover: "#ff9626",

    // WebGL Direct Additive Vectors (RGB [0..1])
    gl: {
      deepEmerald: [0.18, 0.78, 0.58],  // #2eb78c base
      luminousAqua: [0.28, 0.96, 0.82], // #3ff0c8
      mintCore: [0.92, 1.0, 0.96],      // #e0fff5
      orangeDeep: [0.98, 0.52, 0.02],    // #f88404
      orangeCore: [1.0, 0.85, 0.50],    // warm amber core
      starDust: [0.35, 0.95, 0.82],      // faint ambient dust
    },
  },

  // Pointer Interaction
  pointer: {
    radiusNormal: 120.0,
    radiusClick: 160.0,
    forceNormal: 1.2,
    forceClick: 3.0,
    lerpSpeed: 0.12,
    forceDecay: 0.15,
  },

  // Layout Boundaries (Safety alpha fade for text columns)
  layout: {
    colLeft: { leftVw: 4, maxWidthVw: 17, topPercent: 40 },
    colRight: { rightVw: 4, maxWidthVw: 17, topPercent: 40 },
    textSafetyPaddingVw: 2, // 2vw padding with smoothstep
    textSafetyAlphaMin: 0.25,
  },
} as const;

// Seeded Random Generator for Deterministic Parity Checking (Optional ?seed=123)
export function createPRNG(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function nextRandom() {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
