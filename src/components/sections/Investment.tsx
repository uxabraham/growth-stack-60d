import Container from "@/components/ui/Container";
import CtaButton from "@/components/ui/CtaButton";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import type { InvestmentContent } from "@/content/types";

export default function Investment({ content }: { content: InvestmentContent }) {
  return (
    <section id="inversion" className="bg-white py-20 sm:py-32">
      <Container>
        <Reveal trackId="investment">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-black/10 bg-gradient-to-br from-zinc-50 via-white to-white px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
            {/* Decorative oversized wordmark + glow — banner texture, not content */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 select-none overflow-hidden"
            >
              <span className="absolute -right-10 top-1/2 hidden -translate-y-1/2 whitespace-nowrap text-[13rem] font-black leading-none tracking-tight text-empirika-ink/[0.035] lg:block xl:text-[16rem]">
                60D
              </span>
              <div
                className="absolute -right-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full opacity-60 blur-[100px]"
                style={{
                  background:
                    "radial-gradient(circle, rgba(253,130,0,0.14), rgba(253,130,0,0) 70%)",
                }}
              />
            </div>

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-empirika-orange/30 bg-empirika-orange/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-empirika-orange">
                Inversión
              </span>

              <h2 className="mt-6 max-w-xl text-3xl font-bold leading-[1.1] tracking-tight text-empirika-ink sm:text-5xl">
                <RevealText text={content.title} />
              </h2>

              <div className="mt-10 flex flex-col gap-10 border-t border-black/10 pt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                      Programa — {content.programName}
                    </p>
                    <span className="rounded-full bg-empirika-ink px-3 py-1 text-[11px] font-semibold text-white">
                      Implementación inicial
                    </span>
                  </div>
                  <p className="mt-4 text-6xl font-bold tracking-tight text-empirika-ink sm:text-7xl">
                    {content.price}
                  </p>
                  <p className="mt-3 text-sm text-zinc-500">{content.terms}</p>
                </div>

                <div className="flex max-w-sm flex-col items-start gap-5 lg:items-end lg:text-right">
                  <p className="text-xs leading-relaxed text-zinc-400">
                    {content.disclaimer}
                  </p>
                  <CtaButton
                    href="#evaluacion"
                    size="lg"
                    trackId="investment-cta"
                    className="w-full sm:w-auto"
                  >
                    {content.ctaLabel}
                  </CtaButton>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
