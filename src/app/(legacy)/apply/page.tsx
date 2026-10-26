import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import EnrollmentForm from "@/components/forms/EnrollmentForm";
import { descriptions } from "@/lib/content";

export const metadata: Metadata = {
  title: "College Enrollment Form",
  description: descriptions["/apply"],
  alternates: { canonical: "/apply" },
  robots: { index: false, follow: true },
};

/** Replaces the standalone PHP enrollment form that lived under /wp-content/themes/.../forms/custom/applyNowForm. */
export default function ApplyPage() {
  return (
    <PageShell
      title="College Enrollment Form"
      banner="/images/uploads/2024/02/nh-8.jpg"
      bannerAlt="Young boy get his diploma on stage"
      trail={[
        { label: "Student Application", href: "/student-application" },
        { label: "College Enrollment Form", href: "/apply" },
      ]}
    >
      <EnrollmentForm />
    </PageShell>
  );
}
