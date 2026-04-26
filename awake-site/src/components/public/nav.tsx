"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#method", label: "The Method" },
  { href: "#playbook", label: "Playbook" },
  { href: "#podcast", label: "Podcast" },
  { href: "#community", label: "Community" },
  { href: "#speak", label: "Speaking" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/94 backdrop-blur-xl border-b border-black/7 px-[5vw]">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[68px]">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="font-serif font-black text-[1.35rem] tracking-[0.1em]">
            <span className="text-dark">AW</span>
            <span className="text-pink">AKE</span>
          </span>
          <span className="hidden sm:block ml-2 pl-2 border-l border-black/12 font-sans text-[0.5rem] font-medium tracking-[0.2em] uppercase text-mid-gray leading-tight">
            Method
            <br />
            by Cecilia Reinaldo
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex gap-8 list-none">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[0.82rem] font-medium tracking-[0.06em] uppercase text-dark hover:text-pink transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#speak"
            className="hidden sm:inline-block bg-pink text-white px-5 py-2 rounded-sm text-[0.78rem] font-medium tracking-[0.08em] uppercase hover:bg-pink-light transition-colors"
          >
            Book Cecilia
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-1 text-dark"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden pb-6 border-t border-black/7">
          <ul className="flex flex-col gap-1 pt-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-2 py-2 text-[0.9rem] font-medium tracking-[0.04em] uppercase text-dark hover:text-pink transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a
                href="#speak"
                onClick={() => setOpen(false)}
                className="block bg-pink text-white text-center px-5 py-3 rounded-sm text-[0.84rem] font-medium tracking-[0.08em] uppercase"
              >
                Book Cecilia
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
