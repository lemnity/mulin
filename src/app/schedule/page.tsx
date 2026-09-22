import { Suspense } from "react";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroPhoto } from "@/components/hero-photo";
import { HeroSearch } from "@/components/hero-search";
import { ScheduleExplorer } from "@/components/schedule-explorer";
import { NewsletterBand } from "@/components/newsletter-band";

export const metadata: Metadata = {
  title: "Программы и расписание — Дом науки и техники",
  description:
    "Семинары, курсы и вебинары повышения квалификации для бухгалтерии, кадровой службы, юристов и руководителей.",
};

export default function SchedulePage() {
  return (
    <>
      <SiteHeader />

      <main id="main" className="flex-1">
        <section className="bg-hero-band">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
              <div>
                <p className="text-xs font-semibold tracking-wide text-blue uppercase">
                  Повышение квалификации
                </p>
                <h1 className="mt-3 max-w-[18ch] text-4xl font-extrabold leading-[1.1] text-ink sm:text-5xl">
                  Программы и расписание
                </h1>
                <p className="mt-5 max-w-[54ch] text-[1.05rem] leading-relaxed text-body">
                  Семинары, курсы и вебинары для специалистов бухгалтерии, кадровой службы,
                  юристов, руководителей и всех, кто развивает профессиональные компетенции.
                </p>
                <Suspense>
                  <HeroSearch />
                </Suspense>
              </div>
              <HeroPhoto />
            </div>
          </div>
        </section>

        <section id="programs" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-12 lg:px-10">
          <Suspense>
            <ScheduleExplorer />
          </Suspense>
          <NewsletterBand />
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
