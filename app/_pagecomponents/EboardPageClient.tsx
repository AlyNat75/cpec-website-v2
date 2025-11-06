"use client";

import { useEffect, useRef, useState } from "react";
import NavBar from "../_components/NavBar";
import Banner from "../_components/Banner";
import PersonCard from "../_components/PersonCard";
import Footer from "../_components/Footer";

type Card = {
  name: string;
  role: string;
  major: string;
  headshot: string;
  href: string;
  variant: "eboard";
};

export default function EboardPageClient({ cards }: { cards: Card[] }) {
  return (
    <main>
      <NavBar forceSolid />
      <Banner title="Executive Board" imageSrc="/media/cpec_eboardbanner4.jpeg" titleClassName="text-4xl md:text-6xl" />
      <AnimatedGrid cards={cards} />
      <Footer />
    </main>
  );
}

function AnimatedGrid({ cards }: { cards: Card[] }) {
  // Split into rows of 4 so each row animates when it enters the viewport
  const rows: Card[][] = [];
  for (let i = 0; i < cards.length; i += 4) rows.push(cards.slice(i, i + 4));

  const rowRefs = useRef<HTMLDivElement[]>([]);
  const [visibleRow, setVisibleRow] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.rowIndex);
          if (entry.isIntersecting) {
            setVisibleRow((v) => ({ ...v, [idx]: true }));
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
    <section className="mx-auto w-full max-w-7xl px-6 py-16 md:py-20 text-center">
      {rows.map((row, rowIdx) => (
        <div
          key={rowIdx}
          data-row-index={rowIdx}
          ref={(el) => {
            if (el) rowRefs.current[rowIdx] = el;
          }}
          className={[
            "flex flex-wrap justify-center gap-6 mb-6 transition-all duration-700",
            visibleRow[rowIdx] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          ].join(" ")}
        >
          {row.map((c, i) => (
            <div
              key={c.href}
              className={[
                "w-full max-w-xs sm:w-[260px] transition-all duration-700",
                visibleRow[rowIdx] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              ].join(" ")}
              style={{ transitionDelay: visibleRow[rowIdx] ? `${100 + i * 60}ms` : "0ms" }}
            >
              <PersonCard {...c} />
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}


