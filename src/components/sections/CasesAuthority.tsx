import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

const cases = [
  {
    industry: "Servicios para el hogar",
    problem:
      "Dependía casi por completo de referidos. Sin previsibilidad mes a mes.",
    build:
      "Oferta reestructurada, campañas de adquisición, landing de conversión y CRM con seguimiento automatizado.",
    result:
      "Flujo estable de citas calificadas cada semana, sin depender de recomendaciones.",
  },
  {
    industry: "Consultoría B2B",
    problem:
      "Generaba leads, pero se perdían en WhatsApp y hojas de cálculo dispersas.",
    build:
      "CRM centralizado, proceso comercial definido por etapas y tracking de cada oportunidad.",
    result: "Ciclo de venta más corto y visibilidad total del pipeline.",
  },
  {
    industry: "Educación / formación",
    problem:
      "Invertía en ads sin saber qué campaña realmente generaba ventas.",
    build:
      "Sistema de tracking end-to-end conectando anuncio, lead, cita y venta.",
    result:
      "Decisiones de inversión publicitaria basadas en datos, no en intuición.",
  },
];

export default function CasesAuthority() {
  return (
    <section id="casos" className="bg-white py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Casos y autoridad</Eyebrow>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-empirika-ink sm:text-4xl">
              Sistemas construidos, no promesas.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-y border-black/10 py-6 text-xs font-semibold uppercase tracking-widest text-zinc-400">
            <span>+500 marcas asesoradas</span>
            <span>11 países</span>
            <span>Operando desde 2018</span>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {cases.map((c, i) => (
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
