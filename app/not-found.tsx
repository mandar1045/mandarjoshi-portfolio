import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container" style={{ padding: "8rem 1.5rem", textAlign: "center" }}>
      <p className="eyebrow">404</p>
      <h1 style={{ marginTop: "0.75rem", fontSize: "2.4rem" }}>This page doesn&apos;t exist</h1>
      <p className="muted" style={{ marginTop: "0.75rem" }}>
        It may have moved when the site was rebuilt.
      </p>
      <p style={{ marginTop: "2rem" }}>
        <Link className="btn btn-primary" href="/">
          Back to the homepage
        </Link>
      </p>
    </main>
  );
}
