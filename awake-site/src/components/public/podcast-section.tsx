const episodes = [
  {
    title: "The TikTok Lawyer Breaks Down UAE Real Estate Law | Arash Zad",
    date: "Mar 2025 · 32 min",
    url: "https://open.spotify.com/episode/3kiBVOhaOTExCZggVPlOiK",
  },
  {
    title:
      "Dubai Commercial Real Estate: What's Really Driving the Market? | Behnam Bargh",
    date: "Jan 2025 · 17 min",
    url: "https://open.spotify.com/episode/6XqkIlFELHZEO3selC7p34",
  },
  {
    title:
      "How Smart Investors Win in UAE Real Estate | Dr. Mohanad Alwadiya",
    date: "Dec 2024 · 32 min",
    url: "https://open.spotify.com/episode/2jSfGfTkiUA4cglkJrwfBr",
  },
  {
    title:
      "Inside Million Dollar Listing UAE Season 2 | Ben Bandari & Sarah Serhan",
    date: "Nov 2024 · 29 min",
    url: "https://open.spotify.com/episode/5RfGFs3f5sNwRXEEfxJVpG",
  },
  {
    title: "The Future of AI in Real Estate & Dubai PropTech Revolution",
    date: "Oct 2024 · 17 min",
    url: "https://open.spotify.com/episode/2ky1qRN15y0stwfW6xrarF",
  },
  {
    title:
      "Scaling a Real Estate Business in Dubai's Competitive Market | Abdullah Alajaji",
    date: "Apr 2025 · 26 min",
    url: "https://open.spotify.com/episode/04sXQhziDyTvu5RXaB5hs2",
  },
];

export default function PodcastSection() {
  return (
    <section className="bg-[#0a0a0a] text-white px-[5vw] py-12 sm:py-16 lg:py-20" id="podcast">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center gap-3 text-[0.7rem] font-medium tracking-[0.18em] uppercase text-pink mb-4">
          <span className="w-6 h-px bg-pink" />
          Listen &amp; Learn
        </div>
        <h2 className="font-serif text-[clamp(2rem,3.8vw,3.4rem)] leading-[1.1] font-black mb-6">
          The Real Estate Majlis{" "}
          <em className="text-pink italic">Podcast</em>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mt-12">
          {/* Left — info + art */}
          <div>
            <p className="text-[0.94rem] leading-[1.87] text-white/44 mb-3">
              Hosted by Mahmoud Al Burai and Cecilia Reinaldo. Wide-ranging conversations on UAE real estate
              market trends, investment, leadership, and what it truly takes to
              perform at the highest level.
            </p>
            <p className="text-[0.82rem] text-white/25 mb-8">
              Powered by Bayut, UAE&apos;s largest real estate portal.
            </p>
            <div className="flex gap-4 flex-wrap mb-10">
              <a
                href="https://open.spotify.com/show/01ql9GHXl9IL3XmavocY6o"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink text-white px-5 py-2.5 rounded-sm text-[0.77rem] font-medium tracking-[0.06em] uppercase hover:bg-pink-light transition-colors"
              >
                Listen on Spotify
              </a>
              <a
                href="https://podcasts.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/16 text-white/60 px-5 py-2.5 rounded-sm text-[0.77rem] font-medium tracking-[0.06em] uppercase hover:border-white/40 transition-colors"
              >
                Apple Podcasts
              </a>
            </div>

            {/* Podcast art */}
            <div className="aspect-square max-w-[360px] mx-auto lg:max-w-none rounded-lg overflow-hidden relative">
              <img
                src="/podcast-cover.jpg"
                alt="The Real Estate Majlis Podcast — Mahmoud Al Burai & Cecilia Reinaldo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right — episodes */}
          <div>
            <p className="text-[0.68rem] tracking-[0.15em] uppercase text-white/22 mb-4">
              Latest Episodes
            </p>
            <div className="flex flex-col gap-3.5">
              {episodes.map((ep) => (
                <a
                  key={ep.url}
                  href={ep.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/6 rounded-lg px-5 py-4 flex justify-between items-center hover:border-pink hover:-translate-y-[1px] transition-all group"
                >
                  <div>
                    <div className="text-[0.88rem] font-medium text-white/85 group-hover:text-white transition-colors">
                      {ep.title}
                    </div>
                    <div className="text-[0.7rem] text-pink tracking-[0.1em] uppercase mt-1">
                      {ep.date}
                    </div>
                  </div>
                  <div className="w-10 h-10 sm:w-[36px] sm:h-[36px] border border-white/16 rounded-full flex items-center justify-center shrink-0 ml-4 group-hover:bg-pink group-hover:border-pink transition-all">
                    <div className="border-l-[8px] border-y-[5px] border-l-white border-y-transparent ml-0.5" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
