import Image from "next/image";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import type { CasesContent, HeroContent } from "@/content/types";

export default function CasesAuthority({
  content,
  founder,
}: {
  content: CasesContent;
  founder: HeroContent;
}) {
  return (
    <section id="casos" className="bg-white py-20 sm:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Casos y autoridad</Eyebrow>
          </div>
        </Reveal>
        <h2 className="mx-auto mt-5 max-w-3xl text-center text-2xl font-semibold tracking-tight text-empirika-ink sm:text-4xl">
          <RevealText text={content.title} />
        </h2>

        <Reveal delay={100} trackId="cases">
          <div className="mx-auto mt-12 overflow-hidden rounded-2xl border border-black/10 bg-zinc-50 sm:mt-14">
            <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr]">
              <div className="relative h-56 w-full sm:h-full">
                <Image
                  src="/team/carlos-montes.png"
                  alt={founder.founderName}
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <p className="text-sm font-semibold text-empirika-ink">
                  {founder.founderName}
                </p>
                <p className="text-xs font-medium uppercase tracking-wide text-empirika-orange">
                  {founder.founderRole}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                  {content.authorityBio}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 border-y border-black/10 py-6 text-xs font-semibold uppercase tracking-widest text-zinc-400">
            <span>{content.statBrands}</span>
            <span>{content.statCountries}</span>
            <span>{content.statSince}</span>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 lg:grid-cols-3">
          {content.cases.map((c, i) => (
            <Reveal key={c.industry} delay={i * 100}>
              <div className="flex h-full flex-col rounded-2xl border border-black/10 p-6">
                <span className="inline-block w-fit rounded-full bg-empirika-ink px-3 py-1 text-xs font-semibold text-white">
                  {c.industry}
                </span>
                <div className="mt-5 space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                      Problema
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                      {c.problem}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                      Implementación
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                      {c.build}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-empirika-orange">
                      Resultado
                    </p>
                    <p className="mt-1 text-sm font-medium leading-relaxed text-empirika-ink">
                      {c.result}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
