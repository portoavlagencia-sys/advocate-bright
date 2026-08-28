import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo-edmom-moraes.png.asset.json";
import { areas, site, whatsappLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img
              src={logo.url}
              alt={`${site.name} — logotipo`}
              width={200}
              height={200}
              loading="lazy"
              className="h-14 w-14 object-contain brightness-0 invert"
            />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Advocacia dedicada a trabalhadores, famílias e patrimônio, com atendimento
              presencial e remoto para clientes no Brasil e no exterior.
            </p>
          </div>

          <div>
            <span className="eyebrow text-green-bright">Áreas</span>
            <ul className="mt-6 space-y-3">
              {areas.map((area) => (
                <li key={area.slug}>
                  <Link
                    to="/areas-de-atuacao/$slug"
                    params={{ slug: area.slug }}
                    className="text-sm text-foreground/75 transition-colors hover:text-green-bright"
                  >
                    {area.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/brasileiros-no-exterior"
                  className="text-sm text-foreground/75 transition-colors hover:text-green-bright"
                >
                  Brasileiros no Exterior
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="eyebrow text-green-bright">Navegação</span>
            <ul className="mt-6 space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/escritorio", label: "Escritório" },
                { to: "/blog", label: "Blog" },
                { to: "/contato", label: "Contato" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-foreground/75 transition-colors hover:text-green-bright"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="eyebrow text-green-bright">Contato</span>
            <ul className="mt-6 space-y-3 text-sm text-foreground/75">
              <li>
                <a href={whatsappLink()} target="_blank" rel="noreferrer" className="hover:text-green-bright">
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-green-bright">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-green-bright">
                  {site.instagram}
                </a>
              </li>
              <li className="pt-2 text-muted-foreground">{site.city}</li>
              <li className="text-muted-foreground">{site.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <p className="max-w-3xl text-xs leading-relaxed text-muted-foreground">
            {site.name} — {site.lawyer}, {site.oab}. Conteúdo meramente informativo, em
            conformidade com o Código de Ética e Disciplina da OAB e com o Provimento
            205/2021. Este site não constitui oferta de serviços nem garantia de
            resultados.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
