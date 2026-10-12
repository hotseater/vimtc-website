import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export type Crumb = { label: string; href: string };

/** Yoast-style breadcrumb trail ("Home » Programs » Page") with BreadcrumbList JSON-LD. */
export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const items = [{ label: "Home", href: "/" }, ...trail];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: `${SITE_URL}${c.href === "/" ? "/" : c.href}` })),
  };
  return (
    <>
      <p id="breadcrumbs">
        {items.map((c, i) => (
          <span key={c.href}>
            {i < items.length - 1 ? <Link href={c.href}>{c.label}</Link> : <span className="breadcrumb_last" aria-current="page">{c.label}</span>}
            {i < items.length - 1 ? " » " : ""}
          </span>
        ))}
      </p>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
