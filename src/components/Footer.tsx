"use client";

import MagneticButton from "./MagneticButton";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="w-full bg-[var(--color-bento-bg)] border-t border-[var(--color-bento-border)] px-6 md:px-12 py-32 flex flex-col md:flex-row justify-between pb-12 gap-16 md:gap-8 min-h-[70vh]">
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-hero-massive text-foreground mb-4">
            Stop losing<br/>clients to ugly<br/>websites.
          </h2>
          <div className="mt-12 inline-block">
            <MagneticButton className="bg-accent text-background rounded-full text-xl md:text-2xl py-6 px-12 md:py-8 md:px-16 hover:bg-foreground hover:text-background font-serif !font-normal">
              Book your free 15-minute teardown
            </MagneticButton>
          </div>
        </div>
        
        <div className="mt-32 md:mt-0 font-sans text-xs tracking-widest uppercase text-muted flex flex-col gap-2">
          <p>Elevate Web Works © 2026</p>
          <p>San Francisco, CA</p>
        </div>
      </div>

      <div className="flex gap-16 font-sans text-sm tracking-wider uppercase md:self-end">
        <ul className="flex flex-col gap-4">
          <li><Link href="#work" className="hover:text-accent transition-colors">Work</Link></li>
          <li><Link href="#capabilities" className="hover:text-accent transition-colors">Capabilities</Link></li>
          <li><Link href="#why" className="hover:text-accent transition-colors">Manifesto</Link></li>
        </ul>
        <ul className="flex flex-col gap-4 text-muted">
          <li><a href="#" className="hover:text-foreground transition-colors">Twitter</a></li>
          <li><a href="#" className="hover:text-foreground transition-colors">Github</a></li>
          <li><a href="#" className="hover:text-foreground transition-colors">Dribbble</a></li>
        </ul>
      </div>
    </footer>
  );
}
