import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { IconChevronDown, IconExternal, IconFile } from "@/components/icons";
import {
  basicInfo,
  charterDocs,
  doc,
  educationFacts,
  leadership,
  localActs,
  programs,
  reportDocs,
  studentTotals,
  teachingStaff,
  type DocLink,
} from "@/lib/disclosure";

export const metadata: Metadata = {
  title: "Сведения об образовательной организации — Дом науки и техники",
  description:
    "Основные сведения, документы, образовательные программы, руководство и педагогический состав АНО ДПО ТМУЦ «Дом науки и техники».",
};

const SECTIONS = [
  { id: "common", title: "Основные сведения" },
  { id: "struct", title: "Структура и органы управления" },
  { id: "document", title: "Документы" },
  { id: "education", title: "Образование" },
  { id: "eduStandarts", title: "Образовательные стандарты и требования" },
  { id: "managers", title: "Руководство" },
  { id: "employees", title: "Педагогический состав" },
  { id: "objects", title: "Материально-техническое обеспечение. Доступная среда" },
  { id: "grants", title: "Стипендии и меры поддержки обучающихся" },
  { id: "paid_edu", title: "Платные образовательные услуги" },
  { id: "budget", title: "Финансово-хозяйственная деятельность" },
  { id: "vacant", title: "Вакантные места для приёма (перевода)" },
  { id: "inter", title: "Международное сотрудничество" },
  { id: "catering", title: "Организация питания" },
  { id: "security", title: "Безопасность" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

function Section({ id, children }: { id: SectionId; children: ReactNode }) {
  const index = SECTIONS.findIndex((s) => s.id === id);
  return (
    <section id={id} className="scroll-mt-28 rounded-2xl border border-border bg-surface p-5 sm:p-7">
      <h2 className="flex items-baseline gap-3 text-xl font-bold leading-snug text-ink">
        <span className="tabular text-sm font-semibold text-blue">{String(index + 1).padStart(2, "0")}</span>
        {SECTIONS[index].title}
      </h2>
      <div className="mt-5 text-sm leading-relaxed text-body">{children}</div>
    </section>
  );
}

function Sub({ children }: { children: ReactNode }) {
  return <h3 className="mb-3 mt-7 text-base font-semibold text-ink first:mt-0">{children}</h3>;
}

function Facts({ rows }: { rows: { label: string; value: ReactNode }[] }) {
  return (
    <dl className="divide-y divide-border rounded-xl border border-border">
      {rows.map((r) => (
        <div key={r.label} className="grid gap-1 px-4 py-3 sm:grid-cols-[14rem_1fr] sm:gap-6">
          <dt className="font-medium text-muted">{r.label}</dt>
          <dd className="text-ink">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function DocItem({ d }: { d: DocLink }) {
  return (
    <li>
      <a
        href={d.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-start gap-3 rounded-xl border border-border bg-page p-3 transition-colors hover:border-blue hover:bg-blue-tint/50"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface text-blue ring-1 ring-inset ring-border">
          <IconFile className="h-4 w-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-medium text-ink group-hover:text-blue">{d.title}</span>
          {d.approved && <span className="mt-0.5 block text-xs text-muted">{d.approved}</span>}
        </span>
        <IconExternal className="mt-2.5 h-3.5 w-3.5 shrink-0 text-muted group-hover:text-blue" />
      </a>
      {d.attachments && (
        <ul className="ml-12 mt-2 flex flex-col gap-1.5">
          {d.attachments.map((a) => (
            <li key={a.url}>
              <a href={a.url} target="_blank" rel="noopener noreferrer" className="text-blue hover:text-blue-dark">
                {a.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function DocList({ docs }: { docs: DocLink[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {docs.map((d) => (
        <DocItem key={d.url} d={d} />
      ))}
    </ul>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((t) => (
        <li key={t} className="flex gap-2.5">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
          {t}
        </li>
      ))}
    </ul>
  );
}

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const link = "text-blue hover:text-blue-dark";

const formTone: Record<string, string> = {
  Очная: "bg-green-tint text-green-text",
  "Очно-заочная": "bg-amber-tint text-amber-text",
  Дистанционная: "bg-blue-tint text-blue",
};

function ProgramsTable() {
  return (
    <div className="-mx-5 overflow-x-auto sm:mx-0">
      <table className="w-full min-w-[44rem] border-separate border-spacing-0 text-left text-sm">
        <thead>
          <tr className="text-xs uppercase tracking-wide text-muted">
            {["№", "Программа", "Срок", "Преподаватели", "Документы", "Обучено в 2025"].map((h, i) => (
              <th
                key={h}
                className={`border-b border-border bg-page px-3 py-2.5 font-semibold first:rounded-tl-lg first:pl-5 last:rounded-tr-lg last:pr-5 sm:first:pl-3 sm:last:pr-3 ${i === 5 ? "text-right" : ""}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {programs.map((p) => (
            <tr key={p.n} className="align-top">
              <td className="tabular border-b border-border py-3 pl-5 pr-3 text-muted sm:pl-3">{p.n}</td>
              <td className="border-b border-border px-3 py-3">
                <a href={doc(p.program)} {...ext} className="font-medium text-ink hover:text-blue">
                  {p.title}
                </a>
                <span className={`mt-1.5 block w-fit rounded-full px-2 py-0.5 text-[0.7rem] font-semibold ${formTone[p.form]}`}>
                  {p.form}
                </span>
              </td>
              <td className="tabular whitespace-nowrap border-b border-border px-3 py-3 text-ink">{p.hours} ч</td>
              <td className="border-b border-border px-3 py-3">
                {p.teachers.map((t) => (
                  <a key={t.name} href={doc(t.url)} {...ext} className={`block ${link}`}>
                    {t.name}
                  </a>
                ))}
              </td>
              <td className="whitespace-nowrap border-b border-border px-3 py-3">
                <a href={doc(p.plan)} {...ext} className={`block ${link}`}>
                  Учебный план
                </a>
                <a href={doc(p.annotation)} {...ext} className={`block ${link}`}>
                  Аннотация
                </a>
                <a href={doc(p.schedule)} {...ext} className={`block ${link}`}>
                  Учебный график
                </a>
              </td>
              <td className="tabular border-b border-border py-3 pl-3 pr-5 text-right font-semibold text-ink sm:pr-3">
                {p.students}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectionNav() {
  return (
    <ol className="flex flex-col gap-0.5 text-sm">
      {SECTIONS.map((s, i) => (
        <li key={s.id}>
          <a
            href={`#${s.id}`}
            className="flex gap-2.5 rounded-lg px-3 py-2 text-body transition-colors hover:bg-blue-tint hover:text-blue"
          >
            <span className="tabular w-5 shrink-0 text-xs font-semibold leading-5 text-muted">{i + 1}</span>
            <span className="leading-5">{s.title}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}

export default function DisclosurePage() {
  return (
    <>
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Сведения об образовательной организации" }]} />

      <main id="main" className="flex-1">
        <section className="bg-hero-band">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
            <p className="text-xs font-semibold tracking-[0.12em] text-blue uppercase">Обязательная информация</p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              Сведения об образовательной организации
            </h1>
            <p className="mt-4 max-w-[68ch] text-[1.05rem] leading-relaxed text-body">
              {basicInfo.shortName} размещает информацию о своей деятельности в соответствии с Федеральным
              законом № 273-ФЗ «Об образовании в Российской Федерации».
            </p>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[17rem_1fr] lg:px-10 lg:py-12">
          <aside>
            <details className="group rounded-xl border border-border bg-surface lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                Разделы
                <IconChevronDown className="h-4 w-4 text-blue transition-transform group-open:rotate-180" />
              </summary>
              <div className="border-t border-border p-2">
                <SectionNav />
              </div>
            </details>
            <nav aria-label="Разделы сведений" className="sticky top-28 hidden lg:block">
              <SectionNav />
            </nav>
          </aside>

          <div className="flex min-w-0 flex-col gap-5">
            <Section id="common">
              <Facts
                rows={[
                  { label: "Полное наименование", value: basicInfo.fullName },
                  { label: "Сокращённое наименование", value: basicInfo.shortName },
                  { label: "Дата создания", value: basicInfo.founded },
                  {
                    label: "Учредители",
                    value: (
                      <a href={basicInfo.foundersUrl} {...ext} className={link}>
                        Сведения об учредителях (PDF)
                      </a>
                    ),
                  },
                  { label: "Адрес", value: basicInfo.address },
                  {
                    label: "Режим работы",
                    value: basicInfo.schedule.map((s) => (
                      <span key={s} className="block">
                        {s}
                      </span>
                    )),
                  },
                  {
                    label: "Телефоны",
                    value: basicInfo.phones.map((p) => (
                      <a key={p.tel} href={`tel:${p.tel}`} className={`tabular block ${link}`}>
                        {p.display}
                      </a>
                    )),
                  },
                  {
                    label: "Электронная почта",
                    value: (
                      <a href={`mailto:${basicInfo.email}`} className={link}>
                        {basicInfo.email}
                      </a>
                    ),
                  },
                  {
                    label: "Лицензия",
                    value: (
                      <a href={basicInfo.license.url} {...ext} className={link}>
                        {basicInfo.license.title}
                      </a>
                    ),
                  },
                  { label: "Аккредитация", value: basicInfo.accreditation },
                ]}
              />
            </Section>

            <Section id="struct">
              <Facts
                rows={leadership.map((l) => ({ label: l.position, value: l.name }))}
              />
            </Section>

            <Section id="document">
              <Sub>Устав и лицензия</Sub>
              <DocList docs={charterDocs} />
              <Sub>Локальные нормативные акты</Sub>
              <p className="mb-3">
                Разработаны на основании ст. 26, 28, 30, 34, 55, 62 Федерального закона от 29.12.2012 № 273-ФЗ
                «Об образовании в Российской Федерации» и ст. 100 ТК РФ.
              </p>
              <DocList docs={localActs} />
              <Sub>Самообследование и предписания</Sub>
              <DocList docs={reportDocs} />
            </Section>

            <Section id="education">
              <Facts rows={educationFacts} />
              <Sub>Образовательные программы</Sub>
              <p className="mb-4">
                По каждой программе доступны текст программы (по ссылке в названии), учебный план, аннотация к
                рабочей программе и календарный учебный график. Место проведения всех программ — 625048,
                г. Тюмень, ул. Максима Горького, д. 59/3.
              </p>
              <ProgramsTable />
              <Sub>Численность обучающихся за 2025 год</Sub>
              <Facts
                rows={[
                  { label: "Всего", value: <span className="tabular font-semibold">{studentTotals.total}</span> },
                  { label: "За счёт бюджетных ассигнований", value: <span className="tabular">{studentTotals.budget}</span> },
                  { label: "По договорам с оплатой стоимости обучения", value: <span className="tabular">{studentTotals.paid}</span> },
                ]}
              />
            </Section>

            <Section id="eduStandarts">
              <p className="mb-4">
                При разработке дополнительных профессиональных программ применяются профессиональные стандарты,
                утверждённые Министерством труда и социальной защиты Российской Федерации.
              </p>
              <DocList
                docs={[
                  ["08.002 «Бухгалтер» от 21.02.2019", "Профессиональный-стандарт-Бухгалтер-от-21.02.2019г.docx"],
                  [
                    "07.002 «Специалист по организационному и документационному обеспечению управления организацией» от 15.06.2020",
                    "Профессиональный-стандарт-Специалист-по-организационному-и-документационному-обеспечению-управления-организацией-от-15.06.2020-г.docx",
                  ],
                  ["07.003 «Специалист по управлению персоналом» от 09.03.2022", "Профессиональный-стандарт-Специалист-по-управлению-персоналом-от-09.03.2022г.docx"],
                  ["08.026 «Специалист в сфере закупок» от 10.09.2015", "Профессиональный-стандарт-Специалист-в-сфере-закупок-от-10.09.2015-г.docx"],
                  ["40.054 «Специалист в области охраны труда» от 22.04.2021", "Профессиональный-стандарт-Специалист-в-области-охраны-труда-от-22.04.2021г.docx"],
                  ["08.023 «Аудитор» от 19.10.2015", "Профессиональный-стандарт-Аудитор-от-19.10.2015-г.docx"],
                  [
                    "06.033 «Специалист по защите информации в автоматизированных системах» от 14.09.2022",
                    "Профессиональным-стандартом-Специалист-по-защите-информации-в-автоматизированных-системах-от-14.09.2022-г.docx",
                  ],
                ].map(([title, file]) => ({ title: `Профессиональный стандарт ${title}`, url: doc(`2024/10/${file}`) }))}
              />
            </Section>

            <Section id="managers">
              <div className="grid gap-3 sm:grid-cols-2">
                {leadership.map((l) => (
                  <div key={l.name} className="rounded-xl border border-border bg-page p-4">
                    <p className="font-semibold text-ink">{l.name}</p>
                    <p className="mt-0.5 text-muted">{l.position}</p>
                    <a href={`tel:${l.phone.tel}`} className={`tabular mt-3 block ${link}`}>
                      {l.phone.display}
                    </a>
                    <a href={`mailto:${l.email}`} className={`block ${link}`}>
                      {l.email}
                    </a>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="employees">
              <p className="mb-4">
                Сведения о каждом педагогическом работнике (образование, квалификация, стаж, повышение
                квалификации, преподаваемые программы) — в карточке по ссылке.
              </p>
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {teachingStaff.map((t) => (
                  <li key={t.name}>
                    <a
                      href={doc(t.url)}
                      {...ext}
                      className="group flex items-center gap-3 rounded-xl border border-border bg-page p-3 transition-colors hover:border-blue hover:bg-blue-tint/50"
                    >
                      <IconFile className="h-4 w-4 shrink-0 text-blue" />
                      <span className="flex-1 font-medium text-ink group-hover:text-blue">{t.name}</span>
                      <IconExternal className="h-3.5 w-3.5 shrink-0 text-muted group-hover:text-blue" />
                    </a>
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="objects">
              <p>
                Проектная мощность — 124 посадочных места. Учебные помещения оборудованы в соответствии с
                требованиями профессиональных стандартов; все помещения соответствуют санитарным нормам
                (санитарно-эпидемиологическое заключение № 72.ОЦ.01.000.М.000452.07.16 от 20.07.2016, Управление
                Роспотребнадзора по Тюменской области).
              </p>
              <Sub>Учебные помещения</Sub>
              <div className="overflow-hidden rounded-xl border border-border">
                {[
                  ["Учебная аудитория № 7", 20],
                  ["Учебная аудитория № 8", 37],
                  ["Лекционный зал", 81],
                ].map(([name, area]) => (
                  <div key={name} className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 last:border-b-0">
                    <span className="font-medium text-ink">{name}</span>
                    <span className="tabular text-muted">{area} м²</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-muted">
                Адрес: г. Тюмень, ул. Максима Горького, 59/3 (договор аренды нежилого помещения № 8 от 25.12.2023).
                Оснащение всех помещений: экран, мультимедийный проектор, компьютеры, столы и стулья для
                преподавателей и слушателей, электронные наглядные пособия, кондиционер.
              </p>
              <Sub>Средства обучения и доступ к информационным системам</Sub>
              <p>
                Используются информационные технологии, технические средства и информационно-телекоммуникационные
                сети. Для слушателей установлены стационарные компьютеры; во всех учебных и административных
                помещениях действует бесплатный Wi-Fi. Дистанционное обучение — на платформах mts-link.ru и
                online.tumtipb.ru.
              </p>
              <Sub>Библиотека</Sub>
              <p className="mb-3">
                Учебно-методические пособия в электронном виде хранятся на сервере центра и в системе
                дистанционного обучения, печатные — в административном помещении. Полный доступ к электронным
                материалам курса открывается после оплаты обучения.
              </p>
              <DocList
                docs={[
                  { title: "Положение об электронной библиотеке", url: doc("2024/05/Polozhenie-ob-el-biblioteki_2019-1.pdf") },
                  { title: "Справка об учебно-методическом обеспечении образовательного процесса", url: doc("2024/05/Spravka-o-uchebno-metodicheskom-obespechenii.pdf") },
                ]}
              />
              <Sub>Охрана здоровья обучающихся</Sub>
              <p>
                При входе оборудовано место для обработки рук, в учебных аудиториях установлены бактерицидные
                рециркуляторы воздуха, помещения регулярно проветриваются. Объекты спорта не предусмотрены.
              </p>
              <Sub>Доступная среда</Sub>
              <p>
                Обучение слушателей с ограниченными возможностями здоровья и инвалидов проводится только с
                применением дистанционных образовательных технологий: условия беспрепятственного, безопасного и
                удобного доступа в здание отсутствуют, специальные технические средства обучения коллективного и
                индивидуального пользования не предусмотрены.
              </p>
            </Section>

            <Section id="grants">
              <p>
                Стипендии и иные меры социальной поддержки обучающихся не предусмотрены Уставом и локальными
                нормативными актами образовательной организации.
              </p>
            </Section>

            <Section id="paid_edu">
              <DocList
                docs={[
                  { title: "Положение об оказании платных образовательных услуг", url: doc("2024/10/2.-Положение-об-оказании-платных-образовательных-услуг.pdf") },
                  { title: "Образец договора на оказание платных образовательных услуг (физическое лицо)", url: doc("2024/05/Образец_договора_физическое_лицо.pdf") },
                  { title: "Образец договора на оказание платных образовательных услуг (юридическое лицо)", url: doc("2024/05/Образец_договора_юридическое_лицо.pdf") },
                  { title: "Приказ об утверждении стоимости платных образовательных услуг", url: doc("2026/01/Приказ-№-4споу.25-стоимость-услуг.pdf") },
                ]}
              />
            </Section>

            <Section id="budget">
              <p className="mb-3">
                Образовательная деятельность финансируется по договорам об оказании платных образовательных услуг.
              </p>
              <DocList docs={[{ title: "План финансово-хозяйственной деятельности на 2026 год", url: doc("2026/01/План-ФХД-на-2026г.pdf") }]} />
            </Section>

            <Section id="vacant">
              <DocList
                docs={[{ title: "Вакантные места для приёма (перевода) обучающихся", url: doc("2024/10/Вакантные-места-для-приема-перевода-обучающихся.pdf") }]}
              />
            </Section>

            <Section id="inter">
              <p>Договоров с иностранными и международными организациями по вопросам образования и науки нет.</p>
            </Section>

            <Section id="catering">
              <p>Организация питания в {basicInfo.shortName} не предусмотрена.</p>
            </Section>

            <Section id="security">
              <Sub>Безопасность, охрана здоровья и жизни сотрудников и слушателей</Sub>
              <Bullets
                items={[
                  "Проведена специальная оценка условий труда (заключение № 063-С-24 от 21.03.2024, АНО «Тюменский Межрегиональный Центр Охраны Труда»)",
                  "Во всех аудиториях и кабинетах установлена охранно-пожарная сигнализация",
                  "Помещения отвечают санитарно-гигиеническим нормам и нормам освещения",
                  "Ежедневная уборка и проветривание",
                  "Установлены кулеры с бутилированной водой, кондиционеры и камеры видеонаблюдения",
                  "Размещены информационные знаки (о запрете курения и т. д.)",
                  "Приказом назначены ответственные за охранное состояние помещений",
                ]}
              />
              <Sub>Пожарная безопасность</Sub>
              <Bullets
                items={[
                  "Инструктаж по пожарной безопасности под роспись — не реже одного раза в год",
                  "Установлены первичные средства пожаротушения (огнетушители)",
                  "Размещены знаки пожарной безопасности, обозначены пути эвакуации и эвакуационные выходы",
                  "Установлен охранно-пожарный оптико-электронный извещатель",
                  "Приказом назначены ответственные за обеспечение пожарной безопасности помещений",
                ]}
              />
            </Section>

            <p className="flex items-center gap-2 text-xs text-muted">
              <IconExternal className="h-3.5 w-3.5" />
              Документы открываются с портала docs.tumtipb.ru.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
