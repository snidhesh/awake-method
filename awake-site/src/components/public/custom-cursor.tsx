"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable on devices with a fine pointer (no touch)
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(
        !!t.closest("a, button, [role='button'], input, textarea, select, label, [data-cursor-hover]")
      );
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    // Animate the ring with eased lag
    let raf: number;
    const tick = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("custom-cursor");
      cancelAnimationFrame(raf);
    };
  }, [visible]);

  if (!enabled) return null;

  return (
    <>
      {/* Inner dot — follows mouse exactly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          borderRadius: "50%",
          backgroundColor: "#e8185c",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />
      {/* Outer ring — follows with smooth lag, expands on interactive elements */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          marginLeft: hovering ? -24 : -16,
          marginTop: hovering ? -24 : -16,
          borderRadius: "50%",
          border: `1.5px solid rgba(232, 24, 92, ${hovering ? 0.55 : 0.3})`,
          backgroundColor: hovering ? "rgba(232, 24, 92, 0.06)" : "transparent",
          opacity: visible ? 1 : 0,
          transition:
            "width 0.25s ease, height 0.25s ease, margin 0.25s ease, border-color 0.25s, background-color 0.25s, opacity 0.3s",
        }}
      />
    </>
  );
}
