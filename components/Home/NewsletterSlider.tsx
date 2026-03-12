"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AUTO_INTERVAL = 10000;

// Fallback mock data for visual preview when API fails/loads
const MOCK_NEWSLETTERS = [
  {
    title: "The Architecture of Scalable Systems",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
    pubDate: "2026-03-01T00:00:00Z",
    excerpt:
      "Exploring the fundamentals of distributed systems and how to architect for high availability and fault tolerance.",
    readingTimeMins: 5,
  },
  {
    title: "Data Pipelines: From Chaos to Order",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
    pubDate: "2026-02-15T00:00:00Z",
    excerpt:
      "A deep dive into building resilient data engineering pipelines using modern cloud infrastructure.",
    readingTimeMins: 8,
  },
  {
    title: "Designing for the User, Building for the Machine",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=600&auto=format&fit=crop",
    pubDate: "2026-01-28T00:00:00Z",
    excerpt:
      "Balancing elegant UI/UX design with robust, high-performance backend architecture.",
    readingTimeMins: 6,
  },
  {
    title: "Machine Learning in Production",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=600&auto=format&fit=crop",
    pubDate: "2026-01-10T00:00:00Z",
    excerpt:
      "The reality of deploying ML models into real-world applications and handling data drift.",
    readingTimeMins: 7,
  },
];

type NewsletterItem = {
  title: string;
  link: string;
  image: string;
  pubDate: string;
  excerpt: string;
  readingTimeMins?: number;
  source?: string;
  _placeholder?: boolean;
};

