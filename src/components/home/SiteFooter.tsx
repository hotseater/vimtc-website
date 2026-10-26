import Image from "next/image";
import Link from "next/link";
import { LINKS } from "@/content/home";
import { CONTACT, SITE_NAME } from "@/lib/site";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer id="give" className="nh-footer">
      <div className="nh-container nh-footer-grid">
        <div className="nh-footer-about">
          <Image src="/images/theme/main-logo.png" alt="" width={52} height={70} />
          <p>
            {SITE_NAME}
            <br />
            {CONTACT.addressLine1}
            <br />
            {CONTACT.addressLine2}
          </p>
          <p className="nh-num">
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            <br />
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </p>
          <p className="nh-footer-social">
            <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" aria-label="VIMTC on Facebook" title="Facebook">
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.3H7.4V14h2.8v8h3.3Z" /></svg>
            </a>
            <a href={CONTACT.x} target="_blank" rel="noopener noreferrer" aria-label="VIMTC on X" title="X">
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.8 3h3l-6.6 7.6L22 21h-6.1l-4.8-6.2L5.6 21h-3l7.1-8.1L2 3h6.2l4.3 5.7L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z" /></svg>
            </a>
          </p>
        </div>
        <nav aria-label="Programs" className="nh-footer-col">
          <strong>Programs</strong>
          <Link href={`${LINKS.programs}/certificate-in-discipleship`}>Certificate in Discipleship</Link>
          <Link href={`${LINKS.programs}/diploma-in-biblical-studies`}>Diploma in Biblical Studies</Link>
          <Link href={`${LINKS.programs}/associate-degree-in-ministry`}>Associate Degree in Ministry</Link>
          <Link href={`${LINKS.programs}/bachelor-of-arts-in-ministerial-studies`}>Bachelor of Arts degrees</Link>
          <Link href={LINKS.curriculum}>Curriculum</Link>
        </nav>
        <nav aria-label="Admissions" className="nh-footer-col">
          <strong>Admissions</strong>
          <Link href={LINKS.admissions}>How to apply</Link>
          <Link href={LINKS.apply}>Apply online</Link>
          <Link href={LINKS.schedules}>Class schedules</Link>
          <Link href={LINKS.appointment}>Set an appointment</Link>
          <Link href={LINKS.contact}>Contact us</Link>
        </nav>
        <nav aria-label="College" className="nh-footer-col">
          <strong>College</strong>
          <Link href={LINKS.about}>About us</Link>
          <Link href={LINKS.faculty}>Meet our faculty</Link>
          <Link href={LINKS.accreditation}>Accreditation</Link>
          <Link href={LINKS.events}>Campus events</Link>
          <Link href={LINKS.gallery}>Gallery</Link>
          <Link href={LINKS.donate}>Tuition payment and giving</Link>
        </nav>
      </div>
      <div className="nh-container nh-footer-legal">
        <span>© {year} {SITE_NAME}</span>
        <span className="nh-footer-links">
          <Link href={LINKS.privacy}>Privacy Notice</Link>
          <Link href={LINKS.doNotSell}>Do Not Sell/Share My Personal Information</Link>
          <Link href={LINKS.discrimination}>Racial Discrimination Policy</Link>
          <Link href={LINKS.sitemap}>Sitemap</Link>
        </span>
      </div>
    </footer>
  );
}
