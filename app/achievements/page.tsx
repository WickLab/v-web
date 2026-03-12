import ProjectGrid from "@/components/portfolio/ProjectGrid";
import { projects } from "@/data/projects";

export default function AchievementsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden border-b border-[var(--color-border)] bg-white pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[340px] w-[760px] -translate-x-1/2 rounded-full bg-cyan-100 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-[1200px] px-4 text-center sm:px-6">
          <span className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-2 text-sm font-semibold tracking-wide text-[var(--color-accent)]">
            Achievements &amp; Selected Projects
          </span>

          <h1 className="mt-6 text-[clamp(2.3rem,6vw,4rem)] font-bold tracking-[-0.03em] text-[var(--color-primary)]">
            Impact, Projects &amp; <span className="text-[var(--color-accent)]">Practical Outcomes</span>
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-[var(--color-body-text)] sm:text-lg">
            Explore selected work across web development, product design, education,
            IoT, automation, and analytical problem-solving. Click any project card to
            open a summary popup, then continue into the focused project viewer.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-surface-muted)] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-primary)] sm:text-4xl">
              Selected Projects
            </h2>
            <p className="mt-4 text-[var(--color-body-text)]">
              Each card opens a summary modal with project highlights, technologies,
              problem/solution context, and the option to open the full project viewer.
            </p>
          </div>

          <ProjectGrid projects={projects} />
        </div>
      </section>
    </main>
  );
}