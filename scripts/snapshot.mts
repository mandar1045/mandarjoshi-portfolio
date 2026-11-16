// Refreshes lib/data/snapshot.json, the data the site falls back to when
// GitHub or Hex can't be reached. Run with: npm run snapshot
// Set GITHUB_TOKEN to avoid GitHub's unauthenticated rate limit.

import { writeFileSync } from "node:fs";
import { getSnapshot } from "../lib/github";
import type { LibraryStats } from "../lib/types";

const lib = (l: LibraryStats) => ({
  stars: l.stars,
  version: l.version,
  downloads: l.downloads,
  released_on: l.releasedOn,
});

const s = await getSnapshot();

writeFileSync(
  new URL("../lib/data/snapshot.json", import.meta.url),
  JSON.stringify(
    {
      fetched_at: s.fetchedAt,
      merged: s.merged,
      open: s.open,
      issues: s.issues,
      library: lib(s.library),
      infusion: lib(s.infusion),
      twilio: lib(s.twilio),
      calendar: s.calendar,
    },
    null,
    2,
  ) + "\n",
);

console.log(
  `Wrote lib/data/snapshot.json: ${s.merged.length} merged, ${s.open.length} open, ` +
    `${s.calendar?.length ?? 0} calendar days`,
);
