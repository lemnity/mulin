"use client";

import { useId } from "react";
import { IconChevronDown } from "@/components/icons";

/* Нативный <select> рядом с фильтрами-таблетками выглядел чужим: системная рамка,
   системная стрелка, другая высота. Оформление снято (appearance-none), стрелка своя,
   размеры совпадают с таблетками — но элемент остался нативным, поэтому на телефоне
   открывается привычное системное колесо, а клавиатура и читалки работают без доработок. */
export function SortSelect<T extends string>({
  value,
  options,
  onChange,
  label = "Сортировать",
}: {
  value: T;
  options: ReadonlyArray<{ value: T; label: string }>;
  onChange: (value: T) => void;
  label?: string;
}) {
  const id = useId();

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="hidden text-sm text-muted sm:inline">
        {label}:
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value as T)}
          className="h-10 cursor-pointer appearance-none rounded-full bg-surface py-0 pl-4 pr-9 text-sm font-medium text-ink ring-1 ring-inset ring-border transition-colors hover:ring-blue/40"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <IconChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted"
        />
      </div>
    </div>
  );
}
