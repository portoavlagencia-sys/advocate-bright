# Mobile, página Escritório, fotos reais, limpeza e área /admin

## 1. Menu mobile não abre (bug confirmado)
Testei em 390px: ao tocar em "Abrir menu" o painel não aparece. Causa: o overlay em posição fixa é filho do header `sticky` com `backdrop-blur`, que cria um contexto de empilhamento/containing block e impede o painel de cobrir a tela.
- Mover o painel do menu para fora do header (portal / elemento irmão no topo do layout).
- Travar o scroll do body enquanto aberto, fechar com Esc e ao trocar de rota.
- Reteste automatizado em 390x844 em todas as páginas.

## 2. Revisão geral de mobile
- Passada em 390px e 430px em Home, áreas, Escritório, Blog, Contato e Brasileiros no Exterior: títulos, paddings, grids, FAQ, botões (mínimo 44px) e sem scroll horizontal.

## 3. Refazer a página "Escritório"
- Novo layout com a foto real do advogado (a mesma já enviada, em WebP) em destaque.
- Blocos: apresentação do advogado, como o escritório trabalha, áreas atendidas, atendimento remoto, foto do ambiente/detalhe e CTA.
- Remover a nota "texto institucional preliminar".
- Placeholder de OAB permanece até você enviar o número.

## 4. Mais fotos (banco de imagens, sem IA)
Vou buscar fotos reais em bancos gratuitos com licença de uso comercial (Unsplash / Pexels), baixar, otimizar em WebP e hospedar no próprio site. Ideias por página:
- Home: detalhe de mesa de trabalho com documentos e caneta; corredor/fachada de prédio comercial.
- Trabalhista: crachá/uniforme, ambiente de trabalho, carteira de trabalho.
- Imóveis: chaves, planta de imóvel, fachada residencial.
- Sucessório: documentos e mãos assinando, ambiente de família.
- Família: mãos entrelaçadas, aliança, criança e adulto (sem rostos identificáveis).
- Brasileiros no Exterior: passaporte, mapa, videochamada.
- Contato: Goiânia / skyline local.
Cada foto entra em tom sóbrio, com tratamento preto e verde da identidade. Antes de aplicar, mostro as escolhidas para você aprovar.

## 5. "Dá para ver que foi feito na Lovable?"
Hoje sim, por código: existe um script de captura de erros da Lovable e referências no `package.json` / `vite.config.ts`. Para o visitante comum não aparece nada (a marca d'água já foi removida), mas quem abrir o código-fonte percebe.
- Removo o reporter de erros do runtime e as referências visíveis no HTML.
- As dependências de build da Lovable no `package.json`/`vite.config.ts` não podem ser removidas: são o que faz o projeto compilar e publicar aqui.

## 6. Área /admin (agenda + processos)
Ativo o Lovable Cloud (banco + login) — é o que permite guardar os dados em nuvem, e o uso desse tipo de app é muito baixo.
- `/admin` com login por e-mail e senha (só a conta dele; sem cadastro público).
- **Agenda**: compromissos com data/hora, título, cliente, local e observação; visão de lista por dia/semana.
- **Processos**: bloco de notas por processo — número, cliente, área, status, próxima etapa e anotações livres com histórico.
- Busca e filtros simples, tudo editável e apagável.
- Segurança: acesso restrito ao usuário dono dos dados; nada aparece no site público.

## Técnico
- Menu mobile via portal fora do header; lock de scroll.
- Fotos externas baixadas, convertidas em WebP e servidas pelo CDN de assets do projeto (sem hotlink).
- Cloud: tabelas `appointments` e `cases` com RLS por usuário, rotas protegidas em `/admin`.
