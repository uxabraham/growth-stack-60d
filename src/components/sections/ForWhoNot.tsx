import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

const yes = [
  "Empresas con producto o servicio validado.",
  "Empresas con ventas actuales.",
  "Empresas listas para invertir en su crecimiento.",
  "Equipos con capacidad operativa para atender más demanda.",
];

const no = [
  "Emprendedores empezando desde cero.",
  "Personas buscando community management.",
  "Empresas esperando resultados mágicos.",
  "Empresas sin capacidad comercial para atender oportunidades.",
];

export default function ForWhoNot() {
  return (
    <section className="bg-empirika-ink py-24 text-white sm:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>El filtro</Eyebrow>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              Para quién es. Para quién no.
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-empirika-orange/30 bg-empirika-orange/[0.06] p-8">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-empirika-orange">
                Para quién es
              </h3>
              <ul className="mt-5 space-y-4">
                {yes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/85">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-empirika-orange text-xs font-bold text-white">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">
                No es para
              </h3>
              <ul className="mt-5 space-y-4">
                {no.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/60">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white/50">
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
