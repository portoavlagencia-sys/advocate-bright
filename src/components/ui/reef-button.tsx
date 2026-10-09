import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Botão com borda cônica giratória (efeito 21st.dev).
 * Repouso: borda branca/esverdeada girando, miolo escuro, texto claro.
 * Hover: miolo vira verde-bright e o texto inverte para escuro — nunca some.
 */
export function ReefButton({
  href,
  children,
  variant = "solid",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "reef-wrap group/reef relative inline-block overflow-hidden rounded-full p-[1.5px] transition-transform duration-300 hover:scale-[1.03] active:scale-100",
        className,
      )}
    >
      <span
        aria-hidden
        className="reef-spin absolute inset-[-60%] bg-[conic-gradient(from_0deg,var(--color-green-bright),transparent_30%,transparent_70%,var(--color-green-bright))]"
      />
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "relative z-10 flex items-center justify-center gap-2 rounded-full px-8 py-[0.95rem] text-[0.72rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300",
          variant === "solid"
            ? "bg-[#0c0f0d]/90 text-white backdrop-blur group-hover/reef:bg-green-bright group-hover/reef:text-[#06110b]"
            : "bg-background/85 text-foreground backdrop-blur group-hover/reef:bg-green-bright group-hover/reef:text-[#06110b]",
        )}
      >
        {children}
      </a>
    </span>
  );
}
