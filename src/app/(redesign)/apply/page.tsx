import type { Metadata } from "next";
import ContentShell from "@/components/site/ContentShell";
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
    <ContentShell
      title="College Enrollment Form"
      lead="Complete the form below to apply. Fields marked with an asterisk are required."
      trail={[
        { label: "Student Application", href: "/student-application" },
        { label: "College Enrollment Form", href: "/apply" },
      ]}
    >
      <EnrollmentForm />
    </ContentShell>
  );
}
