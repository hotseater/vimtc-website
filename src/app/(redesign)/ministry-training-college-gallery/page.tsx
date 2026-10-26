import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Arrow from "@/components/site/Arrow";
import PageHead from "@/components/site/PageHead";
import { COPY } from "@/content/copy";
import { LINKS } from "@/content/home";
import { descriptions } from "@/lib/content";
import { POSTERS } from "@/content/events";

const PATH = LINKS.gallery;
const description = descriptions[PATH];
export const metadata: Metadata = { title: "Gallery", description, alternates: { canonical: PATH }, openGraph: { title: "Gallery", description, url: PATH, images: [{ url: "/images/uploads/2024/02/nh-13.jpg", width: 1920, height: 600 }] } };

const Ac = ({ children }: { children: React.ReactNode }) => <span className="nh-ac">{children}</span>;

/** Photographs from the college's own banner and pages. */
const PHOTOS = [
  { src: "/images/uploads/2024/02/nh-1.jpg", alt: "A speaker in regalia at a consecration service" },
  { src: "/images/uploads/2024/02/nh-13.jpg", alt: "Graduates in orange sashes" },
  { src: "/images/uploads/2024/02/nh-6.jpg", alt: "A graduate smiling in cap and gown" },
  { src: "/images/uploads/2024/02/nh-10.jpg", alt: "Faculty and a graduate outdoors in Phoenix" },
  { src: "/images/uploads/2024/02/nh-14.jpg", alt: "Graduates celebrating together" },
  { src: "/images/uploads/2024/02/nh-7.jpg", alt: "Graduates waiting for the ceremony" },
  { src: "/images/uploads/2024/02/nh-4.jpg", alt: "Faculty addressing graduates" },
  { src: "/images/uploads/2024/02/nh-9.jpg", alt: "Two graduates smiling" },
  { src: "/images/uploads/2024/02/nh-11.jpg", alt: "A graduate in a red cap" },
  { src: "/images/uploads/2024/02/nh-3.jpg", alt: "Faculty in academic regalia" },
  { src: "/images/uploads/2024/02/nh-2.jpg", alt: "Two guests at a ceremony" },
  { src: "/images/uploads/2024/02/nh-12.jpg", alt: "Graduates in red caps" },
];

export default function GalleryPage() {
  return (
    <main>
      <PageHead
        trail={[{ label: "Gallery", href: PATH }]}
        title={
          <>
            The life of the <Ac>college</Ac>
          </>
        }
        lead={COPY.gallery}
        actions={
          <Link href={LINKS.events} className="nh-btn nh-btn-line">
            Campus events <Arrow />
          </Link>
        }
      />
      <section className="nh-band nh-band-gray">
        <div className="nh-container nh-stack-lg">
          <h2 className="nh-h2-sm">
            <Ac>Ceremonies</Ac> and gatherings
          </h2>
          <div className="nh-gallery-grid">
            {PHOTOS.map((p, i) => (
              <figure key={p.src} className={`nh-gallery-item${i % 5 === 0 ? " nh-gallery-wide" : ""}`}>
                <Image src={p.src} alt={p.alt} fill sizes="(max-width: 700px) 100vw, 33vw" style={{ objectFit: "cover" }} />
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section className="nh-band nh-band-white">
        <div className="nh-container nh-stack-lg">
          <div className="nh-section-head">
            <h2 className="nh-h2-sm">
              Event <Ac>posters</Ac>
            </h2>
            <Link href={LINKS.events} className="nh-link">
              Campus events <Arrow />
            </Link>
          </div>
          <div className="nh-posters">
            {POSTERS.map((p) => (
              <figure key={p.src} className="nh-poster">
                <a href={p.src} target="_blank" rel="noopener noreferrer" className="nh-poster-img">
                  <Image src={p.src} alt={p.title} width={p.w} height={p.h} sizes="(max-width: 700px) 100vw, 33vw" />
                </a>
                <figcaption>
                  <strong>{p.title}</strong>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
