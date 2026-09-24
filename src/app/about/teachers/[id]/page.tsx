import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { IconArrowRight, IconCalendar, IconPhone } from "@/components/icons";
import { LecturerAvatar, ProgramRow } from "@/components/lecturer-parts";
import { getLecturerById, lecturers } from "@/lib/lecturers";

export function generateStaticParams() {
  return lecturers.map((l) => ({ id: l.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const l = getLecturerById(id);
  if (!l) return { title: "Преподаватель — Дом науки и техники" };
  return {
    title: `${l.name} — преподаватель Дома науки и техники`,
    description: l.bio.slice(0, 160),
  };
}

export default async function LecturerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const l = getLecturerById(id);
  if (!l) notFound();

  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "О центре", href: "/about" },
          { label: "Преподаватели", href: "/about/teachers" },
          { label: l.name },
        ]}
      />

      <main id="main" className="flex-1">
        <section className="bg-hero-band">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 sm:flex-row sm:gap-8 lg:px-10 lg:py-16">
            <LecturerAvatar lecturer={l} className="w-36 shrink-0 sm:w-44" />
            <div className="min-w-0">
              <p className="text-xs font-semibold tracking-[0.12em] text-blue uppercase">Преподаватель</p>
              <h1 className="mt-2 text-2xl font-extrabold leading-tight text-ink sm:text-3xl">{l.name}</h1>
              <p className="mt-4 max-w-[70ch] text-[1.02rem] leading-relaxed text-body">{l.bio}</p>
              {l.programs.length > 0 && (
                <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-medium text-ink ring-1 ring-inset ring-border">
                  <IconCalendar className="h-4 w-4 text-blue" />
                  Ближайших семинаров:{" "}
                  <span className="tabular font-bold text-blue">{l.programs.length}</span>
                </span>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-12">
          {l.programs.length > 0 ? (
            <>
              <h2 className="text-xl font-bold text-ink">Семинары и вебинары</h2>
              <p className="mt-1 text-sm text-body">Выберите программу и запишитесь на удобную дату.</p>
              <ul className="mx-auto mt-6 flex max-w-3xl flex-col gap-2.5">
                {l.programs.map((p) => (
                  <ProgramRow key={p.id} p={p} />
                ))}
              </ul>
            </>
          ) : (
            <div className="rounded-xl border border-dashed border-border p-8 text-center">
              <p className="font-semibold text-ink">Нет ближайших семинаров</p>
              <p className="mx-auto mt-2 max-w-[48ch] text-sm text-muted">
                Подпишитесь на канал в ВКонтакте или MAX, чтобы не пропустить новую дату, либо
                уточните у оператора.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="tel:88002504191"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-dark"
                >
                  <IconPhone className="h-4 w-4" />
                  Уточнить у оператора
                </a>
                <Link
                  href="/schedule#programs"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-blue hover:text-blue"
                >
                  Всё расписание
                  <IconArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}

          <div className="mt-8">
            <Link
              href="/about/teachers"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-blue hover:text-blue-dark"
            >
              ← Все преподаватели
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
