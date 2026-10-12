import Image from "next/image";
import Link from "next/link";
import { CONTACT, SITE_NAME } from "@/lib/site";
import { widgets } from "@/lib/content";

export function Logo() {
  return (
    <div className="main_logo">
      <Link href="/">
        <figure>
          <Image src="/images/theme/main-logo.png" alt={SITE_NAME} width={170} height={230} priority />
        </figure>
      </Link>
    </div>
  );
}

export default function Header() {
  return (
    <div className="header_fix">
      <div className="header_holder">
        <header>
          <div className="wrapper">
            <div className="header_con">
              <Logo />
              <div className="head_info">
                <div className="header_info" />
                <div className="social_media">
                  <ul>
                    <li>
                      <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <figure>
                          <Image src="/images/theme/fb-icon.png" alt="facebook" width={47} height={47} />
                        </figure>
                      </a>
                    </li>
                    <li>
                      <a href={CONTACT.x} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                        <figure>
                          <Image src="/images/theme/twitter-icon.png" alt="twitter" width={47} height={47} />
                        </figure>
                      </a>
                    </li>
                  </ul>
                  <div dangerouslySetInnerHTML={{ __html: widgets.social_media }} />
                </div>
              </div>
            </div>
            <div className="clearfix" />
          </div>
        </header>
      </div>
    </div>
  );
}
