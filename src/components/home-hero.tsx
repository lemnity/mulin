import Link from "next/link";
import { HeroPhoto } from "@/components/hero-photo";
import { IconArrowRight, IconCalendar, IconCertificate, IconMonitor, IconUsers } from "@/components/icons";

const trustPoints = [
  { icon: IconCertificate, title: "Более 25 лет", subtitle: "на рынке образования" },
  { icon: IconCalendar, title: "Сотни актуальных", subtitle: "программ ежегодно" },
  { icon: IconUsers, title: "Доверяют специалисты", subtitle: "по всей России" },
];

export function HomeHero() {
  return (
    <section className="bg-hero-band">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <p className="text-xs font-semibold tracking-wide text-blue uppercase">
              Повышение квалификации и профессиональное обучение
            </p>
            <h1 className="mt-3 max-w-[16ch] text-4xl font-extrabold leading-[1.1] text-ink sm:text-5xl">
              Знания сегодня — ваш уверенный завтра
            </h1>
            <p className="mt-5 max-w-[54ch] text-[1.05rem] leading-relaxed text-body">
              Семинары, курсы и вебинары для бухгалтеров, кадровиков, юристов, руководителей и
              всех, кто развивает профессиональные компетенции.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/schedule"
                className="flex items-center gap-2 rounded-lg bg-blue px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-dark"
              >
                Выбрать программу
                <IconArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/corporate"
                className="flex items-center gap-2 rounded-lg border border-border bg-surface px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-blue hover:text-blue"
              >
                Корпоративное обучение
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-8 gap-y-4">
              {trustPoints.map(({ icon: Icon, title, subtitle }) => (
                <div key={title} className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-tint text-blue">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="text-sm leading-snug">
                    <span className="block font-semibold text-ink">{title}</span>
                    <span className="text-muted">{subtitle}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <HeroPhoto />
            <div className="absolute -bottom-5 -right-4 flex max-w-[13rem] items-center gap-3 rounded-xl border border-border bg-surface p-3.5 shadow-lg sm:-right-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-tint text-blue">
                <IconMonitor className="h-5 w-5" />
              </span>
              <span className="text-sm leading-snug">
                <span className="block font-semibold text-ink">Онлайн и очно</span>
                <span className="text-muted">Удобный формат для вас</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
