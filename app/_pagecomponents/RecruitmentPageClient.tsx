"use client";

import NavBar from "../_components/NavBar";
import Footer from "../_components/Footer";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* ---------- Timeline data (chronological) ---------- */
const EVENTS: { title: string; date: string; time: string; location: string }[] = [
  { title: "Breaking into Professional Clubs", date: "Thursday, September 3",  time: "6PM", location: "Ives 305" },
  { title: "Info Session #1",                  date: "Monday, September 7",    time: "7PM", location: "STL 351" },
  { title: "Breaking into PE",                 date: "Tuesday, September 8",   time: "7PM", location: "STL 351" },
  { title: "Resume Review",                    date: "Thursday, September 10", time: "5PM", location: "STL 391" },
  { title: "Info Session #2",                  date: "Tuesday, September 15",  time: "6PM", location: "STL 391" },
  { title: "Interview Round 1",                date: "Thursday, September 17", time: "6PM", location: "Invite Only / STL TBD" },
  { title: "Interview Round 2",                date: "Friday, September 18",   time: "6PM", location: "Invite Only / TBD" },
];

/* ---------- Preparation resources (accordion) ---------- */
const RESOURCES: { title: string; items: { label: string; href?: string }[] }[] = [
  {
    title: "Resume",
    items: [
      { label: "SC Johnson Resume Template", href: "https://cornellinvestmentbankingclub.squarespace.com/s/Resume-Template-SCJohnson-CIBC.docx" },
      { label: "Bring your resume to our Resume Review on Thursday, September 10" },
      { label: "Cornell Career Services", href: "https://career.cornell.edu/" },
    ],
  },
  {
    title: "Behaviorals & Technicals",
    items: [
      { label: "400 Questions Guide", href: "https://cornellinvestmentbankingclub.squarespace.com/s/400-Questions-IB-Interview-Guide-2025.pdf" },
      { label: "Vault Guide to Investment Banking", href: "https://cornell.vault.com/" },
      {
        label: "The Red Book by Wall Street Prep",
        href: "https://static1.squarespace.com/static/66629fa52286570a6c2b8950/t/66dab39c0e6a6247108fe2bb/1725608868157/Wall+Street+Prep+_+The+RedBook.pdf",
      },
    ],
  },
  {
    title: "Markets",
    items: [
      { label: "Wall Street Journal", href: "https://johnson.library.cornell.edu/database/wall-street-journal/" },
      { label: "Financial Times", href: "https://johnson.library.cornell.edu/database/financial-times/" },
      { label: "ExecSum Newsletter", href: "https://www.execsum.co/" },
      { label: "Morning Brew Newsletter", href: "https://www.morningbrew.com/subscribe" },
      { label: "PitchBook", href: "https://johnson.library.cornell.edu/database/pitchbook/" },
    ],
  },
];

// Swap this for a new photo by dropping it in public/media
const TIMELINE_BG = "/media/cpec_placementbanner.jpg";

export default function RecruitmentPageClient() {
  // reveal-on-scroll
  const topRef = useRef<HTMLDivElement | null>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          if (e.target === topRef.current) setShowTop(true);
          obs.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );
    if (topRef.current) obs.observe(topRef.current);
    return () => obs.disconnect();
  }, []);
  return (
    <main className="min-h-screen bg-white">
      <NavBar forceSolid />

      {/* Recruitment Timeline — CIBC-style: photo background, events in a grid */}
      <section className="relative w-full overflow-hidden" ref={topRef}>
        <Image src={TIMELINE_BG} alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[#1b2740]/75" />

        <div
          className={[
            "relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 text-center text-white transition-all duration-700 ease-out md:pb-28",
            showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          ].join(" ")}
          style={{ paddingTop: "calc(var(--nav-height) + 4rem)" }}
        >
          <h1 className="text-5xl md:text-7xl font-normal">Recruitment Timeline</h1>
          <p className="mt-4 text-xl md:text-2xl text-white/85">Fall 2026</p>

          <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {EVENTS.map((e, idx) => (
              <div
                key={e.title}
                className={["transition-all duration-700", showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"].join(" ")}
                style={{ transitionDelay: showTop ? `${150 + idx * 80}ms` : "0ms" }}
              >
                <h3 className="font-body text-2xl md:text-3xl font-semibold">{e.title}</h3>
                <p className="mt-4 text-lg md:text-xl text-white/90">{e.date}</p>
                <p className="mt-1 text-lg md:text-xl text-white/90">{e.time} / {e.location}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <a
              href="https://docs.google.com/forms/d/1KON4bTsL5TKlfGOULErgSR6O7CXOr85KgRwGELmq7-w/viewform?edit_requested=true"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white px-8 py-3.5 text-lg font-medium text-white transition hover:bg-white/15"
            >
              Coffee Chat Request
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-full border border-white px-8 py-3.5 text-lg font-medium text-white transition hover:bg-white/15"
            >
              Join Email List
            </a>
          </div>

          <p className="mt-8 text-sm text-white/70">
            *Subject to change. Room details will be posted on our socials.
          </p>
        </div>
      </section>

      {/* Preparation Resources — CIBC-style: heading left, expandable list right */}
      <section className="bg-black text-white">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-2 md:gap-16 md:py-28">
          <h2 className="text-4xl md:text-6xl font-normal">Preparation Resources</h2>

          <div className="border-t border-white/70">
            {RESOURCES.map((group) => (
              <details key={group.title} className="group border-b border-white/70">
                <summary className="flex cursor-pointer list-none items-center justify-between py-8 text-2xl md:text-3xl [&::-webkit-details-marker]:hidden">
                  {group.title}
                  <span aria-hidden className="text-3xl font-light transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <ul className="space-y-4 pb-8 text-lg md:text-xl">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline decoration-white/40 underline-offset-4 transition hover:decoration-white"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <span className="text-white/85">{item.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
