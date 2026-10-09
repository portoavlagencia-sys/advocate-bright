import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, MapPin, Clock, FileText } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { PageHero } from "@/components/PageHero";
import {
  LiveBadge,
  Magnetic,
  Spotlight,
  CountUp,
} from "@/components/motion";
import { ReefButton } from "@/components/ui/reef-button";
import { site, whatsappLink } from "@/lib/site";
import { getPost } from "@/lib/blog";
import fotoTrabalhista from "@/assets/hero-trabalhista.webp";

export const Route = createFileRoute("/advogado-trabalhista-goiania")({
  head: () => ({
    meta: [
      {
        title:
          "Advogado Trabalhista em Goiânia — Processo na Justiça do Trabalho | Edmom Moraes",
      },
      {
        name: "description",
        content:
          "Foi demitido em Goiânia e não recebeu? Advogado trabalhista com atuação no Fórum Trabalhista de Goiânia (TRT-18). Rescisão, horas extras, vínculo, justa causa. Fale no WhatsApp e receba uma conta antes de qualquer promessa.",
      },
      {
        property: "og:title",
        content: "Advogado Trabalhista em Goiânia — Edmom Moraes Advocacia",
      },
      {
        property: "og:description",
        content:
          "Rescisão não paga, horas extras, trabalho sem carteira, justa causa injusta. Atendimento em Goiânia e por vídeo. Quem lê seu caso é o advogado.",
      },
      { property: "og:type", content: "website" },
      {
        name: "keywords",
        content:
          "advogado trabalhista goiania, processo trabalhista goiania, rescisão indireta goiania, horas extras goiania, TRT 18, vara do trabalho goiania",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://edmommoraes.lovable.app/advogado-trabalhista-goiania",
      },
    ],
  }),
  component: TrabalhistaGoianiaPage,
});

const WHATS_MSG =
  "Olá, sou de Goiânia e preciso de ajuda com um caso trabalhista. Posso te mandar os documentos?";

const casosQueChegam = [
  "Mandado embora e a rescisão não caiu — ou veio pela metade, sem multa dos 40% do FGTS",
  "Trabalhou sem carteira, como PJ, MEI ou “autônomo” mas cumpria horário e recebia ordem",
  "Hora extra toda semana e nada no holerite. Intervalo cortado, sábado virando rotina",
  "Justa causa que você não entendeu — chegou do nada, sem advertência antes",
  "Assédio, humilhação, meta impossível. Você saiu doente e ninguém registrou nada",
  "Acidente ou doença do trabalho e a empresa tratou como se fosse problema seu",
  "FGTS sumido: extrato com buraco de meses, sem depósito",
  "Grávida demitida, acidentado demitido, cipeiro demitido — estabilidade ignorada",
  "Acordo oferecido na saída com valor fechado, sem você saber quanto realmente tinha a receber",
];

