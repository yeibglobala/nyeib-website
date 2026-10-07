"use client";

import React from "react";
import Link from "next/link";
import { FOOTER_CONFIG } from "./config";

export function Footer() {
  return (
    <footer
      id="site-footer"
      data-theme="dark"
      role="contentinfo"
      className="w-full bg-[#0b1310] text-[#eef6f2] pt-24 sm:pt-28 md:pt-32 pb-12 px-[4vw] sm:px-[5vw] border-t border-[rgba(238,246,242,0.06)]"
    >
      <div className="max-w-[1400px] w-full mx-auto">
        {/* Main Footer Grid: Brand Info on Left (35%), Link Columns on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-[35fr_65fr] gap-12 lg:gap-16 items-start">
          {/* Left Column: Brand Logo & Line */}
          <div className="flex flex-col items-start max-w-[340px]">
            <Link
              href="/"
              className="inline-flex items-center hover:opacity-85 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2eb78c] rounded-sm mb-5"
              aria-label="Nigeria YEIB Investment Funds Home"
            >
              <img
                src="/brand/logo-white.png"
                alt="Nigeria YEIB Investment Funds"
                className="h-[28px] sm:h-[33px] w-auto object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
              />
            </Link>

            <p
              className="text-[#a9c2b8] text-[14px] sm:text-[15px] leading-[1.65] m-0"
              style={{ fontFamily: "var(--font-body, sans-serif)" }}
            >
              {FOOTER_CONFIG.brandLine}
            </p>
          </div>

          {/* Right Columns: Navigation Grid */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-12 lg:gap-16 lg:justify-end"
          >
            {FOOTER_CONFIG.columns.map((column) => (
              <div key={column.title} className="flex flex-col">
                {/* Column Header: Small uppercase mono label */}
                <h3
                  className="font-sans text-[11px] sm:text-[12px] font-semibold tracking-[0.22em] text-[#7f978d] uppercase mb-4 sm:mb-6 select-none"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {column.title}
                </h3>

                {/* Column Links with smooth hover arrow & 6px slide */}
                <ul className="list-none p-0 m-0 flex flex-col space-y-3 sm:space-y-4">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group relative inline-flex items-center text-[15px] sm:text-[16px] font-normal text-[#eef6f2] hover:text-white transition-all duration-200 min-h-[44px] sm:min-h-0 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2eb78c] rounded-sm"
                        style={{ fontFamily: "var(--font-body, sans-serif)" }}
                      >
                        {/* Mint-green slide-in arrow */}
                        <span
                          className="text-[#2eb78c] font-bold text-[14px] leading-none absolute left-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none"
                          aria-hidden="true"
                        >
                          →
                        </span>

                        {/* Link Text shifting 6px right on hover */}
                        <span className="transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[18px]">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Row: Thin Divider, Copyright & Legal Links */}
        <div className="border-t border-[rgba(238,246,242,0.1)] mt-16 sm:mt-20 md:mt-24 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          {/* Copyright Text */}
          <p
            className="text-[12px] sm:text-[13px] text-[#7f978d] m-0"
            style={{ fontFamily: "var(--font-body, sans-serif)" }}
          >
            {FOOTER_CONFIG.copyright}
          </p>

          {/* Legal Links */}
          <div className="flex items-center gap-6">
            {FOOTER_CONFIG.legalLinks.map((legal) => (
              <Link
                key={legal.label}
                href={legal.href}
                className="text-[12px] sm:text-[13px] text-[#7f978d] hover:text-[#c4d1cb] transition-colors focus:outline-none focus-visible:underline"
                style={{ fontFamily: "var(--font-body, sans-serif)" }}
              >
                {legal.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
