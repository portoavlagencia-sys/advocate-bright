import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";
import { posts } from "@/lib/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Edmom Moraes Advocacia" },
      {
        name: "description",
        content:
          "Artigos sobre direito trabalhista, imóveis, sucessões e família, escritos em linguagem clara para quem precisa decidir.",
      },
      { property: "og:title", content: "Blog — Edmom Moraes Advocacia" },
      {
        property: "og:description",
        content: "Conteúdo jurídico prático sobre trabalho, imóveis, herança e família.",
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={
          <>
            Informação jurídica <span className="font-medium">sem juridiquês.</span>
          </>
        }
        lead="Textos curtos sobre as dúvidas que mais chegam ao escritório. Conteúdo informativo, que não substitui a análise do seu caso."
      />

      <section>
        <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-28">
          <div className="divide-y divide-border border-y border-border">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.05}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="group grid gap-6 py-12 transition-colors hover:bg-surface/60 lg:grid-cols-[14rem_1fr_auto] lg:items-start"
                >
                  <span>
                    <span className="eyebrow block text-green-bright">
                      {post.category}
                    </span>
                    <span className="mt-3 block text-xs text-muted-foreground">
                      {post.dateLabel} · {post.readingTime}
                    </span>
                  </span>
                  <span>
                    <h2 className="text-2xl font-light leading-snug tracking-tight">
                      {post.title}
                    </h2>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
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
