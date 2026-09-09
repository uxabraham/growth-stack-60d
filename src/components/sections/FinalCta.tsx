import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import EvaluationForm from "@/components/sections/EvaluationForm";

export default function FinalCta() {
  return (
    <section
      id="evaluacion"
      className="relative overflow-hidden bg-empirika-ink py-24 text-white sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 0%, rgba(253,130,0,0.14) 0%, rgba(10,10,10,0) 70%)",
        }}
      />
      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold leading-snug tracking-tight sm:text-4xl">
              Tu negocio ya demostró que puede vender.
              <br />
              <span className="text-empirika-orange">
                Ahora necesita un sistema capaz de escalarlo.
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-sm text-white/60">
              Completa el formulario. Si tu negocio califica, coordinaremos
              una evaluación estratégica sin costo con nuestro equipo.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mx-auto mt-14 max-w-xl">
            <EvaluationForm />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
