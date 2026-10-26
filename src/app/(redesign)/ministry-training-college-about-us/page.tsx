import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Arrow from "@/components/site/Arrow";
import RequestBand from "@/components/site/RequestBand";
import { ABOUT } from "@/content/about";
import { LEADERSHIP, LINKS } from "@/content/home";
import { descriptions } from "@/lib/content";

const PATH = LINKS.about;
const description = descriptions[PATH];

export const metadata: Metadata = {
  title: "About Us",
  description,
  alternates: { canonical: PATH },
  openGraph: { title: "About Us", description, url: PATH, images: [{ url: "/images/theme/slider/rslides/2.jpg", width: 1920, height: 800 }] },
};

const Ac = ({ children }: { children: React.ReactNode }) => <span className="nh-ac">{children}</span>;
const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

const WHAT_WE_DO = [
  { title: "The School of Ministry", text: ABOUT.curriculum },
  { title: "Online Bible training classes", text: ABOUT.online },
  { title: "School of Ministry and Mission programs", text: ABOUT.programs },
  { title: "Earned degrees", text: ABOUT.earned },
];

export default function AboutPage() {
  return (
    <main>
      {/* Head */}
      <section className="nh-band nh-band-white nh-pagehead">
        <div className="nh-container nh-split nh-program-hero">
          <div className="nh-stack">
            <nav aria-label="Breadcrumb" className="nh-crumbs nh-meta nh-rise" style={d(0)}>
              <Link href="/">Home</Link> <span aria-hidden="true">›</span> <span aria-current="page">About Us</span>
            </nav>
            <h1 className="nh-page-title nh-rise" style={d(100)}>
              Trained to be <Ac>sent</Ac>
            </h1>
            <p className="nh-lead nh-soft nh-rise" style={d(220)}>{ABOUT.mission}</p>
            <div className="nh-actions nh-rise" style={d(340)}>
              <Link href={LINKS.programs} className="nh-btn nh-btn-blue">
                See the programs <Arrow />
              </Link>
              <Link href={LINKS.faculty} className="nh-btn nh-btn-line">
                Meet the faculty
              </Link>
            </div>
            <ul className="nh-facts nh-num nh-facts-inline nh-rise" style={d(460)}>
              <li>
                <strong>Est.</strong> 1991, by Drs. P. Ray and Joycelyn Johnson
              </li>
              <li>
                <strong>Where</strong> Phoenix, Arizona, and online
              </li>
              <li>
                <strong>Who</strong> Interdenominational, in unity with the wider Body of Christ
              </li>
            </ul>
          </div>
          <div className="nh-photo nh-zoom nh-photo-page nh-unveil">
            <Image src="/images/theme/slider/rslides/2.jpg" alt="Three VIMTC faculty members in academic regalia" fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: "center 20%" }} priority />
          </div>
        </div>
      </section>

      {/* What we do */}
      <section id="what-we-do" className="nh-band nh-band-gray">
        <div className="nh-container nh-split nh-split-top">
          <div className="nh-stack nh-sticky">
            <h2>
              What we <Ac>do</Ac>
            </h2>
            <p className="nh-soft">{ABOUT.purpose}</p>
            <p className="nh-soft">{ABOUT.prepared}</p>
          </div>
          <div className="nh-rows">
            {WHAT_WE_DO.map((w) => (
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

      {/* Leadership */}
      <section id="leadership" className="nh-band nh-band-white">
        <div className="nh-container nh-split">
          <div className="nh-photo nh-zoom nh-photo-tall">
            <Image src="/images/theme/main-img1.jpg" alt="Apostle Dr. P. Ray Johnson" fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: "top" }} />
          </div>
          <div className="nh-stack nh-center">
            <h2 className="nh-h2-sm">
              A journey of more than <Ac>thirty years</Ac>
            </h2>
            <p className="nh-soft">Founded in 1991 by Drs. P. Ray and Mama Joycelyn Johnson, the college is led today by its President, Bishop Dr. Phillips Banini Sr. Its graduates number in the thousands, around the world.</p>
            <dl className="nh-dl">
              {LEADERSHIP.map((l) => (
                <div key={l.name}>
                  <dt>{l.name}</dt>
                  <dd className="nh-soft">{l.role}</dd>
                </div>
              ))}
            </dl>
            <figure className="nh-brochure">
              <Image src="/images/uploads/2024/02/about_us_img.jpg" alt="Cover of the VIMTC brochure: VIM College, making a mark in the world discipling the nations" width={160} height={240} />
              <figcaption className="nh-meta">From the VIMTC brochure: “Making a mark in the world discipling the nations.”</figcaption>
            </figure>
            <div>
              <Link href={LINKS.faculty} className="nh-link">
                Meet our faculty <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Beliefs */}
      <section id="beliefs" className="nh-band nh-band-gray">
        <div className="nh-container nh-split nh-split-top">
          <div className="nh-stack nh-sticky">
            <h2>
              What we <Ac>believe</Ac>
            </h2>
            <p className="nh-soft">{ABOUT.beliefsIntro}</p>
            <p className="nh-soft">{ABOUT.beliefsOutro}</p>
            <aside className="nh-aside">
              <h3>
                Denominational <Ac>affiliation</Ac>
              </h3>
              <p className="nh-soft">{ABOUT.affiliation}</p>
            </aside>
          </div>
          <div className="nh-rows">
            {ABOUT.beliefs.map((b) => (
              <div key={b} className="nh-row nh-row-1">
                <p className="nh-belief nh-serif">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditation */}
      <section className="nh-band nh-band-white">
        <div className="nh-container nh-split nh-split-top">
          <aside className="nh-aside nh-aside-flush">
            <Image src="/images/theme/thumbnails/trans-acc-logo.png" alt="Transworld Accrediting Commission International" width={140} height={113} />
            <h3>
              Accredited, and <Ac>honest</Ac> about what that means
            </h3>
            <p className="nh-soft">VIMTC is accredited through recognized religious accrediting bodies such as the Transworld Accrediting Commission. Its degrees are not government-accredited, so federal student loans do not apply and credits may not transfer to government-accredited universities.</p>
            <Link href={LINKS.accreditation} className="nh-link">
              Read the accreditation page <Arrow />
            </Link>
          </aside>
          <div className="nh-stack">
            <h2 className="nh-h2-sm">
              Come and <Ac>see</Ac>
            </h2>
            <div className="nh-rows">
              <Link href={LINKS.events} className="nh-row nh-row-2">
                <span className="nh-row-text">
                  <strong>Campus events</strong>
                  <span className="nh-soft">Enrolment days, conferences and graduation, in Phoenix and online.</span>
                </span>
                <Arrow size={22} />
              </Link>
              <Link href={LINKS.gallery} className="nh-row nh-row-2">
                <span className="nh-row-text">
                  <strong>Gallery</strong>
                  <span className="nh-soft">The life and spirit of the college in pictures.</span>
                </span>
                <Arrow size={22} />
              </Link>
              <Link href={LINKS.appointment} className="nh-row nh-row-2">
                <span className="nh-row-text">
                  <strong>Set an appointment</strong>
                  <span className="nh-soft">Talk with admissions about where you could start.</span>
                </span>
                <Arrow size={22} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <RequestBand lead="Ask us anything about the college, the programs or the schedule. We reply within two working days." />
    </main>
  );
}
