import type { ReactNode } from "react";
import ContactForm from "@/components/forms/ContactForm";
import AppointmentForm from "@/components/forms/AppointmentForm";
import DonateBlock from "@/components/DonateBlock";
import ApplyCallout from "@/components/site/ApplyCallout";

const FORMS: Record<string, ReactNode> = {
  contact: <ContactForm />,
  appointment: <AppointmentForm />,
  donate: <DonateBlock />,
  applynow: <ApplyCallout />,
};

/** Blocks in the export that are swapped for React components before rendering. */
const SWAPS: [RegExp, string][] = [[/<div class="app_btn">[\s\S]*?<\/div>/, "<!--FORM:applynow-->"]];

/**
 * Renders page HTML extracted from the WordPress dump. The extraction script replaced the
 * Proweaver form shortcodes with <!--FORM:name--> markers; those are swapped for React forms here.
 */
export default function HtmlContent({ html }: { html: string }) {
  const parts = SWAPS.reduce((h, [re, marker]) => h.replace(re, marker), html).split(/<!--FORM:([a-z]+)-->/);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <div key={i}>{FORMS[part] ?? null}</div>
        ) : part.trim() ? (
          <div key={i} dangerouslySetInnerHTML={{ __html: part }} />
        ) : null,
      )}
    </>
  );
}
