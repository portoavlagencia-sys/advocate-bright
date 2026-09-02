import type { FaqItem } from "@/components/FAQ";

export type AreaContent = {
  metaTitle: string;
  metaDescription: string;
  heroLead: string;
  intro: string[];
  signals: string[];
  documents: string[];
  steps: { title: string; text: string }[];
  stats: { value: string; label: string }[];
  faq: FaqItem[];
  ctaTitle: string;
  ctaText: string;
  whatsappMessage: string;
};

export const areaContent: Record<string, AreaContent> = {
  "direito-trabalhista": {
    metaTitle: "Advogado Trabalhista em Goiânia — Rescisão Indireta, Verbas e Horas Extras",
    metaDescription:
      "Advogado trabalhista em Goiânia e em todo o Brasil: rescisão indireta, reconhecimento de vínculo, verbas rescisórias, horas extras, assédio moral e reversão de justa causa. Análise do caso antes de qualquer ação.",
    heroLead:
      "Quando a empresa descumpre o contrato, o prejuízo não é só financeiro. O escritório atua para trabalhadores e ex-empregados que precisam receber o que é devido, com estratégia definida antes do ajuizamento e acompanhamento direto do advogado responsável.",
    intro: [
      "O Direito do Trabalho brasileiro parte de uma constatação simples: empregado e empregador não negociam em pé de igualdade. Por isso a CLT e a Constituição criam um piso de direitos que não pode ser reduzido por contrato, acordo verbal ou pressão no momento da demissão. Na prática, porém, boa parte das violações acontece justamente porque o trabalhador não sabe exatamente o que tem a receber nem em quanto tempo pode cobrar.",
      "A atuação do escritório começa pelo diagnóstico. Antes de propor qualquer ação, analisamos contrato, holerites, cartões de ponto, registros de jornada, conversas, e-mails, testemunhas disponíveis e o histórico da empresa em processos semelhantes. Esse levantamento define três coisas: o que é possível pedir, qual a chance real de êxito e qual o valor provável da causa. Só depois disso o caminho é apresentado ao cliente, com cenários favoráveis e desfavoráveis.",
      "Vale lembrar do prazo. A pretensão trabalhista prescreve em cinco anos durante o contrato e em dois anos contados da extinção do vínculo. Quem espera para procurar orientação costuma perder períodos inteiros de horas extras, diferenças salariais e depósitos de FGTS que já não podem mais ser cobrados.",
    ],
    signals: [
      "Você foi demitido e as verbas rescisórias não foram pagas no prazo legal",
      "Trabalha ou trabalhou sem registro em carteira, como PJ ou por aplicativo",
      "Cumpre jornada além da contratada sem receber horas extras ou adicional noturno",
      "Sofreu acidente de trabalho ou desenvolveu doença ocupacional",
      "Foi dispensado durante gestação, estabilidade acidentária, mandato na CIPA ou pré-aposentadoria",
      "Recebeu justa causa que considera injusta ou desproporcional",
      "Passa por humilhações, metas abusivas ou perseguição no ambiente de trabalho",
      "Depósitos de FGTS ausentes, atrasados ou incompletos",
    ],
    documents: [
      "Carteira de trabalho (física ou digital) e contrato",
      "Últimos holerites e o termo de rescisão, se houver",
      "Extrato do FGTS e comprovantes de depósito",
      "Cartões de ponto, escalas e registros de jornada",
      "Conversas de WhatsApp, e-mails e ordens de serviço",
      "Nome e contato de possíveis testemunhas",
    ],
    steps: [
      {
        title: "Análise documental",
        text: "Leitura de contrato, holerites e registros de jornada para identificar quais verbas foram suprimidas e em qual período ainda podem ser cobradas.",
      },
      {
        title: "Cálculo prévio",
        text: "Estimativa dos valores antes do ajuizamento, para que o cliente saiba o que está em disputa e possa decidir com informação.",
      },
      {
        title: "Tentativa de solução",
        text: "Quando há espaço, negociação direta ou acordo extrajudicial homologado — mais rápido e sem o desgaste de anos de processo.",
      },
      {
        title: "Ação e acompanhamento",
        text: "Ajuizamento na Vara do Trabalho competente, preparação para audiência, produção de provas e acompanhamento até a execução do crédito.",
      },
    ],
    stats: [
      { value: "5 anos", label: "período que pode ser cobrado durante o contrato" },
      { value: "2 anos", label: "prazo para ajuizar após a saída da empresa" },
      { value: "100%", label: "atendimento também remoto, inclusive do exterior" },
    ],
    faq: [
      {
        q: "Quanto tempo tenho para entrar com ação trabalhista?",
        a: "Dois anos contados do fim do contrato. Dentro desse prazo, é possível cobrar os últimos cinco anos de direitos. Passados os dois anos, a pretensão prescreve e nada mais pode ser exigido, mesmo que o direito existisse.",
      },
      {
        q: "Preciso pagar alguma coisa para entrar com o processo?",
        a: "Quem não tem condições de arcar com custas pode pedir justiça gratuita. Os honorários do escritório são acertados por escrito antes de qualquer medida, sem cobranças surpresa.",
      },
      {
        q: "Posso processar a empresa enquanto ainda trabalho nela?",
        a: "Sim. A lei protege o trabalhador contra retaliação, e dispensa motivada pelo ajuizamento pode gerar indenização. Em casos de descumprimento grave, a rescisão indireta permite sair mantendo todas as verbas de uma dispensa sem justa causa.",
      },
      {
        q: "Trabalhei como PJ ou MEI. Ainda assim tenho direitos?",
        a: "Pode ter. O que define o vínculo é a realidade do dia a dia: pessoalidade, habitualidade, subordinação e salário. Se esses elementos estavam presentes, o contrato pode ser reconhecido como emprego, com registro e todos os reflexos.",
      },
      {
        q: "A empresa ofereceu acordo. Devo aceitar?",
        a: "Depende do quanto o acordo se aproxima do que é efetivamente devido. Fazemos o cálculo antes para que a decisão seja tomada com número na mão, e não no impulso do momento.",
      },
      {
        q: "Moro fora do Brasil. Consigo tocar o processo à distância?",
        a: "Sim. Procuração assinada no exterior, reuniões por videochamada e audiências telepresenciais permitem conduzir o caso sem viagem ao Brasil.",
      },
    ],
    ctaTitle: "Seu caso trabalhista merece um cálculo antes de uma promessa",
    ctaText:
      "Envie os documentos que tiver em mãos. A análise inicial indica o que é possível pedir, o prazo aplicável e a estimativa de valores.",
    whatsappMessage:
      "Olá, gostaria de uma análise de um caso de Direito Trabalhista.",
  },

  "regularizacao-de-imoveis": {
    metaTitle: "Advogado de Regularização de Imóveis — Usucapião, Leilão e Adjudicação",
    metaDescription:
      "Regularização de imóveis em Goiânia e em todo o Brasil: usucapião, adjudicação compulsória, arrematação e defesa em leilão, rescisão de compra e venda e análise documental antes da compra.",
    heroLead:
      "Imóvel sem escritura, matrícula desatualizada, contrato de gaveta ou disputa em leilão: cada uma dessas situações tem uma solução técnica própria. O escritório conduz do estudo documental ao registro final.",
    intro: [
      "No Brasil, quem não registra não é dono. A frase é dura, mas resume o artigo 1.245 do Código Civil: a propriedade de imóvel só se transfere com o registro do título no cartório competente. Contratos particulares, recibos e acordos de família geram obrigações entre as partes, mas não colocam o nome do comprador na matrícula — e é essa lacuna que impede vender, financiar, inventariar ou usar o bem como garantia.",
      "A regularização começa sempre pelo mesmo lugar: a certidão de matrícula atualizada. Ela revela penhoras, hipotecas, usufrutos, indisponibilidades, área divergente e cadeia dominial interrompida. A partir desse retrato definimos o caminho mais curto e menos custoso — extrajudicial, quando o cartório aceita, ou judicial, quando não há alternativa.",
      "O mesmo cuidado se aplica antes da compra. Uma due diligence bem-feita cruza matrícula, certidões dos vendedores, débitos de IPTU e condomínio, ações judiciais e situação do empreendimento. Custa pouco perto do prejuízo de adquirir um imóvel penhorado ou de vendedor insolvente, hipótese em que o negócio pode ser desfeito por fraude à execução.",
    ],
    signals: [
      "Você comprou o imóvel por contrato de gaveta e nunca conseguiu a escritura",
      "O vendedor sumiu, morreu ou se recusa a outorgar a escritura definitiva",
      "Ocupa o imóvel há anos, paga IPTU, mas não tem título de propriedade",
      "Pretende arrematar em leilão e quer saber os riscos do edital",
      "Teve o imóvel levado a leilão por dívida ou financiamento",
      "Quer desfazer uma compra e venda e reaver os valores pagos",
      "A área registrada não corresponde à área real do terreno",
      "Vai comprar e quer conferir a documentação antes de assinar",
    ],
    documents: [
      "Certidão de matrícula atualizada do imóvel",
      "Contrato de compra e venda ou de gaveta",
      "Comprovantes de pagamento e recibos",
      "Carnês de IPTU e comprovantes de posse (contas em seu nome)",
      "Edital e auto de arrematação, em casos de leilão",
      "Documentos pessoais de comprador e vendedor",
    ],
    steps: [
      {
        title: "Diagnóstico da matrícula",
        text: "Leitura da cadeia dominial e das certidões para identificar o obstáculo real ao registro e os riscos ocultos do negócio.",
      },
      {
        title: "Escolha da via",
        text: "Sempre que possível pela via extrajudicial, em cartório, mais rápida e barata. Quando há resistência ou vício, pela via judicial.",
      },
      {
        title: "Instrução do procedimento",
        text: "Reunião de provas de posse, plantas, memoriais, notificações e anuências necessárias para instruir o pedido.",
      },
      {
        title: "Registro e conclusão",
        text: "Acompanhamento até que o título esteja efetivamente registrado na matrícula, encerrando a insegurança sobre o bem.",
      },
    ],
    stats: [
      { value: "15 anos", label: "usucapião extraordinária, sem exigir justo título" },
      { value: "5 anos", label: "usucapião especial urbana de até 250 m² para moradia" },
      { value: "1 matrícula", label: "documento que define o que você realmente possui" },
    ],
    faq: [
      {
        q: "Contrato de gaveta me torna dono do imóvel?",
        a: "Não perante terceiros. Ele prova o negócio entre as partes, mas a propriedade só se transfere com o registro. A adjudicação compulsória é o caminho para converter esse contrato em escritura registrada.",
      },
      {
        q: "Quanto tempo demora um usucapião?",
        a: "O usucapião extrajudicial, feito em cartório com anuência dos confrontantes, costuma ser bem mais rápido que o judicial. O prazo real depende da documentação, da planta e da postura dos vizinhos e do titular registral.",
      },
      {
        q: "Vale a pena comprar imóvel em leilão?",
        a: "Pode valer, desde que o edital seja analisado antes do lance. É preciso verificar dívidas que acompanham o bem, ocupação por terceiros, ações anulatórias em curso e custo real de desocupação.",
      },
      {
        q: "Meu imóvel foi a leilão. Ainda dá para reverter?",
        a: "Em algumas hipóteses sim: vício de intimação, avaliação irreal, preço vil ou irregularidade no procedimento podem anular a arrematação. A análise precisa ser feita com urgência, porque os prazos são curtos.",
      },
      {
        q: "Posso desistir da compra e receber o dinheiro de volta?",
        a: "Depende do contrato e de quem deu causa à rescisão. A jurisprudência limita a retenção pela construtora ou vendedor, e boa parte dos valores pagos costuma ser restituível.",
      },
      {
        q: "Moro no exterior e preciso vender um imóvel no Brasil. Como faço?",
        a: "Com procuração pública lavrada em consulado ou com apostila de Haia, é possível conduzir toda a venda à distância, incluindo assinatura de escritura e registro.",
      },
    ],
    ctaTitle: "Antes de assinar, de arrematar ou de aceitar um acordo, confira a matrícula",
    ctaText:
      "Envie a certidão de matrícula e o contrato. O retorno indica o risco do negócio e o caminho mais curto para regularizar.",
    whatsappMessage:
      "Olá, gostaria de falar sobre regularização de um imóvel.",
  },

  "direito-sucessorio": {
    metaTitle: "Advogado de Inventário e Sucessões — Inventário Judicial e Extrajudicial",
    metaDescription:
      "Inventário judicial e extrajudicial, testamento, doação e planejamento sucessório. Atuação em Goiânia e em todo o Brasil, inclusive para herdeiros que moram no exterior.",
    heroLead:
      "Inventário é procedimento técnico em um momento que raramente é técnico. O escritório conduz a transmissão do patrimônio com atenção ao custo tributário, ao prazo legal e ao equilíbrio entre os herdeiros.",
    intro: [
      "Com o falecimento, o patrimônio transmite-se automaticamente aos herdeiros — é o princípio da saisine. Mas essa transmissão só se torna útil depois do inventário e da partilha: enquanto o procedimento não se conclui, nenhum bem pode ser vendido livremente, contas permanecem bloqueadas e imóveis seguem em nome de quem já faleceu.",
      "O prazo importa. A lei recomenda a abertura do inventário em até dois meses do óbito, e a maioria dos Estados aplica multa sobre o ITCMD quando esse prazo é ultrapassado. Somada aos juros e à correção do imposto, a demora costuma custar mais do que o próprio procedimento.",
      "Havendo consenso entre herdeiros maiores e capazes e não existindo testamento, o inventário pode ser feito em cartório, por escritura pública, em semanas. Havendo menor, incapaz, testamento ou litígio, a via judicial é obrigatória. Em qualquer delas, o trabalho é o mesmo: levantar o acervo, apurar dívidas, calcular o imposto e formalizar a partilha de modo que o resultado não gere um novo conflito.",
      "Quando ainda há tempo, o melhor inventário é o que se planeja antes. Doação com reserva de usufruto, cláusulas de incomunicabilidade e impenhorabilidade, holding familiar e testamento bem redigido reduzem custo, prazo e desgaste — e mantêm decisões patrimoniais dentro da família.",
    ],
    signals: [
      "Houve falecimento e o inventário ainda não foi aberto",
      "Existem imóveis, veículos ou contas em nome de quem faleceu",
      "Os herdeiros divergem sobre a divisão dos bens",
      "Um dos herdeiros mora no exterior e não pode viajar",
      "Há testamento e você não sabe se ele é válido",
      "Um herdeiro foi excluído ou não foi comunicado",
      "Existe união estável a ser reconhecida para fins de herança",
      "Você quer organizar a sucessão em vida e reduzir o custo futuro",
    ],
    documents: [
      "Certidão de óbito e documentos do falecido",
      "Certidão de casamento ou prova de união estável",
      "Documentos dos herdeiros e comprovantes de parentesco",
      "Matrículas dos imóveis e documentos de veículos",
      "Extratos bancários, previdência privada e participações societárias",
      "Testamento, se houver, e comprovantes de dívidas do espólio",
    ],
    steps: [
      {
        title: "Levantamento do acervo",
        text: "Identificação de bens, contas, dívidas e beneficiários, incluindo ativos esquecidos como consórcios e valores a receber.",
      },
      {
        title: "Definição da via",
        text: "Cartório quando há consenso e herdeiros capazes; judicial quando há menor, incapaz, testamento ou litígio.",
      },
      {
        title: "Cálculo e recolhimento do ITCMD",
        text: "Apuração da base de cálculo, verificação de isenções e recolhimento dentro do prazo para evitar multa.",
      },
      {
        title: "Partilha e transferência",
        text: "Formalização da partilha e transferência efetiva dos bens: registro dos imóveis, veículos e liberação das contas.",
      },
    ],
    stats: [
      { value: "60 dias", label: "prazo recomendado para abrir o inventário" },
      { value: "50%", label: "parcela legítima reservada aos herdeiros necessários" },
      { value: "Cartório", label: "via extrajudicial quando há consenso entre herdeiros" },
    ],
    faq: [
      {
        q: "Quanto tempo demora um inventário?",
        a: "O extrajudicial, com documentação completa e consenso, costuma se resolver em algumas semanas. O judicial depende da comarca e da existência de litígio, podendo levar de meses a anos.",
      },
      {
        q: "Dá para fazer inventário sem ir ao cartório pessoalmente?",
        a: "Sim, por procuração pública com poderes específicos. Herdeiros que moram em outro Estado ou no exterior participam integralmente à distância.",
      },
      {
        q: "É possível vender um bem antes de terminar o inventário?",
        a: "É possível com autorização judicial ou com a concordância de todos os herdeiros, mediante alvará. Sem isso, a venda fica sujeita a anulação.",
      },
      {
        q: "Quem herda quando não há testamento?",
        a: "A lei define a ordem: descendentes, ascendentes, cônjuge ou companheiro e colaterais até o quarto grau. O cônjuge pode concorrer com os filhos, dependendo do regime de bens do casamento.",
      },
      {
        q: "Posso deixar todos os bens para uma só pessoa?",
        a: "Só a metade disponível. Havendo herdeiros necessários — filhos, netos, pais ou cônjuge —, 50% do patrimônio é legítima e não pode ser afastada por testamento.",
      },
      {
        q: "Vale a pena fazer planejamento sucessório?",
        a: "Na maioria dos casos sim. Doação com usufruto, cláusulas de proteção e estruturas societárias reduzem imposto, evitam disputa e encurtam drasticamente o tempo de transmissão.",
      },
    ],
    ctaTitle: "Inventário parado é patrimônio parado — e imposto crescendo",
    ctaText:
      "Envie a certidão de óbito e a relação de bens. O escritório indica a via cabível, o custo estimado e o prazo realista.",
    whatsappMessage: "Olá, gostaria de falar sobre inventário / sucessões.",
  },

  "direito-de-familia": {
    metaTitle: "Advogado de Família — Divórcio, Pensão Alimentícia, Guarda e União Estável",
    metaDescription:
      "Divórcio consensual e litigioso, pensão alimentícia, guarda e visitas, união estável e investigação de paternidade. Atendimento discreto em Goiânia, em todo o Brasil e para quem mora no exterior.",
    heroLead:
      "Questões de família se resolvem melhor quando alguém mantém a técnica enquanto as partes lidam com o resto. O escritório busca acordo quando há espaço para diálogo e atua com firmeza quando o caso exige decisão judicial.",
    intro: [
      "Desde a Emenda Constitucional 66/2010, o divórcio não exige separação prévia nem discussão de culpa: basta a vontade de um dos cônjuges. O que costuma travar o processo não é o fim do casamento em si, mas o que vem junto — partilha de bens, guarda dos filhos, valor dos alimentos e uso do imóvel comum.",
      "Nada disso precisa virar batalha. Quando há consenso e não existem filhos menores ou incapazes, o divórcio pode ser feito em cartório, por escritura pública, em pouco tempo e com custo reduzido. Havendo filho menor, incapaz ou desacordo, o caminho é judicial — o que não impede que o acordo seja construído durante o processo e apenas homologado pelo juiz.",
      "Em matéria de alimentos e convivência, o critério legal é o interesse da criança e o binômio necessidade e possibilidade. Não existe percentual fixo obrigatório: o valor decorre das despesas comprovadas do filho e da capacidade real de quem paga, e pode ser revisto sempre que a situação mudar. Guarda compartilhada é a regra, e afastá-la exige demonstração concreta de que ela não atende ao filho.",
      "Todo atendimento é conduzido com discrição. Processos de família correm em segredo de justiça, e a postura do escritório acompanha isso: informação clara ao cliente, sem exposição desnecessária de terceiros nem uso do processo como instrumento de retaliação.",
    ],
    signals: [
      "Você decidiu se divorciar e não sabe por onde começar",
      "Há bens a partilhar e divergência sobre o que cabe a cada um",
      "A pensão alimentícia não é paga ou está defasada há anos",
      "O valor fixado se tornou incompatível com sua renda atual",
      "Há dificuldade para conviver com o filho ou descumprimento das visitas",
      "Viveram juntos sem casamento e é preciso reconhecer a união estável",
      "É necessário reconhecer ou contestar a paternidade",
      "Um dos cônjuges mora no exterior e o divórcio precisa correr à distância",
    ],
    documents: [
      "Certidão de casamento ou provas da união estável",
      "Documentos pessoais do casal e certidões dos filhos",
      "Relação e documentos dos bens do casal",
      "Comprovantes de renda de ambos",
      "Comprovantes das despesas dos filhos (escola, saúde, moradia)",
      "Comprovantes de pagamento ou de inadimplemento da pensão",
    ],
    steps: [
      {
        title: "Escuta e diagnóstico",
        text: "Entendimento do contexto familiar e patrimonial e definição do que é prioridade: filhos, bens ou proteção imediata.",
      },
      {
        title: "Tentativa de consenso",
        text: "Negociação com a outra parte ou seu advogado, buscando acordo que possa ser homologado sem anos de litígio.",
      },
      {
        title: "Medidas urgentes",
        text: "Quando necessário, alimentos provisórios, definição imediata de guarda ou medidas protetivas antes da discussão de mérito.",
      },
      {
        title: "Condução judicial",
        text: "Ação, audiências, provas e acompanhamento até a sentença e o cumprimento efetivo do que foi decidido.",
      },
    ],
    stats: [
      { value: "Cartório", label: "divórcio consensual sem filhos menores ou incapazes" },
      { value: "3 meses", label: "de pensão em atraso podem gerar prisão civil" },
      { value: "Segredo", label: "processos de família correm sob sigilo" },
    ],
    faq: [
      {
        q: "Divórcio precisa da concordância do outro cônjuge?",
        a: "Não. O divórcio é direito potestativo: basta a vontade de um. A discordância pode atrasar a partilha ou as questões dos filhos, mas não impede a dissolução do casamento.",
      },
      {
        q: "Dá para se divorciar sem partilhar os bens agora?",
        a: "Sim. É possível decretar o divórcio e deixar a partilha para um segundo momento, o que costuma destravar situações em que o único ponto de conflito é o patrimônio.",
      },
      {
        q: "Qual o valor da pensão alimentícia?",
        a: "Não há percentual fixo em lei. O juiz considera as necessidades comprovadas do filho e a possibilidade de quem paga. O percentual sobre a renda é uma prática comum, não uma regra automática.",
      },
      {
        q: "O que fazer quando a pensão não é paga?",
        a: "Cabe execução. Nos três meses mais recentes, o débito admite prisão civil; para o período anterior, penhora de bens, bloqueio de contas, protesto e inclusão em cadastros de inadimplentes.",
      },
      {
        q: "Guarda compartilhada obriga a criança a morar meio período em cada casa?",
        a: "Não. Guarda compartilhada trata da divisão das decisões sobre a vida do filho. A residência principal e o calendário de convivência são definidos separadamente, conforme a rotina real da criança.",
      },
      {
        q: "Um dos cônjuges mora no exterior. É possível divorciar?",
        a: "Sim, inclusive por procuração. Também é possível homologar no Brasil um divórcio decidido no exterior para que produza efeitos aqui.",
      },
    ],
    ctaTitle: "Uma conversa reservada antes de qualquer decisão",
    ctaText:
      "Explique a situação em poucas linhas. O retorno indica o caminho possível, o que é urgente e o que pode ser resolvido por acordo.",
    whatsappMessage: "Olá, gostaria de falar sobre uma questão de Direito de Família.",
  },
};

