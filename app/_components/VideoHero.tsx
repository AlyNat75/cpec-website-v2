"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "86vh", minHeight: "560px" }}
    >
      {/* Background video (darkened via filters for contrast) */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover brightness-[.55] saturate-110 contrast-110"
        autoPlay
        muted
        loop
        playsInline
        poster="/media/hero-poster.jpg"
        src="/media/CPEC_home_banner.mp4"
      />

      {/* Dark overlay (v4: use /60 not /55) */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Bottom vignette */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/60 to-transparent" />

      {/* Centered content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <p className="italic text-white/95 text-xl md:text-2xl tracking-wide mb-4">
          Cornell&apos;s Only Undergraduate Private Equity Organization
        </p>

        <h1 className="text-white font-heading uppercase font-bold text-5xl md:text-7xl mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]" style={{ letterSpacing: "0.6px" }}>
          Cornell Private Equity Club
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">

          <Link
            href="/#about"
            className="text-white border-2 border-white hover:bg-white/15 rounded-full px-8 py-3 text-sm md:text-base font-semibold uppercase tracking-wider min-h-12"
          >
            LEARN MORE
          </Link>
        </div>
      </div>
    </section>
  );
}
