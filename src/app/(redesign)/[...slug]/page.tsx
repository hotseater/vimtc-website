import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContentShell, { type Crumb } from "@/components/site/ContentShell";
import HtmlContent from "@/components/HtmlContent";
import { contentPages, descriptions, getPageByPath, getPageBySlug, pages, readPageHtml } from "@/lib/content";

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

  return (
    <ContentShell title={page.title} lead={page.intro} trail={trailFor(path)}>
      {page.slug === "sitemap" ? (
        <SitemapList />
      ) : isEmpty ? (
        <p>We are still updating our website with contents. Please check back next time.</p>
      ) : (
        <HtmlContent html={html} />
      )}
    </ContentShell>
  );
}

/** Mirrors wp_list_pages(): top-level pages alphabetically with their children nested. */
function SitemapList() {
  const top = pages.filter((p) => !p.parent).sort((a, b) => a.title.localeCompare(b.title));
  return (
    <ul className="nh-sitemap">
      {top.map((p) => {
        const children = pages.filter((c) => c.parent === p.slug).sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
        return (
          <li key={p.path}>
            <Link href={p.path}>{p.title}</Link>
            {children.length ? (
              <ul>
                {children.map((c) => (
                  <li key={c.path}>
                    <Link href={c.path}>{c.title}</Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
