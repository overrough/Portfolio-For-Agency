"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";

interface FlipTextProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  tag?: "span" | "div" | "h1" | "h2" | "h3" | "p" | "a";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

/**
 * Oryzo-style per-character slide-up flip on hover.
 * Each letter has a ghost duplicate sitting at top:100%.
 * On hover the inner wrapper translates Y to -100%, the ghost slides into view.
 * Each character gets a staggered delay so the wave rolls left→right.
 */
export default function FlipText({
  children,
  className = "",
  style = {},
  tag: Tag = "span",
  href,
  target,
  rel,
  onClick,
}: FlipTextProps) {
  const [hovered, setHovered] = useState(false);
  const shouldReduce = useReducedMotion();

  const chars = children.split("");

  const inner = (
    <span
      aria-label={children}
      style={{ display: "inline-flex", alignItems: "center" }}
    >
      {chars.map((char, i) => {
        const isSpace = char === " ";
        const delay = shouldReduce ? 0 : i * 0.028;

        return isSpace ? (
          <span key={i} style={{ display: "inline-block", width: "0.3em" }} aria-hidden="true" />
        ) : (
          <span
            key={i}
            aria-hidden="true"
            style={{
              position: "relative",
              display: "inline-block",
              overflow: "clip",
              lineHeight: "inherit",
            }}
          >
            <span
              style={{
                display: "inline-block",
                transform: hovered && !shouldReduce ? "translateY(-100%)" : "translateY(0)",
                transition: `transform 0.38s cubic-bezier(0.22, 0.31, 0, 1) ${delay}s`,
                willChange: "transform",
              }}
            >
              {char}
              {/* Ghost letter sitting below, slides into view */}
              <span
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  color: "inherit",
                }}
              >
                {char}
              </span>
            </span>
          </span>
        );
      })}
    </span>
  );

  const sharedProps = {
    className,
    style,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onClick,
  };

  if (Tag === "a" && href) {
    return (
      <a href={href} target={target} rel={rel} {...sharedProps}>
        {inner}
      </a>
    );
  }

  return <Tag {...sharedProps}>{inner}</Tag>;
}
