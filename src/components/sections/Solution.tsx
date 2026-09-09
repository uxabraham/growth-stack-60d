import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

const flow = [
  "Oferta",
  "Adquisición",
  "Conversión",
  "CRM",
  "Seguimiento",
  "Ventas",
  "Data",
];

export default function Solution() {
  return (
    <section id="solucion" className="bg-empirika-ink py-24 text-white sm:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>La solución</Eyebrow>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              No necesitas más herramientas.
              <br />
              Necesitas que todo trabaje conectado.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="flex flex-col items-stretch gap-0 sm:flex-row">
              {flow.map((step, i) => (
                <div key={step} className="flex flex-1 items-center">
                  <div className="flex w-full flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-6 text-center">
                    <span className="text-xs font-mono text-empirika-orange">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-semibold">{step}</span>
                  </div>
                  {i < flow.length - 1 && (
                    <span
                      aria-hidden
                      className="hidden shrink-0 px-1 text-empirika-orange sm:block"
                    >
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={250}>
          <p className="mx-auto mt-14 max-w-xl text-center text-lg font-medium leading-relaxed text-white/80">
            No instalamos herramientas porque sí.
            <br />
            Cada componente tiene una función dentro del sistema.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
