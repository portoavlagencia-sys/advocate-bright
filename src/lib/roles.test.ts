import { describe, expect, it } from "vitest";
import { canAccess, canManageTeam, greeting } from "./roles";

// Horários em Brasília (UTC-3)
const at = (h: number) => new Date(Date.UTC(2026, 9, 16, h + 3, 0));

describe("cargos", () => {
  it("marketing vê só agenda", () => {
    expect(canAccess("marketing", "agenda")).toBe(true);
    expect(canAccess("marketing", "financeiro")).toBe(false);
    expect(canAccess("marketing", "processos")).toBe(false);
  });
  it("financeiro vê só financeiro", () => {
    expect(canAccess("financeiro", "financeiro")).toBe(true);
    expect(canAccess("financeiro", "agenda")).toBe(false);
  });
  it("assistente vê agenda e processos", () => {
    expect(canAccess("assistente", "agenda")).toBe(true);
    expect(canAccess("assistente", "processos")).toBe(true);
    expect(canAccess("assistente", "crm")).toBe(false);
  });
  it("gerente vê tudo mas não gerencia acessos", () => {
    expect(canAccess("gerente", "financeiro")).toBe(true);
    expect(canManageTeam("gerente")).toBe(false);
  });
  it("só o dono cria e exclui acessos", () => {
    expect(canManageTeam("dono")).toBe(true);
  });
});

describe("saudação", () => {
  it("manhã, tarde e noite", () => {
    expect(greeting(at(8))).toBe("Bom dia");
    expect(greeting(at(14))).toBe("Boa tarde");
    expect(greeting(at(20))).toBe("Boa noite");
  });
});
