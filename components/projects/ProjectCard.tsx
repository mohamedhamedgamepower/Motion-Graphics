"use client";

import Image from "next/image";
import type { Project } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  onPlay: (project: Project) => void;
}

export default function ProjectCard({ project, onPlay }: ProjectCardProps) {
  return (
    <button
      onClick={() => onPlay(project)}
      className="group relative block w-full overflow-hidden rounded-xl border border-white/10 bg-night-blue/30 text-left"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={project.thumbnail_url}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Subtle dark overlay + play icon, only fully visible on hover */}
        <div className="absolute inset-0 bg-obsidian/0 transition-colors duration-300 group-hover:bg-obsidian/50" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-violet/90">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>

        {project.duration && (
          <span className="absolute bottom-3 right-3 rounded bg-obsidian/80 px-2 py-0.5 font-mono text-xs text-mist">
            {project.duration}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-display text-lg font-medium">{project.title}</h3>
        <p className="eyebrow mt-1">
          Motion Graphics &middot; {CATEGORY_LABELS[project.category]}
        </p>
        {project.description && (
          <p className="mt-2 line-clamp-2 text-sm text-mist">{project.description}</p>
        )}
      </div>
    </button>
  );
}
