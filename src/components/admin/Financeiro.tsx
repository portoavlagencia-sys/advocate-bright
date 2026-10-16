import { useEffect, useMemo, useState } from "react";
import { Check, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { brl, btn, card, field, label } from "@/components/admin/ui";

type Tx = Tables<"transactions">;
const CATS = ["honorários", "êxito", "consulta", "custas", "despesas fixas", "impostos", "outros"];
const today = () => new Date().toISOString().slice(0, 10);

export function Financeiro() {
  const [items, setItems] = useState<Tx[]>([]);
  const [clients, setClients] = useState<{ id: string; name: string }[]>([]);
  const [month, setMonth] = useState(today().slice(0, 7));
  const [err, setErr] = useState<string | null>(null);
  const [form, setForm] = useState({ kind: "entrada", description: "", amount: "", due_date: today(), category: "honorários", client_id: "", paid: false });

  async function load() {
    const [t, c] = await Promise.all([
      supabase.from("transactions").select("*").order("due_date", { ascending: true }),
      supabase.from("clients").select("id, name").order("name"),
    ]);
    if (t.error) setErr(t.error.message);
    setItems(t.data ?? []);
    setClients(c.data ?? []);
  }
  useEffect(() => void load(), []);

  const monthItems = useMemo(() => items.filter((t) => t.due_date.startsWith(month)), [items, month]);
  const sum = (f: (t: Tx) => boolean) => monthItems.filter(f).reduce((a, t) => a + Number(t.amount), 0);
  const recebido = sum((t) => t.kind === "entrada" && t.paid);
  const aReceber = sum((t) => t.kind === "entrada" && !t.paid);
  const despesas = sum((t) => t.kind === "saida");
  const atrasados = items.filter((t) => !t.paid && t.due_date < today());

  async function add(e: React.FormEvent) {
    e.preventDefault();
    const amount = Number(form.amount.replace(/\./g, "").replace(",", "."));
    if (!form.description || !amount) return;
    const { error } = await supabase.from("transactions").insert({
      ...form,
      amount,
      client_id: form.client_id || null,
    });
    if (error) return setErr(error.message);
    setForm({ ...form, description: "", amount: "" });
    void load();
  }

  async function togglePaid(t: Tx) {
    await supabase.from("transactions").update({ paid: !t.paid }).eq("id", t.id);
    void load();
  }
  async function remove(id: string) {
    if (!confirm("Apagar lançamento?")) return;
    await supabase.from("transactions").delete().eq("id", id);
    void load();
  }
  const clientName = (id: string | null) => clients.find((c) => c.id === id)?.name;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <label className={label}>Mês</label>
        <input type="month" className={`${field} max-w-[12rem]`} value={month} onChange={(e) => setMonth(e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          ["Recebido", recebido],
          ["A receber", aReceber],
          ["Despesas", despesas],
          ["Saldo", recebido - sum((t) => t.kind === "saida" && t.paid)],
        ].map(([l, v]) => (
          <div key={l as string} className={card}>
            <p className={label}>{l}</p>
            <p className="text-xl font-light sm:text-2xl">{brl(v as number)}</p>
          </div>
        ))}
      </div>

      {atrasados.length > 0 && (
        <div className="border border-destructive/50 p-4 text-sm">
          <p className={label}>Em atraso ({atrasados.length})</p>
          {atrasados.map((t) => (
            <p key={t.id} className="text-muted-foreground">
              {new Date(t.due_date + "T12:00").toLocaleDateString("pt-BR")} · {t.description} · {brl(Number(t.amount))}
            </p>
          ))}
        </div>
      )}

      <form onSubmit={add} className={`${card} grid gap-3 md:grid-cols-4 lg:grid-cols-8 lg:items-end`}>
        <div>
          <label className={label}>Tipo</label>
          <select className={field} value={form.kind} onChange={(e) => setForm({ ...form, kind: e.target.value })}>
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </select>
        </div>
        <div className="lg:col-span-2">
          <label className={label}>Descrição</label>
          <input className={field} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div>
          <label className={label}>Valor (R$)</label>
          <input className={field} inputMode="decimal" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
        </div>
        <div>
          <label className={label}>Vencimento</label>
          <input type="date" className={field} value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} />
        </div>
        <div>
          <label className={label}>Categoria</label>
          <select className={field} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {CATS.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className={label}>Cliente</label>
          <select className={field} value={form.client_id} onChange={(e) => setForm({ ...form, client_id: e.target.value })}>
            <option value="">—</option>
            {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <button className={btn}><Plus className="size-4" /> Lançar</button>
      </form>
      {err && <p className="text-sm text-destructive">{err}</p>}

      <div className="divide-y divide-border border border-border">
        {monthItems.map((t) => (
          <div key={t.id} className="grid items-center gap-2 p-4 sm:grid-cols-[7rem_1fr_9rem_8rem_auto]">
            <span className="text-xs text-muted-foreground">{new Date(t.due_date + "T12:00").toLocaleDateString("pt-BR")}</span>
            <span className="text-sm">
              {t.description}
              <span className="block text-xs text-muted-foreground">
                {[t.category, clientName(t.client_id)].filter(Boolean).join(" · ")}
              </span>
            </span>
            <span className={`text-sm ${t.kind === "entrada" ? "text-green-bright" : "text-destructive"}`}>
              {t.kind === "entrada" ? "+" : "−"} {brl(Number(t.amount))}
            </span>
            <button onClick={() => togglePaid(t)} className={`flex items-center gap-1 text-xs ${t.paid ? "text-green-bright" : "text-muted-foreground"}`}>
              <Check className="size-4" /> {t.paid ? "Pago" : "Pendente"}
            </button>
            <button onClick={() => remove(t.id)} aria-label="Apagar"><Trash2 className="size-4 text-muted-foreground" /></button>
          </div>
        ))}
        {!monthItems.length && <p className="p-6 text-sm text-muted-foreground">Nenhum lançamento neste mês.</p>}
      </div>
    </div>
  );
}
