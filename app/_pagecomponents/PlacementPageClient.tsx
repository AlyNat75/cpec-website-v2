"use client";

import NavBar from "../_components/NavBar";
import Footer from "../_components/Footer";
import { useEffect, useRef, useState } from "react";

type LogoRow = string[];

// —————————————————————————————————————————————
// DATA
// —————————————————————————————————————————————

const LOGOS: string[] = [
  "/placement/cpec_blackrock.jpg",
  "/placement/cpec_lazard.png",
  "/placement/cpec_ares.png",
  "/placement/cpec_jpm.png",

  "/placement/cpec_centerview.png",
  "/placement/cpec_citi.png",
  "/placement/cpec_barclays.svg",
  "/placement/cpec_goldman.png",

  "/placement/cpec_wellsfargo.png",
  "/placement/cpec_ubs.png",
  "/placement/cpec_rbc.png",
  "/placement/cpec_rothschild.png",

  "/placement/cpec_soloman.png",
  "/placement/cpec_bcg.jpg",
  "/placement/cpec_tishman.jpg",
  "/placement/cpec_macquarie.png",
];

// Keep editing these. Bigger number => bigger logo.
// We map this cleanly to pixel max-heights (no transforms).
const SCALE_OVERRIDES: Record<string, string> = {
  "/placement/cpec_barclays.svg": "scale-[6.0]",
  "/placement/cpec_centerview.png": "scale-[4.0]",
  "/placement/cpec_rbc.png": "scale-[4.2]",
  "/placement/cpec_rothschild.png": "scale-[3.2]",
  "/placement/cpec_tishman.jpg": "scale-[10.0]",
  "/placement/cpec_wellsfargo.png": "scale-[4.2]",
  "/placement/cpec_citi.png": "scale-[3.5]",
  "/placement/cpec_bcg.jpg": "scale-[3.0]",
  "/placement/cpec_blackrock.jpg": "scale-[5.0]",

  "/placement/cpec_lazard.png": "scale-[1.2]",
  "/placement/cpec_jpm.png": "scale-[1.5]",
  "/placement/cpec_kpmg.png": "scale-[0.7]",
  "/placement/cpec_macquarie.png": "scale-[1.5]",
  "/placement/cpec_ubs.png": "scale-[2.0]",
  "/placement/cpec_soloman.png": "scale-[1.3]",
  "/placement/cpec_ares.png": "scale-[1.7]",
  "/placement/cpec_goldman.png": "scale-[1.2]",
};

// —————————————————————————————————————————————
// HELPERS
// —————————————————————————————————————————————

function chunkIntoRows(items: string[], size: number): LogoRow[] {
  const rows: LogoRow[] = [];
  for (let i = 0; i < items.length; i += size) rows.push(items.slice(i, i + size));
  return rows;
}

// Convert "scale-[x]" -> mobile/desktop max-heights in px.
// No transforms; we just clamp pixel heights so Safari renders identically.
function heightsFor(src: string) {
  const raw = SCALE_OVERRIDES[src];
  const m = raw?.match(/scale-\[([0-9.]+)\]/);
  const factor = m ? parseFloat(m[1]) : 1;

  // Baselines that look good in your layout.
  const mobileBase = 60;   // px inside a ~3:1 card on phones
  const desktopBase = 88;  // px inside a ~3:1 card on md+

  // Multiply and clamp to keep things sane
  const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
  const mobile = clamp(mobileBase * factor, 38, 140);
  const desktop = clamp(desktopBase * factor, 52, 180);

  return { mobile, desktop };
}

// —————————————————————————————————————————————
export default function PlacementPageClient() {
  return (
    <>
      <NavBar forceSolid />

      {/* Banner */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "68vh", minHeight: "380px", maxHeight: "680px" }}
      >
        <img
          src="/media/cpec_placementbanner.jpg"
          alt="City skyline banner"
          className="absolute inset-0 h-full w-full object-cover"
          decoding="async"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,.35), transparent)" }}
        />
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

// —————————————————————————————————————————————
// ANIMATED ROWS
// —————————————————————————————————————————————
function AnimatedLogoGrid({ rows }: { rows: LogoRow[] }) {
  const rowRefs = useRef<HTMLDivElement[]>([]);
  const [visible, setVisible] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.rowIndex);
          if (entry.isIntersecting) {
            setVisible((v) => (v[idx] ? v : { ...v, [idx]: true }));
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );
    rowRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
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
            <LogoCard key={`${src}-${i}`} src={src} />
          ))}
        </div>
      ))}
    </div>
  );
}

// —————————————————————————————————————————————
// STABLE, SAFARI-PROOF LOGO CARD
// —————————————————————————————————————————————
function LogoCard({ src }: { src: string }) {
  const { mobile, desktop } = heightsFor(src);

  return (
    <div
      className="relative rounded-xl bg-white shadow-sm transition hover:shadow-md overflow-hidden"
      // fixed ratio card; no absolute positioning inside
      style={{ aspectRatio: "3 / 1" }}
    >
      {/* Use flexbox to center the image; ensures perfect vertical centering */}
      <div className="flex h-full w-full items-center justify-center p-4 md:p-8 relative z-0">
        {/* Mobile image */}
        <img
          src={src}
          alt="Placement partner logo"
          decoding="async"
          loading="lazy"
          className="block h-auto w-auto max-w-full max-h-full object-contain md:hidden"
          style={{
            maxHeight: `${mobile}px`,
          }}
        />
        {/* Desktop image */}
        <img
          src={src}
          alt="Placement partner logo"
          decoding="async"
          loading="lazy"
          className="hidden md:block h-auto w-auto max-w-full max-h-full object-contain"
          style={{
            maxHeight: `${desktop}px`,
          }}
        />
      </div>
      {/* Border overlay - appears on top of logo background */}
      <div className="absolute inset-0 rounded-xl border border-black/5 pointer-events-none z-10" />
    </div>
  );
}