export const homeFaq: FaqItem[] = [
  {
    q: "O escritório atende em quais cidades?",
    a: "A base é em Goiânia, Goiás, com atuação em todo o território nacional. Processos eletrônicos e audiências por videoconferência permitem conduzir casos em qualquer Estado, e o atendimento remoto alcança também brasileiros que moram no exterior.",
  },
  {
    q: "A primeira conversa tem custo?",
    a: "O contato inicial pelo WhatsApp serve para entender o caso e verificar se ele é atendido pelo escritório. Havendo necessidade de análise documental ou parecer, os honorários são informados antes por escrito, sem surpresa.",
  },
  {
    q: "Como funcionam os honorários?",
    a: "Dependem da área, da complexidade e do tempo estimado. Podem ser fixos, por etapa ou combinados com percentual sobre o êxito, sempre dentro da tabela da OAB e formalizados em contrato antes do início do trabalho.",
  },
  {
    q: "Vocês garantem que eu vou ganhar o processo?",
    a: "Não. Nenhum advogado pode garantir resultado, e o Código de Ética da OAB proíbe esse tipo de promessa. O que o escritório entrega é análise honesta de chance de êxito, incluindo os cenários desfavoráveis.",
  },
  {
    q: "Quem cuida do meu caso no dia a dia?",
    a: "O advogado responsável acompanha diretamente. Você fala com quem conhece o processo, e não com um atendente que precisa consultar alguém para responder.",
  },
  {
    q: "Moro fora do Brasil. Preciso viajar para resolver?",
    a: "Na maioria dos casos, não. Com procuração assinada em consulado ou com apostila de Haia, inventários, divórcios, vendas de imóvel e ações trabalhistas podem ser conduzidos integralmente à distância.",
  },
];

