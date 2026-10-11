# vimtc.org — Migration plan: WordPress (Proweaver) → Next.js on Vercel

**Status:** plan only, no code yet. **Scope:** like-for-like rebuild, no redesign.
**Source of truth:** the `export` branch of this repo (raw files from the current host, pulled 25 Sep 2026) and its database dump `w13160.sql`.

---

## 1. What the current site is

| Item | Finding |
|---|---|
| Platform | WordPress 6.x, custom theme `victoryinternationalon794` by the agency Proweaver (built on a Twenty Sixteen skeleton) |
| Hosting | Proweaver-managed AWS (EC2 `us-west-2`, RDS MySQL 5.7) at `35.167.241.91`, shared with ~800 other agency sites |
| Database | `w13160`, table prefix `victoryinternationalon_` |
| Published pages | 25 (plus 2 trashed, 2 auto-drafts). No blog posts. |
| Menus | Main Menu (8 items), Footer Menu (9 items) |
| Forms | 4 working forms + 1 payment form, all Proweaver custom PHP, submitted by email to `dean@vimtc.org` and copied to a `formdatabase_emails` table (21 submissions since Dec 2024) |
| SEO | Yoast SEO 15.5, title template `%%sitename%% %%page%% | %%sitedesc%%`, home title "Ministry Training College in Phoenix Arizona", breadcrumbs on inner pages, XML sitemap on. Only one page has a custom Yoast title; **no page has a meta description.** |
| Other plugins | WP Rocket (cache), WP Statistics (analytics, 12k visits logged), CookieYes (cookie banner), Modula (2 one-image galleries), custom-CSS plugin (2 KB of overrides), Proweaver Forms (payment plugin, sandbox mode) |
| Third-party scripts | Google reCAPTCHA v2 on forms, UserWay accessibility widget (account `m1Y1yHo0MY`), Google Maps embed in footer, Google Fonts (Archivo, Questrial) |
| Analytics | WP Statistics only (server-side). No Google Analytics tag found. |
| Search verification | `google8e36b76cb2cc26ff.html` and `BingSiteAuth.xml` at site root |
| Design tokens | Primary `#0E035B`, tertiary `#291C84`, gold gradient `#FCEEA9 → #8E5B03`, body `#4c4c4c`, headings Archivo, body Questrial 18px |
| Social | Facebook `profile.php?id=61558005628887`, X `@VimtcPhx` |
| Contact details | 1-844-443-7500 · dean@vimtc.org · 7702 N 35th Avenue, Suite 2, Phoenix, AZ 85340 |
| Payments | "Tuition Payment" menu link → PayPal hosted donate button `HET2MBJCUKCTA` (opens new tab) |

Traffic by page (WP Statistics, lifetime): home 12,015 views, then About 147, Programs 98, Contact 65, Set an Appointment 60, Faculty 60. Everything else under 55. The home page is effectively the whole site for visitors.

---

## 2. Page inventory and URL map

Every existing URL is kept exactly. Nothing changes in the address bar.

### Main pages

