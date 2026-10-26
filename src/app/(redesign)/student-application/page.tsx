import type { Metadata } from "next";
import Link from "next/link";
import Arrow from "@/components/site/Arrow";
import PageHead from "@/components/site/PageHead";
import RequestBand from "@/components/site/RequestBand";
import { COPY } from "@/content/copy";
import { LINKS } from "@/content/home";
import { descriptions } from "@/lib/content";

const PATH = "/student-application";
const description = descriptions[PATH] ?? descriptions["/ministry-training-college-student-application"];
export const metadata: Metadata = { title: "Student Application", description, alternates: { canonical: PATH }, openGraph: { title: "Student Application", description, url: PATH, images: [{ url: "/images/uploads/2024/02/nh-8.jpg", width: 1920, height: 600 }] } };

const Ac = ({ children }: { children: React.ReactNode }) => <span className="nh-ac">{children}</span>;
const DOCUMENTS = ["Application fee ($50)", "Two standard passport photos", "Statement of faith", "Statement of purpose (Christian conversion)", "Pastoral recommendation", "Official copy of high-school transcript", "Privacy rights of students"];

export default function StudentApplicationPage() {
  return (
    <main>
      <PageHead
        trail={[{ label: "Student Application", href: PATH }]}
        title={
          <>
            Your application, step by <Ac>step</Ac>
          </>
        }
        lead={COPY.studentApplication}
        actions={
          <>
            <Link href={LINKS.apply} className="nh-btn nh-btn-gold">
              Apply now <Arrow />
            </Link>
            <Link href={LINKS.admissions} className="nh-btn nh-btn-line">
              Admissions
            </Link>
          </>
        }
        photo={{ src: "/images/uploads/2024/02/nh-8.jpg", alt: "A graduate receiving a diploma on stage", position: "center 30%" }}
      />
      <section id="documents" className="nh-band nh-band-gray">
        <div className="nh-container nh-split nh-split-top">
          <div className="nh-stack">
            <h2 className="nh-h2-sm">
              What to <Ac>submit</Ac>
            </h2>
            <p className="nh-soft">Every application must be accompanied by the following, sent to the Office of Admission and Records.</p>
            <ol className="nh-rows nh-doc-list">
              {DOCUMENTS.map((doc, i) => (
                <li key={doc} className="nh-row nh-row-doc">
                  <span className="nh-doc-no nh-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <strong>{doc}</strong>
                </li>
              ))}
            </ol>
          </div>
          <aside className="nh-aside nh-aside-flush">
            <h3>
              Where you <Ac>apply</Ac> from
            </h3>
            <div className="nh-rows">
              <div className="nh-row nh-row-1">
                <span className="nh-row-text">
                  <strong>United States, Canada and Europe</strong>
                  <span className="nh-soft">Apply online, one question at a time, and sign at the end.</span>
                  <Link href={LINKS.apply} className="nh-link nh-link-sm">
                    Apply online <Arrow size={16} />
                  </Link>
                </span>
              </div>
              <div className="nh-row nh-row-1">
                <span className="nh-row-text">
                  <strong>International students</strong>
                  <span className="nh-soft">Submit your application package to your directors.</span>
                </span>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <RequestBand lead="Not sure which program to apply for? Tell us about yourself and we reply with a recommendation." />
    </main>
  );
}
