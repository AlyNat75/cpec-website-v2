"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const LINKS = [
  { href: "/placement", label: "PLACEMENT" },
  { href: "/recruitment", label: "RECRUITMENT" },
];

export default function NavBar({ forceSolid = false }: { forceSolid?: boolean }) {
  const [scrolled, setScrolled] = useState(forceSolid);
  const [openMembers, setOpenMembers] = useState(false);
  const membersRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (forceSolid) return; // keep navbar solid on content pages
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [forceSolid]);

  // Close dropdown on outside click / Escape
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!membersRef.current) return;
      if (!membersRef.current.contains(e.target as Node)) setOpenMembers(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMembers(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur shadow-sm" : "bg-transparent",
      ].join(" ")}
      style={{ height: "var(--nav-height)" }}
    >
      <nav className="relative flex h-full max-w-7xl mx-auto items-center px-6">

        {/* Left → Larger Logo */}
        <Link href="/" aria-label="CPEC Home" className="flex items-center z-10">
          <Image
            src={scrolled ? "/assets/cpec-logo-dark.svg" : "/assets/cpec-logo-white.svg"}
            alt="CPEC Logo"
            width={170}
            height={170}
            priority
            className="transition-all duration-300"
          />
        </Link>

        {/* Right → Nav Items */}
        <div className="ml-auto flex items-center gap-10 md:gap-12">
          {/* About (first) */}
          <Link
            href="/#about"
            className={[
              "font-heading font-semibold uppercase tracking-wider text-sm md:text-base transition-all duration-300",
              scrolled ? "hover:opacity-80" : "hover:opacity-90",
            ].join(" ")}
            style={{ color: scrolled ? "var(--brand-dark)" : "white", letterSpacing: "0.06em" }}
            onClick={(e) => {
              if (typeof window !== "undefined" && window.location.pathname === "/") {
                e.preventDefault();
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
          >
            ABOUT
          </Link>
          {/* Members dropdown */}
          <div ref={membersRef} className="relative">
            <button
              type="button"
              onClick={() => setOpenMembers((v) => !v)}
              className={[
                "font-heading font-semibold uppercase tracking-wider text-sm md:text-base transition-all duration-300 flex items-center gap-1",
                scrolled ? "hover:opacity-80" : "hover:opacity-90",
              ].join(" ")}
              style={{ color: scrolled ? "var(--brand-dark)" : "white", letterSpacing: "0.06em" }}
              aria-expanded={openMembers}
              aria-haspopup="menu"
            >
              MEMBERS
              <svg aria-hidden width="12" height="12" viewBox="0 0 20 20" fill="currentColor" className="mt-0.5">
                <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z"/>
              </svg>
            </button>
            {openMembers ? (
              <div
                role="menu"
                className={[
                  "absolute right-0 mt-2 min-w-[220px] overflow-hidden rounded-lg shadow-lg ring-1 ring-black/10 backdrop-blur",
                  scrolled ? "bg-white" : "bg-black/70",
                ].join(" ")}
              >
                <div className="py-2">
                  <Link
                    href="/eboard"
                    role="menuitem"
                    onClick={() => setOpenMembers(false)}
                    className="block px-4 py-2 text-sm hover:bg-black/5"
                    style={{ color: scrolled ? "var(--brand-dark)" : "white" }}
                  >
                    Executive Board
                  </Link>
                  <Link
                    href="/members"
                    role="menuitem"
                    onClick={() => setOpenMembers(false)}
                    className="block px-4 py-2 text-sm hover:bg-black/5"
                    style={{ color: scrolled ? "var(--brand-dark)" : "white" }}
                  >
                    Analysts
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={[
                "font-heading font-semibold uppercase tracking-wider text-sm md:text-base transition-all duration-300",
                scrolled ? "hover:opacity-80" : "hover:opacity-90",
              ].join(" ")}
              style={{
                color: scrolled ? "var(--brand-dark)" : "white",
                letterSpacing: "0.06em",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

      </nav>
    </header>
  );
}
