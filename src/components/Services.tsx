"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";

const SERVICES = [
  {
    number: "01",
    title: "3D Web Experiences",
    body: "React Three Fiber scenes, custom shaders, and WebGL environments that stop visitors mid-scroll and turn curiosity into action.",
    tag: "WebGL · R3F · Three.js",
    accent: "rgba(200,241,53,0.06)",
  },
  {
    number: "02",
    title: "Landing Pages That Convert",
    body: "Data-driven pages built with A/B-ready architecture, scroll-driven animations, and embedded analytics — designed to turn traffic into revenue.",
    tag: "Next.js · Analytics · CRO",
    accent: "rgba(200,241,53,0.05)",
  },
  {
    number: "03",
    title: "AI-Powered Web Apps",
    body: "Dynamic experiences generated from your product data, personalised by user segment, and deployed within days — not months.",
    tag: "Generative UI · Vercel AI · Edge",
    accent: "rgba(200,241,53,0.06)",
  },
  {
    number: "04",
    title: "Brand & Motion Systems",
    body: "Design tokens, animation systems, and component libraries your whole team can own, extend, and ship with — without us in the loop.",
    tag: "Framer Motion · Figma · DS",
    accent: "rgba(200,241,53,0.05)",
  },
];

function ServiceCard({ s, i }: { s: typeof SERVICES[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setTilt({
      x: ((e.clientY - r.top) / r.height - 0.5) * -6,
      y: ((e.clientX - r.left) / r.width - 0.5) * 6,
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      onMouseMove={handleMove}
      style={{
        background: hovered ? s.accent : "transparent",
        border: `1px solid ${hovered ? "rgba(200,241,53,0.2)" : "#1e1e30"}`,
        borderRadius: "4px",
        padding: "2.5rem",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.35s ease, border-color 0.35s ease",
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        willChange: "transform",
        cursor: "default",
      }}
    >
      {/* Left accent bar on hover */}
      <motion.div
        animate={{ scaleY: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          left: 0, top: "20%", bottom: "20%",
          width: "2px",
          background: "#c8f135",
          transformOrigin: "top",
          borderRadius: "0 2px 2px 0",
        }}
      />

      {/* Number */}
      <div
        className="t-mono"
        style={{
          color: hovered ? "#c8f135" : "#2a2a36",
          marginBottom: "1.5rem",
          transition: "color 0.3s ease",
          fontSize: "0.62rem",
        }}
      >
        [{s.number}]
      </div>

      {/* Title */}
      <h3
        className="t-sub"
        style={{
          color: hovered ? "#f0ede8" : "#b0adb8",
          marginBottom: "1rem",
          transition: "color 0.3s ease",
        }}
      >
        {s.title}
      </h3>

      {/* Body */}
      <p className="t-body" style={{ marginBottom: "2rem", lineHeight: 1.75 }}>
        {s.body}
      </p>

      {/* Tag */}
      <div
        className="t-mono"
        style={{
          color: hovered ? "rgba(200,241,53,0.7)" : "#2a2a36",
          transition: "color 0.35s ease",
          fontSize: "0.6rem",
        }}
      >
        {s.tag}
      </div>

      {/* Arrow */}
      <motion.div
        animate={{ x: hovered ? 4 : 0, y: hovered ? -4 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: "absolute",
          top: "2.5rem",
          right: "2.5rem",
          color: "#c8f135",
          fontSize: "1.1rem",
          lineHeight: 1,
        }}
      >
        ↗
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="services"
      className="section"
      style={{
        background:
          "radial-gradient(ellipse 90% 60% at 95% 5%, rgba(200,241,53,0.06) 0%, transparent 55%), #05050f",
        borderTop: "1px solid #1e1e30",
      }}
    >
      <div className="container">

        {/* Header */}
        <div
          ref={headerRef}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "4rem",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="t-mono" style={{ color: "#c8f135", marginBottom: "1.2rem" }}>
              [ WHAT WE DO ]
            </div>
            <h2 className="t-heading" style={{ color: "#f0ede8" }}>
              Precision tools<br />
              <span style={{ color: "#c8f135" }}>for modern growth.</span>
            </h2>
          </motion.div>

          <motion.p
            className="t-body"
            style={{ maxWidth: "280px", color: "#4a4a5a" }}
            initial={shouldReduce ? false : { opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            No retainers. No surprises. Every engagement has a fixed scope, delivery date, and measurable outcome.
          </motion.p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.5px",
            background: "#1e1e30",
            borderRadius: "6px",
            overflow: "hidden",
          }}
          className="services-grid"
        >
          {SERVICES.map((s, i) => (
            <div key={s.number} style={{ background: "#05050f" }}>
              <ServiceCard s={s} i={i} />
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
          /* Stack header vertically on mobile */
          .services-header {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .services-header p {
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
