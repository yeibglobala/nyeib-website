"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { NIGERIA_STATES, NigeriaStateData, MAP_CONFIG } from "@/data/nigeriaStates";

interface NigeriaPhotoMapProps {
  className?: string;
  mode?: "scroll" | "static";
}

export function NigeriaPhotoMap({
  className = "",
  mode = "scroll",
}: NigeriaPhotoMapProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const chipRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);
  const piecesRef = useRef<(SVGGElement | null)[]>([]);

  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Animation & Interaction tracking refs (avoids React re-renders on scroll)
  const animState = useRef({
    prog: 1, // Server render & reduced motion default: 1 (finished)
    target: 1,
    hovered: -1,
    shownHovered: -1,
    done: false,
    rafId: 0,
    inView: false,
    ready: false,
  });

  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));

  const smoothstep = (t: number) => {
    const c = clamp(t, 0, 1);
    return c * c * (3 - 2 * c);
  };

  const renderPieces = useCallback(() => {
    const { prog, hovered } = animState.current;
    const isDone = prog > 0.94;

    if (isDone !== animState.current.done) {
      animState.current.done = isDone;
      sectionRef.current?.classList.toggle("done", isDone);
    }

    if (hintRef.current) {
      hintRef.current.style.opacity = prog > 0.05 ? "0" : "1";
    }

    const GAP = MAP_CONFIG.gap; // 60 units

    NIGERIA_STATES.forEach((p, idx) => {
      const el = piecesRef.current[idx];
      if (!el) return;

      const delay = 0.4 * p.dn;
      const l = smoothstep((prog - delay) / 0.6);
      const off = (1 - l) * GAP;
      const isHov = p.n === hovered;
      const hScale = isHov ? 1.025 : 1.0;
      const s = (0.93 + 0.07 * l) * hScale;
      const r = p.rot * (1 - l);
      const op = 0.5 + 0.5 * l;

      const tx = (p.cx + p.ux * off).toFixed(2);
      const ty = (p.cy + p.uy * off).toFixed(2);
      const rotStr = r.toFixed(2);
      const scaleStr = s.toFixed(4);

      el.setAttribute(
        "transform",
        `translate(${tx} ${ty}) rotate(${rotStr}) scale(${scaleStr}) translate(${-p.cx} ${-p.cy})`
      );
      el.style.opacity = op.toFixed(3);
    });
  }, []);

  const showChip = useCallback((name: string, clientX: number, clientY: number) => {
    const chip = chipRef.current;
    const mapEl = mapRef.current;
    if (!chip || !mapEl) return;

    const mr = mapEl.getBoundingClientRect();
    chip.textContent = name;
    chip.style.left = `${clientX - mr.left}px`;
    chip.style.top = `${clientY - mr.top}px`;
    chip.classList.add("on");
  }, []);

  const hideChip = useCallback(() => {
    chipRef.current?.classList.remove("on");
  }, []);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const onMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", onMotionChange);

    const section = sectionRef.current;
    if (!section) return;

    if (mediaQuery.matches || mode === "static") {
      animState.current.prog = 1;
      animState.current.target = 1;
      renderPieces();
      section.setAttribute("data-ready", "true");
      return () => {
        mediaQuery.removeEventListener("change", onMotionChange);
      };
    }

    // Measure immediate initial scroll progress
    const computeTarget = () => {
      const r = section.getBoundingClientRect();
      const scrollDist = Math.max(1, r.height - window.innerHeight);
      return clamp(-r.top / scrollDist, 0, 1);
    };

    const initialProg = computeTarget();
    animState.current.prog = initialProg;
    animState.current.target = initialProg;
    renderPieces();
    section.setAttribute("data-ready", "true");

    // IntersectionObserver to keep RAF running only when section is near viewport
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        animState.current.inView = entry.isIntersecting;
      },
      { rootMargin: "200px 0px 200px 0px" }
    );
    io.observe(section);

    // Animation Loop
    let running = true;
    const loop = () => {
      if (!running) return;

      if (animState.current.inView) {
        animState.current.target = computeTarget();
        const { prog, target, hovered, shownHovered } = animState.current;
        const next = prog + (target - prog) * 0.1;

        if (Math.abs(next - prog) > 0.0004 || shownHovered !== hovered) {
          animState.current.prog = next;
          animState.current.shownHovered = hovered;
          renderPieces();
        }
      }

      animState.current.rafId = requestAnimationFrame(loop);
    };

    animState.current.rafId = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(animState.current.rafId);
      io.disconnect();
      mediaQuery.removeEventListener("change", onMotionChange);
    };
  }, [mode, renderPieces]);

  return (
    <section
      ref={sectionRef}
      id="purpose"
      data-theme="light"
      aria-label="Purpose"
      className={`relative w-full bg-[#E6EBE7] text-[#0F2A20] select-none ${
        isReducedMotion || mode === "static"
          ? "h-auto py-16"
          : "h-[220vh] min-[821px]:h-[260vh]"
      } ${className}`}
    >
      <style>{`
        #purpose {
          --map-bg: #E6EBE7;
          --map-fg: #0F2A20;
          --map-mut: #4A5B53;
          --map-acc: #157A58;
          --map-edge: rgba(255, 255, 255, 0.4);
        }
        #purpose h2 {
          font-family: var(--font-headline, 'Asul', Georgia, serif);
        }
        #purpose h2 .acc {
          color: inherit;
          transition: color 0.5s ease-out;
        }
        #purpose.done h2 .acc {
          color: var(--map-acc);
        }
        #purpose .piece {
          cursor: pointer;
          outline: none;
        }
        #purpose .tint {
          fill: #2eb78c;
          opacity: 0.10;
          transition: opacity 0.2s ease-out;
        }
        #purpose .edge {
          fill: none;
          stroke: var(--map-edge);
          stroke-width: 1px;
          vector-effect: non-scaling-stroke;
          transition: stroke 0.2s ease-out, stroke-width 0.2s ease-out;
        }
        #purpose .piece:hover .edge,
        #purpose .piece.hov .edge,
        #purpose .piece:focus-visible .edge {
          stroke: #8fe3c8;
          stroke-width: 2px;
        }
        #purpose .piece:hover .tint,
        #purpose .piece.hov .tint,
        #purpose .piece:focus-visible .tint {
          opacity: 0.28;
        }
        #purpose .chip {
          position: absolute;
          z-index: 20;
          pointer-events: none;
          padding: 6px 14px;
          border-radius: 9999px;
          background: #0f2a20;
          color: #eef6f2;
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
          transform: translate(-50%, -140%);
          opacity: 0;
          transition: opacity 0.15s ease-out;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
        }
        #purpose .chip.on {
          opacity: 1;
        }
      `}</style>

      {/* Sticky Inner Container */}
      <div
        className={`${
          isReducedMotion || mode === "static"
            ? "relative min-h-[100svh]"
            : "sticky top-0 h-[100svh]"
        } box-border max-w-[1280px] w-full mx-auto px-[clamp(20px,5vw,64px)] grid grid-cols-1 min-[821px]:grid-cols-[minmax(0,4.4fr)_minmax(0,7.6fr)] gap-6 min-[821px]:gap-[2vw] items-center pt-[calc(88px+env(safe-area-inset-top,0px))] min-[821px]:pt-0`}
      >
        {/* Left Column: Typography */}
        <div className="flex flex-col justify-center max-w-[32rem]">
          <h2 className="m-0 mb-6 font-semibold text-[clamp(2.1rem,4.2vw,3.9rem)] leading-[1.08] tracking-[-0.015em] text-[#0F2A20]">
            Ambition was never the problem; <span className="acc">access</span> was.
          </h2>
          <p
            className="m-0 text-[clamp(1rem,1.3vw,1.2rem)] leading-[1.65] text-[#4A5B53] font-normal"
            style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
          >
            Across Nigeria, promising businesses are held back by financing gaps,
            limited business support and fragmented access to growth opportunities.
            NYEIB exists to help <span className="text-[#f88404] font-medium">close those gaps.</span>
          </p>
        </div>

        {/* Right Column: Interactive Nigeria Photo Map */}
        <div
          ref={mapRef}
          id="map"
          className="relative w-full h-[60vh] min-[821px]:h-[94%] min-h-0 flex items-center justify-center"
        >
          {/* Soft Mint Cream Radial Glow behind the map */}
          <div
            aria-hidden="true"
            className="absolute inset-0 m-auto w-[88%] h-[88%] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, #F1F7F3 0%, rgba(241,247,243,0.6) 40%, transparent 72%)",
              filter: "blur(24px)",
            }}
          />

          {/* Inline SVG Map of Nigeria */}
          <svg
            id="nigeria-map-svg"
            viewBox={MAP_CONFIG.viewBox}
            role="group"
            aria-label="Map of Nigeria"
            className="relative w-full h-full block overflow-visible select-none"
            style={{
              filter: "drop-shadow(0 22px 28px rgba(15,42,32,0.22))",
              touchAction: "pan-y",
            }}
          >
            <defs>
              {/* Photo reference in defs */}
              <image
                id="ph"
                x="0"
                y="0"
                width={MAP_CONFIG.width}
                height={MAP_CONFIG.height}
                preserveAspectRatio="xMidYMid slice"
                href="/images/purpose-photo.webp"
              />

              {/* State ClipPaths */}
              {NIGERIA_STATES.map((state) => (
                <clipPath key={`clip-${state.id}`} id={`c${state.n}`}>
                  <path d={state.d} />
                </clipPath>
              ))}
            </defs>

            {/* 37 State Pieces */}
            {NIGERIA_STATES.map((state, idx) => (
              <g
                key={state.id}
                ref={(el) => {
                  piecesRef.current[idx] = el;
                }}
                className="piece"
                tabIndex={0}
                role="img"
                aria-label={state.name}
                data-n={state.n}
                data-cx={state.cx}
                data-cy={state.cy}
                data-ux={state.ux}
                data-uy={state.uy}
                data-dn={state.dn}
                data-rot={state.rot}
                onPointerEnter={(e) => {
                  animState.current.hovered = state.n;
                  e.currentTarget.classList.add("hov");
                  showChip(state.name, e.clientX, e.clientY);
                }}
                onPointerMove={(e) => {
                  showChip(state.name, e.clientX, e.clientY);
                }}
                onPointerLeave={(e) => {
                  if (animState.current.hovered === state.n) {
                    animState.current.hovered = -1;
                  }
                  e.currentTarget.classList.remove("hov");
                  hideChip();
                }}
                onFocus={(e) => {
                  animState.current.hovered = state.n;
                  const b = e.currentTarget.getBoundingClientRect();
                  showChip(state.name, b.left + b.width / 2, b.top + b.height / 2);
                }}
                onBlur={() => {
                  animState.current.hovered = -1;
                  hideChip();
                }}
              >
                {/* Photo with State ClipPath & Mint Tint */}
                <g clipPath={`url(#c${state.n})`}>
                  <use href="#ph" />
                  <path d={state.d} className="tint" />
                </g>

                {/* State Vector Edge */}
                <path d={state.d} className="edge" />
              </g>
            ))}
          </svg>

          {/* Floating State Name Chip */}
          <div ref={chipRef} className="chip" aria-hidden="true" />

          {/* Micro-cue guidance hint under the map */}
          <div
            ref={hintRef}
            className="absolute right-0 bottom-0 text-[12px] sm:text-[13px] tracking-[0.04em] text-[#4A5B53]/90 select-none pointer-events-none transition-opacity duration-300"
            style={{ fontFamily: "var(--font-mono, monospace)" }}
          >
            Scroll to close the gap
          </div>
        </div>
      </div>
    </section>
  );
}
