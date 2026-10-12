import type { Metadata } from "next";
import { Archivo, Questrial } from "next/font/google";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import CookieNotice from "@/components/CookieNotice";
import { menus } from "@/lib/content";
import { CONTACT, SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const questrial = Questrial({ subsets: ["latin"], weight: "400", variable: "--font-questrial", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_TAGLINE}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: { type: "website", siteName: SITE_NAME, locale: "en_US" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  verification: { google: "google8e36b76cb2cc26ff" },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE_NAME,
  alternateName: "VIMTC",
  url: SITE_URL,
  logo: `${SITE_URL}/images/theme/main-logo.png`,
  telephone: "+1-844-443-7500",
  email: CONTACT.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT.addressLine1,
    addressLocality: "Phoenix",
    addressRegion: "AZ",
    postalCode: "85340",
    addressCountry: "US",
  },
  sameAs: [CONTACT.facebook, CONTACT.x],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${archivo.variable} ${questrial.variable}`}>
      <body>
        <div className="protect-me">
          <div className="clearfix">
            <Header />
            <Nav items={menus.main} />
            {children}
            <Footer />
            <BackToTop />
          </div>
        </div>
        <CookieNotice />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      </body>
    </html>
  );
}
