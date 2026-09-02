import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import heroImg from "@/assets/hero-escritorio.jpg";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";
import { areas, exteriorServices, site, whatsappLink } from "@/lib/site";
import { posts } from "@/lib/blog";
import { SobreAdvogado } from "@/components/SobreAdvogado";
import { FAQ } from "@/components/FAQ";
import { homeFaq } from "@/lib/area-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Edmom Moraes Advocacia — Trabalhista, Imóveis, Sucessões e Família" },
      {
        name: "description",
        content:
          "Escritório com atuação em Direito Trabalhista, Regularização de Imóveis, Sucessões e Família. Atendimento presencial e remoto, inclusive para brasileiros no exterior.",
      },
      {
        property: "og:title",
        content: "Edmom Moraes Advocacia — atuação técnica e atendimento próximo",
      },
      {
        property: "og:description",
        content:
          "Direito Trabalhista, Imóveis, Sucessões e Família. Atendimento remoto para clientes no Brasil e no exterior.",
      },
    ],
  }),
  component: Home,
});

const marquee = [
  "Direito Trabalhista",
  "Regularização de Imóveis",
  "Direito Sucessório",
  "Direito de Família",
  "Brasileiros no Exterior",
];

function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LegalService",
            name: site.name,
            telephone: site.phoneDisplay,
            email: site.email,
            areaServed: "BR",
            address: { "@type": "PostalAddress", addressCountry: "BR" },
            knowsAbout: areas.map((a) => a.title),
          }),
        }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={heroImg}
          alt="Sala de reuniões do escritório ao entardecer"
          width={1600}
          height={1200}
          className="absolute inset-0 size-full object-cover opacity-35 [.light_&]:opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="relative mx-auto max-w-[84rem] px-6 pb-28 pt-24 lg:px-10 lg:pb-40 lg:pt-36">
          <Reveal>
            <span className="eyebrow text-green-bright">
              Advocacia em Goiânia · Brasil e exterior
            </span>
            <span className="rule-green mt-5" />
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-10 max-w-5xl text-[2.6rem] font-extralight leading-[1.02] tracking-tight sm:text-6xl lg:text-[5.2rem]">
              Advogado em Goiânia para
              <br />
              <span className="font-medium">
                trabalho, imóveis, herança e família.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
              Rescisão indireta, verbas não pagas, usucapião, inventário, divórcio e
              pensão alimentícia. O escritório analisa documentos, prazos e chance real de
              êxito antes de propor qualquer medida — e o advogado responsável acompanha o
              caso do primeiro contato à decisão final, presencialmente ou 100% online.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="bg-primary px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-green-bright"
              >
                Analisar meu caso
              </a>
              <Link
                to="/areas-de-atuacao"
                className="group inline-flex items-center gap-2 border border-border px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.2em] transition-colors hover:border-green-bright"
              >
                Áreas de atuação
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3 text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
              <li>Atendimento presencial e online</li>
              <li className="text-green-bright">·</li>
              <li>Resposta no mesmo dia útil</li>
              <li className="text-green-bright">·</li>
              <li>Atuação em todo o Brasil</li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-b border-border bg-surface py-5">
        <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap">
          {[...marquee, ...marquee, ...marquee, ...marquee].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-8 text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground"
            >
              {item}
              <span className="text-green-bright">+</span>
            </span>
          ))}
        </div>
      </div>

      {/* ÁREAS */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[84rem] px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <span className="eyebrow text-green-bright">O que fazemos</span>
              <h2 className="mt-8 text-3xl font-light leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl">
                Quatro frentes, um mesmo critério: caso analisado antes de qualquer
                promessa.
              </h2>
              <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
                Cada área concentra demandas em que documentação, prazo e estratégia
                mudam completamente o resultado. Por isso o escritório trabalha com
                escopo definido e comunicação direta.
              </p>
            </Reveal>

            <div className="divide-y divide-border border-t border-border">
              {areas.map((area, i) => (
                <Reveal key={area.slug} delay={i * 0.06}>
                  <Link
                    to="/areas-de-atuacao/$slug"
                    params={{ slug: area.slug }}
                    className="group flex items-start gap-6 py-8 transition-colors hover:bg-surface/60"
                  >
                    <span className="pt-1 text-xs tracking-[0.2em] text-green-bright">
                      {area.number}
                    </span>
                    <span className="flex-1">
                      <span className="flex items-center gap-3 text-xl font-normal sm:text-2xl">
                        {area.title}
                        <ArrowUpRight className="size-4 text-green-bright opacity-0 transition-opacity group-hover:opacity-100" />
                      </span>
                      <span className="mt-3 block max-w-md text-sm leading-relaxed text-muted-foreground">
                        {area.short}
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXTERIOR */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-[84rem] px-6 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <span className="eyebrow text-green-bright">Brasileiros no exterior</span>
            <h2 className="mt-8 max-w-3xl text-3xl font-light leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl">
              Morar fora não deveria custar uma passagem para resolver um processo aqui.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2">
            {exteriorServices.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05} className="bg-surface">
                <div className="h-full p-8 lg:p-10">
                  <span className="eyebrow text-muted-foreground">{item.areaLabel}</span>
                  <h3 className="mt-5 text-lg font-medium">{item.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <Link
              to="/brasileiros-no-exterior"
              className="mt-12 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.2em] text-green-bright hover:underline"
            >
              Ver como funciona o atendimento remoto
              <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* QUEM CONDUZ */}
      <SobreAdvogado />

      {/* BLOG */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[84rem] px-6 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="eyebrow text-green-bright">Publicações</span>
                <h2 className="mt-6 text-3xl font-light tracking-tight sm:text-4xl">
                  Conteúdo jurídico, sem juridiquês
                </h2>
              </div>
              <Link
                to="/blog"
                className="text-[0.72rem] uppercase tracking-[0.2em] text-green-bright hover:underline"
              >
                Ver todos
              </Link>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.06} className="bg-background">
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="flex h-full flex-col p-8 transition-colors hover:bg-surface"
                >
                  <span className="eyebrow text-muted-foreground">{post.category}</span>
                  <h3 className="mt-5 text-lg font-medium leading-snug">{post.title}</h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <span className="mt-6 text-xs text-muted-foreground">
                    {post.dateLabel} · {post.readingTime}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FAQ
        items={homeFaq}
        eyebrow="Perguntas frequentes"
        title="O que as pessoas perguntam antes de contratar um advogado"
      />

      <CTASection />
    </>
  );
}
