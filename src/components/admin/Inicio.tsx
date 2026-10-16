import { useEffect, useState } from "react";
import { AlertTriangle, CalendarClock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { canAccess, greeting, type TeamRole } from "@/lib/roles";
import { brl, card } from "@/components/admin/ui";

type Alert = { when: Date; text: string; kind: "agenda" | "processo" | "financeiro"; late: boolean };

function whenLabel(d: Date) {
  const now = new Date();
  const day = (x: Date) => x.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
  const tomorrow = new Date(now.getTime() + 864e5);
  const hour = d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" });
  if (day(d) === day(now)) return `Hoje às ${hour.replace(":00", "h")}`;
  if (day(d) === day(tomorrow)) return `Amanhã às ${hour.replace(":00", "h")}`;
  return `${day(d)} às ${hour}`;
}

export function Inicio({ name, role }: { name: string; role: TeamRole }) {
  const [alerts, setAlerts] = useState<Alert[] | null>(null);

  useEffect(() => {
    (async () => {
      const now = Date.now();
      const limit = new Date(now + 2 * 864e5).toISOString();
      const out: Alert[] = [];
      if (canAccess(role, "agenda")) {
        const { data } = await supabase
          .from("appointments").select("title, client, starts_at")
          .eq("done", false).lte("starts_at", limit).order("starts_at");
        for (const a of data ?? []) {
          const w = new Date(a.starts_at);
          out.push({ when: w, kind: "agenda", late: w.getTime() < now,
            text: `você tem: ${a.title}${a.client ? ` com ${a.client}` : ""}` });
        }
      }
      if (canAccess(role, "processos")) {
        const { data } = await supabase
          .from("cases").select("client, next_step, next_step_at")
          .not("next_step_at", "is", null).lte("next_step_at", limit.slice(0, 10)).neq("status", "arquivado");
        for (const c of data ?? []) {
          const w = new Date(`${c.next_step_at}T09:00:00-03:00`);
          out.push({ when: w, kind: "processo", late: w.getTime() < now - 864e5,
            text: `prazo do processo de ${c.client}: ${c.next_step ?? "próxima etapa"}` });
        }
      }
      if (canAccess(role, "financeiro")) {
        const { data } = await supabase
          .from("transactions").select("description, amount, due_date, kind")
          .eq("paid", false).lte("due_date", limit.slice(0, 10));
        for (const t of data ?? []) {
          const w = new Date(`${t.due_date}T09:00:00-03:00`);
          out.push({ when: w, kind: "financeiro", late: w.getTime() < now - 864e5,
            text: `${t.kind === "entrada" ? "receber" : "pagar"} ${brl(Number(t.amount))} — ${t.description}` });
        }
      }
      out.sort((a, b) => a.when.getTime() - b.when.getTime());
      setAlerts(out);
    })();
  }, [role]);

  const first = name.trim().split(" ")[0] || "";

  return (
    <div>
      <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
        {greeting()}{first ? `, ${first}` : ""}.
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {alerts === null ? "Buscando pendências…" : alerts.length === 0
          ? "Nenhuma pendência para hoje e amanhã."
          : `Você tem ${alerts.length} pendência${alerts.length > 1 ? "s" : ""} para hoje e amanhã.`}
      </p>
      <div className="mt-8 space-y-3">
        {alerts?.map((a, i) => (
          <div key={i} className={`${card} flex items-start gap-4 ${a.late ? "border-destructive/60" : ""}`}>
            {a.late ? <AlertTriangle className="mt-0.5 size-5 shrink-0 text-destructive" />
              : <CalendarClock className="mt-0.5 size-5 shrink-0 text-green-bright" />}
            <div className="min-w-0">
              <p className="text-sm"><strong className="font-medium">{a.late ? "Atrasado · " : ""}{whenLabel(a.when)}</strong> {a.text}</p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">{a.kind}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
