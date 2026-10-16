import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { btn, btnGhost, field, label } from "@/components/admin/ui";

type PostRow = Tables<"posts">;
const slugify = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const blank = { title: "", slug: "", excerpt: "", category: "Artigos", body: "", published: false };

export function BlogAdmin() {
  const [items, setItems] = useState<PostRow[]>([]);
  const [edit, setEdit] = useState<(typeof blank & { id?: string }) | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
    setItems(data ?? []);
  }
  useEffect(() => void load(), []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!edit) return;
    setErr(null);
    const row = { ...edit, slug: edit.slug || slugify(edit.title) };
    delete (row as { id?: string }).id;
    const { error } = edit.id
      ? await supabase.from("posts").update(row).eq("id", edit.id)
      : await supabase.from("posts").insert(row);
    if (error) return setErr(error.message.includes("duplicate") ? "Já existe um artigo com esse endereço." : error.message);
    setEdit(null);
    void load();
  }

  async function remove(id: string) {
    if (!confirm("Apagar artigo?")) return;
    await supabase.from("posts").delete().eq("id", id);
    setEdit(null);
    void load();
  }

  if (edit)
    return (
      <form onSubmit={save} className="max-w-3xl space-y-4">
        <div>
          <label className={label}>Título</label>
          <input className={field} required value={edit.title} onChange={(e) => setEdit({ ...edit, title: e.target.value })} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className={label}>Endereço (/blog/…)</label>
            <input className={field} placeholder={slugify(edit.title)} value={edit.slug} onChange={(e) => setEdit({ ...edit, slug: slugify(e.target.value) })} />
          </div>
          <div>
            <label className={label}>Categoria</label>
            <input className={field} value={edit.category} onChange={(e) => setEdit({ ...edit, category: e.target.value })} />
          </div>
        </div>
        <div>
          <label className={label}>Resumo</label>
          <textarea rows={2} className={field} value={edit.excerpt} onChange={(e) => setEdit({ ...edit, excerpt: e.target.value })} />
        </div>
        <div>
          <label className={label}>Texto — deixe uma linha em branco entre parágrafos; comece com "## " para um subtítulo</label>
          <textarea rows={18} className={field} value={edit.body} onChange={(e) => setEdit({ ...edit, body: e.target.value })} />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={edit.published} onChange={(e) => setEdit({ ...edit, published: e.target.checked })} />
          Publicado no site
        </label>
        {err && <p className="text-sm text-destructive">{err}</p>}
        <div className="flex flex-wrap gap-3">
          <button className={btn}>Salvar</button>
          <button type="button" className={btnGhost} onClick={() => setEdit(null)}>Voltar</button>
          {edit.id && (
            <>
              <a className={btnGhost} href={`/blog/${edit.slug}`} target="_blank" rel="noreferrer">Ver no site</a>
              <button type="button" className={btnGhost} onClick={() => remove(edit.id!)}><Trash2 className="size-4" /> Apagar</button>
            </>
          )}
        </div>
      </form>
    );

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Artigos criados aqui aparecem no topo do Blog do site.</p>
        <button className={btn} onClick={() => setEdit({ ...blank })}><Plus className="size-4" /> Novo artigo</button>
      </div>
      <div className="mt-6 divide-y divide-border border border-border">
        {items.map((p) => (
          <button
            key={p.id}
            onClick={() => setEdit({ id: p.id, title: p.title, slug: p.slug, excerpt: p.excerpt, category: p.category, body: p.body, published: p.published })}
            className="flex w-full items-center justify-between p-4 text-left hover:bg-surface"
          >
            <span className="text-sm">{p.title}</span>
            <span className={`text-xs ${p.published ? "text-green-bright" : "text-muted-foreground"}`}>{p.published ? "Publicado" : "Rascunho"}</span>
          </button>
        ))}
        {!items.length && <p className="p-6 text-sm text-muted-foreground">Nenhum artigo criado no painel ainda.</p>}
      </div>
    </div>
  );
}
