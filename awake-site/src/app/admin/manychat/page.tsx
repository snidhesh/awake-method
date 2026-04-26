"use client";

import { useEffect, useState } from "react";
import { getServiceCounts } from "@/lib/store";
import { toast } from "@/components/admin/toast";

interface FlowStep {
  trigger: string;
  text: string;
  delay?: string;
  dim?: boolean;
}

interface Flow {
  icon: string;
  name: string;
  triggerDesc: string;
  status: "Live" | "Draft";
  steps: FlowStep[];
  metrics: { label: string; value: string }[];
}

const flows: Flow[] = [
  {
    icon: "📥",
    name: "Free Playbook DM Flow",
    triggerDesc: 'Trigger: Instagram comment "AWAKE" or DM "free guide"',
    status: "Live",
    steps: [
      {
        trigger: "Trigger",
        text: 'User comments "AWAKE" on any post, or sends "free guide" in a DM',
      },
      {
        trigger: "Step 1 — Instant DM",
        text: "Send: \"Hey [First Name] 👋 Here's your free AWAKE Method guide → [link]. Save it. — Cecilia 🌟\"",
      },
      {
        trigger: "Step 2 — Collect Email",
        text: "Ask: \"What's the best email to send you bonus resources from the AWAKE community?\" → Save to subscriber list",
        delay: "⏱ Immediately after guide link",
      },
      {
        trigger: "Step 3 — Day 3 Follow-Up",
        text: '"Hey [First Name] — which of the 10 CX foundations hit home for you? I read every reply 💛"',
        delay: "⏱ 3 days after download",
      },
      {
        trigger: "Step 4 — Day 7 Invite",
        text: '"Ready to go deeper? Join the AWAKE WhatsApp Community → [link]" + Button: Join / Not yet',
        delay: "⏱ 7 days after download",
        dim: true,
      },
    ],
    metrics: [
      { label: "Triggered", value: "triggered" },
      { label: "Email Collected", value: "—" },
      { label: "Day 3 Reply Rate", value: "—" },
      { label: "WA Join Rate", value: "—" },
    ],
  },
  {
    icon: "🎙️",
    name: "Podcast Episode Drop",
    triggerDesc: 'Trigger: DM "podcast" / "majlis" / "episode"',
    status: "Live",
    steps: [
      {
        trigger: "Trigger",
        text: 'User sends "podcast", "majlis", or "episode" in DM',
      },
      {
        trigger: "Step 1 — Episode Link",
        text: "Send: \"Here's this week's episode of The Real Estate Majlis 🎙️ → [Spotify] [Apple]. A review means the world. — Cecilia\"",
      },
      {
        trigger: "Step 2 — Free Guide Offer",
        text: '"P.S. — If the episode resonated, I have a free AWAKE Method guide. Want me to send it over?" → Yes / No',
        delay: "⏱ 10 minutes after episode link",
        dim: true,
      },
    ],
    metrics: [
      { label: "Triggered", value: "—" },
      { label: "Link Clicked", value: "—" },
      { label: "Guide Requested", value: "—" },
    ],
  },
  {
    icon: "🎤",
    name: "Speaking Enquiry",
    triggerDesc:
      'Trigger: DM "speaking" / "keynote" / "event" / "masterclass"',
    status: "Draft",
    steps: [
      {
        trigger: "Trigger",
        text: "User sends: speaking, keynote, event, masterclass, hire, book you",
      },
      {
        trigger: "Step 1 — Warm Response",
        text: '"Hi [Name] 👋 Thank you so much — I\'d love to hear more about your event. Can you tell me about the audience and date?"',
      },
      {
        trigger: "Step 2 — Redirect",
        text: '"Please fill in our short enquiry form and the team will get back within 48 hours → [link to website contact form]"',
        dim: true,
      },
    ],
    metrics: [{ label: "Not yet live", value: "—" }],
  },
];

export default function ManyChatPage() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    setCounts(getServiceCounts());
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="font-serif text-[1.05rem] font-bold text-white">
          ManyChat Automation Flows
        </div>
        <button
          onClick={() =>
            toast(
              "Open ManyChat.com to build new flows, then link them here.",
              "info"
            )
          }
          className="bg-pink border border-pink text-white px-3.5 py-1.5 rounded text-[0.77rem] font-medium hover:bg-[#ff4d84] transition-colors cursor-pointer"
        >
          + New Flow
        </button>
      </div>

      <p className="text-[0.82rem] text-white/28 mb-5">
        ManyChat handles Instagram DM automation and Facebook Messenger flows.
        Connect your account in Integrations, then manage and monitor flows
        here.
      </p>

      {flows.map((flow) => (
        <div
          key={flow.name}
          className="bg-[#141210] border border-white/7 rounded-md p-5 mb-3"
        >
          {/* Flow header */}
          <div className="flex items-center gap-3 mb-3.5">
            <div className="w-[34px] h-[34px] bg-pink/14 rounded-md flex items-center justify-center text-[0.95rem] shrink-0">
              {flow.icon}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-[0.92rem] text-white">
                {flow.name}
              </div>
              <div className="text-[0.72rem] text-white/28 mt-0.5">
                {flow.triggerDesc}
              </div>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <span
                className={`text-[0.65rem] font-semibold px-[7px] py-[2px] rounded-[3px] uppercase tracking-[0.05em] ${
                  flow.status === "Live"
                    ? "bg-green-500/12 text-green-500"
                    : "bg-amber-500/12 text-amber-500"
                }`}
              >
                {flow.status}
              </span>
              <button
                onClick={() =>
                  toast(
                    "Opens in ManyChat — connect account first in Integrations.",
                    "info"
                  )
                }
                className="bg-[#1c1917] border border-white/13 text-white/55 px-3 py-1 rounded text-[0.72rem] font-medium hover:border-pink hover:text-pink transition-colors cursor-pointer"
              >
                Edit in ManyChat
              </button>
            </div>
          </div>

          {/* Flow steps */}
          <div className="flex flex-col gap-2 mb-3.5">
            {flow.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                {/* Step line */}
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className={`w-[9px] h-[9px] rounded-full mt-[3px] shrink-0 ${
                      step.dim
                        ? "bg-[#242119] border-[1.5px] border-white/13"
                        : "bg-pink"
                    }`}
                  />
                  {i < flow.steps.length - 1 && (
                    <div className="w-px h-6 bg-white/13 mt-[3px]" />
                  )}
                </div>
                {/* Step content */}
                <div>
                  <div className="text-[0.63rem] tracking-[0.12em] uppercase text-white/28 mb-0.5">
                    {step.trigger}
                  </div>
                  <div className="text-[0.82rem] text-white/55 leading-[1.52]">
                    {step.text}
                  </div>
                  {step.delay && (
                    <div className="text-[0.7rem] font-mono text-amber-500 mt-0.5">
                      {step.delay}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Metrics */}
          <div className="flex gap-[18px] pt-3 border-t border-white/7">
            {flow.metrics.map((m) => (
              <div key={m.label}>
                <div className="font-serif text-[1.35rem] font-black text-white">
                  {m.value === "triggered"
                    ? counts.playbook || 0
                    : m.value}
                </div>
                <div className="text-[0.6rem] tracking-[0.12em] uppercase text-white/28 mt-0.5">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
