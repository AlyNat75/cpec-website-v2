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
      // idempotent reveal
      const reveal = (idx: number) =>
        setVisible((v) => (v[idx] ? v : { ...v, [idx]: true }));
  
      // IntersectionObserver (mobile-friendly)
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const idx = Number((entry.target as HTMLElement).dataset.groupIndex);
            if (entry.isIntersecting) {
              reveal(idx);
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0, rootMargin: "0px 0px -20% 0px" }
      );
  
      // observe all current refs
      groupRefs.current.forEach((el) => el && io.observe(el));
  
      // Fallback for iOS momentum scroll
      const onScrollFallback = () => {
        const vh = window.innerHeight || 0;
        groupRefs.current.forEach((el, idx) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          if (rect.top < vh * 0.9) reveal(idx);
        });
      };
  
      // Re-observe on resize/orientation
      const onResize = () => {
        groupRefs.current.forEach((el) => el && io.observe(el));
        onScrollFallback();
      };
  
      window.addEventListener("scroll", onScrollFallback, { passive: true });
      window.addEventListener("resize", onResize, { passive: true });
      window.addEventListener("orientationchange", onResize);
  
      // kick once
      onScrollFallback();
  
      return () => {
        io.disconnect();
        window.removeEventListener("scroll", onScrollFallback);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("orientationchange", onResize);
      };
      // IMPORTANT: keep deps array static so its size/order never changes
    }, []); // ← fixed
  
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
              "transition-all duration-700 ease-out will-change-transform",
              visible[idx] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
          >
            <h2 className="mb-8 text-2xl md:text-3xl font-semibold">{g.label}</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {g.people.map((p, i) => (
                <div
                  key={p.href}
                  className={[
                    "w-full max-w-xs sm:w-[260px] transition-all duration-700 will-change-transform",
                    visible[idx] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                  ].join(" ")}
                  style={{ transitionDelay: visible[idx] ? `${100 + i * 60}ms` : "0ms" }}
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
  
  


