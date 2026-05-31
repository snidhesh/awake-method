import { unstable_cache } from "next/cache";

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const SHOWS_URL = "https://api.spotify.com/v1/shows";

export type Episode = {
  title: string;
  date: string;
  url: string;
};

type SpotifyEpisode = {
  name: string;
  release_date: string;
  duration_ms: number;
  external_urls: { spotify: string };
};

async function getAccessToken(): Promise<string> {
  const id = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!id || !secret) throw new Error("Missing Spotify credentials");
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Spotify token failed: ${res.status}`);
  const json = (await res.json()) as { access_token: string };
  return json.access_token;
}

function formatDate(iso: string, durationMs: number): string {
  const d = new Date(iso);
  const month = d.toLocaleString("en-US", { month: "short" });
  const year = d.getFullYear();
  const min = Math.round(durationMs / 60000);
  return `${month} ${year} · ${min} min`;
}

async function fetchEpisodesUncached(limit: number): Promise<Episode[]> {
  const showId = process.env.SPOTIFY_SHOW_ID;
  const market = process.env.SPOTIFY_MARKET || "AE";
  if (!showId) throw new Error("Missing SPOTIFY_SHOW_ID");
  const token = await getAccessToken();
  const url = `${SHOWS_URL}/${showId}/episodes?market=${market}&limit=${limit}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Spotify episodes failed: ${res.status}`);
  const json = (await res.json()) as { items: SpotifyEpisode[] };
  return json.items.map((ep) => ({
    title: ep.name,
    date: formatDate(ep.release_date, ep.duration_ms),
    url: ep.external_urls.spotify,
  }));
}

export const fetchEpisodes = unstable_cache(
  fetchEpisodesUncached,
  ["spotify-episodes"],
  { revalidate: 3600, tags: ["spotify-episodes"] }
);