| # | URL (unchanged) | Title | Content source | Notes |
|---|---|---|---|---|
| 1 | `/` | Home | WP page 5 + 15 widget blocks + theme includes | Hero slider (3 images), welcome text, sidebar portrait of Apostle Dr. P. Ray Johnson, "Standard of Excellence" block, Programs row (Certificate / Diploma / View More), Mission statement, Faculty teaser, 3 CTA boxes (Class Schedules / Set an Appointment / Tour Our Campus), footer "Send Us a Message" form |
| 2 | `/ministry-training-college-about-us` | About Us | WP page 11 | Intro banner text, mission copy, President (Bishop Dr. Phillips Banini Sr.), "Our Founders" gallery (1 image: brochure), Denominational Affiliation, Our Beliefs |
| 3 | `/ministry-training-college-programs` | Programs | WP page 10 | 7-tile grid; 3 tiles link to sub-pages, 4 tiles have no page (placeholder images). "Student Application" button |
| 4 | `/ministry-training-college-programs/certificate-in-discipleship` | Certificate in Discipleship | WP page 52 | Course table (Level 1, 10 courses) |
| 5 | `/ministry-training-college-programs/diploma-in-biblical-studies` | Diploma in Biblical Studies | WP page 54 | Course table (10 courses) |
| 6 | `/ministry-training-college-programs/associate-degree-in-ministry` | Associate Degree in Ministry | WP page 110 | Course table (10 courses) |
| 7 | `/ministry-training-college-programs/bachelor-of-arts-in-ministerial-studies` | Bachelor of Arts in Ministerial Studies | WP page 111 | Overview only, no course table |
| 8 | `/ministry-training-college-programs/bachelor-of-arts-in-family-counseling` | Bachelor of Arts in Family Counseling | WP page 183 | **Empty page.** Shows the theme's "We are still updating our website" notice. |
| 9 | `/ministry-training-college-programs/bachelor-of-arts-in-ministerial-chaplaincy-cpe` | Bachelor of Arts in Ministerial Chaplaincy (CPE) | WP page 184 | **Empty page**, same notice |
| 10 | `/ministry-training-college-admissions` | Admissions | WP page 9 | Why Choose Us, Admissions Process, "Apply Now" → `/student-application` |
| 11 | `/student-application` | Student Application | WP page 227 | Application procedure checklist, link to the enrollment form (opens in new tab) |
| 12 | `/ministry-training-college-student-application` | Student Application (old) | WP page 117 | **Empty duplicate.** Linked from the Programs page button. → **301 redirect to `/student-application`** |
| 13 | `/ministry-training-college-curriculum` | Curriculum | WP page 136 | 3 level tables (30 courses), "Marriage And Family" gallery image. Not in any menu. |
| 14 | `/ministry-training-college-campus-events` | Campus Events | WP page 8 | One flyer image (annual dinner) |
| 15 | `/ministry-training-college-gallery` | Gallery | WP page 67 | 3 flyer images |
| 16 | `/ministry-training-college-meet-our-faculty` | Meet Our Faculty | WP page 63 | Intro text + placeholder "faculty members here..." |
| 17 | `/ministry-training-college-class-schedules` | Class Schedules | WP page 66 | Intro text + placeholder "schedules here..." |
| 18 | `/ministry-training-college-set-an-appointment` | Set an Appointment | WP page 68 | Appointment form |
| 19 | `/ministry-training-college-contact-us` | Contact Us | WP page 12 | Contact form with file attachment |
| 20 | `/ministry-training-college-donate` | Donate | WP page 78 | Proweaver payment form (Stripe, **sandbox mode**, never went live). Not in any menu. |
| 21 | `/ministry-training-college-accreditation` | Accreditation | WP page 345 | Transworld logo, accreditation disclaimer, 3 course tables |
| 22 | `/ministry-training-college-racial-discrimination-policy` | Racial Discrimination Policy | WP page 347 | Text |
| 23 | `/privacy-notice` | Privacy Notice | WP page 3 | 16,500 words of legal text, last updated 14 Jan 2026 |
| 24 | `/victory-international-ministry-training-college-do-not-sell-or-share-my-personal-information` | Do Not Sell or Share | WP page 373 | CCPA text |
| 25 | `/sitemap` | Sitemap | WP page 6 | Auto-generated page list |

### Trashed in WordPress (currently 404)

| URL | Action |
|---|---|
| `/ministry-training-college-vim-global` | Still referenced by a Main Menu item that WordPress hides. **Not rebuilt.** Return 404. |
| `/masters-in-divinity` (under Programs) | Content exists in trash. **Not rebuilt** unless the client asks. |

### Non-page URLs to handle

| URL | Action |
|---|---|
| `/sitemap.xml` | Generate with Next.js `sitemap.ts` |
| `/robots.txt` | Generate with Next.js `robots.ts`, allow all, point at sitemap |
| `/google8e36b76cb2cc26ff.html`, `/BingSiteAuth.xml` | Copy verbatim into `public/` so Search Console and Bing ownership survive |
| `/wp-content/uploads/...` and `/wp-content/themes/.../images/...` | Images move to `public/images/`. Add a `rewrites`/`redirects` rule mapping old upload paths to new ones so any external links or Google Images results keep resolving. |
| `/wp-content/themes/victoryinternationalon794/forms/custom/applyNowForm` | The enrollment form's old iframe URL, linked from `/student-application`. → **301 redirect to `/apply`** (new page, see Forms) |
| `/home` | WordPress front-page slug. → **301 redirect to `/`** |
| `/privacy-policy` | Appears in traffic logs (27 hits), does not exist. → **301 redirect to `/privacy-notice`** |

### Menus (preserved exactly)

**Main Menu:** Home · About Us · Programs · Admissions · Campus Events · Tuition Payment (PayPal, new tab) · Contact Us
**Footer Menu:** Home · About Us · Programs · Admissions · Campus Events · Tuition Payment · Contact Us · Accreditation · Racial Discrimination Policy
**Footer legal links:** Privacy Notice · Do Not Sell/Share My Personal Information

---

## 3. Forms (the only dynamic part of the site)

