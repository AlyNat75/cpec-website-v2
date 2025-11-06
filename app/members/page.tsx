import { getMembers, groupMembersByYear } from "../_lib/people";
import MembersPageClient from "../_pagecomponents/MembersPageClient";

export const revalidate = 3600;

export default function Page() {
  const groups = groupMembersByYear(getMembers());
  const clientGroups = groups.map((g) => ({
    label: g.label,
    people: g.people.map((p) => ({
      name: p.name,
      role: p.role,
      major: p.major,
      headshot: p.headshot,
      href: `/people/${p.slug}`,
      variant: "member" as const,
    })),
  }));
  return <MembersPageClient groups={clientGroups} />;
}


