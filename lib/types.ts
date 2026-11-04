export type PullRequest = {
  repo: string;
  number: number;
  title: string;
  url: string;
  /** YYYY-MM-DD: merge date for merged PRs, creation date for open ones. */
  date: string;
};

/** [YYYY-MM-DD, contribution count, level 0-4] */
export type CalendarDay = [string, number, number];

export type Snapshot = {
  fetchedAt: string;
  merged: PullRequest[];
  open: PullRequest[];
  issues: Record<string, number>;
  library: { stars: number; version: string; downloads: number; releasedOn: string | null };
  calendar: CalendarDay[] | null;
};