const faqGoiania = [
  {
    q: "Fui demitido em Goiânia. Onde meu processo vai correr?",
    a: "Na maioria dos casos, no Fórum Trabalhista de Goiânia, na Rua T-51 com Av. T-1, Setor Bueno — sede do TRT da 18ª Região. São 18 Varas do Trabalho só em Goiânia. O processo é eletrônico (PJe) e boa parte das audiências hoje pode ser telepresencial. Você não precisa ir ao fórum toda semana; quem acompanha é o escritório.",
  },
  {
    q: "Quanto tempo demora um processo trabalhista em Goiânia?",
    a: "Depende da Vara e se há acordo. Acordo em audiência inicial ou no CEJUSC resolve em meses. Com instrução e perícia, é comum levar de 1 a 2 anos até sentença, mais a fase de execução se a empresa não pagar. Por isso a primeira conversa aqui é sobre conta e prazo real, não sobre promessa.",
  },
  {
    q: "Ainda estou trabalhando. Posso procurar advogado sem ser demitido?",
    a: "Pode. A lei proíbe retaliação por buscar seus direitos. Na prática, muita gente espera sair para entrar com ação, mas já deixa tudo organizado antes: prints, holerites, ponto, testemunhas. Se o descumprimento é grave, existe a rescisão indireta — você sai e recebe como se tivesse sido demitido sem justa causa.",
  },
  {
    q: "Trabalhei sem carteira em Goiânia. Tem como provar?",
    a: "Na maioria das vezes, sim. O que vale é a realidade: escala, uniforme, ordem de chefe, pagamento mensal, conversa de WhatsApp, testemunha que trabalhou com você. PJ aberta por exigência da empresa, sem autonomia, costuma ser desconsiderada pela Justiça do Trabalho. Traga o que tiver — a gente avalia o que sustenta o vínculo.",
  },
  {
    q: "A empresa ofereceu um acordo na saída. Assino?",
    a: "Não assine no impulso. Traga o valor oferecido e os documentos. Eu faço a conta do que seria devido — rescisão, férias, 13º, FGTS + 40%, horas extras do período — e você decide com número na mão. Acordo bom é o que chega perto do real, não o que a empresa sugere com pressa.",
  },
  {
    q: "Quanto custa entrar com processo trabalhista?",
    a: "Quem não tem condição pede justiça gratuita e não paga custas. Meus honorários seguem a tabela da OAB-GO, combinados por escrito antes de começar — fixo, por etapa ou com êxito. Nada é cobrado sem contrato. E honorário de sucumbência, quando há, é do advogado e não se confunde com o contratado.",
  },
  {
    q: "Perdi o prazo? Até quando posso cobrar?",
    a: "Você tem 2 anos depois da saída para entrar com ação, e pode cobrar os últimos 5 anos trabalhados. Exemplo: saiu em março de 2024, tem até março de 2026 — e cobra de 2021 para frente. Cada mês parado apaga um mês de direito. Não deixe para depois.",
  },
  {
    q: "Preciso ir ao escritório ou dá para resolver pelo WhatsApp?",
    a: "Dá para começar todo pelo WhatsApp: foto da carteira, holerite, rescisão, extrato do FGTS, prints. Se precisar, atendemos presencial em Goiânia ou por vídeo. Audiência você participa junto, presencial ou online, sempre orientado antes.",
  },
];

