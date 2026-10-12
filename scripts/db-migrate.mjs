#!/usr/bin/env node
/**
 * Apply supabase/migrations/*.sql to the project's Postgres database, in order, once each.
 *
 *   SUPABASE_DB_URL=postgresql://... node scripts/db-migrate.mjs
 *
 * SUPABASE_DB_URL is the "Connection string" (Session or Transaction pooler, URI form) from
 * Supabase → Project Settings → Database. Applied migrations are recorded in public._migrations.
 */
import { readdirSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const url = process.env.SUPABASE_DB_URL;
if (!url) {
  console.error("SUPABASE_DB_URL is not set");
  process.exit(1);
}
const dir = resolve(dirname(fileURLToPath(import.meta.url)), "../supabase/migrations");
const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
await client.connect();
try {
  await client.query("create table if not exists public._migrations (name text primary key, applied_at timestamptz not null default now())");
  const done = new Set((await client.query("select name from public._migrations")).rows.map((r) => r.name));
  for (const file of readdirSync(dir).filter((f) => f.endsWith(".sql")).sort()) {
    if (done.has(file)) {
      console.log("skip   ", file);
      continue;
    }
    await client.query("begin");
    try {
      await client.query(readFileSync(resolve(dir, file), "utf8"));
      await client.query("insert into public._migrations (name) values ($1)", [file]);
      await client.query("commit");
      console.log("applied", file);
    } catch (e) {
      await client.query("rollback");
      throw e;
    }
  }
} finally {
  await client.end();
}
