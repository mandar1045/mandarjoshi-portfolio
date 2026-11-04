# mandarjoshi.me

My personal site, built with Next.js and deployed on Vercel. It's one server-rendered page, a
stylesheet, and a small script that only adds animations.

The open source section is built from the GitHub and Hex APIs. `lib/github.ts` fetches merged and
open PRs, issue counts, the contribution calendar and Stampede stats; Next.js caches the page and
rebuilds it at most once an hour. If GitHub can't be reached or rate-limits a request, that piece
falls back to `lib/data/snapshot.json`, so the page always renders.

## Running locally

```sh
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint && npm run typecheck
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
| `resume/` | LaTeX sources for the resume and CV |

## Deploying

Pushes to `main` deploy on Vercel. Setting `GITHUB_TOKEN` in the Vercel project's environment
variables is recommended: GitHub allows 60 unauthenticated requests an hour per IP, and Vercel's IPs
are shared. A fine-grained token with no extra permissions is enough.
