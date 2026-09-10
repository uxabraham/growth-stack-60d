/**
 * Soft gradient blend dropped between two sections of different background
 * colors, so the handoff reads as a fade instead of a hard cut. Sits
 * centered on the seam via negative margins, half-overlapping each side.
 */
export default function Seam({
  from,
  to,
  height = "8rem",
}: {
  from: string;
  to: string;
  height?: string;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative z-10"
      style={{
        height,
        marginTop: `calc(${height} / -2)`,
        marginBottom: `calc(${height} / -2)`,
        background: `linear-gradient(to bottom, ${from}, ${to})`,
      }}
    />
  );
}
