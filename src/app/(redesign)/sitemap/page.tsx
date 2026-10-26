import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/site/PageHead";
import { SITE_INDEX } from "@/content/siteIndex";

export const metadata: Metadata = { title: "Sitemap", description: "Every page on the Victory International Ministry Training College website.", alternates: { canonical: "/sitemap" } };

const Ac = ({ children }: { children: React.ReactNode }) => <span className="nh-ac">{children}</span>;

export default function SitemapPage() {
  return (
    <main>
      <PageHead
        trail={[{ label: "Sitemap", href: "/sitemap" }]}
        title={
          <>
            Every <Ac>page</Ac>
          </>
        }
        lead="The whole site at a glance, grouped the way the footer groups it."
      />
      <section className="nh-band nh-band-gray">
        <div className="nh-container nh-sitemap-grid">
          {SITE_INDEX.map((s) => (
            <nav key={s.title} aria-label={s.title} className="nh-stack">
              <h2 className="nh-h3-ui">{s.title}</h2>
              <ul className="nh-rows nh-sitemap-list">
                {s.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="nh-row nh-row-2">
                      <span className="nh-row-text">
                        <strong>{l.label}</strong>
                      </span>
                      <svg className="arr" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </section>
    </main>
  );
}
