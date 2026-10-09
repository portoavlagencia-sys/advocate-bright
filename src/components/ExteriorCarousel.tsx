import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { Spotlight } from "./motion";
import { exteriorServices } from "@/lib/site";

export function ExteriorCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const drag = useRef({ down: false, startX: 0, startScroll: 0 });

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
      setCanPrev(el.scrollLeft > 8);
      setCanNext(el.scrollLeft < max - 8);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const w = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={trackRef}
        onPointerDown={(e) => {
          const el = trackRef.current;
          if (!el || e.pointerType !== "mouse") return;
          drag.current = { down: true, startX: e.clientX, startScroll: el.scrollLeft };
        }}
        onPointerMove={(e) => {
          const el = trackRef.current;
          if (!el || !drag.current.down) return;
          el.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
        }}
        onPointerUp={() => (drag.current.down = false)}
        onPointerLeave={() => (drag.current.down = false)}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {exteriorServices.map((item, i) => (
          <Reveal
            key={item.title}
            delay={i * 0.06}
            className="shrink-0 snap-start"
          >
            <Spotlight className="h-full border border-border bg-background">
              <Link
                data-card
                to="/areas-de-atuacao/$slug"
                params={{ slug: item.areaSlug }}
                className="group flex h-[24rem] w-[82vw] flex-col justify-between p-8 transition-colors duration-500 hover:border-green-bright/60 sm:w-[26rem] sm:p-10"
              >
                <div className="flex items-start justify-between">
                  <span
                    aria-hidden
                    className="ghost-number text-7xl font-extralight leading-none sm:text-8xl"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight className="size-5 text-green-bright opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100" />
                </div>
                <div>
                  <span className="eyebrow block text-green-bright">
                    {item.areaLabel}
                  </span>
                  <h3 className="mt-4 text-2xl font-light leading-snug tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                  <span className="mt-6 block h-px w-full bg-border">
                    <span
                      aria-hidden
                      className="block h-px w-0 bg-green-bright transition-all duration-700 group-hover:w-full"
                    />
                  </span>
                </div>
              </Link>
            </Spotlight>
          </Reveal>
        ))}

        {/* Cartão final: CTA */}
        <Reveal delay={0.24} className="shrink-0 snap-start">
          <a
            href="/brasileiros-no-exterior"
            className="group flex h-[24rem] w-[82vw] flex-col justify-between border border-green-bright/40 bg-green-deep/25 p-8 transition-colors duration-500 hover:bg-green-deep/40 sm:w-[26rem] sm:p-10"
          >
            <span className="eyebrow text-primary-foreground/70">
              Atendimento remoto
            </span>
            <span>
              <span className="block text-2xl font-light leading-snug tracking-tight text-primary-foreground">
                Mora fora? Resolve sem passagem.
              </span>
              <span className="mt-4 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.2em] text-green-bright">
                Como funciona
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </span>
          </a>
        </Reveal>
      </div>

      {/* Controles */}
      <div className="mt-8 flex items-center gap-6">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={!canPrev}
            aria-label="Anterior"
            className="flex size-11 items-center justify-center rounded-full border border-border transition-all hover:border-green-bright hover:text-green-bright disabled:opacity-30 disabled:hover:border-border disabled:hover:text-inherit"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={!canNext}
            aria-label="Próximo"
            className="flex size-11 items-center justify-center rounded-full border border-border transition-all hover:border-green-bright hover:text-green-bright disabled:opacity-30 disabled:hover:border-border disabled:hover:text-inherit"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
        <div className="h-px flex-1 bg-border">
          <div
            aria-hidden
            className="h-px bg-green-bright transition-[width] duration-150"
            style={{ width: `${Math.max(6, progress * 100)}%` }}
          />
        </div>
        <span className="text-xs tracking-[0.2em] text-muted-foreground">
          Arraste
        </span>
      </div>
    </div>
  );
}
