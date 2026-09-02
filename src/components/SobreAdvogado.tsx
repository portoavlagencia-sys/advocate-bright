import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import retrato from "@/assets/advogado-edmom-moraes.jpg";
import { Reveal } from "./Reveal";
import { site } from "@/lib/site";

const marcas = [
  {
    title: "Atuação em todo o Brasil",
    text: "Processo eletrônico e audiências por videoconferência permitem conduzir casos em qualquer Estado, com base em Goiânia.",
  },
  {
    title: "Interlocução direta",
    text: "Quem analisa o caso é quem responde no WhatsApp. Sem intermediários repetindo informação de segunda mão.",
  },
  {
    title: "Estratégia antes da petição",
    text: "Documento, prazo, prova e cenário de risco definidos antes de qualquer medida ser ajuizada.",
  },
];

export function SobreAdvogado() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-[84rem] gap-14 px-6 py-24 lg:grid-cols-[0.85fr_1.15fr] lg:px-10 lg:py-32">
        <Reveal>
          <div className="relative">
            <img
              src={retrato}
              alt={`${site.lawyer}, advogado responsável pelo escritório`}
              width={1024}
              height={1280}
              loading="lazy"
              className="w-full object-cover grayscale-[0.15]"
            />
            <div className="absolute -bottom-px left-0 right-0 border-t-2 border-green-bright bg-background/90 px-6 py-5 backdrop-blur-sm">
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
            <span className="eyebrow text-green-bright">Quem conduz o escritório</span>
            <span className="rule-green mt-5" />
            <h2 className="mt-8 text-3xl font-light leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.9rem]">
              Advocacia conduzida por quem assina o processo do começo ao fim
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground">
              <p>
                {site.lawyer} atua nas frentes de Direito Trabalhista, Regularização de
                Imóveis, Direito Sucessório e Direito de Família, com clientes em Goiânia,
                em outros Estados e no exterior. A experiência acumulada nessas quatro
                áreas permite enxergar o caso inteiro: uma separação que envolve imóvel
                irregular, um inventário que esbarra em matrícula desatualizada, uma
                rescisão que se conecta a patrimônio de família.
              </p>
              <p>
                A condução técnica é acompanhada de uma exigência simples: o cliente
                precisa entender o próprio processo. Cada etapa é explicada em linguagem
                direta, com prazo real, custo previsto e cenários possíveis — inclusive os
                desfavoráveis. Nenhum caso avança com promessa de resultado, porque
                promessa não é estratégia.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 divide-y divide-border border-y border-border">
            {marcas.map((item, i) => (
              <Reveal key={item.title} delay={0.14 + i * 0.05}>
                <div className="flex gap-6 py-6">
                  <span className="pt-1 text-xs tracking-[0.2em] text-green-bright">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-base font-medium">{item.title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <Link
              to="/escritorio"
              className="mt-10 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.2em] text-green-bright hover:underline"
            >
              Conhecer o escritório
              <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
