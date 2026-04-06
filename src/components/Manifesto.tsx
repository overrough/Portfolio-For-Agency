"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.1, 1, 1, 0.1]);
  const y = useTransform(scrollYProgress, [0, 0.4], [50, 0]);

  return (
    <section id="why" ref={containerRef} className="relative w-full min-h-[80vh] flex items-center bg-background px-6 md:px-12 py-32 grid-bg">
      <div className="max-w-[80vw] md:max-w-[70vw] mx-auto xl:mx-0 xl:ml-[10vw]">
        <motion.p 
          style={{ opacity, y }}
          className="text-manifesto text-foreground/90 font-medium"
        >
          Most agencies charge $10k and take 3 months to deliver a template. We use <span className="italic text-foreground">AI, WebGL,</span> and relentless <span className="italic text-foreground">conversion psychology</span> to launch 3D-native experiences in 3 weeks.
        </motion.p>
      </div>
    </section>
  );
}
