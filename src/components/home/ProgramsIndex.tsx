"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Arrow from "./Arrow";
import { LEVEL_NAMES, PROGRAMS, type Level } from "@/content/home";

const FILTERS: { label: string; level: Level | 0 }[] = [
  { label: "All", level: 0 },
  { label: "Certificate", level: 1 },
  { label: "Diploma", level: 2 },
  { label: "Associate", level: 3 },
  { label: "Bachelor", level: 4 },
];

/** The programs as an index of hairline rows, filterable by level. Rows re-enter with a short stagger when the filter changes. */
export default function ProgramsIndex() {
  const [level, setLevel] = useState<Level | 0>(0);
  const shown = level === 0 ? PROGRAMS : PROGRAMS.filter((p) => p.level === level);

  return (
    <>
      <div className="nh-chips" role="group" aria-label="Filter programs by level">
        {FILTERS.map((f) => (
          <button key={f.level} type="button" className={`nh-chip${f.level === level ? " is-on" : ""}`} aria-pressed={f.level === level} onClick={() => setLevel(f.level)}>
            {f.label}
          </button>
        ))}
      </div>
      <div className="nh-index">
        <div className="nh-index-head">
          <span>Level</span>
          <span>Program</span>
          <span>Format</span>
          <span />
        </div>
        {shown.map((p, i) => (
          <Link key={`${level}-${p.href}-${p.name}`} href={p.href} className="nh-row nh-row-prog nh-rin" style={{ "--d": `${Math.min(i, 8) * 40}ms` } as React.CSSProperties}>
            <span className={`nh-disc${p.level === 4 ? " nh-disc-4" : ""}`} aria-label={`Level ${p.level}`}>
              {p.level}
            </span>
            <span className="nh-row-main">
              <span className="nh-thumb">
                <Image src={p.image} alt="" fill sizes="72px" style={{ objectFit: "cover" }} />
              </span>
              <span className="nh-row-text">
                <strong>{p.name}</strong>
                {p.blurb ? <span className="nh-soft nh-row-blurb">{p.blurb}</span> : null}
              </span>
            </span>
            <span className="nh-row-meta nh-soft">
              <strong>{LEVEL_NAMES[p.level]}</strong>
              Campus or online
            </span>
            <Arrow size={22} />
          </Link>
        ))}
      </div>
    </>
  );
}
