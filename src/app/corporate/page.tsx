import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Reveal } from "@/components/reveal";
import {
  IconArrowRight,
  IconBuilding,
  IconCheck,
  IconClock,
  IconCoins,
  IconDownload,
  IconMail,
  IconMonitor,
  IconPhone,
  IconShield,
  IconTarget,
  IconUser,
  IconUsers,
} from "@/components/icons";
import { assetPath } from "@/lib/asset-path";

export const metadata: Metadata = {
  title: "Корпоративное обучение — Дом науки и техники",
  description:
    "Корпоративное обучение и повышение квалификации сотрудников: программы под задачи компании, на вашей площадке или онлайн, в удобные даты.",
};

const APPLICATION_URL = "/docs/zayavka-korporativnoe-obuchenie.docx";

const advantages = [
  {
    icon: IconTarget,
    title: "Индивидуальный подход",
    text: [
      "Программы разрабатываются и адаптируются под специфику вашего бизнеса, поставленные задачи, уровень подготовки группы и ваши требования к содержанию обучения.",
      "Обучение проходит в удобные для вас даты и на удобной для вас площадке.",
    ],
  },
  {
    icon: IconCoins,
    title: "Лучшее соотношение цены и качества",
    text: [
      "Обучение без отрыва от производства с наименьшими затратами.",
      "Вы сами определяете место, время и график занятий — это удобно и экономит время.",
    ],
  },
  {
    icon: IconShield,
    title: "Гарантированное качество",
    text: [
      "Опыт и профессионализм преподавателей и единый стандарт качества обучения гарантируют эффективность инвестиций в повышение квалификации персонала.",
    ],
  },
];

const formats = [
  {
    icon: IconBuilding,
    title: "Где",
    text: "На территории заказчика, на любой арендуемой площадке или в учебных аудиториях Дома науки и техники",
  },
  {
    icon: IconClock,
    title: "Когда",
    text: "В рабочие и выходные дни, в дневное и вечернее время",
  },
  {
    icon: IconMonitor,
    title: "Как",
    text: "Очно или с использованием дистанционных образовательных технологий — для территориально распределённых компаний",
  },
];

const steps = [
  {
    title: "Подбор программ",
    text: "Вы сами или по совету нашего специалиста подбираете набор программ, который отвечает текущим и будущим потребностям компании.",
  },
  {
    title: "Дотренинговая диагностика",
    text: "Изучаем задачи компании, анализируем ситуацию по выбранному направлению и прорабатываем специфику организации.",
  },
  {
    title: "Адаптация программы",
    text: "По результатам диагностики дорабатываем стандартные программы под конкретную группу слушателей и запросы заказчика.",
  },
];

