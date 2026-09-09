import Container from "@/components/ui/Container";
import CtaButton from "@/components/ui/CtaButton";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

export default function Investment() {
  return (
    <section id="inversion" className="bg-white py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Inversión</Eyebrow>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-empirika-ink sm:text-4xl">
              Una implementación, no un gasto de marketing.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mx-auto mt-14 max-w-xl rounded-3xl border border-black/10 bg-zinc-50 p-8 sm:p-10">
            <div className="flex items-center justify-between border-b border-black/10 pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  Programa
                </p>
                <p className="mt-1 text-xl font-semibold text-empirika-ink">
                  Growth Stack 60D
                </p>
              </div>
              <span className="rounded-full bg-empirika-ink px-3 py-1 text-xs font-semibold text-white">
                Implementación inicial
              </span>
            </div>

            <div className="py-8 text-center">
              <p className="text-5xl font-semibold tracking-tight text-empirika-ink">
                USD 6.000
              </p>
              <p className="mt-3 text-sm text-zinc-500">
                USD 3.000 al inicio · USD 3.000 en el día 30
              </p>
            </div>

            <div className="border-t border-black/10 pt-6">
              <p className="text-xs leading-relaxed text-zinc-400">
                La inversión publicitaria (Meta Ads, Google Ads) es
                independiente y se define según el objetivo de crecimiento de
                tu negocio.
              </p>
            </div>

            <CtaButton href="#evaluacion" size="lg" className="mt-8 w-full">
              Solicitar evaluación
            </CtaButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
