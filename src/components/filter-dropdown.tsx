"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { IconChevronDown } from "@/components/icons";

export function FilterDropdown({
  label,
  count,
  children,
  panelClassName = "w-72",
}: {
  label: string;
  count: number;
  children: ReactNode;
  panelClassName?: string;
}) {
  const ref = useRef<HTMLDetailsElement>(null);

  /* Нативный <details> сам не закрывается ни по Escape, ни по клику мимо: панель
     оставалась висеть поверх списка, пока не нажмёшь на её же заголовок. Для выпадающего
     меню это ломает привычку — и заодно требование «из любого слоя есть выход». */
  useEffect(() => {
    const details = ref.current;
    if (!details) return;

    function closeIfOutside(event: MouseEvent) {
      if (!details!.open) return;
      if (event.target instanceof Node && details!.contains(event.target)) return;
      details!.open = false;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape" || !details!.open) return;
      details!.open = false;
      // Фокус возвращается на кнопку, иначе он остался бы на исчезнувшей панели.
      details!.querySelector("summary")?.focus();
    }

    document.addEventListener("pointerdown", closeIfOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeIfOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <details ref={ref} name="schedule-filters" className="group relative">
      <summary
        aria-label={count > 0 ? `${label}: выбрано ${count}` : label}
        className={`flex h-10 cursor-pointer list-none items-center gap-1.5 whitespace-nowrap rounded-full px-4 text-sm font-medium transition-colors [&::-webkit-details-marker]:hidden focus-visible:outline-1! focus-visible:outline-offset-1! ${
          count > 0
            ? "bg-blue-tint text-blue"
            : "bg-surface text-ink ring-1 ring-inset ring-border hover:ring-blue/40"
        }`}
      >
        {label}
        {count > 0 && (
          <span className="tabular flex h-5 min-w-5 items-center justify-center rounded-full bg-blue px-1.5 text-xs font-semibold text-white">
            {count}
          </span>
        )}
        <IconChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
      </summary>
      <div
        className={`menu-panel absolute left-0 top-[calc(100%+0.5rem)] z-30 max-w-[calc(100vw-2.5rem)] rounded-xl border border-border bg-surface p-4 shadow-lg ${panelClassName}`}
      >
        {children}
      </div>
    </details>
  );
}
