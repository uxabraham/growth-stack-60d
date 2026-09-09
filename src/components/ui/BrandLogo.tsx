import Image from "next/image";
import type { BrandContent } from "@/content/types";

export default function BrandLogo({
  brand,
  className = "",
  imgClassName = "h-6 w-auto",
  onLight = false,
}: {
  brand: BrandContent;
  className?: string;
  imgClassName?: string;
  /** Set true when placing the logo on a light/white background — the
   * source file is white-on-transparent, so it needs to be inverted to
   * read on light sections (e.g. the footer). */
  onLight?: boolean;
}) {
  if (brand.logoUrl) {
    return (
      <span className={`relative inline-block ${className}`}>
        <Image
          src={brand.logoUrl}
          alt={brand.name}
          width={160}
          height={32}
          className={`${imgClassName} object-contain ${onLight ? "invert" : ""}`}
          priority
        />
      </span>
    );
  }

  const [first = "", second = ""] = brand.logoText.split(".");
  return (
    <span
      className={`text-sm font-bold tracking-[0.15em] sm:text-base ${
        onLight ? "text-empirika-ink" : "text-white"
      } ${className}`}
    >
      {first}
      <span className="text-empirika-orange">.</span>
      {second}
    </span>
  );
}
