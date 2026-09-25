import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactButton } from "@/components/contact-dialog";
import { Reveal } from "@/components/reveal";
import { QualificationsFilter, type Qualification } from "@/components/qualifications-filter";
import {
  IconArrowRight,
  IconChat,
  IconCheck,
  IconExternal,
  IconFile,
  IconLaptop,
  IconMail,
  IconPhone,
  IconRefresh,
  IconBuilding,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Аттестация профессиональных бухгалтеров — Дом науки и техники",
  description:
    "Подготовка и аттестация бухгалтеров по профессиональному стандарту «Бухгалтер» с получением квалификационного аттестата ИПБ России: требования, этапы экзамена, документы.",
};

/* Сведения — со страниц «Аттестация» старого сайта (tumtipb.ru/content/59, /courses/1/58).
   Цены и банковские реквизиты не переносились: на старом сайте они противоречат друг другу. */

const qualifications: Qualification[] = [
  { title: "Бухгалтер коммерческой организации", level: 5 },
  { title: "Бухгалтер организации бюджетной сферы", level: 5 },
  { title: "Главный бухгалтер коммерческой организации", level: 6 },
  { title: "Главный бухгалтер организации бюджетной сферы", level: 6 },
  { title: "Профессиональный налоговый консультант", level: 6 },
  { title: "Профессиональный внутренний контролёр (аудитор)", level: 6 },
  { title: "Профессиональный финансовый директор", level: 6 },
  { title: "Профессиональный эксперт по МСФО", level: 6 },
  { title: "Главный бухгалтер — эксперт в области налогового учёта и налоговой отчётности", level: 6 },
  { title: "Главный бухгалтер — эксперт в области внутреннего контроля", level: 6 },
  { title: "Главный бухгалтер коммерческой организации, имеющей обособленные подразделения", level: 7 },
  { title: "Главный бухгалтер организации бюджетной сферы, имеющей обособленные подразделения", level: 7 },
];

const requirements = [
  {
    title: "Аттестат 6-го и 7-го уровней",
    items: [
      "Высшее образование и стаж не менее 3 лет из последних 5 календарных лет в должностях главного бухгалтера, руководителя финансово-экономической службы и их заместителей или на руководящих должностях, требующих знания бухгалтерского учёта, а также аудиторов, консультантов, методологов и преподавателей вузов по бухгалтерскому учёту.",
      "Или среднее профессиональное экономическое образование с профессиональной переподготовкой по экономическим специальностям и стаж не менее 5 лет из последних 7 календарных лет в тех же должностях.",
    ],
  },
  {
    title: "Аттестат 5-го уровня",
    items: [
      "Среднее профессиональное образование по направлению «Экономика и управление» — без требований к стажу.",
      "Или обучение в вузе на курсе не ниже 3-го по направлению «Экономика и управление» — без требований к стажу.",
      "Или образование не ниже среднего общего, специальная подготовка по учёту и контролю и стаж не менее 3 лет по профессии.",
    ],
  },
];

const remoteSteps = [
  {
    title: "Самостоятельное обучение",
    text: "Электронный учебник на 280 часов по программе ИПБ России. Учитесь в удобное время; изучение материалов рекомендуем уложить в 3 месяца — обновления учебника приходят на почту.",
  },
  {
    title: "Первый этап экзамена — онлайн",
    text: "После вступительного взноса открывается доступ к тестированию на сайте ИПБ России. Предварительный тест — для самопроверки. Первый этап: 15 вопросов по бухучёту, налогообложению и праву за 54 минуты; пересдача без ограничений и без доплаты.",
  },
  {
    title: "Второй этап — в территориальном институте",
    text: "Тестирование из 48 вопросов, на ответы — 3 часа. При неудаче — неограниченное число попыток в течение календарного года.",
  },
  {
    title: "Аттестат и членский билет",
    text: "По итогам двух этапов выдаются аттестат профессионального бухгалтера по выбранной специализации и членский билет. Форма обучения в аттестате не указывается.",
  },
];

