import Link from "next/link";
import Arrow from "./Arrow";
import { LINKS } from "@/content/home";

/**
 * The banner: the college's own words over its own photographs. The video (video/banner,
 * rendered with Remotion) pans and dissolves through ten photographs in a 50-second loop.
 * It is muted, autoplays inline and shows a poster while loading; reduced-motion users get
 * the poster only.
 */
export default function VideoBanner() {
  return (
    <section id="top" className="nh-hero">
      <video className="nh-film" autoPlay muted loop playsInline preload="metadata" poster="/video/banner-poster.jpg" aria-hidden="true">
        <source src="/video/banner.webm" type="video/webm" />
        <source src="/video/banner.mp4" type="video/mp4" />
      </video>
      <div className="nh-veil" aria-hidden="true" />
      <div className="nh-container nh-hero-copy">
        <h1 className="nh-hero-h1">
          <span className="nh-rise" style={{ "--d": "40ms" } as React.CSSProperties}>A Standard</span>
          <span className="nh-rise" style={{ "--d": "140ms" } as React.CSSProperties}>of Excellence.</span>
          <span className="nh-rise nh-hero-gold" style={{ "--d": "240ms" } as React.CSSProperties}>Equip and Empower.</span>
        </h1>
        <p className="nh-rise nh-lead nh-hero-lead" style={{ "--d": "360ms" } as React.CSSProperties}>
          Join a mission dedicated to raising Spirit-filled, anointed leaders who will disciple nations, upholding a standard of excellence since 1991.
        </p>
        <div className="nh-rise nh-actions" style={{ "--d": "480ms" } as React.CSSProperties}>
          <Link href={LINKS.about} className="nh-btn nh-btn-gold">
            Find out more <Arrow />
          </Link>
          <Link href={LINKS.programs} className="nh-btn nh-btn-ghost">
            Find your program
          </Link>
        </div>
        <p className="nh-rise nh-num nh-hero-facts" style={{ "--d": "600ms" } as React.CSSProperties}>
          Est. 1991 · Phoenix campus or online classes · Interdenominational
        </p>
      </div>
    </section>
  );
}
