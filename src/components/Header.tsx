import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

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
        className={`mx-auto flex max-w-[84rem] items-center justify-between px-5 transition-[height] sm:px-6 duration-500 lg:px-10 ${
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
              <ChevronDown
                className={`size-3.5 transition-transform duration-300 ${
                  areasOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </Link>
            <AnimatePresence>
              {areasOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                  transition={{ duration: 0.32, ease }}
                  className="absolute left-1/2 top-full w-80 -translate-x-1/2 border border-border bg-surface p-2 shadow-2xl"
                >
                  {areas.map((area, i) => (
                    <motion.div
                      key={area.slug}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.04 * i, ease }}
                    >
                      <Link
                        to="/areas-de-atuacao/$slug"
                        params={{ slug: area.slug }}
                        className="block border-l-2 border-transparent px-4 py-3 text-sm text-foreground/80 transition-all duration-300 hover:border-green-bright hover:bg-secondary hover:pl-6 hover:text-foreground"
                      >
                        <span className="mr-2 text-xs text-green-bright">
                          {area.number}
                        </span>
                        {area.title}
                      </Link>
                    </motion.div>
                  ))}
                  <Link
                    to="/brasileiros-no-exterior"
                    className="mt-1 block border-t border-border px-4 py-3 text-sm text-green-bright transition-all duration-300 hover:bg-secondary hover:pl-6"
                  >
                    Brasileiros no Exterior
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

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
            className="relative overflow-hidden bg-primary px-5 py-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-primary-foreground transition-all duration-500 hover:-translate-y-0.5 hover:bg-green-bright hover:shadow-[0_16px_36px_-18px_color-mix(in_oklab,var(--color-green-bright)_80%,transparent)]"
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

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease }}
            className="fixed inset-0 z-50 flex flex-col bg-background lg:hidden"
          >
            <div className="flex h-20 items-center justify-between px-5 sm:px-6">
              <span className="text-[0.6rem] tracking-[0.34em] text-green-bright">
                ADVOCACIA
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
                className="transition-transform duration-300 hover:rotate-90"
              >
                <X className="size-6" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 pb-12 sm:px-6">
              {[
                { to: "/", label: "Home" },
                { to: "/areas-de-atuacao", label: "Áreas de Atuação" },
              ].map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.06 + i * 0.05, ease }}
                >
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block border-b border-border py-5 text-2xl font-light"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="flex flex-col gap-3 border-b border-border py-5 pl-4">
                {areas.map((area, i) => (
                  <motion.div
                    key={area.slug}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.16 + i * 0.04, ease }}
                  >
                    <Link
                      to="/areas-de-atuacao/$slug"
                      params={{ slug: area.slug }}
                      onClick={() => setOpen(false)}
                      className="text-sm text-foreground/70"
                    >
                      <span className="mr-2 text-green-bright">{area.number}</span>
                      {area.title}
                    </Link>
                  </motion.div>
                ))}
              </div>
              {[
                { to: "/brasileiros-no-exterior", label: "Brasileiros no Exterior" },
                { to: "/escritorio", label: "Escritório" },
                { to: "/blog", label: "Blog" },
                { to: "/contato", label: "Contato" },
              ].map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.05, ease }}
                >
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block border-b border-border py-5 text-2xl font-light"
                  >
                    {item.label}
                  </Link>
                </motion.div>
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
          </motion.div>
        )}
          </AnimatePresence>,
          document.body,
        )}
    </header>
  );
}
