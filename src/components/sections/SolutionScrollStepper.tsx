"use client";

import { useEffect, useRef, useState } from "react";
import type { SolutionStep } from "@/content/types";
import { trackSectionView } from "@/lib/analytics";

const STEP_VH = 62;

export default function SolutionScrollStepper({
  steps,
}: {
  steps: SolutionStep[];
}) {
  const [active, setActive] = useState(0);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = sentinelRefs.current.indexOf(entry.target as HTMLDivElement);
            if (i !== -1) setActive(i);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sentinelRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [steps.length]);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;
    const seenObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackSectionView("solution");
          seenObserver.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    seenObserver.observe(node);
    return () => seenObserver.disconnect();
  }, []);

  const progress = steps.length > 1 ? active / (steps.length - 1) : 0;

  return (
    <div ref={wrapperRef}>
      {/* Desktop: scroll-driven sticky stepper */}
      <div
        className="relative hidden lg:block"
        style={{ height: `${steps.length * STEP_VH}vh` }}
      >
        {steps.map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              sentinelRefs.current[i] = el;
            }}
            className="absolute inset-x-0"
            style={{
              top: `${(i / steps.length) * 100}%`,
              height: `${100 / steps.length}%`,
            }}
          />
        ))}

        <div className="sticky top-28 flex h-[64vh] items-center">
          <div className="grid w-full grid-cols-[minmax(0,340px)_1fr] gap-16">
            {/* Left: step list with progress line */}
            <div className="relative pl-10">
              <div className="absolute left-3 top-2 bottom-2 w-px bg-white/10">
                <div
                  className="w-full bg-empirika-orange transition-all duration-500 ease-out"
                  style={{ height: `${progress * 100}%` }}
                />
              </div>
              <ul className="space-y-8">
                {steps.map((step, i) => {
                  const isActive = i === active;
                  const isPast = i < active;
                  return (
                    <li key={step.title} className="relative">
                      <span
                        className={`absolute -left-10 top-0.5 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-colors duration-500 ${
                          isActive
                            ? "bg-empirika-orange text-white"
                            : isPast
                              ? "bg-empirika-orange/30 text-empirika-orange"
                              : "bg-white/10 text-white/40"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <p
                        className={`text-lg font-semibold transition-colors duration-500 ${
                          isActive ? "text-white" : "text-white/35"
                        }`}
                      >
                        {step.title}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right: active step detail card */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-2 border-b border-white/10 px-6 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="ml-3 text-xs text-white/40">
                  Growth Stack 60D — El sistema
                </span>
              </div>
              <div
                key={active}
                className="p-10"
                style={{ animation: "solution-step-fade 0.5s ease" }}
              >
                <span className="font-mono text-sm text-empirika-orange">
                  {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">
                  {steps[active].title}
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-white/60">
                  {steps[active].desc}
                </p>

                <div className="mt-8 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-empirika-orange transition-all duration-700 ease-out"
                    style={{ width: `${((active + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet: simple stacked list, no scroll-jacking */}
      <div className="grid grid-cols-1 gap-3 lg:hidden">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="rounded-xl border border-white/10 bg-white/[0.04] p-5"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-empirika-orange/20 text-xs font-bold text-empirika-orange">
                {i + 1}
              </span>
              <p className="text-base font-semibold text-white">{step.title}</p>
            </div>
            <p className="mt-2 pl-10 text-sm leading-relaxed text-white/50">
              {step.desc}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes solution-step-fade {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
