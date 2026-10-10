"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface StakeholderItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  slug: string;
}

const STAKEHOLDERS: StakeholderItem[] = [
  {
    id: "vc-pe",
    number: "01",
    title: "Venture Capital & Private Equity Fund Managers",
    subtitle: "Investing in the next generation of Nigerian businesses.",
    paragraphs: [
      "For venture capital and private equity fund managers interested in investment partnerships, fund commitments, co-investment and opportunities involving growth-oriented Nigerian enterprises.",
    ],
    slug: "vc-pe",
  },
  {
    id: "banks-lenders",
    number: "02",
    title: "Banks & Licensed Lenders",
    subtitle: "Expanding access to finance through risk-sharing.",
    paragraphs: [
      "For commercial banks, microfinance banks and other licensed lenders interested in partnerships that can help manage lending risks and expand financing opportunities for eligible youth-led businesses.",
    ],
    slug: "banks-lenders",
  },
  {
    id: "ecosystem-support",
    number: "03",
    title: "Ecosystem Support Organisations",
    subtitle: "Helping entrepreneurs build stronger businesses.",
    paragraphs: [
      "For business development service providers, incubators, accelerators, innovation hubs and other organisations delivering practical support to entrepreneurs and MSMEs.",
      "Explore opportunities to collaborate on business capacity-building, investment readiness and enterprise development.",
    ],
    slug: "ecosystem-support",
  },
  {
    id: "research-policy",
    number: "04",
    title: "Research, Policy & Public Institutions",
    subtitle: "Strengthening the environment for enterprise growth.",
    paragraphs: [
      "For universities, research institutes, policy organisations, public institutions and other bodies working to advance entrepreneurship research, improve MSME data and support informed policy development.",
    ],
    slug: "research-policy",
  },
  {
    id: "investors-dev-partners",
    number: "05",
    title: "Investors & Development Partners",
    subtitle: "Connecting institutional capital with long-term opportunity.",
    paragraphs: [
      "For development finance institutions, bilateral agencies, foundations and other institutional investors interested in investment, co-investment, technical assistance or strategic partnerships with NYEIB.",
    ],
    slug: "investors-dev-partners",
  },
];

export function StakeholderList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);
  const modeRef = useRef<("pin" | "hover" | null)[]>([]);

  const setCoordinates = (el: HTMLElement, e: React.PointerEvent) => {
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  const handlePointerEnter = (i: number, e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const row = rowRefs.current[i];
    if (row) setCoordinates(row, e);

    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      if (modeRef.current[i] !== "pin") {
        setOpenIndex(i);
        modeRef.current[i] = "hover";
      }
    }, 140);
  };

  const handlePointerLeave = (i: number) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    if (modeRef.current[i] === "hover") {
      setOpenIndex((prev) => (prev === i ? null : prev));
      modeRef.current[i] = null;
    }
  };

  const handleClick = (i: number, e: React.MouseEvent<HTMLButtonElement>) => {
    const row = rowRefs.current[i];
    if (row && e.clientX && e.clientY) {
      const rect = row.getBoundingClientRect();
      row.style.setProperty("--x", `${e.clientX - rect.left}px`);
      row.style.setProperty("--y", `${e.clientY - rect.top}px`);
    }

    if (openIndex === i && modeRef.current[i] === "pin") {
      setOpenIndex(null);
      modeRef.current[i] = null;
    } else {
      setOpenIndex(i);
      modeRef.current[i] = "pin";
    }
  };

  return (
    <div className="apply-acc" id="acc">
      {STAKEHOLDERS.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={item.id}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            className={`apply-row ${isOpen ? "on" : ""}`}
            onPointerEnter={(e) => handlePointerEnter(i, e)}
            onPointerLeave={() => handlePointerLeave(i)}
          >
            <button
              type="button"
              className="apply-hd"
              id={`h${i}`}
              aria-expanded={isOpen}
              aria-controls={`p${i}`}
              onClick={(e) => handleClick(i, e)}
            >
              <i>{item.number}</i>
              <h3>{item.title}</h3>
              <span className="apply-ic" aria-hidden="true">
                +
              </span>
            </button>

            <div
              className="apply-pn"
              id={`p${i}`}
              role="region"
              aria-labelledby={`h${i}`}
            >
              <div>
                <div className="apply-det">
                  <b>{item.subtitle}</b>
                  {item.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                  <Link
                    href={`/apply/partner/${item.slug}`}
                    className="apply-btn"
                  >
                    <span>Explore Partnership</span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
