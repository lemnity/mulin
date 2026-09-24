"use client";

import Link from "next/link";
import type { Program } from "@/lib/programs";
import { useCart } from "@/lib/cart-context";
import { CountdownChip } from "@/components/countdown-chip";
import { regularPriceFor } from "@/lib/use-countdown";
import { IconCheck, IconClock, IconMonitor, IconPin } from "@/components/icons";

const typeBadge: Record<Program["type"], string> = {
  Вебинар: "bg-blue-tint text-blue",
  Семинар: "bg-green-tint text-green-text",
  Курс: "bg-amber-tint text-amber-text",
};

function formatPrice(price: number) {
  return `${new Intl.NumberFormat("ru-RU").format(price)} ₽`;
}

export function ProgramCard({
  program,
  showCountdown = false,
}: {
  program: Program;
  showCountdown?: boolean;
}) {
  const { addItem, hasItem } = useCart();
  const day = new Date(program.dateISO).toLocaleDateString("ru-RU", { day: "2-digit" });
  const month = new Date(program.dateISO).toLocaleDateString("ru-RU", { month: "short" });
  const inCart = hasItem(program.id);

  function handleSignUp() {
    addItem(program.id);
  }

  return (
    <article className="relative flex flex-col rounded-xl border border-border bg-surface p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      {showCountdown && (
        <CountdownChip className="absolute right-5 top-0 z-10 -translate-y-1/2" />
      )}
      <div className="flex items-center justify-between">
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${typeBadge[program.type]}`}
        >
          {program.type}
        </span>
        <span className="tabular text-sm text-muted">
          {day} {month}
        </span>
      </div>

      <p className="mb-1 mt-4 text-xs font-medium tracking-wide text-blue uppercase">
        {program.categories[0]}
      </p>
      <h3 className="text-balance text-base font-bold leading-snug text-ink">
        <Link href={`/programs/${program.id}`} className="hover:text-blue">
          {program.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-body">{program.description}</p>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-ink">
        <span className="flex items-center gap-1.5">
          {program.format === "Онлайн" ? (
            <IconMonitor className="h-3.5 w-3.5 text-blue" />
          ) : (
            <IconPin className="h-3.5 w-3.5 text-blue" />
          )}
          {program.location}
        </span>
        <span className="flex items-center gap-1.5">
          <IconClock className="h-3.5 w-3.5 text-blue" />
          {program.timeRange}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <span className="flex items-baseline gap-1.5">
          {showCountdown && (
            <span className="tabular text-xs text-muted line-through">
              {formatPrice(regularPriceFor(program.price))}
            </span>
          )}
          <span className="tabular text-lg font-extrabold text-ink">
            {formatPrice(program.price)}
          </span>
        </span>
        <button
          type="button"
          onClick={handleSignUp}
          className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            inCart ? "bg-green-tint text-green-text" : "bg-blue text-white hover:bg-blue-dark"
          }`}
        >
          {inCart ? (
            <>
              В заказе
              <IconCheck className="h-3.5 w-3.5" />
            </>
          ) : (
            "Выбрать"
          )}
        </button>
      </div>
    </article>
  );
}
