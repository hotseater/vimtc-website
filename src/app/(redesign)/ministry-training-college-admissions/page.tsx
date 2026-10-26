import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Arrow from "@/components/site/Arrow";
import RequestBand from "@/components/site/RequestBand";
import { LINKS, WHY } from "@/content/home";
import { descriptions } from "@/lib/content";
import { CONTACT } from "@/lib/site";

const PATH = LINKS.admissions;
const description = descriptions[PATH];

export const metadata: Metadata = {
  title: "Admissions",
  description,
  alternates: { canonical: PATH },
  openGraph: { title: "Admissions", description, url: PATH, images: [{ url: "/images/theme/slider/rslides/1.jpg", width: 1920, height: 800 }] },
};

const Ac = ({ children }: { children: React.ReactNode }) => <span className="nh-ac">{children}</span>;
const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

const STEPS = [
  { title: "Explore programs", text: "Discover the program that aligns with your interests, passions and ministry goals. Four levels, from a certificate to a Bachelor of Arts.", href: LINKS.programs, link: "Browse the programs" },
  { title: "Apply online", text: "Complete the online application form, one question at a time, and sign it. It takes about five minutes.", href: LINKS.apply, link: "Start the application" },
  { title: "Send your documents", text: "Submit the documents below to the Office of Admission and Records. If anything is missing, admissions emails you.", href: "#documents", link: "See the list" },
  { title: "Acceptance", text: "On acceptance you receive everything needed to prepare for the semester, including registration details and orientation dates.", href: LINKS.schedules, link: "Class schedules" },
];

const DOCUMENTS = ["Application fee ($50)", "Two standard passport photos", "Statement of faith", "Statement of purpose (Christian conversion)", "Pastoral recommendation", "Official copy of high-school transcript", "Privacy rights of students"];

export default function AdmissionsPage() {
  return (
    <main>
      {/* Head */}
      <section className="nh-band nh-band-white nh-pagehead">
        <div className="nh-container nh-split nh-program-hero">
          <div className="nh-stack">
            <nav aria-label="Breadcrumb" className="nh-crumbs nh-meta nh-rise" style={d(0)}>
              <Link href="/">Home</Link> <span aria-hidden="true">›</span> <span aria-current="page">Admissions</span>
            </nav>
            <h1 className="nh-page-title nh-rise" style={d(100)}>
              Find your place <Ac>here</Ac>
            </h1>
            <p className="nh-lead nh-soft nh-rise" style={d(220)}>
              We believe in nurturing leaders who are not only academically prepared but also spiritually equipped to make a lasting impact. The admissions process is designed so that every student finds their place in our community, grows in faith, develops their skills and pursues their calling with purpose.
            </p>
            <div className="nh-actions nh-rise" style={d(340)}>
              <Link href={LINKS.apply} className="nh-btn nh-btn-gold">
                Apply now <Arrow />
              </Link>
              <Link href="#request" className="nh-btn nh-btn-line">
                Request information
              </Link>
            </div>
            <ul className="nh-facts nh-num nh-facts-inline nh-rise" style={d(460)}>
              <li>
                <strong>Apply</strong> Online, in about five minutes
              </li>
              <li>
                <strong>Study</strong> On the Phoenix campus or online
              </li>
              <li>
                <strong>Ask</strong>{" "}
                <a href={CONTACT.phoneHref}>{CONTACT.phone}</a> · <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </li>
            </ul>
          </div>
          <div className="nh-photo nh-zoom nh-photo-page nh-unveil">
            <Image src="/images/theme/slider/rslides/1.jpg" alt="The accreditation certificate being presented at a VIMTC ceremony" fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: "58% center" }} priority />
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="nh-band nh-band-gray">
        <div className="nh-container nh-split nh-split-top">
          <div className="nh-stack nh-sticky">
            <h2>
              Four steps from here to your <Ac>first class</Ac>
            </h2>
            <p className="nh-soft">Nothing is sent until you sign the application, and admissions is one email or call away at every step.</p>
          </div>
          <ol className="nh-steps">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <span className="nh-step-no nh-num" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="nh-row-text">
                  <strong>{s.title}</strong>
                  <span className="nh-soft">{s.text}</span>
                  <Link href={s.href} className="nh-link nh-link-sm">
                    {s.link} <Arrow size={16} />
                  </Link>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Documents */}
      <section id="documents" className="nh-band nh-band-white">
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
                  <span className="nh-soft">Apply online. The form asks for your details, the program you want and your signature.</span>
                  <Link href={LINKS.apply} className="nh-link nh-link-sm">
                    Apply online <Arrow size={16} />
                  </Link>
                </span>
              </div>
              <div className="nh-row nh-row-1">
                <span className="nh-row-text">
                  <strong>International students</strong>
                  <span className="nh-soft">Submit your application package to your directors, who forward it to the college.</span>
                </span>
              </div>
              <div className="nh-row nh-row-1">
                <span className="nh-row-text">
                  <strong>Not sure where to start?</strong>
                  <span className="nh-soft">Set an appointment and talk it through with admissions first.</span>
                  <Link href={LINKS.appointment} className="nh-link nh-link-sm">
                    Set an appointment <Arrow size={16} />
                  </Link>
                </span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Why */}
      <section id="why" className="nh-band nh-band-gray">
        <div className="nh-container nh-split nh-split-top">
          <div className="nh-stack nh-sticky">
            <h2>
              Why students <Ac>choose</Ac> VIMTC
            </h2>
            <p className="nh-soft">Faith-centered education, experienced faculty, programs for many callings, a close-knit community, and honest accreditation.</p>
            <div>
              <Link href={LINKS.about} className="nh-link">
                About the college <Arrow />
              </Link>
            </div>
          </div>
          <div className="nh-rows">
            {WHY.map((w) => (
              <div key={w.title} className="nh-row nh-row-1">
                <span className="nh-row-text">
                  <strong>{w.title}</strong>
                  <span className="nh-soft">{w.text}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RequestBand lead="Tell us which program you are considering and we reply with the schedule, the tuition and what to prepare." />
    </main>
  );
}
