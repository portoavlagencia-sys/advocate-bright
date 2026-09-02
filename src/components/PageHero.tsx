import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative border-b border-border bg-background">
      <div className="mx-auto max-w-[84rem] px-5 sm:px-6 pb-20 pt-24 lg:px-10 lg:pb-28 lg:pt-32">
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
    </section>
  );
}