| Form | Where | Fields | Current handler | Replacement |
|---|---|---|---|---|
| Send Us a Message | Home page footer section | Full Name*, Email*, Message, Privacy checkbox*, reCAPTCHA | `includes/bottom.php` → email + DB | `POST /api/contact` |
| Contact Us | `/ministry-training-college-contact-us` (iframe) | First Name*, Last Name*, Email*, Phone, Course Applying For, Attachment (file), Message, Privacy checkbox | `forms/views/templates/ApplicationForm.php` | `POST /api/contact` with multipart upload, attachment forwarded in the email |
| Set an Appointment | `/ministry-training-college-set-an-appointment` (iframe) | Name*, Address, City, Zip, Email*, Fax, Phone, Preferred Date, Preferred Time, Comment, Privacy checkbox | `forms/views/templates/appointmentForm.php` | `POST /api/appointment` |
| College Enrollment Form | separate full-page PHP at `/wp-content/themes/.../forms/custom/applyNowForm` | First*, Last*, Street, City, State (select), Zip, Birthdate, Status, Gender, Student Phone*, Student Email*, "$50 Application Fee" (free-text amount, **no payment taken**), Applying For (checkboxes: Certificate / Diploma / Associate / Bachelors), Preferred Learning Setup (Online / In-Person), Highest Education, drawn signature (canvas → PNG attached to email), Date (auto) | `forms/views/customs/applyNowForm.php` | New page `/apply` + `POST /api/apply`. Signature pad via `signature_pad` npm package, PNG attached to the email. |
| Donate | `/ministry-training-college-donate` | Proweaver payment form (Stripe) | `[pof src="donate"]`, sandbox mode | **Do not rebuild the Stripe form.** Replace the page body with the same intro text and a button to the existing PayPal donate link already used in the menu. Flag to client (see §9). |

**Delivery:** all forms email `dean@vimtc.org` via Resend (same account/setup as nooktek-website), from a verified `vimtc.org` sender once DNS moves, or from a NookTek sender until then. Reply-To set to the submitter.

**Spam protection:** the old reCAPTCHA keys belong to Proweaver and cannot be reused. Use Cloudflare Turnstile (free, no Google account needed) plus a honeypot field and a per-IP rate limit on the API routes.

**Storage:** the old site kept a copy of every submission in MySQL. The rebuild emails only. The 21 historical submissions in the dump are handed to the client as a CSV and not carried into the new site.

---

## 4. Technical approach

Same stack as `hotseater/nooktek-website` so tooling, deploy pipeline and mailer code carry over.

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript). Read `node_modules/next/dist/docs/` before writing code, per repo convention: this version differs from older Next.js. |
| Styling | Tailwind CSS v4 for layout utilities, plus a ported `globals.css` carrying the theme's CSS variables, fonts and the component classes that define the current look (`.btn-style`, `.nh_contact`, `.services_box`, `.bullet`, tables). The goal is visual parity, not a re-skin. |
| Fonts | `next/font/google` for Archivo and Questrial (self-hosted at build, no runtime Google request) |
| Images | `next/image` with the originals copied from the export. Hero slider images are 1920×800 and 1590×857; everything is under 1 MB except the 4 MB "Marriage And Family" scan, which gets resized at build. |
| Rendering | Fully static (`generateStaticParams` for program pages). Only the 3 form API routes run on the server. |
| Email | Resend (reuse `src/lib/mailer.ts` pattern from nooktek-website) |
| Hosting | Vercel, Hobby tier is sufficient (static pages, a few form submissions a month) |
| Analytics | Vercel Web Analytics (free, cookieless) replaces WP Statistics |
| Cookie banner | WordPress ran CookieYes. Replace with a small first-party banner linking to the Privacy Notice. No tracking cookies are set, so this is informational only. |
| Accessibility widget | Keep the UserWay script if the client confirms the account is theirs; drop it if it is Proweaver's (see §9) |
| Maps | Keep the Google Maps iframe embed (no API key required) |

### Project structure (planned)

