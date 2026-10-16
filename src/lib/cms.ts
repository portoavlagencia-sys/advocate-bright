/** Override de conteúdo editado no painel: troca um texto ou uma foto do site. */
export type Override = {
  id: string;
  /** "*" = todas as páginas; senão o caminho exato, ex.: "/escritorio" */
  path: string;
  type: "text" | "image";
  from: string;
  to: string;
};

export type ContentDoc = { items: Override[] };

export type DbPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  body: string;
  cover_url: string | null;
  published: boolean;
  published_at: string;
};

const norm = (s: string) => s.replace(/\s+/g, " ").trim();

const origText = new WeakMap<Text, string>();
const origImg = new WeakMap<Element, string>();

function forPath(items: Override[], path: string) {
  return items.filter((o) => o.path === "*" || o.path === path);
}

/** Aplica os overrides sobre o DOM já renderizado. Idempotente. */
export function applyOverrides(root: HTMLElement, items: Override[], path: string) {
  const list = forPath(items, path);
  const texts = new Map(list.filter((o) => o.type === "text").map((o) => [norm(o.from), o.to]));
  const imgs = new Map(list.filter((o) => o.type === "image").map((o) => [o.from, o.to]));

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let n: Node | null;
  while ((n = walker.nextNode())) {
    const t = n as Text;
    const parent = t.parentElement;
    if (!parent || parent.closest("script,style,[data-cms-ignore]")) continue;
    const current = t.nodeValue ?? "";
    let orig = origText.get(t);
    // React pode ter reescrito o nó: se o valor atual não é o que aplicamos, ele é o novo original
    if (orig === undefined || (current !== orig && !Array.from(texts.values()).includes(current))) {
      orig = current;
      origText.set(t, orig);
    }
    const repl = texts.get(norm(orig));
    const want = repl ?? orig;
    if (current !== want) t.nodeValue = want;
  }

  root.querySelectorAll("img").forEach((img) => {
    let orig = origImg.get(img);
    const cur = img.getAttribute("src") ?? "";
    if (orig === undefined || (cur !== orig && !Array.from(imgs.values()).includes(cur))) {
      orig = cur;
      origImg.set(img, orig);
    }
    const repl = imgs.get(orig);
    if (repl) {
      if (cur !== repl) img.setAttribute("src", repl);
      if (img.hasAttribute("srcset")) img.removeAttribute("srcset");
      img.parentElement?.querySelectorAll("source").forEach((s) => s.remove());
    } else if (cur !== orig) {
      img.setAttribute("src", orig);
    }
  });
}

export function originalSrc(img: Element) {
  return origImg.get(img) ?? img.getAttribute("src") ?? "";
}

export function postParagraphs(body: string): (string | { heading: string })[] {
  return body
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean)
    .map((b) => (b.startsWith("## ") ? { heading: b.slice(3) } : b));
}
