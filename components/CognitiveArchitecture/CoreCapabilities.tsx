"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BrainCircuit,
  Compass,
  Cpu,
  Database,
  Globe,
  Handshake,
  LineChart,
  MessageSquare,
  Search,
  Target,
  Users,
  Waypoints,
} from "lucide-react";

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

export default function CoreCapabilities() {
  const [ref, isVisible] = useReveal();
  const [activeTab, setActiveTab] = useState(0);

  const capabilities = [
    {
      id: "data-analysis",
      title: "Data & Analysis",
      icon: <Database className="h-5 w-5" />,
      accentText: "text-[var(--color-accent)]",
      glow: "bg-cyan-100",
      borderGlow: "hover:border-cyan-200",
      skills: [
        {
          name: "Data Exploration",
          icon: <Search className="h-6 w-6 text-[var(--color-accent)]" />,
          desc: "Ability to collect, examine, and understand datasets to identify patterns, trends, and anomalies. This includes cleaning and organizing raw data, exploring variables, and forming initial insights that support informed decision-making.",
        },
        {
          name: "Basic Analytics",
          icon: <LineChart className="h-6 w-6 text-[var(--color-accent)]" />,
          desc: "Competence in applying fundamental analytical techniques such as descriptive statistics, simple modeling, and trend analysis. These skills enable the interpretation of data to answer practical questions and support strategic planning.",
        },
        {
          name: "Data Visualization",
          icon: <Compass className="h-6 w-6 text-[var(--color-accent)]" />,
          desc: "Capability to communicate insights clearly through charts, dashboards, and visual narratives. Strong data visualization helps simplify complex datasets so stakeholders can understand and act on the findings.",
        },
      ],
    },
    {
      id: "systems-thinking",
      title: "Systems Thinking",
      icon: <BrainCircuit className="h-5 w-5" />,
      accentText: "text-slate-700",
      glow: "bg-slate-100",
      borderGlow: "hover:border-slate-200",
      skills: [
        {
          name: "Information Systems Understanding",
          icon: <Cpu className="h-6 w-6 text-slate-700" />,
          desc: "Knowledge of how digital and organizational systems interact to support business operations, including databases, enterprise systems, and how information flows between different components of an organization.",
        },
        {
          name: "Process Mapping",
          icon: <Waypoints className="h-6 w-6 text-slate-700" />,
          desc: "Ability to analyze and document workflows using structured diagrams and models. Process mapping helps identify inefficiencies, redundancies, and opportunities for improvement.",
        },
        {
          name: "Problem Analysis",
          icon: <Target className="h-6 w-6 text-slate-700" />,
          desc: "A structured approach to identifying root causes, evaluating trade-offs, and exploring practical solutions. This supports better decisions across complex systems and business contexts.",
        },
      ],
    },
    {
      id: "collaboration",
      title: "Collaboration",
      icon: <Users className="h-5 w-5" />,
      accentText: "text-emerald-600",
      glow: "bg-emerald-100",
      borderGlow: "hover:border-emerald-200",
      skills: [
        {
          name: "Communication",
          icon: <MessageSquare className="h-6 w-6 text-emerald-600" />,
          desc: "Ability to communicate ideas, insights, and technical information clearly to both technical and non-technical audiences through reports, presentations, and discussions.",
        },
        {
          name: "Team Projects",
          icon: <Handshake className="h-6 w-6 text-emerald-600" />,
          desc: "Experience working collaboratively in multidisciplinary teams to achieve shared objectives through coordination, contribution, and collective problem-solving.",
        },
        {
          name: "Stakeholder Awareness",
          icon: <Globe className="h-6 w-6 text-emerald-600" />,
          desc: "Understanding the needs, expectations, and perspectives of different stakeholders so solutions can align with user requirements and organizational goals.",
        },
      ],
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[var(--color-surface-muted)] py-16 sm:py-20 md:py-[100px]">
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute left-[-5%] top-[12%] h-[280px] w-[280px] rounded-full blur-[110px] opacity-70 transition-all duration-700 sm:h-[360px] sm:w-[360px] ${capabilities[activeTab].glow}`}
        />
        <div className="absolute bottom-[8%] right-[-5%] h-[240px] w-[240px] rounded-full bg-slate-100 blur-[100px] opacity-60 sm:h-[320px] sm:w-[320px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6">
        <div
          ref={ref}
          className={`mb-12 text-center transition-all duration-700 sm:mb-16 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="mb-4 text-[clamp(1.9rem,4vw,3rem)] font-semibold tracking-tight text-[var(--color-primary)]">
            Core Capabilities
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-[var(--color-body-text)] sm:text-base">
            The intersection of analytical rigor and strategic thinking.
          </p>
        </div>

        <div
          className={`mx-auto mb-10 flex w-full max-w-4xl flex-col items-stretch justify-center gap-2 rounded-[1.75rem] border border-[var(--color-border)] bg-white p-2 shadow-sm transition-all duration-700 delay-150 sm:mb-12 sm:flex-row sm:items-center sm:rounded-full ${
            isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          {capabilities.map((cap, idx) => {
            const isActive = activeTab === idx;

            return (
              <button
                key={cap.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`relative flex w-full items-center justify-center gap-2.5 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 sm:w-auto sm:px-6 ${
                  isActive
                    ? "text-white"
                    : "text-[var(--color-secondary-text)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-primary)]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="capabilityTab"
                    className="absolute inset-0 rounded-full bg-[var(--color-accent)] shadow-[0_10px_25px_-14px_rgba(6,182,212,0.65)]"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  />
                )}

                <span className={`relative z-10 ${isActive ? "text-white" : cap.accentText}`}>
                  {cap.icon}
                </span>
                <span className="relative z-10">{cap.title}</span>
              </button>
            );
          })}
        </div>

        <div className="min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={capabilities[activeTab].id}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-6"
            >
              {capabilities[activeTab].skills.map((skill) => (
                <div
                  key={skill.name}
                  className={`group flex h-full flex-col rounded-[1.5rem] border border-[var(--color-border)] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-[#F8FAFC] hover:shadow-[0_16px_34px_-22px_rgba(15,23,42,0.22)] sm:p-6 md:p-7 ${capabilities[activeTab].borderGlow}`}
                >
                  <div className="mb-5 flex items-center gap-4">
                    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-3 transition-transform duration-300 group-hover:scale-105">
                      {skill.icon}
                    </div>

                    <h3 className="text-lg font-semibold leading-tight text-[var(--color-primary)] sm:text-xl">
                      {skill.name}
                    </h3>
                  </div>

                  <p className="flex-grow text-sm leading-relaxed text-[var(--color-body-text)]">
                    {skill.desc}
                  </p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}