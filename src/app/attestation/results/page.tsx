import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactButton } from "@/components/contact-dialog";
import { Reveal } from "@/components/reveal";
import {
  IconArrowRight,
  IconBuilding,
  IconCertificate,
  IconChat,
  IconCheck,
  IconExternal,
  IconLaptop,
  IconMail,
  IconPhone,
  IconRefresh,
  IconSearch,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Результаты аттестации — Дом науки и техники",
  description:
    "Где узнать результаты аттестации профессиональных бухгалтеров: Единый реестр ИПБ России, этапы экзамена, контакты.",
};

/* Старый сайт (tumtipb.ru/content/68) вёл на Единый реестр ИПБ России. Состав сведений в реестре —
   со страницы ИПБ «Аттестат на новый срок», этапы экзамена — со страницы дистанционной аттестации. */

const REGISTRY_URL = "https://www.ipbr.org/registry/";

const registryData = ["Вид аттестата", "Номер", "Дата выдачи", "Срок действия"];

const stages = [
  {
    icon: IconLaptop,
    title: "Первый этап",
    text: "Проходит онлайн в системе электронного тестирования ИПБ России — результат вы видите там же, по индивидуальному паролю.",
  },
  {
    icon: IconBuilding,
    title: "Второй этап",
    text: "Проходит в территориальном институте профессиональных бухгалтеров. После двух этапов выдаются аттестат и членский билет, а запись об аттестате появляется в реестре.",
  },
];

export default function ResultsPage() {
  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Аттестация", href: "/attestation" },
          { label: "Результаты аттестации" },
        ]}
      />

      <main id="main" className="flex-1">
        <section className="bg-hero-band">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
            <p className="text-xs font-semibold tracking-[0.12em] text-blue uppercase">Аттестация ИПБ России</p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">Результаты аттестации</h1>
            <p className="mt-4 max-w-[64ch] text-[1.05rem] leading-relaxed text-body">
              Сведения о выданных аттестатах профессиональных бухгалтеров публикует Институт профессиональных
              бухгалтеров и аудиторов России — в Едином реестре членов ИПБ России.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-14 lg:px-10">
          <Reveal className="grid gap-8 rounded-[1.75rem] border border-[#E4ECF8] bg-gradient-to-br from-[#FAFCFF] to-[#F2F7FE] p-6 shadow-[0_18px_50px_-24px_rgba(30,99,221,0.18)] sm:p-8 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-10 lg:p-10">
            <span className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-[#E8F0FD] text-blue">
              <IconSearch className="h-10 w-10" />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-ink sm:text-2xl">
                Единый реестр профессиональных бухгалтеров — членов ИПБ России
              </h2>
              <p className="mt-2 text-[0.95rem] text-body">По каждому аттестату в реестре указаны:</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {registryData.map((d) => (
                  <li
                    key={d}
                    className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-sm font-medium text-ink ring-1 ring-inset ring-border"
                  >
                    <IconCheck className="h-3.5 w-3.5 text-blue" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={REGISTRY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue px-6 text-sm font-semibold whitespace-nowrap text-white shadow-[0_8px_18px_-8px_rgba(30,99,221,0.6)] transition-colors hover:bg-blue-dark"
            >
              Открыть реестр
              <IconExternal className="h-4 w-4" />
            </a>
          </Reveal>
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-14 lg:px-10">
          <h2 className="text-2xl font-extrabold text-ink">Где узнать результат экзамена</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {stages.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delayMs={i * 90} className="h-full">
                <article className="flex h-full gap-4 rounded-2xl border border-border bg-surface p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-tint text-blue">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-ink">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-body">{text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <h2 className="text-xl font-extrabold text-ink">Не нашли себя в реестре?</h2>
              <p className="mt-2 text-sm leading-relaxed text-body">
                Напишите или позвоните — проверим статус вашей аттестации.
              </p>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm">
                <li className="flex flex-wrap items-center gap-2.5">
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
                </li>
              </ul>
              <ContactButton
                topic="Результаты аттестации"
                className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl border border-[#D5DFEE] bg-surface px-5 text-sm font-semibold text-ink transition-colors hover:border-blue hover:text-blue"
              >
                <IconChat className="h-4 w-4" />
                Задать вопрос
              </ContactButton>
            </div>
            <ul className="grid gap-2.5">
              {[
                { href: "/attestation", title: "Всё об аттестации", icon: IconCertificate },
                { href: "/attestation/renewal", title: "Продлить аттестат", icon: IconRefresh },
              ].map(({ href, title, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex h-full items-center gap-3 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-blue"
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
