# Deixar o site mais vivo, claro e legível

O erro citado (`src/pages/Index.tsx`) não existe neste projeto — o site não tem essa pasta. Nada a corrigir ali; o foco são as alterações pedidas pelo cliente e pela agência.

## 1. Logo
- Logo bem maior no cabeçalho (desktop e celular), com o monograma "EM" em destaque.
- Cores: "EDMOM MORAES" em verde e o "M" do monograma em verde; o "E" e "ADVOCACIA" ficam em branco (tema escuro) / preto (tema claro).
- Traço do monograma mais grosso para não sumir em tela pequena; "ADVOCACIA" maior e com mais espaçamento.
- Versão só com o monograma "EM" para ícone da aba (favicon) e para uso em Instagram/WhatsApp (arquivo entregue em Arquivos).

## 2. Abertura da Home
- Trocar a foto de faixas verticais escuras (lembra grade) por uma foto real de advocacia, mais clara (mesa de escritório, livros, documentos com luz natural) — busca em banco de fotos gratuito, sem IA.
- Película escura bem mais leve, para a foto aparecer de fato.
- Palavras "trabalho, imóveis, heranças e família" no título em verde.

## 3. Contraste e leitura
- Clarear os cinzas dos textos sobre fundo preto e aumentar o tamanho do texto corrido.
- Números 01, 02, 03 preenchidos/verdes em vez de só contorno.
- Links como "Ver como funciona o atendimento remoto" mais visíveis (verde claro, sublinhado).

## 4. Mais vida no fundo
- Seções alternando preto, verde-escuro e um tom grafite, com leves texturas/gradientes verdes, em vez de preto chapado em tudo.
- Reduzir espaços vazios grandes entre seções e garantir que o conteúdo apareça mesmo se a animação de rolagem falhar.

## 5. Fotos
- Trabalhista: trocar carteira de trabalho/balança por foto mais humana e clara.
- Deixar espaços prontos para fotos reais do Dr. Edmom atendendo, recepção e fachada (aguardando o cliente enviar).

## 6. Capas do blog
- Capa padronizada por área (cor + ícone + título), exibida na lista, no artigo e ao compartilhar o link no WhatsApp.

## 7. Tema claro como padrão
- Site abre no tema claro; o botão continua permitindo trocar para o escuro. Ajustar cores do tema claro para ficar acolhedor.

## Pendências do cliente
- Fotos reais do escritório, recepção, fachada e do advogado atendendo.

## Detalhes técnicos
- Logo: editar `public/logo-edmom-moraes.svg` em duas cores via `currentColor` + token verde; gerar `favicon.png` do monograma.
- Heroes: novos WebP 768/1280/1920 em `src/assets`; overlay em `PageHero`/`HeroImage`.
- Tokens em `src/styles.css` (`--muted-foreground` mais claro, novas superfícies `--surface-green`, `--surface-graphite`); tema padrão em `ThemeToggle`/script do `__root`.
- `Reveal`: estado inicial visível sem JS; revisar `py-*` das seções.
- Capas do blog: componente SVG/CSS por área + imagem estática para `og:image`.
