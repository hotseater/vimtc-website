import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Arrow from "@/components/site/Arrow";
import PageHead from "@/components/site/PageHead";
import RequestBand from "@/components/site/RequestBand";
import { COPY } from "@/content/copy";
import { LINKS } from "@/content/home";
import { descriptions } from "@/lib/content";
import { POSTERS } from "@/content/events";
import { CONTACT } from "@/lib/site";

const PATH = LINKS.events;
const description = descriptions[PATH];
export const metadata: Metadata = { title: "Campus Events", description, alternates: { canonical: PATH }, openGraph: { title: "Campus Events", description, url: PATH, images: [{ url: "/images/uploads/2025/08/ministry-training-college.jpg", width: 1600, height: 900 }] } };

const Ac = ({ children }: { children: React.ReactNode }) => <span className="nh-ac">{children}</span>;


export default function CampusEventsPage() {
  return (
    <main>
      <PageHead
        trail={[{ label: "Campus Events", href: PATH }]}
        title={
          <>
            Where the college <Ac>gathers</Ac>
          </>
        }
        lead={COPY.campus}
        actions={
          <>
            <Link href={LINKS.gallery} className="nh-btn nh-btn-blue">
              See the gallery <Arrow />
            </Link>
            <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" className="nh-btn nh-btn-line">
              Follow on Facebook
            </a>
          </>
        }
        photo={{ src: "/images/uploads/2025/08/ministry-training-college.jpg", alt: "Faculty seated in regalia at a VIMTC ceremony", position: "center 40%" }}
      />
      <section className="nh-band nh-band-gray">
        <div className="nh-container nh-stack-lg">
          <div className="nh-section-head">
            <h2 className="nh-h2-sm">
              Recent <Ac>announcements</Ac>
            </h2>
            <span className="nh-meta">New events are announced here and on Facebook.</span>
          </div>
          <div className="nh-posters">
            {POSTERS.map((p) => (
              <figure key={p.src} className="nh-poster">
                <a href={p.src} target="_blank" rel="noopener noreferrer" className="nh-poster-img">
                  <Image src={p.src} alt={p.title} width={p.w} height={p.h} sizes="(max-width: 700px) 100vw, 33vw" />
                </a>
                <figcaption>
                  <strong>{p.title}</strong>
                  <span className="nh-soft">{p.text}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section className="nh-band nh-band-white">
        <div className="nh-container nh-split nh-split-top">
          <div className="nh-stack">
            <h2 className="nh-h2-sm">
              Every <Ac>year</Ac>
            </h2>
            <p className="nh-soft">Programs run annually and culminate in a graduation ceremony where diplomas and degrees are presented. Enrolment and registration days open each intake.</p>
          </div>
          <div className="nh-rows">
            <Link href={LINKS.schedules} className="nh-row nh-row-2">
              <span className="nh-row-text">
                <strong>Class schedules</strong>
                <span className="nh-soft">When classes meet, on campus and online.</span>
              </span>
              <Arrow size={22} />
            </Link>
            <Link href={LINKS.appointment} className="nh-row nh-row-2">
              <span className="nh-row-text">
                <strong>Visit the campus</strong>
                <span className="nh-soft">Set an appointment and come and see.</span>
              </span>
              <Arrow size={22} />
            </Link>
          </div>
        </div>
      </section>
      <RequestBand lead="Ask about the next enrolment day, a conference or graduation, and we reply with the dates." />
    </main>
  );
}
