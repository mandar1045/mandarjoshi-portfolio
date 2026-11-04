// Turns raw GitHub activity into what the open source section shows: overall
// numbers per project and a few hand-picked pull requests. Counts come from
// GitHub; highlights are picked by hand and show as merged or open from the
// live data (one closed without merging drops off the page).

import type { PullRequest, Snapshot } from "./types";

// Work repositories and "add my library to this list" PRs aren't upstream work.
const EXCLUDED_OWNERS = ["brandlabsapp", "tect-raniwork", "NilanchalaPanda"];
const EXCLUDED_REPOS = ["h4cc/awesome-elixir", "aliesbelik/load-testing-toolkit"];

// GitHub owner => [project name, one-line description, what I worked in]
const PROJECTS: Record<string, [string, string, string[]]> = {
  supabase: ["Supabase", "Open source Postgres development platform", ["Elixir", "TypeScript", "Docker"]],
  fossology: ["FOSSology", "License compliance toolkit, a Linux Foundation project", ["PHP", "C", "SQL"]],
  "elixir-lang": ["Elixir", "The Elixir language and its code formatter", ["Elixir"]],
  "podman-container-tools": ["Podman", "Daemonless container engine", ["Go"]],
  containers: ["Podman", "Daemonless container engine", ["Go"]],
  calcom: ["Cal.com", "Open source scheduling infrastructure", ["Docs"]],
  phoenixframework: ["Phoenix", "Elixir web framework", ["Elixir"]],
  jenkinsci: ["Jenkins", "Automation server", ["Java"]],
  multigres: ["Multigres", "Horizontally scalable Postgres", ["Go"]],
  RocketChat: ["Rocket.Chat", "Open source team chat", ["TypeScript"]],
};

const LOGOS = new Set([
  "calcom",
  "elixir-lang",
  "fossology",
  "jenkinsci",
  "multigres",
  "phoenixframework",
  "podman-container-tools",
  "RocketChat",
  "supabase",
]);

// Hand-picked PRs per project. Supabase is limited to Realtime, the Elixir
// service behind Broadcast, Presence and Postgres Changes.
const HIGHLIGHTS: { name: string; subtitle: string; picks: [string, string, string][] }[] = [
  {
    name: "Supabase",
    subtitle: "Realtime: the Elixir service behind Broadcast, Presence and Postgres Changes",
    picks: [
      [
        "supabase/realtime#2345",
        "One oversized message could crash dispatch for every tenant",
        "Serializer errors now stay inside the dispatcher instead of taking down the shared GenRpcPubSub worker.",
      ],
      [
        "supabase/realtime#2343",
        "A bad presence key could crash a shard shared across tenants",
        "Presence keys are validated as strings before they reach the shared Presence shard.",
      ],
      [
        "supabase/realtime#2488",
        "Partitioned tables silently lost every Postgres Change",
        "With `publish_via_partition_root`, changes arrived under the leaf partition and were filtered out while clients stayed subscribed.",
      ],
      [
        "supabase/realtime#2362",
        "One array filter dropped the whole change batch",
        "Filters were checked against jsonb-cast values, so an array raised and the batch was lost for everyone. They now use the raw wal2json values.",
      ],
    ],
  },
  {
    name: "Elixir",
    subtitle: "The language's code formatter, used by every `mix format` run",
    picks: [
      [
        "elixir-lang/elixir#16004",
        "The formatter turned valid code into code that wouldn't parse",
        "It dropped parentheses on anonymous calls with do-end blocks. `Macro.to_string/1` is fixed too.",
      ],
      [
        "elixir-lang/elixir#16006",
        "Formatting `!!x in y` changed what the code did",
        "It printed `!(!x in y)`, which parses differently. Now it prints `!((!x) in y)`.",
      ],
      [
        "elixir-lang/elixir#16009",
        "Comments made `mix format` give different output on each run",
        "Formatting Elixir's own lib with added comments went from about 20 unstable files to none.",
      ],
    ],
  },
  {
    name: "FOSSology",
    subtitle: "License compliance toolkit, a Linux Foundation project",
    picks: [
      [
        "fossology/fossology#3936",
        "Buffer overflow in the scheduler's agent setup",
        "Commands of 1006 to 1023 bytes overran `raw_cmd` once ` --scheduler_start` was appended. Reproduced under AddressSanitizer.",
      ],
      [
        "fossology/fossology#3555",
        "Memory-safety bugs in the C package agent",
        "Replaced unsafe `strcpy()`, fixed NULL-before-free crashes and HTML double-encoding.",
      ],
      [
        "fossology/fossology#3456",
        "N+1 queries and a crash in the scanned-licenses API",
        "Removed redundant per-license lookups from `/scanned` and fixed a TypeError on synthetic entries.",
      ],
    ],
  },
];

