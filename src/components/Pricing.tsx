"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import FlipText from "./FlipText";

const PLANS = [
  {
    name: "Starter",
    tag: "Perfect for local businesses",
    price: "₹15,000",
    usd: "~$180",
    timeline: "2–3 days",
    features: [
      "1-page landing page",
      "Mobile-first responsive design",
      "Contact form integration",
      "Basic scroll animations",
      "Deployed on Vercel + custom domain",
      "1 revision round",
      "1 week of post-launch support",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Growth",
    tag: "Most popular",
    price: "₹35,000",
    usd: "~$420",
    timeline: "3–5 days",
    features: [
      "Multi-page website (up to 5)",
      "3D hero section / WebGL element",
      "Framer Motion animations",
      "SEO-optimized structure",
      "Analytics integration",
      "CMS-ready (Sanity / Notion)",
      "2 revision rounds",
    ],
    cta: "Book Now →",
    highlight: true,
  },
  {
    name: "Premium",
    tag: "Full agency experience",
    price: "₹70,000+",
    usd: "~$840+",
    timeline: "7–10 days",
    features: [
      "Full custom web app",
      "Advanced 3D / WebGL scenes",
      "AI-powered features",
      "E-commerce integration",
      "Performance optimization",
      "Custom design system",
      "Priority support — 30 days",
    ],
    cta: "Let's Talk →",
    highlight: false,
  },
];

function PlanCard({ plan, i }: { plan: typeof PLANS[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: plan.highlight
          ? hovered ? "#c8f135" : "rgba(200,241,53,0.4)"
          : hovered ? "#2e2e48" : "#1e1e30",
        borderRadius: "6px",
        padding: "2.5rem",
        background: plan.highlight
          ? "linear-gradient(145deg, #0e0e20 0%, #0b0b18 100%)"
          : "#05050f",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        boxShadow: plan.highlight
          ? hovered
            ? "0 0 48px rgba(200,241,53,0.15)"
            : "0 0 24px rgba(200,241,53,0.07)"
          : "none",
        overflow: "hidden",
      }}
    >
      {/* Popular badge */}
      {plan.highlight && (
        <div
          style={{
            position: "absolute",
            top: "1.4rem",
            right: "1.4rem",
            padding: "3px 10px",
            background: "#c8f135",
            borderRadius: "2px",
            color: "#05050f",
            fontFamily: "var(--font-display)",
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Most Popular
        </div>
      )}

      {/* Glow top line for highlight card */}
      {plan.highlight && (
        <div
          style={{
            position: "absolute",
            top: 0, left: "10%", right: "10%",
            height: "1px",
            background: "linear-gradient(to right, transparent, #c8f135, transparent)",
          }}
        />
      )}

      {/* Plan name */}
      <div className="t-mono" style={{ color: "#7c5aff", marginBottom: "0.6rem", fontSize: "0.6rem" }}>
        {plan.name.toUpperCase()}
      </div>

      {/* Tag */}
      <p className="t-body" style={{ color: "#5a5a7a", marginBottom: "2rem", fontSize: "0.85rem" }}>
        {plan.tag}
      </p>

      {/* Price */}
      <div style={{ marginBottom: "0.5rem" }}>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 3vw, 2.8rem)",
            fontWeight: 800,
            color: plan.highlight ? "#c8f135" : "#eeeaf6",
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          {plan.price}
        </span>
        <span className="t-mono" style={{ color: "#3a3a5a", marginLeft: "0.6rem", fontSize: "0.6rem" }}>
          {plan.usd}
        </span>
      </div>

      {/* Timeline */}
      <div
        className="t-mono"
        style={{
          color: "#4a4a6a",
          fontSize: "0.6rem",
          marginBottom: "2.5rem",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span style={{ color: "#c8f135" }}>↗</span> Delivered in {plan.timeline}
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "#1e1e30", marginBottom: "2rem" }} />

      {/* Features */}
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "2.5rem" }}>
        {plan.features.map((f) => (
          <li
            key={f}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              fontFamily: "var(--font-body)",
              fontSize: "0.88rem",
              color: "#7070a0",
              lineHeight: 1.4,
            }}
          >
            <span style={{ color: "#c8f135", flexShrink: 0, marginTop: "1px", fontSize: "0.7rem" }}>✓</span>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#contact"
        style={{
          display: "block",
          textAlign: "center",
          padding: "0.9rem",
          background: plan.highlight ? "#c8f135" : "transparent",
          color: plan.highlight ? "#05050f" : "#eeeaf6",
          fontFamily: "var(--font-display)",
          fontSize: "0.8rem",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          textDecoration: "none",
          borderRadius: "2px",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: plan.highlight ? "#c8f135" : "#2e2e48",
          transition: "background 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
          boxShadow: plan.highlight && hovered ? "0 0 32px rgba(200,241,53,0.3)" : "none",
        }}
        onMouseEnter={(e) => {
          if (!plan.highlight) {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "#7c5aff";
            (e.currentTarget as HTMLAnchorElement).style.color = "#7c5aff";
          }
        }}
        onMouseLeave={(e) => {
          if (!plan.highlight) {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "#2e2e48";
            (e.currentTarget as HTMLAnchorElement).style.color = "#eeeaf6";
          }
        }}
      >
        <FlipText style={{ color: "inherit" }}>{plan.cta}</FlipText>
      </a>
    </motion.div>
  );
}

export default function Pricing() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="pricing"
      className="section"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(200,241,53,0.06) 0%, transparent 55%), #05050f",
        borderTop: "1px solid #1e1e30",
      }}
    >
      <div className="container">

        {/* Header */}
        <div ref={headerRef} style={{ textAlign: "center", marginBottom: "4.5rem" }}>
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="t-mono" style={{ color: "#c8f135", marginBottom: "1.2rem" }}>
              [ PRICING ]
            </div>
            <h2 className="t-heading" style={{ color: "#eeeaf6", marginBottom: "1.2rem" }}>
              Fixed price.<br />
              <span style={{ color: "#c8f135" }}>Zero surprises.</span>
            </h2>
            <p className="t-body" style={{ color: "#7070a0", maxWidth: "440px", margin: "0 auto", lineHeight: 1.8 }}>
              No hourly billing. No scope creep. Pick a plan, we scope it together, and you get exactly what we agreed on.
            </p>
          </motion.div>
        </div>

        {/* Plans */}
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}
          className="pricing-grid"
        >
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} i={i} />
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          className="t-mono"
          initial={shouldReduce ? false : { opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          style={{
            textAlign: "center",
            marginTop: "3rem",
            color: "#2e2e48",
            fontSize: "0.6rem",
          }}
        >
          All prices in INR. USD equivalent shown for reference. Custom quotes available for enterprise projects.
        </motion.p>

      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .pricing-grid {
            grid-template-columns: 1fr !important;
            max-width: 480px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}
