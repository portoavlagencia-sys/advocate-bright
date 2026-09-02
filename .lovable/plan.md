# Ajustes: contato real, foto do advogado, textos mais humanos e mobile

## 1. Contato correto em todo o site
- Telefone/WhatsApp: (62) 98206-0993 -> `5562982060993`
- E-mail: `edmomm@gmail.com`
- Atualizar `src/lib/site.ts` (fonte única) e conferir Header, Footer, Contato, CTAs e JSON-LD.

## 2. Foto real do advogado
- Converter a imagem enviada para WebP otimizada.
- Salvar com nome neutro e profissional: `src/assets/dr-edmom-moraes-advogado.webp`.
- Substituir a foto gerada em `SobreAdvogado.tsx` / Escritório e apagar `advogado-edmom-moraes.jpg`.
- Alt text descritivo e real.

## 3. Textos com menos "cara de IA"
- Revisar Home, Escritório, Contato, Brasileiros no Exterior e as 4 áreas.
- Regras: frases mais curtas e diretas, zero jargão de marketing, sem "no mundo de hoje", sem tríades ("clareza, técnica e estratégia"), sem travessões decorativos, sem promessa de resultado (OAB).
- Trocar blocos simétricos demais por parágrafos com ritmo variado e exemplos concretos do dia a dia (documento que falta, prazo, audiência, o que o cliente precisa levar).

## 4. "Quem somos" em cada área de atuação
- Novo bloco reutilizável na página `areas-de-atuacao.$slug.tsx`, com foto do advogado, apresentação curta e um parágrafo específico da área (experiência naquele tipo de causa), vindo de `area-content.ts`.
- CTA de WhatsApp junto ao bloco.

## 5. Mobile
- Revisar todas as rotas em 390px: tamanhos de título (clamp), padding lateral, grids que viram 1 coluna, tabelas/listas longas, FAQ, menu, botões com área de toque adequada e imagens sem estouro horizontal.
- Verificação com navegador em 390x844 em cada página, sem scroll horizontal.

## Técnico
- Sem mudança de rotas ou backend; apenas conteúdo, imagem e CSS/responsividade.
- Conversão da imagem via ffmpeg/ImageMagick para WebP.
