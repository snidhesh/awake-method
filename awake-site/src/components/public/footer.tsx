import Link from "next/link";

function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TiktokIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.7a8.16 8.16 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.13z" />
    </svg>
  );
}

function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const columns = [
  {
    title: "Method",
    links: [
      { label: "10 CX Foundations", href: "#method" },
      { label: "5 Touchpoints", href: "#voice" },
      { label: "Free Playbook", href: "#playbook" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Join Free", href: "#community" },
      { label: "Newsletter", href: "#community" },
      { label: "WhatsApp Group", href: "#community" },
    ],
  },
  {
    title: "Work With Me",
    links: [
      { label: "Keynote Speaking", href: "#speak" },
      { label: "Private Masterclass", href: "#speak" },
      { label: "Corporate Training", href: "#speak" },
      { label: "Brand Collaboration", href: "#speak" },
      { label: "Get in Touch", href: "#contact" },
    ],
  },
  {
    title: "Listen",
    links: [
      { label: "The Real Estate Majlis", href: "#podcast" },
      {
        label: "Spotify",
        href: "https://open.spotify.com/show/01ql9GHXl9IL3XmavocY6o",
        external: true,
      },
      {
        label: "Instagram",
        href: "https://instagram.com/ceciliadxb",
        external: true,
      },
      {
        label: "TikTok",
        href: "https://www.tiktok.com/@ceciliareinaldo",
        external: true,
      },
      {
        label: "YouTube",
        href: "https://youtube.com/@ceciliadxb",
        external: true,
      },
    ],
  },
];

const socialLinks = [
  {
    icon: InstagramIcon,
    label: "@ceciliadxb",
    href: "https://instagram.com/ceciliadxb",
  },
  {
    icon: TiktokIcon,
    label: "@ceciliareinaldo",
    href: "https://www.tiktok.com/@ceciliareinaldo",
  },
  {
    icon: LinkedinIcon,
    label: "Cecilia Reinaldo on LinkedIn",
    href: "https://linkedin.com/in/cecilia-reinaldo-5b43742",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#060606] text-white/42 px-[5vw] pt-12 sm:pt-16 pb-8 border-t border-pink/20">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr] gap-8 sm:gap-10 mb-10 sm:mb-12 pb-10 sm:pb-12 border-b border-white/5">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-2.5">
              <span className="font-serif font-black text-[1.18rem] tracking-[0.1em] text-white">
                AW
              </span>
              <span className="font-serif font-black text-[1.18rem] tracking-[0.1em] text-pink">
                AKE
              </span>
              <span className="ml-[7px] pl-[7px] border-l border-white/10 font-sans text-[0.48rem] font-medium tracking-[0.2em] uppercase text-white/22 leading-tight">
                Method
                <br />
                by Cecilia Reinaldo
              </span>
            </div>
            <p className="mt-3 text-[0.85rem] leading-[1.65] max-w-[275px]">
              Presence Is the Product. Cecilia Reinaldo helps leaders, sales
              teams, and organisations wake up to their full potential through
              the AWAKE Method.
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              {socialLinks.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-white/38 text-[0.82rem] hover:text-pink transition-colors"
                >
                  <s.icon />
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-serif text-[0.98rem] text-white mb-3 sm:mb-4">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {"external" in l && l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 text-[0.82rem] hover:text-pink transition-colors"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="text-white/40 text-[0.82rem] hover:text-pink transition-colors"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center text-[0.75rem] gap-2">
          <span>&copy; {new Date().getFullYear()} Cecilia Reinaldo &middot; The AWAKE Method&trade;</span>
          <span>Dubai, UAE &middot; awake-method.com</span>
        </div>
      </div>

      {/* Bottom padding for mobile nav bar */}
      <div className="h-16 lg:hidden" />
    </footer>
  );
}
