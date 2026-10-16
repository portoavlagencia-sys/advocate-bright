# /admin completo: CRM, financeiro e editor do site

## 1. Acesso
- Login único com o e-mail informado; cadastro público removido da tela de login.
- Conta criada já confirmada, com papel de administrador guardado à parte (só admin entra no painel).

## 2. CRM
- **Clientes/contatos**: nome, telefone, e-mail, origem (WhatsApp, Instagram, indicação), área, etapa do funil (novo, em conversa, proposta, fechado, perdido) e anotações.
- Visão em quadro (arrastar entre etapas) e em lista com busca.
- Agenda e processos atuais passam a se ligar ao cliente.

## 3. Financeiro
- Lançamentos de entrada e saída: descrição, cliente/processo, valor, vencimento, pago/pendente, categoria (honorários, custas, despesas).
- Resumo do mês: recebido, a receber, despesas, saldo, e lista de atrasados.

## 4. Editor do site (estilo Nuvemshop)
- Todo texto e foto das páginas (Home, 4 áreas, Brasileiros no Exterior, Escritório, Contato, rodapé, dados de contato) vira um campo editável no painel, organizado por página e seção.
- Blog: criar, editar, publicar e apagar artigos.
- Troca de fotos por upload direto, com redução automática de tamanho.
- **Preview**: painel lado a lado com a página real mostrando as alterações antes de publicar; botão "Publicar alterações".
- O conteúdo atual vira o valor inicial — nada muda no site até ele editar.
- Site público continua rápido: conteúdo lido no servidor, sem carregar o painel.

## Técnico
- Tabelas: `user_roles` + `has_role`, `clients`, `transactions`, `site_content` (chave por página/seção, rascunho e publicado em JSON), `posts`; FK opcional de `appointments`/`cases` para `clients`.
- RLS: escrita só para admin; leitura pública apenas do conteúdo publicado e posts publicados.
- Bucket público `site-media` para fotos, escrita só admin.
- `src/lib/site.ts`, `area-content.ts`, `blog.ts` viram fallback padrão; rotas leem conteúdo publicado via server function no loader e mesclam com o padrão.
- Preview por `?preview=1` lendo rascunho (só com sessão admin), exibido em iframe no editor.
- Conta admin criada via função administrativa no servidor; senha não fica no código.
