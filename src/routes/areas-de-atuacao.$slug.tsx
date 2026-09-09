import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, Check, FileText } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { areas, site, whatsappLink } from "@/lib/site";
import { areaContent, areaAbout } from "@/lib/area-content";
import { QuemSomosArea } from "@/components/QuemSomosArea";
import fotoTrabalhista from "@/assets/hero-trabalhista.webp";
import fotoImoveis from "@/assets/hero-imoveis.webp";
import fotoSucessorio from "@/assets/hero-sucessorio.webp";
import fotoFamilia from "@/assets/hero-familia.webp";

const areaPhotos: Record<string, { src: string; alt: string }> = {
  "direito-trabalhista": {
    src: fotoTrabalhista,
    alt: "Carteira de trabalho sobre a mesa do escritório",
  },
  "regularizacao-de-imoveis": {
    src: fotoImoveis,
    alt: "Chaves de imóvel sobre pasta do escritório",
  },
  "direito-sucessorio": {
    src: fotoSucessorio,
    alt: "Plano de partilha sobre a mesa do escritório",
  },
  "direito-de-familia": {
    src: fotoFamilia,
    alt: "Família de mãos dadas ao entardecer",
  },
};

export const Route = createFileRoute("/areas-de-atuacao/$slug")({
  loader: ({ params }) => {
    const area = areas.find((a) => a.slug === params.slug);
    if (!area) throw notFound();
    return { area, content: areaContent[area.slug]! };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Área não encontrada — Edmom Moraes Advocacia" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { content } = loaderData;
    return {
      meta: [
        { title: content.metaTitle },
        { name: "description", content: content.metaDescription },
        { property: "og:title", content: content.metaTitle },
        { property: "og:description", content: content.metaDescription },
      ],
    };
  },
  component: AreaPage,
});

