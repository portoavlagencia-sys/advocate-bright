import type { ReactNode } from "react";
import Velaris from "./ui/velaris";

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  bgImage,
  bgSrcSet,
  bgSizes = "100vw",
  bgWidth = 1920,
  bgHeight = 1080,
  bgAlt,
  velaris,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  children?: ReactNode;
  image?: string | undefined;
  imageAlt?: string | undefined;
  imageWidth?: number | undefined;
  imageHeight?: number | undefined;
  bgImage?: string | undefined;
  bgSrcSet?: string | undefined;
  bgSizes?: string | undefined;
  bgWidth?: number | undefined;
  bgHeight?: number | undefined;
  bgAlt?: string | undefined;
  /** Fundo vivo WebGL quando não há foto. Padrão: ativo sem foto. */
  velaris?: boolean;
}) {
  const showVelaris = velaris ?? (!bgImage && !image);
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      {showVelaris && (
        <div className="absolute inset-0" aria-hidden>
          <Velaris speed={0.9} />
        </div>
      )}
      {bgImage && (
        <>
          <img
            src={bgImage}
            srcSet={bgSrcSet}
            sizes={bgSizes}
            alt={bgAlt ?? ""}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            width={bgWidth}
            height={bgHeight}
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
          <div>
            <span className="eyebrow text-green-bright">{eyebrow}</span>
            <span className="rule-green mt-5" />
          </div>
          <div>
            <h1 className="mt-8 max-w-4xl text-4xl font-light leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              {title}
            </h1>
          </div>
          {lead && (
            <div>
              <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
                {lead}
              </p>
            </div>
          )}
          {children && <div>{children}</div>}
        </div>
        {image && (
          <div>
            <img
              src={image}
              alt={imageAlt ?? ""}
              width={imageWidth ?? 1200}
              height={imageHeight ?? 1200}
              fetchPriority="high"
              decoding="async"
              className="h-64 w-full object-cover sm:h-80 lg:h-[26rem]"
            />
          </div>
        )}
      </div>
    </section>
  );
}
