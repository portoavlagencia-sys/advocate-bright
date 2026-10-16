import { useCallback, useEffect, useRef, useState } from "react";
import { Monitor, Smartphone, Trash2, Upload, RotateCcw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import type { Override } from "@/lib/cms";
import { areas } from "@/lib/site";
import { btn, btnGhost, field, label } from "@/components/admin/ui";

const PAGES = [
  { path: "/", label: "Início" },
  ...areas.map((a) => ({ path: `/areas-de-atuacao/${a.slug}`, label: a.title })),
  { path: "/areas-de-atuacao", label: "Áreas de atuação" },
  { path: "/advogado-trabalhista-goiania", label: "Advogado trabalhista Goiânia" },
  { path: "/brasileiros-no-exterior", label: "Brasileiros no exterior" },
  { path: "/escritorio", label: "Escritório" },
  { path: "/blog", label: "Blog" },
  { path: "/contato", label: "Contato" },
];

type Pick = { kind: "text" | "image"; from: string; to: string; global: boolean; id?: string };

async function toWebp(file: File): Promise<Blob> {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, 1920 / bmp.width);
  const c = document.createElement("canvas");
  c.width = Math.round(bmp.width * scale);
  c.height = Math.round(bmp.height * scale);
  c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
  return new Promise((r) => c.toBlob((b) => r(b!), "image/webp", 0.82));
}

