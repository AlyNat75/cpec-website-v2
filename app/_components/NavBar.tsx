"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const LINKS = [
  { href: "/placement", label: "Placement" },
  { href: "/recruitment", label: "Recruitment" },
];

export default function NavBar({ forceSolid = false }: { forceSolid?: boolean }) {
  const [scrolled, setScrolled] = useState(forceSolid);
  const [openMembers, setOpenMembers] = useState(false);       // desktop dropdown
  const [openMobile, setOpenMobile] = useState(false);         // mobile sheet
  const [openMobileMembers, setOpenMobileMembers] = useState(false); // mobile submenu
  const membersRef = useRef<HTMLDivElement | null>(null);

  // Solid header after slight scroll unless forced
  useEffect(() => {
    if (forceSolid) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [forceSolid]);

  // Close desktop dropdown on outside click / ESC
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

  // Scroll lock while mobile sheet is open
  useEffect(() => {
    const el = document.documentElement;
    if (openMobile) {
      const prev = el.style.overflow;
      el.style.overflow = "hidden";
      return () => {
        el.style.overflow = prev;
      };
    }
  }, [openMobile]);

  // Helper to close sheet + submenu after clicking
  const closeMobileAll = () => {
    setOpenMobile(false);
    setOpenMobileMembers(false);
  };

  return (
    <>
      {/* HEADER */}
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "bg-white/95 backdrop-blur shadow-sm" : "bg-transparent",
        ].join(" ")}
        style={{ height: "var(--nav-height)" }}
      >
        <nav className="relative mx-auto flex h-full max-w-7xl items-center px-6">
          {/* Logo */}
          <Link href="/" aria-label="CPEC Home" className="z-10 flex items-center">
            <Image
              src={scrolled ? "/assets/cpec-logo-dark3.png" : "/assets/cpec-logo-white.svg"}
              alt="CPEC Logo"
              width={170}
              height={170}
              priority
              className="transition-all duration-300"
            />
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="ml-auto inline-flex items-center justify-center rounded-md p-2 md:hidden"
            aria-label="Open menu"
            onClick={() => setOpenMobile(true)}
            style={{ color: scrolled ? "var(--brand-dark)" : "#fff" }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Desktop nav */}
          <div className="ml-auto hidden items-center gap-10 md:flex md:gap-12">
            <Link
              href="/#about"
              className={[
                "font-heading font-semibold uppercase tracking-wider text-sm md:text-base transition-all duration-300",
                scrolled ? "hover:opacity-80" : "hover:opacity-90",
              ].join(" ")}
              style={{ color: scrolled ? "var(--brand-dark)" : "#fff", letterSpacing: "0.06em" }}
              onClick={(e) => {
                if (typeof window !== "undefined" && window.location.pathname === "/") {
                  e.preventDefault();
                  document.getElementById("about")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
            >
              ABOUT
            </Link>

            {/* Desktop Members dropdown */}
            <div ref={membersRef} className="relative">
              <button
                type="button"
                onClick={() => setOpenMembers((v) => !v)}
                className={[
                  "flex items-center gap-1 font-heading font-semibold uppercase tracking-wider text-sm md:text-base transition-all duration-300",
                  scrolled ? "hover:opacity-80" : "hover:opacity-90",
                ].join(" ")}
                style={{ color: scrolled ? "var(--brand-dark)" : "#fff", letterSpacing: "0.06em" }}
                aria-expanded={openMembers}
                aria-haspopup="menu"
              >
                MEMBERS
                <svg aria-hidden width="12" height="12" viewBox="0 0 20 20" fill="currentColor" className="mt-0.5">
                  <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z" />
                </svg>
              </button>
              {openMembers ? (
                <div
                  role="menu"
                  className={[
                    "absolute right-0 mt-2 min-w-[220px] overflow-hidden rounded-lg shadow-lg ring-1 ring-black/10",
                    scrolled ? "bg-white" : "bg-black/70 backdrop-blur",
                  ].join(" ")}
                >
                  <div className="py-2">
                    <Link
                      href="/eboard"
                      role="menuitem"
                      onClick={() => setOpenMembers(false)}
                      className="block px-4 py-2 text-sm hover:bg-black/5"
                      style={{ color: scrolled ? "var(--brand-dark)" : "#fff" }}
                    >
                      Executive Board
                    </Link>
                    <Link
                      href="/members"
                      role="menuitem"
                      onClick={() => setOpenMembers(false)}
                      className="block px-4 py-2 text-sm hover:bg-black/5"
                      style={{ color: scrolled ? "var(--brand-dark)" : "#fff" }}
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
                style={{ color: scrolled ? "var(--brand-dark)" : "#fff", letterSpacing: "0.06em" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {/* MOBILE SHEET (sibling to header; solid white) */}
      {openMobile ? (
        <div className="fixed inset-0 z-1000 bg-white">
          {/* Top bar */}
          <div className="flex items-center justify-between px-6" style={{ height: "var(--nav-height)" }}>
            <Link href="/" aria-label="CPEC Home" onClick={closeMobileAll} className="flex items-center">
              <Image src="/assets/cpec-logo-dark3.png" alt="CPEC Logo" width={170} height={170} priority />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              className="rounded-md p-2 text-[#0F1A2E]"
              onClick={closeMobileAll}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Nav list */}
          <div className="px-6 pb-12">
            <nav className="flex flex-col items-start text-[#0F1A2E]">
              {/* About */}
              <Link
                href="/#about"
                onClick={closeMobileAll}
                className="w-full border-b border-neutral-200 py-4 text-2xl font-semibold"
              >
                About
              </Link>

              {/* Members (expandable) */}
              <button
                type="button"
                onClick={() => setOpenMobileMembers((v) => !v)}
                className="flex w-full items-center justify-between border-b border-neutral-200 py-4 text-2xl font-semibold"
                aria-expanded={openMobileMembers}
                aria-controls="mobile-members-submenu"
              >
                <span>Members</span>
                <svg
                  className={`h-5 w-5 transition-transform ${openMobileMembers ? "rotate-180" : "rotate-0"}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z" />
                </svg>
              </button>

              {/* Submenu (animated height) */}
              <div
                id="mobile-members-submenu"
                className={`w-full overflow-hidden transition-all duration-300 ${
                  openMobileMembers ? "max-h-40" : "max-h-0"
                }`}
              >
                <div className="pl-2">
                  <Link
                    href="/eboard"
                    onClick={closeMobileAll}
                    className="block w-full border-b border-neutral-200 py-3 text-lg"
                  >
                    Executive Board
                  </Link>
                  <Link
                    href="/members"
                    onClick={closeMobileAll}
                    className="block w-full border-b border-neutral-200 py-3 text-lg"
                  >
                    Analysts
                  </Link>
                </div>
              </div>

              {/* Rest of the links */}
              <Link
                href="/placement"
                onClick={closeMobileAll}
                className="w-full border-b border-neutral-200 py-4 text-2xl font-semibold"
              >
                Placement
              </Link>
              <Link
                href="/recruitment"
                onClick={closeMobileAll}
                className="w-full border-b border-neutral-200 py-4 text-2xl font-semibold"
              >
                Recruitment
              </Link>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