```
vimtc-website/
├─ docs/MIGRATION-PLAN.md          ← this file
├─ content/                        ← extracted from the WP dump, reviewed by hand
│  ├─ pages/*.html                 ← long legal pages kept as sanitized HTML
│  └─ programs.ts                  ← program names, intros, course tables as data
├─ public/
│  ├─ images/…                     ← theme images + uploads, original filenames
│  ├─ google8e36b76cb2cc26ff.html
│  └─ BingSiteAuth.xml
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx                ← header, nav, footer, map, cookie notice
│  │  ├─ page.tsx                  ← home
│  │  ├─ ministry-training-college-about-us/page.tsx
│  │  ├─ ministry-training-college-programs/page.tsx
│  │  ├─ ministry-training-college-programs/[slug]/page.tsx
│  │  ├─ …one folder per URL in §2…
│  │  ├─ apply/page.tsx            ← enrollment form (was a PHP iframe)
│  │  ├─ sitemap.ts  robots.ts  not-found.tsx
│  │  └─ api/{contact,appointment,apply}/route.ts
│  ├─ components/                  ← Header, Nav, HeroSlider, PageBanner, Breadcrumbs,
│  │                                  ContactBlock ("Drop Us a Message!"), forms, Footer
│  └─ lib/{mailer,env,turnstile,rate-limit}.ts
├─ scripts/extract-content.mjs     ← one-off: SQL dump → content/ (kept for audit)
├─ next.config.ts  vercel.json  package.json
└─ README.md
```

### Content extraction method

1. A script parses `w13160.sql` (already prototyped during analysis) and writes each published page's `post_content` to `content/pages/<slug>.html`, after:
   - expanding `[contenturl type=templateurl]` to `/images/theme`
   - rewriting `https://www.vimtc.org/wp-content/uploads/…` to `/images/uploads/…`
   - fixing the relative links Proweaver left bare (`href="ministry-training-college-contact-us"` → `/ministry-training-college-contact-us`)
   - replacing `[modula id=…]` with the single image each gallery holds
   - stripping Gutenberg block comments and empty `<p>&nbsp;</p>`
