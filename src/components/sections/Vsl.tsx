import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export default function Vsl() {
  return (
    <section className="bg-empirika-ink pb-28 pt-4 text-white">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Antes de seguir, quiero explicarte algo.
            </h2>
            <p className="mt-3 text-sm text-white/50">
              3 minutos. Sin pitch de ventas. Solo el contexto que necesitas
              antes de decidir si esto es para ti.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="group relative mx-auto mt-10 aspect-video w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
            <div
              aria-hidden
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <button
                type="button"
                aria-label="Reproducir video"
                className="flex h-20 w-20 items-center justify-center rounded-full bg-empirika-orange text-white shadow-[0_20px_40px_-12px_rgba(253,130,0,0.7)] transition-transform duration-200 group-hover:scale-105"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="ml-1 h-8 w-8"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                Mensaje del fundador · 03:12
              </span>
            </div>
            <div className="absolute bottom-4 left-4 rounded-md bg-black/50 px-3 py-1.5 text-xs text-white/70 backdrop-blur-sm">
              Subtítulos disponibles · ES
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
