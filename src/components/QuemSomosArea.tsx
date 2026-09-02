import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import retrato from "@/assets/dr-edmom-moraes-advogado.webp";
import { Reveal } from "./Reveal";
import { site, whatsappLink } from "@/lib/site";

type Props = {
  areaTitle: string;
  paragraphs: string[];
  whatsappMessage: string;
};

export function QuemSomosArea({ areaTitle, paragraphs, whatsappMessage }: Props) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-[84rem] gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 lg:px-10 lg:py-28">
        <Reveal>
          <div className="relative">
            <img
              src={retrato}
              alt={`${site.lawyer}, advogado responsável pelos casos de ${areaTitle.toLowerCase()}`}
              width={1200}
              height={1499}
              loading="lazy"
              className="w-full object-cover"
            />
            <div className="absolute -bottom-px left-0 right-0 border-t-2 border-green-bright bg-background/90 px-5 py-4 backdrop-blur-sm">
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
            <span className="eyebrow text-green-bright">Quem somos</span>
            <span className="rule-green mt-5" />
            <h2 className="mt-8 text-[1.7rem] font-light leading-[1.14] tracking-tight sm:text-3xl lg:text-4xl">
              Quem vai cuidar do seu caso de {areaTitle.toLowerCase()}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
              {paragraphs.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href={whatsappLink(whatsappMessage)}
                target="_blank"
                rel="noreferrer"
                className="bg-primary px-7 py-4 text-center text-[0.72rem] font-medium uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-green-bright"
              >
                Falar com o advogado
              </a>
              <Link
                to="/escritorio"
                className="inline-flex items-center justify-center gap-2 text-[0.72rem] uppercase tracking-[0.2em] text-green-bright hover:underline"
              >
                Conhecer o escritório
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
