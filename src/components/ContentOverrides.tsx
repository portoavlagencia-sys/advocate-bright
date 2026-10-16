import { useEffect, useRef } from "react";
import { useLocation } from "@tanstack/react-router";
import { applyOverrides, originalSrc, type Override } from "@/lib/cms";
import { getPublishedContent } from "@/lib/cms.functions";

/**
 * Aplica no site os textos e fotos editados no painel /admin.
 * Em ?preview=1 (dentro do editor) usa o rascunho recebido por postMessage
 * e permite clicar em qualquer texto/foto para editar.
 */
export function ContentOverrides() {
  const { pathname } = useLocation();
  const items = useRef<Override[]>([]);
  const pathRef = useRef(pathname);
  pathRef.current = pathname;

  useEffect(() => {
    const preview = new URLSearchParams(window.location.search).has("preview");
    let raf = 0;
    const run = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        obs.disconnect();
        applyOverrides(document.body, items.current, pathRef.current);
        obs.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ["src"] });
      });
    };
    const obs = new MutationObserver(run);
    obs.observe(document.body, { subtree: true, childList: true, characterData: true });

    if (!preview) {
      getPublishedContent().then((d) => {
        items.current = d.items;
        run();
      });
      return () => obs.disconnect();
    }

    const onMsg = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      if (e.data?.type === "cms:draft") {
        items.current = e.data.items as Override[];
        run();
      }
    };
    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (!el || el.closest("[data-cms-ignore]")) return;
      e.preventDefault();
      e.stopPropagation();
      const img = el.closest("img") ?? (el.querySelector?.(":scope > img") as HTMLImageElement | null);
      if (img) {
        const orig = originalSrc(img);
        parent.postMessage({ type: "cms:pick", kind: "image", value: orig, path: pathRef.current }, window.location.origin);
        return;
      }
      const textNode = Array.from(el.childNodes).find(
        (c) => c.nodeType === 3 && (c.nodeValue ?? "").trim(),
      ) as Text | undefined;
      if (!textNode) return;
      parent.postMessage(
        { type: "cms:pick", kind: "text", value: (textNode.nodeValue ?? "").trim(), path: pathRef.current },
        window.location.origin,
      );
    };
    const style = document.createElement("style");
    style.textContent =
      "body *:hover{outline:1px dashed hsl(150 60% 45%);outline-offset:2px;cursor:pointer}";
    document.head.appendChild(style);
    window.addEventListener("message", onMsg);
    document.addEventListener("click", onClick, true);
    parent.postMessage({ type: "cms:ready", path: pathRef.current }, window.location.origin);
    return () => {
      obs.disconnect();
      window.removeEventListener("message", onMsg);
      document.removeEventListener("click", onClick, true);
      style.remove();
    };
  }, []);

  useEffect(() => {
    applyOverrides(document.body, items.current, pathname);
    if (new URLSearchParams(window.location.search).has("preview")) {
      parent.postMessage({ type: "cms:ready", path: pathname }, window.location.origin);
    }
  }, [pathname]);

  return null;
}
