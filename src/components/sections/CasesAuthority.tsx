import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import SpotlightCard from "@/components/ui/SpotlightCard";
import type { CasesContent } from "@/content/types";

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

export default function CasesAuthority({ content }: { content: CasesContent }) {
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

        <div className="mt-14 grid grid-cols-1 gap-8 sm:mt-16 lg:grid-cols-3">
          {content.cases.map((c, i) => (
            <Reveal key={c.industry} delay={i * 100}>
              <SpotlightCard className="flex h-full flex-col p-8 sm:p-10">
                <QuoteMark />
                <p className="mt-5 text-xl font-semibold leading-snug tracking-tight text-empirika-ink sm:text-2xl">
                  {c.result}
                </p>

                <div className="mt-6 space-y-4 border-t border-black/10 pt-5">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                      Problema
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">
                      {c.problem}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                      Implementación
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">
                      {c.build}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3 border-t border-black/10 pt-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-empirika-ink text-sm font-bold text-white">
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
