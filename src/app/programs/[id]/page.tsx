import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProgramHero } from "@/components/program-hero";
import { ProgramTabs } from "@/components/program-tabs";
import { AudienceBox } from "@/components/audience-box";
import { AgendaList } from "@/components/agenda-list";
import { SpeakerCard } from "@/components/speaker-card";
import { DocumentItem } from "@/components/document-item";
import { RelatedPrograms } from "@/components/related-programs";
import { ParticipationSidebar } from "@/components/participation-sidebar";
import { SectionHeading } from "@/components/section-heading";
import { programs, getProgramById, getRelatedPrograms, typePlural } from "@/lib/programs";
import { getProgramDetail } from "@/lib/program-details";
import { IconFile, IconTarget, IconUser, IconCalendar } from "@/components/icons";

export function generateStaticParams() {
  return programs.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const program = getProgramById(id);
  if (!program) return {};
  return {
    title: `${program.title} — Дом науки и техники`,
    description: program.description,
  };
}

export default async function ProgramPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const program = getProgramById(id);
  if (!program) notFound();

  const detail = getProgramDetail(program);
  const related = getRelatedPrograms(program);

  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Расписание", href: "/#programs" },
          { label: typePlural[program.type], href: "/#programs" },
          { label: program.title },
        ]}
      />

      <main className="flex-1">
        <ProgramHero program={program} detail={detail} />
        <ProgramTabs />

        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-14">
            <div className="flex flex-col gap-10">
              <section id="about" className="scroll-mt-32">
                <SectionHeading icon={<IconFile className="h-5 w-5" />}>О программе</SectionHeading>
                <div className="mt-4 flex flex-col gap-4 text-[0.95rem] leading-relaxed text-body">
                  {detail.aboutParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="mt-5">
                  <AudienceBox items={detail.audience} />
                </div>
              </section>

              <section id="agenda" className="scroll-mt-32">
                <SectionHeading icon={<IconCalendar className="h-5 w-5" />}>Программа</SectionHeading>
                <div className="mt-4">
                  <AgendaList items={detail.agenda} />
                </div>
              </section>

              <section id="speaker" className="scroll-mt-32">
                <div className="flex items-center justify-between">
                  <SectionHeading icon={<IconUser className="h-5 w-5" />}>Лектор</SectionHeading>
                  <a
                    href="#"
                    className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-blue hover:text-blue"
                  >
                    Все преподаватели
                  </a>
                </div>
                <div className="mt-4">
                  <SpeakerCard name={program.speaker} bio={detail.speakerBio} photo={detail.speakerPhoto} />
                </div>
              </section>

              <section id="documents" className="scroll-mt-32">
                <SectionHeading icon={<IconFile className="h-5 w-5" />}>Документы</SectionHeading>
                <div className="mt-4">
                  <DocumentItem name={detail.documentName} size={detail.documentSize} />
                </div>
              </section>

              <section id="reviews" className="scroll-mt-32">
                <SectionHeading icon={<IconTarget className="h-5 w-5" />}>Отзывы</SectionHeading>
                <div className="mt-4 rounded-xl border border-dashed border-border py-10 text-center">
                  <p className="text-ink">Отзывов пока нет.</p>
                  <p className="mt-1 text-sm text-muted">
                    Пройдите программу и поделитесь впечатлениями — вашим отзывом откроем этот раздел.
                  </p>
                </div>
              </section>

              {related.length > 0 && (
                <section aria-label="Похожие мероприятия">
                  <div className="flex items-center justify-between">
                    <SectionHeading icon={<IconCalendar className="h-5 w-5" />}>
                      Похожие мероприятия
                    </SectionHeading>
                    <Link
                      href="/#programs"
                      className="text-sm font-medium text-blue hover:text-blue-dark"
                    >
                      Перейти к расписанию →
                    </Link>
                  </div>
                  <div className="mt-4">
                    <RelatedPrograms items={related} />
                  </div>
                </section>
              )}
            </div>

            <ParticipationSidebar program={program} detail={detail} />
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
