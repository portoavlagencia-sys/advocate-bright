import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import logo from "@/assets/logo-edmom-moraes.png.asset.json";
import { areas, site, whatsappLink } from "@/lib/site";
import { ThemeToggle } from "@/components/ThemeToggle";

const linkBase =
  "link-underline text-[0.8rem] uppercase tracking-[0.16em] text-foreground/70 transition-colors hover:text-foreground";

const ease = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-background/85 backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-500 ${
        scrolled
          ? "border-border shadow-[0_18px_40px_-32px_rgba(0,0,0,0.9)]"
          : "border-border/60"
      }`}
    >
      <div
        className={`mx-auto flex max-w-[84rem] items-center justify-between px-6 transition-[height] duration-500 lg:px-10 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <Link to="/" className="group flex items-center gap-3" aria-label={site.name}>
          <img
            src={logo.url}
            alt={`${site.name} — logotipo`}
            width={160}
            height={160}
            className={`object-contain brightness-0 invert transition-[height,width,transform] duration-500 group-hover:scale-105 [.light_&]:invert-0 ${
              scrolled ? "h-9 w-9" : "h-11 w-11"
            }`}
          />
          <span className="hidden leading-tight sm:block">
            <span className="block text-[0.9rem] font-semibold tracking-[0.14em] text-foreground">
              EDMOM MORAES
            </span>
            <span className="block text-[0.6rem] tracking-[0.34em] text-green-bright">
              ADVOCACIA
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          <Link to="/" className={linkBase}>
            Home
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setAreasOpen(true)}
            onMouseLeave={() => setAreasOpen(false)}
          >
            <Link
              to="/areas-de-atuacao"
              className={`${linkBase} flex items-center gap-1.5`}
            >
              Áreas de Atuação
              <ChevronDown className="size-3.5" aria-hidden />
            </Link>
            {areasOpen && (
              <div className="absolute left-1/2 top-full w-80 -translate-x-1/2 border border-border bg-surface p-2 shadow-2xl">
                {areas.map((area) => (
                  <Link
                    key={area.slug}
                    to="/areas-de-atuacao/$slug"
                    params={{ slug: area.slug }}
                    className="block border-l-2 border-transparent px-4 py-3 text-sm text-foreground/80 transition-colors hover:border-green-bright hover:bg-secondary hover:text-foreground"
                  >
                    <span className="mr-2 text-xs text-green-bright">{area.number}</span>
                    {area.title}
                  </Link>
                ))}
                <Link
                  to="/brasileiros-no-exterior"
                  className="mt-1 block border-t border-border px-4 py-3 text-sm text-green-bright transition-colors hover:bg-secondary"
                >
                  Brasileiros no Exterior
                </Link>
              </div>
            )}
          </div>
          <Link to="/escritorio" className={linkBase}>
            Escritório
          </Link>
          <Link to="/blog" className={linkBase}>
            Blog
          </Link>
          <Link to="/contato" className={linkBase}>
            Contato
          </Link>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            className="bg-primary px-5 py-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-green-bright"
          >
            Falar no WhatsApp
          </a>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu className="size-6" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background lg:hidden">
          <div className="flex h-20 items-center justify-between px-6">
            <span className="text-[0.6rem] tracking-[0.34em] text-green-bright">
              ADVOCACIA
            </span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Fechar menu">
              <X className="size-6" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 pb-12">
            {[
              { to: "/", label: "Home" },
              { to: "/areas-de-atuacao", label: "Áreas de Atuação" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-border py-5 text-2xl font-light"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 border-b border-border py-5 pl-4">
              {areas.map((area) => (
                <Link
                  key={area.slug}
                  to="/areas-de-atuacao/$slug"
                  params={{ slug: area.slug }}
                  onClick={() => setOpen(false)}
                  className="text-sm text-foreground/70"
                >
                  <span className="mr-2 text-green-bright">{area.number}</span>
                  {area.title}
                </Link>
              ))}
            </div>
            {[
              { to: "/brasileiros-no-exterior", label: "Brasileiros no Exterior" },
              { to: "/escritorio", label: "Escritório" },
              { to: "/blog", label: "Blog" },
              { to: "/contato", label: "Contato" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-border py-5 text-2xl font-light"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="mt-8 bg-primary px-6 py-4 text-center text-xs uppercase tracking-[0.2em] text-primary-foreground"
            >
              Falar no WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
