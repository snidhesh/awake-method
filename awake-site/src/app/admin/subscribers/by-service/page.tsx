"use client";

import { useEffect, useState } from "react";
import {
  getSubscribers,
  initials,
  formatDate,
} from "@/lib/store";
import {
  Subscriber,
  ServiceType,
  SERVICES,
  SERVICE_LABELS,
  SERVICE_COLORS,
} from "@/lib/types";
import Link from "next/link";

export default function ByServicePage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [activeService, setActiveService] = useState<ServiceType | null>(null);

  useEffect(() => {
    setSubscribers(getSubscribers());
  }, []);

  const counts: Record<ServiceType, Subscriber[]> = {} as Record<ServiceType, Subscriber[]>;
  SERVICES.forEach((s) => (counts[s] = []));
  subscribers.forEach((sub) =>
    sub.services.forEach((sv) => {
      if (counts[sv]) counts[sv].push(sub);
    })
  );

  const detail = activeService ? counts[activeService] : [];

  return (
    <div>
      <div className="font-serif text-[1.05rem] font-bold text-white mb-4">
        Subscribers by Service
      </div>

      {/* Service overview grid */}
      <div className="grid grid-cols-3 gap-3.5 mb-6">
        {SERVICES.map((sv) => (
          <button
            key={sv}
            onClick={() => setActiveService(sv)}
            className={`bg-[#141210] border rounded-md p-4 text-left transition-colors cursor-pointer ${
              activeService === sv
                ? "border-pink/40"
                : "border-white/7 hover:border-pink/40"
            }`}
          >
            <div className="text-[0.62rem] tracking-[0.15em] uppercase text-white/28 mb-2">
              {SERVICE_LABELS[sv]}
            </div>
            <div className="font-serif text-[2rem] font-black text-pink mb-1">
              {counts[sv].length}
            </div>
            <div className="text-[0.72rem] text-white/28">subscribers</div>
          </button>
        ))}
      </div>

      {/* Detail table */}
      {activeService && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="font-serif text-[1.05rem] font-bold text-white">
              {SERVICE_LABELS[activeService]} — {detail.length} subscribers
            </div>
            <div className="flex gap-2">
              <Link
                href="/admin/whatsapp"
                className="bg-[#25D366] border border-[#25D366] text-white px-3.5 py-1.5 rounded text-[0.77rem] font-medium hover:opacity-88 transition-opacity"
              >
                WhatsApp This Group
              </Link>
              <Link
                href="/admin/edm"
                className="bg-pink border border-pink text-white px-3.5 py-1.5 rounded text-[0.77rem] font-medium hover:bg-[#ff4d84] transition-colors"
              >
                Email This Group
              </Link>
            </div>
          </div>

          <div className="bg-[#141210] border border-white/7 rounded-md overflow-hidden">
            <div
              className="px-[18px] py-2.5 border-b border-white/7 text-[0.63rem] tracking-[0.13em] uppercase text-white/28 grid gap-3 items-center"
              style={{ gridTemplateColumns: "1fr 130px 160px 100px 70px" }}
            >
              <span>Subscriber</span>
              <span>Phone</span>
              <span>Other Services</span>
              <span>Joined</span>
              <span />
            </div>
            {detail.length === 0 ? (
              <div className="text-center py-9 text-white/28 text-[0.88rem]">
                No subscribers in this service yet.
              </div>
            ) : (
              detail
                .sort(
                  (a, b) =>
                    new Date(b.joined).getTime() -
                    new Date(a.joined).getTime()
                )
                .map((s) => (
                  <div
                    key={s.id}
                    className="group px-[18px] py-3 border-b border-white/7 last:border-b-0 grid gap-3 items-center hover:bg-[#1c1917] transition-colors"
                    style={{
                      gridTemplateColumns: "1fr 130px 160px 100px 70px",
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-[30px] h-[30px] rounded-full bg-pink/14 flex items-center justify-center text-[0.68rem] font-semibold text-pink font-mono shrink-0">
                        {initials(s.name)}
                      </div>
                      <div>
                        <div className="text-[0.86rem] font-medium text-white">
                          {s.name}
                        </div>
                        <div className="text-[0.7rem] text-white/28">
                          {s.email || ""}
                        </div>
                      </div>
                    </div>
                    <div className="text-[0.83rem] text-white/55">
                      {s.phone || "—"}
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      {s.services
                        .filter((x) => x !== activeService)
                        .map((x) => (
                          <span
                            key={x}
                            className={`text-[0.65rem] font-semibold px-[7px] py-[2px] rounded-[3px] uppercase tracking-[0.05em] ${SERVICE_COLORS[x]}`}
                          >
                            {SERVICE_LABELS[x]}
                          </span>
                        ))}
                    </div>
                    <div className="font-mono text-[0.75rem] text-white/28">
                      {formatDate(s.joined)}
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href="/admin/subscribers"
                        className="text-[0.68rem] border border-white/7 text-white/28 px-2 py-0.5 rounded hover:border-pink hover:text-pink transition-colors"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
