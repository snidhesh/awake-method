"use client";

import { useEffect, useState } from "react";
import {
  getSubscribers,
  getWAHistory,
  addWAMessage,
  uid,
  formatDate,
} from "@/lib/store";
import { SERVICE_LABELS } from "@/lib/types";
import { toast } from "@/components/admin/toast";
import type { WAMessage } from "@/lib/types";

/* ------------------------------------------------------------------ */
/*  Template data                                                      */
/* ------------------------------------------------------------------ */

const TEMPLATES: Record<
  string,
  { name: string; description: string; body: string }
> = {
  monday: {
    name: "Weekly Monday Message",
    description: "Motivational start-of-week message to the community",
    body: "Good morning, AWAKE community \u2600\uFE0F\n\nThis week\u2019s challenge: before every client call, pause for 10 seconds and set one intention for how you want to make them feel.\n\nThat\u2019s it. Let me know how it goes \uD83D\uDC9B\n\n\u2014 Cecilia",
  },
  podcast: {
    name: "New Podcast Episode",
    description: "Announce a new episode of The Real Estate Majlis",
    body: "New episode of The Real Estate Majlis is live \uD83C\uDF99\uFE0F\n\nThis week: [TOPIC]\n\n\u2192 Spotify: [LINK]\n\u2192 Apple: [LINK]\n\nIf it resonates, a review means the world \uD83C\uDF1F\n\n\u2014 Cecilia",
  },
  event: {
    name: "Event Announcement",
    description: "Notify subscribers about an upcoming speaking event",
    body: "Hey [Name] \uD83D\uDC4B\n\nExciting news \u2014 I\u2019m speaking at [EVENT] on [DATE].\n\nIf you\u2019re in [CITY], I\u2019d love to see you there. Tickets: [LINK]\n\n\u2014 Cecilia",
  },
  followup: {
    name: "Enquiry Follow-Up",
    description: "Follow up on a service enquiry from a subscriber",
    body: "Hi [Name] \uD83D\uDC4B\n\nJust following up on your enquiry about [SERVICE]. I\u2019d love to chat more about how we can work together.\n\nWhen\u2019s a good time for a quick call?\n\n\u2014 Cecilia, AWAKE Method",
  },
  playbook: {
    name: "Playbook Reminder",
    description: "Check in with playbook downloaders",
    body: "Hey [Name] \uD83D\uDC4B\n\nHave you had a chance to go through the AWAKE Method playbook?\n\nWhich of the 10 CX foundations hit home for you? I read every reply \uD83D\uDC9B\n\n\u2014 Cecilia",
  },
};

const SEGMENTS = [
  { value: "all", label: "All subscribers" },
  { value: "newsletter", label: "Newsletter" },
  { value: "whatsapp", label: "WhatsApp Community" },
  { value: "keynote", label: "Keynote enquiries" },
  { value: "masterclass", label: "Masterclass enquiries" },
  { value: "training", label: "Corporate training" },
  { value: "collab", label: "Brand collab" },
  { value: "podcast", label: "Podcast listeners" },
  { value: "playbook", label: "Free playbook downloads" },
];

const TEMPLATE_OPTIONS = [
  { value: "", label: "Select template..." },
  { value: "monday", label: "Weekly Monday" },
  { value: "podcast", label: "New Podcast Episode" },
  { value: "event", label: "Event Announcement" },
  { value: "followup", label: "Enquiry Follow-Up" },
  { value: "playbook", label: "Playbook Reminder" },
];

/* ------------------------------------------------------------------ */
/*  Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-3.5 h-3.5"
    >
      <circle cx="8" cy="8" r="6" />
      <path d="M8 4.5V8l2.5 1.5" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-3.5 h-3.5"
    >
      <path d="M14 2L7 9" />
      <path d="M14 2l-4.5 12-2.5-5.5L2 6z" />
    </svg>
  );
}

function TemplateIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-3.5 h-3.5"
    >
      <rect x="2" y="2" width="12" height="12" rx="1.5" />
      <path d="M5 5h6M5 8h4M5 11h5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-3 h-3"
    >
      <path d="M3 8.5l3 3 7-7" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Input / Label class constants                                      */
