"use client";

export function FilterCheckboxGroup({
  title,
  options,
  selected,
  onToggle,
  scroll = false,
}: {
  title?: string;
  options: readonly string[];
  selected: ReadonlySet<string>;
  onToggle: (value: string) => void;
  scroll?: boolean;
}) {
  return (
    <fieldset>
      {title && <legend className="text-sm font-semibold text-ink">{title}</legend>}
      <div
        className={`flex flex-col gap-2.5 ${title ? "mt-3" : ""} ${
          scroll ? "max-h-64 overflow-y-auto pr-1" : ""
        }`}
      >
        {options.map((option) => (
          <label key={option} className="flex cursor-pointer items-start gap-2.5 text-sm">
            <input
              type="checkbox"
              checked={selected.has(option)}
              onChange={() => onToggle(option)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-border text-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue"
            />
            <span className={selected.has(option) ? "text-ink" : "text-ink"}>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
