import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Arrow from "@/components/site/Arrow";
import PageHead from "@/components/site/PageHead";
import RequestBand from "@/components/site/RequestBand";
import { COPY } from "@/content/copy";
import { LINKS, PROGRAMS } from "@/content/home";
import { descriptions } from "@/lib/content";

const PATH = LINKS.accreditation;
const description = descriptions[PATH];
export const metadata: Metadata = { title: "Accreditation", description, alternates: { canonical: PATH }, openGraph: { title: "Accreditation", description, url: PATH, images: [{ url: "/images/theme/thumbnails/trans-acc-logo.png", width: 858, height: 692 }] } };

const Ac = ({ children }: { children: React.ReactNode }) => <span className="nh-ac">{children}</span>;

export default function AccreditationPage() {
  const [intro, ...rest] = COPY.accreditation.paras;
  return (
    <main>
      <PageHead
        trail={[{ label: "Accreditation", href: PATH }]}
        title={
          <>
            Accredited, and <Ac>honest</Ac> about what that means
          </>
        }
        lead={intro}
        actions={
          <>
            <a href="https://www.transworldaccrediting.com/" target="_blank" rel="noopener noreferrer" className="nh-btn nh-btn-line">
              Transworld Accrediting Commission <Arrow />
            </a>
          </>
        }
      />
      <section className="nh-band nh-band-gray">
        <div className="nh-container nh-split nh-split-top">
          <div className="nh-stack nh-sticky">
            <Image src="/images/theme/thumbnails/trans-acc-logo.png" alt="Transworld Accrediting Commission International" width={180} height={145} />
            <h2 className="nh-h2-sm">
              What it does <Ac>not</Ac> cover
            </h2>
            <p className="nh-soft">Degrees are acknowledged within the United States but are not government-accredited. As a result:</p>
          </div>
          <div className="nh-rows">
            {COPY.accreditation.limits.map((t) => (
              <div key={t} className="nh-row nh-row-1">
                <p className="nh-belief nh-serif">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="nh-band nh-band-white">
        <div className="nh-container nh-split nh-split-top">
          <div className="nh-stack">
            <h2 className="nh-h2-sm">
              Religious-exempt, like most ministry <Ac>education</Ac>
            </h2>
            {rest.map((p) => (
              <p key={p} className="nh-soft">
                {p}
              </p>
            ))}
          </div>
          <aside className="nh-aside nh-aside-flush">
            <h3>
              Course <Ac>outlines</Ac>
            </h3>
            <p className="nh-soft">The outline for each program, with its course codes and names, is on the program’s page.</p>
            <div className="nh-rows">
              {PROGRAMS.filter((p) => p.hasPage).map((p) => (
                <Link key={p.slug} href={p.href} className="nh-row nh-row-2">
                  <span className="nh-row-text">
                    <strong>{p.name}</strong>
                  </span>
                  <Arrow size={22} />
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>
      <RequestBand lead="Ask us how VIMTC’s accreditation applies to your plans and we reply plainly." />
    </main>
  );
}
