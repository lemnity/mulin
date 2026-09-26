import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import aboutPhoto from "../../../public/hero-cover-2.webp";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";
import {
  IconArrowRight,
  IconCalculator,
  IconCertificate,
  IconCheck,
  IconFile,
  IconGraduationCap,
  IconMail,
  IconPhone,
  IconPin,
  IconScale,
  IconTeam,
  IconUsers,
} from "@/components/icons";
import { basicInfo, leadership } from "@/lib/disclosure";

export const metadata: Metadata = {
  title: "О центре — Дом науки и техники",
  description:
    "Тюменский межрегиональный учебный центр «Дом науки и техники»: повышение квалификации и профессиональная переподготовка с 1976 года, учебно-методический центр ИПБ России № 053.",
};

/* Сведения — со страницы центра на старом сайте (tumtipb.ru/content/38/58) и из раздела
   «Сведения об образовательной организации». Устаревшие цены и лицензия 2010 г. не переносились. */

const facts = [
  { value: "1976", label: "год основания центра" },
  { value: "85 000+", label: "специалистов прошли обучение" },
  { value: "№ 053", label: "учебно-методический центр ИПБ России с 1996 года" },
  { value: "№ 163", label: "лицензия на образовательную деятельность" },
];

const audiences = [
  "Руководителей",
  "Бухгалтеров",
  "Аудиторов",
  "Юристов",
  "Экономистов и финансовых работников",
  "Работников служб управления предприятием",
  "Работников кадровых служб",
  "Работников делопроизводства и архивов",
  "Специалистов технических служб: охрана труда, электротехнический персонал и др.",
  "Секретарей-референтов",
];

const directions = [
  { icon: IconCalculator, title: "Бухгалтерский учёт и отчётность" },
  { icon: IconFile, title: "Налогообложение и применение налогового законодательства" },
  { icon: IconUsers, title: "Вопросы заработной платы" },
  { icon: IconTeam, title: "Кадровый менеджмент" },
  { icon: IconScale, title: "Правовое и трудовое регулирование деятельности организаций" },
];

const credo = [
  "Лучшие преподаватели",
  "Актуальные темы",
  "Безупречная организация",
  "Индивидуальный подход",
  "Универсальная система услуг",
  "Гибкая система скидок",
];

