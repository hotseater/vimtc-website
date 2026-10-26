import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentShell, { type Crumb } from "@/components/site/ContentShell";
import HtmlContent from "@/components/HtmlContent";
import { POLICY_SLUGS, contentPages, descriptions, getPageByPath, getPageBySlug, readPageHtml } from "@/lib/content";

type Props = { params: Promise<{ slug: string[] }> };

export const dynamicParams = false;

/** Every published WordPress page keeps its exact URL, except the ones with a dedicated redesigned route. */
export function generateStaticParams() {
  return contentPages.map((p) => ({ slug: p.path.slice(1).split("/") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const path = "/" + slug.join("/");
  const page = getPageByPath(path);
  if (!page) return {};
  const description = descriptions[path];
  const image = page.banner ?? "/video/banner-poster.jpg";
  return {
    title: page.title,
    description,
    alternates: { canonical: path },
    openGraph: { title: page.title, description, url: path, images: [{ url: image, width: 1920, height: 600 }] },
  };
}

function trailFor(path: string): Crumb[] {
  const page = getPageByPath(path)!;
  const trail: Crumb[] = [];
  if (page.parent) {
    const parent = getPageBySlug(page.parent);
    if (parent) trail.push({ label: parent.title, href: parent.path });
  }
  trail.push({ label: page.title, href: page.path });
  return trail;
}

export default async function ContentPage({ params }: Props) {
  const { slug } = await params;
  const path = "/" + slug.join("/");
  const page = getPageByPath(path);
  if (!page || !contentPages.includes(page)) notFound();

  const html = readPageHtml(page);
  const isEmpty = html.trim() === "";

  if (POLICY_SLUGS.has(page.slug)) {
    const sections = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m, i) => ({ id: `s${i + 1}`, label: m[1].replace(/<[^>]+>/g, "").trim() }));
    let n = 0;
    const withIds = html.replace(/<h2([^>]*)>/g, () => `<h2$1 id="s${++n}">`);
    const updated = new Date(page.modified.replace(" ", "T") + "Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    return (
      <ContentShell title={page.title} lead={page.intro} trail={trailFor(path)} wide>
        <div className="nh-policy">
          {sections.length ? (
            <nav aria-label="Sections" className="nh-policy-nav nh-sticky">
              <span className="nh-meta">On this page</span>
              <ol>
                {sections.map((sec) => (
                  <li key={sec.id}>
                    <a href={`#${sec.id}`}>{sec.label}</a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
          <div className="nh-policy-body">
            <p className="nh-meta">Last updated {updated}</p>
            <HtmlContent html={withIds} />
          </div>
        </div>
      </ContentShell>
    );
  }

  return (
    <ContentShell title={page.title} lead={page.intro} trail={trailFor(path)}>
      {isEmpty ? <p>We are still updating our website with contents. Please check back next time.</p> : <HtmlContent html={html} />}
    </ContentShell>
  );
}

