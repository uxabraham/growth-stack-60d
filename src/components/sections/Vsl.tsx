import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import type { VslContent } from "@/content/types";

export default function Vsl({ content }: { content: VslContent }) {
  return (
    <section id="vsl" className="bg-empirika-ink pb-20 pt-4 text-white sm:pb-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            <RevealText text={content.title} />
          </h2>
          <Reveal delay={150}>
            <p className="mt-3 text-sm text-white/50">{content.subtitle}</p>
          </Reveal>
        </div>

        <Reveal delay={200} trackId="vsl">
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
                className="flex h-16 w-16 items-center justify-center rounded-full bg-empirika-orange text-white shadow-[0_20px_40px_-12px_rgba(253,130,0,0.7)] transition-transform duration-200 group-hover:scale-105 sm:h-20 sm:w-20"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="ml-1 h-6 w-6 sm:h-8 sm:w-8"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <span className="px-4 text-center text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                {content.videoLabel}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 rounded-md bg-black/50 px-3 py-1.5 text-xs text-white/70 backdrop-blur-sm">
              {content.subtitleLabel}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
