"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const pillars = [
  {
    num: "01",
    title: "Service Is the Starting Line",
    description:
      "Good service is expected. It is the baseline, not the benchmark. What sets you apart is what happens after the service is delivered -- the emotional residue you leave behind.",
  },
  {
    num: "02",
    title: "Emotion Is the New Currency",
    description:
      "People forget what you said, but they never forget how you made them feel. Every interaction is an opportunity to deposit into someone's emotional bank account.",
  },
  {
    num: "03",
    title: "Hospitality Is Everyone's Job",
    description:
      "Hospitality is not a department. It is a philosophy that runs through every role, every touchpoint, and every decision your organization makes.",
  },
  {
    num: "04",
    title: "Make It Personal, Not Polished",
    description:
      "Customers do not want perfection -- they want to feel seen. Replace scripts with sincerity. Replace polish with presence. That is where loyalty lives.",
  },
  {
    num: "05",
    title: "Anticipate, Don't React",
    description:
      "The best experiences feel effortless because someone thought ahead. Move from reactive problem-solving to proactive care. See the need before it becomes a complaint.",
  },
  {
    num: "06",
    title: "Empower the Front Line",
    description:
      "Your customer-facing team is your brand in motion. Give them the authority, tools, and trust to make real-time decisions that surprise and delight.",
  },
  {
    num: "07",
    title: "Ritualize Recognition",
    description:
      "Recognition should not be random -- it should be rhythmic. Build rituals that celebrate your team and your customers consistently, not just when things go wrong.",
  },
  {
    num: "08",
    title: "Turn Feedback Into Fuel",
    description:
      "Complaints are gifts wrapped in frustration. Create systems that capture, honor, and act on feedback so every voice becomes a catalyst for growth.",
  },
  {
    num: "09",
    title: "Design Moments That Matter",
    description:
      "Map your customer journey and identify the moments with the highest emotional stakes. Then over-invest in those moments with intention and creativity.",
  },
  {
    num: "10",
    title: "Make the Ordinary Feel Extraordinary",
    description:
      "Unreasonable hospitality is the art of going beyond what is expected -- not with extravagance, but with thoughtfulness. It is the handwritten note, the remembered name, the extra moment of care that turns a transaction into a relationship and a customer into an advocate. This is where brands become unforgettable.",
  },
];

function getCardStyle(offset: number) {
  // offset: 0 = active center, ±1 = adjacent, ±2 = far sides
  if (Math.abs(offset) > 2) {
    return { opacity: 0, pointerEvents: "none" as const, zIndex: 0, transform: `translateX(${offset > 0 ? 120 : -120}%) scale(0.75)` };
  }

  const absOff = Math.abs(offset);
  const direction = offset > 0 ? 1 : -1;

  if (absOff === 0) {
    return { opacity: 1, pointerEvents: "auto" as const, zIndex: 30, transform: "translateX(0%) scale(1)" };
  }

  if (absOff === 1) {
    return {
      opacity: 0.5,
      pointerEvents: "none" as const,
      zIndex: 20,
      transform: `translateX(${direction * 72}%) scale(0.88)`,
      filter: "blur(2px)",
    };
  }

  // absOff === 2
  return {
    opacity: 0.2,
    pointerEvents: "none" as const,
    zIndex: 10,
    transform: `translateX(${direction * 120}%) scale(0.75)`,
    filter: "blur(4px)",
  };
}

export default function MethodPillars() {
  const [active, setActive] = useState(0);
  const touchStartX = useRef(0);
  const paused = useRef(false);

  const goTo = useCallback(
    (dir: 1 | -1) => {
      setActive((prev) => (prev + dir + pillars.length) % pillars.length);
    },
    [],
  );

  // Auto-scroll every 3 seconds, pause on hover
  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) {
        setActive((prev) => (prev + 1) % pillars.length);
      }
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const delta = e.changedTouches[0].clientX - touchStartX.current;
      if (delta > 50) goTo(-1);
      else if (delta < -50) goTo(1);
    },
    [goTo],
  );

  return (
    <section id="method" className="bg-[#0a0a0a] py-24 sm:py-32 px-[5vw]">
      <div className="max-w-[1200px] mx-auto" onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)}>
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="flex items-center gap-3 text-[0.72rem] font-medium tracking-[0.18em] uppercase text-pink mb-6 justify-center">
            <span className="w-8 h-px bg-pink" />
            The AWAKE Method
            <span className="w-8 h-px bg-pink" />
          </div>
          <h2 className="font-serif text-[clamp(1.8rem,3.5vw,3.2rem)] font-black leading-[1.1] text-white mb-6 max-w-[700px] mx-auto">
            10 Foundations of Customer{" "}
            <em className="text-pink italic">Experience Excellence</em>
          </h2>
          <p className="font-sans text-[1rem] sm:text-[1.05rem] leading-[1.82] text-white/50 max-w-[560px] mx-auto">
            These are the principles that guide every engagement, every
            workshop, and every transformation. They are not theory -- they are
            the operating system for brands that refuse to be ordinary.
          </p>
        </div>

        {/* Coverflow carousel */}
        <div className="relative">
          {/* Arrow buttons */}
          <button
            onClick={() => goTo(-1)}
            aria-label="Previous card"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-40 hidden sm:flex items-center justify-center w-11 h-11 rounded-full border border-white/10 bg-black/40 text-white/40 hover:text-white hover:border-white/30 transition-colors cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            onClick={() => goTo(1)}
            aria-label="Next card"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-40 hidden sm:flex items-center justify-center w-11 h-11 rounded-full border border-white/10 bg-black/40 text-white/40 hover:text-white hover:border-white/30 transition-colors cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>

          {/* Cards viewport */}
          <div
            className="relative overflow-hidden mx-auto"
            style={{ height: "380px" }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {pillars.map((pillar, i) => {
                // Calculate shortest circular offset
                let offset = i - active;
                if (offset > pillars.length / 2) offset -= pillars.length;
                if (offset < -pillars.length / 2) offset += pillars.length;

                const style = getCardStyle(offset);
                const isLast = i === pillars.length - 1;

                return (
                  <div
                    key={pillar.num}
                    className="absolute w-[85vw] max-w-[580px] rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm transition-all duration-500 ease-out"
                    style={{
                      ...style,
                      willChange: "transform, opacity",
                    }}
                  >
                    {/* Pink glow for card 10 */}
                    {isLast && (
                      <div className="absolute inset-0 rounded-xl bg-[radial-gradient(ellipse_at_bottom_right,rgba(232,24,92,0.1),transparent_60%)]" />
                    )}

                    <div className="relative z-[1] flex flex-col gap-4 px-8 py-8 sm:px-10 sm:py-10">
                      <span className="font-serif text-[3.5rem] sm:text-[4rem] font-black leading-none text-pink/30 select-none">
                        {pillar.num}
                      </span>
                      <h3 className="font-serif text-[1.25rem] sm:text-[1.4rem] font-bold leading-[1.2] text-white">
                        {pillar.title}
                      </h3>
                      <span className="w-10 h-[2px] bg-pink/40" />
                      <p className="font-sans text-[0.9rem] sm:text-[0.95rem] leading-[1.8] text-white/55">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Counter + dots */}
        <div className="flex flex-col items-center gap-4 mt-8">
          <span className="font-mono text-[0.8rem] tracking-widest text-white/40">
            {pillars[active].num} / {String(pillars.length).padStart(2, "0")}
          </span>
          <div className="flex gap-2">
            {pillars.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to card ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-colors duration-300 cursor-pointer ${
                  i === active ? "bg-pink" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
