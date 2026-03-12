"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { projects } from "@/data/projects";

const AUTH_STORAGE_KEY = "vw_project_auth_v1";

// ✅ Demo credentials (change these)
const VALID_USERNAME = "vidula";
const VALID_PASSWORD = "12345";

type AuthState = {
  authed: boolean;
  remember: boolean;
  authedAt: number;
};

function readAuth(): AuthState | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthState;
  } catch {
    return null;
  }
}

function writeAuth(state: AuthState) {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

function clearAuth() {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    // ignore
  }
}

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const project = useMemo(() => projects.find((p) => p.id === slug), [slug]);

  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  // login form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load auth from localStorage once
  useEffect(() => {
    const saved = readAuth();
    if (saved?.authed && saved.remember) {
      setAuthed(true);
    }
    setReady(true);
  }, []);

  const handleLogin = () => {
    setError(null);

    const ok =
      username.trim().toLowerCase() === VALID_USERNAME.toLowerCase() &&
      password === VALID_PASSWORD;

    if (!ok) {
      setError("Invalid username or password.");
      return;
    }

    const state: AuthState = {
      authed: true,
      remember,
      authedAt: Date.now()
    };

    if (remember) writeAuth(state);

    setAuthed(true);
    setPassword("");
  };

  const handleLogout = () => {
    clearAuth();
    setAuthed(false);
    setUsername("");
    setPassword("");
    setRemember(true);
    setError(null);
  };

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-2xl font-semibold">Project not found</h1>
        <p className="mt-2 text-white/70">
          This project doesn’t exist. Check the URL slug or the data file.
        </p>
        <Link
          href="/achievements"
          className="mt-6 inline-flex rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition"
        >
          ← Back to Achievements
        </Link>
      </div>
    );
  }

  // Wait for localStorage read to avoid hydration mismatch
  if (!ready) return null;

  // ------------- LOGIN VIEW -------------
  if (!authed) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16">
        <Link
          href="/achievements"
          className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition"
        >
          ← Back to Achievements
        </Link>

        <div className="mt-8 glass rounded-2xl border border-white/10 p-8">
          <div className="text-xs uppercase tracking-[0.22em] text-white/60">
            Project Access
          </div>

          <h1 className="mt-3 text-2xl font-semibold">
            Login to view: {project.title}
          </h1>

          <p className="mt-2 text-sm text-white/70">
            Enter your credentials to access the full case study and details for this project.
          </p>

          <div className="mt-6 grid gap-4">
            <div>
              <label className="text-xs text-white/70">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g., vidula"
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 placeholder:text-white/40 outline-none focus:border-white/20 focus:bg-white/10 transition"
              />
            </div>

            <div>
              <label className="text-xs text-white/70">Password</label>
              <div className="mt-2 flex overflow-hidden rounded-xl border border-white/10 bg-white/5 focus-within:border-white/20">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPw ? "text" : "password"}
                  placeholder="•••••"
                  className="w-full bg-transparent px-4 py-3 text-sm text-white/85 placeholder:text-white/40 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="px-4 text-xs text-white/60 hover:text-white transition"
                >
                  {showPw ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-white/70">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 accent-blue-500"
              />
              Remember me on this device
            </label>

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <button
              onClick={handleLogin}
              type="button"
              className="rounded-xl bg-blue-500 px-5 py-3 text-sm font-medium text-white hover:bg-blue-600 transition shadow-lg"
            >
              Login
            </button>

            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/60">
              Demo credentials (change later):{" "}
              <span className="text-white/80">vidula / 12345</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ------------- DETAILS VIEW -------------
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/achievements"
            className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition"
          >
            ← Back to Achievements
          </Link>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl">
            {project.title}
          </h1>
          <p className="mt-3 text-white/70">{project.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition"
        >
          Logout
        </button>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {/* Left: Main image + links */}
        <div className="glass overflow-hidden rounded-2xl border border-white/10">
          <div className="relative h-64 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/75 via-transparent to-transparent" />
          </div>

          <div className="p-6">
            <div className="flex flex-wrap gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition"
                >
                  GitHub
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition shadow-lg"
                >
                  Live Demo
                </a>
              )}
            </div>

            {project.screenshots?.length ? (
              <div className="mt-6">
                <div className="text-sm font-semibold">Screenshots</div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {project.screenshots.map((src) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={src}
                      src={src}
                      alt="Project screenshot"
                      className="h-32 w-full rounded-xl border border-white/10 object-cover"
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Right: Problem / Solution / Learnings */}
        <div className="grid gap-6">
          <div className="glass rounded-2xl border border-white/10 p-6">
            <h2 className="text-lg font-semibold">Problem</h2>
            <p className="mt-2 text-sm text-white/70">
              {project.problem ?? "Add the problem statement for this project in data/projects.ts."}
            </p>
          </div>

          <div className="glass rounded-2xl border border-white/10 p-6">
            <h2 className="text-lg font-semibold">Solution</h2>
            <p className="mt-2 text-sm text-white/70">
              {project.solution ?? "Add the solution overview for this project in data/projects.ts."}
            </p>
          </div>

          <div className="glass rounded-2xl border border-white/10 p-6">
            <h2 className="text-lg font-semibold">Key Learnings</h2>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              {(project.learnings?.length ? project.learnings : ["Add key learnings in data/projects.ts."]).map((l) => (
                <li key={l}>• {l}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}