"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Code2, Lock } from "lucide-react";

// --- Shared Master Project Data ---
const projectsData = [
  {
    id: "ads-plane-feeder",
    privateContent: true,
    title: "ADS Plane Feeder",
    tagline: "Live aircraft telemetry ingestion and analytics feeder.",
    category: "Data Science / Analytics",
    problem: "Flight telemetry streams were fragmented and hard to monitor in one place.",
    solution:
      "Built a unified ingestion and visualization workflow for real-time flight data with structured monitoring.",
    tech: ["Python", "Next.js", "TypeScript", "SQL"],
    image: "/projects/planeADS-dashboard.png",
    github: "https://github.com/your-username/ads-plane-feeder",
    learnings: [
      "Streaming ingestion design",
      "Data normalization",
      "Operational observability",
    ],
    overview:
      "A telemetry processing pipeline with dashboard visibility for continuous aircraft feed health.",
    fullDetails: [
      "Designed parser and validation logic for incoming telemetry payloads.",
      "Implemented dashboard widgets for latency, throughput, and signal continuity.",
      "Used structured storage for trend analysis and anomaly review.",
    ],
  },
  {
    id: "digital-dreamers-shift-drop",
    title: "Digital Dreamers - Shift Drop",
    tagline: "Collaborative scheduling and shift handoff workflow platform.",
    category: "Business / Entrepreneurial Projects",
    problem: "Team shift transitions caused information loss and delays.",
    solution:
      "Created a shift-centric interface for assignment, handoff notes, and accountability tracking.",
    tech: ["React", "Next.js", "Tailwind CSS", "Node.js"],
    image: "/projects/drop-swift.png",
    github: "https://github.com/your-username/shift-drop",
    learnings: ["Workflow modeling", "Team UX", "Audit-friendly event design"],
    overview:
      "A product workflow that improves shift continuity with clearer handoff visibility.",
    fullDetails: [
      "Mapped shift lifecycle and edge cases for handoff scenarios.",
      "Developed role-based views for supervisors and team members.",
      "Added timeline logs for transparent operational accountability.",
    ],
  },
  {
    id: "elephant-ai-gps-trucking-belt",
    title: "Elephant - AI - GPS Trucking Belt",
    tagline: "Route intelligence and fleet signal monitoring assistant.",
    category: "Data Science / Analytics",
    problem: "Fleet movement lacked predictive route insights and alerting.",
    solution:
      "Engineered a route-scoring assistant using GPS streams and simple predictive logic.",
    tech: ["Python", "Machine Learning", "Map APIs", "PostgreSQL"],
    image: "/projects/Elephant-GP.png",
    github: "https://github.com/your-username/elephant-gps-ai",
    learnings: ["Geo-data pipelines", "Feature engineering", "Decision support UX"],
    overview:
      "An AI-assisted logistics concept focused on route quality and proactive fleet operations.",
    fullDetails: [
      "Processed GPS history to derive route quality indicators.",
      "Scored route segments and generated operator-friendly recommendations.",
      "Designed geospatial snapshots for control-room style review.",
    ],
  },
  {
    id: "self-driving-drone",
    privateContent: true,
    title: "Self Driving Drone",
    tagline: "Autonomous waypoint execution and mission telemetry prototype.",
    category: "Academic Projects",
    problem: "Manual drone piloting reduced repeatability in mission tasks.",
    solution:
      "Built autonomous waypoint logic with fail-safe behavior and telemetry logging.",
    tech: ["Python", "OpenCV", "Control Systems", "Telemetry"],
    image: "/projects/drone-AI-self.png",
    github: "https://github.com/your-username/self-driving-drone",
    learnings: ["Mission planning", "Control-loop tuning", "Safety-first autonomy"],
    overview:
      "A practical autonomy prototype for predictable path-following and robust mission replay.",
    fullDetails: [
      "Implemented waypoint navigation with heading correction.",
      "Added contingency states for unstable signal conditions.",
      "Logged mission traces for post-flight analysis and iteration.",
    ],
  },
  {
    id: "holographic-eye",
    privateContent: true,
    title: "Holographic Eye",
    tagline: "Vision-driven interaction concept with immersive feedback.",
    category: "UI/UX Design",
    problem: "Traditional interfaces lacked intuitive spatial interaction cues.",
    solution:
      "Prototyped a responsive visual interaction layer blending motion, depth, and focus states.",
    tech: ["Three.js", "Framer Motion", "TypeScript", "UX Prototyping"],
    image: "/projects/HOLO-AI-EYE.png",
    github: "https://github.com/your-username/holographic-eye",
    learnings: [
      "Human-centric motion design",
      "Spatial UI",
      "Progressive interaction states",
    ],
    overview: "An exploratory interface concept focused on depth-aware visual communication.",
    fullDetails: [
      "Designed visual hierarchy for near/far interaction cues.",
      "Integrated micro-interaction timing for cognitive clarity.",
      "Validated concept responsiveness across desktop breakpoints.",
    ],
  },
  {
    id: "maths-tutor-program",
    title: "Maths Tutor Program",
    tagline: "Adaptive tutoring workflow for guided learning outcomes.",
    category: "Academic Projects",
    problem: "Students needed personalized progression across mixed math skill levels.",
    solution:
      "Built adaptive quiz flows with learning-path recommendations and progress tracking.",
    tech: ["TypeScript", "React", "Algorithms", "Data Tracking"],
    image: "/projects/maths-class.png",
    github: "https://github.com/your-username/maths-tutor-program",
    learnings: ["Adaptive logic", "Learning analytics", "Feedback loops"],
    overview:
      "An educational system prototype to personalize practice and improvement pacing.",
    fullDetails: [
      "Created level-based question pools with dynamic difficulty.",
      "Tracked user performance trends and weak-topic concentration.",
      "Generated follow-up content recommendations per learner profile.",
    ],
  },
  {
    id: "paresa-cleaning",
    title: "Paresa Cleaning",
    tagline: "Service business platform for bookings and operations visibility.",
    category: "Web Development",
    problem: "Manual booking operations caused scheduling conflicts and low visibility.",
    solution:
      "Developed a booking-centric website with request workflows and service management views.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Forms"],
    image: "/projects/pareza.png",
    live: "https://your-live-demo-link.com",
    learnings: [
      "Service workflow design",
      "Customer journey mapping",
      "Operational clarity",
    ],
    overview:
      "A practical operations platform for service scheduling and customer request handling.",
    fullDetails: [
      "Structured booking forms with validation and routing logic.",
      "Designed service catalog and request lifecycle status flows.",
      "Improved admin-side clarity for daily schedule planning.",
    ],
  },
  {
    id: "dilsena-gem-exporter",
    title: "Dilsena Gem Exporter",
    tagline: "Export-facing catalog and buyer inquiry platform.",
    category: "Business / Entrepreneurial Projects",
    problem: "Global buyers needed clearer product confidence and inquiry workflows.",
    solution:
      "Built an export-ready presentation platform with structured gem catalog and buyer conversion paths.",
    tech: ["Next.js", "TypeScript", "SEO", "Tailwind CSS"],
    image: "/projects/dilseana-gem.png",
    live: "https://your-live-demo-link.com",
    learnings: ["B2B UX strategy", "Trust signaling", "Content architecture"],
    overview:
      "A digital exporter presence emphasizing trust, clarity, and conversion-ready flow.",
    fullDetails: [
      "Built categorized inventory views with quality metadata.",
      "Integrated inquiry flow aligned with export communication needs.",
      "Designed trust-focused information hierarchy for global buyers.",
    ],
  },
  {
    id: "master-captain-web",
    title: "Master Captain Web",
    tagline: "Leadership-focused brand and platform ecosystem.",
    category: "Web Development",
    problem:
      "The brand needed a structured digital identity and scalable content foundation.",
    solution:
      "Delivered a modular website architecture with reusable content blocks and clear narrative progression.",
    tech: ["Next.js", "React", "TypeScript", "CMS-ready architecture"],
    image: "/projects/captain-web.png",
    github: "https://github.com/your-username/master-captain-web",
    learnings: [
      "Brand-system implementation",
      "Modular page design",
      "Scalable content strategy",
    ],
    overview:
      "A modular web foundation for a leadership-driven digital brand experience.",
    fullDetails: [
      "Developed reusable sections for growth-ready content expansion.",
      "Established clear narrative hierarchy for conversion-oriented storytelling.",
      "Prepared architecture for future CMS and analytics integration.",
    ],
  },
  {
    id: "lanka-harvest-hub",
    title: "LankaHarvest Hub",
    tagline:
      "Agricultural Export Platform connecting Sri Lankan farmers with Australian buyers.",
    category: "Web Development",
    problem: "Farmers lacked direct global buyer access.",
    solution:
      "Developed a multi-page responsive website with structured product pages and export workflow simulation.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image: "/projects/lanka-harvest.png",
    github: "https://github.com/your-username/lanka-harvest-hub",
    live: "https://your-live-demo-link.com",
    learnings: [
      "Structured data presentation",
      "Scalable UI sections",
      "Export-process storytelling",
    ],
    overview:
      "A portfolio-grade export platform concept improving buyer-farmer visibility.",
    fullDetails: [
      "Created responsive product taxonomy and buyer intent pathways.",
      "Implemented clean information architecture for export context.",
      "Used motion for guided content progression and readability.",
    ],
  },
];

