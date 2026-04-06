"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const PROJECTS = [
  {
    index: "01",
    title: "Alandi City Broadband",
    category: "High-Fidelity Landing Page",
    year: "2026",
    outcome: "+40% demo bookings",
    description:
      "Redesigned an enterprise ISP's portal from scratch — dynamic pricing tables, scroll-driven animations, and a mobile-first checkout with 42% drop‑off reduction.",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
  },
  {
    index: "02",
    title: "Eggplant Battle Engine",
    category: "Browser Game UI",
    year: "2025",
    outcome: "+120% session retention",
    description:
      "Built a mobile-style browser game with a hybrid Canvas/DOM architecture — real-time HUD, animated troop formations, and a deep-sea visual aesthetic.",
    tags: ["Canvas API", "TypeScript", "Web Audio"],
  },
  {
    index: "03",
    title: "BCA Moto Store",
    category: "E-Commerce Experience",
    year: "2024",
    outcome: "+60% product page engagement",
    description:
      "Revamped a motorcycle parts retailer with an editorial-style product grid, parallax image reveals, and one-click configurator.",
    tags: ["React", "Commerce", "3D previews"],
  },
];

type Project = typeof PROJECTS[0];

function ProjectCard({ project, i }: { project: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();

  return (
    <motion.article
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        borderBottom: "1px solid #222222",
        padding: "3.5rem 0",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "3rem",
        alignItems: "start",
      }}
      className="project-card"
    >
      {/* Left: meta + title */}
      <div>
        <div style={{ display: "flex", align: "center", gap: "16px", marginBottom: "1.5rem" }}>
          <span className="t-label">{project.index}</span>
          <span className="t-label" style={{ color: "#333333" }}>—</span>
          <span className="t-label" style={{ color: "#333333" }}>{project.category}</span>
          <span className="t-label" style={{ marginLeft: "auto", color: "#333333" }}>{project.year}</span>
        </div>

        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 400, color: "#f0ede8", lineHeight: 1.1, marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
          {project.title}
        </h3>

        {/* Outcome pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            border: "1px solid rgba(200, 241, 53, 0.3)",
            borderRadius: "2px",
            background: "rgba(200, 241, 53, 0.05)",
          }}
        >
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#c8f135" }} />
          <span className="t-label" style={{ color: "#c8f135" }}>{project.outcome}</span>
        </div>
      </div>

      {/* Right: description + tags */}
      <div>
        <p className="t-body" style={{ marginBottom: "2rem", lineHeight: 1.8 }}>
          {project.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="t-label"
              style={{
                padding: "4px 12px",
                border: "1px solid #222222",
                borderRadius: "2px",
                color: "#6b6b6b",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Work() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });
  const shouldReduce = useReducedMotion();

  return (
    <section id="work" className="section">
      <div className="container">

        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: "1.5rem" }}>
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}
          >
            <div>
              <div className="t-label" style={{ marginBottom: "1rem" }}>Selected work</div>
              <h2 className="t-heading">
                Results,<br />
                <em>not promises.</em>
              </h2>
            </div>
            <a href="#contact" className="btn-ghost" style={{ alignSelf: "flex-end" }}>Start a project →</a>
          </motion.div>
        </div>

        {/* Project list */}
        <div style={{ borderTop: "1px solid #222222" }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.index} project={project} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
