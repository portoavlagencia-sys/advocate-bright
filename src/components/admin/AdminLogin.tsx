import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const fn =
      mode === "login"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${window.location.origin}/admin` },
          });
    const { error } = await fn;
    if (error) setError(error.message);
    setBusy(false);
  }

  const field =
    "w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-green-bright";

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-5 py-16">
      <div className="w-full max-w-md border border-border bg-surface p-7 sm:p-10">
        <span className="eyebrow text-green-bright">Área restrita</span>
        <h1 className="mt-5 text-2xl font-light tracking-tight">
          {mode === "login" ? "Entrar no painel" : "Criar acesso"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Agenda e processos do escritório. Uso interno.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
              E-mail
            </label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={field}
            />
          </div>
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Senha
            </label>
            <input
              type="password"
              required
              minLength={8}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={field}
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-primary px-6 py-4 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-green-bright disabled:opacity-60"
          >
            {busy ? "Aguarde…" : mode === "login" ? "Entrar" : "Criar acesso"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setError(null);
          }}
          className="mt-6 text-xs uppercase tracking-[0.16em] text-green-bright hover:underline"
        >
          {mode === "login" ? "Primeiro acesso? Criar conta" : "Já tenho conta"}
        </button>
      </div>
    </div>
  );
}
