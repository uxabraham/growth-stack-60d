import Container from "@/components/ui/Container";
import CtaButton from "@/components/ui/CtaButton";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import type { InvestmentContent } from "@/content/types";

export default function Investment({ content }: { content: InvestmentContent }) {
  return (
    <section id="inversion" className="bg-white py-20 sm:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Inversión</Eyebrow>
          </div>
        </Reveal>
        <h2 className="mx-auto mt-5 max-w-2xl text-center text-2xl font-semibold tracking-tight text-empirika-ink sm:text-4xl">
          <RevealText text={content.title} />
        </h2>

        <Reveal delay={150} trackId="investment">
          <div className="mx-auto mt-12 max-w-xl rounded-3xl border border-black/10 bg-zinc-50 p-6 sm:mt-14 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  Programa
                </p>
                <p className="mt-1 text-xl font-semibold text-empirika-ink">
                  {content.programName}
                </p>
              </div>
              <span className="rounded-full bg-empirika-ink px-3 py-1 text-xs font-semibold text-white">
                Implementación inicial
              </span>
            </div>

            <div className="py-8 text-center">
              <p className="text-4xl font-semibold tracking-tight text-empirika-ink sm:text-5xl">
                {content.price}
              </p>
              <p className="mt-3 text-sm text-zinc-500">{content.terms}</p>
            </div>

            <div className="border-t border-black/10 pt-6">
              <p className="text-xs leading-relaxed text-zinc-400">
                {content.disclaimer}
              </p>
            </div>

            <CtaButton
              href="#evaluacion"
              size="lg"
              trackId="investment-cta"
              className="mt-8 w-full"
            >
              {content.ctaLabel}
            </CtaButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
