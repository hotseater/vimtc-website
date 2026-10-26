import type { ReactNode } from "react";
import Link from "next/link";

export type Crumb = { label: string; href: string };

/**
 * Frame for a content page: breadcrumb, title and optional lead on a white band, then the
 * page body set as reading prose. The last crumb is the current page and is not a link.
 */
export default function ContentShell({ title, lead, trail, children, wide = false }: { title: ReactNode; lead?: string | null; trail: Crumb[]; children: ReactNode; wide?: boolean }) {
  return (
    <main>
      <section className="nh-band nh-band-white nh-pagehead nh-pagehead-tight">
        <div className="nh-container nh-stack">
          <nav aria-label="Breadcrumb" className="nh-crumbs nh-meta">
            <Link href="/">Home</Link>
            {trail.map((c, i) => (
              <span key={c.href}>
                {" "}
                <span aria-hidden="true">›</span>{" "}
                {i === trail.length - 1 ? <span aria-current="page">{c.label}</span> : <Link href={c.href}>{c.label}</Link>}
              </span>
            ))}
          </nav>
          <h1 className="nh-page-title">{title}</h1>
          {lead ? <p className="nh-lead nh-soft">{lead}</p> : null}
        </div>
      </section>
      <section className="nh-band nh-band-gray nh-band-prose">
        <div className={`nh-container nh-prose${wide ? " nh-prose-wide" : ""}`}>{children}</div>
      </section>
    </main>
  );
}
