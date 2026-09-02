"use client";

import type { Package } from "@/lib/types";
import PackageCard from "./PackageCard";

interface PackagesProps {
  packages: Package[];
}

export default function Packages({ packages }: PackagesProps) {
  function handleChoose(pkg: Package) {
    const phone = "201024548224";

    const message = `Hello! I'm interested in the ${pkg.name} package.

Package: ${pkg.name}
Videos: ${pkg.videos_count}
Price: $${pkg.price} ${pkg.currency}

I'd like to discuss the details and get started.`;

    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  }

  return (
    <section id="packages" className="bg-night-blue/10 px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="eyebrow">Pricing</p>

          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            Choose Your Motion Package
          </h2>
        </div>

        {packages.length === 0 ? (
          <p className="mt-10 text-center text-mist">
            Packages will appear here once they&apos;re added in Supabase.
          </p>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                onChoose={handleChoose}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}