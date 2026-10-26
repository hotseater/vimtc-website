import type { Metadata } from "next";
import Link from "next/link";
import Arrow from "@/components/home/Arrow";
import ProgramsIndex from "@/components/home/ProgramsIndex";
import RequestBand from "@/components/home/RequestBand";
import { LEVEL_NAMES, LINKS, PROGRAMS } from "@/content/home";
import { descriptions } from "@/lib/content";
import { getProgramDetails } from "@/lib/programs";

const PATH = LINKS.programs;
const description = descriptions[PATH];

export const metadata: Metadata = {
  title: "Programs",
  description,
  alternates: { canonical: PATH },
  openGraph: { title: "Programs", description, url: PATH, images: [{ url: "/video/banner-poster.jpg", width: 1920, height: 1080 }] },
};

const Ac = ({ children }: { children: React.ReactNode }) => <span className="nh-ac">{children}</span>;

const LEVELS = [
  { level: 1 as const, note: "Module 1 of the diploma programs" },
  { level: 2 as const, note: "Module 2 of the diploma programs" },
  { level: 3 as const, note: "Module 3, culminating in the associate degree" },
  { level: 4 as const, note: "Bachelor of Arts majors" },
];

const STEPS = [
  { title: "Explore programs", text: "Discover the program that aligns with your interests, passions and ministry goals." },
  { title: "Apply online", text: "Complete the online application form and submit the required documents." },
  { title: "Acceptance", text: "On acceptance you receive everything needed to prepare for the semester, including registration details and orientation dates." },
];

export default function ProgramsPage() {
  const detailed = PROGRAMS.filter((p) => p.slug).map((p) => ({ ...p, details: getProgramDetails(p.slug!) }));
  const others = PROGRAMS.filter((p) => !p.slug);

  return (
    <main>
      {/* Page head */}
      <section className="nh-band nh-band-white nh-pagehead">
        <div className="nh-container nh-split nh-split-top">
          <div className="nh-stack">
            <nav aria-label="Breadcrumb" className="nh-crumbs nh-meta">
              <Link href="/">Home</Link> <span aria-hidden="true">›</span> <span aria-current="page">Programs</span>
            </nav>
            <h1>
              Programs for people with a <Ac>calling</Ac>
            </h1>
            <p className="nh-lead nh-soft">
              Whether you are pursuing pastoral ministry, missions, counseling, or simply seeking to deepen your understanding of Scripture, there is a program here for you. Each one is designed to equip you with the knowledge, skills and spiritual foundation to become an impactful leader in your community and beyond.
            </p>
            <div className="nh-actions">
              <Link href="#programs" className="nh-btn nh-btn-blue">
                Browse the programs <Arrow />
              </Link>
              <Link href={LINKS.apply} className="nh-btn nh-btn-gold">
                Apply now
              </Link>
            </div>
          </div>
          <div className="nh-levels" aria-label="The four levels">
            <h2 className="nh-h3-ui">
              Four <Ac>levels</Ac>
            </h2>
            <ol className="nh-levels-list">
              {LEVELS.map((l) => (
                <li key={l.level}>
                  <span className={`nh-disc${l.level === 4 ? " nh-disc-4" : ""}`} aria-hidden="true">
                    {l.level}
                  </span>
                  <span className="nh-row-text">
                    <strong>{LEVEL_NAMES[l.level]}</strong>
                    <span className="nh-soft">{l.note}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="nh-meta">The curriculum runs annually and culminates in a graduation ceremony. All degrees are earned through mandatory coursework.</p>
          </div>
        </div>
      </section>

      {/* Index */}
      <section id="programs" className="nh-band nh-band-gray">
        <div className="nh-container nh-stack-lg">
          <h2 className="nh-h2-line">
            Every program, <Ac>at a glance</Ac>
          </h2>
          <ProgramsIndex />
        </div>
      </section>

      {/* Details for each program that has its own page */}
      <section id="details" className="nh-band nh-band-white">
        <div className="nh-container nh-stack-xl">
          {detailed.map((p) => (
            <article key={p.name} id={p.slug} className="nh-program">
              <header className="nh-program-head">
                <span className="nh-level">
                  <span className={`nh-disc${p.level === 4 ? " nh-disc-4" : ""}`} aria-hidden="true">
                    {p.level}
                  </span>
                  Level {p.level} · {LEVEL_NAMES[p.level]}
                </span>
                <h2 className="nh-h2-sm">{p.name}</h2>
                <p className="nh-soft nh-program-overview">{p.details.overview}</p>
              </header>
              <div className="nh-program-body">
                <div className="nh-stack">
                  <h3>What you will study</h3>
                  <div className="nh-rows">
                    {p.details.areas.map((a) => (
                      <div key={a.title} className="nh-row nh-row-1">
                        <span className="nh-row-text">
                          <strong>{a.title}</strong>
                          {a.text ? <span className="nh-soft">{a.text}</span> : null}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {p.details.courses.length ? (
                  <div className="nh-stack">
                    <h3>
                      Courses <span className="nh-meta nh-num">· {p.details.courses.length}</span>
                    </h3>
                    <ol className="nh-courses nh-num">
                      {p.details.courses.map((c) => (
                        <li key={c.code + c.name}>
                          <span className="nh-course-code">{c.code}</span>
                          <span>{c.name}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : (
                  <div className="nh-stack">
                    <h3>Courses</h3>
                    <p className="nh-soft">The bachelor curriculum builds on the three diploma-program levels. See the curriculum for the module courses.</p>
                    <div>
                      <Link href={LINKS.curriculum} className="nh-link">
                        Browse the curriculum <Arrow />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div className="nh-actions">
                <Link href={p.href} className="nh-link">
                  Full program page <Arrow />
                </Link>
                <Link href={LINKS.apply} className="nh-link">
                  Apply for this program <Arrow />
                </Link>
              </div>
            </article>
          ))}

          <article className="nh-program">
            <header className="nh-program-head">
              <span className="nh-level">
                <span className="nh-disc nh-disc-4" aria-hidden="true">
                  4
                </span>
                Level 4 · Bachelor
              </span>
              <h2 className="nh-h2-sm">
                More bachelor <Ac>majors</Ac>
              </h2>
              <p className="nh-soft nh-program-overview">Four further Bachelor of Arts majors are offered. Full descriptions are on their way; in the meantime the admissions office can answer questions about any of them.</p>
            </header>
            <div className="nh-rows">
              {others.map((p) => (
                <Link key={p.name} href="#request" className="nh-row nh-row-2">
                  <span className="nh-row-text">
                    <strong>{p.name}</strong>
                    <span className="nh-soft">Ask admissions about this major</span>
                  </span>
                  <Arrow size={22} />
                </Link>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* How to apply */}
      <section id="apply" className="nh-band nh-band-gray">
        <div className="nh-container nh-split nh-split-top">
          <div className="nh-stack nh-sticky">
            <h2>
              Three steps to <Ac>enrol</Ac>
            </h2>
            <p className="nh-soft">The admissions process is designed so that every student finds their place: academically prepared and spiritually equipped.</p>
            <div className="nh-actions">
              <Link href={LINKS.apply} className="nh-btn nh-btn-gold">
                Start the application <Arrow />
              </Link>
              <Link href={LINKS.admissions} className="nh-btn nh-btn-line">
                Admissions details
              </Link>
            </div>
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
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <RequestBand lead="Tell us which program you are considering and we reply with the schedule, the tuition and what to prepare." />
    </main>
  );
}
