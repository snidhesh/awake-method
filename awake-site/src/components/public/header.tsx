"use client";

import { useState, useEffect, useCallback } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "The Method", href: "#method" },
  { label: "Podcast", href: "#podcast" },
  { label: "Playbook", href: "#playbook" },
  { label: "Speaking", href: "#speak" },
  { label: "Community", href: "#community" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? "bg-dark/95 backdrop-blur-2xl shadow-[0_1px_30px_rgba(0,0,0,0.15)]"
            : "bg-dark/70 backdrop-blur-md"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-[5vw] flex items-center justify-between h-[60px] lg:h-[68px]">
          {/* Logo */}
          <a
            href="#"
            className="font-serif text-[1.3rem] font-black tracking-[0.04em] text-white relative z-[60] hover:drop-shadow-[0_0_8px_rgba(232,24,92,0.4)] transition-all duration-300"
            onClick={(e) => {
              e.preventDefault();
              closeMenu();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            AWAKE<span className="text-pink">.</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[0.72rem] font-medium tracking-[0.12em] uppercase text-white/50 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#playbook"
              className="ml-2 bg-pink text-white px-5 py-2 rounded-full text-[0.7rem] font-semibold tracking-[0.06em] uppercase hover:bg-pink-light transition-all duration-300"
            >
              Get the Playbook
            </a>
          </nav>

          {/* Mobile hamburger — refined 2-line style */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-10 h-10 flex flex-col items-end justify-center gap-[7px] cursor-pointer relative z-[60]"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block h-[1.5px] bg-white transition-all duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] origin-center ${
                menuOpen
                  ? "w-6 rotate-45 translate-y-[4.25px]"
                  : "w-6"
              }`}
            />
            <span
              className={`block h-[1.5px] bg-white transition-all duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] origin-center ${
                menuOpen
                  ? "w-6 -rotate-45 -translate-y-[4.25px]"
                  : "w-4"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-[45] bg-black/60 backdrop-blur-sm transition-opacity duration-500 lg:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* Slide-in panel from right */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[55] w-full max-w-[340px] bg-[#0c0b0a] transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] lg:hidden flex flex-col ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Panel header spacing */}
        <div className="h-[60px] shrink-0" />

        {/* Nav links */}
        <nav className="flex-1 flex flex-col px-8 pt-8">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="group flex items-center justify-between py-[18px] border-b border-white/[0.06] transition-all duration-300"
              style={{
                transitionDelay: menuOpen ? `${80 + i * 40}ms` : "0ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateX(0)" : "translateX(20px)",
              }}
            >
              <span className="font-sans text-[1.05rem] font-medium text-white/80 tracking-[0.01em] group-hover:text-white transition-colors duration-300">
                {link.label}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-white/15 group-hover:text-pink group-hover:translate-x-1 transition-all duration-300"
              >
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ))}
        </nav>

        {/* CTA + bottom info */}
        <div
          className="px-8 pb-10 pt-6 transition-all duration-500"
          style={{
            transitionDelay: menuOpen ? "400ms" : "0ms",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <a
            href="#playbook"
            onClick={closeMenu}
            className="block text-center bg-pink text-white py-3.5 rounded-full text-[0.82rem] font-semibold tracking-[0.06em] uppercase hover:bg-pink-light transition-colors duration-300"
          >
            Get the Free Playbook
          </a>

          <div className="mt-8 flex items-center gap-5">
            <a
              href="https://instagram.com/ceciliadxb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/25 hover:text-white transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/cecilia-reinaldo-5b43742"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/25 hover:text-white transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="https://youtube.com/@ceciliadxb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/25 hover:text-white transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0c0b0a" />
              </svg>
            </a>
          </div>

          <p className="text-[0.65rem] text-white/15 tracking-[0.1em] uppercase mt-5">
            &copy; {new Date().getFullYear()} AWAKE Method
          </p>
        </div>
      </div>
    </>
  );
}
