import Link from "next/link";
import RequestInfoForm from "./RequestInfoForm";
import { LINKS } from "@/content/home";
import { CONTACT } from "@/lib/site";

const Ac = ({ children }: { children: React.ReactNode }) => <span className="nh-ac">{children}</span>;

/** The one blue block on a page: a two-field request form. */
export default function RequestBand({ lead }: { lead?: string }) {
  return (
    <section id="request" className="nh-band nh-band-white nh-band-top0">
      <div className="nh-container">
        <div className="nh-panel">
          <div className="nh-stack">
            <h2 className="nh-on-blue">
              Not sure where to start? <Ac>Ask us.</Ac>
            </h2>
            <p className="nh-on-blue-soft">{lead ?? "Two fields. We reply with the programs that fit, the schedule and the tuition."}</p>
            <p className="nh-on-blue-soft nh-num">
              Or call <a href={CONTACT.phoneHref}>{CONTACT.phone}</a> · <Link href={LINKS.apply}>start an application</Link>
            </p>
          </div>
          <RequestInfoForm />
        </div>
      </div>
    </section>
  );
}
