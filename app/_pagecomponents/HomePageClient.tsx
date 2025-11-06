"use client";

import NavBar from "../_components/NavBar";
import VideoHero from "../_components/VideoHero";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Footer from "../_components/Footer";

export default function HomePage() {
  // Smooth anchor on initial hash
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#about") {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Reveal-on-scroll setup for sections
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const pillarsRef = useRef<HTMLDivElement | null>(null);
  const cultureRef = useRef<HTMLDivElement | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const [showPillars, setShowPillars] = useState(false);
  const [showCulture, setShowCulture] = useState(false);

  useEffect(() => {
    const opts: IntersectionObserverInit = { rootMargin: "0px 0px -10% 0px", threshold: 0.15 };
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target === aboutRef.current) setShowAbout(true);
        if (entry.target === pillarsRef.current) setShowPillars(true);
        if (entry.target === cultureRef.current) setShowCulture(true);
        obs.unobserve(entry.target);
      });
    }, opts);
    if (aboutRef.current) obs.observe(aboutRef.current);
    if (pillarsRef.current) obs.observe(pillarsRef.current);
    if (cultureRef.current) obs.observe(cultureRef.current);
    return () => obs.disconnect();
  }, []);
  return (
    <>
      <NavBar />
      <VideoHero />

      {/* Who We Are */}
      <section id="about" ref={aboutRef} className="mx-auto w-full max-w-7xl px-6 py-20 md:py-28 scroll-mt-12 md:scroll-mt-18">
        <div className={["grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center transition-all duration-700 ease-out", showAbout ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"].join(" ") }>
          {/* Image */}
          <div className="order-1 md:order-0">
            <div className="relative rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/5 aspect-4/3">
              <Image
                src="/media/cpec_fullclub.png"
                alt="CPEC members outside an iconic Cornell archway"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Text */}
          <div className="max-w-[70ch] text-neutral-900">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Who We Are
            </h2>
            <p className="mt-4 text-neutral-700">
              Cornell Private Equity Club (CPEC) is Cornell’s only undergraduate
              organization devoted exclusively to private equity. We help
              students build the skills, network, and experience to excel in
              high-impact investing roles.
            </p>

            {/* feature list with left rule + indent */}
            <ul className="mt-6 border-l-2 border-neutral-200 pl-6 space-y-2 text-neutral-800">
              <li className="leading-relaxed">
                10-week New Member Education on core PE fundamentals
              </li>
              <li className="leading-relaxed">
                Hands-on deal analysis and investment case competitions
              </li>
              <li className="leading-relaxed">
                Mentorship from upperclassmen and engaged alumni
              </li>
              <li className="leading-relaxed">
                Industry exposure through exclusive speaker events
              </li>
            </ul>

            <p className="mt-8 italic text-neutral-600">
              “At CPEC, members gain the confidence and preparation to compete
              for top private equity and finance roles.”
            </p>
          </div>
        </div>
      </section>

      {/* Our Pillars (single-paragraph descriptions) */}
      <section ref={pillarsRef} className="mx-auto w-full max-w-7xl px-6 pt-12 md:pt-16 pb-20 md:pb-28">
        <h2 className={["text-center text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F1A2E] transition-all duration-700", showPillars ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"].join(" ") }>
          Our Pillars
        </h2>

        <div className={["mt-14 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-start transition-all duration-700", showPillars ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"].join(" ") }>
          {/* Education & Skill Building */}
          <div className="text-center">
            <div className="mx-auto relative h-[140px] w-[140px]">
              <Image
                src="/media/icons/education.svg"
                alt="Education & Skill Building icon"
                fill
                className="object-contain"
                sizes="140px"
              />
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-[#0F1A2E]">
              Education & Skill Building
            </h3>
            <p className="mt-5 text-neutral-700 leading-relaxed max-w-[50ch] mx-auto">
              Our New Member Education program equips students with the tools,
              training, and confidence to pursue opportunities across the
              finance industry.
            </p>
          </div>

          {/* Industry Exposure */}
          <div className="text-center">
            <div className="mx-auto relative h-[140px] w-[140px]">
              <Image
                src="/media/icons/industry.svg"
                alt="Industry Exposure icon"
                fill
                className="object-contain"
                sizes="140px"
              />
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-[#0F1A2E]">
              Industry Exposure
            </h3>
            <p className="mt-5 text-neutral-700 leading-relaxed max-w-[50ch] mx-auto">
              Members gain real-world experience through case competitions and
              hands-on deal analysis, strengthening their understanding of
              PE.
            </p>
          </div>

          {/* Leadership Development */}
          <div className="text-center">
            <div className="mx-auto relative h-[140px] w-[140px]">
              <Image
                src="/media/icons/leadership.svg"
                alt="Leadership Development icon"
                fill
                className="object-contain"
                sizes="140px"
              />
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-[#0F1A2E]">
              Leadership Development
            </h3>
            <p className="mt-5 text-neutral-700 leading-relaxed max-w-[50ch] mx-auto">
              CPEC fosters strong relationships and peer mentorship, empowering
              students to build a lasting professional network in finance. 
            </p>
          </div>
        </div>
      </section>

            {/* CPEC Culture */}
      <section ref={cultureRef} className="mx-auto w-full max-w-7xl px-6 py-20 md:py-28">
        <div className={["grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center transition-all duration-700 ease-out", showCulture ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"].join(" ") }>
          {/* Text */}
          <div className="max-w-[70ch] text-neutral-900">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              CPEC Culture
            </h2>

            <p className="mt-6 text-lg text-neutral-700 leading-relaxed">
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

      </>
  );
}
