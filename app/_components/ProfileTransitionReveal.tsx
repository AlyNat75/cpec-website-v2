"use client";

import Image from "next/image";
import { useLayoutEffect, useState } from "react";

export const MEMBER_TRANSITION_KEY = "cpec-member-transition";

type Phase = "idle" | "covered" | "revealing";

export default function ProfileTransitionReveal() {
  const [phase, setPhase] = useState<Phase>("idle");

  useLayoutEffect(() => {
    if (window.sessionStorage.getItem(MEMBER_TRANSITION_KEY) !== "true") return;

    // This must be restored before the destination route paints so the new
    // profile cannot briefly flash beneath the transition panel.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhase("covered");
    const revealTimer = window.setTimeout(() => setPhase("revealing"), 80);
    const finishTimer = window.setTimeout(() => {
      window.sessionStorage.removeItem(MEMBER_TRANSITION_KEY);
      setPhase("idle");
    }, 1050);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(finishTimer);
    };
  }, []);

  if (phase === "idle") return null;

  return (
    <div
      className={`cpec-member-transition is-${phase}`}
      aria-hidden="true"
      onAnimationEnd={() => {
        if (phase !== "revealing") return;
        window.sessionStorage.removeItem(MEMBER_TRANSITION_KEY);
        setPhase("idle");
      }}
    >
      <Image src="/assets/cpec-logo-white.svg" alt="" width={390} height={126} priority />
    </div>
  );
}
