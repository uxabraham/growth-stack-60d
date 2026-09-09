"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";
const STORAGE_KEY = "gs60d-theme";

export function useTheme() {
  // Server always renders "dark" (no access to localStorage); the blocking
  // inline script in layout.tsx already set the real data-theme attribute
  // on <html> before hydration, so we sync React's state to it right after
  // mount — a legitimate one-time read of external state.
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from the DOM attribute set by the pre-hydration blocking script, see comment above
    if (current === "light") setThemeState("light");
  }, []);

  function setTheme(next: Theme) {
    setThemeState(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore storage errors (private mode, quota, etc.)
    }
  }

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return { theme, setTheme, toggleTheme };
}