function formatDate(pubDate?: string) {
  if (!pubDate) return "";
  const d = new Date(pubDate);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function chunk<T>(arr: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function NewsletterSlider({ compact = false }: { compact?: boolean }) {
  const [items, setItems] = useState<NewsletterItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(0);

  const PAGE_COUNT = 3;
  const ITEMS_PER_PAGE = 4;

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const res = await fetch("/api/newsletters", { cache: "no-store" });
        if (!res.ok) throw new Error("API failed");

        const json = await res.json();
        const fetched = Array.isArray(json?.items) ? json.items : [];

        if (!alive) return;

        const map = new Map<string, NewsletterItem>();
        for (const it of fetched) {
          if (!it?.link) continue;
          if (!map.has(it.link)) map.set(it.link, it);
        }

        setItems(Array.from(map.values()));
      } catch {
        if (alive) setItems(MOCK_NEWSLETTERS);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const pages = useMemo(() => {
    const max = PAGE_COUNT * ITEMS_PER_PAGE;
    const base = items.slice(0, max);
    const placeholdersNeeded = Math.max(0, max - base.length);

    const mediumProfile =
      typeof process !== "undefined" &&
      process.env &&
      process.env.NEXT_PUBLIC_MEDIUM_PROFILE_URL
        ? process.env.NEXT_PUBLIC_MEDIUM_PROFILE_URL
        : "https://medium.com/@vidulawickramasingha";

    const filled: NewsletterItem[] = [
      ...base,
      ...Array.from({ length: placeholdersNeeded }).map(() => ({
        _placeholder: true,
        title: "More insights on Medium",
        link: mediumProfile,
        image:
          "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=600&auto=format&fit=crop",
        pubDate: "", // FIXED: Added pubDate to satisfy NewsletterItem type
        source: "Medium",
        excerpt:
          "Visit my Medium profile to explore more articles, tutorials, and deep dives into technology and design.",
      })),
    ];

    const chunked = chunk(filled, ITEMS_PER_PAGE);
    while (chunked.length < PAGE_COUNT) chunked.push([]);
    return chunked.slice(0, PAGE_COUNT);
  }, [items]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActivePage((prev) => (prev + 1) % PAGE_COUNT);
    }, AUTO_INTERVAL);

    return () => window.clearInterval(timer);
  }, []);

  const goNext = () => setActivePage((prev) => (prev + 1) % PAGE_COUNT);
  const goPrev = () => setActivePage((prev) => (prev - 1 + PAGE_COUNT) % PAGE_COUNT);

  return (
    <section
      className={`relative overflow-hidden border-t border-[var(--color-border)] bg-white ${
        compact ? "py-12 sm:py-14" : "py-16 sm:py-20 md:py-[100px]"
      }`}
    >
      {/* Ambient Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-0 top-1/4 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-cyan-100 blur-[120px] sm:h-[460px] sm:w-[460px]" />
        <div className="absolute bottom-1/4 right-0 h-[380px] w-[380px] translate-x-1/2 rounded-full bg-slate-100 blur-[120px] sm:h-[460px] sm:w-[460px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Header Section */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:mb-10 md:flex-row md:items-end">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)]"></span>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                Articles & Thoughts
              </span>
            </div>

            <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-semibold tracking-tight text-[var(--color-primary)]">
              Latest Newsletters
            </h2>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={goPrev}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] bg-white text-[var(--color-secondary-text)] transition-all duration-200 hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-primary)] active:scale-95"
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={goNext}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] bg-white text-[var(--color-secondary-text)] transition-all duration-200 hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-primary)] active:scale-95"
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Dynamic Grid */}
        <div className="min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5"
            >
              {loading
                ? /* Loading Skeletons */
                  Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => (
                    <div
                      key={idx}
                      className="flex h-full flex-col overflow-hidden rounded-lg border border-[var(--color-border)] bg-white p-3 sm:p-4"
                    >
                      <div className="h-32 w-full animate-pulse rounded-lg bg-[var(--color-surface-muted)]" />
                      <div className="mt-4 h-4 w-3/4 animate-pulse rounded-md bg-[var(--color-surface-muted)]" />
                      <div className="mt-2 h-3 w-full animate-pulse rounded-md bg-[var(--color-surface-muted)]" />
                      <div className="mt-2 h-3 w-1/2 animate-pulse rounded-md bg-[var(--color-surface-muted)]" />
                    </div>
                  ))
                : /* Actual Content */
                  pages[activePage]?.map((item, idx) => {
                    const date = formatDate(item.pubDate);
                    const read = item.readingTimeMins
                      ? `${item.readingTimeMins} min read`
                      : "";

                    return (
                      <a
                        key={`${item.link}-${idx}`}
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-[var(--color-border)] bg-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#F8FAFC] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]"
                      >
                        {/* Image */}
                        <div className="relative m-1.5 mb-0 h-32 overflow-hidden rounded-lg bg-[var(--color-surface-muted)]">
                          <img
                            src={item.image || "/projects/news2.png"}
                            alt={item.title}
                            className="h-full w-full rounded-lg object-cover transition-all duration-500 group-hover:scale-105"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />

                          {read && (
                            <div className="absolute right-2 top-2 rounded-full border border-[var(--color-border)] bg-white/95 px-2 py-1 text-[9px] font-semibold uppercase tracking-widest text-[var(--color-secondary-text)]">
                              {read}
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex flex-1 flex-col p-4 pt-3">
                          <div className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-[var(--color-secondary-text)]">
                            <BookOpen size={12} className="text-[var(--color-accent)]" />
                            <span className="truncate">
                              {date ||
                                (item._placeholder ? "Always Available" : "Recent")}
                            </span>
                          </div>

                          <h3 className="mb-1.5 line-clamp-2 text-base font-semibold leading-snug text-[var(--color-primary)] transition-colors group-hover:text-[var(--color-accent)]">
                            {item.title}
                          </h3>

                          {item.excerpt && (
                            <p className="mb-4 flex-grow line-clamp-2 text-xs leading-relaxed text-[var(--color-body-text)] sm:text-sm">
                              {item.excerpt}
                            </p>
                          )}

                          <div className="mt-auto border-t border-[var(--color-border)] pt-3">
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-accent)] transition-colors group-hover:text-[var(--color-accent-hover)]">
                              <span className="relative">
                                Read on Medium
                                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full" />
                              </span>
                              <ExternalLink
                                size={12}
                                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              />
                            </span>
                          </div>
                        </div>
                      </a>
                    );
                  })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Pagination Indicators */}
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: PAGE_COUNT }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActivePage(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activePage === i
                  ? "w-6 bg-[var(--color-accent)]"
                  : "w-2 bg-[var(--color-border)] hover:bg-slate-300"
              }`}
              aria-label={`Go to newsletter page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
