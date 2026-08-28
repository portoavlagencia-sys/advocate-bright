import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageCircle, Instagram, Clock, MapPin } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { areas, site, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Edmom Moraes Advocacia" },
      {
        name: "description",
        content:
          "Fale com o escritório por WhatsApp, e-mail ou Instagram. Atendimento presencial e remoto, para clientes no Brasil e no exterior.",
      },
      { property: "og:title", content: "Contato — Edmom Moraes Advocacia" },
      {
        property: "og:description",
        content: "WhatsApp, e-mail e atendimento remoto por videochamada.",
      },
    ],
  }),
  component: ContatoPage,
});

const inputClass =
  "w-full border border-border bg-transparent px-4 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-green-bright";

function ContatoPage() {
  const [name, setName] = useState("");
  const [area, setArea] = useState(areas[0].title);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Olá, meu nome é ${name || "(não informado)"}. Assunto: ${area}.\n\n${message}`;
    window.open(whatsappLink(text), "_blank", "noreferrer");
  };

  return (
    <>
      <PageHero
        eyebrow="Contato"
        title={
          <>
            Conte o que aconteceu.
            <br />
            <span className="font-medium">O resto é análise.</span>
          </>
        }
        lead="O primeiro contato serve para entender a situação e indicar, com honestidade, se existe caminho jurídico e qual seria."
      />

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[84rem] gap-14 px-6 py-20 lg:grid-cols-[1fr_1fr] lg:px-10 lg:py-28">
          <Reveal>
            <div className="space-y-px border border-border bg-border">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-5 bg-background p-8 transition-colors hover:bg-surface"
              >
                <MessageCircle className="size-5 text-green-bright" aria-hidden />
                <span>
                  <span className="eyebrow block text-muted-foreground">WhatsApp</span>
                  <span className="mt-2 block text-lg font-light">
                    {site.phoneDisplay}
                  </span>
                </span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-5 bg-background p-8 transition-colors hover:bg-surface"
              >
                <Mail className="size-5 text-green-bright" aria-hidden />
                <span>
                  <span className="eyebrow block text-muted-foreground">E-mail</span>
                  <span className="mt-2 block text-lg font-light">{site.email}</span>
                </span>
              </a>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-5 bg-background p-8 transition-colors hover:bg-surface"
              >
                <Instagram className="size-5 text-green-bright" aria-hidden />
                <span>
                  <span className="eyebrow block text-muted-foreground">Instagram</span>
                  <span className="mt-2 block text-lg font-light">{site.instagram}</span>
                </span>
              </a>
              <div className="flex items-center gap-5 bg-background p-8">
                <Clock className="size-5 text-green-bright" aria-hidden />
                <span>
                  <span className="eyebrow block text-muted-foreground">Atendimento</span>
                  <span className="mt-2 block text-sm text-foreground/80">
                    {site.hours}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-5 bg-background p-8">
                <MapPin className="size-5 text-green-bright" aria-hidden />
                <span>
                  <span className="eyebrow block text-muted-foreground">Alcance</span>
                  <span className="mt-2 block text-sm text-foreground/80">
                    {site.city}
                  </span>
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="border border-border bg-surface p-8 lg:p-10">
              <span className="eyebrow text-green-bright">Resumo do caso</span>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Preencha e a conversa abre direto no WhatsApp, já com o seu resumo
                escrito.
              </p>

              <div className="mt-8 space-y-4">
                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    Nome
                  </span>
                  <input
                    className={inputClass}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    Assunto
                  </span>
                  <select
                    className={inputClass}
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  >
                    {areas.map((a) => (
                      <option key={a.slug} value={a.title} className="bg-surface">
                        {a.title}
                      </option>
                    ))}
                    <option value="Brasileiros no Exterior" className="bg-surface">
                      Brasileiros no Exterior
                    </option>
                    <option value="Outro assunto" className="bg-surface">
                      Outro assunto
                    </option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    O que aconteceu
                  </span>
                  <textarea
                    className={`${inputClass} min-h-40 resize-y`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Descreva a situação, datas e documentos que você já tem."
                    required
                  />
                </label>
              </div>

              <button
                type="submit"
                className="mt-8 w-full bg-primary px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-green-bright"
              >
                Enviar pelo WhatsApp
              </button>

              <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                As informações enviadas são tratadas com sigilo profissional. O envio não
                cria, por si só, relação de cliente e advogado.
              </p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
