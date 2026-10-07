/**
 * WebGL Shaders for the Block 1 Dust Canvas GPU Particles
 * Dual-palette: Brand Emerald Green (#15835e) + Brand Tiger Orange (#f88404)
 * Subtle micro-repulsion physics matching the luxury hero feel
 */

export const VS_DUST_SOURCE = `
  precision highp float;

  attribute vec2 aTargetPos;  // Target position in normalized [0, 1] coordinates
  attribute vec2 aStartPos;   // Dispersed start position for entrance
  attribute float aSize;      // Particle base size
  attribute float aAlpha;     // Particle base alpha
  attribute float aSpeed;     // Floating wave speed
  attribute float aPhase;     // Phase offset
  attribute float aDrift;     // Drift amplitude
  attribute float aColorType; // 0.0 = Emerald Green, 1.0 = Tiger Orange

  uniform vec2 uResolution;
  uniform float uDpr;
  uniform float uTime;
  uniform float uEntrance;    // 0.0 to 1.0 entrance progress
  uniform vec2 uPointer;      // Pointer pos in canvas pixels
  uniform float uPointerActive;  // 1.0 if mouse is active, 0.0 otherwise
  uniform float uPointerRadius;  // Repel radius in pixels
  uniform float uPointerForce;   // Repel force

  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    // 1. Entrance easing (cubic ease out)
    float t = clamp(uEntrance, 0.0, 1.0);
    float ease = 1.0 - pow(1.0 - t, 3.0);

    // Convert normalized target to actual pixel coordinates
    vec2 targetPx = aTargetPos * uResolution;
    vec2 startPx = aStartPos * uResolution;

    // 2. Ambient sinusoidal drift on GPU
    float driftX = cos(uTime * aSpeed + aPhase) * (aDrift * 1.5);
    float driftY = sin(uTime * aSpeed * 0.85 + aPhase) * (aDrift * 1.5);
    targetPx += vec2(driftX, driftY);

    // Interpolate from start to target position
    vec2 currentPx = mix(startPx, targetPx, ease);

    // 3. Subtle & Gentle Pointer Repulsion (Soft organic ripple, no large empty crater)
    if (uPointerActive > 0.5) {
      vec2 diff = currentPx - uPointer;
      float dist = length(diff);
      if (dist < uPointerRadius && dist > 0.001) {
        float normDist = dist / uPointerRadius;
        // Smooth cubic falloff for natural liquid-like ripple
        float f = smoothstep(1.0, 0.0, normDist) * uPointerForce;
        currentPx += (diff / dist) * f * 14.0;
      }
    }

    // Convert pixel coordinates [0, width] x [0, height] to Clip Space [-1, 1]
    vec2 zeroToOne = currentPx / uResolution;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0;
    clipSpace.y = -clipSpace.y; // Invert Y for canvas coordinate system

    gl_Position = vec4(clipSpace, 0.0, 1.0);

    // High-visibility point size with DPR scaling
    gl_PointSize = (aSize * 1.7) * uDpr;

    vAlpha = aAlpha * max(0.2, ease);

    // Color mixing: Deep Tiger Orange (#d46000) & Bright Tiger Orange (#f88404)
    vec3 deepOrange = vec3(0.831, 0.376, 0.0);
    vec3 brightOrange = vec3(0.973, 0.518, 0.016);
    vColor = mix(deepOrange, brightOrange, aColorType);
  }
`;

export const FS_DUST_SOURCE = `
  precision mediump float;

  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    // Render soft antialiased circular particle
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) {
      discard;
    }

    float smoothEdge = smoothstep(0.5, 0.15, dist);
    gl_FragColor = vec4(vColor, vAlpha * smoothEdge);
  }
`;
