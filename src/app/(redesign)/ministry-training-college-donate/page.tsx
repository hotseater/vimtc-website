import type { Metadata } from "next";
import Link from "next/link";
import Arrow from "@/components/site/Arrow";
import PageHead from "@/components/site/PageHead";
import { COPY } from "@/content/copy";
import { LINKS } from "@/content/home";
import { descriptions } from "@/lib/content";
import { CONTACT } from "@/lib/site";

const PATH = LINKS.donate;
const description = descriptions[PATH];
export const metadata: Metadata = { title: "Donate", description, alternates: { canonical: PATH }, openGraph: { title: "Donate", description, url: PATH, images: [{ url: "/video/banner-poster.jpg", width: 1920, height: 1080 }] } };

const Ac = ({ children }: { children: React.ReactNode }) => <span className="nh-ac">{children}</span>;

export default function DonatePage() {
  return (
    <main>
      <PageHead
        trail={[{ label: "Donate", href: PATH }]}
        title={
          <>
            Give to the <Ac>work</Ac>
          </>
        }
        lead={COPY.donate}
        actions={
          <>
            <a href={CONTACT.paypalDonate} target="_blank" rel="noopener noreferrer" className="nh-btn nh-btn-gold">
              Donate via PayPal <Arrow />
            </a>
            <a href={CONTACT.paypalDonate} target="_blank" rel="noopener noreferrer" className="nh-btn nh-btn-line">
              Pay tuition
            </a>
          </>
        }
        facts={
          <>
            <li>
              <strong>Secure</strong> Payments are handled by PayPal; the college never sees your card.
            </li>
            <li>
              <strong>Receipts</strong> PayPal emails one for every payment.
            </li>
            <li>
              <strong>Other ways</strong> Call <a href={CONTACT.phoneHref}>{CONTACT.phone}</a> or email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
            </li>
          </>
        }
        photo={{ src: "/images/uploads/2024/02/nh-13.jpg", alt: "Graduates in orange sashes at a VIMTC ceremony", position: "center 40%" }}
      />
      <section className="nh-band nh-band-gray">
        <div className="nh-container nh-split nh-split-top">
          <div className="nh-stack nh-sticky">
            <h2 className="nh-h2-sm">
              What your gift <Ac>supports</Ac>
            </h2>
            <p className="nh-soft">The mission of the School of Ministry & Missions is to send out trained five-fold ministers into the world. Gifts and tuition keep that training within reach of pastors, leaders and growing Christians in Phoenix and around the world.</p>
          </div>
          <div className="nh-rows">
            <Link href={LINKS.programs} className="nh-row nh-row-2">
              <span className="nh-row-text">
                <strong>Programs from a certificate to a bachelor degree</strong>
                <span className="nh-soft">Taught on campus and online, by faculty in active ministry.</span>
              </span>
              <Arrow size={22} />
            </Link>
            <Link href={LINKS.events} className="nh-row nh-row-2">
              <span className="nh-row-text">
                <strong>Conferences and graduations</strong>
                <span className="nh-soft">From Phoenix to Nairobi, where graduates are sent out.</span>
              </span>
              <Arrow size={22} />
            </Link>
            <Link href={LINKS.about} className="nh-row nh-row-2">
              <span className="nh-row-text">
                <strong>A journey of more than thirty years</strong>
                <span className="nh-soft">Founded in 1991, interdenominational, with graduates in the thousands.</span>
              </span>
              <Arrow size={22} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