const links = [
  { href: "/about/teachers", title: "Преподаватели", text: "Практикующие эксперты и ближайшие семинары" },
  { href: "/disclosure", title: "Сведения об образовательной организации", text: "Документы, программы, руководство" },
  { href: "/about/documents", title: "Документы", text: "Лицензия, уставные документы, образцы" },
  { href: "/ipb-russia", title: "ИПБ России", text: "Аттестация профессиональных бухгалтеров" },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "О центре" }]} />

      <main id="main" className="flex-1">
        <section className="bg-hero-band">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
              <div>
                <p className="text-sm font-semibold text-blue">Тюменский межрегиональный учебный центр</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
                  Дом науки и&nbsp;техники
                </h1>
                <p className="mt-5 max-w-[46ch] text-[1.1rem] leading-relaxed text-body">
                  Повышение квалификации и профессиональная переподготовка для специалистов предприятий,
                  бюджетных учреждений и органов власти.
                </p>
                <p className="mt-3 max-w-[46ch] text-[1.1rem] leading-relaxed text-body">
                  Главный приоритет — интересы наших слушателей.
                </p>
              </div>

              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-[0_24px_60px_-28px_rgba(20,34,74,0.45)]">
                  <Image
                    src={aboutPhoto}
                    alt="Специалист изучает документы в учебном центре"
                    fill
                    priority
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="object-cover object-[65%_center]"
                  />
                </div>
                <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-[0_12px_30px_-12px_rgba(20,34,74,0.35)] backdrop-blur sm:left-8">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-tint text-blue">
                    <IconCertificate className="h-5 w-5" />
                  </span>
                  <span className="text-sm leading-snug">
                    <span className="block font-bold text-ink">УМЦ ИПБ России № 053</span>
                    <span className="block text-body">аккредитован с 1996 года</span>
                  </span>
                </div>
              </div>
            </div>

            <dl className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {facts.map((f, i) => (
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
          <Reveal className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
            <div>
              <h2 className="text-2xl font-extrabold text-ink">Кого мы обучаем</h2>
              <p className="mt-3 leading-relaxed text-body">
                Повышаем квалификацию специалистов разных служб, а также работаем по коллективным заказам и
                заявкам предприятий.
              </p>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {audiences.map((a) => (
                  <li key={a} className="flex items-start gap-2.5 text-sm leading-snug text-ink">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-tint text-blue">
                      <IconCheck className="h-3 w-3" />
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
              <Link
                href="/corporate"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-blue hover:text-blue-dark"
              >
                Корпоративное обучение для компаний
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-ink">Основные направления</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {directions.map(({ icon: Icon, title }) => (
                  <li key={title} className="flex items-center gap-3.5 rounded-2xl border border-border bg-surface p-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-tint text-blue">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold leading-snug text-ink">{title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-14 lg:px-10">
          <Reveal className="grid gap-8 rounded-[1.75rem] border border-[#E4ECF8] bg-gradient-to-br from-[#FAFCFF] to-[#F2F7FE] p-6 shadow-[0_18px_50px_-24px_rgba(30,99,221,0.18)] sm:p-8 lg:grid-cols-[auto_1fr] lg:gap-10 lg:p-10">
            <span className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-[#E8F0FD] text-blue">
              <IconGraduationCap className="h-10 w-10" />
            </span>
            <div>
              <h2 className="text-2xl font-extrabold text-ink">Подготовка профессиональных бухгалтеров</h2>
              <p className="mt-3 max-w-[72ch] leading-relaxed text-body">
                Одно из ведущих направлений центра — подготовка, аттестация и повышение квалификации
                профессиональных бухгалтеров. Центр аккредитован при Институте профессиональных бухгалтеров
                России в октябре 1996 года как учебно-методический центр № 053. Преподаватели, которые ведут
                подготовку и аттестацию, — члены ИПБ России с аттестатом преподавателя.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/attestation"
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue px-5 text-sm font-semibold text-white transition-colors hover:bg-blue-dark"
                >
                  <IconCertificate className="h-4 w-4" />
                  Аттестация ИПБ
                </Link>
                <Link
                  href="/ipb-russia"
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#D5DFEE] bg-surface px-5 text-sm font-semibold text-ink transition-colors hover:border-blue hover:text-blue"
                >
                  Об ИПБ России
                </Link>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-14 lg:px-10">
          <h2 className="text-2xl font-extrabold text-ink">Наше кредо</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {credo.map((c, i) => (
              <li key={c}>
                <Reveal delayMs={(i % 3) * 90} className="flex h-full items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue text-white">
                    <IconCheck className="h-4 w-4" />
                  </span>
                  <span className="font-semibold text-ink">{c}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-14 lg:px-10">
          <Reveal className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <h2 className="text-2xl font-extrabold text-ink">Руководство</h2>
              <ul className="mt-6 flex flex-col gap-3">
                {leadership.map((l) => (
                  <li key={l.name} className="rounded-2xl border border-border bg-surface p-5">
                    <p className="font-semibold text-ink">{l.name}</p>
                    <p className="mt-0.5 text-sm text-body">{l.position}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-ink">Контакты</h2>
              <ul className="mt-6 flex flex-col gap-3 text-sm">
                <li className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-5">
                  <IconPin className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                  <span className="text-ink">{basicInfo.address}</span>
                </li>
                <li className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-5">
                  <IconPhone className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                  <span>
                    {basicInfo.phones.map((p) => (
                      <a key={p.tel} href={`tel:${p.tel}`} className="tabular block font-semibold text-ink hover:text-blue">
                        {p.display}
                      </a>
                    ))}
                    <span className="mt-1 block text-body">{basicInfo.schedule[0]}</span>
                  </span>
                </li>
                <li className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-5">
                  <IconMail className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                  <a href={`mailto:${basicInfo.email}`} className="font-semibold text-ink hover:text-blue">
                    {basicInfo.email}
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <h2 className="text-2xl font-extrabold text-ink">Подробнее о центре</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {links.map((l, i) => (
              <Reveal key={l.href} delayMs={i * 90} className="h-full">
                <Link
                  href={l.href}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-blue"
                >
                  <span className="font-semibold text-ink group-hover:text-blue">{l.title}</span>
                  <span className="mt-1 mb-4 text-sm leading-snug text-body">{l.text}</span>
                  <IconArrowRight className="mt-auto h-4 w-4 text-blue" />
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
