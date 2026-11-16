// Server-side helpers for the visit log: recording visits and reading them
// back for /admin. Data lives in a Supabase table reached over its REST API
// with the service role key, which never leaves the server.

import { createHash } from "node:crypto";

export type Visit = {
  id: number;
  visited_at: string;
  visitor_id: string;
  path: string;
  source: string;
  referrer: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  org: string | null;
  device: string | null;
  browser: string | null;
  os: string | null;
  is_bot: boolean;
};

type NewVisit = Omit<Visit, "id" | "visited_at">;

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const visitsConfigured = () => Boolean(SUPABASE_URL && SUPABASE_KEY);

function supabaseHeaders(extra: Record<string, string> = {}): Record<string, string> {
  const headers: Record<string, string> = { apikey: SUPABASE_KEY!, "content-type": "application/json", ...extra };
  // Legacy service_role keys are JWTs and also go in Authorization; new sb_secret_ keys don't.
  if (SUPABASE_KEY!.split(".").length === 3) headers.authorization = `Bearer ${SUPABASE_KEY}`;
  return headers;
}

export async function insertVisit(visit: NewVisit): Promise<void> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/visits`, {
    method: "POST",
    headers: supabaseHeaders({ prefer: "return=minimal" }),
    body: JSON.stringify(visit),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Supabase insert failed: ${res.status} ${await res.text()}`);
}

/** Human visits since `since`, newest first. */
export async function visitsSince(since: Date, limit = 20000): Promise<Visit[]> {
  const params = new URLSearchParams({
    select: "*",
    visited_at: `gte.${since.toISOString()}`,
    is_bot: "eq.false",
    order: "visited_at.desc",
    limit: String(limit),
  });
  const res = await fetch(`${SUPABASE_URL}/rest/v1/visits?${params}`, { headers: supabaseHeaders(), cache: "no-store" });
  if (!res.ok) throw new Error(`Supabase query failed: ${res.status} ${await res.text()}`);
  return res.json();
}

/** Human visits in the last `days` days, newest first. */
export const recentVisits = (days: number) => visitsSince(new Date(Date.now() - days * 86_400_000));

export async function allTimeTotals(): Promise<{ visits: number; visitors: number }> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/visit_totals?select=*`, {
    headers: supabaseHeaders(),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Supabase totals failed: ${res.status} ${await res.text()}`);
  const [row] = await res.json();
  return { visits: Number(row?.visits ?? 0), visitors: Number(row?.visitors ?? 0) };
}

// ---------- Describing a request ----------

/** A stable, salted hash of IP and user agent: recognises repeat visits without storing the IP. */
export function visitorId(ip: string, userAgent: string): string {
  const salt = process.env.VISITOR_SALT ?? "";
  return createHash("sha256").update(`${salt}|${ip}|${userAgent}`).digest("hex").slice(0, 16);
}

export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip") || "unknown";
}

/** City, region and country from Vercel's geolocation headers. */
export function geo(headers: Headers) {
  const decode = (v: string | null) => {
    if (!v) return null;
    try {
      return decodeURIComponent(v);
    } catch {
      return v;
    }
  };
  return {
    country: headers.get("x-vercel-ip-country"),
    region: decode(headers.get("x-vercel-ip-country-region")),
    city: decode(headers.get("x-vercel-ip-city")),
  };
}

const BOT = /bot|crawl|spider|slurp|preview|headless|lighthouse|pagespeed|vercel|curl|wget|python|go-http|java\/|axios|node-fetch|monitor|uptime|facebookexternalhit|embedly|whatsapp|telegram|discord|slack|skype|bingpreview/i;

export const isBot = (userAgent: string) => userAgent === "" || BOT.test(userAgent);

