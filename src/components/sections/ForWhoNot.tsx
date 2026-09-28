import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import type { ForWhoNotContent } from "@/content/types";

export default function ForWhoNot({ content }: { content: ForWhoNotContent }) {
  return (
    <section id="filtro" className="bg-surface-deep py-16 text-on-deep sm:py-24">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>El filtro</Eyebrow>
          </div>
        </Reveal>
        <h2 className="mx-auto mt-5 max-w-3xl text-center text-2xl font-semibold tracking-tight sm:text-4xl">
          <RevealText text={content.title} />
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2">
          <Reveal trackId="forWhoNot">
            <div className="h-full rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-6 sm:p-8">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-400">
                Esto SÍ es para ti si…
              </h3>
              <ul className="mt-5 space-y-4">
                {content.yes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-on-deep/85">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="h-full rounded-2xl border border-red-500/30 bg-red-500/[0.06] p-6 sm:p-8">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-red-400">
                Esto NO es para ti si…
              </h3>
              <ul className="mt-5 space-y-4">
                {content.no.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-on-deep/70">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/80 text-xs font-bold text-white">
                      ×
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
