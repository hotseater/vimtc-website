import type { MetadataRoute } from "next";
import { pages } from "@/lib/content";
import { PROGRAMS } from "@/content/home";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const known = new Set(pages.map((p) => p.path));
  const extra: MetadataRoute.Sitemap = PROGRAMS.filter((p) => !known.has(p.href)).map((p) => ({ url: `${SITE_URL}${p.href}`, changeFrequency: "yearly", priority: 0.6 }));
  const base: MetadataRoute.Sitemap = pages
    .filter((p) => p.slug !== "sitemap")
    .map((p) => ({
      url: `${SITE_URL}${p.path === "/" ? "" : p.path}`,
      lastModified: new Date(p.modified.replace(" ", "T") + "Z"),
      changeFrequency: p.path === "/" ? "monthly" : "yearly",
      priority: p.path === "/" ? 1 : p.parent ? 0.6 : 0.8,
    }));
  return base.concat(extra);
}
