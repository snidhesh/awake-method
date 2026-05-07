"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

/* ── Animated counter hook ── */
function useCountUp(end: number, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  const animate = useCallback(() => {
    if (started.current) return;
    started.current = true;

    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration]);

  useEffect(() => {
    if (!startOnView || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) animate();
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [animate, startOnView]);

  return { count, ref };
}

/* ── Stat counter component ── */
function StatCounter({
  end,
  suffix,
  label,
}: {
  end: number;
  suffix: string;
  label: string;
}) {
  const { count, ref } = useCountUp(end, 2200);

  return (
    <div ref={ref}>
      <div className="font-serif text-[1.5rem] sm:text-[2rem] font-black text-pink leading-none tabular-nums">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-[0.72rem] tracking-[0.1em] uppercase text-white/30 mt-1">
        {label}
      </div>
    </div>
  );
}

export default function Hero() {
  const stats = [
    { end: 3000, suffix: "+", label: "Professionals Trained" },
    { end: 50, suffix: "+", label: "Events & Talks" },
    { end: 20, suffix: "", label: "Years in Sales & CX" },
  ];

  return (
    <section className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center px-[7vw] sm:px-[5vw] pt-[76px] sm:pt-24 lg:pt-[100px] pb-16 lg:pb-[60px] max-w-[1400px] mx-auto gap-10 lg:gap-16 min-h-screen">
        {/* Text */}
        <div className="text-center lg:text-left order-2 lg:order-1">
          <div className="inline-flex items-center gap-3 text-[0.72rem] font-medium tracking-[0.18em] uppercase text-pink mb-6 bg-pink/[0.08] px-4 py-2 rounded-full">
            <span className="w-8 h-px bg-pink hidden sm:block" />
            Customer Experience &middot; Sales &middot; Leadership
          </div>
          <p className="text-[0.7rem] font-semibold tracking-[0.22em] uppercase text-white/30 mb-3">
            Presence Is the Product.
          </p>
          <h1 className="font-serif text-[clamp(2.8rem,4.5vw,5.5rem)] leading-[1.05] font-black text-white mb-8" style={{ textShadow: '0 2px 40px rgba(232, 24, 92, 0.15)' }}>
            Customer Experience
            <br />
            Is The <em className="text-pink italic">Strategy.</em>
          </h1>
          <p className="text-[1.03rem] leading-[1.9] text-white/50 max-w-[480px] mb-12 mx-auto lg:mx-0">
            Cecilia Reinaldo helps you review your customer journey, convert more
            sales, and understand the underlying reasons your business isn&apos;t
            growing the way it should. So you can lead with intention and build
            loyalty that lasts.
          </p>
          <div className="flex gap-4 flex-col sm:flex-row flex-wrap justify-center lg:justify-start">
            <a
              href="#playbook"
              className="bg-pink text-white px-8 py-3.5 rounded-full text-[0.84rem] font-medium tracking-[0.08em] uppercase hover:bg-pink-light hover:-translate-y-px transition-all text-center w-full sm:w-auto"
            >
              Get the Playbook
            </a>
            <a
              href="#speak"
              className="border-[1.5px] border-white/20 text-white px-8 py-3.5 rounded-full text-[0.84rem] font-medium tracking-[0.08em] uppercase hover:bg-white/[0.06] hover:border-white/40 transition-all text-center w-full sm:w-auto"
            >
              Book a Masterclass
            </a>
          </div>

          {/* Stats — animated counters */}
          <div className="flex gap-6 sm:gap-8 mt-10 pt-10 border-t border-white/[0.06] justify-center lg:justify-start">
            {stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-4 sm:gap-8">
                <StatCounter end={s.end} suffix={s.suffix} label={s.label} />
                {i < 2 && (
                  <div className="hidden sm:block w-px h-8 bg-white/[0.08]" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Visual */}
        <div className="relative flex justify-center items-center order-1 lg:order-2">
          {/* Pink radial gradient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,24,92,0.1),transparent_70%)]" />

          <div className="relative w-full max-w-[320px] sm:max-w-[440px] lg:max-w-[520px] mx-auto">
            {/* Photo — blended into background */}
            <div className="relative z-[1] overflow-hidden aspect-[4/5]">
              <Image
                src="/cecilia_hero_image.jpg"
                alt="Cecilia Reinaldo"
                fill
                className="object-cover object-top"
                priority
              />
              {/* Edge blending — all four sides fade into the page background */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-[#0a0a0a]/50" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-l from-[#0a0a0a]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/30 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-10">
                <div className="font-serif text-[1.4rem] sm:text-[1.6rem] font-black text-white leading-[1.1] mb-1">
                  Cecilia Reinaldo
                </div>
                <div className="w-8 h-[2px] bg-pink mb-2" />
                <div className="text-[0.62rem] tracking-[0.18em] uppercase text-white/50 font-medium">
                  Presence Is the Product
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
