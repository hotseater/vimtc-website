"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MenuItem } from "@/lib/content";

/**
 * Menu labels may contain <q>…</q> (the theme renders <q> as a line break on desktop).
 * The nav CSS hides <span> elements, so the label is rendered as text + <q> nodes, never wrapped.
 */
function renderLabel(html: string) {
  return html.split(/(<q>.*?<\/q>)/g).map((part, i) => {
    const m = part.match(/^<q>(.*?)<\/q>$/);
    if (m) return <q key={i}>{m[1].trim()}</q>;
    return part ? <Fragment key={i}>{part}</Fragment> : null;
  });
}

/** Renders a WordPress-style menu list so the ported theme CSS (.current_page_item, <q> line breaks) keeps working. */
export default function MenuList({ items, onNavigate }: { items: MenuItem[]; onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <ul>
      {items.map((item) => {
        const current = !item.external && (item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(item.href + "/"));
        const label = renderLabel(item.labelHtml);
        return (
          <li key={item.href + item.label} className={`menu-item${current ? " current_page_item current-menu-item" : ""}`}>
            {item.external ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            ) : (
              <Link href={item.href} aria-current={current ? "page" : undefined} onClick={onNavigate}>
                {label}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
