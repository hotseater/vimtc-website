"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LINKS } from "@/content/home";

const NAV = [
  { label: "Programs", href: LINKS.programs },
  { label: "Admissions", href: LINKS.admissions },
  { label: "About", href: LINKS.about },
  { label: "Events", href: LINKS.events },
  { label: "Give", href: LINKS.donate },
];

/** Dark header that sits on the banner. Inline links on desktop, a panel below 800px. */
export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="nh-hdr">
      <div className="nh-container nh-hdr-row">
        <Link href="/" className="nh-brand" onClick={() => setOpen(false)}>
          <Image src="/images/theme/main-logo.png" alt="Victory International Ministry Training College crest" width={40} height={54} priority />
          <span className="nh-brand-text">
            <span className="nh-brand-name">Victory International</span>
            <span className="nh-brand-sub">Ministry Training College</span>
          </span>
        </Link>
        <nav id="nh-nav" className={`nh-nav${open ? " is-open" : ""}`} aria-label="Main">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link href={LINKS.apply} className="nh-btn nh-btn-gold nh-nav-apply" onClick={() => setOpen(false)}>
            Apply now
          </Link>
        </nav>
        <div className="nh-hdr-actions">
          <Link href={LINKS.apply} className="nh-btn nh-btn-gold nh-btn-sm">
            Apply now
          </Link>
          <button type="button" className="nh-menu-btn" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="nh-nav" onClick={() => setOpen((v) => !v)}>
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
