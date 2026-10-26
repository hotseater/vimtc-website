import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Arrow from "@/components/site/Arrow";
import PageHead from "@/components/site/PageHead";
import RequestBand from "@/components/site/RequestBand";
import { LEVEL_NAMES, LINKS, PROGRAMS, type Level } from "@/content/home";
import { descriptions } from "@/lib/content";
import { getCurriculumLevels } from "@/lib/programs";

const PATH = LINKS.curriculum;
const description = descriptions[PATH];
export const metadata: Metadata = { title: "Curriculum", description, alternates: { canonical: PATH }, openGraph: { title: "Curriculum", description, url: PATH, images: [{ url: "/images/uploads/2024/02/nh-2.jpg", width: 1920, height: 600 }] } };

const Ac = ({ children }: { children: React.ReactNode }) => <span className="nh-ac">{children}</span>;

export default function CurriculumPage() {
  const levels = getCurriculumLevels();
  const total = levels.reduce((n, l) => n + l.courses.length, 0);
  return (
    <main>
      <PageHead
        trail={[{ label: "Curriculum", href: PATH }]}
        title={
          <>
            Three levels, <Ac>thirty</Ac> courses
          </>
        }
        lead="The curriculum for the diploma programs runs in three levelled modules. Each level is ten courses, from the character of God to the art of preaching, and the three together lead from the certificate to the associate degree."
        actions={
          <>
            <Link href={LINKS.programs} className="nh-btn nh-btn-blue">
              See the programs <Arrow />
            </Link>
            <Link href={LINKS.apply} className="nh-btn nh-btn-gold">
              Apply now
            </Link>
          </>
        }
        facts={
          <>
            <li>
              <strong>Courses</strong> {total} across three levels
            </li>
            <li>
              <strong>Format</strong> Campus or online
            </li>
          </>
        }
      />
      {levels.map((l, i) => {
        const program = PROGRAMS.find((p) => p.level === l.level);
        return (
          <section key={l.level} id={`level-${l.level}`} className={`nh-band ${i % 2 === 0 ? "nh-band-gray" : "nh-band-white"}`}>
            <div className="nh-container nh-split nh-split-top">
              <div className="nh-stack nh-sticky">
                <span className="nh-level">
                  <span className={`nh-disc${l.level === 4 ? " nh-disc-4" : ""}`} aria-hidden="true">
                    {l.level}
                  </span>
                  Level {l.level} · {LEVEL_NAMES[l.level as Level]}
                </span>
                <h2 className="nh-h2-sm">{program?.name ?? `Level ${l.level}`}</h2>
                {program?.blurb ? <p className="nh-soft">{program.blurb}</p> : null}
                {program ? (
                  <div>
                    <Link href={program.href} className="nh-link">
                      The program page <Arrow />
                    </Link>
                  </div>
                ) : null}
              </div>
              <ol className="nh-courses nh-courses-1 nh-num">
                {l.courses.map((c) => (
                  <li key={c.code + c.name}>
                    <span className="nh-course-code">{c.code}</span>
                    <span>{c.name}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        );
      })}
      <section className="nh-band nh-band-white">
        <div className="nh-container nh-split">
          <div className="nh-stack nh-center">
            <span className="nh-level">
              <span className="nh-disc nh-disc-4" aria-hidden="true">
                4
              </span>
              Level 4 · Bachelor
            </span>
            <h2 className="nh-h2-sm">
              Then a <Ac>bachelor</Ac> major
            </h2>
            <p className="nh-soft">The Bachelor of Arts majors follow the three levels. The college has announced an accelerated online Bachelor of Arts in Marriage and Family Counseling, with classes every Saturday at 12pm on Zoom, covering post-marital, pre-marital, divorce and beyond, marriage counseling, and crisis and trauma counseling.</p>
            <div>
              <Link href={`${LINKS.programs}#details`} className="nh-link">
                All bachelor majors <Arrow />
              </Link>
            </div>
          </div>
          <figure className="nh-flyer">
            <Image src="/images/uploads/2024/08/Marriage-And-Family-scaled.jpg" alt="Flyer: accelerated online Bachelor of Arts in Marriage and Family Counseling, classes every Saturday at 12pm" width={1000} height={1414} sizes="(max-width: 900px) 100vw, 50vw" />
          </figure>
        </div>
      </section>
      <RequestBand lead="Ask about any course or level and we reply with the schedule and the tuition." />
    </main>
  );
}
