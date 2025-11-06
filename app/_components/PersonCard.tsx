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
        <Image src={headshot} alt={`Headshot of ${name}`} fill className="object-cover" sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 320px" />
      </div>
      <div className="px-4 py-4 text-center">
        {variant === "eboard" ? (
          <>
            <div className="font-medium">{name}</div>
            <div className="text-sm text-gray-600 mt-1">{role}</div>
          </>
        ) : (
          <>
            <div className="font-medium">{name}</div>
            <div className="text-sm text-gray-600 mt-1">{major}</div>
          </>
        )}
      </div>
    </Link>
  );
}


