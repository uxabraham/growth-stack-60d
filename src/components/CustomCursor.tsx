"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, summary, label, [data-cursor-hover]';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const el = dotRef.current;
    if (!el) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let raf: number | null = null;

    // Offset so the icon trails just beside the native pointer, not on top of it.
    const OFFSET_X = 18;
    const OFFSET_Y = 22;

    function render() {
      raf = null;
      if (el) el.style.transform = `translate3d(${x + OFFSET_X}px, ${y + OFFSET_Y}px, 0)`;
    }

    function onMove(e: MouseEvent) {
      x = e.clientX;
      y = e.clientY;
      if (raf == null) raf = requestAnimationFrame(render);

      const target = e.target as Element | null;
      const isHover = !!target?.closest(INTERACTIVE_SELECTOR);
      el!.classList.toggle("is-hover", isHover);
    }

    function onLeave() {
      el!.classList.add("is-hidden");
    }

    function onEnter() {
      el!.classList.remove("is-hidden");
    }

    function onDown() {
      el!.classList.add("is-down");
    }

    function onUp() {
      el!.classList.remove("is-down");
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={dotRef} className="custom-cursor is-hidden" aria-hidden>
      <img src="/brand/cursor-ek.png" alt="" draggable={false} />
    </div>
  );
}