export const owner = (repo: string) => repo.split("/")[0];
export const prKey = (pr: PullRequest) => `${pr.repo}#${pr.number}`;
export const projectName = (pr: PullRequest) => PROJECTS[owner(pr.repo)]?.[0] ?? owner(pr.repo);
export const logo = (ownerName: string) => (LOGOS.has(ownerName) ? `/images/orgs/${ownerName}.png` : null);

const excludedRepo = (repo: string) => EXCLUDED_OWNERS.includes(owner(repo)) || EXCLUDED_REPOS.includes(repo);
export const excluded = (pr: PullRequest) => excludedRepo(pr.repo);

export type Project = {
  name: string;
  description: string | null;
  owners: string[];
  logo: string | null;
  tech: string[];
  prs: PullRequest[];
  merged: number;
  open: number;
  issues: number;
};

/** Merged pull requests grouped by project, biggest first. */
export function projects(snapshot: Snapshot): Project[] {
  const merged = snapshot.merged.filter((pr) => !excluded(pr));
  const openBy = new Map<string, number>();
  for (const pr of inReview(snapshot)) openBy.set(projectName(pr), (openBy.get(projectName(pr)) ?? 0) + 1);

  const issuesBy = new Map<string, number>();
  for (const [repo, count] of Object.entries(snapshot.issues)) {
    if (excludedRepo(repo)) continue;
    const name = PROJECTS[owner(repo)]?.[0] ?? owner(repo);
    issuesBy.set(name, (issuesBy.get(name) ?? 0) + count);
  }

  const byName = new Map<string, { owners: string[]; prs: PullRequest[] }>();
  for (const pr of merged) {
    const name = projectName(pr);
    const group = byName.get(name) ?? { owners: [], prs: [] };
    if (!group.owners.includes(owner(pr.repo))) group.owners.push(owner(pr.repo));
    group.prs.push(pr);
    byName.set(name, group);
  }

  return [...byName.entries()]
    .map(([name, { owners, prs }]) => {
      const meta = PROJECTS[owners[0]];
      return {
        name,
        description: meta?.[1] ?? null,
        owners,
        logo: logo(owners[0]),
        tech: meta?.[2] ?? [],
        prs,
        merged: prs.length,
        open: openBy.get(name) ?? 0,
        issues: issuesBy.get(name) ?? 0,
      };
    })
    .sort((a, b) => b.merged - a.merged || a.name.localeCompare(b.name));
}

/** Open pull requests waiting for review, newest first. */
export const inReview = (snapshot: Snapshot) => snapshot.open.filter((pr) => !excluded(pr));

export type Highlight = Project & {
  subtitle: string;
  highlights: { pr: PullRequest; state: "merged" | "open"; headline: string; note: string }[];
};

/** The highlighted projects with their overall counts and picked PRs that are still merged or open. */
export function highlights(snapshot: Snapshot): Highlight[] {
  const status = new Map<string, { state: "merged" | "open"; pr: PullRequest }>();
  for (const pr of snapshot.merged) status.set(prKey(pr), { state: "merged", pr });
  for (const pr of snapshot.open) status.set(prKey(pr), { state: "open", pr });

  const byName = new Map(projects(snapshot).map((p) => [p.name, p]));

  return HIGHLIGHTS.flatMap(({ name, subtitle, picks }) => {
    const project = byName.get(name);
    if (!project) return [];
    const items = picks.flatMap(([key, headline, note]) => {
      const found = status.get(key);
      return found ? [{ ...found, headline, note }] : [];
    });
    return [{ ...project, subtitle, highlights: items }];
  });
}

/** The most recent upstream merge and the most recent PR still in review. */
export function latest(snapshot: Snapshot) {
  return {
    merged: snapshot.merged.find((pr) => !excluded(pr)) ?? null,
    open: inReview(snapshot)[0] ?? null,
  };
}
