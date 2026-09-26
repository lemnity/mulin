import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Reveal } from "@/components/reveal";
import { SocialTiles } from "@/components/social-links";
import { UpcomingEvents } from "@/components/upcoming-events";
import { IconArrowRight, IconCertificate, IconExternal, IconFile, IconLaptop, IconUsers } from "@/components/icons";
import { formatNewsMonth, news, type NewsCategory } from "@/lib/news";

export const metadata: Metadata = {
  title: "Новости — Дом науки и техники",
  description: "Анонсы семинаров и курсов, новости и документы учебного центра «Дом науки и техники».",
};

const categoryStyle: Record<NewsCategory, { icon: typeof IconFile; tone: string }> = {
  "Документы центра": { icon: IconFile, tone: "bg-blue-tint text-blue" },
  Профстандарты: { icon: IconCertificate, tone: "bg-amber-tint text-amber-text" },
  Обучение: { icon: IconLaptop, tone: "bg-green-tint text-green-text" },
  "Кадровое агентство": { icon: IconUsers, tone: "bg-page text-body ring-1 ring-inset ring-border" },
};

export default function NewsPage() {
  const [lead, ...rest] = news;
  const LeadIcon = categoryStyle[lead.category].icon;

  return (
    <>
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Новости" }]} />

      <main id="main" className="flex-1">
        <section className="bg-hero-band">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
            <h1 className="text-3xl font-extrabold leading-tight text-ink sm:text-4xl">Новости</h1>
            <p className="mt-4 max-w-[60ch] text-[1.05rem] leading-relaxed text-body">
              Анонсы ближайших семинаров и курсов, новости и документы центра.
            </p>
          </div>
        </section>

        <UpcomingEvents />

        <section className="mx-auto max-w-7xl px-6 pt-16 lg:px-10">
          <h2 className="text-[1.75rem] font-extrabold tracking-tight text-[#14224A] sm:text-[2rem]">Новости центра</h2>

          <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-start">
            <Reveal subtle className="lg:sticky lg:top-28">
              <article className="flex flex-col rounded-[1.75rem] border border-[#E4ECF8] bg-gradient-to-br from-[#FAFCFF] to-[#F2F7FE] p-7 shadow-[0_18px_50px_-24px_rgba(30,99,221,0.18)] sm:p-9">
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-semibold ${categoryStyle[lead.category].tone}`}>
                    <LeadIcon className="h-4 w-4" />
                    {lead.category}
                  </span>
                  <span className="capitalize text-muted">{formatNewsMonth(lead.month)}</span>
                </div>
                <h3 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-[#14224A] sm:text-[1.75rem]">
                  {lead.title}
                </h3>
                <p className="mt-3 max-w-[56ch] leading-relaxed text-body">{lead.text}</p>
                <div className="flex flex-wrap gap-3 pt-7">
                  {lead.links.map((l, i) => {
                    const external = l.href.startsWith("http");
                    const cls =
                      i === 0
                        ? "inline-flex h-11 items-center gap-2 rounded-xl bg-blue px-5 text-sm font-semibold text-white transition-colors hover:bg-blue-dark"
                        : "inline-flex h-11 items-center gap-2 rounded-xl border border-[#D5DFEE] bg-surface px-5 text-sm font-semibold text-ink transition-colors hover:border-blue hover:text-blue";
                    return external ? (
                      <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={cls}>
                        {l.title}
                        <IconExternal className="h-4 w-4" />
                      </a>
                    ) : (
                      <Link key={l.href} href={l.href} className={cls}>
                        {l.title}
                        <IconArrowRight className="h-4 w-4" />
                      </Link>
                    );
                  })}
                </div>
              </article>
            </Reveal>

            <ul className="flex flex-col gap-3">
              {rest.map((n, i) => {
                const { icon: Icon, tone } = categoryStyle[n.category];
                return (
                  <li key={n.id}>
                    <Reveal subtle delayMs={Math.min(i, 4) * 70}>
                      <article className="rounded-2xl border border-border bg-surface p-5">
                        <div className="flex flex-wrap items-center gap-2.5 text-xs">
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-semibold ${tone}`}>
                            <Icon className="h-3.5 w-3.5" />
                            {n.category}
                          </span>
                          <span className="capitalize text-muted">{formatNewsMonth(n.month)}</span>
                        </div>
                        <h3 className="mt-3 font-bold leading-snug text-[#14224A]">{n.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-body">{n.text}</p>
                        <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
                          {n.links.map((l) =>
                            l.href.startsWith("http") ? (
                              <a
                                key={l.href}
                                href={l.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 font-medium text-blue hover:text-blue-dark"
                              >
                                {l.title}
                                <IconExternal className="h-3.5 w-3.5" />
                              </a>
                            ) : (
                              <Link key={l.href} href={l.href} className="inline-flex items-center gap-1 font-medium text-blue hover:text-blue-dark">
                                {l.title}
                                <IconArrowRight className="h-3.5 w-3.5" />
                              </Link>
                            ),
                          )}
                        </p>
                      </article>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="flex flex-col gap-6 rounded-[1.75rem] border border-[#E4ECF8] bg-surface p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-ink sm:text-2xl">Все новости — в наших соцсетях</h2>
              <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-body">
                Анонсы семинаров и новости центра мы публикуем во ВКонтакте, Telegram и MAX — подпишитесь,
                чтобы не пропустить.
              </p>
            </div>
            <SocialTiles />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
