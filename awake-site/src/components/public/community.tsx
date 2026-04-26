"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
    </svg>
  );
}

const socials = [
  {
    icon: InstagramIcon,
    name: "@ceciliadxb",
    desc: "Instagram · 40K followers · Daily CX insights",
    href: "https://instagram.com/ceciliadxb",
  },
  {
    icon: LinkedinIcon,
    name: "Cecilia Reinaldo",
    desc: "LinkedIn · Industry leadership and long-form insights",
    href: "https://linkedin.com/in/cecilia-reinaldo-5b43742",
  },
  {
    icon: YoutubeIcon,
    name: "@ceciliadxb",
    desc: "YouTube · Long-form talks and masterclass clips",
    href: "https://youtube.com/@ceciliadxb",
  },
];

export default function Community() {
  const [nlName, setNlName] = useState("");
  const [nlEmail, setNlEmail] = useState("");
  const [nlSubmitted, setNlSubmitted] = useState(false);
  const [nlError, setNlError] = useState("");

  const [nlLoading, setNlLoading] = useState(false);

  const handleNlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNlLoading(true);
    setNlError("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nlName, email: nlEmail }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setNlError(data.error || "Something went wrong. Please try again.");
        setNlLoading(false);
        return;
      }
    } catch {
      setNlError("Network error. Please check your connection and try again.");
      setNlLoading(false);
      return;
    }
    setNlLoading(false);
    setNlSubmitted(true);
  };

  return (
    <section className="bg-[#0a0a0a] text-white px-[5vw] py-14 sm:py-20 lg:py-[100px]" id="community">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 text-[0.7rem] font-medium tracking-[0.18em] uppercase text-pink mb-4">
              <span className="w-6 h-px bg-pink" />
              Join the Community
            </div>
            <h2 className="font-serif text-[clamp(2rem,3.8vw,3.4rem)] leading-[1.1] font-black mb-4">
              Where Awake People
              <br />
              <em className="text-pink italic">Find Each Other</em>
            </h2>
            <p className="text-base leading-[1.82] text-white/45">
              The AWAKE community is where real estate professionals, CX
              leaders, and anyone serious about elevating their presence come
              together. Follow along, subscribe, and show up.
            </p>
          </div>

          {/* Social links */}
          <div className="flex flex-col gap-2.5">
            <div className="text-[0.68rem] tracking-[0.2em] uppercase text-white/25 mb-1">
              Find Cecilia on
            </div>
            {socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] rounded-md px-4 py-4 hover:border-pink/50 transition-colors"
              >
                <s.icon className="text-pink shrink-0" />
                <div className="flex-1">
                  <div className="text-[0.9rem] font-medium text-white">
                    {s.name}
                  </div>
                  <div className="text-[0.72rem] text-white/35">{s.desc}</div>
                </div>
                <ExternalLink size={14} className="text-white/25" />
              </a>
            ))}
          </div>
        </div>

        {/* Two ways to show up */}
        <div className="border-t border-white/7 pt-12 sm:pt-16">
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center gap-3 text-[0.7rem] font-medium tracking-[0.18em] uppercase text-pink mb-4 justify-center">
              <span className="w-6 h-px bg-pink" />
              Join the AWAKE Community
            </div>
            <h2 className="font-serif text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.1] font-black mb-4">
              Two Ways to <em className="text-pink italic">Show Up</em>
            </h2>
            <p className="text-[0.96rem] leading-[1.8] text-white/42 max-w-[520px] mx-auto">
              Register for the newsletter and free playbook, or jump straight
              into the WhatsApp community. Both are free. Both are worth it.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Newsletter */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6 sm:p-10 flex flex-col">
              <div className="text-[0.68rem] tracking-[0.2em] uppercase text-white/30 mb-5">
                Newsletter and Free Playbook
              </div>
              <h3 className="font-serif text-[1.5rem] sm:text-[1.8rem] font-bold text-white leading-[1.2] mb-3">
                One email a week.
                <br />
                No noise. Just insight.
              </h3>
              <p className="text-[0.9rem] leading-[1.75] text-white/42 mb-7 flex-1">
                Register once and get the free AWAKE Method playbook instantly,
                plus a weekly email with one CX idea, one leadership reflection,
                and one thing worth knowing from the real estate world.
              </p>
              <ul className="flex flex-col gap-2.5 mb-8">
                {[
                  "Free AWAKE Method Intro Playbook — instant download",
                  "Weekly newsletter — short, honest, useful",
                  "Early access to podcast episodes",
                  "Monthly AWAKE challenge prompts",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-[0.85rem] text-white/55 flex gap-3 items-start"
                  >
                    <span className="text-pink shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              {nlSubmitted ? (
                <div className="text-center py-6">
                  <p className="text-pink font-medium">
                    You&apos;re in! Check your email for the playbook.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleNlSubmit}
                  className="flex flex-col gap-3"
                >
                  <input
                    type="text"
                    placeholder="Your first name"
                    required
                    value={nlName}
                    onChange={(e) => setNlName(e.target.value)}
                    className="font-sans text-base sm:text-[0.93rem] px-4 py-4 border border-white/[0.1] rounded-sm bg-white/[0.05] text-white outline-none focus:border-pink transition-colors w-full placeholder:text-white/25"
                  />
                  <input
                    type="email"
                    placeholder="Your email address"
                    required
                    value={nlEmail}
                    onChange={(e) => setNlEmail(e.target.value)}
                    className="font-sans text-base sm:text-[0.93rem] px-4 py-4 border border-white/[0.1] rounded-sm bg-white/[0.05] text-white outline-none focus:border-pink transition-colors w-full placeholder:text-white/25"
                  />
                  <button
                    type="submit"
                    className="w-full bg-pink text-white py-4 rounded-sm text-[0.88rem] font-medium tracking-[0.06em] uppercase hover:bg-pink-light transition-colors cursor-pointer"
                  >
                    Register and Get the Playbook
                  </button>
                </form>
              )}
              {nlError && (
                <p className="text-[0.78rem] text-pink text-center mt-2">
                  {nlError}
                </p>
              )}
              <p className="text-[0.7rem] text-white/20 text-center mt-3">
                No spam. Unsubscribe any time.
              </p>
            </div>

            {/* WhatsApp */}
            <div className="bg-[#25D366]/[0.04] border border-[#25D366]/[0.15] rounded-lg p-6 sm:p-10 flex flex-col">
              <div className="text-[0.68rem] tracking-[0.2em] uppercase text-[#25D366]/80 mb-5">
                WhatsApp Community
              </div>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-[54px] h-[54px] bg-[#25D366]/12 rounded-full flex items-center justify-center shrink-0">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#25D366"
                    strokeWidth="1.5"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
                <div>
                  <div className="font-serif text-[1.5rem] font-bold text-white leading-[1.1]">
                    AWAKE Community
                  </div>
                  <div className="text-[0.72rem] text-white/30 mt-0.5">
                    Free to join &middot; 400+ members
                  </div>
                </div>
              </div>
              <p className="text-[0.92rem] leading-[1.78] text-white/48 mb-7 flex-1">
                The AWAKE WhatsApp Community is where the real conversations
                happen. Weekly messages from Cecilia, behind-the-scenes content,
                and a space to connect with professionals committed to showing up
                awake.
              </p>
              <ul className="flex flex-col gap-2.5 mb-10">
                {[
                  "Weekly AWAKE Monday message from Cecilia",
                  "Podcast drops and exclusive content first",
                  "Real conversations with real professionals",
                  "Event and masterclass announcements first",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-[0.85rem] text-white/55 flex gap-3 items-start"
                  >
                    <span className="text-[#25D366] shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#community"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-[#25D366] text-white py-4 px-8 rounded-sm text-[0.85rem] font-medium tracking-[0.08em] uppercase hover:opacity-88 transition-opacity"
              >
                Join on WhatsApp
              </a>
              <p className="text-[0.68rem] text-white/18 text-center mt-3">
                WhatsApp invite link coming soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
