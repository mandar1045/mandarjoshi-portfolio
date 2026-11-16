import { NextResponse } from "next/server";
import { ADMIN_COOKIE, newSession, passwordMatches } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const form = await request.formData();
  const password = String(form.get("password") ?? "");
  const url = new URL("/admin", request.url);

  if (!passwordMatches(password)) {
    // Slow down guessing.
    await new Promise((resolve) => setTimeout(resolve, 800));
    url.searchParams.set("error", "1");
    return NextResponse.redirect(url, 303);
  }

  const response = NextResponse.redirect(url, 303);
  response.cookies.set(ADMIN_COOKIE, newSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 180,
  });
  return response;
}
