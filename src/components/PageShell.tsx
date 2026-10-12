import type { ReactNode } from "react";
import { PageBanner } from "@/components/Banner";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";

/** Inner-page frame: banner with title, breadcrumbs, optional "Page Intro" ribbon, then content. Mirrors page.php + loop-page.php. */
export default function PageShell({
  title,
  banner,
  bannerAlt,
  intro,
  trail,
  children,
}: {
  title: string;
  banner: string | null;
  bannerAlt?: string;
  intro?: string | null;
  trail: Crumb[];
  children: ReactNode;
}) {
  return (
    <>
      <PageBanner title={title} image={banner} imageAlt={bannerAlt} />
      <div id="main_area">
        <div className="wrapper">
          <div className="main_con">
            <Breadcrumbs trail={trail} />
            <main>
              <div className="page">
                <div className="entry-content">
                  {intro ? <div className="intro_txt">{intro}</div> : null}
                  {children}
                </div>
              </div>
            </main>
          </div>
          <div className="clearfix" />
        </div>
      </div>
    </>
  );
}
