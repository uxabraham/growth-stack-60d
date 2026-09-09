import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white py-10">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <span className="text-sm font-bold tracking-[0.15em] text-empirika-ink">
          EMPIRIKA<span className="text-empirika-orange">.</span>GROUP
        </span>
        <p className="text-xs text-zinc-400">
          © {new Date().getFullYear()} Empirika Group. Growth Stack 60D® —
          Sistemas de adquisición y conversión.
        </p>
      </Container>
    </footer>
  );
}
