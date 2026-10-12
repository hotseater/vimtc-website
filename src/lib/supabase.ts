import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { createHash } from "node:crypto";

let cached: SupabaseClient | undefined;

/** Server-side client with the service-role key. Returns null when Supabase is not configured. */
export function getSupabase(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  if (!cached) cached = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  return cached;
}

export type SubmissionRecord = {
  form: string;
  senderName: string;
  senderEmail: string;
  fields: Record<string, string>;
  attachments?: string[];
  ip?: string;
  userAgent?: string | null;
};

/**
 * Store a submission. Email delivery is the primary channel, so this never throws:
 * a database problem is logged and the form still reports success to the visitor.
 */
export async function recordSubmission(rec: SubmissionRecord): Promise<void> {
  const db = getSupabase();
  if (!db) return;
  try {
    const { error } = await db.from("form_submissions").insert({
      form: rec.form,
      sender_name: rec.senderName || null,
      sender_email: rec.senderEmail || null,
      fields: rec.fields,
      attachments: rec.attachments ?? [],
      ip_hash: rec.ip && rec.ip !== "unknown" ? createHash("sha256").update(rec.ip).digest("hex") : null,
      user_agent: rec.userAgent?.slice(0, 300) ?? null,
    });
    if (error) console.error("supabase insert failed:", error.message);
  } catch (e) {
    console.error("supabase insert failed:", e);
  }
}
