"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";

const SOCIALS = ["Twitter", "GitHub", "LinkedIn", "Dribbble"];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();
  const [hover, setHover] = useState(false);

  return (
    <section
      id="contact"
      className="section"
      style={{
        background:
          "radial-gradient(ellipse 100% 55% at 50% -5%, rgba(200,241,53,0.11) 0%, transparent 55%), #060608",
        borderTop: "1px solid #1e1e2a",
      }}
    >
      <div className="container" ref={ref}>

        {/* ── Main CTA block ── */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            padding: "6rem 5rem",
            background: "linear-gradient(135deg, #0d0d18 0%, #0a0a12 100%)",
            border: "1px solid #1e1e2a",
            borderRadius: "6px",
            marginBottom: "4rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Grid texture */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />

          {/* Chartreuse glow orb */}
          <div
            style={{
              position: "absolute",
              bottom: "-80px",
              right: "-80px",
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(200,241,53,0.1) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1, maxWidth: "700px" }}>
            <div className="t-mono" style={{ color: "#c8f135", marginBottom: "1.5rem" }}>
              [ READY TO START? ]
            </div>

            <h2
              className="t-heading"
              style={{ marginBottom: "1.8rem", color: "#f0ede8", lineHeight: 1.0 }}
            >
              Your competitors<br />
              <span style={{ color: "#c8f135" }}>are already here.</span>
            </h2>

            <p
              className="t-body"
              style={{ marginBottom: "3rem", maxWidth: "480px", color: "#5a5a6a", lineHeight: 1.75 }}
            >
              Book a free 15-minute site teardown. We'll show you exactly what's
              costing you leads — no pitch, no pressure.
            </p>

            {/* Email CTA */}
            <motion.a
              href="mailto:elevatewebwork8@gmail.com"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "1rem 2.5rem",
                background: hover ? "#d4f545" : "#c8f135",
                color: "#060608",
                fontFamily: "var(--font-display)",
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: "2px",
                transition: "background 0.2s ease",
                boxShadow: hover
                  ? "0 0 40px rgba(200,241,53,0.4)"
                  : "0 0 20px rgba(200,241,53,0.15)",
              }}
            >
              {hover ? "elevatewebwork8@gmail.com" : "Book a Free Teardown →"}
            </motion.a>
          </div>
        </motion.div>

        {/* ── Footer strip ── */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            paddingTop: "2rem",
            borderTop: "1px solid #1a1a24",
          }}
        >
          <span className="t-mono" style={{ color: "#2a2a36", fontSize: "0.62rem" }}>
            © 2026 Elevate Web Works. All rights reserved.
          </span>

          <div style={{ display: "flex", gap: "28px" }}>
            {SOCIALS.map((link) => (
              <a
                key={link}
                href="#"
                className="t-mono"
                style={{
                  textDecoration: "none",
                  color: "#2a2a36",
                  fontSize: "0.62rem",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#c8f135")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#2a2a36")}
              >
                {link}
              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
