import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

export function HeroImage({
  src,
  srcSet,
  sizes = "100vw",
  width,
  height,
  alt,
  className = "",
}: {
  src: string;
  srcSet?: string | undefined;
  sizes?: string | undefined;
  width: number;
  height: number;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      {/* Sem animação de opacidade: o LCP precisa pintar antes mesmo da hidratação do JS. */}
      <motion.img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        fetchPriority="high"
        decoding="async"
        className={className}
        {...(reduced ? {} : { style: { y, scale } })}
      />
    </div>
  );
}
