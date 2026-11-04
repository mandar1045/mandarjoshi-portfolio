# mandarjoshi.me

My personal site: a small Phoenix app with server-rendered HEEx, one stylesheet, and one small script
that only adds scroll animations (the page is complete without it).

The open source section is built from the GitHub API. `Portfolio.Activity` is a GenServer that
starts from the committed snapshot in `priv/data/snapshot.json`, refreshes every hour, and keeps
the last good data if GitHub is down. Counts update on their own; the highlighted PRs are picked
in `Portfolio.Contributions` and show as merged or in review from the live data.

## Running locally

```sh
mix setup
mix phx.server          # http://localhost:4000
mix test
```

## Layout

| Path | What |
| --- | --- |
| `lib/portfolio/profile.ex` | Bio, experience, projects, the Stampede write-up |
| `lib/portfolio/contributions.ex` | Project names, excluded repos, hand-picked highlight PRs |
| `lib/portfolio/github.ex` | GitHub search and Hex API client |
| `lib/portfolio/activity.ex` | Hourly refresh, cached in `:persistent_term` |
| `lib/portfolio/calendar.ex` | Contribution graph layout and streaks |
| `priv/static/js/app.js` | Scroll reveals, count-ups, nav highlight |
| `lib/portfolio_web/controllers/page_html/home.html.heex` | The page |
| `priv/static/` | CSS, favicon, resume and CV PDFs |
| `resume/` | LaTeX sources for the resume and CV |

## Refreshing the snapshot

```sh
GITHUB_TOKEN=$(gh auth token) mix portfolio.snapshot
```

## Deploying

The `Dockerfile` builds a release that runs on any container host.

| Variable | |
| --- | --- |
| `GITHUB_TOKEN` | Recommended. Without it GitHub allows 60 requests an hour per IP, and the contribution graph is read from your public profile page instead of the GraphQL API. A fine-grained token with no extra permissions is enough. |
| `PHX_HOST` | Defaults to `mandarjoshi.me` |
| `PORT` | Defaults to `4000` |
| `SECRET_KEY_BASE` | Optional. The site sets no cookies. |

On Fly.io, for example:

```sh
fly launch --no-deploy
fly secrets set GITHUB_TOKEN=...
fly deploy
fly certs add mandarjoshi.me
```

Health check: `GET /healthz`.
