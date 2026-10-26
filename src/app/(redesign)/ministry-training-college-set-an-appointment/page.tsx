import type { Metadata } from "next";
import Link from "next/link";
import Arrow from "@/components/site/Arrow";
import PageHead from "@/components/site/PageHead";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { COPY } from "@/content/copy";
import { LINKS } from "@/content/home";
import { descriptions } from "@/lib/content";
import { CONTACT } from "@/lib/site";

const PATH = LINKS.appointment;
const description = descriptions[PATH];
export const metadata: Metadata = { title: "Set an Appointment", description, alternates: { canonical: PATH }, openGraph: { title: "Set an Appointment", description, url: PATH, images: [{ url: "/images/uploads/2024/02/nh-2.jpg", width: 1920, height: 600 }] } };

const Ac = ({ children }: { children: React.ReactNode }) => <span className="nh-ac">{children}</span>;

export default function AppointmentPage() {
  return (
    <main>
      <PageHead trail={[{ label: "Set an Appointment", href: PATH }]} title={<>Come and <Ac>see</Ac></>} lead={COPY.appointment} />
      <section className="nh-band nh-band-gray">
        <div className="nh-container nh-contact-grid">
          <div className="nh-stack nh-sticky">
            <h2 className="nh-h2-sm">
              What to <Ac>expect</Ac>
            </h2>
            <div className="nh-rows">
              <div className="nh-row nh-row-1">
                <span className="nh-row-text">
                  <strong>Pick a date and time</strong>
                  <span className="nh-soft">Tell us when suits you and we confirm by email.</span>
                </span>
              </div>
              <div className="nh-row nh-row-1">
                <span className="nh-row-text">
                  <strong>On campus or by phone</strong>
                  <span className="nh-soft">
                    {CONTACT.addressLine1}, {CONTACT.addressLine2}, or a call on {CONTACT.phone}.
                  </span>
                </span>
              </div>
              <div className="nh-row nh-row-1">
                <span className="nh-row-text">
                  <strong>Bring your questions</strong>
                  <span className="nh-soft">Programs, schedules, tuition, and where you could start.</span>
                </span>
              </div>
            </div>
            <div>
              <Link href={LINKS.contact} className="nh-link">
                Prefer to write? Contact us <Arrow />
              </Link>
            </div>
          </div>
          <div className="nh-contact-card">
            <h2 className="nh-h2-sm">
              Book an <Ac>appointment</Ac>
            </h2>
            <AppointmentForm />
          </div>
        </div>
      </section>
    </main>
  );
}
