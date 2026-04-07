"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";

const PROJECTS = [
  {
    index: "01",
    title: "Alandi City Broadband",
    category: "High-Fidelity Landing Page",
    year: "2026",
    outcome: "+40% demo bookings",
    description:
      "Redesigned an enterprise ISP's portal from scratch — dynamic pricing tables, scroll-driven animations, and a mobile-first layout with a 42% drop-off reduction.",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
    link: "https://alandi.vercel.app/#contact",
  },
  {
    index: "02",
    title: "JRK Auto Parts",
    category: "E-Commerce Experience",
    year: "2025",
    outcome: "+55% product engagement",
    description:
      "Built a high-performance auto parts store with a fast product catalog, streamlined checkout, and a mobile-first design that cut cart abandonment significantly.",
    tags: ["React", "Commerce", "Performance"],
    link: "https://jrkstore.vercel.app/",
  },
];

type Project = (typeof PROJECTS)[0];

function ProjectRow({ project, i }: { project: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderBottom: "1px solid #1e1e2a",
        padding: "4rem 0",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "3rem",
        alignItems: "start",
        position: "relative",
      }}
      className="project-row"
    >
      {/* Hover left accent */}
      <motion.div
        animate={{ scaleY: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          left: "-1px",
          top: "10%",
          bottom: "10%",
          width: "2px",
          background: "linear-gradient(to bottom, transparent, #c8f135, transparent)",
          transformOrigin: "center",
          borderRadius: "2px",
        }}
      />

      {/* Left: meta + title */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "1.5rem",
          }}
        >
          <span className="t-mono" style={{ color: hovered ? "#c8f135" : "#2a2a36", transition: "color 0.3s", fontSize: "0.62rem" }}>
            [{project.index}]
          </span>
          <span className="t-mono" style={{ color: "#1e1e2a", fontSize: "0.62rem" }}>—</span>
          <span className="t-mono" style={{ color: "#2a2a36", fontSize: "0.62rem" }}>{project.category}</span>
          <span className="t-mono" style={{ marginLeft: "auto", color: "#2a2a36", fontSize: "0.62rem" }}>{project.year}</span>
        </div>

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
            fontWeight: 700,
            color: hovered ? "#f0ede8" : "#9090a0",
            lineHeight: 1.05,
            marginBottom: "1.5rem",
            letterSpacing: "-0.02em",
            transition: "color 0.35s ease",
          }}
        >
          {project.title}
        </h3>

        {/* Outcome pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: hovered ? "rgba(200,241,53,0.4)" : "rgba(200,241,53,0.15)",
            borderRadius: "2px",
            background: hovered ? "rgba(200,241,53,0.08)" : "rgba(200,241,53,0.03)",
            transition: "all 0.3s ease",
          }}
        >
          <motion.div
            animate={{ opacity: hovered ? [1, 0.3, 1] : 1 }}
            transition={{ duration: 1.2, repeat: hovered ? Infinity : 0 }}
            style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#c8f135", flexShrink: 0 }}
          />
          <span className="t-mono" style={{ color: "#c8f135", fontSize: "0.6rem" }}>{project.outcome}</span>
        </div>
      </div>

      {/* Right: description + tags + link */}
      <div>
        <p className="t-body" style={{ marginBottom: "2rem", lineHeight: 1.8, color: "#4a4a5a" }}>
          {project.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "2.2rem" }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="t-mono"
              style={{
                padding: "5px 12px",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: hovered ? "#2e2e3a" : "#1e1e2a",
                borderRadius: "2px",
                color: hovered ? "#6b6b8a" : "#2e2e3a",
                fontSize: "0.6rem",
                transition: "border-color 0.3s ease, color 0.3s ease",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <motion.a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          animate={{ x: hovered ? 5 : 0 }}
          transition={{ duration: 0.25 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.65rem 1.6rem",
            background: "transparent",
            color: hovered ? "#c8f135" : "#f0ede8",
            fontFamily: "var(--font-display)",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: hovered ? "rgba(200,241,53,0.5)" : "#2e2e3a",
            borderRadius: "2px",
            textDecoration: "none",
            transition: "color 0.25s ease, border-color 0.25s ease",
          }}
        >
          View Live ↗
        </motion.a>
      </div>
    </motion.article>
  );
}

export default function Work() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="work"
      className="section"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 5% 95%, rgba(200,241,53,0.04) 0%, transparent 55%), #060608",
        borderTop: "1px solid #1e1e2a",
      }}
    >
      <div className="container">

        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: "1rem" }}>
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <div>
              <div className="t-mono" style={{ color: "#c8f135", marginBottom: "1.2rem" }}>
                [ SELECTED WORK ]
              </div>
              <h2 className="t-heading" style={{ color: "#f0ede8" }}>
                Results,<br />
                <span style={{ color: "#c8f135" }}>not promises.</span>
              </h2>
            </div>
            <a href="#contact" className="btn-ghost" style={{ alignSelf: "flex-end" }}>
              Start a Project →
            </a>
          </motion.div>
        </div>

        {/* Project list */}
        <div style={{ borderTop: "1px solid #1e1e2a" }}>
          {PROJECTS.map((project, i) => (
            <ProjectRow key={project.index} project={project} i={i} />
          ))}
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .project-row {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
