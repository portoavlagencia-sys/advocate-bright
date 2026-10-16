export type TeamRole = "dono" | "gerente" | "marketing" | "financeiro" | "assistente";
export type Area = "inicio" | "crm" | "financeiro" | "agenda" | "processos" | "site" | "blog" | "equipe" | "perfil";

export const ROLE_LABEL: Record<TeamRole, string> = {
  dono: "Dono",
  gerente: "Gerente",
  marketing: "Marketing",
  financeiro: "Financeiro",
  assistente: "Assistente",
};

export const ROLE_DESC: Record<TeamRole, string> = {
  dono: "Vê tudo, cria e exclui acessos",
  gerente: "Vê tudo, mas não exclui ninguém",
  marketing: "Só agenda",
  financeiro: "Só financeiro",
  assistente: "Agenda e processos",
};

const ACCESS: Record<TeamRole, Area[]> = {
  dono: ["crm", "financeiro", "agenda", "processos", "site", "blog", "equipe"],
  gerente: ["crm", "financeiro", "agenda", "processos", "site", "blog", "equipe"],
  marketing: ["agenda"],
  financeiro: ["financeiro"],
  assistente: ["agenda", "processos"],
};

/** Mirror of public.can_access in the database (the database is the real gate). */
export function canAccess(role: TeamRole, area: Area) {
  if (area === "inicio" || area === "perfil") return true;
  return ACCESS[role].includes(area);
}

export const canManageTeam = (role: TeamRole) => role === "dono";

export function greeting(d = new Date()) {
  const h = Number(
    new Intl.DateTimeFormat("pt-BR", { hour: "numeric", hour12: false, timeZone: "America/Sao_Paulo" }).format(d),
  ) % 24;
  if (h >= 5 && h < 12) return "Bom dia";
  if (h >= 12 && h < 18) return "Boa tarde";
  return "Boa noite";
}
