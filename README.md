# mandarjoshi.me

My personal site, built with Next.js and deployed on Vercel. It's one server-rendered page, a
stylesheet, and a small script that only adds animations.

The open source section is built from the GitHub and Hex APIs. `lib/github.ts` fetches merged and
open PRs, issue counts, the contribution calendar and Stampede stats; Next.js caches the page and
rebuilds it at most once an hour. If GitHub can't be reached or rate-limits a request, that piece
falls back to `lib/data/snapshot.json`, so the page always renders.

## Visitor log

`public/js/app.js` sends a small beacon on each page view to `/api/visit`, which records
the time, page, where the visit came from (referrer or `?ref=`/`utm_source` tag), city and
country (from Vercel's geolocation headers), the company or network behind the IP
(via ipapi.co), and the device and browser. Raw IP addresses are never stored; a salted
hash recognises repeat visitors. Bots are flagged and left out of the dashboard.

`/admin` shows the numbers and a "who visited" table. It's protected by `ADMIN_PASSWORD`,
and being signed in also stops your own visits from being counted. The table schema is in
`supabase/migrations/`.

## Running locally

```sh
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint && npm run typecheck
npm run snapshot   # refresh lib/data/snapshot.json (set GITHUB_TOKEN to avoid rate limits)
```

## Layout

| Path | What |
| --- | --- |
| `app/page.tsx` | The page |
| `app/globals.css` | All styles, light and dark themes |
| `public/js/app.js` | Scroll reveals, count-ups, rotating phrase, clock, nav highlight |
| `lib/profile.ts` | Bio, experience, projects, the Stampede write-up |
| `lib/contributions.ts` | Project names, excluded repos, hand-picked highlight PRs |
| `lib/github.ts` | GitHub and Hex fetching, with the snapshot fallback |
| `lib/calendar.ts` | Contribution graph layout and streaks |
| `lib/visits.ts`, `app/api/visit/` | Recording visits |
| `app/admin/`, `lib/visit-stats.ts` | The private visitor dashboard |
| `resume/` | LaTeX sources for the resume and CV |

## Deploying

Pushes to `main` deploy on Vercel. Environment variables:

| Variable | |
| --- | --- |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | The Supabase project holding the visit log |
| `ADMIN_PASSWORD` | Password for `/admin` |
| `VISITOR_SALT` | Any long random string, used to hash visitor IPs |
| `GITHUB_TOKEN` | Optional. GitHub allows 60 unauthenticated requests an hour per IP and Vercel's IPs are shared; a fine-grained token with no extra permissions is enough |
