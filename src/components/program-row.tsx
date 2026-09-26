"use client";

import Link from "next/link";
import type { Program } from "@/lib/programs";
import { useCart } from "@/lib/cart-context";
import { getProgramView } from "@/lib/program-content";
import { earlyBookingLabel, getEarlyBooking } from "@/lib/early-booking";
import {
  IconArrowRight,
  IconCalendar,
  IconCertificate,
  IconCheck,
  IconClock,
  IconFile,
  IconMonitor,
  IconPin,
  IconUser,
} from "@/components/icons";

const typeBadge: Record<Program["type"], string> = {
  Вебинар: "bg-blue-tint text-blue",
  Семинар: "bg-green-tint text-green-text",
  Курс: "bg-amber-tint text-amber-text",
};

function formatPrice(price: number) {
  return `${new Intl.NumberFormat("ru-RU").format(price)} ₽`;
}

export function ProgramRow({ program, now }: { program: Program; now: Date }) {
  const { addItem, hasItem } = useCart();
  const view = getProgramView(program);
  const inCart = hasItem(program.id);
  const early = getEarlyBooking(program, now);

  const date = new Date(program.dateISO);
  const day = date.toLocaleDateString("ru-RU", { day: "2-digit" });
  const month = date.toLocaleDateString("ru-RU", { month: "long" });
  const year = date.getFullYear();

  return (
    <article className="group/row relative grid grid-cols-1 gap-x-6 gap-y-4 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-blue/40 sm:p-6 lg:grid-cols-[104px_minmax(0,1fr)_190px]">
      {/* Дата: на телефоне строкой, с планшета — блоком в левой колонке. */}
      <div className="flex items-center gap-3 lg:block">
        <span
          className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${typeBadge[program.type]}`}
        >
          {program.type}
        </span>
        <p className="flex items-baseline gap-1.5 lg:mt-3 lg:block">
          <span className="tabular text-2xl font-extrabold leading-none text-ink lg:text-[2rem]">
            {day}
          </span>
          <span className="text-sm leading-snug text-muted lg:mt-1.5 lg:block">
            {month} {year}
            {/* На телефоне дата идёт строкой, и день недели отделяется точкой; в колонке
                он переносится на свою строку, где точка осталась бы висеть слева. */}
            <span aria-hidden="true" className="lg:hidden"> · </span>
            <span className="lg:mt-0.5 lg:block">{program.weekday}</span>
          </span>
        </p>
      </div>

      <div className="min-w-0">
        {view.category && (
          <p className="mb-1.5 text-xs font-semibold tracking-wide text-blue uppercase">
            {view.category}
          </p>
        )}
        <h3 className="text-lg font-bold leading-snug text-ink">
          <Link
            href={`/programs/${program.id}`}
            className="transition-colors after:absolute after:inset-0 hover:text-blue"
          >
            {view.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 max-w-[68ch] text-[0.95rem] leading-relaxed text-body">
          {view.summary}
        </p>

        <ul className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-body">
          <li className="flex items-center gap-1.5">
            {view.place.label === "Онлайн" ? (
              <IconMonitor className="h-4 w-4 shrink-0 text-muted" />
            ) : (
              <IconPin className="h-4 w-4 shrink-0 text-muted" />
            )}
            {view.place.label}
          </li>
          <li className="flex items-center gap-1.5">
            <IconClock className="h-4 w-4 shrink-0 text-muted" />
            {view.time.label}
          </li>
          {view.duration && (
            <li className="flex items-center gap-1.5">
              <IconCalendar className="h-4 w-4 shrink-0 text-muted" />
              {view.duration}
              {view.hours ? ` · ${view.hours} ч` : ""}
            </li>
          )}
          {view.speaker && (
            <li className="flex items-center gap-1.5">
              <IconUser className="h-4 w-4 shrink-0 text-muted" />
              {view.speaker}
            </li>
          )}
          {program.hasCertificate && (
            <li className="flex items-center gap-1.5">
              <IconCertificate className="h-4 w-4 shrink-0 text-muted" />
              Именной сертификат
            </li>
          )}
          {program.hasLetter && (
            <li className="relative z-10">
              <a
                href="#"
                className="flex items-center gap-1.5 font-medium text-blue transition-colors hover:text-blue-dark"
              >
                <IconFile className="h-4 w-4 shrink-0" />
                Информационное письмо
                <span className="sr-only"> (PDF)</span>
              </a>
            </li>
          )}
        </ul>
      </div>

      {/* Цена и действие. relative + z-10 — чтобы кнопки работали поверх ссылки-подложки
          заголовка, которая растянута на всю карточку. */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 lg:flex-col lg:items-stretch lg:justify-start lg:gap-3 lg:border-t-0 lg:pt-0">
        <div className="lg:text-right">
          <p className="tabular text-xl font-extrabold leading-none text-ink">
            {formatPrice(program.price)}
          </p>
          {early && (
            <p className="mt-1.5 text-xs leading-snug text-amber-text">{earlyBookingLabel(early)}</p>
          )}
        </div>

        {/* Две кнопки есть у каждой карточки, поэтому ряд идёт ровно. Раньше рядом стояла
            ещё и ссылка на информационное письмо — она есть не у всех программ, и блок
            переносился по-разному от карточки к карточке; теперь письмо в строке сведений. */}
        <div className="flex gap-2 lg:flex-col">
          <button
            type="button"
            onClick={() => addItem(program.id)}
            aria-label={inCart ? `${view.title} — уже в заказе` : `Добавить в заказ: ${view.title}`}
            className={`flex h-11 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg px-5 text-sm font-medium transition-colors ${
              inCart
                ? "bg-green-tint text-green-text"
                : "bg-blue text-white hover:bg-blue-dark"
            }`}
          >
            {inCart ? (
              <>
                В заказе
                <IconCheck className="h-4 w-4" />
              </>
            ) : (
              <>
                Выбрать
                <IconArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          <Link
            href={`/programs/${program.id}`}
            className="flex h-11 items-center justify-center whitespace-nowrap rounded-lg border border-border px-5 text-center text-sm font-medium text-ink transition-colors hover:border-blue hover:text-blue"
          >
            Подробнее
            <span className="sr-only"> о программе «{view.title}»</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
