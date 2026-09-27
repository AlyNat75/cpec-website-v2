"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import NavBar from "../_components/NavBar";
import Banner from "../_components/Banner";
import Footer from "../_components/Footer";

// Photo wall — add a file to public/media/culture and list it here
const PHOTOS = [
  { src: "/media/culture/culture-dinner.jpg", alt: "CPEC members at an outdoor dinner" },
  { src: "/media/culture/culture-couch.jpg", alt: "CPEC members hanging out" },
  { src: "/media/culture/culture-apartment.jpg", alt: "CPEC members at a get-together" },
  { src: "/media/culture/culture-bar.jpg", alt: "CPEC members out for dinner" },
  { src: "/media/culture/culture-ski.jpg", alt: "CPEC members on a ski trip" },
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
        title="CPECULTURE"
        imageSrc="/media/culture/culture-apartment.jpg"
        imagePosition="center 22%"
        titleClassName="text-4xl md:text-6xl"
      />

      {/* CIBC-style photo grid: square tiles, three across, last row centered */}
      <section ref={ref} className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {PHOTOS.map((p, i) => (
            <div
              key={p.src}
              className={[
                "relative aspect-square w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1.34rem)] overflow-hidden transition-all duration-700",
                show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              ].join(" ")}
              style={{ transitionDelay: show ? `${80 + i * 70}ms` : "0ms" }}
            >
              <Image src={p.src} alt={p.alt} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
