"use client";

import { useState } from "react";
import { toast } from "@/components/admin/toast";

interface Integration {
  icon: string;
  iconBg: string;
  name: string;
  desc: string;
  setup: string;
  placeholder: string;
  status: "connected" | "pending" | "optional";
  connectLabel: string;
}

const integrations: Integration[] = [
  {
    icon: "🤖",
    iconBg: "bg-pink/14",
    name: "ManyChat",
    desc: "Instagram DM automation and keyword flows. Handles free playbook delivery, podcast drops, and speaking enquiry routing.",
    setup: "Create account at manychat.com → Connect @ceciliadxb Instagram → Build flows → Settings → API → Copy key → Paste below",
    placeholder: "ManyChat API key...",
    status: "pending",
    connectLabel: "Connect →",
  },
  {
    icon: "🐒",
    iconBg: "bg-amber-500/12",
    name: "Mailchimp",
    desc: 'EDM platform for newsletters, welcome sequences, and automated nurture campaigns. Free up to 500 contacts.',
    setup: 'Create account at mailchimp.com → Create Audience "AWAKE Subscribers" → Account → Extras → API Keys → Create → paste below',
    placeholder: "Mailchimp API key...",
    status: "pending",
    connectLabel: "Connect →",
  },
  {
    icon: "📱",
    iconBg: "bg-[#25D366]/12",
    name: "WhatsApp Business API",
    desc: "Required to send WhatsApp broadcasts programmatically at scale. Connected via Meta Business Suite.",
    setup: "business.facebook.com → WhatsApp → Get started → Verify number → Apply for API access (2–5 business days) → Paste token below",
    placeholder: "Meta WhatsApp API token...",
    status: "pending",
    connectLabel: "Connect →",
  },
  {
    icon: "⚡",
    iconBg: "bg-blue-400/12",
    name: "ActiveCampaign",
    desc: "Advanced EDM alternative with better tagging, segmentation, and CRM. Use instead of or alongside Mailchimp.",
    setup: "Create account at activecampaign.com → Settings → Developer → API Access → Copy URL + Key → paste below",
    placeholder: "ActiveCampaign API key...",
    status: "optional",
    connectLabel: "Connect →",
  },
  {
    icon: "💳",
    iconBg: "bg-indigo-500/15",
    name: "Stripe Payments",
    desc: "Handles playbook and consultation payments. Auto-tags purchasers in the subscriber list on payment confirmation.",
    setup: "dashboard.stripe.com → Developers → API Keys → Restrict key → Paste below. Configure webhook to fire on payment success.",
    placeholder: "Stripe secret key...",
    status: "pending",
    connectLabel: "Connect →",
  },
  {
    icon: "🔗",
    iconBg: "bg-orange-500/10",
    name: "Zapier",
    desc: "Connects all your tools. Key Zaps: Website form → Mailchimp + ManyChat. Stripe payment → subscriber tag → VIP sequence.",
    setup: "Key Zaps to build:\n1. New website form → Add to Mailchimp + tag service\n2. Stripe payment → Tag subscriber as buyer\n3. New ManyChat subscriber → Add to this hub",
    placeholder: "Zapier webhook URL...",
    status: "pending",
    connectLabel: "Set Up →",
  },
];

const statusStyles: Record<string, { cls: string; label: string }> = {
  connected: {
    cls: "bg-green-500/12 text-green-500",
    label: "Connected",
  },
  pending: {
    cls: "bg-amber-500/12 text-amber-500",
    label: "Setup Required",
  },
  optional: {
    cls: "bg-blue-400/12 text-blue-400",
    label: "Optional Alt.",
  },
};

const techStackSteps = [
  {
    trigger: "Subscriber enters",
    text: "Via website form, ManyChat Instagram DM, podcast link, or event QR → All routes add them here with the correct service tag",
  },
  {
    trigger: "Instant delivery",
    text: "Mailchimp sends the free playbook PDF automatically (Day 0). ManyChat sends a warm DM if they came via Instagram.",
  },
  {
    trigger: "Nurture sequence",
    text: "Mailchimp sends Day 1, 3, 7, 14 emails automatically. ManyChat sends Day 3 and Day 7 DM follow-ups.",
  },
  {
    trigger: "Ongoing engagement",
    text: "Regular EDM campaigns, WhatsApp community broadcasts from this hub, and podcast episode drops keep the community engaged.",
  },
  {
    trigger: "Service enquiries",
    text: "Keynote, masterclass, training, or collab enquiries are tagged automatically → appear in By Service view → trigger follow-up sequence",
    dim: true,
  },
];

