export const site = {
  name: "Edmom Moraes Advocacia",
  lawyer: "Edmom Moraes",
  oab: "OAB/GO (a informar)",
  phoneDisplay: "(62) 8206-0993",
  whatsappNumber: "556282060993",
  email: "contato@edmommoraes.adv.br",
  instagram: "@edmommoraes.adv",
  instagramUrl: "https://instagram.com/",
  city: "Goiânia · Goiás · atendimento em todo o Brasil e no exterior",
  hours: "Segunda a sexta, das 9h às 18h (horário de Brasília)",
} as const;

export const whatsappLink = (
  message = "Olá, gostaria de falar com o escritório sobre um caso.",
) => `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;

export type Area = {
  slug: string;
  number: string;
  title: string;
  short: string;
  description: string;
  services: { title: string; text: string }[];
};

export const areas: Area[] = [
  {
    slug: "direito-trabalhista",
    number: "01",
    title: "Direito Trabalhista",
    short: "Relações de trabalho, verbas devidas e reparação de abusos.",
    description:
      "Atuação para trabalhadores que tiveram direitos descumpridos durante o contrato ou na saída da empresa. Análise do caso, reunião de provas e condução da ação com acompanhamento próximo em cada etapa.",
    services: [
      {
        title: "Rescisão indireta",
        text: "Quando a empresa descumpre o contrato, é possível encerrar o vínculo mantendo todas as verbas de uma dispensa sem justa causa.",
      },
      {
        title: "Reconhecimento de vínculo empregatício",
        text: "Trabalho sem registro, PJ forçada ou contrato disfarçado: o vínculo pode ser reconhecido judicialmente com todos os reflexos.",
      },
      {
        title: "Acidente de trabalho",
        text: "Reparação por danos materiais, morais e estéticos, além de estabilidade e benefícios decorrentes do acidente ou da doença ocupacional.",
      },
      {
        title: "Estabilidade no emprego",
        text: "Gestante, acidentária, membro da CIPA e pré-aposentadoria: hipóteses em que a dispensa pode ser questionada.",
      },
      {
        title: "Verbas rescisórias não pagas",
        text: "Saldo de salário, aviso prévio, férias, 13º e FGTS não quitados na saída da empresa.",
      },
      {
        title: "Horas extras não pagas",
        text: "Jornada além do contratado, supressão de intervalo e trabalho em regime de sobreaviso sem a devida contraprestação.",
      },
      {
        title: "Assédio moral no trabalho",
        text: "Humilhações, metas abusivas e exposição do trabalhador: condutas que podem gerar dever de indenizar.",
      },
      {
        title: "Reversão de justa causa",
        text: "Discussão da penalidade aplicada, das provas apresentadas pela empresa e das verbas suprimidas.",
      },
    ],
  },
  {
    slug: "regularizacao-de-imoveis",
    number: "02",
    title: "Regularização de Imóveis",
    short: "Segurança jurídica na aquisição, na posse e na titulação do bem.",
    description:
      "Do estudo do negócio à regularização da matrícula. Análise documental prévia, condução das medidas judiciais e extrajudiciais necessárias e acompanhamento até o registro.",
    services: [
      {
        title: "Leilão: arrematação e defesa",
        text: "Análise do edital e dos riscos antes de arrematar, além de defesa de quem teve o imóvel levado a leilão.",
      },
      {
        title: "Rescisão contratual",
        text: "Compra e venda desfeita, devolução de valores pagos e discussão de cláusulas de retenção.",
      },
      {
        title: "Compra e venda de imóveis",
        text: "Due diligence documental, redação e revisão de contratos e acompanhamento até a escritura e o registro.",
      },
      {
        title: "Usucapião",
        text: "Reconhecimento da propriedade pela posse prolongada, na via judicial ou diretamente no cartório.",
      },
      {
        title: "Adjudicação compulsória",
        text: "Obtenção da escritura quando o vendedor se recusa a outorgá-la ou não pode mais ser localizado.",
      },
    ],
  },
  {
    slug: "direito-sucessorio",
    number: "03",
    title: "Direito Sucessório",
    short: "Transmissão de patrimônio conduzida com técnica e serenidade.",
    description:
      "Condução de inventários e do planejamento da sucessão, com atenção ao custo tributário, ao tempo do procedimento e ao equilíbrio entre os envolvidos.",
    services: [
      {
        title: "Inventário judicial e extrajudicial",
        text: "Levantamento do acervo, partilha, recolhimento do ITCMD e transferência dos bens aos herdeiros.",
      },
      {
        title: "Doação",
        text: "Antecipação de legítima, reserva de usufruto e cláusulas de proteção do bem doado.",
      },
      {
        title: "Testamento",
        text: "Elaboração dentro dos limites legais, com clareza suficiente para evitar disputa futura.",
      },
      {
        title: "Planejamento sucessório e patrimonial",
        text: "Organização do patrimônio em vida para reduzir conflitos, custos e tempo de transmissão.",
      },
    ],
  },
  {
    slug: "direito-de-familia",
    number: "04",
    title: "Direito de Família",
    short: "Decisões delicadas conduzidas com discrição e firmeza técnica.",
    description:
      "Atuação em questões familiares com foco em acordos viáveis quando há espaço para diálogo e em atuação firme quando o caso exige decisão judicial.",
    services: [
      {
        title: "Divórcio consensual e litigioso",
        text: "Dissolução do casamento, partilha de bens e definição das questões relativas aos filhos.",
      },
      {
        title: "Pensão alimentícia",
        text: "Fixação, revisão e execução, inclusive nas hipóteses de prisão civil do devedor.",
      },
      {
        title: "Guarda e visitas",
        text: "Guarda compartilhada ou unilateral e regulamentação da convivência.",
      },
      {
        title: "União estável",
        text: "Reconhecimento, dissolução, contrato de convivência e efeitos patrimoniais.",
      },
      {
        title: "Investigação de paternidade",
        text: "Reconhecimento do vínculo, exame de DNA e reflexos alimentares e sucessórios.",
      },
    ],
  },
];

export const exteriorServices = [
  {
    title: "Inventário à distância",
    text: "Herdeiro que mora fora participa do inventário por procuração, sem precisar desembarcar no Brasil.",
    areaSlug: "direito-sucessorio",
    areaLabel: "Direito Sucessório",
  },
  {
    title: "Divórcio internacional ou por procuração",
    text: "Um dos cônjuges no exterior: o processo corre no Brasil com representação e comunicação por vídeo.",
    areaSlug: "direito-de-familia",
    areaLabel: "Direito de Família",
  },
  {
    title: "Venda ou compra de imóvel no Brasil",
    text: "Negociação, contrato, escritura e registro conduzidos aqui, com procuração emitida no consulado.",
    areaSlug: "regularizacao-de-imoveis",
    areaLabel: "Regularização de Imóveis",
  },
  {
    title: "Regularização de documentos e patrimônio",
    text: "Aposentadoria, herança e bens no Brasil organizados para quem construiu a vida em outro país.",
    areaSlug: "direito-trabalhista",
    areaLabel: "Direito Trabalhista",
  },
];
