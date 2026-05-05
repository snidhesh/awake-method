"use client";

import { useState } from "react";

export default function PlaybookForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/playbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
      return;
    }
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className="bg-[#0a0a0a] px-[5vw] py-12 sm:py-16 lg:py-20" id="playbook">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Left — info */}
          <div>
            <div className="flex items-center gap-3 text-[0.7rem] font-medium tracking-[0.18em] uppercase text-pink mb-4">
              <span className="w-6 h-px bg-pink" />
              Free Playbook
            </div>
            <h2 className="font-serif text-[clamp(2rem,3.8vw,3.4rem)] leading-[1.1] font-black text-white mb-6">
              Start Your
              <br />
              <em className="text-pink italic">AWAKE</em> Journey
            </h2>
            <p className="text-base leading-[1.85] text-white/50 mb-6">
              Register your name and email and receive the foundational AWAKE
              Method guide — a practical introduction to the 10 Foundations of
              Customer Experience Excellence with real tools you can use
              immediately.
            </p>
            <ul className="flex flex-col gap-2.5 mb-8">
              {[
                "The 10 CX Foundations explained with practical context",
                "Introduction to the 5 customer touchpoints",
                "3 exercises to audit your current CX today",
                "The AWAKE daily intention ritual and 14-day tracker",
                "Key principles from Cecilia's speaking and training work",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[0.88rem] text-white/55"
                >
                  <span className="text-pink font-bold shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="text-[0.8rem] tracking-[0.1em] uppercase text-white/30">
              Free &middot; Instant PDF Download
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-md p-6 sm:p-10">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-pink/10 border border-pink/20 flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#e8185c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div className="font-serif text-[1.8rem] font-black text-white mb-2">
                  Thank You!
                </div>
                <p className="text-white/55 text-[0.95rem] leading-[1.7] mb-4">
                  A link to the <span className="text-pink font-medium">AWAKE Sales Playbook</span> has been sent to your email.
                </p>
                <p className="text-white/30 text-[0.78rem]">
                  Didn&apos;t receive it? Check your spam or promotions folder.
                </p>
              </div>
            ) : (
              <>
                <div className="font-serif text-[2rem] font-black text-pink mb-1">
                  Free
                </div>
                <div className="text-[0.75rem] tracking-[0.12em] uppercase text-white/30 mb-8 pb-6 border-b border-white/[0.06]">
                  Register to download
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.73rem] font-medium tracking-[0.12em] uppercase text-white/30">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="font-sans text-base sm:text-[0.93rem] px-4 py-3.5 border border-white/[0.1] rounded-sm bg-white/[0.05] text-white outline-none focus:border-pink transition-colors w-full placeholder:text-white/25"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.73rem] font-medium tracking-[0.12em] uppercase text-white/30">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="you@yourcompany.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="font-sans text-base sm:text-[0.93rem] px-4 py-3.5 border border-white/[0.1] rounded-sm bg-white/[0.05] text-white outline-none focus:border-pink transition-colors w-full placeholder:text-white/25"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-pink text-white py-4 rounded-sm text-[0.88rem] font-medium tracking-[0.06em] uppercase hover:bg-pink-light transition-colors cursor-pointer disabled:opacity-60"
                  >
                    {loading ? "Registering..." : "Get Your Free Playbook →"}
                  </button>
                </form>
                {error && (
                  <p className="text-[0.78rem] text-pink text-center">
                    {error}
                  </p>
                )}
                <p className="text-[0.7rem] text-white/20 text-center">
                  No spam. Unsubscribe any time.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
