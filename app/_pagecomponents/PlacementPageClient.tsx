"use client";

import Image from "next/image";
import NavBar from "../_components/NavBar";
import { useEffect, useRef, useState } from "react";
import Footer from "../_components/Footer";

type LogoRow = string[];

const LOGOS: string[] = [
  // Row 1
  "/placement/cpec_blackrock.jpg",
  "/placement/cpec_lazard.png",
  "/placement/cpec_ares.png",
  "/placement/cpec_jpm.png",

  // Row 2
  "/placement/cpec_centerview.png",
  "/placement/cpec_citi.png",
  "/placement/cpec_barclays.svg",
  "/placement/cpec_goldman.png",

  // Row 3
  "/placement/cpec_wellsfargo.png",
  "/placement/cpec_ubs.png",
  "/placement/cpec_rbc.png",
  "/placement/cpec_rothschild.png",

  // Row 4
  "/placement/cpec_soloman.png",
  "/placement/cpec_bcg.jpg",
  "/placement/cpec_tishman.jpg",
  "/placement/cpec_macquarie.png",
];

// Per-logo tweaks (use arbitrary scales so Tailwind v4 keeps them)
const SCALE_OVERRIDES: Record<string, string> = {
  // Looked small → scale up
  "/placement/cpec_barclays.svg": "scale-[1.8]",
  "/placement/cpec_centerview.png": "scale-[1.3]",
  "/placement/cpec_rbc.png": "scale-[1.4]",
  "/placement/cpec_rothschild.png": "scale-[1.3]",
  "/placement/cpec_tishman.jpg": "scale-[1.7]",
  "/placement/cpec_wellsfargo.png": "scale-[1.4]",
  "/placement/cpec_citi.png": "scale-[1.15]",
  "/placement/cpec_bcg.jpg": "scale-[1.2]",
  "/placement/cpec_blackrock.jpg": "scale-[1.1]",

  // Looked large → scale down
  "/placement/cpec_lazard.png": "scale-[0.85]",
  "/placement/cpec_jpm.png": "scale-[0.85]",
  "/placement/cpec_kpmg.png": "scale-[0.7]",
  "/placement/cpec_macquarie.png": "scale-[0.95]",
  "/placement/cpec_ubs.png": "scale-[0.8]",
  "/placement/cpec_soloman.png": "scale-[0.9]",
  "/placement/cpec_ares.png": "scale-[0.75]",
};

function chunkIntoRows(items: string[], size: number): LogoRow[] {
  const rows: LogoRow[] = [];
  for (let i = 0; i < items.length; i += size) rows.push(items.slice(i, i + size));
  return rows;
}

export default function PlacementPageClient() {
  return (
    <>
      <NavBar forceSolid />

      {/* Banner */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "68vh", minHeight: "380px", maxHeight: "680px" }}
      >
        <Image
          src="/media/cpec_placementbanner.jpg"
          alt="City skyline banner"
          fill
          priority
          className="object-cover brightness-[.7] saturate-110"
        />
        {/* FIX: gradient utility */}
        <div className="absolute inset-0 bg-linear-to-t from-black/35 to-transparent" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1
            className="text-white font-extrabold uppercase tracking-wide text-5xl md:text-7xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
            style={{ letterSpacing: "0.04em" }}
          >
            Placement
          </h1>
          <p className="mt-3 text-white/90 text-lg md:text-xl tracking-wide italic">
            Our members secure competitive roles at top firms worldwide
          </p>
        </div>
      </section>

      {/* Logos Grid */}
      <section className="mx-auto w-full max-w-7xl px-6 py-16 md:py-20">
        <AnimatedLogoGrid rows={chunkIntoRows(LOGOS, 4)} />
      </section>
      <Footer />
    </>
  );
}

function AnimatedLogoGrid({ rows }: { rows: LogoRow[] }) {
  const rowRefs = useRef<HTMLDivElement[]>([]);
  const [visible, setVisible] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.rowIndex);
          if (entry.isIntersecting) {
            setVisible((v) => ({ ...v, [idx]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );
    rowRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      {rows.map((row, rowIdx) => (
        <div
          key={rowIdx}
          data-row-index={rowIdx}
          ref={(el) => {
            if (el) rowRefs.current[rowIdx] = el;
          }}
          className={[
            "grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8 transition-all duration-700 ease-out",
            visible[rowIdx] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          ].join(" ")}
          style={{ transitionDelay: `${rowIdx * 60}ms` }}
        >
          {row.map((src, i) => (
            <LogoCard key={i} src={src} />
          ))}
        </div>
      ))}
    </div>
  );
}

function LogoCard({ src }: { src: string }) {
  return (
    <div
      className="relative bg-white rounded-xl shadow-sm ring-1 ring-black/5 overflow-hidden hover:shadow-md hover:translate-y-px transition"
      style={{ aspectRatio: "3 / 1" }}
    >
      <div
        className={`absolute inset-0 flex items-center justify-center p-6 md:p-8 ${
          SCALE_OVERRIDES[src] ?? ""
        }`}
      >
        <Image
          src={src}
          alt="Placement partner logo"
          fill
          className="object-contain"
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 320px"
          priority={false}
        />
      </div>
    </div>
  );
}
