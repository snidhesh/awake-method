import { unstable_cache } from "next/cache";
import { XMLParser } from "fast-xml-parser";

const RSS_URL = "https://rss.buzzsprout.com/2240775.rss";

export type Episode = {
  title: string;
  date: string;
  url: string;
};

type RssItem = {
  title: string;
  pubDate: string;
  "itunes:duration": string;
  enclosure: { "@_url": string };
};

function formatMonthYear(rfc2822: string): string {
  const d = new Date(rfc2822);
  return `${d.toLocaleString("en-US", { month: "short" })} ${d.getFullYear()}`;
}

function formatMinutes(durationSeconds: string): number {
  return Math.round(Number(durationSeconds) / 60);
}

async function fetchEpisodesUncached(limit: number): Promise<Episode[]> {
  const res = await fetch(RSS_URL, { cache: "no-store" });
  if (!res.ok) throw new Error(`Podcast RSS fetch failed: ${res.status}`);
  const xml = await res.text();
  const parser = new XMLParser({ ignoreAttributes: false });
  const parsed = parser.parse(xml);
  const raw = parsed?.rss?.channel?.item;
  if (!raw) throw new Error("Podcast RSS: no items found");
  const items: RssItem[] = Array.isArray(raw) ? raw : [raw];
  if (items.length === 0) throw new Error("Podcast RSS: empty items array");
  return items.slice(0, limit).map((item) => ({
    title: item.title,
    date: `${formatMonthYear(item.pubDate)} · ${formatMinutes(item["itunes:duration"])} min`,
    url: item.enclosure["@_url"].replace(/\.mp3(?:\?.*)?$/i, ""),
  }));
}

export const fetchEpisodes = unstable_cache(
  fetchEpisodesUncached,
  ["podcast-episodes"],
  { revalidate: 3600, tags: ["podcast-episodes"] }
);
