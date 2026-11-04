// Fetches pull requests, issues, the contribution calendar and library stats
// from GitHub and Hex. Responses are cached by Next.js for an hour. If GitHub
// can't be reached (or rate-limits us), the bundled snapshot is used instead.

import snapshotJson from "./data/snapshot.json";
import type { CalendarDay, PullRequest, Snapshot } from "./types";

const USER = "mandar1045";
const PACKAGE = "stampede";
const REVALIDATE = 3600;
const PER_PAGE = 100;
const MAX_PAGES = 5;

type SearchItem = {
  repository_url: string;
  number: number;
  title: string;
  html_url: string;
  created_at: string;
  closed_at: string | null;
  pull_request?: { merged_at: string | null };
};

function githubHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    accept: "application/vnd.github+json",
    "x-github-api-version": "2022-11-28",
    "user-agent": "mandarjoshi-portfolio",
  };
  if (process.env.GITHUB_TOKEN) headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return headers;
}

async function getJSON<T>(url: string, headers: Record<string, string>): Promise<T> {
  const res = await fetch(url, { headers, next: { revalidate: REVALIDATE } });
  if (!res.ok) throw new Error(`${res.status} from ${url}`);
  return res.json() as Promise<T>;
}

async function search(query: string): Promise<SearchItem[]> {
  const items: SearchItem[] = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const params = new URLSearchParams({
      q: query,
      per_page: String(PER_PAGE),
      page: String(page),
      sort: "created",
      order: "desc",
    });
    const data = await getJSON<{ total_count: number; items: SearchItem[] }>(
      `https://api.github.com/search/issues?${params}`,
      githubHeaders(),
    );
    items.push(...data.items);
    if (items.length >= data.total_count || data.items.length < PER_PAGE) break;
  }
  return items;
}

const repoName = (item: SearchItem) => item.repository_url.split("/").slice(-2).join("/");

function toPr(item: SearchItem, state: "merged" | "open"): PullRequest {
  const date = state === "merged" ? (item.pull_request?.merged_at ?? item.closed_at) : item.created_at;
  return {
    repo: repoName(item),
    number: item.number,
    title: item.title.trim(),
    url: item.html_url,
    date: (date ?? item.created_at).slice(0, 10),
  };
}

const newestFirst = (a: PullRequest, b: PullRequest) =>
  b.date.localeCompare(a.date) || b.number - a.number;

/** The contribution graph from the public profile page, so totals match what GitHub shows. */
async function calendarFromHtml(): Promise<CalendarDay[]> {
  const res = await fetch(`https://github.com/users/${USER}/contributions`, {
    headers: { "user-agent": "mandarjoshi-portfolio", accept: "text/html" },
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) throw new Error(`${res.status} from contributions page`);
  const html = await res.text();

  const counts = new Map<string, number>();
  for (const [, id, text] of html.matchAll(/<tool-tip[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    const n = text.match(/^([\d,]+) contribution/);
    counts.set(id, n ? Number(n[1].replace(/,/g, "")) : 0);
  }

  const days: CalendarDay[] = [];
  for (const [td] of html.matchAll(/<td[^>]*\bdata-date="[^"]+"[^>]*>/g)) {
    const date = td.match(/data-date="([^"]+)"/)?.[1];
    const level = td.match(/data-level="(\d)"/)?.[1];
    const id = td.match(/\bid="([^"]+)"/)?.[1];
    if (date && level) days.push([date, (id && counts.get(id)) || 0, Number(level)]);
  }
  if (days.length === 0) throw new Error("no calendar found on contributions page");
  return days.sort((a, b) => a[0].localeCompare(b[0]));
}

const LEVELS: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

async function calendarFromGraphql(): Promise<CalendarDay[]> {
  const query = `query($login: String!) { user(login: $login) { contributionsCollection { contributionCalendar {
    weeks { contributionDays { date contributionCount contributionLevel } } } } } }`;
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { ...githubHeaders(), "content-type": "application/json" },
    body: JSON.stringify({ query, variables: { login: USER } }),
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) throw new Error(`${res.status} from GraphQL`);
  const body = await res.json();
  const weeks = body?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
  if (!Array.isArray(weeks)) throw new Error("no calendar in GraphQL response");
  return weeks.flatMap((w: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }) =>
    w.contributionDays.map((d): CalendarDay => [d.date, d.contributionCount, LEVELS[d.contributionLevel] ?? 0]),
  );
}

