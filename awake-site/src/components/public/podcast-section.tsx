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
    <section className="bg-[#0a0a0a] text-white px-[7vw] sm:px-[5vw] py-16 sm:py-20 lg:py-24" id="podcast">
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
                className="inline-flex items-center gap-2.5 bg-pink text-white px-5 py-2.5 rounded-sm text-[0.77rem] font-medium tracking-[0.06em] uppercase hover:bg-pink-light transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                Listen on Spotify
              </a>
              <a
                href="https://podcasts.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 border border-white/16 text-white/60 px-5 py-2.5 rounded-sm text-[0.77rem] font-medium tracking-[0.06em] uppercase hover:border-white/40 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0H5.34zm6.525 2.568c2.336 0 4.448.902 6.056 2.587 1.224 1.272 1.912 2.619 2.264 4.392l.04.23-.18.022c-.96.116-1.67-.074-2.31-.616l-.156-.142c-.504-1.38-1.156-2.425-2.1-3.36a7.41 7.41 0 00-3.614-2.07 7.612 7.612 0 00-4.41.39c-1.59.678-2.848 1.788-3.742 3.298a7.312 7.312 0 00-.592 6.252 7.593 7.593 0 002.772 3.564c.15.114.16.128.056.284-.396.588-.624 1.272-.66 1.98l-.012.156-.156-.078a9.86 9.86 0 01-3.12-2.736 9.684 9.684 0 01-1.884-4.596A9.602 9.602 0 012.7 6.744a9.768 9.768 0 016.168-4.044c.96-.18 1.958-.216 2.997-.132zm.198 3.168c.636.06 1.26.192 1.86.396 1.476.504 2.7 1.416 3.588 2.652.852 1.2 1.332 2.58 1.392 3.996l.006.228-.174.018c-.78.084-1.404-.126-1.974-.66l-.084-.084-.042-.222c-.18-1.2-.648-2.232-1.428-3.072a5.27 5.27 0 00-2.784-1.632 5.436 5.436 0 00-3.222.162A5.218 5.218 0 006.42 9.654a5.292 5.292 0 00.054 4.602c.24.48.54.912.882 1.296l.084.09-.012.126c-.072.852-.348 1.596-.828 2.232l-.09.114-.114-.09a7.828 7.828 0 01-2.352-3.936 7.524 7.524 0 01.378-4.698 7.566 7.566 0 014.602-4.074c1.26-.396 2.394-.468 3.564-.282l.276.048zm-.072 3.156a4.362 4.362 0 013.282 2.31 4.218 4.218 0 01.228 3.222 3.99 3.99 0 01-1.266 1.896c-.36.306-.546.396-.546.264 0-.03.024-.15.054-.27.12-.48.144-.852.066-1.338a2.394 2.394 0 00-.756-1.38c-.396-.378-.846-.588-1.476-.69-.42-.066-.84-.036-1.32.096l-.186.054-.078-.084a3.96 3.96 0 01-.87-3.732 4.08 4.08 0 012.472-2.268c.39-.156.672-.222 1.116-.264l.28-.016zM12 13.296c.462 0 .876.186 1.206.54.36.384.546.858.576 1.422.018.39-.024.75-.12 1.086l-.048.15-.186.63c-.264.87-.408 1.44-.456 1.836-.066.534.006.876.258 1.224.156.216.36.384.606.504l.168.078-.198.12a3.728 3.728 0 01-1.86.492c-.66 0-1.236-.168-1.764-.516l-.162-.108.144-.072c.462-.24.762-.576.918-1.002.138-.378.15-.744.048-1.254-.066-.324-.198-.756-.414-1.386l-.198-.594a4.442 4.442 0 01-.168-1.2c.024-.558.204-1.05.546-1.44.342-.39.774-.6 1.26-.66.15-.018.204-.018.354 0l.39.07z"/>
                </svg>
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
