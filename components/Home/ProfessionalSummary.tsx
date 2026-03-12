"use client";

import React from "react";
import { motion } from "framer-motion";
import { Database, Code2, Network } from "lucide-react";

export default function ProfessionalSummary() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const pillars = [
    { name: "Information Systems", icon: <Network size={16} className="text-[var(--color-accent)]" /> },
    { name: "Web Engineering", icon: <Code2 size={16} className="text-[var(--color-accent)]" /> },
    { name: "Data Analytics", icon: <Database size={16} className="text-[var(--color-accent)]" /> },
  ];

  return (
    <section id="professional-summary" className="relative bg-white px-4 sm:px-6 py-16 sm:py-20 md:py-[100px] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div className="absolute left-0 top-1/2 w-[420px] sm:w-[500px] h-[420px] sm:h-[500px] bg-cyan-100 rounded-full blur-[120px] sm:blur-[150px] -translate-y-1/2" />
        <div className="absolute right-0 bottom-0 w-[320px] sm:w-[400px] h-[320px] sm:h-[400px] bg-slate-100 rounded-full blur-[100px] sm:blur-[120px]" />
      </div>

      <div className="mx-auto max-w-[1200px] relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative grid grid-cols-1 gap-10 md:gap-12 rounded-lg border border-[var(--color-border)] bg-white p-6 sm:p-8 md:p-12 lg:grid-cols-12 overflow-hidden"
        >
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]"></span>
              </div>
              <span className="text-[var(--color-accent)] text-xs font-bold tracking-widest uppercase">About Me</span>
            </div>

            <h2 className="text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.12] text-[var(--color-primary)] tracking-tight">
              Bridging <br className="hidden lg:block" />
              <span className="text-[var(--color-accent)]">
                Logic, Data, <br className="hidden lg:block" />& Design.
              </span>
            </h2>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col justify-center lg:col-span-7 relative">
            <div className="space-y-5 sm:space-y-6 text-[15px] sm:text-base md:text-lg leading-[1.6] text-[var(--color-body-text)]">
              <p>
                Bachelor of <strong className="font-medium text-[var(--color-primary)]">Information Systems</strong> candidate focused on machine learning, distributed web systems, and production-ready engineering workflows.
              </p>
              <p>
                I design scalable products that combine clean architecture, data-informed decisions, and performance-aware implementation. My direction is to build intelligent digital systems that move from <span className="italic text-[var(--color-accent)]">idea to reliable deployment</span>.
              </p>
            </div>

            <div className="my-8 sm:my-10 h-px w-full bg-[var(--color-border)]" />

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 sm:gap-4">
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 rounded-full border border-[var(--color-border)] bg-[var(--color-tag-bg)] px-4 sm:px-5 py-2.5 text-sm font-medium text-[var(--color-body-text)] transition-all hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-primary)] cursor-default"
                >
                  {pillar.icon}
                  {pillar.name}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}