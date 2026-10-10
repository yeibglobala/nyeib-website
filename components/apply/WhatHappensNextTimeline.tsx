"use client";

import React, { useEffect, useRef } from "react";

export interface TimelineStep {
  stepNumber: string; // e.g. "Step 1"
  title: string;
  description: string;
}

export interface WhatHappensNextTimelineProps {
  steps: TimelineStep[];
  heading?: string;
}

const STEP_SVGS = [
  { viewBox: "-.1 -.1 8.3 17.4", href: "#L", fill: "url(#gm)" },
  { viewBox: "5.8 -.1 7.9 17.4", href: "#C", fill: "url(#gp)" },
  { viewBox: "11.4 -.1 8.4 17.4", href: "#R", fill: "url(#go)" },
];

export function WhatHappensNextTimeline({
  steps,
  heading = "What Happens Next?",
}: WhatHappensNextTimelineProps) {
  const stripRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("in");
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={stripRef} className="apply-sec apply-strip" id="strip">
      <div className="apply-w">
        <h2>{heading}</h2>
        <div className="apply-trio">
          {steps.map((item, index) => {
            const svgConfig = STEP_SVGS[index % STEP_SVGS.length];
            return (
              <div key={index} className="apply-tc">
                <span className="apply-tb">
                  <svg viewBox={svgConfig.viewBox} aria-hidden="true">
                    <use href={svgConfig.href} fill={svgConfig.fill} />
                  </svg>
                  <span className="apply-ltr" aria-hidden="true">
                    {index + 1}
                  </span>
                </span>
                <small>{item.stepNumber || `Step ${index + 1}`}</small>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
