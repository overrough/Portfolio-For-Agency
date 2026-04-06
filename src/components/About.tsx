"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const FACTS = [
  { q: "How fast?", a: "Most projects ship in 2–3 weeks, not 3 months." },
  { q: "What's the cost?", a: "Fixed-price engagements from £3k. No hourly surprises." },
  { q: "Who do you work with?", a: "Funded startups, SaaS teams, and ambitious founders." },
  { q: "What makes you different?", a: "We have a 3D-native stack and AI acceleration baked in from day one — not as an afterthought." },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  return (
    <section id="about" className="section" style={{ background: "#0f0f0f", borderTop: "1px solid #222222", borderBottom: "1px solid #222222" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6rem",
            alignItems: "start",
          }}
          className="about-grid"
          ref={ref}
        >
          {/* Left: story */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="t-label" style={{ marginBottom: "1.5rem" }}>Studio</div>
            <h2 className="t-heading" style={{ marginBottom: "2rem" }}>
              We're the<br />
              <em>anti-agency.</em>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <p className="t-body">
                Most agencies pad timelines, outsource execution, and deliver Webflow templates with a premium markup. We operate differently.
              </p>
              <p className="t-body">
                Two engineers, one designer. AI-assisted development. WebGL-first thinking. We ship fast because we're leaner, not lazier.
              </p>
              <p className="t-body">
                Every project gets our full attention — because we only take three at a time.
              </p>
            </div>

            {/* Availability tag */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "2.5rem",
                padding: "10px 18px",
                border: "1px solid #222222",
                borderRadius: "2px",
              }}
            >
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c8f135" }}
              />
              <span className="t-label" style={{ color: "#f0ede8" }}>Available for Q2 2026 projects</span>
            </div>
          </motion.div>

          {/* Right: FAQ */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="t-label" style={{ marginBottom: "1.5rem" }}>FAQ</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {FACTS.map((fact, i) => (
                <div
                  key={i}
                  style={{
                    padding: "1.5rem 0",
                    borderBottom: i < FACTS.length - 1 ? "1px solid #222222" : "none",
                  }}
                >
                  <div className="t-sub" style={{ color: "#f0ede8", marginBottom: "0.5rem", fontSize: "0.95rem" }}>{fact.q}</div>
                  <p className="t-body">{fact.a}</p>
                </div>
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
