import Link from "next/link";
import type { Program } from "@/lib/programs";
import { IconArrowRight, IconClock, IconMonitor, IconPin } from "@/components/icons";

const typeBadge: Record<Program["type"], string> = {
  Вебинар: "bg-blue-tint text-blue",
  Семинар: "bg-green-tint text-green-text",
  Курс: "bg-amber-tint text-amber-text",
};

export function RelatedPrograms({ items }: { items: Program[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map((program) => (
        <Link
          key={program.id}
          href={`/programs/${program.id}`}
          className="group flex flex-col rounded-xl border border-border p-5 transition-colors hover:border-blue"
        >
          <div className="flex items-center gap-2.5">
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${typeBadge[program.type]}`}
            >
              {program.type}
            </span>
            <span className="text-xs text-muted">{program.dateLabel}</span>
          </div>
          <p className="mt-3 flex-1 text-[0.95rem] font-semibold leading-snug text-ink">
            {program.title}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
              <span className="flex items-center gap-1">
                {program.format === "Онлайн" ? (
                  <IconMonitor className="h-3.5 w-3.5" />
                ) : (
                  <IconPin className="h-3.5 w-3.5" />
                )}
                {program.format}
              </span>
              <span className="flex items-center gap-1">
                <IconClock className="h-3.5 w-3.5" />
                {program.timeRange.split(" ")[0]}
              </span>
            </div>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-tint text-blue transition-colors group-hover:bg-blue group-hover:text-white">
              <IconArrowRight className="h-4 w-4" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
