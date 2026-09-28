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

  // The bio is the markdown body under the front matter; blank lines split paragraphs
  const bio = (person.content ?? "").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const firstName = person.name.split(" ")[0];

  return (
    <main>
      <NavBar forceSolid />

      {/* Extra top spacing below navbar */}
      <div className="mx-auto w-full max-w-7xl px-6 pt-36 md:pt-40 pb-20">

        {/* 2-column half/half layout on desktop */}
        <article className="grid grid-cols-1 md:grid-cols-2 items-start gap-10 lg:gap-16">

          {/* Left: headshot */}
          <div className="relative justify-self-start w-full md:w-full md:max-w-[420px] lg:max-w-[460px] xl:max-w-[500px] h-[390px] md:h-[470px] lg:h-[550px] overflow-hidden">
            <Image
              src={person.headshot}
              alt={`Headshot of ${person.name}`}
              fill
              className="object-cover"
              style={{ objectPosition: person.headshotPosition ?? "center 20%" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Right: name, internship, bio, contact */}
          <div className="flex-1 text-neutral-900 md:pl-6 lg:pl-10 xl:pl-14 md:pt-4 lg:pt-8 xl:pt-10">
            <h1 className="text-5xl lg:text-6xl font-normal text-[#0f2242]">{person.name}</h1>

            {person.workExperience && person.workExperience.length > 0 ? (
              <p className="mt-3 text-xl md:text-2xl font-semibold text-[#0f2242]">{person.workExperience[0]}</p>
            ) : null}

            <div className="mt-10 space-y-5 text-lg md:text-xl leading-relaxed text-neutral-800">
              {bio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}

              {person.email ? (
                <p className="pt-2">
                  {firstName} can be reached at{" "}
                  <a className="text-[#0f2242] underline underline-offset-2" href={`mailto:${person.email}`}>
                    {person.email}
                  </a>
                </p>
              ) : null}
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