export const areaAbout: Record<string, string[]> = {
  "direito-trabalhista": [
    "Quem cuida dos casos trabalhistas do escritório é Edmom Moraes. O atendimento começa pela leitura do que você tem em mãos: carteira, holerite, ponto, conversa de WhatsApp com a chefia. É desse material que sai a conta do que a empresa deixou de pagar.",
    "Boa parte dos casos se resolve sem anos de processo, em acordo homologado. Quando a empresa não senta para conversar, a ação é ajuizada com a prova já organizada e o cliente sabe, desde o início, quais pedidos são sólidos e quais são discutíveis.",
    "Atendimento em Goiânia e, por vídeo, em audiências e reuniões de qualquer lugar do Brasil.",
  ],
  "regularizacao-de-imoveis": [
    "Os casos de imóvel são conduzidos por Edmom Moraes, do estudo da matrícula até o registro final. Antes de qualquer medida, o escritório confere matrícula, IPTU, certidões do vendedor e o histórico da posse. É aí que aparecem os problemas que travam o negócio depois.",
    "Compra desfeita, leilão, usucapião e escritura que o vendedor não assina têm caminhos diferentes, e nem todos passam pelo Judiciário. Cartório e acordo resolvem mais coisa do que parece, e costumam custar menos.",
    "O cliente acompanha cada etapa e recebe aviso quando algum documento precisa ser providenciado.",
  ],
  "direito-sucessorio": [
    "Inventários e planejamento sucessório ficam com Edmom Moraes. O primeiro contato costuma acontecer num momento difícil, e o escritório procura conduzir com calma: levantar os bens, ver quem são os herdeiros e explicar o custo real do procedimento antes de começar.",
    "Quando há acordo entre os herdeiros e nenhum incapaz envolvido, o inventário pode sair em cartório, em semanas. Havendo disputa ou testamento, o caminho é judicial, e o escritório atua para reduzir o desgaste entre as partes.",
    "Herdeiro que mora fora do Brasil participa por procuração, sem precisar viajar.",
  ],
  "direito-de-familia": [
    "As causas de família são atendidas diretamente por Edmom Moraes, com discrição. Divórcio, guarda e pensão envolvem informação sensível, e o escritório trata cada caso com reserva, sem exposição desnecessária.",
    "Sempre que existe abertura para conversa, o acordo vem antes: sai mais rápido, custa menos e poupa as crianças do meio do conflito. Quando não há acordo possível, a atuação é firme e o pedido vai instruído com o que a Justiça precisa ver.",
    "Atendimento presencial em Goiânia e por videoconferência, inclusive para quem mora no exterior.",
  ],
};