const docs = [
  { title: "Цель профессиональной аттестации", href: "https://www.ipbr.org/get-certificate/what-for/" },
  {
    title: "Положение об аттестации претендентов на получение квалификационного аттестата",
    href: "https://www.ipbr.org/about/documents/education/attestation/statute/",
  },
  { title: "Положение о членстве в ИПБ России", href: "https://www.ipbr.org/about/documents/statutes/membership/" },
  { title: "Билеты промежуточной аттестации — коммерческие организации", href: "https://tumtipb.ru/upload/file/com_bil_18.doc" },
  { title: "Билеты промежуточной аттестации — государственный сектор", href: "https://tumtipb.ru/upload/file/gos_bil_18.doc" },
  { title: "Экзаменационный лист", href: "https://tumtipb.ru/upload/file/ex_list_18.doc" },
  { title: "Инструкция по работе с личным кабинетом претендента", href: "https://tumtipb.ru/upload/file/applicant_att_e032020-.doc" },
  {
    title: "Заявления для оформления личного дела",
    href: "https://tumtipb.ru/upload/file/documenty%20dlya%20zapolneniya_2019.zip",
  },
];

const related = [
  { href: "/attestation/renewal", title: "Продлить аттестат", icon: IconRefresh },
  { href: "/attestation/results", title: "Результаты аттестации", icon: IconCheck },
  { href: "/ipb-russia", title: "Об ИПБ России", icon: IconBuilding },
];

