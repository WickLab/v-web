"use client";

import React, { useEffect, useRef, useState } from "react";
import { User, Layers, Zap, Heart, Briefcase, BarChart } from "lucide-react";

/**
 * ANIMATION HOOK
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

export default function MyThinkingFramework() {
  const [refHeader, headerVisible] = useReveal();

  const nodes = [
    {
      title: "User",
      text: "Understand needs, motivations, and behaviors through qualitative and quantitative research.",
      icon: <User className="w-5 h-5" />,
      color: "text-[var(--color-accent)]",
      bgGlow: "bg-cyan-100",
    },
    {
      title: "Current Experience",
      text: "Identify gaps, friction points, and structural inefficiencies in the existing journey.",
      icon: <Layers className="w-5 h-5" />,
      color: "text-slate-700",
      bgGlow: "bg-slate-100",
    },
    {
      title: "Opportunity",
      text: "Explore potential improvements, architectural shifts, or technological innovations.",
      icon: <Zap className="w-5 h-5" />,
      color: "text-violet-600",
      bgGlow: "bg-violet-100",
    },
    {
      title: "Value",
      text: "Ensure proposed solutions create meaningful, tangible improvements for the end user.",
      icon: <Heart className="w-5 h-5" />,
      color: "text-rose-500",
      bgGlow: "bg-rose-100",
    },
    {
      title: "Business",
      text: "Align solutions to support operational efficiency, organizational growth, or strategic goals.",
      icon: <Briefcase className="w-5 h-5" />,
      color: "text-amber-600",
      bgGlow: "bg-amber-100",
    },
    {
      title: "Outcome",
      text: "Deliver better experiences backed by measurable metrics and continuous learning.",
      icon: <BarChart className="w-5 h-5" />,
      color: "text-emerald-600",
      bgGlow: "bg-emerald-100",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[var(--color-surface-muted)] py-12 sm:py-16 md:py-20">
      <div className="absolute top-0 left-1/2 h-full w-full -translate-x-1/2 pointer-events-none opacity-60">
        <div className="absolute top-1/4 left-1/4 h-[520px] w-[520px] rounded-full bg-cyan-100 blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[460px] w-[460px] rounded-full bg-slate-100 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6">
        <div
          ref={refHeader}
          className={`mb-12 text-center transition-all duration-1000 ${
            headerVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Methodology
          </div>

          <h2 className="mb-4 text-[clamp(1.9rem,4vw,3rem)] font-semibold tracking-tight text-[var(--color-primary)]">
            My Thinking Framework
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[var(--color-body-text)] sm:text-lg">
            I approach complex problems through a structured, linear methodology that bridges
            user-centric empathy with scalable business architecture.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--color-border)] to-transparent md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-8">
            {nodes.map((node, i) => {
              const [ref, isVisible] = useReveal();
              const isEven = i % 2 === 0;

              return (
                <div
                  key={node.title}
                  ref={ref}
                  className={`relative flex flex-col items-center justify-between transition-all duration-1000 md:flex-row ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div
                    className={`mt-2 w-full pl-20 md:mt-0 md:w-[45%] md:pl-0 ${
                      isEven ? "md:order-1 md:text-right" : "md:order-2 md:text-left"
                    }`}
                  >
                    <div className="group relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-[var(--color-surface-muted)] hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.18)]">
                      <div
                        className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${node.bgGlow}`}
                      />

                      <div
                        className={`relative z-10 flex flex-col ${
                          isEven ? "md:items-end" : "md:items-start"
                        }`}
                      >
                        <div className="mb-2 flex items-center gap-3">
                          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-secondary-text)]">
                            Phase 0{i + 1}
                          </span>
                        </div>

                        <h3 className={`mb-2 text-2xl font-semibold ${node.color}`}>
                          {node.title}
                        </h3>

                        <p className="text-sm leading-relaxed text-[var(--color-body-text)]">
                          {node.text}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-0 left-8 z-10 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[var(--color-surface-muted)] bg-white shadow-[0_0_0_1px_rgba(229,231,235,1)] transition-transform duration-500 md:top-auto md:left-1/2">
                    <div className={node.color}>{node.icon}</div>
                  </div>

                  <div className="hidden w-[45%] md:block md:order-1" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}