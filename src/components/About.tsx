"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const FACTS = [
  {
    q: "How fast do we ship?",
    a: "Most projects are live in 2–3 days, not 2–3 months. We move fast because we stay lean.",
  },
  {
    q: "What's the cost?",
    a: "Fixed-price engagements — no hourly billing, no scope creep. You know exactly what you're paying before we start.",
  },
  {
    q: "Who do we work with?",
    a: "Small businesses, local brands, and ambitious founders who want to look and perform like an enterprise.",
  },
  {
    q: "What makes us different?",
    a: "Founder-led. AI-augmented. WebGL-native. We don't outsource and we don't cut corners.",
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="about"
      className="section"
      style={{
        background:
          "radial-gradient(ellipse 70% 80% at 100% 50%, rgba(80,60,200,0.07) 0%, transparent 55%), linear-gradient(170deg, #0c0c1a 0%, #080810 100%)",
        borderTop: "1px solid #1e1e2a",
        borderBottom: "1px solid #1e1e2a",
      }}
    >
      <div className="container">
        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6rem",
            alignItems: "start",
          }}
          className="about-grid"
        >

          {/* ── Left: story ── */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="t-mono" style={{ color: "#c8f135", marginBottom: "1.5rem" }}>
              [ STUDIO ]
            </div>

            <h2 className="t-heading" style={{ marginBottom: "2.5rem", color: "#f0ede8" }}>
              The anti-<br />
              <span style={{ color: "#c8f135" }}>agency.</span>
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
              <p className="t-body" style={{ color: "#5a5a6a", lineHeight: 1.8 }}>
                Most agencies pad timelines, outsource execution, and deliver Webflow templates with a premium markup.
              </p>
              <p className="t-body" style={{ color: "#5a5a6a", lineHeight: 1.8 }}>
                We operate differently. Founder-led. AI-augmented. WebGL-native. Every project gets full focus — because we only take a few at a time.
              </p>
              <p className="t-body" style={{ color: "#5a5a6a", lineHeight: 1.8 }}>
                We ship fast because we're leaner, not lazier.
              </p>
            </div>

            {/* Availability */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                marginTop: "2.8rem",
                padding: "10px 20px",
                border: "1px solid rgba(200,241,53,0.2)",
                borderRadius: "2px",
                background: "rgba(200,241,53,0.04)",
              }}
            >
              <motion.div
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 2.2, repeat: Infinity }}
                style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c8f135", flexShrink: 0 }}
              />
              <span className="t-mono" style={{ color: "#c8f135", fontSize: "0.62rem" }}>
                Taking on new projects — Est. 2026
              </span>
            </div>
          </motion.div>

          {/* ── Right: FAQ ── */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="t-mono" style={{ color: "#2a2a3e", marginBottom: "1.5rem" }}>
              [ FAQ ]
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {FACTS.map((fact, i) => (
                <motion.div
                  key={i}
                  initial={shouldReduce ? false : { opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
                  style={{
                    padding: "1.6rem 0",
                    borderBottom: i < FACTS.length - 1 ? "1px solid #1a1a28" : "none",
                  }}
                >
                  <div
                    className="t-sub"
                    style={{ color: "#f0ede8", marginBottom: "0.6rem", fontSize: "0.95rem", fontWeight: 600 }}
                  >
                    {fact.q}
                  </div>
                  <p className="t-body" style={{ color: "#4a4a5a", lineHeight: 1.75 }}>
                    {fact.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
