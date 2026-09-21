"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { orderLabel, useCart } from "@/lib/cart-context";
import type { Program } from "@/lib/programs";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  IconArrowRight,
  IconBuilding,
  IconCheck,
  IconChevronLeft,
  IconLock,
  IconTrash,
  IconUserCircle,
} from "@/components/icons";

function formatPrice(price: number) {
  return `${new Intl.NumberFormat("ru-RU").format(price)} ₽`;
}

const PROMO_CODES: Record<string, number> = {
  "ДНТ10": 0.1,
  "КОРП15": 0.15,
};

type Step = "details" | "payment" | "done";
type PaymentMethod = "card" | "invoice";
type Promo = { code: string; discount: number };

type Attendee = {
  name: string;
  phone: string;
  email: string;
  org: string;
  inn: string;
  comment: string;
};

type PaidOrder = {
  items: Program[];
  subtotal: number;
  total: number;
  promo: Promo | null;
  orderNumber: string;
};

const emptyAttendee: Attendee = { name: "", phone: "", email: "", org: "", inn: "", comment: "" };

const steps: Array<{ key: Step; label: string }> = [
  { key: "details", label: "Данные слушателя" },
  { key: "payment", label: "Оплата" },
];

function StepIndicator({ step }: { step: Step }) {
  const currentIndex = steps.findIndex((s) => s.key === step);
  return (
    <ol className="flex items-center gap-3">
      {steps.map((s, i) => {
        const done = i < currentIndex || step === "done";
        const active = s.key === step;
        return (
          <li key={s.key} className="flex items-center gap-3">
            <span className="flex items-center gap-2">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  done
                    ? "bg-blue text-white"
                    : active
                      ? "bg-blue-tint text-blue ring-1 ring-inset ring-blue"
                      : "bg-page text-muted ring-1 ring-inset ring-border"
                }`}
              >
                {done ? <IconCheck className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span className={`text-sm ${active ? "font-medium text-ink" : "text-muted"}`}>
                {s.label}
              </span>
            </span>
            {i < steps.length - 1 && <span className="h-px w-8 bg-border sm:w-16" />}
          </li>
        );
      })}
    </ol>
  );
}

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [step, setStep] = useState<Step>("details");
  const [attendee, setAttendee] = useState<Attendee>(emptyAttendee);
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [promoInput, setPromoInput] = useState("");
  const [promo, setPromo] = useState<Promo | null>(null);
  const [promoError, setPromoError] = useState("");
  const [paidOrder, setPaidOrder] = useState<PaidOrder | null>(null);

  const discountedTotal = useMemo(
    () => (promo ? Math.round(total * (1 - promo.discount)) : total),
    [total, promo],
  );

  function updateAttendee<K extends keyof Attendee>(key: K, value: Attendee[K]) {
    setAttendee((prev) => ({ ...prev, [key]: value }));
  }

  function handleDetailsSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep("payment");
  }

  function applyPromo() {
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    const discount = PROMO_CODES[code];
    if (discount) {
      setPromo({ code, discount });
      setPromoError("");
    } else {
      setPromo(null);
      setPromoError("Промокод не найден");
    }
  }

  function removePromo() {
    setPromo(null);
    setPromoInput("");
    setPromoError("");
  }

  function handlePaymentSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPaidOrder({
      items,
      subtotal: total,
      total: discountedTotal,
      promo,
      orderNumber: `ДНТ-${Math.floor(100000 + Math.random() * 900000)}`,
    });
    clear();
    setStep("done");
  }

  if (items.length === 0 && step !== "done") {
    return (
      <>
        <SiteHeader />
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-10">
            <p className="text-ink">Ваш заказ пока пуст — оформлять пока нечего.</p>
            <Link
              href="/#programs"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-dark"
            >
              К расписанию
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
          {step !== "done" && (
            <>
              <Link
                href="/cart"
                className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
              >
                <IconChevronLeft className="h-4 w-4" />
                {items.length > 1 ? "Назад к заказам" : "Назад к заказу"}
              </Link>
              <h1 className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
                Оформление заявки
              </h1>
              <div className="mt-6 overflow-x-auto">
                <StepIndicator step={step} />
              </div>
            </>
          )}

          {step === "details" && (
            <div className="mt-8">
              <div className="flex flex-col items-start justify-between gap-3 rounded-xl border border-border bg-blue-tint px-5 py-4 sm:flex-row sm:items-center">
                <p className="text-sm text-ink">
                  Уже записывались к нам? Войдите в личный кабинет — данные заполнятся сами.
                </p>
                <a
                  href="#"
                  className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-blue bg-surface px-4 py-2 text-sm font-medium text-blue transition-colors hover:bg-blue hover:text-white"
                >
                  <IconUserCircle className="h-4 w-4" />
                  Войти в личный кабинет
                </a>
              </div>

              <div className="my-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted">или заполните форму</span>
                <span className="h-px flex-1 bg-border" />
              </div>

              <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                <form
                onSubmit={handleDetailsSubmit}
                className="flex flex-col gap-5 rounded-xl border border-border bg-surface p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
              >
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
                    ФИО слушателя
                  </label>
                  <input
                    id="name"
                    required
                    value={attendee.name}
                    onChange={(e) => updateAttendee("name", e.target.value)}
                    placeholder="Иванова Мария Сергеевна"
                    className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:border-blue"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink">
                      Телефон
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={attendee.phone}
                      onChange={(e) => updateAttendee("phone", e.target.value)}
                      placeholder="+7 900 000-00-00"
                      className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:border-blue"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={attendee.email}
                      onChange={(e) => updateAttendee("email", e.target.value)}
                      placeholder="mail@company.ru"
                      className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:border-blue"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="org" className="mb-1.5 block text-sm font-medium text-ink">
                      Организация <span className="font-normal text-muted">(необязательно)</span>
                    </label>
                    <input
                      id="org"
                      value={attendee.org}
                      onChange={(e) => updateAttendee("org", e.target.value)}
                      placeholder="ООО «Компания»"
                      className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:border-blue"
                    />
                  </div>
                  <div>
                    <label htmlFor="inn" className="mb-1.5 block text-sm font-medium text-ink">
                      ИНН <span className="font-normal text-muted">(для счёта на юрлицо)</span>
                    </label>
                    <input
                      id="inn"
                      value={attendee.inn}
                      onChange={(e) => updateAttendee("inn", e.target.value)}
                      placeholder="7700000000"
                      className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:border-blue"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="comment" className="mb-1.5 block text-sm font-medium text-ink">
                    Комментарий <span className="font-normal text-muted">(необязательно)</span>
                  </label>
                  <textarea
                    id="comment"
                    rows={3}
                    value={attendee.comment}
                    onChange={(e) => updateAttendee("comment", e.target.value)}
                    placeholder="Например, сколько сотрудников от компании планируют участие"
                    className="w-full resize-none rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:border-blue"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 flex items-center justify-center gap-2 self-start rounded-lg bg-blue px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-dark"
                >
                  Продолжить к оплате
                  <IconArrowRight className="h-4 w-4" />
                </button>
              </form>

              <OrderSummary
                items={items}
                subtotal={total}
                promo={promo}
                promoInput={promoInput}
                promoError={promoError}
                onPromoInputChange={(value) => {
                  setPromoInput(value);
                  if (promoError) setPromoError("");
                }}
                onApplyPromo={applyPromo}
                onRemovePromo={removePromo}
              />
              </div>
            </div>
          )}

          {step === "payment" && (
            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
              <form
                onSubmit={handlePaymentSubmit}
                className="flex flex-col gap-5 rounded-xl border border-border bg-surface p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
              >
                <p className="text-sm text-body">Выберите способ оплаты для заявки.</p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label
                    className={`flex cursor-pointer flex-col gap-2 rounded-xl border p-4 transition-colors ${
                      method === "card" ? "border-blue bg-blue-tint" : "border-border hover:border-blue/50"
                    }`}
                  >
                    <span className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                        <IconLock className="h-4 w-4 text-blue" />
                        Картой онлайн
                      </span>
                      <input
                        type="radio"
                        name="method"
                        checked={method === "card"}
                        onChange={() => setMethod("card")}
                        className="h-4 w-4 accent-[var(--blue)]"
                      />
                    </span>
                    <span className="text-xs text-muted">
                      Переход на защищённую страницу банка, оплата сразу
                    </span>
                  </label>

                  <label
                    className={`flex cursor-pointer flex-col gap-2 rounded-xl border p-4 transition-colors ${
                      method === "invoice"
                        ? "border-blue bg-blue-tint"
                        : "border-border hover:border-blue/50"
                    }`}
                  >
                    <span className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                        <IconBuilding className="h-4 w-4 text-blue" />
                        Счёт для организации
                      </span>
                      <input
                        type="radio"
                        name="method"
                        checked={method === "invoice"}
                        onChange={() => setMethod("invoice")}
                        className="h-4 w-4 accent-[var(--blue)]"
                      />
                    </span>
                    <span className="text-xs text-muted">
                      Счёт придёт на email для оплаты по безналу
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="mt-2 flex items-center justify-center gap-2 self-start rounded-lg bg-blue px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-dark"
                >
                  {method === "card"
                    ? `Оплатить ${formatPrice(discountedTotal)}`
                    : `Выставить счёт на ${formatPrice(discountedTotal)}`}
                  <IconArrowRight className="h-4 w-4" />
                </button>
              </form>

              <OrderSummary
                items={items}
                subtotal={total}
                promo={promo}
                promoInput={promoInput}
                promoError={promoError}
                onPromoInputChange={(value) => {
                  setPromoInput(value);
                  if (promoError) setPromoError("");
                }}
                onApplyPromo={applyPromo}
                onRemovePromo={removePromo}
              />
            </div>
          )}

          {step === "done" && paidOrder && (
            <div className="mx-auto mt-8 max-w-xl rounded-xl border border-border bg-surface p-8 text-center shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-tint">
                <IconCheck className="h-6 w-6 text-green-text" />
              </span>
              <h1 className="mt-5 text-2xl font-extrabold text-ink">
                {method === "card" ? "Оплата прошла успешно" : "Счёт сформирован"}
              </h1>
              <p className="mt-2 text-sm text-body">
                {method === "card"
                  ? `Заявка № ${paidOrder.orderNumber} оплачена. Подтверждение и ссылки на подключение отправим на ${attendee.email || "указанный email"}.`
                  : `Заявка № ${paidOrder.orderNumber} принята. Счёт на ${formatPrice(paidOrder.total)} отправлен на ${attendee.email || "указанный email"}.`}
              </p>

              <ul className="mt-6 space-y-2 rounded-lg bg-page p-4 text-left text-sm text-ink">
                {paidOrder.items.map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-4">
                    <span className="min-w-0 truncate">{p.title}</span>
                    <span className="tabular shrink-0 font-medium">{formatPrice(p.price)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 space-y-1.5 border-t border-border pt-3 text-sm">
                {paidOrder.promo && (
                  <div className="flex items-center justify-between text-body">
                    <span>Скидка по промокоду «{paidOrder.promo.code}»</span>
                    <span className="tabular">
                      −{formatPrice(paidOrder.subtotal - paidOrder.total)}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between font-semibold text-ink">
                  <span>Итого</span>
                  <span className="tabular">{formatPrice(paidOrder.total)}</span>
                </div>
              </div>

              <Link
                href="/"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-dark"
              >
                Вернуться к расписанию
              </Link>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

function OrderSummary({
  items,
  subtotal,
  promo,
  promoInput,
  promoError,
  onPromoInputChange,
  onApplyPromo,
  onRemovePromo,
}: {
  items: Program[];
  subtotal: number;
  promo?: Promo | null;
  promoInput: string;
  promoError: string;
  onPromoInputChange: (value: string) => void;
  onApplyPromo: () => void;
  onRemovePromo: () => void;
}) {
  const total = promo ? Math.round(subtotal * (1 - promo.discount)) : subtotal;

  return (
    <aside className="h-fit rounded-xl border border-border bg-surface p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)] lg:sticky lg:top-24">
      <h2 className="text-lg font-bold text-ink">{orderLabel(items.length)}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((p) => (
          <li key={p.id} className="flex items-start justify-between gap-3 text-sm">
            <span className="min-w-0 text-body">{p.title}</span>
            <span className="tabular shrink-0 font-medium text-ink">{formatPrice(p.price)}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 border-t border-border pt-4">
        {promo ? (
          <div className="flex items-center justify-between rounded-lg bg-green-tint px-3 py-2 text-sm">
            <span className="flex min-w-0 items-center gap-1.5 text-green-text">
              <IconCheck className="h-4 w-4 shrink-0" />
              <span className="truncate">
                «{promo.code}» — скидка {Math.round(promo.discount * 100)}%
              </span>
            </span>
            <button
              type="button"
              onClick={onRemovePromo}
              aria-label="Убрать промокод"
              className="shrink-0 text-green-text/70 transition-colors hover:text-green-text"
            >
              <IconTrash className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div>
            <div className="flex gap-2">
              <input
                value={promoInput}
                onChange={(e) => onPromoInputChange(e.target.value)}
                placeholder="Промокод"
                aria-label="Промокод"
                className="w-full min-w-0 flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm uppercase text-ink placeholder:normal-case placeholder:text-muted focus:border-blue"
              />
              <button
                type="button"
                onClick={onApplyPromo}
                className="shrink-0 whitespace-nowrap rounded-lg border border-border px-3 py-2 text-sm font-medium text-ink transition-colors hover:border-blue hover:text-blue"
              >
                Применить
              </button>
            </div>
            {promoError && <p className="mt-1.5 text-xs text-amber-text">{promoError}</p>}
          </div>
        )}
      </div>

      <div className="mt-4 space-y-1.5 border-t border-border pt-4">
        {promo && (
          <div className="flex items-center justify-between text-sm text-green-text">
            <span>Скидка по промокоду</span>
            <span className="tabular">−{formatPrice(subtotal - total)}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-ink">Итого</span>
          <span className="tabular text-xl font-extrabold text-ink">{formatPrice(total)}</span>
        </div>
      </div>
    </aside>
  );
}
