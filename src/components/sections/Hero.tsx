import Container from "@/components/ui/Container";
import CtaButton from "@/components/ui/CtaButton";
import Reveal from "@/components/ui/Reveal";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-empirika-ink pb-24 pt-32 text-white sm:pt-40">
      {/* Ambient background texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(253,130,0,0.16) 0%, rgba(10,10,10,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
              Consultora de crecimiento digital
            </p>

            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Tu negocio ya funciona.
              <br />
              <span className="text-empirika-orange">
                Ahora construyamos el sistema para escalarlo.
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-balance text-lg leading-relaxed text-white/70 sm:text-xl">
              Integramos estrategia, adquisición, publicidad, landing pages,
              CRM, automatización y seguimiento comercial en un solo sistema
              diseñado para generar nuevas oportunidades y convertirlas en
              crecimiento real.
            </p>

            <p className="mx-auto mt-6 max-w-xl text-base font-medium text-white/90 sm:text-lg">
              No hacemos marketing por partes.
              <br />
              Construimos sistemas de crecimiento.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4">
              <CtaButton href="#evaluacion" size="lg">
                Solicitar evaluación
              </CtaButton>
              <span className="text-xs text-white/40">
                Evaluación estratégica sin costo. Solo para empresas
                calificadas.
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-16 flex max-w-md items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:max-w-lg">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-white/[0.02] text-lg font-semibold text-white/70">
              CM
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-white">
                Carlos Montes — CEO, Empirika Group
              </p>
              <p className="text-xs text-white/50">
                Operador de crecimiento, no gurú de marketing. Espacio
                reservado para foto / video del fundador.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mx-auto mt-6 flex max-w-lg flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-empirika-orange/30 bg-empirika-orange/10 px-3 py-1.5 text-xs font-medium text-empirika-orange">
              ⚡ Especializado en escalar negocios
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-empirika-orange/30 bg-empirika-orange/10 px-3 py-1.5 text-xs font-medium text-empirika-orange">
              ⚡ Casos de éxito comprobados
            </span>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mx-auto mt-16 flex max-w-3xl flex-col items-center justify-center gap-4 border-t border-white/10 pt-8 text-center sm:flex-row sm:gap-10 sm:divide-x sm:divide-white/10">
            <span className="text-sm text-white/60 sm:pr-10">
              <span className="font-semibold text-white">+500</span> marcas
              acompañadas
            </span>
            <span className="text-sm text-white/60 sm:px-10">
              <span className="font-semibold text-white">11</span> países
            </span>
            <span className="text-sm text-white/60 sm:pl-10">
              Operando desde{" "}
              <span className="font-semibold text-white">2018</span>
            </span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
