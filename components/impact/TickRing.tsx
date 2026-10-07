"use client";

import React, { useImperativeHandle, forwardRef, useMemo, useRef } from "react";
import { IMPACT_CONFIG } from "./config";

export interface TickRingHandle {
  updateFill: (ratio: number) => void;
  reset: () => void;
}

interface TickRingProps {
  className?: string;
  initialFillRatio?: number; // 0 to 1
  maxFillFraction?: number; // default 1.0 (or 0.5 for half fill)
}

export const TickRing = forwardRef<TickRingHandle, TickRingProps>(
  ({ className = "", initialFillRatio = 0, maxFillFraction = 1.0 }, ref) => {
    const { ring, colors } = IMPACT_CONFIG;
    const { tickCount, radius, tickLength, leadingTickLength, tickWidth, leadingTickWidth, viewBoxSize } = ring;
    const cx = viewBoxSize / 2;
    const cy = viewBoxSize / 2;

    const tickRefs = useRef<(SVGLineElement | null)[]>([]);
    const lastFilledCountRef = useRef<number>(-1);
    const lastLeadingIndexRef = useRef<number>(-1);

    // Compute static geometric coordinates for all 120 ticks
    const tickData = useMemo(() => {
      const data = [];
      for (let k = 0; k < tickCount; k++) {
        // Start at top (-PI / 2) and proceed clockwise
        const angle = -Math.PI / 2 + (k * 2 * Math.PI) / tickCount;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        const x1 = cx + radius * cos;
        const y1 = cy + radius * sin;
        const x2Normal = cx + (radius - tickLength) * cos;
        const y2Normal = cy + (radius - tickLength) * sin;
        const x2Leading = cx + (radius - leadingTickLength) * cos;
        const y2Leading = cy + (radius - leadingTickLength) * sin;

        data.push({
          k,
          x1: Number(x1.toFixed(3)),
          y1: Number(y1.toFixed(3)),
          x2Normal: Number(x2Normal.toFixed(3)),
          y2Normal: Number(y2Normal.toFixed(3)),
          x2Leading: Number(x2Leading.toFixed(3)),
          y2Leading: Number(y2Leading.toFixed(3)),
        });
      }
      return data;
    }, [cx, cy, radius, tickCount, tickLength, leadingTickLength]);

    const initialFilledCount = Math.floor(initialFillRatio * maxFillFraction * tickCount);

    useImperativeHandle(ref, () => ({
      updateFill: (ratio: number) => {
        const clampedRatio = Math.max(0, Math.min(1, ratio));
        const effectiveRatio = clampedRatio * maxFillFraction;
        const targetFilled = Math.min(tickCount, Math.floor(effectiveRatio * tickCount));

        if (targetFilled === lastFilledCountRef.current) return;

        const currentFilled = lastFilledCountRef.current === -1 ? 0 : lastFilledCountRef.current;
        const minIdx = Math.min(currentFilled, targetFilled);
        const maxIdx = Math.max(currentFilled, targetFilled);

        // Update ticks between old and new state
        for (let i = minIdx; i < maxIdx; i++) {
          const el = tickRefs.current[i];
          const data = tickData[i];
          if (!el || !data) continue;

          if (i < targetFilled) {
            // Fill tick
            el.setAttribute("stroke", colors.tickFilled);
            el.setAttribute("stroke-width", String(tickWidth));
            el.setAttribute("opacity", "1.0");
            el.setAttribute("x2", String(data.x2Normal));
            el.setAttribute("y2", String(data.y2Normal));
          } else {
            // Unfill tick
            el.setAttribute("stroke", colors.tickUnfilled);
            el.setAttribute("stroke-width", String(tickWidth));
            el.setAttribute("opacity", "1.0");
            el.setAttribute("x2", String(data.x2Normal));
            el.setAttribute("y2", String(data.y2Normal));
          }
        }

        // Restore previous leading tick if it changed
        const prevLeading = lastLeadingIndexRef.current;
        if (prevLeading >= 0 && prevLeading !== targetFilled - 1 && prevLeading < tickCount) {
          const prevEl = tickRefs.current[prevLeading];
          const prevData = tickData[prevLeading];
          if (prevEl && prevData) {
            if (prevLeading < targetFilled) {
              prevEl.setAttribute("stroke", colors.tickFilled);
              prevEl.setAttribute("stroke-width", String(tickWidth));
              prevEl.setAttribute("x2", String(prevData.x2Normal));
              prevEl.setAttribute("y2", String(prevData.y2Normal));
            }
          }
        }

        // Apply highlight to newest filled tick (leading edge)
        const newLeading = targetFilled - 1;
        if (newLeading >= 0 && newLeading < tickCount) {
          const leadEl = tickRefs.current[newLeading];
          const leadData = tickData[newLeading];
          if (leadEl && leadData) {
            leadEl.setAttribute("stroke", colors.tickLeading);
            leadEl.setAttribute("stroke-width", String(leadingTickWidth));
            leadEl.setAttribute("x2", String(leadData.x2Leading));
            leadEl.setAttribute("y2", String(leadData.y2Leading));
          }
        }

        lastFilledCountRef.current = targetFilled;
        lastLeadingIndexRef.current = newLeading;
      },
      reset: () => {
        for (let i = 0; i < tickCount; i++) {
          const el = tickRefs.current[i];
          const data = tickData[i];
          if (!el || !data) continue;
          el.setAttribute("stroke", colors.tickUnfilled);
          el.setAttribute("stroke-width", String(tickWidth));
          el.setAttribute("x2", String(data.x2Normal));
          el.setAttribute("y2", String(data.y2Normal));
        }
        lastFilledCountRef.current = 0;
        lastLeadingIndexRef.current = -1;
      },
    }));

    return (
      <svg
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        className={`w-full h-full select-none pointer-events-none ${className}`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g strokeLinecap="round">
          {tickData.map((tick, idx) => {
            const isFilled = idx < initialFilledCount;
            const isLeading = isFilled && idx === initialFilledCount - 1;
            const strokeColor = isLeading
              ? colors.tickLeading
              : isFilled
              ? colors.tickFilled
              : colors.tickUnfilled;
            const width = isLeading ? leadingTickWidth : tickWidth;
            const x2 = isLeading ? tick.x2Leading : tick.x2Normal;
            const y2 = isLeading ? tick.y2Leading : tick.y2Normal;

            return (
              <line
                key={tick.k}
                ref={(el) => {
                  tickRefs.current[idx] = el;
                }}
                x1={tick.x1}
                y1={tick.y1}
                x2={x2}
                y2={y2}
                stroke={strokeColor}
                strokeWidth={width}
              />
            );
          })}
        </g>
      </svg>
    );
  }
);

TickRing.displayName = "TickRing";
