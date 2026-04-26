"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Subscriber, ServiceType } from "@/lib/types";
import { SERVICE_LABELS, SERVICE_COLORS } from "@/lib/types";
import {
  getSubscribers,
  getServiceCounts,
  initials,
  formatDate,
} from "@/lib/store";

/* ------------------------------------------------------------------ */
/*  Quick-action definitions                                          */
/* ------------------------------------------------------------------ */

const quickActions = [
  {
    href: "/admin/whatsapp",
    title: "WhatsApp",
    description: "Send messages to your WhatsApp community",
    icon: (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-[18px] h-[18px]"
      >
        <path d="M14 8A6 6 0 1 1 2.3 11.3L1 15l3.7-1.3A6 6 0 0 1 14 8z" />
      </svg>
    ),
  },
  {
    href: "/admin/edm",
    title: "EDM Campaigns",
    description: "Create and manage email campaigns",
    icon: (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-[18px] h-[18px]"
      >
        <rect x="1" y="3" width="14" height="10" rx="1" />
        <path d="M1 3l7 6 7-6" />
      </svg>
    ),
  },
  {
    href: "/admin/manychat",
    title: "ManyChat Flows",
    description: "Manage automated chat flows",
    icon: (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-[18px] h-[18px]"
      >
        <path d="M1 4l6 5 6-5" />
        <rect x="1" y="3" width="14" height="10" rx="1" />
      </svg>
    ),
  },
  {
    href: "/admin/subscribers/add",
    title: "Add Subscriber",
    description: "Manually add a new subscriber",
    icon: (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-[18px] h-[18px]"
      >
        <circle cx="8" cy="6" r="3" />
        <path d="M2 14c0-3 2.7-5 6-5s6 2 6 5" />
        <path d="M12 3v4M10 5h4" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Page component                                                    */
/* ------------------------------------------------------------------ */

export default function AdminDashboard() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [counts, setCounts] = useState<Record<ServiceType, number> | null>(
    null,
  );

  useEffect(() => {
    const subs = getSubscribers();
    setSubscribers(subs);
    setCounts(getServiceCounts());
  }, []);

  /* Derived ------------------------------------------------------- */
  const totalSubscribers = subscribers.length;
  const newsletterOnly = subscribers.filter(
    (s) => s.services.length === 1 && s.services[0] === "newsletter",
  ).length;
  const whatsappCount = counts?.whatsapp ?? 0;
  const keynoteCount = counts?.keynote ?? 0;
  const masterclassCount = counts?.masterclass ?? 0;

  const recentSubscribers = [...subscribers]
    .sort((a, b) => new Date(b.joined).getTime() - new Date(a.joined).getTime())
    .slice(0, 6);

  /* Stats config -------------------------------------------------- */
  const stats = [
    { label: "Total Subscribers", value: totalSubscribers, pink: true },
    { label: "Newsletter Only", value: newsletterOnly, pink: false },
    { label: "WhatsApp Community", value: whatsappCount, pink: false },
    { label: "Keynote Enquiries", value: keynoteCount, pink: false },
    { label: "Masterclass Enquiries", value: masterclassCount, pink: false },
  ];

  /* --------------------------------------------------------------- */
  return (
    <div className="space-y-6">
      {/* ---- Stat cards row ---- */}
      <div className="grid grid-cols-5 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-[#141210] border border-white/7 rounded-lg px-5 py-4"
          >
            <div className="text-[0.65rem] tracking-[0.15em] uppercase text-white/28">
              {s.label}
            </div>
            <div
              className={`font-serif text-[1.9rem] font-black mt-1 ${
                s.pink ? "text-pink" : "text-white"
              }`}
            >
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* ---- Two-column layout ---- */}
      <div className="grid gap-6" style={{ gridTemplateColumns: "1.4fr 1fr" }}>
        {/* ---- Recent Subscribers ---- */}
        <div className="bg-[#141210] border border-white/7 rounded-lg">
          <div className="px-5 pt-5 pb-3">
            <h2 className="font-serif text-[1.05rem] font-bold text-white">
              Recent Subscribers
            </h2>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-t border-white/7">
                <th className="text-left text-[0.63rem] tracking-[0.13em] uppercase text-white/28 px-5 py-2.5 font-medium">
                  Name
                </th>
                <th className="text-left text-[0.63rem] tracking-[0.13em] uppercase text-white/28 px-5 py-2.5 font-medium">
                  Services
                </th>
                <th className="text-left text-[0.63rem] tracking-[0.13em] uppercase text-white/28 px-5 py-2.5 font-medium">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody>
              {recentSubscribers.map((sub) => (
                <tr
                  key={sub.id}
                  className="border-t border-white/7 hover:bg-white/[0.02] transition-colors"
                >
                  {/* Name + avatar */}
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-[30px] h-[30px] rounded-full bg-pink/14 text-pink font-mono text-[0.68rem] font-semibold flex items-center justify-center shrink-0">
                        {initials(sub.name)}
                      </div>
                      <div>
                        <div className="text-[0.86rem] font-medium text-white">
                          {sub.name}
                        </div>
                        <div className="text-[0.7rem] text-white/28">
                          {sub.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Service badges */}
                  <td className="px-5 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      {sub.services.map((service) => (
                        <span
                          key={service}
                          className={`text-[0.65rem] font-semibold px-[7px] py-[2px] rounded-[3px] uppercase tracking-[0.05em] ${SERVICE_COLORS[service]}`}
                        >
                          {SERVICE_LABELS[service]}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-5 py-3">
                    <span className="font-mono text-[0.75rem] text-white/28">
                      {formatDate(sub.joined)}
                    </span>
                  </td>
                </tr>
              ))}

              {recentSubscribers.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-5 py-8 text-center text-[0.8rem] text-white/28"
                  >
                    No subscribers yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ---- Quick Actions ---- */}
        <div className="bg-[#141210] border border-white/7 rounded-lg">
          <div className="px-5 pt-5 pb-3">
            <h2 className="font-serif text-[1.05rem] font-bold text-white">
              Quick Actions
            </h2>
          </div>

          <div className="px-5 pb-5 grid grid-cols-1 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-4 bg-white/[0.02] border border-white/7 rounded-lg px-4 py-3.5 hover:bg-white/[0.05] hover:border-white/10 transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-pink/10 text-pink flex items-center justify-center shrink-0 group-hover:bg-pink/14 transition-colors">
                  {action.icon}
                </div>
                <div>
                  <div className="text-[0.86rem] font-medium text-white">
                    {action.title}
                  </div>
                  <div className="text-[0.7rem] text-white/28">
                    {action.description}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
