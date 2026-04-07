"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const NAV = [
  { label: "Work",     href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process",  href: "#process" },
  { label: "Pricing",  href: "#pricing" },
  { label: "About",    href: "#about" },
  { label: "Contact",  href: "#contact" },
];

const SOCIALS = [
  { label: "Twitter",  href: "#" },
  { label: "GitHub",   href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Dribbble", href: "#" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "#030308",
        borderTop: "1px solid #1a1a2a",
        padding: "5rem 0 3rem",
      }}
    >
      <div className="container">

        {/* Top row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr",
            gap: "3rem",
            marginBottom: "4rem",
            paddingBottom: "4rem",
            borderBottom: "1px solid #1a1a2a",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.2rem" }}>
              <motion.div
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#c8f135", flexShrink: 0 }}
              />
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  letterSpacing: "0.06em",
                  color: "#eeeaf6",
                  textTransform: "uppercase",
                }}
              >
                Elevate Web Works
              </span>
            </div>
            <p className="t-body" style={{ color: "#4a4a6a", fontSize: "0.85rem", lineHeight: 1.75, maxWidth: "280px" }}>
              AI-augmented, 3D-native web experiences. Built in days. For businesses that can't afford to look ordinary.
            </p>
            <div className="t-mono" style={{ color: "#2e2e48", marginTop: "1.5rem", fontSize: "0.58rem" }}>
              Est. 2026 · Pune, India
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="t-mono" style={{ color: "#3a3a5a", marginBottom: "1.5rem", fontSize: "0.6rem" }}>
              Navigation
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.88rem",
                    color: "#5a5a7a",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#eeeaf6")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#5a5a7a")}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="t-mono" style={{ color: "#3a3a5a", marginBottom: "1.5rem", fontSize: "0.6rem" }}>
              Get in touch
            </div>

            <a
              href="mailto:elevatewebwork8@gmail.com"
              style={{
                display: "block",
                fontFamily: "var(--font-body)",
                fontSize: "0.88rem",
                color: "#c8f135",
                textDecoration: "none",
                marginBottom: "2rem",
                transition: "opacity 0.2s ease",
                wordBreak: "break-all",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.7")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
            >
              elevatewebwork8@gmail.com
            </a>

            <div className="t-mono" style={{ color: "#3a3a5a", marginBottom: "1rem", fontSize: "0.6rem" }}>
              Follow us
            </div>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="t-mono"
                  style={{
                    color: "#3a3a5a",
                    textDecoration: "none",
                    fontSize: "0.6rem",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#c8f135")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#3a3a5a")}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span className="t-mono" style={{ color: "#2a2a3a", fontSize: "0.58rem" }}>
            © 2026 Elevate Web Works. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Privacy Policy", "Terms"].map((item) => (
              <a
                key={item}
                href="#"
                className="t-mono"
                style={{ color: "#2a2a3a", textDecoration: "none", fontSize: "0.58rem", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#7070a0")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#2a2a3a")}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
