"use client";

import { IconClock } from "@/components/icons";
import { SPECIAL_PRICE_DEADLINE, pad, useCountdown } from "@/lib/use-countdown";

export function CountdownChip({ className = "" }: { className?: string }) {
  const remaining = useCountdown(SPECIAL_PRICE_DEADLINE);

  if (remaining?.done) return null;

  const label = remaining
    ? `${remaining.days}д ${pad(remaining.hours)}:${pad(remaining.minutes)}:${pad(remaining.seconds)}`
    : "—";

  return (
    <div
      className={`flex items-center gap-1.5 rounded-md bg-amber-tint px-2 py-1 text-[0.7rem] font-medium text-amber-text ${className}`}
      role="timer"
      aria-live="off"
      title="Цена действует до 1 октября 2026 года"
    >
      <IconClock className="h-3 w-3 shrink-0" />
      <span className="tabular whitespace-nowrap">Цена до 1 окт · {label}</span>
    </div>
  );
}
