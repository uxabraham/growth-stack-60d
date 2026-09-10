/**
 * Centered italic quote flanked by two hairlines that fade toward the
 * edges. `className` sets the text color context (e.g. "text-on-deep"
 * or "text-empirika-ink") — the lines inherit it via currentColor.
 */
export default function QuoteDivider({
  quote,
  className = "",
}: {
  quote: string;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto flex max-w-2xl items-center justify-center gap-4 sm:gap-6 ${className}`}
    >
      <span
        aria-hidden
        className="h-px min-w-6 flex-1 bg-gradient-to-r from-transparent to-current opacity-25 sm:min-w-16"
      />
      <p className="shrink-0 text-balance text-center text-sm italic leading-relaxed opacity-60 sm:text-base">
        &ldquo;{quote}&rdquo;
      </p>
      <span
        aria-hidden
        className="h-px min-w-6 flex-1 bg-gradient-to-l from-transparent to-current opacity-25 sm:min-w-16"
      />
    </div>
  );
}
