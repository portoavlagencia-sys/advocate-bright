import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";
import { areas } from "@/lib/site";

export const Route = createFileRoute("/areas-de-atuacao/")({
  head: () => ({
    meta: [
      { title: "Áreas de Atuação — Edmom Moraes Advocacia" },
      {
        name: "description",
        content:
          "Direito Trabalhista, Regularização de Imóveis, Direito Sucessório e Direito de Família: veja como o escritório atua em cada frente.",
      },
      { property: "og:title", content: "Áreas de Atuação — Edmom Moraes Advocacia" },
      {
        property: "og:description",
        content:
          "Trabalhista, Imóveis, Sucessões e Família — escopo definido, prazos reais e acompanhamento direto.",
      },
    ],
  }),
  component: AreasIndex,
});

function AreasIndex() {
  return (
    <>
      <PageHero
        eyebrow="Áreas de Atuação"
        title={
          <>
            Quatro áreas. Um mesmo padrão de{" "}
            <span className="font-medium">análise antes da ação.</span>
          </>
        }
        lead="Antes de propor qualquer medida, o caso é estudado: documentos, prazos, chance de êxito e custo. Só então o caminho é apresentado."
      />

      <section>
        <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-28">
          <div className="divide-y divide-border border-y border-border">
            {areas.map((area, i) => (
              <Reveal key={area.slug} delay={i * 0.05}>
                <Link
                  to="/areas-de-atuacao/$slug"
                  params={{ slug: area.slug }}
                  className="group grid gap-6 px-2 py-12 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-surface/60 hover:px-5 lg:grid-cols-[6rem_1fr_1fr] lg:items-start"
                >
                  <span className="text-xs tracking-[0.2em] text-green-bright">
                    {area.number}
                  </span>
                  <h2 className="flex items-center gap-3 text-2xl font-light tracking-tight sm:text-3xl">
                    {area.title}
                    <ArrowUpRight className="size-5 text-green-bright opacity-0 transition-opacity group-hover:opacity-100" />
                  </h2>
                  <div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {area.description}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {area.services.slice(0, 4).map((s) => (
                        <li
                          key={s.title}
                          className="border border-border px-3 py-1.5 text-xs text-foreground/70"
                        >
                          {s.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
