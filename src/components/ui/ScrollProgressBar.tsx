"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 right-0 left-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-300"
    />
  );
}
