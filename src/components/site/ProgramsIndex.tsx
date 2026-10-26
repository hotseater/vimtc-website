"use client";

import { useId, useState } from "react";
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

/**
 * The programs as an index of hairline rows, filterable by level.
 * Columns read left to right the way the header labels them: Program, Level, Format.
 * Each row is one link; the result count is announced when the filter changes.
 */
export default function ProgramsIndex() {
  const [level, setLevel] = useState<Level | 0>(0);
  const countId = useId();
  const shown = level === 0 ? PROGRAMS : PROGRAMS.filter((p) => p.level === level);
  const count = (lv: Level | 0) => (lv === 0 ? PROGRAMS.length : PROGRAMS.filter((p) => p.level === lv).length);

  return (
    <div className="nh-stack">
      <div className="nh-filter">
        <div className="nh-chips" role="group" aria-label="Filter programs by level" aria-describedby={countId}>
          {FILTERS.map((f) => (
            <button key={f.level} type="button" className={`nh-chip${f.level === level ? " is-on" : ""}`} aria-pressed={f.level === level} onClick={() => setLevel(f.level)}>
              {f.label} <span className="nh-chip-count nh-num">{count(f.level)}</span>
            </button>
          ))}
        </div>
        <p id={countId} className="nh-meta nh-num" aria-live="polite">
          {shown.length === PROGRAMS.length ? `All ${PROGRAMS.length} programs` : `${shown.length} ${shown.length === 1 ? "program" : "programs"} at ${LEVEL_NAMES[level as Level]} level`}
        </p>
      </div>
      <div className="nh-index">
        <div className="nh-index-head" aria-hidden="true">
          <span>Program</span>
          <span>Level</span>
          <span>Format</span>
          <span />
        </div>
        <ul className="nh-index-list">
          {shown.map((p, i) => (
            <li key={`${level}-${p.name}`} className="nh-rin" style={{ "--d": `${Math.min(i, 8) * 40}ms` } as React.CSSProperties}>
              <Link href={p.href} className="nh-row nh-row-prog">
                <span className="nh-row-text">
                  <strong>{p.name}</strong>
                  {p.blurb ? <span className="nh-soft nh-row-blurb">{p.blurb}</span> : null}
                </span>
                <span className="nh-level">
                  <span className={`nh-disc${p.level === 4 ? " nh-disc-4" : ""}`} aria-hidden="true">
                    {p.level}
                  </span>
                  <span>
                    <span className="nh-sr">Level {p.level}, </span>
                    {LEVEL_NAMES[p.level]}
                  </span>
                </span>
                <span className="nh-row-meta nh-soft">Campus or online</span>
                <Arrow size={22} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
