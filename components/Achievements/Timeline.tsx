"use client";

import { motion } from "framer-motion";

export default function Timeline({
  items,
}: {
  items: { year: string; title: string; detail: string }[];
}) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-white p-6">
      <h3 className="text-lg font-semibold text-[var(--color-primary)]">Professional Growth Timeline</h3>
      <p className="mt-2 text-sm text-[var(--color-body-text)]">A clear timeline instantly shows momentum and progression.</p>

      <div className="mt-8 relative">
        <div className="absolute left-3 top-0 h-full w-px bg-[var(--color-border)]" />
        <div className="space-y-6">
          {items.map((x, i) => (
            <motion.div
              key={x.year}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: 0.06 * i }}
              className="relative pl-10"
            >
              <div className="absolute left-[7px] top-1.5 h-3 w-3 rounded-full bg-[var(--color-accent)]" />
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-sm font-semibold text-[var(--color-primary)]">{x.year}</span>
                <span className="text-sm text-[var(--color-body-text)]">{x.title}</span>
              </div>
              <div className="mt-1 text-sm text-[var(--color-secondary-text)]">{x.detail}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}