/* ------------------------------------------------------------------ */

const inputClass =
  "bg-[#1c1917] border border-white/7 rounded px-3 py-2.5 text-[0.86rem] text-white outline-none focus:border-pink/60 w-full";
const labelClass =
  "text-[0.63rem] tracking-[0.13em] uppercase text-white/28 font-semibold";

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function WhatsAppAdmin() {
  /* State: Composer */
  const [segment, setSegment] = useState("all");
  const [body, setBody] = useState("");
  const [schedule, setSchedule] = useState("");
  const [templateKey, setTemplateKey] = useState("");

  /* State: History */
  const [history, setHistory] = useState<WAMessage[]>([]);

  /* Load history on mount */
  useEffect(() => {
    setHistory(getWAHistory());
  }, []);

  /* Template selection */
  function handleTemplateSelect(key: string) {
    setTemplateKey(key);
    if (key && TEMPLATES[key]) {
      setBody(TEMPLATES[key].body);
    }
  }

  /* Use template from sidebar */
  function handleUseTemplate(key: string) {
    setTemplateKey(key);
    setBody(TEMPLATES[key].body);
    toast("Template loaded", "info");
  }

  /* Send message */
  function handleSend() {
    if (!body.trim()) {
      toast("Message body cannot be empty", "error");
      return;
    }

    const isScheduled = !!schedule;
    const sentAt = isScheduled
      ? new Date(schedule).toISOString()
      : new Date().toISOString();

    const segmentLabel =
      SEGMENTS.find((s) => s.value === segment)?.label ?? segment;

    const msg: WAMessage = {
      id: uid(),
      body: body.trim(),
      segment: segmentLabel,
      sentAt,
      scheduled: isScheduled,
    };

    addWAMessage(msg);
    setHistory(getWAHistory());

    /* Reset composer */
    setBody("");
    setSchedule("");
    setTemplateKey("");

    toast(
      isScheduled ? "Message scheduled successfully" : "Message sent successfully",
      "success",
    );
  }

  /* Save draft */
  function handleSaveDraft() {
    if (!body.trim()) {
      toast("Nothing to save", "error");
      return;
    }
    toast("Draft saved", "info");
  }

  /* Preview text */
  const previewText = body.trim() || "Your message preview will appear here...";

  /* --------------------------------------------------------------- */
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="font-serif text-[1.5rem] font-bold text-white">
          WhatsApp Messaging
        </h1>
        <p className="text-[0.82rem] text-white/40 mt-1">
          Compose and send messages to your WhatsApp community segments.
        </p>
      </div>

      {/* Two-column grid */}
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "1.2fr 1fr" }}
      >
        {/* ============================================================ */}
        {/*  LEFT COLUMN - Composer                                       */}
        {/* ============================================================ */}
        <div className="bg-[#141210] border border-white/7 rounded-md p-[22px] space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-[1.05rem] font-bold text-white">
              Compose Message
            </h2>
            <div className="flex items-center gap-1.5 text-[#25D366]">
              <WhatsAppIcon className="w-4 h-4" />
              <span className="text-[0.75rem] font-semibold">WhatsApp</span>
            </div>
          </div>

          {/* Send To */}
          <div className="space-y-1.5">
            <label className={labelClass}>Send To</label>
            <select
              value={segment}
              onChange={(e) => setSegment(e.target.value)}
              className={inputClass}
            >
              {SEGMENTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label className={labelClass}>Message</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Type your message..."
              className={`${inputClass} resize-y`}
              style={{ minHeight: "130px" }}
            />
          </div>

          {/* Live Preview */}
          <div className="space-y-1.5">
            <label className={labelClass}>Live Preview</label>
            <div className="bg-[#25D366]/8 border border-[#25D366]/20 rounded px-3.5 py-3 text-[0.85rem] text-white/70 italic min-h-[60px] whitespace-pre-wrap">
              {previewText}
            </div>
          </div>

          {/* Schedule + Template row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className={labelClass}>Schedule</label>
              <input
                type="datetime-local"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="space-y-1.5">
              <label className={labelClass}>Template</label>
              <select
                value={templateKey}
                onChange={(e) => handleTemplateSelect(e.target.value)}
                className={inputClass}
              >
                {TEMPLATE_OPTIONS.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Footer: char count + buttons */}
          <div className="flex items-center justify-between pt-1">
            <span className="font-mono text-[0.7rem] text-white/28">
              {body.length} characters
            </span>
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleSaveDraft}
                className="border border-white/7 rounded px-4 py-2 text-[0.82rem] text-white/60 hover:bg-white/[0.04] hover:border-white/13 transition-colors"
              >
                Save Draft
              </button>
              <button
                onClick={handleSend}
                className="flex items-center gap-2 bg-[#25D366] border border-[#25D366] text-white rounded px-4 py-2 text-[0.82rem] font-semibold hover:opacity-88 transition-opacity"
              >
                <SendIcon />
                Send Message
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  RIGHT COLUMN - History + Templates                           */}
        {/* ============================================================ */}
        <div className="space-y-4">
          {/* ---- Message History ---- */}
          <div className="bg-[#141210] border border-white/7 rounded-md p-[22px] space-y-4">
            <h2 className="font-serif text-[1.05rem] font-bold text-white">
              Message History
            </h2>

            {history.length === 0 && (
              <p className="text-[0.82rem] text-white/28 py-4 text-center">
                No messages sent yet.
              </p>
            )}

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {history.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-[#141210] border border-white/7 rounded-md px-4 py-3.5 flex items-center gap-3.5 hover:border-white/13 transition-colors"
                >
                  {/* Status icon */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.scheduled
                        ? "bg-amber-500/10 text-amber-500"
                        : "bg-[#25D366]/10 text-[#25D366]"
                    }`}
                  >
                    {msg.scheduled ? <ClockIcon /> : <CheckIcon />}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[0.6rem] font-semibold uppercase tracking-[0.08em] px-1.5 py-[1px] rounded ${
                          msg.scheduled
                            ? "bg-amber-500/10 text-amber-500"
                            : "bg-[#25D366]/10 text-[#25D366]"
                        }`}
                      >
                        {msg.scheduled ? "Scheduled" : "Sent"}
                      </span>
                      <span className="text-[0.68rem] text-white/28">
                        {msg.segment}
                      </span>
                      <span className="text-[0.68rem] text-white/20 ml-auto">
                        {formatDate(msg.sentAt)}
                      </span>
                    </div>
                    <p className="text-[0.8rem] text-white/50 mt-1 truncate">
                      {msg.body.length > 120
                        ? msg.body.slice(0, 120) + "..."
                        : msg.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---- Divider ---- */}
          <div className="border-t border-white/7" />

          {/* ---- Templates ---- */}
          <div className="bg-[#141210] border border-white/7 rounded-md p-[22px] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-[1.05rem] font-bold text-white">
                Templates
              </h2>
              <button className="flex items-center gap-1.5 text-[0.72rem] font-semibold text-[#25D366] hover:opacity-80 transition-opacity">
                <span className="text-sm leading-none">+</span> New
              </button>
            </div>

            <div className="space-y-2.5">
              {(["monday", "podcast", "event", "followup"] as const).map(
                (key) => {
                  const t = TEMPLATES[key];
                  return (
                    <div
                      key={key}
                      className="bg-[#141210] border border-white/7 rounded-md px-4 py-3.5 flex items-center gap-3.5 hover:border-white/13 transition-colors"
                    >
                      {/* Icon */}
                      <div className="w-8 h-8 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
                        <TemplateIcon />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="text-[0.84rem] font-medium text-white">
                          {t.name}
                        </div>
                        <div className="text-[0.72rem] text-white/28 mt-0.5">
                          {t.description}
                        </div>
                      </div>

                      {/* Use button */}
                      <button
                        onClick={() => handleUseTemplate(key)}
                        className="text-[0.72rem] font-semibold text-[#25D366] border border-[#25D366]/20 rounded px-2.5 py-1 hover:bg-[#25D366]/10 transition-colors shrink-0"
                      >
                        Use
                      </button>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
