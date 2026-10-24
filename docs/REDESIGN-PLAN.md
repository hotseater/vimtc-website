# vimtc.org — Redesign plan

**Status:** proposal for client review. The like-for-like rebuild on `main` stays the fallback and ships first; the redesign is built on a `redesign` branch and replaces it when approved.
**Design review:** the visual direction lives on the Claude Design canvas "VIMTC Website Redesign". This document is the reasoning behind it.

---

## 1. Why redesign, and what "modern" has to mean here

The current site is a 2024 agency template. It is a brochure: seven pages of copy, no way to find the right program, a PDF-style application, and the single most-visited page (home, 12,000 views vs. under 150 for any other page) does not answer the three questions a prospective student has: *what can I study, what does it cost and how long does it take, and how do I start?*

"Extremely modern" for a ministry college is not a tech-company look. The sites that win awards and enrol students right now share a set of patterns, and that is what this plan adopts:

| Pattern | Where it comes from | How VIMTC uses it |
|---|---|---|
| Five or fewer navigation items | 2026 church/ministry site guidance: About, Visit, Sermons, Give, Connect | Programs · Admissions · About · Events · Give, plus one persistent **Apply** button |
| Program finder with filters (level, format, duration) | Higher-ed conversion research: finders and stepped forms move visitors deeper; program-page-to-inquiry converts at 3–8%, far above the home page | A filterable finder on the Programs page and a compact version on the home page |
| Transparent cost, format, dates on every program page | Peer schools (Bethel's BSSM lists tuition, hours per week and intake dates up front); AI answer engines cite pages that lead with outcomes, cost and format | Every program gets a facts strip: level, length, format, start dates, tuition, accreditation note |
| Short top-of-funnel forms, long forms only on admissions | Each extra field lowers completion | Two-field "Request info" everywhere; the enrollment form becomes a 5-step wizard with save-and-resume |
| Real photography of real people | Every church-website guide; Wheaton and Dakota Wesleyan cited for warmth and student voices | The college's own graduation and classroom photos, large, never stock |
| Oversized editorial typography, bento layouts, restrained scroll motion | 2026 trend roundups (Line25, Netguru, Envato), with their caveats: bento must collapse cleanly on mobile; motion must be subtle and honour reduced-motion | Display serif for headlines, a program bento on the home page, one hero reveal and scroll-linked fades only |
| Accessibility as a baseline, not a widget | WCAG 2.2 AA; the UserWay overlay is dropped | 4.5:1 contrast everywhere, keyboard-complete, real form labels, focus states, reduced-motion support |

### Compared with the best-looking sites in the space

| Site | What it does well | What VIMTC borrows | Where VIMTC can do better |
|---|---|---|---|
| University of South Florida (WebAward 2026 Best University Site) | Clean hierarchy, program search front and centre, confident photography | Finder-first information architecture; large imagery with short overlays | A small catalogue means every program can get a full, honest page |
| Bethel School of Supernatural Ministry (bssm.net) | The closest peer. Two clear paths (on campus / online), tuition and hours per week stated plainly, rolling intakes, Spanish and Portuguese tracks | "Choose your path" split (In person in Phoenix / Online), the facts strip, intake dates | Accreditation transparency: VIMTC's Accreditation page is unusually candid and becomes a trust asset rather than a footnote |
| Wheaton College | Student voices woven through the site | Alumni stories section. The current site claims "a graduate body of thousands from around the world" without a single face attached | — |
| Awwwards "Institutions" winners | Editorial type scale, asymmetry, generous whitespace, scroll-driven reveals | Type scale and spacing system; one signature hero | Restraint: no cursor effects, no preloader, no full-page takeovers |
| Dakota Wesleyan | Blue and gold palette that reads as trustworthy and warm | VIMTC already owns navy and gold; the redesign keeps them and adds a warm paper ground | — |

---

## 2. Design direction

The canvas shows three directions. All keep the college's navy `#0E035B` and gold, because the brand is established and the crest is navy and gold.

| Option | Idea | Trade-off |
|---|---|---|
| **A. Warm Editorial** (recommended, built out in full) | Paper-white ground, deep navy, gold used sparingly. Display serif (Fraunces) over a humanist sans (Manrope). Big photography, bento program grid, scripture as pull-quote. A serious institution that is also warm. | Less loud than B and C; relies on good photography, which the college has |
| **B. Midnight Cathedral** | Dark navy ground throughout, gold rules and numerals, white serif headlines. Cinematic, high contrast, distinctive. | Dark ground is harder for long reading (policies, course tables) and prints badly; some older visitors find it heavy |
| **C. Kinetic Revival** | Oversized grotesk headlines, broken grid, navy and gold colour blocks, strong motion. Youthful, energetic. | Highest risk of dating quickly; the loudest departure from a 30-year-old institution's tone |

Decision asked of the client: A, B, C, or a mix (for example A's layout with B's dark hero).

### Type, colour, spacing (Option A)

- **Display:** Fraunces (variable, optical sizing), weights 500–700, tight tracking at 56–88px.
- **Body/UI:** Manrope 400–700, 17px base, 1.6 line height.
- **Ground:** Paper `#FAF8F3`. **Ink:** `#121330`. **Navy:** `#0E035B` (brand). **Gold:** `#C9A227` for rules, numerals and the one primary button; the old gradient is retired. **Muted:** `#5B5F7A`.
- 8px spacing scale, 1200px content width, 24px radius on cards, 999px on pills.
- Motion: one hero reveal (fade and 12px rise, 600ms), scroll-linked fade-ins on sections, all disabled under `prefers-reduced-motion`.

---

## 3. Information architecture

```
Home
Programs (finder)  ─┬─ Certificate in Discipleship
                    ├─ Diploma in Biblical Studies
                    ├─ Associate Degree in Ministry
                    ├─ Bachelor of Arts in Ministerial Studies
                    ├─ Bachelor of Arts in Theological & Bible Studies   [new page: content needed]
                    ├─ Bachelor of Arts in Christian/Pastoral Counseling [new page: content needed]
                    ├─ Bachelor of Arts in Religious & Christian Education [new page: content needed]
                    ├─ Bachelor of Missions & Inter-Cultural Studies     [new page: content needed]
                    └─ Curriculum (course catalogue, searchable)
Admissions ─┬─ How to apply (steps, requirements, dates)
            ├─ Tuition & fees  [content needed from client]
            ├─ Apply (5-step wizard)
            ├─ Request information
            └─ Set an appointment / Visit
About ──────┬─ Mission & beliefs
            ├─ Leadership & faculty (directory)
            ├─ Accreditation
            ├─ Global campuses (Phoenix · Ghana · Nairobi)  [from the 2024 event flyers]
            └─ Our story (founders, since 1991)
Events ─────┬─ Upcoming (calendar, RSVP)
            └─ Gallery
Give ───────── Tuition payment & donations (PayPal now; card checkout later)
Contact · Privacy Notice · Do Not Sell/Share · Racial Discrimination Policy · Sitemap
```

Every current URL is kept or 301-redirected, so the SEO work from the rebuild is preserved.

---

## 4. New functionality (beyond the current site)

| # | Feature | Why | Build |
|---|---|---|---|
| 1 | **Program finder** with level / format / duration filters and search | The number-one conversion pattern in higher-ed | Client-side filtering over a `programs` table in Supabase; static fallback |
| 2 | **Program facts strip + FAQ with schema** | Cost, format, dates up front; eligible for rich results and AI answers | `programs` table fields; `FAQPage` JSON-LD |
| 3 | **Application wizard** (5 steps, progress bar, save and resume by email link, signature pad, transcript upload) | Replaces a 20-field single page; stepped forms complete at 40–70% from start | Supabase `applications` table + Storage bucket; Resend emails |
| 4 | **Request-info micro form** (name, email, program) on every program page and in the sticky bar | Two fields convert; nurture by email | `inquiries` table; Resend |
| 5 | **Sticky Apply / Request-info bar** on program pages | Reduces abandonment on long pages | Component |
| 6 | **Events & RSVP** | The college runs conferences, dinners, graduation, Ghana and Nairobi events; today they are JPEG flyers | `events` + `rsvps` tables; iCal export |
| 7 | **Faculty & leadership directory** | "Meet Our Faculty" has said "faculty members here..." since 2024 | `people` table with photo, role, bio |
| 8 | **Student & alumni stories** | Proof for the "thousands of graduates" claim | `stories` table; short video embed support |
| 9 | **Admin dashboard** (`/admin`, magic-link login) to edit programs, events, people, stories, and read submissions, inquiries and applications | The client cannot edit a Next.js repo; this replaces WordPress editing | Supabase Auth, RLS per table, simple CRUD pages |
| 10 | **Online giving** | "Tuition Payment" is a PayPal link; donations need a proper page | Phase 1 PayPal buttons; Phase 2 Stripe Checkout with receipts |
| 11 | **Site search** | Catalogue and pages | Build-time index (Pagefind) |
| 12 | **Dark mode** | Expected in 2026; the navy brand suits it | CSS variables, `prefers-color-scheme` plus toggle |
| 13 | **Spanish** | BSSM runs Spanish and Portuguese tracks; VIMTC's global footprint suggests demand | Optional, Phase 3: `next-intl`, client-translated content |
| 14 | **Analytics & conversion tracking** | Measure inquiries and application starts, not just page views | Vercel Analytics plus custom events |
| 15 | **Accessibility** | WCAG 2.2 AA, replaces the UserWay overlay | axe audit in CI |

Content the client must supply before launch: tuition and fees per program, start dates, the four bachelor program descriptions, faculty names, photos and bios, 3–5 alumni stories, event dates, and a decision on Spanish.

---

## 5. Technical approach

Same stack as the rebuild (Next.js 16, Tailwind v4, Vercel, Resend, Supabase) so nothing is thrown away:

- **Content model in Supabase:** `programs`, `courses`, `people`, `events`, `rsvps`, `stories`, `inquiries`, `applications`, `form_submissions` (exists). Public read via RLS on content tables; writes only through the admin UI and server routes.
- **Rendering:** content pages statically generated, revalidated on admin saves (`revalidatePath`), so the site stays fast and edits appear within seconds.
- **Design system in code:** tokens in `globals.css` (`@theme`), a small component library (Button, Card, FactsStrip, Finder, Wizard, Section, Prose), documented in `docs/DESIGN.md`.
- **Images:** `next/image` with the college's originals, plus a photography brief for the client (candid classroom and online-class imagery, the Phoenix campus, graduation).
- **Motion:** CSS only (`@starting-style`, scroll-driven animations with fallbacks); no animation libraries.
- **Performance budget:** LCP under 2.0s on 4G, CLS under 0.05, home page JavaScript under 90KB.
- **SEO:** all URLs kept; per-program `EducationalOccupationalProgram` schema; `FAQPage`; sitemap; Open Graph images generated per page.

---

## 6. Phases and effort

| Phase | Scope | Effort |
|---|---|---|
| 0 | Client picks a direction on the canvas and supplies the content list above | — |
| 1 | Design system, layout shell, home, program finder, program pages | 3 days |
| 2 | Admissions: how to apply, tuition, request-info, application wizard, appointment | 2–3 days |
| 3 | About (mission, leadership directory, accreditation, campuses, story), Events with RSVP, Gallery, Stories, Give | 2–3 days |
| 4 | Admin dashboard (CRUD plus submissions inbox) | 3 days |
| 5 | Search, dark mode, analytics events, accessibility audit, performance pass, redirects, launch | 2 days |

About 13 to 15 working days of build. Spanish and Stripe checkout are separate add-ons.

---

## 7. What stays the same

Brand colours and crest, all existing URLs, the forms' email delivery, the Supabase submission history, the legal pages' text, the accreditation wording (candid and good), and the PayPal tuition link until card checkout is approved.

---

## Sources consulted

- Church and ministry site patterns 2026: [OurChurch.com](https://www.ourchurch.com/blog/church-website-ideas-for-2026/), [Worship Times](https://worshiptimes.org/2026-top-ministry-website-trends/), [ChurchCreation](https://churchcreation.com/church-website-design-trends/)
- Higher-ed conversion patterns and benchmarks: [Vital Design](https://vitaldesign.com/higher-education-website-design/), [Clear Digital](https://www.cleardigital.com/insights/higher-education-website-design-trends), [Launchcodex](https://launchcodex.com/blog/industry-news-shifts/higher-education-marketing-funnel/), [AccelerOI benchmarks](https://www.acceleroi.com/blog/higher-education-conversion-rates), [Social Animal redesign playbook](https://socialanimal.dev/blog/higher-education-website-redesign-complete-guide/)
- Best-looking reference sites: [WebAward Best University Sites](https://www.webaward.org/category/University/best-university-websites.html), [Awwwards Institutions](https://www.awwwards.com/websites/institutions/), [Morweb best college websites](https://morweb.org/post/college-websites), [BSSM](https://bssm.net/)
- 2026 design trends and their caveats: [Line25](https://line25.com/articles/web-design-trends-2026/), [Netguru](https://www.netguru.com/blog/modern-web-design-trends), [Envato](https://elements.envato.com/learn/web-design-trends)
- Sector context: [Logos / ATS 2026 report](https://www.logos.com/grow/hall-theological-education-trends-2026/)
