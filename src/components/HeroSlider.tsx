"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export type Slide = { src: string; alt: string; width: number; height: number };

/** Cross-fading hero slider; replaces the jQuery skitter (desktop) and responsiveslides (mobile) plugins. */
export default function HeroSlider({ slides, interval = 6000, priority = false }: { slides: Slide[]; interval?: number; priority?: boolean }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (slides.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), interval);
    return () => window.clearInterval(id);
  }, [slides.length, interval]);

  return (
    <div className="hero_slides" aria-roledescription="carousel">
      {slides.map((s, i) => (
        <figure key={s.src} className={i === index ? "is-active" : undefined} aria-hidden={i !== index}>
          <Image src={s.src} alt={s.alt} width={s.width} height={s.height} priority={priority && i === 0} sizes="100vw" />
        </figure>
      ))}
    </div>
  );
}
