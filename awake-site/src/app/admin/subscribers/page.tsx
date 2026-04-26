"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  getSubscribers,
  saveSubscribers,
  deleteSubscriber,
  initials,
  formatDate,
  uid,
} from "@/lib/store";
import type { Subscriber, ServiceType } from "@/lib/types";
import { SERVICES, SERVICE_LABELS, SERVICE_COLORS } from "@/lib/types";
import { toast } from "@/components/admin/toast";

/* ------------------------------------------------------------------ */
/*  Filter pills shown in the filter bar                               */
/* ------------------------------------------------------------------ */
const FILTER_OPTIONS: { label: string; value: ServiceType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Newsletter", value: "newsletter" },
  { label: "WhatsApp", value: "whatsapp" },
  { label: "Keynote", value: "keynote" },
  { label: "Masterclass", value: "masterclass" },
  { label: "Training", value: "training" },
  { label: "Collab", value: "collab" },
];

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */
export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ServiceType | "all">("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [editSub, setEditSub] = useState<Subscriber | null>(null);

  /* Load subscribers from localStorage on mount */
  useEffect(() => {
    setSubscribers(getSubscribers());
  }, []);

  /* ---- Filtering ------------------------------------------------- */
  const filtered = useCallback(() => {
    let list = subscribers;

    // service filter
    if (filter !== "all") {
      list = list.filter((s) => s.services.includes(filter));
    }

    // search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.phone.toLowerCase().includes(q) ||
          s.company.toLowerCase().includes(q)
      );
    }

    return list;
  }, [subscribers, filter, search]);

  const rows = filtered();

  /* ---- Selection helpers ----------------------------------------- */
  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === rows.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(rows.map((r) => r.id)));
    }
  };

  const clearSelection = () => setSelected(new Set());

  /* ---- Bulk delete ----------------------------------------------- */
  const bulkDelete = () => {
    const remaining = subscribers.filter((s) => !selected.has(s.id));
    saveSubscribers(remaining);
    setSubscribers(remaining);
    toast(`Deleted ${selected.size} subscriber(s)`, "success");
    clearSelection();
  };

  /* ---- CSV export ------------------------------------------------ */
  const exportCSV = () => {
    const header = ["Name", "Email", "Phone", "Company", "Services", "Joined"];
    const csvRows = [
      header.join(","),
      ...subscribers.map((s) =>
        [
          `"${s.name}"`,
          `"${s.email}"`,
          `"${s.phone}"`,
          `"${s.company}"`,
          `"${s.services.map((sv) => SERVICE_LABELS[sv]).join("; ")}"`,
          `"${s.joined}"`,
        ].join(",")
      ),
    ];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `awake-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast("CSV exported", "success");
  };

  /* ---- Edit modal save ------------------------------------------- */
  const handleSave = () => {
    if (!editSub) return;
    const idx = subscribers.findIndex((s) => s.id === editSub.id);
    const next = [...subscribers];
    if (idx >= 0) {
      next[idx] = editSub;
    } else {
      next.unshift(editSub);
    }
    saveSubscribers(next);
    setSubscribers(next);
    setEditSub(null);
    toast("Subscriber saved", "success");
  };

  /* ---- Edit modal delete ----------------------------------------- */
  const handleDelete = () => {
    if (!editSub) return;
    deleteSubscriber(editSub.id);
    setSubscribers((prev) => prev.filter((s) => s.id !== editSub.id));
    setEditSub(null);
    toast("Subscriber deleted", "success");
  };

  /* ---- Toggle service in edit modal ------------------------------ */
  const toggleService = (svc: ServiceType) => {
    if (!editSub) return;
    const has = editSub.services.includes(svc);
    setEditSub({
      ...editSub,
      services: has
        ? editSub.services.filter((s) => s !== svc)
        : [...editSub.services, svc],
    });
  };

  /* ================================================================ */
  /*  RENDER                                                           */
  /* ================================================================ */
  return (
    <>
      {/* ---- Header row ------------------------------------------- */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-serif text-[1.05rem] font-bold tracking-wide">
          All Subscribers
        </h1>
        <div className="flex items-center gap-2.5">
          <button
            onClick={exportCSV}
            className="bg-[#1c1917] border border-white/13 text-white/55 px-3.5 py-1.5 rounded text-[0.77rem] font-medium hover:border-pink hover:text-pink transition-colors"
          >
            Export CSV
          </button>
          <Link
            href="/admin/subscribers/add"
            className="bg-pink border border-pink text-white px-3.5 py-1.5 rounded text-[0.77rem] font-medium hover:bg-[#ff4d84] transition-colors"
          >
            + Add Subscriber
          </Link>
        </div>
      </div>

      {/* ---- Filter bar ------------------------------------------- */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Search name, email, phone, company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#1c1917] border border-white/7 rounded px-3 py-1.5 text-[0.82rem] text-white placeholder:text-white/28 focus:border-pink outline-none transition-colors w-[260px]"
        />
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`px-3.5 py-[5px] rounded-full text-[0.73rem] font-medium border transition-colors ${
              filter === opt.value
                ? "bg-pink border-pink text-white"
                : "border-white/7 text-white/55 hover:border-white/13 hover:text-white/70"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* ---- Bulk action bar -------------------------------------- */}
      {selected.size > 0 && (
        <div className="bg-pink/14 border border-pink/25 rounded-md px-4 py-2.5 mb-4 flex items-center gap-3 text-[0.8rem]">
          <span className="text-white/70 font-medium">
            {selected.size} selected
          </span>
          <Link
            href="/admin/whatsapp"
            className="bg-[#1c1917] border border-white/13 text-white/55 px-3.5 py-1.5 rounded text-[0.77rem] font-medium hover:border-pink hover:text-pink transition-colors"
          >
            WhatsApp Selected
          </Link>
          <button
            onClick={() => {
              toast(`Email action for ${selected.size} subscriber(s)`, "info");
            }}
            className="bg-[#1c1917] border border-white/13 text-white/55 px-3.5 py-1.5 rounded text-[0.77rem] font-medium hover:border-pink hover:text-pink transition-colors"
          >
            Email Selected
          </button>
          <button
            onClick={bulkDelete}
            className="bg-[#1c1917] border border-red-500/30 text-red-400 px-3.5 py-1.5 rounded text-[0.77rem] font-medium hover:border-red-500 hover:text-red-300 transition-colors"
          >
            Delete
          </button>
          <button
            onClick={clearSelection}
            className="text-white/40 hover:text-white/60 px-2 py-1 text-[0.77rem] transition-colors"
          >
            Clear
          </button>
        </div>
      )}

      {/* ---- Table card ------------------------------------------- */}
      <div className="bg-[#141210] border border-white/7 rounded-lg overflow-hidden">
        {/* Table header */}
        <div
          className="grid items-center gap-3 px-4 py-3 border-b border-white/7"
          style={{
            gridTemplateColumns: "20px 1fr 130px 160px 110px 90px 80px",
          }}
        >
          <input
            type="checkbox"
            checked={rows.length > 0 && selected.size === rows.length}
            onChange={toggleAll}
            className="cursor-pointer"
            style={{ accentColor: "#e8185c" }}
          />
          <span className="text-[0.63rem] tracking-[0.13em] uppercase text-white/28 font-medium">
            Subscriber
          </span>
          <span className="text-[0.63rem] tracking-[0.13em] uppercase text-white/28 font-medium">
            Phone
          </span>
          <span className="text-[0.63rem] tracking-[0.13em] uppercase text-white/28 font-medium">
            Services
          </span>
          <span className="text-[0.63rem] tracking-[0.13em] uppercase text-white/28 font-medium">
            Joined
          </span>
          <span className="text-[0.63rem] tracking-[0.13em] uppercase text-white/28 font-medium">
            Status
          </span>
          <span className="text-[0.63rem] tracking-[0.13em] uppercase text-white/28 font-medium">
            Actions
          </span>
        </div>

        {/* Table rows */}
        {rows.map((sub) => (
          <div
            key={sub.id}
            onClick={() => setEditSub({ ...sub })}
            className="group grid items-center gap-3 px-4 py-3 border-b border-white/7 hover:bg-[#1c1917] hover:border-white/13 cursor-pointer transition-colors"
            style={{
              gridTemplateColumns: "20px 1fr 130px 160px 110px 90px 80px",
            }}
          >
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={selected.has(sub.id)}
              onChange={(e) => {
                e.stopPropagation();
                toggleOne(sub.id);
              }}
              onClick={(e) => e.stopPropagation()}
              className="cursor-pointer"
              style={{ accentColor: "#e8185c" }}
            />

            {/* Subscriber info */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-pink/10 text-pink flex items-center justify-center text-[0.68rem] font-semibold shrink-0">
                {initials(sub.name)}
              </div>
              <div className="min-w-0">
                <div className="text-[0.84rem] font-medium text-white truncate">
                  {sub.name}
                </div>
                <div className="text-[0.72rem] text-white/35 truncate">
                  {sub.email}
                  {sub.company && (
                    <span className="text-white/20"> &middot; {sub.company}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Phone */}
            <span className="text-[0.78rem] text-white/45 truncate">
              {sub.phone || "\u2014"}
            </span>

            {/* Services */}
            <div className="flex flex-wrap gap-1">
              {sub.services.slice(0, 2).map((svc) => (
                <span
                  key={svc}
                  className={`text-[0.62rem] px-2 py-0.5 rounded-full font-medium ${SERVICE_COLORS[svc]}`}
                >
                  {SERVICE_LABELS[svc].split(" ")[0]}
                </span>
              ))}
              {sub.services.length > 2 && (
                <span className="text-[0.62rem] px-2 py-0.5 rounded-full font-medium bg-white/5 text-white/30">
                  +{sub.services.length - 2}
                </span>
              )}
            </div>

            {/* Joined */}
            <span className="text-[0.78rem] text-white/40">
              {formatDate(sub.joined)}
            </span>

            {/* Status */}
            <span className="flex items-center gap-1.5 text-[0.73rem] text-green-500/80">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-dot" />
              Active
            </span>

            {/* Actions (visible on hover) */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditSub({ ...sub });
                }}
                className="text-[0.72rem] text-white/40 hover:text-pink transition-colors"
              >
                Edit
              </button>
              <Link
                href="/admin/whatsapp"
                onClick={(e) => e.stopPropagation()}
                className="text-[0.72rem] text-white/40 hover:text-green-500 transition-colors"
              >
                WA
              </Link>
            </div>
          </div>
        ))}

        {/* Empty state */}
        {rows.length === 0 && (
          <div className="px-4 py-12 text-center text-white/25 text-[0.84rem]">
            No subscribers found.
          </div>
        )}
      </div>

      {/* ---- Subscriber count ------------------------------------- */}
      <div className="mt-3 text-[0.72rem] text-white/28">
        {rows.length} subscriber{rows.length !== 1 ? "s" : ""}
        {filter !== "all" && ` in ${filter}`}
        {search.trim() && ` matching "${search}"`}
      </div>

      {/* ---- Edit modal ------------------------------------------- */}
      {editSub && (
        <div
          className="fixed inset-0 bg-black/65 z-[200] flex items-center justify-center"
          onClick={() => setEditSub(null)}
        >
          <div
            className="bg-[#141210] border border-white/13 rounded-lg p-6 w-[90%] max-w-[520px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-serif text-[1rem] font-bold mb-5">
              Edit Subscriber
            </h2>

            {/* Name */}
            <label className="block mb-3">
              <span className="text-[0.7rem] text-white/40 uppercase tracking-wide block mb-1">
                Name
              </span>
              <input
                type="text"
                value={editSub.name}
                onChange={(e) =>
                  setEditSub({ ...editSub, name: e.target.value })
                }
                className="bg-[#1c1917] border border-white/7 rounded px-3 py-2.5 text-[0.86rem] text-white outline-none focus:border-pink/60 w-full transition-colors"
              />
            </label>

            {/* Email */}
            <label className="block mb-3">
              <span className="text-[0.7rem] text-white/40 uppercase tracking-wide block mb-1">
                Email
              </span>
              <input
                type="email"
                value={editSub.email}
                onChange={(e) =>
                  setEditSub({ ...editSub, email: e.target.value })
                }
                className="bg-[#1c1917] border border-white/7 rounded px-3 py-2.5 text-[0.86rem] text-white outline-none focus:border-pink/60 w-full transition-colors"
              />
            </label>

            {/* Phone */}
            <label className="block mb-3">
              <span className="text-[0.7rem] text-white/40 uppercase tracking-wide block mb-1">
                Phone
              </span>
              <input
                type="text"
                value={editSub.phone}
                onChange={(e) =>
                  setEditSub({ ...editSub, phone: e.target.value })
                }
                className="bg-[#1c1917] border border-white/7 rounded px-3 py-2.5 text-[0.86rem] text-white outline-none focus:border-pink/60 w-full transition-colors"
              />
            </label>

            {/* Company */}
            <label className="block mb-4">
              <span className="text-[0.7rem] text-white/40 uppercase tracking-wide block mb-1">
                Company
              </span>
              <input
                type="text"
                value={editSub.company}
                onChange={(e) =>
                  setEditSub({ ...editSub, company: e.target.value })
                }
                className="bg-[#1c1917] border border-white/7 rounded px-3 py-2.5 text-[0.86rem] text-white outline-none focus:border-pink/60 w-full transition-colors"
              />
            </label>

            {/* Services */}
            <div className="mb-4">
              <span className="text-[0.7rem] text-white/40 uppercase tracking-wide block mb-2">
                Services
              </span>
              <div className="grid grid-cols-2 gap-2">
                {SERVICES.map((svc) => (
                  <label
                    key={svc}
                    className="flex items-center gap-2 text-[0.8rem] text-white/60 cursor-pointer hover:text-white/80 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={editSub.services.includes(svc)}
                      onChange={() => toggleService(svc)}
                      style={{ accentColor: "#e8185c" }}
                    />
                    {SERVICE_LABELS[svc]}
                  </label>
                ))}
              </div>
            </div>

            {/* Notes */}
            <label className="block mb-5">
              <span className="text-[0.7rem] text-white/40 uppercase tracking-wide block mb-1">
                Notes
              </span>
              <textarea
                rows={3}
                value={editSub.notes}
                onChange={(e) =>
                  setEditSub({ ...editSub, notes: e.target.value })
                }
                className="bg-[#1c1917] border border-white/7 rounded px-3 py-2.5 text-[0.86rem] text-white outline-none focus:border-pink/60 w-full resize-none transition-colors"
              />
            </label>

            {/* Modal actions */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleSave}
                className="bg-pink border border-pink text-white px-3.5 py-1.5 rounded text-[0.77rem] font-medium hover:bg-[#ff4d84] transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500/10 border border-red-500/30 text-red-400 px-3.5 py-1.5 rounded text-[0.77rem] font-medium hover:border-red-500 hover:text-red-300 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setEditSub(null)}
                className="bg-[#1c1917] border border-white/13 text-white/55 px-3.5 py-1.5 rounded text-[0.77rem] font-medium hover:border-white/25 hover:text-white/70 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
