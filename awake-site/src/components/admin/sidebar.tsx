"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const sections = [
  {
    label: "Overview",
    items: [
      {
        name: "Dashboard",
        href: "/admin",
        icon: (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[15px] h-[15px]">
            <rect x="1" y="1" width="6" height="6" rx="1" />
            <rect x="9" y="1" width="6" height="6" rx="1" />
            <rect x="1" y="9" width="6" height="6" rx="1" />
            <rect x="9" y="9" width="6" height="6" rx="1" />
          </svg>
        ),
      },
    ],
  },
  {
    label: "Subscribers",
    items: [
      {
        name: "All Subscribers",
        href: "/admin/subscribers",
        icon: (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[15px] h-[15px]">
            <circle cx="8" cy="5" r="3" />
            <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" />
          </svg>
        ),
      },
      {
        name: "By Service",
        href: "/admin/subscribers/by-service",
        icon: (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[15px] h-[15px]">
            <path d="M2 4h12M2 8h8M2 12h5" />
          </svg>
        ),
      },
      {
        name: "Add Subscriber",
        href: "/admin/subscribers/add",
        icon: (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[15px] h-[15px]">
            <circle cx="8" cy="6" r="3" />
            <path d="M2 14c0-3 2.7-5 6-5s6 2 6 5" />
            <path d="M12 3v4M10 5h4" />
          </svg>
        ),
      },
    ],
  },
  {
    label: "Messaging",
    items: [
      {
        name: "WhatsApp",
        href: "/admin/whatsapp",
        icon: (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[15px] h-[15px]">
            <path d="M14 8A6 6 0 1 1 2.3 11.3L1 15l3.7-1.3A6 6 0 0 1 14 8z" />
          </svg>
        ),
      },
      {
        name: "EDM Campaigns",
        href: "/admin/edm",
        icon: (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[15px] h-[15px]">
            <rect x="1" y="3" width="14" height="10" rx="1" />
            <path d="M1 3l7 6 7-6" />
          </svg>
        ),
      },
      {
        name: "ManyChat Flows",
        href: "/admin/manychat",
        icon: (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[15px] h-[15px]">
            <path d="M1 4l6 5 6-5" />
            <rect x="1" y="3" width="14" height="10" rx="1" />
          </svg>
        ),
      },
    ],
  },
  {
    label: "Reports",
    items: [
      {
        name: "Analytics",
        href: "/admin/analytics",
        icon: (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[15px] h-[15px]">
            <path d="M2 12 6 7l4 3 4-6" />
          </svg>
        ),
      },
    ],
  },
  {
    label: "Settings",
    items: [
      {
        name: "Integrations",
        href: "/admin/integrations",
        icon: (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[15px] h-[15px]">
            <circle cx="8" cy="8" r="2" />
            <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.2 3.2l1.4 1.4M11.4 11.4l1.4 1.4M11.4 3.2l-1.4 1.4M4.6 11.4l-1.4 1.4" />
          </svg>
        ),
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="w-[228px] min-h-screen bg-[#141210] border-r border-white/7 flex flex-col fixed top-0 left-0 bottom-0 z-50 overflow-y-auto">
      {/* Logo */}
      <div className="px-5 pt-[22px] pb-[18px] border-b border-white/7 shrink-0">
        <Link href="/admin" className="block">
          <div className="font-serif font-black text-[1.28rem] tracking-[0.1em]">
            <span className="text-white">AW</span>
            <span className="text-pink">AKE</span>
          </div>
          <div className="text-[0.48rem] font-medium tracking-[0.22em] uppercase text-white/28 mt-0.5">
            Content Hub
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        {sections.map((section) => (
          <div key={section.label}>
            <div className="px-5 pt-3.5 pb-1 text-[0.58rem] tracking-[0.22em] uppercase text-white/28">
              {section.label}
            </div>
            {section.items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 px-5 py-[9px] text-[0.82rem] font-medium transition-all border-l-2",
                    active
                      ? "text-pink bg-pink/7 border-l-pink"
                      : "text-white/55 border-transparent hover:text-white hover:bg-[#1c1917]"
                  )}
                >
                  <span className={cn("opacity-65", active && "opacity-100")}>
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-3.5 border-t border-white/7 shrink-0 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-[0.73rem] text-white/28">
          <span className="w-[7px] h-[7px] rounded-full bg-green-500 animate-pulse-dot" />
          Hub active
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-[0.76rem] text-white/35 hover:text-pink transition-colors cursor-pointer"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[14px] h-[14px]">
            <path d="M6 14H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3" />
            <path d="M10 11l3-3-3-3" />
            <path d="M13 8H6" />
          </svg>
          Sign out
        </button>
      </div>
    </aside>
  );
}
