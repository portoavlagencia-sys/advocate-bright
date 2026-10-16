import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const ROLES = ["dono", "gerente", "marketing", "financeiro", "assistente"] as const;
type Role = (typeof ROLES)[number];

async function myRole(supabase: any, userId: string): Promise<string | null> {
  const { data } = await supabase.rpc("team_role", { _uid: userId });
  return (data as string | null) ?? null;
}

export const createTeamMember = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { email: string; password: string; name: string; role: Role }) => {
    if (!i.email?.includes("@")) throw new Error("E-mail inválido");
    if ((i.password ?? "").length < 8) throw new Error("Senha precisa de 8 caracteres");
    if (!ROLES.includes(i.role)) throw new Error("Cargo inválido");
    return { ...i, email: i.email.trim().toLowerCase(), name: i.name?.trim() ?? "" };
  })
  .handler(async ({ data, context }) => {
    if ((await myRole(context.supabase, context.userId)) !== "dono")
      throw new Error("Só o dono pode criar acessos");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: u, error } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
    });
    if (error || !u.user) throw new Error(error?.message ?? "Falha ao criar");
    const { error: e2 } = await supabaseAdmin
      .from("team_members")
      .insert({ user_id: u.user.id, role: data.role, name: data.name, email: data.email });
    if (e2) throw new Error(e2.message);
    return { ok: true };
  });

export const updateTeamRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { userId: string; role: Role }) => {
    if (!ROLES.includes(i.role)) throw new Error("Cargo inválido");
    return i;
  })
  .handler(async ({ data, context }) => {
    if ((await myRole(context.supabase, context.userId)) !== "dono")
      throw new Error("Só o dono pode mudar cargos");
    if (data.userId === context.userId) throw new Error("Você não pode mudar o próprio cargo");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("team_members").update({ role: data.role }).eq("user_id", data.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteTeamMember = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { userId: string }) => i)
  .handler(async ({ data, context }) => {
    if ((await myRole(context.supabase, context.userId)) !== "dono")
      throw new Error("Só o dono pode excluir acessos");
    if (data.userId === context.userId) throw new Error("Você não pode excluir o próprio acesso");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.auth.admin.deleteUser(data.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const changeMyEmail = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { email: string }) => {
    if (!i.email?.includes("@")) throw new Error("E-mail inválido");
    return { email: i.email.trim().toLowerCase() };
  })
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.auth.admin.updateUserById(context.userId, {
      email: data.email,
      email_confirm: true,
    });
    if (error) throw new Error(error.message);
    await supabaseAdmin.from("team_members").upsert(
      { user_id: context.userId, email: data.email, role: (await myRole(context.supabase, context.userId)) ?? "assistente" },
      { onConflict: "user_id" },
    );
    return { ok: true };
  });
