import type { Metadata } from "next";
import Link from "next/link";
import ContentShell from "@/components/site/ContentShell";
import RedesignChrome from "@/components/site/RedesignChrome";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <RedesignChrome>
      <ContentShell title="Page not found" lead="Sorry, the page you are looking for does not exist or has moved." trail={[{ label: "Page not found", href: "/404" }]}>
        <p>
          <Link href="/" className="nh-btn nh-btn-blue">
            Back to the home page
          </Link>
        </p>
      </ContentShell>
    </RedesignChrome>
  );
}
