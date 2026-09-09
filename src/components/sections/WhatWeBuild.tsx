import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

const items = [
  {
    n: "01",
    title: "Estrategia y Oferta",
    desc: "Clarificamos qué vendes, a quién y por qué deberían elegirte a ti antes que a cualquier otro.",
  },
  {
    n: "02",
    title: "Adquisición",
    desc: "Campañas y canales diseñados para traer oportunidades calificadas, no solo tráfico.",
  },
  {
    n: "03",
    title: "Landing & Conversión",
    desc: "Páginas y funnels construidos para convertir visitas en conversaciones reales de venta.",
  },
  {
    n: "04",
    title: "CRM",
    desc: "Un solo lugar donde vive cada oportunidad, sin que nada se pierda en WhatsApp o Excel.",
  },
  {
    n: "05",
    title: "Automatización",
    desc: "Seguimiento y respuesta automatizados para que ninguna oportunidad se enfríe por falta de tiempo.",
  },
  {
    n: "06",
    title: "Proceso Comercial",
    desc: "Guiones, etapas y ritmo comercial definidos para que tu equipo cierre con consistencia.",
  },
  {
    n: "07",
    title: "Tracking & Data",
    desc: "Visibilidad completa de qué funciona, qué no, y en qué invertir el siguiente dólar.",
  },
];

export default function WhatWeBuild() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Qué construimos</Eyebrow>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-empirika-ink sm:text-4xl">
              Siete componentes. Un solo sistema.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.n}
                className="rounded-2xl border border-black/10 p-6 transition-all hover:border-empirika-orange/40 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.15)]"
              >
                <span className="font-mono text-sm text-empirika-orange">
                  {item.n}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-empirika-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {item.desc}
                </p>
              </div>
            ))}
            <div className="flex flex-col justify-center rounded-2xl bg-empirika-ink p-6 text-white">
              <p className="text-lg font-semibold leading-snug">
                No son siete servicios.
              </p>
              <p className="mt-1 text-lg font-semibold leading-snug text-empirika-orange">
                Es un solo sistema.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
