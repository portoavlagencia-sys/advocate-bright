import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";
import { site } from "@/lib/site";

export const Route = createFileRoute("/escritorio")({
  head: () => ({
    meta: [
      { title: "O Escritório — Edmom Moraes Advocacia" },
      {
        name: "description",
        content:
          "Conheça a forma de atuação do escritório: análise prévia do caso, linguagem clara, acompanhamento direto do advogado responsável.",
      },
      { property: "og:title", content: "O Escritório — Edmom Moraes Advocacia" },
      {
        property: "og:description",
        content:
          "Advocacia conduzida com técnica, discrição e comunicação direta com o cliente.",
      },
    ],
  }),
  component: EscritorioPage,
});

const values = [
  {
    number: "01",
    title: "Análise antes de promessa",
    text: "Nenhuma medida é proposta sem o estudo dos documentos e dos prazos. Quando não há caminho viável, o cliente ouve isso na primeira conversa.",
  },
  {
    number: "02",
    title: "Linguagem que o cliente entende",
    text: "Petições são técnicas; explicações não precisam ser. Cada etapa é traduzida em português claro, com cenários possíveis descritos sem otimismo artificial.",
  },
  {
    number: "03",
    title: "Contato direto com o advogado",
    text: "Sem camadas intermediárias. O acompanhamento é feito por quem conduz o processo, por WhatsApp, vídeo ou presencialmente.",
  },
  {
    number: "04",
    title: "Discrição como método",
    text: "Casos de família, sucessão e patrimônio exigem reserva. Informação de cliente não vira conteúdo, exemplo ou material de divulgação.",
  },
];

function EscritorioPage() {
  return (
    <>
      <PageHero
        eyebrow="O Escritório"
        title={
          <>
            Advocacia conduzida por quem <span className="font-medium">atende</span>,
            não apenas por quem assina.
          </>
        }
        lead="Um escritório enxuto, com número controlado de casos, para que cada cliente tenha resposta, prazo e estratégia definidos."
      />

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[84rem] gap-14 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-28">
          <Reveal>
            <div className="border border-border bg-surface p-10">
              <span className="eyebrow text-green-bright">Advogado responsável</span>
              <h2 className="mt-6 text-2xl font-light tracking-tight">
                {site.lawyer}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{site.oab}</p>
              <span className="rule-green mt-8" />
              <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                Atuação contenciosa e consultiva em Direito Trabalhista, Imobiliário,
                Sucessório e de Família, com atendimento a clientes no Brasil e no
                exterior.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
              <p>
                O escritório nasceu de uma constatação simples: a maior parte da angústia
                de quem entra em um processo não vem da lei, vem da falta de informação.
                Cliente que entende o próprio caso decide melhor — e cobra melhor o seu
                advogado.
              </p>
              <p>
                Por isso o trabalho começa sempre pela leitura integral dos documentos e
                por uma conversa franca sobre o que a via judicial pode e não pode
                entregar. Prazos são apresentados como são, não como gostaríamos que
                fossem.
              </p>
              <p>
                A atuação se concentra em quatro áreas em que a técnica faz diferença
                concreta no resultado: relações de trabalho, patrimônio imobiliário,
                sucessões e família. A esse recorte soma-se o atendimento remoto a
                brasileiros que vivem fora do país.
              </p>
              <p className="text-xs italic text-muted-foreground/80">
                Texto institucional preliminar — ajustaremos com a sua biografia
                definitiva, número de OAB e foto assim que você enviar.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-28">
          <Reveal>
            <span className="eyebrow text-green-bright">Como trabalhamos</span>
          </Reveal>
          <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2">
            {values.map((value, i) => (
              <Reveal key={value.number} delay={i * 0.05} className="bg-surface">
                <div className="h-full p-8 lg:p-12">
                  <span className="text-xs tracking-[0.2em] text-green-bright">
                    {value.number}
                  </span>
                  <h3 className="mt-6 text-xl font-light">{value.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {value.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
