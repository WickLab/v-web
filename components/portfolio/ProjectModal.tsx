"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Lock,
  Mail,
  Maximize,
  X,
} from "lucide-react";
import type { Project } from "@/types/project";
import { isPrivateProject } from "@/lib/privateProjects";
import { getProjectCategoryLabel } from "@/lib/project-category";

type RequestStatus = "idle" | "sending" | "success" | "error";

const LOCKED_WINDOW_FEATURES = [
  "popup=yes",
  "toolbar=no",
  "location=no",
  "status=no",
  "menubar=no",
  "scrollbars=yes",
  "resizable=yes",
  "width=1280",
  "height=900",
  "top=60",
  "left=60",
].join(",");

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [requesterEmail, setRequesterEmail] = useState("");
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("idle");
  const [requestError, setRequestError] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const isPrivate = useMemo(() => {
    if (!project) return false;
    return Boolean(project.privateContent) || isPrivateProject(project.id);
  }, [project]);

  useEffect(() => {
    if (!project) return;

    const scrollY = window.scrollY;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyWidth = document.body.style.width;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      window.removeEventListener("keydown", onKeyDown);
      window.scrollTo(0, scrollY);
    };
  }, [project, onClose]);

  if (!project) return null;

  const categoryLabel = getProjectCategoryLabel(project.category);

  const submitRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!requesterEmail.trim() || requestStatus === "sending") return;

    try {
      setRequestStatus("sending");
      setRequestError("");

      const response = await fetch("/api/project-access-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: project.id,
          projectTitle: project.title,
          requesterEmail,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setRequestStatus("error");
        setRequestError(data.error ?? "Unable to send your access request right now.");
        return;
      }

      setRequestStatus("success");
      setRequesterEmail("");
    } catch {
      setRequestStatus("error");
      setRequestError("Unable to send your access request right now.");
    }
  };

  const openFullProjectDetails = () => {
    const url = isPrivate
      ? `/project-access?project=${encodeURIComponent(project.id)}`
      : `/projects/${encodeURIComponent(project.id)}/viewer?public=1`;

    const childWindow = window.open(url, "_blank", LOCKED_WINDOW_FEATURES);

    if (childWindow) {
      try {
        childWindow.opener = null;
        childWindow.focus();
      } catch {
        // ignore
      }
    }
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[90] overflow-hidden bg-black/45 p-3 backdrop-blur-sm sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="flex h-full items-center justify-center">
        <motion.div
          className="flex h-full max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-2xl"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="sticky top-0 z-20 flex items-start justify-between gap-4 border-b border-[var(--color-border)] bg-white px-5 py-4 sm:px-6">
            <div className="min-w-0">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-secondary-text)]">
                {categoryLabel}
              </div>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--color-primary)] sm:text-3xl">
                {project.title}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-body-text)]">
                {project.overview ?? project.tagline}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[var(--color-border)] p-2 text-[var(--color-secondary-text)] transition-colors hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-primary)]"
              aria-label="Close project summary"
            >
              <X size={18} />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6"
            style={{
              overscrollBehavior: "contain",
              WebkitOverflowScrolling: "touch",
              touchAction: "pan-y",
            }}
            onWheel={(event) => event.stopPropagation()}
          >
            <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)]">
              <div className="relative aspect-[16/9] w-full">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/75 via-transparent to-transparent" />
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5">
                <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                  The Problem
                </h4>
                <p className="mt-3 text-sm leading-6 text-[var(--color-body-text)]">
                  {project.problem}
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5">
                <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                  The Solution
                </h4>
                <p className="mt-3 text-sm leading-6 text-[var(--color-body-text)]">
                  {project.solution}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5">
              <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-secondary-text)]">
                Technologies
              </h4>

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
            </div>

            <div className="mt-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5">
              <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-secondary-text)]">
                Key Project Details
              </h4>

              <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--color-body-text)]">
                {(project.fullDetails?.length ? project.fullDetails : project.learnings).map((item, index) => (
                  <li key={`${project.id}-${index}`} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {isPrivate && (
              <div className="mt-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--color-accent)]">
                    <Lock size={18} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[var(--color-primary)]">
                      Secure Gateway Required
                    </h4>
                    <p className="mt-1 text-sm text-[var(--color-secondary-text)]">
                      Enter your email address to request access. You will then receive
                      credentials manually after review.
                    </p>
                  </div>
                </div>

                <form
                  className="mt-5 flex flex-col gap-3 sm:flex-row"
                  onSubmit={submitRequest}
                >
                  <label className="relative flex-1">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-secondary-text)]" />
                    <input
                      type="email"
                      value={requesterEmail}
                      onChange={(event) => setRequesterEmail(event.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full rounded-xl border border-[var(--color-border)] bg-white py-3 pl-11 pr-4 text-sm text-[var(--color-primary)] outline-none transition-colors focus:border-[var(--color-accent)]"
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={requestStatus === "sending"}
                    className="rounded-xl bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {requestStatus === "sending" ? "Sending..." : "Request Access"}
                  </button>
                </form>

                {requestStatus === "success" && (
                  <p className="mt-3 text-sm text-[var(--color-accent)]">
                    Access request sent successfully.
                  </p>
                )}

                {requestStatus === "error" && (
                  <p className="mt-3 text-sm text-red-600">{requestError}</p>
                )}
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3 border-t border-[var(--color-border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-3">
                {!isPrivate && project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--color-secondary-text)] px-4 py-2.5 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-surface-muted)]"
                  >
                    <Github size={16} />
                    View Repository
                  </a>
                )}

                {!isPrivate && project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={openFullProjectDetails}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                <Maximize size={16} />
                View Full Project Details
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}