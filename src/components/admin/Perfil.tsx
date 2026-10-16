import { useState } from "react";
import { Camera } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { changeMyEmail } from "@/lib/team.functions";
import { btn, card, field, label } from "@/components/admin/ui";
import { ROLE_LABEL, type TeamRole } from "@/lib/roles";

async function toWebp(file: File, size = 400): Promise<Blob> {
  const img = await createImageBitmap(file);
  const s = Math.min(img.width, img.height);
  const c = document.createElement("canvas");
  c.width = c.height = size;
  c.getContext("2d")!.drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, size, size);
  return new Promise((r) => c.toBlob((b) => r(b!), "image/webp", 0.85));
}

export type Me = { id: string; email: string; name: string; avatar_url: string | null; role: TeamRole };

export function Perfil({ me, onChange }: { me: Me; onChange: () => void }) {
  const [name, setName] = useState(me.name);
  const [email, setEmail] = useState(me.email);
  const [pw, setPw] = useState({ a: "", b: "" });
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function run(fn: () => Promise<void>, ok: string) {
    setBusy(true); setMsg(null);
    try { await fn(); setMsg({ ok: true, text: ok }); onChange(); }
    catch (e) { setMsg({ ok: false, text: e instanceof Error ? e.message : "Erro" }); }
    setBusy(false);
  }

  const photo = (f: File) => run(async () => {
    const path = `avatars/${me.id}/${Date.now()}.webp`;
    const { error } = await supabase.storage.from("site-media").upload(path, await toWebp(f), { contentType: "image/webp", upsert: true });
    if (error) throw error;
    const url = supabase.storage.from("site-media").getPublicUrl(path).data.publicUrl;
    const { error: e2 } = await supabase.from("team_members").update({ avatar_url: url }).eq("user_id", me.id);
    if (e2) throw e2;
  }, "Foto atualizada.");

  return (
    <div className="grid max-w-3xl gap-6">
      <div className={`${card} flex items-center gap-5`}>
        <label className="group relative size-24 shrink-0 cursor-pointer overflow-hidden rounded-full border border-border bg-background">
          {me.avatar_url ? <img src={me.avatar_url} alt="" className="size-full object-cover" />
            : <span className="flex size-full items-center justify-center text-2xl font-light">{(me.name || me.email)[0]?.toUpperCase()}</span>}
          <span className="absolute inset-0 flex items-center justify-center bg-background/70 opacity-0 transition-opacity group-hover:opacity-100">
            <Camera className="size-5" />
          </span>
          <input type="file" accept="image/*" className="hidden" disabled={busy} onChange={(e) => e.target.files?.[0] && photo(e.target.files[0])} />
        </label>
        <div className="min-w-0">
          <p className="truncate text-lg">{me.name || "Sem nome"}</p>
          <p className="truncate text-xs text-muted-foreground">{me.email} · {ROLE_LABEL[me.role]}</p>
          <p className="mt-1 text-xs text-muted-foreground">Clique na foto para trocar.</p>
        </div>
      </div>

      {msg && <p className={`text-sm ${msg.ok ? "text-green-bright" : "text-destructive"}`}>{msg.text}</p>}

      <form className={card} onSubmit={(e) => { e.preventDefault(); run(async () => {
        const { error } = await supabase.from("team_members").update({ name: name.trim() }).eq("user_id", me.id);
        if (error) throw error; }, "Nome salvo."); }}>
        <label className={label}>Nome</label>
        <div className="flex gap-3"><input className={field} value={name} onChange={(e) => setName(e.target.value)} />
          <button className={btn} disabled={busy}>Salvar</button></div>
      </form>

      <form className={card} onSubmit={(e) => { e.preventDefault(); run(async () => {
        await changeMyEmail({ data: { email } }); await supabase.auth.refreshSession(); }, "E-mail trocado. Use o novo no próximo login."); }}>
        <label className={label}>E-mail de acesso</label>
        <div className="flex gap-3"><input type="email" className={field} value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className={btn} disabled={busy || email === me.email}>Trocar</button></div>
      </form>

      <form className={card} onSubmit={(e) => { e.preventDefault(); run(async () => {
        if (pw.a.length < 8) throw new Error("A senha precisa de pelo menos 8 caracteres.");
        if (pw.a !== pw.b) throw new Error("As senhas não conferem.");
        const { error } = await supabase.auth.updateUser({ password: pw.a });
        if (error) throw error; setPw({ a: "", b: "" }); }, "Senha trocada."); }}>
        <label className={label}>Nova senha</label>
        <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
          <input type="password" placeholder="Nova senha" className={field} value={pw.a} onChange={(e) => setPw({ ...pw, a: e.target.value })} />
          <input type="password" placeholder="Repita a senha" className={field} value={pw.b} onChange={(e) => setPw({ ...pw, b: e.target.value })} />
          <button className={btn} disabled={busy}>Trocar</button>
        </div>
      </form>
    </div>
  );
}
