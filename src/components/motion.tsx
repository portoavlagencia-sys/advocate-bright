import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import {
  motion,
  useReducedMotion,
  useInView,
  useMotionValue,
  useSpring,
} from "motion/react";

/* ---------- Aurora de fundo (estilo 21st.dev, mas sóbrio: verde + preto) ---------- */
export function Aurora({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute -top-[20%] left-[8%] h-[55%] w-[46%] rounded-full bg-green-deep/50 blur-[110px]"
        animate={{ x: [0, 60, 0], y: [0, 30, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[4%] top-[30%] h-[45%] w-[36%] rounded-full bg-green-bright/25 blur-[120px]"
        animate={{ x: [0, -50, 0], y: [0, 40, 0], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      {/* grain sutil para tirar o liso de IA */}
      <div className="grain absolute inset-0 opacity-[0.07]" />
    </div>
  );
}

/* ---------- Título com reveal palavra por palavra ---------- */
export function SplitReveal({
  text,
  className = "",
  delay = 0,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "span" | "p";
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  if (reduced) {
    const C = Tag as "span";
    return <C className={className}>{text}</C>;
  }
  const M = (motion as unknown as Record<string, typeof motion.div>)[Tag] ?? motion.span;
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block will-change-transform"
          variants={{
            hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </M>
  );
}

/* ---------- Botão magnético + brilho varrendo ---------- */
export function Magnetic({
  children,
  strength = 14,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18 });
  const sy = useSpring(y, { stiffness: 260, damping: 18 });

  if (reduced) return <div className={className}>{children}</div>;

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width - 0.5) * strength * 2);
    y.set(((e.clientY - r.top) / r.height - 0.5) * strength * 2);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function ShineCTA({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={
        variant === "solid"
          ? "shine-btn bg-primary px-8 py-4 text-center text-[0.72rem] font-medium uppercase tracking-[0.2em] text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-bright hover:shadow-[0_18px_44px_-18px_var(--color-green-bright)]"
          : "shine-btn border border-border px-8 py-4 text-center text-[0.72rem] font-medium uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5 hover:border-green-bright"
      }
    >
      <span className="relative z-10">{children}</span>
    </a>
  );
}

/* ---------- Card com spotlight que segue o mouse ---------- */
export function Spotlight({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -400, y: -400 });
  const [active, setActive] = useState(false);

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={`group/spot relative overflow-hidden ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, color-mix(in oklab, var(--color-green-bright) 16%, transparent), transparent 65%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/* ---------- Contador animado (prazo, valores, prova) ---------- */
export function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1.4,
  className = "",
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView || reduced) {
      if (inView && reduced) setVal(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

/* ---------- Selo pulsante “responde hoje” ---------- */
export function LiveBadge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 border border-green-bright/30 bg-green-deep/20 px-4 py-2 text-[0.68rem] uppercase tracking-[0.2em] text-green-bright">
      <span className="relative flex size-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-bright opacity-60" />
        <span className="relative inline-flex size-2 rounded-full bg-green-bright" />
      </span>
      {text}
    </span>
  );
}

/* ---------- WhatsApp flutuante com entrada suave ---------- */
export function WhatsFloat({ href }: { href: string }) {
  const [show, setShow] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      initial={false}
      animate={
        reduced
          ? { opacity: show ? 1 : 0 }
          : {
              opacity: show ? 1 : 0,
              y: show ? 0 : 16,
              scale: show ? 1 : 0.92,
              pointerEvents: show ? "auto" : "none",
            }
      }
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-[#06110b] shadow-[0_18px_50px_-12px_rgba(37,211,102,0.55)] transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 24 24" className="size-7 fill-current" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    </motion.a>
  );
}
