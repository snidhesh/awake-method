"use client";

import { useEffect, useState } from "react";
import type { ServiceType } from "@/lib/types";
import { SERVICE_LABELS } from "@/lib/types";
import {
  getSubscribers,
  getCampaigns,
  addCampaign,
  uid,
  formatDate,
  getServiceCounts,
} from "@/lib/store";
import { toast } from "@/components/admin/toast";

/* ------------------------------------------------------------------ */
/*  Segment options                                                    */
/* ------------------------------------------------------------------ */

const SEGMENTS: { value: string; label: string }[] = [
  { value: "all", label: "All Subscribers" },
  { value: "newsletter", label: "Newsletter" },
  { value: "whatsapp", label: "WhatsApp Community" },
  { value: "keynote", label: "Keynote Enquiry" },
  { value: "masterclass", label: "Masterclass Enquiry" },
  { value: "training", label: "Corporate Training" },
  { value: "playbook", label: "Free Playbook" },
];

/* ------------------------------------------------------------------ */
/*  Automated sequences data                                           */
/* ------------------------------------------------------------------ */

interface Sequence {
  name: string;
  description: string;
  status: "live" | "draft";
  enrolledKey: ServiceType | "all";
}

const SEQUENCES: Sequence[] = [
  {
    name: "Welcome — Free Playbook",
    description: "5 emails · Day 0, 1, 3, 7, 14 · On registration",
    status: "live",
    enrolledKey: "playbook",
  },
  {
    name: "Podcast Listener Nurture",
    description: "3 emails · Day 0, 7, 21 · On podcast signup",
    status: "draft",
    enrolledKey: "podcast",
  },
  {
    name: "Keynote Follow-Up",
    description: "3 emails · Day 0, 3, 10 · After enquiry",
    status: "live",
    enrolledKey: "keynote",
  },
];

/* ------------------------------------------------------------------ */
/*  Design-token class constants                                       */
/* ------------------------------------------------------------------ */

const CLS_INPUT =
  "bg-[#1c1917] border border-white/7 rounded px-3 py-2.5 text-[0.86rem] text-white outline-none focus:border-pink/60 w-full";
const CLS_LABEL =
  "text-[0.63rem] tracking-[0.13em] uppercase text-white/28 font-semibold";
const CLS_BTN_PINK =
  "bg-pink border border-pink text-white hover:bg-[#ff4d84] px-3.5 py-1.5 rounded text-[0.77rem] font-medium transition-colors";
