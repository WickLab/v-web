"use client";

import type { KeyboardEvent, MouseEvent } from "react";
import { ArrowRight, ExternalLink, Github, Lock } from "lucide-react";
import type { Project } from "@/types/project";
import { getProjectCategoryLabel } from "@/lib/project-category";

export default function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const isPrivate = Boolean(project.privateContent);
  const categoryLabel = getProjectCategoryLabel(project.category);

  const handleKeyDown = (event: KeyboardEvent<article>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen();
    }
  };

  const stopCardOpen = (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    event.stopPropagation();
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={handleKeyDown}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white transition-all duration-200 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_12px_24px_-12px_rgba(2,132,199,0.28)] focus:outline-none focus:ring-2 focus:ring-cyan-400"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--color-surface-muted)]">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-white/85 via-white/15 to-transparent" />

        <div className="absolute left-4 top-4 max-w-[calc(100%-2rem)]">
          <span className="inline-flex max-w-full truncate rounded-full border border-[var(--color-border)] bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-secondary-text)]">
            {categoryLabel}
          </span>
        </div>

        {isPrivate && (
          <div className="absolute bottom-4 left-4 max-w-[calc(100%-2rem)]">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              <Lock size={12} />
              Secure Gateway
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex min-h-[124px] flex-col">
          <h3 className="text-lg font-semibold leading-snug text-[var(--color-primary)] transition-colors group-hover:text-[var(--color-accent)]">
            {project.title}
          </h3>

          <p className="mt-3 text-sm leading-6 text-[var(--color-body-text)]">
            {project.tagline}
          </p>
        </div>

        <div className="mt-5 flex min-h-[76px] flex-wrap content-start gap-2">
          {project.tech.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-tag-bg)] px-3 py-1 text-xs font-medium text-[var(--color-accent)]"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-[var(--color-border)] pt-5">
          <button
            type="button"
            onClick={(event) => {
              stopCardOpen(event);
              onOpen();
            }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]"
          >
            View Details
            <ArrowRight size={15} />
          </button>

          {!isPrivate && (
            <div className="flex items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={stopCardOpen}
                  className="text-[var(--color-secondary-text)] transition-colors hover:text-[var(--color-primary)]"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
              )}

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  onClick={stopCardOpen}
                  className="text-[var(--color-secondary-text)] transition-colors hover:text-[var(--color-accent)]"
                  aria-label="Live Demo"
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}