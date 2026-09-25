import Link from "next/link";
import { HeroPhoto } from "@/components/hero-photo";
import {
  IconArrowRight,
  IconFile,
  IconGraduationCap,
  IconMonitor,
  IconTrendUp,
  IconUsers,
} from "@/components/icons";

const trustPoints = [
  { icon: IconGraduationCap, title: "Более 25 лет", subtitle: "на рынке образования" },
  { icon: IconUsers, title: "Сотни актуальных", subtitle: "программ ежегодно" },
  { icon: IconTrendUp, title: "Доверяют специалисты", subtitle: "по всей России" },
  { icon: IconFile, title: "Лицензия", subtitle: "на образовательную деятельность" },
];

/* Карточка поверх фото: полупрозрачный белый со слабым размытием, как в референсе. */
const glassCard =
  "absolute rounded-2xl border border-white/70 shadow-[0_10px_30px_rgba(16,24,40,0.12)] backdrop-blur-sm";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-hero-band">
      {/* мягкий голубой отсвет справа сверху, чтобы фон не был плоским */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_90%_at_88%_10%,rgba(29,111,224,0.12),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-12 lg:px-10 lg:pb-28 lg:pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-14">
          <div>
            <p className="text-xs font-semibold tracking-[0.12em] text-blue uppercase">
              Повышение квалификации и профессиональное обучение
            </p>
            <h1 className="mt-4 max-w-[17ch] text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.6rem]">
              Знания сегодня — ваш уверенный завтра
            </h1>
            <p className="mt-6 max-w-[56ch] text-[1.05rem] leading-relaxed text-body lg:text-[1.1rem]">
              Семинары, курсы и вебинары для бухгалтеров, кадровиков, юристов, руководителей
              и всех, кто развивает профессиональные компетенции.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/schedule"
                className="flex h-12 items-center gap-2.5 rounded-lg bg-blue px-7 text-[0.95rem] font-medium text-white transition-colors hover:bg-blue-dark"
              >
                Выбрать программу
                <IconArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/corporate"
                className="flex h-12 items-center rounded-lg border border-blue/60 bg-surface/70 px-7 text-[0.95rem] font-medium text-blue transition-colors hover:border-blue hover:bg-blue-tint"
              >
                Корпоративное обучение
              </Link>
            </div>

            <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 2xl:grid-cols-4 2xl:gap-x-0 2xl:divide-x 2xl:divide-border">
              {trustPoints.map(({ icon: Icon, title, subtitle }) => (
                <li key={title} className="flex items-center gap-3 2xl:px-4 2xl:first:pl-0 2xl:last:pr-0">
                  <Icon className="h-8 w-8 shrink-0 text-blue" />
                  <span className="text-sm leading-snug">
                    <span className="block font-semibold text-ink">{title}</span>
                    <span className="text-body">{subtitle}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Фотопанель: квадратный кадр из широкого снимка, человек — в правой части кадра. */}
          <div className="relative mx-auto aspect-square w-full max-w-[34rem] lg:max-w-none">
            <HeroPhoto className="rounded-3xl" />

            <div className={`${glassCard} -left-2 top-[22%] flex max-w-[14rem] items-center gap-3 bg-white/85 p-4 sm:-left-6 sm:top-1/2 sm:-translate-y-1/2`}>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-tint text-blue">
                <IconMonitor className="h-5 w-5" />
              </span>
              <span className="text-sm leading-snug">
                <span className="block text-base font-bold text-ink">Онлайн и очно</span>
                <span className="text-body">Удобный формат для вас</span>
              </span>
            </div>

            <p
              aria-hidden="true"
              className="absolute left-6 top-6 z-10 hidden max-w-[11rem] -rotate-3 text-left text-[0.95rem] font-semibold italic leading-snug text-blue-dark [text-shadow:0_0_10px_rgba(255,255,255,0.95),0_0_3px_rgba(255,255,255,0.9)] sm:block"
            >
              Инвестиции в&nbsp;профессиональный рост
              <svg viewBox="0 0 120 8" className="mt-1 h-2 w-24 text-blue" aria-hidden="true">
                <path d="M2 5c20-4 40-4 60-1s40 1 56-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </p>

            <div className={`${glassCard} bottom-3 right-3 flex min-h-[10rem] min-w-[12rem] flex-col justify-center bg-white p-5 sm:min-h-[12.5rem] sm:min-w-[17rem] sm:p-6`}>
              <span className="block text-sm text-body">Более</span>
              <span className="tabular block text-[2.4rem] font-extrabold leading-none text-ink">25 лет</span>
              <span className="mt-1.5 block text-sm leading-snug text-body">
                развиваем
                <br />
                профессионалов
              </span>
              <span aria-hidden="true" className="mt-3 block h-0.5 w-8 rounded-full bg-blue" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
