"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/lib/types";
import CategoryFilter from "./CategoryFilter";
import ProjectGrid from "./ProjectGrid";
import VideoModal from "@/components/shared/VideoModal";
import { CATEGORY_LABELS } from "@/lib/types";

interface ProjectsSectionProps {
  projects: Project[];
}

// All of the "Selected Work" logic lives in this one file:
// filtering by category, opening a project, and playing its video.
// If you want to change how filtering or the modal behaves, start here.
export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "all">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [projects, activeCategory]);

  return (
    <section id="work" className="bg-obsidian px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="eyebrow">Portfolio</p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Selected Work</h2>
          <p className="mx-auto mt-4 max-w-xl text-mist">
            A collection of motion graphics created for products, brands, businesses, and social media.
          </p>
        </div>

        <div className="mt-10">
          <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
        </div>

        <div className="mt-10">
          <ProjectGrid projects={filteredProjects} onPlay={setSelectedProject} />
        </div>
      </div>

      {selectedProject && (
        <VideoModal
          videoUrl={selectedProject.video_url}
          title={selectedProject.title}
          category={CATEGORY_LABELS[selectedProject.category]}
          description={selectedProject.description}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
