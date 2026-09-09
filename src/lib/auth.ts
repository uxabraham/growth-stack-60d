import crypto from "crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "gs60d_admin_session";

const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "growthstack60d";
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET || "empirika-growth-stack-60d-dev-secret";

function sessionToken(): string {
  return crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(ADMIN_USER + ":" + ADMIN_PASSWORD)
    .digest("hex");
}

export function verifyCredentials(user: string, password: string): boolean {
  const validUser = crypto.timingSafeEqual(
    Buffer.from(user.padEnd(64)),
    Buffer.from(ADMIN_USER.padEnd(64))
  );
  const validPassword = crypto.timingSafeEqual(
    Buffer.from(password.padEnd(64)),
    Buffer.from(ADMIN_PASSWORD.padEnd(64))
  );
  return validUser && validPassword;
}

export function getSessionCookieValue(): string {
  return sessionToken();
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const cookie = store.get(SESSION_COOKIE)?.value;
  if (!cookie) return false;
  try {
    return crypto.timingSafeEqual(
      Buffer.from(cookie),
      Buffer.from(sessionToken())
    );
  } catch {
    return false;
  }
}
