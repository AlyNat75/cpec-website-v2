"use client";

import Image from "next/image";
import NavBar from "../_components/NavBar";
import Footer from "../_components/Footer";
import { useEffect, useRef, useState } from "react";

// —————————————————————————————————————————————
// DATA — logos grouped by year
// —————————————————————————————————————————————

type Group = { label: string; logos: string[] };

const GROUPS: Group[] = [
  {
    label: "Summer 2027",
    logos: [
      "/placement/cpec_ubs.png",
      "/placement/cpec_jpm.png",
      "/placement/cpec_citi.png",
      "/placement/cpec_ms.png",
      "/placement/cpec_barclays.svg",
      "/placement/cpec_jefferies.svg",
      "/placement/cpec_bofa.png",
    ],
  },
  {
    label: "Summer 2026",
    logos: [
      "/placement/cpec_citi.png",
      "/placement/cpec_wellsfargo.png",
      "/placement/cpec_goldman.png",
      "/placement/cpec_jpm.png",
      "/placement/cpec_lazard.png",
      "/placement/cpec_bcg.jpg",
      "/placement/cpec_centerview.png",
      "/placement/cpec_rothschild.png",
      "/placement/cpec_soloman.png",
      "/placement/cpec_millennium.png",
    ],
  },
  {
    label: "Alumni",
    logos: [
      "/placement/cpec_blackrock.jpg",
      "/placement/cpec_ares.png",
      "/placement/cpec_rbc.png",
      "/placement/cpec_tishman.jpg",
      "/placement/cpec_macquarie.png",
    ],
  },
];

// CSS scale applied to the container div.
// Image uses Next.js fill + object-contain to fill the container.
// scale > 1  → zooms in (clips via overflow-hidden on card)
// scale < 1  → zooms out (shows more breathing room)
// Barclays SVG viewBox has been cropped so it no longer needs a large scale.
const SCALE: Record<string, string> = {
  // Summer 2027
  "/placement/cpec_ubs.png":        "scale-[0.8]",
  "/placement/cpec_jpm.png":        "scale-[0.85]",
  "/placement/cpec_citi.png":       "scale-[1.15]",
  "/placement/cpec_ms.png":         "scale-[0.85]",
  "/placement/cpec_barclays.svg":   "scale-[1.05]",
  "/placement/cpec_jefferies.svg":  "scale-[0.7]",
  "/placement/cpec_bofa.png":       "scale-[1.9]",
  // Summer 2026 (citi/jpm already above)
  "/placement/cpec_wellsfargo.png": "scale-[1.4]",
  "/placement/cpec_goldman.png":    "scale-[1.0]",
  "/placement/cpec_lazard.png":     "scale-[0.85]",
  "/placement/cpec_bcg.jpg":        "scale-[1.2]",
  "/placement/cpec_centerview.png": "scale-[1.3]",
  "/placement/cpec_rothschild.png": "scale-[1.3]",
  "/placement/cpec_soloman.png":    "scale-[0.9]",
  "/placement/cpec_millennium.png": "scale-[0.75]",
  // Alumni
  "/placement/cpec_blackrock.jpg":  "scale-[1.1]",
  "/placement/cpec_ares.png":       "scale-[0.75]",
  "/placement/cpec_rbc.png":        "scale-[1.4]",
  "/placement/cpec_tishman.jpg":    "scale-[1.7]",
  "/placement/cpec_macquarie.png":  "scale-[0.95]",
};

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
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,.35), transparent)" }} />
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

      {/* Year groups */}
      <section className="mx-auto w-full max-w-7xl px-6 py-16 md:py-20 space-y-16 text-center">
        <AnimatedGroups groups={GROUPS} />
      </section>

      <Footer />
    </>
  );
}

// —————————————————————————————————————————————
// ANIMATED GROUPS
// —————————————————————————————————————————————
function AnimatedGroups({ groups }: { groups: Group[] }) {
  const groupRefs = useRef<HTMLDivElement[]>([]);
  const [visible, setVisible] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const reveal = (idx: number) =>
      setVisible((v) => (v[idx] ? v : { ...v, [idx]: true }));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.groupIndex);
          if (entry.isIntersecting) { reveal(idx); io.unobserve(entry.target); }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -20% 0px" }
    );
    groupRefs.current.forEach((el) => el && io.observe(el));

    const onScroll = () => {
      const vh = window.innerHeight || 0;
      groupRefs.current.forEach((el, idx) => {
        if (!el) return;
        if (el.getBoundingClientRect().top < vh * 0.9) reveal(idx);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <>
      {groups.map((g, idx) => (
        <div
          key={g.label}
          data-group-index={idx}
          ref={(el) => { if (el) groupRefs.current[idx] = el; }}
          className={[
            "transition-all duration-700 ease-out will-change-transform",
            visible[idx] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          ].join(" ")}
        >
          <h2 className="mb-8 text-2xl md:text-3xl font-semibold">{g.label}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
            {g.logos.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className={[
                  "transition-all duration-700 will-change-transform",
                  visible[idx] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                ].join(" ")}
                style={{ transitionDelay: visible[idx] ? `${80 + i * 55}ms` : "0ms" }}
              >
                <LogoCard src={src} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

// —————————————————————————————————————————————
// LOGO CARD — restored original approach:
// Image fill + object-contain fills the card, then CSS scale on the
// container zooms in/out. overflow-hidden on the card clips the excess.
// —————————————————————————————————————————————
function LogoCard({ src }: { src: string }) {
  const scale = SCALE[src] ?? "";
  return (
    <div
      className="relative bg-white rounded-xl shadow-sm ring-1 ring-black/5 overflow-hidden hover:shadow-md transition"
      style={{ aspectRatio: "3 / 1" }}
    >
      <div className={`absolute inset-0 flex items-center justify-center p-4 md:p-6 ${scale}`}>
        <Image
          src={src}
          alt="Placement logo"
          fill
          className="object-contain"
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 320px"
        />
      </div>
    </div>
  );
}
