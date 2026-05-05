"use client";

import { useState, useRef, useCallback } from "react";

const services = [
  {
    num: "01",
    title: "Keynote Speaking",
    desc: "High-energy, story-driven keynotes on customer experience, sales leadership, and the AWAKE mindset. Tailored to your audience.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Private Masterclass",
    desc: "Transformational half-day or full-day workshops for teams ready to elevate their game. Practical tools applied from day one.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Corporate CX Training",
    desc: "Structured programmes for organisations. Leadership and front-line teams embed the AWAKE principles into everyday behavior.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Brand Collaboration",
    desc: "Co-create content, partner on campaigns, or align with the AWAKE Method community. Let\u2019s build something that matters.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

function TiltCard({
  service,
  children,
}: {
  service: (typeof services)[number];
  children: React.ReactNode;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTilt({ x: rotateX, y: rotateY });
    glow.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(232,24,92,0.15), transparent 40%)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    if (glowRef.current) {
      glowRef.current.style.background = "transparent";
    }
  }, []);

  return (
    <a
      ref={cardRef}
      href="#contact"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 sm:p-9 flex flex-col cursor-pointer overflow-hidden transition-[border-color] duration-300 hover:border-pink/30"
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s ease-out, border-color 0.3s",
        willChange: "transform",
      }}
    >
      {/* Mouse-following glow */}
      <div ref={glowRef} className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100" />

      {/* Animated corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-pink/10 to-transparent rounded-tr-2xl" />
      </div>

      {children}
    </a>
  );
}

export default function Speaking() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    serviceType: "",
    message: "",
  });

  function updateField(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const serviceMap: Record<string, string> = {
      "Keynote Speaking": "keynote",
      "Private Masterclass": "masterclass",
      "Corporate CX Training": "training",
      "Brand Collaboration": "collab",
      "Podcast Collaboration": "podcast",
    };

    setError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          serviceType: serviceMap[formData.serviceType] || formData.serviceType,
          message: formData.message,
        }),
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

  const inputClasses =
    "font-sans text-base sm:text-[0.94rem] px-4 py-3.5 border border-white/[0.1] rounded-sm bg-white/[0.05] text-white outline-none focus:border-pink transition-colors w-full placeholder:text-white/25";

  return (
    <section className="bg-[#0a0a0a] px-[5vw] py-12 sm:py-16 lg:py-20" id="speak">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center gap-3 text-[0.7rem] font-medium tracking-[0.18em] uppercase text-pink mb-4">
          <span className="w-6 h-px bg-pink" />
          Work With Cecilia
        </div>
        <h2 className="font-serif text-[clamp(2rem,3.8vw,3.4rem)] leading-[1.1] font-black text-white mb-6">
          Bring the <em className="text-pink italic">AWAKE</em>
          <br />
          Experience to Your Team
        </h2>
        <p className="text-[1.02rem] leading-[1.82] text-white/50 max-w-[640px]">
          Whether you need a keynote that moves an audience, a private
          masterclass for your top performers, or a full CX training programme —
          Cecilia delivers every time.
        </p>

        {/* Interactive service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-14">
          {services.map((s) => (
            <TiltCard key={s.title} service={s}>
              {/* Header: number + icon */}
              <div className="relative z-[1] flex items-start justify-between mb-8">
                <span className="font-mono text-[0.7rem] tracking-widest text-white/15 group-hover:text-pink/50 transition-colors duration-500">
                  {s.num}
                </span>
                <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white/25 group-hover:text-pink group-hover:border-pink/20 group-hover:bg-pink/[0.06] transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6">
                  {s.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="relative z-[1] font-serif text-[1.4rem] sm:text-[1.65rem] font-bold leading-[1.15] text-white mb-3 group-hover:translate-x-1 transition-transform duration-300">
                {s.title}
              </h3>

              {/* Accent line — grows on hover */}
              <div className="relative z-[1] w-8 h-[2px] bg-pink/30 group-hover:w-16 group-hover:bg-pink/60 transition-all duration-500 mb-4" />

              {/* Description — fades in and slides up */}
              <p className="relative z-[1] text-[0.86rem] leading-[1.72] text-white/35 group-hover:text-white/60 transition-all duration-500 flex-1">
                {s.desc}
              </p>

              {/* CTA — slides in from below on hover */}
              <div className="relative z-[1] mt-6 flex items-center gap-2 text-[0.68rem] font-medium tracking-[0.12em] uppercase text-pink/50 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                Book now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Enquiry form */}
        <div
          className="mt-16 bg-white/[0.03] border border-white/[0.06] rounded-sm p-5 sm:p-8 lg:p-12"
          id="contact"
        >
          <div className="flex items-center gap-3 text-[0.7rem] font-medium tracking-[0.18em] uppercase text-pink mb-6">
            <span className="w-6 h-px bg-pink" />
            Send an Enquiry
          </div>
          <h3 className="font-serif text-[1.7rem] text-white mb-2">
            Let&apos;s Make Something{" "}
            <em className="text-pink">Remarkable</em>
          </h3>
          <p className="text-white/40 text-[0.86rem] mb-8">
            Fill in the form and Cecilia&apos;s team will get back to you within
            48 hours.
          </p>

          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-pink/10 border border-pink/20 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#e8185c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="font-serif text-[1.5rem] font-bold text-white mb-2">
                Thank You for Your Enquiry!
              </div>
              <p className="text-white/50 text-[0.92rem] leading-[1.7] mb-3">
                A confirmation has been sent to your email.<br />
                Cecilia&apos;s team will get back to you within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.72rem] font-medium tracking-[0.1em] uppercase text-white/30">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Yasmin"
                    required
                    value={formData.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    className={inputClasses}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.72rem] font-medium tracking-[0.1em] uppercase text-white/30">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Al-Rashidi"
                    value={formData.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    className={inputClasses}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.72rem] font-medium tracking-[0.1em] uppercase text-white/30">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    required
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className={inputClasses}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.72rem] font-medium tracking-[0.1em] uppercase text-white/30">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+971 50 000 0000"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className={inputClasses}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.72rem] font-medium tracking-[0.1em] uppercase text-white/30">
                    Company / Organisation
                  </label>
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={(e) => updateField("company", e.target.value)}
                    className={inputClasses}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.72rem] font-medium tracking-[0.1em] uppercase text-white/30">
                    Type of Enquiry
                  </label>
                  <div className="relative">
                    <select
                      value={formData.serviceType}
                      onChange={(e) => updateField("serviceType", e.target.value)}
                      className={`${inputClasses} appearance-none pr-10 [&>option]:bg-[#141210] [&>option]:text-white [&>option]:py-2`}
                    >
                      <option value="">Select...</option>
                      <option>Keynote Speaking</option>
                      <option>Private Masterclass</option>
                      <option>Corporate CX Training</option>
                      <option>Brand Collaboration</option>
                      <option>Podcast Collaboration</option>
                      <option>Other</option>
                    </select>
                    <svg className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-[0.72rem] font-medium tracking-[0.1em] uppercase text-white/30">
                    Tell us about your event or brief
                  </label>
                  <textarea
                    placeholder="Share a bit about the event, your team, and what you're hoping to achieve..."
                    value={formData.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    className={`${inputClasses} resize-y min-h-[118px]`}
                  />
                </div>
              </div>
              {error && (
                <p className="text-[0.82rem] text-pink mb-4">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="bg-pink text-white px-8 py-3.5 rounded-sm text-[0.84rem] font-medium tracking-[0.08em] uppercase hover:bg-pink-light transition-colors cursor-pointer disabled:opacity-60 w-full sm:w-auto"
              >
                {loading ? "Sending..." : "Send Enquiry →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
