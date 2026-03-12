"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import LockedProjectViewer from "@/components/portfolio/LockedProjectViewer";
import { getProjectById } from "@/data/projects";
import { isPrivateProject } from "@/lib/privateProjects";
import { getProjectCategoryLabel } from "@/lib/project-category";

export default function ProjectViewerPage() {
  const params = useParams();
  const rawId = params?.id;
  const projectId = Array.isArray(rawId) ? rawId[0] : rawId;

  const project = useMemo(() => {
    if (!projectId) return null;
    return getProjectById(projectId);
  }, [projectId]);

  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    document.body.classList.add("viewer-mode");

    return () => {
      document.body.classList.remove("viewer-mode");
    };
  }, []);

  useEffect(() => {
    if (!project) {
      setAuthorized(false);
      return;
    }

    document.title = `${project.title} | Project Viewer`;

    if (!isPrivateProject(project.id)) {
      setAuthorized(true);
      return;
    }

    const sessionKey = `secure-project:${project.id}`;
    const hasAccess = sessionStorage.getItem(sessionKey) === "granted";

    setAuthorized(hasAccess);

    const onBeforeUnload = () => {
      sessionStorage.removeItem(sessionKey);
    };

    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [project]);

  if (!project) {
    return (
      <main className="viewer-shell flex min-h-screen items-center justify-center bg-white px-4">
        <div className="w-full max-w-xl rounded-2xl border border-[var(--color-border)] bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-[var(--color-primary)]">
            Project not found
          </h1>
          <p className="mt-3 text-sm text-[var(--color-body-text)]">
            The full project viewer could not find this project.
          </p>
        </div>
      </main>
    );
  }

  if (authorized === null) {
    return (
      <main className="viewer-shell flex min-h-screen items-center justify-center bg-white px-4">
        <div className="text-sm text-[var(--color-secondary-text)]">
          Loading project viewer...
        </div>
      </main>
    );
  }

  if (!authorized) {
    return (
      <main className="viewer-shell flex min-h-screen items-center justify-center bg-white px-4">
        <div className="w-full max-w-xl rounded-2xl border border-[var(--color-border)] bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-[var(--color-primary)]">
            Access expired
          </h1>
          <p className="mt-3 text-sm leading-6 text-[var(--color-body-text)]">
            This secure viewer session is no longer active. Open the project again and
            re-enter your login credentials to continue.
          </p>

          <button
            type="button"
            onClick={() => {
              window.location.replace(`/project-access?project=${project.id}`);
            }}
            className="mt-6 rounded-xl bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Return to Login Gateway
          </button>
        </div>
      </main>
    );
  }

  const categoryLabel = getProjectCategoryLabel(project.category);

  return (
    <LockedProjectViewer>
      <main className="viewer-shell min-h-screen bg-white px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-5xl">
          <section className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-sm">
            <div className="relative aspect-[16/8] w-full bg-[var(--color-surface-muted)]">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/25 to-transparent" />
            </div>

            <div className="px-5 py-6 sm:px-8">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-secondary-text)]">
                Focused Project Viewer
              </div>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-primary)] sm:text-4xl">
                {project.title}
              </h1>

              <p className="mt-3 text-base leading-7 text-[var(--color-body-text)]">
                {project.overview ?? project.tagline}
              </p>

              <div className="mt-4 inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-1 text-xs font-medium text-[var(--color-accent)]">
                {categoryLabel}
              </div>
            </div>
          </section>

          <section className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-6">
              <h2 className="text-lg font-semibold text-[var(--color-primary)]">
                Problem
              </h2>
              <p className="mt-3 text-sm leading-6 text-[var(--color-body-text)]">
                {project.problem}
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-6">
              <h2 className="text-lg font-semibold text-[var(--color-primary)]">
                Solution
              </h2>
              <p className="mt-3 text-sm leading-6 text-[var(--color-body-text)]">
                {project.solution}
              </p>
            </div>
          </section>

          <section className="mt-6 rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[var(--color-primary)]">
              Technologies Used
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[var(--color-border)] bg-[var(--color-tag-bg)] px-3 py-1 text-xs font-medium text-[var(--color-accent)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section className="mt-6 rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[var(--color-primary)]">
              Full Project Details
            </h2>

            <ul className="mt-4 space-y-4">
              {(project.fullDetails?.length ? project.fullDetails : project.learnings).map(
                (detail, index) => (
                  <li
                    key={`${project.id}-detail-${index}`}
                    className="flex items-start gap-3 text-sm leading-6 text-[var(--color-body-text)]"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent)]" />
                    <span>{detail}</span>
                  </li>
                )
              )}
            </ul>
          </section>

          <section className="mt-6 rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[var(--color-primary)]">
              Key Learnings
            </h2>

            <ul className="mt-4 space-y-3">
              {project.learnings.map((learning, index) => (
                <li
                  key={`${project.id}-learning-${index}`}
                  className="flex items-start gap-3 text-sm leading-6 text-[var(--color-body-text)]"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  <span>{learning}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </LockedProjectViewer>
  );
}