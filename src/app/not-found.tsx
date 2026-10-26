import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import LegacyChrome from "@/components/LegacyChrome";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <LegacyChrome>
    <PageShell title="Page Not Found" banner={null} trail={[{ label: "Page not found", href: "/404" }]}>
      <div className="not_found">
        <Image src="/images/theme/404.png" alt="" width={500} height={500} />
        <p>Sorry, the page you are looking for does not exist or has moved.</p>
        <div className="student_btn">
          <Link className="btn-style" href="/">
            Back to Home
          </Link>
        </div>
      </div>
    </PageShell>
    </LegacyChrome>
  );
}
