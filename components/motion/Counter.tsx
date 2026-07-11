"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CounterProps = {
  to: number;
  suffix?: string;
  className?: string;
};

export default function Counter({ to, suffix = "", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(shouldReduceMotion ? to : 0);

  useEffect(() => {
    if (!isInView || shouldReduceMotion) return;
    const controls = animate(0, to, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => setDisplay(Math.round(value)),
    });
    return () => controls.stop();
  }, [isInView, shouldReduceMotion, to]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
