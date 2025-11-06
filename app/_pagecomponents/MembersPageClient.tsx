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
  variant: "member" | "eboard";
};

type Group = {
  label: string;
  people: Card[];
};

export default function MembersPageClient({ groups }: { groups: Group[] }) {
  return (
    <main>
      <NavBar forceSolid />
      <Banner title="Analysts" imageSrc="/media/cpec_membersbanner.png" titleClassName="text-4xl md:text-6xl" />
      <AnimatedGroups groups={groups} />
      <Footer />
    </main>
  );
}

function AnimatedGroups({ groups }: { groups: Group[] }) {
  const groupRefs = useRef<HTMLDivElement[]>([]);
  const [visible, setVisible] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.groupIndex);
          if (entry.isIntersecting) {
            setVisible((v) => ({ ...v, [idx]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );
    groupRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16 md:py-20 space-y-16 text-center">
      {groups.map((g, idx) => (
        <div
          key={`${g.label}-${idx}`}
          data-group-index={idx}
          ref={(el) => {
            if (el) groupRefs.current[idx] = el;
          }}
          className={[
            "transition-all duration-700 ease-out",
            visible[idx] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          ].join(" ")}
        >
          <h2 className="mb-8 text-2xl md:text-3xl font-semibold">{g.label}</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {g.people.map((p, i) => (
              <div
                key={p.href}
                className={[
                  "w-full max-w-xs sm:w-[260px] transition-all duration-700",
                  visible[idx] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                ].join(" ")}
                style={{ transitionDelay: `${100 + i * 60}ms` }}
              >
                <PersonCard {...p} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}


