import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";
import { getPost, posts } from "@/lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Artigo não encontrado — Edmom Moraes Advocacia" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { post } = loaderData;
    const title = `${post.title} — Edmom Moraes Advocacia`;
    return {
      meta: [
        { title },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const others = posts.filter((p) => p.slug !== post.slug);

  return (
    <>
      <article className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 pb-20 pt-24 lg:pb-28 lg:pt-32">
          <Reveal>
            <Link
              to="/blog"
              className="text-[0.7rem] uppercase tracking-[0.2em] text-green-bright hover:underline"
            >
              ← Blog
            </Link>
            <span className="eyebrow mt-10 block text-muted-foreground">
              {post.category} · {post.dateLabel} · {post.readingTime}
            </span>
            <h1 className="mt-6 text-3xl font-light leading-[1.14] tracking-tight sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <span className="rule-green mt-10" />
          </Reveal>

          <div className="mt-12 space-y-7">
            {post.paragraphs.map((block, i) =>
              typeof block === "string" ? (
                <p key={i} className="text-base leading-[1.85] text-foreground/80">
                  {block}
                </p>
              ) : (
                <h2 key={i} className="pt-6 text-xl font-medium tracking-tight">
                  {block.heading}
                </h2>
              ),
            )}
          </div>

          <p className="mt-16 border-l-2 border-green-bright bg-surface p-6 text-sm leading-relaxed text-muted-foreground">
            Este conteúdo é informativo e não substitui a análise individual do caso.
            Cada situação tem particularidades que podem alterar completamente o
            resultado.
          </p>
        </div>
      </article>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
          <Reveal>
            <span className="eyebrow text-green-bright">Continue lendo</span>
          </Reveal>
          <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2">
            {others.map((other, i) => (
              <Reveal key={other.slug} delay={i * 0.05} className="bg-surface">
                <Link
                  to="/blog/$slug"
                  params={{ slug: other.slug }}
                  className="flex h-full flex-col p-8 transition-colors hover:bg-secondary lg:p-10"
                >
                  <span className="eyebrow text-muted-foreground">{other.category}</span>
                  <h3 className="mt-5 flex items-start gap-3 text-lg font-light leading-snug">
                    {other.title}
                    <ArrowUpRight className="mt-1 size-4 shrink-0 text-green-bright" />
                  </h3>
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
