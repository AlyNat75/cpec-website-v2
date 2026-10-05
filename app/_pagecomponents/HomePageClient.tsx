"use client";

import NavBar from "../_components/NavBar";
import VideoHero from "../_components/VideoHero";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Footer from "../_components/Footer";

const ABOUT_COLUMNS = [
  {
    title: "Community",
    body:
      "Building a connected community of students passionate about private equity and investing. CPEC brings together members across Cornell through a collaborative environment centered on mentorship, discussion, and shared interests. Our community creates opportunities to learn from peers, build lasting relationships, and engage with alumni and industry professionals.",
  },
  {
    title: "Education",
    body:
      "Our 10-week New Member Education Series teaches students private equity fundamentals, building the skills and knowledge to evaluate private equity investments. Sophomores go through the Professional Development Series during their recruitment process, allowing them to brush up on their technical skills with hands-on mentorship from upperclassmen. Through structured education, technical training, case studies, and investment discussions, CPEC equips members with a strong foundation in financial analysis, valuation, deal structuring, and private markets.",
  },
  {
    title: "Opportunities",
    body:
      "Connecting members with opportunities to explore careers and gain real-world experience in private equity. Through speaker sessions, alumni, industry events, recruiting resources, and experiential opportunities, CPEC helps members build meaningful connections and navigate pathways into private equity and related fields. This year we are excited to announce our first NYC trek, where we visit prestigious firms.",
  },
];

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
  const [showAbout, setShowAbout] = useState(false);
  const [showPillars, setShowPillars] = useState(false);

  useEffect(() => {
    const opts: IntersectionObserverInit = { rootMargin: "0px 0px -10% 0px", threshold: 0.15 };
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target === aboutRef.current) setShowAbout(true);
        if (entry.target === pillarsRef.current) setShowPillars(true);
        obs.unobserve(entry.target);
      });
    }, opts);
    if (aboutRef.current) obs.observe(aboutRef.current);
    if (pillarsRef.current) obs.observe(pillarsRef.current);
    return () => obs.disconnect();
  }, []);
  return (
    <>
      <NavBar />
      <VideoHero />

      {/* Who We Are — CIBC-style: photo left, text right, full-width button */}
      <section id="about" ref={aboutRef} className="mx-auto w-full max-w-[90rem] px-6 py-20 md:py-28 scroll-mt-12 md:scroll-mt-18">
        <div className={["grid grid-cols-1 md:grid-cols-[1.35fr_1fr] gap-10 md:gap-14 items-center transition-all duration-700 ease-out", showAbout ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"].join(" ") }>
          <div className="relative aspect-4/3 overflow-hidden">
            <Image
              src="/media/cpec_fullclub_f26.jpg"
              alt="CPEC members outside an iconic Cornell archway"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </div>

          <div className="text-neutral-900">
            <h2 className="text-4xl md:text-5xl font-normal">Who We Are</h2>

            <div className="mt-8 space-y-5 text-lg md:text-xl leading-relaxed text-neutral-800">
              <p>
                The Cornell Private Equity Club is a community of students passionate about
                investing, business, and the world of private markets. We bring together
                passionate minds from across Cornell who are eager to develop the knowledge,
                skills, and relationships needed to understand and pursue careers in finance.
              </p>
              <p>
                Through a 10-week New Member Education Process, investment discussions,
                industry research, speaker events, and hands-on opportunities, we aim to make
                private equity more accessible while challenging our members to think
                critically about businesses, markets, and investment decisions. Our members
                learn from one another, engage with industry professionals, and build a strong
                foundation in areas including financial analysis, valuation, due diligence,
                and investment strategy.
              </p>
              <p>
                At our core, we are a collaborative community driven by curiosity,
                intellectual rigor, and a shared interest in investing. Whether a student is
                exploring private equity for the first time or already has experience in the
                industry, the Cornell Private Equity Club provides a space to learn, connect,
                and grow.
              </p>
            </div>

            <Link
              href="/recruitment"
              className="mt-10 flex w-full items-center justify-center rounded-full bg-[#1F2F4F] py-4 text-lg md:text-xl font-medium text-white transition hover:opacity-90"
            >
              Learn more
            </Link>
          </div>
        </div>
      </section>

      {/* About Us — CHF-style: three columns under thin rules */}
      <section ref={pillarsRef} className="mx-auto w-full max-w-6xl px-6 pt-8 md:pt-12 pb-24 md:pb-32">
        <h2 className={["text-center text-4xl md:text-5xl font-normal text-neutral-900 transition-all duration-700", showPillars ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"].join(" ") }>
          About Us
        </h2>

        <div className={["mt-14 grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-12 transition-all duration-700", showPillars ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"].join(" ") }>
          {ABOUT_COLUMNS.map((col) => (
            <div key={col.title} className="border-t border-neutral-800 pt-8 text-center">
              <h3 className="text-2xl font-normal tracking-wide text-neutral-900">{col.title}</h3>
              <p className="mt-8 text-lg leading-relaxed text-neutral-800">{col.body}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />

      </>
  );
}
