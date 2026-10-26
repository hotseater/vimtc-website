import type { Metadata } from "next";
import Link from "next/link";
import Arrow from "@/components/site/Arrow";
import PageHead from "@/components/site/PageHead";
import RequestBand from "@/components/site/RequestBand";
import { COPY } from "@/content/copy";
import { LINKS } from "@/content/home";
import { descriptions } from "@/lib/content";
import { CONTACT } from "@/lib/site";
import { FORMAT_LABEL, SCHEDULE, fmtDate } from "@/content/schedule";

const PATH = LINKS.schedules;
const description = descriptions[PATH];
export const metadata: Metadata = { title: "Class Schedules", description, alternates: { canonical: PATH }, openGraph: { title: "Class Schedules", description, url: PATH, images: [{ url: "/images/uploads/2024/02/nh-6.jpg", width: 1920, height: 600 }] } };

const Ac = ({ children }: { children: React.ReactNode }) => <span className="nh-ac">{children}</span>;

export default function SchedulesPage() {
  return (
    <main>
      <PageHead
        trail={[{ label: "Class Schedules", href: PATH }]}
        title={
          <>
            Classes at the hours you can <Ac>keep</Ac>
          </>
        }
        lead={COPY.schedules}
        actions={
          <>
            <Link href="#request" className="nh-btn nh-btn-gold">
              Get the current schedule <Arrow />
            </Link>
            <Link href={LINKS.programs} className="nh-btn nh-btn-line">
              See the programs
            </Link>
          </>
        }
        facts={
          <>
            <li>
              <strong>Campus</strong> {CONTACT.addressLine1}, Phoenix
            </li>
            <li>
              <strong>Online</strong> Live classes open to the public
            </li>
            <li>
              <strong>Ask</strong> <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            </li>
          </>
        }
        photo={{ src: "/images/uploads/2024/02/nh-6.jpg", alt: "A graduate smiling at a VIMTC ceremony", position: "center 40%" }}
      />
      <section className="nh-band nh-band-gray">
        <div className="nh-container nh-stack-lg">
          <div className="nh-section-head">
            <h2 className="nh-h2-sm">
              {SCHEDULE.intake ? (
                <>
                  <Ac>{SCHEDULE.intake}</Ac> schedule
                </>
              ) : (
                <>
                  Current <Ac>schedule</Ac>
                </>
              )}
            </h2>
            {SCHEDULE.starts ? <span className="nh-meta nh-num">Classes begin {fmtDate(SCHEDULE.starts)}</span> : null}
          </div>
          {SCHEDULE.note ? <p className="nh-soft">{SCHEDULE.note}</p> : null}
          {SCHEDULE.sessions.length ? (
            <div className="nh-index">
              <div className="nh-index-head nh-sched-cols" aria-hidden="true">
                <span>Program</span>
                <span>Day</span>
                <span>Time</span>
                <span>Format</span>
              </div>
              <ul className="nh-index-list">
                {SCHEDULE.sessions.map((x, i) => (
                  <li key={i} className="nh-row nh-sched-cols nh-num">
                    <span className="nh-row-text">
                      <strong>{x.program}</strong>
                      {x.note ? <span className="nh-soft">{x.note}</span> : null}
                    </span>
                    <span>{x.day}</span>
                    <span>{x.time}</span>
                    <span className="nh-row-meta nh-soft">
                      <strong>{FORMAT_LABEL[x.format]}</strong>
                      {x.where ?? ""}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <aside className="nh-aside nh-aside-flush nh-empty">
              <p className="nh-soft">The schedule for the next intake has not been published yet. Admissions sends the current timetable for campus and online classes on request.</p>
              <Link href="#request" className="nh-link">
                Request the current schedule <Arrow />
              </Link>
            </aside>
          )}
          {SCHEDULE.dates.length ? (
            <div className="nh-stack">
              <h3>Key dates</h3>
              <div className="nh-rows">
                {SCHEDULE.dates.map((k) => (
                  <div key={k.label} className="nh-row nh-row-date nh-num">
                    <time className="nh-serif" dateTime={k.date}>
                      {fmtDate(k.date)}
                    </time>
                    <strong>{k.label}</strong>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
      <section className="nh-band nh-band-white">
        <div className="nh-container nh-split nh-split-top">
          <div className="nh-stack nh-sticky">
            <h2 className="nh-h2-sm">
              Two ways to <Ac>study</Ac>
            </h2>
            <p className="nh-soft">The same curriculum and the same faculty, on campus in Phoenix or online. Programs run annually and culminate in a graduation ceremony.</p>
          </div>
          <div className="nh-rows">
            <div className="nh-row nh-row-1">
              <span className="nh-row-text">
                <strong>On campus · Phoenix</strong>
                <span className="nh-soft">A variety of class schedules to fit work, family and ministry commitments.</span>
              </span>
            </div>
            <div className="nh-row nh-row-1">
              <span className="nh-row-text">
                <strong>Online · anywhere</strong>
                <span className="nh-soft">Online Bible training classes, open to the public, with great flexibility for your schedule.</span>
              </span>
            </div>
          </div>
        </div>
      </section>
      <RequestBand lead="Tell us which program you are considering and we send the current class schedule for campus and online." />
    </main>
  );
}
