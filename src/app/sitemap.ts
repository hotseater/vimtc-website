import type { MetadataRoute } from "next";
import { SITE_INDEX } from "@/content/siteIndex";
import { pages } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

/** Every page in the site index, with the WordPress modified date where one exists. */
export default function sitemap(): MetadataRoute.Sitemap {
  const modified = new Map(pages.map((p) => [p.path, new Date(p.modified.replace(" ", "T") + "Z")]));
  const seen = new Set<string>();
  const out: MetadataRoute.Sitemap = [];
  for (const section of SITE_INDEX) {
    for (const link of section.links) {
      if (seen.has(link.href) || link.href === "/sitemap" || link.href === "/apply") continue;
      seen.add(link.href);
      const home = link.href === "/";
      out.push({
        url: `${SITE_URL}${home ? "" : link.href}`,
        lastModified: modified.get(link.href),
        changeFrequency: home ? "monthly" : "yearly",
        priority: home ? 1 : section.title === "Policies" ? 0.3 : link.href.split("/").length > 2 ? 0.6 : 0.8,
      });
    }
  }
  return out;
}
