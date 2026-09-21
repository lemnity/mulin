import Image from "next/image";
import { weekdayFull, type Program } from "@/lib/programs";
import type { ProgramDetail } from "@/lib/program-details";
import { IconCalendar, IconCertificate, IconClock, IconMonitor, IconPin } from "@/components/icons";

const typeBadge: Record<Program["type"], string> = {
  Вебинар: "bg-blue-tint text-blue",
  Семинар: "bg-green-tint text-green-text",
  Курс: "bg-amber-tint text-amber-text",
};

export function ProgramHero({ program, detail }: { program: Program; detail: ProgramDetail }) {
  return (
    <section className="bg-hero-band">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
          <div>
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${typeBadge[program.type]}`}
            >
              {program.type}
            </span>
            <h1 className="mt-4 max-w-[26ch] text-3xl font-extrabold leading-[1.15] text-ink sm:text-4xl">
              {program.title}
            </h1>
            <p className="mt-4 max-w-[56ch] text-[1.02rem] leading-relaxed text-body">
              {program.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
              <span className="flex items-start gap-2.5">
                <IconCalendar className="mt-0.5 h-5 w-5 text-blue" />
                <span>
                  <span className="block text-sm font-semibold text-ink">{program.dateLabel}</span>
                  <span className="block text-xs text-muted">{weekdayFull(program.weekday)}</span>
                </span>
              </span>
              <span className="flex items-start gap-2.5">
                <IconClock className="mt-0.5 h-5 w-5 text-blue" />
                <span>
                  <span className="block text-sm font-semibold text-ink">{program.timeRange}</span>
                </span>
              </span>
              <span className="flex items-start gap-2.5">
                {program.format === "Онлайн" ? (
                  <IconMonitor className="mt-0.5 h-5 w-5 text-blue" />
                ) : (
                  <IconPin className="mt-0.5 h-5 w-5 text-blue" />
                )}
                <span>
                  <span className="block text-sm font-semibold text-ink">{program.format}</span>
                  <span className="block text-xs text-muted">{detail.platformLabel}</span>
                </span>
              </span>
              {program.hasCertificate && (
                <span className="flex items-start gap-2.5">
                  <IconCertificate className="mt-0.5 h-5 w-5 text-blue" />
                  <span className="block text-sm font-semibold text-ink">Именной сертификат</span>
                </span>
              )}
            </div>
          </div>

          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
            <Image
              src={detail.heroPhoto}
              alt={detail.heroQuote}
              fill
              sizes="(min-width: 1024px) 480px, 90vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
