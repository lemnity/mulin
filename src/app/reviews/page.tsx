import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactButton } from "@/components/contact-dialog";
import { Reveal } from "@/components/reveal";
import { ReviewCard } from "@/components/review-card";
import { IconChat, IconExternal } from "@/components/icons";
import { reviews } from "@/lib/reviews";
import { assetPath } from "@/lib/asset-path";

export const metadata: Metadata = {
  title: "Отзывы — Дом науки и техники",
  description: "Отзывы слушателей семинаров, вебинаров и курсов учебного центра «Дом науки и техники».",
};

/** Карточки центра на внешних сервисах (найдены 2026-09-26). Яндекс — официальный виджет отзывов;
    логотипы остальных — иконки с их сайтов, в public/brands. */
const externalReviews = {
  yandex: "https://yandex.ru/maps/org/dom_nauki_i_tekhniki/1062104459/reviews/",
  yandexWidget: "https://yandex.ru/maps-reviews-widget/1062104459?comments",
  others: [
    { name: "2ГИС", note: "Карточка учебного центра в 2ГИС", logo: "/brands/2gis.png", url: "https://2gis.ru/tyumen/firm/1830115629608069/tab/reviews" },
    { name: "Флэмп", note: "Отзывы жителей Тюмени", logo: "/brands/flamp.png", url: "https://tyumen.flamp.ru/firm/dom_nauki_i_tekhniki_uchebnyjj_centr-1830115629608069" },
    { name: "Zoon", note: "Отзывы, фото и цены", logo: "/brands/zoon.svg", wordmark: true, url: "https://zoon.ru/tyumen/trainings/uchebnyj_tsentr_dom_nauki_i_tehniki_na_ulitse_maksima_gorkogo/" },
  ],
};

export default function ReviewsPage() {
  const firstYear = reviews.reduce((y, r) => Math.min(y, Number(r.date.slice(0, 4))), 9999);

  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "О центре", href: "/about" },
          { label: "Отзывы" },
        ]}
      />

      <main id="main" className="flex-1">
        <section className="bg-hero-band">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:py-16">
            <div>
              <p className="text-xs font-semibold tracking-[0.12em] text-blue uppercase">О центре</p>
              <h1 className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">Отзывы</h1>
              <p className="mt-4 max-w-[62ch] text-[1.05rem] leading-relaxed text-body">
                Что говорят слушатели семинаров, вебинаров и курсов центра — {reviews.length} отзывов с{" "}
                {firstYear} года. Ваши отзывы помогают нам держать уровень, а будущим слушателям — сделать выбор.
              </p>
            </div>
            <ContactButton
              topic="Отзыв об обучении"
              className="inline-flex h-12 shrink-0 items-center gap-2 self-start rounded-xl bg-blue px-6 text-sm font-semibold text-white transition-colors hover:bg-blue-dark lg:self-auto"
            >
              <IconChat className="h-4 w-4" />
              Оставить отзыв
            </ContactButton>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
          <ul className="columns-1 gap-4 md:columns-2 xl:columns-3">
            {reviews.map((r, i) => (
              <li key={r.id} className="mb-4 break-inside-avoid">
                <Reveal subtle delayMs={(i % 3) * 70}>
                  <ReviewCard review={r} />
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-14 lg:px-10">
          <h2 className="text-2xl font-extrabold text-ink">Отзывы на других сервисах</h2>
          <p className="mt-2 max-w-[62ch] text-[0.95rem] leading-relaxed text-body">
            Независимые отзывы о центре на картах и в справочниках — там же можно оставить свой.
          </p>
          <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
            <Reveal subtle className="overflow-hidden rounded-2xl border border-border bg-surface">
              <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3.5">
                <span className="flex items-center gap-2.5 font-semibold text-ink">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FC3F1D] text-sm font-bold text-white">
                    Я
                  </span>
                  Яндекс Карты
                </span>
                <a
                  href={externalReviews.yandex}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-blue hover:text-blue-dark"
                >
                  Все отзывы
                  <IconExternal className="h-3.5 w-3.5" />
                </a>
              </div>
              <iframe
                src={externalReviews.yandexWidget}
                title="Отзывы о «Доме науки и техники» на Яндекс Картах"
                loading="lazy"
                className="block h-[640px] w-full border-0"
              />
            </Reveal>

            <ul className="flex flex-col gap-3">
              {externalReviews.others.map((s, i) => (
                <li key={s.name}>
                  <Reveal subtle delayMs={(i + 1) * 70}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-blue"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element -- статичный логотип сервиса */}
                      <img
                        src={assetPath(s.logo)}
                        alt=""
                        width={48}
                        height={48}
                        className={`h-12 w-12 shrink-0 rounded-xl ${
                          "wordmark" in s && s.wordmark
                            ? "bg-surface object-contain p-1.5 ring-1 ring-inset ring-border"
                            : "object-cover"
                        }`}
                      />
                      <span className="flex-1">
                        <span className="block font-semibold text-ink group-hover:text-blue">{s.name}</span>
                        <span className="block text-sm text-body">{s.note}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium whitespace-nowrap text-blue">
                        Читать отзывы
                        <IconExternal className="h-3.5 w-3.5" />
                      </span>
                    </a>
                  </Reveal>
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
