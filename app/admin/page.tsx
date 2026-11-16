// Private visitor dashboard. Only reachable with the ADMIN_PASSWORD; never indexed.

import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { cookies } from "next/headers";
import Link from "next/link";
import { ADMIN_COOKIE, adminConfigured, isAdminSession } from "@/lib/admin-auth";
import { countryName, shortDay, summarize, when, type Ranked } from "@/lib/visit-stats";
import { allTimeTotals, recentVisits, visitsConfigured } from "@/lib/visits";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Visitors · Mandar Joshi",
  robots: { index: false, follow: false },
};

export default async function Admin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;

  if (!adminConfigured()) {
    return (
      <Shell>
        <Notice title="Set ADMIN_PASSWORD to turn on this page">
          Add an <code>ADMIN_PASSWORD</code> environment variable in Vercel, then redeploy.
        </Notice>
      </Shell>
    );
  }

  const jar = await cookies();
  if (!isAdminSession(jar.get(ADMIN_COOKIE)?.value)) {
    return (
      <Shell>
        <form className="card admin-login" action="/api/admin/login" method="post">
          <p className="eyebrow">Private</p>
          <h1>Visitors</h1>
          <p className="muted">Enter the admin password to see who has visited.</p>
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            required
            autoFocus
            aria-label="Password"
          />
          {error && <p className="admin-error">That password didn&apos;t work.</p>}
          <button className="btn btn-primary" type="submit">
            Sign in
          </button>
        </form>
      </Shell>
    );
  }

  if (!visitsConfigured()) {
    return (
      <Shell>
        <Notice title="Connect Supabase to start logging visits">
          Set <code>SUPABASE_URL</code> and <code>SUPABASE_SERVICE_ROLE_KEY</code> in Vercel and redeploy.
        </Notice>
      </Shell>
    );
  }

  let data: ReturnType<typeof summarize>;
  let totals: { visits: number; visitors: number };
  try {
    const [visits, allTime] = await Promise.all([
      recentVisits(30),
      allTimeTotals(),
    ]);
    data = summarize(visits);
    totals = allTime;
  } catch (e) {
    return (
      <Shell>
        <Notice title="Couldn't load visits">{String(e)}</Notice>
      </Shell>
    );
  }

  const max = Math.max(1, ...data.days.map((d) => d.visits));

  return (
    <Shell signedIn>
      <header className="admin-head">
        <div>
          <p className="eyebrow">Private</p>
          <h1>Visitors</h1>
          <p className="muted">
            Last 30 days, in India time. Your own visits aren&apos;t counted while you&apos;re signed in.
          </p>
        </div>
      </header>

      <dl className="admin-stats">
        <Stat label="Today" w={data.today} />
        <Stat label="Last 7 days" w={data.week} />
        <Stat label="Last 30 days" w={data.month} />
        <Stat label="All time" w={totals} />
      </dl>

      <figure className="card admin-chart" aria-labelledby="daily-title">
        <figcaption className="chart-head">
          <h3 id="daily-title">Visits per day</h3>
          <p className="muted small">
            {data.returning} returning {data.returning === 1 ? "visitor" : "visitors"} this month
          </p>
        </figcaption>
        <div className="admin-bars" role="list">
          {data.days.map((d) => (
            <div
              key={d.date}
              className="admin-bar"
              role="listitem"
              title={`${shortDay(d.date)}: ${d.visits} ${d.visits === 1 ? "visit" : "visits"}, ${d.visitors} ${d.visitors === 1 ? "visitor" : "visitors"}`}
            >
              <span
                className={d.visits > 0 ? "admin-bar-fill" : "admin-bar-fill zero"}
                style={{ "--h": `${(d.visits / max) * 100}%` } as CSSProperties}
              >
                {d.visits > 0 && <em>{d.visits}</em>}
              </span>
            </div>
          ))}
        </div>
        <div className="admin-axis muted">
          <span>{shortDay(data.days[0].date)}</span>
          <span>{shortDay(data.days[data.days.length - 1].date)}</span>
        </div>
      </figure>

      <div className="admin-grid">
        <List title="Came from" items={data.sources} />
        <List title="Countries" items={data.countries} code />
        <List title="Companies and networks" items={data.orgs} empty="Shows up once visits are logged on Vercel" />
        <List title="Devices" items={data.devices} more={{ title: "Browsers", items: data.browsers }} />
      </div>

      <section className="card admin-people">
        <div className="chart-head">
          <h3>Who visited</h3>
          <p className="muted small">One row per visitor, most recent first</p>
        </div>
        {data.people.length === 0 ? (
          <p className="muted admin-empty">No visits yet. They&apos;ll appear here as people open the site.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th scope="col">Last seen</th>
                  <th scope="col">Location</th>
                  <th scope="col">Company or network</th>
                  <th scope="col">Came from</th>
                  <th scope="col">Device</th>
                  <th scope="col" className="num">
                    Visits
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.people.map((p) => (
                  <tr key={p.id}>
                    <td className="nowrap">{when(p.lastSeen)}</td>
                    <td>
                      <Country code={p.country} /> {p.location}
                    </td>
                    <td>{p.org ?? <span className="muted">Unknown</span>}</td>
                    <td>{p.source}</td>
                    <td className="muted">{p.device}</td>
                    <td className="num">
                      {p.visits}
                      {p.visits > 1 && <span className="admin-returning">returning</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </Shell>
  );
}

function Shell({ children, signedIn = false }: { children: React.ReactNode; signedIn?: boolean }) {
  return (
    <main className="admin">
      <nav className="container admin-nav">
        <Link href="/" className="brand">
          <span className="brand-mark">MJ</span>
          <span className="brand-name">Mandar Joshi</span>
        </Link>
        {signedIn && (
          <form action="/api/admin/logout" method="post">
            <button className="btn btn-small" type="submit">
              Sign out
            </button>
          </form>
        )}
      </nav>
      <div className="container admin-body">{children}</div>
    </main>
  );
}

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card admin-notice">
      <h1>{title}</h1>
      <p className="muted">{children}</p>
    </div>
  );
}

function Stat({ label, w }: { label: string; w: { visits: number; visitors: number } }) {
  return (
    <div className="card admin-stat">
      <dt>{label}</dt>
      <dd>{w.visits.toLocaleString("en-US")}</dd>
      <p className="muted small">
        {w.visitors.toLocaleString("en-US")} {w.visitors === 1 ? "visitor" : "visitors"}
      </p>
    </div>
  );
}

function Country({ code }: { code: string | null }) {
  return (
    <span className="admin-cc" title={countryName(code)}>
      {code ?? "??"}
    </span>
  );
}

function Bars({ items, code = false }: { items: Ranked[]; code?: boolean }) {
  const top = Math.max(1, ...items.map((i) => i.count));
  return (
    <ol>
      {items.map((i) => (
        <li key={i.label} style={{ "--w": `${(i.count / top) * 100}%` } as CSSProperties}>
          <span>
            {code ? (
              <>
                <Country code={i.label} /> {countryName(i.label)}
              </>
            ) : (
              i.label
            )}
          </span>
          <b>{i.count}</b>
        </li>
      ))}
    </ol>
  );
}

function List({
  title,
  items,
  empty = "Nothing yet",
  code = false,
  more,
}: {
  title: string;
  items: Ranked[];
  empty?: string;
  code?: boolean;
  more?: { title: string; items: Ranked[] };
}) {
  return (
    <section className="card admin-list">
      <h3>{title}</h3>
      {items.length === 0 ? <p className="muted small">{empty}</p> : <Bars items={items} code={code} />}
      {more && more.items.length > 0 && (
        <>
          <h3 className="admin-list-more">{more.title}</h3>
          <Bars items={more.items} />
        </>
      )}
    </section>
  );
}
