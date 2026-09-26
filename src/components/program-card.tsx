"use client";

import Link from "next/link";
import type { Program } from "@/lib/programs";
import { useCart } from "@/lib/cart-context";
import { getProgramView } from "@/lib/program-content";
import { earlyBookingLabel, getEarlyBooking } from "@/lib/early-booking";
import { IconCheck, IconClock, IconMonitor, IconPin } from "@/components/icons";

const typeBadge: Record<Program["type"], string> = {
  Вебинар: "bg-blue-tint text-blue",
  Семинар: "bg-green-tint text-green-text",
  Курс: "bg-amber-tint text-amber-text",
};

function formatPrice(price: number) {
  return `${new Intl.NumberFormat("ru-RU").format(price)} ₽`;
}

export function ProgramCard({ program, now }: { program: Program; now: Date }) {
  const { addItem, hasItem } = useCart();
  const view = getProgramView(program);
  const inCart = hasItem(program.id);
  const early = getEarlyBooking(program, now);

  const date = new Date(program.dateISO);
  const day = date.toLocaleDateString("ru-RU", { day: "2-digit" });
  const month = date.toLocaleDateString("ru-RU", { month: "short" }).replace(".", "");

  return (
    <article className="relative flex flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-blue/40">
      <div className="flex items-center justify-between gap-3">
        <span
          className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${typeBadge[program.type]}`}
        >
          {program.type}
        </span>
        <span className="tabular text-sm font-medium text-body">
          {day} {month}
        </span>
      </div>

      {view.category && (
        <p className="mb-1 mt-4 text-xs font-semibold tracking-wide text-blue uppercase">
          {view.category}
        </p>
      )}
      <h3 className="text-base font-bold leading-snug text-ink">
        <Link
          href={`/programs/${program.id}`}
          className="transition-colors after:absolute after:inset-0 hover:text-blue"
        >
          {view.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-body">{view.summary}</p>

      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-body">
        <li className="flex items-center gap-1.5">
          {view.place.label === "Онлайн" ? (
            <IconMonitor className="h-3.5 w-3.5 text-muted" />
          ) : (
            <IconPin className="h-3.5 w-3.5 text-muted" />
          )}
          {view.place.label}
        </li>
        <li className="flex items-center gap-1.5">
          <IconClock className="h-3.5 w-3.5 text-muted" />
          {view.time.label}
        </li>
        {view.duration && <li className="text-muted">{view.duration}</li>}
      </ul>

      <div className="mt-5 flex items-end justify-between gap-3 border-t border-border pt-4">
        <div>
          <p className="tabular text-lg font-extrabold leading-none text-ink">
            {formatPrice(program.price)}
          </p>
          {early && <p className="mt-1 text-xs leading-snug text-amber-text">{earlyBookingLabel(early)}</p>}
        </div>
        <button
          type="button"
          onClick={() => addItem(program.id)}
          aria-label={inCart ? `${view.title} — уже в заказе` : `Добавить в заказ: ${view.title}`}
          className={`relative z-10 flex h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-4 text-sm font-medium transition-colors ${
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
