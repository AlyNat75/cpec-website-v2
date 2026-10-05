"use client";

import Image from "next/image";

type Props = {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  titleClassName?: string;
  /** CSS object-position, e.g. "center 35%" to keep faces in frame */
  imagePosition?: string;
  /** "top" lifts the title clear of people standing in the lower half of the photo */
  titlePlacement?: "center" | "top";
  /** Taller banner shows more of a tall group photo (less zoomed in) */
  tall?: boolean;
};

export default function Banner({ title, subtitle, imageSrc = "/media/hero-poster.jpg", titleClassName, imagePosition = "center", titlePlacement = "center", tall = false }: Props) {
  return (
    <section className="relative w-full overflow-hidden" style={tall ? { height: "72vh", minHeight: "420px", maxHeight: "760px" } : { height: "46vh", minHeight: "320px", maxHeight: "520px" }}>
      <Image src={imageSrc} alt="Banner image" fill priority className="object-cover brightness-[.7]" style={{ objectPosition: imagePosition }} />
      <div className="absolute inset-0 bg-linear-to-t from-black/35 to-transparent" />
      <div className={`relative z-10 flex h-full flex-col items-center px-4 text-center ${titlePlacement === "top" ? "justify-start pt-[calc(var(--nav-height)+1.25rem)]" : "justify-center"}`}>
        <h1 className={`text-white font-heading font-semibold ${/normal-case/.test(titleClassName ?? "") ? "" : "uppercase"} ${titleClassName ?? "text-5xl md:text-7xl"}`} style={{ letterSpacing: "0.6px" }}>{title}</h1>
        {subtitle ? <p className="mt-3 text-white/90 text-lg md:text-xl tracking-wide italic">{subtitle}</p> : null}
      </div>
    </section>
  );
}


