import Image from "next/image";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Parallax from "@/components/ui/Parallax";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import StatCardsGrid from "@/components/ui/StatCardsGrid";
import SpotlightCard from "@/components/ui/SpotlightCard";
import type { CasesContent, HeroContent } from "@/content/types";

function QuoteMark() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 32 24"
      className="h-7 w-8 text-empirika-orange/70"
      fill="currentColor"
    >
      <path d="M9.6 24c-2.4 0-4.4-.85-6-2.55C1.87 19.6 1 17.35 1 14.5c0-3.13 1.07-6.1 3.2-8.9C6.4 2.73 9.33.93 13 0l1.5 3.3c-2.27.8-4.03 1.9-5.3 3.3-1.2 1.33-1.87 2.7-2 4.1.8-.4 1.7-.6 2.7-.6 2 0 3.63.63 4.9 1.9 1.27 1.27 1.9 2.87 1.9 4.8 0 2-.67 3.63-2 4.9-1.27 1.27-2.83 1.9-4.7 1.9zm17 0c-2.4 0-4.4-.85-6-2.55-1.73-1.85-2.6-4.1-2.6-6.95 0-3.13 1.07-6.1 3.2-8.9C23.4 2.73 26.33.93 30 0l1.5 3.3c-2.27.8-4.03 1.9-5.3 3.3-1.2 1.33-1.87 2.7-2 4.1.8-.4 1.7-.6 2.7-.6 2 0 3.63.63 4.9 1.9C33.07 13.27 33.7 14.87 33.7 16.8c0 2-.67 3.63-2 4.9-1.27 1.27-2.83 1.9-4.7 1.9z" />
    </svg>
  );
}

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
              <div className="relative h-56 w-full overflow-hidden sm:h-full">
                <Parallax speed={0.1} className="absolute inset-[-10%]">
                  <Image
                    src="/team/carlos-montes.png"
                    alt={founder.founderName}
                    fill
                    sizes="220px"
                    className="object-cover"
                  />
                </Parallax>
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
          <div className="mx-auto mt-12 max-w-4xl rounded-3xl bg-surface-deep p-4 sm:mt-14 sm:p-6">
            <StatCardsGrid stats={content.stats} />
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 lg:grid-cols-3">
          {content.cases.map((c, i) => (
            <Reveal key={c.industry} delay={i * 100}>
              <SpotlightCard className="flex h-full flex-col p-6">
                <QuoteMark />
                <p className="mt-4 text-base font-medium leading-snug text-empirika-ink">
                  {c.result}
                </p>

                <div className="mt-5 space-y-3 border-t border-black/10 pt-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                      Problema
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-600">
                      {c.problem}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                      Implementación
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-600">
                      {c.build}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-3 pt-1">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-empirika-ink text-xs font-bold text-white">
                    {c.industry
                      .split(" ")
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")
                      .toUpperCase()}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-empirika-ink">
                      {c.industry}
                    </p>
                    <p className="text-xs text-zinc-400">Caso de éxito</p>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
