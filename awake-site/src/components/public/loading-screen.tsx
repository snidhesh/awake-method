"use client";

import { useState, useEffect } from "react";

const letters = [
  { char: "A", color: "text-white" },
  { char: "W", color: "text-white" },
  { char: "A", color: "text-pink" },
  { char: "K", color: "text-pink" },
  { char: "E", color: "text-pink" },
];

export default function LoadingScreen() {
  const [phase, setPhase] = useState<"loading" | "exit" | "done">("loading");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const minTime = new Promise((r) => setTimeout(r, 2800));
    const pageLoad = new Promise((r) => {
      if (document.readyState === "complete") r(undefined);
      else window.addEventListener("load", () => r(undefined), { once: true });
    });

    Promise.all([minTime, pageLoad]).then(() => {
      setPhase("exit");
      setTimeout(() => {
        setPhase("done");
        document.body.style.overflow = "";
      }, 900);
    });

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#0a0a0a] flex flex-col items-center justify-center transition-all duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        phase === "exit"
          ? "opacity-0 -translate-y-[40%] scale-[1.02]"
          : ""
      }`}
    >
      {/* Ambient glow behind text */}
      <div className="absolute w-[300px] h-[300px] rounded-full bg-pink/[0.04] blur-[80px] pointer-events-none" />

      {/* AWAKE — staggered letter reveal, matching footer brand split */}
      <div className="relative flex tracking-[0.1em] overflow-hidden">
        {letters.map((l, i) => (
          <span
            key={i}
            className={`font-serif text-[3.2rem] sm:text-[5rem] font-black ${l.color} animate-letter-reveal`}
            style={{ animationDelay: `${0.4 + i * 0.1}s` }}
          >
            {l.char}
          </span>
        ))}
        {/* Pink dot — same as header */}
        <span
          className="font-serif text-[3.2rem] sm:text-[5rem] font-black text-pink animate-letter-reveal"
          style={{ animationDelay: "0.95s" }}
        >
          .
        </span>
      </div>

      {/* Pink accent line */}
      <div className="w-0 animate-line-expand h-[2px] bg-pink mt-4 rounded-full" />

      {/* METHOD subtitle */}
      <div className="text-[0.68rem] sm:text-[0.78rem] tracking-[0.55em] uppercase text-white/35 mt-4 opacity-0 animate-subtitle-in">
        METHOD
      </div>

      {/* Progress bar */}
      <div className="w-[100px] sm:w-[140px] h-[1.5px] bg-white/[0.06] mt-10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-pink to-pink-light animate-progress-fill rounded-full" />
      </div>

      {/* Tagline */}
      <p className="absolute bottom-10 text-[0.6rem] tracking-[0.25em] uppercase text-white/15 opacity-0 animate-tagline-in">
        Presence Is the Product
      </p>
    </div>
  );
}
