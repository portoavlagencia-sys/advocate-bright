import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";
import { areas } from "@/lib/site";

export const Route = createFileRoute("/areas-de-atuacao/$slug")({
  loader: ({ params }) => {
    const area = areas.find((a) => a.slug === params.slug);
    if (!area) throw notFound();
    return { area };
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
    const { area } = loaderData;
    const title = `${area.title} — Edmom Moraes Advocacia`;
    return {
      meta: [
        { title },
        { name: "description", content: area.short },
        { property: "og:title", content: title },
        { property: "og:description", content: area.short },
      ],
    };
  },
  component: AreaPage,
});

function AreaPage() {
  const { area } = Route.useLoaderData();
  const others = areas.filter((a) => a.slug !== area.slug);

  return (
    <>
      <PageHero
        eyebrow={`Área ${area.number}`}
        title={area.title}
        lead={area.description}
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-28">
          <Reveal>
            <h2 className="text-sm uppercase tracking-[0.2em] text-green-bright">
              Demandas atendidas
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-px border border-border bg-border md:grid-cols-2">
            {area.services.map((service, i) => (
              <Reveal key={service.title} delay={i * 0.04} className="bg-background">
                <div className="h-full p-8 lg:p-10">
                  <span className="text-xs tracking-[0.2em] text-muted-foreground">
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

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-24">
          <Reveal>
            <span className="eyebrow text-green-bright">Outras áreas</span>
          </Reveal>
          <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-3">
            {others.map((other, i) => (
              <Reveal key={other.slug} delay={i * 0.05} className="bg-surface">
                <Link
                  to="/areas-de-atuacao/$slug"
                  params={{ slug: other.slug }}
                  className="flex h-full items-center justify-between gap-4 p-8 transition-colors hover:bg-secondary"
                >
                  <span className="text-base font-light">{other.title}</span>
                  <ArrowUpRight className="size-4 text-green-bright" />
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
