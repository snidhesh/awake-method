"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/subscribers": "All Subscribers",
  "/admin/subscribers/by-service": "By Service",
  "/admin/subscribers/add": "Add Subscriber",
  "/admin/whatsapp": "WhatsApp",
  "/admin/edm": "EDM Campaigns",
  "/admin/manychat": "ManyChat Flows",
  "/admin/analytics": "Analytics",
  "/admin/integrations": "Integrations",
};

export default function Topbar() {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] || "Dashboard";

  return (
    <div className="bg-[#141210] border-b border-white/7 px-7 h-[58px] flex items-center justify-between sticky top-0 z-40 gap-4">
      <div className="font-serif text-[1.05rem] font-bold text-white whitespace-nowrap">
        AWAKE <span className="text-pink">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href="/admin/subscribers/add"
          className="bg-[#1c1917] border border-white/13 text-white/55 px-3.5 py-1.5 rounded text-[0.77rem] font-medium hover:border-pink hover:text-pink transition-all whitespace-nowrap"
        >
          + Add Subscriber
        </Link>
        <Link
          href="/admin/whatsapp"
          className="bg-pink border border-pink text-white px-3.5 py-1.5 rounded text-[0.77rem] font-medium hover:bg-[#ff4d84] transition-all whitespace-nowrap"
        >
          Send Message
        </Link>
      </div>
    </div>
  );
}
