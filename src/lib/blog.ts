export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateLabel: string;
  category: string;
  readingTime: string;
  author: string;
  paragraphs: (string | { heading: string })[];
};

const AUTHOR = "Edmom Moraes";

export const posts: Post[] = [
  {
    slug: "rescisao-indireta-quando-cabe",
    title: "Rescisão indireta: quando dá para sair e receber como demitido",
    excerpt:
      "Salário atrasado, FGTS sumido, humilhação, função diferente do contrato. Entenda quando a rescisão indireta cabe — e o erro que faz o trabalhador perder tudo.",
    date: "2026-08-12",
    dateLabel: "12 de agosto de 2026",
    category: "Direito Trabalhista",
    readingTime: "6 min de leitura",
    author: AUTHOR,
    paragraphs: [
      "Toda semana alguém me pergunta no WhatsApp: “doutor, posso só pedir demissão?”. Quase sempre a resposta é: calma. Pedir demissão por conta própria, no impulso, costuma custar metade das verbas. Quando a empresa está descumprindo o contrato, o caminho pode ser outro: a rescisão indireta.",
      "É simples de entender. A rescisão indireta é a “justa causa ao contrário”. Se a empresa comete falta grave — atrasa salário, não deposita FGTS, exige função que não é a sua, humilha, descumpre norma de segurança — você pode encerrar o vínculo e receber como se tivesse sido demitido sem justa causa.",
      { heading: "O que a Justiça costuma aceitar" },
      "Atraso de salário repetido. FGTS que não cai há meses. Rigor excessivo, cobrança com xingamento na frente de colega. Desvio de função permanente. Jornada além do limite sem pagamento. Assédio moral comprovado. Não basta um episódio isolado — precisa ser algo grave e contínuo, com prova.",
      { heading: "A prova decide mais que a tese" },
      "Aqui mora o erro da maioria. Gente que sai, conta a história, mas não guardou nada. O que sustenta esse pedido: extrato do FGTS com buraco, holerite com atraso, print de cobrança, e-mail com ordem fora da função, testemunha que viu. Antes de sair, organiza isso. Depois que você pede demissão, fica bem mais difícil voltar atrás.",
      { heading: "O que entra na conta" },
      "Saldo de salário, aviso prévio, férias vencidas e proporcionais com um terço, 13º proporcional, multa de 40% do FGTS, guias do seguro-desemprego. Dependendo do caso, dano moral. Eu faço essa conta antes de ajuizar — você precisa saber o número antes de decidir.",
      "Se você está em Goiânia e passa por algo parecido, me manda os documentos no WhatsApp. Eu leio e te digo com franqueza: cabe, não cabe, ou cabe mas falta prova. Melhor ouvir isso agora do que descobrir na audiência.",
    ],
  },
  {
    slug: "trabalhei-sem-carteira-goiania-e-agora",
    title: "Trabalhei sem carteira em Goiânia. Dá para provar o vínculo?",
    excerpt:
      "PJ forçada, MEI por exigência, “autônomo” com horário fixo. Como a Justiça do Trabalho em Goiânia enxerga isso e o que guardar para provar.",
    date: "2026-09-18",
    dateLabel: "18 de setembro de 2026",
    category: "Direito Trabalhista",
    readingTime: "5 min de leitura",
    author: AUTHOR,
    paragraphs: [
      "Esse é o caso que mais atendo de quem trabalha em comércio, obra, delivery e escritório pequeno em Goiânia e Aparecida: a pessoa trabalha todo dia, cumpre horário, recebe ordem — mas no papel é “PJ”, “MEI” ou nem isso, é informal puro.",
      "A regra que o juiz aplica é direta: vale a realidade, não o papel assinado. Se tinha horário, chefe, pagamento mensal e você não podia mandar outro no seu lugar, era emprego. A PJ aberta porque a empresa mandou abrir, sem autonomia nenhuma, costuma cair na Justiça do Trabalho. O TRT da 18ª Região já decidiu isso várias vezes.",
      { heading: "O que guardar a partir de hoje" },
      "Print de escala. Conversa com chefe cobrando horário. Comprovante de pagamento, mesmo que seja Pix. Foto de uniforme, crachá. Nome de dois colegas que viram sua rotina. Carteira de trabalho, mesmo sem registro. Não precisa estar bonito — precisa existir.",
      { heading: "O que dá para pedir" },
      "Registro do período, férias, 13º, FGTS com 40%, horas extras se houver, e reflexos. Em muita ação o acordo sai na primeira audiência, porque a empresa sabe que a prova do dia a dia pesa.",
      "Se é o seu caso, não espere completar dois anos fora da empresa para procurar. O prazo corre. Me manda o que você tem e eu te digo o que sustenta e o que falta.",
    ],
  },
  {
    slug: "fui-demitido-nao-recebi-goiania-passo-a-passo",
    title: "Fui demitido e não recebi. O passo a passo em Goiânia",
    excerpt:
      "Rescisão atrasada, parcela faltando, “volta semana que vem”. O que fazer nos primeiros 10 dias para não perder dinheiro.",
    date: "2026-10-02",
    dateLabel: "2 de outubro de 2026",
    category: "Direito Trabalhista",
    readingTime: "5 min de leitura",
    author: AUTHOR,
    paragraphs: [
      "Quando a rescisão não cai, o nervosismo faz a pessoa aceitar qualquer proposta. Respira. Existe um roteiro simples que protege seu dinheiro nos primeiros dias.",
      { heading: "1. Não assine nada com pressa" },
      "Termo de rescisão, acordo de parcelamento, “recibo de quitação geral” — nada disso se assina sem ler e sem conta feita. Quitação assinada sem ressalva pode travar cobrança depois.",
      { heading: "2. Junte quatro documentos" },
      "Carteira de trabalho, último holerite, extrato do FGTS e o termo de rescisão ou comunicado de dispensa. Com esses quatro eu já consigo estimar quase tudo. Print de conversa onde a empresa enrola também ajuda muito.",
      { heading: "3. Olhe o prazo de pagamento" },
      "A empresa tem até 10 dias corridos após o fim do contrato para pagar a rescisão. Passou disso, cabe multa de um salário (art. 477 da CLT). Muita empresa em Goiânia paga no limite — conta esse prazo no calendário.",
      { heading: "4. Decida com número, não com raiva" },
      "Com a conta pronta, você escolhe: cobrança direta, acordo homologado ou ação na Vara do Trabalho de Goiânia. Ação não é vingança, é cobrança. E acordo só vale se chegar perto do real.",
      "Se isso está acontecendo com você agora, me chama no WhatsApp com esses documentos. Respondo no mesmo dia útil.",
    ],
  },
  {
    slug: "inventario-para-quem-mora-fora-do-brasil",
    title: "Inventário para quem mora fora: dá para resolver sem viajar",
    excerpt:
      "Herdeiro no exterior participa por procuração, do consulado ou com apostila. Quando sai em cartório e quando precisa de juiz.",
    date: "2026-07-28",
    dateLabel: "28 de julho de 2026",
    category: "Brasileiros no Exterior",
    readingTime: "6 min de leitura",
    author: AUTHOR,
    paragraphs: [
      "Atendo muito herdeiro que mora fora — Portugal, EUA, Irlanda — e descobre que tem inventário parado aqui. A boa notícia: quase nunca precisa comprar passagem.",
      "Com procuração específica você participa de tudo à distância. Ela pode sair no consulado brasileiro aí onde você mora, ou num cartório local com apostila de Haia e tradução juramentada. Vale para inventário, venda de imóvel herdado e divórcio.",
      { heading: "Cartório ou fórum?" },
      "Se todo herdeiro é maior, capaz, está de acordo e não há testamento exigindo juiz, o inventário sai em cartório, por escritura — coisa de semanas com documento certo. Com menor, incapaz, briga ou testamento, vai para a via judicial. O trabalho é o mesmo: levantar bens, pagar o ITCMD no prazo e partilhar sem criar outra briga.",
      { heading: "O imposto não espera" },
      "O ITCMD tem prazo e multa por atraso na maioria dos estados, incluindo Goiás. Inventário parado custa dinheiro todo mês. Se o óbito já tem mais de dois meses, trata como urgente.",
      "Me manda a certidão de óbito e a lista de bens por mensagem. Eu te digo a via, o custo e o prazo — respeitando seu fuso, por vídeo.",
    ],
  },
  {
    slug: "comprar-imovel-em-leilao-cuidados",
    title: "Imóvel em leilão: o barato que vira processo",
    excerpt:
      "O desconto atrai, mas é o edital que manda. Dívida grudada no bem, ocupante dentro e falha de intimação — o que conferir antes do lance.",
    date: "2026-07-09",
    dateLabel: "9 de julho de 2026",
    category: "Regularização de Imóveis",
    readingTime: "5 min de leitura",
    author: AUTHOR,
    paragraphs: [
      "Leilão bom existe. Mas leilão decidido no impulso vira processo de anos. Antes de dar lance, a pergunta não é “quanto está barato”, é “o que vem grudado nesse imóvel”.",
      { heading: "O que eu confiro antes de liberar um lance" },
      "Quem paga IPTU e condomínio atrasado. Se tem gente morando e quanto custa tirar. Qual processo gerou o leilão e se há outra penhora na matrícula. Se a intimação do devedor foi válida — falha aí anula tudo depois, para um lado ou para o outro.",
      { heading: "E quem teve o imóvel levado a leilão?" },
      "Ainda dá para discutir em alguns casos: intimação falha, avaliação defasada, preço vil. Mas o prazo é curto, dias. Não dá para pensar um mês.",
      "Uma análise prévia custa uma fração do valor em jogo. Me manda o edital e a matrícula antes do leilão — não depois.",
    ],
  },
  {
    slug: "pensao-atrasada-o-que-fazer",
    title: "Pensão não caiu: o que fazer quando o pagamento atrasa",
    excerpt:
      "Três meses de atraso podem gerar prisão civil. Penhora, bloqueio e protesto para o resto. O roteiro de cobrança sem transformar o filho em moeda de troca.",
    date: "2026-10-06",
    dateLabel: "6 de outubro de 2026",
    category: "Direito de Família",
    readingTime: "5 min de leitura",
    author: AUTHOR,
    paragraphs: [
      "Quando a pensão atrasa, a primeira reação costuma ser brigar pelo WhatsApp. Raramente resolve. Existe um roteiro técnico que cobra sem expor a criança — e funciona melhor quando começa cedo, não depois de um ano de atraso acumulado.",
      { heading: "Os três últimos meses têm rito próprio" },
      "O débito dos três meses mais recentes admite cobrança com pedido de prisão civil. É o meio mais duro e, por isso mesmo, o que mais faz acordo sair. Passou disso, o restante vai por penhora: conta bloqueada, bens, protesto da dívida, nome nos cadastros de inadimplentes.",
      { heading: "Guarda os comprovantes, não as discussões" },
      "O que o juiz precisa ver: decisão que fixou a pensão, extratos mostrando o que entrou e o que faltou, despesas do filho — escola, saúde, moradia. Print de briga não prova nada; planilha simples prova tudo.",
      { heading: "E se quem paga perdeu renda de verdade?" },
      "Aí o caminho é revisão, não calote silencioso. Desemprego, doença, outro filho: o valor pode ser revisto para a realidade atual, para cima ou para baixo. Mas enquanto não há nova decisão, vale a antiga — e o atraso conta.",
      "Se a pensão aí de casa parou de cair, me chama com a decisão e os comprovantes. Eu te digo qual rito cabe e em quanto tempo dá para ver resultado.",
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
