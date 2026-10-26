import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Arrow from "@/components/site/Arrow";
import PageHead from "@/components/site/PageHead";
import RequestBand from "@/components/site/RequestBand";
import { COPY } from "@/content/copy";
import { LINKS } from "@/content/home";
import { FACULTY, initials } from "@/content/faculty";
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
        <div className="nh-container nh-stack-lg">
          <div className="nh-section-head">
            <h2 className="nh-h2-sm">
              <Ac>Leadership</Ac>
            </h2>
            <p className="nh-meta">{COPY.faculty[1].split(". ")[0]}.</p>
          </div>
          <FacultyGrid members={FACULTY.filter((m) => m.group === "leadership")} large />
          <div className="nh-section-head">
            <h2 className="nh-h2-sm">
              <Ac>Faculty</Ac>
            </h2>
          </div>
          {FACULTY.some((m) => m.group === "faculty") ? (
            <FacultyGrid members={FACULTY.filter((m) => m.group === "faculty")} />
          ) : (
            <aside className="nh-aside nh-aside-flush nh-empty">
              <p className="nh-soft">Faculty profiles are being prepared by the college and will appear here. Until then, admissions can tell you who teaches each program.</p>
              <Link href="#request" className="nh-link">
                Ask who teaches your program <Arrow />
              </Link>
            </aside>
          )}
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

/** Profile cards. A member without a photo gets an initials disc so the grid never shows a broken image. */
function FacultyGrid({ members, large = false }: { members: typeof FACULTY; large?: boolean }) {
  return (
    <ul className={`nh-faculty${large ? " nh-faculty-lg" : ""}`}>
      {members.map((m) => (
        <li key={m.name} className="nh-person">
          <div className="nh-person-photo nh-photo nh-zoom">
            {m.photo ? <Image src={m.photo} alt={m.name} fill sizes="(max-width: 700px) 50vw, 25vw" style={{ objectFit: "cover", objectPosition: "top" }} /> : <span className="nh-person-initials" aria-hidden="true">{initials(m.name)}</span>}
          </div>
          <div className="nh-person-text">
            <strong>{m.name}</strong>
            <span className="nh-soft">{m.role}</span>
            {m.credentials ? <span className="nh-meta">{m.credentials}</span> : null}
            {m.bio ? <p className="nh-soft nh-person-bio">{m.bio}</p> : null}
            {m.teaches?.length ? <span className="nh-meta">Teaches: {m.teaches.join(", ")}</span> : null}
            {m.email ? <a href={`mailto:${m.email}`} className="nh-link nh-link-sm">Email</a> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
