"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Messages } from "@/lib/dictionaries";

type HoursListProps = {
  hours: Messages["contact"]["hours"];
};

export default function HoursList({ hours }: HoursListProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <ul className="mt-4 space-y-2 text-paper/85">
      {hours.map((row, index) =>
        shouldReduceMotion ? (
          <li key={row.days} className="flex justify-between gap-6 border-b border-paper/10 pb-2">
            <span>{row.days}</span>
            <span>{row.hours}</span>
          </li>
        ) : (
          <motion.li
            key={row.days}
            className="flex justify-between gap-6 border-b border-paper/10 pb-2"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <span>{row.days}</span>
            <span>{row.hours}</span>
          </motion.li>
        )
      )}
    </ul>
  );
}
