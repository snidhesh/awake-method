const pills = [
  "Customer Experience",
  "Sales Coaching",
  "Hospitality Culture",
  "Real Estate",
  "Leadership",
  "Keynote Speaking",
];

export default function About() {
  return (
    <section id="about" className="bg-[#0a0a0a] text-white py-12 sm:py-16 lg:py-20 px-[5vw] border-t border-white/[0.04]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-center">
          {/* Left column */}
          <div>
            <div className="flex items-center gap-3 text-[0.7rem] font-medium tracking-[0.18em] uppercase text-pink mb-4">
              <span className="w-6 h-px bg-pink" />
              About Cecilia
            </div>

            <h2 className="font-serif text-[clamp(2rem,3.8vw,3.4rem)] leading-[1.1] font-black text-white mb-6">
              Waking People Up To{" "}
              <em className="text-pink italic">Their Potential</em>
            </h2>

            <p className="text-[1rem] leading-[1.87] text-white/60 mb-6">
              Cecilia Reinaldo is a customer experience strategist, sales
              performance coach, and keynote speaker based in Dubai. With 20
              years in sales and CX, she has trained over 3,000 professionals
              across real estate, luxury hospitality, and high-performance
              service industries.
            </p>

            <p className="text-[0.93rem] leading-[1.82] text-white/40 mb-8">
              She created the AWAKE Method after watching talented professionals
              chase success while disconnected from their purpose, their clients,
              and themselves. Her work bridges hospitality intelligence and sales
              performance, proving the discipline behind exceptional
              service is the same engine that drives loyalty, conversion, and
              growth.
            </p>

            <div className="flex flex-wrap gap-[0.6rem] mt-8">
              {pills.map((pill) => (
                <span
                  key={pill}
                  className="bg-white/[0.05] border border-white/[0.08] text-white/70 text-[0.72rem] tracking-[0.1em] uppercase px-[0.85rem] py-[0.38rem] rounded-sm"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div>
            <div className="font-serif text-[1.5rem] sm:text-[1.8rem] italic leading-[1.5] text-white border-l-[3px] border-pink pl-4 sm:pl-6 mb-6" style={{ textShadow: '0 0 40px rgba(232, 24, 92, 0.2)' }}>
              &ldquo;You can&apos;t sell what you don&apos;t feel. You
              can&apos;t lead what you don&apos;t live.&rdquo;
            </div>

            <p className="text-[0.78rem] tracking-[0.1em] uppercase text-white/25 mb-8">
              Cecilia Reinaldo, The AWAKE Method
            </p>

            <p className="text-[0.9rem] leading-[1.87] text-white/[0.48]">
              Inspired by thought leaders like Bren&eacute; Brown and Mel
              Robbins, Cecilia brings raw authenticity and practical frameworks
              together. Tools that don&apos;t just inspire but transform.
              Her work is rooted in a single belief: awareness is where
              everything begins: your clarity, your energy, your results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
