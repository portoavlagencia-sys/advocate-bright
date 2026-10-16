import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminPanel } from "@/components/admin/AdminPanel";

/**
 * Carregado via React.lazy pela rota /admin, para que o cliente Supabase
 * (~100 KB) não entre no bundle inicial do site público.
 */
export function AdminGate() {
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

  if (!session) return <AdminLogin />;
  return <RoleCheck userId={session.user.id} email={session.user.email ?? ""} />;
}

function RoleCheck({ userId, email }: { userId: string; email: string }) {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => {
    supabase
      .rpc("has_role", { _user_id: userId, _role: "admin" })
      .then(({ data }) => setOk(!!data));
  }, [userId]);
  if (ok === null)
    return <p className="py-32 text-center text-sm text-muted-foreground">Verificando acesso…</p>;
  if (!ok)
    return (
      <div className="py-32 text-center text-sm text-muted-foreground">
        Esta conta não tem acesso ao painel.{" "}
        <button className="text-green-bright underline" onClick={() => supabase.auth.signOut()}>
          Sair
        </button>
      </div>
    );
  return <AdminPanel email={email} />;
}