async function fetchCalendar(): Promise<CalendarDay[] | null> {
  try {
    return await calendarFromHtml();
  } catch {
    if (!process.env.GITHUB_TOKEN) return null;
    return calendarFromGraphql().catch(() => null);
  }
}

/** The snapshot bundled with the site, used when GitHub or Hex can't be reached. */
export function bundledSnapshot(): Snapshot {
  const s = snapshotJson as unknown as {
    fetched_at: string;
    merged: PullRequest[];
    open: PullRequest[];
    issues: Record<string, number>;
    library: { stars: number; version: string; downloads: number; released_on?: string | null };
    calendar?: CalendarDay[] | null;
  };
  return {
    fetchedAt: s.fetched_at,
    merged: s.merged,
    open: s.open,
    issues: s.issues,
    library: {
      stars: s.library.stars,
      version: s.library.version,
      downloads: s.library.downloads,
      releasedOn: s.library.released_on ?? null,
    },
    calendar: s.calendar ?? null,
  };
}

type Hex = {
  latest_stable_version: string;
  downloads?: { all?: number };
  releases?: { version: string; inserted_at: string }[];
};

function settled<T>(result: PromiseSettledResult<T>, what: string): T | null {
  if (result.status === "fulfilled") return result.value;
  console.warn(`Couldn't fetch ${what}, using the bundled snapshot:`, String(result.reason));
  return null;
}

/**
 * Live data from GitHub and Hex. Each source falls back to the bundled
 * snapshot on its own, so one rate-limited request doesn't hide the rest.
 */
export async function getSnapshot(): Promise<Snapshot> {
  const fallback = bundledSnapshot();
  const scope = `author:${USER} -user:${USER}`;

  const [mergedR, openR, issuesR, repoR, hexR, calendarR] = await Promise.allSettled([
    search(`is:pr is:merged ${scope}`),
    search(`is:pr is:open ${scope}`),
    search(`is:issue ${scope}`),
    getJSON<{ stargazers_count: number }>(`https://api.github.com/repos/${USER}/${PACKAGE}`, githubHeaders()),
    getJSON<Hex>(`https://hex.pm/api/packages/${PACKAGE}`, {
      accept: "application/json",
      "user-agent": "mandarjoshi-portfolio",
    }),
    fetchCalendar(),
  ]);

  const merged = settled(mergedR, "merged PRs");
  const open = settled(openR, "open PRs");
  const issues = settled(issuesR, "issues");
  const repo = settled(repoR, "repo stats");
  const hex = settled(hexR, "Hex stats");
  const calendar = settled(calendarR, "contribution calendar");

  let issueCounts = fallback.issues;
  if (issues) {
    issueCounts = {};
    for (const item of issues) issueCounts[repoName(item)] = (issueCounts[repoName(item)] ?? 0) + 1;
  }

  const release = hex?.releases?.find((r) => r.version === hex.latest_stable_version);
  const anyLive = [merged, open, issues, repo, hex].some((x) => x !== null);

  return {
    fetchedAt: anyLive ? new Date().toISOString() : fallback.fetchedAt,
    merged: merged ? merged.map((i) => toPr(i, "merged")).sort(newestFirst) : fallback.merged,
    open: open ? open.map((i) => toPr(i, "open")).sort(newestFirst) : fallback.open,
    issues: issueCounts,
    library: {
      stars: repo?.stargazers_count ?? fallback.library.stars,
      version: hex?.latest_stable_version ?? fallback.library.version,
      downloads: hex?.downloads?.all ?? fallback.library.downloads,
      releasedOn: release ? release.inserted_at.slice(0, 10) : fallback.library.releasedOn,
    },
    calendar: calendar ?? fallback.calendar,
  };
}
