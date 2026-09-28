export default function Eyebrow({
  children,
  tone = "dark",
}: {
  children: string;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={`inline-flex items-center text-xs font-semibold uppercase tracking-[0.2em] ${
        tone === "dark" ? "text-empirika-orange" : "text-empirika-orange"
      }`}
    >
      {children}
    </span>
  );
}
