import type { MetadataRoute } from "next";
import { pages } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return pages
    .filter((p) => p.slug !== "sitemap")
    .map((p) => ({
      url: `${SITE_URL}${p.path === "/" ? "" : p.path}`,
      lastModified: new Date(p.modified.replace(" ", "T") + "Z"),
      changeFrequency: p.path === "/" ? "monthly" : "yearly",
      priority: p.path === "/" ? 1 : p.parent ? 0.6 : 0.8,
    }));
}
