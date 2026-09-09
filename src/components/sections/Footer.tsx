import Container from "@/components/ui/Container";
import BrandLogo from "@/components/ui/BrandLogo";
import type { BrandContent } from "@/content/types";

export default function Footer({ brand }: { brand: BrandContent }) {
  return (
    <footer className="border-t border-black/10 bg-white py-10">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <BrandLogo brand={brand} onLight imgClassName="h-6 w-auto" />
        <p className="text-xs text-zinc-400">
          © {new Date().getFullYear()} {brand.name}. Growth Stack 60D® —
          Sistemas de adquisición y conversión.
        </p>
      </Container>
    </footer>
  );
}
