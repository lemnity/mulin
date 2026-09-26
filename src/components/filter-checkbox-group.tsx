"use client";

import type { Facet } from "@/lib/program-facets";

export function FilterCheckboxGroup({
  title,
  options,
  selected,
  onToggle,
  scroll = false,
}: {
  title?: string;
  options: readonly Facet[];
  selected: ReadonlySet<string>;
  onToggle: (value: string) => void;
  scroll?: boolean;
}) {
  return (
    <fieldset>
      {title && <legend className="text-sm font-semibold text-ink">{title}</legend>}
      <div
        className={`flex flex-col gap-1 ${title ? "mt-3" : ""} ${
          scroll ? "max-h-64 overflow-y-auto pr-1" : ""
        }`}
      >
        {options.map(({ value, count }) => {
          const checked = selected.has(value);
          return (
            <label
              key={value}
              className={`flex cursor-pointer items-start gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-blue-tint/50 ${
                checked ? "text-ink" : "text-body"
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(value)}
                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-border text-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue"
              />
              <span className="flex-1">{value}</span>
              {/* Сколько программ за пунктом — видно до того, как его выбрали. */}
              <span className="tabular mt-px shrink-0 text-xs text-muted">{count}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
