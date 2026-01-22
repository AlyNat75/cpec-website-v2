"use client";

import NavBar from "../_components/NavBar";
import Footer from "../_components/Footer";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* ---------- Timeline data (chronological) ---------- */
const EVENTS: { date: string; title: string; location?: string }[] = [
  { date: "Mon 01/26", title: "Information Session 1", location: "TBD" },
  { date: "Tue 01/27", title: "Women on Wall Street Panel", location: "Kennedy 116" },
  { date: "Wed 01/28", title: "Breaking into Private Equity", location: "TBD" },
  { date: "Thu 01/29", title: "Information Session 2", location: "TBD" },
  { date: "Fri 01/30", title: "Resume Review & Open Coffee Chats", location: "TBD" },
  { date: "Sat 01/31", title: "Applications due at 11:59 pm", location: "Online" },
  { date: "Tue 02/03", title: "Round 1 Interviews [Invite Only]", location: "TBD" },
  { date: "Thu 02/05", title: "Round 2 Interviews [Invite Only]", location: "TBD" },
];

export default function RecruitmentPageClient() {
  // reveal-on-scroll
  const topRef = useRef<HTMLDivElement | null>(null);
  const explainerRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [showTop, setShowTop] = useState(false);
  const [showExplainer, setShowExplainer] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          if (e.target === topRef.current) setShowTop(true);
          if (e.target === explainerRef.current) setShowExplainer(true);
          if (e.target === timelineRef.current) setShowTimeline(true);
          obs.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );
    if (topRef.current) obs.observe(topRef.current);
    if (explainerRef.current) obs.observe(explainerRef.current);
    if (timelineRef.current) obs.observe(timelineRef.current);
    return () => obs.disconnect();
  }, []);
  return (
    <main className="min-h-screen bg-white">
      <NavBar forceSolid />

      {/* Top notice / coming soon */}
      <section className="mx-auto w-full max-w-7xl px-6 pt-24 md:pt-32" ref={topRef}>
        <div className={["rounded-3xl border border-neutral-200/80 bg-white px-8 py-10 md:px-14 md:py-14 text-center shadow-sm transition-all duration-700 ease-out", showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"].join(" ") }>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#0F1A2E]">
            Spring 2026 Recruitment Info Coming Soon!
          </h1>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6 md:gap-8">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-full bg-[#1d4480] px-7 py-3.5 text-white text-sm md:text-base font-medium shadow-sm hover:opacity-90 transition"
            >
              Application Form
            </a>
            <a
              href="https://docs.google.com/forms/d/1KON4bTsL5TKlfGOULErgSR6O7CXOr85KgRwGELmq7-w/viewform?edit_requested=true"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#1d4480] px-7 py-3.5 text-white text-sm md:text-base font-medium shadow-sm hover:opacity-90 transition"
            >
              Coffee Chat Request
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-full bg-[#1d4480] px-7 py-3.5 text-white text-sm md:text-base font-medium shadow-sm hover:opacity-90 transition"
            >
              Join Email List
            </a>
          </div>
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
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0F1A2E]">
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

      {/* Timeline (alternating, staggered) */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-20 md:pb-28" ref={timelineRef}>
        <h2 className={["text-center text-3xl md:text-4xl font-extrabold tracking-tight text-[#0F1A2E] transition-all duration-700", showTimeline ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"].join(" ") }>
          Spring 2026 Recruitment Timeline
        </h2>

        {/* Rail + alternating grid */}
        <div className={["relative mt-12 transition-all duration-700 ease-out", showTimeline ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"].join(" ") }>
          {/* center rail on lg */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-neutral-200 -translate-x-1/2" />

          <ul className="relative mt-12 space-y-8">
            {EVENTS.map((e, idx) => (
              <div key={idx} style={{ transitionDelay: showTimeline ? `${100 + idx * 80}ms` : "0ms" }} className={["transition-all duration-700", showTimeline ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"].join(" ") }>
                <TimelineItem
                  date={e.date}
                  title={e.title}
                  location={e.location}
                  side={idx % 2 === 0 ? "left" : "right"}
                />
              </div>
            ))}
          </ul>

        </div>

        <p className="mt-8 text-center text-sm text-neutral-500">
          *Subject to change. Room details will be posted on our socials.
        </p>
      </section>

      <Footer />
    </main>
  );
}

/* ---------- helpers ---------- */
type ItemProps = {
  date: string;
  title: string;
  location?: string;
  side?: "left" | "right";
};

function TimelineItem({ date, title, location, side = "left" }: ItemProps) {

  const desktopSide =
    side === "left"
      ? "lg:col-start-1 lg:pr-12 lg:text-right lg:items-end"
      : "lg:col-start-2 lg:pl-12 lg:text-left lg:items-start";

  return (
    <li className="relative grid grid-cols-1 lg:grid-cols-2">
      {/* center rail dot (relative to this row) */}
      <span className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-[#1d4480]" />

      {/* content block in left or right column */}
      <div className={`flex flex-col ${desktopSide}`}>
        <div className="text-sm font-semibold text-[#1d4480]">{date}</div>
        <div className="mt-1 text-lg font-semibold text-neutral-900">{title}</div>
        {location && <div className="text-sm text-neutral-600">{location}</div>}
      </div>
    </li>
  );
}
