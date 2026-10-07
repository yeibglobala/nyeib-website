/**
 * Vertex & Fragment Shaders for the Nigeria YEIB WebGL Particle Cloud
 */

export const VS_MAIN_SOURCE = `
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

export const FS_MAIN_SOURCE = `
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

export const VS_DUST_SOURCE = `
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

export const FS_DUST_SOURCE = `
  precision highp float;
  varying float vAlpha;
  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    if (dot(coord, coord) > 0.25) discard;
    gl_FragColor = vec4(vec3(0.35, 0.95, 0.82) * vAlpha, 1.0);
  }
`;
