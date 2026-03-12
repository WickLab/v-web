"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Download, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

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

export default function CombinedCTA() {
  const [ctaRef, ctaVisible] = useReveal();
  const [newsRef, newsVisible] = useReveal();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section className="py-16 sm:py-20 md:py-[100px] bg-white relative overflow-hidden border-t border-[var(--color-border)]">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[800px] h-[320px] sm:h-[400px] bg-cyan-100 rounded-full blur-[120px] sm:blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col">
        
        {/* Main CTA Top Section */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 20 }}
          animate={ctaVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20 md:mb-24"
        >
          

          <h2 className="text-[clamp(2rem,5vw,3.75rem)] font-bold text-[var(--color-primary)] mb-5 sm:mb-6 tracking-tight leading-[1.1] text-balance">
            Let's build something <span className="text-[var(--color-accent)]">extraordinary.</span>
          </h2>

          <p className="text-base sm:text-lg text-[var(--color-body-text)] leading-relaxed mb-8 sm:mb-10 max-w-xl text-balance">
            Whether you have a specific project in mind, need architectural guidance, or just want to explore possibilities, my inbox is always open.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <a
              href="/contact"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-[var(--color-accent)] px-8 py-3.5 text-sm font-bold text-white hover:bg-[var(--color-accent-hover)] transition-all duration-200"
            >
              <Mail className="w-4 h-4" />
              Get in Touch
            </a>

            <a
              href="/projects/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg border border-[var(--color-border)] bg-white px-8 py-3.5 text-sm font-medium text-[var(--color-primary)] hover:bg-[var(--color-surface-muted)] transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </div>
        </motion.div>

        {/* Newsletter Bottom Section */}
        <motion.div
          ref={newsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={newsVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative pt-12 md:pt-16 border-t border-[var(--color-border)] w-full"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 relative z-10">
            
            <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-semibold text-[var(--color-primary)] tracking-tight mb-3">
                Subscribe on Medium.
              </h3>
              <p className="text-[var(--color-body-text)] text-sm md:text-base leading-relaxed max-w-md mx-auto md:mx-0">
                Get notified whenever I drop new articles, architectural deep-dives, and tech insights. Join my reading community today.
              </p>
            </div>

            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <form 
                onSubmit={handleSubmit} 
                className="w-full max-w-md flex flex-col sm:flex-row gap-3 sm:gap-0 sm:bg-white sm:border sm:border-[var(--color-border)] sm:rounded-full sm:p-1.5 sm:shadow-sm focus-within:ring-2 focus-within:ring-[var(--color-accent)] transition-all"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  disabled={status !== "idle"}
                  required
                  className="w-full sm:flex-1 bg-white border border-[var(--color-border)] sm:border-none text-[var(--color-primary)] placeholder:text-[var(--color-secondary-text)] rounded-full px-6 py-4 sm:py-3 focus:outline-none transition-all disabled:opacity-50"
                />

                <button
                  type="submit"
                  disabled={status !== "idle"}
                  className={`flex items-center justify-center gap-2 rounded-full px-8 py-4 sm:py-3 text-sm font-bold text-white transition-all duration-200 shrink-0 ${
                    status === "success" 
                      ? "bg-emerald-500 hover:bg-emerald-600" 
                      : "bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)]"
                  } disabled:cursor-not-allowed`}
                >
                  <AnimatePresence mode="wait">
                    {status === "idle" && (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2"
                      >
                        Subscribe <ArrowRight className="w-4 h-4" />
                      </motion.span>
                    )}
                    {status === "loading" && (
                      <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Loader2 className="w-5 h-5 animate-spin" />
                      </motion.span>
                    )}
                    {status === "success" && (
                      <motion.span
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2"
                      >
                        Subscribed! <CheckCircle2 className="w-4 h-4" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </form>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}