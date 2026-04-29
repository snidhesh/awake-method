"use client";

import { useState } from "react";

const touchpoints = [
  {
    num: "01",
    name: "Phone",
    tag: "Smile In Your Voice",
    description:
      "Your tone arrives before your words do. A warm, confident greeting sets the emotional temperature for the entire call. Pace yourself, smile audibly, and never let a customer feel like they interrupted your day.",
    image: "/channel-phone.jpg",
  },
  {
    num: "02",
    name: "WhatsApp",
    tag: "Personal Space, Personal Standard",
    description:
      "This is where trust is built in real time. Be prompt, be human, and always close with a clear next step. No voice notes without context. No disappearing after the first reply.",
    image: "/channel-whatsapp.jpg",
  },
  {
    num: "03",
    name: "Email",
    tag: "Your Written Brand",
    description:
      "Every email is a press release about your professionalism. Subject lines that respect attention, formatting that guides the eye, and sign-offs that leave the right impression.",
    image: "/channel-email.jpg",
  },
  {
    num: "04",
    name: "Digital",
    tag: "Storefront When You're Not in the Room",
    description:
      "Your Instagram, LinkedIn, and website speak for you 24/7. Consistency in voice, visual identity, and responsiveness turns passive scrollers into paying clients.",
    image: "/channel-digital.jpg",
  },
  {
    num: "05",
    name: "Walk-In",
    tag: "The Ultimate Moment of Truth",
    description:
      "How you stand, how you offer a seat, whether you walk them to the door — this is where brand becomes experience. Every physical interaction is an audition for loyalty.",
    image: "/channel-walkin.jpg",
  },
];

type Touchpoint = (typeof touchpoints)[number];

/* ── Active (hero) card ── */
function ActiveCard({ tp }: { tp: Touchpoint }) {
  return (
    <div className="relative rounded-2xl overflow-hidden h-full min-h-[420px] lg:min-h-[520px] group">
      {/* Background image */}
      <img
        key={tp.num}
        src={tp.image}
        alt={tp.name}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* Pink glow on left edge */}
      <div className="absolute left-0 top-[10%] bottom-[10%] w-[2px] bg-pink/60 blur-[1px]" />
      <div className="absolute left-0 top-[15%] bottom-[15%] w-[6px] bg-pink/15 blur-[8px]" />

      {/* Large watermark number */}
      <span className="absolute top-4 right-6 font-mono text-[6rem] sm:text-[8rem] font-bold leading-none text-white/[0.04] select-none pointer-events-none">
        {tp.num}
      </span>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
        <span className="inline-block font-mono text-[0.7rem] tracking-[0.2em] text-pink/80 mb-2">
          {tp.num}
        </span>
        <h3 className="font-serif text-[1.8rem] sm:text-[2.2rem] font-black text-white leading-[1.1] mb-2">
          {tp.name}
        </h3>
        <p className="text-[0.7rem] font-medium tracking-[0.14em] uppercase text-pink/60 mb-4">
          {tp.tag}
        </p>
        <p className="text-[0.92rem] sm:text-[1rem] leading-[1.75] text-white/60 max-w-[520px]">
          {tp.description}
        </p>
      </div>

      {/* Glass border */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.08] pointer-events-none" />
    </div>
  );
}

/* ── Compact sidebar card ── */
function CompactCard({
  tp,
  onClick,
}: {
  tp: Touchpoint;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative w-full text-left rounded-xl p-4 sm:p-5 cursor-pointer group
                 bg-white/[0.02] backdrop-blur-sm
                 border border-white/[0.06]
                 hover:border-pink/30 hover:bg-white/[0.04]
                 transition-all duration-300 overflow-hidden"
    >
      {/* Subtle pink glow on hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-pink/[0.04] to-transparent pointer-events-none" />

      {/* Top row: number + name */}
      <div className="flex items-center gap-3 relative z-10">
        <span className="font-mono text-[0.68rem] tracking-widest text-white/20 group-hover:text-pink/70 transition-colors duration-300">
          {tp.num}
        </span>
        <span className="font-serif text-[1.1rem] sm:text-[1.25rem] font-bold text-white/50 group-hover:text-white transition-colors duration-300">
          {tp.name}
        </span>
      </div>

      {/* Tag */}
      <p className="text-[0.62rem] font-medium tracking-[0.12em] uppercase text-white/15 group-hover:text-white/35 transition-colors duration-300 mt-1.5 ml-[calc(0.68rem*3+0.75rem)] relative z-10">
        {tp.tag}
      </p>

      {/* Right arrow icon */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-300">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-pink/60"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </button>
  );
}

export default function Touchpoints() {
  const [activeIndex, setActiveIndex] = useState(0);
  const inactive = touchpoints.filter((_, i) => i !== activeIndex);

  return (
    <section
      id="voice"
      className="bg-[#0a0a0a] text-white py-12 sm:py-16 lg:py-20 px-[5vw]"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-[680px] mx-auto mb-10 sm:mb-16">
          <div className="flex items-center gap-3 text-[0.72rem] font-medium tracking-[0.18em] uppercase text-pink mb-6 justify-center">
            <span className="w-8 h-px bg-pink" />
            Every Touchpoint Is Your Brand
            <span className="w-8 h-px bg-pink" />
          </div>

          <h2 className="font-serif text-[clamp(2rem,3.5vw,3.2rem)] leading-[1.1] font-black text-white mb-6">
            The 5 Channels of{" "}
            <em className="text-pink italic">Customer Experience</em>
          </h2>

          <p className="text-[1.03rem] leading-[1.82] text-white/60">
            Your brand doesn&apos;t live in your logo. It lives in every
            interaction — every call answered, every message sent, every door
            held open. These are the five channels where experience is won or
            lost.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-3 sm:gap-4">
          {/* Active hero card */}
          <ActiveCard tp={touchpoints[activeIndex]} />

          {/* Compact sidebar cards */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
            {inactive.map((tp) => {
              const originalIndex = touchpoints.indexOf(tp);
              return (
                <CompactCard
                  key={tp.num}
                  tp={tp}
                  onClick={() => setActiveIndex(originalIndex)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
