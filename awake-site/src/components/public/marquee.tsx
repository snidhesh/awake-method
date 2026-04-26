const items = [
  "Customer Experience Is The Strategy",
  "Service Is The Starting Line",
  "Emotion Is The New Currency",
  "Anticipate, Don't React",
  "Hospitality Is Everyone's Job",
  "Make It Personal, Not Polished",
];

function MarqueeItem({ text }: { text: string }) {
  return (
    <span className="font-serif text-[0.88rem] sm:text-[1.1rem] italic text-white flex items-center gap-4 shrink-0">
      {text}
      <span className="w-[5px] h-[5px] rounded-full bg-white/40 shrink-0" />
    </span>
  );
}

export default function Marquee() {
  return (
    <div className="bg-pink py-3 sm:py-[1.15rem] overflow-hidden border-y border-white/[0.05]">
      <div className="flex gap-6 sm:gap-12 animate-marquee whitespace-nowrap">
        {/* Double the items for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <MarqueeItem key={i} text={item} />
        ))}
      </div>
    </div>
  );
}
