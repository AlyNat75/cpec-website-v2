import { getExecutiveBoard } from "../_lib/people";
import EboardPageClient from "../_pagecomponents/EboardPageClient";

export const revalidate = 3600;

export default function Page() {
  const cards = getExecutiveBoard().map((p) => ({
    name: p.name,
    role: p.role,
    major: p.major,
    headshot: p.headshot,
    href: `/people/${p.slug}`,
    variant: "eboard" as const,
  }));
  return <EboardPageClient cards={cards} />;
}


