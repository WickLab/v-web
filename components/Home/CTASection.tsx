"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MemojiLaptopAvatar from "@/components/ui/MemojiLaptopAvatar";

export default function CTASection() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-lg border border-[var(--color-border)] bg-white p-10"
      >
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-semibold md:text-3xl text-[var(--color-primary)]">
              Let’s build something impactful together.
            </h3>

            <p className="mt-4 text-sm text-[var(--color-body-text)] md:text-base">
              If you're hiring, collaborating, or have an idea you want to ship — I'm ready to help turn it into a clean, working product.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--color-accent-hover)]"
              >
                Contact Me <ArrowRight size={16} />
              </Link>

              <Link
                href="/projects/Resume.pdf"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-secondary-text)] bg-transparent px-5 py-3 text-sm text-[var(--color-primary)] transition hover:bg-[var(--color-surface-muted)]"
              >
                Download Resume
              </Link>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}>
              <MemojiLaptopAvatar
                src="/avatars/memoji-male-laptop.png"
                alt="Male memoji avatar using a laptop"
                size={180}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}