import type { CSSProperties } from "react";
import { ContributionGraph } from "@/components/ContributionGraph";
import { Icon } from "@/components/Icon";
import { SectionHead, Status } from "@/components/ui";
import { buildCalendar } from "@/lib/calendar";
import { highlights as getHighlights, latest as getLatest, projectName, projects as getProjects } from "@/lib/contributions";
import {
  ago,
  cleanTitle,
  inlineCode,
  localTime,
  minorVersion,
  number,
  prRef,
  searchUrl,
  sentence,
  shortDate,
} from "@/lib/format";
import { getSnapshot } from "@/lib/github";
import { education, experience, library, profile, projects as builds, skills } from "@/lib/profile";

// Rebuilt at most once an hour with fresh GitHub and Hex data.
export const revalidate = 3600;

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

export default async function Home() {
  const snapshot = await getSnapshot();
  const projects = getProjects(snapshot);
  const highlights = getHighlights(snapshot);
  const latest = getLatest(snapshot);
  const calendar = buildCalendar(snapshot.calendar);
  const user = profile.githubUser;
  const fetched = snapshot.fetchedAt.slice(0, 10);

  return (
    <>
      <header className="nav">
        <div className="progress" aria-hidden="true">
          <span />
        </div>
        <div className="container nav-inner">
          <a href="#top" className="brand">
            <span className="brand-mark">MJ</span>
            <span className="brand-name">Mandar Joshi</span>
          </a>
          <nav className="nav-links" aria-label="Sections">
            <a href="#stampede">Stampede</a>
            <a href="#open-source">Open source</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
          </nav>
          <div className="nav-actions">
            <a className="icon-btn" href={profile.github} aria-label="GitHub">
              <Icon name="github" />
            </a>
            <a className="icon-btn" href={profile.x} aria-label="X">
              <Icon name="x" />
            </a>
            <a className="btn btn-small" href={profile.resume}>
              <Icon name="file-text" /> Resume
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <section id="about" className="hero" data-parallax="">
          <div className="hero-glows" aria-hidden="true">
            <span className="g1" />
            <span className="g2" />
          </div>
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow-pill">
                <span className="logo-stack">
                  {projects
                    .slice(0, 3)
                    .filter((p) => p.logo)
                    .map((p) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={p.name} src={p.logo!} alt="" width={20} height={20} />
                    ))}
                </span>
                Contributing to {sentence(projects.slice(0, 3).map((p) => p.name))}
              </p>
              <h1>Mandar Joshi</h1>
              <p className="hero-title">
                Software engineer working on{" "}
                <span className="hl rotator" data-rotate="backend systems|distributed systems|realtime services">
                  backend systems
                </span>
                <br className="br-wide" /> and the <span className="hl">open source infrastructure</span> they run on.
              </p>
              <p className="hero-lede">
                I fix bugs in Supabase Realtime, the Elixir formatter and FOSSology, covering auth security, API
                performance, memory safety and developer tooling. I also wrote and maintain{" "}
                <a href="#stampede">Stampede</a>, a load-testing library for Phoenix.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href={profile.github}>
                  <Icon name="github" /> View my GitHub
                </a>
                <a className="btn" href={profile.resume}>
                  <Icon name="file-text" /> Resume
                </a>
                <a className="icon-btn bordered" href={profile.linkedin} aria-label="LinkedIn">
                  <Icon name="linkedin" />
                </a>
                <a className="icon-btn bordered" href={profile.x} aria-label="X">
                  <Icon name="x" />
                </a>
                <a className="icon-btn bordered" href={`mailto:${profile.email}`} aria-label="Email">
                  <Icon name="mail" />
                </a>
              </div>
            </div>

            <figure className="hero-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/profile.jpg" alt="Mandar Joshi" width={400} height={400} />
              <figcaption>
                <span className="status-dot" />
                {profile.badge}
              </figcaption>
            </figure>
          </div>

          <div className="container">
            <section className="now" aria-label="What I'm up to" data-stagger="">
              <a className="now-cell spot" href={library.hex}>
                <span className="now-label">
                  <Icon name="package" /> Latest release
                </span>
                <span className="now-main">Stampede v{snapshot.library.version}</span>
                <span className="now-sub">
                  on Hex{snapshot.library.releasedOn && <span> · {ago(snapshot.library.releasedOn)}</span>}
                </span>
              </a>
              {latest.merged && (
                <a className="now-cell spot" href={latest.merged.url}>
                  <span className="now-label">
                    <Icon name="git-merge" /> Latest merge
                  </span>
                  <span className="now-main">{inlineCode(cleanTitle(latest.merged.title))}</span>
                  <span className="now-sub">
                    {projectName(latest.merged)} · {ago(latest.merged.date)}
                  </span>
                </a>
              )}
              {latest.open && (
                <a className="now-cell spot" href={latest.open.url}>
                  <span className="now-label">
                    <span className="live-dot" aria-hidden="true" /> In review
                  </span>
                  <span className="now-main">{inlineCode(cleanTitle(latest.open.title))}</span>
                  <span className="now-sub">
                    {projectName(latest.open)} · opened {ago(latest.open.date)}
                  </span>
                </a>
              )}
              <div className="now-cell">
                <span className="now-label">
                  <Icon name="clock" /> Local time
                </span>
                <span className="now-main now-clock" data-clock="Asia/Kolkata" suppressHydrationWarning>
                  {localTime()}
                </span>
                <span className="now-sub">{profile.timezone}</span>
              </div>
            </section>
          </div>
        </section>

        <section id="stampede" className="section">
          <div className="container">
            <SectionHead eyebrow="Library" title="Stampede">
              {library.tagline}
            </SectionHead>

            <div className="showcase" data-reveal="">
              <div className="showcase-copy">
                <div className="meta-row">
                  <span className="tag tag-accent">v{snapshot.library.version}</span>
                  <span className="meta">
                    <Icon name="star" /> {number(snapshot.library.stars)}
                  </span>
                  <span className="meta">
                    <Icon name="download" /> {number(snapshot.library.downloads)} downloads
                  </span>
                  <span className="meta">
                    <Icon name="package" /> Hex
                  </span>
                </div>
                <p className="showcase-desc">{library.description}</p>
                <ul className="feature-list">
                  {library.features.map(({ flag, what }) => (
                    <li key={what}>
                      <span className="check" aria-hidden="true" />
                      <span>
                        {flag && <code>{flag}</code>} {what}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="chips">
                  {library.tags.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="hero-actions">
                  <a className="btn btn-primary" href={library.github}>
                    <Icon name="github" /> Source
                  </a>
                  <a className="btn" href={library.docs}>
                    <Icon name="book-open" /> Docs
                  </a>
                  <a className="btn" href={library.hex}>
                    <Icon name="package" /> Hex
                  </a>
                </div>
              </div>

              <div className="terminal" aria-label="Example Stampede run" data-reveal="">
                <div className="terminal-bar">
                  <span />
                  <span />
                  <span />
                  <p>loadtest/lobby.exs</p>
                </div>
                <pre>
                  <code>
                    <span className="ln" style={v({ "--l": 0 })}>
                      <span className="t-dim"># mix.exs</span>
                    </span>
                    <span className="ln" style={v({ "--l": 1 })}>
                      {"{"}
                      <span className="t-atom">:stampede</span>, <span className="t-str">{`"~> ${minorVersion(snapshot.library.version)}"`}</span>
                      {"}"}
                    </span>
                    <span className="ln" style={v({ "--l": 2 })}>
                      {" "}
                    </span>
                    <span className="ln cmd" style={v({ "--l": 3 })}>
                      <span className="t-prompt">$</span> <span className="type">mix stampede.run loadtest/lobby.exs</span>
                      <span className="caret" aria-hidden="true" />
                    </span>
                    <span className="ln out" style={v({ "--l": 4 })}>
                      <span className="t-bold">Demo.Chat ran for 15.0s</span>
                    </span>
                    <span className="ln out" style={v({ "--l": 5 })}>
                      <span className="t-dim">{"  metric          count   rate/s      p95"}</span>
                    </span>
                    <span className="ln out" style={v({ "--l": 6 })}>
                      {"  channel.join     6000   399.89  31.90ms"}
                    </span>
                    <span className="ln out" style={v({ "--l": 7 })}>
                      {"  channel.push   139348  9287.39  11.27ms"}
                    </span>
                    <span className="ln out" style={v({ "--l": 8 })}>
                      {"  ws.connect       6000   399.89  35.25ms"}
                    </span>
                    <span className="ln out" style={v({ "--l": 9 })}>
                      <span className="t-dim">{"  thresholds"}</span>
                    </span>
                    <span className="ln out" style={v({ "--l": 10 })}>
                      {"    "}
                      <span className="t-ok">pass</span>
                      {"  channel.join p95 <= 500ms"}
                    </span>
                    <span className="ln out" style={v({ "--l": 11 })}>
                      {"    "}
                      <span className="t-ok">pass</span>
                      {"  iteration.errors count <= 0"}
                    </span>
                  </code>
                </pre>
              </div>
            </div>

            <div className="results" data-stagger="">
              {library.results.map((r) => (
                <div key={r.held} className="result spot">
                  <p className="result-num" data-count="">
                    {r.held}
                  </p>
                  <p className="result-unit">{r.unit}</p>
                  <p className="result-target">{r.target}</p>
                  <p className="result-machine">{r.machine}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="open-source" className="section">
          <div className="container">
            <SectionHead
              eyebrow="Open source"
              title="Upstream contributions"
              action={
                <a className="btn btn-small" href={searchUrl(user)}>
                  All PRs on GitHub <Icon name="arrow-up-right" />
                </a>
              }
            >
              Bugs fixed in the projects other teams depend on. Numbers are pulled live from GitHub.
            </SectionHead>

            <ContributionGraph calendar={calendar} />

            <div className="highlights" data-stagger="">
              {highlights.map((project) => (
                <article key={project.name} className="project-card spot">
                  <header className="project-head">
                    {project.logo && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={project.logo} alt="" width={44} height={44} className="logo logo-lg" />
                    )}
                    <div className="project-id">
                      <h3>{project.name}</h3>
                      <p className="muted">{inlineCode(project.subtitle)}</p>
                    </div>
                    <div className="pills">
                      <span className="pill pill-merged">
                        <Icon name="git-merge" /> {project.merged} merged
                      </span>
                      {project.open > 0 && (
                        <span className="pill">
                          <Icon name="git-pull-request" /> {project.open} in review
                        </span>
                      )}
                      {project.issues > 0 && (
                        <span className="pill">
                          <Icon name="circle-dot" /> {project.issues} issues
                        </span>
                      )}
                    </div>
                  </header>

                  <ul className="picks">
                    {project.highlights.map((item) => (
                      <li key={item.pr.url}>
                        <a className="pick spot" href={item.pr.url}>
                          <span className="pick-meta">
                            <span className="pr-ref">{prRef(item.pr)}</span>
                            <Status state={item.state} />
                          </span>
                          <span className="pick-title">{inlineCode(item.headline)}</span>
                          <span className="pick-note">{inlineCode(item.note)}</span>
                          <span className="pick-go">
                            View pull request <Icon name="arrow-up-right" />
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>

                  <footer className="project-foot">
                    {project.tech.length > 0 && (
                      <div className="chips chips-sm">
                        {project.tech.map((t) => (
                          <span key={t} className="chip">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <a className="project-link" href={searchUrl(user, project.owners)}>
                      All {project.name} PRs <Icon name="arrow-up-right" />
                    </a>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section">
          <div className="container">
            <SectionHead eyebrow="Experience" title="Where I've worked" />
            <ol className="timeline" data-stagger="">
              {experience.map((job) => (
                <li key={job.role} className="timeline-item">
                  <span className="timeline-dot" aria-hidden="true" />
                  <div className="card spot">
                    <header className="entry-head">
                      <div>
                        <h4>{job.role}</h4>
                        <p className="muted">{job.company}</p>
                      </div>
                      <span className="date-chip">{job.date}</span>
                    </header>
                    <ul className="bullets">
                      {job.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                    <div className="chips chips-sm">
                      {job.stack.map((t) => (
                        <span key={t} className="chip">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="container">
            <SectionHead eyebrow="Projects" title="Things I've built" />
            <div className="project-grid" data-stagger="">
              {builds.map((project) => (
                <article key={project.name} className="card build-card spot">
                  <header className="entry-head">
                    <div>
                      <h4>{project.name}</h4>
                      <p className="muted">{project.what}</p>
                    </div>
                    <div className="build-links">
                      {project.source && (
                        <a className="icon-btn bordered" href={project.source} aria-label={`${project.name} source`}>
                          <Icon name="github" />
                        </a>
                      )}
                      <a className="icon-btn bordered" href={project.url} aria-label={`Visit ${project.name}`}>
                        <Icon name="arrow-up-right" />
                      </a>
                    </div>
                  </header>
                  <ul className="bullets">
                    {project.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <div className="chips chips-sm">
                    {project.stack.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="background" className="section">
          <div className="container">
            <SectionHead eyebrow="Background" title="Education and skills" />
            <div className="background-grid" data-stagger="">
              <article className="card edu-card">
                <p className="eyebrow">Education</p>
                <h4>{education.school}</h4>
                <p>{education.degree}</p>
                <p className="muted">
                  {education.date} · {education.location}
                </p>
                <p className="muted small">{education.coursework}</p>
              </article>
              <article className="card">
                {skills.map(([label, items]) => (
                  <div key={label} className="skill-group">
                    <p className="eyebrow">{label}</p>
                    <div className="chips">
                      {items.map((item) => (
                        <span key={item} className="chip">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="cta" data-reveal="">
              <div>
                <h2>
                  Let&apos;s <span>talk</span>
                </h2>
                <p>For roles, collaborations, or a bug you can&apos;t pin down, email is the fastest way to reach me.</p>
              </div>
              <div className="hero-actions">
                <a className="btn btn-primary" href={`mailto:${profile.email}`}>
                  <Icon name="mail" /> {profile.email}
                </a>
                <a className="btn" href={profile.linkedin}>
                  <Icon name="linkedin" /> LinkedIn
                </a>
                <a className="btn" href={profile.x}>
                  <Icon name="x" /> X
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <p>© {fetched.slice(0, 4)} Mandar Joshi</p>
          <p>
            GitHub data refreshed hourly, last on{" "}
            <time dateTime={snapshot.fetchedAt}>
              {shortDate(fetched)}, {fetched.slice(0, 4)}
            </time>{" "}
            · <a href="https://github.com/mandar1045/mandarjoshi-portfolio">Source</a>
          </p>
        </div>
      </footer>
    </>
  );
}
