import { createFileRoute } from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const AdminGate = lazy(() =>
  import("@/components/admin/AdminGate").then((m) => ({ default: m.AdminGate })),
);

export const Route = createFileRoute("/admin")({
  staticData: { sitemap: "exclude-subtree" },
  head: () => ({
    meta: [
      { title: "Área restrita — Edmom Moraes Advocacia" },
      {
        name: "description",
        content: "Painel interno de agenda e processos do escritório.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Área restrita" },
      { property: "og:description", content: "Painel interno do escritório." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] items-center justify-center px-5">
          <p className="text-sm text-muted-foreground">Carregando…</p>
        </div>
      }
    >
      <AdminGate />
    </Suspense>
  );
}
