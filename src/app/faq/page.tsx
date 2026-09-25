import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactButton } from "@/components/contact-dialog";
import { Reveal } from "@/components/reveal";
import { IconChat, IconChevronDown, IconPhone } from "@/components/icons";

export const metadata: Metadata = {
  title: "Вопросы и ответы — Дом науки и техники",
  description:
    "Как записаться на семинар или курс, оплатить обучение, получить договор и документы об окончании, пройти аттестацию.",
};

/* Ответы собраны из материалов старого сайта (инструкция по записи, «Аттестация», ответы центра на отзывы)
   и раздела «Сведения об образовательной организации». Выдуманных условий (перенос, возврат) нет. */

const OLD = "https://tumtipb.ru/upload/file/";
const a = "text-blue underline underline-offset-2 hover:text-blue-dark";

type Qa = { q: string; a: ReactNode };
type Group = { id: string; title: string; items: Qa[] };

const groups: Group[] = [
  {
    id: "signup",
    title: "Запись и оплата",
    items: [
      {
        q: "Как записаться на семинар или курс?",
        a: (
          <>
            Выберите программу в{" "}
            <Link href="/schedule" className={a}>
              расписании
            </Link>
            , откройте её и нажмите «Записаться». Если записаться самостоятельно не получается, пришлите на{" "}
            <a href="mailto:mail@tumtipb.ru" className={a}>
              mail@tumtipb.ru
            </a>{" "}
            карточку вашей организации с ФИО (полностью) и должностью участников, темой, датой и городом
            мероприятия — подготовим комплект документов и отправим ответным письмом.
          </>
        ),
      },
      {
        q: "Как получить договор, счёт и акт?",
        a: (
          <>
            Документы формируются при оформлении заявки. Оформленные со своей стороны договор и акт
            принесите на занятие в одном экземпляре — оригиналы с нашей стороны вы получите у наших
            представителей или заказным письмом. Шаблоны договоров — в разделе{" "}
            <Link href="/about/documents#contracts" className={a}>
              «Документы»
            </Link>
            , подробная{" "}
            <a href={`${OLD}shag_18.doc`} target="_blank" rel="noopener noreferrer" className={a}>
              инструкция по оформлению договора, акта и счёта
            </a>
            .
          </>
        ),
      },
      {
        q: "Как оплатить обучение?",
        a: (
          <>
            По заявке выставим счёт на организацию или направим квитанцию для оплаты физическим лицом. Семинары
            и вебинары можно оплатить по{" "}
            <a href={`${OLD}QR%20DNT.pdf`} target="_blank" rel="noopener noreferrer" className={a}>
              QR-коду АНО ДПО ТМУЦ «Дом науки и техники»
            </a>
            .
          </>
        ),
      },
      {
        q: "Есть ли скидки?",
        a: (
          <>
            Да, в центре действует гибкая система скидок — условия для вашей заявки уточните у менеджера.
            Студентам при подготовке к аттестации профессиональных бухгалтеров — скидка до 50% по справке из
            вуза.
          </>
        ),
      },
    ],
  },
  {
    id: "learning",
    title: "Обучение",
    items: [
      {
        q: "В каких форматах проходит обучение?",
        a: (
          <>
            Очно в Тюмени (ул. Максима Горького, 59/3), очно-заочно и дистанционно с применением дистанционных
            образовательных технологий. Вебинары проходят на платформах mts-link.ru и online.tumtipb.ru.
          </>
        ),
      },
      {
        q: "Где найти презентацию и материалы вебинара?",
        a: (
          <>
            Презентации и авторский методический материал семинара (вебинара) размещаются в вашем личном
            кабинете. Если не нашли их — напишите нам, поможем.
          </>
        ),
      },
      {
        q: "Можно ли обучить группу сотрудников?",
        a: (
          <>
            Да — закажите{" "}
            <Link href="/corporate" className={a}>
              корпоративное обучение
            </Link>
            : программу адаптируем под задачи компании, проведём на вашей площадке, у нас или дистанционно.
          </>
        ),
      },
      {
        q: "Есть ли обучение для людей с ограниченными возможностями здоровья?",
        a: (
          <>
            Да, с использованием дистанционных образовательных технологий: условий беспрепятственного доступа
            в здание учебного центра нет.
          </>
        ),
      },
    ],
  },
  {
    id: "documents",
    title: "Документы об обучении",
    items: [
      {
        q: "Какой документ я получу?",
        a: (
          <>
            Зависит от программы: удостоверение о повышении квалификации, диплом о профессиональной
            переподготовке, сертификат о прослушивании семинара, удостоверение о проверке знаний требований
            охраны труда и другие. Образцы — в разделе{" "}
            <Link href="/about/documents#samples" className={a}>
              «Образцы выдаваемых документов»
            </Link>
            .
          </>
        ),
      },
      {
        q: "Как проверить подлинность документа?",
        a: (
          <>
            Сведения о документах вносятся в федеральный реестр (ФРДО). Как найти документ на сайте
            Рособрнадзора —{" "}
            <a href={`${OLD}Instrukciya%20FRDO.doc`} target="_blank" rel="noopener noreferrer" className={a}>
              в инструкции
            </a>
            .
          </>
        ),
      },
      {
        q: "У центра есть лицензия?",
        a: (
          <>
            Да — лицензия на осуществление образовательной деятельности № 163 от 15.07.2016. Все сведения — в
            разделе{" "}
            <Link href="/disclosure" className={a}>
              «Сведения об образовательной организации»
            </Link>
            .
          </>
        ),
      },
    ],
  },
  {
    id: "attestation",
    title: "Аттестация бухгалтеров",
    items: [
      {
        q: "Как получить аттестат профессионального бухгалтера ИПБ России?",
        a: (
          <>
            Пройти подготовку и двухэтапный экзамен — очно в Тюмени или дистанционно. Требования, этапы и
            документы — на странице{" "}
            <Link href="/attestation" className={a}>
              «Аттестация»
            </Link>
            .
          </>
        ),
      },
      {
        q: "Нужно ли подавать заявление на продление аттестата?",
        a: (
          <>
            Нет. Аттестат на новый срок выдаётся без заявления, если вы ежегодно платите членские взносы и
            повышаете квалификацию не менее 40 часов в год.{" "}
            <Link href="/attestation/renewal" className={a}>
              Подробнее о продлении
            </Link>
            .
          </>
        ),
      },
    ],
  },
  {
    id: "contacts",
    title: "Связь с центром",
    items: [
      {
        q: "Когда вы работаете?",
        a: <>Понедельник — пятница, с 9:00 до 18:00, перерыв на обед с 13:00 до 14:00. Суббота и воскресенье — выходные.</>,
      },
      {
        q: "Как с вами связаться?",
        a: (
          <>
            Позвоните по бесплатному номеру{" "}
            <a href="tel:88002504191" className="tabular font-semibold whitespace-nowrap text-ink hover:text-blue">
              8 800 250-41-91
            </a>{" "}
            или{" "}
            <a href="tel:+73452515050" className="tabular font-semibold whitespace-nowrap text-ink hover:text-blue">
              +7 (3452) 51-50-50
            </a>
            , напишите на{" "}
            <a href="mailto:mail@tumtipb.ru" className={a}>
              mail@tumtipb.ru
            </a>{" "}
            или приходите: г. Тюмень, ул. Максима Горького, 59/3.
          </>
        ),
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Вопросы и ответы" }]} />

      <main id="main" className="flex-1">
        <section className="bg-hero-band">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
            <p className="text-xs font-semibold tracking-[0.12em] text-blue uppercase">Помощь</p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">Вопросы и ответы</h1>
            <p className="mt-4 max-w-[62ch] text-[1.05rem] leading-relaxed text-body">
              Как записаться, оплатить обучение, получить документы и пройти аттестацию.
            </p>
            <nav aria-label="Темы вопросов" className="mt-7 flex flex-wrap gap-2">
              {groups.map((g) => (
                <a
                  key={g.id}
                  href={`#${g.id}`}
                  className="rounded-full bg-surface px-4 py-2 text-sm font-medium text-ink ring-1 ring-inset ring-border transition-colors hover:text-blue hover:ring-blue"
                >
                  {g.title}
                </a>
              ))}
            </nav>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:px-10">
          <div className="flex flex-col gap-12">
            {groups.map((g) => (
              <section key={g.id} id={g.id} className="scroll-mt-28">
                <h2 className="text-2xl font-extrabold text-ink">{g.title}</h2>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {g.items.map((item, i) => (
                    <li key={item.q}>
                      <Reveal subtle delayMs={Math.min(i, 4) * 60}>
                        <details name="faq" className="faq-item group rounded-2xl border border-border bg-surface transition-colors open:border-blue/40 open:shadow-[0_10px_30px_-18px_rgba(30,99,221,0.35)]">
                          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-ink transition-colors hover:text-blue [&::-webkit-details-marker]:hidden">
                            {item.q}
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-tint text-blue transition-transform group-open:rotate-180">
                              <IconChevronDown className="h-4 w-4" />
                            </span>
                          </summary>
                          <div className="faq-answer px-5 pb-5 text-[0.95rem] leading-relaxed text-body">{item.a}</div>
                        </details>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <aside>
            <div className="sticky top-28 rounded-[1.75rem] border border-[#E4ECF8] bg-gradient-to-br from-[#FAFCFF] to-[#F2F7FE] p-6 shadow-[0_18px_50px_-24px_rgba(30,99,221,0.18)]">
              <h2 className="text-lg font-extrabold text-ink">Не нашли ответ?</h2>
              <p className="mt-2 text-sm leading-relaxed text-body">
                Напишите нам или позвоните — ответим в рабочее время.
              </p>
              <ContactButton className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue px-5 text-sm font-semibold text-white transition-colors hover:bg-blue-dark">
                <IconChat className="h-4 w-4" />
                Задать вопрос
              </ContactButton>
              <a
                href="tel:88002504191"
                className="mt-4 flex items-center justify-center gap-2 text-base font-bold text-ink hover:text-blue"
              >
                <IconPhone className="h-4 w-4 text-blue" />
                <span className="tabular">8 800 250-41-91</span>
              </a>
              <p className="mt-1 text-center text-xs text-muted">Звонок по России бесплатный</p>
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
