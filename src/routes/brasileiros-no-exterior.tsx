import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";
import { exteriorServices, site } from "@/lib/site";

export const Route = createFileRoute("/brasileiros-no-exterior")({
  head: () => ({
    meta: [
      { title: "Brasileiros no Exterior — advocacia remota no Brasil" },
      {
        name: "description",
        content:
          "Inventário, divórcio, imóveis e documentos no Brasil resolvidos à distância, por procuração, para brasileiros que moram fora do país.",
      },
      { property: "og:title", content: "Brasileiros no Exterior — Edmom Moraes Advocacia" },
      {
        property: "og:description",
        content:
          "Atendimento 100% remoto para quem mora fora e precisa resolver questões jurídicas no Brasil.",
      },
    ],
  }),
  component: ExteriorPage,
});

const steps = [
  {
    number: "01",
    title: "Primeira conversa por vídeo",
    text: "Você relata o caso, envia os documentos que já tem e recebe um panorama honesto do que é possível, em quanto tempo e a que custo.",
  },
  {
    number: "02",
    title: "Procuração no consulado ou apostilada",
    text: "Preparamos a minuta. Você assina no consulado brasileiro ou em cartório local com apostila de Haia e tradução juramentada.",
  },
  {
    number: "03",
    title: "Condução do caso no Brasil",
    text: "Cartórios, tribunais, bancos e órgãos públicos são acessados pelo escritório. Nada exige a sua presença física.",
  },
  {
    number: "04",
    title: "Relatórios e fuso respeitado",
    text: "Atualizações por WhatsApp e e-mail, com reuniões agendadas em horário compatível com o seu país.",
  },
];

function ExteriorPage() {
  return (
    <>
      <PageHero
        eyebrow="Atendimento remoto"
        title={
          <>
            Você construiu a vida fora.
            <br />
            <span className="font-medium">O que ficou aqui, resolvemos daqui.</span>
          </>
        }
        lead="Inventário, divórcio, imóveis e regularização de documentos conduzidos integralmente no Brasil, por procuração, sem que você precise viajar."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-28">
          <Reveal>
            <span className="eyebrow text-green-bright">Como funciona</span>
          </Reveal>
          <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.05} className="bg-background">
                <div className="h-full p-8 lg:p-10">
                  <span className="text-xs tracking-[0.2em] text-green-bright">
                    {step.number}
                  </span>
                  <h2 className="mt-6 text-base font-medium leading-snug">{step.title}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-28">
          <Reveal>
            <h2 className="max-w-3xl text-3xl font-light leading-[1.12] tracking-tight sm:text-4xl">
              O que costuma chegar de fora do Brasil
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Cada demanda abaixo pertence a uma das áreas do escritório. Clique para ver
              o detalhamento completo do serviço.
            </p>
          </Reveal>
          <div className="mt-14 divide-y divide-border border-y border-border">
            {exteriorServices.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <Link
                  to="/areas-de-atuacao/$slug"
                  params={{ slug: item.areaSlug }}
                  className="group grid gap-4 py-10 transition-colors hover:bg-secondary/40 lg:grid-cols-[1fr_1.2fr_auto] lg:items-center"
                >
                  <span>
                    <span className="eyebrow block text-muted-foreground">
                      {item.areaLabel}
                    </span>
                    <span className="mt-3 block text-xl font-light">{item.title}</span>
                  </span>
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </span>
                  <ArrowUpRight className="size-5 text-green-bright opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Fuso diferente, mesma atenção."
        text={`Atendimento por videochamada e WhatsApp em horário combinado. ${site.phoneDisplay} · ${site.email}`}
      />
    </>
  );
}