const CLS_BTN_DEFAULT =
  "bg-[#1c1917] border border-white/13 text-white/55 px-3.5 py-1.5 rounded text-[0.77rem] font-medium hover:border-pink hover:text-pink transition-colors";

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function EDMCampaignsPage() {
  /* ---- form state ---- */
  const [campaignName, setCampaignName] = useState("");
  const [segment, setSegment] = useState("all");
  const [fromName, setFromName] = useState(
    "Cecilia Reinaldo — AWAKE Method",
  );
  const [subject, setSubject] = useState("");
  const [previewText, setPreviewText] = useState("");
  const [body, setBody] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [replyTo, setReplyTo] = useState("");

  /* ---- data state ---- */
  const [campaigns, setCampaigns] = useState<
    ReturnType<typeof getCampaigns>
  >([]);
  const [counts, setCounts] = useState<Record<ServiceType, number> | null>(
    null,
  );
  const [totalSubscribers, setTotalSubscribers] = useState(0);

  useEffect(() => {
    setCampaigns(getCampaigns());
    setCounts(getServiceCounts());
    setTotalSubscribers(getSubscribers().length);
  }, []);

  /* ---- helpers ---- */
  function recipientCount(): number {
    if (segment === "all") return totalSubscribers;
    return counts?.[segment as ServiceType] ?? 0;
  }

  function enrolledCount(key: ServiceType | "all"): number {
    if (key === "all") return totalSubscribers;
    return counts?.[key] ?? 0;
  }

  function resetForm() {
    setCampaignName("");
    setSegment("all");
    setFromName("Cecilia Reinaldo — AWAKE Method");
    setSubject("");
    setPreviewText("");
    setBody("");
    setScheduledAt("");
    setReplyTo("");
  }

  function handleSchedule() {
    if (!campaignName.trim() || !subject.trim()) {
      toast("Campaign name and subject are required", "error");
      return;
    }

    const campaign = {
      id: uid(),
      name: campaignName.trim(),
      subject: subject.trim(),
      segment:
        segment === "all"
          ? "All Subscribers"
          : SERVICE_LABELS[segment as ServiceType],
      sentAt: scheduledAt
        ? new Date(scheduledAt).toISOString()
        : new Date().toISOString(),
      recipients: recipientCount(),
    };

    addCampaign(campaign);
    setCampaigns(getCampaigns());
    resetForm();
    toast("Campaign scheduled successfully");
  }

  function handleSaveDraft() {
    if (!campaignName.trim()) {
      toast("Campaign name is required", "error");
      return;
    }
    toast("Draft saved", "info");
  }

  function handlePreview() {
    if (!subject.trim() && !body.trim()) {
      toast("Add a subject or body to preview", "error");
      return;
    }
    toast("Preview opened in new tab", "info");
  }

  /* ---- character count ---- */
  const charCount = body.length;

  /* ---------------------------------------------------------------- */
  return (
    <div className="space-y-1">
      {/* Page header */}
      <h1 className="font-serif text-[1.35rem] font-bold text-white mb-5">
        EDM Campaigns
      </h1>

      {/* Two-column grid */}
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "1.4fr 1fr" }}
      >
        {/* ============================================================ */}
        {/*  LEFT — Composer card                                        */}
        {/* ============================================================ */}
        <div className="bg-[#141210] border border-white/7 rounded-md p-[22px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-[1.05rem] font-bold text-white">
              Compose Campaign
            </h2>
            <span className="inline-flex items-center gap-1.5 bg-pink/10 text-pink text-[0.65rem] font-semibold px-2.5 py-[3px] rounded-[3px] tracking-[0.04em]">
              ✉️ Email via Mailchimp / ActiveCampaign
            </span>
          </div>

          <div className="space-y-4">
            {/* Campaign Name */}
            <div>
              <label className={CLS_LABEL}>Campaign Name</label>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="e.g. May Newsletter — CX Insights"
                className={`${CLS_INPUT} mt-1.5`}
              />
            </div>

            {/* Row: Send To + From Name */}
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className={CLS_LABEL}>Send To</label>
                <select
                  value={segment}
                  onChange={(e) => setSegment(e.target.value)}
                  className={`${CLS_INPUT} mt-1.5 appearance-none cursor-pointer`}
                >
                  {SEGMENTS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={CLS_LABEL}>From Name</label>
                <input
                  type="text"
                  value={fromName}
                  onChange={(e) => setFromName(e.target.value)}
                  className={`${CLS_INPUT} mt-1.5`}
                />
              </div>
            </div>

            {/* Row: Subject Line + Preview Text */}
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className={CLS_LABEL}>Subject Line</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Your subject line"
                  className={`${CLS_INPUT} mt-1.5`}
                />
              </div>
              <div>
                <label className={CLS_LABEL}>Preview Text</label>
                <input
                  type="text"
                  value={previewText}
                  onChange={(e) => setPreviewText(e.target.value)}
                  placeholder="Short preview shown in inbox"
                  className={`${CLS_INPUT} mt-1.5`}
                />
              </div>
            </div>

            {/* Email Body */}
            <div>
              <label className={CLS_LABEL}>Email Body</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your email content here..."
                className={`${CLS_INPUT} mt-1.5 resize-y`}
                style={{ minHeight: 180 }}
              />
            </div>

            {/* Row: Schedule Send + Reply-To */}
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className={CLS_LABEL}>Schedule Send</label>
                <input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  className={`${CLS_INPUT} mt-1.5`}
                />
              </div>
              <div>
                <label className={CLS_LABEL}>Reply-To</label>
                <input
                  type="email"
                  value={replyTo}
                  onChange={(e) => setReplyTo(e.target.value)}
                  placeholder="cecilia@awake-method.com"
                  className={`${CLS_INPUT} mt-1.5`}
                />
              </div>
            </div>

            {/* Footer: char count + buttons */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-[0.7rem] text-white/28 font-mono">
                {charCount} characters
              </span>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className={CLS_BTN_DEFAULT}
                >
                  Save Draft
                </button>
                <button
                  type="button"
                  onClick={handlePreview}
                  className={CLS_BTN_DEFAULT}
                >
                  Preview
                </button>
                <button
                  type="button"
                  onClick={handleSchedule}
                  className={CLS_BTN_PINK}
                >
                  Schedule Campaign
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  RIGHT column                                                */}
        {/* ============================================================ */}
        <div className="space-y-4">
          {/* ---- Automated Sequences ---- */}
          <div className="bg-[#141210] border border-white/7 rounded-md p-[22px]">
            <h2 className="font-serif text-[1.05rem] font-bold text-white mb-4">
              Automated Sequences
            </h2>

            <div className="space-y-2.5">
              {SEQUENCES.map((seq) => (
                <div
                  key={seq.name}
                  className="bg-[#0c0b0a] border border-white/7 rounded-md px-[16px] py-3.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[0.86rem] font-medium text-white">
                        {seq.name}
                      </div>
                      <div className="text-[0.72rem] text-white/35 mt-0.5">
                        {seq.description}
                      </div>
                    </div>
                    <span
                      className={`shrink-0 text-[0.62rem] font-semibold uppercase tracking-[0.08em] px-2 py-[2px] rounded-[3px] ${
                        seq.status === "live"
                          ? "bg-green-500/12 text-green-500"
                          : "bg-blue-400/12 text-blue-400"
                      }`}
                    >
                      {seq.status === "live" ? "Live" : "Draft"}
                    </span>
                  </div>
                  {/* Enrolled metric */}
                  <div className="mt-2.5 flex items-baseline gap-1.5">
                    <span className="font-mono text-[0.86rem] font-medium text-white">
                      {enrolledCount(seq.enrolledKey)}
                    </span>
                    <span className="text-[0.62rem] tracking-[0.1em] uppercase text-white/28">
                      enrolled
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---- Divider ---- */}
          <div className="border-t border-white/7" />

          {/* ---- Sent Campaigns ---- */}
          <div className="bg-[#141210] border border-white/7 rounded-md p-[22px]">
            <h2 className="font-serif text-[1.05rem] font-bold text-white mb-4">
              Sent Campaigns
            </h2>

            {campaigns.length === 0 ? (
              <p className="text-[0.8rem] text-white/28 text-center py-6">
                No campaigns sent yet.
              </p>
            ) : (
              <div className="space-y-2.5">
                {campaigns.map((c) => (
                  <div
                    key={c.id}
                    className="bg-[#141210] border border-white/7 rounded-md px-[18px] py-3.5 flex items-center gap-3.5 mb-2.5"
                  >
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="text-[0.86rem] font-medium text-white truncate">
                        {c.name}
                      </div>
                      <div className="text-[0.72rem] text-white/35 mt-0.5 truncate">
                        {c.subject}
                      </div>
                    </div>

                    {/* Segment */}
                    <span className="shrink-0 text-[0.62rem] tracking-[0.08em] uppercase text-white/35 font-medium">
                      {c.segment}
                    </span>

                    {/* Date */}
                    <span className="shrink-0 font-mono text-[0.72rem] text-white/28">
                      {formatDate(c.sentAt)}
                    </span>

                    {/* Recipients */}
                    <div className="shrink-0 text-right">
                      <span className="font-mono text-[0.86rem] font-medium text-white">
                        {c.recipients}
                      </span>
                      <span className="text-[0.62rem] tracking-[0.1em] uppercase text-white/28 ml-1">
                        recipients
                      </span>
                    </div>

                    {/* Sent badge */}
                    <span className="shrink-0 text-[0.62rem] font-semibold uppercase tracking-[0.08em] px-2 py-[2px] rounded-[3px] bg-green-500/12 text-green-500">
                      Sent
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