export function SiteEditor() {
  const [path, setPath] = useState("/");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [draft, setDraft] = useState<Override[]>([]);
  const [published, setPublished] = useState<Override[]>([]);
  const [pick, setPick] = useState<Pick | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const draftRef = useRef(draft);
  draftRef.current = draft;

  useEffect(() => {
    supabase
      .from("site_content")
      .select("key, data")
      .then(({ data }) => {
        const get = (k: string) =>
          ((data?.find((r) => r.key === k)?.data as { items?: Override[] } | undefined)?.items ?? []);
        setDraft(get("draft"));
        setPublished(get("published"));
      });
  }, []);

  const send = useCallback(() => {
    frame.current?.contentWindow?.postMessage(
      { type: "cms:draft", items: draftRef.current },
      window.location.origin,
    );
  }, []);
  useEffect(send, [draft, send]);

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      if (e.data?.type === "cms:ready") send();
      if (e.data?.type === "cms:pick") {
        const value = e.data.value as string;
        const p = e.data.path as string;
        const existing = draftRef.current.find(
          (o) => o.type === e.data.kind && (o.to === value || o.from === value) && (o.path === "*" || o.path === p),
        );
        setPick(
          existing
            ? { kind: existing.type, from: existing.from, to: existing.to, global: existing.path === "*", id: existing.id }
            : { kind: e.data.kind, from: value, to: value, global: false },
        );
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [send]);

  async function persist(items: Override[]) {
    setDraft(items);
    await supabase.from("site_content").upsert({ key: "draft", data: { items } as unknown as Json, updated_at: new Date().toISOString() });
  }

  async function applyPick() {
    if (!pick) return;
    const item: Override = {
      id: pick.id ?? crypto.randomUUID(),
      path: pick.global ? "*" : path,
      type: pick.kind,
      from: pick.from,
      to: pick.to,
    };
    const rest = draft.filter((o) => o.id !== item.id && !(o.from === item.from && o.path === item.path));
    await persist(pick.to === pick.from ? rest : [...rest, item]);
    setPick(null);
    setMsg("Alteração salva no rascunho.");
  }

  async function upload(file: File) {
    if (!pick) return;
    setBusy(true);
    try {
      const blob = await toWebp(file);
      const name = `site/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.webp`;
      const up = await supabase.storage.from("site-media").upload(name, blob, { contentType: "image/webp" });
      if (up.error) throw up.error;
      const signed = await supabase.storage.from("site-media").createSignedUrl(name, 60 * 60 * 24 * 365 * 20);
      if (signed.error) throw signed.error;
      setPick({ ...pick, to: signed.data.signedUrl });
    } catch (e) {
      setMsg(`Erro ao enviar foto: ${(e as Error).message}`);
    }
    setBusy(false);
  }

  async function publish() {
    setBusy(true);
    const { error } = await supabase
      .from("site_content")
      .upsert({ key: "published", data: { items: draft } as unknown as Json, updated_at: new Date().toISOString() });
    setBusy(false);
    if (error) return setMsg(error.message);
    setPublished(draft);
    setMsg("Alterações publicadas no site.");
  }

  const pending = JSON.stringify(draft) !== JSON.stringify(published);
  const pageItems = draft.filter((o) => o.path === path || o.path === "*");

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_22rem]">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <select className={`${field} max-w-xs`} value={path} onChange={(e) => { setPath(e.target.value); setPick(null); }}>
            {PAGES.map((p) => <option key={p.path} value={p.path}>{p.label}</option>)}
          </select>
          <button className={btnGhost} onClick={() => setDevice(device === "desktop" ? "mobile" : "desktop")}>
            {device === "desktop" ? <Smartphone className="size-4" /> : <Monitor className="size-4" />}
            {device === "desktop" ? "Celular" : "Computador"}
          </button>
          <button className={`${btn} ml-auto`} disabled={!pending || busy} onClick={publish}>
            {pending ? "Publicar alterações" : "Tudo publicado"}
          </button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Clique em qualquer texto ou foto da prévia para editar. As mudanças ficam em rascunho até você publicar.
        </p>
        {msg && <p className="mt-2 text-xs text-green-bright">{msg}</p>}
        <div className="mt-4 flex justify-center border border-border bg-background">
          <iframe
            ref={frame}
            key={path}
            title="Prévia do site"
            src={`${path}?preview=1`}
            onLoad={send}
            className="h-[78vh] bg-background"
            style={{ width: device === "desktop" ? "100%" : 390 }}
          />
        </div>
      </div>

      <aside className="space-y-6">
        {pick ? (
          <div className="space-y-4 border border-border bg-surface p-5">
            <p className={label}>{pick.kind === "text" ? "Editar texto" : "Trocar foto"}</p>
            {pick.kind === "text" ? (
              <>
                <p className="text-xs text-muted-foreground">Original: {pick.from}</p>
                <textarea rows={8} className={field} value={pick.to} onChange={(e) => setPick({ ...pick, to: e.target.value })} />
              </>
            ) : (
              <>
                <img src={pick.to} alt="" className="aspect-video w-full object-cover" />
                <label className={`${btnGhost} cursor-pointer`}>
                  <Upload className="size-4" /> {busy ? "Enviando…" : "Enviar nova foto"}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
                </label>
                {pick.to !== pick.from && (
                  <button className={btnGhost} onClick={() => setPick({ ...pick, to: pick.from })}>
                    <RotateCcw className="size-4" /> Voltar à original
                  </button>
                )}
              </>
            )}
            <label className="flex items-center gap-2 text-xs">
              <input type="checkbox" checked={pick.global} onChange={(e) => setPick({ ...pick, global: e.target.checked })} />
              Aplicar em todas as páginas (menu, rodapé)
            </label>
            <div className="flex gap-2">
              <button className={btn} disabled={busy} onClick={applyPick}>Aplicar</button>
              <button className={btnGhost} onClick={() => setPick(null)}>Cancelar</button>
            </div>
          </div>
        ) : (
          <div className="border border-dashed border-border p-5 text-sm text-muted-foreground">
            Selecione um texto ou foto na prévia.
          </div>
        )}

        <div>
          <p className={label}>Alterações nesta página ({pageItems.length})</p>
          <div className="divide-y divide-border border border-border">
            {pageItems.map((o) => (
              <div key={o.id} className="flex items-start gap-2 p-3 text-xs">
                <button className="min-w-0 flex-1 text-left" onClick={() => setPick({ kind: o.type, from: o.from, to: o.to, global: o.path === "*", id: o.id })}>
                  <span className="block truncate text-muted-foreground line-through">{o.type === "image" ? "Foto" : o.from}</span>
                  <span className="block truncate">{o.type === "image" ? "Nova foto" : o.to}</span>
                </button>
                <button aria-label="Desfazer" onClick={() => persist(draft.filter((x) => x.id !== o.id))}>
                  <Trash2 className="size-4 text-muted-foreground" />
                </button>
              </div>
            ))}
            {!pageItems.length && <p className="p-3 text-xs text-muted-foreground">Nenhuma ainda.</p>}
          </div>
        </div>
      </aside>
    </div>
  );
}
