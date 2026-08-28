export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateLabel: string;
  category: string;
  readingTime: string;
  paragraphs: (string | { heading: string })[];
};

export const posts: Post[] = [
  {
    slug: "rescisao-indireta-quando-cabe",
    title: "Rescisão indireta: quando o trabalhador pode encerrar o contrato e receber tudo",
    excerpt:
      "Descumprimentos graves do empregador permitem encerrar o vínculo com as mesmas verbas de uma dispensa sem justa causa. Entenda as hipóteses e o que costuma ser exigido como prova.",
    date: "2026-08-12",
    dateLabel: "12 de agosto de 2026",
    category: "Direito Trabalhista",
    readingTime: "5 min de leitura",
    paragraphs: [
      "A rescisão indireta é, na prática, a justa causa aplicada ao empregador. Quando a empresa descumpre de forma grave as obrigações do contrato, a lei permite que o trabalhador encerre o vínculo e receba as mesmas verbas de uma dispensa sem justa causa.",
      { heading: "Situações que costumam autorizar o pedido" },
      "Atraso reiterado de salários, ausência de depósitos do FGTS, exigência de serviços alheios ao contrato, rigor excessivo, assédio moral e descumprimento de normas de segurança estão entre as hipóteses mais frequentes na Justiça do Trabalho.",
      { heading: "A prova é o centro do caso" },
      "Extratos, holerites, mensagens, e-mails, testemunhas e registros de jornada sustentam o pedido. Antes de qualquer decisão, o caso precisa ser analisado: pedir demissão por conta própria costuma custar caro ao trabalhador.",
      { heading: "O que se busca no processo" },
      "Aviso prévio, saldo de salário, férias com um terço, décimo terceiro proporcional, multa de 40% do FGTS, liberação das guias do seguro-desemprego e, conforme o caso, indenização por danos morais.",
      "Cada situação tem particularidades. Uma análise prévia dos documentos indica se o pedido é viável e qual o melhor momento para ajuizá-lo.",
    ],
  },
  {
    slug: "inventario-para-quem-mora-fora-do-brasil",
    title: "Inventário para quem mora fora do Brasil: como resolver sem viajar",
    excerpt:
      "Herdeiros que vivem no exterior podem participar de todo o inventário por procuração. Veja os documentos necessários e o passo a passo do procedimento remoto.",
    date: "2026-07-28",
    dateLabel: "28 de julho de 2026",
    category: "Brasileiros no Exterior",
    readingTime: "6 min de leitura",
    paragraphs: [
      "Morar em outro país não impede a participação em um inventário aberto no Brasil. Com procuração específica, o herdeiro acompanha o procedimento inteiro à distância.",
      { heading: "A procuração é o primeiro passo" },
      "Ela pode ser lavrada no consulado brasileiro do país de residência ou emitida no cartório local e apostilada pela Convenção de Haia, com tradução juramentada quando necessário.",
      { heading: "Judicial ou extrajudicial" },
      "Havendo consenso entre herdeiros maiores e capazes, e não existindo testamento que exija a via judicial, o inventário pode ser feito em cartório, com prazo significativamente menor.",
      { heading: "Documentos e tributos" },
      "Certidões do falecido e dos herdeiros, documentos dos bens, declarações fiscais e o recolhimento do ITCMD compõem o núcleo do procedimento. O atraso na abertura pode gerar multa sobre o imposto.",
      "Todo o contato pode ser feito por videochamada e mensagem, respeitando o fuso horário do cliente.",
    ],
  },
  {
    slug: "comprar-imovel-em-leilao-cuidados",
    title: "Comprar imóvel em leilão: os cuidados que evitam um prejuízo",
    excerpt:
      "O desconto atrai, mas o edital define o risco. Dívidas, ocupação do imóvel e vícios na intimação são os pontos que mais geram dor de cabeça depois da arrematação.",
    date: "2026-07-09",
    dateLabel: "9 de julho de 2026",
    category: "Regularização de Imóveis",
    readingTime: "4 min de leitura",
    paragraphs: [
      "Leilões podem ser uma boa oportunidade, desde que a decisão venha depois da leitura técnica do edital e da matrícula do imóvel — não antes.",
      { heading: "O que analisar antes de dar o lance" },
      "Quem responde pelo IPTU e pelo condomínio em atraso, se há ocupantes no imóvel, qual processo originou o leilão, se existem outras penhoras e como se dará a imissão na posse.",
      { heading: "Do outro lado: a defesa do devedor" },
      "Falhas de intimação, avaliação desatualizada e preço vil são fundamentos frequentes para questionar a alienação e, em alguns casos, recuperar o bem.",
      "Uma análise prévia costuma custar uma fração do valor em disputa e evita que a economia do leilão se transforme em litígio prolongado.",
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
