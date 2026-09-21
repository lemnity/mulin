"use client";

import Link from "next/link";
import type { Program } from "@/lib/programs";
import { useCart } from "@/lib/cart-context";
import { CountdownChip } from "@/components/countdown-chip";
import { regularPriceFor } from "@/lib/use-countdown";
import {
  IconArrowRight,
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

export function ProgramRow({
  program,
  showCountdown = false,
}: {
  program: Program;
  showCountdown?: boolean;
}) {
  const { addItem, hasItem } = useCart();
  const day = new Date(program.dateISO).toLocaleDateString("ru-RU", { day: "2-digit" });
  const month = new Date(program.dateISO).toLocaleDateString("ru-RU", { month: "long" });
  const inCart = hasItem(program.id);

  function handleSignUp() {
    addItem(program.id);
  }

  return (
    <article className="relative grid grid-cols-1 gap-5 rounded-xl border border-border bg-surface p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:grid-cols-[120px_1fr] lg:grid-cols-[120px_1fr_180px]">
      {showCountdown && (
        <CountdownChip className="absolute right-6 top-0 z-10 -translate-y-1/2" />
      )}
      <div>
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${typeBadge[program.type]}`}
        >
          {program.type}
        </span>
        <div className="mt-3">
          <span className="tabular block text-3xl font-extrabold leading-none text-ink">
            {day}
          </span>
          <span className="mt-1.5 block text-sm leading-snug text-muted">
            {month}
            <br />
            {new Date(program.dateISO).getFullYear()}
          </span>
          <span className="mt-1 block text-sm text-muted">{program.weekday}</span>
        </div>
      </div>

      <div className="min-w-0">
        <p className="mb-1.5 text-xs font-medium tracking-wide text-blue uppercase">
          {program.categories.join(", ")}
        </p>
        <h3 className="text-balance text-lg font-bold leading-snug text-ink">
          <Link href={`/programs/${program.id}`} className="hover:text-blue">
            {program.title}
          </Link>
        </h3>
        <p className="mt-2 max-w-[62ch] text-[0.95rem] leading-relaxed text-body">
          {program.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-sm text-ink/85">
          <span className="flex items-center gap-1.5">
            {program.format === "Онлайн" ? (
              <IconMonitor className="h-4 w-4 text-blue" />
            ) : (
              <IconPin className="h-4 w-4 text-blue" />
            )}
            {program.location}
          </span>
          <span className="flex items-center gap-1.5">
            <IconClock className="h-4 w-4 text-blue" />
            {program.timeRange}
          </span>
          <span className="flex items-center gap-1.5">
            <IconUser className="h-4 w-4 text-blue" />
            {program.speaker}
          </span>
          {program.hasCertificate && (
            <span className="flex items-center gap-1.5">
              <IconCertificate className="h-4 w-4 text-blue" />
              Именной сертификат
            </span>
          )}
          {program.hasLetter && (
            <a href="#" className="flex items-center gap-1.5 text-blue hover:underline">
              <IconFile className="h-4 w-4" />
              Информационное письмо (PDF)
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between lg:col-span-1 lg:flex-col lg:items-end lg:justify-start lg:gap-2.5">
        <span className="flex items-baseline gap-2 whitespace-nowrap">
          {showCountdown && (
            <span className="tabular text-sm text-muted line-through">
              {formatPrice(regularPriceFor(program.price))}
            </span>
          )}
          <span className="tabular text-xl font-extrabold text-ink">
            {formatPrice(program.price)}
          </span>
        </span>
        <div className="flex gap-2 lg:w-full lg:flex-col">
          <button
            type="button"
            onClick={handleSignUp}
            className={`flex items-center justify-center gap-2 whitespace-nowrap rounded-lg px-5 py-2.5 text-sm font-medium transition-colors lg:w-full ${
              inCart
                ? "bg-green-tint text-green-text"
                : "bg-blue text-white hover:bg-blue-dark"
            }`}
          >
            {inCart ? (
              <>
                В корзине
                <IconCheck className="h-4 w-4" />
              </>
            ) : (
              <>
                Записаться
                <IconArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
          <Link
            href={`/programs/${program.id}`}
            className="whitespace-nowrap rounded-lg border border-border px-5 py-2.5 text-center text-sm text-ink transition-colors hover:border-blue hover:text-blue lg:w-full"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </article>
  );
}
