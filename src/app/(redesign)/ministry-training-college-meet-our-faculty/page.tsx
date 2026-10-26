import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Arrow from "@/components/site/Arrow";
import PageHead from "@/components/site/PageHead";
import RequestBand from "@/components/site/RequestBand";
import { COPY } from "@/content/copy";
import { LEADERSHIP, LINKS } from "@/content/home";
import { descriptions } from "@/lib/content";

const PATH = LINKS.faculty;
const description = descriptions[PATH];
export const metadata: Metadata = { title: "Meet Our Faculty", description, alternates: { canonical: PATH }, openGraph: { title: "Meet Our Faculty", description, url: PATH, images: [{ url: "/images/uploads/2024/02/nh-4.jpg", width: 1920, height: 600 }] } };

const Ac = ({ children }: { children: React.ReactNode }) => <span className="nh-ac">{children}</span>;

export default function FacultyPage() {
  return (
    <main>
      <PageHead
        trail={[{ label: "Meet Our Faculty", href: PATH }]}
        title={
          <>
            Teachers who <Ac>pastor</Ac>
          </>
        }
        lead={COPY.faculty[0]}
        actions={
          <>
            <Link href={LINKS.programs} className="nh-btn nh-btn-blue">
              See the programs <Arrow />
            </Link>
            <Link href={LINKS.about} className="nh-btn nh-btn-line">
              About the college
            </Link>
          </>
        }
        photo={{ src: "/images/uploads/2024/02/nh-4.jpg", alt: "Faculty members addressing graduates at a ceremony", position: "center 35%" }}
      />
      <section className="nh-band nh-band-gray">
        <div className="nh-container nh-split nh-split-top">
          <div className="nh-stack nh-sticky">
            <h2 className="nh-h2-sm">
              Mentors, not only <Ac>educators</Ac>
            </h2>
            <p className="nh-soft">{COPY.faculty[1]}</p>
          </div>
          <div className="nh-stack">
            <h3>Leadership</h3>
            <div className="nh-rows">
              {LEADERSHIP.map((l) => (
                <div key={l.name} className="nh-row nh-row-1">
                  <span className="nh-row-text">
                    <strong>{l.name}</strong>
                    <span className="nh-soft">{l.role}</span>
                  </span>
                </div>
              ))}
            </div>
            <aside className="nh-aside">
              <h3>
                Faculty <Ac>profiles</Ac>
              </h3>
              <p className="nh-soft">Individual faculty profiles are being prepared by the college. Until they are published, admissions can tell you who teaches each program.</p>
              <Link href="#request" className="nh-link">
                Ask who teaches your program <Arrow />
              </Link>
            </aside>
          </div>
        </div>
      </section>
      <section className="nh-band nh-band-white">
        <div className="nh-container nh-split">
          <div className="nh-photo nh-zoom nh-photo-tall">
            <Image src="/images/theme/main-img1.jpg" alt="Apostle Dr. P. Ray Johnson" fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: "top" }} />
          </div>
          <div className="nh-stack nh-center">
            <h2 className="nh-h2-sm">
              Founded by <Ac>practitioners</Ac>
            </h2>
            <p className="nh-soft">Drs. P. Ray and Mama Joycelyn Johnson founded the college in 1991 after years in ministry. The curriculum, faculty and staff are chosen to impart the faith, wisdom and vision required to build ministries founded on the Word of God.</p>
            <div>
              <Link href={LINKS.about} className="nh-link">
                The college’s story <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <RequestBand lead="Tell us which program you are considering and we reply with who teaches it, the schedule and the tuition." />
    </main>
  );
}
