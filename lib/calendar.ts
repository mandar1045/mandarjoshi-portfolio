// Lays out the GitHub contribution calendar and works out streaks.

import type { CalendarDay } from "./types";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dayOfWeek = (date: string) => new Date(`${date}T00:00:00Z`).getUTCDay(); // 0 = Sunday
const monthLabel = (date: string) => MONTHS[Number(date.slice(5, 7)) - 1];

export type Calendar = {
  weeks: (CalendarDay | null)[][];
  months: [number, string][];
  total: number;
  activeDays: number;
  longestStreak: number;
  currentStreak: number;
  bestDay: CalendarDay;
};

export function buildCalendar(input: CalendarDay[] | null): Calendar | null {
  if (!input || input.length === 0) return null;
  const days = [...input].sort((a, b) => a[0].localeCompare(b[0]));

  // Weeks start on Sunday and are padded with nulls.
  const weeks: (CalendarDay | null)[][] = [];
  let week: CalendarDay[] = [];
  for (const day of days) {
    if (week.length > 0 && dayOfWeek(day[0]) === 0) {
      weeks.push(pad(week));
      week = [];
    }
    week.push(day);
  }
  if (week.length > 0) weeks.push(pad(week));

  return {
    weeks,
    months: monthLabels(weeks),
    total: days.reduce((sum, d) => sum + d[1], 0),
    activeDays: days.filter((d) => d[1] > 0).length,
    longestStreak: longestStreak(days),
    currentStreak: currentStreak(days),
    bestDay: days.reduce((best, d) => (d[1] > best[1] ? d : best), days[0]),
  };
}

function pad(week: CalendarDay[]): (CalendarDay | null)[] {
  const lead = dayOfWeek(week[0][0]);
  return [...Array(lead).fill(null), ...week, ...Array(7 - lead - week.length).fill(null)];
}

// A month is labelled on the week holding its 1st, and on the first column if
// that week starts mid-month and leaves room for a label.
function monthLabels(weeks: (CalendarDay | null)[][]): [number, string][] {
  const labels: [number, string][] = [];
  weeks.forEach((week, col) => {
    const first = week.find((d) => d && d[0].endsWith("-01"));
    if (first) labels.push([col, monthLabel(first[0])]);
    else if (col === 0) labels.push([0, monthLabel(week.find((d) => d)![0])]);
  });
  if (labels.length > 1 && labels[0][0] === 0 && labels[1][0] < 3) labels.shift();
  return labels;
}

export function longestStreak(days: CalendarDay[]): number {
  let best = 0;
  let run = 0;
  for (const [, count] of days) {
    run = count > 0 ? run + 1 : 0;
    best = Math.max(best, run);
  }
  return best;
}

/** Consecutive active days up to the most recent one; an empty today doesn't break it. */
export function currentStreak(days: CalendarDay[]): number {
  const reversed = [...days].reverse();
  if (reversed[0]?.[1] === 0) reversed.shift();
  let streak = 0;
  for (const [, count] of reversed) {
    if (count === 0) break;
    streak++;
  }
  return streak;
}
