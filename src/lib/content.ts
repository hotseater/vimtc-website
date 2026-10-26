import { readFileSync } from "node:fs";
import { join } from "node:path";
import { PROGRAM_SLUGS } from "@/content/home";
import pagesJson from "../../content/pages.json";
import widgetsJson from "../../content/widgets.json";
import menusJson from "../../content/menus.json";

export type PageMeta = {
  id: number;
  slug: string;
  path: string;
  parent: string | null;
  title: string;
  intro: string | null;
  banner: string | null;
  bannerAlt: string;
  order: number;
  modified: string;
  wordpressTemplate: string;
  css: string;
  contentFile: string;
};

export type MenuItem = { label: string; labelHtml: string; href: string; external: boolean };

export const pages: PageMeta[] = pagesJson as PageMeta[];
export const widgets: Record<string, string> = widgetsJson;
export const menus: { main: MenuItem[]; footer: MenuItem[] } = menusJson;

/** Paths that have their own redesigned route under src/app/(redesign); the generic content route skips them. */
const REDESIGNED_PATHS = new Set(["/", "/ministry-training-college-programs", "/ministry-training-college-admissions"]);
const isRedesigned = (path: string) => REDESIGNED_PATHS.has(path) || PROGRAM_SLUGS.has(path.split("/").pop() ?? "");

/** Pages that are rendered by the generic content route (everything without a dedicated route). */
export const contentPages = pages.filter((p) => !isRedesigned(p.path));

export function getPageByPath(path: string): PageMeta | undefined {
  return pages.find((p) => p.path === path);
}

export function getPageBySlug(slug: string): PageMeta | undefined {
  return pages.find((p) => p.slug === slug);
}

/** Site-wide custom CSS the WordPress custom-CSS plugin injected on every page except the front page. */
export const sitewideCss: string = readFileSync(join(process.cwd(), "content", "sitewide.css"), "utf8");

/** Read a page's body HTML (build time only; content/ is not shipped to the client). */
export function readPageHtml(page: PageMeta): string {
  // statically scoped to content/pages so Next's file tracing bundles only that folder
  return readFileSync(join(process.cwd(), "content", "pages", `${page.slug}.html`), "utf8");
}

/** Hand-written meta descriptions (the WordPress site had none). First sentence of each page, trimmed. */
export const descriptions: Record<string, string> = {
  "/": "Victory International Ministry Training College in Phoenix, Arizona provides growing Christians with in-depth, Bible-based study through flexible certificate, diploma and degree programs.",
  "/ministry-training-college-about-us": "The School of Ministry & Missions trains five-fold ministers to preach the gospel with signs and wonders following. Learn about our mission, president, founders and beliefs.",
  "/ministry-training-college-programs": "Explore VIMTC's programs: Certificate in Discipleship, Diploma in Biblical Studies, Associate Degree in Ministry and Bachelor of Arts degrees in ministry and counseling.",
  "/ministry-training-college-programs/certificate-in-discipleship": "The Certificate of Discipleship Program equips you with biblical foundations, spiritual formation, leadership development and practical ministry skills.",
  "/ministry-training-college-programs/diploma-in-biblical-studies": "The Diploma of Biblical Studies offers in-depth Scripture study, biblical interpretation, a theological framework and practical ministry skills.",
  "/ministry-training-college-programs/associate-degree-in-ministry": "The Associate Degree in School of Ministry integrates biblical studies, ministry skills, spiritual formation and field education.",
  "/ministry-training-college-programs/bachelor-of-arts-in-ministerial-studies": "The Bachelor of Arts in Ministerial Studies combines rigorous theological education with hands-on ministry training for leadership in the church and community.",
  "/ministry-training-college-programs/bachelor-of-arts-in-theological-and-bible-studies": "Bachelor of Arts in Theological & Bible Studies at Victory International Ministry Training College, Phoenix, Arizona.",
  "/ministry-training-college-programs/bachelor-of-arts-in-christian-pastoral-counseling": "Bachelor of Arts in Christian/Pastoral Counseling at Victory International Ministry Training College, Phoenix, Arizona.",
  "/ministry-training-college-programs/bachelor-of-arts-in-religious-and-christian-education": "Bachelor of Arts in Religious & Christian Education at Victory International Ministry Training College, Phoenix, Arizona.",
  "/ministry-training-college-programs/bachelor-of-missions-and-inter-cultural-studies": "Bachelor of Missions & Inter-Cultural Studies at Victory International Ministry Training College, Phoenix, Arizona.",
  "/ministry-training-college-programs/bachelor-of-arts-in-family-counseling": "Bachelor of Arts in Family Counseling at Victory International Ministry Training College, Phoenix, Arizona.",
  "/ministry-training-college-programs/bachelor-of-arts-in-ministerial-chaplaincy-cpe": "Bachelor of Arts in Ministerial Chaplaincy (CPE) at Victory International Ministry Training College, Phoenix, Arizona.",
  "/ministry-training-college-admissions": "Why choose VIMTC and how to apply: explore programs, complete the online application and prepare for your semester.",
  "/student-application": "Application procedure and required documents for admission to Victory International Ministry Training College.",
  "/ministry-training-college-student-application": "Student application for Victory International Ministry Training College.",
  "/ministry-training-college-curriculum": "VIMTC curriculum: three-level modules for the diploma programs, with course codes and names for each level.",
  "/ministry-training-college-campus-events": "Campus events at Victory International Ministry Training College: opportunities for connection, inspiration and spiritual growth.",
  "/ministry-training-college-gallery": "Photo gallery of Victory International Ministry Training College events and campus life in Phoenix, Arizona.",
  "/ministry-training-college-meet-our-faculty": "Meet the faculty of Victory International Ministry Training College: scholars, pastors and ministry practitioners committed to the next generation of Christian leaders.",
  "/ministry-training-college-class-schedules": "Class schedules at Victory International Ministry Training College, designed to fit around work and personal commitments.",
  "/ministry-training-college-set-an-appointment": "Schedule a personalized appointment with Victory International Ministry Training College in Phoenix, Arizona.",
  "/ministry-training-college-contact-us": "Contact Victory International Ministry Training College in Phoenix, Arizona. Call 1-844-443-7500, email dean@vimtc.org or send us a message.",
  "/ministry-training-college-donate": "Support Victory International Ministry Training College with a donation.",
  "/ministry-training-college-accreditation": "VIMTC is accredited through the Transworld Accrediting Commission International as a religious-exempt institution. Read what that means for students.",
  "/ministry-training-college-racial-discrimination-policy": "Victory International Ministry Training College's racial discrimination policy for staff and students.",
  "/privacy-notice": "Privacy Notice for Victory International Ministry Training College: how we collect, use, share and protect your personal information.",
  "/victory-international-ministry-training-college-do-not-sell-or-share-my-personal-information": "How to opt out of the sale or sharing of your personal information with Victory International Ministry Training College.",
  "/sitemap": "Sitemap of Victory International Ministry Training College's website.",
  "/apply": "College Enrollment Form for Victory International Ministry Training College (US, Canada and Europe students).",
};
