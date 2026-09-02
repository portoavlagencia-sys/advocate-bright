import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import retrato from "@/assets/dr-edmom-moraes-advogado.webp";
import { Reveal } from "./Reveal";
import { site } from "@/lib/site";

const marcas = [
  {
    title: "Casos em todo o Brasil, base em Goiânia",
    text: "Processo eletrônico e audiência por vídeo permitem atuar em outros Estados sem que o cliente precise se deslocar.",
  },
  {
    title: "Você fala com o advogado",
    text: "Quem lê os documentos é quem responde no WhatsApp. Nada de recado repassado por terceiros.",
  },
  {
    title: "Primeiro a conta, depois a petição",
    text: "Antes de entrar com a ação, o cliente sabe o que pode receber, quanto tempo costuma levar e onde o caso pode fraquejar.",
  },
];

export function SobreAdvogado() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-[84rem] gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:px-10 lg:py-32">
        <Reveal>
          <div className="relative">
            <img
              src={retrato}
              alt={`${site.lawyer}, advogado responsável pelo escritório, em seu gabinete`}
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
            <span className="eyebrow text-green-bright">Quem conduz o escritório</span>
            <span className="rule-green mt-5" />
            <h2 className="mt-8 text-[1.9rem] font-light leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.9rem]">
              Quem lê o seu caso é quem assina a petição
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground">
              <p>
                {site.lawyer} atende em Direito Trabalhista, Regularização de Imóveis,
                Direito Sucessório e Direito de Família. São áreas diferentes, mas com um
                ponto em comum: quase sempre chegam num momento ruim da vida de alguém.
                Uma demissão, uma morte na família, uma separação, um imóvel comprado que
                nunca saiu do papel.
              </p>
              <p>
                O primeiro passo raramente é entrar com processo. É entender o que
                aconteceu, ver o que existe de documento, checar prazo e dizer com
                franqueza se vale a pena discutir. Quando dá para resolver por acordo, o
                acordo vem primeiro. Quando não dá, a ação é preparada com a prova que já
                foi conferida.
              </p>
              <p>
                O escritório fica em Goiânia e atende também por videoconferência, para
                clientes de outros Estados e para brasileiros que moram fora e precisam
                resolver alguma coisa aqui.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 divide-y divide-border border-y border-border">
            {marcas.map((item, i) => (
              <Reveal key={item.title} delay={0.15 + i * 0.05}>
                <div className="flex gap-5 py-7 sm:gap-6">
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
