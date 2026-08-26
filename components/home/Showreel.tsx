"use client";

import { useState } from "react";
import Image from "next/image";
import VideoModal from "@/components/shared/VideoModal";

interface ShowreelProps {
  videoUrl: string | null;
  posterUrl: string | null;
}

export default function Showreel({ videoUrl, posterUrl }: ShowreelProps) {
  const [open, setOpen] = useState(false);

  // If no showreel has been added in Supabase yet, hide the section instead
  // of showing a broken player.
  if (!videoUrl) return null;

  return (
    <section className="bg-obsidian px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-6xl text-center">
        <p className="eyebrow">Reel</p>
        <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Showreel</h2>

        <button
          onClick={() => setOpen(true)}
          className="group relative mt-10 block w-full overflow-hidden rounded-2xl border border-white/10 bg-night-blue/40"
        >
          <div className="relative aspect-video w-full">
            {posterUrl ? (
              <Image
                src={posterUrl}
                alt="Showreel preview"
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="h-full w-full bg-night-gradient" />
            )}
            <div className="absolute inset-0 bg-obsidian/40 transition-colors group-hover:bg-obsidian/55" />
          </div>

          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-violet/90 transition-transform duration-300 group-hover:scale-110">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="white"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </button>
      </div>

      {open && (
        <VideoModal
          videoUrl={videoUrl}
          title="Showreel"
          onClose={() => setOpen(false)}
        />
      )}
    </section>
  );
}
