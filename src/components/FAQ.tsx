import { Plus } from "lucide-react";
import { Reveal } from "./Reveal";

export type FaqItem = { q: string; a: string };

export function FAQ({
  items,
  eyebrow = "Perguntas frequentes",
  title = "Dúvidas que chegam ao escritório todos os dias",
  className = "",
}: {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
  className?: string;
}) {
  return (
    <section className={`border-b border-border ${className}`}>
      <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-28">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: items.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            }),
          }}
        />
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <span className="eyebrow text-green-bright">{eyebrow}</span>
            <span className="rule-green mt-5" />
            <h2 className="mt-8 text-3xl font-light leading-[1.12] tracking-tight sm:text-4xl">
              {title}
            </h2>
          </Reveal>
          <div className="divide-y divide-border border-y border-border">
            {items.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.04}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-base font-normal leading-snug marker:hidden">
                    <span className="flex gap-4">
                      <span className="pt-1 text-xs tracking-[0.2em] text-green-bright">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.q}
                    </span>
                    <Plus className="mt-1 size-4 shrink-0 text-green-bright transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="max-w-2xl pb-7 pl-8 text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
