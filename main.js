/**
 * Nigeria YEIB Investment Funds - High Density WebGL Particle Engine
 * 
 * Features:
 * - 80,000 to 120,000 fine 1px points with direct additive blending
 * - Three morph targets: Suspension Bridge -> Swirling 3D Ribbon -> NYEIB Logo
 * - Split Hero Layout (Left Headline, Right Subtext, Centered Particles)
 * - Exact NYEIB Logo (80-88% height, 65% edge glow, 35% core, 10% halo)
 * - Smoothstep pointer repel with complete position cleanup on mouse leave
 * - Faint twinkling background star dust and performance auto-throttling
 */

(function() {
  'use strict';

  // --- SVG Path Data from logo.svg (ViewBox: 0 0 19.63 17.18) ---
  const SVG_PATHS = [
    "M4.68,.16c-.05-.09-.17-.16-.29-.16H.34C.07,0-.08,.29,.05,.51L3.92,6.82c.84,1.36,1.19,2.97,1.03,4.57l-.58,5.42c-.01,.2,.14,.37,.34,.37h2.42c.16,0,.29-.1,.33-.25,.37-1.62,.56-3.3,.56-5.04C8.04,7.58,6.82,3.56,4.68,.16Z",
    "M19.3,0h-4.06c-.12,0-.22,.07-.29,.16-2.12,3.41-3.35,7.43-3.35,11.73,0,1.74,.2,3.42,.58,5.04,.03,.14,.17,.25,.33,.25h2.42c.2,0,.35-.17,.33-.37l-.56-5.42c-.17-1.6,.2-3.21,1.03-4.57L19.59,.51c.13-.22-.03-.51-.29-.51Z",
    "M13.28,0H6.36c-.26,0-.42,.29-.29,.51,.42,.76,.81,1.55,1.15,2.36,1.22,2.87,1.83,5.89,1.83,9.02,0,1.66-.18,3.3-.52,4.89-.04,.21,.12,.41,.33,.41h1.91c.21,0,.38-.2,.33-.41-.34-1.58-.51-3.22-.51-4.89,0-3.13,.62-6.16,1.82-9.02,.34-.81,.73-1.6,1.17-2.36,.12-.22-.04-.51-.3-.51Z"
  ];
  const SVG_VB_WIDTH = 19.63;
  const SVG_VB_HEIGHT = 17.18;

  // --- bridge.svg path data (viewBox 0 0 1262 329) ---
  const BRIDGE_ARCH_OUTER = "M273.907 328.356C290.944 292.492 417.026 44.3248 644.09 44.3248C875.595 44.3248 972.65 292.492 985.469 328.356H986.956V144.501C986.956 144.501 865.846 0.275452 644.09 0.275452C441.49 0.275452 271.912 144.501 271.912 144.501V328.356H273.907Z";
  const BRIDGE_ARCH_INNER = "M282.758 328.357C318.274 261.109 440.647 61.8995 644.087 61.8995C851.505 61.8995 950.993 261.113 978.671 328.357H986.953V162.069C986.953 162.069 865.843 17.8438 644.087 17.8438C441.488 17.8438 271.909 162.069 271.909 162.069V328.357H282.758Z";

  // Vertical hangers (x positions in SVG space; all stretched to reach deck at y=185.575)
  const BRIDGE_HANGERS = [
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

  // Diagonal lattice lines
  const BRIDGE_LATTICE = [
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

  // Jagged zigzag outline curves
  const BRIDGE_ZIGZAG_UPPER = "M271.912 162.068L287.168 132.487L318.452 127.931L331.885 101.618L364.43 99.6295L382.151 72.3194H417.432L439.834 44.8301L469.469 50.4002L496.415 24.0621L523.431 34.2111L547.051 10.7699L577.722 22.8246L603.644 2.14615L629.432 18.3896L655.93 0.413086L682.432 19.4672L714.007 5.187L735.434 26.5786L766.591 15.7101L788.433 39.4838L821.195 33.4565L841.436 59.5804L878.38 60.4469L894.435 87.335L930.794 94.2225L947.434 124.925L973.072 129.971L986.952 161.23";
  const BRIDGE_ZIGZAG_LOWER_L = "M273.908 328.354L297.522 301.987L311.431 262.261L342.579 235.111L364.431 190.895L401.049 169.334L417.433 136.991L447.848 129.841L470.432 96.8363H501.237L523.432 68.8323L552.753 75.8189L575.625 52.0676L602.932 64.6595L629.433 44.8284L654.889 62.0791L682.432 46.6669L702.996 67.5181L735.435 58.2484L754.236 82.4986L788.434 80.9542L806.203 108.99L841.436 117L856.97 148.182L894.049 169.261L908.518 205.303L947.134 245.308L957.213 282.444L985.467 328.354";
  const BRIDGE_ZIGZAG_LOWER_R = "M978.672 328.354L967.093 284.689L936.576 246.216L917.717 200.248L885.175 176.919L864.516 137.758L832.876 128.7L813.045 95.8739H785.281L760.283 67.3902L730.213 74.2106L705.026 50.3537L680.501 64.004L654.348 44.8284L628.678 62.2805L600.661 47.4056L576.434 69.4526L548.468 59.617L526.597 85.2261L496.415 81.7599L475.404 111.302L442.649 116.146L424.81 147.962L390.983 161.689L371.372 200.194L336.519 225.592L316.355 271.921L290.142 297.229L282.759 328.354";

  // Pylon outline paths (4 buildings with architectural tops/caps)
  const BRIDGE_PYLON_OUTLINES = [
    // Inner-left pylon main + caps
    "M276.893 328.356L268.174 118.981H197.377L188.657 328.356H276.893Z",
    "M264.781 105.013H200.77V118.98H264.781V105.013Z",
    "M261.222 101.618H204.325V105.014H261.222V101.618Z",
    // Outer-left pylon main + caps
    "M219.988 328.354L210.472 99.746H139.672L130.153 328.354H219.988Z",
    "M207.077 85.7787H143.068V99.7455H207.077V85.7787Z",
    "M203.52 82.3842H146.62V85.7768H203.52V82.3842Z",
    // Inner-right pylon main + caps
    "M1065.41 328.356L1056.69 118.981H985.892L977.172 328.356H1065.41Z",
    "M1053.29 105.013H989.284V118.98H1053.29V105.013Z",
    "M1049.74 101.618H992.84V105.014H1049.74V101.618Z",
    // Outer-right pylon main + caps
    "M1118.83 328.354L1109.31 99.746H1038.51L1028.99 328.354H1118.83Z",
    "M1105.92 85.7787H1041.91V99.7455H1105.92V85.7787Z",
    "M1102.36 82.3842H1045.46V85.7768H1102.36V82.3842Z"
  ];

  // Window hole outline paths (for edge glow and precision rejection)
  const BRIDGE_WINDOW_PATHS = [
    // Inner-left windows
    "M241.098 191.279V179.074C241.098 174.476 237.369 170.751 232.774 170.751C228.176 170.751 224.451 174.476 224.451 179.074V191.279H241.098Z",
    "M245.386 127.271H220.17V135.675H245.386V127.271Z",
    // Outer-left windows
    "M183.396 172.044V159.842C183.396 155.244 179.667 151.516 175.069 151.516C170.471 151.516 166.746 155.241 166.746 159.842V172.044H183.396Z",
    "M187.68 108.036H162.464V116.44H187.68V108.036Z",
    // Inner-right windows
    "M1029.62 191.279V179.074C1029.62 174.476 1025.89 170.751 1021.29 170.751C1016.69 170.751 1012.97 174.476 1012.97 179.074V191.279H1029.62Z",
    "M1033.9 127.271H1008.68V135.675H1033.9V127.271Z",
    // Outer-right windows
    "M1082.24 172.044V159.842C1082.24 155.244 1078.51 151.516 1073.91 151.516C1069.31 151.516 1065.59 155.241 1065.59 159.842V172.044H1082.24Z",
    "M1086.52 108.036H1061.31V116.44H1086.52V108.036Z"
  ];

  // Window hole geometries for rejection sampling (interior particles excluded)
  const BRIDGE_WINDOW_HOLES = [
    { type:'arch', cx:232.774, cy:179.074, rx:8.323, ry:8.323, y0:179.074, y1:191.279, x0:224.451, x1:241.098 },
    { type:'rect', x0:220.170, y0:127.271, x1:245.386, y1:135.675 },
    { type:'arch', cx:175.069, cy:159.842, rx:8.323, ry:8.323, y0:159.842, y1:172.044, x0:166.746, x1:183.396 },
    { type:'rect', x0:162.464, y0:108.036, x1:187.680, y1:116.440 },
    { type:'arch', cx:1021.29, cy:179.074, rx:8.323, ry:8.323, y0:179.074, y1:191.279, x0:1012.97, x1:1029.62 },
    { type:'rect', x0:1008.68, y0:127.271, x1:1033.90, y1:135.675 },
    { type:'arch', cx:1073.91, cy:159.842, rx:8.323, ry:8.323, y0:159.842, y1:172.044, x0:1065.59, x1:1082.24 },
    { type:'rect', x0:1061.31, y0:108.036, x1:1086.52, y1:116.440 }
  ];

  // Helper: check if SVG point (sx, sy) lands inside a window hole
  function isInsideWindowHole(sx, sy) {
    for (let i = 0; i < BRIDGE_WINDOW_HOLES.length; i++) {
      const h = BRIDGE_WINDOW_HOLES[i];
      if (h.type === 'rect') {
        if (sx >= h.x0 && sx <= h.x1 && sy >= h.y0 && sy <= h.y1) return true;
      } else {
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

  // --- Particle Sizing & Counts ---
  const isMobile = window.innerWidth < 768;
  let NUM_PARTICLES = isMobile ? 55000 : 115000;
  const NUM_BG_DUST = 850;

  // --- Timing Configuration (Continuous Smooth Morph Loop) ---
  const HOLD_BRIDGE_DURATION = 4.0;   // seconds admiring the bridge
  const MORPH_TO_RIBBON_DURATION = 2.0; // bridge -> ribbon
  const MORPH_TO_LOGO_DURATION = 2.2;   // ribbon -> logo
  const HOLD_LOGO_DURATION = 4.0;     // seconds admiring the logo
  const MORPH_BACK_RIBBON = 2.0;      // logo -> ribbon
  const MORPH_BACK_BRIDGE = 2.0;      // ribbon -> bridge
  const TOTAL_CYCLE = HOLD_BRIDGE_DURATION + MORPH_TO_RIBBON_DURATION + MORPH_TO_LOGO_DURATION + HOLD_LOGO_DURATION + MORPH_BACK_RIBBON + MORPH_BACK_BRIDGE;

  const canvas = document.getElementById('c');
  let gl = canvas.getContext('webgl', { alpha: true, antialias: false, depth: false });
  if (!gl) gl = canvas.getContext('experimental-webgl');

  let W = window.innerWidth;
  let H = window.innerHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  // Pointer Tracker (cleans up completely when leaving)
  const pointer = {
    x: -9999,
    y: -9999,
    targetX: -9999,
    targetY: -9999,
    down: 0.0,
    force: 0.0,
    active: false,
    lastTime: 0
  };

  // Timeline State
  let startTime = performance.now();
  let animId = null;
  let isPaused = false;
  let frameCount = 0;
  let lastFpsCheck = performance.now();

  // WebGL Program & Buffers
  let program, dustProgram;
  let posBridgeBuffer, posRibbonBuffer, posLogoBuffer, delayBuffer, pSizeBuffer, partIdBuffer;
  let dustBuffer;

  // --- Vertex Shader for Main Particle Morph Cloud ---
  const vsSource = `
    precision highp float;

    attribute vec3 aPosBridge;
    attribute vec3 aPosRibbon;
    attribute vec3 aPosLogo;
    attribute float aDelay;
    attribute float aSize;
    attribute float aPartId; // 0.0 = other, 1.0 = deck, 2.0 = arch

    uniform mat4 uProjection;
    uniform float uTime;
    uniform float uMorphPhase; // 0.0 = bridge, 0.5 = ribbon, 1.0 = logo
    uniform float uMotionEnabled; // 1.0 = enabled, 0.0 = prefers-reduced-motion
    uniform vec2 uPointer;
    uniform float uPointerRadius;
    uniform float uPointerForce;
    uniform vec2 uResolution;
    uniform float uDpr;

    uniform vec4 uBoxLeft;  // vec4(minX, minY, maxX, maxY) in canvas coords
    uniform vec4 uBoxRight; // vec4(minX, minY, maxX, maxY) in canvas coords
    uniform float uPad;     // 2vw padding

    varying float vAlpha;
    varying float vDepth;
    varying float vGlowBoost;
    varying float vDeckPulse;

    // Smooth cubic easing
    float ease(float t) {
      t = clamp(t, 0.0, 1.0);
      return t * t * (3.0 - 2.0 * t);
    }

    float distToBox(vec2 p, vec4 b) {
      vec2 d = max(b.xy - p, p - b.zw);
      return max(d.x, d.y);
    }

    float calcTextFade(vec2 p, vec4 b, float pad) {
      if (b.z < -5000.0) return 1.0;
      vec4 expBox = vec4(b.xy - pad, b.zw + pad);
      float d = distToBox(p, expBox);
      if (d <= 0.0) {
        return 0.25;
      } else if (d < pad) {
        return mix(0.25, 1.0, smoothstep(0.0, pad, d));
      }
      return 1.0;
    }

    void main() {
      // Local time offset per particle so they do not all move at once
      float localDelay = aDelay * 0.22;
      float phase = clamp((uMorphPhase - localDelay) / (1.0 - 0.22), 0.0, 1.0);

      vec3 pos;
      if (phase < 0.5) {
        float t = ease(phase * 2.0);
        pos = mix(aPosBridge, aPosRibbon, t);
      } else {
        float t = ease((phase - 0.5) * 2.0);
        pos = mix(aPosRibbon, aPosLogo, t);
      }

      // Continuous gentle drift
      float wave = sin(uTime * 1.3 + pos.x * 0.015 + aDelay * 6.28) * 1.4;
      float waveZ = cos(uTime * 1.1 + pos.y * 0.015) * 2.2;
      pos.y += wave;
      pos.z += waveZ;

      // Soft smoothstep repel falloff (no hard ring or stuck holes)
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

      // --- PATHWAY MOTION (Bridge State Only) ---
      float glowBoost = 0.0;
      float sizeBoost = 0.0;
      float deckPulseVal = 0.0;

      // Fades out as morph begins, fully gone by ribbon phase
      float morphProgress = clamp(uMorphPhase / 0.35, 0.0, 1.0);
      float effectFade = (1.0 - morphProgress) * uMotionEnabled;

      if (effectFade > 0.001) {
        float normX = pos.x / uResolution.x + 0.5; // [0.0 .. 1.0]

        // 1. DECK PULSES (partId == 1.0) - Vibrant Tiger Orange pulses
        // Tweakable: deckPeriod = 7s (5s travel + 2s pause), halfWidth = 0.05 (0.10W wide), boost = +50%
        if (aPartId > 0.5 && aPartId < 1.5) {
          float deckPeriod = 7.0;  // 5s travel + 2s pause
          float deckTravel = 5.0;  // 5s travel time
          float halfWidth  = 0.06; // soft pulse width

          // First pulse
          float t1 = mod(uTime, deckPeriod);
          float bump1 = 0.0;
          if (t1 < deckTravel) {
            float center1 = mix(-0.05, 1.05, t1 / deckTravel);
            bump1 = smoothstep(halfWidth, 0.0, abs(normX - center1));
          }

          // Second pulse (started 2.5s after first)
          float t2 = mod(uTime + deckPeriod - 2.5, deckPeriod);
          float bump2 = 0.0;
          if (t2 < deckTravel) {
            float center2 = mix(-0.05, 1.05, t2 / deckTravel);
            bump2 = smoothstep(halfWidth, 0.0, abs(normX - center2));
          }

          float deckPulse = max(bump1, bump2);
          deckPulseVal = deckPulse * effectFade;
          glowBoost += deckPulse * 0.65 * effectFade;
          sizeBoost += deckPulse * 0.35 * effectFade;
        }

        // 2. ARCH GLOW (partId == 2.0)
        // Tweakable: archPeriod = 12s (8s travel + 4s pause), boost = +30%
        if (aPartId > 1.5 && aPartId < 2.5) {
          float archPeriod = 12.0; // 8s wave + 4s pause
          float archTravel = 8.0;  // 8s wave time
          float archHalfW  = 0.15; // soft wave width

          // Normalized coordinate along arch span from left leg (0.30W) to right leg (0.70W)
          float archNormX = (normX - 0.30) / 0.40;

          float tArch = mod(uTime, archPeriod);
          float archPulse = 0.0;
          if (tArch < archTravel) {
            float archCenter = mix(-0.15, 1.15, tArch / archTravel);
            archPulse = smoothstep(archHalfW, 0.0, abs(archNormX - archCenter));
          }

          glowBoost += archPulse * 0.30 * effectFade;
          sizeBoost += archPulse * 0.15 * effectFade;
        }
      }

      vDeckPulse = deckPulseVal;

      vec4 clip = uProjection * vec4(pos, 1.0);
      gl_Position = clip;

      // Point size varies with distance, device pixel ratio, and pathway motion
      float pSize = aSize * (1.0 + sizeBoost) * uDpr * (480.0 / (480.0 - pos.z));
      gl_PointSize = clamp(pSize, 1.3 * uDpr, 4.6 * uDpr);

      // Depth brightness calculation + subtle glow boost
      vDepth = (pos.z + 60.0) / 120.0;
      vAlpha = clamp((0.40 + vDepth * 0.52) * (1.0 + glowBoost), 0.30, 1.55);
      vGlowBoost = glowBoost;

      // Text block readability safety fade (25% alpha inside box + 2vw padding with smoothstep)
      if (uResolution.x > 900.0) {
        float fL = calcTextFade(pos.xy, uBoxLeft, uPad);
        float fR = calcTextFade(pos.xy, uBoxRight, uPad);
        vAlpha *= min(fL, fR);
      }
    }
  `;

  // --- Fragment Shader for Additive Glowing Dust Points ---
  const fsSource = `
    precision highp float;

    varying float vAlpha;
    varying float vDepth;
    varying float vGlowBoost;
    varying float vDeckPulse;

    void main() {
      // Round point with soft luminous falloff
      vec2 coord = gl_PointCoord - vec2(0.5);
      float distSq = dot(coord, coord);
      if (distSq > 0.25) discard;

      float edge = 1.0 - (distSq * 4.0);
      edge = pow(edge, 0.65);

      // Brand Glow Palette: Deep Teal (#2eb78c), Luminous Aqua (#3ff0c8), Bright Mint Core (#e0fff5)
      vec3 colDeep = vec3(0.18, 0.78, 0.58);
      vec3 colTeal = vec3(0.28, 0.96, 0.82);
      vec3 colMint = vec3(0.92, 1.0, 0.96);

      // Brand Tiger Orange (#f88404) & Warm Amber Core (#ffe8b5) for Travelling Deck Pulses
      vec3 colOrangeDeep = vec3(0.98, 0.52, 0.02);
      vec3 colOrangeCore = vec3(1.0, 0.85, 0.50);

      // Default green/teal brand color
      vec3 color = mix(colDeep, colTeal, clamp(vDepth, 0.0, 1.0));
      color = mix(color, colMint, clamp(edge * 0.70 + vGlowBoost * 0.35, 0.0, 1.0));

      // Travelling deck light pulse: smooth transition to bright Tiger Orange
      if (vDeckPulse > 0.001) {
        vec3 pulseColor = mix(colOrangeDeep, colOrangeCore, edge * 0.90);
        color = mix(color, pulseColor, clamp(vDeckPulse * 1.6, 0.0, 1.0));
      }

      // Direct additive light emission
      gl_FragColor = vec4(color * (vAlpha * edge), 1.0);
    }
  `;

  // --- Background Star Dust Shaders ---
  const vsDust = `
    precision highp float;
    attribute vec3 aPos;
    attribute float aPhase;
    uniform mat4 uProjection;
    uniform float uTime;
    uniform float uDpr;
    varying float vAlpha;
    void main() {
      gl_Position = uProjection * vec4(aPos, 1.0);
      gl_PointSize = 1.6 * uDpr;
      vAlpha = 0.22 + 0.32 * sin(uTime * 0.8 + aPhase);
    }
  `;
  const fsDust = `
    precision highp float;
    varying float vAlpha;
    void main() {
      vec2 coord = gl_PointCoord - vec2(0.5);
      if (dot(coord, coord) > 0.25) discard;
      gl_FragColor = vec4(vec3(0.35, 0.95, 0.82) * vAlpha, 1.0);
    }
  `;

  // --- Shader Helper ---
  function createShader(gl, type, source) {
    const s = gl.createShader(type);
    gl.shaderSource(s, source);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(s));
      gl.deleteShader(s);
      return null;
    }
    return s;
  }

  function createProgram(gl, vs, fs) {
    const p = gl.createProgram();
    gl.attachShader(p, createShader(gl, gl.VERTEX_SHADER, vs));
    gl.attachShader(p, createShader(gl, gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(p);
    return p;
  }

  // --- Generate 1. Arch Bridge from bridge.svg ---
  // Fix Round 2: Real 2.2:1 SVG Proportions, 0.27W-0.73W span, apex at ~0.42H, pylons top 0.62H, viaduct piers outside pylons.
  // Fix Round 3: Arch legs 0.30W-0.70W, mirror viaduct piers, and Pathway motion tagging (partId: 1.0 deck, 2.0 arch, 0.0 other).
  function generateBridgeCloud(count, width, height) {
    const pts = new Float32Array(count * 3);
    const partIds = new Float32Array(count);
    let idx = 0;

    function addPt(hx, hy, hz, partId) {
      if (idx + 3 > pts.length) return;
      const pIdx = idx / 3;
      pts[idx++] = hx;
      pts[idx++] = hy;
      pts[idx++] = hz;
      partIds[pIdx] = partId;
    }

    const isPhone = width < 500;
    const isTablet = width >= 500 && width < 900;

    // 1. Arch Placement (Fixed numbers)
    // Desktop: arch legs at x = 0.30W and x = 0.70W (0.40W wide)
    // Tablet: 0.16W to 0.84W | Phone: 0.08W to 0.92W
    const ARCH_LEG_L_FRAC = isPhone ? 0.08 : (isTablet ? 0.16 : 0.30);
    const ARCH_LEG_R_FRAC = isPhone ? 0.92 : (isTablet ? 0.84 : 0.70);

    const archLeftX = ARCH_LEG_L_FRAC * width;
    const archRightX = ARCH_LEG_R_FRAC * width;

    // 2. Baselines Configuration
    const DECK_FRAC       = 0.74; // Deck at 0.74H
    const GROUND_FRAC     = 0.88; // Ground line at 0.88H
    const PYLON_TOP_FRAC  = 0.62; // Pylon tops at about 0.62H (rising above deck, below text)
    const ARCH_APEX_FRAC  = 0.42; // Arch apex at 0.42H (preserves real 2.2:1 SVG aspect ratio)

    // SVG Reference Dimensions
    const SVG_ARCH_X0 = 271.912;
    const SVG_ARCH_X1 = 986.956;
    const SVG_ARCH_W  = SVG_ARCH_X1 - SVG_ARCH_X0; // 715.044

    // Single Uniform Horizontal Scale for arch, hangers, lattice, and pylons
    const scaleX = (archRightX - archLeftX) / SVG_ARCH_W;

    // Unified Coordinate Mapping: Arch, Hangers, Lattice
    function mapArchPoint(sx, sy) {
      const screenX = archLeftX + (sx - SVG_ARCH_X0) * scaleX;
      let screenY;
      if (sy <= 185.575) {
        const t = Math.max(0, Math.min(1, (sy - 0.275) / (185.575 - 0.275)));
        screenY = (ARCH_APEX_FRAC + t * (DECK_FRAC - ARCH_APEX_FRAC)) * height;
      } else {
        const t = Math.max(0, Math.min(1, (sy - 185.575) / (328.356 - 185.575)));
        screenY = (DECK_FRAC + t * (GROUND_FRAC - DECK_FRAC)) * height;
      }
      return [screenX - width * 0.5, screenY - height * 0.5];
    }

    // Unified Coordinate Mapping: Pylons & Windows (Uniform scale with arch)
    function mapPylonPoint(sx, sy) {
      const screenX = archLeftX + (sx - SVG_ARCH_X0) * scaleX;
      let screenY;
      if (sy <= 185.575) {
        const t = Math.max(0, Math.min(1, (sy - 82.384) / (185.575 - 82.384)));
        screenY = (PYLON_TOP_FRAC + t * (DECK_FRAC - PYLON_TOP_FRAC)) * height;
      } else {
        const t = Math.max(0, Math.min(1, (sy - 185.575) / (328.355 - 185.575)));
        screenY = (DECK_FRAC + t * (GROUND_FRAC - DECK_FRAC)) * height;
      }
      return [screenX - width * 0.5, screenY - height * 0.5];
    }

    // Helper: SVG Path Creator
    const svgNS = 'http://www.w3.org/2000/svg';
    function makePath(d) {
      const el = document.createElementNS(svgNS, 'path');
      el.setAttribute('d', d);
      return el;
    }

    function samplePath(el, budget, mapFn, jitter, zRange, zPush, partId) {
      const len = el.getTotalLength();
      if (len < 1) return;
      for (let i = 0; i < budget; i++) {
        if (idx + 3 > pts.length) return;
        const t = Math.random() * len;
        const pt = el.getPointAtLength(t);
        const [hx, hy] = mapFn(pt.x, pt.y);
        addPt(
          hx + (Math.random() - 0.5) * jitter,
          hy + (Math.random() - 0.5) * jitter,
          (Math.random() - 0.5) * zRange + (zPush || 0),
          partId
        );
      }
    }

    // --- PARTICLE BUDGET ALLOCATION ---
    const b_archRibs   = Math.round(count * 0.28);
    const b_zigzag     = Math.round(count * 0.16);
    const b_hangers    = Math.round(count * 0.14);
    const b_lattice    = Math.round(count * 0.10);
    const b_deck       = Math.round(count * 0.12);
    const b_ground     = Math.round(count * 0.05);
    const b_pylons     = isPhone ? Math.round(count * 0.04) : Math.round(count * 0.10);
    const b_viaduct    = isPhone ? 0 : Math.round(count * 0.05);

    // ======== 1. ARCH RIBS (Outer & Inner Curves + Wide Feet: partId = 2.0) ========
    {
      const outerPath = makePath(BRIDGE_ARCH_OUTER);
      const innerPath = makePath(BRIDGE_ARCH_INNER);
      const budgetOuter = Math.round(b_archRibs * 0.55);
      const budgetInner = b_archRibs - budgetOuter;

      for (let i = 0; i < budgetOuter; i++) {
        if (idx + 3 > pts.length) break;
        const len = outerPath.getTotalLength();
        const t = Math.random() < 0.32 ? (0.32 + Math.random() * 0.36) * len : Math.random() * len;
        const pt = outerPath.getPointAtLength(t);
        const [hx, hy] = mapArchPoint(pt.x, pt.y);
        addPt(
          hx + (Math.random() - 0.5) * 1.5,
          hy + (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 20.0 + 4.0,
          2.0
        );
      }

      for (let i = 0; i < budgetInner; i++) {
        if (idx + 3 > pts.length) break;
        const len = innerPath.getTotalLength();
        const t = Math.random() * len;
        const pt = innerPath.getPointAtLength(t);
        const [hx, hy] = mapArchPoint(pt.x, pt.y);
        addPt(
          hx + (Math.random() - 0.5) * 1.5,
          hy + (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 16.0 + 2.0,
          2.0
        );
      }

      // Arch Footings (preserve 9px SVG foot width landing firmly on ground line)
      const bFeet = Math.round(count * 0.015);
      for (let i = 0; i < bFeet; i++) {
        if (idx + 3 > pts.length) break;
        const isLeftFoot = Math.random() < 0.5;
        const sx = isLeftFoot ? (271.912 + Math.random() * 10.846) : (978.671 + Math.random() * 8.285);
        const sy = 315.0 + Math.random() * 13.356;
        const [hx, hy] = mapArchPoint(sx, sy);
        addPt(
          hx + (Math.random() - 0.5) * 1.2,
          hy + (Math.random() - 0.5) * 1.2,
          (Math.random() - 0.5) * 16.0 + 3.0,
          2.0
        );
      }
    }

    // ======== 2. ZIGZAG OUTLINE CURVES (partId = 2.0) ========
    {
      const paths = [
        makePath(BRIDGE_ZIGZAG_UPPER),
        makePath(BRIDGE_ZIGZAG_LOWER_L),
        makePath(BRIDGE_ZIGZAG_LOWER_R)
      ];
      const budgetEach = Math.round(b_zigzag / 3);
      for (const p of paths) {
        samplePath(p, budgetEach, mapArchPoint, 1.4, 14, 2.0, 2.0);
      }
    }

    // ======== 3. VERTICAL HANGERS (partId = 2.0) ========
    {
      const budgetPerHanger = Math.max(1, Math.round(b_hangers / BRIDGE_HANGERS.length));
      for (const [x0, y0, x1, y1] of BRIDGE_HANGERS) {
        const el = makePath(`M${x0} ${y0} L${x1} ${y1}`);
        const len = el.getTotalLength();
        for (let i = 0; i < budgetPerHanger; i++) {
          if (idx + 3 > pts.length) break;
          // 40% biased toward bottom deck intersection
          const t = Math.random() < 0.40 ? (0.65 + Math.random() * 0.35) * len : Math.random() * len;
          const pt = el.getPointAtLength(t);
          const [hx, hy] = mapArchPoint(pt.x, pt.y);
          addPt(
            hx + (Math.random() - 0.5) * 1.0,
            hy + (Math.random() - 0.5) * 1.0,
            (Math.random() - 0.5) * 12.0,
            2.0
          );
        }
      }
    }

    // ======== 4. DIAGONAL LATTICE LINES (partId = 2.0) ========
    {
      const budgetPerLine = Math.max(1, Math.round(b_lattice / BRIDGE_LATTICE.length));
      for (const [x0, y0, x1, y1] of BRIDGE_LATTICE) {
        const el = makePath(`M${x0} ${y0} L${x1} ${y1}`);
        samplePath(el, budgetPerLine, mapArchPoint, 1.2, 10, 0.0, 2.0);
      }
    }

    // ======== 5. DECK BARS (partId = 1.0) ========
    {
      const deckCanvasY1 = (DECK_FRAC - 0.5) * height;
      const deckCanvasY2 = deckCanvasY1 + 3.5;
      const dxL = -0.52 * width;
      const dxR =  0.52 * width;

      const bMain = Math.round(b_deck * 0.45);
      const bLow  = Math.round(b_deck * 0.35);
      const bJunc = b_deck - bMain - bLow;

      // Row 1 (Main deck line)
      for (let i = 0; i < bMain; i++) {
        if (idx + 3 > pts.length) break;
        addPt(
          dxL + Math.random() * (dxR - dxL),
          deckCanvasY1 + (Math.random() - 0.5) * 1.2,
          (Math.random() - 0.5) * 14.0 + 3.0,
          1.0
        );
      }

      // Row 2 (Faint secondary deck line)
      for (let i = 0; i < bLow; i++) {
        if (idx + 3 > pts.length) break;
        addPt(
          dxL + Math.random() * (dxR - dxL),
          deckCanvasY2 + (Math.random() - 0.5) * 1.2,
          (Math.random() - 0.5) * 12.0,
          1.0
        );
      }

      // Hanger-to-Deck Junction Glow Reinforcements
      const juncPerHanger = Math.max(1, Math.round(bJunc / BRIDGE_HANGERS.length));
      for (const [hxSvg] of BRIDGE_HANGERS) {
        const [juncX, juncY] = mapArchPoint(hxSvg, 185.575);
        for (let j = 0; j < juncPerHanger; j++) {
          if (idx + 3 > pts.length) break;
          addPt(
            juncX + (Math.random() - 0.5) * 4.0,
            juncY + (Math.random() - 0.5) * 2.5,
            (Math.random() - 0.5) * 10.0 + 6.0,
            1.0
          );
        }
      }
    }

    // ======== 6. GROUND LINE (partId = 0.0) ========
    {
      const groundCanvasY = (GROUND_FRAC - 0.5) * height;
      const gxL = -0.52 * width;
      const gxR =  0.52 * width;
      for (let i = 0; i < b_ground; i++) {
        if (idx + 3 > pts.length) break;
        addPt(
          gxL + Math.random() * (gxR - gxL),
          groundCanvasY + (Math.random() - 0.5) * 1.4,
          (Math.random() - 0.5) * 14.0,
          0.0
        );
      }
    }

    // ======== 7. PYLONS (partId = 0.0) ========
    if (b_pylons > 0) {
      const PYLON_Z_BASE = -16.0;

      // 7A. Windows Edge Glow
      const windowBudgetTotal = Math.round(b_pylons * 0.20);
      const budgetPerWin = Math.max(1, Math.round(windowBudgetTotal / BRIDGE_WINDOW_PATHS.length));
      for (const winD of BRIDGE_WINDOW_PATHS) {
        const winEl = makePath(winD);
        samplePath(winEl, budgetPerWin, mapPylonPoint, 0.8, 6.0, PYLON_Z_BASE + 6.0, 0.0);
      }

      // 7B. Pylon Building Outlines
      const outlineBudgetTotal = Math.round(b_pylons * 0.65);
      const budgetPerOutline = Math.max(1, Math.round(outlineBudgetTotal / BRIDGE_PYLON_OUTLINES.length));
      for (const pylonD of BRIDGE_PYLON_OUTLINES) {
        const pylonEl = makePath(pylonD);
        samplePath(pylonEl, budgetPerOutline, mapPylonPoint, 1.0, 8.0, PYLON_Z_BASE, 0.0);
      }

      // 7C. Pylon Interior Fill
      const fillBudgetTotal = b_pylons - windowBudgetTotal - outlineBudgetTotal;
      const PYLON_BBOXES = [
        { x0: 188.657, x1: 276.893, y0: 101.618, y1: 328.356 }, // inner-left
        { x0: 130.153, x1: 219.988, y0: 82.384,  y1: 328.354 }, // outer-left
        { x0: 977.172, x1: 1065.41, y0: 101.618, y1: 328.356 }, // inner-right
        { x0: 1028.99, x1: 1118.83, y0: 82.384,  y1: 328.354 }  // outer-right
      ];

      const fillPerPylon = Math.max(1, Math.round(fillBudgetTotal / PYLON_BBOXES.length));
      for (const bbox of PYLON_BBOXES) {
        let placed = 0;
        let attempts = 0;
        while (placed < fillPerPylon && attempts < fillPerPylon * 12) {
          attempts++;
          const sx = bbox.x0 + Math.random() * (bbox.x1 - bbox.x0);
          const sy = bbox.y0 + Math.random() * (bbox.y1 - bbox.y0);

          if (isInsideWindowHole(sx, sy)) continue;

          const [hx, hy] = mapPylonPoint(sx, sy);
          if (idx + 3 > pts.length) break;

          addPt(
            hx + (Math.random() - 0.5) * 1.0,
            hy + (Math.random() - 0.5) * 1.0,
            PYLON_Z_BASE + (Math.random() - 0.5) * 6.0,
            0.0
          );
          placed++;
        }
      }
    }

    // ======== 8. VIADUCT PIERS (Exact Mirror Symmetry: partId = 0.0) ========
    if (b_viaduct > 0) {
      const leftPylonOuterX = archLeftX + (130.153 - SVG_ARCH_X0) * scaleX;
      const rightPylonOuterX = archLeftX + (1118.83 - SVG_ARCH_X0) * scaleX;
      const pylonDistFromCenter = Math.max(
        Math.abs(leftPylonOuterX - width * 0.5),
        Math.abs(rightPylonOuterX - width * 0.5)
      );

      const step = width * 0.035;
      const pierOffsets = [];
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
              const t = Math.random();
              const py = deckCanvasY + t * (groundCanvasY - deckCanvasY);
              addPt(
                canvasX + (Math.random() - 0.5) * 1.8,
                py + (Math.random() - 0.5) * 1.0,
                pierZ + (Math.random() - 0.5) * 6.0,
                0.0
              );
            }
          }
        }
      }
    }

    // ======== 9. FILL ANY REMAINING PARTICLES WITH DECK PARTICLES (partId = 1.0) ========
    {
      const deckCanvasY1 = (DECK_FRAC - 0.5) * height;
      const dxL = -0.52 * width;
      const dxR =  0.52 * width;
      while (idx < count * 3) {
        addPt(
          dxL + Math.random() * (dxR - dxL),
          deckCanvasY1 + (Math.random() - 0.5) * 1.8,
          (Math.random() - 0.5) * 14.0,
          1.0
        );
      }
    }

    return { pts, partIds };
  }


  // --- Generate 2. Flowing 3D Ribbon Intermediate State ---
  function generateRibbonCloud(count, width, height) {
    const pts = new Float32Array(count * 3);
    const radiusX = width * (width < 900 ? 0.38 : 0.26);
    const radiusY = height * 0.36;
    let idx = 0;

    for (let i = 0; i < count; i++) {
      const u = Math.random() * Math.PI * 2.0;
      const v = (Math.random() - 0.5) * 2.0;

      // Parametric 3D Ribbon
      const x = Math.cos(u) * (radiusX + v * 35.0 * Math.cos(u * 0.5));
      const y = Math.sin(u) * (radiusY + v * 28.0 * Math.sin(u * 0.5)) + Math.sin(u * 2.0) * 30.0;
      const z = v * 55.0 * Math.sin(u * 0.5) + Math.cos(u * 3.0) * 25.0;

      // Density bunching along folds
      const foldNoise = (Math.random() - 0.5) * (1.0 + Math.sin(u * 3.0)) * 5.0;

      pts[idx++] = x + foldNoise;
      pts[idx++] = y + foldNoise;
      pts[idx++] = z + foldNoise;
    }
    return pts;
  }

  // --- Generate 3. Exact NYEIB Logo (Centered, 80-88% Height, Glowing Edges) ---
  function generateLogoCloud(count, width, height) {
    const offWidth = 1000;
    const offHeight = Math.round(offWidth * (SVG_VB_HEIGHT / SVG_VB_WIDTH));

    const offCanvas = document.createElement('canvas');
    offCanvas.width = offWidth;
    offCanvas.height = offHeight;
    const ctx = offCanvas.getContext('2d', { willReadFrequently: true });

    ctx.clearRect(0, 0, offWidth, offHeight);
    ctx.fillStyle = '#ffffff';

    const scale = offWidth / SVG_VB_WIDTH;
    ctx.save();
    ctx.scale(scale, scale);
    SVG_PATHS.forEach(p => ctx.fill(new Path2D(p)));
    ctx.restore();

    const imgData = ctx.getImageData(0, 0, offWidth, offHeight).data;

    // Fast check if pixel is inside logo
    function isInside(px, py) {
      if (px < 0 || px >= offWidth || py < 0 || py >= offHeight) return false;
      return imgData[(py * offWidth + px) * 4 + 3] > 120;
    }

    // Distance to edge estimation
    function getEdgeDistance(px, py) {
      let minDist = 20;
      for (let r = 1; r <= 14; r += 2) {
        if (!isInside(px + r, py) || !isInside(px - r, py) || !isInside(px, py + r) || !isInside(px, py - r)) {
          return r;
        }
      }
      return minDist;
    }

    // Sizing: 80% to 88% of hero height, centered horizontally & vertically
    let logoHeight = height * (width < 900 ? 0.65 : 0.84);
    let logoWidth = logoHeight * (SVG_VB_WIDTH / SVG_VB_HEIGHT);

    // Keep margin from side text columns on desktop
    const maxLogoWidth = width * (width < 900 ? 0.80 : 0.44);
    if (logoWidth > maxLogoWidth) {
      logoWidth = maxLogoWidth;
      logoHeight = logoWidth * (SVG_VB_HEIGHT / SVG_VB_WIDTH);
    }

    const pts = new Float32Array(count * 3);
    let idx = 0;

    // Rejection sampling for fine dust distribution
    while (idx < count * 3) {
      const rx = Math.floor(Math.random() * offWidth);
      const ry = Math.floor(Math.random() * offHeight);

      const inside = isInside(rx, ry);
      const edgeDist = inside ? getEdgeDistance(rx, ry) : 99;

      let keep = false;
      let jitter = 0.5;

      if (inside) {
        if (edgeDist <= 6) {
          // 65% points bunch up near the edges for luminous contours
          keep = Math.random() < 0.95;
          jitter = 0.8;
        } else {
          // 35% points softer in the interior
          keep = Math.random() < 0.35;
          jitter = 1.4;
        }
      } else {
        // 10% faint halo points just outside the contours
        if (isInside(rx + 3, ry) || isInside(rx - 3, ry) || isInside(rx, ry + 3) || isInside(rx, ry - 3)) {
          keep = Math.random() < 0.14;
          jitter = 2.4;
        }
      }

      if (keep) {
        // Centered horizontally and vertically in hero
        const normX = (rx / offWidth - 0.5) * logoWidth;
        const normY = (ry / offHeight - 0.5) * logoHeight;

        // Subtle curved depth
        const depth = Math.sin((rx / offWidth) * Math.PI) * 25.0 + (Math.random() - 0.5) * 8.0;

        pts[idx++] = normX + (Math.random() - 0.5) * jitter;
        pts[idx++] = normY + (Math.random() - 0.5) * jitter;
        pts[idx++] = depth;
      }
    }

    return pts;
  }

  // --- Generate Faint Background Dust ---
  function generateDustPoints(count, width, height) {
    const pts = new Float32Array(count * 4); // x, y, z, phase
    let idx = 0;
    for (let i = 0; i < count; i++) {
      pts[idx++] = (Math.random() - 0.5) * width * 1.2;
      pts[idx++] = (Math.random() - 0.5) * height * 1.2;
      pts[idx++] = (Math.random() - 0.5) * 80.0;
      pts[idx++] = Math.random() * Math.PI * 2.0;
    }
    return pts;
  }

  // Text Bounding Boxes for WebGL Readability Safety Fade
  const boxLeft = new Float32Array([-99999, -99999, -99999, -99999]);
  const boxRight = new Float32Array([-99999, -99999, -99999, -99999]);
  let textPad = 0.0;

  function updateTextBoxes() {
    if (W <= 900) {
      boxLeft.set([-99999, -99999, -99999, -99999]);
      boxRight.set([-99999, -99999, -99999, -99999]);
      textPad = 0.0;
      return;
    }
    textPad = W * 0.02; // 2vw
    const elLeft = document.querySelector('.hero-col-left');
    const elRight = document.querySelector('.hero-col-right');
    const cRect = canvas.getBoundingClientRect();

    if (elLeft) {
      const r = elLeft.getBoundingClientRect();
      const minX = (r.left - cRect.left) - W * 0.5;
      const minY = (r.top - cRect.top) - H * 0.5;
      const maxX = (r.right - cRect.left) - W * 0.5;
      const maxY = (r.bottom - cRect.top) - H * 0.5;
      boxLeft.set([minX, minY, maxX, maxY]);
    }
    if (elRight) {
      const r = elRight.getBoundingClientRect();
      const minX = (r.left - cRect.left) - W * 0.5;
      const minY = (r.top - cRect.top) - H * 0.5;
      const maxX = (r.right - cRect.left) - W * 0.5;
      const maxY = (r.bottom - cRect.top) - H * 0.5;
      boxRight.set([minX, minY, maxX, maxY]);
    }
  }

  // --- Build & Bind WebGL Buffers ---
  function setupWebGL() {
    W = window.innerWidth;
    H = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    updateTextBoxes();

    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE); // Direct additive light emission

    program = createProgram(gl, vsSource, fsSource);
    dustProgram = createProgram(gl, vsDust, fsDust);

    // Generate Point Clouds
    const bridgeData = generateBridgeCloud(NUM_PARTICLES, W, H);
    const bridgePts = bridgeData.pts;
    const partIds = bridgeData.partIds;
    const ribbonPts = generateRibbonCloud(NUM_PARTICLES, W, H);
    const logoPts = generateLogoCloud(NUM_PARTICLES, W, H);

    // Delays & Sizes
    const delays = new Float32Array(NUM_PARTICLES);
    const sizes = new Float32Array(NUM_PARTICLES);
    for (let i = 0; i < NUM_PARTICLES; i++) {
      delays[i] = Math.random();
      sizes[i] = 1.2 + Math.random() * 0.9;
    }

    // Main Buffers
    posBridgeBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBridgeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, bridgePts, gl.STATIC_DRAW);

    partIdBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, partIdBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, partIds, gl.STATIC_DRAW);

    posRibbonBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posRibbonBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, ribbonPts, gl.STATIC_DRAW);

    posLogoBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posLogoBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, logoPts, gl.STATIC_DRAW);

    delayBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, delayBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, delays, gl.STATIC_DRAW);

    pSizeBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pSizeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);

    // Background Dust Buffer
    const dustPts = generateDustPoints(NUM_BG_DUST, W, H);
    dustBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, dustBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, dustPts, gl.STATIC_DRAW);
  }

  // --- Projection Matrix ---
  function getOrthoProjection(width, height) {
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

  // --- Animation Render Loop ---
  function render() {
    if (isPaused) return;

    const now = performance.now();
    const time = (now - startTime) * 0.001;

    // Measure FPS and auto throttle if needed
    frameCount++;
    if (now - lastFpsCheck >= 1000) {
      const fps = (frameCount * 1000) / (now - lastFpsCheck);
      if (fps < 38 && NUM_PARTICLES > 45000) {
        NUM_PARTICLES = Math.round(NUM_PARTICLES * 0.7);
        setupWebGL();
      }
      frameCount = 0;
      lastFpsCheck = now;
    }

    // Pointer lerp and decay
    pointer.x += (pointer.targetX - pointer.x) * 0.12;
    pointer.y += (pointer.targetY - pointer.y) * 0.12;
    const pointerActive = (now - pointer.lastTime < 3000 && pointer.targetX > -5000);
    const targetForce = pointerActive ? (pointer.down > 0 ? 3.0 : 1.2) : 0.0;
    pointer.force += (targetForce - pointer.force) * 0.15;
    if (pointer.force < 0.001) pointer.force = 0.0;

    // Morph Stage Phase on continuous loop:
    // 0..4s: Bridge -> 4..6s: Ribbon -> 6..8.2s: Logo -> 8.2..12.2s: Hold Logo -> 12.2..14.2s: Ribbon -> 14.2..16.2s: Return to Bridge
    const cycleTime = time % TOTAL_CYCLE;
    let morphPhase = 0.0;
    const stageLabel = document.getElementById('stageLabel');

    const t1 = HOLD_BRIDGE_DURATION;
    const t2 = t1 + MORPH_TO_RIBBON_DURATION;
    const t3 = t2 + MORPH_TO_LOGO_DURATION;
    const t4 = t3 + HOLD_LOGO_DURATION;
    const t5 = t4 + MORPH_BACK_RIBBON;

    if (cycleTime < t1) {
      morphPhase = 0.0;
      if (stageLabel) stageLabel.textContent = "Bridge";
    } else if (cycleTime < t2) {
      const t = (cycleTime - t1) / MORPH_TO_RIBBON_DURATION;
      morphPhase = t * 0.5;
      if (stageLabel) stageLabel.textContent = "Swirling Ribbon";
    } else if (cycleTime < t3) {
      const t = (cycleTime - t2) / MORPH_TO_LOGO_DURATION;
      morphPhase = 0.5 + t * 0.5;
      if (stageLabel) stageLabel.textContent = "Assembling Logo";
    } else if (cycleTime < t4) {
      morphPhase = 1.0;
      if (stageLabel) stageLabel.textContent = "Official Logo";
    } else if (cycleTime < t5) {
      const t = (cycleTime - t4) / MORPH_BACK_RIBBON;
      morphPhase = 1.0 - t * 0.5; // 1.0 -> 0.5
      if (stageLabel) stageLabel.textContent = "Swirling Ribbon";
    } else {
      const t = (cycleTime - t5) / MORPH_BACK_BRIDGE;
      morphPhase = 0.5 - t * 0.5; // 0.5 -> 0.0
      if (stageLabel) stageLabel.textContent = "Returning to Bridge";
    }

    gl.clearColor(0.0, 0.192, 0.141, 1.0); // #003124 evergreen
    gl.clear(gl.COLOR_BUFFER_BIT);

    const proj = getOrthoProjection(W, H);

    // 1. Render Background Twinkling Dust
    gl.useProgram(dustProgram);
    gl.uniformMatrix4fv(gl.getUniformLocation(dustProgram, 'uProjection'), false, proj);
    gl.uniform1f(gl.getUniformLocation(dustProgram, 'uTime'), time);
    gl.uniform1f(gl.getUniformLocation(dustProgram, 'uDpr'), dpr);

    gl.bindBuffer(gl.ARRAY_BUFFER, dustBuffer);
    const aDustPos = gl.getAttribLocation(dustProgram, 'aPos');
    const aDustPhase = gl.getAttribLocation(dustProgram, 'aPhase');
    gl.enableVertexAttribArray(aDustPos);
    gl.enableVertexAttribArray(aDustPhase);
    gl.vertexAttribPointer(aDustPos, 3, gl.FLOAT, false, 16, 0);
    gl.vertexAttribPointer(aDustPhase, 1, gl.FLOAT, false, 16, 12);

    gl.drawArrays(gl.POINTS, 0, NUM_BG_DUST);
    gl.disableVertexAttribArray(aDustPos);
    gl.disableVertexAttribArray(aDustPhase);

    // 2. Render Main Fine Particle Cloud
    gl.useProgram(program);
    gl.uniformMatrix4fv(gl.getUniformLocation(program, 'uProjection'), false, proj);
    gl.uniform1f(gl.getUniformLocation(program, 'uTime'), time);
    gl.uniform1f(gl.getUniformLocation(program, 'uMorphPhase'), morphPhase);

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gl.uniform1f(gl.getUniformLocation(program, 'uMotionEnabled'), prefersReducedMotion ? 0.0 : 1.0);

    gl.uniform2f(gl.getUniformLocation(program, 'uPointer'), pointer.x, pointer.y);
    gl.uniform1f(gl.getUniformLocation(program, 'uPointerRadius'), pointer.down > 0 ? 160.0 : 120.0);
    gl.uniform1f(gl.getUniformLocation(program, 'uPointerForce'), pointer.force);
    gl.uniform2f(gl.getUniformLocation(program, 'uResolution'), W, H);
    gl.uniform1f(gl.getUniformLocation(program, 'uDpr'), dpr);

    // Text block bounding boxes state in canvas coords
    gl.uniform4fv(gl.getUniformLocation(program, 'uBoxLeft'), boxLeft);
    gl.uniform4fv(gl.getUniformLocation(program, 'uBoxRight'), boxRight);
    gl.uniform1f(gl.getUniformLocation(program, 'uPad'), textPad);

    // Bind Attributes
    const locBridge = gl.getAttribLocation(program, 'aPosBridge');
    const locPartId = gl.getAttribLocation(program, 'aPartId');
    const locRibbon = gl.getAttribLocation(program, 'aPosRibbon');
    const locLogo = gl.getAttribLocation(program, 'aPosLogo');
    const locDelay = gl.getAttribLocation(program, 'aDelay');
    const locSize = gl.getAttribLocation(program, 'aSize');

    gl.enableVertexAttribArray(locBridge);
    gl.bindBuffer(gl.ARRAY_BUFFER, posBridgeBuffer);
    gl.vertexAttribPointer(locBridge, 3, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(locPartId);
    gl.bindBuffer(gl.ARRAY_BUFFER, partIdBuffer);
    gl.vertexAttribPointer(locPartId, 1, gl.FLOAT, false, 0, 0);

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
    gl.bindBuffer(gl.ARRAY_BUFFER, pSizeBuffer);
    gl.vertexAttribPointer(locSize, 1, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.POINTS, 0, NUM_PARTICLES);

    gl.disableVertexAttribArray(locBridge);
    gl.disableVertexAttribArray(locPartId);
    gl.disableVertexAttribArray(locRibbon);
    gl.disableVertexAttribArray(locLogo);
    gl.disableVertexAttribArray(locDelay);
    gl.disableVertexAttribArray(locSize);

    animId = requestAnimationFrame(render);
  }

  // --- Pointer & Touch Handlers with Safe Clearance ---
  function updatePointer(clientX, clientY) {
    pointer.targetX = clientX - W / 2;
    pointer.targetY = clientY - H / 2;
    pointer.active = true;
    pointer.lastTime = performance.now();
  }

  function clearPointer() {
    pointer.targetX = -9999;
    pointer.targetY = -9999;
    pointer.active = false;
    pointer.down = 0.0;
  }

  window.addEventListener('mousemove', e => updatePointer(e.clientX, e.clientY));
  window.addEventListener('touchmove', e => {
    if (e.touches.length > 0) updatePointer(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  window.addEventListener('mousedown', () => { pointer.down = 1.0; });
  window.addEventListener('mouseup', () => { pointer.down = 0.0; });
  window.addEventListener('touchstart', e => {
    pointer.down = 1.0;
    if (e.touches.length > 0) updatePointer(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
  window.addEventListener('touchend', clearPointer);
  window.addEventListener('mouseleave', clearPointer);
  window.addEventListener('mouseout', e => { if (!e.relatedTarget) clearPointer(); });
  window.addEventListener('blur', clearPointer);
  document.addEventListener('mouseleave', clearPointer);

  // Replay Transition Action
  function restartAnimation() {
    startTime = performance.now();
  }

  const btnReplay = document.getElementById('btnReplay');
  if (btnReplay) {
    btnReplay.addEventListener('click', e => {
      e.preventDefault();
      restartAnimation();
    });
  }

  window.addEventListener('resize', () => {
    setupWebGL();
  });

  // Pause when tab hidden or off screen
  document.addEventListener('visibilitychange', () => {
    isPaused = document.hidden;
    if (!isPaused) {
      lastFpsCheck = performance.now();
      render();
    }
  });

  const heroSection = document.getElementById('hero');
  if (window.IntersectionObserver && heroSection) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        isPaused = !entry.isIntersecting;
        if (!isPaused) render();
      });
    });
    observer.observe(heroSection);
  }

  // Respect reduced motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    startTime = -999999;
  }

  // Init
  setupWebGL();
  render();

})();
