"use client";

import { useTheme } from "@/lib/useTheme";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
      aria-pressed={isLight}
      className={`relative flex h-8 w-14 shrink-0 items-center rounded-full border border-on-deep/15 bg-on-deep/10 px-1 transition-colors duration-300 ${className}`}
    >
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full bg-empirika-orange text-white shadow-sm transition-transform duration-300 ${
          isLight ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {isLight ? (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
            <circle cx="12" cy="12" r="5" />
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              d="M12 1.5v2M12 20.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1.5 12h2M20.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
        )}
      </span>
    </button>
  );
}
