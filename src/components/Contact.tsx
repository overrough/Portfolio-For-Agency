"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();
  const [hover, setHover] = useState(false);

  return (
    <section id="contact" className="section" style={{ background: "#080808" }}>
      <div className="container" ref={ref}>

        {/* Top row: CTA block */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            padding: "5rem 4rem",
            background: "#0f0f0f",
            border: "1px solid #222222",
            borderRadius: "4px",
            marginBottom: "4rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background grid texture */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            opacity: 0.3,
          }} />

          <div style={{ position: "relative", zIndex: 1, maxWidth: "680px" }}>
            <div className="t-label" style={{ marginBottom: "1.5rem" }}>Ready to start?</div>
            <h2 className="t-heading" style={{ marginBottom: "1.5rem" }}>
              Your competitors<br />
              <em>are already here.</em>
            </h2>
            <p className="t-body" style={{ marginBottom: "2.5rem", maxWidth: "480px" }}>
              Book a free 15-minute site teardown. We'll show you exactly what's costing you leads — no pitch, no pressure.
            </p>

            <a
              href="mailto:hello@elevatewebworks.com"
              className="btn-primary"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              style={{ fontSize: "0.9rem", padding: "1rem 2.5rem" }}
            >
              {hover ? "hello@elevatewebworks.com" : "Book a Free Teardown →"}
            </a>
          </div>

          {/* Decorative accent */}
          <div style={{
            position: "absolute",
            bottom: "-60px",
            right: "-60px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(200,241,53,0.12) 0%, transparent 70%)",
          }} />
        </motion.div>

        {/* Footer row */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            paddingTop: "2rem",
            borderTop: "1px solid #222222",
          }}
        >
          <span className="t-label">© 2026 Elevate Web Works. All rights reserved.</span>

          <div style={{ display: "flex", gap: "32px" }}>
            {["Twitter", "GitHub", "LinkedIn", "Dribbble"].map((link) => (
              <a
                key={link}
                href="#"
                className="t-label"
                style={{ textDecoration: "none", transition: "color 0.2s ease", color: "#6b6b6b" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#f0ede8")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#6b6b6b")}
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
