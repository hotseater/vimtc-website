# vimtc-website

Rebuild of [www.vimtc.org](https://www.vimtc.org) (Victory International Ministry Training College) from a Proweaver-built WordPress site to Next.js 16 on Vercel. Like-for-like: same URLs, content, images and styling.

- **`main`** — the new site.
- **`export`** — raw export of the old WordPress site (theme, uploads, database dump). Reference only; never deployed. The SQL dump contains credentials, so this repo stays private until that branch is purged (see the plan, Phase 7).

Read [`docs/MIGRATION-PLAN.md`](docs/MIGRATION-PLAN.md) for the full inventory, decisions, cutover and open client questions.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in Resend + Turnstile keys; forms work without them in preview but will not send
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
npm run lint && npm run typecheck
```

## How it is put together

| Folder | Purpose |
|---|---|
| `content/pages.json`, `content/pages/*.html` | Page metadata and body HTML extracted from the WordPress database by `scripts/extract-content.mjs`. Edit the HTML files to change page copy. |
| `content/widgets.json`, `content/menus.json` | Home-page / footer blocks and the two menus, also extracted. |
| `src/styles/theme.css` | The original theme's CSS (style.css + media.css + custom CSS + hamburger icon), ported as-is with font variables and new image paths. |
| `src/app/globals.css` | Tailwind import, the theme import, and the small set of overrides needed because the old theme moved DOM nodes with jQuery. |
| `src/components` | Header, nav (with mobile off-canvas menu), hero slider, page banner, breadcrumbs, footer, cookie notice, and the four forms. |
| `src/app/[...slug]/page.tsx` | Renders every content page at its original URL (static at build time). |
| `src/app/api/{contact,appointment,apply}` | Form handlers: honeypot + rate limit + Cloudflare Turnstile, then email via Resend to `MAIL_TO`. |
| `next.config.ts` | Permanent redirects for the old WordPress URLs (uploads, theme images, `/home`, the old PHP form URL). |

Re-running the extraction (only needed if the export changes):

```bash
node scripts/extract-content.mjs "/path/to/w13160.sql"
```

## Database (Supabase)

Form submissions are emailed **and** stored in a Supabase Postgres table (`public.form_submissions`), replacing the old site's `formdatabase_emails` MySQL table. The site works without Supabase; the insert is skipped when `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` are unset and never blocks the email.

```bash
# one-time, from a machine that can reach the database (needs SUPABASE_DB_URL):
npm run db:migrate                                   # applies supabase/migrations/*.sql
npm run db:import-legacy -- /path/to/w13160.sql      # imports the 21 messages from the old WordPress site
npm run db:import-legacy -- --dry-run /path/to/w13160.sql   # parse only, write nothing
```

The table has row-level security on and no grants for the anon key, so it is readable only in the Supabase dashboard and writable only by the site's server-side code.

## Environment variables

See `.env.example`. `RESEND_API_KEY`, `MAIL_FROM`, `MAIL_TO` are required for forms to deliver. `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` turn on spam protection; when unset the widget is skipped so preview deployments still work. `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` enable submission storage (set these on Vercel too). `SUPABASE_DB_URL` is only for the two database scripts and must not be set on Vercel.
