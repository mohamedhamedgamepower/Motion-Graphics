"use client";

import type { ProjectCategory } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";

interface CategoryFilterProps {
  active: ProjectCategory | "all";
  onChange: (category: ProjectCategory | "all") => void;
}

const CATEGORIES: (ProjectCategory | "all")[] = [
  "all",
  "business",
  "product",
  "social-media",
  "promotional",
  "real-estate",
  "food-restaurants",
];

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {CATEGORIES.map((category) => {
        const isActive = active === category;
        const label = category === "all" ? "All" : CATEGORY_LABELS[category];
        return (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors ${
              isActive
                ? "border-violet bg-violet text-white"
                : "border-white/15 text-mist hover:border-violet hover:text-white"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
