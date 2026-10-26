import { readFileSync } from "node:fs";
import path from "node:path";

export type ProgramDetails = {
  overview: string;
  /** "Biblical Foundations: Deepen your…" list items split into title and text */
  areas: { title: string; text: string }[];
  courses: { code: string; name: string }[];
};

const PAGES_DIR = path.join(process.cwd(), "content", "pages");
const SMALL = new Set(["of", "the", "and", "in", "a", "an", "to", "for", "on"]);

const strip = (html: string) => html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

/** Course names are stored in capitals; set them in title case for the page, leaving codes as they are. */
function titleCase(s: string) {
  return s
    .toLowerCase()
    .split(/\s+/)
    .map((w, i) => (i > 0 && SMALL.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ")
    .replace(/\/\s*/g, "/ ");
}

/**
 * Reads a program's page from the WordPress export and pulls out the parts the programs page
 * shows: the opening paragraph, the "what you will study" list and the course table.
 * Only the fixed content directory is read; slugs come from src/content/home.ts.
 */
export function getProgramDetails(slug: string): ProgramDetails {
  const html = readFileSync(path.join(PAGES_DIR, `${slug}.html`), "utf8");
  const overview = strip(html.match(/<p>([\s\S]*?)<\/p>/)?.[1] ?? "");
  const areas = [...html.matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) => {
    const t = strip(m[1]);
    const i = t.indexOf(":");
    return i > 0 ? { title: t.slice(0, i).trim(), text: t.slice(i + 1).trim() } : { title: t, text: "" };
  });
  const courses = [...html.matchAll(/<tr>\s*<td[^>]*>([\s\S]*?)<\/td>\s*<td[^>]*>([\s\S]*?)<\/td>\s*<\/tr>/g)].map((m) => ({ code: strip(m[1]), name: titleCase(strip(m[2])) }));
  return { overview, areas, courses };
}