export default function IntegrationsPage() {
  const [keys, setKeys] = useState<Record<string, string>>({});

  function updateKey(name: string, value: string) {
    setKeys((prev) => ({ ...prev, [name]: value }));
  }

  function handleConnect(int: Integration) {
    const key = keys[int.name]?.trim();
    if (!key) {
      toast(`Paste your ${int.name} API key above to connect.`, "error");
      return;
    }
    toast(`${int.name} connected successfully!`, "success");
  }

  const inputCls =
    "bg-[#1c1917] border border-white/7 rounded px-3 py-2.5 text-[0.86rem] text-white outline-none focus:border-pink/60 transition-colors w-full placeholder:text-white/28 mt-1.5";

  return (
    <div>
      <div className="font-serif text-[1.05rem] font-bold text-white mb-2">
        Integrations
      </div>
      <p className="text-[0.82rem] text-white/28 mb-5">
        Connect your tools to make the hub fully functional. Follow each setup
        guide in order.
      </p>

      {/* Integration cards */}
      <div className="grid grid-cols-3 gap-3.5 mb-5">
        {integrations.map((int) => {
          const st = statusStyles[int.status];
          return (
            <div
              key={int.name}
              className={`bg-[#141210] border rounded-md p-[18px] transition-colors ${
                int.status === "connected"
                  ? "border-green-500/30"
                  : "border-white/7 hover:border-white/13"
              }`}
            >
              <div
                className={`w-[38px] h-[38px] rounded-md flex items-center justify-center mb-3 text-[1.2rem] ${int.iconBg}`}
              >
                {int.icon}
              </div>
              <div className="font-semibold text-[0.88rem] text-white mb-[3px]">
                {int.name}
              </div>
              <div className="text-[0.76rem] text-white/28 leading-[1.52] mb-3">
                {int.desc}
              </div>

              {/* Setup guide */}
              <div className="text-[0.74rem] text-white/55 leading-[1.5] bg-[#1c1917] rounded px-3 py-2.5 border-l-2 border-l-pink mb-3 whitespace-pre-line">
                <strong className="text-white/55">Setup:</strong>{" "}
                {int.setup}
                <input
                  className={inputCls}
                  placeholder={int.placeholder}
                  value={keys[int.name] || ""}
                  onChange={(e) => updateKey(int.name, e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <span
                  className={`text-[0.62rem] font-semibold tracking-[0.08em] uppercase px-[7px] py-[3px] rounded-[3px] ${st.cls}`}
                >
                  {st.label}
                </span>
                <button
                  onClick={() => handleConnect(int)}
                  className="text-[0.72rem] font-medium text-white/28 hover:text-pink transition-colors cursor-pointer bg-transparent border-none"
                >
                  {int.connectLabel}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tech stack map */}
      <div className="bg-[#141210] border border-white/7 rounded-md p-5">
        <div className="flex items-center gap-3 mb-3.5">
          <div className="w-[34px] h-[34px] bg-pink/14 rounded-md flex items-center justify-center text-[0.95rem] shrink-0">
            🗺️
          </div>
          <div>
            <div className="font-semibold text-[0.92rem] text-white">
              How Everything Connects
            </div>
            <div className="text-[0.72rem] text-white/28 mt-0.5">
              The AWAKE tech stack — follow this order
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {techStackSteps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={`w-[9px] h-[9px] rounded-full mt-[3px] shrink-0 ${
                    step.dim
                      ? "bg-[#242119] border-[1.5px] border-white/13"
                      : "bg-pink"
                  }`}
                />
                {i < techStackSteps.length - 1 && (
                  <div className="w-px h-6 bg-white/13 mt-[3px]" />
                )}
              </div>
              <div>
                <div className="text-[0.63rem] tracking-[0.12em] uppercase text-white/28 mb-0.5">
                  {step.trigger}
                </div>
                <div className="text-[0.82rem] text-white/55 leading-[1.52]">
                  {step.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
