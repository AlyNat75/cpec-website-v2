import type { Metadata } from "next";
import { getMembers, groupMembersByYear } from "../_lib/people";
import MembersPageClient from "../_pagecomponents/MembersPageClient";

export const revalidate = 3600;

export const metadata: Metadata = { title: "Analysts" };

export default function Page() {
  const groups = groupMembersByYear(getMembers());
  const clientGroups = groups.map((g) => ({
    label: g.label,
    people: g.people.map((p) => ({
      name: p.name,
      role: p.role,
      // Analysts cards show the class year after the major, e.g. "Dyson '29"
      major: /^\d{4}$/.test(String(p.gradYear)) ? `${p.major} '${String(p.gradYear).slice(-2)}` : p.major,
      headshot: p.headshot,
      headshotPosition: p.headshotPosition,
      href: `/people/${p.slug}`,
      variant: "member" as const,
    })),
  }));
  return <MembersPageClient groups={clientGroups} />;
}


