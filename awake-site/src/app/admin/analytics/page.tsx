"use client";

import { useEffect, useState } from "react";
import { getSubscribers, getServiceCounts, formatDate } from "@/lib/store";
import { Subscriber, ServiceType, SERVICES, SERVICE_LABELS } from "@/lib/types";
import { toast } from "@/components/admin/toast";

export default function AnalyticsPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [counts, setCounts] = useState<Record<ServiceType, number>>(
    {} as Record<ServiceType, number>
  );

  useEffect(() => {
    const subs = getSubscribers();
    setSubscribers(subs);
    setCounts(getServiceCounts());
  }, []);

  const total = subscribers.length;
  const thisMonth = subscribers.filter(
    (s) => new Date(s.joined).getMonth() === new Date().getMonth()
  ).length;
  const wa = subscribers.filter((s) =>
    s.services.includes("whatsapp")
  ).length;
  const enquiries = subscribers.filter((s) =>
    s.services.some((sv) =>
      (["keynote", "masterclass", "training", "collab"] as ServiceType[]).includes(sv)
    )
  ).length;

  const maxCount = Math.max(...Object.values(counts), 1);

  // Growth last 7 days
  const days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = formatDate(d.toISOString());
    return {
      label: d.toLocaleDateString("en-GB", { weekday: "short" }),
      count: subscribers.filter(
        (s) => formatDate(s.joined) === dateStr
      ).length,
    };
  }).reverse();
  const maxGrowth = Math.max(...days.map((d) => d.count), 1);

  const stats = [
    { label: "Total Subscribers", value: total, pink: true },
    { label: "This Month", value: thisMonth, sub: "New subscribers" },
    { label: "WA Community", value: wa },
    { label: "Open Enquiries", value: enquiries },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="font-serif text-[1.05rem] font-bold text-white">
          Analytics
        </div>
        <button
          onClick={() =>
            toast(
              "Export feature — connect your EDM platform in Integrations.",
              "info"
            )
          }
          className="bg-[#1c1917] border border-white/13 text-white/55 px-3.5 py-1.5 rounded text-[0.77rem] font-medium hover:border-pink hover:text-pink transition-colors cursor-pointer"
        >
          Export Report
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#141210] border border-white/7 rounded-md p-4"
          >
            <div className="text-[0.65rem] tracking-[0.15em] uppercase text-white/28 mb-1.5">
              {stat.label}
            </div>
            <div
              className={`font-serif text-[1.9rem] font-black leading-none ${
                stat.pink ? "text-pink" : "text-white"
              }`}
            >
              {stat.value}
            </div>
            {stat.sub && (
              <div className="text-[0.72rem] text-green-500 mt-0.5">
                {stat.sub}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-3.5 mb-4">
        {/* By service */}
        <div className="bg-[#141210] border border-white/7 rounded-md p-[18px]">
          <div className="text-[0.63rem] tracking-[0.13em] uppercase text-white/28 mb-3">
            Subscribers by Service
          </div>
          {total === 0 ? (
            <div className="text-center py-9 text-white/28 text-[0.88rem]">
              No data yet
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {SERVICES.map((s) => (
                <div key={s} className="flex items-center gap-2.5">
                  <div className="text-[0.7rem] text-white/55 w-[70px] shrink-0">
                    {SERVICE_LABELS[s]
                      .replace(" Enquiry", "")
                      .replace(" Community", "")}
                  </div>
                  <div className="flex-1 bg-[#242119] rounded-[2px] h-[7px] overflow-hidden">
                    <div
                      className="h-full rounded-[2px] bg-pink"
                      style={{
                        width: `${Math.round(
                          ((counts[s] || 0) / maxCount) * 100
                        )}%`,
                      }}
                    />
                  </div>
                  <div className="font-mono text-[0.7rem] text-white/28 w-7 text-right shrink-0">
                    {counts[s] || 0}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Growth this week */}
        <div className="bg-[#141210] border border-white/7 rounded-md p-[18px]">
          <div className="text-[0.63rem] tracking-[0.13em] uppercase text-white/28 mb-3">
            Growth This Week
          </div>
          {total === 0 ? (
            <div className="text-center py-9 text-white/28 text-[0.88rem]">
              No data yet
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {days.map((d) => (
                <div key={d.label} className="flex items-center gap-2.5">
                  <div className="text-[0.75rem] text-white/55 w-[70px] shrink-0">
                    {d.label}
                  </div>
                  <div className="flex-1 bg-[#242119] rounded-[2px] h-[7px] overflow-hidden">
                    <div
                      className="h-full rounded-[2px] bg-green-500"
                      style={{
                        width: `${Math.round(
                          (d.count / maxGrowth) * 100
                        )}%`,
                      }}
                    />
                  </div>
                  <div className="font-mono text-[0.7rem] text-white/28 w-7 text-right shrink-0">
                    {d.count}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
