import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Arrow from "@/components/home/Arrow";
import VideoBanner from "@/components/home/VideoBanner";
import ProgramsIndex from "@/components/home/ProgramsIndex";
import RequestInfoForm from "@/components/home/RequestInfoForm";
import { LEADERSHIP, LINKS, WHY } from "@/content/home";
import { CONTACT, SITE_DESCRIPTION, SITE_TAGLINE } from "@/lib/site";

export const metadata: Metadata = {
  // identical to the live site's Yoast output
  title: { absolute: SITE_TAGLINE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: { title: SITE_TAGLINE, description: SITE_DESCRIPTION, url: "/", images: [{ url: "/video/banner-poster.jpg", width: 1920, height: 1080 }] },
};

const Ac = ({ children }: { children: React.ReactNode }) => <span className="nh-ac">{children}</span>;

export default function HomePage() {
  return (
    <main>
      <VideoBanner />

      {/* Facts, said plainly */}
      <section className="nh-band nh-band-gray nh-facts-band">
        <div className="nh-container">
          <ul className="nh-facts nh-num">
            <li>
              <strong>Est. 1991</strong> by Drs. P. Ray and Joycelyn Johnson, Phoenix, Arizona
            </li>
            <li>
              <strong>Four levels</strong>, certificate to Bachelor of Arts, eight programs in all
            </li>
            <li>
              <strong>Two ways to study</strong>: the Phoenix campus or online classes
            </li>
            <li>
              <strong>Accredited</strong> through the Transworld Accrediting Commission, religious-exempt
            </li>
          </ul>
        </div>
      </section>

      {/* Two ways to study */}
      <section id="admissions" className="nh-band nh-band-white">
        <div className="nh-container nh-split">
          <div className="nh-photo nh-zoom">
            <Image src="/images/theme/slider/rslides/3.jpg" alt="Graduates in purple gowns at a VIMTC graduation ceremony" fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: "cover" }} />
          </div>
          <div className="nh-stack">
            <h2>
              Same curriculum, same faculty. <Ac>Your</Ac> schedule.
            </h2>
            <div className="nh-rows">
              <Link href={LINKS.schedules} className="nh-row nh-row-2">
                <span className="nh-row-text">
                  <strong>On campus · Phoenix</strong>
                  <span className="nh-soft">{CONTACT.addressLine1}. A variety of class schedules to fit work, family and ministry commitments.</span>
                </span>
                <Arrow size={22} />
              </Link>
              <Link href={LINKS.about} className="nh-row nh-row-2">
                <span className="nh-row-text">
                  <strong>Online · anywhere</strong>
                  <span className="nh-soft">Online Bible training classes, open to the public, with great flexibility for your schedule.</span>
                </span>
                <Arrow size={22} />
              </Link>
            </div>
            <p className="nh-meta">The courses are practical and geared towards the needs of pastors, leaders and ordinary Christians who are not in a position to attend Bible school full time.</p>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="nh-band nh-band-gray">
        <div className="nh-container nh-stack-lg">
          <h2 className="nh-h2-line">
            Find the program that fits your <Ac>calling</Ac>
          </h2>
          <ProgramsIndex />
          <div className="nh-actions">
            <Link href={LINKS.programs} className="nh-btn nh-btn-blue">
              See all programs <Arrow />
            </Link>
            <Link href={LINKS.curriculum} className="nh-btn nh-btn-line">
              Browse the curriculum
            </Link>
          </div>
        </div>
      </section>

      {/* Purpose: scripture over photograph */}
      <section className="nh-band nh-band-white">
        <div className="nh-container">
          <figure className="nh-figure nh-wipe">
            <Image src="/images/uploads/2024/02/nh-14.jpg" alt="" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "center 30%" }} />
            <div className="nh-figure-veil" aria-hidden="true" />
            <div className="nh-figure-copy">
              <blockquote className="nh-serif">
                “To edify the body of Christ, to equip God’s people for the work of the ministry, to unite in faith, to grow in quality, quantity, stability, and integrity so that the whole body is healthy and growing and full of love.”
              </blockquote>
              <div className="nh-figure-aside">
                <cite>Ephesians 4:11–16, the college’s purpose</cite>
                <p>Our purpose is to raise up Spirit-filled, anointed leaders who will disciple nations. The study materials are Word-based, God-inspired and relevant to the 21st-century Church.</p>
                <Link href={LINKS.about} className="nh-link nh-link-light">
                  Our mission and beliefs <Arrow />
                </Link>
              </div>
            </div>
          </figure>
        </div>
      </section>

      {/* Why, then leadership */}
      <section id="about" className="nh-band nh-band-gray nh-band-tight">
        <div className="nh-container nh-split nh-split-top">
          <div className="nh-stack nh-sticky">
            <h2>
              Practical, Word-based, built for people <Ac>already</Ac> in ministry
            </h2>
            <p className="nh-soft">Faculty who pastor and serve. Classes at the hours a working leader can keep. A graduate body of thousands from around the world.</p>
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
      <section className="nh-band nh-band-gray nh-band-after">
        <div className="nh-container nh-split">
          <div className="nh-photo nh-zoom nh-photo-tall">
            <Image src="/images/theme/main-img1.jpg" alt="Apostle Dr. P. Ray Johnson" fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: "top" }} />
          </div>
          <div className="nh-stack nh-center">
            <h2 className="nh-h2-sm">
              Since 1991, raising <Ac>Spirit-filled</Ac> leaders
            </h2>
            <p className="nh-soft">A journey of more than thirty years for our founders, Drs. P. Ray and Mama Joycelyn Johnson. The college is interdenominational and led today by its President, Bishop Dr. Phillips Banini Sr.</p>
            <dl className="nh-dl">
              {LEADERSHIP.map((l) => (
                <div key={l.name}>
                  <dt>{l.name}</dt>
                  <dd className="nh-soft">{l.role}</dd>
                </div>
              ))}
            </dl>
            <div>
              <Link href={LINKS.faculty} className="nh-btn nh-btn-line">
                Meet the faculty
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Campus life and accreditation */}
      <section id="events" className="nh-band nh-band-white">
        <div className="nh-container nh-split nh-split-top">
          <div className="nh-stack">
            <div className="nh-section-head">
              <h2 className="nh-h2-sm">
                Campus <Ac>life</Ac>
              </h2>
              <Link href={LINKS.gallery} className="nh-link">
                Gallery <Arrow />
              </Link>
            </div>
            <Link href={LINKS.events} className="nh-photo nh-zoom nh-photo-wide">
              <Image src="/images/uploads/2025/08/ministry-training-college.jpg" alt="A VIMTC campus event" fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: "cover" }} />
            </Link>
            <p className="nh-soft">Enrolment and registration days, conferences, and graduation, on campus in Phoenix and online.</p>
            <div>
              <Link href={LINKS.events} className="nh-link">
                See campus events <Arrow />
              </Link>
            </div>
          </div>
          <aside className="nh-aside">
            <Image src="/images/theme/thumbnails/trans-acc-logo.png" alt="Transworld Accrediting Commission International" width={140} height={113} />
            <h3>
              Accredited, and <Ac>honest</Ac> about what that means
            </h3>
            <p className="nh-soft">
              VIMTC is accredited through recognized religious accrediting bodies such as the Transworld Accrediting Commission. Its degrees are not government-accredited, so federal student loans do not apply and credits may not transfer to government-accredited universities. Most ministry
              education in the United States takes place under this religious-exempt status.
            </p>
            <Link href={LINKS.accreditation} className="nh-link">
              Read the accreditation page <Arrow />
            </Link>
          </aside>
        </div>
      </section>

      {/* Request information */}
      <section id="request" className="nh-band nh-band-white nh-band-top0">
        <div className="nh-container">
          <div className="nh-panel">
            <div className="nh-stack">
              <h2 className="nh-on-blue">
                Not sure where to start? <Ac>Ask us.</Ac>
              </h2>
              <p className="nh-on-blue-soft">Two fields. We reply with the programs that fit, the schedule and the tuition.</p>
              <p className="nh-on-blue-soft nh-num">
                Or call <a href={CONTACT.phoneHref}>{CONTACT.phone}</a> · <Link href={LINKS.apply}>start an application</Link>
              </p>
            </div>
            <RequestInfoForm />
          </div>
        </div>
      </section>
    </main>
  );
}
