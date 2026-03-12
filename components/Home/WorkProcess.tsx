"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Target, PenTool, CheckCircle, RefreshCcw } from "lucide-react";

/**
 * ANIMATION HOOK
 * Simple Intersection Observer for scroll-reveal effects
 */
const useReveal = () => {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, revealed] as const;
};

export default function HowIWork() {
  const [refHeader, headerVisible] = useReveal();

  const steps = [
    {
      id: "01",
      title: "Discover",
      text: "Research users, systems, and business context to understand the problem.",
      icon: <Search className="w-5 h-5" />,
      color: "text-[var(--color-accent)]",
      borderColor: "group-hover:border-cyan-200",
      glowColor: "group-hover:shadow-[0_14px_28px_-18px_rgba(6,182,212,0.45)]",
    },
    {
      id: "02",
      title: "Define",
      text: "Identify key challenges and opportunities.",
      icon: <Target className="w-5 h-5" />,
      color: "text-slate-700",
      borderColor: "group-hover:border-slate-200",
      glowColor: "group-hover:shadow-[0_14px_28px_-18px_rgba(100,116,139,0.28)]",
    },
    {
      id: "03",
      title: "Design & Explore",
      text: "Create concepts, models, or prototypes.",
      icon: <PenTool className="w-5 h-5" />,
      color: "text-violet-600",
      borderColor: "group-hover:border-violet-200",
      glowColor: "group-hover:shadow-[0_14px_28px_-18px_rgba(139,92,246,0.28)]",
    },
    {
      id: "04",
      title: "Validate",
      text: "Test ideas using feedback, data, or experiments.",
      icon: <CheckCircle className="w-5 h-5" />,
      color: "text-emerald-600",
      borderColor: "group-hover:border-emerald-200",
      glowColor: "group-hover:shadow-[0_14px_28px_-18px_rgba(16,185,129,0.28)]",
    },
    {
      id: "05",
      title: "Improve",
      text: "Refine solutions and continue learning from outcomes.",
      icon: <RefreshCcw className="w-5 h-5" />,
      color: "text-amber-600",
      borderColor: "group-hover:border-amber-200",
      glowColor: "group-hover:shadow-[0_14px_28px_-18px_rgba(245,158,11,0.28)]",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[var(--color-surface-muted)] py-16 sm:py-20 md:py-[100px]">
      {/* Ambient Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[20%] h-[260px] w-[260px] rounded-full bg-cyan-100 blur-[100px] opacity-70 sm:h-[340px] sm:w-[340px]" />
        <div className="absolute bottom-[14%] right-[8%] h-[240px] w-[240px] rounded-full bg-slate-100 blur-[100px] opacity-70 sm:h-[320px] sm:w-[320px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Section Header */}
        <div
          ref={refHeader}
          className={`mb-16 text-center transition-all duration-1000 sm:mb-20 ${
            headerVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="mb-4 text-[clamp(1.9rem,4vw,3rem)] font-semibold tracking-tight text-[var(--color-primary)]">
            How I Work
          </h2>
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-[var(--color-body-text)] sm:text-base">
            A structured approach to solving complex problems through iterative design and analysis.
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div className="relative mt-10 overflow-x-auto pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="relative mx-auto flex min-w-[920px] items-start justify-between gap-6 px-6 pt-16">
            {/* Main Horizontal Path Line */}
            <div className="absolute left-12 right-12 top-[88px] z-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />

            {steps.map((step, idx) => {
              const [ref, isVisible] = useReveal();

              return (
                <div
                  key={step.id}
                  ref={ref}
                  className={`group flex flex-1 flex-col items-center text-center transition-all duration-700 ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${idx * 150}ms` }}
                >
                  {/* Phase Label Above Icon */}
                  <span className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-secondary-text)] opacity-70 transition-opacity group-hover:opacity-100">
                    Phase {step.id}
                  </span>

                  {/* Timeline Node */}
                  <div
                    className={`relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--color-border)] bg-white text-[var(--color-secondary-text)] transition-all duration-500 ${step.borderColor} ${step.glowColor}`}
                  >
                    <div className={step.color}>{step.icon}</div>
                  </div>

                  {/* Content */}
                  <h3
                    className={`mb-3 text-lg font-semibold text-[var(--color-primary)] transition-colors ${step.color}`}
                  >
                    {step.title}
                  </h3>

                  <p className="max-w-[200px] text-sm leading-relaxed text-[var(--color-body-text)]">
                    {step.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}