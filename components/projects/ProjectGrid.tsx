"use client";

import type { Project } from "@/lib/types";
import ProjectCard from "./ProjectCard";

interface ProjectGridProps {
  projects: Project[];
  onPlay: (project: Project) => void;
}

export default function ProjectGrid({ projects, onPlay }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <p className="py-16 text-center text-mist">
        No projects in this category yet — check back soon.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onPlay={onPlay} />
      ))}
    </div>
  );
}
