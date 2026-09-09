import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

const phases = [
  {
    phase: "Fase 1",
    days: "Días 1–15",
    title: "Diagnóstico y estrategia",
    desc: "Auditamos tu operación actual, tu oferta y tu data. Definimos el plan del sistema completo.",
  },
  {
    phase: "Fase 2",
    days: "Días 16–30",
    title: "Construcción",
    desc: "Montamos landing, CRM, automatizaciones y estructura de campañas. La base del sistema.",
  },
  {
    phase: "Fase 3",
    days: "Días 31–45",
    title: "Lanzamiento",
    desc: "Activamos adquisición en vivo. El sistema empieza a generar oportunidades reales.",
  },
  {
    phase: "Fase 4",
    days: "Días 46–60",
    title: "Optimización",
    desc: "Ajustamos con datos reales: oferta, mensajes, segmentación y proceso comercial.",
  },
];

export default function Methodology() {
  return (
    <section id="metodologia" className="bg-white py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Metodología</Eyebrow>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-empirika-ink sm:text-4xl">
              60 días. Una implementación, no un curso.
            </h2>
          </div>
        </Reveal>

        <div className="relative mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-6 hidden h-px bg-black/10 lg:block"
          />
          {phases.map((p, i) => (
            <Reveal key={p.phase} delay={i * 100}>
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
