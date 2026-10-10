import { useEffect, useRef, useState, type ReactNode } from "react";

type Variant = "up" | "fade" | "left" | "right" | "scale";

const hiddenClass: Record<Variant, string> = {
  up: "translate-y-6",
  fade: "",
  left: "-translate-x-7",
  right: "translate-x-7",
  scale: "scale-[0.97] translate-y-3",
};

/**
 * Reveal leve: IntersectionObserver + transição CSS (sem biblioteca de animação
 * e sem filtro blur), para não pesar o carregamento no celular.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "up",
  eager = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: Variant;
  /**
   * Conteúdo acima da dobra (ex.: hero): renderiza visível de imediato, sem
   * animação — evita atrasar FCP/LCP esperando o JS de animação.
   */
  eager?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(eager);

  useEffect(() => {
    if (eager) return;
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [eager]);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
        shown ? "opacity-100" : `opacity-0 ${hiddenClass[variant]}`
      } ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
