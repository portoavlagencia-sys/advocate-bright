import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminPanel } from "@/components/admin/AdminPanel";

export const Route = createFileRoute("/admin")({
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
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-5">
        <p className="text-sm text-muted-foreground">Carregando…</p>
      </div>
    );
  }

  return session ? <AdminPanel email={session.user.email ?? ""} /> : <AdminLogin />;
}
