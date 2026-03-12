"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

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

const testimonialData = [
  {
    quote: "An exceptional problem solver who approaches systems thinking with clarity and discipline.",
    author: "Professor",
    role: "Academic Mentor",
    initial: "P",
    color: "bg-cyan-100",
  },
  {
    quote: "Demonstrated an innate ability to bridge the gap between complex data sets and actionable business insights.",
    author: "Project Lead",
    role: "Tech Solutions Inc.",
    initial: "L",
    color: "bg-slate-100",
  },
  {
    quote: "Highly disciplined in their approach to architecture, ensuring scalability remains at the core of every design.",
    author: "Senior Architect",
    role: "Industry Consultant",
    initial: "S",
    color: "bg-zinc-100",
  },
];

export default function Testimonials() {
  const [ref, isVisible] = useReveal();

  return (
    <section className="py-16 sm:py-20 md:py-[100px] bg-[var(--color-surface-muted)] text-[var(--color-primary)] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Alignment */}
        <div className="mb-12 sm:mb-16 md:mb-20 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] bg-white text-[11px] font-bold tracking-[0.2em] text-[var(--color-accent)] uppercase mb-6">
            Endorsements
          </div>
          <h2 className="text-[clamp(2rem,4vw,2.5rem)] font-semibold tracking-tight">
            Trusted by Mentors & Peers
          </h2>
        </div>

        {/* Grid Alignment */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {testimonialData.map((item, i) => (
            <div key={i} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                // h-full and flex column ensure the card stretches to match the tallest sibling
                className="group relative flex flex-col h-full p-6 sm:p-8 rounded-2xl bg-white border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 hover:bg-[#F8FAFC] transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
              >
                <Quote className="absolute top-6 right-6 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 text-slate-100 transition-colors duration-300 group-hover:text-[var(--color-accent)]/10" />

                {/* flex-grow pushes the bottom div down */}
                <div className="flex-grow flex flex-col pt-4 sm:pt-2">
                  <p className="text-base sm:text-lg font-medium text-[var(--color-body-text)] leading-relaxed mb-8 italic relative z-10">
                    "{item.quote}"
                  </p>
                </div>

                {/* mt-auto anchors the footer to the bottom */}
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-[var(--color-border)]/60">
                  <div className={`shrink-0 w-12 h-12 rounded-full ${item.color} flex items-center justify-center text-[var(--color-primary)] font-bold border border-[var(--color-border)]`}>
                    {item.initial}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[var(--color-primary)] font-semibold text-sm sm:text-base truncate">
                      {item.author}
                    </p>
                    <p className="text-[var(--color-secondary-text)] text-[11px] font-bold uppercase tracking-wider truncate mt-0.5">
                      {item.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}