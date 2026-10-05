"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import NavBar from "../_components/NavBar";
import Banner from "../_components/Banner";
import Footer from "../_components/Footer";

// Photo wall — add a file to public/media/culture and list it here
const PHOTOS: { src: string; alt: string; zoom?: number; position?: string }[] = [
  { src: "/media/culture/culture-dinner.jpg", alt: "CPEC members at an outdoor dinner" },
  { src: "/media/culture/culture-arches-trio.jpg", alt: "CPEC members under the arches" },
  { src: "/media/culture/culture-apartment.jpg", alt: "CPEC members at a get-together", position: "15% center" },
  { src: "/media/culture/culture-bar.jpg", alt: "CPEC members out for dinner" },
  { src: "/media/culture/culture-ski.jpg", alt: "CPEC members on a ski trip" },
  { src: "/media/culture/culture-group-night.jpg", alt: "CPEC members at a night out" },
  { src: "/media/culture/culture-arch-window.jpg", alt: "CPEC members in suits on campus", zoom: 1.25 },
  { src: "/media/culture/culture-halloween.jpg", alt: "CPEC members in Halloween costumes" },
  { src: "/media/culture/culture-selfie.jpg", alt: "CPEC members out together" },
];

export default function CulturePageClient() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <main>
      <NavBar forceSolid />
      <Banner
        title="CPECulture"
        imageSrc="/media/culture/culture-banner.jpg"
        titleClassName="normal-case text-4xl md:text-6xl"
      />

      {/* Large photo grid: three across, nearly full page width */}
      <section ref={ref} className="mx-auto w-full max-w-[120rem] px-6 md:px-12 py-16 md:py-24">
        <div className="flex flex-wrap justify-center gap-5 md:gap-7">
          {PHOTOS.map((p, i) => (
            <div
              key={p.src}
              className={[
                "relative aspect-[16/15] w-full sm:w-[calc(50%-0.625rem)] md:w-[calc(33.333%-1.17rem)] overflow-hidden transition-all duration-700",
                show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              ].join(" ")}
              style={{ transitionDelay: show ? `${80 + i * 70}ms` : "0ms" }}
            >
              <Image src={p.src} alt={p.alt} fill className="object-cover" style={{ transform: p.zoom ? `scale(${p.zoom})` : undefined, objectPosition: p.position }} sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 40vw" />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
