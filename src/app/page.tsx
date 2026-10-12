import type { Metadata } from "next";
import Image from "next/image";
import { HomeBanner } from "@/components/Banner";
import MessageForm from "@/components/forms/MessageForm";
import { descriptions, getPageByPath, readPageHtml, widgets } from "@/lib/content";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${SITE_NAME} | ${SITE_TAGLINE}` },
  description: descriptions["/"],
  alternates: { canonical: "/" },
  openGraph: { title: SITE_TAGLINE, description: descriptions["/"], url: "/", images: [{ url: "/images/theme/slider/rslides/1.jpg", width: 1920, height: 800 }] },
};

const Html = ({ html, className }: { html: string; className?: string }) => <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;

/** Home page. Section order and class names follow page.php → banner, main + sidebar, bottom1/2/3, footer. */
export default function HomePage() {
  const page = getPageByPath("/")!;
  const html = readPageHtml(page);

  return (
    <>
      <HomeBanner />

      <div id="main_area">
        <div className="wrapper">
          <div className="main_con">
            <main>
              <div className="page home">
                <h1 className="h1_title hdng_h2">
                  <small className="hdng_small">Hello and Welcome to</small>
                  Victory International <span>Ministry Training College</span>
                </h1>
                <div className="entry-content" dangerouslySetInnerHTML={{ __html: html }} />
              </div>
            </main>
            <aside className="sidebar">
              <figure>
                <Image src="/images/theme/main-img1.jpg" alt="Dr. P. Ray Johnson" width={448} height={649} />
                <figcaption>
                  <p>Apostle Dr. P. Ray Johnson</p>
                  <p>President &amp; Chancellor, Emeritus</p>
                </figcaption>
              </figure>
            </aside>
          </div>
          <div className="clearfix" />
        </div>
      </div>

      <div id="bottom1">
        <div className="btm1_outside_img">
          <figure>
            <Image src="/images/theme/btm1-img3.jpg" alt="portray of a school" width={520} height={492} />
          </figure>
        </div>
        <div className="wrapper">
          <div className="btm1_con">
            <Html className="btm1_info" html={widgets.btm1_info} />
            <div className="btm1_boxes">
              <section className="btm1_box1" dangerouslySetInnerHTML={{ __html: widgets.btm1_box1 }} />
              <div className="btm_box_img1">
                <figure>
                  <Image src="/images/theme/btm1-img1.jpg" alt="Graduating student holding a diploma" width={327} height={459} />
                </figure>
              </div>
              <section className="btm1_box2" dangerouslySetInnerHTML={{ __html: widgets.btm1_box2 }} />
              <div className="btm_box_img1 btm_box_img2">
                <figure>
                  <Image src="/images/theme/btm1-img2.jpg" alt="Graduating student smiling" width={327} height={459} />
                </figure>
                <figcaption>Prof. Dr. Kelly &amp; Mrs. Doussey</figcaption>
              </div>
              <section className="btm1_box3" dangerouslySetInnerHTML={{ __html: widgets.btm1_box3 }} />
            </div>
            <Html className="btm1_info2" html={widgets.btm1_info2} />
          </div>
        </div>
      </div>

      <div id="bottom2">
        <div className="wrapper">
          <div className="btm2_con">
            <Html className="btm2_info" html={widgets.btm2_info} />
          </div>
        </div>
      </div>

      <div id="bottom3">
        <div className="wrapper">
          <div className="btm3_con">
            <div className="btm3_flex">
              <div className="btm3_boxes">
                <section className="btm3_box1" dangerouslySetInnerHTML={{ __html: widgets.btm3_box1 }} />
                <section className="btm3_box2" dangerouslySetInnerHTML={{ __html: widgets.btm3_box2 }} />
                <section className="btm3_box3" dangerouslySetInnerHTML={{ __html: widgets.btm3_box3 }} />
              </div>
              <div className="btm3_form_con">
                <Html className="btm3_info" html={widgets.btm3_info} />
                <MessageForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
