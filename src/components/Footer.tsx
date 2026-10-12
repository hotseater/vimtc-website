import Image from "next/image";
import Link from "next/link";
import MenuList from "@/components/MenuList";
import { menus, widgets } from "@/lib/content";
import { CONTACT, SITE_NAME } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="footer_top">
        <div className="wrapper">
          <div className="footer_top_con">
            <div className="footer_top_info" dangerouslySetInnerHTML={{ __html: widgets.footer_top_info }} />
            <div className="footer_top_flex">
              <div className="contact_info" dangerouslySetInnerHTML={{ __html: widgets.contact_info.replace('href="tel:1234567890"', `href="${CONTACT.phoneHref}"`) }} />
              <div className="footer_logo_holder">
                <div className="gmap">
                  <iframe
                    src={CONTACT.mapEmbed}
                    title="Map: 7702 N 35th Avenue, Suite 2, Phoenix, AZ"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="footer_logo">
                  <Link href="/">
                    <figure>
                      <Image src="/images/theme/footer-logo.png" alt={SITE_NAME} width={441} height={78} />
                    </figure>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer_btm">
        <div className="wrapper">
          <div className="footer_btm_con">
            <nav className="footer_nav" aria-label="Footer menu">
              <h2>Site Navigation</h2>
              <MenuList items={menus.footer} />
            </nav>
            <div className="copyright">
              &copy; Copyright {year} <q></q>
              <span className="privacy_policy">
                <Link href="/privacy-notice">Privacy Notice</Link>
              </span>
              <div className="footer_disclaimer">
                <Link href="/victory-international-ministry-training-college-do-not-sell-or-share-my-personal-information">Do Not Sell/Share My Personal Information</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
