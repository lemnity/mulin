"use client";

import type { ReactNode } from "react";
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
  return (
    <details name="schedule-filters" className="group relative">
      <summary
        className={`flex cursor-pointer list-none items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors [&::-webkit-details-marker]:hidden focus-visible:outline-1! focus-visible:outline-offset-1! ${
          count > 0
            ? "bg-blue-tint text-blue"
            : "bg-surface text-ink ring-1 ring-inset ring-border hover:text-ink"
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
        className={`absolute left-0 top-[calc(100%+0.5rem)] z-30 max-w-[calc(100vw-2.5rem)] rounded-xl border border-border bg-surface p-4 shadow-lg ${panelClassName}`}
      >
        {children}
      </div>
    </details>
  );
}
