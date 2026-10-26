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
            <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href={CONTACT.x} target="_blank" rel="noopener noreferrer">
              X
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
