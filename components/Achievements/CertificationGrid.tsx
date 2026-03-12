"use client";

import { motion } from "framer-motion";

export default function CertificationGrid({
  certifications,
}: {
  certifications: { issuer: string; title: string; year: string; skills: string[] }[];
}) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-white p-6">
      <h3 className="text-lg font-semibold text-[var(--color-primary)]">Certifications</h3>
      <p className="mt-2 text-sm text-[var(--color-body-text)]">Add all key certificates here (IBM, Google, AWS, University, etc.).</p>

      <div className="mt-6 grid gap-4">
        {certifications.map((c, i) => (
          <motion.div
            key={`${c.issuer}-${c.title}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.06 * i }}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4 hover:bg-white transition"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-[var(--color-primary)]">{c.title}</div>
                <div className="mt-1 text-xs text-[var(--color-secondary-text)]">{c.issuer}</div>
              </div>
              <div className="text-xs text-[var(--color-secondary-text)]">{c.year}</div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {c.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-[var(--color-border)] bg-[var(--color-tag-bg)] px-3 py-1 text-[11px] text-[var(--color-accent)]"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}