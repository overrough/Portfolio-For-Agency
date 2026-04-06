"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const SERVICES = [
  {
    number: "01",
    title: "3D Web Experiences",
    body: "React Three Fiber scenes, custom shaders, and WebGL environments that stop visitors mid-scroll.",
    tag: "WebGL · R3F · Three.js",
  },
  {
    number: "02",
    title: "SaaS Conversion Funnels",
    body: "Data-driven landing pages with A/B-ready component architecture and embedded analytics hooks.",
    tag: "Next.js · Analytics · CRO",
  },
  {
    number: "03",
    title: "AI-Powered Landing Pages",
    body: "Dynamic pages generated from your product data, personalised by segment, deployed in days.",
    tag: "Generative UI · Vercel AI · Edge",
  },
  {
    number: "04",
    title: "Brand & Motion Systems",
    body: "Design tokens, animation systems, and component libraries your team can scale without us.",
    tag: "Framer Motion · Figma · DS",
  },
];

function ServiceRow({ s, i }: { s: typeof SERVICES[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        display: "grid",
        gridTemplateColumns: "56px 1fr auto",
        gap: "24px",
        alignItems: "start",
        padding: "2.5rem 0",
        borderBottom: "1px solid #222222",
        cursor: "default",
        transition: "background 0.3s ease",
      }}
      className="service-row"
      onMouseEnter={(e) => (e.currentTarget.style.background = "#0f0f0f")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {/* Number */}
      <span className="t-label" style={{ paddingTop: "4px", color: "#333" }}>{s.number}</span>

      {/* Main content */}
      <div>
        <h3 className="t-sub" style={{ color: "#f0ede8", marginBottom: "0.6rem" }}>{s.title}</h3>
        <p className="t-body" style={{ maxWidth: "520px" }}>{s.body}</p>
      </div>

      {/* Tag / arrow */}
      <div style={{ textAlign: "right", paddingTop: "2px", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px" }}>
        <span className="t-label" style={{ color: "#333" }}>{s.tag}</span>
        <span style={{ color: "#c8f135", fontSize: "1.1rem" }}>↗</span>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });
  const shouldReduce = useReducedMotion();

  return (
    <section id="services" className="section" style={{ borderTop: "1px solid #222222" }}>
      <div className="container">

        {/* Section header */}
        <div ref={headerRef} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="t-label" style={{ marginBottom: "1rem" }}>What we do</div>
            <h2 className="t-heading">
              Precision tools for<br />
              <em>modern growth.</em>
            </h2>
          </motion.div>

          <motion.p
            className="t-body"
            style={{ maxWidth: "300px" }}
            initial={shouldReduce ? false : { opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We don't do retainers. We do results. Each engagement has a clear scope, delivery date, and measurable outcome.
          </motion.p>
        </div>

        {/* Service rows */}
        <div style={{ borderTop: "1px solid #222222" }}>
          {SERVICES.map((s, i) => (
            <ServiceRow key={s.number} s={s} i={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
