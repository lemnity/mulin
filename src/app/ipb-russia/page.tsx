import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactButton } from "@/components/contact-dialog";
import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";
import {
  IconArrowRight,
  IconCertificate,
  IconChat,
  IconCheck,
  IconCoins,
  IconDownload,
  IconExternal,
  IconFile,
  IconMail,
  IconPhone,
  IconRefresh,
  IconSearch,
  IconTeam,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "ИПБ России — Дом науки и техники",
  description:
    "Дом науки и техники — учебно-методический центр № 053 Института профессиональных бухгалтеров и аудиторов России: аттестация, повышение квалификации, членство и членские взносы.",
};

/* Источники: ipbr.org/about (об ИПБ России, преимущества членства, контакты); старый сайт центра —
   «ИПБ России» (/content/56/140), «Юридические документы» (/content/19/202), «Президентский совет»
   (/content/15), «Оплата взносов» (/content/3/60). */

const IPB = "https://www.ipbr.org";
const OLD = "https://tumtipb.ru/upload/file/";

const ipbFacts = [
  { value: "1997", label: "год основания ИПБ России" },
  { value: "50+", label: "территориальных организаций бухгалтеров" },
  { value: "300", label: "центров подготовки по всей стране" },
  { value: "50 000+", label: "членов ИПБ ежегодно повышают квалификацию" },
];

const ties = [
  {
    icon: IconCertificate,
    title: "Учебно-методический центр № 053",
    text: "С октября 1996 года центр аккредитован при ИПБ России: готовит, аттестует и повышает квалификацию профессиональных бухгалтеров.",
    link: { title: "Свидетельство об аккредитации", href: `${OLD}svid053-2026.pdf` },
  },
  {
    icon: IconTeam,
    title: "Корпоративный член ИПБ России",
    text: "Центр входит в ИПБ России как корпоративный член.",
    link: { title: "Сертификат корпоративного члена", href: `${OLD}Sert_IPB_2021.pdf` },
  },
  {
    icon: IconFile,
    title: "Тюменский ТИПБ",
    text: "Тюменский территориальный институт профессиональных бухгалтеров — региональная организация ИПБ России. Президент Ассоциации — Кольцова Т. А., генеральный директор — Сидорова Л. Э., исполнительный директор — Мулин А. А.",
  },
];

const benefits = [
  "Участие в негосударственном регулировании бухгалтерского учёта",
  "Повышение профессионального уровня по востребованным и практико-ориентированным программам",
  "Горячая линия консультаций — бесплатная помощь экспертов по бухучёту и налогообложению",
  "Доступ к базе знаний: вебинары, методические рекомендации, пособия, профессиональные журналы",
  "Содействие в трудоустройстве",
  "Защита профессиональных интересов",
  "Специальные предложения на участие в профессиональных мероприятиях",
  "Участие в работе профессионального сообщества, в том числе на международных площадках",
];

const services = [
  { title: "Электронное тестирование", text: "Экзамены на аттестат онлайн", href: "http://e-test.ipbr.org/rebuild/extensions/etest/index.php" },
  { title: "Получить аттестат", text: "Как стать профессиональным бухгалтером", href: `${IPB}/get-certificate/` },
  { title: "Действительным членам", text: "Раздел для членов ИПБ России", href: `${IPB}/full-members/` },
  { title: "Повышение профессионального уровня", text: "Требования и программы", href: `${IPB}/full-members/improvement/` },
  { title: "Единый реестр", text: "Проверка аттестата и членства", href: `${IPB}/registry/` },
  { title: "Об ИПБ России", text: "Миссия, документы, контакты", href: `${IPB}/about/` },
];

