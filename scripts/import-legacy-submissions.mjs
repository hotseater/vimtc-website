#!/usr/bin/env node
/**
 * One-off: import the submissions stored by the old WordPress site (formdatabase_emails)
 * into public.form_submissions. Reads the SQL dump directly so no personal data is committed.
 *
 *   SUPABASE_DB_URL=postgresql://... node scripts/import-legacy-submissions.mjs /path/to/w13160.sql
 *
 * Re-running is safe: rows are matched on legacy_id.
 */
import { readFileSync } from "node:fs";
import pg from "pg";

const dryRun = process.argv.includes("--dry-run");
const dumpPath = process.argv.slice(2).find((a) => !a.startsWith("--"));
const url = process.env.SUPABASE_DB_URL;
if ((!url && !dryRun) || !dumpPath) {
  console.error("usage: SUPABASE_DB_URL=... node scripts/import-legacy-submissions.mjs <w13160.sql>");
  process.exit(1);
}

// --- minimal INSERT parser (same approach as extract-content.mjs) ---
const sql = readFileSync(dumpPath, "utf8");
function parseValues(s, i) {
  const rows = [];
  const ws = (c) => c === " " || c === "\n" || c === "\r" || c === "\t";
  while (i < s.length) {
    while (i < s.length && ws(s[i])) i++;
    if (s[i] !== "(") break;
    i++;
    const row = [];
    for (;;) {
      while (ws(s[i])) i++;
      if (s[i] === "'") {
        i++;
        let buf = "";
        for (;;) {
          const c = s[i];
          if (c === "\\") { buf += { n: "\n", r: "\r", t: "\t", "0": "\0", "\\": "\\", "'": "'", '"': '"' }[s[i + 1]] ?? s[i + 1]; i += 2; }
          else if (c === "'") { if (s[i + 1] === "'") { buf += "'"; i += 2; } else { i++; break; } }
          else { buf += c; i++; }
        }
        row.push(buf);
      } else {
        let j = i;
        while (s[j] !== "," && s[j] !== ")") j++;
        const tok = s.slice(i, j).trim();
        i = j;
        row.push(tok === "NULL" ? null : tok);
      }
      while (ws(s[i])) i++;
      if (s[i] === ",") { i++; continue; }
      if (s[i] === ")") { i++; break; }
    }
    rows.push(row);
    while (i < s.length && ws(s[i])) i++;
    if (s[i] === ",") { i++; continue; }
    if (s[i] === ";") break;
  }
  return rows;
}
// phpMyAdmin splits large tables into several INSERT statements
const rows = [];
for (const m of sql.matchAll(/^INSERT INTO `formdatabase_emails` \(([^)]*)\) VALUES/gm)) {
  const cols = m[1].split(",").map((c) => c.trim().replace(/`/g, ""));
  for (const r of parseValues(sql, m.index + m[0].length)) rows.push(Object.fromEntries(cols.map((c, k) => [c, r[k]])));
}
if (!rows.length) {
  console.error("formdatabase_emails not found in dump");
  process.exit(1);
}

const unescape = (t) => t.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/\\'/g, "'");
const strip = (h) => unescape(h.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "")).replace(/\r\n/g, "\n").trim();

function parseBody(htmlBody) {
  // Proweaver's email: <tr><td><b>Label</b>:</td> <td>value</td></tr>
  const fields = {};
  for (const tr of htmlBody.matchAll(/<tr>(.*?)<\/tr>/gs)) {
    const cells = [...tr[1].matchAll(/<td[^>]*>(.*?)<\/td>/gs)].map((c) => strip(c[1]));
    if (cells.length >= 2) {
      const label = cells[0].replace(/:$/, "").trim();
      if (label && !/^By submitting this form/i.test(label)) fields[label] = cells.slice(1).join(" ").trim();
    }
  }
  return fields;
}

if (dryRun) {
  for (const r of rows) {
    const f = parseBody(r.form_content);
    console.log(`#${r.form_id} ${r.date_sent} [${r.form_subject}] ${r.form_from} <${f["Email Address"] || f["Student Email"] || "?"}> fields=${Object.keys(f).join("|")}`);
  }
  console.log(`dry run: ${rows.length} rows parsed, nothing written`);
  process.exit(0);
}

const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
await client.connect();
let n = 0;
try {
  for (const r of rows) {
    const fields = parseBody(r.form_content);
    const email = fields["Email Address"] || fields["Student Email"] || null;
    const name = r.form_from || fields["Full Name"] || [fields["First Name"], fields["Last Name"]].filter(Boolean).join(" ") || null;
    const status = r.email_type === "trash" ? "archived" : r.status === "read" ? "read" : "new";
    const attachments = r.attachments ? r.attachments.split(",").map((a) => a.trim()).filter(Boolean) : [];
    const res = await client.query(
      `insert into public.form_submissions (submitted_at, form, sender_name, sender_email, fields, attachments, status, source, legacy_id)
       values ($1, $2, $3, $4, $5, $6, $7, 'legacy-wordpress', $8)
       on conflict (legacy_id) where legacy_id is not null do nothing`,
      [new Date(r.date_sent.replace(" ", "T") + "Z"), r.form_subject, name, email, JSON.stringify(fields), attachments, status, Number(r.form_id)],
    );
    n += res.rowCount;
  }
  console.log(`parsed ${rows.length} legacy submissions, inserted ${n} new rows`);
} finally {
  await client.end();
}
