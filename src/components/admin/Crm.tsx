import { useEffect, useMemo, useState } from "react";
import { LayoutGrid, List, Plus, Trash2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { btn, btnGhost, card, field, label } from "@/components/admin/ui";

type Client = Tables<"clients">;

export const STAGES = [
  { id: "novo", label: "Novo contato" },
  { id: "conversa", label: "Em conversa" },
  { id: "proposta", label: "Proposta enviada" },
  { id: "fechado", label: "Fechado" },
  { id: "perdido", label: "Perdido" },
];
const SOURCES = ["WhatsApp", "Instagram", "Indicação", "Site", "Google", "Outro"];
const AREAS = ["Trabalhista", "Imóveis", "Sucessório", "Família", "Exterior", "Outra"];

const empty = { name: "", phone: "", email: "", source: "WhatsApp", area: "Trabalhista", stage: "novo", notes: "" };

export function Crm() {
  const [items, setItems] = useState<Client[]>([]);
  const [view, setView] = useState<"board" | "list">("board");
  const [q, setQ] = useState("");
  const [edit, setEdit] = useState<(typeof empty & { id?: string }) | null>(null);
  const [drag, setDrag] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    const { data, error } = await supabase.from("clients").select("*").order("updated_at", { ascending: false });
    if (error) setErr(error.message);
    else setItems(data ?? []);
  }
  useEffect(() => void load(), []);

  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    return items.filter((c) =>
      [c.name, c.phone, c.email, c.notes, c.area].some((v) => (v ?? "").toLowerCase().includes(s)),
    );
  }, [items, q]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!edit?.name) return;
    const row = {
      name: edit.name,
      phone: edit.phone || null,
      email: edit.email || null,
      source: edit.source,
      area: edit.area,
      stage: edit.stage,
      notes: edit.notes || null,
      updated_at: new Date().toISOString(),
    };
    const { error } = edit.id
      ? await supabase.from("clients").update(row).eq("id", edit.id)
      : await supabase.from("clients").insert(row);
    if (error) return setErr(error.message);
    setEdit(null);
    void load();
  }

  async function move(id: string, stage: string) {
    setItems((xs) => xs.map((c) => (c.id === id ? { ...c, stage } : c)));
    await supabase.from("clients").update({ stage, updated_at: new Date().toISOString() }).eq("id", id);
  }

  async function remove(id: string) {
    if (!confirm("Apagar este cliente?")) return;
    await supabase.from("clients").delete().eq("id", id);
    setEdit(null);
    void load();
  }

  const open = (c: Client) =>
    setEdit({
      id: c.id,
      name: c.name,
      phone: c.phone ?? "",
      email: c.email ?? "",
      source: c.source ?? "WhatsApp",
      area: c.area ?? "Trabalhista",
      stage: c.stage,
      notes: c.notes ?? "",
    });

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <input className={`${field} max-w-xs`} placeholder="Buscar cliente…" value={q} onChange={(e) => setQ(e.target.value)} />
        <button className={btnGhost} onClick={() => setView(view === "board" ? "list" : "board")}>
          {view === "board" ? <List className="size-4" /> : <LayoutGrid className="size-4" />}
          {view === "board" ? "Lista" : "Quadro"}
        </button>
        <button className={`${btn} ml-auto`} onClick={() => setEdit({ ...empty })}>
          <Plus className="size-4" /> Novo cliente
        </button>
      </div>
      {err && <p className="mt-4 text-sm text-destructive">{err}</p>}

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {STAGES.map((s) => (
          <div key={s.id} className={card}>
            <p className={label}>{s.label}</p>
            <p className="text-2xl font-light">{items.filter((c) => c.stage === s.id).length}</p>
          </div>
        ))}
      </div>

      {view === "board" ? (
        <div className="mt-6 grid gap-3 overflow-x-auto lg:grid-cols-5">
          {STAGES.map((s) => (
            <div
              key={s.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => drag && move(drag, s.id)}
              className="min-h-[16rem] min-w-[14rem] border border-border bg-background p-3"
            >
              <p className={label}>{s.label}</p>
              <div className="space-y-2">
                {filtered
                  .filter((c) => c.stage === s.id)
                  .map((c) => (
                    <button
                      key={c.id}
                      draggable
                      onDragStart={() => setDrag(c.id)}
                      onClick={() => open(c)}
                      className="block w-full border border-border bg-surface p-3 text-left hover:border-green-bright"
                    >
                      <span className="block text-sm">{c.name}</span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {[c.area, c.source].filter(Boolean).join(" · ")}
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 divide-y divide-border border border-border">
          {filtered.map((c) => (
            <button key={c.id} onClick={() => open(c)} className="grid w-full gap-1 p-4 text-left hover:bg-surface sm:grid-cols-5">
              <span className="text-sm">{c.name}</span>
              <span className="text-xs text-muted-foreground">{c.phone}</span>
              <span className="text-xs text-muted-foreground">{c.email}</span>
              <span className="text-xs text-muted-foreground">{c.area}</span>
              <span className="text-xs text-green-bright">{STAGES.find((s) => s.id === c.stage)?.label}</span>
            </button>
          ))}
          {!filtered.length && <p className="p-6 text-sm text-muted-foreground">Nenhum cliente.</p>}
        </div>
      )}

      {edit && (
        <div className="fixed inset-0 z-[80] flex justify-end bg-background/70" onClick={() => setEdit(null)}>
          <form onSubmit={save} onClick={(e) => e.stopPropagation()} className="h-full w-full max-w-md space-y-4 overflow-y-auto border-l border-border bg-surface p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-light">{edit.id ? "Editar cliente" : "Novo cliente"}</h2>
              <button type="button" onClick={() => setEdit(null)}><X className="size-5" /></button>
            </div>
            {(["name", "phone", "email"] as const).map((k) => (
              <div key={k}>
                <label className={label}>{{ name: "Nome", phone: "Telefone", email: "E-mail" }[k]}</label>
                <input className={field} required={k === "name"} value={edit[k]} onChange={(e) => setEdit({ ...edit, [k]: e.target.value })} />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={label}>Origem</label>
                <select className={field} value={edit.source} onChange={(e) => setEdit({ ...edit, source: e.target.value })}>
                  {SOURCES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className={label}>Área</label>
                <select className={field} value={edit.area} onChange={(e) => setEdit({ ...edit, area: e.target.value })}>
                  {AREAS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className={label}>Etapa</label>
              <select className={field} value={edit.stage} onChange={(e) => setEdit({ ...edit, stage: e.target.value })}>
                {STAGES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label className={label}>Anotações</label>
              <textarea rows={8} className={field} value={edit.notes} onChange={(e) => setEdit({ ...edit, notes: e.target.value })} />
            </div>
            <div className="flex gap-3">
              <button className={btn}>Salvar</button>
              {edit.id && (
                <button type="button" className={btnGhost} onClick={() => remove(edit.id!)}>
                  <Trash2 className="size-4" /> Apagar
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
