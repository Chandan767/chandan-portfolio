"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface MetricCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function MetricCounter({
  value,
  suffix = "",
  duration = 1100,
  className = "",
}: MetricCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let frameId = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * value));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}
