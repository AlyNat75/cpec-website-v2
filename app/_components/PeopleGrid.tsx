import PersonCard, { PersonCardProps } from "./PersonCard";

type Props = {
  people: Array<Omit<PersonCardProps, "href" | "variant"> & { href: string; variant: PersonCardProps["variant"] }>;
};

export default function PeopleGrid({ people }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {people.map((p) => (
        <div key={p.href} className="w-full max-w-xs sm:w-[260px]">
          <PersonCard {...p} />
        </div>
      ))}
    </div>
  );
}