2. Short pages (home blocks, programs grid, program intros) are then hand-converted to TSX so they use `next/image` and `Link`. Long legal pages stay as HTML rendered through a sanitizer.
3. Course tables become typed data so the Curriculum, Accreditation and three program pages render from one source. (Today the same tables are pasted four times with inconsistent spelling: "CEATION", "BELIVER", "UNDWELLING". The rebuild keeps the client's wording but can correct obvious typos in one place if they approve.)
4. Page banners: each inner page has a featured image (`nh-1.jpg` … `nh-14.jpg`) and a "Page Intro" line stored as post meta. Both are carried over per page.

---

## 5. SEO and metadata carry-over

- `<title>` per page: `"<Page Title> | Ministry Training College in Phoenix Arizona"` for inner pages, `"Victory International Ministry Training College | Ministry Training College in Phoenix Arizona"` for home — matching what Google currently indexes.
- Meta descriptions: none exist today. Write one per page from the first paragraph (a net improvement, flagged as such).
- Open Graph and Twitter card: `summary_large_image`, per-page banner image, matching Yoast's settings.
- Breadcrumbs on inner pages (Yoast provided them) with `BreadcrumbList` JSON-LD.
- `Organization` / `EducationalOrganization` JSON-LD on the home page with the phone, email and address.
- `sitemap.xml` listing the 24 public pages (exclude `/sitemap`, `/apply` optional).
- `robots.txt`: `Allow: /`, sitemap line. The old file disallowed `/wp-content/` which blocked Google from indexing images; the new site does not inherit that.
- `www.vimtc.org` is canonical (matches `siteurl`). Apex `vimtc.org` → 308 to `www`. Vercel handles this with the domain redirect setting.
- Trailing slashes off (WordPress permalink structure was `/%postname%` without trailing slash).

---

## 6. Build phases

| Phase | Deliverable | Est. effort |
|---|---|---|
| 0. Approvals | Client answers the §9 questions. You confirm the Resend sender domain and Turnstile site. | — |
| 1. Scaffold | `create-next-app`, Tailwind v4, fonts, globals.css with theme tokens, layout with header/nav/footer/map, 404 page. Deploy to a Vercel preview URL. | ½ day |
| 2. Content | Run extraction script; build all 25 pages; copy images; verify every URL in §2 returns 200 with the right title. | 1–1½ days |
| 3. Forms | Four forms + three API routes + Resend + Turnstile + honeypot + rate limit. Test deliverability to `dean@vimtc.org`. | ½–1 day |
| 4. Parity QA | Side-by-side against live site on desktop and mobile. Lighthouse, link checker, redirect checker, sitemap validation. Client review on preview URL. | ½ day |
| 5. Cutover | Add domains in Vercel, recreate MX/TXT records, switch DNS, verify SSL, submit sitemap in Search Console, monitor 404s for a week. | 1 hr + monitoring |
| 6. Domain transfer | Unlock at current registrar, get auth code, transfer to Vercel Domains (or your registrar of choice), confirm renewal. | 5–7 days elapsed, little hands-on |
| 7. Cleanup | Purge `w13160.sql` from repo history (it contains password hashes, FTP and SMTP credentials and PayPal sandbox keys), hand submissions CSV to client, tell client to cancel Proweaver hosting. | ½ hr |

Total hands-on: roughly 3 to 4 working days.

---

## 7. Vercel deployment

1. Vercel → New Project → import `hotseater/vimtc-website`, branch `main`. Framework preset: Next.js.
2. Environment variables:
   - `RESEND_API_KEY`
   - `MAIL_FROM` (e.g. `VIMTC Website <noreply@vimtc.org>` once the domain is verified in Resend)
   - `MAIL_TO` (`dean@vimtc.org`)
   - `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`
   - `NEXT_PUBLIC_SITE_URL` (`https://www.vimtc.org`)
3. Deploy; confirm preview on `*.vercel.app`.
4. Settings → Domains → add `www.vimtc.org` (primary) and `vimtc.org` (redirect to www).
5. Enable Vercel Web Analytics.

### DNS cutover (after client approves the preview)

Before touching anything, export the current zone from the registrar and record the existing **MX, TXT (SPF/DKIM/DMARC), and any CNAME** records. `dean@vimtc.org` must keep working.

| Type | Name | Value |
|---|---|---|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |
| MX / TXT | as today | copied unchanged |

Lower TTLs to 5 minutes a day ahead, switch, verify SSL issuance in Vercel, then raise TTLs back. Keep Proweaver hosting live for at least one week after cutover as a rollback path.

### Domain transfer (separate, after DNS is stable)

- Confirm registration date is older than 60 days and the domain is not within 60 days of a previous transfer.
- Check whether the domain is registered under Proweaver's account rather than the client's. If so, Proweaver must initiate the unlock and release the auth code; get this in writing before cancelling anything.
- Turn off WHOIS privacy temporarily so the transfer approval email reaches the owner.
- Transfer into Vercel Domains (supports `.org`) or your preferred registrar, then re-enable privacy and auto-renew.

---

## 8. What is explicitly out of scope (no redesign)

- No layout, colour, typography or copy changes beyond fixing broken relative links and empty paragraphs.
- The four empty or placeholder pages (two bachelor programs, Faculty, Class Schedules) are rebuilt as they are today, placeholder text included, so the client sees exactly what needs content.
- The Programs grid keeps its four unlinked tiles with placeholder thumbnails.
- No CMS. Content changes go through the repo. (A CMS can be a later phase if the client wants to self-edit.)
- No new pages except `/apply`, which replaces an existing PHP form URL.

---

## 9. Questions for the client before build starts

1. **Donate page:** the Stripe-based donation form was never taken out of test mode. Should the Donate page point to the existing PayPal button (recommended), be removed, or wait for a real payment setup?
2. **Application fee:** the enrollment form asks for a "$50 Application Fee" amount but takes no payment. Keep as is, or link to PayPal?
3. **UserWay accessibility widget:** is account `m1Y1yHo0MY` yours or Proweaver's? If Proweaver's, it stops working when their contract ends.
4. **Form recipient:** confirm `dean@vimtc.org` for all forms, and whether anyone should be CC'd.
5. **Email hosting:** who hosts `@vimtc.org` mailboxes? I need to copy the MX records exactly.
6. **Domain ownership:** who is the registrant of `vimtc.org`, and do you have the registrar login? The WordPress admin email is `solomon@kanulaw.com`, which suggests the site was set up by a third party.
7. **Trashed pages:** "VIM Global" and "Masters in Divinity" exist in the trash. Leave them out?
8. **Typos in course tables:** fix "NEW CEATION REALITIES", "AUTHORITY OF THE BELIVER", "UNDWELLING" everywhere, or leave as written?
9. **Historical form submissions:** 21 messages are in the old database. Want them exported to a spreadsheet?

---

## 10. Security notes from the export

- The export's Proweaver forms plugin contained a Stripe test key; it was excluded from the repo before push. Nothing from `wp-content/plugins` is in this repo.
- `w13160.sql` (on the `export` branch) contains WordPress password hashes for two users, FTP credentials, SMTP credentials, PayPal sandbox API credentials and WP Rocket license keys. The repo is private; the file is removed from history in Phase 7.
- `public_html/mcsn0730.php` is a renamed `wp-login.php` (Proweaver's login-URL obfuscation). Not needed.
- `public_html/onlineforms/` is a separate CodeIgniter app ("Online Form Database 2.0") for a form-submissions dashboard. Its config has a hard-coded encryption key. Not needed in the rebuild.