/** Device type, browser and OS from the user agent. */
export function describeAgent(ua: string) {
  const device = /iPad|Tablet/i.test(ua) ? "Tablet" : /Mobi|iPhone|Android/i.test(ua) ? "Mobile" : "Desktop";

  const browser = /Edg\//.test(ua)
    ? "Edge"
    : /OPR\/|Opera/.test(ua)
      ? "Opera"
      : /SamsungBrowser/.test(ua)
        ? "Samsung Internet"
        : /Firefox\/|FxiOS/.test(ua)
          ? "Firefox"
          : /Chrome\/|CriOS/.test(ua)
            ? "Chrome"
            : /Safari\//.test(ua)
              ? "Safari"
              : "Other";

  const os = /Windows/.test(ua)
    ? "Windows"
    : /iPhone|iPad|iPod/.test(ua)
      ? "iOS"
      : /Android/.test(ua)
        ? "Android"
        : /CrOS/.test(ua)
          ? "ChromeOS"
          : /Mac OS X|Macintosh/.test(ua)
            ? "macOS"
            : /Linux/.test(ua)
              ? "Linux"
              : "Other";

  return { device, browser, os };
}

const KNOWN_SOURCES: [RegExp, string][] = [
  [/(^|\.)linkedin\.com$|^lnkd\.in$/, "LinkedIn"],
  [/(^|\.)github\.com$/, "GitHub"],
  [/(^|\.)google\.[a-z.]+$/, "Google"],
  [/(^|\.)bing\.com$/, "Bing"],
  [/(^|\.)duckduckgo\.com$/, "DuckDuckGo"],
  [/^t\.co$|(^|\.)x\.com$|(^|\.)twitter\.com$/, "X"],
  [/(^|\.)reddit\.com$/, "Reddit"],
  [/(^|\.)ycombinator\.com$/, "Hacker News"],
  [/(^|\.)hex\.pm$|(^|\.)hexdocs\.pm$/, "Hex"],
  [/(^|\.)elixirforum\.com$/, "Elixir Forum"],
  [/(^|\.)mail\.google\.com$|(^|\.)outlook\.(com|live\.com)$/, "Email"],
  [/(^|\.)chatgpt\.com$|(^|\.)perplexity\.ai$|(^|\.)claude\.ai$/, "AI assistant"],
];

/** Where the visit came from: a utm_source/ref tag, a known site, the referring host, or Direct. */
export function sourceOf(referrer: string, tag: string, ownHost: string | null): { source: string; referrer: string | null } {
  if (tag) return { source: tag.slice(0, 60), referrer: referrer || null };
  if (!referrer) return { source: "Direct", referrer: null };
  let host: string;
  try {
    host = new URL(referrer).hostname.replace(/^www\./, "");
  } catch {
    return { source: "Direct", referrer: null };
  }
  if (ownHost && host === ownHost.replace(/^www\./, "")) return { source: "Direct", referrer: null };
  const known = KNOWN_SOURCES.find(([re]) => re.test(host));
  return { source: known ? known[1] : host, referrer: referrer.slice(0, 500) };
}

// The company or network behind an IP, e.g. "Google LLC" or "Bharti Airtel".
// Looked up with ipapi.co (free, 1,000 lookups a day), cached per instance.
const orgCache = new Map<string, string | null>();

export async function orgOf(ip: string): Promise<string | null> {
  if (ip === "unknown" || ip.startsWith("127.") || ip === "::1") return null;
  if (orgCache.has(ip)) return orgCache.get(ip)!;
  let org: string | null = null;
  try {
    const res = await fetch(`https://ipapi.co/${encodeURIComponent(ip)}/org/`, {
      headers: { "user-agent": "mandarjoshi-portfolio" },
      signal: AbortSignal.timeout(1500),
      cache: "no-store",
    });
    const text = (await res.text()).trim();
    if (res.ok && text && text.length <= 120 && !/undefined|rate ?limit|reserved|error/i.test(text)) org = text;
  } catch {
    org = null;
  }
  if (orgCache.size > 500) orgCache.clear();
  orgCache.set(ip, org);
  return org;
}
