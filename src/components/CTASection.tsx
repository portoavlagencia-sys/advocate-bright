import { Link } from "@tanstack/react-router";
import { site, whatsappLink } from "@/lib/site";
import { Reveal } from "./Reveal";

export function CTASection({
  title = "Há quem espere o prazo correr. Há quem se antecipe.",
  text = "Envie o resumo do seu caso. A primeira conversa serve para entender a situação e dizer, com honestidade, se há caminho jurídico.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="border-t border-border bg-green-deep">
      <div className="mx-auto max-w-[84rem] px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <span className="eyebrow text-primary-foreground/70">Fale com o escritório</span>
          <h2 className="mt-8 max-w-3xl text-3xl font-light leading-[1.12] tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-primary-foreground/80">
            {text}
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="bg-background px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-foreground transition-opacity hover:opacity-85"
            >
              WhatsApp {site.phoneDisplay}
            </a>
            <Link
              to="/contato"
              className="border border-primary-foreground/40 px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              Página de contato
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
