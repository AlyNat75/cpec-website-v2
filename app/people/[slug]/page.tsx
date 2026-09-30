import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllPeople, getPersonBySlug } from "../../_lib/people";
import NavBar from "../../_components/NavBar";

export const revalidate = 3600;

export function generateStaticParams() {
  return getAllPeople().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: getPersonBySlug(slug)?.name ?? "Members" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = getPersonBySlug(slug);
  if (!person) notFound();

  // Labeled rows under the headline; empty ones are skipped
  const year = /^\d{4}$/.test(String(person.gradYear)) ? ` '${String(person.gradYear).slice(-2)}` : "";
  const details = [
    ["Major", `${person.major}${year}`],
    ["Past Summer Experience", person.pastExperience],
    ["Campus Involvements", person.campusInvolvements?.join(", ")],
    ["Interests", person.interests],
  ].filter((row): row is [string, string] => Boolean(row[1]));
  const firstName = person.name.split(" ")[0];

  return (
    <main>
      <NavBar forceSolid />

      {/* Extra top spacing below navbar */}
      <div className="mx-auto w-full max-w-7xl px-6 pt-36 md:pt-40 pb-20">

        {/* 2-column half/half layout on desktop */}
        <article className="grid grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,460px)_1fr] lg:gap-14">

          {/* Left: headshot */}
          <div className="relative w-full h-[390px] md:h-[500px] lg:h-[560px] overflow-hidden">
            <Image
              src={person.headshot}
              alt={`Headshot of ${person.name}`}
              fill
              className="object-cover"
              style={{ objectPosition: person.headshotPosition ?? "center 20%" }}
              sizes="(max-width: 768px) 100vw, 460px"
            />
          </div>

          {/* Right: name, headline role, then labeled details */}
          <div className="text-neutral-900 md:pt-2">
            <h1 className="text-5xl lg:text-6xl font-normal text-[#161439]">{person.name}</h1>

            {person.workExperience && person.workExperience.length > 0 ? (
              <p className="mt-3 text-xl md:text-2xl font-semibold text-[#e2703a]">{person.workExperience[0]}</p>
            ) : null}

            <dl className="mt-8 space-y-3 text-lg md:text-xl leading-relaxed text-neutral-800">
              {details.map(([label, value]) => (
                <div key={label}>
                  <dt className="inline font-semibold text-neutral-900">{label}: </dt>
                  <dd className="inline">{value}</dd>
                </div>
              ))}
            </dl>

            {person.email ? (
              <p className="mt-8 text-lg md:text-xl text-neutral-800">
                {firstName} can be reached at{" "}
                <a className="text-[#161439] underline underline-offset-2" href={`mailto:${person.email}`}>
                  {person.email}
                </a>
              </p>
            ) : null}
          </div>
        </article>
      </div>
    </main>
  );
}
