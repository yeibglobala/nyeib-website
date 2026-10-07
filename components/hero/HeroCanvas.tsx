"use client";

import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import { HeroEngine } from "@/lib/hero/gl";
import { HERO_CONFIG } from "@/lib/hero/config";

export interface HeroCanvasHandle {
  restart: () => void;
}

interface HeroCanvasProps {
  seed?: number;
}

export const HeroCanvas = forwardRef<HeroCanvasHandle, HeroCanvasProps>(function HeroCanvas(
  { seed },
  ref
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<HeroEngine | null>(null);

  useImperativeHandle(ref, () => ({
    restart: () => {
      engineRef.current?.restart();
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Check optional seed in query params if in browser
    let activeSeed = seed;
    if (activeSeed === undefined && typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlSeed = params.get("seed");
      if (urlSeed) {
        activeSeed = parseInt(urlSeed, 10);
      }
    }

    const engine = new HeroEngine({
      canvas,
      container,
      seed: activeSeed,
    });

    engineRef.current = engine;

    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, [seed]);

  const handleReplayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    engineRef.current?.restart();
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* 2D/3D Particle Canvas */}
      <canvas
        id="c"
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block touch-none"
        style={{
          pointerEvents: "auto",
        }}
      />

      {/* Replay / Stage Controller (Anchored in Bottom Right Corner) */}
      <div className="hero-bottom-bar pointer-events-auto">
        <button
          id="btnReplay"
          type="button"
          onClick={handleReplayClick}
          className="replay-pill-btn"
          title="Replay Bridge to Logo Transition"
          aria-label="Replay Bridge to Logo Transition"
        >
          <span className="replay-icon" aria-hidden="true">
            ⟳
          </span>
          <span className="replay-label" id="stageLabel">
            Bridge
          </span>
        </button>
      </div>
    </div>
  );
});
