"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  scale?: boolean;
  as?: "div" | "span";
};

export default function Reveal({ children, delay = 0, className, scale = false, as = "div" }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = as === "span" ? motion.span : motion.div;

  if (shouldReduceMotion) {
    const StaticTag = as;
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 24, scale: scale ? 0.96 : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
