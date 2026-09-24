"use client";

import Link from "next/link";
import { orderLabel, useCart } from "@/lib/cart-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  IconArrowRight,
  IconCertificate,
  IconClock,
  IconMonitor,
  IconPin,
  IconTrash,
} from "@/components/icons";

function formatPrice(price: number) {
  return `${new Intl.NumberFormat("ru-RU").format(price)} ₽`;
}

export default function CartPage() {
  const { items, removeItem, total } = useCart();

  return (
    <>
      <SiteHeader />

      <main id="main" className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
          <h1 className="text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            {orderLabel(items.length)}
          </h1>

          {items.length === 0 ? (
            <div className="mt-8 rounded-xl border border-border bg-surface py-16 text-center">
              <p className="text-ink">Ваш заказ пока пуст.</p>
              <p className="mt-1.5 text-sm text-muted">
                Выберите семинар, курс или вебинар в расписании — он появится здесь.
              </p>
              <Link
                href="/schedule"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-dark"
              >
                К расписанию
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
              <div className="flex flex-col gap-4">
                {items.map((program) => {
                  const day = new Date(program.dateISO).toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "short",
                  });
                  return (
                    <article
                      key={program.id}
                      className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-medium tracking-wide text-blue uppercase">
                          {program.categories[0]}
                        </p>
                        <h2 className="mt-1 text-balance text-base font-bold leading-snug text-ink">
                          {program.title}
                        </h2>
                        <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-ink">
                          <span className="flex items-center gap-1.5">
                            <IconClock className="h-3.5 w-3.5 text-blue" />
                            {day}, {program.timeRange}
                          </span>
                          <span className="flex items-center gap-1.5">
                            {program.format === "Онлайн" ? (
                              <IconMonitor className="h-3.5 w-3.5 text-blue" />
                            ) : (
                              <IconPin className="h-3.5 w-3.5 text-blue" />
                            )}
                            {program.location}
                          </span>
                          {program.hasCertificate && (
                            <span className="flex items-center gap-1.5">
                              <IconCertificate className="h-3.5 w-3.5 text-blue" />
                              Сертификат
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-4 sm:flex-col sm:items-end sm:gap-2.5">
                        <span className="tabular whitespace-nowrap text-lg font-extrabold text-ink">
                          {formatPrice(program.price)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(program.id)}
                          className="flex items-center gap-1.5 whitespace-nowrap text-sm text-muted transition-colors hover:text-ink"
                        >
                          <IconTrash className="h-4 w-4" />
                          Убрать
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>

              <aside className="h-fit rounded-xl border border-border bg-surface p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)] lg:sticky lg:top-24">
                <h2 className="text-lg font-bold text-ink">{orderLabel(items.length)}</h2>
                <div className="mt-4 flex items-center justify-between text-sm text-body">
                  <span>
                    {items.length} {items.length === 1 ? "программа" : "программы"}
                  </span>
                  <span className="tabular font-medium text-ink">{formatPrice(total)}</span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-base font-semibold text-ink">Итого</span>
                  <span className="tabular text-xl font-extrabold text-ink">{formatPrice(total)}</span>
                </div>
                <Link
                  href="/checkout"
                  className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-blue px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-dark"
                >
                  Оформить
                  <IconArrowRight className="h-4 w-4" />
                </Link>
                <p className="mt-3 text-center text-xs text-muted">
                  На следующем шаге — данные слушателя и оплата.
                </p>
              </aside>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
