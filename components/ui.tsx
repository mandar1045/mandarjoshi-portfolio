import type { ReactNode } from "react";
import { Icon } from "./Icon";

export function SectionHead({
  eyebrow,
  title,
  children,
  action,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <header className="section-head" data-reveal="">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {children && <p className="section-sub">{children}</p>}
      </div>
      {action && <div>{action}</div>}
    </header>
  );
}

export function Status({ state }: { state: "merged" | "open" }) {
  return (
    <span className={`status status-${state}`}>
      {state === "merged" ? <Icon name="git-merge" /> : <span className="live-dot" aria-hidden="true" />}
      {state === "merged" ? "Merged" : "In review"}
    </span>
  );
}