export default function AttestationPage() {
  return (
    <>
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Аттестация" }]} />

      <main id="main" className="flex-1">
        <section className="bg-hero-band">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
            <p className="text-xs font-semibold tracking-[0.12em] text-blue uppercase">Аттестация ИПБ России</p>
            <h1 className="mt-3 max-w-[24ch] text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              Подготовка и аттестация профессиональных бухгалтеров
            </h1>
            <p className="mt-4 max-w-[70ch] text-[1.05rem] leading-relaxed text-body">
              Центр аккредитован как учебно-методический центр Института профессиональных бухгалтеров и
              аудиторов России. Набираем группы подготовки и аттестации по профессиональному стандарту
              «Бухгалтер» (приказ Минтруда России № 103н от 21.02.2019) с получением квалификационного
              аттестата ИПБ России — по положениям об аттестации, утверждённым протоколом № 8/19 от 29.08.2019.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="tel:+73452515050"
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-blue px-6 text-sm font-semibold text-white transition-colors hover:bg-blue-dark"
              >
                <IconPhone className="h-4 w-4" />
                <span className="tabular">+7 (3452) 51-50-50</span>
              </a>
              <ContactButton
                topic="Аттестация профессиональных бухгалтеров"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-surface px-6 text-sm font-semibold text-ink transition-colors hover:border-blue hover:text-blue"
              >
                <IconChat className="h-4 w-4" />
                Задать вопрос
              </ContactButton>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-14 lg:px-10">
          <QualificationsFilter items={qualifications} />
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-14 lg:px-10">
          <h2 className="text-2xl font-extrabold text-ink">Требования к претендентам</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {requirements.map((r) => (
              <Reveal key={r.title} className="h-full">
                <article className="h-full rounded-2xl border border-border bg-surface p-6">
                  <h3 className="text-lg font-bold text-ink">{r.title}</h3>
                  <ul className="mt-4 flex flex-col gap-3">
                    {r.items.map((t) => (
                      <li key={t} className="flex items-start gap-2.5 text-sm leading-relaxed text-body">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-tint text-blue">
                          <IconCheck className="h-3 w-3" />
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-4 text-sm text-body">
            Студентам — скидка до 50% на обучение по программе при предъявлении справки из вуза.
          </p>
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-14 lg:px-10">
          <div className="grid gap-4 lg:grid-cols-[1fr_1.6fr]">
            <Reveal className="h-full">
              <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-tint text-blue">
                  <IconBuilding className="h-5 w-5" />
                </span>
                <h2 className="mt-4 text-xl font-extrabold text-ink">Очно в Тюмени</h2>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  Группы подготовки в учебном центре на ул. Максима Горького, 59/3. Аттестация проходит в
                  форме промежуточной аттестации и тестирования.
                </p>
                <p className="mt-auto pt-4 text-sm leading-relaxed text-body">
                  По условиям приёма в группы:{" "}
                  <a href="tel:+73452515050" className="tabular font-semibold text-ink hover:text-blue">
                    (3452) 51-50-50
                  </a>
                  ,{" "}
                  <a href="tel:+73452517070" className="tabular font-semibold text-ink hover:text-blue">
                    51-70-70
                  </a>
                  , Сидорова Людмила Эрнесовна.
                </p>
              </article>
            </Reveal>

            <Reveal className="h-full" delayMs={90}>
              <article className="h-full rounded-2xl border border-border bg-surface p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-tint text-blue">
                  <IconLaptop className="h-5 w-5" />
                </span>
                <h2 className="mt-4 text-xl font-extrabold text-ink">Дистанционно</h2>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  Специализации: главный бухгалтер и бухгалтер — коммерческой организации или организации
                  государственного сектора.
                </p>
                <ol className="mt-5 grid gap-4 sm:grid-cols-2">
                  {remoteSteps.map((s, i) => (
                    <li key={s.title} className="flex gap-3">
                      <span className="tabular flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue text-sm font-bold text-white">
                        {i + 1}
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-ink">{s.title}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-body">{s.text}</span>
                      </span>
                    </li>
                  ))}
                </ol>
                <p className="mt-5 rounded-xl bg-page px-4 py-3 text-sm text-body ring-1 ring-inset ring-border">
                  Стоимость обучения, учебника и вступительного взноса уточняйте у менеджера — выставим счёт
                  на организацию или направим квитанцию.
                </p>
              </article>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-14 lg:px-10">
          <h2 className="text-2xl font-extrabold text-ink">Документы</h2>
          <ul className="mt-6 grid gap-2.5 md:grid-cols-2">
            {docs.map((d) => (
              <li key={d.href}>
                <a
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-3.5 transition-colors hover:border-blue hover:bg-blue-tint/40"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-tint text-blue">
                    <IconFile className="h-4 w-4" />
                  </span>
                  <span className="flex-1 text-sm font-medium text-ink group-hover:text-blue">{d.title}</span>
                  <IconExternal className="h-3.5 w-3.5 shrink-0 text-muted group-hover:text-blue" />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-[1.75rem] border border-[#E4ECF8] bg-gradient-to-br from-[#FAFCFF] to-[#F2F7FE] p-6 shadow-[0_18px_50px_-24px_rgba(30,99,221,0.18)] sm:p-8">
              <h2 className="text-xl font-extrabold text-ink">Контакты по аттестации</h2>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm">
                <li className="flex items-center gap-2.5">
                  <IconPhone className="h-4 w-4 shrink-0 text-blue" />
                  <a href="tel:+73452515050" className="tabular font-semibold text-ink hover:text-blue">
                    (3452) 51-50-50
                  </a>
                  <span className="-ml-2 text-muted">,</span>
                  <a href="tel:+73452517070" className="tabular font-semibold text-ink hover:text-blue">
                    51-70-70
                  </a>
                </li>
                <li className="flex flex-wrap items-center gap-2.5">
                  <IconMail className="h-4 w-4 shrink-0 text-blue" />
                  <a href="mailto:ti44@ipbr.org" className="font-semibold text-ink hover:text-blue">
                    ti44@ipbr.org
                  </a>
                  <span className="text-muted">или</span>
                  <a href="mailto:mucdnt@mail.ru" className="font-semibold text-ink hover:text-blue">
                    mucdnt@mail.ru
                  </a>
                </li>
              </ul>
            </div>
            <ul className="grid gap-2.5">
              {related.map(({ href, title, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-blue"
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
