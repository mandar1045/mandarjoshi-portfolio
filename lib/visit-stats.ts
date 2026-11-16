// Turns raw visits into what /admin shows. Days are counted in India time.

import type { Visit } from "./visits";

const TZ = "Asia/Kolkata";
const dayKey = (d: Date) => d.toLocaleDateString("en-CA", { timeZone: TZ }); // YYYY-MM-DD

export type Window = { visits: number; visitors: number };
export type Ranked = { label: string; count: number; detail?: string };
export type Person = {
  id: string;
  lastSeen: string;
  firstSeen: string;
  visits: number;
  location: string;
  country: string | null;
  org: string | null;
  source: string;
  device: string;
};
export type Day = { date: string; visits: number; visitors: number };

function windowStats(visits: Visit[]): Window {
  return { visits: visits.length, visitors: new Set(visits.map((v) => v.visitor_id)).size };
}

function rank(visits: Visit[], key: (v: Visit) => string | null, limit = 8): Ranked[] {
  const counts = new Map<string, number>();
  for (const v of visits) {
    const k = key(v);
    if (k) counts.set(k, (counts.get(k) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
    .slice(0, limit);
}

export const locationOf = (v: Pick<Visit, "city" | "region" | "country">) =>
  [v.city, v.country].filter(Boolean).join(", ") || "Unknown";

/** Everything the dashboard needs from the last 30 days of visits (newest first). */
export function summarize(visits: Visit[], now = new Date()) {
  const today = dayKey(now);
  const ago = (days: number) => now.getTime() - days * 86_400_000;
  const since = (days: number) => visits.filter((v) => Date.parse(v.visited_at) >= ago(days));

  // Visits per day for the last 30 days, oldest first, including empty days.
  const byDay = new Map<string, Visit[]>();
  for (const v of visits) {
    const k = dayKey(new Date(v.visited_at));
    byDay.set(k, [...(byDay.get(k) ?? []), v]);
  }
  const days: Day[] = Array.from({ length: 30 }, (_, i) => {
    const date = dayKey(new Date(ago(29 - i)));
    return { date, ...windowStats(byDay.get(date) ?? []) };
  });

  // One row per visitor, most recently seen first.
  const people = new Map<string, Person>();
  for (const v of visits) {
    const p = people.get(v.visitor_id);
    if (p) {
      p.visits++;
      p.firstSeen = v.visited_at; // visits are newest first
      if (v.source !== "Direct") p.source = v.source;
      continue;
    }
    people.set(v.visitor_id, {
      id: v.visitor_id,
      lastSeen: v.visited_at,
      firstSeen: v.visited_at,
      visits: 1,
      location: locationOf(v),
      country: v.country,
      org: v.org,
      source: v.source,
      device: [v.device, v.browser, v.os].filter(Boolean).join(" · "),
    });
  }

  return {
    today: windowStats(visits.filter((v) => dayKey(new Date(v.visited_at)) === today)),
    week: windowStats(since(7)),
    month: windowStats(visits),
    days,
    sources: rank(visits, (v) => v.source),
    countries: rank(visits, (v) => v.country),
    orgs: rank(visits, (v) => v.org),
    devices: rank(visits, (v) => v.device, 4),
    browsers: rank(visits, (v) => v.browser, 6),
    people: [...people.values()].slice(0, 100),
    returning: [...people.values()].filter((p) => p.visits > 1).length,
  };
}

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

export function countryName(code: string | null): string {
  if (!code) return "Unknown";
  try {
    return regionNames.of(code) ?? code;
  } catch {
    return code;
  }
}

export function when(iso: string, now = new Date()): string {
  const minutes = Math.round((now.getTime() - Date.parse(iso)) / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  return new Date(iso).toLocaleString("en-IN", {
    timeZone: TZ,
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

export const shortDay = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "short", timeZone: "UTC" });
