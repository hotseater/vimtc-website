import { NextResponse } from "next/server";
import { EnvConfigError } from "@/lib/env";

/** Cloudflare Turnstile verification. Skipped (allowed) when no secret is configured, so previews work without keys. */
export async function verifyTurnstile(token: string | null, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}

/** Tiny in-memory rate limit per IP (per serverless instance). Good enough to blunt form spam bursts. */
const hits = new Map<string, number[]>();
export function rateLimited(ip: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > limit;
}

export function clientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function str(fd: FormData, key: string, max = 2000): string {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export function all(fd: FormData, key: string): string {
  return fd
    .getAll(key)
    .filter((v): v is string => typeof v === "string")
    .join(", ");
}

export function errorResponse(e: unknown) {
  if (e instanceof EnvConfigError) {
    console.error(e.message);
    return NextResponse.json({ ok: false, error: "The mail service is not configured yet. Please call or email us instead." }, { status: 503 });
  }
  console.error(e);
  return NextResponse.json({ ok: false, error: "Failed to send. Please try again or email us directly." }, { status: 500 });
}

/** Shared pre-checks for every form route. Returns a response to send, or null to continue. */
export async function guard(req: Request, fd: FormData): Promise<NextResponse | null> {
  const ip = clientIp(req);
  if (rateLimited(ip)) return NextResponse.json({ ok: false, error: "Too many submissions. Please try again later." }, { status: 429 });
  if (str(fd, "website")) return NextResponse.json({ ok: true }); // honeypot filled → pretend success
  if (!(await verifyTurnstile(str(fd, "cf-turnstile-response", 5000) || null, ip)))
    return NextResponse.json({ ok: false, error: "Verification failed. Please try again." }, { status: 400 });
  return null;
}
