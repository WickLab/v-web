"use client";

import React, { useEffect, useRef, useState } from "react";
import { BarChart3, Network, Lightbulb, GraduationCap } from "lucide-react";

function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, ...options }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isIntersecting] as const;
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

export default function WhatIBring() {
  const items = [
    {
      title: "Data-Informed Thinking",
      text: "Use data insights to support better product and system decisions.",
      icon: <BarChart3 className="w-8 h-8 text-[var(--color-accent)] mb-4" />,
      className: "md:col-span-2",
    },
    {
      title: "Systems Perspective",
      text: "Understand how users, technology, and business processes connect.",
      icon: <Network className="w-8 h-8 text-[var(--color-accent)] mb-4" />,
      className: "md:row-span-2 flex flex-col justify-center",
    },
    {
      title: "Curiosity & Experimentation",
      text: "Explore new technologies and approaches to solve complex problems.",
      icon: <Lightbulb className="w-8 h-8 text-[var(--color-accent)] mb-4" />,
    },
    {
      title: "Continuous Learning",
      text: "Actively expand skills in analytics, product thinking, and modern tools.",
      icon: <GraduationCap className="w-8 h-8 text-[var(--color-accent)] mb-4" />,
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-[100px] px-4 sm:px-6 bg-[var(--color-surface-muted)]">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="mb-12 sm:mb-16">
            <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-semibold text-[var(--color-primary)] mb-4 tracking-tight">
              What I <span className="text-[var(--color-accent)]">Bring</span>
            </h2>
            <p className="text-base sm:text-lg text-[var(--color-body-text)] max-w-2xl leading-[1.6]">
              I combine information systems thinking, data analysis, and product curiosity to understand problems and design practical solutions.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-[minmax(200px,auto)]">
          {items.map((item, i) => (
            <Reveal
              key={i}
              delay={i * 0.1}
              className={`group rounded-lg border border-[var(--color-border)] bg-white p-5 sm:p-6 md:p-8 hover:bg-[#F8FAFC] transition-all duration-200 ${item.className || ""}`}
            >
              {item.icon}
              <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-3 group-hover:text-[var(--color-accent)]">
                {item.title}
              </h3>
              <p className="text-[var(--color-body-text)] leading-relaxed text-sm sm:text-base">
                {item.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}