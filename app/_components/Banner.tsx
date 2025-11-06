"use client";

import Image from "next/image";

type Props = {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  titleClassName?: string;
};

export default function Banner({ title, subtitle, imageSrc = "/media/hero-poster.jpg", titleClassName }: Props) {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: "46vh", minHeight: "320px", maxHeight: "520px" }}>
      <Image src={imageSrc} alt="Banner image" fill priority className="object-cover object-center brightness-[.7]" />
      <div className="absolute inset-0 bg-linear-to-t from-black/35 to-transparent" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <h1 className={`text-white font-heading uppercase font-semibold ${titleClassName ?? "text-5xl md:text-7xl"}`} style={{ letterSpacing: "0.6px" }}>{title}</h1>
        {subtitle ? <p className="mt-3 text-white/90 text-lg md:text-xl tracking-wide italic">{subtitle}</p> : null}
      </div>
    </section>
  );
}


