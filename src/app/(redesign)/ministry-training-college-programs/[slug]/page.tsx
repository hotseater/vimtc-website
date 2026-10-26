import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Arrow from "@/components/site/Arrow";
import RequestBand from "@/components/site/RequestBand";
import { LEVEL_NAMES, LINKS, PROGRAMS, type Level } from "@/content/home";
import { descriptions } from "@/lib/content";
import { getProgramDetails } from "@/lib/programs";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PROGRAMS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = PROGRAMS.find((p) => p.slug === slug);
  if (!program) return {};
  const description = descriptions[program.href] ?? `${program.name} at Victory International Ministry Training College, Phoenix, Arizona.`;
  return {
    title: program.name,
    description,
    alternates: { canonical: program.href },
    openGraph: { title: program.name, description, url: program.href, images: [{ url: program.image, width: 1200, height: 800 }] },
  };
}

const Ac = ({ children }: { children: React.ReactNode }) => <span className="nh-ac">{children}</span>;

const LEVEL_NOTE: Record<Level, string> = {
  1: "Module 1 of the three diploma-program levels.",
  2: "Module 2 of the three diploma-program levels.",
  3: "Module 3, culminating in the associate degree.",
  4: "A Bachelor of Arts major, following the three diploma-program levels.",
};

export default async function ProgramPage({ params }: Props) {
  const { slug } = await params;
  const program = PROGRAMS.find((p) => p.slug === slug);
  if (!program) notFound();
  const details = program.hasPage ? getProgramDetails(program.slug) : null;
  const next = PROGRAMS.find((p) => p.level === program.level + 1);
  const siblings = PROGRAMS.filter((p) => p.slug !== program.slug);

  return (
    <main>
      {/* Head */}
      <section className="nh-band nh-band-white nh-pagehead">
        <div className="nh-container nh-split nh-program-hero">
          <div className="nh-stack">
            <nav aria-label="Breadcrumb" className="nh-crumbs nh-meta nh-rise" style={{ "--d": "0ms" } as React.CSSProperties}>
              <Link href="/">Home</Link> <span aria-hidden="true">›</span> <Link href={LINKS.programs}>Programs</Link> <span aria-hidden="true">›</span> <span aria-current="page">{program.name}</span>
            </nav>
            <span className="nh-level nh-rise" style={{ "--d": "80ms" } as React.CSSProperties}>
              <span className={`nh-disc${program.level === 4 ? " nh-disc-4" : ""}`} aria-hidden="true">
                {program.level}
              </span>
              Level {program.level} · {LEVEL_NAMES[program.level]}
            </span>
            <h1 className="nh-page-title nh-rise" style={{ "--d": "160ms" } as React.CSSProperties}>{program.name}</h1>
            <p className="nh-lead nh-soft nh-rise" style={{ "--d": "280ms" } as React.CSSProperties}>{details?.overview ?? `${program.name} is one of the college's Bachelor of Arts majors. The full description is on its way from the college; the admissions office can answer questions about it today.`}</p>
            <div className="nh-actions nh-rise" style={{ "--d": "400ms" } as React.CSSProperties}>
              <Link href={LINKS.apply} className="nh-btn nh-btn-gold">
                Apply for this program <Arrow />
              </Link>
              <Link href="#request" className="nh-btn nh-btn-line">
                Request information
              </Link>
            </div>
            <ul className="nh-facts nh-num nh-facts-inline nh-rise" style={{ "--d": "520ms" } as React.CSSProperties}>
              <li>
                <strong>Format</strong> Campus or online
              </li>
              <li>
                <strong>Level</strong> {LEVEL_NOTE[program.level]}
              </li>
              {next ? (
                <li>
                  <strong>Next</strong>{" "}
                  <Link href={next.href}>
                    {LEVEL_NAMES[next.level]}: {next.name}
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
          <div className="nh-photo nh-zoom nh-photo-page nh-unveil">
            <Image src={program.image} alt="" fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: "cover" }} priority />
          </div>
        </div>
      </section>

      {/* Study and courses */}
      {details ? (
        <section className="nh-band nh-band-gray">
          <div className="nh-container nh-program-body">
            <div className="nh-stack">
              <h2 className="nh-h2-sm">
                What you will <Ac>study</Ac>
              </h2>
              <div className="nh-rows">
                {details.areas.map((a) => (
                  <div key={a.title} className="nh-row nh-row-1">
                    <span className="nh-row-text">
                      <strong>{a.title}</strong>
                      {a.text ? <span className="nh-soft">{a.text}</span> : null}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="nh-stack">
              {details.courses.length ? (
                <>
                  <h2 className="nh-h2-sm">
                    <Ac>Courses</Ac> <span className="nh-meta nh-num">· {details.courses.length}</span>
                  </h2>
                  <ol className="nh-courses nh-courses-1 nh-num">
                    {details.courses.map((c) => (
                      <li key={c.code + c.name}>
                        <span className="nh-course-code">{c.code}</span>
                        <span>{c.name}</span>
                      </li>
                    ))}
                  </ol>
                </>
              ) : (
                <>
                  <h2 className="nh-h2-sm">
                    <Ac>Courses</Ac>
                  </h2>
                  <p className="nh-soft">The bachelor curriculum builds on the three diploma-program levels. The curriculum page lists the module courses for each level.</p>
                  <div>
                    <Link href={LINKS.curriculum} className="nh-link">
                      Browse the curriculum <Arrow />
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      ) : (
        <section className="nh-band nh-band-gray">
          <div className="nh-container nh-program-body">
            <div className="nh-stack">
              <h2 className="nh-h2-sm">
                The <Ac>pathway</Ac>
              </h2>
              <p className="nh-soft">Bachelor majors follow the three diploma-program levels: the Certificate in Discipleship, the Diploma in Biblical Studies and the Associate Degree in Ministry. The curriculum page lists the module courses for each level.</p>
              <div>
                <Link href={LINKS.curriculum} className="nh-link">
                  Browse the curriculum <Arrow />
                </Link>
              </div>
            </div>
            <div className="nh-stack">
              <h2 className="nh-h2-sm">
                Ask <Ac>admissions</Ac>
              </h2>
              <p className="nh-soft">For the course list, schedule and tuition of this major, send a request below or call the college. We reply with everything you need to decide.</p>
              <div>
                <Link href="#request" className="nh-link">
                  Request information <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Other programs */}
      <section className="nh-band nh-band-white">
        <div className="nh-container nh-stack-lg">
          <h2 className="nh-h2-sm">
            Other <Ac>programs</Ac>
          </h2>
          <div className="nh-index">
            <div className="nh-index-head" aria-hidden="true">
              <span>Program</span>
              <span>Level</span>
              <span>Format</span>
              <span />
            </div>
            <ul className="nh-index-list">
              {siblings.map((p) => (
                <li key={p.slug}>
                  <Link href={p.href} className="nh-row nh-row-prog">
                    <span className="nh-row-text">
                      <strong>{p.name}</strong>
                      {p.blurb ? <span className="nh-soft nh-row-blurb">{p.blurb}</span> : null}
                    </span>
                    <span className="nh-level">
                      <span className={`nh-disc${p.level === 4 ? " nh-disc-4" : ""}`} aria-hidden="true">
                        {p.level}
                      </span>
                      {LEVEL_NAMES[p.level]}
                    </span>
                    <span className="nh-row-meta nh-soft">Campus or online</span>
                    <Arrow size={22} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Link href={LINKS.programs} className="nh-link">
              All programs <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <RequestBand lead={`Ask about the ${program.name}: the schedule, the tuition and what to prepare.`} />
    </main>
  );
}
