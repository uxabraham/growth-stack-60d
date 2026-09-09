import Container from "@/components/ui/Container";
import CtaButton from "@/components/ui/CtaButton";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-empirika-ink/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <span className="text-sm font-bold tracking-[0.15em] text-white sm:text-base">
          EMPIRIKA<span className="text-empirika-orange">.</span>GROUP
        </span>
        <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          <a href="#solucion" className="transition-colors hover:text-white">
            El sistema
          </a>
          <a href="#metodologia" className="transition-colors hover:text-white">
            Metodología
          </a>
          <a href="#casos" className="transition-colors hover:text-white">
            Casos
          </a>
          <a href="#inversion" className="transition-colors hover:text-white">
            Inversión
          </a>
        </nav>
        <CtaButton href="#evaluacion" size="md">
          Solicitar evaluación
        </CtaButton>
      </Container>
    </header>
  );
}
