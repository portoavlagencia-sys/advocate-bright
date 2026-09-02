import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  children?: ReactNode;
  image?: string | undefined;
  imageAlt?: string | undefined;
}) {
  return (
    <section className="relative border-b border-border bg-background">
      <div
        className={`mx-auto max-w-[84rem] gap-12 px-5 pb-20 pt-24 sm:px-6 lg:px-10 lg:pb-28 lg:pt-32 ${
          image ? "grid lg:grid-cols-[1.15fr_0.85fr] lg:items-center" : ""
        }`}
      >
        <div>
          <Reveal>
            <span className="eyebrow text-green-bright">{eyebrow}</span>
            <span className="rule-green mt-5" />
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-8 max-w-4xl text-4xl font-light leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              {title}
            </h1>
          </Reveal>
          {lead && (
            <Reveal delay={0.16}>
              <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
                {lead}
              </p>
            </Reveal>
          )}
          {children && <Reveal delay={0.22}>{children}</Reveal>}
        </div>
        {image && (
          <Reveal delay={0.18}>
            <img
              src={image}
              alt={imageAlt ?? ""}
              loading="lazy"
              className="h-64 w-full object-cover sm:h-80 lg:h-[26rem]"
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
