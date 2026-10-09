"use client";

import React from "react";
import { Clock, FileCheck, Shield } from "lucide-react";

export function SimpleFirstStepSection() {
  const steps = [
    {
      icon: Clock,
      text: "The initial application or partnership form is designed to take approximately five minutes.",
    },
    {
      icon: FileCheck,
      text: "You only need to provide the information required for initial screening. If your submission progresses, the NYEIB team may request additional details or supporting documents.",
    },
    {
      icon: Shield,
      text: "There is no application fee. NYEIB does not work through paid agents or intermediaries who charge applicants for access.",
    },
  ];

  return (
    <section
      aria-labelledby="simple-first-step-heading"
      className="w-full py-12 sm:py-16"
    >
      <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="simple-first-step-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#0F2A20] tracking-tight mb-8 sm:mb-10"
          style={{ fontFamily: "var(--font-headline, serif)" }}
        >
          A simple first step.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {steps.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#E6DCCB] shadow-[0_4px_20px_rgba(15,42,32,0.03)] flex flex-col justify-start items-start gap-4 transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-[#2eb78c]/10 text-[#1f9d74] flex items-center justify-center shrink-0">
                  <IconComponent className="w-5 h-5 stroke-[2]" aria-hidden="true" />
                </div>
                <p
                  className="text-[0.95rem] sm:text-[1rem] text-[#0F2A20]/80 leading-relaxed font-normal"
                  style={{ fontFamily: "var(--font-body, sans-serif)" }}
                >
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
