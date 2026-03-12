"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Project } from "@/types/project";
import ProjectCard from "@/components/portfolio/ProjectCard";
import ProjectCategoryTabs from "@/components/portfolio/ProjectCategoryTabs";
import ProjectModal from "@/components/portfolio/ProjectModal";
import {
  getAvailableMainProjectCategories,
  getProjectMainCategory,
} from "@/lib/project-category";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [active, setActive] = useState("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const categories = useMemo(() => {
    return getAvailableMainProjectCategories(projects.map((project) => project.category));
  }, [projects]);

  useEffect(() => {
    const deepLinkedProjectId = searchParams.get("project");

    if (!deepLinkedProjectId) {
      setOpenId(null);
      return;
    }

    const deepLinkedProject = projects.find((project) => project.id === deepLinkedProjectId);

    if (!deepLinkedProject) return;

    setOpenId(deepLinkedProject.id);
    setActive(getProjectMainCategory(deepLinkedProject.category));
  }, [projects, searchParams]);

  const filteredProjects = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter(
      (project) => getProjectMainCategory(project.category) === active
    );
  }, [active, projects]);

  const selectedProject =
    projects.find((project) => project.id === openId) ?? null;

  const replaceProjectQuery = (projectId: string | null) => {
    const nextParams = new URLSearchParams(searchParams.toString());

    if (projectId) {
      nextParams.set("project", projectId);
    } else {
      nextParams.delete("project");
    }

    const nextUrl = nextParams.toString()
      ? `${pathname}?${nextParams.toString()}`
      : pathname;

    router.replace(nextUrl, { scroll: false });
  };

  const openProject = (project: Project) => {
    setOpenId(project.id);
    replaceProjectQuery(project.id);
  };

  const closeProject = () => {
    setOpenId(null);
    replaceProjectQuery(null);
  };

  return (
    <div className="mt-10">
      <ProjectCategoryTabs
        categories={categories}
        active={active}
        setActive={setActive}
      />

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={() => openProject(project)}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="mt-8 rounded-2xl border border-[var(--color-border)] bg-white px-6 py-10 text-center text-sm text-[var(--color-secondary-text)]">
          No projects found in this category.
        </div>
      )}

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={closeProject} />
        )}
      </AnimatePresence>
    </div>
  );
}