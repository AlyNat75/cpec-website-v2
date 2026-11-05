"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function SiteLoader() {
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const exitTimer = window.setTimeout(() => setExiting(true), 1050);
    const hideTimer = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = previousOverflow;
    }, 1500);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`cpec-site-loader ${exiting ? "is-exiting" : ""}`}
      role="status"
      aria-label="Loading Cornell Private Equity Club"
    >
      <div className="cpec-site-loader__inner">
        <Image
          src="/assets/cpec-logo-white.svg"
          alt="Cornell Private Equity Club"
          width={390}
          height={126}
          priority
        />
        <div className="cpec-site-loader__track" aria-hidden="true">
          <span />
        </div>
      </div>
    </div>
  );
}
