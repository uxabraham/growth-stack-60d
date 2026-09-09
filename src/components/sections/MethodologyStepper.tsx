"use client";

import { useEffect, useRef, useState } from "react";
import type { MethodologyPhase } from "@/content/types";

const AUTOPLAY_MS = 5000;

export default function MethodologyStepper({
  phases,
}: {
  phases: MethodologyPhase[];
}) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  // Only start autoplay once the stepper is actually on screen.
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlaying(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => {
      setActive((i) => (i + 1) % phases.length);
      setProgressKey((k) => k + 1);
    }, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [playing, active, phases.length]);

  function selectPhase(i: number) {
    setActive(i);
    setProgressKey((k) => k + 1);
    setPlaying(true);
  }

  const current = phases[active];

  return (
    <div ref={rootRef} className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
      {/* Left: step list */}
      <div className="flex flex-col divide-y divide-black/10">
        {phases.map((phase, i) => {
          const isActive = i === active;
          return (
            <button
              key={phase.phase}
              type="button"
              onClick={() => selectPhase(i)}
              className="group relative flex items-start gap-4 py-5 text-left"
            >
              <span
                className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors duration-300 ${
                  isActive
                    ? "bg-empirika-orange text-white"
                    : "bg-black/5 text-zinc-400 group-hover:bg-black/10"
                }`}
              >
                {i + 1}
              </span>
              <span className="flex-1">
                <span
                  className={`block text-xs font-semibold uppercase tracking-wide transition-colors duration-300 ${
                    isActive ? "text-empirika-orange" : "text-zinc-400"
                  }`}
                >
                  {phase.phase} · {phase.days}
                </span>
                <span
                  className={`mt-1 block font-semibold transition-colors duration-300 ${
                    isActive
                      ? "text-lg text-empirika-ink"
                      : "text-base text-zinc-500 group-hover:text-zinc-700"
                  }`}
                >
                  {phase.title}
                </span>
                <span
                  className={`grid overflow-hidden text-sm leading-relaxed text-zinc-500 transition-all duration-500 ${
                    isActive
                      ? "mt-2 grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <span className="min-h-0">{phase.desc}</span>
                </span>
              </span>

              {isActive && (
                <span className="absolute -bottom-px left-12 right-0 h-0.5 overflow-hidden bg-black/5">
                  <span
                    key={progressKey}
                    className="block h-full origin-left bg-empirika-orange"
                    style={{
                      animation: playing
                        ? `methodology-progress ${AUTOPLAY_MS}ms linear forwards`
                        : "none",
                    }}
                  />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Right: visual panel */}
      <div className="relative">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-empirika-ink text-white shadow-[0_40px_80px_-40px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="ml-3 text-xs text-white/40">
              Growth Stack 60D — {current.phase}
            </span>
          </div>

          <div key={active} className="p-6 sm:p-8" style={{ animation: "methodology-fade 0.5s ease" }}>
            <span className="font-mono text-sm text-empirika-orange">
              {String(active + 1).padStart(2, "0")} / {String(phases.length).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight">
              {current.title}
            </h3>
            <p className="mt-1 text-sm text-white/50">{current.days}</p>

            <ul className="mt-6 space-y-3">
              {(current.bullets ?? []).map((bullet, i) => (
                <li
                  key={bullet}
                  className="flex items-start gap-3 text-sm text-white/80"
                  style={{
                    animation: `methodology-item-in 0.4s ease both`,
                    animationDelay: `${i * 90}ms`,
                  }}
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-empirika-orange/20 text-[11px] text-empirika-orange">
                    ✓
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-empirika-orange transition-all duration-700 ease-out"
                style={{ width: `${((active + 1) / phases.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes methodology-progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes methodology-fade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes methodology-item-in {
          from { opacity: 0; transform: translateX(-6px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
