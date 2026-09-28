import Link from "next/link";
import Image from "next/image";

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
  return (
    <Link
      href={href}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-[#0f2242]/60"
    >
      <div className="relative overflow-hidden bg-neutral-100" style={{ aspectRatio: "4 / 5" }}>
        {/* Same crop anchor for every photo so faces line up across a row */}
        <Image src={headshot} alt={`Headshot of ${name}`} fill className="object-cover transition duration-300 group-hover:scale-[1.02]" style={{ objectPosition: headshotPosition ?? "center 20%" }} sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 320px" />
      </div>
      {/* Fixed height keeps every card in a row the same size */}
      <div className="flex min-h-[6.5rem] flex-col items-center justify-start px-2 pt-5 text-center">
        <div className="text-2xl md:text-[1.7rem] leading-tight text-[#0f2242] group-hover:underline underline-offset-4">{name}</div>
        <div className="mt-2 text-base md:text-lg text-black">{variant === "eboard" ? role : major}</div>
      </div>
    </Link>
  );
}


