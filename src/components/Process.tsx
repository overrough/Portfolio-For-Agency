"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";

const STEPS = [
  {
    num: "01",
    label: "The Problem",
    title: "Your website is costing you clients",
    body: "Slow load times, generic templates, zero personality. Visitors land, feel nothing, and leave. That's revenue walking out the door every single day.",
    icon: "⚡",
  },
  {
    num: "02",
    label: "Who We Help",
    title: "Small businesses & local brands",
    body: "Local businesses, startups, and ambitious founders who want to look and perform like an enterprise — without the enterprise price tag.",
    icon: "🎯",
  },
  {
    num: "03",
    label: "What We Do",
    title: "3D-native websites that convert",
    body: "We build high-performance websites with real 3D, motion, and AI — Fortune 500 quality, delivered in days at a fraction of the cost.",
    icon: "🔷",
  },
  {
    num: "04",
    label: "How We Do It",
    title: "AI-augmented, shipped in days",
    body: "AI accelerates every step — design, code, copy. You get a premium product in 2–3 days, not months. Fixed price, zero surprises.",
    icon: "🚀",
  },
];

type Step = typeof STEPS[0];

function StepCard({ step, i, total }: { step: Step; i: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRight: "1px solid #1e1e30",
        borderBottom: "1px solid #1e1e30",
        padding: "2.5rem 2rem",
        position: "relative",
        cursor: "default",
        background: hovered ? "rgba(124,90,255,0.04)" : "transparent",
        transition: "background 0.3s ease",
      }}
    >
      {/* Step counter */}
      <div className="t-mono" style={{ fontSize: "0.58rem", color: "#2e2e48", marginBottom: "2rem" }}>
        {step.num} / 0{total}
      </div>

      {/* Icon */}
      <div style={{ fontSize: "1.5rem", marginBottom: "1.2rem", lineHeight: 1 }}>
        {step.icon}
      </div>

      {/* Category */}
      <div
        className="t-mono"
        style={{
          color: hovered ? "#c8f135" : "#7c5aff",
          fontSize: "0.58rem",
          marginBottom: "0.8rem",
          transition: "color 0.3s ease",
        }}
      >
        {step.label}
      </div>

      {/* Title */}
      <h3
        className="t-sub"
        style={{
          color: hovered ? "#eeeaf6" : "#b0adc0",
          marginBottom: "1rem",
          fontSize: "1rem",
          lineHeight: 1.3,
          transition: "color 0.3s ease",
        }}
      >
        {step.title}
      </h3>

      {/* Body */}
      <p className="t-body" style={{ color: "#5a5a7a", lineHeight: 1.75, fontSize: "0.88rem" }}>
        {step.body}
      </p>

      {/* Purple connector dot on right edge (not last) */}
      {i < total - 1 && (
        <div
          style={{
            position: "absolute",
            top: "3.5rem",
            right: "-4px",
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: "#7c5aff",
            opacity: 0.5,
          }}
        />
      )}
    </motion.div>
  );
}

export default function Process() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="process"
      className="section"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 10% 50%, rgba(124,90,255,0.08) 0%, transparent 55%), #05050f",
        borderTop: "1px solid #1e1e30",
      }}
    >
      <div className="container">

        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: "5rem", maxWidth: "680px" }}>
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="t-mono" style={{ color: "#7c5aff", marginBottom: "1.2rem" }}>
              [ HOW IT WORKS ]
            </div>
            <h2 className="t-heading" style={{ color: "#eeeaf6", marginBottom: "1.5rem" }}>
              From problem to<br />
              <span style={{ color: "#c8f135" }}>live in days.</span>
            </h2>
            <p className="t-body" style={{ color: "#7070a0", maxWidth: "500px", lineHeight: 1.8 }}>
              We've stripped every inefficiency out of the traditional agency process. What's left is pure signal.
            </p>
          </motion.div>
        </div>

        {/* Steps grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderLeft: "1px solid #1e1e30",
            borderTop: "1px solid #1e1e30",
          }}
          className="process-grid"
        >
          {STEPS.map((step, i) => (
            <StepCard key={step.num} step={step} i={i} total={STEPS.length} />
          ))}
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .process-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 520px) {
          .process-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
