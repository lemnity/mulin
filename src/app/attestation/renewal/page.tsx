import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactButton } from "@/components/contact-dialog";
import { Reveal } from "@/components/reveal";
import {
  IconArrowRight,
  IconCalendar,
  IconChat,
  IconCoins,
  IconExternal,
  IconFile,
  IconGraduationCap,
  IconPhone,
  IconUserCircle,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Продление квалификационного аттестата — Дом науки и техники",
  description:
    "Как продлить аттестат профессионального бухгалтера ИПБ России на новый срок: условия беззаявительного продления, 40 часов повышения квалификации в год, членские взносы.",
};

/* Правила — со страницы ИПБ России «Аттестат на новый срок» (ipbr.org/full-members/renewal),
   на которую вела ссылка «Заявление на продление аттестата» старого сайта (tumtipb.ru/content/3/124). */

const IPB = "https://www.ipbr.org";

const conditions = [
  {
    icon: IconCoins,
    title: "Членские взносы — каждый год",
    text: "Ежегодная оплата членских взносов, включая год выдачи аттестата на новый срок.",
  },
  {
    icon: IconGraduationCap,
    title: "Не менее 40 часов в год",
    text: "Повышение профессионального уровня в объёме не менее 40 часов за каждый год, включая год выдачи аттестата на новый срок.",
  },
];

const docs = [
  { title: "Устав ИПБ России", href: `${IPB}/about/documents/statutes/company-rules/` },
  { title: "Положение о членстве в ИПБ России", href: `${IPB}/about/documents/statutes/membership/` },
  { title: "Положение о выдаче аттестатов ИПБ России", href: `${IPB}/about/documents/education/attestation/issue-regulations/` },
  {
    title: "Единая система программ повышения профессионального уровня ИПБ России",
    href: `${IPB}/about/documents/education/improvement/system/`,
  },
];

export default function RenewalPage() {
  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Аттестация", href: "/attestation" },
          { label: "Продление аттестата" },
        ]}
      />

      <main id="main" className="flex-1">
        <section className="bg-hero-band">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
            <p className="text-xs font-semibold tracking-[0.12em] text-blue uppercase">Аттестация ИПБ России</p>
            <h1 className="mt-3 max-w-[24ch] text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              Продление квалификационного аттестата
            </h1>
            <p className="mt-4 max-w-[68ch] text-[1.05rem] leading-relaxed text-body">
              Аттестат ИПБ России действует три года. Действительный член ИПБ России, который своевременно
              платит членские взносы и повышает профессиональный уровень, получает аттестат на новый срок.
            </p>

            <div className="mt-7 inline-flex max-w-full items-start gap-3 rounded-2xl border-2 border-blue bg-surface px-5 py-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue text-white">
                <IconFile className="h-4 w-4" />
              </span>
              <p className="text-[0.95rem] leading-relaxed text-ink">
                <span className="font-bold">Заявление подавать не нужно.</span> Аттестат на новый срок выдаётся
                в беззаявительном порядке, если выполнены два условия ниже.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-14 lg:px-10">
          <h2 className="text-2xl font-extrabold text-ink">Два условия продления</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {conditions.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delayMs={i * 90} className="h-full">
                <article className="flex h-full gap-4 rounded-2xl border border-border bg-surface p-6">
                  <span className="tabular flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
                      <Icon className="h-5 w-5 text-blue" />
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-body">{text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-14 lg:px-10">
          <Reveal className="grid gap-8 rounded-[1.75rem] border border-[#E4ECF8] bg-gradient-to-br from-[#FAFCFF] to-[#F2F7FE] p-6 shadow-[0_18px_50px_-24px_rgba(30,99,221,0.18)] sm:p-8 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-10 lg:p-10">
            <span className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-[#E8F0FD] text-blue">
              <IconCalendar className="h-10 w-10" />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-ink sm:text-2xl">Наберите 40 часов в нашем центре</h2>
              <p className="mt-2 max-w-[62ch] leading-relaxed text-body">
                Центр — учебно-методический центр ИПБ России. Семинары, вебинары и курсы повышения
                квалификации для бухгалтеров засчитываются в ежегодный объём повышения профессионального
                уровня. Уточнить, какие программы подойдут, можно у менеджера.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row lg:flex-col">
              <Link
                href="/schedule"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue px-6 text-sm font-semibold text-white transition-colors hover:bg-blue-dark"
              >
                Выбрать программу
                <IconArrowRight className="h-4 w-4" />
              </Link>
              <ContactButton
                topic="Продление аттестата ИПБ России"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#D5DFEE] bg-surface px-6 text-sm font-semibold text-ink transition-colors hover:border-blue hover:text-blue"
              >
                <IconChat className="h-4 w-4" />
                Задать вопрос
              </ContactButton>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-14 lg:px-10">
          <div className="grid gap-4 md:grid-cols-2">
            <Reveal className="h-full">
              <article className="h-full rounded-2xl border border-border bg-surface p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-tint text-blue">
                  <IconUserCircle className="h-5 w-5" />
                </span>
                <h2 className="mt-4 text-lg font-bold text-ink">Где посмотреть аттестат</h2>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  Сведения о выданном аттестате — вид, номер, дата выдачи и срок действия — доступны в виде
                  электронной записи в{" "}
                  <a href={`${IPB}/lk/`} target="_blank" rel="noopener noreferrer" className="text-blue underline underline-offset-2">
                    личном кабинете действительного члена
                  </a>{" "}
                  и в{" "}
                  <a href={`${IPB}/registry/`} target="_blank" rel="noopener noreferrer" className="text-blue underline underline-offset-2">
                    Едином реестре ИПБ России
                  </a>
                  .
                </p>
              </article>
            </Reveal>
            <Reveal className="h-full" delayMs={90}>
              <article className="h-full rounded-2xl border border-border bg-surface p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-tint text-blue">
                  <IconFile className="h-5 w-5" />
                </span>
                <h2 className="mt-4 text-lg font-bold text-ink">Нужен бумажный аттестат?</h2>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  Поставьте отметку в соответствующем поле в личном кабинете действительного члена, в разделе
                  «Личный профиль / Аттестаты».
                </p>
              </article>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 className="text-2xl font-extrabold text-ink">Документы ИПБ России</h2>
              <ul className="mt-6 flex flex-col gap-2.5">
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
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-ink">Остались вопросы?</h2>
              <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
                <p className="text-sm leading-relaxed text-body">
                  Подскажем по условиям продления и подберём программы на нужное количество часов.
                </p>
                <a
                  href="tel:+73452515050"
                  className="mt-4 flex items-center gap-2.5 text-lg font-bold text-ink hover:text-blue"
                >
                  <IconPhone className="h-5 w-5 text-blue" />
                  <span className="tabular">(3452) 51-50-50</span>
                </a>
                <Link
                  href="/attestation"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue hover:text-blue-dark"
                >
                  Всё об аттестации
                  <IconArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
