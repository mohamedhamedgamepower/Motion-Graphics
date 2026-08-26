import Link from "next/link";

export default function Contact() {
  return (
    <section id="contact" className="starfield bg-night-gradient px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">
          Have a project in mind?
        </h2>
        <p className="mt-4 text-mist">
          Let&apos;s create motion content that makes your brand stand out.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="#packages"
            className="w-full rounded-full bg-violet px-7 py-3.5 text-sm font-medium text-white transition-transform hover:scale-105 hover:bg-violet-light sm:w-auto"
          >
            Start a Project
          </Link>
          <a
            href="mailto:hello@novamotion.studio"
            className="w-full rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:border-violet hover:text-violet sm:w-auto"
          >
            Contact Me
          </a>
        </div>

        <div className="mt-10 flex justify-center gap-6 text-sm text-mist">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            Instagram
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            YouTube
          </a>
          <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            Behance
          </a>
        </div>
      </div>
    </section>
  );
}
