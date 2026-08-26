import Link from "next/link";

export default function Hero() {
  return (
    <section className="starfield relative flex min-h-screen items-center overflow-hidden bg-night-gradient px-6 pt-24 lg:px-10">
      {/* Signature glow — a quiet nod to the "starry sky" brand color */}
      <div className="pointer-events-none absolute inset-0 bg-violet-glow" aria-hidden="true" />

      {/* Two faint drifting orbs for subtle depth — CSS only, cheap to render */}
      <div
        className="pointer-events-none absolute left-[10%] top-[20%] h-64 w-64 animate-drift rounded-full bg-violet/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[15%] right-[8%] h-72 w-72 animate-drift rounded-full bg-night-blue/40 blur-3xl"
        style={{ animationDelay: "2s" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="eyebrow animate-fade-in">Motion Graphics Studio</p>

        <h1 className="mt-6 animate-fade-up font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          Motion Graphics That
          <br />
          Make Brands <span className="text-violet">Move.</span>
        </h1>

        <p
          className="mx-auto mt-6 max-w-xl animate-fade-up text-lg text-mist"
          style={{ animationDelay: "0.1s" }}
        >
          Creative motion content designed for brands, businesses, products, and social media.
        </p>

        <div
          className="mt-10 flex animate-fade-up flex-col items-center justify-center gap-4 sm:flex-row"
          style={{ animationDelay: "0.2s" }}
        >
          <Link
            href="#work"
            className="w-full rounded-full bg-violet px-7 py-3.5 text-sm font-medium text-white transition-transform hover:scale-105 hover:bg-violet-light sm:w-auto"
          >
            View My Work
          </Link>
          <Link
            href="#packages"
            className="w-full rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:border-violet hover:text-violet sm:w-auto"
          >
            View Packages
          </Link>
        </div>
      </div>
    </section>
  );
}
