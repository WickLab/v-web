"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Lock, ShieldCheck } from "lucide-react";
import { getProjectById } from "@/data/projects";
import { isPrivateProject } from "@/lib/privateProjects";

type LoginState = "idle" | "sending" | "error";

export default function ProjectAccessPage() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project");

  const project = useMemo(() => {
    if (!projectId) return null;
    return getProjectById(projectId);
  }, [projectId]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<LoginState>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.classList.add("locked-viewer-active");

    const preventDefault = (event: Event) => {
      event.preventDefault();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      const blockedCombo =
        key === "f12" ||
        (event.ctrlKey && ["p", "s", "u"].includes(key)) ||
        (event.metaKey && ["p", "s", "u"].includes(key)) ||
        ((event.ctrlKey || event.metaKey) &&
          event.shiftKey &&
          ["i", "j", "c", "s"].includes(key));

      if (blockedCombo) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    document.addEventListener("contextmenu", preventDefault);
    document.addEventListener("dragstart", preventDefault);
    document.addEventListener("selectstart", preventDefault);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("locked-viewer-active");
      document.removeEventListener("contextmenu", preventDefault);
      document.removeEventListener("dragstart", preventDefault);
      document.removeEventListener("selectstart", preventDefault);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Secure Gateway`;
    }
  }, [project]);

  const submitLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!project || status === "sending") return;

    try {
      setStatus("sending");
      setError("");

      const response = await fetch("/api/project-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: project.id,
          username,
          password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus("error");
        setError(data.error ?? "Unable to verify your login.");
        return;
      }

      sessionStorage.setItem(`secure-project:${project.id}`, "granted");
      setUsername("");
      setPassword("");
      window.location.replace(`/projects/${project.id}/viewer`);
    } catch {
      setStatus("error");
      setError("Unable to verify your login.");
    }
  };

  if (!projectId || !project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-4">
        <div className="w-full max-w-lg rounded-2xl border border-[var(--color-border)] bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-[var(--color-primary)]">
            Project not found
          </h1>
          <p className="mt-3 text-sm text-[var(--color-body-text)]">
            The secure gateway could not find a matching project.
          </p>
        </div>
      </main>
    );
  }

  if (!isPrivateProject(project.id)) {
    if (typeof window !== "undefined") {
      window.location.replace(`/projects/${project.id}/viewer?public=1`);
    }

    return null;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-8">
      <div className="w-full max-w-xl rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-lg sm:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-surface-muted)] text-[var(--color-accent)]">
            <ShieldCheck size={20} />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-secondary-text)]">
              Secure Project Gateway
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-[var(--color-primary)]">
              {project.title}
            </h1>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 text-[var(--color-accent)]">
              <Lock size={18} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[var(--color-primary)]">
                Secure Gateway Required
              </h2>
              <p className="mt-2 text-sm leading-6 text-[var(--color-body-text)]">
                This project contains restricted content. Enter the credentials you
                received manually to continue into the focused project viewer.
              </p>
            </div>
          </div>

          <form className="mt-5 space-y-4" onSubmit={submitLogin}>
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-[var(--color-primary)]"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-primary)] outline-none transition-colors focus:border-[var(--color-accent)]"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[var(--color-primary)]"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-primary)] outline-none transition-colors focus:border-[var(--color-accent)]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-xl bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "sending" ? "Verifying..." : "Access to View"}
            </button>

            {status === "error" && (
              <p className="text-sm text-red-600">{error}</p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}