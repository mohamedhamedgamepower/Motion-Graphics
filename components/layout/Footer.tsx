import Link from "next/link";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "Behance", href: "https://behance.net" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-obsidian px-6 py-12 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold">
            Nova<span className="text-violet">Motion</span>
          </p>
          <p className="mt-1 text-sm text-mist">Motion Designer</p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-mist">
          <Link href="/#work" className="hover:text-white">Work</Link>
          <Link href="/#packages" className="hover:text-white">Packages</Link>
          <Link href="/#about" className="hover:text-white">About</Link>
          <Link href="/#contact" className="hover:text-white">Contact</Link>
        </nav>

        <div className="flex gap-6 text-sm text-mist">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-7xl text-xs text-mist/70">
        © {year} NovaMotion. All rights reserved.
      </p>
    </footer>
  );
}