export default function CorporatePage() {
  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Обучение" },
          { label: "Корпоративное обучение" },
        ]}
        showDisclosureLink
      />

      <main id="main" className="flex-1">
        <section className="bg-hero-band">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
            <p className="text-xs font-semibold tracking-[0.12em] text-blue uppercase">Для организаций</p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">Корпоративное обучение</h1>
            <p className="mt-4 max-w-[64ch] text-[1.05rem] leading-relaxed text-body">
              Одна из самых эффективных форм развития персонала: повышает квалификацию и компетенции
              сотрудников, сплачивает команду и увеличивает результативность компании в целом.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="tel:88002504191"
                className="inline-flex items-center gap-2 rounded-lg bg-blue px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-dark"
              >
                <IconPhone className="h-4 w-4" />
                8 800 250-41-91
              </a>
              <a
                href={assetPath(APPLICATION_URL)}
                download
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-blue hover:text-blue"
              >
                <IconDownload className="h-4 w-4" />
                Скачать заявку
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-12 lg:px-10 lg:pt-16">
          <h2 className="text-2xl font-extrabold text-ink">Когда стоит задуматься о корпоративном обучении?</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="flex flex-col rounded-2xl border border-border bg-surface p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-page text-body ring-1 ring-inset ring-border">
                <IconUser className="h-5 w-5" />
              </span>
              <p className="mt-4 text-lg font-bold text-ink">1–2 сотрудника</p>
              <p className="mt-1.5 mb-4 leading-relaxed text-body">
                Лучше отправить их на открытый семинар или тренинг.
              </p>
              <Link
                href="/schedule"
                className="mt-auto inline-flex w-fit items-center gap-1.5 text-sm font-medium text-blue hover:text-blue-dark"
              >
                Открытые семинары в расписании
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="flex flex-col rounded-2xl border-2 border-blue bg-blue-tint p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue text-white">
                <IconUsers className="h-5 w-5" />
              </span>
              <p className="mt-4 text-lg font-bold text-ink">10 и более человек с одной темой</p>
              <p className="mt-1.5 leading-relaxed text-body">
                Полезнее и выгоднее в расчёте на одного сотрудника организовать для персонала корпоративное
                обучение.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-14 lg:px-10">
          <h2 className="text-2xl font-extrabold text-ink">Преимущества корпоративного обучения</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {advantages.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delayMs={i * 90} className="h-full">
                <article className="h-full rounded-2xl border border-border bg-surface p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-tint text-blue">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
                  {text.map((t) => (
                    <p key={t} className="mt-2 text-sm leading-relaxed text-body">
                      {t}
                    </p>
                  ))}
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-14 lg:px-10">
          <div className="grid gap-8 rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:p-10">
            <div>
              <h2 className="text-2xl font-extrabold text-ink">Что мы предлагаем</h2>
              <p className="mt-4 leading-relaxed text-body">
                Тюменский межрегиональный учебный центр «Дом науки и техники» предоставляет пакет самых
                востребованных бизнес-программ, которые помогают повышать квалификацию сотрудников и
                качество работы сотен компаний Тюменской области, ХМАО и ЯНАО.
              </p>
              <p className="mt-3 leading-relaxed text-body">
                Мы предлагаем действенные краткосрочные форматы — один-два дня — по самым актуальным темам,
                чтобы вы всегда были в курсе последних изменений и максимально к ним готовы.
              </p>
              <p className="mt-3 leading-relaxed text-body">
                Можно заказать корпоративное обучение, повышение квалификации и тренинги по любой программе
                с нашего сайта — или мы разработаем программу по вашей тематике.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-ink">Мы проводим корпоративное обучение</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {formats.map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex gap-4 rounded-xl bg-page p-4 ring-1 ring-inset ring-border">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface text-blue ring-1 ring-inset ring-border">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-ink">{title}</span>
                      <span className="mt-0.5 block text-sm leading-relaxed text-body">{text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-14 lg:px-10">
          <h2 className="text-2xl font-extrabold text-ink">Как мы готовим обучение</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="relative rounded-2xl border border-border bg-surface p-6">
                <span className="tabular flex h-9 w-9 items-center justify-center rounded-full bg-blue text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <div className="grid gap-8 rounded-2xl bg-ink p-8 text-white lg:grid-cols-[1.2fr_1fr] lg:items-center lg:p-12">
            <div>
              <h2 className="text-2xl font-extrabold sm:text-3xl">Организуем обучение для вашей команды</h2>
              <p className="mt-3 max-w-[52ch] leading-relaxed text-white/85">
                Позвоните нам или заполните заявку и отправьте её на почту — подберём программу, даты и
                площадку.
              </p>
              <ul className="mt-6 flex flex-col gap-2.5 text-sm">
                {["Программа под задачи компании", "Удобные даты и площадка", "Документы установленного образца"].map(
                  (t) => (
                    <li key={t} className="flex items-center gap-2.5 font-medium">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15">
                        <IconCheck className="h-3 w-3" />
                      </span>
                      {t}
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="tel:88002504191"
                className="flex items-center gap-4 rounded-xl bg-white/10 p-4 transition-colors hover:bg-white/15"
              >
                <IconPhone className="h-5 w-5 shrink-0" />
                <span>
                  <span className="tabular block text-lg font-bold">8 800 250-41-91</span>
                  <span className="block text-sm text-white/85">Звонок по России бесплатный</span>
                </span>
              </a>
              <a
                href="mailto:mail@tumtipb.ru?subject=Заявка на корпоративное обучение"
                className="flex items-center gap-4 rounded-xl bg-white/10 p-4 transition-colors hover:bg-white/15"
              >
                <IconMail className="h-5 w-5 shrink-0" />
                <span>
                  <span className="block text-lg font-bold">mail@tumtipb.ru</span>
                  <span className="block text-sm text-white/85">Пришлите заполненную заявку</span>
                </span>
              </a>
              <a
                href={assetPath(APPLICATION_URL)}
                download
                className="flex items-center justify-center gap-2 rounded-xl bg-blue px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-dark"
              >
                <IconDownload className="h-4 w-4" />
                Скачать заявку на корпоративное обучение (.docx)
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
