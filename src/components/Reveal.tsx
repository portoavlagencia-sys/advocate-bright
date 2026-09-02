import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Variant = "up" | "fade" | "left" | "right" | "scale";

const offsets: Record<Variant, { x?: number; y?: number; scale?: number }> = {
  up: { y: 26 },
  fade: {},
  left: { x: -28 },
  right: { x: 28 },
  scale: { scale: 0.97, y: 14 },
};

export function Reveal({
  children,
  delay = 0,
  className,
  variant = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: Variant;
}) {
  const reduced = useReducedMotion();
  const from = offsets[variant];

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: "blur(6px)", ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
