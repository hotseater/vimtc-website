import Link from "next/link";
import Arrow from "./Arrow";
import { LINKS } from "@/content/home";

/** Replaces the old "APPLY NOW" image button on the Student Application page. */
export default function ApplyCallout() {
  return (
    <aside className="nh-callout">
      <div className="nh-stack">
        <h2 className="nh-h2-sm">
          Ready to <span className="nh-ac">apply</span>?
        </h2>
        <p className="nh-soft">Students in the US, Canada and Europe apply online here. International students submit their application package to their directors.</p>
        <div className="nh-actions">
          <Link href={LINKS.apply} className="nh-btn nh-btn-gold">
            Apply now <Arrow />
          </Link>
          <Link href={LINKS.contact} className="nh-btn nh-btn-line">
            Ask admissions
          </Link>
        </div>
      </div>
    </aside>
  );
}
