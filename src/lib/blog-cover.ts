const map: Record<string, string> = {
  "Direito Trabalhista": "trabalhista",
  "Regularização de Imóveis": "imoveis",
  "Direito de Família": "familia",
  "Direito Sucessório": "sucessorio",
  "Brasileiros no Exterior": "exterior",
};
export function coverPath(category: string) {
  return `/capas/${map[category] ?? "trabalhista"}.jpg`;
}
export const SITE_URL = "https://edmommoraesadvocacia.com.br";
