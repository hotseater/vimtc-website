import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Crumb } from "./ContentShell";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/** Page head for the redesigned pages: breadcrumb, title, lead, actions, optional facts, optional photo filling the right column. */
export default function PageHead({ trail, title, lead, actions, facts, photo }: { trail: Crumb[]; title: ReactNode; lead?: ReactNode; actions?: ReactNode; facts?: ReactNode; photo?: { src: string; alt: string; position?: string } }) {
  const copy = (
    <div className="nh-stack">
      <nav aria-label="Breadcrumb" className="nh-crumbs nh-meta nh-rise" style={d(0)}>
        <Link href="/">Home</Link>
        {trail.map((c, i) => (
          <span key={c.href}>
            {" "}
            <span aria-hidden="true">›</span> {i === trail.length - 1 ? <span aria-current="page">{c.label}</span> : <Link href={c.href}>{c.label}</Link>}
          </span>
        ))}
      </nav>
      <h1 className="nh-page-title nh-rise" style={d(100)}>
        {title}
      </h1>
      {lead ? (
        <p className="nh-lead nh-soft nh-rise" style={d(220)}>
          {lead}
        </p>
      ) : null}
      {actions ? (
        <div className="nh-actions nh-rise" style={d(340)}>
          {actions}
        </div>
      ) : null}
      {facts ? (
        <ul className="nh-facts nh-num nh-facts-inline nh-rise" style={d(460)}>
          {facts}
        </ul>
      ) : null}
    </div>
  );
  return (
    <section className={`nh-band nh-band-white nh-pagehead${photo ? "" : " nh-pagehead-tight"}`}>
      {photo ? (
        <div className="nh-container nh-split nh-program-hero">
          {copy}
          <div className="nh-photo nh-zoom nh-photo-page nh-unveil">
            <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: photo.position ?? "center" }} priority />
          </div>
        </div>
      ) : (
        <div className="nh-container">{copy}</div>
      )}
    </section>
  );
}
