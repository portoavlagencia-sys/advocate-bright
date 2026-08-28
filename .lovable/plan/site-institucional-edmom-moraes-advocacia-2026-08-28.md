# Site institucional — Edmom Moraes Advocacia

Site multi-página, sóbrio e editorial, inspirado na estrutura da referência enviada (blocos numerados, tipografia grande, muito respiro, movimento discreto no scroll). Nada de cara genérica de IA: sem gradientes roxos, sem grid de 3 cards com ícones soltos, sem "Get started".

## Identidade visual

- Paleta extraída da logo: preto (#0E0E0E / quase-preto), verde institucional (#0B5132 aprox., da logo), branco e cinza-claro para texto e fundos de apoio.
- Fonte: Poppins (300/400/500/600/700), carregada via `<link>` no root.
- Logo enviada usada no header, footer e favicon.
- Detalhes: filete verde como separador (igual à logo), numeração 01–06 nas seções, cantos retos, hover sóbrio.

## Estrutura de páginas

- `/` — Home: hero preto com headline forte, faixa de credibilidade, resumo das 4 áreas, bloco "Brasileiros no Exterior", prévia do escritório, CTA WhatsApp.
- `/areas-de-atuacao` — visão geral das 4 áreas.
- `/areas-de-atuacao/direito-trabalhista` — rescisão indireta, vínculo, acidente de trabalho, estabilidades, verbas, horas extras, assédio moral, reversão de justa causa.
- `/areas-de-atuacao/regularizacao-de-imoveis` — leilão, rescisão contratual, compra e venda, usucapião, adjudicação compulsória.
- `/areas-de-atuacao/direito-sucessorio` — inventário, doação, testamento, planejamento patrimonial.
- `/areas-de-atuacao/direito-de-familia` — divórcio, pensão, guarda, união estável, investigação de paternidade.
- `/brasileiros-no-exterior` — página hub: atendimento 100% remoto, inventário à distância, divórcio por procuração, compra/venda de imóvel à distância, regularização de documentos; cada item linka para a área correspondente.
- `/escritorio` — Quem Somos: bio do advogado, valores, forma de atuação (texto-base escrito por mim, para você ajustar depois; espaço reservado para foto e OAB).
- `/blog` — listagem de artigos + `/blog/$slug` para o artigo. Nesta fase o conteúdo vem de um arquivo local de artigos (2–3 textos iniciais), sem banco de dados.
- `/contato` — WhatsApp (62) 8206-0993, e-mail e Instagram (placeholders até você enviar), horário e formulário simples que abre a conversa no WhatsApp.

## Navegação

Header fixo com logo + menu: Home · Áreas de Atuação (dropdown com as 4 áreas + Brasileiros no Exterior) · Escritório · Blog · Contato, e botão verde "Falar no WhatsApp". Menu mobile em painel full-screen. Footer com áreas, contato e aviso de conformidade OAB.

## Conformidade

Textos seguem o Provimento 205/2021 da OAB: sem promessa de resultado, sem preços, sem sensacionalismo. Rodapé com nome, OAB (a preencher) e nota informativa.

## Detalhes técnicos

- TanStack Start com rotas em arquivos; áreas como rotas filhas de um layout `areas-de-atuacao`.
- Tokens de cor em `src/styles.css` (oklch) — preto, verde da logo, branco, cinzas; nada de cor hardcoded nos componentes.
- Poppins via `<link>` em `src/routes/__root.tsx` + token `--font-*` no `@theme`.
- Logo publicada como asset CDN e copiada em versão quadrada para `public/favicon.png`.
- Cada rota com `head()` próprio (title, description, og), JSON-LD `LegalService` na home.
- Animações discretas de entrada no scroll com Motion, sem exagero.

## Pendências suas (posso subir com placeholder)

E-mail, Instagram, número da OAB, bio final e foto do advogado.
