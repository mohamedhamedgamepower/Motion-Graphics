"use client";

import Link from "next/link";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
}

export default function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-obsidian md:hidden">
      <div className="flex items-center justify-between px-6 py-5">
        <span className="font-display text-xl font-semibold">
          Nova<span className="text-violet">Motion</span>
        </span>
        <button aria-label="Close menu" onClick={onClose} className="text-2xl leading-none">
          &times;
        </button>
      </div>

      <ul className="mt-10 flex flex-col items-center gap-8">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              onClick={onClose}
              className="font-display text-3xl font-medium text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-12 flex justify-center">
        <Link
          href="/#contact"
          onClick={onClose}
          className="rounded-full bg-violet px-6 py-3 text-sm font-medium text-white"
        >
          Let&apos;s Work Together
        </Link>
      </div>
    </div>
  );
}