export default function IpbRussiaPage() {
  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "О центре", href: "/about" },
          { label: "ИПБ России" },
        ]}
      />

      <main id="main" className="flex-1">
        <section className="bg-hero-band">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
            <p className="text-xs font-semibold tracking-[0.12em] text-blue uppercase">Партнёрство</p>
            <h1 className="mt-3 max-w-[26ch] text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              Институт профессиональных бухгалтеров и аудиторов России
            </h1>
            <p className="mt-4 max-w-[68ch] text-[1.05rem] leading-relaxed text-body">
              ИПБ России — крупнейшее некоммерческое профессиональное объединение бухгалтеров и специалистов
              финансово-экономических служб, субъект негосударственного регулирования бухгалтерского учёта.
              «Дом науки и техники» — учебно-методический центр ИПБ России № 053.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/attestation"
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-blue px-6 text-sm font-semibold text-white transition-colors hover:bg-blue-dark"
              >
                <IconCertificate className="h-4 w-4" />
                Аттестация бухгалтеров
              </Link>
              <ContactButton
                topic="ИПБ России"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-surface px-6 text-sm font-semibold text-ink transition-colors hover:border-blue hover:text-blue"
              >
                <IconChat className="h-4 w-4" />
                Задать вопрос
              </ContactButton>
            </div>

            <dl className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {ipbFacts.map((f, i) => (
                <div
                  key={f.label}
                  className="about-fact rounded-2xl border border-border bg-surface p-5"
                  style={{ animationDelay: `${150 + i * 120}ms` }}
                >
                  <dt className="sr-only">{f.label}</dt>
                  <dd>
                    <CountUp
                      value={f.value}
                      delayMs={250 + i * 150}
                      className="tabular block text-3xl font-extrabold leading-none text-ink"
                    />
                    <span className="mt-2 block text-sm leading-snug text-body">{f.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-14 lg:px-10">
          <h2 className="text-2xl font-extrabold text-ink">Центр и ИПБ России</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {ties.map(({ icon: Icon, title, text, link }, i) => (
              <li key={title}>
                <Reveal subtle delayMs={i * 80} className="h-full">
                  <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-tint text-blue">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
                    <p className="mt-2 mb-4 text-sm leading-relaxed text-body">{text}</p>
                    {link && (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-blue hover:text-blue-dark"
                      >
                        {link.title}
                        <IconExternal className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-14 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-10">
            <div>
              <h2 className="text-2xl font-extrabold text-ink">Преимущества членства в ИПБ России</h2>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {benefits.map((b, i) => (
                  <li key={b}>
                    <Reveal subtle delayMs={(i % 2) * 70} className="flex h-full items-start gap-3 rounded-xl border border-border bg-surface p-4">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue text-white">
                        <IconCheck className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-sm leading-snug text-ink">{b}</span>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>

            <Reveal subtle className="h-full">
              <div className="h-full rounded-[1.75rem] border border-[#E4ECF8] bg-gradient-to-br from-[#FAFCFF] to-[#F2F7FE] p-6 shadow-[0_18px_50px_-24px_rgba(30,99,221,0.18)] sm:p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F0FD] text-blue">
                  <IconCoins className="h-6 w-6" />
                </span>
                <h2 className="mt-4 text-xl font-extrabold text-ink">Членские взносы</h2>
                <p className="mt-3">
                  <span className="tabular text-4xl font-extrabold text-ink">4 200 ₽</span>
                  <span className="ml-2 text-sm text-body">в год</span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  Для членов ИПБ России и Тюменского ТИПБ: 1 550 ₽ центр перечисляет в ИПБ России, 2 650 ₽ остаётся
                  в Тюменском ТИПБ.
                </p>
                <p className="mt-3 rounded-xl bg-surface px-4 py-3 text-sm leading-relaxed text-ink ring-1 ring-inset ring-border">
                  В комментарии к платежу обязательно укажите ФИО полностью и номер членского билета — иначе платёж
                  останется неопознанным.
                </p>
                <a
                  href={`${OLD}izv_2026.xls`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-blue px-5 text-sm font-semibold text-white transition-colors hover:bg-blue-dark"
                >
                  <IconDownload className="h-4 w-4" />
                  Квитанция на оплату
                </a>
                <p className="mt-4 text-sm text-body">
                  Своевременная оплата взносов — одно из условий{" "}
                  <Link href="/attestation/renewal" className="text-blue underline underline-offset-2 hover:text-blue-dark">
                    продления аттестата
                  </Link>
                  .
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-14 lg:px-10">
          <h2 className="text-2xl font-extrabold text-ink">Сервисы ИПБ России</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <li key={s.href}>
                <Reveal subtle delayMs={(i % 3) * 70} className="h-full">
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-blue"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-tint text-blue">
                      {s.title === "Единый реестр" ? <IconSearch className="h-5 w-5" /> : <IconExternal className="h-5 w-5" />}
                    </span>
                    <span className="flex-1">
                      <span className="block font-semibold text-ink group-hover:text-blue">{s.title}</span>
                      <span className="block text-sm text-body">{s.text}</span>
                    </span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <h2 className="text-xl font-extrabold text-ink">Контакты ИПБ России</h2>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm">
                <li className="flex flex-wrap items-center gap-2.5">
                  <IconPhone className="h-4 w-4 shrink-0 text-blue" />
                  <a href="tel:88005005451" className="tabular font-semibold text-ink hover:text-blue">
                    8 800 500-54-51
                  </a>
                  <span className="text-muted">бесплатно из всех регионов</span>
                </li>
                <li className="flex flex-wrap items-center gap-2.5">
                  <IconPhone className="h-4 w-4 shrink-0 text-blue" />
                  <a href="tel:+74958186565" className="tabular font-semibold text-ink hover:text-blue">
                    +7 (495) 818-65-65
                  </a>
                </li>
                <li className="flex flex-wrap items-center gap-2.5">
                  <IconMail className="h-4 w-4 shrink-0 text-blue" />
                  <a href="mailto:info@ipbr.org" className="font-semibold text-ink hover:text-blue">
                    info@ipbr.org
                  </a>
                </li>
              </ul>
              <p className="mt-4 text-sm text-body">Москва, ул. Тверская, д. 22Б, стр. 3.</p>
            </div>
            <ul className="grid gap-2.5">
              {[
                { href: "/attestation", title: "Аттестация бухгалтеров", icon: IconCertificate },
                { href: "/attestation/renewal", title: "Продление аттестата", icon: IconRefresh },
                { href: "/attestation/results", title: "Результаты аттестации", icon: IconCheck },
              ].map(({ href, title, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex h-full items-center gap-3 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-blue"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-tint text-blue">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="flex-1 font-semibold text-ink group-hover:text-blue">{title}</span>
                    <IconArrowRight className="h-4 w-4 text-blue" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
