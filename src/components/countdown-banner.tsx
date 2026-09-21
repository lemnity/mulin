"use client";

import { IconClock } from "@/components/icons";
import { SPECIAL_PRICE_DEADLINE, pad, useCountdown } from "@/lib/use-countdown";

function formatRemaining(remaining: ReturnType<typeof useCountdown>) {
  if (!remaining) return "--д --:--:--";
  return `${remaining.days}д ${pad(remaining.hours)}:${pad(remaining.minutes)}:${pad(remaining.seconds)}`;
}

export function CountdownBanner() {
  const remaining = useCountdown(SPECIAL_PRICE_DEADLINE);

  if (remaining?.done) return null;

  return (
    <div className="mb-6 rounded-xl border border-amber-text/20 bg-gradient-to-r from-amber-tint/70 to-surface p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-tint text-amber-text">
            <IconClock className="h-5 w-5" />
          </span>
          <div>
            <p className="font-semibold text-ink">Специальная цена — успейте заказать</p>
            <p className="text-sm text-body">
              Цены в расписании действуют до 1 октября 2026 года. После — новый прайс.
            </p>
          </div>
        </div>

        <div
          className="flex flex-col items-center rounded-lg bg-surface px-5 py-2.5 shadow-[0_1px_2px_rgba(16,24,40,0.06)]"
          role="timer"
          aria-live="off"
        >
          <span className="tabular whitespace-nowrap text-xl font-extrabold text-ink">
            {formatRemaining(remaining)}
          </span>
          <span className="text-[0.7rem] text-muted">до окончания акции</span>
        </div>
      </div>
    </div>
  );
}
