import type { Metadata } from "next";
import Link from "next/link";
import Arrow from "@/components/site/Arrow";
import ContactForm from "@/components/forms/ContactForm";
import { LINKS } from "@/content/home";
import { descriptions } from "@/lib/content";
import { CONTACT } from "@/lib/site";

const PATH = LINKS.contact;
const description = descriptions[PATH];

export const metadata: Metadata = {
  title: "Contact Us",
  description,
  alternates: { canonical: PATH },
  openGraph: { title: "Contact Us", description, url: PATH, images: [{ url: "/video/banner-poster.jpg", width: 1920, height: 1080 }] },
};

const Ac = ({ children }: { children: React.ReactNode }) => <span className="nh-ac">{children}</span>;
const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

const Icon = ({ path }: { path: string }) => (
  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={path} />
  </svg>
);
const ICONS = {
  phone: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm18 2-10 7L2 6",
  pin: "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0zm-9 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  calendar: "M3 5h18v16H3zM3 10h18M8 3v4M16 3v4",
};

export default function ContactPage() {
  return (
    <main>
      {/* Head */}
      <section className="nh-band nh-band-white nh-pagehead nh-pagehead-tight">
        <div className="nh-container nh-stack">
          <nav aria-label="Breadcrumb" className="nh-crumbs nh-meta nh-rise" style={d(0)}>
            <Link href="/">Home</Link> <span aria-hidden="true">›</span> <span aria-current="page">Contact Us</span>
          </nav>
          <h1 className="nh-page-title nh-rise" style={d(100)}>
            We are here to <Ac>help</Ac>
          </h1>
          <p className="nh-lead nh-soft nh-rise" style={d(220)}>
            Whether you have questions about our programs, want to schedule a campus tour, or simply need assistance, our team is ready. Call, write, or send the form and we reply within two working days.
          </p>
        </div>
      </section>

      {/* Details and form */}
      <section className="nh-band nh-band-gray">
        <div className="nh-container nh-contact-grid">
          <div className="nh-stack nh-sticky">
            <h2 className="nh-h2-sm">
              Reach <Ac>us</Ac>
            </h2>
            <div className="nh-rows">
              <a href={CONTACT.phoneHref} className="nh-row nh-row-contact">
                <span className="nh-contact-icon">
                  <Icon path={ICONS.phone} />
                </span>
                <span className="nh-row-text">
                  <strong className="nh-num">{CONTACT.phone}</strong>
                  <span className="nh-soft">Call us today</span>
                </span>
                <Arrow size={22} />
              </a>
              <a href={`mailto:${CONTACT.email}`} className="nh-row nh-row-contact">
                <span className="nh-contact-icon">
                  <Icon path={ICONS.mail} />
                </span>
                <span className="nh-row-text">
                  <strong>{CONTACT.email}</strong>
                  <span className="nh-soft">Message us</span>
                </span>
                <Arrow size={22} />
              </a>
              <a href="https://www.google.com/maps/search/?api=1&query=7702+N+35th+Avenue+Suite+2+Phoenix+AZ+85340" target="_blank" rel="noopener noreferrer" className="nh-row nh-row-contact">
                <span className="nh-contact-icon">
                  <Icon path={ICONS.pin} />
                </span>
                <span className="nh-row-text">
                  <strong>
                    {CONTACT.addressLine1}, {CONTACT.addressLine2}
                  </strong>
                  <span className="nh-soft">Locate us · opens in Google Maps</span>
                </span>
                <Arrow size={22} />
              </a>
              <Link href={LINKS.appointment} className="nh-row nh-row-contact">
                <span className="nh-contact-icon">
                  <Icon path={ICONS.calendar} />
                </span>
                <span className="nh-row-text">
                  <strong>Set an appointment</strong>
                  <span className="nh-soft">Choose a date and time to talk with admissions</span>
                </span>
                <Arrow size={22} />
              </Link>
            </div>
            <p className="nh-footer-social nh-contact-social">
              <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" aria-label="VIMTC on Facebook" title="Facebook">
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.3H7.4V14h2.8v8h3.3Z" /></svg>
              </a>
              <a href={CONTACT.x} target="_blank" rel="noopener noreferrer" aria-label="VIMTC on X" title="X">
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.8 3h3l-6.6 7.6L22 21h-6.1l-4.8-6.2L5.6 21h-3l7.1-8.1L2 3h6.2l4.3 5.7L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z" /></svg>
              </a>
            </p>
          </div>
          <div className="nh-contact-card">
            <h2 className="nh-h2-sm">
              Send a <Ac>message</Ac>
            </h2>
            <p className="nh-soft">Tell us what you are looking for. Attach a document if it helps.</p>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="nh-band nh-band-white nh-band-map">
        <div className="nh-container nh-stack">
          <div className="nh-section-head">
            <h2 className="nh-h2-sm">
              Find the <Ac>campus</Ac>
            </h2>
            <a href="https://www.google.com/maps/search/?api=1&query=7702+N+35th+Avenue+Suite+2+Phoenix+AZ+85340" target="_blank" rel="noopener noreferrer" className="nh-link">
              Open in Google Maps <Arrow />
            </a>
          </div>
          <div className="nh-map">
            <iframe src={CONTACT.mapEmbed} title="Map: 7702 N 35th Avenue, Suite 2, Phoenix, AZ" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>
    </main>
  );
}
