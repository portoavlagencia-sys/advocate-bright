import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";
import { site, whatsappLink } from "@/lib/site";
import retrato from "@/assets/dr-edmom-moraes-advogado.webp";

import heroEscritorio from "@/assets/hero-escritorio-em.webp";
import arquivo from "@/assets/foto-arquivo-processos.webp";

export const Route = createFileRoute("/escritorio")({
  head: () => ({
    meta: [
      { title: "O Escritório — Edmom Moraes Advocacia" },
      {
        name: "description",
        content:
          "Escritório de advocacia em Goiânia com atuação em Trabalhista, Imóveis, Sucessões e Família. Análise do caso antes de qualquer medida e contato direto com o advogado.",
      },
      { property: "og:title", content: "O Escritório — Edmom Moraes Advocacia" },
      {
        property: "og:description",
        content:
          "Quem conduz o escritório, como o caso é analisado e de que forma o cliente é acompanhado.",
      },
    ],
  }),
  component: EscritorioPage,
});

const values = [
  {
    number: "01",
    title: "Primeiro os documentos",
    text: "Antes de falar em ação, o caso é lido: contrato, holerite, matrícula do imóvel, conversa de WhatsApp, o que existir. Se o material não sustenta o pedido, o cliente ouve isso logo na primeira conversa.",
  },
  {
    number: "02",
    title: "Explicação em português",
    text: "A petição é técnica porque precisa ser. A conversa não. Cada etapa é explicada com o que costuma acontecer, quanto tempo costuma levar e o que pode dar errado.",
  },
  {
    number: "03",
    title: "Quem atende é quem conduz",
    text: "O cliente fala com o advogado que lê o processo, não com um intermediário. WhatsApp, videochamada ou presencial, em Goiânia.",
  },
  {
    number: "04",
    title: "Assunto de cliente não vira exemplo",
    text: "Casos de família, herança e patrimônio pedem reserva. Nada do que é tratado aqui é usado em conteúdo, aula ou divulgação.",
  },
];

const etapas = [
  {
    title: "Conversa inicial",
    text: "Você conta o que aconteceu e envia os documentos que tiver. Nessa etapa ainda não existe promessa nenhuma.",
  },
  {
    title: "Análise e prazos",
    text: "Leitura do material, checagem de prazo e do que a prova permite pedir. Você recebe um retorno com os cenários possíveis.",
  },
  {
    title: "Acordo ou ação",
    text: "Quando a negociação resolve mais rápido, ela vem primeiro. Quando não resolve, a ação é preparada com a prova já conferida.",
  },
  {
    title: "Acompanhamento",
    text: "Movimentações relevantes são avisadas. Nada de descobrir o andamento do próprio processo por terceiros.",
  },
];

function EscritorioPage() {
  return (
    <>
      <PageHero
        eyebrow="O Escritório"
        title={
          <>
            Advocacia conduzida por quem <span className="font-medium">atende</span> o
            cliente.
          </>
        }
        lead="Escritório em Goiânia, com atuação em Direito Trabalhista, Regularização de Imóveis, Sucessões e Família, e atendimento remoto para clientes de outros Estados e do exterior."
        bgImage={heroEscritorio}
        bgAlt="Recepção do escritório Edmom Moraes Advocacia"
      />

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[84rem] gap-12 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:px-10 lg:py-28">
          <Reveal>
            <div className="relative">
              <img
                src={retrato}
                alt={`${site.lawyer}, advogado responsável pelo escritório`}
                width={1200}
                height={1499}
                loading="lazy"
                className="w-full object-cover"
              />
              <div className="absolute -bottom-px left-0 right-0 border-t-2 border-green-bright bg-background/90 px-5 py-4 backdrop-blur-sm sm:px-6 sm:py-5">
                <span className="block text-sm font-medium tracking-[0.08em]">
                  {site.lawyer}
                </span>
                <span className="mt-1 block text-[0.68rem] uppercase tracking-[0.22em] text-green-bright">
                  Advogado responsável · {site.oab}
                </span>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="eyebrow text-green-bright">Quem conduz</span>
              <span className="rule-green mt-5" />
              <h2 className="mt-8 text-[1.9rem] font-light leading-[1.12] tracking-tight sm:text-4xl">
                O caso é lido antes de virar processo
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground">
                <p>
                  {site.lawyer} atua em quatro frentes: relações de trabalho, patrimônio
                  imobiliário, sucessões e família. São matérias distintas, mas quase
                  sempre chegam no mesmo momento — alguém foi demitido, alguém morreu, um
                  casamento acabou, um imóvel comprado nunca saiu do papel.
                </p>
                <p>
                  Boa parte da aflição de quem procura um advogado não vem da lei, vem de
                  não saber o que esperar. Por isso o trabalho começa pela leitura
                  integral do que o cliente tem em mãos e por uma conversa direta sobre o
                  que a via judicial resolve e o que ela não resolve. Prazo é apresentado
                  como é.
                </p>
                <p>
                  O atendimento é em Goiânia e também por videoconferência, para clientes
                  de outros Estados e para brasileiros que moram fora e precisam resolver
                  alguma coisa aqui.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="mt-10 inline-flex items-center gap-2 bg-primary px-6 py-4 text-[0.7rem] uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-green-bright"
              >
                Falar com o advogado
                <ArrowUpRight className="size-4" />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-28">
          <Reveal>
            <span className="eyebrow text-green-bright">Como trabalhamos</span>
          </Reveal>
          <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2">
            {values.map((value, i) => (
              <Reveal key={value.number} delay={i * 0.05} className="bg-surface">
                <div className="h-full p-7 sm:p-8 lg:p-12">
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

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[84rem] gap-12 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:px-10 lg:py-28">
          <div>
            <Reveal>
              <span className="eyebrow text-green-bright">Do primeiro contato à decisão</span>
              <h2 className="mt-6 text-[1.7rem] font-light leading-tight tracking-tight sm:text-3xl">
                O que acontece depois que você chama no WhatsApp
              </h2>
            </Reveal>
            <div className="mt-10 divide-y divide-border border-y border-border">
              {etapas.map((etapa, i) => (
                <Reveal key={etapa.title} delay={0.08 + i * 0.05}>
                  <div className="flex gap-5 py-6 sm:gap-6">
                    <span className="pt-1 text-xs tracking-[0.2em] text-green-bright">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-base font-medium">{etapa.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {etapa.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.14}>
            <img
              src={arquivo}
              alt="Pastas e documentos de processos organizados no escritório"
              loading="lazy"
              className="h-full min-h-64 w-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
