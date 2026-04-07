"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import FlipText from "./FlipText";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Work",     href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Pricing",  href: "#pricing" },
    { label: "About",    href: "#about" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          borderBottom: scrolled ? "1px solid #1a1a1a" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          background: scrolled ? "rgba(5,5,15,0.9)" : "transparent",
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c8f135" }} />
              <span className="t-label" style={{ color: "#f0ede8", letterSpacing: "0.08em" }}>
                Elevate Web Works
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: "40px" }} className="hidden-mobile">
            {navLinks.map((link) => (
              <FlipText
                key={link.href}
                tag="a"
                href={link.href}
                className="t-label"
                style={{
                  color: "#7070a0",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </FlipText>
            ))}
          </nav>

          {/* CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <FlipText
              tag="a"
              href="#contact"
              className="btn-primary"
              style={{ padding: "0.6rem 1.25rem", fontSize: "0.72rem" }}
            >
              Get a Free Audit
            </FlipText>
            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="show-mobile"
              style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
              aria-label="Toggle menu"
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <span style={{ display: "block", width: "22px", height: "1.5px", background: "#f0ede8", transition: "transform 0.3s", transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none" }} />
                <span style={{ display: "block", width: "22px", height: "1.5px", background: "#f0ede8", opacity: menuOpen ? 0 : 1, transition: "opacity 0.2s" }} />
                <span style={{ display: "block", width: "22px", height: "1.5px", background: "#f0ede8", transition: "transform 0.3s", transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" }} />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: "fixed",
              top: "72px",
              left: 0,
              right: 0,
              background: "#0b0b18",
              borderBottom: "1px solid #222222",
              zIndex: 49,
              padding: "2rem 1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{ color: "#f0ede8", textDecoration: "none", fontSize: "1.2rem", fontFamily: "var(--font-display)" }}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