function TrabalhistaGoianiaPage() {
  const postRescisao = getPost("rescisao-indireta-quando-cabe");
  const postSemCarteira = getPost("trabalhei-sem-carteira-goiania-e-agora");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LegalService",
            name: `${site.name} — Advogado Trabalhista em Goiânia`,
            description:
              "Advocacia trabalhista em Goiânia com atuação no Fórum Trabalhista (TRT-18): rescisão, horas extras, vínculo, justa causa, assédio.",
            telephone: site.phoneDisplay,
            email: site.email,
            areaServed: [
              { "@type": "City", name: "Goiânia" },
              { "@type": "State", name: "Goiás" },
              { "@type": "Country", name: "BR" },
            ],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Goiânia",
              addressRegion: "GO",
              addressCountry: "BR",
            },
            knowsAbout: [
              "Rescisão trabalhista",
              "Horas extras",
              "Vínculo empregatício",
              "Reversão de justa causa",
              "Assédio moral",
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqGoiania.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />

      <PageHero
        eyebrow="Goiânia · TRT da 18ª Região"
        title={
          <>
            Foi mandado embora em Goiânia
            <br />
            <span className="font-medium">e ficou no prejuízo?</span>
          </>
        }
        lead="Sou Edmom Moraes, advogado em Goiânia. Recebo todo dia caso de rescisão que não caiu, hora extra ignorada, carteira sem registro, justa causa forçada. Você me manda os papéis no WhatsApp, eu faço a conta do que a empresa te deve e te digo se vale entrar com processo — antes de qualquer promessa."
        bgImage={fotoTrabalhista}
        bgAlt="Carteira de trabalho sobre a mesa do escritório"
      >
        <div className="mt-8">
          <LiveBadge text="Atendo hoje · Goiânia e online" />
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <Magnetic>
            <ReefButton href={whatsappLink(WHATS_MSG)}>
              Mandar meus documentos
            </ReefButton>
          </Magnetic>
          <Link
            to="/areas-de-atuacao/$slug"
            params={{ slug: "direito-trabalhista" }}
            className="group inline-flex items-center justify-center gap-2 border border-border px-7 py-4 text-[0.72rem] font-medium uppercase tracking-[0.2em] transition-colors hover:border-green-bright sm:px-8"
          >
            Ver área trabalhista
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Respondo no mesmo dia útil. Quem lê é o advogado, não um atendente — e
          nada do que você mandar vira conteúdo ou exemplo.
        </p>
      </PageHero>

      {/* Faixa de números animados — quebra o bloco estático */}
      <div className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-[84rem] grid-cols-3 divide-x divide-border px-5 sm:px-6 lg:px-10">
          {[
            { v: 18, s: "", label: "Varas do Trabalho em Goiânia" },
            { v: 2, s: " anos", label: "para entrar após a saída" },
            { v: 5, s: " anos", label: "de direitos que dá para cobrar" },
          ].map((stat) => (
            <div key={stat.label} className="px-4 py-8 text-center sm:py-10">
              <CountUp
                to={stat.v}
                suffix={stat.s}
                className="block text-3xl font-light tracking-tight text-green-bright sm:text-4xl"
              />
              <span className="mt-2 block text-xs leading-relaxed text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* O QUE MAIS CHEGA — linguagem falada */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
          <Reveal>
            <p className="text-[0.72rem] uppercase tracking-[0.2em] text-green-bright">
              Casos de todo dia
            </p>
            <h2 className="mt-6 max-w-3xl text-3xl font-light leading-[1.12] tracking-tight sm:text-4xl">
              Se o seu caso parece com um desses, vale uma conversa
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Não precisa saber o nome jurídico. Me conta do seu jeito — eu
              traduzo para o processo. Esses são os relatos que mais escuto de
              quem trabalha em Goiânia, Aparecida, Senador Canedo e região:
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-px border border-border bg-border md:grid-cols-2">
            {casosQueChegam.map((caso) => (
              <Spotlight key={caso.slice(0, 24)} className="bg-background">
                <li className="flex h-full items-start gap-4 p-6 sm:p-7">
                  <Check
                    className="mt-1 size-4 shrink-0 text-green-bright"
                    aria-hidden
                  />
                  <span className="text-sm leading-relaxed text-foreground/85">
                    {caso}
                  </span>
                </li>
              </Spotlight>
            ))}
          </ul>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Nem todo caso compensa virar processo — e eu te falo isso logo na
              primeira leitura. Quando compensa, a gente entra com a conta
              pronta. Quando não, você economiza tempo e dinheiro.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ONDE O PROCESSO CORRE — detalhe local, anti-IA */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-[84rem] gap-12 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_1fr] lg:px-10 lg:py-24">
          <Reveal>
            <p className="flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.2em] text-green-bright">
              <MapPin className="size-4" aria-hidden /> Onde seu caso vai parar
            </p>
            <h2 className="mt-6 text-3xl font-light leading-[1.12] tracking-tight sm:text-4xl">
              Fórum Trabalhista de Goiânia, não um lugar abstrato
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                Processo de quem trabalhou em Goiânia corre, em regra, no Fórum
                Trabalhista da Rua T-51 com Av. T-1, no Setor Bueno — sede do
                Tribunal Regional do Trabalho da 18ª Região. São 18 Varas só na
                capital.
              </p>
              <p>
                Tudo é eletrônico, no PJe. Audiência inicial, de instrução,
                perícia quando precisa, e muita tentativa de acordo no meio do
                caminho — inclusive no CEJUSC, o centro de conciliação do
                tribunal. Acordo bom sai ali, com juiz homologando.
              </p>
              <p>
                Você não precisa decorar nada disso. Só precisa saber que quem
                atua aqui conhece o rito, os prazos e o jeito de cada fase — e
                te avisa antes de cada audiência o que vão perguntar e como se
                portar.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="border border-border bg-background p-7 sm:p-9">
              <p className="flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground">
                <Clock className="size-4 text-green-bright" aria-hidden /> Prazo
                que não perdoa
              </p>
              <p className="mt-6 text-2xl font-light leading-snug">
                <CountUp to={2} /> anos para entrar. <CountUp to={5} /> anos
                para cobrar.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Saiu da empresa em março de 2024? Tem até março de 2026 para
                ajuizar — e só consegue cobrar direitos de 2021 para frente.
                Cada mês que passa apaga um mês de hora extra, de diferença
                salarial, de FGTS. É por isso que a orientação é sempre a
                mesma: não espere “juntar tudo” para procurar. Manda o que tem.
              </p>
              <div className="mt-7 border-t border-border pt-6">
                <p className="flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground">
                  <FileText
                    className="size-4 text-green-bright"
                    aria-hidden
                  />{" "}
                  Quanto custa
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Quem não pode pagar pede justiça gratuita. Meus honorários
                  seguem a tabela da OAB-GO e ficam por escrito, em contrato,
                  antes de começar. Sem taxa escondida, sem “depois a gente
                  vê”.
                </p>
              </div>
              <div className="mt-8">
                <ReefButton href={whatsappLink(WHATS_MSG)}>
                  Pedir a conta do meu caso
                </ReefButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* COMO COMEÇA — prático, sem juridiquês */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
          <Reveal>
            <h2 className="max-w-3xl text-3xl font-light leading-[1.12] tracking-tight sm:text-4xl">
              Como começa: foto do papel, conta na mesa, decisão sua
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            <Reveal>
              <div>
                <p className="text-xs tracking-[0.2em] text-green-bright">
                  Primeiro
                </p>
                <h3 className="mt-4 text-lg font-medium leading-snug">
                  Você manda o que tem, do jeito que está
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Foto da carteira, último holerite, termo de rescisão se
                  houver, extrato do FGTS, print de escala ou conversa com
                  chefe. Não precisa estar organizado. Manda no WhatsApp.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div>
                <p className="text-xs tracking-[0.2em] text-green-bright">
                  Depois
                </p>
                <h3 className="mt-4 text-lg font-medium leading-snug">
                  Eu faço a conta e digo o cenário real
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  O que dá para pedir, quanto dá em dinheiro, quanto tempo leva
                  em Goiânia, onde o caso é forte e onde é fraco. Inclusive
                  quando a resposta é “nesse caso, não vale processar”.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div>
                <p className="text-xs tracking-[0.2em] text-green-bright">
                  Por fim
                </p>
                <h3 className="mt-4 text-lg font-medium leading-snug">
                  Acordo primeiro, processo quando precisa
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Se a empresa topa conversar, tentamos acordo homologado —
                  mais rápido. Se não, a ação vai com prova organizada,
                  testemunha avisada e você preparado para a audiência.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Assinatura em 1ª pessoa — quebra a cara de IA */}
          <Reveal delay={0.1}>
            <div className="mt-14 border-l-2 border-green-bright bg-surface p-7 sm:p-9">
              <p className="max-w-3xl text-base leading-relaxed text-foreground/85">
                “Eu atendo causa trabalhista há anos e aprendi uma coisa: quem
                procura advogado trabalhista não quer tese, quer receber o que
                trabalhou para ganhar. Meu trabalho é ler papel, fazer conta e
                falar a verdade — mesmo quando a verdade é que o caso é fraco.
                Se for forte, eu conduzo até o fim.”
              </p>
              <p className="mt-5 text-sm text-muted-foreground">
                — {site.lawyer}, advogado responsável · Goiânia/GO
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <FAQ
        items={faqGoiania}
        eyebrow="Dúvidas de quem trabalha em Goiânia"
        title="Perguntas que escuto no WhatsApp toda semana"
      />

      {/* Leituras relacionadas */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="max-w-2xl text-2xl font-light tracking-tight sm:text-3xl">
                Antes de chamar, se quiser entender melhor
              </h2>
              <Link
                to="/blog"
                className="text-[0.72rem] uppercase tracking-[0.2em] text-green-bright hover:underline"
              >
                Ver blog
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-2">
            {[postRescisao, postSemCarteira].map(
              (post) =>
                post && (
                  <Link
                    key={post.slug}
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="group bg-surface p-8 transition-colors hover:bg-secondary lg:p-10"
                  >
                    <span className="text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
                      {post.category} · {post.readingTime}
                    </span>
                    <h3 className="mt-4 flex items-start gap-3 text-lg font-normal leading-snug">
                      {post.title}
                      <ArrowUpRight className="mt-1 size-4 shrink-0 text-green-bright" />
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                  </Link>
                ),
            )}
          </div>
          <Reveal delay={0.08}>
            <nav
              aria-label="Navegação relacionada"
              className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground"
            >
              <Link
                to="/areas-de-atuacao/$slug"
                params={{ slug: "direito-trabalhista" }}
                className="hover:text-green-bright hover:underline"
              >
                ← Área: Direito Trabalhista
              </Link>
              <Link
                to="/contato"
                className="hover:text-green-bright hover:underline"
              >
                Falar com o escritório →
              </Link>
            </nav>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Manda os papéis. Eu faço a conta."
        text="Foto da carteira, holerite, rescisão, extrato do FGTS — o que você tiver. Retorno no mesmo dia útil, com valor estimado, prazo e chance real. Sem compromisso e sem juridiquês."
      />
    </>
  );
}
