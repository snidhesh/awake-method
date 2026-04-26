"use client";

import type { Subscriber, WAMessage, Campaign, ServiceType } from "./types";

const STORAGE_KEYS = {
  subscribers: "awake_subs",
  waHistory: "awake_wa",
  campaigns: "awake_campaigns",
} as const;

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, data: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
}

const DEMO_SUBSCRIBERS: Subscriber[] = [
  {
    id: "s1",
    name: "Demo User One",
    email: "demo+1@example.com",
    phone: "+971 50 000 0001",
    company: "Acme Real Estate",
    services: ["newsletter", "keynote", "whatsapp"],
    notes: "Demo subscriber",
    joined: new Date(Date.now() - 7 * 86400000).toISOString(),
  },
  {
    id: "s2",
    name: "Demo User Two",
    email: "demo+2@example.com",
    phone: "+971 55 000 0002",
    company: "Example Properties",
    services: ["newsletter", "playbook"],
    notes: "",
    joined: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: "s3",
    name: "Demo User Three",
    email: "demo+3@example.com",
    phone: "+971 50 000 0003",
    company: "Sample Hotels",
    services: ["masterclass", "whatsapp", "playbook"],
    notes: "Hospitality sector",
    joined: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: "s4",
    name: "Demo User Four",
    email: "demo+4@example.com",
    phone: "+971 52 000 0004",
    company: "Test Consulting Co",
    services: ["newsletter", "training"],
    notes: "Referred by Demo User One",
    joined: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: "s5",
    name: "Demo User Five",
    email: "demo+5@example.com",
    phone: "+971 56 000 0005",
    company: "Example Agency",
    services: ["collab", "newsletter"],
    notes: "Brand collab interest",
    joined: new Date(Date.now() - 86400000).toISOString(),
  },
];

export function uid(): string {
  return "s" + Date.now() + Math.random().toString(36).slice(2, 6);
}

export function initials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

// --- Subscribers ---
export function getSubscribers(): Subscriber[] {
  const subs = read<Subscriber[]>(STORAGE_KEYS.subscribers, []);
  if (subs.length === 0) {
    write(STORAGE_KEYS.subscribers, DEMO_SUBSCRIBERS);
    return DEMO_SUBSCRIBERS;
  }
  return subs;
}

export function saveSubscribers(subs: Subscriber[]) {
  write(STORAGE_KEYS.subscribers, subs);
}

export function addSubscriber(sub: Subscriber) {
  const subs = getSubscribers();
  subs.unshift(sub);
  saveSubscribers(subs);
}

export function updateSubscriber(id: string, data: Partial<Subscriber>) {
  const subs = getSubscribers();
  const idx = subs.findIndex((s) => s.id === id);
  if (idx >= 0) {
    subs[idx] = { ...subs[idx], ...data };
    saveSubscribers(subs);
  }
}

export function deleteSubscriber(id: string) {
  const subs = getSubscribers().filter((s) => s.id !== id);
  saveSubscribers(subs);
}

export function getServiceCounts(): Record<ServiceType, number> {
  const subs = getSubscribers();
  const counts = {} as Record<ServiceType, number>;
  const services: ServiceType[] = [
    "newsletter",
    "whatsapp",
    "keynote",
    "masterclass",
    "training",
    "collab",
    "podcast",
    "playbook",
  ];
  services.forEach((s) => (counts[s] = 0));
  subs.forEach((sub) =>
    sub.services.forEach((s) => {
      if (counts[s] !== undefined) counts[s]++;
    })
  );
  return counts;
}

// --- WhatsApp History ---
export function getWAHistory(): WAMessage[] {
  return read<WAMessage[]>(STORAGE_KEYS.waHistory, []);
}

export function addWAMessage(msg: WAMessage) {
  const history = getWAHistory();
  history.unshift(msg);
  write(STORAGE_KEYS.waHistory, history);
}

// --- Campaigns ---
export function getCampaigns(): Campaign[] {
  return read<Campaign[]>(STORAGE_KEYS.campaigns, []);
}

export function addCampaign(campaign: Campaign) {
  const list = getCampaigns();
  list.unshift(campaign);
  write(STORAGE_KEYS.campaigns, list);
}
