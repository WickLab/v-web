"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Mail,
  GraduationCap,
  Award,
  Quote,
  Code2,
  Database,
  BrainCircuit,
  PieChart,
  BookOpen,
  ArrowRight,
  Lock,
  Cloud,
  Terminal,
  ShieldCheck,
  CloudLightning
} from "lucide-react";

// --- Custom Hooks ---
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

// --- Hero Section ---
const Hero = () => {
  const [ref, isVisible] = useReveal();

  return (
    <section className="relative min-h-[80vh] md:min-h-[90vh] flex flex-col items-center justify-center bg-white overflow-hidden pt-28 sm:pt-32 pb-12 sm:pb-16">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-100 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-slate-100 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div
          ref={ref}
          className={`flex flex-col items-center text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-accent)] text-sm font-semibold tracking-wide mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]"></span>
            </span>
            IT Systems & Data Science Undergraduate
          </div>

          <h1 className="text-[clamp(2.25rem,7vw,3.75rem)] font-bold tracking-[-0.02em] mb-5 sm:mb-6 leading-[1.08] text-[var(--color-primary)]">
            Hi, I'm <span className="text-[var(--color-accent)]">Vidula Wickramasinghe</span>
          </h1>

          <p className="text-[24px] text-[var(--color-body-text)] mb-10 leading-relaxed font-medium">
            I leverage data-driven insights and cutting-edge AI solutions to solve real-world problems and accelerate innovation.
            <br />
            Turning Data into Insights | Building Intelligent Systems
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 relative z-20 w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-4 rounded-lg bg-[var(--color-accent)] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[var(--color-accent-hover)] transition-colors">
              View My Work
              <ArrowUpRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-lg border border-[var(--color-secondary-text)] bg-transparent text-[var(--color-primary)] font-semibold flex items-center justify-center gap-2 hover:bg-[var(--color-surface-muted)] transition-all">
              <Mail className="w-5 h-5 text-[var(--color-accent)]" />
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Shared Master Project Data ---
const projectsData = [
  {
    id: "ads-plane-feeder",
    privateContent: true,
    title: "ADS Plane Feeder",
    tagline: "Live aircraft telemetry ingestion and analytics feeder.",
    category: "Data Science / Analytics",
    tech: ["Python", "Next.js", "TypeScript", "SQL"],
    image: "/projects/planeADS-dashboard.png",
  },
  {
    id: "digital-dreamers-shift-drop",
    title: "Digital Dreamers - Shift Drop",
    tagline: "Collaborative scheduling and shift handoff workflow platform.",
    category: "Business Projects",
    tech: ["React", "Next.js", "Tailwind CSS", "Node.js"],
    image: "/projects/drop-swift.png",
  },
  {
    id: "elephant-dashboard",
    title: "Elephant - AI GPS Trucking",
    tagline: "Route intelligence and fleet signal monitoring assistant.",
    category: "Data Science / Analytics",
    tech: ["Python", "Machine Learning", "Map APIs", "PostgreSQL"],
    image: "/projects/Elephant-GP.png",
  },
  {
    id: "self-driving-drone",
    privateContent: true,
    title: "Self Driving Drone",
    tagline: "Autonomous waypoint execution prototype.",
    category: "Academic Projects",
    tech: ["Python", "OpenCV", "Control Systems", "Telemetry"],
    image: "/projects/drone-AI-self.png",
  },
  {
    id: "master-captain-web",
    title: "Master Captain Web",
    tagline: "Leadership-focused brand and platform ecosystem.",
    category: "Web Development",
    tech: ["Next.js", "React", "TypeScript", "CMS Architecture"],
    image: "/projects/captain-web.png",
  },
  {
    id: "lanka-harvest-hub",
    title: "LankaHarvest Hub",
    tagline: "Agricultural Export Platform concept.",
    category: "Web Development",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image: "/projects/lanka-harvest.png",
  },
];

// --- Featured Projects Section ---
function FeaturedProjects() {
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
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-12 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-3">
              <div className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)]"></span>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">Featured Work</span>
            </div>
            <h2 className="mb-3 text-[clamp(1.75rem,4vw,2.25rem)] font-semibold tracking-tight text-[var(--color-primary)]">Highlighted Projects</h2>
            <p className="text-sm leading-relaxed text-[var(--color-body-text)]">Selected work demonstrating engineering depth and systems thinking.</p>
          </div>
          <a href="/achievements" className="hidden md:inline-flex items-center gap-2 rounded-lg border border-[var(--color-secondary-text)] bg-transparent px-5 py-2.5 text-xs font-semibold text-[var(--color-primary)] transition-all hover:bg-white group">
            View all projects <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="min-h-[360px]">
          <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {currentProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="h-full"
                >
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-[var(--color-border)] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative m-1.5 mb-0 h-36 overflow-hidden rounded-t-lg bg-[var(--color-surface-muted)]">
                      <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="flex flex-grow flex-col p-4">
                      <h3 className="mb-2 text-[15px] font-semibold text-[var(--color-primary)]">{project.title}</h3>
                      <p className="mb-4 text-xs leading-relaxed text-[var(--color-body-text)]">{project.tagline}</p>
                      <div className="mb-5 flex flex-wrap gap-1.5">
                        {project.tech.slice(0, 3).map((t) => (
                          <span key={t} className="rounded-full border border-[var(--color-border)] bg-[var(--color-tag-bg)] px-2.5 py-1 text-[10px] font-medium text-[var(--color-accent)]">{t}</span>
                        ))}
                      </div>
                      <a href={`/achievements?project=${project.id}`} className="mt-auto inline-flex items-center gap-1.5 border-t border-[var(--color-border)] pt-3 text-xs font-semibold text-[var(--color-accent)]">
                        View project details <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Certifications Section (Slideshow Roller) ---
const Certifications = () => {
  const [ref, isVisible] = useReveal();

  const certs = [
    { name: "Machine Learning Specialization", issuer: "DeepLearning.AI", date: "2023", color: "text-purple-600", bg: "bg-purple-50", borderColor: "border-purple-200", icon: Award },
    { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", date: "2023", color: "text-orange-600", bg: "bg-orange-50", borderColor: "border-orange-200", icon: CloudLightning },
    { name: "IBM Data Science Professional", issuer: "IBM", date: "2023", color: "text-indigo-600", bg: "bg-indigo-50", borderColor: "border-indigo-200", icon: Award },
    { name: "Google Data Analytics", issuer: "Coursera", date: "2024", color: "text-cyan-600", bg: "bg-cyan-50", borderColor: "border-cyan-200", icon: PieChart },
    { name: "Azure Fundamentals (AZ-900)", issuer: "Microsoft", date: "2024", color: "text-sky-600", bg: "bg-sky-50", borderColor: "border-sky-200", icon: Cloud },
    { name: "Python for Data Science", issuer: "DataCamp", date: "2023", color: "text-emerald-600", bg: "bg-emerald-50", borderColor: "border-emerald-200", icon: Code2 },
    { name: "Agile Project Management", issuer: "Atlassian", date: "2024", color: "text-blue-600", bg: "bg-blue-50", borderColor: "border-blue-200", icon: ShieldCheck },
    { name: "Cybersecurity Fundamentals", issuer: "CompTIA", date: "2023", color: "text-red-600", bg: "bg-red-50", borderColor: "border-red-200", icon: Lock },
  ];

  // Double the array for a seamless infinite loop
  const duplicatedCerts = [...certs, ...certs];

  return (
    <section className="py-20 md:py-[100px] bg-white overflow-hidden relative">
      <div className="max-w-[1200px] mx-auto px-6 mb-12">
        <div ref={ref} className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]"></span>
            </div>
            <span className="text-[var(--color-accent)] text-[11px] font-bold tracking-[0.2em] uppercase">Continuous Learning</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] tracking-tight">Certifications & Badges</h2>
        </div>
      </div>

      {/* Roller Container */}
      <div className="relative">
        {/* Gradient Overlays for Fade Effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Infinite Scroller */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-6 py-4 px-3"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 40,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {duplicatedCerts.map((cert, i) => {
              const Icon = cert.icon;
              return (
                <div
                  key={i}
                  className="flex-shrink-0 w-[280px] sm:w-[320px] p-6 rounded-2xl bg-white border border-[var(--color-border)] hover:border-[var(--color-accent)]/40 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${cert.bg} ${cert.borderColor} ${cert.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[var(--color-surface-muted)] text-[10px] font-bold text-[var(--color-secondary-text)]">{cert.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--color-primary)] mb-4 leading-tight">{cert.name}</h3>
                  <div className="mt-auto pt-4 border-t border-[var(--color-border)] flex items-center gap-2 text-sm text-[var(--color-secondary-text)] font-medium">
                    <Award className="w-4 h-4 text-[var(--color-accent)]" />
                    {cert.issuer}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- Academic Section ---
const Academic = () => {
  const [ref, isVisible] = useReveal();
  const education = [
    { degree: "Bachelor of Information Systems", school: "Imes Institute", location: "Melbourne VIC", period: "Sept 2024 to Present", status: "Current" },
    { degree: "Bachelor of Computer Science (Commenced)", school: "Swinburne University of Technology", location: "Hawthorn VIC", period: "Feb 2024 to Aug 2024", status: "Completed" },
    { degree: "Diploma of Information Technology", school: "Swinburne / NCHS", location: "Sri Lanka", period: "Feb 2023 to Oct 2023", status: "Completed" },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[var(--color-surface-muted)]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div ref={ref} className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 rounded-lg bg-white border border-[var(--color-border)]">
              <GraduationCap className="w-7 h-7 text-[var(--color-accent)]" />
            </div>
            <h2 className="text-[32px] font-semibold text-[var(--color-primary)]">Academic Journey</h2>
          </div>
          <div className="p-8 md:p-12 rounded-lg bg-white border border-[var(--color-border)]">
            <div className="relative pl-8 border-l-2 border-[var(--color-border)] space-y-10">
              {education.map((edu, idx) => (
                <div key={idx} className="relative">
                  <div className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-white ${edu.status === 'Current' ? 'bg-[var(--color-accent)] animate-pulse' : 'bg-slate-300'}`} />
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-[var(--color-primary)]">{edu.degree}</h3>
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-[var(--color-tag-bg)] border border-[var(--color-border)] text-[var(--color-accent)]">{edu.period}</span>
                  </div>
                  <p className="text-[var(--color-accent)] text-sm font-medium">{edu.school}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Skills Section ---
const Skills = () => {
  const [ref, isVisible] = useReveal();
  const techCategories = [
    { title: "Data & AI", icon: <BrainCircuit className="w-5 h-5 text-[var(--color-accent)]" />, skills: ["Python", "Pandas", "Machine Learning", "SQL", "Power BI"] },
    { title: "Software Engineering", icon: <Code2 className="w-5 h-5 text-[var(--color-accent)]" />, skills: ["React.js", "Next.js", "TypeScript", "Tailwind", "Node.js"] },
    { title: "Infrastructure", icon: <Cloud className="w-5 h-5 text-[var(--color-accent)]" />, skills: ["AWS", "Azure", "REST APIs", "Git", "DB Design"] }
  ];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div ref={ref} className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="text-center mb-16">
            <h2 className="text-[36px] font-semibold mb-4 text-[var(--color-primary)]">Core Capabilities</h2>
            <p className="text-[var(--color-body-text)] max-w-2xl mx-auto">Bridging technical complexity with strategic business impact.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {techCategories.map((category, idx) => (
              <div key={idx} className="p-6 rounded-lg bg-[var(--color-surface-muted)] border border-[var(--color-border)]">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-[var(--color-primary)]">
                  {category.icon} {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-white border border-[var(--color-border)] rounded-md text-xs font-medium text-[var(--color-body-text)]">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Philosophy Section ---
const Philosophy = () => {
  const [ref, isVisible] = useReveal();
  return (
    <section className="py-20 bg-[var(--color-surface-muted)] text-center border-t border-[var(--color-border)]">
      <div ref={ref} className={`max-w-4xl mx-auto px-6 transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
        <Quote className="w-12 h-12 text-[var(--color-accent)] mx-auto mb-8 opacity-40" />
        <p className="text-2xl md:text-3xl font-light italic text-[var(--color-primary)] leading-relaxed">
          "I believe in leveraging data to drive smarter decisions, building systems that create impact, and continuously innovating in a fast-changing world."
        </p>
      </div>
    </section>
  );
};

// --- Main Page Assembly ---
export default function PortfolioHome() {
  return (
    <div className="min-h-screen bg-white selection:bg-cyan-100 selection:text-[var(--color-primary)] font-sans overflow-x-hidden">
      <Hero />
      <FeaturedProjects />
      <Certifications />
      <Academic />
      <Skills />
      <Philosophy />
    </div>
  );
}