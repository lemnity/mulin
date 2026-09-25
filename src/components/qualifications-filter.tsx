"use client";

import { useState } from "react";
import { IconCertificate } from "@/components/icons";

export type Qualification = { title: string; level: 5 | 6 | 7 };

const levels = [5, 6, 7] as const;

const tone: Record<number, { chip: string; ring: string }> = {
  5: { chip: "bg-green-tint text-green-text", ring: "ring-green-text/40" },
  6: { chip: "bg-blue-tint text-blue", ring: "ring-blue/40" },
  7: { chip: "bg-amber-tint text-amber-text", ring: "ring-amber-text/40" },
};

/** Список квалификационных аттестатов с фильтром по уровню профстандарта «Бухгалтер». */
export function QualificationsFilter({ items }: { items: Qualification[] }) {
  const [level, setLevel] = useState<number | null>(null);
  const shown = level ? items.filter((q) => q.level === level) : items;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-2xl font-extrabold text-ink">Квалификационные аттестаты</h2>
        <div role="group" aria-label="Фильтр по уровню стандарта" className="flex flex-wrap gap-2 text-sm font-semibold">
          <button
            type="button"
            aria-pressed={level === null}
            onClick={() => setLevel(null)}
            className={`cursor-pointer rounded-full px-4 py-2 transition-colors ${
              level === null ? "bg-ink text-white" : "bg-surface text-body ring-1 ring-inset ring-border hover:text-ink"
            }`}
          >
            Все
          </button>
          {levels.map((l) => {
            const active = level === l;
            return (
              <button
                key={l}
                type="button"
                aria-pressed={active}
                onClick={() => setLevel(active ? null : l)}
                className={`cursor-pointer rounded-full px-4 py-2 transition-[opacity,box-shadow] ${tone[l].chip} ${
                  active ? `ring-2 ring-inset ${tone[l].ring}` : level === null ? "" : "opacity-55 hover:opacity-90"
                }`}
              >
                {l}-й уровень стандарта
              </button>
            );
          })}
        </div>
      </div>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {shown.map((q) => (
          <li key={q.title} className="qual-card flex h-full items-start gap-3.5 rounded-2xl border border-border bg-surface p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-tint text-blue">
              <IconCertificate className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold leading-snug text-ink">{q.title}</span>
              <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[0.7rem] font-semibold ${tone[q.level].chip}`}>
                {q.level}-й уровень
              </span>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
