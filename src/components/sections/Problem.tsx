import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

const pieces = [
  { label: "Página web", note: "Diseñada hace tiempo, sin foco en conversión" },
  { label: "Ads", note: "Genera clics, pero nadie sabe qué pasa después" },
  { label: "Redes sociales", note: "Contenido constante, poca conexión a ventas" },
  { label: "CRM", note: "Existe, pero nadie lo actualiza a tiempo" },
  { label: "WhatsApp", note: "Ahí mueren la mayoría de las conversaciones" },
  { label: "Ventas", note: "Depende de la memoria y el esfuerzo individual" },
];

export default function Problem() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>El problema</Eyebrow>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-empirika-ink sm:text-4xl">
              El problema no es que no hagas marketing.
              <br />
              Es que lo haces por partes.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {pieces.map((piece) => (
              <div
                key={piece.label}
                className="relative rounded-2xl border border-black/10 bg-zinc-50 p-5 transition-colors hover:border-empirika-orange/40"
              >
                <p className="text-sm font-semibold text-empirika-ink">
                  {piece.label}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                  {piece.note}
                </p>
                <span
                  aria-hidden
                  className="absolute right-4 top-4 h-2 w-2 rounded-full bg-zinc-300"
                />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mx-auto mt-14 max-w-2xl text-center">
            <p className="text-xl font-semibold leading-snug text-empirika-ink sm:text-2xl">
              Tienes piezas.
              <br />
              <span className="text-empirika-orange">
                Pero no tienes un sistema.
              </span>
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
