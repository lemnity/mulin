import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { IconArrowRight, IconCalendar, IconPhone } from "@/components/icons";
import { LecturerAvatar, ProgramRow } from "@/components/lecturer-parts";
import { Reveal } from "@/components/reveal";
import { lecturers, type Lecturer } from "@/lib/lecturers";

export const metadata: Metadata = {
  title: "Преподаватели — Дом науки и техники",
  description:
    "Практикующие эксперты — аудиторы, юристы, налоговые консультанты, представители госорганов — которые ведут семинары и вебинары центра. Расписание и запись.",
};

const PREVIEW = 3;

function LecturerCard({ l }: { l: Lecturer }) {
  const preview = l.programs.slice(0, PREVIEW);
  const rest = l.programs.length - preview.length;

  return (
    <article className="flex flex-col gap-5 rounded-2xl border border-border bg-surface p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:flex-row sm:gap-6 sm:p-6">
      <div className="flex gap-4 sm:w-64 sm:shrink-0 sm:flex-col sm:gap-4">
        <Link href={`/about/teachers/${l.id}`} className="shrink-0">
          <LecturerAvatar lecturer={l} className="w-28 sm:w-40" />
        </Link>
        <div className="min-w-0">
          <h2 className="text-base font-bold leading-snug text-ink">
            <Link href={`/about/teachers/${l.id}`} className="hover:text-blue">
              {l.name}
            </Link>
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-body">{l.bio}</p>
        </div>
      </div>

      <div className="min-w-0 flex-1 sm:border-l sm:border-border sm:pl-6">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
          <IconCalendar className="h-4 w-4 text-blue" />
          Ближайшие семинары
          <span className="tabular rounded-full bg-blue-tint px-2 py-0.5 text-[0.7rem] font-semibold text-blue">
            {l.programs.length}
          </span>
        </p>
        <ul className="mt-3 flex flex-col gap-2">
          {preview.map((p) => (
            <ProgramRow key={p.id} p={p} />
          ))}
        </ul>
        {rest > 0 && (
          <Link
            href={`/about/teachers/${l.id}`}
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-blue transition-colors hover:border-blue hover:bg-blue-tint"
          >
            Посмотреть все семинары ({l.programs.length})
            <IconArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </article>
  );
}

/** Компактная карточка преподавателя без ближайших семинаров — для сетки. */
function CompactLecturerCard({ l }: { l: Lecturer }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-colors hover:border-blue/40">
      <div className="flex flex-1 items-start gap-4">
        <Link href={`/about/teachers/${l.id}`} className="shrink-0">
          <LecturerAvatar lecturer={l} className="w-20" />
        </Link>
        <div className="min-w-0">
          <h3 className="text-[0.95rem] font-bold leading-snug text-ink">
            <Link href={`/about/teachers/${l.id}`} className="hover:text-blue">
              {l.name}
            </Link>
          </h3>
          <p className="mt-1.5 line-clamp-4 text-sm leading-relaxed text-body">{l.bio}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
          <IconCalendar className="h-3.5 w-3.5" />
          Даты уточняются
        </span>
        <div className="flex items-center gap-1">
          <a
            href="tel:88002504191"
            aria-label={`Позвонить и уточнить даты: ${l.name}`}
            title="Уточнить у оператора"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-blue transition-colors hover:bg-blue-tint"
          >
            <IconPhone className="h-4 w-4" />
          </a>
          <Link
            href={`/about/teachers/${l.id}`}
            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-sm font-medium text-blue transition-colors hover:bg-blue-tint"
          >
            Подробнее
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function TeachersPage() {
  const active = lecturers.filter((l) => l.programs.length > 0);
  const idle = lecturers.filter((l) => l.programs.length === 0);
  const withPrograms = active.length;
  const openSeminars = lecturers.reduce((n, l) => n + l.programs.length, 0);

  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "О центре", href: "/about" },
          { label: "Преподаватели" },
        ]}
      />

      <main id="main" className="flex-1">
        <section className="bg-hero-band">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
            <p className="text-xs font-semibold tracking-[0.12em] text-blue uppercase">О центре</p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">Преподаватели</h1>
            <p className="mt-4 max-w-[64ch] text-[1.05rem] leading-relaxed text-body">
              Наши программы ведут практикующие эксперты: аудиторы, налоговые консультанты, юристы,
              специалисты по кадрам и представители государственных органов.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5 text-sm">
              <span className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 font-medium text-ink ring-1 ring-inset ring-border">
                Преподавателей: <span className="tabular font-bold text-blue">{lecturers.length}</span>
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 font-medium text-ink ring-1 ring-inset ring-border">
                Ведут ближайшие семинары: <span className="tabular font-bold text-blue">{withPrograms}</span>
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 font-medium text-ink ring-1 ring-inset ring-border">
                Открыто записей: <span className="tabular font-bold text-blue">{openSeminars}</span>
              </span>
            </div>
          </div>
        </section>

        {active.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 pt-12 lg:px-10">
            <div className="flex flex-col gap-5">
              {active.map((l, i) => (
                <Reveal key={l.id} delayMs={(i % 3) * 90}>
                  <LecturerCard l={l} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {idle.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 pt-14 pb-12 lg:px-10">
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
              <div>
                <h2 className="text-2xl font-extrabold text-ink">Другие преподаватели</h2>
                <p className="mt-2 max-w-[64ch] text-sm leading-relaxed text-body">
                  Сейчас нет открытых записей. Чтобы не пропустить новые даты, подпишитесь на канал
                  в ВКонтакте или MAX либо уточните у оператора:{" "}
                  <a href="tel:88002504191" className="tabular font-semibold whitespace-nowrap text-blue hover:text-blue-dark">
                    8 800 250-41-91
                  </a>
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {idle.map((l, i) => (
                <Reveal key={l.id} delayMs={(i % 3) * 90} className="h-full">
                  <CompactLecturerCard l={l} />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </>
  );
}
