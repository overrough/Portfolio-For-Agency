"use client";

import { motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

const STATS = [
  { num: 3,    suffix: "d",  label: "Avg. delivery" },
  { num: 5,    suffix: "★",  label: "Client rating" },
  { num: 2026, suffix: "",   label: "Est." },
];

const TICKER = [
  "NEXT.JS", "WEBGL", "THREE.JS", "FRAMER MOTION",
  "3D EXPERIENCES", "REACT", "TAILWIND", "TYPESCRIPT",
  "AI-POWERED", "PERFORMANCE", "CONVERSION",
];

/* ── Magnetic anchor ─────────────────────────── */
function MagneticLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const shouldReduce = useReducedMotion();

  const handleMouse = (e: React.MouseEvent) => {
    if (shouldReduce || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - (left + width / 2)) * 0.28,
      y: (e.clientY - (top + height / 2)) * 0.28,
    });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={variant === "primary" ? "btn-primary" : "btn-ghost"}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 220, damping: 22, mass: 0.1 }}
    >
      {children}
    </motion.a>
  );
}

/* ── Count-up stat ───────────────────────────── */
function Stat({ num, suffix, label }: { num: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce || num >= 100) { setCount(num); return; }
    const t = setTimeout(() => {
      const dur = 1200;
      const t0 = Date.now();
      const tick = () => {
        const p = Math.min((Date.now() - t0) / dur, 1);
        setCount(Math.round((1 - Math.pow(1 - p, 4)) * num));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, 1400);
    return () => clearTimeout(t);
  }, [num, shouldReduce]);

  return (
    <div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)",
          fontWeight: 800,
          color: "#f0ede8",
          lineHeight: 1,
          letterSpacing: "-0.03em",
        }}
      >
        {count}{suffix}
      </div>
      <div className="t-mono" style={{ marginTop: "6px", color: "#444" }}>{label}</div>
    </div>
  );
}

/* ── Hero ────────────────────────────────────── */
export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        background: "radial-gradient(ellipse 80% 60% at 65% 50%, rgba(200,241,53,0.04) 0%, transparent 60%), #060608",
      }}
    >
      {/* 3D scene */}
      <div
        style={{
          position: "absolute",
          right: "-5%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "58%",
          height: "88%",
        }}
      >
        <HeroCanvas />
      </div>

      {/* Text content */}
      <div
        className="container"
        style={{ position: "relative", zIndex: 10, paddingTop: "130px", paddingBottom: "110px" }}
      >
        <div style={{ maxWidth: "660px" }}>

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "2.8rem" }}
          >
            <motion.div
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#c8f135", flexShrink: 0 }}
            />
            <span className="t-mono" style={{ color: "#c8f135" }}>
              Elevate Web Works — Digital Studio
            </span>
          </motion.div>

          {/* Headline — line-by-line reveal */}
          <h1 className="t-display" style={{ marginBottom: "2rem" }}>
            {["We build", "experiences", "that close deals."].map((line, i) => (
              <span key={i} style={{ display: "block", overflow: "hidden", lineHeight: "1.0" }}>
                <motion.span
                  style={{ display: "block" }}
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.95, delay: 0.2 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}
                >
                  {i === 1 ? (
                    <em style={{ fontStyle: "italic", color: "#c8f135" }}>{line}</em>
                  ) : line}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Sub-copy */}
          <motion.p
            className="t-body"
            style={{
              fontSize: "clamp(0.95rem, 1.15vw, 1.1rem)",
              lineHeight: 1.75,
              marginBottom: "3rem",
              maxWidth: "460px",
              color: "#5a5a6a",
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.72 }}
          >
            High-performance, 3D-native websites built in days — not months.
            For businesses that can't afford to look ordinary.
          </motion.p>

          {/* CTAs */}
          <motion.div
            style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <MagneticLink href="#contact">Book a Free Audit →</MagneticLink>
            <MagneticLink href="#work" variant="ghost">See Our Work</MagneticLink>
          </motion.div>

          {/* Stats */}
          <motion.div
            style={{
              display: "flex",
              gap: "52px",
              marginTop: "5rem",
              paddingTop: "2.5rem",
              borderTop: "1px solid #1e1e2a",
              flexWrap: "wrap",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            {STATS.map((s) => <Stat key={s.label} {...s} />)}
          </motion.div>
        </div>
      </div>

      {/* Marquee ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: "1px solid #1a1a24",
          padding: "11px 0",
          overflow: "hidden",
          background: "rgba(6,6,8,0.85)",
          backdropFilter: "blur(12px)",
          zIndex: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            animation: "ticker 28s linear infinite",
            whiteSpace: "nowrap",
            willChange: "transform",
          }}
        >
          {[...TICKER, ...TICKER].map((item, i) => (
            <span
              key={i}
              className="t-mono"
              style={{
                display: "inline-block",
                padding: "0 2.2rem",
                color: i % 5 === 0 ? "#c8f135" : "#2a2a36",
                fontSize: "0.62rem",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        style={{
          position: "absolute",
          bottom: "4rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span className="t-mono" style={{ fontSize: "0.55rem", color: "#2a2a36" }}>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "36px",
            background: "linear-gradient(to bottom, #c8f135, transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
