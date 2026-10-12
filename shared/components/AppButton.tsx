"use client";

import React from "react";
import Link from "next/link";

export interface AppButtonProps {
  children?: React.ReactNode;
  text?: string;
  label?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  variant?: "orange" | "darkGreen" | "emerald" | "glass" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
  ariaLabel?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
}

export function AppButton({
  children,
  text,
  label,
  href,
  onClick,
  type = "button",
  variant = "orange",
  size = "md",
  className = "",
  ariaLabel,
  target,
  rel,
  disabled = false,
}: AppButtonProps) {
  const rawContent = text || label || children;
  const contentString = typeof rawContent === "string" ? rawContent : "";
  const accessibleLabel = ariaLabel || contentString || "Button";

  const sizeClasses = {
    sm: "px-4 sm:px-5 py-2 text-[0.78rem] sm:text-[0.84rem]",
    md: "px-6 sm:px-7 py-2.5 sm:py-3.2 text-[0.88rem] sm:text-[0.94rem]",
    lg: "px-7 sm:px-9 py-3.5 sm:py-4 text-[0.94rem] sm:text-[1.02rem]",
  }[size];

  const variantStyles = {
    orange: {
      wrapper:
        "bg-[#d96e00] text-white shadow-[0_4px_20px_rgba(248,132,4,0.3)] hover:shadow-[0_8px_28px_rgba(248,132,4,0.45)] focus-visible:ring-[#F88404]",
      bg: "bg-[#F88404]",
    },
    darkGreen: {
      wrapper:
        "bg-[#071913] text-white shadow-sm hover:shadow-[0_8px_24px_rgba(15,42,32,0.2)] focus-visible:ring-[#0F2A20]",
      bg: "bg-[#0F2A20]",
    },
    emerald: {
      wrapper:
        "bg-[#1da379] text-[#003124] shadow-[0_4px_20px_rgba(46,183,140,0.3)] hover:shadow-[0_8px_28px_rgba(46,183,140,0.45)] focus-visible:ring-[#2EB78C]",
      bg: "bg-[#2EB78C]",
    },
    glass: {
      wrapper:
        "bg-[rgba(18,32,27,0.7)] text-[#eef6f2] border border-[rgba(238,246,242,0.2)] backdrop-blur-md shadow-md focus-visible:ring-[#00BE93]",
      bg: "bg-[rgba(46,183,140,0.22)]",
    },
    white: {
      wrapper:
        "bg-[#E6DCCB] text-[#0F2A20] shadow-sm hover:shadow-md focus-visible:ring-[#003124]",
      bg: "bg-white",
    },
  }[variant];

  // Render character spans for staggering ticker roll animation
  const renderContent = () => {
    if (contentString) {
      return (
        <span data-button-animate-chars="" className="btn-animate-chars__text">
          {[...contentString].map((char, index) => (
            <span
              key={index}
              style={{
                transitionDelay: `${index * 0.012}s`,
                whiteSpace: char === " " ? "pre" : undefined,
              }}
            >
              {char}
            </span>
          ))}
        </span>
      );
    }

    return <span className="btn-animate-chars__text">{rawContent}</span>;
  };

  const commonClasses = `btn-animate-chars group font-['Chivo',sans-serif] font-bold tracking-[0.04em] uppercase text-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${variantStyles.wrapper} ${sizeClasses} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        aria-label={accessibleLabel}
        className={commonClasses}
      >
        <div className={`btn-animate-chars__bg ${variantStyles.bg}`} />
        {renderContent()}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={accessibleLabel}
      className={commonClasses}
    >
      <div className={`btn-animate-chars__bg ${variantStyles.bg}`} />
      {renderContent()}
    </button>
  );
}
