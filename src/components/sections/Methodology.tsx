import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import type { MethodologyContent } from "@/content/types";

export default function Methodology({ content }: { content: MethodologyContent }) {
  return (
    <section id="metodologia" className="bg-white py-20 sm:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Metodología</Eyebrow>
          </div>
        </Reveal>
        <h2 className="mx-auto mt-5 max-w-3xl text-center text-2xl font-semibold tracking-tight text-empirika-ink sm:text-4xl">
          <RevealText text={content.title} />
        </h2>

        <div className="relative mt-14 grid grid-cols-1 gap-8 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-6 hidden h-px bg-black/10 lg:block"
          />
          {content.phases.map((p, i) => (
            <Reveal key={p.phase} delay={i * 100} trackId={i === 0 ? "methodology" : undefined}>
              <div className="relative flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-empirika-ink text-sm font-semibold text-empirika-orange">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-empirika-orange">
                      {p.phase}
                    </p>
                    <p className="text-xs text-zinc-400">{p.days}</p>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-empirika-ink">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-500">
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
