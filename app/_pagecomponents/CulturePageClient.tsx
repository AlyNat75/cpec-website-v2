"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import NavBar from "../_components/NavBar";
import Banner from "../_components/Banner";
import Footer from "../_components/Footer";

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
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <main>
      <NavBar forceSolid />
      <Banner title="CPECULTURE" imageSrc="/media/nmesocial.png" titleClassName="text-4xl md:text-6xl" />

      <section ref={ref} className="mx-auto w-full max-w-7xl px-6 py-20 md:py-28">
        <div className={["grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center transition-all duration-700 ease-out", show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"].join(" ") }>
          {/* Text */}
          <div className="max-w-[70ch] text-neutral-900">
            <p className="text-lg text-neutral-700 leading-relaxed">
              CPEC is more than a professional finance club — it’s a tight-knit community
              rooted in collaboration, support, and shared ambition. We prioritize
              culture and belonging just as much as technical excellence.
            </p>

            <p className="mt-6 text-lg text-neutral-700 leading-relaxed">
              Members grow together, help each other navigate recruiting, and form
              friendships that extend far beyond campus. From retreats and dinners to
              casual hangouts and spontaneous adventures, there’s a genuine trust and
              camaraderie that defines our group.
            </p>

            <p className="mt-6 text-lg text-neutral-700 leading-relaxed">
              We’re united by a passion for private equity, but it’s the people who make
              CPEC truly special.
            </p>
          </div>


          {/* Staggered images */}
          <div className="relative">
            {/* subtle glow */}
            <div className="pointer-events-none absolute -top-6 -right-8 h-48 w-48 rounded-full bg-indigo-200/40 blur-3xl md:h-56 md:w-56" />
            <div className="pointer-events-none absolute -bottom-10 -left-6 h-40 w-40 rounded-full bg-sky-200/40 blur-3xl md:h-48 md:w-48" />

            {/* Desktop: overlapping layout */}
            <div className="hidden md:block relative h-[440px]">
              {/* top/right card */}
              <div className="absolute top-0 right-2 w-[60%] aspect-4/3 rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5 rotate-[-1.5deg]">
                <Image
                  src="/media/eboard_social2.jpeg"
                  alt="CPEC e-board social"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 40vw, 100vw"
                />
              </div>
              {/* bottom/left card */}
              <div className="absolute left-0 bottom-0 w-[58%] aspect-4/3 rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5 rotate-[1.25deg]">
                <Image
                  src="/media/nmesocial.png"
                  alt="CPEC new member social"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 40vw, 100vw"
                />
              </div>
            </div>

            {/* Mobile: simple two-up grid */}
            <div className="grid grid-cols-2 gap-4 md:hidden">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden shadow-md ring-1 ring-black/5">
                <Image
                  src="/media/eboard_social2.png"
                  alt="CPEC e-board social"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
              <div className="relative aspect-4/3 rounded-xl overflow-hidden shadow-md ring-1 ring-black/5">
                <Image
                  src="/media/nmesocial.png"
                  alt="CPEC new member social"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
