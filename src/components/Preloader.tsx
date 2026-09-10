"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [phase, setPhase] = useState<"loading" | "done" | "hidden">("loading");

  useEffect(() => {
    document.documentElement.classList.add("is-preloading");

    const holdTimer = setTimeout(() => setPhase("done"), 650);
    const hideTimer = setTimeout(() => {
      setPhase("hidden");
      document.documentElement.classList.remove("is-preloading");
    }, 650 + 700);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(hideTimer);
      document.documentElement.classList.remove("is-preloading");
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div className={`preloader ${phase === "done" ? "is-done" : ""}`} aria-hidden>
      <span className="preloader-mark">
        empirika<span className="text-empirika-orange">.</span>
      </span>
    </div>
  );
}
