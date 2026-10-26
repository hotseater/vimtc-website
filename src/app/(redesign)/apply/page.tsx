import type { Metadata } from "next";
import Link from "next/link";
import ApplyWizard from "@/components/forms/ApplyWizard";
import { descriptions } from "@/lib/content";

export const metadata: Metadata = {
  title: "Apply",
  description: descriptions["/apply"],
  alternates: { canonical: "/apply" },
  robots: { index: false, follow: true },
};

/** The online application: the enrollment form's fields, one question at a time. */
export default function ApplyPage() {
  return (
    <main className="nh-band nh-band-gray nh-apply">
      <div className="nh-container nh-apply-wrap">
        <nav aria-label="Breadcrumb" className="nh-crumbs nh-meta">
          <Link href="/">Home</Link> <span aria-hidden="true">›</span> <Link href="/student-application">Student Application</Link> <span aria-hidden="true">›</span> <span aria-current="page">Apply</span>
        </nav>
        <ApplyWizard />
      </div>
    </main>
  );
}
