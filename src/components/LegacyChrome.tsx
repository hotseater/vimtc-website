import type { ReactNode } from "react";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { menus } from "@/lib/content";

/** The ported WordPress theme's header, nav and footer. Used by every page that has not been redesigned yet. */
export default function LegacyChrome({ children }: { children: ReactNode }) {
  return (
    <div className="protect-me">
      <div className="clearfix">
        <Header />
        <Nav items={menus.main} />
        {children}
        <Footer />
        <BackToTop />
      </div>
    </div>
  );
}
