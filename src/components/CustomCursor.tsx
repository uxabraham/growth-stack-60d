"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, summary, label, [data-cursor-hover]';

// Icon trails just beside the native pointer, not on top of it.
const OFFSET_X = 18;
const OFFSET_Y = 22;

export default function CustomCursor() {
  const iconRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const icon = iconRef.current;
    const glow = glowRef.current;
    if (!icon || !glow) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let iconX = targetX;
    let iconY = targetY;
    let glowX = targetX;
    let glowY = targetY;
    let hasMoved = false;
    let raf = 0;

    function loop() {
      // Icon eases toward the pointer; the glow eases toward the icon a
      // little slower, so it trails like a light source lagging its source.
      iconX += (targetX + OFFSET_X - iconX) * 0.3;
      iconY += (targetY + OFFSET_Y - iconY) * 0.3;
      glowX += (iconX - glowX) * 0.12;
      glowY += (iconY - glowY) * 0.12;

      icon!.style.transform = `translate3d(${iconX.toFixed(1)}px, ${iconY.toFixed(1)}px, 0) translate(-50%, -50%)`;
      glow!.style.transform = `translate3d(${glowX.toFixed(1)}px, ${glowY.toFixed(1)}px, 0) translate(-50%, -50%)`;

      raf = requestAnimationFrame(loop);
    }

    function onMove(e: MouseEvent) {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        iconX = targetX + OFFSET_X;
        iconY = targetY + OFFSET_Y;
        glowX = iconX;
        glowY = iconY;
        icon!.classList.remove("is-hidden");
        glow!.classList.remove("is-hidden");
      }

      const target = e.target as Element | null;
      const isHover = !!target?.closest(INTERACTIVE_SELECTOR);
      icon!.classList.toggle("is-hover", isHover);
      glow!.classList.toggle("is-hover", isHover);
    }

    function onLeave() {
      icon!.classList.add("is-hidden");
      glow!.classList.add("is-hidden");
    }

    function onEnter() {
      if (!hasMoved) return;
      icon!.classList.remove("is-hidden");
      glow!.classList.remove("is-hidden");
    }

    function onDown() {
      icon!.classList.add("is-down");
      glow!.classList.add("is-down");
    }

    function onUp() {
      icon!.classList.remove("is-down");
      glow!.classList.remove("is-down");
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow is-hidden" aria-hidden />
      <div ref={iconRef} className="custom-cursor is-hidden" aria-hidden>
        <img src="/brand/cursor-ek.png" alt="" draggable={false} />
      </div>
    </>
  );
}
