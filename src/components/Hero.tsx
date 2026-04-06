"use client";

import { motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

const STATS = [
  { value: "3wk", label: "Average delivery" },
  { value: "40+", label: "Projects shipped" },
  { value: "3×", label: "Avg. conversion lift" },
];

function AnimatedWord({ children, delay = 0 }: { children: string; delay?: number }) {
  const shouldReduce = useReducedMotion();
  return (
    <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
      <motion.span
        style={{ display: "inline-block" }}
        initial={shouldReduce ? false : { y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

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
        background: "#080808",
      }}
    >
      {/* Canvas lives on the right side */}
      <div
        style={{
          position: "absolute",
          right: "-5%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "60%",
          height: "90%",
        }}
      >
        <HeroCanvas />
      </div>

      {/* Content on left */}
      <div className="container" style={{ position: "relative", zIndex: 10, paddingTop: "120px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "640px" }}>

          {/* Pre-headline label */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "2.5rem" }}
          >
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c8f135" }} />
            <span className="t-label">Digital Agency — Est. 2024</span>
          </motion.div>

          {/* Main headline - controlled size */}
          <h1 className="t-display" style={{ marginBottom: "1.5rem", color: "#f0ede8" }}>
            <AnimatedWord delay={0.2}>We build</AnimatedWord>{" "}
            <AnimatedWord delay={0.3}>experiences</AnimatedWord>
            <br />
            <AnimatedWord delay={0.4}>
              <em>that close deals.</em>
            </AnimatedWord>
          </h1>

          {/* Sub-headline */}
          <motion.p
            className="t-body"
            style={{ fontSize: "1rem", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: "480px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.75 }}
          >
            High-performance, 3D-native websites and landing pages built 4× faster
            using AI and WebGL. For startups that can't afford to look ordinary.
          </motion.p>

          {/* CTAs */}
          <motion.div
            style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95 }}
          >
            <Link href="#contact" className="btn-primary">
              Book a Free Audit →
            </Link>
            <Link href="#work" className="btn-ghost">
              See Our Work
            </Link>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            style={{
              display: "flex",
              gap: "48px",
              marginTop: "5rem",
              paddingTop: "2.5rem",
              borderTop: "1px solid #222222",
              flexWrap: "wrap",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 400, color: "#f0ede8", lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div className="t-label" style={{ marginTop: "6px" }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Scroll nudge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span className="t-label" style={{ fontSize: "0.6rem" }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: "1px", height: "32px", background: "linear-gradient(to bottom, #c8f135, transparent)" }}
        />
      </motion.div>
    </section>
  );
}
