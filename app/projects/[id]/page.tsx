"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProjectById } from "@/data/projects";
import { isPrivateProject } from "@/lib/privateProjects";

const sectionClass = "mx-auto max-w-6xl px-4 py-16";

export default function ProjectFullPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const projectId = params?.id ?? "";
  const project = useMemo(() => getProjectById(projectId), [projectId]);

  useEffect(() => {
    if (!projectId || !isPrivateProject(projectId)) return;

    const globalGranted = localStorage.getItem("project_access_granted") === "true";
    const grantedIds = JSON.parse(localStorage.getItem("project_access_granted_ids") ?? "[]") as string[];

    if (!globalGranted || !grantedIds.includes(projectId)) {
      router.replace(`/project-access?next=/projects/${projectId}/viewer`);
      return;
    }

    router.replace(`/projects/${projectId}/viewer`);
  }, [projectId, router]);

  if (!project) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-2xl font-semibold">Project not found</h1>
        <Link href="/achievements" className="mt-4 inline-block text-blue-300 hover:text-blue-200">← Back to Projects</Link>
      </div>
    );
  }

  if (isPrivateProject(projectId)) {
    return null;
  }

  return (
    <div className="pb-20">
      <nav className="sticky top-[76px] z-40 border-b border-white/10 bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-6 overflow-x-auto px-4 py-3 text-sm text-white/75">
          <a href="#home" className="whitespace-nowrap hover:text-white">Home</a>
          <a href="#overview" className="whitespace-nowrap hover:text-white">About</a>
          <a href="#features" className="whitespace-nowrap hover:text-white">Projects</a>
          <a href="#cta" className="whitespace-nowrap hover:text-white">Contact</a>
        </div>
      </nav>

      <section id="home" className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 gradient-bg animate-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.22),transparent_40%),radial-gradient(circle_at_80%_40%,rgba(139,92,246,0.18),transparent_45%)]" />
        <div className={`${sectionClass} relative flex min-h-screen flex-col justify-center`}>
          <p className="text-xs uppercase tracking-[0.22em] text-white/60">{project.category}</p>
          <h1 className="mt-3 text-4xl font-semibold md:text-5xl">{project.title}</h1>
          <p className="mt-5 max-w-3xl text-base text-white/80 md:text-lg">{project.overview ?? project.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">{t}</span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.live && <a href={project.live} target="_blank" rel="noreferrer" className="rounded-xl bg-blue-500 px-5 py-3 text-sm font-medium text-white">View Live Demo</a>}
            {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm text-white/90">View Source Code</a>}
          </div>
        </div>
      </section>

      <section id="overview" className={`${sectionClass} min-h-screen`}>
        <h2 className="text-3xl font-semibold">Project Overview</h2>
        <p className="mt-4 max-w-4xl text-white/75">{project.solution}</p>
        <p className="mt-3 max-w-4xl text-white/75">Built for teams and users who need reliable, usable outcomes from modern digital products.</p>
      </section>

      <section className={`${sectionClass} min-h-screen`}>
        <h2 className="text-3xl font-semibold">Problem Statement</h2>
        <p className="mt-4 max-w-4xl text-white/75">{project.problem}</p>
      </section>

      <section id="features" className={`${sectionClass} min-h-screen`}>
        <h2 className="text-3xl font-semibold">Features</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(project.fullDetails ?? []).map((detail) => (
            <article key={detail} className="glass rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-white/25">
              <h3 className="text-lg font-semibold">Feature</h3>
              <p className="mt-3 text-sm text-white/75">{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${sectionClass} min-h-screen`}>
        <h2 className="text-3xl font-semibold">Tech Stack</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Frontend", "React / Next.js / Tailwind CSS"],
            ["Backend", "Node.js / API Services"],
            ["Database", "SQL / PostgreSQL"],
            ["Deployment", "Vercel / Cloud"],
          ].map(([title, value]) => (
            <div key={title} className="glass rounded-2xl p-5">
              <h3 className="text-sm uppercase tracking-wide text-white/60">{title}</h3>
              <p className="mt-2 text-sm text-white/80">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${sectionClass} min-h-screen`}>
        <h2 className="text-3xl font-semibold">Screenshots / Demo</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <img src={project.image} alt={project.title} className="h-72 w-full rounded-2xl object-cover" />
          <div className="glass rounded-2xl p-6 text-sm text-white/75">Optional video/demo area for walkthrough embedding.</div>
        </div>
      </section>

      <section className={`${sectionClass} min-h-screen`}>
        <h2 className="text-3xl font-semibold">Challenges & Solutions</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="glass rounded-2xl p-6"><h3 className="font-semibold">Challenge</h3><p className="mt-2 text-sm text-white/75">Managing real-world complexity, data consistency, and UX clarity across workflows.</p></div>
          <div className="glass rounded-2xl p-6"><h3 className="font-semibold">Solution</h3><p className="mt-2 text-sm text-white/75">Applied iterative design, measurable implementation steps, and continuous testing.</p></div>
        </div>
      </section>

      <section className={`${sectionClass} min-h-screen`}>
        <h2 className="text-3xl font-semibold">Results / Impact</h2>
        <ul className="mt-6 space-y-3 text-white/75">
          {project.learnings.map((item) => <li key={item}>• {item}</li>)}
          <li>• Improved reliability, usability, and delivery confidence.</li>
        </ul>
      </section>

      <section id="cta" className={`${sectionClass} min-h-screen`}>
        <div className="glass rounded-3xl p-10 text-center">
          <h2 className="text-3xl font-semibold">Let&apos;s Build Your Next Product</h2>
          <p className="mt-4 text-white/75">Open to internships, freelance work, and collaborative opportunities.</p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/contact" className="rounded-xl bg-blue-500 px-5 py-3 text-sm font-medium text-white">Contact Me</Link>
            <Link href="/achievements" className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm text-white/90">Back to Projects</Link>
          </div>
        </div>
      </section>
    </div>
  );
}