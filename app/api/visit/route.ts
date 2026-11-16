// Receives the page-view beacon sent by public/js/app.js and records it.
// Always answers 204 so a tracking problem never shows up for a visitor.

import { cookies } from "next/headers";
import { ADMIN_COOKIE, isAdminSession } from "@/lib/admin-auth";
import { clientIp, describeAgent, geo, insertVisit, isBot, orgOf, sourceOf, visitorId, visitsConfigured } from "@/lib/visits";

export const dynamic = "force-dynamic";

const noContent = () => new Response(null, { status: 204 });

export async function POST(request: Request) {
  if (!visitsConfigured()) return noContent();

  // Don't count my own visits: being logged in to /admin marks this browser.
  const jar = await cookies();
  if (isAdminSession(jar.get(ADMIN_COOKIE)?.value)) return noContent();

  let body: { path?: unknown; referrer?: unknown; tag?: unknown };
  try {
    const text = await request.text();
    if (text.length > 4000) return noContent();
    body = JSON.parse(text);
  } catch {
    return noContent();
  }

  const path = typeof body.path === "string" && body.path.startsWith("/") ? body.path.slice(0, 200) : "/";
  if (path.startsWith("/admin")) return noContent();

  const headers = request.headers;
  const userAgent = (headers.get("user-agent") ?? "").slice(0, 400);
  const ip = clientIp(headers);
  const bot = isBot(userAgent);
  const { source, referrer } = sourceOf(
    typeof body.referrer === "string" ? body.referrer : "",
    typeof body.tag === "string" ? body.tag.trim() : "",
    headers.get("host"),
  );

  try {
    await insertVisit({
      visitor_id: visitorId(ip, userAgent),
      path,
      source,
      referrer,
      ...geo(headers),
      org: bot ? null : await orgOf(ip),
      ...describeAgent(userAgent),
      is_bot: bot,
    });
  } catch (error) {
    console.error("Couldn't record visit:", error);
  }

  return noContent();
}
