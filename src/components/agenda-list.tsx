import type { AgendaItem } from "@/lib/program-details";
import { IconChevronDown } from "@/components/icons";

export function AgendaList({ items }: { items: AgendaItem[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item, i) => (
        <details
          key={item.title}
          className="group rounded-lg border border-border px-4 py-3 open:border-blue"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
            <span className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-tint text-xs font-semibold text-blue">
                {i + 1}
              </span>
              <span className="text-sm font-medium text-ink">{item.title}</span>
            </span>
            <span className="flex shrink-0 items-center gap-3">
              <span className="whitespace-nowrap text-sm text-muted">{item.time}</span>
              <IconChevronDown className="h-4 w-4 text-muted transition-transform group-open:rotate-180" />
            </span>
          </summary>
          <p className="mt-2.5 pl-9 text-sm leading-relaxed text-body">
            Разбор темы с практическими примерами и ответами на вопросы участников.
          </p>
        </details>
      ))}
    </div>
  );
}
