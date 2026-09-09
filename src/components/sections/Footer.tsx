import Container from "@/components/ui/Container";
import type { BrandContent } from "@/content/types";

export default function Footer({ brand }: { brand: BrandContent }) {
  return (
    <footer className="border-t border-black/10 bg-white py-10">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <span className="text-sm font-bold tracking-[0.15em] text-empirika-ink">
          {brand.logoText.split(".")[0]}
          <span className="text-empirika-orange">.</span>
          {brand.logoText.split(".")[1]}
        </span>
        <p className="text-xs text-zinc-400">
          © {new Date().getFullYear()} {brand.name}. Growth Stack 60D® —
          Sistemas de adquisición y conversión.
        </p>
      </Container>
    </footer>
  );
}
