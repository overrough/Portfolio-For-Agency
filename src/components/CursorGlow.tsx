"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    // Glow lags behind with lerp
    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.left = `${currentX}px`;
        glowRef.current.style.top = `${currentY}px`;
      }

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Large soft glow */}
      <div
        ref={glowRef}
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9997,
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,241,53,0.035) 0%, transparent 65%)",
          transform: "translate(-50%, -50%)",
          top: 0,
          left: 0,
          willChange: "left, top",
        }}
      />
      {/* Small precise dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9999,
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: "#c8f135",
          transform: "translate(-50%, -50%)",
          top: 0,
          left: 0,
          opacity: 0.7,
          willChange: "left, top",
        }}
      />
    </>
  );
}
