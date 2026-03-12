"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";

const CoreCanvas3D = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const fov = 500;
    const nodes: any[] = [];
    const bars: any[] = [];
    const rings: any[] = [];

    const nodeCount = width < 640 ? 90 : width < 1024 ? 130 : 200;
    const barCount = width < 640 ? 18 : width < 1024 ? 26 : 40;

    for (let i = 0; i < nodeCount; i++) {
      const radius = 350 + Math.random() * 400;
      const angle = Math.random() * Math.PI * 2;
      const yOffset = (Math.random() - 0.5) * 300;
      nodes.push({
        x: radius * Math.cos(angle),
        y: yOffset,
        z: radius * Math.sin(angle),
        baseRadius: radius,
        baseAngle: angle,
        speed: Math.random() * 0.002 + 0.0005,
        size: Math.random() * 2 + 0.5,
        type: Math.random() > 0.8 ? "highlight" : "standard",
      });
    }

    for (let i = 0; i < barCount; i++) {
      const radius = 500 + Math.random() * 300;
      const angle = Math.random() * Math.PI * 2;
      bars.push({
        x: radius * Math.cos(angle),
        y: (Math.random() - 0.5) * 400,
        z: radius * Math.sin(angle),
        baseAngle: angle,
        baseRadius: radius,
        height: Math.random() * 150 + 50,
        width: Math.random() * 4 + 2,
        speed: 0.001,
      });
    }

    for (let i = 0; i < 3; i++) {
      rings.push({
        radius: 400 + i * 150,
        tiltX: (Math.random() - 0.5) * 0.5,
        tiltZ: (Math.random() - 0.5) * 0.5,
      });
    }

    const project = (x: number, y: number, z: number) => {
      const zOffset = z + 800;
      if (zOffset < 0.1) return null;

      const scale = fov / zOffset;
      const centerX = width >= 1024 ? width * 0.75 : width >= 640 ? width * 0.64 : width * 0.5;
      const x2D = x * scale + centerX;
      const y2D = y * scale + height / 2;

      return { x: x2D, y: y2D, z: zOffset, scale };
    };

    let globalTime = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      globalTime += 1;

      nodes.forEach((node) => {
        node.baseAngle += node.speed;
        node.x = node.baseRadius * Math.cos(node.baseAngle);
        node.z = node.baseRadius * Math.sin(node.baseAngle);
        node.y += Math.sin(globalTime * 0.02 + node.baseAngle) * 0.5;
      });

      bars.forEach((bar) => {
        bar.baseAngle += bar.speed;
        bar.x = bar.baseRadius * Math.cos(bar.baseAngle);
        bar.z = bar.baseRadius * Math.sin(bar.baseAngle);
      });

      const renderQueue: any[] = [];

      nodes.forEach((node) => {
        const proj = project(node.x, node.y, node.z);
        if (proj) renderQueue.push({ type: "node", proj, ref: node });
      });

      bars.forEach((bar) => {
        const projBottom = project(bar.x, bar.y + bar.height / 2, bar.z);
        const projTop = project(bar.x, bar.y - bar.height / 2, bar.z);
        if (projBottom && projTop) {
          const avgZ = (projBottom.z + projTop.z) / 2;
          renderQueue.push({ type: "bar", projTop, projBottom, z: avgZ, ref: bar });
        }
      });

      renderQueue.sort((a, b) => {
        const zA = a.type === "bar" ? a.z : a.proj.z;
        const zB = b.type === "bar" ? b.z : b.proj.z;
        return zB - zA;
      });

      ctx.lineWidth = 1;
      rings.forEach((ring) => {
        ctx.beginPath();
        for (let a = 0; a <= Math.PI * 2; a += 0.1) {
          const x = ring.radius * Math.cos(a);
          const z = ring.radius * Math.sin(a);
          const y = x * ring.tiltX + z * ring.tiltZ;
          const p = project(x, y, z);
          if (p) {
            const opacity = Math.max(0, Math.min(0.12, p.z > 800 ? 0.02 : 0.12));
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
            if (a === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          }
        }
        ctx.closePath();
        ctx.stroke();
      });

      ctx.beginPath();
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        const projI = project(nodes[i].x, nodes[i].y, nodes[i].z);
        if (!projI) continue;

        for (let j = i + 1; j < Math.min(i + 12, nodes.length); j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dz = nodes[i].z - nodes[j].z;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < 25000) {
            const projJ = project(nodes[j].x, nodes[j].y, nodes[j].z);
            if (projJ) {
              const avgZ = (projI.z + projJ.z) / 2;
              const opacity = Math.max(0, Math.min(0.18, 1 - (avgZ - 400) / 1000));
              ctx.strokeStyle = `rgba(100, 116, 139, ${opacity})`;
              ctx.moveTo(projI.x, projI.y);
              ctx.lineTo(projJ.x, projJ.y);
            }
          }
        }
      }
      ctx.stroke();

      renderQueue.forEach((item) => {
        if (item.type === "node") {
          const { proj, ref } = item;
          const opacity = Math.max(0.1, 1 - (proj.z - 300) / 1200);
          const size = Math.max(0.5, ref.size * proj.scale);

          ctx.beginPath();
          if (ref.type === "highlight") {
            ctx.fillStyle = `rgba(6, 182, 212, ${opacity * 1.2})`;
            ctx.shadowBlur = 10 * proj.scale;
            ctx.shadowColor = "rgba(6, 182, 212, 0.55)";
          } else {
            ctx.fillStyle = `rgba(100, 116, 139, ${opacity})`;
            ctx.shadowBlur = 0;
          }
          ctx.arc(proj.x, proj.y, size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (item.type === "bar") {
          const { projTop, projBottom, z, ref } = item;
          const opacity = Math.max(0.05, 1 - (z - 300) / 1200);
          const width2D = Math.max(1, ref.width * projTop.scale);

          const grad = ctx.createLinearGradient(projTop.x, projTop.y, projBottom.x, projBottom.y);
          grad.addColorStop(0, `rgba(6, 182, 212, ${opacity * 0.8})`);
          grad.addColorStop(0.5, `rgba(100, 116, 139, ${opacity * 0.3})`);
          grad.addColorStop(1, `rgba(100, 116, 139, 0)`);

          ctx.beginPath();
          ctx.lineWidth = width2D;
          ctx.strokeStyle = grad;
          ctx.lineCap = "round";
          ctx.moveTo(projTop.x, projTop.y);
          ctx.lineTo(projBottom.x, projBottom.y);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

const fadeUp = {
  initial: { opacity: 0, y: 24, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white flex items-center pt-24 sm:pt-28 md:pt-32">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <CoreCanvas3D />
      </div>

      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(90deg,#FFFFFF_0%,rgba(255,255,255,0.96)_38%,rgba(255,255,255,0.74)_64%,transparent_100%)] hidden md:block" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,#FFFFFF_0%,rgba(255,255,255,0.92)_42%,rgba(255,255,255,0.8)_72%,#FFFFFF_100%)] md:hidden" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(0deg,#FFFFFF_0%,transparent_20%,transparent_80%,#FFFFFF_100%)]" />

      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div className="absolute left-0 top-1/3 w-[800px] h-[600px] bg-cyan-100/80 rounded-full blur-[180px] -translate-x-1/3" />
        <div className="absolute right-0 bottom-1/4 w-[600px] h-[600px] bg-slate-100 rounded-full blur-[150px] translate-x-1/3" />
      </div>

      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-10 px-4 sm:px-6 md:grid-cols-2 relative z-10">
        <div className="relative z-10 w-full text-left py-10 sm:py-16 md:py-20">
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-primary)] text-[11px] sm:text-xs font-medium tracking-wide mb-6 sm:mb-8"
          >
            <Sparkles size={14} className="text-[var(--color-accent)] shrink-0" />
            <span className="truncate">Available for internships & collaborations</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="responsive-title-xl font-bold text-[var(--color-primary)] mb-5 sm:mb-6"
          >
            <span className="text-[var(--color-Black)] break-words sm:whitespace-nowrap">Vidula Wickramasinghe</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-xl md:text-2xl text-[var(--color-body-text)] mb-5 sm:mb-6 font-medium tracking-wide"
          >
            Information Systems & Data Science Enthusiastic Student
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl text-sm sm:text-base md:text-[18px] text-[var(--color-body-text)] leading-[1.6] mb-8 sm:mb-10"
          >
            I build intelligent systems, scalable web apps, and future-focused digital solutions, using clean UI engineering and data-driven thinking to solve real-world problems.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"
          >
            <a
              href="/achievements"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-accent)] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[var(--color-accent-hover)] group"
            >
              View Projects
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="/projects/Resume.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--color-secondary-text)] bg-transparent px-6 py-3.5 text-sm font-semibold text-[var(--color-primary)] transition-all duration-200 hover:bg-[var(--color-surface-muted)] group"
            >
              Download Resume
              <Download size={16} className="text-[var(--color-secondary-text)] group-hover:-translate-y-0.5 transition-all" />
            </a>

            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--color-border)] bg-white px-6 py-3.5 text-sm font-medium text-[var(--color-body-text)] transition-colors hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-primary)]"
            >
              Contact Me
            </a>
          </motion.div>
        </div>

        <div className="hidden md:block pointer-events-none w-full h-full min-h-[420px]" />
      </div>
    </section>
  );
}