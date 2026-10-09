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
      className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-green-bright text-background shadow-[0_18px_50px_-12px_var(--color-green-bright)] transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 24 24" className="size-6 fill-current" aria-hidden>
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.5.1-.7l.4-.5c.1-.2.1-.4 0-.5L9.4 8.2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.2-.7.7-.2.5-.9 2.1-.9 4.3a7.4 7.4 0 0 0 1.6 3.9 8.2 8.2 0 0 0 5.6 2.5c.8 0 1.5-.3 2.1-.6.6-.3 1-.7 1.1-1.1.1-.4.1-.8 0-.9l-.5-.4Z" />
      </svg>
    </motion.a>
  );
}
