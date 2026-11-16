// A single-password login for /admin. The session cookie holds an HMAC of a
// fixed message keyed by ADMIN_PASSWORD, so changing the password logs every
// browser out.

import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "mj_admin";

const sessionToken = (password: string) =>
  createHmac("sha256", password).update("mandarjoshi.me admin session v1").digest("base64url");

const sameText = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD);

export function passwordMatches(attempt: string): boolean {
  const password = process.env.ADMIN_PASSWORD;
  return Boolean(password) && sameText(sessionToken(attempt), sessionToken(password!));
}

export function newSession(): string {
  return sessionToken(process.env.ADMIN_PASSWORD!);
}

export function isAdminSession(cookie: string | undefined): boolean {
  const password = process.env.ADMIN_PASSWORD;
  return Boolean(password && cookie) && sameText(cookie!, sessionToken(password!));
}
