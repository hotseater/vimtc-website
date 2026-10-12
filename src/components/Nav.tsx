"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MenuList from "@/components/MenuList";
import type { MenuItem } from "@/lib/content";
import { SITE_NAME } from "@/lib/site";

/**
 * Primary navigation. Same DOM as the theme's includes/nav.php so its CSS applies unchanged:
 * desktop → inline list positioned into the header; ≤800px → hamburger + off-canvas panel.
 */
export default function Nav({ items }: { items: MenuItem[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("active", open);
    return () => document.body.classList.remove("active");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const burger = (label: string, onClick: () => void) => (
    <div className="toggle_holder">
      <button
        type="button"
        className={`hamburger hamburger--spin-r${open ? " is-active" : ""}`}
        aria-label={label}
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={onClick}
      >
        <span className="hamburger-box">
          <span className="hamburger-inner" />
        </span>
      </button>
      <small>{label}</small>
    </div>
  );

  return (
    <div id="nav_area">
      <div className={`nav_toggle_button${open ? " active" : ""}`}>
        <div className="logo_wrap">
          <div className="main_logo">
            <Link href="/">
              <figure>
                <Image src="/images/theme/main-logo.png" alt={SITE_NAME} width={170} height={230} />
              </figure>
            </Link>
          </div>
        </div>
        {burger("Menu", () => setOpen(true))}
        <div className="clearfix" />
      </div>

      <div className={`toggle_right_nav${open ? " toggle_right_cont" : ""}`}>
        <nav id="primary-navigation" className={`page_nav${open ? " toggle_right_style" : ""}`} aria-label="Main menu">
          <div className="menu_slide_right">
            <Link href="/" className="logo_slide_right" onClick={() => setOpen(false)}>
              <figure>
                <Image src="/images/theme/main-logo.png" alt={SITE_NAME} width={170} height={230} />
              </figure>
            </Link>
            {burger("Close", () => setOpen(false))}
            <div className="clearfix" />
          </div>
          <div className="wrapper">
            <div className="nav-menu">
              <MenuList items={items} onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </nav>
        <div className="toggle_nav_close" onClick={() => setOpen(false)} aria-hidden="true" />
      </div>
    </div>
  );
}
