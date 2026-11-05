"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { useEffect, useState, type MouseEvent } from "react";
import { MEMBER_TRANSITION_KEY } from "./ProfileTransitionReveal";

type Variant = "eboard" | "member";

export type PersonCardProps = {
  name: string;
  role: string;
  major: string;
  headshot: string;
  headshotPosition?: string;
  href: string;
  variant: Variant;
};

export default function PersonCard({ name, role, major, headshot, headshotPosition, href, variant }: PersonCardProps) {
  const router = useRouter();
  const [isLeaving, setIsLeaving] = useState(false);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setPortalRoot(document.body));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function openProfile(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    event.preventDefault();
    if (isLeaving) return;

    setIsLeaving(true);
    window.sessionStorage.setItem(MEMBER_TRANSITION_KEY, "true");
    window.setTimeout(() => router.push(href), 520);
  }

  return (
    <>
      <Link
        href={href}
        onClick={openProfile}
        aria-busy={isLeaving}
        className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-[#161439]/60"
      >
        <div className="relative overflow-hidden bg-neutral-100" style={{ aspectRatio: "4 / 5" }}>
          {/* Same crop anchor for every photo so faces line up across a row */}
          <Image src={headshot} alt={`Headshot of ${name}`} fill className="object-cover transition duration-300 group-hover:scale-[1.02]" style={{ objectPosition: headshotPosition ?? "center 20%" }} sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 320px" />
        </div>
        {/* Fixed height keeps every card in a row the same size */}
        <div className="flex min-h-[6.5rem] flex-col items-center justify-start px-2 pt-5 text-center">
          <div className="text-2xl md:text-[1.7rem] leading-tight text-[#161439] group-hover:underline underline-offset-4">{name}</div>
          <div
            className={`mt-2 text-base md:text-lg ${
              variant === "eboard" ? "font-normal text-[#D61F26]" : "text-black"
            }`}
          >
            {variant === "eboard" ? role : major}
          </div>
        </div>
      </Link>

      {isLeaving && portalRoot
        ? createPortal(
            <div className="cpec-member-transition is-entering" aria-hidden="true">
              <Image src="/assets/cpec-logo-white.svg" alt="" width={390} height={126} priority />
            </div>,
            portalRoot
          )
        : null}
    </>
  );
}
