"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addSubscriber, uid } from "@/lib/store";
import { SERVICES, SERVICE_LABELS, ServiceType } from "@/lib/types";
import { toast } from "@/components/admin/toast";

export default function AddSubscriberPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");
  const [services, setServices] = useState<Set<ServiceType>>(new Set());

  function toggleService(s: ServiceType) {
    setServices((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
  }

  function handleSave() {
    if (!name.trim()) {
      toast("Name is required", "error");
      return;
    }
    if (services.size === 0) {
      toast("Select at least one service", "error");
      return;
    }
    addSubscriber({
      id: uid(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim(),
      notes: notes.trim(),
      services: Array.from(services),
      joined: new Date().toISOString(),
    });
    toast(`${name.trim()} added successfully`);
    setTimeout(() => router.push("/admin/subscribers"), 600);
  }

  function handleClear() {
    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setNotes("");
    setServices(new Set());
  }

  const inputCls =
    "bg-[#1c1917] border border-white/7 rounded px-3 py-2.5 text-[0.86rem] text-white outline-none focus:border-pink/60 transition-colors w-full placeholder:text-white/28";
  const labelCls =
    "text-[0.63rem] tracking-[0.13em] uppercase text-white/28 font-semibold mb-1";

  return (
    <div>
      <div className="font-serif text-[1.05rem] font-bold text-white mb-4">
        Add New Subscriber
      </div>

      <div className="max-w-[560px]">
        <div className="bg-[#141210] border border-white/7 rounded-md p-[22px]">
          {/* Name */}
          <div className="mb-3.5">
            <div className={labelCls}>Full Name *</div>
            <input
              className={inputCls}
              placeholder="e.g. Nour Al-Rashidi"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-2 gap-3 mb-3.5">
            <div>
              <div className={labelCls}>Email Address</div>
              <input
                className={inputCls}
                type="email"
                placeholder="nour@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div className={labelCls}>Phone / WhatsApp</div>
              <input
                className={inputCls}
                placeholder="+971 50 000 0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {/* Company */}
          <div className="mb-3.5">
            <div className={labelCls}>Company / Organisation</div>
            <input
              className={inputCls}
              placeholder="Company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          {/* Services */}
          <div className="mb-3.5">
            <div className={labelCls}>Services (select all that apply)</div>
            <div className="grid grid-cols-2 gap-2 mt-1.5">
              {SERVICES.map((sv) => (
                <label
                  key={sv}
                  className="flex items-center gap-2 text-[0.84rem] text-white/55 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={services.has(sv)}
                    onChange={() => toggleService(sv)}
                    style={{ accentColor: "#e8185c" }}
                  />
                  {SERVICE_LABELS[sv]}
                </label>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="mb-3.5">
            <div className={labelCls}>Notes</div>
            <textarea
              className={`${inputCls} resize-y min-h-[70px]`}
              placeholder="Any notes about this subscriber..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2.5 mt-1.5">
            <button
              onClick={handleSave}
              className="bg-pink border border-pink text-white px-3.5 py-1.5 rounded text-[0.77rem] font-medium hover:bg-[#ff4d84] transition-colors cursor-pointer"
            >
              Save Subscriber
            </button>
            <button
              onClick={handleClear}
              className="bg-[#1c1917] border border-white/13 text-white/55 px-3.5 py-1.5 rounded text-[0.77rem] font-medium hover:border-pink hover:text-pink transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
