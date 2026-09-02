import { useEffect, useMemo, useState } from "react";
import { CalendarDays, FolderOpen, LogOut, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Appointment = {
  id: string;
  title: string;
  client: string | null;
  location: string | null;
  notes: string | null;
  starts_at: string;
  done: boolean;
};

type Case = {
  id: string;
  number: string | null;
  client: string;
  area: string | null;
  status: string;
  next_step: string | null;
  next_step_at: string | null;
  notes: string | null;
};

const field =
  "w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-green-bright";
const label = "mb-1.5 block text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground";

function fmt(dt: string) {
  return new Date(dt).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function AdminPanel({ email }: { email: string }) {
  const [tab, setTab] = useState<"agenda" | "processos">("agenda");

  return (
    <div className="mx-auto max-w-[84rem] px-5 py-12 sm:px-6 lg:px-10 lg:py-16">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="min-w-0">
          <span className="eyebrow text-green-bright">Painel interno</span>
          <h1 className="mt-3 truncate text-2xl font-light tracking-tight sm:text-3xl">
            Agenda e processos
          </h1>
          <p className="mt-1 truncate text-xs text-muted-foreground">{email}</p>
        </div>
        <button
          type="button"
          onClick={() => supabase.auth.signOut()}
          className="flex shrink-0 items-center gap-2 border border-border px-4 py-3 text-[0.65rem] uppercase tracking-[0.16em] hover:border-green-bright"
        >
          <LogOut className="size-4" /> Sair
        </button>
      </div>

      <div className="mt-8 flex gap-2 border-b border-border">
        {[
          { id: "agenda" as const, label: "Agenda", icon: CalendarDays },
          { id: "processos" as const, label: "Processos", icon: FolderOpen },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-3 text-xs uppercase tracking-[0.16em] transition-colors ${
              tab === t.id
                ? "border-b-2 border-green-bright text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <t.icon className="size-4" />
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8">{tab === "agenda" ? <Agenda /> : <Processos />}</div>
    </div>
  );
}

function Agenda() {
  const [items, setItems] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    client: "",
    location: "",
    notes: "",
    starts_at: "",
  });

  async function load() {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("starts_at", { ascending: true });
    if (error) setError(error.message);
    else setItems((data ?? []) as Appointment[]);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.starts_at) return;
    const { error } = await supabase.from("appointments").insert({
      title: form.title,
      client: form.client || null,
      location: form.location || null,
      notes: form.notes || null,
      starts_at: new Date(form.starts_at).toISOString(),
    });
    if (error) return setError(error.message);
    setForm({ title: "", client: "", location: "", notes: "", starts_at: "" });
    void load();
  }

  async function toggle(item: Appointment) {
    await supabase
      .from("appointments")
      .update({ done: !item.done })
      .eq("id", item.id);
    void load();
  }

  async function remove(id: string) {
    await supabase.from("appointments").delete().eq("id", id);
    void load();
  }

  const grouped = useMemo(() => {
    const map = new Map<string, Appointment[]>();
    for (const it of items) {
      const key = new Date(it.starts_at).toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
      });
      map.set(key, [...(map.get(key) ?? []), it]);
    }
    return [...map.entries()];
  }, [items]);

  return (
    <div className="grid gap-8 lg:grid-cols-[380px_minmax(0,1fr)]">
      <form onSubmit={add} className="h-max border border-border bg-surface p-6">
        <h2 className="text-sm uppercase tracking-[0.16em] text-green-bright">
          Novo compromisso
        </h2>
        <div className="mt-5 space-y-4">
          <div>
            <label className={label}>Título</label>
            <input
              className={field}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className={label}>Data e hora</label>
            <input
              type="datetime-local"
              className={field}
              value={form.starts_at}
              onChange={(e) => setForm({ ...form, starts_at: e.target.value })}
              required
            />
          </div>
          <div>
            <label className={label}>Cliente</label>
            <input
              className={field}
              value={form.client}
              onChange={(e) => setForm({ ...form, client: e.target.value })}
            />
          </div>
          <div>
            <label className={label}>Local</label>
            <input
              className={field}
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </div>
          <div>
            <label className={label}>Observação</label>
            <textarea
              rows={3}
              className={field}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>
          <button className="flex w-full items-center justify-center gap-2 bg-primary px-5 py-3.5 text-[0.68rem] uppercase tracking-[0.18em] text-primary-foreground hover:bg-green-bright">
            <Plus className="size-4" /> Adicionar
          </button>
        </div>
      </form>

      <div>
        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
        {loading && <p className="text-sm text-muted-foreground">Carregando…</p>}
        {!loading && items.length === 0 && (
          <p className="text-sm text-muted-foreground">Nenhum compromisso registrado.</p>
        )}
        <div className="space-y-8">
          {grouped.map(([day, list]) => (
            <div key={day}>
              <h3 className="text-xs uppercase tracking-[0.18em] text-green-bright">{day}</h3>
              <div className="mt-3 divide-y divide-border border-y border-border">
                {list.map((it) => (
                  <div key={it.id} className="flex items-start gap-4 py-4">
                    <input
                      type="checkbox"
                      checked={it.done}
                      onChange={() => toggle(it)}
                      className="mt-1 size-4 shrink-0 accent-green-700"
                      aria-label="Concluído"
                    />
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-sm font-medium ${
                          it.done ? "text-muted-foreground line-through" : ""
                        }`}
                      >
                        {it.title}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {fmt(it.starts_at)}
                        {it.client ? ` · ${it.client}` : ""}
                        {it.location ? ` · ${it.location}` : ""}
                      </p>
                      {it.notes && (
                        <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">
                          {it.notes}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(it.id)}
                      aria-label="Excluir"
                      className="shrink-0 p-2 text-muted-foreground hover:text-red-400"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Processos() {
  const [items, setItems] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [form, setForm] = useState({
    client: "",
    number: "",
    area: "",
    status: "em andamento",
    next_step: "",
    next_step_at: "",
    notes: "",
  });

  async function load() {
    const { data, error } = await supabase
      .from("cases")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setItems((data ?? []) as Case[]);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!form.client) return;
    const { error } = await supabase.from("cases").insert({
      client: form.client,
      number: form.number || null,
      area: form.area || null,
      status: form.status,
      next_step: form.next_step || null,
      next_step_at: form.next_step_at || null,
      notes: form.notes || null,
    });
    if (error) return setError(error.message);
    setForm({
      client: "",
      number: "",
      area: "",
      status: "em andamento",
      next_step: "",
      next_step_at: "",
      notes: "",
    });
    void load();
  }

  async function patch(id: string, values: Partial<Case>) {
    await supabase
      .from("cases")
      .update({ ...values, updated_at: new Date().toISOString() })
      .eq("id", id);
    void load();
  }

  async function remove(id: string) {
    await supabase.from("cases").delete().eq("id", id);
    void load();
  }

  const filtered = items.filter((c) =>
    [c.client, c.number, c.area, c.status, c.notes]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(q.toLowerCase()),
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[380px_minmax(0,1fr)]">
      <form onSubmit={add} className="h-max border border-border bg-surface p-6">
        <h2 className="text-sm uppercase tracking-[0.16em] text-green-bright">Novo processo</h2>
        <div className="mt-5 space-y-4">
          <div>
            <label className={label}>Cliente</label>
            <input
              className={field}
              value={form.client}
              onChange={(e) => setForm({ ...form, client: e.target.value })}
              required
            />
          </div>
          <div>
            <label className={label}>Número do processo</label>
            <input
              className={field}
              value={form.number}
              onChange={(e) => setForm({ ...form, number: e.target.value })}
            />
          </div>
          <div>
            <label className={label}>Área</label>
            <select
              className={field}
              value={form.area}
              onChange={(e) => setForm({ ...form, area: e.target.value })}
            >
              <option value="">—</option>
              <option>Trabalhista</option>
              <option>Imóveis</option>
              <option>Sucessório</option>
              <option>Família</option>
              <option>Outro</option>
            </select>
          </div>
          <div>
            <label className={label}>Status</label>
            <select
              className={field}
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option>em andamento</option>
              <option>aguardando cliente</option>
              <option>aguardando prazo</option>
              <option>audiência marcada</option>
              <option>arquivado</option>
            </select>
          </div>
          <div>
            <label className={label}>Próxima etapa</label>
            <input
              className={field}
              value={form.next_step}
              onChange={(e) => setForm({ ...form, next_step: e.target.value })}
            />
          </div>
          <div>
            <label className={label}>Data da próxima etapa</label>
            <input
              type="date"
              className={field}
              value={form.next_step_at}
              onChange={(e) => setForm({ ...form, next_step_at: e.target.value })}
            />
          </div>
          <div>
            <label className={label}>Anotações</label>
            <textarea
              rows={4}
              className={field}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>
          <button className="flex w-full items-center justify-center gap-2 bg-primary px-5 py-3.5 text-[0.68rem] uppercase tracking-[0.18em] text-primary-foreground hover:bg-green-bright">
            <Plus className="size-4" /> Adicionar
          </button>
        </div>
      </form>

      <div>
        <input
          placeholder="Buscar por cliente, número, área…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className={field}
        />
        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
        {loading && <p className="mt-4 text-sm text-muted-foreground">Carregando…</p>}
        {!loading && filtered.length === 0 && (
          <p className="mt-4 text-sm text-muted-foreground">Nenhum processo encontrado.</p>
        )}
        <div className="mt-5 space-y-4">
          {filtered.map((c) => (
            <div key={c.id} className="border border-border bg-surface p-5">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{c.client}</p>
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {c.number ?? "sem número"}
                    {c.area ? ` · ${c.area}` : ""}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <select
                    value={c.status}
                    onChange={(e) => patch(c.id, { status: e.target.value })}
                    className="border border-border bg-background px-2 py-1.5 text-xs"
                  >
                    <option>em andamento</option>
                    <option>aguardando cliente</option>
                    <option>aguardando prazo</option>
                    <option>audiência marcada</option>
                    <option>arquivado</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => remove(c.id)}
                    aria-label="Excluir"
                    className="p-2 text-muted-foreground hover:text-red-400"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>

              {(c.next_step || c.next_step_at) && (
                <p className="mt-3 text-xs text-green-bright">
                  Próxima etapa: {c.next_step ?? "—"}
                  {c.next_step_at
                    ? ` · ${new Date(`${c.next_step_at}T12:00:00`).toLocaleDateString("pt-BR")}`
                    : ""}
                </p>
              )}

              <textarea
                defaultValue={c.notes ?? ""}
                rows={4}
                placeholder="Anotações do caso…"
                onBlur={(e) => {
                  if (e.target.value !== (c.notes ?? "")) patch(c.id, { notes: e.target.value });
                }}
                className="mt-4 w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-green-bright"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
