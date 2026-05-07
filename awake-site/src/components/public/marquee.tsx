"use client";

const items = [
  "Customer Experience Is The Strategy",
  "Service Is The Starting Line",
  "Emotion Is The New Currency",
  "Anticipate, Don't React",
  "Hospitality Is Everyone's Job",
  "Make It Personal, Not Polished",
];

function TickerItem({ text }: { text: string }) {
  return (
    <div className="flex items-stretch shrink-0 border border-white/[0.06] rounded-[3px] overflow-hidden bg-white/[0.025]">
      <div className="w-[2px] bg-pink/50" />
      <span className="text-[0.7rem] sm:text-[0.76rem] font-medium tracking-[0.12em] uppercase text-white/65 px-4 py-2 sm:py-2.5">
        {text}
      </span>
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="relative flex items-stretch bg-[#0c0b0a] border-y border-white/[0.04] overflow-hidden group">
      {/* Static ticker label — like a stock exchange badge */}
      <div className="shrink-0 bg-pink/[0.07] border-r border-white/[0.06] px-3 sm:px-5 flex items-center gap-2 z-20">
        <span className="w-[5px] h-[5px] rounded-full bg-pink animate-pulse-dot" />
        <span className="text-[0.58rem] sm:text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-pink/80 whitespace-nowrap hidden sm:inline">
          AWAKE
        </span>
      </div>

      {/* Scrolling ticker content */}
      <div className="relative flex-1 overflow-hidden">
        {/* Edge gradient masks for smooth fade-in / fade-out */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#0c0b0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#0c0b0a] to-transparent z-10 pointer-events-none" />

        <div className="py-2.5 sm:py-3">
          <div className="flex gap-3 sm:gap-4 animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
            {/* Triple the items for a seamless, longer loop */}
            {[...items, ...items, ...items].map((item, i) => (
              <TickerItem key={i} text={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Subtle pink accent line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink/20 to-transparent pointer-events-none" />
    </div>
  );
}
