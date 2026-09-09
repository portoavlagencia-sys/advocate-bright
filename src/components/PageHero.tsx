import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  image,
  imageAlt,
  bgImage,
  bgAlt,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  children?: ReactNode;
  image?: string | undefined;
  imageAlt?: string | undefined;
  bgImage?: string | undefined;
  bgAlt?: string | undefined;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      {bgImage && (
        <>
          <img
            src={bgImage}
            alt={bgAlt ?? ""}
            className="absolute inset-0 h-full w-full object-cover opacity-45 [.light_&]:opacity-20"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30 [.light_&]:from-background [.light_&]:via-background/90"
          />
        </>
      )}
      <div
        className={`relative mx-auto max-w-[84rem] gap-12 px-5 pb-20 pt-24 sm:px-6 lg:px-10 lg:pb-28 lg:pt-32 ${
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
