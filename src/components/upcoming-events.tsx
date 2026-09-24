import Link from "next/link";
import { programs, type ProgramType } from "@/lib/programs";
import { Reveal } from "@/components/reveal";
import { IconClock, IconMonitor, IconPin } from "@/components/icons";

const typeBadge: Record<ProgramType, string> = {
  Вебинар: "bg-blue-tint text-blue",
  Семинар: "bg-green-tint text-green-text",
  Курс: "bg-amber-tint text-amber-text",
};

function formatPrice(price: number) {
  return `${new Intl.NumberFormat("ru-RU").format(price)} ₽`;
}

export function UpcomingEvents() {
  const items = programs.slice(0, 3);

  return (
    <section className="mx-auto mt-16 max-w-7xl px-6 lg:px-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-ink">Ближайшие мероприятия</h2>
        <Link href="/schedule" className="text-sm font-medium text-blue hover:text-blue-dark">
          Смотреть всё расписание →
        </Link>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => (
          <Reveal key={p.id} delayMs={i * 100} className="h-full">
            <Link
              href={`/programs/${p.id}`}
              className="flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-blue"
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${typeBadge[p.type]}`}
                >
                  {p.type}
                </span>
                <span className="whitespace-nowrap text-sm text-muted">{p.dateLabel}</span>
              </div>
              <h3 className="mt-3 text-balance text-base font-bold leading-snug text-ink">
                {p.title}
              </h3>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-ink">
                <span className="flex items-center gap-1.5">
                  {p.format === "Онлайн" ? (
                    <IconMonitor className="h-3.5 w-3.5 text-blue" />
                  ) : (
                    <IconPin className="h-3.5 w-3.5 text-blue" />
                  )}
                  {p.format}
                </span>
                <span className="flex items-center gap-1.5">
                  <IconClock className="h-3.5 w-3.5 text-blue" />
                  {p.timeRange}
                </span>
              </div>
              <span className="tabular mt-4 border-t border-border pt-4 text-lg font-extrabold text-ink">
                {formatPrice(p.price)}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