export default function FeaturedProjects() {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    const timer = setInterval(() => {
      setStartIndex((prevIndex) =>
        prevIndex + itemsPerPage >= projectsData.length ? 0 : prevIndex + itemsPerPage
      );
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const currentProjects = projectsData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="relative overflow-hidden bg-[var(--color-surface-muted)] py-16 sm:py-20 md:py-[100px]">
      {/* Ambient Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute right-0 top-1/4 h-[420px] w-[420px] translate-x-1/3 rounded-full bg-cyan-100 blur-[120px] sm:h-[520px] sm:w-[520px]" />
        <div className="absolute bottom-1/4 left-0 h-[360px] w-[360px] -translate-x-1/3 rounded-full bg-slate-100 blur-[110px] sm:h-[440px] sm:w-[440px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Header Section */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-12 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-3">
              <div className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)]"></span>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                Featured Work
              </span>
            </div>

            <h2 className="mb-3 text-[clamp(1.75rem,4vw,2.25rem)] font-semibold tracking-tight text-[var(--color-primary)]">
              Highlighted Projects
            </h2>

            <p className="text-sm leading-relaxed text-[var(--color-body-text)]">
              Selected work demonstrating engineering depth, systems thinking, and delivery focus.
            </p>
          </div>

          <a
            href="/achievements"
            className="hidden md:inline-flex items-center gap-2 rounded-lg border border-[var(--color-secondary-text)] bg-transparent px-5 py-2.5 text-xs font-semibold text-[var(--color-primary)] transition-all hover:bg-white group"
          >
            View all projects
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Dynamic Project Grid */}
        <div className="min-h-[360px]">
          <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {currentProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="h-full"
                >
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-[var(--color-border)] bg-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#F8FAFC] hover:shadow-[0_12px_24px_-12px_rgba(15,23,42,0.18)]">
                    {/* Image */}
                    <div className="relative m-1.5 mb-0 h-36 overflow-hidden rounded-t-lg bg-[var(--color-surface-muted)]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />

                      <div className="absolute right-3 top-3 flex h-8 w-8 translate-y-2 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-accent)] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <Code2 size={14} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-grow flex-col p-4 pt-3">
                      <h3 className="mb-2 text-[15px] font-semibold text-[var(--color-primary)] transition-colors group-hover:text-[var(--color-accent)]">
                        {project.title}
                      </h3>

                      <p className="mb-4 flex-grow line-clamp-2 text-xs leading-relaxed text-[var(--color-body-text)] sm:text-sm">
                        {project.tagline}
                      </p>

                      {project.privateContent && (
                        <div className="mb-3">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-amber-700">
                            <Lock size={10} />
                            Secure gateway
                          </span>
                        </div>
                      )}

                      <div className="mb-5 flex flex-wrap gap-1.5">
                        {project.tech.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-[var(--color-border)] bg-[var(--color-tag-bg)] px-2.5 py-1 text-[10px] font-medium text-[var(--color-accent)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <a
                        href={`/achievements?project=${project.id}`}
                        className="group/link mt-auto inline-flex items-center gap-1.5 border-t border-[var(--color-border)] pt-3 text-xs font-semibold text-[var(--color-accent)]"
                      >
                        <span className="relative">
                          View project details
                          <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-[var(--color-accent)] transition-all duration-300 group-hover/link:w-full" />
                        </span>
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-300 group-hover/link:translate-x-0.5"
                        />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Button */}
        <div className="mt-8 flex justify-center md:hidden">
          <a
            href="/achievements"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--color-secondary-text)] bg-transparent px-5 py-3 text-xs font-semibold text-[var(--color-primary)] transition-all hover:bg-white"
          >
            View all projects <ArrowRight size={14} />
          </a>
        </div>

        {/* Progress Indicators */}
        <div className="mt-8 hidden items-center justify-center gap-2 md:flex">
          {Array.from({ length: Math.ceil(projectsData.length / itemsPerPage) }).map(
            (_, idx) => (
              <button
                key={idx}
                onClick={() => setStartIndex(idx * itemsPerPage)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  startIndex === idx * itemsPerPage
                    ? "w-6 bg-[var(--color-accent)]"
                    : "w-2 bg-[var(--color-border)] hover:bg-slate-300"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}