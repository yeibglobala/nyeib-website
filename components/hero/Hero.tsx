import React from "react";
import { HeroClientWrapper } from "./HeroClientWrapper";

export interface HeroProps {
  headline?: React.ReactNode;
  subtext?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  seed?: number;
  className?: string;
  id?: string;
}

export function Hero({
  headline,
  subtext,
  actions,
  children,
  seed,
  className = "",
  id = "hero",
}: HeroProps) {
  return (
    <section
      id={id}
      className={`relative w-full h-screen min-h-[580px] flex flex-col justify-start overflow-hidden bg-[var(--bg-deep)] ${className}`}
    >
      {/* Particle WebGL Canvas */}
      <HeroClientWrapper seed={seed} />

      {/* Ambient Luxury Overlay */}
      <div className="ambient-vignette" aria-hidden="true" />

      {/* Hero Content Layout (Headline on Left, Subtext on Right, Particles in Middle) */}
      <main className="hero-layout">
        <div className="hero-col-left">
          <h1 className="hero-headline">
            {headline || (
              <>
                Unlocking <span className="highlight-green">pathways</span> for investable businesses
              </>
            )}
          </h1>
        </div>

        <div className="hero-col-right">
          <p className="hero-subtext">
            {subtext ||
              "NYEIB connect growth-oriented businesses with the capital, strategic partnerships and practical support they need to become more credible, resilient and investment-ready."}
          </p>

          {actions && <div className="mt-8 flex items-center gap-4">{actions}</div>}
          {children}
        </div>
      </main>
    </section>
  );
}

// Named alias for clarity across other pages
export { Hero as ParticleHero };

