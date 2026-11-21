"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hoverLift?: boolean;
}

export function SpotlightCard({
  children,
  className = "",
  delay = 0,
  hoverLift = true,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hoverLift ? { y: -3 } : undefined}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-2xl border backdrop-blur-md transition-colors duration-300 hover:border-teal-500/35 ${className}`}
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-subtle)",
      }}
    >
      {/* Subtle cursor-tracking spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, var(--spotlight-color), transparent 65%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
