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

// Swap this for a new photo by dropping it in public/media
const TIMELINE_BG = "/media/cpec_placementbanner.jpg";

export default function RecruitmentPageClient() {
  // reveal-on-scroll
  const topRef = useRef<HTMLDivElement | null>(null);
  const explainerRef = useRef<HTMLDivElement | null>(null);
  const [showTop, setShowTop] = useState(false);
  const [showExplainer, setShowExplainer] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          if (e.target === topRef.current) setShowTop(true);
          if (e.target === explainerRef.current) setShowExplainer(true);
          obs.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );
    if (topRef.current) obs.observe(topRef.current);
    if (explainerRef.current) obs.observe(explainerRef.current);
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

      {/* Recruitment explainer */}
      <section className="mx-auto w-full max-w-7xl px-6 py-16 md:py-24" ref={explainerRef}>
        <div className={["grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-start transition-all duration-700 ease-out", showExplainer ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"].join(" ") }>
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-sm aspect-4/3">
              <Image
                src="/media/recruitment3.png"
                alt="CPEC members at a recruitment event"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-normal text-[#0F1A2E]">
              A Dive into Our Process
            </h2>

            <div className="mt-6 space-y-6 text-neutral-800">
              <div>
                <h3 className="font-semibold text-[#0F1A2E]">Recruitment Events</h3>
                <p className="mt-1 leading-relaxed text-neutral-700">
                  Meet our members and learn about our process at info sessions and
                  open events throughout the semester.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-neutral-900">Coffee Chats</h4>
                <p className="mt-1 leading-relaxed text-neutral-700">
                  Get a personal look at CPEC! Sign up for a one-on-one conversation
                  with a member to ask questions. 
                </p>
              </div>

              {/* Resources */}
              <div className="pt-2">
                <h4 className="font-medium text-neutral-900">Resources</h4>
                <div className="mt-3 flex flex-wrap gap-3">
                  <a
                    href="https://mergersandinquisitions.com/private-equity/"
                    className="rounded-full border border-neutral-300 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                  >
                    Explaining PE – M&I
                  </a>
                  <a
                    href="https://www.wsj.com/"
                    className="rounded-full border border-neutral-300 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                  >
                    Current Events
                  </a>
                  <a
                    href="https://corporatefinanceinstitute.com/resources/career/finance-interview-questions/"
                    className="rounded-full border border-neutral-300 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                  >
                    Common Finance Interview Qs
                  </a>
                  <a
                    href="https://www.morningbrew.com/"
                    className="rounded-full border border-neutral-300 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                  >
                    Morning Brew
                  </a>
                  <a
                    href="https://macro.com/app/pdf/d70e049c-1e8f-45d4-bb81-f70edc05737f"
                    className="rounded-full border border-neutral-300 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                  >
                    Finance Questions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
