"use client";

import { useMemo, useState } from "react";
import styles from "./NetworkShowcase.module.css";

type ClusterItem = {
  label: string;
  tag: string;
};

type Cluster = {
  id: string;
  title: string;
  nodeTag: string;
  positionClass: string;
  description: string;
  bullets: ClusterItem[];
};

export default function NetworkShowcase() {
  const clusters = useMemo<Cluster[]>(
    () => [
      {
        id: "predictive",
        title: "Predictive Systems & AI Workflows",
        nodeTag: "AI / ML",
        positionClass: styles.predictive,
        description:
          "Building intelligent systems that learn from data, automate decisions, and improve performance over time.",
        bullets: [
          { label: "Feature engineering + model iteration", tag: "core" },
          { label: "Evaluation & monitoring pipelines", tag: "production" },
          { label: "Human-centered AI + UX alignment", tag: "impact" }
        ]
      },
      {
        id: "distributed",
        title: "Distributed Infrastructure & Cloud",
        nodeTag: "CLOUD",
        positionClass: styles.distributed,
        description:
          "Designing scalable, resilient infrastructure patterns for modern web systems and data workloads.",
        bullets: [
          { label: "Scalable architectures & API design", tag: "systems" },
          { label: "Security fundamentals & IAM mindset", tag: "security" },
          { label: "Cost-aware infrastructure choices", tag: "ops" }
        ]
      },
      {
        id: "data",
        title: "Data Intelligence & Analytics",
        nodeTag: "DATA",
        positionClass: styles.data,
        description:
          "Turning raw data into insights through dashboards, KPIs, and storytelling that supports decisions.",
        bullets: [
          { label: "Dashboards + KPI frameworks", tag: "analytics" },
          { label: "Data modeling & cleaning workflows", tag: "quality" },
          { label: "Stakeholder-ready reporting", tag: "storytelling" }
        ]
      },
      {
        id: "deployment",
        title: "Deployment Automation & DevOps",
        nodeTag: "DEVOPS",
        positionClass: styles.deployment,
        description:
          "Shipping confidently with automation, repeatable environments, and stable releases.",
        bullets: [
          { label: "CI/CD foundations & release flow", tag: "delivery" },
          { label: "Environment consistency & tooling", tag: "reliability" },
          { label: "Observability-first deployment habits", tag: "ops" }
        ]
      },
      {
        id: "optimization",
        title: "Optimization & Observability",
        nodeTag: "PERFORMANCE",
        positionClass: styles.optimization,
        description:
          "Improving speed, stability, and reliability using metrics, profiling, and feedback loops.",
        bullets: [
          { label: "Performance profiling & tuning", tag: "speed" },
          { label: "Telemetry mindset (logs/metrics/traces)", tag: "observability" },
          { label: "UX-focused optimizations", tag: "product" }
        ]
      }
    ],
    []
  );

  const [activeId, setActiveId] = useState<string>("optimization");
  const active = clusters.find((c) => c.id === activeId) ?? clusters[0];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>Capability Network</h2>
        <p>
          A high-level view of the systems + data capabilities powering my portfolio work —
          interconnected, scalable, and built for impact.
        </p>
      </div>

      {/* Desktop/Tablet network */}
      <div className={styles.networkContainer}>
        {/* SVG animated lines */}
        <svg
          className={styles.networkLines}
          viewBox="0 0 1000 620"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Center */}
          <line x1="500" y1="310" x2="200" y2="120" />
          <line x1="500" y1="310" x2="800" y2="120" />
          <line x1="500" y1="310" x2="200" y2="520" />
          <line x1="500" y1="310" x2="800" y2="520" />
          <line x1="500" y1="310" x2="500" y2="70" />

          {/* extra cross links (subtle depth) */}
          <line x1="200" y1="120" x2="500" y2="70" />
          <line x1="800" y1="120" x2="500" y2="70" />
          <line x1="200" y1="520" x2="800" y2="520" />
          <line x1="200" y1="120" x2="800" y2="120" />
        </svg>

        {/* Central node */}
        <div className={styles.centralNode}>
          <h3>Digital Infrastructure Core</h3>
          <span className={styles.nodeTag}>SYSTEMS • DATA • UX</span>
          <p>
            A portfolio built around scalable web systems, data-driven decisioning, and clean UI engineering —
            connected like a modern digital ecosystem.
          </p>
        </div>

        {/* Cluster nodes */}
        {clusters.map((c) => {
          const isActive = c.id === activeId;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveId(c.id)}
              className={`${styles.clusterNode} ${c.positionClass} ${isActive ? styles.active : ""}`}
              aria-pressed={isActive}
            >
              <h4>{c.title}</h4>
            </button>
          );
        })}
      </div>

      {/* Details panel */}
      <div className={styles.clusterDetails}>
        <div className={styles.detailsPanel}>
          <h3>{active.title}</h3>
          <span className={styles.expTag}>{active.nodeTag}</span>

          <p style={{ marginTop: 10, color: "rgba(230, 241, 255, 0.72)", fontSize: "0.92rem" }}>
            {active.description}
          </p>

          <ul>
            {active.bullets.map((b) => (
              <li key={b.label}>
                <span>{b.label}</span>
                <span className={styles.expTag}>{b.tag}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile fallback */}
      <div className={styles.mobileFallback}>
        {clusters.map((c) => (
          <div key={c.id} className={styles.mobilePanel}>
            <h4>{c.title}</h4>
            <ul>
              {c.bullets.map((b) => (
                <li key={b.label}>
                  <span>{b.label}</span>
                  <span className={styles.expTag}>{b.tag}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}