import React from "react";
import { motion } from "motion/react";

export function GridBackground() {
  return (
    <div id="grid-bg" className="absolute inset-0 -z-50 overflow-hidden bg-[#0A0B10]">
      {/* Background Radial Glows */}
      <div 
        id="radial-glow-violet"
        className="absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-violet-600/10 blur-[150px] pointer-events-none"
      />
      <div 
        id="radial-glow-cyan"
        className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none"
      />
      <div 
        id="radial-glow-center"
        className="absolute top-[30%] left-[40%] h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none"
      />

      {/* Grid Pattern using pure SVG style with absolute precision */}
      <div 
        id="grid-accent-overlay"
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0B10]/50 to-[#0A0B10] mix-blend-overlay opacity-30 pointer-events-none"
      />
      <div 
        id="svg-grid"
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Modern Interactive Light Particles floating subtly in background */}
      <div id="particles-container" className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            id={`bg-particle-${i}`}
            className="absolute rounded-full bg-indigo-500/20"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              width: Math.random() * 8 + 4,
              height: Math.random() * 8 + 4,
              opacity: Math.random() * 0.4 + 0.1,
            }}
            animate={{
              y: ["0%", "-30%", "100%", "0%"],
              x: ["0%", "20%", "-20%", "0%"],
              opacity: [0.1, 0.4, 0.2, 0.1],
            }}
            transition={{
              duration: 25 + i * 10,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              filter: "blur(2px)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
