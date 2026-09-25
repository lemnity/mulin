import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactButton } from "@/components/contact-dialog";
import { Reveal } from "@/components/reveal";
import { SocialTiles } from "@/components/social-links";
import {
  IconCertificate,
  IconChat,
  IconClock,
  IconDownload,
  IconFile,
  IconMail,
  IconMonitor,
  IconPhone,
  IconPin,
  IconUsers,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Контакты — Дом науки и техники",
  description:
    "Адрес, телефоны, режим работы и контакты по направлениям учебного центра «Дом науки и техники» в Тюмени.",
};

/* Источник — «Контакты» (tumtipb.ru/content/18) и блок контактов на главной старого сайта. */

const OLD = "https://tumtipb.ru/upload/file/";
const MAP_WIDGET = "https://yandex.ru/map-widget/v1/?z=16&ol=biz&oid=1062104459";
const MAP_LINK = "https://yandex.ru/maps/org/dom_nauki_i_tekhniki/1062104459/";

type Person = {
  icon: typeof IconPhone;
  title: string;
  name?: string;
  phones: { display: string; tel: string; note?: string }[];
  emails: string[];
};

const directions: Person[] = [
  {
    icon: IconUsers,
    title: "Заключение договоров на обучение, бухгалтерия",
    phones: [
      { display: "+7 (908) 873-11-28", tel: "+79088731128", note: "прямой" },
      { display: "+7 (3452) 51-50-50", tel: "+73452515050", note: "доб. 111" },
    ],
    emails: ["mail@tumtipb.ru"],
  },
  {
    icon: IconMonitor,
    title: "Вебинары",
    name: "Николай Уткин",
    phones: [
      { display: "+7 (912) 078-36-67", tel: "+79120783667", note: "прямой" },
      { display: "+7 (3452) 51-50-50", tel: "+73452515050", note: "доб. 107" },
    ],
    emails: ["ipk515050@mail.ru"],
  },
  {
    icon: IconFile,
    title: "Документооборот",
    phones: [{ display: "+7 (3452) 51-50-50", tel: "+73452515050", note: "доб. 108" }],
    emails: ["muhanovanv72@mail.ru"],
  },
  {
    icon: IconCertificate,
    title: "Аттестация профессиональных бухгалтеров",
    phones: [
      { display: "+7 (3452) 51-50-50", tel: "+73452515050" },
      { display: "+7 (3452) 51-70-70", tel: "+73452517070" },
    ],
    emails: ["ti44@ipbr.org", "mucdnt@mail.ru"],
  },
];

const cards = [
  { title: "Карточка АНО ДПО ТМУЦ «Дом науки и техники»", href: `${OLD}Kartochka_2026.pdf` },
  { title: "Карточка Ассоциации «Тюменский ТИПБ»", href: `${OLD}Kartochka%20TIPB_090425-2.doc` },
];

export default function ContactsPage() {
  return (
    <>
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Контакты" }]} />

      <main id="main" className="flex-1">
        <section className="bg-hero-band">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
            <h1 className="text-3xl font-extrabold leading-tight text-ink sm:text-4xl">Контакты</h1>
            <p className="mt-4 max-w-[60ch] text-[1.05rem] leading-relaxed text-body">
              Позвоните, напишите или приезжайте в учебный центр в Тюмени.
            </p>

            <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
              <div className="flex flex-col gap-3">
                <Reveal subtle>
                  <a
                    href="tel:88002504191"
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-blue"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue text-white">
                      <IconPhone className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="tabular block text-2xl font-extrabold text-ink group-hover:text-blue">
                        8 800 250-41-91
                      </span>
                      <span className="block text-sm text-body">Звонок по России бесплатный</span>
                    </span>
                  </a>
                </Reveal>
                <Reveal subtle delayMs={70}>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <a
                      href="tel:+73452515050"
                      className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-blue"
                    >
                      <IconPhone className="h-5 w-5 shrink-0 text-blue" />
                      <span className="tabular font-semibold text-ink">+7 (3452) 51-50-50</span>
                    </a>
                    <a
                      href="mailto:mail@tumtipb.ru"
                      className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-blue"
                    >
                      <IconMail className="h-5 w-5 shrink-0 text-blue" />
                      <span className="font-semibold text-ink">mail@tumtipb.ru</span>
                    </a>
                  </div>
                </Reveal>
                <Reveal subtle delayMs={140}>
                  <div className="rounded-2xl border border-border bg-surface p-5">
                    <p className="flex items-start gap-3">
                      <IconPin className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                      <span className="text-ink">
                        625048, г. Тюмень, ул. Максима Горького, 59/3
                        <a
                          href={MAP_LINK}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 block text-sm font-medium text-blue hover:text-blue-dark"
                        >
                          Открыть в Яндекс Картах
                        </a>
                      </span>
                    </p>
                    <p className="mt-4 flex items-start gap-3 border-t border-border pt-4">
                      <IconClock className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                      <span className="text-sm leading-relaxed text-ink">
                        Пн–Пт: 9:00–18:00, обед 13:00–14:00
                        <span className="block text-body">Суббота и воскресенье — выходные</span>
                      </span>
                    </p>
                  </div>
                </Reveal>
                <Reveal subtle delayMs={210}>
                  <ContactButton className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue px-6 text-sm font-semibold text-white transition-colors hover:bg-blue-dark">
                    <IconChat className="h-4 w-4" />
                    Написать нам
                  </ContactButton>
                </Reveal>
              </div>

              <Reveal subtle delayMs={100} className="h-full min-h-[420px] overflow-hidden rounded-2xl border border-border bg-surface">
                <iframe
                  src={MAP_WIDGET}
                  title="«Дом науки и техники» на Яндекс Картах"
                  loading="lazy"
                  className="block h-full min-h-[420px] w-full border-0"
                />
              </Reveal>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-14 lg:px-10">
          <h2 className="text-2xl font-extrabold text-ink">Контакты по направлениям</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {directions.map(({ icon: Icon, title, name, phones, emails }, i) => (
              <li key={title}>
                <Reveal subtle delayMs={(i % 2) * 70} className="h-full">
                  <article className="flex h-full gap-4 rounded-2xl border border-border bg-surface p-5 sm:p-6">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-tint text-blue">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-bold leading-snug text-ink">{title}</h3>
                      {name && <p className="mt-0.5 text-sm text-body">{name}</p>}
                      <ul className="mt-3 flex flex-col gap-1.5 text-sm">
                        {phones.map((p) => (
                          <li key={p.display + p.note} className="flex flex-wrap items-baseline gap-x-2">
                            <a href={`tel:${p.tel}`} className="tabular font-semibold text-ink hover:text-blue">
                              {p.display}
                            </a>
                            {p.note && <span className="text-muted">{p.note}</span>}
                          </li>
                        ))}
                        {emails.map((e) => (
                          <li key={e}>
                            <a href={`mailto:${e}`} className="font-medium text-blue hover:text-blue-dark">
                              {e}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold text-ink">Реквизиты</h2>
              <ul className="mt-6 flex flex-col gap-2.5">
                {cards.map((c, i) => (
                  <li key={c.href}>
                    <Reveal subtle delayMs={i * 70}>
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-blue hover:bg-blue-tint/40"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-tint text-blue">
                          <IconDownload className="h-4 w-4" />
                        </span>
                        <span className="flex-1 text-sm font-medium text-ink group-hover:text-blue">{c.title}</span>
                      </a>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-ink">Мы в мессенджерах</h2>
              <p className="mt-2 text-sm text-body">Новости, анонсы семинаров и ответы на вопросы.</p>
              <SocialTiles className="mt-5" />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
