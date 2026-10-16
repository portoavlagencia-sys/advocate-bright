export const field =
  "w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-green-bright";
export const label = "mb-1.5 block text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground";
export const btn =
  "inline-flex items-center justify-center gap-2 bg-primary px-5 py-3 text-[0.65rem] uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-green-bright disabled:opacity-60";
export const btnGhost =
  "inline-flex items-center justify-center gap-2 border border-border px-4 py-2.5 text-[0.65rem] uppercase tracking-[0.16em] hover:border-green-bright";
export const card = "border border-border bg-surface p-5";
export const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
