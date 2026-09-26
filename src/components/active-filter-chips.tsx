"use client";

import { IconClose, IconReset } from "@/components/icons";

export type ActiveFilter = {
  /** Устойчивый ключ: группа + значение. */
  key: string;
  /** Что показываем: «Формат: Онлайн». */
  label: string;
  onRemove: () => void;
};

/* Раньше применённые фильтры были видны только счётчиком на таблетке — чтобы понять,
   что именно отобрано, приходилось открывать каждый список. Чипы показывают весь отбор
   сразу и снимают его по одному. */
export function ActiveFilterChips({
  filters,
  onResetAll,
}: {
  filters: ActiveFilter[];
  onResetAll: () => void;
}) {
  if (filters.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted">Отбор:</span>
      {filters.map((filter) => (
        <button
          key={filter.key}
          type="button"
          onClick={filter.onRemove}
          className="group flex max-w-[22rem] cursor-pointer items-center gap-1.5 rounded-full bg-blue-tint py-1.5 pl-3 pr-2 text-sm font-medium text-blue transition-colors hover:bg-blue hover:text-white"
        >
          <span className="truncate">{filter.label}</span>
          <IconClose aria-hidden="true" className="h-3.5 w-3.5 shrink-0 opacity-70" />
          <span className="sr-only">— снять фильтр</span>
        </button>
      ))}
      {filters.length > 1 && (
        <button
          type="button"
          onClick={onResetAll}
          className="flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-medium text-muted transition-colors hover:text-blue"
        >
          <IconReset className="h-3.5 w-3.5" />
          Сбросить всё
        </button>
      )}
    </div>
  );
}
