import Link from "next/link";
import Image from "next/image";

type Variant = "eboard" | "member";

export type PersonCardProps = {
  name: string;
  role: string;
  major: string;
  headshot: string;
  href: string;
  variant: Variant;
};

export default function PersonCard({ name, role, major, headshot, href, variant }: PersonCardProps) {
  return (
    <Link
      href={href}
      className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/60 rounded-xl block bg-white shadow-sm ring-1 ring-black/5 hover:shadow-md hover:-translate-y-px transition overflow-hidden"
    >
      <div className="relative bg-neutral-100" style={{ aspectRatio: "4 / 5" }}>
        {/* Same crop anchor for every photo so faces line up across a row */}
        <Image src={headshot} alt={`Headshot of ${name}`} fill className="object-cover object-[center_20%]" sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 320px" />
      </div>
      {/* Fixed height keeps every card in a row the same size */}
      <div className="flex min-h-[6.5rem] flex-col items-center justify-center px-4 py-4 text-center">
        <div className="text-lg uppercase tracking-wider text-[#1F2F4F]">{name}</div>
        <div className="mt-1 text-base text-black">{variant === "eboard" ? role : major}</div>
      </div>
    </Link>
  );
}


