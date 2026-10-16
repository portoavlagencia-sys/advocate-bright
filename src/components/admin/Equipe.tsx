import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { createTeamMember, deleteTeamMember, updateTeamRole } from "@/lib/team.functions";
import { ROLE_DESC, ROLE_LABEL, canManageTeam, type TeamRole } from "@/lib/roles";
import { btn, card, field, label } from "@/components/admin/ui";

const ROLES = Object.keys(ROLE_LABEL) as TeamRole[];
type Member = { user_id: string; name: string | null; email: string | null; role: string; avatar_url: string | null };

export function Equipe({ myId, myRole }: { myId: string; myRole: TeamRole }) {
  const manage = canManageTeam(myRole);
  const [items, setItems] = useState<Member[]>([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "assistente" as TeamRole });
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    const { data } = await supabase.from("team_members").select("user_id, name, email, role, avatar_url").order("created_at");
    setItems(data ?? []);
  }
  useEffect(() => void load(), []);

  async function act(fn: () => Promise<unknown>) {
    setErr(null);
    try { await fn(); await load(); } catch (e) { setErr(e instanceof Error ? e.message : "Erro"); }
  }

  return (
    <div className={`grid gap-8 ${manage ? "lg:grid-cols-[360px_minmax(0,1fr)]" : ""}`}>
      {manage && (
        <form className={`${card} h-max space-y-4`} onSubmit={(e) => { e.preventDefault(); act(async () => {
          await createTeamMember({ data: form }); setForm({ name: "", email: "", password: "", role: "assistente" }); }); }}>
          <h2 className="text-sm uppercase tracking-[0.16em] text-green-bright">Novo acesso</h2>
          <div><label className={label}>Nome</label><input className={field} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div><label className={label}>E-mail</label><input type="email" required className={field} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          <div><label className={label}>Senha inicial</label><input type="text" required minLength={8} className={field} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
          <div><label className={label}>Cargo</label>
            <select className={field} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as TeamRole })}>
              {ROLES.map((r) => <option key={r} value={r}>{ROLE_LABEL[r]} — {ROLE_DESC[r]}</option>)}
            </select></div>
          <button className={`${btn} w-full`}><Plus className="size-4" /> Criar acesso</button>
        </form>
      )}
      <div>
        {err && <p className="mb-4 text-sm text-destructive">{err}</p>}
        {!manage && <p className="mb-4 text-xs text-muted-foreground">Só o dono pode criar, mudar ou excluir acessos.</p>}
        <div className="divide-y divide-border border-y border-border">
          {items.map((m) => (
            <div key={m.user_id} className="flex items-center gap-4 py-4">
              <div className="size-10 shrink-0 overflow-hidden rounded-full border border-border bg-background">
                {m.avatar_url ? <img src={m.avatar_url} alt="" className="size-full object-cover" />
                  : <span className="flex size-full items-center justify-center text-sm">{(m.name || m.email || "?")[0].toUpperCase()}</span>}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{m.name || "Sem nome"}{m.user_id === myId ? " (você)" : ""}</p>
                <p className="truncate text-xs text-muted-foreground">{m.email}</p>
              </div>
              {manage && m.user_id !== myId ? (
                <>
                  <select className="border border-border bg-background px-2 py-1.5 text-xs" value={m.role}
                    onChange={(e) => act(() => updateTeamRole({ data: { userId: m.user_id, role: e.target.value as TeamRole } }))}>
                    {ROLES.map((r) => <option key={r} value={r}>{ROLE_LABEL[r]}</option>)}
                  </select>
                  <button type="button" aria-label="Excluir acesso" className="p-2 text-muted-foreground hover:text-destructive"
                    onClick={() => confirm(`Excluir o acesso de ${m.email}?`) && act(() => deleteTeamMember({ data: { userId: m.user_id } }))}>
                    <Trash2 className="size-4" />
                  </button>
                </>
              ) : (
                <span className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">{ROLE_LABEL[m.role as TeamRole] ?? m.role}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