function AreaPage() {
  const { area, content } = Route.useLoaderData();
  const others = areas.filter((a) => a.slug !== area.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LegalService",
            name: `${site.name} — ${area.title}`,
            description: content.metaDescription,
            telephone: site.phoneDisplay,
            areaServed: "BR",
            serviceType: area.services.map((s) => s.title),
          }),
        }}
      />

      <PageHero
        eyebrow={`Área ${area.number}`}
        title={area.title}
        lead={content.heroLead}
        bgImage={areaPhotos[area.slug]?.src}
        bgAlt={areaPhotos[area.slug]?.alt}
      >
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <a
            href={whatsappLink(content.whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            className="bg-primary px-7 py-4 text-center text-[0.72rem] font-medium uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-green-bright sm:px-8"
          >
            Analisar meu caso
          </a>
          <Link
            to="/contato"
            className="group inline-flex items-center justify-center gap-2 border border-border px-7 py-4 sm:px-8 text-[0.72rem] font-medium uppercase tracking-[0.2em] transition-colors hover:border-green-bright"
          >
            Enviar documentos
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </PageHero>

      {/* NÚMEROS DE REFERÊNCIA */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-[84rem] gap-px bg-border px-0 sm:grid-cols-3">
          {content.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.05} className="bg-surface">
              <div className="h-full px-6 py-10 lg:px-10">
                <span className="block text-3xl font-light tracking-tight text-green-bright sm:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-3 block text-sm leading-relaxed text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TEXTO EDITORIAL */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[84rem] gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.7fr_1.3fr] lg:px-10 lg:py-28">
          <Reveal>
            <span className="eyebrow text-green-bright">Entenda a área</span>
            <span className="rule-green mt-5" />
            <h2 className="mt-8 text-2xl font-light leading-[1.15] tracking-tight sm:text-3xl">
              O que está em jogo em um caso de {area.title.toLowerCase()}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
              {content.intro.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* QUANDO PROCURAR */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-28">
          <Reveal>
            <span className="eyebrow text-green-bright">Quando procurar um advogado</span>
            <h2 className="mt-8 max-w-3xl text-2xl font-light leading-[1.15] tracking-tight sm:text-3xl lg:text-4xl">
              Situações em que a orientação jurídica muda o resultado
            </h2>
          </Reveal>
          <ul className="mt-14 grid gap-px border border-border bg-border md:grid-cols-2">
            {content.signals.map((signal, i) => (
              <Reveal key={signal} delay={i * 0.03} className="bg-surface">
                <li className="flex h-full items-start gap-4 p-7">
                  <Check className="mt-0.5 size-4 shrink-0 text-green-bright" />
                  <span className="text-sm leading-relaxed text-foreground/85">
                    {signal}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* DEMANDAS ATENDIDAS */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-28">
          <Reveal>
            <span className="eyebrow text-green-bright">Demandas atendidas</span>
            <h2 className="mt-8 max-w-3xl text-2xl font-light leading-[1.15] tracking-tight sm:text-3xl lg:text-4xl">
              Serviços dentro de {area.title}
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-2">
            {area.services.map((service, i) => (
              <Reveal key={service.title} delay={i * 0.04} className="bg-background">
                <div className="h-full p-7 sm:p-8 lg:p-10">
                  <span className="text-xs tracking-[0.2em] text-green-bright">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-lg font-medium leading-snug">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {service.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMO CONDUZIMOS + DOCUMENTOS */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-[84rem] gap-12 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:py-28">
          <div>
            <Reveal>
              <span className="eyebrow text-green-bright">Como conduzimos</span>
              <h2 className="mt-8 text-2xl font-light leading-[1.15] tracking-tight sm:text-3xl">
                Método antes de medida judicial
              </h2>
            </Reveal>
            <div className="mt-12 divide-y divide-border border-y border-border">
              {content.steps.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.05}>
                  <div className="flex gap-6 py-7">
                    <span className="pt-1 text-xs tracking-[0.2em] text-green-bright">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-base font-medium">{step.title}</h3>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                        {step.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.1}>
            <div className="border border-border bg-background p-7 sm:p-8 lg:p-10">
              <FileText className="size-5 text-green-bright" aria-hidden />
              <h3 className="mt-6 text-lg font-medium">Documentos que ajudam na análise</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Não é preciso ter tudo em mãos para começar. Quanto mais itens abaixo você
                reunir, mais precisa fica a avaliação inicial.
              </p>
              <ul className="mt-7 space-y-3">
                {content.documents.map((doc) => (
                  <li key={doc} className="flex items-start gap-3 text-sm text-foreground/85">
                    <span className="mt-2 size-1 shrink-0 bg-green-bright" />
                    {doc}
                  </li>
                ))}
              </ul>
              <a
                href={whatsappLink(content.whatsappMessage)}
                target="_blank"
                rel="noreferrer"
                className="mt-9 block bg-primary px-6 py-4 text-center text-[0.7rem] font-medium uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-green-bright"
              >
                Enviar pelo WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <QuemSomosArea
        areaTitle={area.title}
        paragraphs={areaAbout[area.slug] ?? []}
        whatsappMessage={content.whatsappMessage}
      />

      <FAQ
        items={content.faq}
        eyebrow={`FAQ · ${area.title}`}
        title={`Perguntas frequentes sobre ${area.title.toLowerCase()}`}
      />

      {/* CTA INTERMEDIÁRIO */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:flex-wrap sm:items-end border border-border bg-surface p-7 sm:p-10 lg:p-14">
              <div className="max-w-2xl">
                <span className="eyebrow text-green-bright">Próximo passo</span>
                <h2 className="mt-6 text-2xl font-light leading-[1.15] tracking-tight sm:text-3xl">
                  {content.ctaTitle}
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  {content.ctaText}
                </p>
              </div>
              <a
                href={whatsappLink(content.whatsappMessage)}
                target="_blank"
                rel="noreferrer"
                className="bg-primary px-7 py-4 text-center text-[0.72rem] font-medium uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-green-bright sm:px-8"
              >
                Falar com o advogado
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* OUTRAS ÁREAS */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
          <Reveal>
            <span className="eyebrow text-green-bright">Outras áreas</span>
          </Reveal>
          <div className="mt-10 divide-y divide-border border-y border-border">
            {others.map((other, i) => (
              <Reveal key={other.slug} delay={i * 0.05}>
                <Link
                  to="/areas-de-atuacao/$slug"
                  params={{ slug: other.slug }}
                  className="group flex items-center justify-between gap-6 py-7"
                >
                  <span className="flex items-center gap-6">
                    <span className="text-xs tracking-[0.2em] text-green-bright">
                      {other.number}
                    </span>
                    <span className="text-lg font-light sm:text-xl">{other.title}</span>
                  </span>
                  <ArrowUpRight className="size-5 text-green-bright opacity-0 transition-opacity group-hover:opacity-100" />
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
