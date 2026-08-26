"use client";

import type { Package } from "@/lib/types";

interface PackageCardProps {
  pkg: Package;
  onChoose: (pkg: Package) => void;
}

export default function PackageCard({ pkg, onChoose }: PackageCardProps) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-8 ${
        pkg.popular
          ? "border-violet bg-gradient-to-b from-violet/15 to-night-blue/30 shadow-[0_0_40px_-10px_rgba(124,58,237,0.5)]"
          : "border-white/10 bg-night-blue/20"
      }`}
    >
      {pkg.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet px-3 py-1 text-xs font-medium uppercase tracking-wider text-white">
          Most Popular
        </span>
      )}

      <h3 className="font-display text-lg font-semibold uppercase tracking-wide">
        {pkg.name}
      </h3>
      <p className="eyebrow mt-2">{pkg.videos_count} Videos</p>

      <p className="mt-4 font-display text-4xl font-semibold">
        ${pkg.price}
        <span className="ml-1 text-base font-normal text-mist">{pkg.currency}</span>
      </p>

      {pkg.description && <p className="mt-3 text-sm text-mist">{pkg.description}</p>}

      <ul className="mt-6 flex-1 space-y-3 text-sm text-mist">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
            {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={() => onChoose(pkg)}
        className={`mt-8 rounded-full px-6 py-3 text-sm font-medium transition-transform hover:scale-105 ${
          pkg.popular
            ? "bg-violet text-white hover:bg-violet-light"
            : "border border-white/15 text-white hover:border-violet hover:text-violet"
        }`}
      >
        Choose {pkg.name}
      </button>
    </div>
  );
}
