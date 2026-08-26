"use client";

import { useEffect, useRef } from "react";

interface VideoModalProps {
  videoUrl: string;
  title: string;
  category?: string;
  description?: string | null;
  onClose: () => void;
}

// A single reusable video modal. Both the Showreel and every project card
// open this same component — pass in a different videoUrl/title each time.
export default function VideoModal({
  videoUrl,
  title,
  category,
  description,
  onClose,
}: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Close on Escape, and lock page scroll while the modal is open.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleFullscreen = () => {
    videoRef.current?.requestFullscreen?.();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-obsidian/95 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-12 right-0 text-3xl leading-none text-white transition-colors hover:text-violet"
        >
          &times;
        </button>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
          {/* Native controls give Play/Pause, Volume, and Fullscreen for free
              and work reliably on mobile Safari/Chrome. The extra fullscreen
              button below is a convenience for desktop users. */}
          <video
            ref={videoRef}
            src={videoUrl}
            controls
            autoPlay
            playsInline
            className="aspect-video w-full bg-black"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="mt-4 flex flex-col gap-1 px-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-xl font-semibold">{title}</h3>
            {description && (
              <p className="mt-1 max-w-xl text-sm text-mist">{description}</p>
            )}
          </div>

          <div className="mt-3 flex items-center gap-3 sm:mt-0">
            {category && (
              <span className="eyebrow rounded-full border border-white/10 px-3 py-1">
                {category}
              </span>
            )}
            <button
              onClick={handleFullscreen}
              className="rounded-full border border-white/15 px-3 py-1 text-xs text-mist transition-colors hover:border-violet hover:text-violet"
            >
              Fullscreen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
