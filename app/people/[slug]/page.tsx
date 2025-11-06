import Image from "next/image";
import { getAllPeople, getPersonBySlug } from "../../_lib/people";
import NavBar from "../../_components/NavBar";

export const revalidate = 3600;

export function generateStaticParams() {
  return getAllPeople().map((p) => ({ slug: p.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = getPersonBySlug(slug);
  if (!person) return null;

  return (
    <main>
      <NavBar forceSolid />

      {/* Extra top spacing below navbar */}
      <div className="mx-auto w-full max-w-7xl px-6 pt-36 md:pt-40 pb-20">

        {/* 2-column half/half layout on desktop */}
        <article className="grid grid-cols-1 md:grid-cols-2 items-start gap-10 lg:gap-16">

          {/* Left: headshot (larger) */}
          <div className="relative justify-self-start w-full md:w-full md:max-w-[420px] lg:max-w-[460px] xl:max-w-[500px] h-[390px] md:h-[470px] lg:h-[550px] rounded-xl overflow-hidden shadow-md ring-1 ring-black/10">
            <Image
              src={person.headshot}
              alt={`Headshot of ${person.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Right: content */}
          <div className="flex-1 text-gray-900 md:pl-6 lg:pl-10 xl:pl-14 md:pt-4 lg:pt-8 xl:pt-10">
            <h1 className="font-heading uppercase tracking-wide text-4xl lg:text-5xl font-extrabold">
              {person.name}
            </h1>

            {person.workExperience && person.workExperience.length > 0 ? (
              <p className="text-gray-700 mt-3 italic font-semibold text-lg md:text-xl">
                {person.workExperience[0]}
              </p>
            ) : null}

            <div className="mt-10 space-y-5 text-lg leading-relaxed">
              <p><span className="font-semibold">Major:</span> {person.major}</p>
              <p><span className="font-semibold">Year:</span> {person.gradYear}</p>

              {person.workExperience && person.workExperience.length > 1 && (
                <div>
                  <div className="font-semibold">Work Experience:</div>
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    {person.workExperience.slice(1).map((w, i) => (
                      <li key={i}>{w}</li>
                    ))}
                  </ul>
                </div>
              )}

              {person.campusInvolvements && person.campusInvolvements.length > 0 && (
                <div>
                  <div className="font-semibold">Campus Involvements:</div>
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    {person.campusInvolvements.map((w, i) => (
                      <li key={i}>{w}</li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="pt-4">
                {person.name} can be reached at{" "}
                <a className="underline underline-offset-2" href={`mailto:${person.email}`}>
                  {person.email}
                </a>
              </p>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
