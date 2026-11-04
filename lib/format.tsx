import type { ReactNode } from "react";
import type { PullRequest } from "./types";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Renders `backticked` spans as code. */
export function inlineCode(text: string): ReactNode {
  return text.split(/`([^`]+)`/).map((part, i) => (i % 2 === 1 ? <code key={i}>{part}</code> : part));
}

/** The title without a Conventional Commits prefix, capitalised. */
export function cleanTitle(title: string): string {
  const t = title.replace(/^[a-z]+(\([^)]*\))?!?:\s+/, "");
  return t.charAt(0).toUpperCase() + t.slice(1);
}

/** Short reference such as `realtime#2379`. */
export const prRef = (pr: PullRequest) => `${pr.repo.split("/")[1]}#${pr.number}`;

export const number = (n: number) => n.toLocaleString("en-US");
export const plural = (n: number, one: string, many: string) => `${number(n)} ${n === 1 ? one : many}`;

export function month(date: string): string {
  return `${MONTHS[Number(date.slice(5, 7)) - 1]} ${date.slice(0, 4)}`;
}

export function shortDate(date: string): string {
  return `${MONTHS[Number(date.slice(5, 7)) - 1]} ${Number(date.slice(8, 10))}`;
}

/** A short relative date, such as `today`, `3 days ago` or `2 months ago`. */
export function ago(date: string, today: Date = new Date()): string {
  const days = Math.floor(
    (Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()) - Date.parse(`${date}T00:00:00Z`)) /
      86_400_000,
  );
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 14) return "last week";
  if (days < 31) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 60) return "last month";
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return month(date);
}

export function minorVersion(version: string): string {
  const [major, minor] = version.split(".");
  return minor === undefined ? version : `${major}.${minor}`;
}

export function sentence(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} & ${items[items.length - 1]}`;
}

/** The current time in India, e.g. `10:42 PM`. The page keeps it ticking. */
export function localTime(): string {
  return new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit" }).format(
    new Date(),
  );
}

export function searchUrl(user: string, owners: string[] = [], openOnly = false): string {
  const orgs = owners.length === 0 ? `-user:${user}` : owners.map((o) => `org:${o}`).join(" ");
  const q = `is:pr ${openOnly ? "is:open " : ""}author:${user} ${orgs}`;
  return `https://github.com/search?type=pullrequests&q=${encodeURIComponent(q)}`;
}
