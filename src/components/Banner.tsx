import Image from "next/image";
import HeroSlider from "@/components/HeroSlider";
import { widgets } from "@/lib/content";

const DESKTOP_SLIDES = [
  { src: "/images/theme/slider/1.jpg", alt: "Teacher holding the certification", width: 1590, height: 857 },
  { src: "/images/theme/slider/2.jpg", alt: "Portray of a Teachers", width: 1590, height: 857 },
  { src: "/images/theme/slider/3.jpg", alt: "Graduation ceremony", width: 1590, height: 857 },
];
const MOBILE_SLIDES = [
  { src: "/images/theme/slider/rslides/1.jpg", alt: "Teacher holding the certification", width: 1920, height: 800 },
  { src: "/images/theme/slider/rslides/2.jpg", alt: "Portray of a Teachers", width: 1920, height: 800 },
  { src: "/images/theme/slider/rslides/3.jpg", alt: "Graduation ceremony", width: 1920, height: 800 },
];

export function HomeBanner() {
  return (
    <div id="banner">
      <div className="wrapper">
        <div className="bnr_con">
          <div className="slider">
            <div className="box_skitter box_skitter_large">
              <HeroSlider slides={DESKTOP_SLIDES} priority />
            </div>
            <div className="rslides">
              <HeroSlider slides={MOBILE_SLIDES} />
            </div>
          </div>
          <div className="bnr_info" dangerouslySetInnerHTML={{ __html: widgets.bnr_info }} />
        </div>
      </div>
    </div>
  );
}

export function PageBanner({ title, image, imageAlt }: { title: string; image: string | null; imageAlt?: string }) {
  const src = image ?? "/images/theme/non-home-banner.jpg";
  const alt = image ? imageAlt || title : "Graduating students with the teacher";
  return (
    <div id="banner">
      <div className="wrapper">
        <div className="bnr_con">
          <div className="non_ban">
            <div className="non_ban_img">
              <Image src={src} alt={alt} width={1920} height={600} priority sizes="100vw" />
            </div>
            <div className="page_title">
              <h1 className="h1_title">{title}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
