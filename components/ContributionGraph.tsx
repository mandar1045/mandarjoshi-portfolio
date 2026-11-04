import type { CSSProperties } from "react";
import type { Calendar } from "@/lib/calendar";
import { number, plural, shortDate } from "@/lib/format";
import { profile } from "@/lib/profile";
import { Icon } from "./Icon";

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

export function ContributionGraph({ calendar }: { calendar: Calendar | null }) {
  if (!calendar) return null;
  const [bestDate, bestCount] = calendar.bestDay;

  return (
    <figure className="contrib card" aria-labelledby="contrib-title" data-reveal="">
      <figcaption className="chart-head">
        <div>
          <h3 id="contrib-title">{number(calendar.total)} contributions in the last year</h3>
          <p className="muted small">Commits, pull requests, reviews and issues across GitHub</p>
        </div>
        <a className="btn btn-small" href={profile.github}>
          <Icon name="github" /> @{profile.githubUser}
        </a>
      </figcaption>

      <div className="contrib-scroll" data-scroll-end="">
        <div className="contrib-grid" style={{ "--weeks": calendar.weeks.length } as CSSProperties}>
          <div className="contrib-months" aria-hidden="true">
            {calendar.months.map(([col, label]) => (
              <span key={col} style={{ gridColumn: col + 1 }}>
                {label}
              </span>
            ))}
          </div>
          <div className="contrib-days" aria-hidden="true">
            {DAY_LABELS.map((label, i) => (
              <span key={i}>{label}</span>
            ))}
          </div>
          <div
            className="contrib-cells"
            role="img"
            aria-label={`${calendar.total} contributions in the last year`}
          >
            {calendar.weeks.flatMap((week, w) =>
              week.map((day, d) =>
                day ? (
                  <span
                    key={`${w}-${d}`}
                    className={`cell l${day[2]}`}
                    style={{ "--w": w } as CSSProperties}
                    title={`${plural(day[1], "contribution", "contributions")} on ${shortDate(day[0])}, ${day[0].slice(0, 4)}`}
                  />
                ) : (
                  <span key={`${w}-${d}`} className="cell pad" />
                ),
              ),
            )}
          </div>
        </div>
      </div>

      <div className="contrib-foot">
        <dl className="contrib-stats">
          <div>
            <dt>Active days</dt>
            <dd>{number(calendar.activeDays)}</dd>
          </div>
          <div>
            <dt>Longest streak</dt>
            <dd>{plural(calendar.longestStreak, "day", "days")}</dd>
          </div>
          <div>
            <dt>Current streak</dt>
            <dd>{plural(calendar.currentStreak, "day", "days")}</dd>
          </div>
          <div>
            <dt>Best day</dt>
            <dd>
              {bestCount} <span className="muted">on {shortDate(bestDate)}</span>
            </dd>
          </div>
        </dl>
        <p className="contrib-legend" aria-hidden="true">
          Less <span className="cell l0" />
          <span className="cell l1" />
          <span className="cell l2" />
          <span className="cell l3" />
          <span className="cell l4" /> More
        </p>
      </div>
    </figure>
  );
}
