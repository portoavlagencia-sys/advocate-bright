# Trazer informações do site antigo (Wix) para o site novo

## O que vem do site antigo
- **OAB pessoal:** OAB/GO nº 52.315
- **OAB do escritório:** Edmom Moraes Advocacia, registro OAB/GO nº 3.914
- **Formação:** Direito pela PUC Goiás; especialista em Direito Público (Faculdade Cambury); especialista em Direito Civil e Processo Civil (PROORDEM)
- **Comissão:** membro da Comissão de Direito Imobiliário da OAB/GO
- **Endereço:** Rua 5, Setor Oeste, Edifício The Prime Tamandaré Office, Goiânia/GO, CEP 74115-060, com link do Google Maps
- **Forma de trabalho (reescrita com menos rodeio):** cada caso é analisado com cuidado antes de ser aceito, com solução personalizada e ética
- **Dois artigos antigos** que viram rascunhos novos no blog, reescritos no tom atual:
  - "Cônjuge perdeu o direito sobre o imóvel?" (união estável e bens)
  - "Quantas parcelas posso atrasar no financiamento habitacional?"

## Onde cada informação aparece
- **Rodapé:** OAB pessoal, OAB do escritório e endereço completo
- **Página Escritório e bloco "Quem conduz":** formação, especializações, comissão da OAB e o parágrafo sobre a forma de trabalho
- **Bloco "Quem somos" das áreas:** a linha de credenciais (OAB e especializações). Imóveis e Sucessório também citam a comissão de Direito Imobiliário.
- **Contato:** endereço, link do mapa e mapa embutido
- **Dados para o Google:** número da OAB, endereço e formação no perfil do escritório e do advogado

## O que não será copiado
- A frase "dedicado exclusivamente a Direito Sucessório e Imobiliário", porque o site novo também atende Trabalhista e Família
- As fotos de banco de imagens do Wix
- O segundo telefone, (62) 98479-6876, que aparece só em links escondidos. Fica de fora, salvo se você pedir.

## Técnico
- Os dados ficam centralizados em `src/lib/site.ts` (oab, oabEscritorio, endereço, mapsUrl, formação)
- Os textos do blog entram em `src/lib/blog.ts`
- Sem mudanças no banco de dados
