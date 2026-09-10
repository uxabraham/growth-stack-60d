/**
 * Atmospheric transition dropped between two sections of different
 * background color. Instead of literally gradient-blending colorA into
 * colorB (which reads as a flat gray "block" — RGB-interpolating near-black
 * into white passes through a muddy mid-gray), this layers two soft,
 * heavily blurred radial glows — one tinted with the darker section's
 * color, one with the brand orange — over the hard seam, then fades the
 * whole thing out at both ends with a mask. The result reads as light and
 * fog dissolving across the boundary rather than a painted stripe.
 */
export default function Seam({
  tint,
  height = "12rem",
}: {
  /** Color of the darker of the two adjoining sections. */
  tint: string;
  height?: string;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative z-10 overflow-hidden"
      style={{
        height,
        marginTop: `calc(${height} / -2)`,
        marginBottom: `calc(${height} / -2)`,
        maskImage:
          "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
      }}
    >
      <div
        className="absolute inset-[-30%]"
        style={{
          background: `radial-gradient(55% 50% at 50% 50%, ${tint}, transparent 72%)`,
          filter: "blur(56px)",
        }}
      />
      <div
        className="absolute inset-[-30%]"
        style={{
          background:
            "radial-gradient(42% 38% at 50% 50%, rgba(253,130,0,0.14), transparent 75%)",
          filter: "blur(64px)",
        }}
      />
    </div>
  );
}
