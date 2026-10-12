"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "vimtc-cookie-notice";

/** Informational notice (the WordPress site ran CookieYes). No tracking cookies are set by this site. */
export default function CookieNotice() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    // deferred so the first paint is not blocked and the state update happens outside the effect body
    const t = window.setTimeout(() => {
      let seen = false;
      try {
        seen = Boolean(window.localStorage.getItem(KEY));
      } catch {
        seen = false;
      }
      setShow(!seen);
    }, 0);
    return () => window.clearTimeout(t);
  }, []);
  if (!show) return null;
  const dismiss = () => {
    try {
      window.localStorage.setItem(KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
    setShow(false);
  };
  return (
    <div className="cookie_notice" role="region" aria-label="Cookie notice">
      <p>
        We use cookies to make this website work and to understand how it is used. See our <Link href="/privacy-notice">Privacy Notice</Link>.
      </p>
      <button type="button" onClick={dismiss}>
        Got it
      </button>
    </div>
  );
}
