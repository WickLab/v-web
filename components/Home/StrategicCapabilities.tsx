"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  BrainCircuit,
  Users,
  Compass,
  Search,
  LineChart,
  Cpu,
  Waypoints,
  Target,
  MessageSquare,
  Handshake,
  Globe,
} from "lucide-react";

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

export default function StrategicCapabilities() {
  const [ref, isVisible] = useReveal();
  const [activeTab, setActiveTab] = useState(0);

  const capabilities = [
    {
      id: "data-analysis",
      title: "Data & Analysis",
      icon: <Database className="w-5 h-5" />,
      color: "text-[var(--color-accent)]",
      bgGlow: "bg-cyan-100",
      borderGlow: "hover:border-cyan-200",
      skills: [
        {
          name: "Data Exploration",
          icon: <Search className="w-6 h-6 text-[var(--color-accent)]" />,
          desc: "Ability to collect, examine, and understand datasets to identify patterns, trends, and anomalies. This includes cleaning and organizing raw data, exploring variables, and forming initial insights that support informed decision-making. Effective data exploration helps transform unstructured information into meaningful knowledge.",
        },
        {
          name: "Basic Analytics",
          icon: <LineChart className="w-6 h-6 text-[var(--color-accent)]" />,
          desc: "Competence in applying fundamental analytical techniques such as descriptive statistics, simple modeling, and trend analysis. These skills enable the interpretation of data to answer practical questions, evaluate performance, and support strategic planning.",
        },
        {
          name: "Data Visualization",
          icon: <Compass className="w-6 h-6 text-[var(--color-accent)]" />,
          desc: "Capability to communicate insights clearly through visual tools such as charts, dashboards, and graphs. Strong data visualization helps simplify complex datasets, making findings easier for stakeholders to understand and use in decision-making.",
        },
      ],
    },
    {
      id: "systems-thinking",
      title: "Systems Thinking",
      icon: <BrainCircuit className="w-5 h-5" />,
      color: "text-slate-700",
      bgGlow: "bg-slate-100",
      borderGlow: "hover:border-slate-200",
      skills: [
        {
          name: "Information Systems Understanding",
          icon: <Cpu className="w-6 h-6 text-slate-700" />,
          desc: "Knowledge of how digital and organizational systems interact to support business operations. This includes understanding databases, enterprise systems, and how information flows between different components of an organization.",
        },
        {
          name: "Process Mapping",
          icon: <Waypoints className="w-6 h-6 text-slate-700" />,
          desc: "Ability to analyze and document workflows using structured diagrams and models. Process mapping helps identify inefficiencies, redundancies, and opportunities for improvement in operational processes.",
        },
        {
          name: "Problem Analysis",
          icon: <Target className="w-6 h-6 text-slate-700" />,
          desc: "Structured approach to identifying root causes of issues and evaluating potential solutions. This involves breaking down complex problems into manageable components and assessing impacts from multiple perspectives.",
        },
      ],
    },
    {
      id: "collaboration",
      title: "Collaboration",
      icon: <Users className="w-5 h-5" />,
      color: "text-emerald-600",
      bgGlow: "bg-emerald-100",
      borderGlow: "hover:border-emerald-200",
      skills: [
        {
          name: "Communication",
          icon: <MessageSquare className="w-6 h-6 text-emerald-600" />,
          desc: "Ability to convey ideas, insights, and technical information clearly to both technical and non-technical audiences through written reports, presentations, and discussions.",
        },
        {
          name: "Team Projects",
          icon: <Handshake className="w-6 h-6 text-emerald-600" />,
          desc: "Experience working collaboratively within multidisciplinary teams to achieve shared objectives. This includes coordinating tasks, contributing to group problem-solving, and supporting collective outcomes.",
        },
        {
          name: "Stakeholder Awareness",
          icon: <Globe className="w-6 h-6 text-emerald-600" />,
          desc: "Understanding the needs, expectations, and perspectives of different stakeholders. This capability supports effective engagement, ensuring that solutions align with organizational goals and user requirements.",
        },
      ],
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-[100px]">
      <div className="absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-60 transition-all duration-1000 ease-in-out">
        <div
          className={`absolute top-1/4 left-1/4 h-[420px] w-[420px] rounded-full blur-[130px] transition-colors duration-1000 ${capabilities[activeTab].bgGlow}`}
        />
        <div
          className={`absolute bottom-1/4 right-1/4 h-[420px] w-[420px] rounded-full blur-[130px] transition-colors duration-1000 ${capabilities[(activeTab + 1) % 3].bgGlow}`}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6">
        <div
          ref={ref}
          className={`mb-12 text-center transition-all duration-700 sm:mb-16 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="mb-4 text-[clamp(1.9rem,4vw,3rem)] font-semibold tracking-tight text-[var(--color-primary)]">
            Strategic Capabilities
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[var(--color-body-text)] sm:text-lg">
            The intersection of analytical rigor and strategic thinking.
          </p>
        </div>

        <div
          className={`mx-auto mb-10 flex w-full max-w-4xl flex-col items-center justify-center gap-2 rounded-3xl border border-[var(--color-border)] bg-white/90 p-2 shadow-sm backdrop-blur-xl transition-all duration-700 delay-200 sm:mb-12 sm:flex-row sm:rounded-full ${
            isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          {capabilities.map((cat, idx) => {
            const isActive = activeTab === idx;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`relative flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 sm:w-auto sm:py-3.5 ${
                  isActive
                    ? "text-white"
                    : "text-[var(--color-secondary-text)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-primary)]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="strategicCapabilitiesTab"
                    className="absolute inset-0 rounded-full bg-[var(--color-accent)] shadow-[0_10px_30px_-15px_rgba(6,182,212,0.7)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors ${
                    isActive ? "text-white" : cat.color
                  }`}
                >
                  {cat.icon}
                </span>
                <span className="relative z-10">{cat.title}</span>
              </button>
            );
          })}
        </div>

        <div className="min-h-[450px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-5 lg:grid-cols-3 lg:gap-6"
            >
              {capabilities[activeTab].skills.map((skill, idx) => (
                <div
                  key={idx}
                  className={`group flex h-full flex-col rounded-[2rem] border border-[var(--color-border)] bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-[var(--color-surface-muted)] hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.22)] sm:p-8 ${capabilities[activeTab].borderGlow}`}
                >
                  <div className="mb-6 flex items-center gap-4">
                    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-3.5 transition-transform duration-500 group-hover:scale-110">
                      {skill.icon}
                    </div>
                    <h3 className="text-xl font-semibold leading-tight text-[var(--color-primary)] transition-colors group-hover:text-[var(--color-accent)]">
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